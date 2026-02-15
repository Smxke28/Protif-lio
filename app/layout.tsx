// app/layout.tsx
import "./globals.css";
import type { Metadata } from "next";
import SlideMenu from "../components/SlideMenu";
import Navbar from "../components/Navbar";
import Providers from "../components/Providers";
import VoltarHome from "../components/VoltarHome";
import React from "react";

export const metadata: Metadata = {
  title: "Portfólio Juan Lavecchia",
  description: "Site pessoal e profissional",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body suppressHydrationWarning className="min-h-screen flex flex-col bg-black text-gray-100">
        <Providers>
          {/* Skip link */}
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-70 focus:bg-white/10 focus:px-3 focus:py-2 rounded"
          >
            Ir para o conteúdo
          </a>

          {/* SlideMenu (comporta mobile e desktop internamente) */}
          <SlideMenu />

          {/* Navbar fixa no topo; deslocada à direita em md+ para não cobrir SlideMenu */}
          <div className="fixed top-0 left-0 right-0 md:left-64 z-60">
            <Navbar />
          </div>

          {/* Main: reserva altura da navbar (pt-16) e espaço para SlideMenu (md:pl-64) */}
          <main id="main-content" className="flex-1 pt-16">
            <div className="container mx-auto px-4 text-center">
              <div className="mb-4">
                <VoltarHome className="bbg-gray-800/95 hover:bg-gray-700 dark:bg-gray-200 dark:text-black dark:hover:bg-gray-300" />
              </div>

              {children}
            </div>
          </main>

          <footer className="border-t border-gray-800 bg-black/40">
            <div className="max-w-6xl mx-auto px-4 py-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-sm text-gray-400">
              <div>© {new Date().getFullYear()} Juan • Desenvolvedor Web & Consultor em TI</div>

              <div className="flex items-center gap-3">
                <a href="mailto:juanlavecchia23@gmail.com" className="px-3 py-2 rounded hover:bg-white/6 transition">Email</a>
                <a href="https://github.com/Smxke28" target="_blank" rel="noreferrer" className="px-3 py-2 rounded hover:bg-white/6 transition">GitHub</a>
                <a href="https://www.linkedin.com/in/juan-lavecchia-8b3b5131a/" target="_blank" rel="noreferrer" className="px-3 py-2 rounded hover:bg-white/6 transition">LinkedIn</a>
              </div>
            </div>
          </footer>
        </Providers>
      </body>
    </html>
  );
}
