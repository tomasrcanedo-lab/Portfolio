"use client";

import { useId, useState } from "react";
import type { Product } from "@/data/catalog";
import { priceLabel } from "@/lib/format";
import { Img } from "./Img";

export function AccessoryCard({ product, image }: { product: Product; image?: string }) {
  const [option, setOption] = useState(product.options?.values[0] ?? "");
  const selectId = useId();

  return (
    <article>
      <div className="studio relative aspect-[4/5] overflow-hidden">
        {image && (
          <Img src={image} alt={`${product.name} // ${product.color}`} fill sizes="(min-width: 1024px) 25vw, 50vw" className="object-cover" />
        )}
        {product.options && (
          <span className="absolute right-3 top-3 border border-ink bg-bg px-2 py-1 font-mono text-xs" aria-hidden>
            {option}
          </span>
        )}
      </div>
      <div className="mt-3">
        <h3 className="text-[13px] font-medium uppercase tracking-[0.04em] md:text-sm">
          {product.name} <span className="text-muted">//</span> {product.color}
        </h3>
        <p className="mt-1 text-[13px] leading-snug text-muted md:text-sm">{product.description}</p>
        <div className="mt-2 flex flex-col gap-1 md:flex-row md:items-center md:justify-between md:gap-2">
          <p className="label">{product.detail}</p>
          <p className="label">{priceLabel(product)}</p>
        </div>
        {product.options && (
          <div className="mt-3 flex items-center gap-3">
            <label htmlFor={selectId} className="label">
              {product.options.name}
            </label>
            <select
              id={selectId}
              value={option}
              onChange={(e) => setOption(e.target.value)}
              className="h-9 min-w-16 border border-line bg-bg px-2 font-mono text-xs uppercase hover:border-ink"
            >
              {product.options.values.map((v) => (
                <option key={v} value={v}>
                  {v}
                </option>
              ))}
            </select>
          </div>
        )}
      </div>
    </article>
  );
}
