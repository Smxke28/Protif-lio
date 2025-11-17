import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request): Promise<Response> {
  try {
    const { name, email, message } = await req.json();

    // 🔎 Loga os dados recebidos do front
    console.log("📩 Dados recebidos:", { name, email, message });

    if (!name || !email || !message) {
      return new Response(JSON.stringify({ success: false, error: 'Dados incompletos.' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const result = await resend.emails.send({
      from: 'onboarding@resend.dev', // remetente padrão
      to: process.env.CONTACT_EMAIL_USER!, // seu Gmail configurado no .env
      replyTo: email,
      subject: `Contato de ${name}`,
      text: `Nome: ${name}\nEmail: ${email}\n\nMensagem:\n${message}`,
    });

    // 🔎 Loga o resultado que o Resend devolveu
    console.log("📨 Resultado do Resend:", result);

    if ((result as any)?.error) {
      return new Response(JSON.stringify({ success: false, error: (result as any).error.message }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    return new Response(JSON.stringify({ success: true, id: (result as any)?.data?.id }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error: any) {
    console.error('❌ ERRO AO ENVIAR EMAIL:', error);
    return new Response(JSON.stringify({ success: false, error: error?.message || 'Erro interno.' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
