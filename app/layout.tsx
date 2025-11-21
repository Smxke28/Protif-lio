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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body suppressHydrationWarning className="min-h-screen flex transition-colors">
        <Providers>
          {/* Sidebar fixa */}
          <SlideMenu />

          {/* Navbar superior */}
          <Navbar />

          {/* Conteúdo principal */}
          <main className="flex-1 min-h-screen p-6 md:ml-64 mt-16 flex flex-col">
            <div className="w-full max-w-6xl mx-auto px-4">

              {/* Botão Voltar (não aparece na Home) */}
              <div className="mb-4">
                <VoltarHome className="bg-gray-800/95 hover:bg-gray-700 dark:bg-gray-200 dark:text-black dark:hover:bg-gray-300" />
              </div>

              {/* Conteúdo da página */}
              {children}
            </div>
          </main>
        </Providers>
      </body>
    </html>
  );
}
