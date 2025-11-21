"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { motion } from "framer-motion";
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
    if (pathname === "/") {
      e.preventDefault();
      const el = document.getElementById(hash);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      } else router.push("/#" + hash);
      closeMenu();
      return;
    }

    e.preventDefault();
    closeMenu();
    router.push("/#" + hash);
  }

  return (
    <>
      {/* BOTÃO ABRIR */}
      {!open && (
        <motion.button
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setOpen(true)}
          className="fixed top-4 left-4 z-[10001] p-3 bg-blue-950/90 backdrop-blur-xl 
                     rounded-xl shadow-lg hover:bg-blue-900 transition text-white"
        >
          <MenuIcon className="w-6 h-6" />
        </motion.button>
      )}

      {/* BACKDROP */}
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.5 }}
          exit={{ opacity: 0 }}
          onClick={() => setOpen(false)}
          className="fixed inset-0 bg-black/60 z-[10000] backdrop-blur-sm"
        />
      )}

      {/* SIDEBAR */}
      <motion.aside
        initial={{ x: "-100%" }}
        animate={{ x: open ? 0 : "-100%" }}
        transition={{ type: "spring", stiffness: 90, damping: 18 }}
        className="fixed top-0 left-0 h-full w-64 p-6
                   bg-gradient-to-b from-blue-950/80 via-black/70 to-black/80
                   backdrop-blur-xl border-r border-white/10
                   shadow-2xl z-[10002]"
      >
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-xl font-bold tracking-wide">Juan L.</h1>

          <button
            onClick={() => setOpen(false)}
            className="p-2 rounded-lg hover:bg-white/10 transition"
          >
            <XIcon className="w-5 h-5 text-gray-200" />
          </button>
        </div>

        {/* MENU */}
        <nav className="flex flex-col gap-2">
          <MenuItem
            href="/"
            title="Página Inicial"
            icon={<Home className="w-4 h-4" />}
            onClick={closeMenu}
          />

          {/* Projetos (âNCORA) */}
          <a
            href="/projetos"
            onClick={(e) => handleAnchorClick(e, "projetos")}
            className="menu-modern"
          >
            <Folder className="w-4 h-4" />
            Projetos
          </a>

          <MenuItem
            href="/servicos"
            title="Serviços"
            icon={<Briefcase className="w-4 h-4" />}
            onClick={closeMenu}
          />

          {pathname?.startsWith("/servicos") && (
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className="pl-6 flex flex-col gap-1 mt-2"
            >
              <MenuItem
                href="/servicos/desenvolvimento-web"
                title="Desenvolvimento Web"
              />
              <MenuItem
                href="/servicos/consultoria-hardware"
                title="Consultoria em Hardware"
              />
              <MenuItem href="/servicos/montagem-pc" title="Montagem de PCs" />
            </motion.div>
          )}

          <MenuItem
            href="/contato"
            title="Contato"
            icon={<Mail className="w-4 h-4" />}
            onClick={closeMenu}
          />

          <MenuItem
            href="/sobre"
            title="Sobre"
            icon={<User className="w-4 h-4" />}
            onClick={closeMenu}
          />
        </nav>

        {/* BOTÃO TEMA */}
        <div className="mt-auto pt-6 border-t border-white/10">
          <button
            onClick={() => setTheme(theme === "light" ? "dark" : "light")}
            className="w-full flex items-center justify-center gap-2 p-3
                       rounded-xl bg-white/10 hover:bg-white/20 backdrop-blur-sm
                       transition font-medium"
          >
            {theme === "light" ? (
              <Moon className="w-4 h-4" />
            ) : (
              <Sun className="w-4 h-4 text-yellow-400" />
            )}
            {theme === "light" ? "Modo Escuro" : "Modo Claro"}
          </button>
        </div>
      </motion.aside>
    </>
  );
}

/* COMPONENTE ITEM DO MENU */
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
    <Link href={href} onClick={onClick} className="menu-modern">
      {icon}
      {title}
    </Link>
  );
}
