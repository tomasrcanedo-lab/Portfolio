import { BRAND } from "@/config/brand";
import type { Product } from "@/data/catalog";

export const pad = (n: number) => String(n).padStart(2, "0");

/** "00/50": unidades vendidas sobre el total de la edición. */
export function soldCounter(p: Product) {
  const total = BRAND.editionSize;
  return `${pad(total - p.stock)}/${total}`;
}

export function priceLabel(p: Product) {
  if (p.price == null) return "Próximamente";
  return new Intl.NumberFormat("es-AR", { style: "currency", currency: "ARS", maximumFractionDigits: 0 }).format(p.price);
}

export const fullName = (p: Product) => `${p.name} // ${p.color}`;
