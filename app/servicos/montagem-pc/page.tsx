"use client";

import { useState } from "react";
import Image from "next/image";

export default function MontagemPC() {
  const [showConfig, setShowConfig] = useState(false);

  return (
    <div className="flex flex-col min-h-screen font-sans bg-black">
      {/* Hero Section */}
      <header className="flex flex-col items-center justify-center text-center bg-black/50 p-12">
        <h1 className="text-4xl font-bold text-white mb-6">Montagem de PCs</h1>
        <p className="text-lg text-gray-200 max-w-2xl">
          Serviço especializado na montagem de computadores personalizados,
          garantindo desempenho, estabilidade e custo-benefício.
        </p>
      </header>

      {/* Conteúdo principal */}
      <section className="py-16">
        <div className="max-w-5xl mx-auto px-6 grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* PC Profissional */}
          <div className="p-6 rounded-lg shadow-lg bg-gradient-to-br from-blue-950 via-black to-black text-white hover:scale-105 transition-transform">
            <h3 className="text-xl font-semibold mb-4">PC Profissional</h3>
            <p className="text-sm leading-relaxed">
              Máquinas otimizadas para edição de vídeo, design gráfico e programação.
            </p>
          </div>

          {/* PC Gamer com imagem */}
          <div className="rounded-lg shadow-lg bg-gradient-to-br from-blue-950 via-black to-black text-white overflow-hidden hover:scale-105 transition-transform">
            <div className="relative h-40 w-full">
              <Image
                src="/central.jpg"
                alt="PC Gamer"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                <h3 className="text-xl font-semibold text-white">PC Gamer</h3>
              </div>
            </div>
            <div className="p-6">
              <p className="text-sm leading-relaxed">
                Montagem de computadores voltados para jogos, com foco em performance gráfica e velocidade.
              </p>
            </div>
          </div>

          {/* PC para Escritório */}
          <div className="p-6 rounded-lg shadow-lg bg-gradient-to-br from-blue-950 via-black to-black text-white hover:scale-105 transition-transform">
            <h3 className="text-xl font-semibold mb-4">PC para Escritório</h3>
            <p className="text-sm leading-relaxed">
              Computadores econômicos e eficientes para tarefas administrativas e uso corporativo.
            </p>
          </div>
        </div>
      </section>

      {/* Botão de configuração no final da página */}
      <section className="mt-auto py-12 px-6 max-w-3xl mx-auto text-center">
        <button
          onClick={() => setShowConfig(!showConfig)}
          className="w-full py-4 rounded-lg font-semibold text-white bg-gradient-to-r from-blue-950 via-blue-900 to-blue-800 hover:scale-105 transition-transform"
        >
          Quer saber minha configuração?
        </button>

        {showConfig && (
          <div className="mt-6 p-6 rounded-lg shadow-lg bg-gradient-to-br from-blue-950 via-black to-black text-white text-left">
            <h3 className="text-2xl font-bold mb-4">Minha Configuração 🖥️</h3>
            <ul className="list-disc list-inside space-y-2 text-sm">
              <li>B550M Tuf Plus</li>
              <li>Ryzen 7 5700x</li>
              <li>RX 7600 8gb</li>
              <li>32Gb Ram 3600hz XPG 45g</li>
              <li>1° Monitor: 1920x1080 Superframe 180hz</li>
              <li>2° Monitor: 1600x900 60hz Samsung</li>
              <li>Controle: 8 bitdoo Ultimate Wireless</li>
              <li>Teclado: Redragon Magic Wand Mini Pro</li>
              <li>Mouse: Redragon King Cobra FPS</li>
              <li>Headset: Havit HV-H2002D</li>
              <li>Microfone: Fifine A6T</li>
            </ul>
          </div>
        )}
      </section>

      {/* Rodapé */}
      <footer className="w-full py-6 text-center text-sm text-white bg-gradient-to-r from-blue-900 via-blue-800 to-blue-700">
        © {new Date().getFullYear()} Juan • Montagem de PCs
      </footer>
    </div>
  );
}
