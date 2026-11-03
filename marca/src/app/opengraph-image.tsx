import { ImageResponse } from "next/og";
import { BRAND } from "@/config/brand";

export const alt = `${BRAND.name} — ${BRAND.currentDrop}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Imagen OG por defecto. Reemplazable por /public/og.jpg + metadata.openGraph.images.
export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 64,
          background: "#F2F2F0",
          color: "#0A0A0A",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ fontSize: 28, letterSpacing: 8, fontWeight: 600 }}>{BRAND.name}</div>
        <div style={{ display: "flex", flexDirection: "column", fontSize: 96, fontWeight: 500, lineHeight: 1, textTransform: "uppercase" }}>
          <span>Drop 01.</span>
          <span>50 por modelo.</span>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 22, color: "#6B6B6B", letterSpacing: 3, borderTop: "1px solid #D6D6D2", paddingTop: 20 }}>
          <span>ANTEOJOS DE SOL · PLATA</span>
          <span>{BRAND.city.toUpperCase()}</span>
        </div>
      </div>
    ),
    size
  );
}
