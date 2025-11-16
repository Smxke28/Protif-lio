import Card from "../../components/Card";

export default function ProjetosPage() {
  return (
    <div className="max-w-5xl mx-auto space-y-8">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Projetos</h1>
      <p className="text-gray-700 dark:text-gray-300">
        Alguns projetos desenvolvidos como exemplo ou para clientes.
      </p>

      <div className="grid md:grid-cols-3 gap-6">
        <Card title="Projeto 1" description="Aplicação web completa usando React e Next.js." />
        <Card title="Projeto 2" description="Sistema de gerenciamento de tarefas com Node.js e MongoDB." />
        <Card title="Projeto 3" description="Site institucional corporativo responsivo." />
      </div>
    </div>
  );
}
