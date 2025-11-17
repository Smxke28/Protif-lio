import Link from "next/link";

export default function ServicosPage() {
  return (
    <div
      className="relative min-h-[60vh] bg-cover bg-center"
      style={{ backgroundImage: "url('/serv1.jpg')" }}
    >
      {/* Overlay escuro para dar contraste */}
      <div className="absolute inset-0 bg-black/70" />

      {/* Conteúdo principal */}
      <div className="relative max-w-5xl mx-auto p-8 text-white">
        <h1 className="text-3xl font-bold mb-6">Serviços</h1>
        <p className="text-lg mb-10">
          Explore abaixo os principais serviços que ofereço, cada um pensado para
          entregar soluções completas e personalizadas.
        </p>

        {/* Grid com 3 colunas */}
        <div className="grid gap-6 md:grid-cols-3">
          {/* Desenvolvimento Web */}
          <Link
            href="/servicos/desenvolvimento-web"
            className="p-6 rounded-lg bg-gradient-to-br from-blue-950 via-black to-black shadow-lg hover:scale-105 transition-transform block"
          >
            <h2 className="text-xl font-semibold mb-3">Desenvolvimento Web</h2>
            <p className="text-sm leading-relaxed">
              Criação de sites modernos e responsivos, otimizados para SEO e
              performance. Cada projeto é pensado para transmitir credibilidade
              e oferecer uma experiência digital envolvente.
            </p>
            <p className="mt-2 text-sm opacity-90">
              Inclui landing pages, sistemas corporativos e e-commerce.
            </p>
          </Link>

          {/* Consultoria em Hardware */}
          <Link
            href="/servicos/consultoria-hardware"
            className="p-6 rounded-lg bg-gradient-to-br from-blue-950 via-black to-black shadow-lg hover:scale-105 transition-transform block"
          >
            <h2 className="text-xl font-semibold mb-3">Consultoria em Hardware</h2>
            <p className="text-sm leading-relaxed">
              Orientação especializada na escolha de componentes e soluções de
              hardware, garantindo compatibilidade, desempenho e custo-benefício.
            </p>
            <p className="mt-2 text-sm opacity-90">
              Ideal para upgrades, otimização de recursos e projetos de alta performance.
            </p>
          </Link>

          {/* Montagem de PCs */}
          <Link
            href="/servicos/montagem-pc"
            className="p-6 rounded-lg bg-gradient-to-br from-blue-950 via-black to-black shadow-lg hover:scale-105 transition-transform block"
          >
            <h2 className="text-xl font-semibold mb-3">Montagem de PCs</h2>
            <p className="text-sm leading-relaxed">
              Montagem personalizada de computadores sob medida para gamers,
              criadores de conteúdo e profissionais.
            </p>
            <p className="mt-2 text-sm opacity-90">
              Acompanho todo o processo: da escolha dos componentes até a entrega
              do PC pronto para uso.
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
}
