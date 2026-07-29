'use client';

import { useSession, signIn } from 'next-auth/react';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function ContatoPage() {
  const { data: session } = useSession();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [website, setWebsite] = useState(''); // honeypot
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error' | null; message: string } | null>(null);

  // Se a pessoa já estiver logada, preenche nome/e-mail automaticamente (conveniência, não exigência)
  useEffect(() => {
    if (session?.user?.name) setName((prev) => prev || session.user!.name!);
    if (session?.user?.email) setEmail((prev) => prev || session.user!.email!);
  }, [session]);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (website.trim().length > 0) {
      // Honeypot preenchido — provavelmente um bot. Finge sucesso e não faz nada.
      setFeedback({ type: 'success', message: 'Mensagem enviada com sucesso!' });
      return;
    }

    if (!name.trim() || !email.trim() || !message.trim()) {
      setFeedback({ type: 'error', message: 'Preencha nome, e-mail e mensagem.' });
      return;
    }

    setLoading(true);
    setFeedback(null);
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, message }),
      });
      const result = await res.json();
      setLoading(false);
      if (res.ok && result.success) {
        setFeedback({ type: 'success', message: 'Mensagem enviada com sucesso! Te respondo em breve.' });
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
    <div style={{ background: 'var(--page-bg)', minHeight: '100vh' }}>
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
            color: 'var(--text-primary)',
            marginBottom: '20px',
          }}
        >
          Contato
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          style={{ fontSize: '1rem', color: 'var(--text-secondary)', maxWidth: '440px', lineHeight: 1.7 }}
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
                    color: 'var(--accent-cyan)',
                    flexShrink: 0,
                  }}
                >
                  {item.icon}
                </div>
                <div>
                  <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', fontFamily: "'JetBrains Mono', monospace", marginBottom: '3px', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                    {item.label}
                  </div>
                  <div style={{ fontSize: '0.875rem', color: 'var(--text-primary)', fontWeight: 500 }}>{item.value}</div>
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
              <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                Disponível para novos projetos e consultorias
              </span>
            </div>
          </motion.div>

          {/* Right - form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.1 }}
          >
            <div className="card-glass" style={{ padding: '36px' }}>
              {session?.user?.image && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px', paddingBottom: '16px', borderBottom: '1px solid var(--border-subtle)' }}>
                  <img
                    src={session.user.image}
                    alt="avatar"
                    style={{ width: '28px', height: '28px', borderRadius: '50%', border: '2px solid rgba(0,212,255,0.3)' }}
                  />
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                    Logado como {session.user?.name} — campos preenchidos automaticamente
                  </span>
                </div>
              )}

              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '14px' }}>
                  <div>
                    <label
                      htmlFor="name"
                      style={{ display: 'block', fontSize: '0.75rem', fontFamily: "'JetBrains Mono', monospace", textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--text-muted)', marginBottom: '8px' }}
                    >
                      Nome
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      placeholder="Seu nome"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="input-field"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="email"
                      style={{ display: 'block', fontSize: '0.75rem', fontFamily: "'JetBrains Mono', monospace", textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--text-muted)', marginBottom: '8px' }}
                    >
                      E-mail
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="seu@email.com"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="input-field"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="message"
                    style={{
                      display: 'block',
                      fontSize: '0.75rem',
                      fontFamily: "'JetBrains Mono', monospace",
                      textTransform: 'uppercase',
                      letterSpacing: '0.08em',
                      color: 'var(--text-muted)',
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

                {/* Honeypot - invisível para humanos, descarta bots simples */}
                <input
                  type="text"
                  name="website"
                  value={website}
                  onChange={(e) => setWebsite(e.target.value)}
                  tabIndex={-1}
                  autoComplete="off"
                  style={{ position: 'absolute', left: '-9999px', width: '1px', height: '1px', opacity: 0 }}
                  aria-hidden="true"
                />

                <button
                  type="submit"
                  disabled={loading}
                  className="btn-primary"
                  style={{ justifyContent: 'center', opacity: loading ? 0.7 : 1 }}
                >
                  {loading ? 'Enviando...' : 'Enviar mensagem'}
                </button>

                {!session && (
                  <button
                    type="button"
                    onClick={() => signIn('google')}
                    className="btn-secondary"
                    style={{ justifyContent: 'center', fontSize: '0.8rem' }}
                  >
                    Ou entrar com Google pra preencher automaticamente
                  </button>
                )}

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
          </motion.div>
        </div>
      </section>
    </div>
  );
}
