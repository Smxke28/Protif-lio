"use client";

import { useState } from "react";
import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";

function GoogleIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" width={20} height={20} {...props}>
      <path
        fill="#EA4335"
        d="M12 11h11c.1.6.2 1.1.2 1.8 0 6-4 10.2-11.2 10.2A11.9 11.9 0 0 1 0 12 11.9 11.9 0 0 1 12 .2c3.2 0 5.9 1.2 8 3.1l-3.3 3.2A7.6 7.6 0 0 0 12 4.8c-4 0-7.3 3.3-7.3 7.2s3.3 7.2 7.3 7.2c3.7 0 6.3-2.1 6.9-5.1H12z"
      />
    </svg>
  );
}

export default function Navbar() {
  const { data: session } = useSession();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 w-full bg-gradient-to-r from-gray-900 via-black to-gray-900 text-white shadow-lg z-50">
      <div className="flex items-center justify-between px-6 py-4">
        {/* Botão hamburger (mobile) */}
        <button
          className="md:hidden text-2xl"
          onClick={() => setMobileOpen((v) => !v)}
          aria-label="Abrir menu"
        >
          {mobileOpen ? "✕" : "☰"}
        </button>

        {/* Links desktop */}
        <div className="hidden md:flex flex-1 justify-center items-center gap-8">
          <h1 className="text-xl font-bold mr-6">Meu Portfólio</h1>

          <Link href="/" className="relative px-2 py-1 text-gray-300 hover:text-white transition">
            Home
          </Link>
          <Link href="/projetos" className="relative px-2 py-1 text-gray-300 hover:text-white transition">
            Projetos
          </Link>

          {/* Serviços com submenu */}
          <div className="relative group">
            <Link
              href="/servicos"
              className="flex items-center gap-1 px-2 py-1 text-gray-300 hover:text-white transition"
            >
              <span>Serviços</span>
              <span>▾</span>
            </Link>
            <div className="absolute left-0 top-full mt-2 w-56 bg-gray-800 rounded-lg shadow-lg flex flex-col opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-opacity duration-200 z-50">
              <Link href="/servicos/consultoria-hardware" className="px-4 py-2 hover:bg-gray-700">
                Consultoria Hardware
              </Link>
              <Link href="/servicos/desenvolvimento-web" className="px-4 py-2 hover:bg-gray-700">
                Desenvolvimento Web
              </Link>
              <Link href="/servicos/montagem-pc" className="px-4 py-2 hover:bg-gray-700">
                Montagem de PC
              </Link>
            </div>
          </div>

          <Link href="/contato" className="relative px-2 py-1 text-gray-300 hover:text-white transition">
            Contato
          </Link>
          <Link href="/sobre" className="relative px-2 py-1 text-gray-300 hover:text-white transition">
            Sobre
          </Link>
        </div>

        {/* Login/Logout desktop */}
        <div className="hidden md:flex items-center gap-3 ml-6">
          {session ? (
            <button
              onClick={() => signOut()}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-red-600 hover:bg-red-700 transition shadow-md"
            >
              <img
                src={session.user?.image || ""}
                alt="avatar"
                className="w-7 h-7 rounded-full border-2 border-white hover:scale-105 transition-transform"
              />
              <span className="font-medium">Sair</span>
            </button>
          ) : (
            <button
              onClick={() => signIn("google")}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-700 hover:bg-blue-800 transition shadow-md"
            >
              <GoogleIcon />
              <span className="font-medium">Login</span>
            </button>
          )}
        </div>
      </div>

      {/* Menu mobile simplificado */}
      {mobileOpen && (
        <>
          {/* Overlay leve */}
          <div
            className="fixed inset-0 bg-black/50 md:hidden"
            onClick={() => setMobileOpen(false)}
          />

          {/* Menu mobile */}
          <nav
            className="md:hidden fixed top-14 left-0 w-full bg-gray-900 flex flex-col gap-2 px-6 py-4 border-t border-gray-800 z-50"
            aria-label="Menu mobile"
          >
            <Link href="/" className="py-2 hover:text-blue-400 transition">Home</Link>
            <Link href="/projetos" className="py-2 hover:text-blue-400 transition">Projetos</Link>
            <Link href="/servicos" className="py-2 hover:text-blue-400 transition">Serviços</Link>
            <Link href="/contato" className="py-2 hover:text-blue-400 transition">Contato</Link>
            <Link href="/sobre" className="py-2 hover:text-blue-400 transition">Sobre</Link>

            <div className="mt-4">
              {session ? (
                <button
                  onClick={() => signOut()}
                  className="w-full px-4 py-2 rounded-lg bg-red-600 hover:bg-red-700 transition"
                >
                  Sair
                </button>
              ) : (
                <button
                  onClick={() => signIn("google")}
                  className="w-full px-4 py-2 rounded-lg bg-blue-700 hover:bg-blue-800 transition"
                >
                  Login com Google
                </button>
              )}
            </div>
          </nav>
        </>
      )}
    </header>
  );
}
