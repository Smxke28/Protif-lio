'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function DesenvolvimentoWebPage() {
  const [expanded, setExpanded] = useState(false);

  const cardBase =
    'p-6 rounded-2xl border border-gray-800 bg-gradient-to-br from-gray-900 to-black shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl';

  return (
    <div className="min-h-screen bg-black text-gray-100">
      {/* ================= HERO ================= */}
      <header className="pt-28 pb-24 px-6 text-center">
        <h1 className="text-5xl md:text-6xl font-extrabold mb-6">
          Olá, eu sou{' '}
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
            Juan
          </span>
        </h1>

        <p className="text-gray-400 max-w-2xl mx-auto mb-10 text-lg">
          Desenvolvedor Web e Consultor em TI. Transformo ideias em produtos digitais
          funcionais, rápidos e bem estruturados.
        </p>

        <div className="flex flex-wrap justify-center gap-4">
          <Link
            href="/servicos"
            className="px-8 py-4 rounded-xl bg-white text-black font-semibold hover:bg-gray-200 transition"
          >
            Ver serviços
          </Link>

          <Link
            href="#projetos"
            className="px-8 py-4 rounded-xl bg-gray-800 text-white font-semibold hover:bg-gray-700 transition"
          >
            Ver projetos
          </Link>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6">
        {/* ================= PROJETOS ================= */}
        <section id="projetos" className="mb-28">
          <h2 className="text-3xl font-bold text-center mb-12">
            Projetos em destaque
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {/* 🔥 PROJETO PRINCIPAL - CS2 */}
            <a
              href="https://sitecs2.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className={`${cardBase} md:col-span-2`}
            >
              <h3 className="text-2xl font-semibold mb-3">
                Projeto CS2
              </h3>

              <p className="text-gray-400 text-sm mb-6 max-w-xl">
                Plataforma dedicada ao Counter-Strike 2, reunindo ferramentas,
                conteúdo e recursos para a comunidade. Projeto real, público e em evolução.
              </p>

              <div className="flex flex-wrap gap-2 mb-6">
                <span className="tag">Next.js</span>
                <span className="tag">Vercel</span>
                <span className="tag">SEO</span>
                <span className="tag">UI Moderna</span>
              </div>

              <span className="inline-block px-6 py-3 rounded-lg bg-white text-black font-semibold">
                Acessar projeto →
              </span>
            </a>

            {/* Projeto secundário */}
            <article className={cardBase}>
              <h3 className="text-lg font-semibold mb-3">
                Dashboard Web
              </h3>

              <p className="text-gray-400 text-sm">
                Dashboard interativo para visualização e análise de dados em tempo real.
              </p>
            </article>
          </div>
        </section>

        {/* ================= SERVIÇOS ================= */}
        <section className="mb-28">
          <h2 className="text-3xl font-bold text-center mb-12">
            Serviços
          </h2>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Desenvolvimento Web */}
            <Link
              href="/servicos/desenvolvimento-web"
              className={`${cardBase} block`}
            >
              <h3 className="text-xl font-semibold mb-3">
                💻 Desenvolvimento Web
              </h3>

              <p className="text-gray-400 text-sm mb-4">
                Sites, sistemas e landing pages rápidas, escaláveis e bem posicionadas no Google.
              </p>

              <div className="flex gap-2 flex-wrap">
                <span className="tag">Next.js</span>
                <span className="tag">SEO</span>
                <span className="tag">Performance</span>
              </div>
            </Link>

            {/* Consultoria */}
            <article className={cardBase}>
              <h3 className="text-xl font-semibold mb-3">
                🖥️ Consultoria & Montagem
              </h3>

              <p className="text-gray-400 text-sm">
                Escolha, montagem e otimização de computadores.
                {expanded && (
                  <span className="block mt-2 text-xs text-gray-500">
                    Compatibilidade, custo-benefício e setups sob medida.
                  </span>
                )}
              </p>

              <div className="mt-6 flex gap-3">
                <button
                  onClick={() => setExpanded(!expanded)}
                  className="px-4 py-2 rounded bg-white text-black font-semibold hover:bg-gray-200 transition"
                >
                  {expanded ? 'Ler menos' : 'Ler mais'}
                </button>

                <Link
                  href="/servicos/consultoria-hardware"
                  className="px-4 py-2 rounded bg-purple-600 text-white font-semibold hover:bg-purple-500 transition"
                >
                  Ver serviço
                </Link>
              </div>
            </article>

            {/* Suporte */}
            <Link
              href="/servicos/montagem-pc"
              className={`${cardBase} block`}
            >
              <h3 className="text-xl font-semibold mb-3">
                🔧 Manutenção & Suporte
              </h3>

              <p className="text-gray-400 text-sm mb-4">
                Suporte técnico contínuo, manutenção preventiva e estabilidade.
              </p>

              <div className="flex gap-2">
                <span className="tag">SLA</span>
                <span className="tag">Backup</span>
              </div>
            </Link>
          </div>
        </section>
      </main>

      {/* ================= FOOTER ================= */}
      <footer className="py-6 text-center text-sm bg-gray-900 text-gray-400">
        © {new Date().getFullYear()} Juan • Desenvolvedor Web & Consultor em TI
      </footer>

      {/* TAG STYLE */}
      <style jsx>{`
        .tag {
          padding: 0.25rem 0.75rem;
          font-size: 0.75rem;
          border-radius: 999px;
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.1);
        }
      `}</style>
    </div>
  );
}
