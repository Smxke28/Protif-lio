'use client';

import { motion } from 'framer-motion';

export default function DesenvolvimentoWebPage() {
  return (
    <section
      className="min-h-screen pt-32 pb-24 px-6
      bg-gradient-to-b from-black via-gray-950 to-black
      text-gray-100"
    >
      {/* HERO */}
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
          bg-gradient-to-r from-white via-gray-300 to-gray-400
          bg-clip-text text-transparent"
        >
          Desenvolvimento Web
        </h1>

        <p className="text-lg text-gray-400 leading-relaxed">
          Aplicações web modernas, rápidas e escaláveis, criadas para
          gerar resultados reais, melhorar a experiência do usuário
          e sustentar o crescimento do seu negócio.
        </p>
      </motion.header>

      {/* SERVIÇOS */}
      <div className="max-w-7xl mx-auto grid gap-12 sm:grid-cols-2 lg:grid-cols-3">
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
        className="mt-32 text-center"
      >
        <h2 className="text-3xl md:text-4xl font-bold mb-6">
          Pronto para tirar sua ideia do papel?
        </h2>

        <p className="text-gray-400 mb-10 max-w-xl mx-auto">
          Vamos conversar sobre seu projeto e encontrar a melhor solução
          para o seu objetivo.
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
  icone,
  destaque,
  index,
}: any) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.08 }}
      className="group relative rounded-2xl p-8
      bg-gradient-to-br from-gray-900 to-gray-800
      border border-gray-800
      shadow-lg hover:shadow-2xl
      transition-all duration-300
      hover:-translate-y-2"
    >
      {/* DESTAQUE */}
      {destaque && (
        <span className="absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-semibold
          bg-blue-500/10 text-blue-400 border border-blue-500/20">
          {destaque}
        </span>
      )}

      {/* ÍCONE */}
      <div className="text-4xl mb-6">{icone}</div>

      <h3 className="text-2xl font-semibold mb-4 text-white">
        {titulo}
      </h3>

      <p className="text-sm text-gray-400 leading-relaxed mb-8">
        {descricao}
      </p>

      {/* TAGS */}
      <div className="flex flex-wrap gap-2">
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
    icone: '💻',
    titulo: 'Sites Institucionais',
    descricao:
      'Sites profissionais, rápidos e responsivos, pensados para fortalecer sua marca e gerar credibilidade.',
    tecnologias: ['Next.js', 'SEO', 'Responsivo'],
    destaque: 'Mais procurado',
  },
  {
    icone: '⚙️',
    titulo: 'Sistemas Web',
    descricao:
      'Sistemas sob medida com autenticação, dashboards, permissões e regras de negócio.',
    tecnologias: ['React', 'APIs', 'Autenticação'],
  },
  {
    icone: '🚀',
    titulo: 'Landing Pages',
    descricao:
      'Páginas focadas em conversão para campanhas, lançamentos e geração de leads.',
    tecnologias: ['UX', 'Performance', 'Conversão'],
  },
  {
    icone: '🛒',
    titulo: 'E-commerce',
    descricao:
      'Lojas virtuais completas com checkout, integrações de pagamento e painel administrativo.',
    tecnologias: ['Stripe', 'Checkout', 'Admin'],
  },
  {
    icone: '⚡',
    titulo: 'Performance & SEO',
    descricao:
      'Otimização de velocidade, SEO técnico e melhoria de Core Web Vitals.',
    tecnologias: ['Lighthouse', 'SEO', 'Performance'],
  },
  {
    icone: '🔧',
    titulo: 'Manutenção & Evolução',
    descricao:
      'Suporte contínuo, melhorias, correções e evolução do seu sistema.',
    tecnologias: ['Suporte', 'Escalabilidade', 'Código limpo'],
  },
];
