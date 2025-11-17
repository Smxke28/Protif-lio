import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request): Promise<Response> {
  try {
    const { name, email, message } = await req.json();

    if (!name || !email || !message) {
      return new Response(JSON.stringify({ success: false, error: 'Dados incompletos.' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const result = await resend.emails.send({
      from: 'contato.juandev', // seu domínio verificado
      to: process.env.CONTACT_EMAIL_USER!,
      replyTo: email,
      subject: `Contato de ${name}`,
      text: `Nome: ${name}\nEmail: ${email}\n\nMensagem:\n${message}`,
    });

    return new Response(JSON.stringify({ success: true, id: (result as any)?.id }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error: any) {
    console.error('Erro ao enviar:', error);
    return new Response(JSON.stringify({ success: false, error: error?.message || 'Erro interno.' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
