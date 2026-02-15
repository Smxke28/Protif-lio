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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body className="min-h-screen bg-black text-gray-100">
        <Providers>
          {/* Skip link */}
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50
              focus:bg-white/10 focus:px-3 focus:py-2 rounded"
          >
            Ir para o conteúdo
          </a>

          {/* Slide menu (overlay, não empurra layout) */}
          <SlideMenu />

          {/* Navbar fixa */}
          <div className="fixed top-0 left-0 right-0 z-40">
            <Navbar />
          </div>

          {/* MAIN */}
          <main
            id="main-content"
            className="pt-16 min-h-screen flex justify-center"
          >
            <div className="w-full max-w-6xl px-4">
              <div className="mb-6">
                <VoltarHome className="bg-gray-800/95 hover:bg-gray-700 dark:bg-gray-200 dark:text-black dark:hover:bg-gray-300" />
              </div>

              {children}
            </div>
          </main>

          {/* FOOTER */}
          <footer className="border-t border-gray-800 bg-black/40">
            <div className="max-w-6xl mx-auto px-4 py-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-sm text-gray-400">
              <div>
                © {new Date().getFullYear()} Juan • Desenvolvedor Web & Consultor em TI
              </div>

              <div className="flex items-center gap-3">
                <a
                  href="mailto:juanlavecchia23@gmail.com"
                  className="px-3 py-2 rounded hover:bg-white/6 transition"
                >
                  Email
                </a>
                <a
                  href="https://github.com/Smxke28"
                  target="_blank"
                  rel="noreferrer"
                  className="px-3 py-2 rounded hover:bg-white/6 transition"
                >
                  GitHub
                </a>
                <a
                  href="https://www.linkedin.com/in/juan-lavecchia-8b3b5131a/"
                  target="_blank"
                  rel="noreferrer"
                  className="px-3 py-2 rounded hover:bg-white/6 transition"
                >
                  LinkedIn
                </a>
              </div>
            </div>
          </footer>
        </Providers>
      </body>
    </html>
  );
}
