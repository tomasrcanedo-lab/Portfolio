import Link from "next/link";
import type { Product } from "@/data/catalog";
import type { ResolvedImages } from "@/lib/images";
import { fullName, priceLabel, soldCounter } from "@/lib/format";
import { Img } from "./Img";

export function ProductCard({ product, images, priority }: { product: Product; images: ResolvedImages; priority?: boolean }) {
  const name = fullName(product);
  return (
    <Link href={`/anteojos/${product.handle}`} className="group block" aria-label={`${name}. ${priceLabel(product)}. ${soldCounter(product)} vendidos.`}>
      <div className="studio relative aspect-[4/5] overflow-hidden">
        {images.front && (
          <Img
            src={images.front}
            alt={`${name}, de frente`}
            fill
            sizes="(min-width: 1024px) 33vw, 50vw"
            priority={priority}
            className="object-cover transition-opacity duration-300 ease-out group-hover:opacity-0 group-focus-visible:opacity-0"
          />
        )}
        {images.worn && (
          <Img
            src={images.worn}
            alt=""
            aria-hidden
            fill
            sizes="(min-width: 1024px) 33vw, 50vw"
            className="object-cover opacity-0 transition-opacity duration-300 ease-out group-hover:opacity-100 group-focus-visible:opacity-100"
          />
        )}
        <span className="label absolute left-3 top-3 text-ink/70">{product.code}</span>
      </div>
      <div className="mt-3 flex flex-col gap-1 md:flex-row md:items-start md:justify-between">
        <div>
          <h3 className="text-[13px] font-medium uppercase tracking-[0.04em] md:text-sm">
            {product.name} <span className="text-muted">//</span> {product.color}
          </h3>
          <p className="label mt-1">{priceLabel(product)}</p>
        </div>
        <p className="label tabular-nums md:text-ink">{soldCounter(product)}</p>
      </div>
    </Link>
  );
}
