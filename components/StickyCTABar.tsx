'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { AnimatePresence, motion } from 'framer-motion';
import { MessageCircle, X } from 'lucide-react';
import { getWhatsAppLink } from '../app/lib/whatsapp';

export default function StickyCTABar() {
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    // Se a pessoa já fechou a barra nesta sessão, não mostra de novo.
    if (sessionStorage.getItem('sticky-cta-dismissed') === '1') {
      setDismissed(true);
    }

    function handleScroll() {
      const scrollPercent =
        (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
      setVisible(scrollPercent >= 35);
    }

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const shouldShow = visible && !dismissed;
    window.dispatchEvent(new Event(shouldShow ? 'sticky-cta:visible' : 'sticky-cta:hidden'));
  }, [visible, dismissed]);

  function handleDismiss() {
    setDismissed(true);
    try {
      sessionStorage.setItem('sticky-cta-dismissed', '1');
    } catch {
      // sessionStorage pode falhar em modo privado — não é crítico
    }
  }

  const show = visible && !dismissed;

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 40 }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          style={{
            position: 'fixed',
            left: '24px',
            right: '100px',
            bottom: '24px',
            zIndex: 39,
            maxWidth: '540px',
            margin: '0 auto',
          }}
        >
          <div
            className="card-glass"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '14px',
              padding: '14px 16px',
              boxShadow: '0 12px 40px rgba(0,0,0,0.35)',
            }}
          >
            <span
              style={{
                fontSize: '0.85rem',
                fontWeight: 500,
                color: 'var(--text-primary)',
                flex: 1,
                minWidth: 0,
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }}
            >
              Precisa de ajuda com tecnologia?
            </span>

            <Link
              href="/contato"
              className="btn-primary"
              style={{ padding: '8px 16px', fontSize: '0.8rem', flexShrink: 0 }}
            >
              Solicitar orçamento
            </Link>

            <a
              href={getWhatsAppLink('Olá! Vi seu portfólio e queria conversar sobre um projeto.')}
              target="_blank"
              rel="noreferrer"
              aria-label="Chamar no WhatsApp"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '36px',
                height: '36px',
                borderRadius: '50%',
                background: '#25D366',
                flexShrink: 0,
              }}
            >
              <MessageCircle size={17} color="#FFFFFF" />
            </a>

            <button
              type="button"
              onClick={handleDismiss}
              aria-label="Fechar"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '28px',
                height: '28px',
                borderRadius: '50%',
                background: 'transparent',
                border: 'none',
                color: 'var(--text-muted)',
                cursor: 'pointer',
                flexShrink: 0,
              }}
            >
              <X size={15} />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
