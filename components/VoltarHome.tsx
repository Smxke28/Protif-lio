// components/VoltarHome.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function VoltarHome({
  label = "Voltar à página inicial",
  className = "",
  hideOnHome = true,
}: {
  label?: string;
  className?: string;
  hideOnHome?: boolean;
}) {
  const pathname = usePathname();

  // Não renderiza quando estamos na rota raiz ("/") se hideOnHome for true
  if (hideOnHome && pathname === "/") return null;

  return (
    <Link
      href="/"
      title={label}
      aria-label={label}
      className={
        "inline-flex items-center gap-2 px-3 py-2 rounded-md bg-gray-800 text-white hover:bg-gray-700 transition shadow-sm " +
        className
      }
    >
      {/* Seta para a esquerda */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-4 h-4 -ml-1"
        viewBox="0 0 20 20"
        fill="currentColor"
        aria-hidden="true"
      >
        <path
          fillRule="evenodd"
          d="M9.707 14.707a1 1 0 01-1.414 0L3.586 10l4.707-4.707a1 1 0 011.414 1.414L6.414 10l3.293 3.293a1 1 0 010 1.414zM17 10a1 1 0 01-1 1H7a1 1 0 110-2h9a1 1 0 011 1z"
          clipRule="evenodd"
        />
      </svg>

      <span className="text-sm">{label}</span>
    </Link>
  );
}
