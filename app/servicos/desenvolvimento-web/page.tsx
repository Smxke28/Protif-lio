"use client";

import React from "react";

export default function DesenvolvimentoWeb() {
  return (
    <div
      className="flex flex-col min-h-screen bg-cover bg-center font-sans"
      style={{ backgroundImage: "url('/linha.jpeg')" }}
    >
      {/* Hero */}
      <header className="flex flex-col items-center justify-center text-center bg-black/60 p-12">
        <h1 className="text-4xl font-bold text-white mb-4">Desenvolvimento Web</h1>
        <p className="text-lg text-gray-200 max-w-2xl">
          Desenvolvimento de aplicações web modernas, responsivas e performáticas. Trabalho com
          front-end, back-end e integrações para transformar ideias em produtos digitais
          funcionais e escaláveis.
        </p>
      </header>

      {/* Serviços principais */}
      <section className="py-16 bg-white/90 dark:bg-black/70">
        <div className="max-w-5xl mx-auto px-6 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          <article className="p-6 rounded-lg shadow-lg bg-white dark:bg-gray-800 flex flex-col">
            <h3 className="text-xl font-semibold mb-3">Sites Institucionais</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4 flex-1">
              Páginas institucionais com foco em identidade visual, usabilidade e apresentação
              profissional da empresa ou projeto.
            </p>
            <a
              href="/contato"
              className="inline-block w-full text-center px-4 py-2 rounded-md text-white font-medium
                bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 transition"
              aria-label="Solicitar site institucional"
            >
              Solicitar site institucional
            </a>
          </article>

          <article className="p-6 rounded-lg shadow-lg bg-white dark:bg-gray-800 flex flex-col">
            <h3 className="text-xl font-semibold mb-3">E‑commerce</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4 flex-1">
              Lojas virtuais personalizadas, integração com gateways de pagamento, painel de
              administração e otimização para conversão.
            </p>
            <a
              href="/contato"
              className="inline-block w-full text-center px-4 py-2 rounded-md text-white font-medium
                bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-700 hover:to-indigo-600 transition"
              aria-label="Solicitar e-commerce"
            >
              Solicitar e‑commerce
            </a>
          </article>

          <article className="p-6 rounded-lg shadow-lg bg-white dark:bg-gray-800 flex flex-col">
            <h3 className="text-xl font-semibold mb-3">Landing Pages</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4 flex-1">
              Páginas otimizadas para campanhas, captação de leads e testes A/B com foco em
              performance e conversão.
            </p>
            <a
              href="/contato"
              className="inline-block w-full text-center px-4 py-2 rounded-md text-white font-medium
                bg-gradient-to-r from-pink-600 to-pink-500 hover:from-pink-700 hover:to-pink-600 transition"
              aria-label="Solicitar landing page"
            >
              Solicitar landing page
            </a>
          </article>

          <article className="p-6 rounded-lg shadow-lg bg-white dark:bg-gray-800 flex flex-col">
            <h3 className="text-xl font-semibold mb-3">APIs e Integrações</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4 flex-1">
              Desenvolvimento de APIs REST/GraphQL, integrações com bancos de dados (MySQL/Postgres)
              e serviços externos (pagamentos, autenticação, etc.).
            </p>
            <a
              href="/contato"
              className="inline-block w-full text-center px-4 py-2 rounded-md text-white font-medium
                bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-700 hover:to-emerald-600 transition"
              aria-label="Solicitar APIs e integrações"
            >
              Solicitar APIs
            </a>
          </article>

          <article className="p-6 rounded-lg shadow-lg bg-white dark:bg-gray-800 flex flex-col">
            <h3 className="text-xl font-semibold mb-3">Performance e SEO</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4 flex-1">
              Otimização de performance, melhores práticas de SEO técnico e carregamento rápido
              para melhorar experiência do usuário e posicionamento.
            </p>
            <a
              href="/contato"
              className="inline-block w-full text-center px-4 py-2 rounded-md text-white font-medium
                bg-gradient-to-r from-yellow-600 to-yellow-500 hover:from-yellow-700 hover:to-yellow-600 transition"
              aria-label="Solicitar otimização de performance"
            >
              Otimização e SEO
            </a>
          </article>

          <article className="p-6 rounded-lg shadow-lg bg-white dark:bg-gray-800 flex flex-col">
            <h3 className="text-xl font-semibold mb-3">Manutenção e Deploy</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4 flex-1">
              Suporte a deploys (Vercel, Netlify, servidores), monitoramento e manutenção contínua
              para manter aplicações estáveis e atualizadas.
            </p>
            <a
              href="/contato"
              className="inline-block w-full text-center px-4 py-2 rounded-md text-white font-medium
                bg-gradient-to-r from-rose-600 to-rose-500 hover:from-rose-700 hover:to-rose-600 transition"
              aria-label="Solicitar manutenção e deploy"
            >
              Manutenção e deploy
            </a>
          </article>
        </div>
      </section>

      {/* Tecnologias e fluxo de trabalho */}
      <section className="py-12 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Tecnologias e fluxo</h2>
          <p className="text-gray-700 dark:text-gray-300 mb-6">
            Trabalho com Next.js, React, TypeScript, Tailwind CSS, Node.js e bancos relacionais (MySQL/Postgres).
            Meu processo inclui levantamento de requisitos, prototipação, desenvolvimento iterativo, testes e deploy.
          </p>

          <div className="flex flex-wrap gap-3">
            {[
              "Next.js",
              "React",
              "TypeScript",
              "Tailwind CSS",
              "Node.js",
              "MySQL",
              "PostgreSQL",
              "Vercel",
            ].map((tech) => (
              <span
                key={tech}
                className="px-3 py-1 rounded-full bg-gradient-to-r from-gray-200 to-gray-100 dark:from-gray-800 dark:to-gray-700 text-sm text-gray-800 dark:text-gray-100"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Chamada final para contato */}
      <section className="py-12 bg-white/90 dark:bg-black/70">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h3 className="text-xl font-semibold mb-3">Pronto para começar?</h3>
          <p className="text-gray-700 dark:text-gray-300 mb-6">
            Se você tem um projeto ou precisa de uma solução web, entre em contato para conversarmos sobre requisitos e orçamento.
          </p>
          <a
            href="/contato"
            className="inline-block px-6 py-3 rounded-md text-white font-medium
              bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 transition"
            aria-label="Ir para página de contato"
          >
            Entrar em contato
          </a>
        </div>
      </section>

      {/* Rodapé */}
      <footer className="w-full py-6 text-center text-sm text-white mt-auto bg-gradient-to-r from-blue-900 via-blue-800 to-blue-700">
        © {new Date().getFullYear()} Juan • Desenvolvimento Web
      </footer>
    </div>
  );
}
