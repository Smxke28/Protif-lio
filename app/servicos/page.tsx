'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

export default function ServicosPage() {
  return (
    <main
      className="relative min-h-screen bg-cover bg-center"
      style={{ backgroundImage: "url('/serv1.jpg')" }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />

      {/* Conteúdo */}
      <div
        className="relative z-10 max-w-6xl mx-auto
        pt-32 pb-24 px-6 text-gray-100"
      >
        {/* HEADER */}
        <motion.header
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <h1
            className="text-5xl md:text-6xl font-extrabold mb-6
            bg-gradient-to-r from-white to-gray-400
            bg-clip-text text-transparent"
          >
            Serviços
          </h1>

          <p className="text-lg text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Soluções pensadas para entregar performance, confiabilidade e
            experiência — do código ao hardware.
          </p>
        </motion.header>

        {/* GRID */}
        <div className="grid gap-10 md:grid-cols-3">
          {/* Desenvolvimento Web */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0 }}
          >
            <Link
              href="/servicos/desenvolvimento-web"
              className="group block h-full p-8 rounded-2xl
              bg-gradient-to-br from-gray-900 to-gray-800
              border border-gray-800
              shadow-lg hover:shadow-2xl
              transition-all duration-300
              hover:-translate-y-2"
            >
              <h2 className="text-2xl font-semibold mb-4 text-white">
                Desenvolvimento Web
              </h2>

              <p className="text-sm text-gray-400 leading-relaxed mb-4">
                Criação de sites modernos, rápidos e responsivos, com foco em SEO,
                performance e experiência do usuário.
              </p>

              <p className="text-sm text-gray-300">
                Landing pages, sistemas corporativos, dashboards e e-commerce.
              </p>

              <span
                className="inline-block mt-6 text-sm font-semibold
                text-white group-hover:translate-x-1 transition"
              >
                Ver serviço →
              </span>
            </Link>
          </motion.div>

          {/* Consultoria & Montagem */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <Link
              href="/servicos/consultoria-hardware"
              className="group block h-full p-8 rounded-2xl
              bg-gradient-to-br from-gray-900 to-gray-800
              border border-gray-800
              shadow-lg hover:shadow-2xl
              transition-all duration-300
              hover:-translate-y-2"
            >
              <h2 className="text-2xl font-semibold mb-4 text-white">
                Consultoria & Montagem
              </h2>

              <p className="text-sm text-gray-400 leading-relaxed mb-4">
                Orientação especializada para escolha de componentes,
                garantindo compatibilidade, desempenho e custo-benefício.
              </p>

              <p className="text-sm text-gray-300">
                Ideal para upgrades, PCs de alta performance e setups profissionais.
              </p>

              <span
                className="inline-block mt-6 text-sm font-semibold
                text-white group-hover:translate-x-1 transition"
              >
                Ver serviço →
              </span>
            </Link>
          </motion.div>

          {/* Manutenção & Suporte */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <Link
              href="/servicos/montagem-pc"
              className="group block h-full p-8 rounded-2xl
              bg-gradient-to-br from-gray-900 to-gray-800
              border border-gray-800
              shadow-lg hover:shadow-2xl
              transition-all duration-300
              hover:-translate-y-2"
            >
              <h2 className="text-2xl font-semibold mb-4 text-white">
                Manutenção & Suporte
              </h2>

              <p className="text-sm text-gray-400 leading-relaxed mb-4">
                Manutenção preventiva e corretiva, suporte técnico e
                otimização de sistemas.
              </p>

              <p className="text-sm text-gray-300">
                Atendimento remoto ou presencial, recuperação de dados e performance.
              </p>

              <span
                className="inline-block mt-6 text-sm font-semibold
                text-white group-hover:translate-x-1 transition"
              >
                Ver serviço →
              </span>
            </Link>
          </motion.div>
        </div>
      </div>
    </main>
  );
}
