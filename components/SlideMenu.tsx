// components/SlideMenu.tsx
"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  Menu as MenuIcon,
  X as XIcon,
  Sun,
  Moon,
  Home,
  Briefcase,
  Folder,
  Mail,
  User,
} from "lucide-react";

export default function SlideMenu() {
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);
  useEffect(() => {
    const saved = localStorage.getItem("theme") as "light" | "dark" | null;
    setTheme(saved || "light");
  }, []);
  useEffect(() => {
    if (!mounted) return;
    const root = document.documentElement;
    if (theme === "dark") root.classList.add("dark");
    else root.classList.remove("dark");
    localStorage.setItem("theme", theme);
  }, [theme, mounted]);

  if (!mounted) return null;

  function closeMenu() {
    setOpen(false);
  }

  function handleAnchorClick(e: React.MouseEvent, hash: string) {
    // Se já estamos na Home, rola suavemente
    if (pathname === "/") {
      e.preventDefault();
      const el = document.getElementById(hash);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      } else {
        // fallback: se o elemento ainda não existe, navega para /#hash
        router.push("/#" + hash);
      }
      closeMenu();
      return;
    }

    // Se não estamos na Home, navega para /#hash
    e.preventDefault();
    closeMenu();
    router.push("/#" + hash);
  }

  return (
    <>
      {/* Botão sempre visível (mobile / small) */}
      {!open && (
        <button
          onClick={() => setOpen(true)}
          className="fixed top-4 left-4 z-[10001] text-white hover:text-gray-200 transition p-2 rounded-md bg-blue-950"
          aria-label="Abrir menu"
        >
          <MenuIcon className="w-5 h-5" />
        </button>
      )}

      {/* Backdrop quando aberto */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 bg-black/50 z-[10000]"
          aria-hidden
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full w-64 p-6 bg-gradient-to-b from-blue-950 via-black to-black text-white shadow-xl z-[10002] transition-transform duration-300
          ${open ? "translate-x-0" : "-translate-x-full"}`}
        aria-hidden={!open}
      >
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-xl font-bold">Juan L.</h1>
          <button onClick={() => setOpen(false)} className="text-gray-200" aria-label="Fechar menu">
            <XIcon className="w-5 h-5" />
          </button>
        </div>

        <nav className="flex flex-col gap-2">
          {/* 1. Home */}
          <MenuItem href="/" title="Página Inicial" icon={<Home className="w-4 h-4" />} onClick={closeMenu} />

          {/* 2. Projetos (mantido com handler original) */}
          <a
            href="/projetos"
            onClick={(e) => handleAnchorClick(e, "projetos")}
            className="flex items-center gap-2 px-4 py-2 rounded text-sm font-medium transition hover:bg-blue-900"
          >
            <Folder className="w-4 h-4" />
            Projetos
          </a>

          {/* 3. Serviços */}
          <MenuItem href="/servicos" title="Serviços" icon={<Briefcase className="w-4 h-4" />} onClick={closeMenu} />
          {pathname?.startsWith("/servicos") && (
            <div className="pl-6 flex flex-col gap-1 mt-2">
              <MenuItem href="/servicos/desenvolvimento-web" title="Desenvolvimento Web" onClick={closeMenu} />
              <MenuItem href="/servicos/consultoria-hardware" title="Consultoria em Hardware" onClick={closeMenu} />
              <MenuItem href="/servicos/montagem-pc" title="Montagem de PCs" onClick={closeMenu} />
            </div>
          )}

          {/* 4. Contato */}
          <MenuItem href="/contato" title="Contato" icon={<Mail className="w-4 h-4" />} onClick={closeMenu} />

          {/* 5. Sobre (no final) */}
          <MenuItem href="/sobre" title="Sobre" icon={<User className="w-4 h-4" />} onClick={closeMenu} />
        </nav>

        <div className="mt-auto pt-6 border-t border-blue-900">
          <button
            onClick={() => setTheme(theme === "light" ? "dark" : "light")}
            className="w-full flex items-center justify-center gap-2 p-2 rounded bg-blue-900 hover:bg-blue-800 transition"
          >
            {theme === "light" ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4 text-yellow-400" />}
            {theme === "light" ? "Modo Escuro" : "Modo Claro"}
          </button>
        </div>
      </aside>
    </>
  );
}

function MenuItem({
  href,
  title,
  icon,
  onClick,
}: {
  href: string;
  title: string;
  icon?: React.ReactNode;
  onClick?: () => void;
}) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className="flex items-center gap-2 px-4 py-2 rounded text-sm font-medium transition hover:bg-blue-900"
    >
      {icon}
      {title}
    </Link>
  );
}
