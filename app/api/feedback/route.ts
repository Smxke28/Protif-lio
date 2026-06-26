import { createClient } from '@supabase/supabase-js';
import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    return NextResponse.json(
      { error: 'Erro interno: Chaves de configuração ausentes.' },
      { status: 500 }
    );
  }

  const supabase = createClient(supabaseUrl, supabaseAnonKey);

  const authHeader = request.headers.get('Authorization');
  const token = authHeader?.split(' ')[1];

  if (!token) {
    return NextResponse.json(
      { error: 'Você precisa estar logado para enviar um feedback.' },
      { status: 401 }
    );
  }

  const { data: { user }, error: authError } = await supabase.auth.getUser(token);

  if (authError || !user) {
    return NextResponse.json(
      { error: 'Sessão inválida ou expirada. Faça login novamente.' },
      { status: 401 }
    );
  }

  try {
    const { service, rating, comment } = await request.json();

    // 🟢 2. Resolvido: 'user.email' tratado com fallback seguro caso seja indefinido
    const emailBackup = user.email ? user.email.split('@')[0] : 'Usuário';
    const finalName = user.user_metadata?.full_name || emailBackup;

    const { data, error } = await supabase
      .from('feedbacks')
      .insert([
        {
          name: finalName,
          service,
          rating,
          comment,
        },
      ]);

    if (error) throw error;

    return NextResponse.json({ success: true, data });
  } catch (err: unknown) {
    // 🟢 3. Resolvido: 'err' verificado com segurança antes de extrair a mensagem
    const errorMessage = err instanceof Error ? err.message : 'Erro desconhecido';
    
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}