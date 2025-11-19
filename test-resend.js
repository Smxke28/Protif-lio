const { Resend } = require('resend');

const resend = new Resend(process.env.RESEND_API_KEY || "re_MWCkgTAj_48HrDPsQ4EPVrCA2P8shzbsf");

async function main() {
  try {
    const result = await resend.emails.send({
      from: 'onboarding@resend.dev', 
      to: 'juanlavecchia23@gmail.com',
      subject: 'Teste Resend',
      text: 'Este é um teste direto pelo Resend sem domínio verificado.',
    });

    console.log('✅ Email enviado:', result);
  } catch (error) {
    console.error('❌ Erro ao enviar:', error);
  }
}

main();
