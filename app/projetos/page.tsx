'use client';

import Link from 'next/link';

export default function ProjetosPage() {
  const cardBase =
    'p-6 rounded-2xl border border-gray-800 bg-gradient-to-br from-gray-900 to-black shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl';

  return (
    <div className="min-h-screen bg-black text-gray-100">
      {/* ================= HERO ================= */}
      <header className="pt-28 pb-24 px-6 text-center">
        <h1 className="text-5xl md:text-6xl font-extrabold mb-6">
          Meus Projetos
        </h1>

        <p className="text-gray-400 max-w-2xl mx-auto mb-10 text-lg">
          Aqui estão alguns projetos em que trabalhei. Clique nos cards para ver os projetos reais.
        </p>
      </header>

      {/* ================= PROJETOS ================= */}
      <main className="max-w-6xl mx-auto px-6">
        <section className="mb-28">
          <div className="grid md:grid-cols-3 gap-8">
            {/* 🔥 PROJETO REAL - CS2 */}
            <a
              href="https://sitecs2.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className={`${cardBase} md:col-span-1`}
            >
              <h3 className="text-2xl font-semibold mb-3">
                Projeto CS2
              </h3>

              <p className="text-gray-400 text-sm mb-6">
                Plataforma dedicada ao Counter-Strike 2, reunindo ferramentas,
                conteúdo e recursos para a comunidade.
              </p>

              <div className="flex flex-wrap gap-2 mb-6">
                <span className="tag">Next.js</span>
                <span className="tag">Vercel</span>
                <span className="tag">SEO</span>
                <span className="tag">UI Moderna</span>
              </div>

              <span className="inline-block px-6 py-3 rounded-lg bg-white text-black font-semibold">
                Acessar projeto →
              </span>
            </a>

            {/* 🔥 PROJETO REAL - Funções Java */}
            <a
              href="https://funcoes-java-pg5ixris4-smxke28s-projects.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className={`${cardBase} md:col-span-1`}
            >
              <h3 className="text-2xl font-semibold mb-3">
                Funções em Java
              </h3>

              <p className="text-gray-400 text-sm mb-6">
                Projeto demonstrando funções e conceitos de programação em Java,
                hospedado na Vercel.
              </p>

              <div className="flex flex-wrap gap-2 mb-6">
                <span className="tag">Java</span>
                <span className="tag">Vercel</span>
                <span className="tag">Didático</span>
                <span className="tag">Programação</span>
              </div>

              <span className="inline-block px-6 py-3 rounded-lg bg-white text-black font-semibold">
                Acessar projeto →
              </span>
            </a>

            {/* Projeto genérico 1 */}
            <article className={cardBase}>
              <h3 className="text-lg font-semibold mb-3">
                Projeto 2
              </h3>

              <p className="text-gray-400 text-sm">
                Descrição do projeto 2. Em breve mais detalhes aqui.
              </p>
            </article>

            {/* Projeto genérico 2 */}
            <article className={cardBase}>
              <h3 className="text-lg font-semibold mb-3">
                Projeto 3
              </h3>

              <p className="text-gray-400 text-sm">
                Descrição do projeto 3. Em breve mais detalhes aqui.
              </p>
            </article>
          </div>
        </section>
      </main>

      {/* ================= FOOTER ================= */}
      <footer className="py-6 text-center text-sm bg-gray-900 text-gray-400">
        © {new Date().getFullYear()} Juan • Desenvolvedor Web & Consultor em TI
      </footer>

      {/* TAG STYLE */}
      <style jsx>{`
        .tag {
          padding: 0.25rem 0.75rem;
          font-size: 0.75rem;
          border-radius: 999px;
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.1);
        }
      `}</style>
    </div>
  );
}
