'use client';

import { useEffect, useState } from 'react';
import { MessageCircle } from 'lucide-react';
import { getWhatsAppLink } from '../app/lib/whatsapp';

const DEFAULT_MESSAGE = 'Olá! Vi seu portfólio e queria conversar sobre um projeto.';

export default function WhatsAppFloatButton() {
  const href = getWhatsAppLink(DEFAULT_MESSAGE);
  // Sobe quando a barra fixa de CTA está visível, pra não sobrepor ela.
  const [bottom, setBottom] = useState(24);

  useEffect(() => {
    function handleShow() { setBottom(96); }
    function handleHide() { setBottom(24); }
    window.addEventListener('sticky-cta:visible', handleShow);
    window.addEventListener('sticky-cta:hidden', handleHide);
    return () => {
      window.removeEventListener('sticky-cta:visible', handleShow);
      window.removeEventListener('sticky-cta:hidden', handleHide);
    };
  }, []);

  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      aria-label="Chamar no WhatsApp"
      title="Chamar no WhatsApp"
      style={{
        position: 'fixed',
        bottom: `${bottom}px`,
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
        transition: 'transform 0.2s ease, box-shadow 0.2s ease, bottom 0.3s ease',
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
