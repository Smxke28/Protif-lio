'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import WebThemesGallery from '@/components/WebThemesGallery';

const features = [
  { title: 'Performance', desc: 'Lighthouse 95+, otimização de imagens, lazy loading e cache inteligente.' },
  { title: 'SEO On-page', desc: 'Meta tags, Open Graph, sitemap, robots.txt e estrutura semântica.' },
  { title: 'Responsividade', desc: 'Design mobile-first que funciona em qualquer dispositivo ou tela.' },
  { title: 'Acessibilidade', desc: 'WCAG, ARIA e navegação por teclado inclusos desde o início.' },
  { title: 'Deploy & CI/CD', desc: 'Entrega automática via Vercel com preview por branch.' },
  { title: 'TypeScript', desc: 'Código tipado, manutenível e escalável desde o primeiro commit.' },
];

export default function DesenvolvimentoWebPage() {
  return (
    <div style={{ background: 'linear-gradient(180deg, #0A0A0F 0%, #0D0D1A 100%)', minHeight: '100vh' }}>
      <section style={{ padding: '80px 24px 64px', maxWidth: '1100px', margin: '0 auto' }}>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} style={{ marginBottom: '12px' }}>
          <Link href="/servicos" style={{ fontSize: '0.8rem', color: '#555577', fontFamily: "'JetBrains Mono', monospace", textDecoration: 'none' }}>
            ← Serviços
          </Link>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05, duration: 0.5 }} style={{ marginBottom: '16px' }}>
          <span className="section-label">Serviço 01</span>
        </motion.div>
        <motion.h1
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1, duration: 0.5 }}
          style={{ fontSize: 'clamp(2rem, 5vw, 3.2rem)', fontWeight: 800, letterSpacing: '-0.03em', color: '#F0F0FF', marginBottom: '20px' }}
        >
          Desenvolvimento Web
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15, duration: 0.5 }}
          style={{ fontSize: '1rem', color: '#8888AA', maxWidth: '520px', lineHeight: 1.7, marginBottom: '40px' }}
        >
          Sites e aplicações modernas construídas com Next.js e TypeScript.
          Foco em performance, SEO e uma experiência de usuário impecável.
        </motion.p>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.5 }}>
          <Link href="/contato" className="btn-primary">Solicitar orçamento →</Link>
        </motion.div>
      </section>

      <hr className="divider" />

      <section style={{ maxWidth: '1100px', margin: '0 auto', padding: '64px 24px 96px' }}>
        <div style={{ marginBottom: '48px' }}>
          <div className="section-label" style={{ marginBottom: '12px' }}>O que está incluído</div>
          <h2 style={{ fontSize: '1.6rem', fontWeight: 700, letterSpacing: '-0.02em', color: '#F0F0FF' }}>
            Diferenciais
          </h2>
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
                <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#00D4FF', flexShrink: 0 }} />
                <h3 style={{ fontSize: '0.95rem', fontWeight: 600, color: '#F0F0FF' }}>{f.title}</h3>
              </div>
              <p style={{ fontSize: '0.85rem', color: '#8888AA', lineHeight: 1.6 }}>{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <hr className="divider" />

      <section style={{ maxWidth: '1100px', margin: '0 auto', padding: '64px 24px 96px' }}>
        <div style={{ marginBottom: '48px' }}>
          <div className="section-label" style={{ marginBottom: '12px' }}>Exemplos</div>
          <h2 style={{ fontSize: '1.6rem', fontWeight: 700, letterSpacing: '-0.02em', color: '#F0F0FF', marginBottom: '12px' }}>
            Temas de sites
          </h2>
          <p style={{ fontSize: '0.9rem', color: '#8888AA', maxWidth: '520px', lineHeight: 1.6 }}>
            Passe o mouse em cada categoria pra ver um exemplo visual.
          </p>
        </div>
        <WebThemesGallery />
      </section>
    </div>
  );
}
