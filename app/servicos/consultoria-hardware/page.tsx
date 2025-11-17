"use client";

import Image from "next/image";

export default function ConsultoriaHardware() {
  return (
    <div
      className="flex flex-col min-h-[60vh] bg-cover bg-center font-sans"
      style={{ backgroundImage: "url('/mont2.png')" }} // fundo reduzido
    >
      {/* Hero Section */}
      <header className="flex flex-col items-center justify-center text-center bg-black/50 p-12">
        <h1 className="text-4xl font-bold text-white mb-6">Consultoria de Hardware</h1>
        <p className="text-lg text-gray-200 max-w-2xl">
          Orientação especializada na escolha de componentes e soluções de hardware para cada necessidade.
        </p>
      </header>

      {/* Conteúdo principal */}
      <section className="py-16">
        <div className="max-w-5xl mx-auto px-6 grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Análise de Compatibilidade */}
          <div className="p-6 rounded-lg shadow-lg bg-gradient-to-br from-blue-950 via-black to-black text-white hover:scale-105 transition-transform">
            <h3 className="text-xl font-semibold mb-4">Análise de Compatibilidade</h3>
            <p className="text-sm leading-relaxed">
              Verificação de compatibilidade entre processadores, placas-mãe, memórias e outros componentes.
            </p>
          </div>

          {/* Upgrade de Hardware com imagem PNG */}
          <div className="rounded-lg shadow-lg bg-gradient-to-br from-blue-950 via-black to-black text-white overflow-hidden hover:scale-105 transition-transform">
            <div className="relative h-40 w-full">
              <Image
                src="/mont1.png"
                alt="Upgrade de Hardware"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                <h3 className="text-xl font-semibold text-white">Upgrade de Hardware</h3>
              </div>
            </div>
            <div className="p-6">
              <p className="text-sm leading-relaxed">
                Consultoria para atualização de máquinas existentes, aumentando desempenho sem desperdício.
              </p>
              <p className="mt-2 text-xs opacity-80">
                Inclui análise de compatibilidade, escolha de peças ideais e suporte na instalação.
              </p>
            </div>
          </div>

          {/* Eficiência Energética */}
          <div className="p-6 rounded-lg shadow-lg bg-gradient-to-br from-blue-950 via-black to-black text-white hover:scale-105 transition-transform">
            <h3 className="text-xl font-semibold mb-4">Eficiência Energética</h3>
            <p className="text-sm leading-relaxed">
              Escolha de componentes que equilibram performance e consumo energético.
            </p>
          </div>
        </div>
      </section>

      {/* Rodapé */}
      <footer className="w-full py-6 text-center text-sm text-white mt-auto bg-gradient-to-r from-blue-900 via-blue-800 to-blue-700">
        © {new Date().getFullYear()} Juan • Consultoria de Hardware
      </footer>
    </div>
  );
}
