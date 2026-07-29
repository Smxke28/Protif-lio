'use client';

import { MessageCircle } from 'lucide-react';

// TODO: troque pelo número real, com DDI+DDD, só dígitos (ex: 5532999999999)
const WHATSAPP_NUMBER = '5532988766060';
const DEFAULT_MESSAGE = 'Olá! Vi seu portfólio e queria conversar sobre um projeto.';

export default function WhatsAppFloatButton() {
  const href = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(DEFAULT_MESSAGE)}`;

  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      aria-label="Chamar no WhatsApp"
      title="Chamar no WhatsApp"
      style={{
        position: 'fixed',
        bottom: '24px',
        right: '24px',
        width: '56px',
        height: '56px',
        borderRadius: '50%',
        background: '#25D366',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: '0 6px 24px rgba(37,211,102,0.4)',
        zIndex: 40,
        transition: 'transform 0.2s ease, box-shadow 0.2s ease',
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.transform = 'scale(1.08)';
        (e.currentTarget as HTMLElement).style.boxShadow = '0 8px 30px rgba(37,211,102,0.55)';
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.transform = 'scale(1)';
        (e.currentTarget as HTMLElement).style.boxShadow = '0 6px 24px rgba(37,211,102,0.4)';
      }}
    >
      <MessageCircle size={28} color="#FFFFFF" strokeWidth={2} />
    </a>
  );
}
