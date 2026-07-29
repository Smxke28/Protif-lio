import "./globals.css";
import type { Metadata } from "next";
import Script from "next/script";
import Navbar from "../components/Navbar";
import Providers from "../components/Providers";
import WhatsAppFloatButton from "../components/WhatsAppFloatButton";
import React from "react";

export const metadata: Metadata = {
  title: "Juan Lavecchia — Desenvolvedor Web & Consultor TI",
  description:
    "Portfólio de Juan Lavecchia Coelho da Silva. Desenvolvimento web moderno com Next.js, TypeScript e Tailwind. Consultoria em TI e montagem de PCs em Juiz de Fora.",
  keywords: ["desenvolvedor web", "Next.js", "TypeScript", "Tailwind", "consultoria TI", "Juiz de Fora"],
  authors: [{ name: "Juan Lavecchia" }],
  openGraph: {
    title: "Juan Lavecchia — Desenvolvedor Web & Consultor TI",
    description: "Transformo ideias em produtos digitais funcionais, rápidos e bem construídos.",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=JetBrains+Mono:wght@400;500;700&display=swap"
          rel="stylesheet"
        />
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-299F5SYYYJ"
          strategy="afterInteractive"
        />
        <Script id="ga4" strategy="afterInteractive">
          {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', 'G-299F5SYYYJ');`}
        </Script>
        <script
          // Roda antes da hidratação pra evitar "flash" do tema errado.
          // Prioridade: escolha salva > preferência do sistema > escuro (padrão do site).
          dangerouslySetInnerHTML={{
            __html: `
              (function () {
                try {
                  var saved = localStorage.getItem('theme');
                  var theme = saved === 'light' || saved === 'dark'
                    ? saved
                    : (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark');
                  document.documentElement.setAttribute('data-theme', theme);
                } catch (e) {
                  document.documentElement.setAttribute('data-theme', 'dark');
                }
              })();
            `,
          }}
        />
      </head>
      <body>
        <Providers>
          <a href="#main-content" className="sr-only">
            Ir para o conteúdo
          </a>

          <div style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 50 }}>
            <Navbar />
          </div>

          <main
            id="main-content"
            style={{ paddingTop: "64px", minHeight: "100vh", position: "relative", zIndex: 10 }}
          >
            {children}
          </main>

          <WhatsAppFloatButton />

          <footer
            style={{
              borderTop: "1px solid var(--border-subtle)",
              background: "var(--nav-bg-solid)",
              position: "relative",
              zIndex: 10,
            }}
          >
            <div
              style={{
                maxWidth: "1200px",
                margin: "0 auto",
                padding: "32px 24px",
                display: "flex",
                flexWrap: "wrap",
                alignItems: "center",
                justifyContent: "space-between",
                gap: "16px",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                <div
                  style={{
                    width: "28px",
                    height: "28px",
                    borderRadius: "6px",
                    background: "linear-gradient(135deg, var(--accent-cyan), var(--accent-violet))",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontFamily: "'JetBrains Mono', monospace",
                    fontWeight: 700,
                    fontSize: "0.65rem",
                    color: "var(--on-accent)",
                    flexShrink: 0,
                  }}
                >
                  JL
                </div>
                <span style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>
                  © {new Date().getFullYear()} Juan Lavecchia — Desenvolvedor Web & Consultor TI
                </span>
              </div>

              <div style={{ display: "flex", gap: "4px" }}>
                {[
                  { label: "Email", href: "mailto:juanlavecchia23@gmail.com" },
                  { label: "GitHub", href: "https://github.com/Smxke28" },
                  { label: "LinkedIn", href: "https://www.linkedin.com/in/juan-lavecchia-8b3b5131a/" },
                ].map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    target={link.href.startsWith("mailto") ? undefined : "_blank"}
                    rel="noreferrer"
                    style={{
                      fontSize: "0.8rem",
                      color: "var(--text-muted)",
                      padding: "6px 12px",
                      borderRadius: "8px",
                      border: "1px solid transparent",
                      transition: "all 0.2s",
                      textDecoration: "none",
                    }}
                    >
                    {link.label}
                  </a>
                ))}
              </div>
            </div>
          </footer>
        </Providers>
      </body>
    </html>
  );
}