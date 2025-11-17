const { Resend } = require('resend');

// Defina sua chave do Resend aqui ou use process.env.RESEND_API_KEY
const resend = new Resend(process.env.RESEND_API_KEY || "SUA_CHAVE_AQUI");

async function main() {
  try {
    const result = await resend.emails.send({
      from: 'onboarding@resend.dev', // remetente padrão
      to: 'juanlavecchia23@gmail.com', // seu email de teste
      subject: 'Teste Resend',
      text: 'Este é um teste direto pelo Resend sem domínio verificado.',
    });

    console.log('✅ Email enviado:', result);
  } catch (error) {
    console.error('❌ Erro ao enviar:', error);
  }
}

main();
