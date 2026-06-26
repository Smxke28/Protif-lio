import { createClient } from '@supabase/supabase-js';
import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]/route"; // 🟢 Ajuste o caminho se o seu arquivo de auth estiver em outro lugar

export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  // 1. Valida a sessão usando o NextAuth direto pelos cookies do navegador
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    return NextResponse.json(
      { error: 'Você precisa estar logado para enviar um feedback.' },
      { status: 401 }
    );
  }

  // 2. Configura o Supabase (Usado estritamente como Banco de Dados aqui)
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    return NextResponse.json(
      { error: 'Erro interno: Chaves de configuração ausentes.' },
      { status: 500 }
    );
  }

  const supabase = createClient(supabaseUrl, supabaseAnonKey);

  try {
    const { service, rating, comment } = await request.json();

    // Puxa o nome verificado do Google vindo da sessão segura do NextAuth
    const finalName = session.user.name || session.user.email?.split('@')[0] || 'Usuário';

    // 3. Insere os dados na tabela do Supabase
    const { data, error } = await supabase
      .from('feedbacks')
      .insert([
        {
          name: finalName,
          service,
          rating,
          comment,
        },
      ])
      .select(); // 🟢 Importante: retorna o dado criado para o front-end atualizar a tela na hora

    if (error) throw error;

    return NextResponse.json({ success: true, data });
  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : 'Erro desconhecido';
    
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}