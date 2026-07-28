'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/* ---------- Tipos ---------- */

type TipoAtendimento = 'pc_novo' | 'upgrade';
type Objetivo = 'jogos' | 'programacao' | 'escritorio' | 'estudos' | 'edicao' | 'geral' | 'outros';
type Marca = 'nvidia' | 'amd' | 'intel' | 'sem_preferencia';
type Display = 'monitor' | 'tv' | 'ja_tenho';
type Perifericos = 'so_pc' | 'com_perifericos' | 'pc_mais_monitor';

interface BriefingData {
  tipoAtendimento: TipoAtendimento | null;
  specsAtuais: string;
  objetivos: Objetivo[];
  objetivoOutros: string;
  jogosCasuais: string;
  jogosCompetitivos: string;
  preferenciaGPU: Marca | null;
  preferenciaCPU: Marca | null;
  display: Display | null;
  perifericos: Perifericos | null;
  orcamentoFaixa: string;
  prazoCompra: string;
  nome: string;
  contato: string;
  // honeypot - deve permanecer vazio; usado apenas para descartar bots
  website: string;
}

const initialData: BriefingData = {
  tipoAtendimento: null,
  specsAtuais: '',
  objetivos: [],
  objetivoOutros: '',
  jogosCasuais: '',
  jogosCompetitivos: '',
  preferenciaGPU: null,
  preferenciaCPU: null,
  display: null,
  perifericos: null,
  orcamentoFaixa: '',
  prazoCompra: '',
  nome: '',
  contato: '',
  website: '',
};

const ORCAMENTO_OPCOES = [
  'Até R$ 3.000',
  'R$ 3.000 – R$ 5.000',
  'R$ 5.000 – R$ 8.000',
  'Acima de R$ 8.000',
  'Ainda não sei',
];

const PRAZO_OPCOES = ['Imediato', 'Até 30 dias', '1 a 3 meses', 'Só pesquisando'];

/* ---------- Componentes auxiliares ---------- */

function OptionPill({
  label,
  selected,
  onClick,
  accent = 'cyan',
}: {
  label: string;
  selected: boolean;
  onClick: () => void;
  accent?: 'cyan' | 'violet';
}) {
  const color = accent === 'violet' ? '#A855F7' : '#00D4FF';
  const dim = accent === 'violet' ? 'rgba(168,85,247,0.08)' : 'rgba(0,212,255,0.08)';
  return (
    <button
      type="button"
      onClick={onClick}
      style={{
        padding: '12px 18px',
        borderRadius: 'var(--radius)',
        border: `1px solid ${selected ? color : 'var(--border-subtle)'}`,
        background: selected ? dim : 'var(--bg-card)',
        color: selected ? color : 'var(--text-primary)',
        fontSize: '0.875rem',
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

function FieldLabel({ children }: { children: React.ReactNode }) {
  return (
    <label
      style={{
        display: 'block',
        fontSize: '0.75rem',
        fontFamily: "'JetBrains Mono', monospace",
        textTransform: 'uppercase',
        letterSpacing: '0.08em',
        color: 'var(--text-muted)',
        marginBottom: '10px',
      }}
    >
      {children}
    </label>
  );
}

/* ---------- Definição dos passos ---------- */

type StepId = 'tipo' | 'objetivo' | 'jogos' | 'preferencias' | 'display' | 'final';

function getSteps(data: BriefingData): StepId[] {
  const steps: StepId[] = ['tipo', 'objetivo'];
  if (data.objetivos.includes('jogos')) steps.push('jogos');
  steps.push('preferencias', 'display', 'final');
  return steps;
}

/* ---------- Componente principal ---------- */

export default function PCBriefingWizard() {
  const [data, setData] = useState<BriefingData>(initialData);
  const [stepIndex, setStepIndex] = useState(0);
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const steps = getSteps(data);
  const currentStep = steps[stepIndex];
  const isLast = stepIndex === steps.length - 1;

  function update<K extends keyof BriefingData>(key: K, value: BriefingData[K]) {
    setData((prev) => ({ ...prev, [key]: value }));
  }

  function toggleObjetivo(value: Objetivo) {
    setData((prev) => ({
      ...prev,
      objetivos: prev.objetivos.includes(value)
        ? prev.objetivos.filter((o) => o !== value)
        : [...prev.objetivos, value],
    }));
  }

  function canAdvance(): boolean {
    switch (currentStep) {
      case 'tipo':
        return !!data.tipoAtendimento;
      case 'objetivo':
        return data.objetivos.length > 0;
      case 'jogos':
        return true; // opcional
      case 'preferencias':
        return !!data.preferenciaGPU && !!data.preferenciaCPU;
      case 'display':
        return !!data.display && !!data.perifericos;
      case 'final':
        return data.nome.trim().length > 1 && data.contato.trim().length > 3;
      default:
        return false;
    }
  }

  function goNext() {
    if (!canAdvance()) return;
    if (!isLast) setStepIndex((i) => i + 1);
  }

  function goBack() {
    if (stepIndex > 0) setStepIndex((i) => i - 1);
  }

  async function handleSubmit() {
    if (!canAdvance()) return;
    setStatus('loading');
    setErrorMsg('');
    try {
      const res = await fetch('/api/pc-briefing', {
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
          Briefing recebido!
        </h3>
        <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.6, maxWidth: '440px', margin: '0 auto' }}>
          Já tenho uma boa noção do que você precisa. Entro em contato em breve pelo canal informado.
        </p>
      </div>
    );
  }

  return (
    <div className="card-glass" style={{ padding: '36px' }}>
      {/* Progresso */}
      <div style={{ display: 'flex', gap: '6px', marginBottom: '28px' }}>
        {steps.map((s, i) => (
          <div
            key={s}
            style={{
              height: '3px',
              flex: 1,
              borderRadius: '2px',
              background: i <= stepIndex ? 'var(--accent-cyan)' : 'var(--border-subtle)',
              transition: 'background 0.3s',
            }}
          />
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, x: 12 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -12 }}
          transition={{ duration: 0.25 }}
        >
          {currentStep === 'tipo' && (
            <div>
              <FieldLabel>Você já tem um PC?</FieldLabel>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                <OptionPill
                  label="Quero um PC novo"
                  selected={data.tipoAtendimento === 'pc_novo'}
                  onClick={() => update('tipoAtendimento', 'pc_novo')}
                />
                <OptionPill
                  label="Já tenho e quero upgrade"
                  selected={data.tipoAtendimento === 'upgrade'}
                  onClick={() => update('tipoAtendimento', 'upgrade')}
                />
              </div>
              {data.tipoAtendimento === 'upgrade' && (
                <div style={{ marginTop: '20px' }}>
                  <FieldLabel>O que você já tem hoje? (peças que lembra)</FieldLabel>
                  <textarea
                    className="input-field"
                    rows={3}
                    placeholder="Ex: Ryzen 5 3600, 16GB RAM, GTX 1660, fonte 500W..."
                    value={data.specsAtuais}
                    onChange={(e) => update('specsAtuais', e.target.value)}
                    style={{ resize: 'vertical' }}
                  />
                </div>
              )}
            </div>
          )}

          {currentStep === 'objetivo' && (
            <div>
              <FieldLabel>Qual o objetivo do PC? (pode marcar mais de um)</FieldLabel>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))', gap: '10px' }}>
                {([
                  ['jogos', 'Jogos'],
                  ['programacao', 'Programação'],
                  ['escritorio', 'Escritório'],
                  ['estudos', 'Apenas estudos'],
                  ['edicao', 'Edição / design'],
                  ['geral', 'Uso geral'],
                  ['outros', 'Outros'],
                ] as [Objetivo, string][]).map(([val, label]) => (
                  <OptionPill
                    key={val}
                    label={label}
                    selected={data.objetivos.includes(val)}
                    onClick={() => toggleObjetivo(val)}
                  />
                ))}
              </div>
              {data.objetivos.includes('outros') && (
                <div style={{ marginTop: '20px' }}>
                  <FieldLabel>Descreva o que você precisa</FieldLabel>
                  <input
                    className="input-field"
                    placeholder="Ex: servidor de arquivos, mineração, streaming..."
                    value={data.objetivoOutros}
                    onChange={(e) => update('objetivoOutros', e.target.value)}
                  />
                </div>
              )}
            </div>
          )}

          {currentStep === 'jogos' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div>
                <FieldLabel>Jogos casuais (quais?) — opcional</FieldLabel>
                <input
                  className="input-field"
                  placeholder="Ex: The Sims, Stardew Valley, Minecraft..."
                  value={data.jogosCasuais}
                  onChange={(e) => update('jogosCasuais', e.target.value)}
                />
              </div>
              <div>
                <FieldLabel>Jogos competitivos (quais?) — opcional</FieldLabel>
                <input
                  className="input-field"
                  placeholder="Ex: Valorant, CS2, League of Legends..."
                  value={data.jogosCompetitivos}
                  onChange={(e) => update('jogosCompetitivos', e.target.value)}
                />
              </div>
            </div>
          )}

          {currentStep === 'preferencias' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              <div>
                <FieldLabel>Preferência de placa de vídeo (GPU)</FieldLabel>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px' }}>
                  <OptionPill label="Nvidia" selected={data.preferenciaGPU === 'nvidia'} onClick={() => update('preferenciaGPU', 'nvidia')} accent="violet" />
                  <OptionPill label="AMD" selected={data.preferenciaGPU === 'amd'} onClick={() => update('preferenciaGPU', 'amd')} accent="violet" />
                  <OptionPill label="Sem preferência" selected={data.preferenciaGPU === 'sem_preferencia'} onClick={() => update('preferenciaGPU', 'sem_preferencia')} accent="violet" />
                </div>
              </div>
              <div>
                <FieldLabel>Preferência de processador (CPU)</FieldLabel>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px' }}>
                  <OptionPill label="Intel" selected={data.preferenciaCPU === 'intel'} onClick={() => update('preferenciaCPU', 'intel')} />
                  <OptionPill label="AMD" selected={data.preferenciaCPU === 'amd'} onClick={() => update('preferenciaCPU', 'amd')} />
                  <OptionPill label="Sem preferência" selected={data.preferenciaCPU === 'sem_preferencia'} onClick={() => update('preferenciaCPU', 'sem_preferencia')} />
                </div>
              </div>
            </div>
          )}

          {currentStep === 'display' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              <div>
                <FieldLabel>Vai usar monitor ou TV?</FieldLabel>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px' }}>
                  <OptionPill label="Monitor" selected={data.display === 'monitor'} onClick={() => update('display', 'monitor')} />
                  <OptionPill label="TV" selected={data.display === 'tv'} onClick={() => update('display', 'tv')} />
                  <OptionPill label="Já tenho" selected={data.display === 'ja_tenho'} onClick={() => update('display', 'ja_tenho')} />
                </div>
              </div>
              <div>
                <FieldLabel>O que você precisa comigo?</FieldLabel>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  <OptionPill label="Só o PC (gabinete)" selected={data.perifericos === 'so_pc'} onClick={() => update('perifericos', 'so_pc')} accent="violet" />
                  <OptionPill label="PC + monitor" selected={data.perifericos === 'pc_mais_monitor'} onClick={() => update('perifericos', 'pc_mais_monitor')} accent="violet" />
                  <OptionPill label="PC + periféricos (teclado, mouse, headset, cadeira...)" selected={data.perifericos === 'com_perifericos'} onClick={() => update('perifericos', 'com_perifericos')} accent="violet" />
                </div>
              </div>
            </div>
          )}

          {currentStep === 'final' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div>
                <FieldLabel>Faixa de orçamento — opcional, mas ajuda muito</FieldLabel>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))', gap: '10px' }}>
                  {ORCAMENTO_OPCOES.map((o) => (
                    <OptionPill key={o} label={o} selected={data.orcamentoFaixa === o} onClick={() => update('orcamentoFaixa', o)} />
                  ))}
                </div>
              </div>
              <div>
                <FieldLabel>Prazo para comprar — opcional</FieldLabel>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(130px, 1fr))', gap: '10px' }}>
                  {PRAZO_OPCOES.map((p) => (
                    <OptionPill key={p} label={p} selected={data.prazoCompra === p} onClick={() => update('prazoCompra', p)} accent="violet" />
                  ))}
                </div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '14px' }}>
                <div>
                  <FieldLabel>Seu nome</FieldLabel>
                  <input className="input-field" value={data.nome} onChange={(e) => update('nome', e.target.value)} placeholder="Como posso te chamar" />
                </div>
                <div>
                  <FieldLabel>WhatsApp ou e-mail</FieldLabel>
                  <input className="input-field" value={data.contato} onChange={(e) => update('contato', e.target.value)} placeholder="Pra eu te responder" />
                </div>
              </div>
              {/* Honeypot - invisível para humanos, pega bots simples */}
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
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      {status === 'error' && (
        <div
          style={{
            marginTop: '20px',
            padding: '12px 16px',
            borderRadius: '8px',
            background: 'rgba(239,68,68,0.08)',
            border: '1px solid rgba(239,68,68,0.2)',
            color: '#F87171',
            fontSize: '0.85rem',
          }}
        >
          ✖ {errorMsg}
        </div>
      )}

      {/* Navegação */}
      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '28px' }}>
        <button
          type="button"
          onClick={goBack}
          disabled={stepIndex === 0}
          className="btn-secondary"
          style={{ opacity: stepIndex === 0 ? 0.4 : 1, cursor: stepIndex === 0 ? 'default' : 'pointer' }}
        >
          ← Voltar
        </button>

        {!isLast ? (
          <button type="button" onClick={goNext} disabled={!canAdvance()} className="btn-primary" style={{ opacity: canAdvance() ? 1 : 0.5 }}>
            Próximo →
          </button>
        ) : (
          <button
            type="button"
            onClick={handleSubmit}
            disabled={!canAdvance() || status === 'loading'}
            className="btn-primary"
            style={{ background: '#7C3AED', opacity: canAdvance() ? 1 : 0.5 }}
          >
            {status === 'loading' ? 'Enviando...' : 'Enviar briefing'}
          </button>
        )}
      </div>
    </div>
  );
}
