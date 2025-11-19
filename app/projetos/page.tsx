import Image from "next/image";

export default function ProjetosPage() {
  return (
    <div
      className="relative min-h-[60vh] bg-cover bg-center"
      style={{ backgroundImage: "url('/proj1.jpg')" }}
    >
      <div className="absolute inset-0 bg-black/70" />

      {/* Conteúdo principal */}
      <div className="relative max-w-5xl mx-auto p-8 text-white">
        <h1 className="text-3xl font-bold mb-6">Projetos</h1>
        <p className="text-lg mb-10">
          Alguns projetos desenvolvidos como exemplo ou para clientes, cada um
          mostrando diferentes soluções e tecnologias aplicadas.
        </p>

        {/* Grid com 3 colunas */}
        <div className="grid gap-6 md:grid-cols-3">
          {/* Projeto 1 */}
          <div className="p-6 rounded-lg bg-gradient-to-br from-blue-950 via-black to-black shadow-lg hover:scale-105 transition-transform">
            <h2 className="text-xl font-semibold mb-3">Projeto 1</h2>
            <p className="text-sm leading-relaxed">
              Aplicação web completa com React e Next.js, focada em performance,
              SEO e experiência do usuário.
            </p>
            <p className="mt-2 text-sm opacity-90">
              Inclui autenticação, integração com APIs externas e design responsivo.
            </p>
          </div>

          {/* Projeto 2 */}
          <div className="p-6 rounded-lg bg-gradient-to-br from-blue-950 via-black to-black shadow-lg hover:scale-105 transition-transform">
            <h2 className="text-xl font-semibold mb-3">Projeto 2</h2>
            <p className="text-sm leading-relaxed">
              Sistema de gerenciamento de tarefas com Node.js e MongoDB,
              oferecendo escalabilidade e segurança.
            </p>
            <p className="mt-2 text-sm opacity-90">
              Painel administrativo, controle de usuários e relatórios dinâmicos.
            </p>
          </div>

          {/* Projeto 3 */}
          <div className="p-6 rounded-lg bg-gradient-to-br from-blue-950 via-black to-black shadow-lg hover:scale-105 transition-transform">
            <h2 className="text-xl font-semibold mb-3">Projeto 3</h2>
            <p className="text-sm leading-relaxed">
              Site institucional corporativo responsivo, desenvolvido para
              fortalecer a presença digital de empresas.
            </p>
            <p className="mt-2 text-sm opacity-90">
              Estrutura otimizada para SEO, design moderno e integração com redes sociais.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
