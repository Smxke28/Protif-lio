// Número real do Juan — usado pelo botão flutuante, pela barra fixa e pelo CTA final.
// Trocar aqui atualiza em todo o site de uma vez.
export const WHATSAPP_NUMBER = '5532988766960';

export function getWhatsAppLink(message: string): string {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}
