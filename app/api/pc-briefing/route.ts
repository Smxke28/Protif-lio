import { createClient } from '@supabase/supabase-js';
import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import { generateBriefingPdf } from '@/app/lib/generateBriefingPdf';
import { notifyWhatsApp } from '@/app/lib/notifyWhatsApp';

export const dynamic = 'force-dynamic';

const resend = new Resend(process.env.RESEND_API_KEY);

const TIPO_ATENDIMENTO = ['pc_novo', 'upgrade'] as const;
const OBJETIVOS = ['jogos', 'programacao', 'escritorio', 'estudos', 'edicao', 'geral', 'outros'] as const;
const MARCAS = ['nvidia', 'amd', 'intel', 'sem_preferencia'] as const;
const DISPLAYS = ['monitor', 'tv', 'ja_tenho'] as const;
const PERIFERICOS = ['so_pc', 'com_perifericos', 'pc_mais_monitor'] as const;

const MAX_TEXT = 300; // limite defensivo pra campos livres

function isIn<T extends readonly string[]>(value: unknown, options: T): value is T[number] {
  return typeof value === 'string' && (options as readonly string[]).includes(value);
}

function isArrayOf<T extends readonly string[]>(value: unknown, options: T): value is T[number][] {
  return Array.isArray(value) && value.length > 0 && value.every((v) => isIn(v, options));
}

function clip(value: unknown): string {
  if (typeof value !== 'string') return '';
  return value.slice(0, MAX_TEXT).trim();
}

export async function POST(req: NextRequest) {
  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
    const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

    // Instancia o cliente admin dentro da requisição com a chave Service Role
    const supabase = createClient(supabaseUrl, supabaseServiceKey, {
      auth: { persistSession: false },
    });

    const body = await req.json();

    // Honeypot: bots preenchem esse campo invisível. Descarta silenciosamente.
    if (typeof body.website === 'string' && body.website.trim().length > 0) {
      return NextResponse.json({ success: true });
    }

    const tipoAtendimento = body.tipoAtendimento;
    const objetivos = body.objetivos;
    const preferenciaGPU = body.preferenciaGPU;
    const preferenciaCPU = body.preferenciaCPU;
    const display = body.display;
    const perifericos = body.perifericos;
    const nome = clip(body.nome);
    const contato = clip(body.contato);

    // 🔎 Validação dos campos obrigatórios
    if (
      !isIn(tipoAtendimento, TIPO_ATENDIMENTO) ||
      !isArrayOf(objetivos, OBJETIVOS) ||
      !isIn(preferenciaGPU, MARCAS) ||
      !isIn(preferenciaCPU, MARCAS) ||
      !isIn(display, DISPLAYS) ||
      !isIn(perifericos, PERIFERICOS) ||
      nome.length < 2 ||
      contato.length < 4
    ) {
      return NextResponse.json({ success: false, error: 'Dados incompletos ou inválidos.' }, { status: 400 });
    }

    const record = {
      tipo_atendimento: tipoAtendimento,
      specs_atuais: clip(body.specsAtuais),
      objetivos,
      objetivo_outros: objetivos.includes('outros') ? clip(body.objetivoOutros) : '',
      jogos_casuais: clip(body.jogosCasuais),
      jogos_competitivos: clip(body.jogosCompetitivos),
      preferencia_gpu: preferenciaGPU,
      preferencia_cpu: preferenciaCPU,
      display,
      perifericos,
      orcamento_faixa: clip(body.orcamentoFaixa),
      prazo_compra: clip(body.prazoCompra),
      nome,
      contato,
    };

    console.log('🖥️ Novo briefing de montagem de PC:', record);

    // Inserção no banco via cliente Admin (Service Role)
    const { data, error } = await supabase.from('pc_briefings').insert([record]).select();

    if (error) throw error;

    // Resumo em campos rótulo/valor — reaproveitado no PDF, no e-mail e no WhatsApp
    const summary = [
      { label: 'Nome', value: nome },
      { label: 'Contato', value: contato },
      { label: 'Tipo', value: tipoAtendimento === 'upgrade' ? 'Upgrade de PC existente' : 'PC novo' },
      { label: 'Specs atuais', value: record.specs_atuais },
      { label: 'Objetivos', value: objetivos.join(', ') },
      { label: 'Outros (detalhe)', value: record.objetivo_outros },
      { label: 'Jogos casuais', value: record.jogos_casuais },
      { label: 'Jogos competitivos', value: record.jogos_competitivos },
      { label: 'Preferência GPU', value: preferenciaGPU },
      { label: 'Preferência CPU', value: preferenciaCPU },
      { label: 'Display', value: display },
      { label: 'Periféricos', value: perifericos },
      { label: 'Orçamento', value: record.orcamento_faixa },
      { label: 'Prazo', value: record.prazo_compra },
    ];

    // Notificação por WhatsApp
    const whatsappText = `🖥️ Novo briefing de PC — ${nome}\nContato: ${contato}\nTipo: ${summary[2].value}\nObjetivos: ${objetivos.join(', ')}`;
    await notifyWhatsApp(whatsappText);

    // Notificação por e-mail com PDF anexado
    try {
      const pdfBytes = await generateBriefingPdf('Briefing de Montagem de PC', summary);

      const emailResult = await resend.emails.send({
        from: 'onboarding@resend.dev',
        to: process.env.CONTACT_EMAIL_USER!,
        subject: `Novo briefing de PC — ${nome}`,
        text: summary
          .filter((f) => f.value)
          .map((f) => `${f.label}: ${f.value}`)
          .join('\n'),
        attachments: [
          {
            filename: `briefing-pc-${nome.replace(/\s+/g, '-').toLowerCase()}.pdf`,
            content: Buffer.from(pdfBytes),
          },
        ],
      });

      if (emailResult.error) {
        console.error('⚠️ Briefing salvo, mas Resend recusou o e-mail:', emailResult.error);
      }
    } catch (emailError) {
      console.error('⚠️ Briefing salvo, mas falhou ao notificar por e-mail:', emailError);
    }

    return NextResponse.json({ success: true, data });
  } catch (error: any) {
    console.error('❌ ERRO AO PROCESSAR BRIEFING:', error);
    return NextResponse.json({ success: false, error: error?.message || 'Erro interno.' }, { status: 500 });
  }
}