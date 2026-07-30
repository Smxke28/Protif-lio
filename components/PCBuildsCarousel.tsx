'use client';

import { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Monitor } from 'lucide-react';

/*
 * Como adicionar uma foto de montagem:
 * 1. Salve a foto em /public/montagens/<slug>.jpg
 * 2. Adicione uma entrada no array BUILDS abaixo:
 *    { slug: 'nome-do-arquivo', caption: 'Uma legenda curta (opcional)' }
 * A seção só aparece no site quando tiver pelo menos 1 item aqui.
 */
interface Build {
  slug: string;
  caption?: string;
}

const BUILDS: Build[] = [
  // Exemplo — apague e preencha com as suas fotos reais:
  // { slug: 'build-01', caption: 'Setup para jogos competitivos' },
];

function BuildImage({ slug }: { slug: string }) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div
        style={{
          width: '100%', aspectRatio: '4 / 3', borderRadius: 'var(--radius)',
          display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '8px',
          background: 'linear-gradient(135deg, var(--accent-cyan-dim), var(--accent-violet-dim))',
        }}
      >
        <Monitor size={28} color="var(--text-muted)" />
        <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', fontFamily: "'JetBrains Mono', monospace" }}>
          Foto em breve
        </span>
      </div>
    );
  }

  // eslint-disable-next-line @next/next/no-img-element
  return (
    <img
      src={`/montagens/${slug}.jpg`}
      alt="PC montado por Juan Lavecchia"
      onError={() => setFailed(true)}
      style={{ width: '100%', aspectRatio: '4 / 3', objectFit: 'cover', borderRadius: 'var(--radius)', display: 'block' }}
    />
  );
}

function ArrowButton({ direction, onClick }: { direction: 'left' | 'right'; onClick: () => void }) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      aria-label={direction === 'left' ? 'Ver montagens anteriores' : 'Ver próximas montagens'}
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.94 }}
      style={{
        position: 'absolute',
        top: '50%',
        [direction === 'left' ? 'left' : 'right']: '-8px',
        transform: 'translateY(-50%)',
        width: '44px',
        height: '44px',
        borderRadius: '50%',
        background: 'var(--bg-card)',
        border: '1px solid var(--border-subtle)',
        boxShadow: '0 8px 24px rgba(0,0,0,0.25)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'var(--text-primary)',
        cursor: 'pointer',
        zIndex: 10,
      }}
    >
      {direction === 'left' ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
    </motion.button>
  );
}

export default function PCBuildsCarousel() {
  const scrollerRef = useRef<HTMLDivElement>(null);

  if (BUILDS.length === 0) return null;

  function scroll(dir: 1 | -1) {
    const el = scrollerRef.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>('[data-card]');
    const step = card ? card.offsetWidth + 20 : 300;
    el.scrollBy({ left: dir * step, behavior: 'smooth' });
  }

  return (
    <>
      <section style={{ maxWidth: '1100px', margin: '0 auto', padding: '64px 24px' }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.5 }}
          style={{ marginBottom: '32px' }}
        >
          <div className="section-label" style={{ marginBottom: '12px' }}>Nosso trabalho</div>
          <h2 style={{ fontSize: '1.8rem', fontWeight: 700, letterSpacing: '-0.02em', color: 'var(--text-primary)' }}>
            PCs que já montamos
          </h2>
        </motion.div>

        <div style={{ position: 'relative' }}>
          {BUILDS.length > 1 && <ArrowButton direction="left" onClick={() => scroll(-1)} />}

          <div
            ref={scrollerRef}
            className="no-scrollbar"
            style={{
              display: 'flex',
              gap: '20px',
              overflowX: 'auto',
              scrollSnapType: 'x mandatory',
              paddingBottom: '4px',
              WebkitMaskImage: 'linear-gradient(90deg, transparent 0, black 24px, black calc(100% - 24px), transparent 100%)',
              maskImage: 'linear-gradient(90deg, transparent 0, black 24px, black calc(100% - 24px), transparent 100%)',
            }}
          >
            {BUILDS.map((build, i) => (
              <motion.div
                key={build.slug}
                data-card
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06, duration: 0.4 }}
                whileHover={{ y: -4 }}
                className="card-glass"
                style={{ flex: '0 0 auto', width: 'min(300px, 78vw)', padding: '12px', scrollSnapAlign: 'start' }}
              >
                <BuildImage slug={build.slug} />
                {build.caption && (
                  <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', marginTop: '10px', paddingLeft: '4px' }}>
                    {build.caption}
                  </p>
                )}
              </motion.div>
            ))}
          </div>

          {BUILDS.length > 1 && <ArrowButton direction="right" onClick={() => scroll(1)} />}
        </div>
      </section>
      <hr className="divider" />
    </>
  );
}
