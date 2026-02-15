'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function Home() {
  const [expanded, setExpanded] = useState<Record<string, boolean>>({
    hardware: false,
  });

  const toggle = (id: string) => {
    setExpanded((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-black via-gray-950 to-black text-gray-100">
      {/* ================= HERO ================= */}
      <motion.header
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="pt-32 pb-24 px-6 text-center"
      >
        <h1 className="text-5xl md:text-6xl font-extrabold leading-tight">
          Olá, eu sou{' '}
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
            Juan
          </span>
        </h1>

        <p className="mt-6 text-lg text-gray-400 max-w-2xl mx-auto leading-relaxed">
          Desenvolvedor web e consultor em TI. Transformo ideias em produtos
          digitais funcionais, rápidos e bem construídos.
        </p>

        <div className="mt-10 flex flex-wrap gap-4 justify-center">
          <Link
            href="/servicos"
            className="px-6 py-3 rounded-lg bg-white text-black font-semibold
            hover:bg-gray-200 transition"
          >
            Ver serviços →
          </Link>

          <Link
            href="/projetos"
            className="px-6 py-3 rounded-lg bg-gray-800 text-white font-semibold
            hover:bg-gray-700 transition"
          >
            Meus projetos
          </Link>
        </div>
      </motion.header>

      {/* ================= SERVIÇOS ================= */}
      <section className="max-w-7xl mx-auto px-6 pb-24">
        <h2 className="text-3xl font-bold text-center mb-14">Serviços</h2>

        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {/* Desenvolvimento Web */}
          <ServiceCard
            titulo="💻 Desenvolvimento Web"
            descricao="Sites modernos, rápidos e responsivos, focados em SEO e experiência do usuário."
            tags={['Next.js', 'Tailwind', 'SEO']}
            href="/servicos/desenvolvimento-web"
          />

          {/* Consultoria */}
          <motion.article
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="p-6 rounded-2xl bg-gradient-to-br from-gray-900 to-gray-800
            border border-gray-800 shadow-lg"
          >
            <h3 className="text-xl font-semibold mb-3">
              🖥️ Consultoria & Montagem de PCs
            </h3>

            <p className="text-sm text-gray-400 leading-relaxed">
              Escolha, compatibilidade e montagem de computadores personalizados.
              {expanded.hardware && (
                <span className="block mt-2 text-xs text-gray-500">
                  Ideal para gamers, criadores, empresas e upgrades inteligentes
                  com foco em custo-benefício.
                </span>
              )}
            </p>

            <div className="mt-6 flex gap-3">
              <button
                onClick={() => toggle('hardware')}
                className="px-4 py-2 rounded bg-white text-black font-semibold
                hover:bg-gray-200 transition"
              >
                {expanded.hardware ? 'Ler menos' : 'Ler mais'}
              </button>

              <Link
                href="/servicos/consultoria-hardware"
                className="px-4 py-2 rounded bg-purple-600 text-white font-semibold
                hover:bg-purple-500 transition"
              >
                Ver serviço →
              </Link>
            </div>
          </motion.article>

          {/* Suporte */}
          <ServiceCard
            titulo="🔧 Manutenção & Suporte"
            descricao="Suporte técnico, manutenção preventiva e otimização de sistemas."
            tags={['Backup', 'SLA', 'Performance']}
            href="/servicos/montagem-pc"
          />
        </div>
      </section>

      {/* ================= PROJETOS ================= */}
      <section className="max-w-7xl mx-auto px-6 pb-24">
        <h2 className="text-3xl font-bold text-center mb-14">Projetos</h2>

        <div className="grid gap-10 md:grid-cols-3">
          <ProjectCard
            titulo="Projeto CS2"
            descricao="Plataforma dedicada ao Counter-Strike 2 com utilidades e táticas."
            link="https://sitecs2.vercel.app/"
          />

          <ProjectCard
            titulo="E-commerce Customizado"
            descricao="Loja virtual com checkout otimizado e painel administrativo."
          />

          <ProjectCard
            titulo="Dashboard em Tempo Real"
            descricao="Visualização de dados com consumo contínuo de APIs."
          />
        </div>
      </section>

      {/* ================= CONTATO ================= */}
      <section className="max-w-4xl mx-auto px-6 pb-24 text-center">
        <h2 className="text-3xl font-bold mb-6">Contato</h2>

        <p className="text-gray-400 mb-10">
          Precisa de um orçamento ou quer conversar sobre um projeto?
        </p>

        <div className="flex flex-wrap gap-4 justify-center">
          <Link
            href="/contato"
            className="px-6 py-3 rounded-lg bg-blue-600 text-white font-semibold
            hover:bg-blue-500 transition"
          >
            Solicitar orçamento
          </Link>

          <a
            href="https://github.com/Smxke28"
            target="_blank"
            rel="noreferrer"
            className="px-6 py-3 rounded-lg bg-gray-800 text-white font-semibold
            hover:bg-gray-700 transition"
          >
            GitHub
          </a>
        </div>
      </section>

      {/* ================= FOOTER ================= */}
      <footer className="py-6 text-center text-sm text-gray-400">
        © {new Date().getFullYear()} Juan • Desenvolvedor Web & Consultor em TI
      </footer>
    </main>
  );
}

/* ================= COMPONENTES ================= */

function ServiceCard({
  titulo,
  descricao,
  tags,
  href,
}: {
  titulo: string;
  descricao: string;
  tags: string[];
  href: string;
}) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="p-6 rounded-2xl bg-gradient-to-br from-gray-900 to-gray-800
      border border-gray-800 shadow-lg hover:shadow-2xl
      transition-all hover:-translate-y-2"
    >
      <h3 className="text-xl font-semibold mb-3">{titulo}</h3>

      <p className="text-sm text-gray-400 mb-4">{descricao}</p>

      <div className="flex flex-wrap gap-2 mb-6">
        {tags.map((tag) => (
          <span
            key={tag}
            className="px-3 py-1 text-xs rounded-full bg-white/5
            text-gray-300 border border-white/10"
          >
            {tag}
          </span>
        ))}
      </div>

      <Link
        href={href}
        className="text-sm font-semibold text-white hover:translate-x-1 transition inline-block"
      >
        Ver serviço →
      </Link>
    </motion.article>
  );
}

function ProjectCard({
  titulo,
  descricao,
  link,
}: {
  titulo: string;
  descricao: string;
  link?: string;
}) {
  return (
    <div className="p-6 rounded-2xl bg-gradient-to-br from-gray-900 to-gray-800
    border border-gray-800 shadow-lg">
      <h3 className="text-lg font-semibold mb-3">{titulo}</h3>
      <p className="text-sm text-gray-400 mb-4">{descricao}</p>

      {link && (
        <a
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          className="px-4 py-2 rounded bg-white text-black font-semibold
          hover:bg-gray-200 transition inline-block"
        >
          Acessar projeto →
        </a>
      )}
    </div>
  );
}
