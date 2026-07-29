/**
 * Notificação de WhatsApp via CallMeBot (https://www.callmebot.com).
 *
 * É "melhor esforço": se as env vars não estiverem configuradas, ou se a
 * chamada falhar por qualquer motivo, essa função apenas retorna `false`
 * silenciosamente — o e-mail (que tem o PDF anexado) continua sendo o
 * canal garantido.
 *
 * Como habilitar:
 * 1. Acesse callmebot.com/whatsapp e adicione o número do bot mostrado
 *    lá aos seus contatos do WhatsApp (atenção: o cadastro deles é
 *    limitado por capacidade — se estiver lotado, a página avisa e o
 *    número fica oculto até abrir vaga de novo).
 * 2. Mande pra esse contato: "I allow callmebot to send me messages"
 * 3. Você recebe de volta uma APIKEY.
 * 4. Configure na Vercel: CALLMEBOT_PHONE (seu número, com DDI, só dígitos)
 *    e CALLMEBOT_APIKEY (a chave recebida).
 *
 * Se o cadastro estiver fechado no momento, deixe as env vars vazias —
 * o sistema funciona normalmente só com e-mail até você conseguir habilitar.
 */
export async function notifyWhatsApp(text: string): Promise<boolean> {
  const phone = process.env.CALLMEBOT_PHONE;
  const apikey = process.env.CALLMEBOT_APIKEY;

  if (!phone || !apikey) {
    console.log('ℹ️ WhatsApp (CallMeBot) não configurado — pulando, e-mail seguirá normalmente.');
    return false;
  }

  try {
    const url = `https://api.callmebot.com/whatsapp.php?phone=${encodeURIComponent(phone)}&text=${encodeURIComponent(text)}&apikey=${encodeURIComponent(apikey)}`;
    const res = await fetch(url, { method: 'GET' });
    if (!res.ok) {
      console.error('⚠️ CallMeBot respondeu com erro:', res.status);
      return false;
    }
    return true;
  } catch (err) {
    console.error('⚠️ Falha ao notificar WhatsApp via CallMeBot:', err);
    return false;
  }
}
