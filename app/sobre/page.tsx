'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

export default function SobrePage() {
  return (
    <main
      className="min-h-screen pt-32 pb-24 px-6
      bg-gradient-to-b from-black via-gray-950 to-black
      text-gray-100"
    >
      {/* HEADER */}
      <motion.header
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-4xl mx-auto text-center mb-20"
      >
        <h1
          className="text-5xl md:text-6xl font-extrabold mb-6
          bg-gradient-to-r from-white to-gray-400
          bg-clip-text text-transparent"
        >
          Sobre mim
        </h1>

        <p className="text-lg text-gray-400 leading-relaxed">
          Portfólio pessoal, aprendizado contínuo e desenvolvimento de soluções modernas
          focadas em performance e experiência do usuário.
        </p>
      </motion.header>

      {/* CONTEÚDO */}
      <div className="max-w-5xl mx-auto space-y-12">
        {/* APRESENTAÇÃO */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="p-8 rounded-2xl
          bg-gradient-to-br from-gray-900 to-gray-800
          border border-gray-800"
        >
          <p className="text-lg text-gray-300 leading-relaxed">
            Olá — sou <strong className="text-white">Juan Lavecchia Coelho da Silva</strong>.
            Este site foi criado como meu <strong className="text-white">portfólio pessoal</strong> e também
            como um espaço de <strong className="text-white">desenvolvimento e aprendizado</strong> na área
            de programação.
            <br />
            <br />
            Aqui reúno projetos, experimentos e estudos que refletem minha evolução em
            tecnologias web e boas práticas de desenvolvimento moderno.
          </p>
        </motion.section>

        {/* FORMAÇÃO */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="p-8 rounded-2xl
          bg-gradient-to-br from-gray-900 to-gray-800
          border border-gray-800"
        >
          <h2 className="text-2xl font-semibold mb-4 text-white">
            Formação
          </h2>

          <p className="text-gray-300">
            Bacharelado em Ciências da Computação — Universidade Estácio de Sá
            <br />
            <span className="text-sm text-gray-400">
              Juiz de Fora, MG • 8º período
            </span>
          </p>
        </motion.section>

        {/* HABILIDADES */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="p-8 rounded-2xl
          bg-gradient-to-br from-gray-900 to-gray-800
          border border-gray-800"
        >
          <h2 className="text-2xl font-semibold mb-6 text-white">
            Habilidades principais
          </h2>

          <div className="flex flex-wrap gap-3">
            {[
              'Next.js',
              'React',
              'TypeScript',
              'Tailwind CSS',
              'HTML',
              'CSS',
              'JavaScript',
              'Node.js',
              'MySQL',
              'PostgreSQL',
              'Git',
              'GitHub',
              'Vercel',
              'Linux',
              'Windows',
            ].map((skill) => (
              <span
                key={skill}
                className="px-4 py-2 text-sm rounded-full
                bg-white/5 text-gray-300
                border border-white/10"
              >
                {skill}
              </span>
            ))}
          </div>
        </motion.section>

        {/* PROJETOS */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="p-8 rounded-2xl
          bg-gradient-to-br from-gray-900 to-gray-800
          border border-gray-800"
        >
          <h2 className="text-2xl font-semibold mb-4 text-white">
            Projetos selecionados
          </h2>

          <ul className="space-y-3 text-gray-300">
            <li>
              • <strong className="text-white">Site pessoal / portfólio</strong> — Next.js,
              TypeScript, Tailwind e deploy na Vercel.
            </li>
            <li>
              • <strong className="text-white">Projetos pessoais</strong> — aplicações focadas
              em backend, APIs, bancos de dados e automação.
            </li>
          </ul>
        </motion.section>

        {/* CTA */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center pt-6"
        >
          <p className="text-gray-400 mb-6">
            Para contato, parcerias ou mais informações:
          </p>

          <div className="flex justify-center gap-4 flex-wrap">
            <a
              href="https://www.linkedin.com/in/juan-lavecchia-8b3b5131a/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2
              px-6 py-3 rounded-lg font-semibold
              bg-blue-600 text-white
              hover:bg-blue-500 transition"
            >
              LinkedIn
            </a>

            <Link
              href="/contato"
              className="inline-flex items-center gap-2
              px-6 py-3 rounded-lg font-semibold
              bg-white text-black
              hover:bg-gray-200 transition"
            >
              Página de contato
            </Link>
          </div>
        </motion.section>
      </div>
    </main>
  );
}
