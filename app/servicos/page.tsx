'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

const services = [
  {
    number: '01',
    title: 'Desenvolvimento Web',
    shortDesc: 'Sites modernos, rápidos e responsivos.',
    fullDesc:
      'Criação de sites e aplicações web com foco em performance, SEO e experiência do usuário. De landing pages a sistemas completos.',
    tags: ['Next.js', 'React', 'TypeScript', 'Tailwind', 'SEO'],
    href: '/servicos/desenvolvimento-web',
    accent: 'var(--accent-cyan)',
  },
  {
    number: '02',
    title: 'Consultoria & Montagem de Hardware',
    shortDesc: 'Seleção e montagem de computadores.',
    fullDesc:
      'Orientação especializada para escolha de componentes com foco em compatibilidade, desempenho e custo-benefício. PCs para gamers, criadores e empresas.',
    tags: ['Componentes', 'Compatibilidade', 'Upgrades', 'Workstations'],
    href: '/servicos/consultoria-hardware',
    accent: 'var(--accent-violet)',
  },
  {
    number: '03',
    title: 'Manutenção & Suporte Técnico',
    shortDesc: 'Otimização e suporte de sistemas.',
    fullDesc:
      'Manutenção preventiva e corretiva, suporte técnico e otimização de sistemas. Atendimento remoto ou presencial com foco em SLA.',
    tags: ['Backup', 'Recovery', 'Performance', 'SLA', 'Remoto'],
    href: '/servicos/montagem-pc',
    accent: 'var(--accent-cyan)',
  },
];

export default function ServicosPage() {
  return (
    <div style={{ background: 'var(--page-bg)', minHeight: '100vh' }}>
      {/* Header */}
      <section style={{ padding: '80px 24px 64px', maxWidth: '1100px', margin: '0 auto' }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          style={{ marginBottom: '16px' }}
        >
          <span className="section-label">O que ofereço</span>
        </motion.div>
        <motion.h1
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          style={{
            fontSize: 'clamp(2.2rem, 5vw, 3.5rem)',
            fontWeight: 800,
            letterSpacing: '-0.03em',
            lineHeight: 1.1,
            color: 'var(--text-primary)',
            marginBottom: '20px',
          }}
        >
          Serviços
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          style={{ fontSize: '1rem', color: 'var(--text-secondary)', maxWidth: '500px', lineHeight: 1.7 }}
        >
          Soluções pensadas para entregar performance, confiabilidade e
          experiência — do código ao hardware.
        </motion.p>
      </section>

      <hr className="divider" />

      {/* Services */}
      <section style={{ maxWidth: '1100px', margin: '0 auto', padding: '64px 24px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {services.map((svc, i) => (
            <motion.div
              key={svc.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
            >
              <Link
                href={svc.href}
                className="card-glass"
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'auto 1fr auto',
                  alignItems: 'center',
                  gap: '32px',
                  padding: '32px 36px',
                  textDecoration: 'none',
                }}
              >
                {/* Number */}
                <span
                  style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: '0.7rem',
                    color: 'var(--text-muted)',
                    minWidth: '28px',
                    letterSpacing: '0.05em',
                  }}
                >
                  {svc.number}
                </span>

                {/* Content */}
                <div>
                  <h2
                    style={{
                      fontSize: 'clamp(1rem, 2vw, 1.25rem)',
                      fontWeight: 600,
                      color: 'var(--text-primary)',
                      marginBottom: '8px',
                      letterSpacing: '-0.01em',
                    }}
                  >
                    {svc.title}
                  </h2>
                  <p
                    style={{
                      fontSize: '0.875rem',
                      color: 'var(--text-secondary)',
                      lineHeight: 1.6,
                      marginBottom: '16px',
                      maxWidth: '520px',
                    }}
                  >
                    {svc.fullDesc}
                  </p>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                    {svc.tags.map((tag) => (
                      <span
                        key={tag}
                        className={`tag ${svc.accent === 'var(--accent-violet)' ? 'tag-violet' : ''}`}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Arrow */}
                <span
                  style={{
                    fontSize: '1.2rem',
                    color: svc.accent,
                    opacity: 0.6,
                    transition: 'all 0.2s',
                    flexShrink: 0,
                  }}
                >
                  →
                </span>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      <hr className="divider" />

      {/* CTA */}
      <section style={{ maxWidth: '640px', margin: '0 auto', padding: '80px 24px', textAlign: 'center' }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.5 }}
        >
          <div className="section-label" style={{ justifyContent: 'center', marginBottom: '20px' }}>
            Tem interesse?
          </div>
          <h2
            style={{
              fontSize: '1.8rem',
              fontWeight: 700,
              letterSpacing: '-0.025em',
              color: 'var(--text-primary)',
              marginBottom: '16px',
            }}
          >
            Vamos conversar sobre seu projeto
          </h2>
          <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: '36px' }}>
            Entre em contato para um orçamento sem compromisso.
            Respondo dentro de 24h.
          </p>
          <Link href="/contato" className="btn-primary">
            Falar comigo agora
          </Link>
        </motion.div>
      </section>
    </div>
  );
}
