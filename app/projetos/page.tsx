"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function ProjetosPage() {
  const [showMore, setShowMore] = useState(false);

  return (
    <div
      className="relative min-h-screen bg-cover bg-center"
      style={{ backgroundImage: "url('/proj1.jpg')" }}
    >
      {/* Overlay escuro */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/70 to-black/90" />

      {/* Conteúdo principal */}
      <div className="relative max-w-6xl mx-auto px-6 py-16 text-white">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-6 text-center tracking-wide">
          Meus Projetos
        </h1>
        <p className="text-lg md:text-xl mb-12 text-center max-w-3xl mx-auto opacity-90">
          Alguns projetos desenvolvidos como exemplo ou para clientes, cada um
          mostrando diferentes soluções e tecnologias aplicadas.
        </p>

        {/* Grid com 3 colunas */}
        <div className="grid gap-8 md:grid-cols-3">
          {/* Projeto 1 */}
          <div className="group p-6 rounded-xl bg-gradient-to-br from-blue-900 via-black to-gray-900 shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300">
            <h2 className="text-2xl font-semibold mb-4 group-hover:text-blue-400 transition-colors">
              Projeto 1
            </h2>

            {/* Preview do projeto */}
            <div className="mb-4 rounded-lg overflow-hidden border border-gray-700 shadow-md group-hover:shadow-lg transition-shadow">
              <iframe
                src="https://sitecs2.vercel.app/"
                className="w-full h-48 rounded-lg"
                title="Preview Projeto 1"
              />
            </div>

            {/* Descrição com "Ler mais" */}
            <p className="text-sm leading-relaxed opacity-90">
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
                  <Link
                    href="https://sitecs2.vercel.app/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-red-400 underline hover:text-red-500"
                  >
                    Acesse o site
                  </Link>
                </>
              )}
            </p>

            {/* Botão Ler mais centralizado */}
            <div className="flex justify-center">
              <button
                onClick={() => setShowMore((prev) => !prev)}
                className="mt-4 px-5 py-2 rounded-lg bg-red-600 hover:bg-red-700 text-white font-semibold text-sm shadow-md hover:shadow-lg transition-all duration-300"
              >
                {showMore ? "Ler menos" : "Ler mais"}
              </button>
            </div>
          </div>

          {/* Projeto 2 */}
          <div className="group p-6 rounded-xl bg-gradient-to-br from-blue-900 via-black to-gray-900 shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300">
            <h2 className="text-2xl font-semibold mb-4 group-hover:text-blue-400 transition-colors">
              Projeto 2
            </h2>
            <div className="mb-4 rounded-lg overflow-hidden border border-gray-700 shadow-md group-hover:shadow-lg transition-shadow">
              <iframe src="" className="w-full h-48 rounded-lg" title="Preview Projeto 2" />
            </div>
            <p className="text-sm leading-relaxed opacity-90">
              Sistema de gerenciamento de tarefas com Node.js e MongoDB,
              oferecendo escalabilidade e segurança.
            </p>
            <p className="mt-2 text-sm opacity-70">
              Painel administrativo, controle de usuários e relatórios dinâmicos.
            </p>
          </div>

          {/* Projeto 3 */}
          <div className="group p-6 rounded-xl bg-gradient-to-br from-blue-900 via-black to-gray-900 shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300">
            <h2 className="text-2xl font-semibold mb-4 group-hover:text-blue-400 transition-colors">
              Projeto 3
            </h2>
            <div className="mb-4 rounded-lg overflow-hidden border border-gray-700 shadow-md group-hover:shadow-lg transition-shadow">
              <iframe src="" className="w-full h-48 rounded-lg" title="Preview Projeto 3" />
            </div>
            <p className="text-sm leading-relaxed opacity-90">
              Site institucional corporativo responsivo, desenvolvido para
              fortalecer a presença digital de empresas.
            </p>
            <p className="mt-2 text-sm opacity-70">
              Estrutura otimizada para SEO, design moderno e integração com redes sociais.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
