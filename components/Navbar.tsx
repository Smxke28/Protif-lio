'use client';

import { useState, useRef, useEffect, useCallback } from "react";
import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";

function GoogleIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" width={18} height={18} {...props} aria-hidden>
      <path
        fill="#EA4335"
        d="M12 11h11c.1.6.2 1.1.2 1.8 0 6-4 10.2-11.2 10.2A11.9 11.9 0 0 1 0 12 11.9 11.9 0 0 1 12 .2c3.2 0 5.9 1.2 8 3.1l-3.3 3.2A7.6 7.6 0 0 0 12 4.8c-4 0-7.3 3.3-7.3 7.2s3.3 7.2 7.3 7.2c3.7 0 6.3-2.1 6.9-5.1H12z"
      />
    </svg>
  );
}

export default function Navbar() {
  const { data: session } = useSession();
  const [mobileOpen, setMobileOpen] = useState(false); // painel do Navbar (local)
  const [submenuOpen, setSubmenuOpen] = useState(false);
  const closeTimerRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (closeTimerRef.current) window.clearTimeout(closeTimerRef.current);
    };
  }, []);

  const openSubmenu = () => {
    if (closeTimerRef.current) {
      window.clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
    setSubmenuOpen(true);
  };

  const closeSubmenuWithDelay = (delay = 180) => {
    if (closeTimerRef.current) window.clearTimeout(closeTimerRef.current);
    closeTimerRef.current = window.setTimeout(() => {
      setSubmenuOpen(false);
      closeTimerRef.current = null;
    }, delay);
  };

  // abre/fecha SlideMenu via evento global
  const toggleSlideMenu = () => {
    if (typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent("toggle-slide-menu"));
    }
    setMobileOpen(v => !v);
  };

  // garante que o Navbar escute pedidos de fechamento global
  const handleCloseGlobal = useCallback(() => {
    setMobileOpen(false);
    setSubmenuOpen(false);
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    window.addEventListener("close-slide-menu", handleCloseGlobal as EventListener);
    window.addEventListener("open-slide-menu", () => setMobileOpen(true) as unknown as EventListener);
    return () => {
      window.removeEventListener("close-slide-menu", handleCloseGlobal as EventListener);
      window.removeEventListener("open-slide-menu", () => setMobileOpen(true) as unknown as EventListener);
    };
  }, [handleCloseGlobal]);

  // fecha com ESC (aplica ao painel do Navbar também)
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMobileOpen(false);
        setSubmenuOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <header className="bg-black/65 backdrop-blur-sm border-b border-gray-800">
      <div className="max-w-6xl mx-auto px-4 md:px-6">
        <div className="flex items-center h-16 gap-4">
          {/* Hamburger icon (mobile only) */}
          <button
            className="md:hidden p-2 rounded-md hover:bg-white/6 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/30"
            onClick={toggleSlideMenu}
            aria-label="Abrir menu lateral"
            aria-expanded={mobileOpen}
          >
            <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="none" aria-hidden>
              <path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>

          {/* Brand */}
          <Link href="/" className="flex items-center gap-3 no-underline min-w-0">
            <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center text-white font-extrabold text-lg">
              J
            </div>

            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <span className="font-semibold text-white text-sm md:text-base leading-none whitespace-nowrap truncate max-w-[10rem] md:max-w-[14rem]">
                  Juan Lavecchia
                </span>
              </div>
              <div className="hidden md:block text-xs text-gray-300 whitespace-nowrap truncate max-w-[16rem]">
                Desenvolvedor Web • Consultor em TI
              </div>
            </div>
          </Link>

          {/* Center nav */}
          <div className="flex-1 flex justify-center min-w-0">
            <nav className="hidden md:flex items-center gap-6" aria-label="Navegação principal">
              <Link href="/" className="px-3 py-2 text-gray-300 hover:text-white transition">Home</Link>
              <Link href="/projetos" className="px-3 py-2 text-gray-300 hover:text-white transition">Projetos</Link>

              <div
                className="relative"
                onMouseEnter={openSubmenu}
                onMouseLeave={() => closeSubmenuWithDelay(180)}
              >
                <button className="flex items-center gap-2 px-3 py-2 text-gray-300 hover:text-white transition rounded" aria-haspopup="menu" aria-expanded={submenuOpen}>
                  Serviços
                  <span className="text-xs text-gray-400">▾</span>
                </button>

                <div
                  role="menu"
                  aria-hidden={!submenuOpen}
                  className={`absolute left-0 mt-2 w-56 bg-gray-900 rounded-lg shadow-lg ring-1 ring-black/30 overflow-hidden transition-all duration-150 ${
                    submenuOpen ? "opacity-100 visible translate-y-0" : "opacity-0 invisible -translate-y-1"
                  }`}
                >
                  <Link href="/servicos/desenvolvimento-web" className="block px-4 py-2 text-sm text-gray-200 hover:bg-gray-800">Desenvolvimento Web</Link>
                  <Link href="/servicos/consultoria-hardware" className="block px-4 py-2 text-sm text-gray-200 hover:bg-gray-800">Consultoria Hardware</Link>
                  <Link href="/servicos/montagem-pc" className="block px-4 py-2 text-sm text-gray-200 hover:bg-gray-800">Montagem de PC</Link>
                </div>
              </div>

              <Link href="/contato" className="px-3 py-2 text-gray-300 hover:text-white transition">Contato</Link>
              <Link href="/sobre" className="px-3 py-2 text-gray-300 hover:text-white transition">Sobre</Link>
            </nav>
          </div>

          {/* Right: auth */}
          <div className="flex items-center gap-3 flex-shrink-0">
            <div className="hidden md:flex items-center">
              {session ? (
                <button onClick={() => signOut()} className="flex items-center gap-2 px-3 py-2 rounded-lg bg-red-600 hover:bg-red-700 transition">
                  <img src={session.user?.image || ""} alt="avatar" className="w-7 h-7 rounded-full border-2 border-white" />
                  <span className="text-sm">Sair</span>
                </button>
              ) : (
                <button onClick={() => signIn("google")} className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white text-black font-medium">
                  <GoogleIcon />
                  <span className="text-sm">Entrar</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile panel local ao Navbar (opcional) */}
      {mobileOpen && (
        <>
          <div className="fixed inset-0 bg-black/50 md:hidden" onClick={() => { setMobileOpen(false); if (typeof window !== 'undefined') window.dispatchEvent(new CustomEvent('close-slide-menu')); }} aria-hidden />
          <nav className="md:hidden fixed top-16 left-0 right-0 h-[calc(100vh-4rem)] bg-gray-900 text-white p-6 z-60 overflow-auto">
            <div className="flex flex-col gap-2">
              <Link href="/" onClick={() => setMobileOpen(false)} className="px-3 py-2 rounded-lg hover:bg-white/6 transition">Home</Link>
              <Link href="/projetos" onClick={() => setMobileOpen(false)} className="px-3 py-2 rounded-lg hover:bg-white/6 transition">Projetos</Link>

              <div>
                <button onClick={() => setSubmenuOpen((v) => !v)} className="w-full flex items-center justify-between px-3 py-2 rounded-lg hover:bg-white/6 transition">
                  <span>Serviços</span>
                  <span className="text-sm">{submenuOpen ? "▴" : "▾"}</span>
                </button>

                {submenuOpen && (
                  <div className="mt-2 flex flex-col pl-3 gap-1">
                    <Link href="/servicos/desenvolvimento-web" onClick={() => setMobileOpen(false)} className="px-3 py-2 rounded-lg hover:bg-white/6 transition">Desenvolvimento Web</Link>
                    <Link href="/servicos/consultoria-hardware" onClick={() => setMobileOpen(false)} className="px-3 py-2 rounded-lg hover:bg-white/6 transition">Consultoria Hardware</Link>
                    <Link href="/servicos/montagem-pc" onClick={() => setMobileOpen(false)} className="px-3 py-2 rounded-lg hover:bg-white/6 transition">Montagem de PC</Link>
                  </div>
                )}
              </div>

              <Link href="/contato" onClick={() => setMobileOpen(false)} className="px-3 py-2 rounded-lg hover:bg-white/6 transition">Contato</Link>
              <Link href="/sobre" onClick={() => setMobileOpen(false)} className="px-3 py-2 rounded-lg hover:bg-white/6 transition">Sobre</Link>

              <div className="mt-6">
                <button onClick={() => setMobileOpen(false)} className="w-full px-4 py-2 rounded-lg bg-white text-black">Fechar</button>
              </div>
            </div>
          </nav>
        </>
      )}
    </header>
  );
}
