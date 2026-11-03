/**
 * Catálogo. Fuente única de productos del sitio.
 *
 * Para conectar tienda (Shopify / Tiendanube) después:
 * - `handle` es el identificador estable. Usar el mismo handle en la tienda.
 * - `externalId` queda en null hasta que exista el producto en la tienda.
 * - `price` en null muestra "Próximamente".
 *
 * Imágenes: /public/products/<handle>/front.jpg | side.jpg | worn.jpg | packaging.jpg
 * Si el JPG no existe, el sitio usa el placeholder SVG de la misma carpeta.
 */

export type Category = "anteojos" | "accesorios";
export type ImageKey = "front" | "side" | "worn" | "packaging";

export type Product = {
  code: string;
  handle: string;
  name: string;
  color: string;
  category: Category;
  description: string;
  measures?: { frontWidth: number; lensHeight: number; templeLength: number }; // mm
  material: string;
  lens?: string;
  /** Unidades disponibles, sobre BRAND.editionSize (50). */
  stock: number;
  /** En pesos argentinos. null = "Próximamente". */
  price: number | null;
  externalId: string | null;
  images: ImageKey[];
  /** Opciones elegibles (ej.: letra del dije). */
  options?: { name: string; values: string[] };
  detail?: string;
};

const EYEWEAR_IMAGES: ImageKey[] = ["front", "side", "worn", "packaging"];

export const products: Product[] = [
  {
    code: "D01-01",
    handle: "ruta",
    name: "RUTA",
    color: "NEGRO",
    category: "anteojos",
    description:
      "Frente muy angosto y curva que envuelve la cara. Acetato negro brillante, lente negra. Para manejar, para la calle, para todo el día.",
    measures: { frontWidth: 142, lensHeight: 34, templeLength: 140 },
    material: "Acetato negro brillante",
    lens: "Negra, categoría 3, UV400",
    stock: 50,
    price: null,
    externalId: null,
    images: EYEWEAR_IMAGES,
  },
  {
    code: "D01-02",
    handle: "banda",
    name: "BANDA",
    color: "NEGRO HUMO",
    category: "anteojos",
    description:
      "Frente de una sola pieza con puente bajo. Se ve como una banda negra de lado a lado. Lente humo.",
    measures: { frontWidth: 146, lensHeight: 42, templeLength: 140 },
    material: "Acetato negro brillante",
    lens: "Humo, categoría 3, UV400",
    stock: 50,
    price: null,
    externalId: null,
    images: EYEWEAR_IMAGES,
  },
  {
    code: "D01-03",
    handle: "orilla",
    name: "ORILLA",
    color: "NEGRO ESPEJO",
    category: "anteojos",
    description:
      "Envolvente de acetato negro con lente espejada plateada. Pensado para la playa y el sol de frente.",
    measures: { frontWidth: 144, lensHeight: 40, templeLength: 140 },
    material: "Acetato negro brillante",
    lens: "Espejada plateada, categoría 3, UV400",
    stock: 50,
    price: null,
    externalId: null,
    images: EYEWEAR_IMAGES,
  },
  {
    code: "D01-04",
    handle: "plaza",
    name: "PLAZA",
    color: "NEGRO",
    category: "anteojos",
    description:
      "Acetato negro grueso y lente rectangular. Plaqueta de metal con el logo en la patilla.",
    measures: { frontWidth: 140, lensHeight: 44, templeLength: 145 },
    material: "Acetato negro, plaqueta de metal",
    lens: "Negra, categoría 3, UV400",
    stock: 50,
    price: null,
    externalId: null,
    images: EYEWEAR_IMAGES,
  },
  {
    code: "D01-05",
    handle: "filo",
    name: "FILO",
    color: "NEGRO",
    category: "anteojos",
    description:
      "Puntas que suben hacia afuera. Acetato negro, lente oscura. Unisex.",
    measures: { frontWidth: 141, lensHeight: 40, templeLength: 140 },
    material: "Acetato negro brillante",
    lens: "Oscura, categoría 3, UV400",
    stock: 50,
    price: null,
    externalId: null,
    images: EYEWEAR_IMAGES,
  },
  {
    code: "D01-06",
    handle: "arco",
    name: "ARCO",
    color: "NEGRO MATE",
    category: "anteojos",
    description:
      "Metal negro y lente única de lado a lado. Envolvente. Detalle calado en la patilla.",
    measures: { frontWidth: 148, lensHeight: 48, templeLength: 135 },
    material: "Metal negro mate",
    lens: "Única, oscura, categoría 3, UV400",
    stock: 50,
    price: null,
    externalId: null,
    images: EYEWEAR_IMAGES,
  },

  // Accesorios
  {
    code: "D01-A1",
    handle: "cadena",
    name: "CADENA",
    color: "PLATA",
    category: "accesorios",
    description: "Plata 925, eslabón fino.",
    detail: "50 cm",
    material: "Plata 925",
    stock: 50,
    price: null,
    externalId: null,
    images: ["front"],
  },
  {
    code: "D01-A2",
    handle: "dije-inicial",
    name: "DIJE INICIAL",
    color: "PLATA",
    category: "accesorios",
    description: "Letra de plata con piedras, para colgar de la cadena.",
    detail: "Elegís la letra",
    material: "Plata 925, circonias",
    stock: 50,
    price: null,
    externalId: null,
    images: ["front"],
    options: { name: "Letra", values: "ABCDEFGHIJKLMNÑOPQRSTUVWXYZ".split("") },
  },
  {
    code: "D01-A3",
    handle: "anillo-sello",
    name: "ANILLO SELLO",
    color: "PLATA",
    category: "accesorios",
    description: "Cara plana para grabar.",
    detail: "Grabado a pedido",
    material: "Plata 925",
    stock: 50,
    price: null,
    externalId: null,
    images: ["front"],
  },
  {
    code: "D01-A4",
    handle: "cinturon",
    name: "CINTURÓN",
    color: "NEGRO",
    category: "accesorios",
    description: "Cuero negro, hebilla plateada.",
    detail: "Cuero vacuno",
    material: "Cuero negro, hebilla de metal plateado",
    stock: 50,
    price: null,
    externalId: null,
    images: ["front"],
  },
];

export const eyewear = products.filter((p) => p.category === "anteojos");
export const accessories = products.filter((p) => p.category === "accesorios");

export function getProduct(handle: string) {
  return products.find((p) => p.handle === handle);
}

export type CampaignShot = {
  file: string;
  alt: string;
  color?: boolean;
};

/** /public/campaign/<file>.jpg reemplaza al placeholder .svg */
export const campaign: CampaignShot[] = [
  { file: "01-playa", alt: "Retrato cerrado en la playa, luz dura de mediodía" },
  { file: "02-aeropuerto", alt: "Ventanal de aeropuerto, pista de fondo" },
  { file: "03-auto", alt: "Desde el asiento del acompañante, brazo en la ventanilla" },
  { file: "04-color", alt: "Vestuario azul cobalto y rojo con detalles dorados", color: true },
  { file: "05-calle", alt: "Calle europea, fachadas al sol" },
  { file: "06-selfie", alt: "Selfie con anteojos puestos, encuadre cerrado" },
];

export const heroImage = { file: "hero", alt: "Campaña Drop 01, blanco y negro" };
