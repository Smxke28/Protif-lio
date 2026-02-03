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

  return (
    <div className="min-h-screen font-sans bg-black text-gray-100">
      {/* HERO */}
      <header className="flex flex-col items-center justify-center text-center py-24 px-6 bg-gradient-to-r from-gray-900 via-black to-gray-900">
        <h1 className="text-5xl font-extrabold mb-6">Bem-vindo 👋</h1>

        <p className="text-lg max-w-2xl mb-10 text-gray-400">
          Sou Juan, desenvolvedor web e consultor em TI. Aqui você encontra meus
          serviços, projetos e formas de contato.
        </p>

        {/* BOTÕES */}
        <div className="flex gap-6">
          <Link
            href="/servicos"
            className="px-6 py-3 rounded-lg bg-white text-black font-semibold shadow hover:bg-gray-200 transition"
          >
            Ver Serviços
          </Link>

          <Link
            href="/projetos"
            className="px-6 py-3 rounded-lg bg-gray-800 text-white font-semibold shadow hover:bg-gray-700 transition"
          >
            Meus Projetos
          </Link>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-16">
        {/* SERVIÇOS */}
        <section id="servicos" className="mb-20">
          <h2 className="text-3xl font-bold text-center mb-12">Serviços</h2>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Card 1 - Desenvolvimento Web (link) */}
            <Link
              href="/desenvolvimento-web"
              className="block p-6 rounded-2xl bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700 shadow-lg hover:shadow-xl hover:border-blue-500 transition no-underline"
            >
              <article>
                <h3 className="text-xl font-semibold mb-3 text-white">
                  💻 Desenvolvimento Web
                </h3>

                <p className="text-sm text-gray-400">
                  Criação de sites modernos, responsivos e otimizados para SEO.
                </p>
              </article>
            </Link>

            {/* Card 2 - Consultoria & Montagem de PCs (toggle + link para página) */}
            <article className="p-6 rounded-2xl bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700 shadow-lg hover:shadow-xl hover:border-purple-500 transition">
              <h3 className="text-xl font-semibold mb-3 text-white">
                🖥️ Consultoria & Montagem de PCs
              </h3>

              <p className="text-sm text-gray-400">
                Suporte completo na escolha e montagem de computadores
                personalizados.
                {expanded.hardware && (
                  <span className="block mt-2 text-xs text-gray-500">
                    Análise de compatibilidade, otimização de custo-benefício e
                    montagem sob medida para gamers, criadores e empresas.
                  </span>
                )}
              </p>

              <div className="mt-4 flex gap-3">
                <button
                  onClick={() => toggle('hardware')}
                  aria-expanded={!!expanded.hardware}
                  className="px-4 py-2 rounded bg-white text-black font-semibold hover:bg-gray-200 transition"
                >
                  {expanded.hardware ? 'Ler menos' : 'Ler mais'}
                </button>

                <Link
                  href="/consultoria-montagem"
                  className="px-4 py-2 rounded bg-purple-600 text-white font-semibold hover:bg-purple-500 transition"
                >
                  Ver serviço
                </Link>
              </div>
            </article>

            {/* Card 3 - Manutenção & Suporte (link) */}
            <Link
              href="/manutencao-suporte"
              className="block p-6 rounded-2xl bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700 shadow-lg hover:shadow-xl hover:border-green-500 transition no-underline"
            >
              <article>
                <h3 className="text-xl font-semibold mb-3 text-white">
                  🔧 Manutenção & Suporte
                </h3>

                <p className="text-sm text-gray-400">
                  Monitoramento e suporte técnico para manter sistemas sempre
                  ativos.
                </p>
              </article>
            </Link>
          </div>
        </section>

        {/* PROJETOS */}
        <section id="projetos" className="mb-20">
          <h2 className="text-3xl font-bold text-center mb-12">Projetos</h2>

          <div className="grid gap-8 md:grid-cols-3">
            <article className="p-6 rounded-2xl bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700 shadow-lg hover:shadow-xl hover:border-blue-500 transition">
              <h3 className="text-lg font-semibold mb-3 text-white">
                Projeto CS2
              </h3>

              <p className="text-sm mb-4 text-gray-400">
                Plataforma voltada para Counter-Strike 2, reunindo utilidades e
                táticas de jogo. Construído com Next.js, JavaScript, React,
                Lucide Icons, Tailwind CSS e CSS Animations.
              </p>

              <a
                href="https://sitecs2.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 rounded bg-white text-black font-semibold hover:bg-gray-200 transition"
              >
                Acesse o site
              </a>
            </article>

            <article className="p-6 rounded-2xl bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700 shadow-lg hover:shadow-xl hover:border-purple-500 transition">
              <h3 className="text-lg font-semibold mb-3 text-white">
                Projeto 2
              </h3>

              <p className="text-sm mb-4 text-gray-400">
                Plataforma de e-commerce personalizada com checkout otimizado.
              </p>
            </article>

            <article className="p-6 rounded-2xl bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700 shadow-lg hover:shadow-xl hover:border-green-500 transition">
              <h3 className="text-lg font-semibold mb-3 text-white">
                Projeto 3
              </h3>

              <p className="text-sm mb-4 text-gray-400">
                Dashboard interativo para análise de dados em tempo real.
              </p>
            </article>
          </div>
        </section>

        {/* CONTATO */}
        <section id="contato" className="mb-20">
          <h2 className="text-3xl font-bold text-center mb-8">Contato</h2>

          <p className="text-center mb-6 text-gray-400">
            Entre em contato para discutir projetos ou consultoria.
          </p>

          <div className="flex justify-center gap-6">
            <a
              href="mailto:juanlavecchia23@gmail.com"
              className="px-6 py-3 rounded-lg bg-white text-black hover:bg-gray-200 transition"
            >
              Email
            </a>

            <a
              href="https://github.com/Smxke28"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 rounded-lg bg-gray-700 text-white hover:bg-gray-600 transition"
            >
              GitHub
            </a>

            <a
              href="https://www.linkedin.com/in/juan-lavecchia-8b3b5131a/"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 rounded-lg bg-gray-700 text-white hover:bg-gray-600 transition"
            >
              LinkedIn
            </a>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="py-6 text-center text-sm bg-gray-900 text-gray-400">
        © {new Date().getFullYear()} Juan • Desenvolvedor Web & Consultor em TI
      </footer>
    </div>
  );
}
