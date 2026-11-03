import Link from "next/link";
import { BRAND } from "@/config/brand";

export function Footer() {
  const items = [
    { label: "Instagram", href: BRAND.instagram, external: true },
    { label: "Envíos", href: "/info#envios" },
    { label: "Cambios", href: "/info#cambios" },
    { label: "Contacto", href: "/info#contacto" },
  ];
  return (
    <footer className="border-t border-line">
      <div className="container-site flex flex-col gap-6 py-10 md:flex-row md:items-center md:justify-between">
        <p className="text-sm font-semibold uppercase tracking-[0.18em]">
          {BRAND.name} <span className="px-2 font-normal text-muted">·</span>
          <span className="font-normal tracking-label text-muted">{BRAND.city}</span>
        </p>
        <ul className="flex flex-wrap gap-x-6 gap-y-3">
          {items.map((i) => (
            <li key={i.label}>
              {i.external ? (
                <a href={i.href} target="_blank" rel="noopener noreferrer" className="label transition-colors hover:text-ink">
                  {i.label}
                </a>
              ) : (
                <Link href={i.href} className="label transition-colors hover:text-ink">
                  {i.label}
                </Link>
              )}
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
}
