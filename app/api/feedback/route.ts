import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function POST(request) {
  const cookieStore = await cookies();

  // 1. Cria o cliente do Supabase escutando os cookies do navegador
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            );
          } catch {
            // O Next.js às vezes reclama se tentar setar cookie em Server Component, podemos ignorar no POST
          }
        },
      },
    }
  );

  // 2. Verifica se o usuário está realmente logado pelo Google/Supabase
  const { data: { user }, error: authError } = await supabase.auth.getUser();

  if (authError || !user) {
    return NextResponse.json(
      { error: 'Você precisa estar logado com o Google para enviar um feedback.' },
      { status: 401 }
    );
  }

  try {
    const { service, rating, comment } = await request.json();

    // 3. Insere no banco herdando os dados do usuário logado
    const { data, error } = await supabase
      .from('feedbacks')
      .insert([
        {
          name: user.user_metadata.full_name || user.email.split('@')[0], // Pega o nome do Gmail do usuário logado automaticamente!
          service,
          rating,
          comment,
        },
      ]);

    if (error) throw error;

    return NextResponse.json({ success: true, data });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}