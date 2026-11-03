/**
 * Cambiar el nombre de la marca acá. Se usa en todo el sitio, SEO y Open Graph.
 */
export const BRAND_NAME = "MARCA";

export const BRAND = {
  name: BRAND_NAME,
  city: "Buenos Aires",
  tagline: "Anteojos de sol y plata. Ediciones de 50 por modelo.",
  description:
    "Anteojos de sol negros, angostos y envolventes, y accesorios de plata. Ediciones limitadas de 50 unidades por modelo, sin reposición. Buenos Aires.",
  instagram: "https://instagram.com/",
  email: "hola@marca.com.ar",
  editionSize: 50,
  currentDrop: "DROP 01",
} as const;

export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000").replace(/\/$/, "");
