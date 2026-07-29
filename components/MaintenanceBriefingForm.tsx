'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

type Item =
  | 'limpeza_fisica'
  | 'limpeza_software'
  | 'backup'
  | 'recuperacao_dados'
  | 'otimizacao'
  | 'antivirus'
  | 'atualizacao_drivers'
  | 'diagnostico_hardware'
  | 'config_rede'
  | 'formatacao'
  | 'pasta_termica'
  | 'outro';

type Atendimento = 'remoto' | 'presencial' | 'nao_sei';
type Urgencia = 'urgente' | 'sem_pressa';

const ITENS: [Item, string][] = [
  ['limpeza_fisica', 'Limpeza física (poeira, coolers)'],
  ['limpeza_software', 'Limpeza de software (bloatware, temp)'],
  ['backup', 'Backup de dados'],
  ['recuperacao_dados', 'Recuperação de dados'],
  ['otimizacao', 'Otimização de performance'],
  ['antivirus', 'Remoção de vírus / malware'],
  ['atualizacao_drivers', 'Atualização de drivers e SO'],
  ['diagnostico_hardware', 'Diagnóstico de hardware'],
  ['config_rede', 'Configuração de rede / Wi-Fi'],
  ['formatacao', 'Formatação e reinstalação'],
  ['pasta_termica', 'Troca de pasta térmica'],
  ['outro', 'Outro'],
];

interface FormData {
  itens: Item[];
  outroDetalhe: string;
  atendimento: Atendimento | null;
  urgencia: Urgencia | null;
  nome: string;
  contato: string;
  website: string; // honeypot
}

const initialData: FormData = {
  itens: [],
  outroDetalhe: '',
  atendimento: null,
  urgencia: null,
  nome: '',
  contato: '',
  website: '',
};

function Pill({ label, selected, onClick, accent = 'cyan' }: { label: string; selected: boolean; onClick: () => void; accent?: 'cyan' | 'violet' }) {
  const color = accent === 'violet' ? '#A855F7' : '#00D4FF';
  const dim = accent === 'violet' ? 'rgba(168,85,247,0.08)' : 'rgba(0,212,255,0.08)';
  return (
    <button
      type="button"
      onClick={onClick}
      style={{
        padding: '12px 16px',
        borderRadius: 'var(--radius)',
        border: `1px solid ${selected ? color : 'var(--border-subtle)'}`,
        background: selected ? dim : 'var(--bg-card)',
        color: selected ? color : 'var(--text-primary)',
        fontSize: '0.85rem',
        fontWeight: 500,
        cursor: 'pointer',
        transition: 'all var(--transition)',
        textAlign: 'left',
      }}
    >
      {label}
    </button>
  );
}

function Label({ children }: { children: React.ReactNode }) {
  return (
    <label style={{ display: 'block', fontSize: '0.75rem', fontFamily: "'JetBrains Mono', monospace", textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--text-muted)', marginBottom: '10px' }}>
      {children}
    </label>
  );
}

export default function MaintenanceBriefingForm() {
  const [data, setData] = useState<FormData>(initialData);
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  function update<K extends keyof FormData>(key: K, value: FormData[K]) {
    setData((prev) => ({ ...prev, [key]: value }));
  }

  function toggleItem(item: Item) {
    setData((prev) => ({
      ...prev,
      itens: prev.itens.includes(item) ? prev.itens.filter((i) => i !== item) : [...prev.itens, item],
    }));
  }

  const isValid = data.itens.length > 0 && !!data.atendimento && !!data.urgencia && data.nome.trim().length > 1 && data.contato.trim().length > 3;

  async function handleSubmit() {
    if (!isValid) return;
    setStatus('loading');
    setErrorMsg('');
    try {
      const res = await fetch('/api/manutencao-briefing', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      const result = await res.json();
      if (res.ok && result.success) {
        setStatus('success');
      } else {
        setStatus('error');
        setErrorMsg(result.error || 'Erro ao enviar. Tente novamente.');
      }
    } catch {
      setStatus('error');
      setErrorMsg('Falha de rede. Tente novamente.');
    }
  }

  if (status === 'success') {
    return (
      <div className="card-glass" style={{ padding: '48px 36px', textAlign: 'center' }}>
        <div style={{ fontSize: '2rem', marginBottom: '16px' }}>✔</div>
        <h3 style={{ fontSize: '1.1rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '10px' }}>
          Solicitação recebida!
        </h3>
        <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.6, maxWidth: '440px', margin: '0 auto' }}>
          Já sei exatamente o que você precisa. Entro em contato em breve pelo canal informado.
        </p>
      </div>
    );
  }

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="card-glass" style={{ padding: '36px' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        <div>
          <Label>O que você precisa? (pode marcar mais de um)</Label>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '10px' }}>
            {ITENS.map(([val, label]) => (
              <Pill key={val} label={label} selected={data.itens.includes(val)} onClick={() => toggleItem(val)} />
            ))}
          </div>
          {data.itens.includes('outro') && (
            <div style={{ marginTop: '16px' }}>
              <Label>Descreva o que precisa</Label>
              <input className="input-field" placeholder="Conte em poucas palavras" value={data.outroDetalhe} onChange={(e) => update('outroDetalhe', e.target.value)} />
            </div>
          )}
        </div>

        <div>
          <Label>Atendimento preferido</Label>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px' }}>
            <Pill label="Remoto" selected={data.atendimento === 'remoto'} onClick={() => update('atendimento', 'remoto')} accent="violet" />
            <Pill label="Presencial" selected={data.atendimento === 'presencial'} onClick={() => update('atendimento', 'presencial')} accent="violet" />
            <Pill label="Os Dois" selected={data.atendimento === 'nao_sei'} onClick={() => update('atendimento', 'nao_sei')} accent="violet" />
          </div>
        </div>

        <div>
          <Label>Urgência</Label>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '10px' }}>
            <Pill label="Urgente" selected={data.urgencia === 'urgente'} onClick={() => update('urgencia', 'urgente')} />
            <Pill label="Sem pressa" selected={data.urgencia === 'sem_pressa'} onClick={() => update('urgencia', 'sem_pressa')} />
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '14px' }}>
          <div>
            <Label>Seu nome</Label>
            <input className="input-field" value={data.nome} onChange={(e) => update('nome', e.target.value)} placeholder="Como posso te chamar" />
          </div>
          <div>
            <Label>WhatsApp ou e-mail</Label>
            <input className="input-field" value={data.contato} onChange={(e) => update('contato', e.target.value)} placeholder="Pra eu te responder" />
          </div>
        </div>

        <input
          type="text"
          name="website"
          value={data.website}
          onChange={(e) => update('website', e.target.value)}
          tabIndex={-1}
          autoComplete="off"
          style={{ position: 'absolute', left: '-9999px', width: '1px', height: '1px', opacity: 0 }}
          aria-hidden="true"
        />

        {status === 'error' && (
          <div style={{ padding: '12px 16px', borderRadius: '8px', background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.2)', color: '#F87171', fontSize: '0.85rem' }}>
            ✖ {errorMsg}
          </div>
        )}

        <button
          type="button"
          onClick={handleSubmit}
          disabled={!isValid || status === 'loading'}
          className="btn-primary"
          style={{ background: '#7C3AED', opacity: isValid ? 1 : 0.5, alignSelf: 'flex-start' }}
        >
          {status === 'loading' ? 'Enviando...' : 'Enviar solicitação'}
        </button>
      </div>
    </motion.div>
  );
}
