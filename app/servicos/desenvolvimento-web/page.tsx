'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function DesenvolvimentoWebPage() {
  const [expanded, setExpanded] = useState(false);

  // Definição da constante cardBase
  const cardBase =
    "p-6 rounded-2xl border border-gray-800 bg-gradient-to-br from-gray-900 to-black shadow-lg transition-transform duration-300 hover:-translate-y-2 hover:shadow-2xl hover:border-purple-600";

  return (
    <section id="projetos" className="py-20">
      <h2 className="text-3xl font-bold text-center mb-12 text-white tracking-wide">
        Projetos em destaque
      </h2>

      <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {/* 🔥 PROJETO PRINCIPAL - CS2 */}
        <a
          href="https://sitecs2.vercel.app/"
          target="_blank"
          rel="noopener noreferrer"
          className={`${cardBase} md:col-span-2`}
        >
          <h3 className="text-2xl font-semibold mb-3 text-white">
            Projeto CS2
          </h3>
          <p className="text-gray-400 text-sm mb-6 max-w-2xl leading-relaxed">
            Plataforma dedicada ao Counter-Strike 2, reunindo ferramentas,
            conteúdo e recursos para a comunidade. Projeto real, público e em evolução.
          </p>
          <div className="flex flex-wrap gap-2 mb-6">
            <span className="tag">Next.js</span>
            <span className="tag">Vercel</span>
            <span className="tag">SEO</span>
            <span className="tag">UI Moderna</span>
          </div>
          <span className="inline-block px-6 py-3 rounded-lg bg-white text-black font-semibold hover:bg-gray-200 transition">
            Acessar projeto →
          </span>
        </a>

        {/* Projeto secundário */}
        <article className={cardBase}>
          <h3 className="text-lg font-semibold mb-3 text-white">
            Dashboard Web
          </h3>
          <p className="text-gray-400 text-sm leading-relaxed">
            Dashboard interativo para visualização e análise de dados em tempo real.
          </p>
          <div className="flex flex-wrap gap-2 mt-4">
            <span className="tag">React</span>
            <span className="tag">Tailwind</span>
            <span className="tag">Charts.js</span>
          </div>
        </article>

        {/* Novo Projeto - Loja Virtual */}
        <article className={cardBase}>
          <h3 className="text-lg font-semibold mb-3 text-white">
            Loja Virtual
          </h3>
          <p className="text-gray-400 text-sm leading-relaxed">
            Plataforma de e-commerce com carrinho inteligente, integração de pagamentos e painel administrativo.
          </p>
          <div className="flex flex-wrap gap-2 mt-4">
            <span className="tag">Next.js</span>
            <span className="tag">Stripe</span>
            <span className="tag">CMS</span>
          </div>
        </article>

        {/* Novo Projeto - Blog Tech */}
        <article className={cardBase}>
          <h3 className="text-lg font-semibold mb-3 text-white">
            Blog Tech
          </h3>
          <p className="text-gray-400 text-sm leading-relaxed">
            Blog moderno com foco em tecnologia, otimizado para SEO e com suporte a múltiplos autores.
          </p>
          <div className="flex flex-wrap gap-2 mt-4">
            <span className="tag">Next.js</span>
            <span className="tag">Markdown</span>
            <span className="tag">SEO</span>
          </div>
        </article>

        {/* Novo Projeto - Sistema de Reservas */}
        <article className={cardBase}>
          <h3 className="text-lg font-semibold mb-3 text-white">
            Sistema de Reservas
          </h3>
          <p className="text-gray-400 text-sm leading-relaxed">
            Aplicação para agendamento de serviços com calendário integrado e notificações automáticas.
          </p>
          <div className="flex flex-wrap gap-2 mt-4">
            <span className="tag">React</span>
            <span className="tag">Firebase</span>
            <span className="tag">UX Design</span>
          </div>
        </article>
      </div>
    </section>
  );
}
