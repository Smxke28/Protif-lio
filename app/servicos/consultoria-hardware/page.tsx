'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function ConsultoriaMontagemPage() {
  return (
    <main className="relative min-h-screen text-gray-100 overflow-hidden">
      {/* BACKGROUND */}
      <div
        className="absolute inset-0 bg-cover bg-center scale-105"
        style={{ backgroundImage: "url('/Mont2.png')" }}
        aria-hidden
      />
      <div className="absolute inset-0 bg-black/70 backdrop-blur-[2px]" />

      {/* CONTENT */}
      <div className="relative z-10 flex flex-col min-h-screen">
        {/* HERO */}
        <motion.header
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="pt-32 pb-24 px-6 text-center max-w-4xl mx-auto"
        >
          <span className="inline-block mb-5 px-4 py-1 text-sm rounded-full
            bg-white/5 border border-white/10 text-gray-300">
            Serviços
          </span>

          <h1 className="text-5xl md:text-6xl font-extrabold mb-6
            bg-gradient-to-r from-white to-gray-400
            bg-clip-text text-transparent">
            Consultoria & Montagem
          </h1>

          <p className="text-lg text-gray-300 leading-relaxed">
            Orientação especializada para escolha, montagem e upgrade de hardware,
            garantindo compatibilidade, desempenho e eficiência.
          </p>
        </motion.header>

        {/* SERVIÇOS */}
        <section className="pb-28 px-6">
          <div className="max-w-7xl mx-auto grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
            {/* CARD 1 */}
            <ServicoCard
              titulo="Análise de Compatibilidade"
              descricao="Avaliação completa entre processadores, placas-mãe, memórias, fontes e periféricos."
              tags={['Compatibilidade', 'Estabilidade', 'Planejamento']}
            />

            {/* CARD 2 COM IMAGEM */}
            <ServicoImagemCard />

            {/* CARD 3 */}
            <ServicoCard
              titulo="Eficiência Energética"
              descricao="Escolha inteligente de componentes que equilibram consumo, performance e durabilidade."
              tags={['Consumo', 'Fonte', 'Sustentabilidade']}
            />
          </div>
        </section>

        {/* CTA */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="pb-24 px-6 text-center"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Precisa de uma análise personalizada?
          </h2>

          <p className="text-gray-400 mb-10 max-w-xl mx-auto">
            Me diga seu objetivo e eu te ajudo a montar ou evoluir seu setup da forma certa.
          </p>

          <div className="flex justify-center gap-4 flex-wrap">
            <Link
              href="/contato"
              className="px-8 py-4 rounded-xl font-semibold
              bg-white text-black hover:bg-gray-200 transition shadow-lg"
            >
              Solicitar orçamento →
            </Link>

            <Link
              href="/servicos"
              className="px-8 py-4 rounded-xl font-semibold
              bg-white/5 border border-white/10
              text-white hover:bg-white/10 transition"
            >
              Ver outros serviços
            </Link>
          </div>
        </motion.section>

        {/* FOOTER */}
        <footer className="mt-auto py-6 text-center text-sm text-gray-400
          border-t border-white/10 bg-black/40">
          © {new Date().getFullYear()} Juan • Consultoria & Montagem
        </footer>
      </div>
    </main>
  );
}

/* ================= COMPONENTES ================= */

function ServicoCard({
  titulo,
  descricao,
  tags,
}: {
  titulo: string;
  descricao: string;
  tags: string[];
}) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
      className="relative p-7 rounded-2xl
      bg-gradient-to-br from-gray-900 to-gray-800
      border border-gray-800 shadow-lg
      hover:-translate-y-1 transition-all"
    >
      <h3 className="text-2xl font-semibold mb-4">
        {titulo}
      </h3>

      <p className="text-sm text-gray-400 leading-relaxed mb-6">
        {descricao}
      </p>

      <div className="flex flex-wrap gap-2">
        {tags.map(tag => (
          <span
            key={tag}
            className="px-3 py-1 text-xs rounded-full
            bg-white/5 border border-white/10 text-gray-300"
          >
            {tag}
          </span>
        ))}
      </div>
    </motion.article>
  );
}

function ServicoImagemCard() {
  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
      className="rounded-2xl overflow-hidden
      bg-gradient-to-br from-gray-900 to-gray-800
      border border-gray-800 shadow-lg
      hover:-translate-y-1 transition-all"
    >
      <div className="relative h-44 w-full">
        <Image
          src="/Mont1.png"
          alt="Upgrade de Hardware"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
          <h3 className="text-2xl font-semibold">
            Upgrade de Hardware
          </h3>
        </div>
      </div>

      <div className="p-7">
        <p className="text-sm text-gray-400 leading-relaxed mb-3">
          Atualização inteligente de máquinas existentes para extrair
          o máximo desempenho sem gastos desnecessários.
        </p>

        <p className="text-xs text-gray-500">
          Inclui análise de compatibilidade, recomendação de peças
          e suporte na instalação.
        </p>
      </div>
    </motion.article>
  );
}
