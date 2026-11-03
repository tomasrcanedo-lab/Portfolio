"use client";

import { useState } from "react";
import { Img } from "./Img";

export type GalleryItem = { src: string; alt: string; label: string };

export function ProductGallery({ items }: { items: GalleryItem[] }) {
  const [active, setActive] = useState(0);
  const current = items[active];

  return (
    <div>
      <div className="studio relative aspect-[4/5] overflow-hidden">
        {items.map((it, i) => (
          <Img
            key={it.src}
            src={it.src}
            alt={it.alt}
            fill
            priority={i === 0}
            sizes="(min-width: 1024px) 58vw, 100vw"
            className={`object-cover transition-opacity duration-300 ${i === active ? "opacity-100" : "opacity-0"}`}
            aria-hidden={i !== active}
          />
        ))}
        <span className="label absolute left-3 top-3 text-ink/70" aria-live="polite">
          {current.label} · {active + 1}/{items.length}
        </span>
      </div>
      <ul className="mt-3 grid grid-cols-4 gap-2 md:gap-3" aria-label="Fotos del modelo">
        {items.map((it, i) => (
          <li key={it.src}>
            <button
              type="button"
              onClick={() => setActive(i)}
              aria-label={`Ver ${it.label.toLowerCase()}`}
              aria-current={i === active}
              className={`studio relative block aspect-square w-full overflow-hidden border transition-colors ${i === active ? "border-ink" : "border-transparent hover:border-line"}`}
            >
              <Img src={it.src} alt="" fill sizes="(min-width: 1024px) 14vw, 25vw" className="object-cover" />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
