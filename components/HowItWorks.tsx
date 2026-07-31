'use client';

import { motion } from 'framer-motion';
import { MessageCircle, Search, FileText, Code2, CheckCircle2 } from 'lucide-react';

const STEPS = [
  { icon: <MessageCircle size={20} />, title: 'Contato', desc: 'Você me chama contando o que precisa.' },
  { icon: <Search size={20} />, title: 'Análise', desc: 'Eu entendo o problema e o contexto.' },
  { icon: <FileText size={20} />, title: 'Orçamento', desc: 'Você recebe uma proposta clara, sem compromisso.' },
  { icon: <Code2 size={20} />, title: 'Desenvolvimento ou Atendimento', desc: 'Coloco a mão na massa no que foi combinado.' },
  { icon: <CheckCircle2 size={20} />, title: 'Entrega', desc: 'Você recebe o resultado pronto e testado.' },
];

export default function HowItWorks() {
  return (
    <section style={{ maxWidth: '1100px', margin: '0 auto', padding: '96px 24px' }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        style={{ marginBottom: '56px', textAlign: 'center' }}
      >
        <div className="section-label" style={{ justifyContent: 'center', marginBottom: '16px' }}>
          Processo
        </div>
        <h2 style={{ fontSize: 'clamp(1.6rem, 3vw, 2.2rem)', fontWeight: 700, letterSpacing: '-0.02em', color: 'var(--text-primary)' }}>
          Como funciona
        </h2>
      </motion.div>

      {/* Desktop: linha horizontal. Mobile: coluna vertical (via flex-wrap + largura mínima) */}
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          gap: '8px',
          position: 'relative',
        }}
      >
        {STEPS.map((step, i) => (
          <motion.div
            key={step.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1, duration: 0.4 }}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              flex: '1 1 200px',
              maxWidth: '220px',
            }}
          >
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', flex: 1 }}>
              <div
                style={{
                  width: '52px',
                  height: '52px',
                  borderRadius: '50%',
                  background: 'var(--accent-cyan-dim)',
                  border: '1px solid var(--border-accent)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--accent-cyan)',
                  marginBottom: '14px',
                  position: 'relative',
                }}
              >
                {step.icon}
                <span
                  style={{
                    position: 'absolute',
                    top: '-6px',
                    right: '-6px',
                    width: '20px',
                    height: '20px',
                    borderRadius: '50%',
                    background: 'var(--bg-card)',
                    border: '1px solid var(--border-subtle)',
                    fontSize: '0.65rem',
                    fontWeight: 700,
                    color: 'var(--text-muted)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontFamily: "'JetBrains Mono', monospace",
                  }}
                >
                  {i + 1}
                </span>
              </div>
              <h3 style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '6px' }}>
                {step.title}
              </h3>
              <p style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>{step.desc}</p>
            </div>

            {i < STEPS.length - 1 && (
              <div
                className="hidden md:block"
                style={{ width: '32px', height: '1px', background: 'var(--border-subtle)', flexShrink: 0, alignSelf: 'flex-start', marginTop: '26px' }}
              />
            )}
          </motion.div>
        ))}
      </div>
    </section>
  );
}
