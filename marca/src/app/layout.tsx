import type { Metadata, Viewport } from "next";
import "@fontsource/archivo/400.css";
import "@fontsource/archivo/500.css";
import "@fontsource/archivo/600.css";
import "@fontsource/jetbrains-mono/400.css";
import "./globals.css";
import { BRAND, SITE_URL } from "@/config/brand";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: `${BRAND.name} — ${BRAND.currentDrop}`, template: `%s — ${BRAND.name}` },
  description: BRAND.description,
  openGraph: {
    type: "website",
    locale: "es_AR",
    siteName: BRAND.name,
    title: `${BRAND.name} — ${BRAND.currentDrop}. 50 por modelo.`,
    description: BRAND.description,
    url: "/",
  },
  twitter: { card: "summary_large_image" },
  alternates: { canonical: "/" },
};

export const viewport: Viewport = { themeColor: "#F2F2F0" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es-AR">
      <body>
        <a href="#contenido" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:bg-ink focus:px-4 focus:py-2 focus:text-bg">
          Ir al contenido
        </a>
        <Header />
        <main id="contenido">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
