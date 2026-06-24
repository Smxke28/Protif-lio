'use client';

import Link from 'next/link';
import { motion, Variants } from 'framer-motion';
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { 
      duration: 0.5, 
      delay: i * 0.1, 
      ease: [0.25, 0.1, 0.25, 1] as const // <── O segredo está aqui!
    },
  }),
};

const skills = [
  { name: 'Next.js', level: 85, group: 'Frontend' },
  { name: 'React', level: 88, group: 'Frontend' },
  { name: 'TypeScript', level: 80, group: 'Frontend' },
  { name: 'Tailwind CSS', level: 90, group: 'Frontend' },
  { name: 'Node.js', level: 72, group: 'Backend' },
  { name: 'MySQL / PostgreSQL', level: 68, group: 'Backend' },
  { name: 'Git & GitHub', level: 85, group: 'Ferramentas' },
  { name: 'Linux', level: 70, group: 'Ferramentas' },
  { name: 'Montagem de PCs', level: 92, group: 'Hardware' },
  { name: 'Diagnóstico & Suporte', level: 88, group: 'Hardware' },
];

const groups = ['Frontend', 'Backend', 'Ferramentas', 'Hardware'];

export default function SobrePage() {
  return (
    <div style={{ background: 'linear-gradient(180deg, #0A0A0F 0%, #0D0D1A 100%)', minHeight: '100vh' }}>
      {/* Header */}
      <section style={{ padding: '80px 24px 64px', maxWidth: '1100px', margin: '0 auto' }}>
        <motion.div initial="hidden" animate="show" custom={0} variants={fadeUp} style={{ marginBottom: '16px' }}>
          <span className="section-label">Sobre</span>
        </motion.div>
        <motion.h1
          initial="hidden" animate="show" custom={1} variants={fadeUp}
          style={{
            fontSize: 'clamp(2.2rem, 5vw, 3.5rem)',
            fontWeight: 800,
            letterSpacing: '-0.03em',
            lineHeight: 1.1,
            color: '#F0F0FF',
            marginBottom: '20px',
          }}
        >
          Quem sou eu
        </motion.h1>
        <motion.p
          initial="hidden" animate="show" custom={2} variants={fadeUp}
          style={{ fontSize: '1.05rem', color: '#8888AA', maxWidth: '520px', lineHeight: 1.7 }}
        >
          Desenvolvedor web, consultor em TI e estudante de Ciências da Computação
          com paixão por construir produtos digitais que funcionam de verdade.
        </motion.p>
      </section>

      <hr className="divider" />

      {/* Bio + Info */}
      <section style={{ maxWidth: '1100px', margin: '0 auto', padding: '64px 24px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
          {/* Bio */}
          <motion.div
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.5 }}
            className="card-glass" style={{ padding: '36px' }}
          >
            <h2 style={{ fontSize: '1.1rem', fontWeight: 600, color: '#F0F0FF', marginBottom: '20px' }}>
              Apresentação
            </h2>
            <p style={{ fontSize: '0.9rem', color: '#8888AA', lineHeight: 1.8, marginBottom: '16px' }}>
              Olá — sou <strong style={{ color: '#F0F0FF' }}>Juan Lavecchia Coelho da Silva</strong>.
              Este portfólio foi criado como um espaço de desenvolvimento e aprendizado na área de programação.
            </p>
            <p style={{ fontSize: '0.9rem', color: '#8888AA', lineHeight: 1.8 }}>
              Aqui reúno projetos, experimentos e estudos que refletem minha evolução em tecnologias web
              modernas e boas práticas de desenvolvimento.
            </p>
          </motion.div>

          {/* Formação */}
          <motion.div
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.1 }}
            className="card-glass" style={{ padding: '36px' }}
          >
            <h2 style={{ fontSize: '1.1rem', fontWeight: 600, color: '#F0F0FF', marginBottom: '20px' }}>
              Formação
            </h2>
            <div
              style={{
                padding: '20px',
                background: 'rgba(0,212,255,0.04)',
                border: '1px solid rgba(0,212,255,0.1)',
                borderRadius: '12px',
                marginBottom: '16px',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                <span
                  style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: '0.65rem',
                    color: '#00D4FF',
                    background: 'rgba(0,212,255,0.1)',
                    padding: '2px 8px',
                    borderRadius: '4px',
                    textTransform: 'uppercase',
                    letterSpacing: '0.08em',
                  }}
                >
                  Cursando
                </span>
              </div>
              <p style={{ fontSize: '0.95rem', fontWeight: 600, color: '#F0F0FF', marginBottom: '4px' }}>
                Bacharelado em Ciências da Computação
              </p>
              <p style={{ fontSize: '0.8rem', color: '#8888AA' }}>
                Universidade Estácio de Sá — Juiz de Fora, MG
              </p>
              <p style={{ fontSize: '0.75rem', color: '#555577', marginTop: '4px', fontFamily: "'JetBrains Mono', monospace" }}>
                8º período
              </p>
            </div>
            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              {[
                { label: 'Localização', value: 'Juiz de Fora, MG' },
                { label: 'Status', value: '🟢 Disponível' },
              ].map((item) => (
                <div
                  key={item.label}
                  style={{
                    padding: '10px 14px',
                    background: 'rgba(255,255,255,0.03)',
                    border: '1px solid rgba(255,255,255,0.06)',
                    borderRadius: '8px',
                    flex: 1,
                    minWidth: '120px',
                  }}
                >
                  <div style={{ fontSize: '0.65rem', color: '#555577', fontFamily: "'JetBrains Mono', monospace", marginBottom: '4px', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                    {item.label}
                  </div>
                  <div style={{ fontSize: '0.85rem', color: '#F0F0FF', fontWeight: 500 }}>{item.value}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <hr className="divider" />

      {/* Skills */}
      <section style={{ maxWidth: '1100px', margin: '0 auto', padding: '64px 24px' }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.5 }}
          style={{ marginBottom: '48px' }}
        >
          <div className="section-label" style={{ marginBottom: '12px' }}>Competências</div>
          <h2 style={{ fontSize: '1.8rem', fontWeight: 700, letterSpacing: '-0.02em', color: '#F0F0FF' }}>
            Habilidades
          </h2>
        </motion.div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>
          {groups.map((group, gi) => (
            <motion.div
              key={group}
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ delay: gi * 0.1, duration: 0.5 }}
              className="card-glass" style={{ padding: '28px' }}
            >
              <h3
                style={{
                  fontSize: '0.75rem',
                  fontFamily: "'JetBrains Mono', monospace",
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em',
                  color: '#00D4FF',
                  marginBottom: '20px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                }}
              >
                <span style={{ width: '16px', height: '1px', background: '#00D4FF', display: 'inline-block' }} />
                {group}
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {skills.filter((s) => s.group === group).map((skill) => (
                  <div key={skill.name}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                      <span style={{ fontSize: '0.85rem', color: '#F0F0FF', fontWeight: 500 }}>{skill.name}</span>
                      <span style={{ fontSize: '0.7rem', fontFamily: "'JetBrains Mono', monospace", color: '#555577' }}>
                        {skill.level}%
                      </span>
                    </div>
                    <div className="skill-bar-track">
                      <motion.div
                        className="skill-bar-fill"
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, ease: 'easeOut', delay: gi * 0.05 }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      <hr className="divider" />

      {/* CTA */}
      <section style={{ maxWidth: '600px', margin: '0 auto', padding: '80px 24px', textAlign: 'center' }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.5 }}
        >
          <p style={{ fontSize: '0.9rem', color: '#8888AA', marginBottom: '32px', lineHeight: 1.7 }}>
            Quer conversar sobre um projeto, parceria ou oportunidade?
          </p>
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <a
              href="https://www.linkedin.com/in/juan-lavecchia-8b3b5131a/"
              target="_blank" rel="noopener noreferrer"
              className="btn-primary"
            >
              LinkedIn
            </a>
            <Link href="/contato" className="btn-secondary">
              Página de contato
            </Link>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
