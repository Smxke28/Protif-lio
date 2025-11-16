'use client';

import React, { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { Menu as MenuIcon, X as XIcon, Sun, Moon } from 'lucide-react';

export default function SlideMenu() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [mounted, setMounted] = useState(false);

  // Evita problemas de hidratação
  useEffect(() => setMounted(true), []);

  // Carrega tema salvo
  useEffect(() => {
    const saved = localStorage.getItem('theme') as 'light' | 'dark' | null;
    setTheme(saved || 'light');
  }, []);

  // Aplica tema no <html>
  useEffect(() => {
    if (!mounted) return;
    const root = document.documentElement;

    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }

    localStorage.setItem('theme', theme);
  }, [theme, mounted]);

  if (!mounted) return null;

  return (
    <>
      {/* Botão mobile */}
      {!open && (
        <button
          onClick={() => setOpen(true)}
          className="md:hidden fixed top-4 left-4 z-[10001] text-gray-800 dark:text-gray-200 hover:text-white transition p-2 rounded-md bg-gray-800 dark:bg-gray-700"
        >
          <MenuIcon className="w-5 h-5" />
        </button>
      )}

      {/* Backdrop mobile */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 bg-black/50 z-[10000] md:hidden"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full w-64 p-6 bg-white dark:bg-gray-900 shadow-md z-[10002] transition-transform duration-300
          ${open ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0`}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-xl font-bold text-gray-900 dark:text-white">Juan L.</h1>
          <button onClick={() => setOpen(false)} className="md:hidden text-gray-700 dark:text-gray-300">
            <XIcon className="w-5 h-5" />
          </button>
        </div>

        {/* Navegação */}
        <nav className="flex flex-col gap-2">
          <MenuItem href="/" title="Página Inicial" pathname={pathname} />

          <MenuItem href="/servicos" title="Serviços" pathname={pathname} />
          {pathname?.startsWith("/servicos") && (
            <div className="pl-6 flex flex-col gap-1 mt-2">
              <MenuItem href="/servicos/desenvolvimento-web" title="Desenvolvimento Web" pathname={pathname} />
              <MenuItem href="/servicos/consultoria-ti" title="Consultoria em TI" pathname={pathname} />
              <MenuItem href="/servicos/Outros" title="Outros" pathname={pathname} />
            </div>
          )}

          <MenuItem href="/projetos" title="Projetos" pathname={pathname} />
          <MenuItem href="/contato" title="Contato" pathname={pathname} />
          <MenuItem href="/sobre" title="Sobre" pathname={pathname} />
        </nav>

        {/* Botão tema */}
        <div className="mt-auto pt-6">
          <button
            onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
            className="w-full flex items-center justify-center gap-2 p-2 rounded bg-gray-200 dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-700 transition"
          >
            {theme === 'light' ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4 text-yellow-400" />}
            {theme === 'light' ? 'Modo Escuro' : 'Modo Claro'}
          </button>
        </div>
      </aside>
    </>
  );
}

function MenuItem({ href, title, pathname }: { href: string; title: string; pathname: string | null }) {
  const isActive = pathname === href;
  return (
    <Link
      href={href}
      className={`block px-4 py-2 rounded text-sm font-medium transition
        ${isActive ? 'bg-blue-600 text-white' : 'text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-800'}`}
    >
      {title}
    </Link>
  );
}
