import type { Metadata } from "next";
import { BRAND } from "@/config/brand";

export const metadata: Metadata = {
  title: "Envíos, cambios y contacto",
  alternates: { canonical: "/info" },
};

// Textos provisorios. Ajustar cuando estén definidas las condiciones de venta.
const SECTIONS = [
  {
    id: "envios",
    title: "Envíos",
    body: ["Envíos a todo el país. En CABA y GBA, también retiro a coordinar.", "Los plazos y costos se publican con la apertura del Drop 01."],
  },
  {
    id: "cambios",
    title: "Cambios",
    body: ["Tenés 30 días para cambiar el producto sin uso, con funda y tarjeta numerada.", "Como cada modelo es de 50 unidades, el cambio queda sujeto a stock."],
  },
  {
    id: "contacto",
    title: "Contacto",
    body: [`Mail: ${BRAND.email}`, "Instagram: mensaje directo."],
  },
];

export default function InfoPage() {
  return (
    <div className="container-site py-12 md:py-20">
      <h1 className="title text-4xl md:text-6xl">Info</h1>
      <div className="mt-10 divide-y divide-line border-y border-line">
        {SECTIONS.map((s) => (
          <section key={s.id} id={s.id} aria-labelledby={`${s.id}-t`} className="grid gap-4 py-8 md:grid-cols-12">
            <h2 id={`${s.id}-t`} className="title text-xl md:col-span-4">
              {s.title}
            </h2>
            <div className="space-y-2 text-base md:col-span-6">
              {s.body.map((line) => (
                <p key={line}>{line}</p>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
