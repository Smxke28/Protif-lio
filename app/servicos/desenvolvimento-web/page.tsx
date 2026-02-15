'use client';

import { motion } from 'framer-motion';

export default function DesenvolvimentoWebPage() {
  return (
    <section
      className="min-h-screen pt-32 pb-24 px-6
      bg-gradient-to-b from-black via-gray-950 to-black
      text-gray-100"
    >
      {/* HEADER */}
      <motion.header
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl mx-auto text-center mb-24"
      >
        <span className="inline-block mb-4 px-4 py-1 rounded-full text-sm
          bg-white/5 border border-white/10 text-gray-300">
          Serviços
        </span>

        <h1
          className="text-5xl md:text-6xl font-extrabold mb-6
          bg-gradient-to-r from-white to-gray-400
          bg-clip-text text-transparent"
        >
          Desenvolvimento Web
        </h1>

        <p className="text-lg text-gray-400 leading-relaxed">
          Criação de soluções web modernas, rápidas e escaláveis,
          com foco em experiência do usuário, performance e resultados.
        </p>
      </motion.header>

      {/* GRID */}
      <div className="max-w-7xl mx-auto grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
        {servicos.map((servico, index) => (
          <Servico key={index} {...servico} index={index} />
        ))}
      </div>

      {/* CTA FINAL */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4 }}
        className="mt-28 text-center"
      >
        <h2 className="text-3xl md:text-4xl font-bold mb-6">
          Vamos começar seu projeto?
        </h2>

        <p className="text-gray-400 mb-10 max-w-xl mx-auto">
          Me conte sua ideia e eu retorno com a melhor solução possível.
        </p>

        <a
          href="/contato"
          className="inline-flex items-center gap-2
          px-10 py-4 rounded-xl font-semibold text-lg
          bg-white text-black hover:bg-gray-200
          transition shadow-lg"
        >
          Entrar em contato →
        </a>
      </motion.div>
    </section>
  );
}

/* ================= CARD ================= */

function Servico({
  titulo,
  descricao,
  tecnologias,
  botao,
  index,
}: any) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.08 }}
      className="group relative rounded-2xl p-7
      bg-gradient-to-br from-gray-900 to-gray-800
      border border-gray-800
      shadow-lg hover:shadow-xl
      transition-all duration-300
      hover:-translate-y-1"
    >
      <h3 className="text-2xl font-semibold mb-3 text-white">
        {titulo}
      </h3>

      <p className="text-sm text-gray-400 leading-relaxed mb-6">
        {descricao}
      </p>

      {/* TAGS */}
      <div className="flex flex-wrap gap-2 mb-6">
        {tecnologias.map((tech: string) => (
          <span
            key={tech}
            className="px-3 py-1 text-xs rounded-full
            bg-white/5 text-gray-300 border border-white/10"
          >
            {tech}
          </span>
        ))}
      </div>

      {/* BOTÃO */}
      <a
        href="/contato"
        className="inline-flex items-center gap-2
        px-5 py-2.5 rounded-lg font-semibold
        bg-white text-black
        hover:bg-gray-200 transition"
      >
        {botao} →
      </a>

      {/* GLOW */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100
        bg-white/5 blur-2xl transition pointer-events-none"
      />
    </motion.article>
  );
}

/* ================= DADOS ================= */

const servicos = [
  {
    titulo: 'Sites Institucionais',
    descricao:
      'Sites profissionais, rápidos e responsivos, pensados para fortalecer sua presença digital.',
    tecnologias: ['Next.js', 'SEO', 'Responsivo'],
    botao: 'Solicitar site',
  },
  {
    titulo: 'Sistemas Web',
    descricao:
      'Sistemas sob medida com autenticação, dashboards e regras de negócio.',
    tecnologias: ['React', 'APIs', 'Autenticação'],
    botao: 'Solicitar sistema',
  },
  {
    titulo: 'Landing Pages',
    descricao:
      'Páginas focadas em conversão para campanhas e geração de leads.',
    tecnologias: ['UX', 'Performance', 'Conversão'],
    botao: 'Criar landing page',
  },
  {
    titulo: 'E-commerce',
    descricao:
      'Lojas virtuais completas com checkout e integrações de pagamento.',
    tecnologias: ['Stripe', 'Checkout', 'Admin'],
    botao: 'Criar e-commerce',
  },
  {
    titulo: 'Performance & SEO',
    descricao:
      'Otimização de velocidade, SEO técnico e melhoria de experiência.',
    tecnologias: ['SEO', 'Performance', 'Core Web Vitals'],
    botao: 'Otimizar site',
  },
  {
    titulo: 'Manutenção & Evolução',
    descricao:
      'Manutenção contínua, melhorias e evolução do seu sistema.',
    tecnologias: ['Suporte', 'Escalabilidade', 'Código limpo'],
    botao: 'Contratar suporte',
  },
];
