'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function Home() {
  const [expanded, setExpanded] = useState<Record<string, boolean>>({
    hardware: false,
    web: false,
    support: false,
  });

  const toggle = (id: string) => {
    setExpanded((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const cardBase =
    'p-6 rounded-2xl border shadow-lg transition-all duration-300 transform will-change-transform';
  const cardStyle =
    'bg-gradient-to-br from-gray-800/60 to-black/60 backdrop-blur-sm border-gray-700/40 shadow-xl hover:shadow-2xl hover:-translate-y-1 hover:scale-[1.02] focus-within:ring-2 focus-within:ring-blue-500/30';

  return (
    <div className="min-h-screen font-sans bg-black text-gray-100">
      {/* HERO - Texto de boas-vindas (sem o card visual) */}
      <header className="relative flex items-center justify-center text-center py-20 px-6 overflow-visible">
        <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-black opacity-40 pointer-events-none" />

        <div className="max-w-5xl w-full flex flex-col items-center gap-8">
          {/* Texto principal */}
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-extrabold leading-tight text-white">
              Olá, eu sou <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">Juan</span>
            </h1>

            <p className="mt-4 text-lg text-gray-300 max-w-2xl mx-auto">
              Desenvolvedor web e consultor em TI. Eu transformo ideias em produtos digitais
              funcionais.
            </p>

            <div className="mt-6 flex flex-wrap gap-4 justify-center">
              <Link
                href="/servicos"
                className="inline-flex items-center gap-3 px-6 py-3 rounded-lg bg-white text-black font-semibold shadow hover:scale-[1.02] transition transform"
                aria-label="Ver serviços"
              >
                Ver Serviços
                <svg className="w-4 h-4 text-black" viewBox="0 0 24 24" fill="none" aria-hidden>
                  <path d="M5 12h14M13 5l7 7-7 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </Link>

              <Link
                href="/projetos"
                className="inline-flex items-center gap-3 px-6 py-3 rounded-lg bg-gray-800 text-white font-semibold shadow hover:scale-[1.02] transition transform"
                aria-label="Meus projetos"
              >
                Meus Projetos
              </Link>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-16">
        {/* SERVIÇOS */}
        <section id="servicos" className="mb-20">
          <h2 className="text-3xl font-bold text-center mb-12">Serviços</h2>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Card 1 - Desenvolvimento Web */}
            <Link
              href="/servicos/desenvolvimento-web"
              className={`${cardBase} ${cardStyle} group no-underline`}
              aria-label="Desenvolvimento Web"
            >
              <article>
                <h3 className="text-xl font-semibold mb-3 text-white group-hover:text-white">
                  💻 Desenvolvimento Web
                </h3>

                <p className="text-sm text-gray-300">
                  Criação de sites modernos, responsivos e otimizados para SEO.
                </p>

                <div className="mt-4 flex items-center gap-3">
                  <span className="inline-block px-3 py-1 rounded-full bg-white/6 text-xs text-gray-200">
                    Next.js
                  </span>
                  <span className="inline-block px-3 py-1 rounded-full bg-white/6 text-xs text-gray-200">
                    Tailwind
                  </span>
                </div>
              </article>
            </Link>

            {/* Card 2 - Consultoria & Montagem */}
            <article
              className={`${cardBase} ${cardStyle} relative`}
              aria-labelledby="consultoria-title"
            >
              <h3 id="consultoria-title" className="text-xl font-semibold mb-3 text-white">
                🖥️ Consultoria & Montagem de PCs
              </h3>

              <p className="text-sm text-gray-300">
                Suporte completo na escolha e montagem de computadores personalizados.
                {expanded.hardware && (
                  <span className="block mt-2 text-xs text-gray-400">
                    Análise de compatibilidade, otimização de custo-benefício e
                    montagem sob medida para gamers, criadores e empresas.
                  </span>
                )}
              </p>

              <div className="mt-4 flex gap-3">
                <button
                  onClick={() => toggle('hardware')}
                  aria-expanded={!!expanded.hardware}
                  className="px-4 py-2 rounded bg-white text-black font-semibold hover:bg-gray-200 transition focus:outline-none focus:ring-2 focus:ring-purple-500/30"
                >
                  {expanded.hardware ? 'Ler menos' : 'Ler mais'}
                </button>

                <Link
                  href="/servicos/consultoria-hardware"
                  className="px-4 py-2 rounded bg-purple-600 text-white font-semibold hover:bg-purple-500 transition focus:outline-none focus:ring-2 focus:ring-purple-500/30"
                  aria-label="Ver consultoria e montagem"
                >
                  Ver serviço
                </Link>
              </div>

              {/* subtle accent line */}
              <div className="absolute -bottom-3 left-6 w-16 h-1 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 opacity-80" />
            </article>

            {/* Card 3 - Manutenção & Suporte */}
            <Link
              href="/servicos/montagem-pc"
              className={`${cardBase} ${cardStyle} group no-underline`}
              aria-label="Manutenção e Suporte"
            >
              <article>
                <h3 className="text-xl font-semibold mb-3 text-white">
                  🔧 Manutenção & Suporte
                </h3>

                <p className="text-sm text-gray-300">
                  Monitoramento e suporte técnico para manter sistemas sempre ativos.
                </p>

                <div className="mt-4 flex items-center gap-3">
                  <span className="inline-block px-3 py-1 rounded-full bg-white/6 text-xs text-gray-200">
                    SLA
                  </span>
                  <span className="inline-block px-3 py-1 rounded-full bg-white/6 text-xs text-gray-200">
                    Backup
                  </span>
                </div>
              </article>
            </Link>
          </div>
        </section>

        {/* PROJETOS */}
        <section id="projetos" className="mb-20">
          <h2 className="text-3xl font-bold text-center mb-12">Projetos</h2>

          <div className="grid gap-8 md:grid-cols-3">
            <article className={`${cardBase} ${cardStyle}`}>
              <h3 className="text-lg font-semibold mb-3 text-white">Projeto CS2</h3>

              <p className="text-sm mb-4 text-gray-300">
                Plataforma voltada para Counter-Strike 2, reunindo utilidades e táticas de jogo.
              </p>

              <a
                href="https://sitecs2.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 rounded bg-white text-black font-semibold hover:bg-gray-200 transition focus:outline-none focus:ring-2 focus:ring-blue-500/30"
              >
                Acesse o site
              </a>
            </article>

            <article className={`${cardBase} ${cardStyle}`}>
              <h3 className="text-lg font-semibold mb-3 text-white">Projeto 2</h3>

              <p className="text-sm mb-4 text-gray-300">Plataforma de e-commerce personalizada com checkout otimizado.</p>
            </article>

            <article className={`${cardBase} ${cardStyle}`}>
              <h3 className="text-lg font-semibold mb-3 text-white">Projeto 3</h3>

              <p className="text-sm mb-4 text-gray-300">Dashboard interativo para análise de dados em tempo real.</p>
            </article>
          </div>
        </section>

        {/* CONTATO - card "J / Juan Lavecchia" no final */}
        <section id="contato" className="mb-20">
          <h2 className="text-3xl font-bold text-center mb-8">Contato</h2>

          <div className="max-w-3xl mx-auto px-6">
            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-gray-900/80 to-black/80 border border-gray-800 shadow-xl">
              <div className="p-8 md:p-10 lg:p-12 flex flex-col md:flex-row items-start gap-6">
                {/* Left: o card "J" com informações */}
                <div className="flex-1">
                  <div className="rounded-xl bg-gradient-to-br from-gray-900 to-black p-6">
                    <div className="flex items-center gap-4">
                      <div className="h-16 w-16 rounded-full bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center text-white font-bold text-2xl">
                        J
                      </div>

                      <div className="flex-1">
                        <h4 className="text-lg font-semibold text-white">Juan Lavecchia</h4>
                        <p className="text-sm text-gray-300">Desenvolvedor Web • Consultor em TI</p>
                      </div>
                    </div>

                    <div className="mt-4 grid gap-3">
                      <div className="flex items-center justify-between text-sm text-gray-300">
                        <span className="text-xs text-gray-400">Atendimento</span>
                        <span className="font-medium">Seg a Sex • 09:00 — 18:00</span>
                      </div>

                      <div className="flex items-center justify-between text-sm text-gray-300">
                        <span className="text-xs text-gray-400">Resposta</span>
                        <span className="font-medium">Até 24 horas úteis</span>
                      </div>

                      <div className="mt-3 flex gap-2">
                        <a
                          href="tel:+5532988766960"
                          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-500 transition"
                          aria-label="Ligar para Juan"
                        >
                          (32) 98876-6960
                        </a>

                        <a
                          href="mailto:juanlavecchia23@gmail.com"
                          className="inline-block px-4 py-2 rounded-md bg-white text-black font-medium hover:bg-gray-200 transition"
                          aria-label="Enviar email"
                        >
                          Email
                        </a>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right: links e avatar */}
                <div className="w-full md:w-44 lg:w-56 flex-shrink-0">
                  <div className="rounded-xl bg-gradient-to-br from-white/6 to-white/3 p-4 flex items-center justify-center h-full">
                    <div className="h-24 w-24 rounded-full bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center text-white font-bold text-xl">
                      J
                    </div>
                  </div>

                  <div className="mt-6 md:mt-8 flex flex-col gap-3">
                    <Link
                      href="/contato"
                      className="inline-block px-5 py-3 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-500 transition text-center"
                      aria-label="Ir para página de contato"
                    >
                      Solicitar orçamento
                    </Link>

                    <a
                      href="https://github.com/Smxke28"
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-3 rounded-lg bg-white/6 hover:bg-white/10 transition justify-center"
                      aria-label="Ver GitHub"
                    >
                      GitHub
                    </a>
                  </div>
                </div>
              </div>

              {/* footer do card */}
              <div className="border-t border-gray-800 px-6 py-4 text-sm text-gray-400">
                <div className="max-w-3xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
                  <span>Atendimento: Segunda a Sexta • 09:00 — 18:00</span>
                  <span className="hidden sm:inline">Resposta em até 24 horas úteis</span>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="py-6 text-center text-sm bg-gray-900 text-gray-400">
        © {new Date().getFullYear()} Juan • Desenvolvedor Web & Consultor em TI
      </footer>

      {/* small custom animation utilities */}
      <style jsx>{`
        .animate-pulse-slow {
          animation: pulse 3s cubic-bezier(.4,0,.6,1) infinite;
        }
        @keyframes pulse {
          0% { transform: scaleX(1); opacity: 0.95; }
          50% { transform: scaleX(1.05); opacity: 0.7; }
          100% { transform: scaleX(1); opacity: 0.95; }
        }
      `}</style>
    </div>
  );
}
