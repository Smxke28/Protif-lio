'use client';

import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/*
 * Como adicionar os prints depois:
 * 1. Tire o screenshot do site (recomendado: 1280x800 ou proporção 16:10)
 * 2. Salve em /public/site-previews/<slug>.jpg  (slug = campo "slug" abaixo)
 * 3. Pronto — a imagem aparece automaticamente no hover.
 *    Enquanto o arquivo não existir, o card mostra um placeholder
 *    estilizado no lugar (sem quebrar o layout).
 */
interface Theme {
  slug: string;
  title: string;
  desc: string;
  tags: string[];
}

const THEMES: Theme[] = [
  { slug: 'institucional', title: 'Institucional', desc: 'Sites de apresentação para empresas e profissionais liberais.', tags: ['One-page', 'SEO local'] },
  { slug: 'ecommerce', title: 'E-commerce', desc: 'Loja virtual com catálogo, carrinho e checkout.', tags: ['Pagamentos', 'Catálogo'] },
  { slug: 'landing-page', title: 'Landing Page', desc: 'Página focada em conversão para um produto ou campanha.', tags: ['Alta conversão', 'A/B ready'] },
  { slug: 'portfolio', title: 'Portfólio', desc: 'Vitrine visual de projetos para criativos e devs.', tags: ['Galeria', 'Minimalista'] },
  { slug: 'blog', title: 'Blog', desc: 'Publicação de conteúdo com categorias e busca.', tags: ['CMS', 'SEO'] },
  { slug: 'saas-dashboard', title: 'SaaS / Dashboard', desc: 'Painel de aplicação web com login e dados dinâmicos.', tags: ['Auth', 'Gráficos'] },
];

const PREVIEW_W = 320;
const PREVIEW_H = 200;

function PreviewImage({ slug, title }: { slug: string; title: string }) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '8px',
          background: 'linear-gradient(135deg, rgba(0,212,255,0.12), rgba(168,85,247,0.12))',
        }}
      >
        <span style={{ fontSize: '1.6rem' }}>🖼️</span>
        <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', fontFamily: "'JetBrains Mono', monospace" }}>
          Preview em breve
        </span>
      </div>
    );
  }

  // eslint-disable-next-line @next/next/no-img-element
  return (
    <img
      src={`/site-previews/${slug}.jpg`}
      alt={`Exemplo de site — ${title}`}
      onError={() => setFailed(true)}
      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
    />
  );
}

export default function WebThemesGallery() {
  const [hovered, setHovered] = useState<Theme | null>(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  function handleMouseMove(e: React.MouseEvent) {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    setPos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  }

  return (
    <div ref={containerRef} style={{ position: 'relative' }} onMouseMove={handleMouseMove}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '16px' }}>
        {THEMES.map((theme, i) => (
          <motion.div
            key={theme.slug}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.06, duration: 0.4 }}
            onMouseEnter={() => setHovered(theme)}
            onMouseLeave={() => setHovered(null)}
            className="card-glass"
            style={{
              padding: '20px',
              cursor: 'default',
              borderColor: hovered?.slug === theme.slug ? 'var(--accent-cyan)' : undefined,
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
              <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#00D4FF', flexShrink: 0 }} />
              <h3 style={{ fontSize: '0.95rem', fontWeight: 600, color: 'var(--text-primary)' }}>{theme.title}</h3>
            </div>
            <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '12px' }}>
              {theme.desc}
            </p>
            <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
              {theme.tags.map((t) => (
                <span key={t} className="tag">{t}</span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Preview flutuante — segue o cursor dentro da galeria (desktop) */}
      <AnimatePresence>
        {hovered && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            style={{
              position: 'absolute',
              left: Math.min(pos.x + 20, (containerRef.current?.clientWidth || 9999) - PREVIEW_W - 8),
              top: pos.y - PREVIEW_H - 20 > 0 ? pos.y - PREVIEW_H - 20 : pos.y + 24,
              width: PREVIEW_W,
              height: PREVIEW_H,
              borderRadius: 'var(--radius)',
              overflow: 'hidden',
              border: '1px solid var(--accent-cyan)',
              boxShadow: '0 20px 50px rgba(0,0,0,0.5)',
              pointerEvents: 'none',
              zIndex: 50,
            }}
            className="hidden md:block"
          >
            <PreviewImage slug={hovered.slug} title={hovered.title} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
