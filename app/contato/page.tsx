export default function ContatoPage() {
  return (
    <div className="max-w-lg mx-auto space-y-6">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Contato</h1>
      <p className="text-gray-700 dark:text-gray-300">
        Preencha o formulário abaixo para entrar em contato comigo.
      </p>

      <form className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="Nome"
          className="p-3 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
        />
        <input
          type="email"
          placeholder="Email"
          className="p-3 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
        />
        <textarea
          placeholder="Mensagem"
          rows={5}
          className="p-3 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white py-3 rounded hover:bg-blue-700 transition"
        >
          Enviar
        </button>
      </form>
    </div>
  );
}
