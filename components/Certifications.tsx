'use client';

import { motion } from 'framer-motion';
import { Award, ExternalLink, Loader2, FileClock } from 'lucide-react';

/*
 * Como adicionar um certificado novo:
 * 1. Salve o PDF em /public/certificados/<slug>.pdf
 * 2. Adicione uma entrada no array CERTIFICATIONS abaixo com esse slug.
 *    Se ainda não tiver o PDF em mãos, deixe `slug: undefined` — o card
 *    aparece normalmente, só sem o link "Ver certificado".
 *
 * Pra listar o que você está cursando agora, adicione no array IN_PROGRESS.
 */
interface Certification {
  slug?: string;
  title: string;
  issuer: string;
  date?: string;
}

const CERTIFICATIONS: Certification[] = [
  { slug: 'google-ai', title: 'Google AI — Professional Certificate', issuer: 'Google (via Coursera)', date: 'Julho 2026' },
  { slug: 'solucoes-ia-github', title: 'Soluções de IA no GitHub', issuer: 'Fundação Bradesco (Escola Virtual) + Microsoft', date: 'Junho 2026' },
  { slug: 'python-cloud-iot-bigdata', title: 'Desenvolvimento Rápido de Aplicações em Python para Cloud, IoT e BigData', issuer: 'Universidade Estácio de Sá', date: 'Dezembro 2025' },
{ slug: 'python-fundacao-bradesco', title: 'Linguagem de Programação Python', issuer: 'Fundação Bradesco' },
  { slug: 'analise-problemas-complexos', title: 'Análise e Solução de Problemas Complexos', issuer: 'Universidade Estácio de Sá', date: 'Dezembro 2024' },
  { slug: 'algoritmos-eficientes', title: 'Concepção de Algoritmos Eficientes, Estáveis e Escaláveis', issuer: 'Universidade Estácio de Sá', date: 'Dezembro 2024' },
  { slug: 'programacao-sistemas-informacao', title: 'Programação de Sistemas de Informação', issuer: 'Universidade Estácio de Sá', date: 'Junho 2024' },
  { slug: 'gerencia-informacoes', title: 'Gerência, Organização e Recuperação das Informações', issuer: 'Universidade Estácio de Sá', date: 'Dezembro 2023' },
  { slug: 'programacao-internet', title: 'Programação para Internet', issuer: 'Universidade Estácio de Sá', date: 'Dezembro 2023' },
  { slug: 'aws-discovery-day', title: 'Computação em Nuvem — AWS Discovery Day', issuer: 'Universidade Estácio de Sá + Ka Solution (AWS)', date: 'Maio 2023' },
];

const IN_PROGRESS: { title: string; issuer: string }[] = [
  { title: 'Administrando Banco de Dados', issuer: 'Fundação Bradesco' },
  { title: 'AI-900 — Fundamentos de IA no Azure', issuer: 'Fundação Bradesco' },
  { title: 'FluênciA em Inteligência Artificial', issuer: 'Fundação Bradesco' },
  { title: 'Análise de Dados no Power BI', issuer: 'Fundação Bradesco' },
  { title: 'Introduction to Cybersecurity', issuer: 'Cisco' },
  { title: 'Networking Basics', issuer: 'Cisco' },
];

export default function Certifications() {
  const hasCertifications = CERTIFICATIONS.length > 0;
  const hasInProgress = IN_PROGRESS.length > 0;

  if (!hasCertifications && !hasInProgress) return null;

  return (
    <>
      <section style={{ maxWidth: '1100px', margin: '0 auto', padding: '64px 24px' }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.5 }}
          style={{ marginBottom: '32px' }}
        >
          <div className="section-label" style={{ marginBottom: '12px' }}>Credenciais</div>
          <h2 style={{ fontSize: '1.8rem', fontWeight: 700, letterSpacing: '-0.02em', color: 'var(--text-primary)' }}>
            Certificações
          </h2>
        </motion.div>

        {hasCertifications && (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
              gap: '16px',
              marginBottom: hasInProgress ? '40px' : 0,
            }}
          >
            {CERTIFICATIONS.map((cert, i) => {
              const content = (
                <>
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                    <div
                      style={{
                        width: '36px', height: '36px', borderRadius: '8px', flexShrink: 0,
                        background: 'var(--accent-cyan-dim)', display: 'flex', alignItems: 'center', justifyContent: 'center',
                      }}
                    >
                      <Award size={18} color="var(--accent-cyan)" />
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <h3 style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '4px' }}>
                        {cert.title}
                      </h3>
                      <p style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', marginBottom: '2px' }}>{cert.issuer}</p>
                      {cert.date && (
                        <p style={{ fontSize: '0.7rem', color: 'var(--text-muted)', fontFamily: "'JetBrains Mono', monospace" }}>{cert.date}</p>
                      )}
                    </div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '14px', fontSize: '0.78rem', fontWeight: 500, color: cert.slug ? 'var(--accent-cyan)' : 'var(--text-muted)' }}>
                    {cert.slug ? (
                      <>Ver certificado <ExternalLink size={13} /></>
                    ) : (
                      <>PDF em breve</>
                    )}
                  </div>
                </>
              );

              const motionProps = {
                initial: { opacity: 0, y: 20 },
                whileInView: { opacity: 1, y: 0 },
                viewport: { once: true },
                transition: { delay: i * 0.06, duration: 0.4 },
                className: 'card-glass',
                style: { padding: '20px', display: 'block' as const, textDecoration: 'none' },
              };

              return cert.slug ? (
                <motion.a key={cert.title} href={`/certificados/${cert.slug}.pdf`} target="_blank" rel="noreferrer" {...motionProps}>
                  {content}
                </motion.a>
              ) : (
                <motion.div key={cert.title} {...motionProps}>
                  {content}
                </motion.div>
              );
            })}
          </div>
        )}

        {hasInProgress && (
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
              <FileClock size={16} color="var(--accent-violet)" />
              <span
                style={{
                  fontFamily: "'JetBrains Mono', monospace", fontSize: '0.7rem', color: 'var(--accent-violet)',
                  textTransform: 'uppercase', letterSpacing: '0.08em',
                }}
              >
                Cursando no momento
              </span>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '12px' }}>
              {IN_PROGRESS.map((item, i) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }} transition={{ delay: i * 0.05, duration: 0.35 }}
                  className="card-glass"
                  style={{ padding: '16px', display: 'flex', alignItems: 'center', gap: '12px' }}
                >
                  <div
                    style={{
                      width: '30px', height: '30px', borderRadius: '7px', flexShrink: 0,
                      background: 'var(--accent-violet-dim)', display: 'flex', alignItems: 'center', justifyContent: 'center',
                    }}
                  >
                    <Loader2 size={15} color="var(--accent-violet)" />
                  </div>
                  <div style={{ minWidth: 0 }}>
                    <p style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-primary)' }}>{item.title}</p>
                    <p style={{ fontSize: '0.72rem', color: 'var(--text-secondary)' }}>{item.issuer}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}
      </section>
      <hr className="divider" />
    </>
  );
}
