import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BRAND } from "@/config/brand";
import { eyewear, getProduct } from "@/data/catalog";
import { productImages } from "@/lib/images";
import { fullName, pad, priceLabel, soldCounter } from "@/lib/format";
import { ProductGallery, type GalleryItem } from "@/components/ProductGallery";
import { DropSignup } from "@/components/DropSignup";
import { ProductCard } from "@/components/ProductCard";

type Params = { params: Promise<{ handle: string }> };

export function generateStaticParams() {
  return eyewear.map((p) => ({ handle: p.handle }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { handle } = await params;
  const p = getProduct(handle);
  if (!p) return {};
  const img = productImages(p).front;
  const title = fullName(p);
  return {
    title,
    description: `${p.description} Edición de ${BRAND.editionSize} unidades.`,
    alternates: { canonical: `/anteojos/${p.handle}` },
    openGraph: {
      title: `${title} — ${BRAND.name}`,
      description: p.description,
      url: `/anteojos/${p.handle}`,
      images: img && !img.endsWith(".svg") ? [{ url: img }] : undefined,
    },
  };
}

const VIEW_LABELS = { front: "Frente", side: "3/4", worn: "Puesto", packaging: "Packaging" } as const;

export default async function ProductPage({ params }: Params) {
  const { handle } = await params;
  const p = getProduct(handle);
  if (!p || p.category !== "anteojos") notFound();

  const imgs = productImages(p);
  const name = fullName(p);
  const gallery: GalleryItem[] = p.images
    .filter((k) => imgs[k])
    .map((k) => ({ src: imgs[k]!, label: VIEW_LABELS[k], alt: `${name}, ${VIEW_LABELS[k].toLowerCase()}` }));

  const others = eyewear.filter((o) => o.handle !== p.handle).slice(0, 3);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name,
    sku: p.code,
    brand: { "@type": "Brand", name: BRAND.name },
    description: p.description,
    material: p.material,
    color: p.color,
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className="container-site py-6 md:py-10">
        <nav aria-label="Ruta" className="label mb-6">
          <Link href="/#anteojos" className="hover:text-ink">
            Anteojos
          </Link>
          <span className="px-2">/</span>
          <span className="text-ink">{p.name}</span>
        </nav>

        <div className="grid gap-8 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-7">
            <ProductGallery items={gallery} />
          </div>

          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-24">
              <p className="label">
                {p.code} · {BRAND.currentDrop}
              </p>
              <h1 className="title mt-2 text-3xl md:text-5xl">{p.name}</h1>
              <p className="mt-1 text-sm font-medium uppercase tracking-[0.04em] text-muted">// {p.color}</p>

              <p className="mt-6 max-w-md text-base leading-relaxed">{p.description}</p>

              <dl className="mt-8 border-t border-line text-sm">
                {p.measures && (
                  <>
                    <Row term="Ancho de frente" value={`${p.measures.frontWidth} mm`} />
                    <Row term="Alto de lente" value={`${p.measures.lensHeight} mm`} />
                    <Row term="Largo de patilla" value={`${p.measures.templeLength} mm`} />
                  </>
                )}
                <Row term="Material" value={p.material} />
                {p.lens && <Row term="Lente" value={p.lens} />}
                <Row term="Precio" value={priceLabel(p)} />
                <Row
                  term="Unidades"
                  value={
                    <>
                      Quedan {pad(p.stock)} de {BRAND.editionSize} <span className="text-muted">({soldCounter(p)})</span>
                    </>
                  }
                />
              </dl>

              <div className="mt-8">
                <DropSignup source={`modelo:${p.handle}`} />
              </div>
              <p className="label mt-4">Sin reposición. Incluye funda y tarjeta numerada.</p>
            </div>
          </div>
        </div>

        <section aria-labelledby="otros" className="mt-20 md:mt-28">
          <h2 id="otros" className="title border-b border-line pb-4 text-xl md:text-2xl">
            Otros modelos
          </h2>
          <ul className="mt-6 grid grid-cols-2 gap-x-3 gap-y-10 md:gap-x-6 lg:grid-cols-3">
            {others.map((o, i) => (
              <li key={o.handle} className={i === 2 ? "hidden lg:block" : ""}>
                <ProductCard product={o} images={productImages(o)} />
              </li>
            ))}
          </ul>
        </section>
      </div>
    </>
  );
}

function Row({ term, value }: { term: string; value: React.ReactNode }) {
  return (
    <div className="flex justify-between gap-6 border-b border-line py-3">
      <dt className="label pt-0.5">{term}</dt>
      <dd className="text-right">{value}</dd>
    </div>
  );
}
