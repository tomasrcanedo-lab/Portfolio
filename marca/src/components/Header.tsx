"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { BRAND } from "@/config/brand";

const LINKS = [
  { href: "/#anteojos", label: "Anteojos" },
  { href: "/#accesorios", label: "Accesorios" },
  { href: "/#campana", label: "Campaña" },
  { href: "/#drop-01", label: "Drop 01" },
];

function BagIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
      <path d="M3 6h12l-1 10H4L3 6Z" stroke="currentColor" strokeWidth="1" />
      <path d="M6 6V4.5a3 3 0 0 1 6 0V6" stroke="currentColor" strokeWidth="1" />
    </svg>
  );
}

export function Header() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-bg/95 backdrop-blur-sm">
      <div className="container-site flex h-14 items-center justify-between gap-6">
        <Link href="/" className="text-[15px] font-semibold uppercase tracking-[0.18em]" onClick={() => setOpen(false)}>
          {BRAND.name}
        </Link>

        <nav aria-label="Principal" className="hidden md:block">
          <ul className="flex items-center gap-8">
            {LINKS.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="text-xs font-medium uppercase tracking-label transition-colors hover:text-muted">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-4">
          {/* Bolsa: sin funcionalidad hasta conectar la tienda */}
          <button type="button" className="flex items-center gap-1.5" aria-label="Bolsa, 0 productos" title="La tienda abre con el Drop 01">
            <BagIcon />
            <span className="font-mono text-xs">0</span>
          </button>
          <button
            type="button"
            className="font-mono text-xs uppercase tracking-label md:hidden"
            aria-expanded={open}
            aria-controls="menu-mobile"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? "Cerrar" : "Menú"}
          </button>
        </div>
      </div>

      <nav id="menu-mobile" aria-label="Principal mobile" hidden={!open} className="border-t border-line md:hidden">
        <ul className="container-site divide-y divide-line">
          {LINKS.map((l) => (
            <li key={l.href}>
              <Link href={l.href} onClick={() => setOpen(false)} className="block py-4 text-sm font-medium uppercase tracking-label">
                {l.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
