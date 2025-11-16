export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-100 via-white to-blue-50 dark:from-gray-900 dark:via-black dark:to-gray-800 font-sans">
      <main className="flex flex-col items-center justify-center w-full max-w-4xl p-12 text-center sm:text-left">
        
        {/* Cabeçalho */}
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">
          Bem-vindo ao meu portfólio
        </h1>
        
        {/* Texto introdutório */}
        <p className="text-lg text-gray-700 dark:text-gray-300 mb-10 max-w-2xl">
          Sou Juan L., desenvolvedor web e consultor em TI. 
          Aqui você encontra meus serviços, projetos e formas de contato.
        </p>

        {/* Botões de navegação */}
        <div className="flex gap-6">
          <a
            href="/servicos"
            className="px-6 py-3 rounded bg-blue-600 text-white hover:bg-blue-700 transition"
          >
            Ver Serviços
          </a>
          <a
            href="/projetos"
            className="px-6 py-3 rounded bg-gray-200 dark:bg-gray-800 text-gray-900 dark:text-gray-100 hover:bg-gray-300 dark:hover:bg-gray-700 transition"
          >
            Meus Projetos
          </a>
        </div>
      </main>
    </div>
  );
}
