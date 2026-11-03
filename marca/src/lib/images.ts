import "server-only";
import { existsSync } from "node:fs";
import { join } from "node:path";
import type { ImageKey, Product } from "@/data/catalog";

const PUBLIC_DIR = join(process.cwd(), "public");
const PHOTO_EXT = ["jpg", "jpeg", "webp", "png"];

/**
 * Devuelve la ruta pública de una imagen. Si hay foto real (jpg/webp/png) la usa;
 * si no, usa el placeholder SVG de la misma carpeta.
 */
export function resolveImage(dir: string, name: string): string {
  for (const ext of PHOTO_EXT) {
    if (existsSync(join(PUBLIC_DIR, dir, `${name}.${ext}`))) return `/${dir}/${name}.${ext}`;
  }
  return `/${dir}/${name}.svg`;
}

export type ResolvedImages = Partial<Record<ImageKey, string>>;

export function productImages(p: Product): ResolvedImages {
  const out: ResolvedImages = {};
  for (const key of p.images) out[key] = resolveImage(`products/${p.handle}`, key);
  return out;
}

/** Video del hero: /public/campaign/hero.mp4 (y opcional hero.webm). null si no hay. */
export function resolveVideo(dir: string, name: string) {
  const mp4 = existsSync(join(PUBLIC_DIR, dir, `${name}.mp4`)) ? `/${dir}/${name}.mp4` : null;
  const webm = existsSync(join(PUBLIC_DIR, dir, `${name}.webm`)) ? `/${dir}/${name}.webm` : null;
  return mp4 || webm ? { mp4, webm } : null;
}
