'use client';

import { useSession, signIn } from 'next-auth/react';
import { useState } from 'react';
import { motion } from 'framer-motion';

export default function ContatoPage() {
  const { data: session, status } = useSession();
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error' | null; message: string } | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!session?.user?.email || !session?.user?.name) {
      setFeedback({ type: 'error', message: 'Você precisa estar logado para enviar.' });
      return;
    }
    setLoading(true);
    setFeedback(null);
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: session.user.name, email: session.user.email, message }),
      });
      const result = await res.json();
      setLoading(false);
      if (res.ok && result.success) {
        setFeedback({ type: 'success', message: 'Mensagem enviada com sucesso!' });
        setMessage('');
      } else {
        setFeedback({ type: 'error', message: result.error || 'Erro ao enviar mensagem.' });
      }
    } catch {
      setLoading(false);
      setFeedback({ type: 'error', message: 'Falha de rede. Tente novamente.' });
    }
  }

  return (
    <div style={{ background: 'linear-gradient(180deg, #0A0A0F 0%, #0D0D1A 100%)', minHeight: '100vh' }}>
      {/* Header */}
      <section style={{ padding: '80px 24px 64px', maxWidth: '1100px', margin: '0 auto' }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          style={{ marginBottom: '16px' }}
        >
          <span className="section-label">Fale comigo</span>
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
          Contato
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          style={{ fontSize: '1rem', color: '#8888AA', maxWidth: '440px', lineHeight: 1.7 }}
        >
          Tem um projeto, dúvida ou quer conversar? Envie uma mensagem — respondo em até 24h.
        </motion.p>
      </section>

      <hr className="divider" />

      <section style={{ maxWidth: '1100px', margin: '0 auto', padding: '64px 24px 96px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '32px', alignItems: 'start' }}>

          {/* Left - contact info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.5 }}
            style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}
          >
            {[
              {
                label: 'Email',
                value: 'juanlavecchia23@gmail.com',
                href: 'mailto:juanlavecchia23@gmail.com',
                icon: '✉',
              },
              {
                label: 'GitHub',
                value: 'github.com/Smxke28',
                href: 'https://github.com/Smxke28',
                icon: '⎇',
              },
              {
                label: 'LinkedIn',
                value: 'Juan Lavecchia',
                href: 'https://www.linkedin.com/in/juan-lavecchia-8b3b5131a/',
                icon: 'in',
              },
            ].map((item) => (
              <a
                key={item.label}
                href={item.href}
                target={item.href.startsWith('mailto') ? undefined : '_blank'}
                rel="noreferrer"
                className="card-glass"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '16px',
                  padding: '20px 24px',
                  textDecoration: 'none',
                }}
              >
                <div
                  style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '8px',
                    background: 'rgba(0,212,255,0.08)',
                    border: '1px solid rgba(0,212,255,0.15)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: '0.8rem',
                    color: '#00D4FF',
                    flexShrink: 0,
                  }}
                >
                  {item.icon}
                </div>
                <div>
                  <div style={{ fontSize: '0.7rem', color: '#555577', fontFamily: "'JetBrains Mono', monospace", marginBottom: '3px', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                    {item.label}
                  </div>
                  <div style={{ fontSize: '0.875rem', color: '#F0F0FF', fontWeight: 500 }}>{item.value}</div>
                </div>
              </a>
            ))}

            <div
              style={{
                padding: '20px 24px',
                background: 'rgba(40,202,66,0.05)',
                border: '1px solid rgba(40,202,66,0.12)',
                borderRadius: '12px',
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
              }}
            >
              <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#28CA42', flexShrink: 0 }} />
              <span style={{ fontSize: '0.85rem', color: '#8888AA' }}>
                Disponível para novos projetos e consultorias
              </span>
            </div>
          </motion.div>

          {/* Right - form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.1 }}
          >
            {status === 'loading' ? (
              <div
                className="card-glass"
                style={{ padding: '40px', textAlign: 'center', color: '#555577', fontFamily: "'JetBrains Mono', monospace", fontSize: '0.85rem' }}
              >
                Carregando...
              </div>
            ) : !session ? (
              <div className="card-glass" style={{ padding: '40px', textAlign: 'center' }}>
                <div style={{ fontSize: '2rem', marginBottom: '16px' }}>🔒</div>
                <h3 style={{ fontSize: '1.05rem', fontWeight: 600, color: '#F0F0FF', marginBottom: '12px' }}>
                  Login necessário
                </h3>
                <p style={{ fontSize: '0.875rem', color: '#8888AA', marginBottom: '28px', lineHeight: 1.6 }}>
                  Para enviar uma mensagem, faça login com sua conta Google.
                  Isso evita spam e me ajuda a responder diretamente.
                </p>
                <button
                  onClick={() => signIn('google')}
                  className="btn-primary"
                  style={{ margin: '0 auto' }}
                >
                  Entrar com Google
                </button>
              </div>
            ) : (
              <div className="card-glass" style={{ padding: '36px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '28px', paddingBottom: '20px', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                  {session.user?.image && (
                    <img
                      src={session.user.image}
                      alt="avatar"
                      style={{ width: '32px', height: '32px', borderRadius: '50%', border: '2px solid rgba(0,212,255,0.3)' }}
                    />
                  )}
                  <div>
                    <div style={{ fontSize: '0.85rem', fontWeight: 500, color: '#F0F0FF' }}>
                      {session.user?.name}
                    </div>
                    <div style={{ fontSize: '0.75rem', color: '#555577', fontFamily: "'JetBrains Mono', monospace" }}>
                      {session.user?.email}
                    </div>
                  </div>
                </div>

                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <div>
                    <label
                      htmlFor="message"
                      style={{
                        display: 'block',
                        fontSize: '0.75rem',
                        fontFamily: "'JetBrains Mono', monospace",
                        textTransform: 'uppercase',
                        letterSpacing: '0.08em',
                        color: '#555577',
                        marginBottom: '8px',
                      }}
                    >
                      Mensagem
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      placeholder="Descreva seu projeto ou dúvida..."
                      rows={6}
                      required
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className="input-field"
                      style={{ resize: 'vertical', minHeight: '140px' }}
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="btn-primary"
                    style={{ justifyContent: 'center', opacity: loading ? 0.7 : 1 }}
                  >
                    {loading ? 'Enviando...' : 'Enviar mensagem'}
                  </button>

                  {feedback?.type === 'success' && (
                    <div
                      style={{
                        padding: '12px 16px',
                        borderRadius: '8px',
                        background: 'rgba(40,202,66,0.08)',
                        border: '1px solid rgba(40,202,66,0.2)',
                        color: '#28CA42',
                        fontSize: '0.85rem',
                      }}
                    >
                      ✔ {feedback.message}
                    </div>
                  )}
                  {feedback?.type === 'error' && (
                    <div
                      style={{
                        padding: '12px 16px',
                        borderRadius: '8px',
                        background: 'rgba(239,68,68,0.08)',
                        border: '1px solid rgba(239,68,68,0.2)',
                        color: '#F87171',
                        fontSize: '0.85rem',
                      }}
                    >
                      ✖ {feedback.message}
                    </div>
                  )}
                </form>
              </div>
            )}
          </motion.div>
        </div>
      </section>
    </div>
  );
}
