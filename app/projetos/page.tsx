"use client";

export default function ProjetosPage() {
  return (
    <div className="min-h-screen pt-28 px-6 bg-black text-gray-100 font-sans">

      {/* TÍTULO */}
      <header className="text-center mb-16">
        <h1 className="text-5xl font-extrabold mb-4">Meus Projetos</h1>
        <p className="text-lg text-gray-400 max-w-2xl mx-auto">
          Aqui estão alguns dos projetos que desenvolvi utilizando tecnologias
          modernas como Next.js, React, TypeScript, Tailwind CSS e mais.
        </p>
      </header>

      {/* GRID DE PROJETOS */}
      <main className="max-w-6xl mx-auto grid gap-10 md:grid-cols-2 lg:grid-cols-3">

        {/* PROJETO 1 */}
        <article className="p-6 rounded-2xl bg-gradient-to-br from-gray-900 to-gray-800 
                           border border-gray-700 shadow-lg hover:shadow-xl hover:border-blue-500 
                           transition">
          <h3 className="text-2xl font-semibold mb-3 text-white">Projeto CS2</h3>
          <p className="text-sm mb-4 text-gray-400">
            Plataforma completa dedicada ao Counter-Strike 2, contendo táticas, utilidades,
            guias e recursos úteis. Construído com Next.js, React, Tailwind, animações e APIs.
          </p>
          <a
            href="https://sitecs2.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block mt-3 px-4 py-2 bg-white text-black font-semibold rounded-lg 
                       hover:bg-gray-300 transition"
          >
            Acessar projeto
          </a>
        </article>

        {/* PROJETO 2 */}
        <article className="p-6 rounded-2xl bg-gradient-to-br from-gray-900 to-gray-800 
                           border border-gray-700 shadow-lg hover:shadow-xl hover:border-purple-500 
                           transition">
          <h3 className="text-2xl font-semibold mb-3 text-white">E-commerce Customizado</h3>
          <p className="text-sm mb-4 text-gray-400">
            Loja virtual com carrinho, checkout otimizado e painel administrativo.
            Design moderno e backend conectado a APIs reais.
          </p>
        </article>

        {/* PROJETO 3 */}
        <article className="p-6 rounded-2xl bg-gradient-to-br from-gray-900 to-gray-800 
                           border border-gray-700 shadow-lg hover:shadow-xl hover:border-green-500 
                           transition">
          <h3 className="text-2xl font-semibold mb-3 text-white">Dashboard em Tempo Real</h3>
          <p className="text-sm mb-4 text-gray-400">
            Dashboard com gráficos dinâmicos, consumo de API contínuo e layout altamente
            responsivo. Feito para monitoramento de métricas em tempo real.
          </p>
        </article>

        {/* PROJETO 4 EXTRA */}
        <article className="p-6 rounded-2xl bg-gradient-to-br from-gray-900 to-gray-800 
                           border border-gray-700 shadow-lg hover:shadow-xl hover:border-yellow-500 
                           transition">
          <h3 className="text-2xl font-semibold mb-3 text-white">Sistema de Login + OAuth</h3>
          <p className="text-sm mb-4 text-gray-400">
            Sistema seguro com login via Google OAuth2, sessões criptografadas e dashboard
            privado protegido.
          </p>
        </article>

        {/* PROJETO 5 EXTRA */}
        <article className="p-6 rounded-2xl bg-gradient-to-br from-gray-900 to-gray-800 
                           border border-gray-700 shadow-lg hover:shadow-xl hover:border-pink-500 
                           transition">
          <h3 className="text-2xl font-semibold mb-3 text-white">Portfólio Moderno</h3>
          <p className="text-sm mb-4 text-gray-400">
            Seu site! Totalmente responsivo, com animações, tema dark/light,
            autenticação Google e navegação dinâmica.
          </p>
        </article>

        {/* PROJETO 6 EXTRA */}
        <article className="p-6 rounded-2xl bg-gradient-to-br from-gray-900 to-gray-800 
                           border border-gray-700 shadow-lg hover:shadow-xl hover:border-red-500 
                           transition">
          <h3 className="text-2xl font-semibold mb-3 text-white">API de Utilidades</h3>
          <p className="text-sm mb-4 text-gray-400">
            API REST com rotas para conversores, análises e integração com serviços externos.
          </p>
        </article>
      </main>

      {/* FOOTER */}
      <footer className="text-center mt-20 py-6 text-sm text-gray-500">
        © {new Date().getFullYear()} Juan • Meus Projetos
      </footer>
    </div>
  );
}
