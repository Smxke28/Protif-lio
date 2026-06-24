'use client';

import { motion } from 'framer-motion';

const projects = [
  {
    title: 'Projeto CS2',
    desc: 'Plataforma dedicada à comunidade Counter-Strike 2, reunindo ferramentas, conteúdo e recursos táticos para jogadores.',
    tags: ['Next.js', 'Vercel', 'SEO', 'UI Moderna'],
    link: 'https://sitecs2.vercel.app/',
    status: 'live',
    year: '2024',
    category: 'Web App',
  },
  {
    title: 'Calculadora Math — Java',
    desc: 'Demonstração de funções matemáticas e conceitos de programação orientada a objetos em Java, hospedado na Vercel.',
    tags: ['Java', 'Vercel', 'Didático', 'OOP'],
    link: 'https://funcoes-java-pg5ixris4-smxke28s-projects.vercel.app/',
    status: 'live',
    year: '2024',
    category: 'Educacional',
  },
  {
    title: 'Portfólio Pessoal',
    desc: 'Este próprio site — construído com Next.js, TypeScript e Tailwind CSS. Deploy automático via Vercel.',
    tags: ['Next.js', 'TypeScript', 'Tailwind', 'Vercel'],
    link: undefined,
    status: 'live',
    year: '2025',
    category: 'Portfólio',
  },
  {
    title: 'Dashboard em Tempo Real',
    desc: 'Visualização de dados com consumo contínuo de APIs, gráficos interativos e atualizações ao vivo.',
    tags: ['React', 'API', 'Charts', 'WebSocket'],
    link: undefined,
    status: 'wip',
    year: '2025',
    category: 'Web App',
  },
];

export default function ProjetosPage() {
  return (
    <div style={{ background: 'linear-gradient(180deg, #0A0A0F 0%, #0D0D1A 100%)', minHeight: '100vh' }}>
      {/* Header */}
      <section style={{ padding: '80px 24px 64px', maxWidth: '1100px', margin: '0 auto' }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          style={{ marginBottom: '16px' }}
        >
          <span className="section-label">Trabalhos</span>
        </motion.div>
        <motion.h1
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          style={{
            fontSize: 'clamp(2.2rem, 5vw, 3.5rem)',
            fontWeight: 800,
            letterSpacing: '-0.03em',
            lineHeight: 1.1,
            color: '#F0F0FF',
            marginBottom: '20px',
          }}
        >
          Projetos
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          style={{ fontSize: '1rem', color: '#8888AA', maxWidth: '480px', lineHeight: 1.7 }}
        >
          Alguns projetos em que trabalhei — do pessoal ao profissional,
          todos construídos com atenção à qualidade.
        </motion.p>
      </section>

      <hr className="divider" />

      {/* Projects grid */}
      <section style={{ maxWidth: '1100px', margin: '0 auto', padding: '64px 24px 96px' }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
            gap: '20px',
          }}
        >
          {projects.map((proj, i) => (
            <motion.div
              key={proj.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.5 }}
            >
              <div
                className="card-glass"
                style={{
                  padding: '28px',
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                {/* Header row */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
                  <span
                    style={{
                      fontSize: '0.65rem',
                      fontFamily: "'JetBrains Mono', monospace",
                      color: '#555577',
                      textTransform: 'uppercase',
                      letterSpacing: '0.08em',
                    }}
                  >
                    {proj.category} · {proj.year}
                  </span>
                  <span
                    style={{
                      fontSize: '0.65rem',
                      fontFamily: "'JetBrains Mono', monospace",
                      padding: '3px 8px',
                      borderRadius: '20px',
                      background: proj.status === 'live' ? 'rgba(40,202,66,0.1)' : 'rgba(255,189,46,0.1)',
                      color: proj.status === 'live' ? '#28CA42' : '#FFBD2E',
                      border: `1px solid ${proj.status === 'live' ? 'rgba(40,202,66,0.2)' : 'rgba(255,189,46,0.2)'}`,
                      textTransform: 'uppercase',
                      letterSpacing: '0.05em',
                    }}
                  >
                    {proj.status === 'live' ? '● live' : '◐ wip'}
                  </span>
                </div>

                <h3
                  style={{
                    fontSize: '1.05rem',
                    fontWeight: 600,
                    color: '#F0F0FF',
                    marginBottom: '12px',
                    letterSpacing: '-0.01em',
                  }}
                >
                  {proj.title}
                </h3>
                <p
                  style={{
                    fontSize: '0.85rem',
                    color: '#8888AA',
                    lineHeight: 1.7,
                    marginBottom: '20px',
                    flex: 1,
                  }}
                >
                  {proj.desc}
                </p>

                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '20px' }}>
                  {proj.tags.map((tag) => (
                    <span key={tag} className="tag">{tag}</span>
                  ))}
                </div>

                {proj.link ? (
                  <a
                    href={proj.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-secondary"
                    style={{ fontSize: '0.8rem', padding: '9px 16px', justifyContent: 'center' }}
                  >
                    Acessar projeto →
                  </a>
                ) : proj.status === 'wip' ? (
                  <div
                    style={{
                      padding: '9px 16px',
                      borderRadius: '10px',
                      background: 'rgba(255,189,46,0.05)',
                      border: '1px solid rgba(255,189,46,0.1)',
                      textAlign: 'center',
                      fontSize: '0.78rem',
                      fontFamily: "'JetBrains Mono', monospace",
                      color: '#FFBD2E',
                    }}
                  >
                    Em desenvolvimento...
                  </div>
                ) : null}
              </div>
            </motion.div>
          ))}
        </div>

        {/* More projects teaser */}
        <motion.div
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
          viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.3 }}
          style={{ marginTop: '48px', textAlign: 'center' }}
        >
          <p style={{ fontSize: '0.85rem', color: '#555577', marginBottom: '16px', fontFamily: "'JetBrains Mono', monospace" }}>
            // mais projetos em breve
          </p>
          <a
            href="https://github.com/Smxke28"
            target="_blank"
            rel="noreferrer"
            className="btn-secondary"
            style={{ fontSize: '0.85rem' }}
          >
            Ver repositórios no GitHub →
          </a>
        </motion.div>
      </section>
    </div>
  );
}
