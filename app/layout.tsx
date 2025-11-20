// app/layout.tsx
import "./globals.css";
import type { Metadata } from "next";
import SlideMenu from "../components/SlideMenu";
import Navbar from "../components/Navbar";
import Providers from "../components/Providers";
import VoltarHome from "../components/VoltarHome";

export const metadata: Metadata = {
  title: "Portfólio Juan Lavecchia",
  description: "Site pessoal e profissional",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body
        suppressHydrationWarning
        className="min-h-screen flex
          bg-white text-gray-900
          dark:bg-black dark:text-gray-100
          transition-colors duration-500"
      >
        <Providers>
          {/* Sidebar fixa */}
          <SlideMenu />

          {/* Navbar */}
          <Navbar />

          {/* Conteúdo principal */}
          <main className="flex-1 min-h-screen p-6 md:ml-64 flex flex-col items-start justify-start mt-16">
            {/* Container do conteúdo com largura máxima */}
            <div className="w-full max-w-6xl mx-auto px-4">
              {/* Botão Voltar inserido dentro da página (não aparece na Home) */}
              <div className="mb-4">
                <VoltarHome className="bg-gray-800/95 hover:bg-gray-700" />
              </div>

              {/* Conteúdo das páginas */}
              <div className="w-full">{children}</div>
            </div>
          </main>
        </Providers>
      </body>
    </html>
  );
}
