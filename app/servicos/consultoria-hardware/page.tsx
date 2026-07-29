'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import PCBriefingWizard from '@/components/PCBriefingWizard';

const features = [
  { title: 'Compatibilidade garantida', desc: 'Análise completa de compatibilidade entre CPU, GPU, RAM, placa-mãe e fonte.' },
  { title: 'Custo-benefício', desc: 'Melhor performance pelo menor preço, com comparação entre componentes do mercado atual.' },
  { title: 'Gamers & Criadores', desc: 'Builds otimizadas para jogos em alta performance ou renderização e edição profissional.' },
  { title: 'Workstations', desc: 'Configurações para ambientes corporativos e desenvolvimento de software.' },
  { title: 'Upgrades inteligentes', desc: 'Avaliação do hardware atual e recomendação dos upgrades com maior impacto.' },
  { title: 'Montagem assistida', desc: 'Acompanhamento passo a passo na montagem e configuração inicial do sistema.' },
];

export default function ConsultoriaHardwarePage() {
  return (
    <div style={{ background: 'var(--page-bg)', minHeight: '100vh' }}>
      <section style={{ padding: '80px 24px 64px', maxWidth: '1100px', margin: '0 auto' }}>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} style={{ marginBottom: '12px' }}>
          <Link href="/servicos" style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontFamily: "'JetBrains Mono', monospace", textDecoration: 'none' }}>
            ← Serviços
          </Link>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05, duration: 0.5 }} style={{ marginBottom: '16px' }}>
          <span className="section-label">Serviço 02</span>
        </motion.div>
        <motion.h1
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1, duration: 0.5 }}
          style={{ fontSize: 'clamp(2rem, 5vw, 3.2rem)', fontWeight: 800, letterSpacing: '-0.03em', color: 'var(--text-primary)', marginBottom: '20px' }}
        >
          Consultoria & Montagem de Hardware
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15, duration: 0.5 }}
          style={{ fontSize: '1rem', color: 'var(--text-secondary)', maxWidth: '520px', lineHeight: 1.7, marginBottom: '40px' }}
        >
          Orientação especializada para escolher os componentes certos
          com foco em compatibilidade, desempenho e melhor custo-benefício.
        </motion.p>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.5 }}>
          <Link href="#briefing" className="btn-primary">Montar meu PC →</Link>
        </motion.div>
      </section>

      <hr className="divider" />

      <section style={{ maxWidth: '1100px', margin: '0 auto', padding: '64px 24px 96px' }}>
        <div style={{ marginBottom: '48px' }}>
          <div className="section-label" style={{ marginBottom: '12px' }}>O que está incluído</div>
          <h2 style={{ fontSize: '1.6rem', fontWeight: 700, letterSpacing: '-0.02em', color: 'var(--text-primary)' }}>Diferenciais</h2>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '16px' }}>
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ delay: i * 0.07, duration: 0.4 }}
              className="card-glass" style={{ padding: '24px' }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
                <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#A855F7', flexShrink: 0 }} />
                <h3 style={{ fontSize: '0.95rem', fontWeight: 600, color: 'var(--text-primary)' }}>{f.title}</h3>
              </div>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <hr className="divider" />

      <section id="briefing" style={{ maxWidth: '760px', margin: '0 auto', padding: '64px 24px 96px', scrollMarginTop: '32px' }}>
        <div style={{ marginBottom: '36px' }}>
          <div className="section-label" style={{ marginBottom: '12px' }}>Antes de começar</div>
          <h2 style={{ fontSize: '1.6rem', fontWeight: 700, letterSpacing: '-0.02em', color: 'var(--text-primary)', marginBottom: '12px' }}>
            Me conta o que você precisa
          </h2>
          <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.6, maxWidth: '520px' }}>
            Responda algumas perguntas rápidas sobre o uso do PC. Assim eu já
            chego no atendimento com uma noção clara do que faz sentido pra você.
          </p>
        </div>
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
          <PCBriefingWizard />
        </motion.div>
      </section>
    </div>
  );
}
