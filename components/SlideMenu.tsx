'use client';

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Menu,
  X,
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

  const [open, setOpen] = useState(false);
  const [openServices, setOpenServices] = useState(false);
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [mounted, setMounted] = useState(false);

  /* mount */
  useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem("theme") as "light" | "dark" | null;
    if (saved) setTheme(saved);
  }, []);

  /* theme */
  useEffect(() => {
    if (!mounted) return;
    const root = document.documentElement;
    theme === "dark"
      ? root.classList.add("dark")
      : root.classList.remove("dark");
    localStorage.setItem("theme", theme);
  }, [theme, mounted]);

  /* close on route */
  useEffect(() => {
    setOpen(false);
    setOpenServices(false);
  }, [pathname]);

  /* esc */
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  /* block scroll */
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
  }, [open]);

  if (!mounted) return null;

  return (
    <>
      {/* HAMBURGER */}
      {!open && (
        <button
          onClick={() => setOpen(true)}
          className="fixed top-4 left-4 z-[70] p-3 rounded-xl
            bg-blue-950/90 hover:bg-blue-900 text-white
            shadow-lg backdrop-blur-xl transition"
          aria-label="Abrir menu"
        >
          <Menu className="w-6 h-6" />
        </button>
      )}

      {/* BACKDROP */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.6 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
            className="fixed inset-0 bg-black z-[60]"
          />
        )}
      </AnimatePresence>

      {/* MENU */}
      <AnimatePresence>
        {open && (
          <motion.aside
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "spring", stiffness: 90, damping: 18 }}
            className="fixed top-0 left-0 z-[70]
              h-full w-64 p-6
              bg-gradient-to-b from-blue-950/90 via-black/80 to-black/90
              backdrop-blur-xl border-r border-white/10 shadow-2xl
              flex flex-col"
          >
            <header className="flex items-center justify-between mb-8">
              <h1 className="text-xl font-bold">Juan L.</h1>
              <button
                onClick={() => setOpen(false)}
                aria-label="Fechar menu"
              >
                <X className="w-5 h-5" />
              </button>
            </header>

            <nav className="flex flex-col gap-2">
              <MenuItem href="/" icon={<Home />} title="Página Inicial" active={pathname === "/"} />
              <MenuItem href="/projetos" icon={<Folder />} title="Projetos" active={pathname.startsWith("/projetos")} />

              <button
                onClick={() => setOpenServices(v => !v)}
                className="menu-modern flex items-center gap-2"
              >
                <Briefcase className="w-4 h-4" />
                Serviços
                <span className="ml-auto text-xs">
                  {openServices ? "▴" : "▾"}
                </span>
              </button>

              <AnimatePresence>
                {openServices && (
                  <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0 }}
                    className="pl-6 flex flex-col gap-1"
                  >
                    <MenuItem href="/servicos/desenvolvimento-web" title="Desenvolvimento Web" />
                    <MenuItem href="/servicos/consultoria-hardware" title="Consultoria Hardware" />
                    <MenuItem href="/servicos/montagem-pc" title="Montagem de PCs" />
                  </motion.div>
                )}
              </AnimatePresence>

              <MenuItem href="/contato" icon={<Mail />} title="Contato" />
              <MenuItem href="/sobre" icon={<User />} title="Sobre" />
            </nav>

            <footer className="mt-auto pt-6 border-t border-white/10">
              <button
                onClick={() =>
                  setTheme(t => (t === "light" ? "dark" : "light"))
                }
                className="w-full flex items-center justify-center gap-2
                  p-3 rounded-xl bg-white/10 hover:bg-white/20 transition"
              >
                {theme === "light" ? <Moon /> : <Sun className="text-yellow-400" />}
                {theme === "light" ? "Modo Escuro" : "Modo Claro"}
              </button>
            </footer>
          </motion.aside>
        )}
      </AnimatePresence>
    </>
  );
}

/* ITEM */
function MenuItem({ href, title, icon, active }: any) {
  return (
    <Link
      href={href}
      className={`menu-modern ${active ? "bg-white/10" : ""}`}
    >
      {icon && <span className="w-4 h-4">{icon}</span>}
      <span>{title}</span>
    </Link>
  );
}
