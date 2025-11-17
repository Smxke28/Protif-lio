"use client";

export default function MontagemPC() {
  return (
    <div
      className="flex flex-col min-h-screen bg-cover bg-center font-sans"
      style={{ backgroundImage: "url('/linha.jpeg')" }}
    >
      {/* Hero Section */}
      <header className="flex flex-col items-center justify-center text-center bg-black/50 p-12">
        <h1 className="text-4xl font-bold text-white mb-6">Montagem de PCs</h1>
        <p className="text-lg text-gray-200 max-w-2xl">
          Serviço especializado na montagem de computadores personalizados,
          garantindo desempenho, estabilidade e custo-benefício.
        </p>
      </header>

      {/* Conteúdo principal */}
      <section className="py-16 bg-white/80 dark:bg-black/60">
        <div className="max-w-5xl mx-auto px-6 grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="p-6 rounded-lg shadow-lg bg-white dark:bg-gray-800">
            <h3 className="text-xl font-semibold mb-4">PC Gamer</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Montagem de computadores voltados para jogos, com foco em performance gráfica e velocidade.
            </p>
          </div>
          <div className="p-6 rounded-lg shadow-lg bg-white dark:bg-gray-800">
            <h3 className="text-xl font-semibold mb-4">PC Profissional</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Máquinas otimizadas para edição de vídeo, design gráfico e programação.
            </p>
          </div>
          <div className="p-6 rounded-lg shadow-lg bg-white dark:bg-gray-800">
            <h3 className="text-xl font-semibold mb-4">PC para Escritório</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Computadores econômicos e eficientes para tarefas administrativas e uso corporativo.
            </p>
          </div>
        </div>
      </section>

      {/* Rodapé */}
      <footer className="w-full py-6 text-center text-sm text-white mt-auto bg-gradient-to-r from-blue-900 via-blue-800 to-blue-700">
        © {new Date().getFullYear()} Juan • Montagem de PCs
      </footer>
    </div>
  );
}
