'use client';

import { motion } from 'framer-motion';
import { Zap, FileCheck, Sparkles, Cpu, LifeBuoy } from 'lucide-react';

const REASONS = [
  { icon: <Zap size={20} />, label: 'Atendimento rápido' },
  { icon: <FileCheck size={20} />, label: 'Orçamento sem compromisso' },
  { icon: <Sparkles size={20} />, label: 'Soluções personalizadas' },
  { icon: <Cpu size={20} />, label: 'Tecnologias modernas' },
  { icon: <LifeBuoy size={20} />, label: 'Suporte pós-entrega' },
];

export default function WhyChooseUs() {
  return (
    <section style={{ maxWidth: '1100px', margin: '0 auto', padding: '96px 24px' }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        style={{ marginBottom: '48px', textAlign: 'center' }}
      >
        <div className="section-label" style={{ justifyContent: 'center', marginBottom: '16px' }}>
          Diferenciais
        </div>
        <h2 style={{ fontSize: 'clamp(1.6rem, 3vw, 2.2rem)', fontWeight: 700, letterSpacing: '-0.02em', color: 'var(--text-primary)' }}>
          Por que escolher meus serviços?
        </h2>
      </motion.div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
        {REASONS.map((reason, i) => (
          <motion.div
            key={reason.label}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08, duration: 0.4 }}
            whileHover={{ y: -4 }}
            className="card-glass"
            style={{
              padding: '22px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-start',
              gap: '14px',
              transition: 'box-shadow var(--transition)',
            }}
            onMouseEnter={(e) => { e.currentTarget.style.boxShadow = '0 12px 32px rgba(0,212,255,0.12)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.boxShadow = 'none'; }}
          >
            <div
              style={{
                width: '40px',
                height: '40px',
                borderRadius: '10px',
                background: 'var(--accent-cyan-dim)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--accent-cyan)',
              }}
            >
              {reason.icon}
            </div>
            <span style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--text-primary)' }}>{reason.label}</span>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
