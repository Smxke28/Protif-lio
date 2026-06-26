import { createClient } from '@supabase/supabase-js';
import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]/route"; // ⚠️ Garanta que este caminho aponta para o seu NextAuth

export const dynamic = 'force-dynamic';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

// 🟢 GET: Alinhado com o seu useEffect (retorna { success: true, data })
export async function GET() {
  try {
    const { data, error } = await supabase
      .from('feedbacks')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;

    return NextResponse.json({ success: true, data });
  } catch (err: any) {
    return NextResponse.json(
      { error: err?.message || 'Erro ao carregar feedbacks.' },
      { status: 500 }
    );
  }
}

// 🟢 POST: Alinhado com o seu handleSubmit
export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions);

  // Validação de sessão via NextAuth
  if (!session || !session.user) {
    return NextResponse.json(
      { error: 'Sessão expirada ou não encontrada. Faça login novamente.' },
      { status: 401 }
    );
  }

  try {
    const { service, rating, comment } = await request.json();
    
    // Puxa o nome do usuário direto da sessão segura do NextAuth
    const finalName = session.user.name || session.user.email?.split('@')[0] || 'Usuário';

    const { data, error } = await supabase
      .from('feedbacks')
      .insert([
        {
          name: finalName,
          service,
          rating: Number(rating),
          comment,
        },
      ])
      .select(); // Retorna o dado inserido para alimentar o seu 'dadosDoFeedback' no front

    if (error) throw error;

    return NextResponse.json({ success: true, data });
  } catch (err: any) {
    console.error("❌ Erro interno na rota de feedback:", err);
    return NextResponse.json(
      { error: err?.message || 'Erro interno ao salvar no banco.' },
      { status: 500 }
    );
  }
}