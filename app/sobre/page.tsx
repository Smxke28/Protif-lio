// app/sobre/page.tsx
import Link from "next/link";

export default function SobrePage() {
  return (
    <div className="max-w-4xl mx-auto p-8">
      <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">
        Sobre
      </h1>

      {/* Propósito do site */}
      <section className="mb-8">
        <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
          Olá — sou <strong>Juan Lavecchia Coelho da Silva</strong>. Este site foi criado como meu
          <strong> portfólio pessoal</strong> e como um espaço de <strong>desenvolvimento e aprendizado</strong> na área
          de programação. Aqui reúno projetos, experimentos e anotações que mostram minha evolução em
          tecnologias web e práticas modernas de desenvolvimento.
        </p>
      </section>

      {/* Formação resumida */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-blue-600 dark:text-blue-400 mb-3">
          Formação
        </h2>
        <p className="text-gray-700 dark:text-gray-300">
          Bacharelado em Ciências da Computação — Universidade Estácio de Sá (Juiz de Fora, MG) — 8º período.
        </p>
      </section>

      {/* Habilidades essenciais */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-blue-600 dark:text-blue-400 mb-3">
          Habilidades principais
        </h2>
        <ul className="grid grid-cols-2 gap-2 text-gray-700 dark:text-gray-300">
          <li>Next.js · React · TypeScript</li>
          <li>Tailwind CSS · HTML · CSS</li>
          <li>Node.js · JavaScript</li>
          <li>MySQL · PostgreSQL · SQL</li>
          <li>Git · GitHub · Vercel</li>
          <li>Linux · Windows</li>
        </ul>
      </section>

      {/* Projetos selecionados */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-blue-600 dark:text-blue-400 mb-3">
          Projetos selecionados
        </h2>
        <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-1">
          <li>
            <strong>Site pessoal / portfólio</strong> — construído com Next.js, TypeScript e Tailwind; deploy em Vercel.
          </li>
          <li>
            <strong>Projetos pessoais</strong> — aplicações e experimentos focados em backend, integração com bancos de dados e automação.
          </li>
        </ul>
      </section>

      {/* Direcionamento para contato com botão do LinkedIn */}
      <section>
        <p className="text-gray-700 dark:text-gray-300 mb-3">
          Para informações de contato e links (e‑mail, telefone e redes), acesse a página{" "}
          <Link href="/contato" className="text-blue-600 dark:text-blue-400 underline">
            Contato
          </Link>
          .
        </p>

        <div className="flex items-center gap-3">
          <a
            href="https://www.linkedin.com/in/juan-lavecchia-8b3b5131a/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-3 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 transition text-sm"
            aria-label="Abrir perfil do LinkedIn de Juan Lavecchia"
          >
            {/* ícone simples de LinkedIn (SVG) */}
            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.761 0 5-2.239 5-5v-14c0-2.761-2.239-5-5-5zm-11 19h-3v-10h3v10zm-1.5-11.268c-.966 0-1.75-.79-1.75-1.764 0-.974.784-1.764 1.75-1.764s1.75.79 1.75 1.764c0 .974-.784 1.764-1.75 1.764zm13.5 11.268h-3v-5.604c0-1.337-.026-3.058-1.865-3.058-1.867 0-2.153 1.459-2.153 2.967v5.695h-3v-10h2.881v1.367h.041c.401-.76 1.379-1.562 2.84-1.562 3.037 0 3.6 2.001 3.6 4.601v5.594z"/>
            </svg>
            Ver meu LinkedIn
          </a>

          <Link href="/contato" className="text-sm text-gray-600 dark:text-gray-300 underline">
            Ir para Contato
          </Link>
        </div>
      </section>

      {/* Nota final */}
      <section className="mt-6">
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Este site é um espaço em constante evolução — atualizo projetos e conteúdos à medida que aprendo
          novas tecnologias e práticas. Obrigado pela visita.
        </p>
      </section>
    </div>
  );
}
