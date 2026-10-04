'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

type Demo = { id: string; label: string; url: string };

// Para trocar, adicionar ou reordenar demos, edite só esta lista.
const DEMOS: Demo[] = [
  { id: 'salao', label: 'Salão de beleza', url: 'https://site-salao-drab.vercel.app/' },
  { id: 'barbearia', label: 'Barbearia', url: 'https://site-barbearia-gilt.vercel.app/' },
  { id: 'academia', label: 'Academia', url: 'https://site-academia-six-red.vercel.app/' },
  { id: 'contabilidade', label: 'Contabilidade', url: 'https://site-contabilidade-three.vercel.app/' },
  { id: 'advocacia', label: 'Advocacia', url: 'https://site-advocacia-henna-beta.vercel.app/' },
  { id: 'estetica', label: 'Estética e odontologia', url: 'https://site-clinica-estetica-e-odontologia.vercel.app/' },
  { id: 'clinica', label: 'Clínica médica', url: 'https://clinica-medica-two-sigma.vercel.app/' },
  { id: 'mecanica', label: 'Mecânica', url: 'https://site-mecanica-eight.vercel.app/' },
  { id: 'pet', label: 'Pet', url: 'https://site-pet-nine.vercel.app/' },
];

const DESKTOP_W = 1280; // largura "virtual" do site dentro da moldura
const COMPACT_W = 820; // usada em telas estreitas, para o texto ficar legível
const RATIO = 10 / 16; // altura / largura
const SWIPE_PX = 50;
const TAP_PX = 8;

const CSS = `
.ld-tabs{display:flex;gap:8px;width:max-content;max-width:100%;margin:28px auto 0;overflow-x:auto;padding-bottom:8px;scrollbar-width:thin}
.ld-tab{flex-shrink:0;font-family:inherit;font-size:.85rem;padding:8px 16px;border-radius:999px;cursor:pointer;background:transparent;color:var(--text-secondary);border:1px solid var(--border-subtle);transition:border-color .2s,color .2s,background .2s}
.ld-tab:hover{color:var(--text-primary)}
.ld-tab[aria-selected="true"]{color:var(--accent-cyan);border-color:var(--accent-cyan);background:rgba(0,212,255,.08)}
.ld-tab:focus-visible,.ld-btn:focus-visible{outline:2px solid var(--accent-cyan);outline-offset:2px}
.ld-frame{margin-top:16px;border:1px solid var(--border-subtle);border-radius:14px;overflow:hidden;background:var(--surface-faint);box-shadow:0 24px 60px rgba(0,0,0,.25)}
.ld-bar{display:flex;align-items:center;gap:12px;padding:10px 16px;border-bottom:1px solid var(--border-subtle)}
.ld-dots{display:flex;gap:8px}
.ld-dots i{width:10px;height:10px;border-radius:50%;opacity:.8}
.ld-host{flex:1;min-width:0;text-align:center;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;font-family:'JetBrains Mono',monospace;font-size:.7rem;color:var(--text-muted)}
.ld-view{position:relative;width:100%;aspect-ratio:16/10;overflow:hidden;background:#fff}
.ld-track{display:flex;height:100%;transition:transform .5s ease-out}
.ld-slide{position:relative;height:100%;width:100%;flex-shrink:0}
.ld-load{position:absolute;inset:0;display:grid;place-items:center;padding:16px;text-align:center;font-size:.85rem;color:#475569;background:#f1f5f9}
.ld-load a{display:inline-block;margin-top:4px;color:inherit;text-decoration:underline;text-underline-offset:4px}
.ld-overlay{position:absolute;inset:0;z-index:2;cursor:pointer;touch-action:pan-y}
.ld-controls{display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;gap:12px;margin-top:16px}
.ld-group{display:flex;align-items:center;gap:8px}
.ld-btn{cursor:pointer;font-family:inherit}
.ld-count{margin-left:4px;font-size:.85rem;color:var(--text-muted)}
@media (prefers-reduced-motion:reduce){.ld-track{transition:none}}
`;

function Chevron({ dir }: { dir: 'left' | 'right' }) {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d={dir === 'left' ? 'M15 18l-6-6 6-6' : 'M9 18l6-6-6-6'} />
    </svg>
  );
}

export default function LiveDemosCarousel() {
  const [active, setActive] = useState(0);
  const [interactive, setInteractive] = useState(false);
  const [loaded, setLoaded] = useState<Record<string, boolean>>({});
  const [width, setWidth] = useState(0);
  const [inView, setInView] = useState(false);

  const sectionRef = useRef<HTMLElement>(null);
  const viewRef = useRef<HTMLDivElement>(null);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const firstRun = useRef(true);
  const startX = useRef<number | null>(null);

  const go = useCallback((i: number) => {
    setActive((i + DEMOS.length) % DEMOS.length);
    setInteractive(false);
  }, []);

  // Mede a moldura para calcular a escala do iframe.
  useEffect(() => {
    const el = viewRef.current;
    if (!el) return;
    const ro = new ResizeObserver(([entry]) => setWidth(entry.contentRect.width));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  // Só carrega os sites quando a seção chega perto da tela.
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          io.disconnect();
        }
      },
      { rootMargin: '300px' }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // Mantém a aba ativa visível na lista rolável, sem rolar a página.
  useEffect(() => {
    if (firstRun.current) {
      firstRun.current = false;
      return;
    }
    tabRefs.current[active]?.scrollIntoView({ inline: 'center', block: 'nearest', behavior: 'smooth' });
  }, [active]);

  const virtualW = width && width < 560 ? COMPACT_W : DESKTOP_W;
  const virtualH = Math.round(virtualW * RATIO);
  const scale = width ? width / virtualW : 0;
  const current = DEMOS[active];

  function onKeyDown(e: React.KeyboardEvent) {
    if (e.key === 'ArrowRight') go(active + 1);
    if (e.key === 'ArrowLeft') go(active - 1);
  }

  function onPointerUp(e: React.PointerEvent) {
    if (startX.current === null) return;
    const dx = e.clientX - startX.current;
    startX.current = null;
    if (dx <= -SWIPE_PX) go(active + 1);
    else if (dx >= SWIPE_PX) go(active - 1);
    else if (Math.abs(dx) < TAP_PX) setInteractive(true);
  }

  return (
    <section
      id="demos"
      ref={sectionRef}
      aria-labelledby="demos-title"
      onKeyDown={onKeyDown}
      style={{ maxWidth: '1200px', margin: '0 auto', padding: '32px 24px 88px' }}
    >
      <style>{CSS}</style>

      <div className="section-label" style={{ justifyContent: 'center', marginBottom: '16px' }}>
        Veja funcionando
      </div>
      <h2
        id="demos-title"
        style={{
          textAlign: 'center',
          fontSize: 'clamp(1.8rem, 3vw, 2.4rem)',
          fontWeight: 700,
          letterSpacing: '-0.02em',
          color: 'var(--text-primary)',
        }}
      >
        Sites que criei, funcionando ao vivo
      </h2>
      <p
        style={{
          maxWidth: '560px',
          margin: '12px auto 0',
          textAlign: 'center',
          fontSize: '0.95rem',
          lineHeight: 1.7,
          color: 'var(--text-secondary)',
        }}
      >
        Cada modelo foi feito para um tipo de negócio. Escolha um segmento e use o site de verdade: toque em
        Interagir para clicar e rolar dentro dele.
      </p>

      <div style={{ maxWidth: '960px', margin: '0 auto' }}>
        <div role="tablist" aria-label="Segmentos" className="ld-tabs">
          {DEMOS.map((d, i) => (
            <button
              key={d.id}
              ref={(el) => {
                tabRefs.current[i] = el;
              }}
              role="tab"
              type="button"
              aria-selected={i === active}
              className="ld-tab"
              onClick={() => go(i)}
            >
              {d.label}
            </button>
          ))}
        </div>

        <div className="ld-frame">
          <div className="ld-bar">
            <span className="ld-dots" aria-hidden="true">
              <i style={{ background: '#FF5F57' }} />
              <i style={{ background: '#FFBD2E' }} />
              <i style={{ background: '#28CA42' }} />
            </span>
            <span className="ld-host">{new URL(current.url).host}</span>
          </div>

          <div ref={viewRef} className="ld-view">
            <div className="ld-track" style={{ transform: `translateX(-${active * 100}%)` }}>
              {DEMOS.map((d, i) => {
                const isActive = i === active;
                const mounted = inView && width > 0 && Math.abs(i - active) <= 1;
                return (
                  <div key={d.id} className="ld-slide" aria-hidden={!isActive}>
                    {mounted && (
                      <iframe
                        title={`Demonstração: ${d.label}`}
                        src={d.url}
                        sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
                        referrerPolicy="no-referrer"
                        tabIndex={isActive ? 0 : -1}
                        onLoad={() => setLoaded((p) => ({ ...p, [d.id]: true }))}
                        style={{
                          position: 'absolute',
                          left: 0,
                          top: 0,
                          border: 0,
                          background: '#fff',
                          width: virtualW,
                          height: virtualH,
                          transform: `scale(${scale})`,
                          transformOrigin: 'top left',
                          pointerEvents: isActive && interactive ? 'auto' : 'none',
                        }}
                      />
                    )}

                    {!loaded[d.id] && (
                      <div className="ld-load">
                        <div>
                          <p>Carregando {d.label}…</p>
                          <a href={d.url} target="_blank" rel="noopener noreferrer">
                            Demorando? Abra em nova aba
                          </a>
                        </div>
                      </div>
                    )}

                    {isActive && !interactive && loaded[d.id] && (
                      <div
                        className="ld-overlay"
                        title="Toque para interagir, arraste para trocar de site"
                        onPointerDown={(e) => {
                          startX.current = e.clientX;
                        }}
                        onPointerUp={onPointerUp}
                        onPointerCancel={() => {
                          startX.current = null;
                        }}
                      />
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div className="ld-controls">
          <div className="ld-group">
            <button type="button" className="btn-secondary ld-btn" onClick={() => go(active - 1)} aria-label="Site anterior">
              <Chevron dir="left" />
            </button>
            <button type="button" className="btn-secondary ld-btn" onClick={() => go(active + 1)} aria-label="Próximo site">
              <Chevron dir="right" />
            </button>
            <span className="ld-count">
              {active + 1} de {DEMOS.length}
            </span>
          </div>

          <div className="ld-group">
            <button
              type="button"
              className="btn-secondary ld-btn"
              aria-pressed={interactive}
              onClick={() => setInteractive((v) => !v)}
              style={interactive ? { borderColor: 'var(--accent-violet)', color: 'var(--accent-violet)' } : undefined}
            >
              {interactive ? 'Voltar a deslizar' : 'Interagir'}
            </button>
            <a href={current.url} target="_blank" rel="noopener noreferrer" className="btn-secondary ld-btn">
              Abrir em nova aba
            </a>
          </div>
        </div>
      </div>

      <p
        aria-live="polite"
        style={{ position: 'absolute', width: 1, height: 1, overflow: 'hidden', clip: 'rect(0 0 0 0)', whiteSpace: 'nowrap' }}
      >
        {current.label}, {active + 1} de {DEMOS.length}
      </p>
    </section>
  );
}
