import { createClient } from '@supabase/supabase-js';
import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import { generateBriefingPdf } from '@/app/lib/generateBriefingPdf';
import { notifyWhatsApp } from '@/app/lib/notifyWhatsApp';

export const dynamic = 'force-dynamic';

const resend = new Resend(process.env.RESEND_API_KEY);

const ITENS = [
  'limpeza_fisica',
  'limpeza_software',
  'backup',
  'recuperacao_dados',
  'otimizacao',
  'antivirus',
  'atualizacao_drivers',
  'diagnostico_hardware',
  'config_rede',
  'formatacao',
  'pasta_termica',
  'outro',
] as const;

const ATENDIMENTOS = ['remoto', 'presencial', 'nao_sei'] as const;
const URGENCIAS = ['urgente', 'sem_pressa'] as const;

const MAX_TEXT = 300;

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

    // 🔍 LOG DE VERIFICAÇÃO DAS VARIÁVEIS NO TERMINAL
    console.log('--- TESTE DE CONFIGURAÇÃO DO SUPABASE ---');
    console.log('Service Role existe?:', !!supabaseServiceKey);
    console.log(
      'Usando Anon por engano?:',
      supabaseServiceKey === process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    );

    // Instancia o cliente admin dentro do manipulador para garantir a leitura atualizada da chave
    const supabase = createClient(supabaseUrl, supabaseServiceKey, {
      auth: { persistSession: false },
    });

    const body = await req.json();

    // Honeypot anti-spam
    if (typeof body.website === 'string' && body.website.trim().length > 0) {
      return NextResponse.json({ success: true });
    }

    const itens = body.itens;
    const atendimento = body.atendimento;
    const urgencia = body.urgencia;
    const nome = clip(body.nome);
    const contato = clip(body.contato);

    if (
      !isArrayOf(itens, ITENS) ||
      !isIn(atendimento, ATENDIMENTOS) ||
      !isIn(urgencia, URGENCIAS) ||
      nome.length < 2 ||
      contato.length < 4
    ) {
      return NextResponse.json({ success: false, error: 'Dados incompletos ou inválidos.' }, { status: 400 });
    }

    const record = {
      itens,
      outro_detalhe: itens.includes('outro') ? clip(body.outroDetalhe) : '',
      atendimento,
      urgencia,
      nome,
      contato,
    };

    console.log('🛠️ Nova solicitação de manutenção:', record);

    // Inserção com privilégios de Admin (Service Role)
    const { data, error } = await supabase.from('manutencao_briefings').insert([record]).select();

    if (error) throw error;

    const summary = [
      { label: 'Nome', value: nome },
      { label: 'Contato', value: contato },
      { label: 'Itens', value: itens.join(', ') },
      { label: 'Outro (detalhe)', value: record.outro_detalhe },
      { label: 'Atendimento', value: atendimento },
      { label: 'Urgência', value: urgencia },
    ];

    const whatsappText = `🛠️ Nova solicitação de manutenção — ${nome}\nContato: ${contato}\nItens: ${itens.join(', ')}\nUrgência: ${urgencia}`;
    await notifyWhatsApp(whatsappText);

    try {
      const pdfBytes = await generateBriefingPdf('Solicitação de Manutenção', summary);

      const emailResult = await resend.emails.send({
        from: 'onboarding@resend.dev',
        to: process.env.CONTACT_EMAIL_USER!,
        subject: `Nova solicitação de manutenção — ${nome}`,
        text: summary
          .filter((f) => f.value)
          .map((f) => `${f.label}: ${f.value}`)
          .join('\n'),
        attachments: [
          {
            filename: `manutencao-${nome.replace(/\s+/g, '-').toLowerCase()}.pdf`,
            content: Buffer.from(pdfBytes),
          },
        ],
      });

      if (emailResult.error) {
        console.error('⚠️ Solicitação salva, mas Resend recusou o e-mail:', emailResult.error);
      }
    } catch (emailError) {
      console.error('⚠️ Solicitação salva, mas falhou ao notificar por e-mail:', emailError);
    }

    return NextResponse.json({ success: true, data });
  } catch (error: any) {
    console.error('❌ ERRO AO PROCESSAR SOLICITAÇÃO DE MANUTENÇÃO:', error);
    return NextResponse.json({ success: false, error: error?.message || 'Erro interno.' }, { status: 500 });
  }
}