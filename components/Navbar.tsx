"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";

function GoogleIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" width={18} height={18} {...props}>
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

  // controla submenu "Serviços"
  const [submenuOpen, setSubmenuOpen] = useState(false);

  // timer para evitar fechar instantaneamente (debounce)
  const closeTimerRef = useRef<number | null>(null);

  // limpa timer ao desmontar
  useEffect(() => {
    return () => {
      if (closeTimerRef.current) {
        window.clearTimeout(closeTimerRef.current);
      }
    };
  }, []);

  // Abre imediatamente e limpa timers
  const openSubmenu = () => {
    if (closeTimerRef.current) {
      window.clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
    setSubmenuOpen(true);
  };

  // Fecha com pequeno delay (200ms) para permitir mover o mouse para o submenu
  const closeSubmenuWithDelay = (delay = 200) => {
    if (closeTimerRef.current) window.clearTimeout(closeTimerRef.current);
    closeTimerRef.current = window.setTimeout(() => {
      setSubmenuOpen(false);
      closeTimerRef.current = null;
    }, delay);
  };

  // Toggle mobile submenu (quando dentro do menu mobile quer abrir/fechar)
  const toggleMobileOpen = () => setMobileOpen((v) => !v);

  return (
    <header className="fixed top-0 left-0 w-full bg-gray-900 text-white z-50">
      <div className="flex items-center justify-between px-6 py-4">
        {/* Hamburger (mobile) */}
        <button
          className="md:hidden text-2xl"
          onClick={toggleMobileOpen}
          aria-label={mobileOpen ? "Fechar menu" : "Abrir menu"}
        >
          {mobileOpen ? "✕" : "☰"}
        </button>

        {/* Desktop links */}
        <div className="hidden md:flex flex-1 justify-center items-center gap-8 relative">
          <h1 className="text-xl font-bold mr-6">Meu Portfólio</h1>

          <Link href="/" className="relative px-2 py-1 text-gray-300 hover:text-white transition">
            Home
          </Link>

          <Link href="/projetos" className="relative px-2 py-1 text-gray-300 hover:text-white transition">
            Projetos
          </Link>

          {/* Serviços com submenu — Lidar com hover (mouse enter/leave) */}
          <div
            className="relative"
            onMouseEnter={openSubmenu}
            onMouseLeave={() => closeSubmenuWithDelay(180)}
          >
            {/* Parent link */}
            <Link
              href="/servicos"
              className="flex items-center gap-1 px-2 py-1 text-gray-300 hover:text-white transition select-none"
            >
              <span>Serviços</span>
              <span className="text-xs text-gray-400">▾</span>
            </Link>

            {/* Submenu: fica visível enquanto submenuOpen === true */}
            <div
              onMouseEnter={openSubmenu}
              onMouseLeave={() => closeSubmenuWithDelay(180)}
              className={`absolute left-0 top-full mt-2 w-56 bg-gray-800 rounded-lg shadow-lg flex flex-col z-50
                          transition-opacity duration-150 ${submenuOpen ? "opacity-100 visible" : "opacity-0 invisible"}`}
              role="menu"
              aria-hidden={!submenuOpen}
            >
              <Link
                href="/servicos/consultoria-hardware"
                className="px-4 py-2 hover:bg-gray-700"
                onClick={() => setSubmenuOpen(false)}
              >
                Consultoria Hardware
              </Link>
              <Link
                href="/servicos/desenvolvimento-web"
                className="px-4 py-2 hover:bg-gray-700"
                onClick={() => setSubmenuOpen(false)}
              >
                Desenvolvimento Web
              </Link>
              <Link
                href="/servicos/montagem-pc"
                className="px-4 py-2 hover:bg-gray-700"
                onClick={() => setSubmenuOpen(false)}
              >
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

        {/* Login / Logout (desktop) */}
        <div className="hidden md:flex items-center gap-3 ml-6">
          {session ? (
            <button
              onClick={() => signOut()}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-red-600 hover:bg-red-700 transition"
            >
              <img
                src={session.user?.image || ""}
                alt="avatar"
                className="w-7 h-7 rounded-full border-2 border-white"
              />
              <span>Sair</span>
            </button>
          ) : (
            <button
              onClick={() => signIn("google")}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-700 hover:bg-blue-800 transition"
            >
              <GoogleIcon />
              <span>Login</span>
            </button>
          )}
        </div>
      </div>

      {/* Menu lateral mobile */}
      {mobileOpen && (
        <>
          {/* Overlay: fecha ao clicar fora */}
          <div
            className="fixed inset-0 bg-black/50 md:hidden"
            onClick={() => setMobileOpen(false)}
          />

          <nav
            className="md:hidden fixed top-0 left-0 w-3/4 h-full bg-gray-900 flex flex-col gap-4 px-6 py-8 z-50"
            aria-label="Menu mobile"
          >
            <Link href="/" onClick={() => setMobileOpen(false)} className="py-2">Home</Link>
            <Link href="/projetos" onClick={() => setMobileOpen(false)} className="py-2">Projetos</Link>

            {/* Mobile: clique para expandir submenu */}
            <div>
              <button
                onClick={() => setSubmenuOpen((v) => !v)}
                className="w-full flex items-center justify-between py-2 text-left"
                aria-expanded={submenuOpen}
              >
                <span>Serviços</span>
                <span className="text-sm">{submenuOpen ? "▴" : "▾"}</span>
              </button>

              {submenuOpen && (
                <div className="flex flex-col pl-4">
                  <Link href="/servicos/consultoria-hardware" onClick={() => { setMobileOpen(false); setSubmenuOpen(false); }} className="py-2">Consultoria Hardware</Link>
                  <Link href="/servicos/desenvolvimento-web" onClick={() => { setMobileOpen(false); setSubmenuOpen(false); }} className="py-2">Desenvolvimento Web</Link>
                  <Link href="/servicos/montagem-pc" onClick={() => { setMobileOpen(false); setSubmenuOpen(false); }} className="py-2">Montagem de PC</Link>
                </div>
              )}
            </div>

            <Link href="/contato" onClick={() => setMobileOpen(false)} className="py-2">Contato</Link>
            <Link href="/sobre" onClick={() => setMobileOpen(false)} className="py-2">Sobre</Link>

            <div className="mt-6">
              {session ? (
                <button
                  onClick={() => { signOut(); setMobileOpen(false); }}
                  className="w-full px-4 py-2 rounded-lg bg-red-600 hover:bg-red-700 transition"
                >
                  Sair
                </button>
              ) : (
                <button
                  onClick={() => { signIn("google"); setMobileOpen(false); }}
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
