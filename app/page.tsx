"use client";

import { useState } from "react";

export default function Home() {
  const [showMore, setShowMore] = useState(false);

  return (
    <div className="relative min-h-screen font-sans">
      {/* Conteúdo principal */}
      <div className="relative z-10 flex flex-col min-h-screen">
        {/* Hero Section COM imagem de fundo apenas aqui */}
        <header className="relative flex flex-col items-center justify-center flex-grow text-center p-12">
          {/* Imagem de fundo somente no header */}
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: "url('/linha.jpeg')" }}
          />
          {/* Overlay escuro para contraste */}
          <div className="absolute inset-0 bg-black/40 dark:bg-black/60" />

          {/* Conteúdo do hero */}
          <div className="relative z-10">
            <h1 className="text-5xl font-bold text-white mb-6">Bem-vindo</h1>
            <p className="text-lg text-gray-200 max-w-2xl mb-10">
              Sou Juan, desenvolvedor web e consultor em TI. Aqui você encontra meus
              serviços, projetos e formas de contato.
            </p>
            {/* Botões centralizados */}
            <div className="flex justify-center gap-6">
              <a
                href="#servicos"
                className="px-6 py-3 rounded bg-blue-600 text-white hover:bg-blue-700 transition"
              >
                Ver Serviços
              </a>
              <a
                href="#projetos"
                className="px-6 py-3 rounded bg-gray-200 text-gray-900 hover:bg-gray-300 transition"
              >
                Meus Projetos
              </a>
            </div>
          </div>
        </header>

        {/* Seção de Serviços */}
        <section id="servicos" className="py-16 bg-white/90 dark:bg-black/70">
          <h2 className="text-3xl font-bold text-center mb-8 text-gray-900 dark:text-white">
            Serviços
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto px-6">
            {/* Card 1 */}
            <div className="p-6 rounded-lg shadow-lg bg-gradient-to-br from-blue-950 via-black to-black text-white">
              <h3 className="text-xl font-semibold mb-4">Desenvolvimento Web</h3>
              <p>Criação de sites modernos, responsivos e otimizados para SEO.</p>
            </div>

            {/* Card 2 com botão Ler mais e imagem de fundo */}
            <div
              className="relative p-6 rounded-lg shadow-lg text-white flex flex-col items-center justify-between bg-cover bg-center"
              style={{ backgroundImage: "url('/central.jpg')" }}
            >
              <h3 className="text-xl font-semibold mb-4 text-center">
                Consultoria em Hardware & Montagem de PCs
              </h3>
              <p className="text-center">
                Ofereço suporte completo na escolha e montagem de computadores
                personalizados, seja para jogos, trabalho ou uso profissional.
                {showMore && (
                  <>
                    {" "}
                    Realizo análise técnica de compatibilidade entre componentes,
                    garantindo desempenho, estabilidade e eficiência energética.
                    Além disso, ajudo você a encontrar o melhor custo-benefício,
                    montando PCs sob medida para gamers, criadores de conteúdo e
                    empresas que buscam performance e confiabilidade. Em resumo:
                    acompanho todo o processo para que você tenha o PC ideal, com
                    qualidade e segurança.
                  </>
                )}
              </p>
              {/* Botão centralizado */}
              <div className="mt-6 flex justify-center w-full">
                <button
                  onClick={() => setShowMore(!showMore)}
                  className="px-6 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 transition"
                >
                  {showMore ? "Ler menos" : "Ler mais"}
                </button>
              </div>
            </div>

            {/* Card 3 */}
            <div className="p-6 rounded-lg shadow-lg bg-gradient-to-br from-blue-950 via-black to-black text-white">
              <h3 className="text-xl font-semibold mb-4">Manutenção & Suporte</h3>
              <p>Monitoramento e suporte técnico para manter sistemas sempre ativos.</p>
            </div>
          </div>
        </section>

        {/* Seção de Projetos (menor) */}
        <section id="projetos" className="py-12 bg-gray-100 dark:bg-gray-900">
          <h2 className="text-2xl font-bold text-center mb-6 text-gray-900 dark:text-white">
            Projetos
          </h2>

          <div className="grid gap-6 md:grid-cols-3 max-w-5xl mx-auto px-6">
            {/* Projeto 1 — Preview ao vivo (compacto) com legenda */}
            <div className="group p-4 rounded-xl bg-gradient-to-br from-blue-900 via-black to-gray-900 shadow-lg hover:shadow-xl transition-all">
              <h3 className="text-lg font-semibold mb-3 group-hover:text-blue-400 transition-colors">
                Projeto 1
              </h3>

              <figure>
                <div className="mb-3 rounded-lg overflow-hidden border border-gray-700 shadow-md group-hover:shadow-lg transition-shadow">
                  <iframe
                    src="https://sitecs2.vercel.app/"
                    className="w-full h-44 bg-black"
                    title="Preview Projeto 1"
                  />
                </div>

                <figcaption className="text-sm leading-relaxed opacity-90 text-gray-100">
                  Plataforma voltada para o Counter-Strike 2, criada para reunir utilidades,
                  execuções, smokes, flashes e táticas de jogo. O projeto tem como propósito
                  estudar e evoluir em desenvolvimento web, experiência do usuário e práticas
                  modernas de frontend, funcionando também como repositório pessoal de estratégias.
                  {showMore && (
                    <>
                      {" "}
                      Construído com Next.js, React, TypeScript e Tailwind CSS, o site combina
                      design moderno, animações e organização visual. Todos os vídeos utilizados
                      são de autoria original no YouTube, e o projeto é continuamente expandido
                      por Juan Lavecchia, unindo aprendizado em programação com a paixão pelo CS2.{" "}
                      <a
                        href="https://sitecs2.vercel.app/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-red-400 underline hover:text-red-500"
                      >
                        Acesse o site
                      </a>
                    </>
                  )}
                </figcaption>
              </figure>

              <div className="mt-3">
                <button
                  onClick={() => setShowMore((v) => !v)}
                  className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 transition"
                >
                  {showMore ? "Ler menos" : "Ler mais"}
                </button>
              </div>
            </div>

            {/* Projeto 2 — sem link por enquanto */}
            <div className="p-4 rounded-xl bg-gradient-to-br from-blue-950 via-black to-black text-white shadow-lg">
              <img
                src="/projeto2.jpg"
                alt="Projeto 2"
                className="w-full h-40 object-cover rounded-md mb-3"
              />
              <h3 className="text-lg font-semibold mb-1">Projeto 2</h3>
              <p className="text-xs opacity-90">Plataforma de e-commerce personalizada.</p>
            </div>

            {/* Projeto 3 — sem link por enquanto */}
            <div className="p-4 rounded-xl bg-gradient-to-br from-blue-950 via-black to-black text-white shadow-lg">
              <img
                src="/projeto3.jpg"
                alt="Projeto 3"
                className="w-full h-40 object-cover rounded-md mb-3"
              />
              <h3 className="text-lg font-semibold mb-1">Projeto 3</h3>
              <p className="text-xs opacity-90">Dashboard interativo para análise de dados.</p>
            </div>
          </div>
        </section>

        {/* Seção de Contato */}
        <section id="contato" className="relative py-16">
          {/* Imagem de fundo */}
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: "url('/cont1.jpg')" }}
          />
          {/* Overlay gradiente preto mais escuro */}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black to-black opacity-90" />

          {/* Conteúdo acima da imagem */}
          <div className="relative z-10">
            <h2 className="text-3xl font-bold text-center mb-8 text-white">
              Contatos
            </h2>
            <p className="text-center text-gray-200 mb-6">
              Entre em contato para discutir projetos ou consultoria.
            </p>
            <div className="flex justify-center gap-6">
              <a
                href="mailto:juanlavecchia23@gmail.com"
                className="px-6 py-3 rounded bg-blue-600 text-white hover:bg-blue-700 transition"
              >
                Email
              </a>
              {/* Substituído WhatsApp por GitHub */}
              <a
                href="https://github.com/Smxke28"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 rounded bg-gray-800 text-white hover:bg-gray-700 transition"
              >
                GitHub
              </a>
              <a
                href="https://www.linkedin.com/in/juan-lavecchia-8b3b5131a/"
                target="_blank"
                className="px-6 py-3 rounded bg-blue-800 text-white hover:bg-blue-900 transition"
              >
                LinkedIn
              </a>
            </div>
          </div>
        </section>

        {/* Rodapé */}
        <footer className="w-full py-6 text-center text-sm text-white mt-auto bg-gradient-to-r from-blue-900 via-blue-800 to-blue-700">
          © {new Date().getFullYear()} Juan • Desenvolvedor Web & Consultor em TI
        </footer>
      </div>
    </div>
  );
}
