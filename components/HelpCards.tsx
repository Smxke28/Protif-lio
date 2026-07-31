'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Code2, Wrench, Gamepad2 } from 'lucide-react';

interface HelpCard {
  icon: React.ReactNode;
  title: string;
  desc: string;
  buttonLabel: string;
  href: string;
  accent: 'cyan' | 'violet';
}

const CARDS: HelpCard[] = [
  {
    icon: <Code2 size={22} />,
    title: 'Desenvolvimento Web',
    desc: 'Sites rápidos, modernos e personalizados.',
    buttonLabel: 'Solicitar orçamento',
    href: '/servicos/desenvolvimento-web',
    accent: 'cyan',
  },
  {
    icon: <Wrench size={22} />,
    title: 'Suporte e Manutenção',
    desc: 'Atendimento remoto e presencial para resolver problemas de TI.',
    buttonLabel: 'Agendar atendimento',
    href: '/servicos/montagem-pc#briefing',
    accent: 'violet',
  },
  {
    icon: <Gamepad2 size={22} />,
    title: 'Monte seu PC',
    desc: 'Receba ajuda para montar o computador ideal para o seu orçamento.',
    buttonLabel: 'Montar meu PC',
    href: '/servicos/consultoria-hardware#briefing',
    accent: 'cyan',
  },
];

export default function HelpCards() {
  return (
    <section style={{ maxWidth: '1200px', margin: '0 auto', padding: '32px 24px 96px' }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        style={{ marginBottom: '48px', textAlign: 'center' }}
      >
        <div className="section-label" style={{ justifyContent: 'center', marginBottom: '16px' }}>
          Como posso ajudar
        </div>
        <h2
          style={{
            fontSize: 'clamp(1.6rem, 3vw, 2.2rem)',
            fontWeight: 700,
            letterSpacing: '-0.02em',
            color: 'var(--text-primary)',
          }}
        >
          O que você precisa hoje?
        </h2>
      </motion.div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
        {CARDS.map((card, i) => {
          const color = card.accent === 'cyan' ? 'var(--accent-cyan)' : 'var(--accent-violet)';
          const rgb = card.accent === 'cyan' ? '0,212,255' : '124,58,237';
          return (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              whileHover={{ y: -6 }}
            >
              <Link
                href={card.href}
                className="card-glass"
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  padding: '32px',
                  textDecoration: 'none',
                  height: '100%',
                  transition: 'box-shadow var(--transition), border-color var(--transition)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow = `0 12px 40px rgba(${rgb},0.18)`;
                  e.currentTarget.style.borderColor = `rgba(${rgb},0.35)`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = 'none';
                  e.currentTarget.style.borderColor = 'var(--border-subtle)';
                }}
              >
                <div
                  style={{
                    width: '48px',
                    height: '48px',
                    borderRadius: '12px',
                    background: `rgba(${rgb},0.1)`,
                    border: `1px solid rgba(${rgb},0.2)`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '20px',
                    color,
                  }}
                >
                  {card.icon}
                </div>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '10px' }}>
                  {card.title}
                </h3>
                <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '24px', flex: 1 }}>
                  {card.desc}
                </p>
                <span
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '6px',
                    padding: '10px 18px',
                    borderRadius: 'var(--radius)',
                    background: `rgba(${rgb},0.1)`,
                    color,
                    fontSize: '0.85rem',
                    fontWeight: 600,
                  }}
                >
                  {card.buttonLabel} →
                </span>
              </Link>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
