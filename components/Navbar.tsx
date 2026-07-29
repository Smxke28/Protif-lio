'use client';

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { signIn, signOut, useSession } from "next-auth/react";
import ThemeToggle from "./ThemeToggle";

const navLinks = [
  { href: "/", label: "Início" },
  { href: "/projetos", label: "Projetos" },
  { href: "/servicos", label: "Serviços" },
  { href: "/sobre", label: "Sobre" },
  { href: "/contato", label: "Contato" },
];

export default function Navbar() {
  const pathname = usePathname();
  const { data: session } = useSession();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setMobileOpen(false); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // Close sidebar on route change
  useEffect(() => { setMobileOpen(false); }, [pathname]);

  return (
    <>
      {/* ── NAVBAR BAR ── */}
      <header
        style={{
          background: scrolled ? "var(--nav-bg-scrolled)" : "var(--nav-bg)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          borderBottom: scrolled ? "1px solid var(--border-subtle)" : "1px solid transparent",
          transition: "all 0.3s ease",
          position: "relative",
          zIndex: 50,
        }}
      >
        <div
          style={{
            maxWidth: "1200px",
            margin: "0 auto",
            padding: "0 24px",
            height: "64px",
            display: "flex",
            alignItems: "center",
            gap: "16px",
          }}
        >
          {/* Hamburger — mobile only */}
          <button
            className="md:hidden"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label={mobileOpen ? "Fechar menu" : "Abrir menu"}
            aria-expanded={mobileOpen}
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              gap: "5px",
              padding: "8px",
              background: "none",
              border: "none",
              cursor: "pointer",
              flexShrink: 0,
              zIndex: 60,
            }}
          >
            <span style={{
              display: "block", width: "22px", height: "2px",
              background: mobileOpen ? "var(--accent-cyan)" : "var(--text-secondary)",
              borderRadius: "2px", transition: "all 0.3s",
              transform: mobileOpen ? "translateY(7px) rotate(45deg)" : "none",
            }} />
            <span style={{
              display: "block", width: "22px", height: "2px",
              background: mobileOpen ? "var(--accent-cyan)" : "var(--text-secondary)",
              borderRadius: "2px", transition: "all 0.3s",
              opacity: mobileOpen ? 0 : 1,
              transform: mobileOpen ? "scaleX(0)" : "none",
            }} />
            <span style={{
              display: "block", width: "22px", height: "2px",
              background: mobileOpen ? "var(--accent-cyan)" : "var(--text-secondary)",
              borderRadius: "2px", transition: "all 0.3s",
              transform: mobileOpen ? "translateY(-7px) rotate(-45deg)" : "none",
            }} />
          </button>

          {/* Logo */}
          <Link
            href="/"
            style={{ display: "flex", alignItems: "center", gap: "10px", textDecoration: "none", flexShrink: 0 }}
          >
            <div style={{
              width: "34px", height: "34px", borderRadius: "8px",
              background: "linear-gradient(135deg, var(--accent-cyan) 0%, var(--accent-violet) 100%)",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontFamily: "'JetBrains Mono', monospace", fontWeight: 700,
              fontSize: "0.85rem", color: "var(--on-accent)", flexShrink: 0,
            }}>
              JL
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "1px" }}>
              <span style={{ fontWeight: 700, fontSize: "0.9rem", color: "var(--text-primary)", lineHeight: 1, letterSpacing: "-0.01em" }}>
                Juan Lavecchia
              </span>
              <span className="hidden md:block" style={{ fontSize: "0.65rem", color: "var(--text-muted)", fontFamily: "'JetBrains Mono', monospace" }}>
                dev & consultor TI
              </span>
            </div>
          </Link>

          {/* Spacer */}
          <div style={{ flex: 1 }} />

          {/* Desktop Nav */}
          <nav className="hidden md:flex" style={{ alignItems: "center", gap: "4px" }} aria-label="Navegação principal">
            {navLinks.map((link) => {
              const active = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  style={{
                    fontSize: "0.85rem",
                    fontWeight: active ? 600 : 400,
                    color: active ? "var(--accent-cyan)" : "var(--text-secondary)",
                    padding: "6px 12px",
                    borderRadius: "8px",
                    textDecoration: "none",
                    background: active ? "rgba(0,212,255,0.08)" : "transparent",
                    border: active ? "1px solid rgba(0,212,255,0.15)" : "1px solid transparent",
                    transition: "all 0.2s",
                  }}
                  onMouseEnter={(e) => {
                    if (!active) {
                      (e.currentTarget as HTMLElement).style.color = "var(--text-primary)";
                      (e.currentTarget as HTMLElement).style.background = "var(--surface-faint)";
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!active) {
                      (e.currentTarget as HTMLElement).style.color = "var(--text-secondary)";
                      (e.currentTarget as HTMLElement).style.background = "transparent";
                    }
                  }}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Tema + Auth — desktop */}
          <div className="hidden md:flex" style={{ alignItems: "center", gap: "10px", marginLeft: "8px" }}>
            <ThemeToggle />
            {session ? (
              <button
                onClick={() => signOut()}
                style={{
                  display: "flex", alignItems: "center", gap: "8px",
                  padding: "6px 14px", borderRadius: "8px",
                  background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.2)",
                  color: "#F87171", fontSize: "0.8rem", fontWeight: 500, cursor: "pointer",
                }}
              >
                <img src={session.user?.image ?? ""} alt="avatar"
                  style={{ width: "20px", height: "20px", borderRadius: "50%" }} />
                Sair
              </button>
            ) : (
              <button
                onClick={() => signIn("google")}
                style={{
                  display: "flex", alignItems: "center", gap: "8px",
                  padding: "6px 14px", borderRadius: "8px",
                  background: "var(--border-subtle)", border: "1px solid var(--surface-hover)",
                  color: "var(--text-primary)", fontSize: "0.8rem", fontWeight: 500, cursor: "pointer",
                }}
              >
                Entrar
              </button>
            )}
          </div>
        </div>
      </header>

      {/* ── MOBILE SIDEBAR OVERLAY ── */}
      {/* Backdrop */}
      <div
        onClick={() => setMobileOpen(false)}
        aria-hidden
        style={{
          position: "fixed",
          inset: 0,
          background: "rgba(0,0,0,0.6)",
          backdropFilter: "blur(4px)",
          WebkitBackdropFilter: "blur(4px)",
          zIndex: 55,
          opacity: mobileOpen ? 1 : 0,
          pointerEvents: mobileOpen ? "auto" : "none",
          transition: "opacity 0.3s ease",
        }}
      />

      {/* Sidebar panel */}
      <nav
        aria-label="Menu mobile"
        aria-hidden={!mobileOpen}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          bottom: 0,
          width: "280px",
          background: "var(--nav-bg-solid)",
          backdropFilter: "blur(24px)",
          WebkitBackdropFilter: "blur(24px)",
          borderRight: "1px solid var(--border-subtle)",
          zIndex: 60,
          display: "flex",
          flexDirection: "column",
          padding: "0",
          transform: mobileOpen ? "translateX(0)" : "translateX(-100%)",
          transition: "transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
          boxShadow: mobileOpen ? "4px 0 40px rgba(0,0,0,0.5)" : "none",
        }}
      >
        {/* Sidebar header */}
        <div style={{
          height: "64px",
          display: "flex",
          alignItems: "center",
          padding: "0 24px",
          borderBottom: "1px solid var(--border-subtle)",
          flexShrink: 0,
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <div style={{
              width: "30px", height: "30px", borderRadius: "7px",
              background: "linear-gradient(135deg, var(--accent-cyan), var(--accent-violet))",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontFamily: "'JetBrains Mono', monospace", fontWeight: 700,
              fontSize: "0.75rem", color: "var(--on-accent)",
            }}>JL</div>
            <span style={{ fontWeight: 600, fontSize: "0.9rem", color: "var(--text-primary)" }}>Juan Lavecchia</span>
          </div>
        </div>

        {/* Nav links */}
        <div style={{ flex: 1, padding: "24px 16px", display: "flex", flexDirection: "column", gap: "4px", overflowY: "auto" }}>
          <p style={{
            fontSize: "0.65rem", fontFamily: "'JetBrains Mono', monospace",
            textTransform: "uppercase", letterSpacing: "0.12em",
            color: "var(--text-muted)", padding: "0 8px", marginBottom: "8px",
          }}>
            Navegação
          </p>

          {navLinks.map((link) => {
            const active = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "12px 16px",
                  borderRadius: "10px",
                  textDecoration: "none",
                  fontWeight: active ? 600 : 400,
                  fontSize: "0.95rem",
                  color: active ? "var(--accent-cyan)" : "var(--text-secondary)",
                  background: active ? "rgba(0,212,255,0.08)" : "transparent",
                  border: "1px solid",
                  borderColor: active ? "rgba(0,212,255,0.15)" : "transparent",
                  transition: "all 0.15s",
                }}
              >
                <span>{link.label}</span>
                {active && (
                  <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "var(--accent-cyan)", flexShrink: 0 }} />
                )}
              </Link>
            );
          })}
        </div>

        {/* Sidebar footer */}
        <div style={{
          padding: "16px",
          borderTop: "1px solid var(--border-subtle)",
          flexShrink: 0,
          display: "flex",
          flexDirection: "column",
          gap: "12px",
        }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <span style={{ fontSize: "0.8rem", color: "var(--text-secondary)" }}>Aparência</span>
            <ThemeToggle />
          </div>
          {session ? (
            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "10px", padding: "10px 12px",
                background: "var(--surface-faint)", borderRadius: "8px", border: "1px solid var(--border-subtle)" }}>
                <img src={session.user?.image ?? ""} alt="avatar"
                  style={{ width: "28px", height: "28px", borderRadius: "50%", border: "2px solid rgba(0,212,255,0.3)" }} />
                <div>
                  <div style={{ fontSize: "0.8rem", fontWeight: 500, color: "var(--text-primary)" }}>{session.user?.name}</div>
                  <div style={{ fontSize: "0.68rem", color: "var(--text-muted)", fontFamily: "'JetBrains Mono', monospace" }}>{session.user?.email}</div>
                </div>
              </div>
              <button
                onClick={() => signOut()}
                style={{
                  width: "100%", padding: "10px", borderRadius: "8px",
                  background: "rgba(239,68,68,0.08)", border: "1px solid rgba(239,68,68,0.15)",
                  color: "#F87171", fontSize: "0.85rem", cursor: "pointer", fontWeight: 500,
                }}
              >
                Sair da conta
              </button>
            </div>
          ) : (
            <button
              onClick={() => signIn("google")}
              style={{
                width: "100%", padding: "11px", borderRadius: "8px",
                background: "rgba(0,212,255,0.08)", border: "1px solid rgba(0,212,255,0.2)",
                color: "var(--accent-cyan)", fontSize: "0.9rem", fontWeight: 600, cursor: "pointer",
              }}
            >
              Entrar com Google
            </button>
          )}
        </div>
      </nav>
    </>
  );
}
