'use client';

import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

export default function ConsultoriaMontagemPage() {
  return (
    <main className="relative min-h-[60vh] font-sans">
      {/* Imagem de fundo Mont2.png */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/Mont2.png')" }}
        aria-hidden="true"
      />

      {/* Overlay escuro */}
      <div className="absolute inset-0 bg-black/40 dark:bg-black/60" />

      {/* Conteúdo principal */}
      <div className="relative z-10 flex flex-col min-h-screen">
        {/* Hero Section */}
        <header className="flex flex-col items-center justify-center text-center p-12">
          <h1 className="text-4xl font-bold text-white mb-6">Consultoria & Montagem</h1>
          <p className="text-lg text-gray-200 max-w-2xl">
            Orientação especializada na escolha de componentes e soluções de hardware para cada necessidade.
          </p>
        </header>

        {/* Seção de tópicos */}
        <section className="py-16">
          <div className="max-w-5xl mx-auto px-6 grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Análise de Compatibilidade */}
            <div className="p-6 rounded-lg shadow-lg bg-gradient-to-br from-blue-950 via-black to-black text-white hover:scale-105 transition-transform">
              <h3 className="text-xl font-semibold mb-4">Análise de Compatibilidade</h3>
              <p className="text-sm leading-relaxed">
                Verificação de compatibilidade entre processadores, placas-mãe, memórias e outros componentes.
              </p>
            </div>

            {/* Upgrade de Hardware com imagem Mont1.png */}
            <div className="rounded-lg shadow-lg bg-gradient-to-br from-blue-950 via-black to-black text-white overflow-hidden hover:scale-105 transition-transform">
              <div className="relative h-40 w-full">
                <Image
                  src="/Mont1.png"
                  alt="Upgrade de Hardware"
                  fill
                  className="object-cover"
                  priority
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

        {/* CTA e links úteis */}
        <section className="py-8">
          <div className="max-w-5xl mx-auto px-6 text-center">
            <p className="text-gray-200 mb-6">
              Quer um orçamento ou uma análise personalizada? Solicite uma avaliação.
            </p>

            <div className="flex justify-center gap-4">
              <Link
                href="/contato"
                className="inline-block px-6 py-3 rounded-md bg-blue-600 text-white font-medium hover:bg-blue-500 transition"
                aria-label="Ir para contato"
              >
                Solicitar orçamento
              </Link>

              <Link
                href="/servicos"
                className="inline-block px-6 py-3 rounded-md bg-gray-800 text-white font-medium hover:bg-gray-700 transition"
                aria-label="Voltar para serviços"
              >
                Ver outros serviços
              </Link>
            </div>
          </div>
        </section>

        {/* Rodapé */}
        <footer className="w-full py-6 text-center text-sm text-white mt-auto bg-gradient-to-r from-blue-900 via-blue-800 to-blue-700">
          © {new Date().getFullYear()} Juan • Consultoria & Montagem
        </footer>
      </div>
    </main>
  );
}
