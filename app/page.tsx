"use client";

import { useState } from "react";

export default function Home() {
  const [showMore, setShowMore] = useState(false);

  return (
    <div className="relative min-h-screen font-sans">
      {/* Imagem de fundo */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/linha.jpeg')" }}
      />
      {/* Overlay escuro para contraste */}
      <div className="absolute inset-0 bg-black/40 dark:bg-black/60" />

      {/* Conteúdo principal */}
      <div className="relative z-10 flex flex-col min-h-screen">
        {/* Hero Section */}
        <header className="flex flex-col items-center justify-center flex-grow text-center p-12">
          <h1 className="text-5xl font-bold text-white mb-6">Bem-vindo</h1>
          <p className="text-lg text-gray-200 max-w-2xl mb-10">
            Sou Juan, desenvolvedor web e consultor em TI. Aqui você encontra meus
            serviços, projetos e formas de contato.
          </p>
          <div className="flex gap-6">
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
              <p>
                Criação de sites modernos, responsivos e otimizados para SEO.
              </p>
            </div>

            {/* Card 2 com botão Ler mais */}
            <div className="p-6 rounded-lg shadow-lg bg-gradient-to-br from-blue-950 via-black to-black text-white">
              <h3 className="text-xl font-semibold mb-4">
                Consultoria em Hardware & Montagem de PCs
              </h3>
              <p>
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
              <button
                onClick={() => setShowMore(!showMore)}
                className="mt-4 px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 transition"
              >
                {showMore ? "Ler menos" : "Ler mais"}
              </button>
            </div>

            {/* Card 3 */}
            <div className="p-6 rounded-lg shadow-lg bg-gradient-to-br from-blue-950 via-black to-black text-white">
              <h3 className="text-xl font-semibold mb-4">Manutenção & Suporte</h3>
              <p>
                Monitoramento e suporte técnico para manter sistemas sempre ativos.
              </p>
            </div>
          </div>
        </section>

        {/* Seção de Projetos */}
        <section id="projetos" className="py-16 bg-gray-100 dark:bg-gray-900">
          <h2 className="text-3xl font-bold text-center mb-8 text-gray-900 dark:text-white">
            Projetos
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto px-6">
            {/* Projeto 1 */}
            <div className="rounded-lg overflow-hidden shadow-lg bg-gradient-to-br from-blue-950 via-black to-black text-white">
              <img
                src="/projeto1.jpg"
                alt="Projeto 1"
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">Projeto 1</h3>
                <p>
                  Site institucional para empresa de tecnologia.
                </p>
              </div>
            </div>

            {/* Projeto 2 */}
            <div className="rounded-lg overflow-hidden shadow-lg bg-gradient-to-br from-blue-950 via-black to-black text-white">
              <img
                src="/projeto2.jpg"
                alt="Projeto 2"
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">Projeto 2</h3>
                <p>
                  Plataforma de e-commerce personalizada.
                </p>
              </div>
            </div>

            {/* Projeto 3 */}
            <div className="rounded-lg overflow-hidden shadow-lg bg-gradient-to-br from-blue-950 via-black to-black text-white">
              <img
                src="/projeto3.jpg"
                alt="Projeto 3"
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">Projeto 3</h3>
                <p>
                  Dashboard interativo para análise de dados.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Seção de Contato */}
        <section id="contato" className="py-16 bg-white/90 dark:bg-black/70">
          <h2 className="text-3xl font-bold text-center mb-8 text-gray-900 dark:text-white">
            Contatos
          </h2>
          <p className="text-center text-gray-700 dark:text-gray-300 mb-6">
            Entre em contato para discutir projetos ou consultoria.
          </p>
          <div className="flex justify-center gap-6">
            <a
              href="mailto:juanlavecchia23@gmail.com"
              className="px-6 py-3 rounded bg-blue-600 text-white hover:bg-blue-700 transition"
            >
              Email
            </a>
            <a
              href="https://wa.me/5532988766969"
              target="_blank"
              className="px-6 py-3 rounded bg-green-600 text-white hover:bg-green-700 transition"
            >
              WhatsApp
            </a>
            <a
              href="https://www.linkedin.com/in/juan-lavecchia-8b3b5131a/"
              target="_blank"
              className="px-6 py-3 rounded bg-blue-800 text-white hover:bg-blue-900 transition"
            >
              LinkedIn
            </a>
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
