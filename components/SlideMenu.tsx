'use client';

import React, { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { Menu as MenuIcon, X as XIcon, Sun, Moon, Home, Briefcase, Folder, Mail, User } from 'lucide-react';

export default function SlideMenu() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);
  useEffect(() => {
    const saved = localStorage.getItem('theme') as 'light' | 'dark' | null;
    setTheme(saved || 'light');
  }, []);
  useEffect(() => {
    if (!mounted) return;
    const root = document.documentElement;
    if (theme === 'dark') root.classList.add('dark');
    else root.classList.remove('dark');
    localStorage.setItem('theme', theme);
  }, [theme, mounted]);

  if (!mounted) return null;

  return (
    <>
      {/* Botão sempre visível (Windows + Mobile) */}
      {!open && (
        <button
          onClick={() => setOpen(true)}
          className="fixed top-4 left-4 z-[10001] text-white hover:text-gray-200 transition p-2 rounded-md bg-blue-950"
        >
          <MenuIcon className="w-5 h-5" />
        </button>
      )}

      {/* Backdrop quando aberto */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 bg-black/50 z-[10000]"
        />
      )}

      {/* Sidebar estilizada */}
      <aside
        className={`fixed top-0 left-0 h-full w-64 p-6 bg-gradient-to-b from-blue-950 via-black to-black text-white shadow-xl z-[10002] transition-transform duration-300
          ${open ? 'translate-x-0' : '-translate-x-full'}`}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-xl font-bold">Juan L.</h1>
          <button onClick={() => setOpen(false)} className="text-gray-200">
            <XIcon className="w-5 h-5" />
          </button>
        </div>

        {/* Navegação */}
        <nav className="flex flex-col gap-2">
          <MenuItem href="/" title="Página Inicial" icon={<Home className="w-4 h-4" />} pathname={pathname} />

          <MenuItem href="/servicos" title="Serviços" icon={<Briefcase className="w-4 h-4" />} pathname={pathname} />
          {pathname?.startsWith("/servicos") && (
            <div className="pl-6 flex flex-col gap-1 mt-2">
              <MenuItem href="/servicos/desenvolvimento-web" title="Desenvolvimento Web" pathname={pathname} />
              <MenuItem href="/servicos/consultoria-hardware" title="Consultoria em Hardware" pathname={pathname} />
              <MenuItem href="/servicos/montagem-pc" title="Montagem de PCs" pathname={pathname} />
            </div>
          )}

          <MenuItem href="/projetos" title="Projetos" icon={<Folder className="w-4 h-4" />} pathname={pathname} />
          <MenuItem href="/contato" title="Contato" icon={<Mail className="w-4 h-4" />} pathname={pathname} />
          <MenuItem href="/sobre" title="Sobre" icon={<User className="w-4 h-4" />} pathname={pathname} />
        </nav>

        {/* Rodapé do menu */}
        <div className="mt-auto pt-6 border-t border-blue-900">
          <button
            onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
            className="w-full flex items-center justify-center gap-2 p-2 rounded bg-blue-900 hover:bg-blue-800 transition"
          >
            {theme === 'light' ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4 text-yellow-400" />}
            {theme === 'light' ? 'Modo Escuro' : 'Modo Claro'}
          </button>
        </div>
      </aside>
    </>
  );
}

function MenuItem({
  href,
  title,
  pathname,
  icon,
}: {
  href: string;
  title: string;
  pathname: string | null;
  icon?: React.ReactNode;
}) {
  const isActive = pathname === href;
  return (
    <Link
      href={href}
      className={`flex items-center gap-2 px-4 py-2 rounded text-sm font-medium transition
        ${isActive ? 'bg-blue-800 text-white' : 'hover:bg-blue-900'}`}
    >
      {icon}
      {title}
    </Link>
  );
}
