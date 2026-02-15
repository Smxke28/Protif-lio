'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

export default function MontagemPCPage() {
  const [showConfig, setShowConfig] = useState(false);

  return (
    <main
      className="min-h-screen bg-gradient-to-b from-black via-gray-950 to-black
      text-gray-100 font-sans"
    >
      {/* HERO */}
      <motion.header
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="pt-32 pb-20 px-6 text-center"
      >
        <h1
          className="text-5xl md:text-6xl font-extrabold mb-6
          bg-gradient-to-r from-white to-gray-400
          bg-clip-text text-transparent"
        >
          Montagem de PCs
        </h1>

        <p className="text-lg text-gray-400 max-w-3xl mx-auto leading-relaxed">
          Montagem personalizada de computadores focada em desempenho,
          estabilidade e custo-benefício — do escritório ao setup gamer.
        </p>
      </motion.header>

      {/* CARDS */}
      <section className="pb-24 px-6">
        <div className="max-w-7xl mx-auto grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {/* PC Profissional */}
          <Card
            titulo="PC Profissional"
            descricao="Máquinas otimizadas para edição de vídeo, design, programação e uso profissional intenso."
            botaoCor="bg-blue-600 hover:bg-blue-500"
          />

          {/* PC Gamer */}
          <motion.article
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="group relative rounded-2xl overflow-hidden
            bg-gradient-to-br from-gray-900 to-gray-800
            border border-gray-800
            shadow-lg hover:shadow-2xl
            transition-all hover:-translate-y-2"
          >
            <div className="relative h-44">
              <Image
                src="/central.jpg"
                alt="PC Gamer"
                fill
                className="object-cover opacity-80 group-hover:opacity-100
                group-hover:scale-105 transition duration-500"
                priority
              />
              <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                <h3 className="text-2xl font-semibold text-white">PC Gamer</h3>
              </div>
            </div>

            <div className="p-6">
              <p className="text-sm text-gray-400 leading-relaxed mb-6">
                Computadores voltados para jogos, com foco em performance gráfica,
                estabilidade e alto FPS.
              </p>

              <Link
                href="/contato"
                className="inline-flex items-center gap-2 px-5 py-2.5
                rounded-lg font-semibold bg-purple-600 text-white
                hover:bg-purple-500 transition"
              >
                Solicitar orçamento →
              </Link>
            </div>
          </motion.article>

          {/* PC Escritório */}
          <Card
            titulo="PC para Escritório"
            descricao="Computadores eficientes e econômicos para tarefas administrativas e ambientes corporativos."
            botaoCor="bg-emerald-600 hover:bg-emerald-500"
            delay={0.2}
          />
        </div>
      </section>

      {/* CONFIGURAÇÃO */}
      <section className="pb-24 px-6 max-w-3xl mx-auto text-center">
        <button
          onClick={() => setShowConfig(!showConfig)}
          className="w-full py-4 rounded-xl font-semibold
          bg-gradient-to-r from-gray-800 to-gray-700
          hover:from-gray-700 hover:to-gray-600 transition"
        >
          Quer saber minha configuração?
        </button>

        <AnimatePresence>
          {showConfig && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="mt-8 p-8 rounded-2xl
              bg-gradient-to-br from-gray-900 to-gray-800
              border border-gray-800 text-left"
            >
              <h3 className="text-2xl font-bold mb-6">
                Minha Configuração 🖥️
              </h3>

              <ul className="grid sm:grid-cols-2 gap-3 text-sm text-gray-300">
                <li>B550M TUF Plus</li>
                <li>Ryzen 7 5700X</li>
                <li>RX 7600 8GB</li>
                <li>32GB RAM 3600MHz</li>
                <li>Monitor 180Hz Full HD</li>
                <li>Monitor secundário Samsung</li>
                <li>Controle 8BitDo Ultimate</li>
                <li>Teclado Redragon Magic Wand</li>
                <li>Mouse Redragon King Cobra</li>
                <li>Headset Havit HV-H2002D</li>
                <li>Microfone Fifine A6T</li>
              </ul>

              <div className="mt-6">
                <Link
                  href="/servicos"
                  className="inline-flex items-center gap-2
                  px-4 py-2 rounded-lg bg-gray-700 text-white
                  hover:bg-gray-600 transition text-sm"
                >
                  ← Voltar para serviços
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      {/* FOOTER */}
      <footer className="py-6 text-center text-sm text-gray-400">
        © {new Date().getFullYear()} Juan • Montagem de PCs
      </footer>
    </main>
  );
}

/* ================= CARD BASE ================= */

function Card({
  titulo,
  descricao,
  botaoCor,
  delay = 0,
}: {
  titulo: string;
  descricao: string;
  botaoCor: string;
  delay?: number;
}) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay }}
      className="p-6 rounded-2xl
      bg-gradient-to-br from-gray-900 to-gray-800
      border border-gray-800
      shadow-lg hover:shadow-2xl
      transition-all hover:-translate-y-2"
    >
      <h3 className="text-2xl font-semibold mb-4 text-white">
        {titulo}
      </h3>

      <p className="text-sm text-gray-400 leading-relaxed mb-6">
        {descricao}
      </p>

      <Link
        href="/contato"
        className={`inline-flex items-center gap-2 px-5 py-2.5
        rounded-lg font-semibold text-white transition ${botaoCor}`}
      >
        Solicitar orçamento →
      </Link>
    </motion.article>
  );
}
