'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import GitHubStats from '../components/GitHubStats';
import FeedbackSection from '../components/FeedbackSection';
import { motion, Variants } from 'framer-motion';

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { 
      duration: 0.5, 
      delay: i * 0.1, 
      ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number] 
    },
  }),
};

const ROLES = [
  'Bem Vindos, Meu nome é Juan',
  'Desenvolvedor Web',
  'Consultor em TI',
  'Formado em Ciência da Computação',
];

function TypingRole() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayed, setDisplayed] = useState('');
  const [phase, setPhase] = useState<'typing' | 'pause' | 'erasing'>('typing');

  useEffect(() => {
    const current = ROLES[roleIndex];
    let timeout: ReturnType<typeof setTimeout>;

    if (phase === 'typing') {
      if (displayed.length < current.length) {
        timeout = setTimeout(() => setDisplayed(current.slice(0, displayed.length + 1)), 60);
      } else {
        timeout = setTimeout(() => setPhase('pause'), 1800);
      }
    } else if (phase === 'pause') {
      timeout = setTimeout(() => setPhase('erasing'), 200);
    } else {
      if (displayed.length > 0) {
        timeout = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 35);
      } else {
        setRoleIndex((i) => (i + 1) % ROLES.length);
        setPhase('typing');
      }
    }

    return () => clearTimeout(timeout);
  }, [displayed, phase, roleIndex]);

  return (
    <span style={{ color: '#00D4FF', position: 'relative' }}>
      {displayed}
      <span className="cursor-blink" />
    </span>
  );
}

const services = [
  {
    icon: '⬡',
    title: 'Desenvolvimento Web',
    desc: 'Sites modernos, rápidos e responsivos com foco em SEO e experiência do usuário. De landing pages a dashboards completos.',
    tags: ['Next.js', 'TypeScript', 'Tailwind', 'SEO'],
    href: '/servicos/desenvolvimento-web',
    accent: '#00D4FF',
  },
  {
    icon: '⬡',
    title: 'Consultoria de Hardware',
    desc: 'Orientação especializada na escolha de componentes com foco em compatibilidade, performance e custo-benefício.',
    tags: ['Montagem', 'Upgrades', 'Gamers', 'Workstations'],
    href: '/servicos/consultoria-hardware',
    accent: '#7C3AED',
  },
  {
    icon: '⬡',
    title: 'Manutenção & Suporte',
    desc: 'Suporte técnico, manutenção preventiva e otimização de sistemas. Atendimento remoto ou presencial.',
    tags: ['Backup', 'Performance', 'Recovery', 'SLA'],
    href: '/servicos/montagem-pc',
    accent: '#00D4FF',
  },
];

export default function Home() {
  return (
    <div
      style={{
        background: 'linear-gradient(180deg, #0A0A0F 0%, #0D0D1A 100%)',
        minHeight: '100vh',
      }}
    >
      {/* ── HERO ── */}
      <section
        className="grid-bg"
        style={{
          paddingTop: '120px',
          paddingBottom: '96px',
          paddingLeft: '24px',
          paddingRight: '24px',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Glow blobs */}
        <div
          style={{
            position: 'absolute',
            top: '-80px',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '600px',
            height: '400px',
            background: 'radial-gradient(ellipse, rgba(0,212,255,0.07) 0%, transparent 70%)',
            pointerEvents: 'none',
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: '0',
            right: '-100px',
            width: '400px',
            height: '400px',
            background: 'radial-gradient(ellipse, rgba(124,58,237,0.06) 0%, transparent 70%)',
            pointerEvents: 'none',
          }}
        />

        <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center', position: 'relative', zIndex: 1 }}>
          <motion.div
            initial="hidden"
            animate="show"
            custom={0}
            variants={fadeUp}
            style={{ marginBottom: '24px' }}
          >
            <span className="section-label" style={{ justifyContent: 'center' }}>
              Portfólio · 2025
            </span>
          </motion.div>

          <motion.h1
            initial="hidden"
            animate="show"
            custom={1}
            variants={fadeUp}
            style={{
              fontSize: 'clamp(2.5rem, 6vw, 4.5rem)',
              fontWeight: 800,
              letterSpacing: '-0.03em',
              lineHeight: 1.1,
              marginBottom: '20px',
              color: '#F0F0FF',
            }}
          >
            Desenvolvedor {' '}
            <span className="text-gradient-main">Full-Stack</span>
          </motion.h1>

          <motion.p
            initial="hidden"
            animate="show"
            custom={2}
            variants={fadeUp}
            style={{
              fontSize: 'clamp(1.1rem, 2.5vw, 1.4rem)',
              fontWeight: 300,
              color: '#8888AA',
              marginBottom: '16px',
              minHeight: '2rem',
            }}
          >
            <TypingRole />
          </motion.p>

          <motion.p
            initial="hidden"
            animate="show"
            custom={3}
            variants={fadeUp}
            style={{
              fontSize: '1rem',
              color: '#555577',
              maxWidth: '520px',
              margin: '0 auto 48px',
              lineHeight: 1.7,
            }}
          >
            Transformo ideias em produtos digitais funcionais, rápidos e bem construídos.
            Localizado em Juiz de Fora — MG.
          </motion.p>

          <motion.div
            initial="hidden"
            animate="show"
            custom={4}
            variants={fadeUp}
            style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}
          >
            <Link href="/servicos" className="btn-primary">
              Ver serviços
              <span style={{ fontSize: '0.9rem' }}>→</span>
            </Link>
            <Link href="/projetos" className="btn-secondary">
              Meus projetos
            </Link>
          </motion.div>
        </div>

        {/* Terminal card */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.6 }}
          style={{
            maxWidth: '480px',
            margin: '64px auto 0',
            background: '#0F0F1A',
            border: '1px solid rgba(255,255,255,0.07)',
            borderRadius: '14px',
            overflow: 'hidden',
            boxShadow: '0 24px 60px rgba(0,0,0,0.4)',
          }}
        >
          <div
            style={{
              padding: '10px 16px',
              background: 'rgba(255,255,255,0.03)',
              borderBottom: '1px solid rgba(255,255,255,0.05)',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
            }}
          >
            {['#FF5F57', '#FFBD2E', '#28CA42'].map((c, i) => (
              <div
                key={i}
                style={{ width: '10px', height: '10px', borderRadius: '50%', background: c, opacity: 0.8 }}
              />
            ))}
            <span
              style={{
                flex: 1,
                textAlign: 'center',
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: '0.7rem',
                color: '#555577',
              }}
            >
              juan@portfolio ~ bash
            </span>
          </div>
          <div style={{ padding: '20px 20px', fontFamily: "'JetBrains Mono', monospace", fontSize: '0.82rem', lineHeight: 1.9 }}>
            <div>
              <span style={{ color: '#00D4FF' }}>juan</span>
              <span style={{ color: '#555577' }}>@dev</span>
              <span style={{ color: '#F0F0FF' }}> ~ </span>
              <span style={{ color: '#A855F7' }}>$</span>
              <span style={{ color: '#F0F0FF' }}> whoami</span>
            </div>
            <div style={{ color: '#8888AA', marginBottom: '8px' }}>Juan Lavecchia — Dev Web & Consultor TI</div>
            <div>
              <span style={{ color: '#00D4FF' }}>juan</span>
              <span style={{ color: '#555577' }}>@dev</span>
              <span style={{ color: '#F0F0FF' }}> ~ </span>
              <span style={{ color: '#A855F7' }}>$</span>
              <span style={{ color: '#F0F0FF' }}> stack --list</span>
            </div>
            <div style={{ color: '#8888AA', marginBottom: '8px' }}>Next.js · TypeScript · Tailwind · Node.js</div>
            <div>
              <span style={{ color: '#00D4FF' }}>juan</span>
              <span style={{ color: '#555577' }}>@dev</span>
              <span style={{ color: '#F0F0FF' }}> ~ </span>
              <span style={{ color: '#A855F7' }}>$</span>
              <span style={{ color: '#F0F0FF' }}> status</span>
            </div>
            <div style={{ color: '#28CA42' }}>✔ Disponível para novos projetos</div>
            <div style={{ marginTop: '4px' }}>
              <span style={{ color: '#A855F7' }}>$</span>
              <span className="cursor-blink" />
            </div>
          </div>
        </motion.div>
      </section>

      {/* ── SERVIÇOS ── */}
      <section style={{ maxWidth: '1200px', margin: '0 auto', padding: '96px 24px' }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          style={{ marginBottom: '64px' }}
        >
          <div className="section-label" style={{ marginBottom: '16px' }}>
            O que faço
          </div>
          <h2
            style={{
              fontSize: 'clamp(1.8rem, 3vw, 2.4rem)',
              fontWeight: 700,
              letterSpacing: '-0.02em',
              color: '#F0F0FF',
            }}
          >
            Serviços
          </h2>
        </motion.div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '20px',
          }}
        >
          {services.map((svc, i) => (
            <motion.div
              key={svc.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
            >
              <Link
                href={svc.href}
                className="card-glass"
                style={{
                  display: 'block',
                  padding: '32px',
                  textDecoration: 'none',
                  height: '100%',
                }}
              >
                <div
                  style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '10px',
                    background: `rgba(${svc.accent === '#00D4FF' ? '0,212,255' : '124,58,237'},0.1)`,
                    border: `1px solid rgba(${svc.accent === '#00D4FF' ? '0,212,255' : '124,58,237'},0.2)`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '1.2rem',
                    marginBottom: '20px',
                    color: svc.accent,
                  }}
                >
                  {svc.icon}
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
                  {svc.title}
                </h3>
                <p
                  style={{
                    fontSize: '0.875rem',
                    color: '#8888AA',
                    lineHeight: 1.7,
                    marginBottom: '20px',
                  }}
                >
                  {svc.desc}
                </p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '24px' }}>
                  {svc.tags.map((tag) => (
                    <span key={tag} className={`tag ${svc.accent === '#7C3AED' ? 'tag-violet' : ''}`}>
                      {tag}
                    </span>
                  ))}
                </div>
                <span
                  style={{
                    fontSize: '0.8rem',
                    fontWeight: 500,
                    color: svc.accent,
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                  }}
                >
                  Ver serviço →
                </span>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      <hr className="divider" />

      {/* ── PROJETOS & GITHUB ── */}
      <section style={{ maxWidth: '1200px', margin: '0 auto', padding: '96px 24px' }}>
        <GitHubStats username="Smxke28" />
      </section>

      <hr className="divider" />
      
      {/* ── FEEDBACK ── */}
      <FeedbackSection initialFeedbacks={[]}/>

      <hr className="divider" />

      {/* ── CTA ── */}
      <section style={{ maxWidth: '700px', margin: '0 auto', padding: '96px 24px', textAlign: 'center' }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="section-label" style={{ justifyContent: 'center', marginBottom: '20px' }}>
            Vamos trabalhar juntos
          </div>
          <h2
            style={{
              fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)',
              fontWeight: 700,
              letterSpacing: '-0.025em',
              color: '#F0F0FF',
              marginBottom: '16px',
            }}
          >
            Tem um projeto em mente?
          </h2>
          <p style={{ fontSize: '1rem', color: '#8888AA', lineHeight: 1.7, marginBottom: '40px' }}>
            Estou disponível para novos projetos e consultorias. Entre em contato e vamos conversar.
          </p>
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/contato" className="btn-primary">
              Solicitar orçamento
            </Link>
            <a
              href="https://github.com/Smxke28"
              target="_blank"
              rel="noreferrer"
              className="btn-secondary"
            >
              Ver GitHub
            </a>
          </div>
        </motion.div>
      </section>
    </div>
  );
}