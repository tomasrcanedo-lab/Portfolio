import Link from "next/link";
import { BRAND } from "@/config/brand";
import { accessories, campaign, eyewear, heroImage } from "@/data/catalog";
import { productImages, resolveImage, resolveVideo } from "@/lib/images";
import { HeroMedia } from "@/components/HeroMedia";
import { Img } from "@/components/Img";
import { ProductCard } from "@/components/ProductCard";
import { AccessoryCard } from "@/components/AccessoryCard";
import { SectionHead } from "@/components/SectionHead";
import { WaitlistForm } from "@/components/WaitlistForm";

export default function Home() {
  const hero = resolveImage("campaign", heroImage.file);
  const heroVideo = resolveVideo("campaign", heroImage.file);
  const packaging = resolveImage("packaging", "estuche");

  return (
    <>
      {/* HERO */}
      <section aria-label={`${BRAND.currentDrop}`} className="relative h-[78svh] min-h-[480px] w-full overflow-hidden bg-ink md:h-[88svh]">
        <HeroMedia poster={hero} alt={heroImage.alt} video={heroVideo} />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/0 to-black/0" aria-hidden />
        <div className="container-site absolute inset-x-0 bottom-0 pb-10 md:pb-16">
          <h1 className="title text-[13vw] text-white sm:text-6xl md:text-8xl">
            Drop 01.
            <br />
            50 por modelo.
          </h1>
          <Link href="#anteojos" className="btn-light mt-6 md:mt-8">
            Ver anteojos
          </Link>
        </div>
      </section>

      {/* ANTEOJOS */}
      <section aria-labelledby="anteojos" className="container-site py-16 md:py-24">
        <SectionHead id="anteojos" index="01" title="Anteojos" aside={<>6 modelos<br className="md:hidden" /><span className="hidden md:inline"> · </span>50 por modelo</>} />
        <ul className="mt-6 grid grid-cols-2 gap-x-3 gap-y-10 md:mt-8 md:gap-x-6 md:gap-y-14 lg:grid-cols-3">
          {eyewear.map((p, i) => (
            <li key={p.handle}>
              <ProductCard product={p} images={productImages(p)} priority={i < 2} />
            </li>
          ))}
        </ul>
        <p className="label mt-10 max-w-md">Sin reposición. Cuando un modelo llega a 50/50, no vuelve.</p>
      </section>

      {/* ACCESORIOS */}
      <section aria-labelledby="accesorios" className="container-site pb-16 md:pb-24">
        <SectionHead id="accesorios" index="02" title="Accesorios" aside="Plata 925" />
        <ul className="mt-6 grid grid-cols-2 gap-x-3 gap-y-10 md:mt-8 md:gap-x-6 lg:grid-cols-4">
          {accessories.map((p) => (
            <li key={p.handle}>
              <AccessoryCard product={p} image={productImages(p).front} />
            </li>
          ))}
        </ul>
      </section>

      {/* CAMPAÑA */}
      <section aria-labelledby="campana" className="container-site pb-16 md:pb-24">
        <SectionHead id="campana" index="03" title="Campaña" aside="Playa · Aeropuerto · Auto · Calle" />
        <ul className="mt-6 grid grid-cols-1 gap-3 md:mt-8 md:grid-cols-3 md:gap-4">
          {campaign.map((shot, i) => (
            <li
              key={shot.file}
              className={`relative aspect-[4/5] overflow-hidden bg-ink ${i === 0 ? "md:col-span-2 md:row-span-2 md:aspect-auto" : ""}`}
            >
              <Img
                src={resolveImage("campaign", shot.file)}
                alt={shot.alt}
                fill
                sizes={i === 0 ? "(min-width: 768px) 66vw, 100vw" : "(min-width: 768px) 33vw, 100vw"}
                className={`object-cover ${shot.color ? "" : "grayscale"}`}
              />
            </li>
          ))}
        </ul>
      </section>

      {/* PACKAGING */}
      <section aria-labelledby="packaging" className="border-y border-line">
        <div className="container-site grid gap-8 py-16 md:grid-cols-12 md:items-center md:py-24">
          <div className="studio relative aspect-[4/3] overflow-hidden md:col-span-7">
            <Img src={packaging} alt="Funda de tela negra con logo en recuadro blanco y tarjeta numerada" fill sizes="(min-width: 768px) 58vw, 100vw" className="object-cover" />
          </div>
          <div className="md:col-span-4 md:col-start-9">
            <p className="label mb-3">04 — Packaging</p>
            <h2 id="packaging" className="title text-2xl md:text-4xl">
              Cada par viene con funda y tarjeta numerada.
            </h2>
          </div>
        </div>
      </section>

      {/* LISTA DE ESPERA */}
      <section aria-labelledby="lista" id="drop-01" className="container-site py-20 md:py-32">
        <div className="mx-auto max-w-2xl">
          <p className="label mb-3">05 — {BRAND.currentDrop}</p>
          <h2 id="lista" className="title text-4xl md:text-7xl">
            Primero la lista
          </h2>
          <p className="mt-4 max-w-md text-base text-muted md:text-lg">La lista entra 24 horas antes que el resto. Un mail por drop.</p>
          <div className="mt-8">
            <WaitlistForm source="home" />
          </div>
        </div>
      </section>
    </>
  );
}
