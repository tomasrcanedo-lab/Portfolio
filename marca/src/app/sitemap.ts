import type { MetadataRoute } from "next";
import { SITE_URL } from "@/config/brand";
import { eyewear } from "@/data/catalog";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: `${SITE_URL}/`, changeFrequency: "weekly", priority: 1 },
    ...eyewear.map((p) => ({ url: `${SITE_URL}/anteojos/${p.handle}`, changeFrequency: "weekly" as const, priority: 0.8 })),
    { url: `${SITE_URL}/info`, changeFrequency: "monthly", priority: 0.3 },
  ];
}
