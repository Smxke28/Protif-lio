import Link from "next/link";

export default function ServicosPage() {
  return (
    <div className="max-w-5xl mx-auto p-8">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
        Serviços
      </h1>
      <p className="text-lg text-gray-700 dark:text-gray-300 mb-10">
        Escolha uma das opções abaixo ou use a barra lateral.
      </p>

      {/* Grid com 3 colunas */}
      <div className="grid gap-6 md:grid-cols-3">
        <Link
          href="/servicos/desenvolvimento-web"
          className="block p-6 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition"
        >
          <h2 className="text-xl font-semibold text-blue-600 dark:text-blue-400">
            Desenvolvimento Web
          </h2>
          <p className="mt-2 text-gray-600 dark:text-gray-300">
            Criação de sites modernos, responsivos e otimizados para SEO.
          </p>
        </Link>

        <Link
          href="/servicos/consultoria-ti"
          className="block p-6 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition"
        >
          <h2 className="text-xl font-semibold text-blue-600 dark:text-blue-400">
            Consultoria em TI
          </h2>
          <p className="mt-2 text-gray-600 dark:text-gray-300">
            Orientação estratégica para infraestrutura, segurança e soluções tecnológicas.
          </p>
        </Link>

        <Link
          href="/servicos/outros"
          className="block p-6 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition"
        >
          <h2 className="text-xl font-semibold text-blue-600 dark:text-blue-400">
            Outros Serviços
          </h2>
          <p className="mt-2 text-gray-600 dark:text-gray-300">
            UX/UI Design, manutenção de sistemas e serviços personalizados.
          </p>
        </Link>
      </div>
    </div>
  );
}
