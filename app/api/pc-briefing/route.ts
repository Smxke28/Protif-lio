import { createClient } from '@supabase/supabase-js';
import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

export const dynamic = 'force-dynamic';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

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

    const { data, error } = await supabase.from('pc_briefings').insert([record]).select();

    if (error) throw error;

    // Notificação por e-mail (best-effort - não bloqueia a resposta de sucesso ao cliente)
    try {
      await resend.emails.send({
        from: 'onboarding@resend.dev',
        to: process.env.CONTACT_EMAIL_USER!,
        subject: `Novo briefing de PC — ${nome}`,
        text: [
          `Nome: ${nome}`,
          `Contato: ${contato}`,
          `Tipo: ${tipoAtendimento === 'upgrade' ? 'Upgrade de PC existente' : 'PC novo'}`,
          record.specs_atuais ? `Specs atuais: ${record.specs_atuais}` : null,
          `Objetivos: ${objetivos.join(', ')}`,
          record.objetivo_outros ? `Outros (detalhe): ${record.objetivo_outros}` : null,
          record.jogos_casuais ? `Jogos casuais: ${record.jogos_casuais}` : null,
          record.jogos_competitivos ? `Jogos competitivos: ${record.jogos_competitivos}` : null,
          `Preferência GPU: ${preferenciaGPU}`,
          `Preferência CPU: ${preferenciaCPU}`,
          `Display: ${display}`,
          `Periféricos: ${perifericos}`,
          record.orcamento_faixa ? `Orçamento: ${record.orcamento_faixa}` : null,
          record.prazo_compra ? `Prazo: ${record.prazo_compra}` : null,
        ]
          .filter(Boolean)
          .join('\n'),
      });
    } catch (emailError) {
      console.error('⚠️ Briefing salvo, mas falhou ao notificar por e-mail:', emailError);
    }

    return NextResponse.json({ success: true, data });
  } catch (error: any) {
    console.error('❌ ERRO AO PROCESSAR BRIEFING:', error);
    return NextResponse.json({ success: false, error: error?.message || 'Erro interno.' }, { status: 500 });
  }
}
