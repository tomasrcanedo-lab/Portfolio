/**
 * Genera placeholders SVG para productos, campaña y packaging.
 * Correr: npm run placeholders
 *
 * Los SVG quedan en /public/products/<handle>/ y /public/campaign/.
 * Para usar fotos reales, agregar el .jpg con el mismo nombre en la misma carpeta:
 * el sitio usa el .jpg si existe y cae al .svg si no.
 */
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..", "public");

const C = {
  bg: "#F2F2F0",
  studio: "#E9E9E6",
  ink: "#0A0A0A",
  muted: "#6B6B6B",
  line: "#D6D6D2",
};

function write(rel, svg) {
  const file = join(root, rel);
  mkdirSync(dirname(file), { recursive: true });
  writeFileSync(file, svg.trim() + "\n");
}

/* ------------------------------------------------------------------ */
/* Definiciones comunes                                                */
/* ------------------------------------------------------------------ */

const defs = (id) => `
<defs>
  <radialGradient id="studio-${id}" cx="50%" cy="42%" r="75%">
    <stop offset="0" stop-color="#FFFFFF"/>
    <stop offset="1" stop-color="${C.studio}"/>
  </radialGradient>
  <linearGradient id="black-${id}" x1="0" y1="0" x2="0" y2="1">
    <stop offset="0" stop-color="#2a2a2a"/>
    <stop offset=".35" stop-color="#0A0A0A"/>
    <stop offset="1" stop-color="#000"/>
  </linearGradient>
  <linearGradient id="lens-${id}" x1="0" y1="0" x2=".3" y2="1">
    <stop offset="0" stop-color="#262626"/>
    <stop offset=".5" stop-color="#0d0d0d"/>
    <stop offset="1" stop-color="#030303"/>
  </linearGradient>
  <linearGradient id="smoke-${id}" x1="0" y1="0" x2="0" y2="1">
    <stop offset="0" stop-color="#4a4a48"/>
    <stop offset="1" stop-color="#1c1c1b"/>
  </linearGradient>
  <linearGradient id="mirror-${id}" x1="0" y1="0" x2=".2" y2="1">
    <stop offset="0" stop-color="#f7f7f5"/>
    <stop offset=".42" stop-color="#b9b9b6"/>
    <stop offset=".5" stop-color="#6d6d6a"/>
    <stop offset=".62" stop-color="#cfcfcb"/>
    <stop offset="1" stop-color="#8d8d89"/>
  </linearGradient>
  <linearGradient id="silver-${id}" x1="0" y1="0" x2="1" y2="1">
    <stop offset="0" stop-color="#f4f4f2"/>
    <stop offset=".45" stop-color="#9c9c98"/>
    <stop offset=".6" stop-color="#e2e2df"/>
    <stop offset="1" stop-color="#7d7d79"/>
  </linearGradient>
  <filter id="soft-${id}" x="-50%" y="-50%" width="200%" height="200%">
    <feGaussianBlur stdDeviation="28"/>
  </filter>
  <filter id="grain-${id}" x="0" y="0" width="100%" height="100%">
    <feTurbulence type="fractalNoise" baseFrequency=".85" numOctaves="2" stitchTiles="stitch"/>
    <feColorMatrix type="matrix" values="0 0 0 0 .5  0 0 0 0 .5  0 0 0 0 .5  0 0 0 .55 0"/>
  </filter>
</defs>`;

// Sin texto sobre las imágenes: el nombre del modelo ya figura en la card.
const label = () => "";

/* ------------------------------------------------------------------ */
/* Anteojos: siluetas de frente centradas en (0,0), ancho ~920          */
/* ------------------------------------------------------------------ */

const mirrorX = (inner) => `${inner}<g transform="scale(-1,1)">${inner}</g>`;

function glasses(model, id) {
  const shine = `stroke="#ffffff" stroke-opacity=".18" stroke-width="5" fill="none" stroke-linecap="round"`;
  switch (model) {
    case "ruta": {
      // Envolvente angosto: frente muy bajo, curva que envuelve.
      const lens = "M -440 -26 C -360 -52 -140 -52 -46 -36 C -34 4 -58 34 -120 38 C -250 44 -380 34 -430 12 Z";
      return `
        ${mirrorX(`
          <path d="M -446 -24 C -470 -18 -486 4 -492 30" stroke="#151515" stroke-width="20" fill="none" stroke-linecap="round"/>
          <path d="${lens}" fill="url(#lens-${id})" stroke="url(#black-${id})" stroke-width="24" stroke-linejoin="round"/>
          <path d="M -400 -30 C -320 -44 -170 -44 -80 -34" ${shine}/>
        `)}
        <path d="M -48 -34 Q 0 -44 48 -34" stroke="#0A0A0A" stroke-width="20" fill="none"/>`;
    }
    case "banda": {
      // Máscara: una sola banda con puente bajo.
      const band =
        "M -452 -62 Q 0 -92 452 -62 L 440 34 Q 310 74 92 62 Q 36 22 0 20 Q -36 22 -92 62 Q -310 74 -440 34 Z";
      return `
        <path d="M -452 -50 C -476 -40 -490 -14 -494 16" stroke="#151515" stroke-width="20" fill="none" stroke-linecap="round"/>
        <path d="M 452 -50 C 476 -40 490 -14 494 16" stroke="#151515" stroke-width="20" fill="none" stroke-linecap="round"/>
        <path d="${band}" fill="url(#smoke-${id})" stroke="url(#black-${id})" stroke-width="26" stroke-linejoin="round"/>
        <path d="M -452 -62 Q 0 -92 452 -62" stroke="#0A0A0A" stroke-width="34" fill="none"/>
        <path d="M -400 -58 Q 0 -84 400 -58" ${shine}/>
        <path d="M -380 10 Q -250 30 -120 24" stroke="#fff" stroke-opacity=".08" stroke-width="18" fill="none"/>`;
    }
    case "orilla": {
      // Espejo: envolvente con lente espejada.
      const lens = "M -444 -44 C -360 -74 -140 -74 -46 -54 C -30 6 -60 56 -130 62 C -260 70 -390 54 -434 18 Z";
      return `
        ${mirrorX(`
          <path d="M -450 -40 C -474 -32 -490 -6 -496 24" stroke="#151515" stroke-width="20" fill="none" stroke-linecap="round"/>
          <path d="${lens}" fill="url(#mirror-${id})" stroke="url(#black-${id})" stroke-width="24" stroke-linejoin="round"/>
        `)}
        <path d="M -48 -52 Q 0 -62 48 -52" stroke="#0A0A0A" stroke-width="20" fill="none"/>`;
    }
    case "plaza": {
      // Rectangular grueso con plaqueta de metal.
      return `
        ${mirrorX(`
          <rect x="-448" y="-62" width="22" height="30" fill="#151515"/>
          <rect x="-418" y="-78" width="352" height="156" rx="10" fill="url(#lens-${id})" stroke="url(#black-${id})" stroke-width="40"/>
          <rect x="-462" y="-58" width="34" height="14" fill="url(#silver-${id})"/>
          <path d="M -392 -70 L -100 -70" ${shine}/>
        `)}
        <path d="M -66 -46 Q 0 -60 66 -46" stroke="#0A0A0A" stroke-width="28" fill="none"/>`;
    }
    case "filo": {
      // Angular: puntas que suben hacia afuera.
      const lens = "M -452 -96 L -70 -52 C -52 0 -66 40 -110 52 L -330 58 C -400 52 -440 6 -452 -96 Z";
      return `
        ${mirrorX(`
          <path d="${lens}" fill="url(#lens-${id})" stroke="url(#black-${id})" stroke-width="26" stroke-linejoin="miter"/>
          <path d="M -452 -96 L -484 -118 L -436 -64 Z" fill="#0A0A0A"/>
          <path d="M -420 -84 L -100 -50" ${shine}/>
        `)}
        <path d="M -70 -50 Q 0 -62 70 -50" stroke="#0A0A0A" stroke-width="22" fill="none"/>`;
    }
    case "arco": {
      // Escudo: lente única envolvente, metal negro.
      const shield =
        "M -468 -48 Q 0 -86 468 -48 Q 462 40 402 72 Q 210 100 64 78 Q 24 34 0 34 Q -24 34 -64 78 Q -210 100 -402 72 Q -462 40 -468 -48 Z";
      return `
        <path d="M -466 -50 C -486 -42 -496 -20 -500 8" stroke="#1a1a1a" stroke-width="12" fill="none" stroke-linecap="round"/>
        <path d="M 466 -50 C 486 -42 496 -20 500 8" stroke="#1a1a1a" stroke-width="12" fill="none" stroke-linecap="round"/>
        <path d="${shield}" fill="url(#lens-${id})"/>
        <path d="M -470 -50 Q 0 -90 470 -50" stroke="#0A0A0A" stroke-width="14" fill="none" stroke-linecap="round"/>
        <path d="M -20 30 L -10 0 L 10 0 L 20 30" stroke="#2a2a2a" stroke-width="6" fill="none"/>
        <path d="M -420 -40 Q 0 -72 420 -40" ${shine}/>`;
    }
  }
}

/** Patilla vista en 3/4, con detalles por modelo. */
function temple(model, id) {
  const base = `<path d="M 0 0 L 360 18 Q 420 22 440 70" stroke="url(#black-${id})" stroke-width="${model === "arco" ? 16 : 26}" fill="none" stroke-linecap="round"/>`;
  if (model === "plaza") return base + `<rect x="30" y="-6" width="60" height="14" fill="url(#silver-${id})"/>`;
  if (model === "arco")
    return (
      base +
      `<g fill="${C.studio}"><rect x="80" y="0" width="34" height="5"/><rect x="130" y="2" width="34" height="5"/><rect x="180" y="5" width="34" height="5"/></g>`
    );
  return base;
}

function productSvg(model, view, title) {
  const W = 1200, H = 1500, id = `${model}-${view}`;
  let body = "";
  if (view === "front") {
    body = `
      <ellipse cx="600" cy="860" rx="420" ry="34" fill="#000" opacity=".16" filter="url(#soft-${id})"/>
      <g transform="translate(600 700) scale(1.02)">${glasses(model, id)}</g>`;
  } else if (view === "side") {
    body = `
      <ellipse cx="620" cy="880" rx="400" ry="30" fill="#000" opacity=".14" filter="url(#soft-${id})"/>
      <g transform="translate(470 700) scale(.86)">
        <g transform="translate(-300 -10) rotate(12)">${temple(model, id)}</g>
        <g transform="matrix(.72 -.08 0 1 0 0)">${glasses(model, id)}</g>
        <g transform="translate(320 -40) rotate(-4)">${temple(model, id)}</g>
      </g>`;
  } else if (view === "worn") {
    body = `
      <rect width="${W}" height="${H}" fill="#DCDCD8"/>
      <path d="M 220 1500 C 240 1230 420 1170 600 1170 C 780 1170 960 1230 980 1500 Z" fill="#c4c4c0"/>
      <rect x="520" y="980" width="160" height="220" fill="#cbcbc7"/>
      <ellipse cx="600" cy="700" rx="250" ry="330" fill="#d2d2ce"/>
      <path d="M 340 640 C 330 380 460 300 600 300 C 760 300 880 390 862 640 C 840 520 760 450 600 450 C 450 450 360 520 340 640 Z" fill="#9e9e9a"/>
      <g transform="translate(600 650) scale(.56)">${glasses(model, id)}</g>
      <path d="M 560 900 Q 600 916 640 900" stroke="#a9a9a5" stroke-width="6" fill="none" stroke-linecap="round"/>`;
  } else if (view === "packaging") {
    body = packagingBody(id);
  }
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}" role="img" aria-label="${title}">
${defs(id)}
<rect width="${W}" height="${H}" fill="url(#studio-${id})"/>
${body}
${label(W, H, title, "PLACEHOLDER")}
</svg>`;
}

function packagingBody(id) {
  return `
    <ellipse cx="600" cy="1110" rx="380" ry="40" fill="#000" opacity=".18" filter="url(#soft-${id})"/>
    <g transform="translate(600 760) rotate(-6)">
      <path d="M -260 -330 L 260 -330 Q 274 -330 274 -316 L 270 330 Q 270 346 254 346 L -254 346 Q -270 346 -270 330 L -274 -316 Q -274 -330 -260 -330 Z" fill="#111"/>
      <rect x="-274" y="-330" width="548" height="70" fill="#1b1b1b"/>
      <path d="M -60 -300 C -40 -380 40 -380 60 -300" stroke="#222" stroke-width="10" fill="none"/>
      <rect x="-274" y="-330" width="548" height="676" fill="#fff" opacity=".05" filter="url(#grain-${id})"/>
      <rect x="-110" y="-40" width="220" height="84" fill="#fff"/>
      <text x="0" y="14" text-anchor="middle" font-family="Helvetica, Arial, sans-serif" font-weight="600" font-size="34" letter-spacing="6" fill="#0A0A0A">LOGO</text>
    </g>
    <g transform="translate(860 1030) rotate(8)">
      <rect x="-120" y="-76" width="240" height="152" fill="#fff" stroke="${C.line}" stroke-width="2"/>
      <text x="-96" y="-30" font-family="ui-monospace, Menlo, monospace" font-size="20" letter-spacing="2" fill="${C.muted}">DROP 01</text>
      <text x="-96" y="40" font-family="ui-monospace, Menlo, monospace" font-size="40" letter-spacing="2" fill="#0A0A0A">Nº 01/50</text>
    </g>`;
}

/* ------------------------------------------------------------------ */
/* Accesorios                                                          */
/* ------------------------------------------------------------------ */

function chainLinks(id, d, count, size = 22) {
  // Eslabones a lo largo de una curva cuadrática definida por puntos.
  const [x0, y0, cx, cy, x1, y1] = d;
  let out = "";
  for (let i = 0; i <= count; i++) {
    const t = i / count;
    const x = (1 - t) ** 2 * x0 + 2 * (1 - t) * t * cx + t ** 2 * x1;
    const y = (1 - t) ** 2 * y0 + 2 * (1 - t) * t * cy + t ** 2 * y1;
    const dx = 2 * (1 - t) * (cx - x0) + 2 * t * (x1 - cx);
    const dy = 2 * (1 - t) * (cy - y0) + 2 * t * (y1 - cy);
    const a = (Math.atan2(dy, dx) * 180) / Math.PI + (i % 2 ? 90 : 0);
    out += `<ellipse cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" rx="${size * (i % 2 ? 0.45 : 0.8)}" ry="${size * 0.45}" transform="rotate(${a.toFixed(1)} ${x.toFixed(1)} ${y.toFixed(1)})" fill="none" stroke="url(#silver-${id})" stroke-width="5"/>`;
  }
  return out;
}

function accessorySvg(kind, title) {
  const W = 1200, H = 1500, id = kind;
  let body = "";
  if (kind === "cadena") {
    body = `
      <ellipse cx="600" cy="1080" rx="300" ry="26" fill="#000" opacity=".12" filter="url(#soft-${id})"/>
      ${chainLinks(id, [300, 380, 600, 1500, 900, 380], 70, 18)}`;
  } else if (kind === "dije-inicial") {
    const dots = [
      [560, 760], [585, 820], [610, 880], [640, 760], [615, 820], [590, 880], [575, 930], [625, 930], [600, 700],
    ]
      .map(([x, y]) => `<circle cx="${x}" cy="${y}" r="7" fill="#fff" stroke="#bdbdb9" stroke-width="2"/>`)
      .join("");
    body = `
      ${chainLinks(id, [360, 300, 600, 900, 840, 300], 44, 14)}
      <circle cx="600" cy="618" r="16" fill="none" stroke="url(#silver-${id})" stroke-width="6"/>
      <ellipse cx="600" cy="1080" rx="160" ry="22" fill="#000" opacity=".12" filter="url(#soft-${id})"/>
      <text x="600" y="960" text-anchor="middle" font-family="Helvetica, Arial, sans-serif" font-weight="700" font-size="380" fill="url(#silver-${id})" stroke="#8d8d89" stroke-width="3">A</text>
      ${dots}`;
  } else if (kind === "anillo-sello") {
    body = `
      <ellipse cx="600" cy="1000" rx="260" ry="30" fill="#000" opacity=".16" filter="url(#soft-${id})"/>
      <ellipse cx="600" cy="800" rx="200" ry="150" fill="none" stroke="url(#silver-${id})" stroke-width="54"/>
      <ellipse cx="600" cy="800" rx="200" ry="150" fill="none" stroke="#fff" stroke-opacity=".35" stroke-width="6"/>
      <rect x="470" y="560" width="260" height="170" rx="22" fill="url(#silver-${id})" stroke="#8d8d89" stroke-width="3"/>
      <rect x="494" y="582" width="212" height="126" rx="14" fill="none" stroke="#fff" stroke-opacity=".6" stroke-width="3"/>`;
  } else if (kind === "cinturon") {
    body = `
      <ellipse cx="600" cy="1010" rx="420" ry="30" fill="#000" opacity=".14" filter="url(#soft-${id})"/>
      <path d="M 120 760 C 300 700 520 900 760 780 L 1080 640" stroke="#111" stroke-width="86" fill="none"/>
      <path d="M 120 760 C 300 700 520 900 760 780 L 1080 640" stroke="#fff" stroke-opacity=".08" stroke-width="2" stroke-dasharray="12 10" fill="none" transform="translate(0 -30)"/>
      <path d="M 120 760 C 300 700 520 900 760 780 L 1080 640" stroke="#fff" stroke-opacity=".08" stroke-width="2" stroke-dasharray="12 10" fill="none" transform="translate(0 30)"/>
      <g transform="translate(700 800) rotate(-18)">
        <rect x="-90" y="-80" width="180" height="160" fill="none" stroke="url(#silver-${id})" stroke-width="22"/>
        <rect x="-8" y="-80" width="16" height="160" fill="url(#silver-${id})"/>
      </g>`;
  }
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}" role="img" aria-label="${title}">
${defs(id)}
<rect width="${W}" height="${H}" fill="url(#studio-${id})"/>
${body}
${label(W, H, title, "PLACEHOLDER")}
</svg>`;
}

/* ------------------------------------------------------------------ */
/* Campaña: blanco y negro con grano                                    */
/* ------------------------------------------------------------------ */

const profilePath =
  "M 620 0 C 420 0 300 120 290 300 C 286 360 262 400 232 450 C 216 476 226 490 252 496 L 266 500 C 256 530 262 546 276 556 C 266 576 272 596 292 602 C 302 652 322 692 382 702 C 422 708 452 724 462 784 L 472 1000 L 1000 1000 L 1000 0 Z";

function profileGlasses() {
  return `
    <path d="M 286 318 L 560 344" stroke="#050505" stroke-width="22" stroke-linecap="round"/>
    <path d="M 262 300 C 250 320 252 350 270 366 L 330 360 C 320 340 318 318 324 300 Z" fill="#050505"/>`;
}

function campaignSvg(name, W, H, title, scene) {
  const id = `c-${name}`;
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}" role="img" aria-label="${title}" preserveAspectRatio="xMidYMid slice">
${defs(id)}
<defs>
  <radialGradient id="vig-${id}" cx="50%" cy="50%" r="75%">
    <stop offset=".55" stop-color="#000" stop-opacity="0"/>
    <stop offset="1" stop-color="#000" stop-opacity=".45"/>
  </radialGradient>
</defs>
${scene(id, W, H)}
<rect width="${W}" height="${H}" fill="url(#vig-${id})"/>
<rect width="${W}" height="${H}" filter="url(#grain-${id})" opacity=".55" style="mix-blend-mode:overlay"/>
</svg>`;
}

const scenes = {
  hero: (id, W, H) => `
    <linearGradient id="sky-${id}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#cfcfcf"/><stop offset="1" stop-color="#f4f4f4"/></linearGradient>
    <rect width="${W}" height="${H}" fill="url(#sky-${id})"/>
    <circle cx="${W * 0.22}" cy="${H * 0.22}" r="${H * 0.07}" fill="#fff"/>
    <rect y="${H * 0.56}" width="${W}" height="${H * 0.14}" fill="#3a3a3a"/>
    <rect y="${H * 0.56}" width="${W}" height="4" fill="#fff" opacity=".6"/>
    <rect y="${H * 0.7}" width="${W}" height="${H * 0.3}" fill="#9a9a9a"/>
    <g transform="translate(${W * 0.5} ${H * -0.02}) scale(${(H * 1.05) / 1000})">
      <path d="${profilePath}" fill="#0b0b0b"/>${profileGlasses()}
    </g>`,
  "01-playa": (id, W, H) => `
    <linearGradient id="sky-${id}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#bdbdbd"/><stop offset="1" stop-color="#efefef"/></linearGradient>
    <rect width="${W}" height="${H}" fill="url(#sky-${id})"/>
    <rect y="${H * 0.5}" width="${W}" height="${H * 0.16}" fill="#2e2e2e"/>
    <rect y="${H * 0.66}" width="${W}" height="${H * 0.34}" fill="#a5a5a5"/>
    <g transform="translate(${W * 0.08} ${H * 0.16}) scale(${(W * 1.1) / 1000})">
      <path d="${profilePath}" fill="#0b0b0b"/>${profileGlasses()}
    </g>`,
  "02-aeropuerto": (id, W, H) => `
    <rect width="${W}" height="${H}" fill="#e9e9e9"/>
    <path d="M ${W * 0.2} ${H * 0.44} l ${W * 0.36} -${H * 0.03} l ${W * 0.08} -${H * 0.02} l -${W * 0.02} ${H * 0.04} z" fill="#7a7a7a"/>
    <rect y="${H * 0.52}" width="${W}" height="${H * 0.1}" fill="#8a8a8a"/>
    ${[0.18, 0.43, 0.68].map((x) => `<rect x="${W * x}" width="${W * 0.035}" height="${H}" fill="#111"/>`).join("")}
    <rect y="${H * 0.3}" width="${W}" height="${W * 0.03}" fill="#111"/>
    <rect y="${H * 0.62}" width="${W}" height="${H * 0.38}" fill="#1a1a1a"/>
    <path d="M ${W * 0.55} ${H} C ${W * 0.56} ${H * 0.78} ${W * 0.66} ${H * 0.72} ${W * 0.8} ${H * 0.72} C ${W * 0.94} ${H * 0.72} ${W} ${H * 0.8} ${W} ${H * 0.86} L ${W} ${H} Z" fill="#050505"/>`,
  "03-auto": (id, W, H) => `
    <rect width="${W}" height="${H}" fill="#f1f1f1"/>
    <path d="M 0 ${H * 0.18} L ${W} ${H * 0.08} L ${W} 0 L 0 0 Z" fill="#151515"/>
    <rect y="${H * 0.46}" width="${W}" height="${H * 0.08}" fill="#9c9c9c"/>
    <path d="M 0 ${H * 0.62} C ${W * 0.3} ${H * 0.54} ${W * 0.7} ${H * 0.54} ${W} ${H * 0.6} L ${W} ${H} L 0 ${H} Z" fill="#0d0d0d"/>
    <path d="M ${W * 0.58} ${H * 0.3} L ${W * 0.92} ${H * 0.28} L ${W * 0.9} ${H * 0.4} L ${W * 0.6} ${H * 0.42} Z" fill="#222"/>
    <path d="M ${W * 0.05} ${H} C ${W * 0.1} ${H * 0.8} ${W * 0.3} ${H * 0.66} ${W * 0.5} ${H * 0.62} L ${W * 0.56} ${H * 0.68} C ${W * 0.36} ${H * 0.74} ${W * 0.24} ${H * 0.86} ${W * 0.22} ${H} Z" fill="#6f6f6f"/>`,
  "04-color": (id, W, H) => `
    <rect width="${W}" height="${H}" fill="#1E3FB4"/>
    <path d="M ${W * 0.12} ${H} C ${W * 0.16} ${H * 0.66} ${W * 0.3} ${H * 0.56} ${W * 0.5} ${H * 0.56} C ${W * 0.7} ${H * 0.56} ${W * 0.84} ${H * 0.66} ${W * 0.88} ${H} Z" fill="#A3161F"/>
    <path d="M ${W * 0.42} ${H * 0.56} L ${W * 0.5} ${H * 0.72} L ${W * 0.58} ${H * 0.56} Z" fill="#E9E2D4"/>
    ${[0.76, 0.84, 0.92].map((y) => `<circle cx="${W * 0.5}" cy="${H * y}" r="${W * 0.018}" fill="#C9A24A"/>`).join("")}
    <path d="M ${W * 0.22} ${H * 0.64} L ${W * 0.34} ${H * 0.6} L ${W * 0.36} ${H * 0.62} L ${W * 0.24} ${H * 0.67} Z" fill="#C9A24A"/>
    <path d="M ${W * 0.78} ${H * 0.64} L ${W * 0.66} ${H * 0.6} L ${W * 0.64} ${H * 0.62} L ${W * 0.76} ${H * 0.67} Z" fill="#C9A24A"/>
    <rect x="${W * 0.44}" y="${H * 0.46}" width="${W * 0.12}" height="${H * 0.12}" fill="#d9b8a0"/>
    <ellipse cx="${W * 0.5}" cy="${H * 0.33}" rx="${W * 0.15}" ry="${H * 0.16}" fill="#e2c3aa"/>
    <path d="M ${W * 0.35} ${H * 0.31} C ${W * 0.35} ${H * 0.14} ${W * 0.65} ${H * 0.14} ${W * 0.65} ${H * 0.31} C ${W * 0.6} ${H * 0.22} ${W * 0.4} ${H * 0.22} ${W * 0.35} ${H * 0.31} Z" fill="#141414"/>
    <g transform="translate(${W * 0.5} ${H * 0.32}) scale(${W / 3100})">${glasses("banda", id)}</g>`,
  "05-calle": (id, W, H) => `
    <rect width="${W}" height="${H}" fill="#d8d8d8"/>
    ${[0, 1, 2, 3, 4].map((r) => [0, 1, 2].map((c) => `<rect x="${W * (0.08 + c * 0.3)}" y="${H * (0.06 + r * 0.17)}" width="${W * 0.16}" height="${H * 0.11}" fill="#262626"/>`).join("")).join("")}
    <path d="M 0 ${H * 0.35} L ${W} ${H * 0.75} L ${W} ${H} L 0 ${H} Z" fill="#000" opacity=".55"/>
    <rect y="${H * 0.88}" width="${W}" height="${H * 0.12}" fill="#6a6a6a"/>
    <path d="M ${W * 0.62} ${H} L ${W * 0.64} ${H * 0.6} C ${W * 0.64} ${H * 0.52} ${W * 0.78} ${H * 0.52} ${W * 0.78} ${H * 0.6} L ${W * 0.8} ${H} Z" fill="#0b0b0b"/>
    <circle cx="${W * 0.71}" cy="${H * 0.47}" r="${W * 0.06}" fill="#0b0b0b"/>`,
  "06-selfie": (id, W, H) => `
    <rect width="${W}" height="${H}" fill="#e6e6e6"/>
    <rect y="${H * 0.7}" width="${W}" height="${H * 0.3}" fill="#bdbdbd"/>
    <path d="M ${W * 0.02} ${H} C ${W * 0.1} ${H * 0.82} ${W * 0.3} ${H * 0.76} ${W * 0.5} ${H * 0.76} C ${W * 0.7} ${H * 0.76} ${W * 0.9} ${H * 0.82} ${W * 0.98} ${H} Z" fill="#111"/>
    <rect x="${W * 0.42}" y="${H * 0.6}" width="${W * 0.16}" height="${H * 0.2}" fill="#7a7a7a"/>
    <ellipse cx="${W * 0.5}" cy="${H * 0.42}" rx="${W * 0.26}" ry="${H * 0.25}" fill="#8f8f8f"/>
    <path d="M ${W * 0.24} ${H * 0.4} C ${W * 0.22} ${H * 0.08} ${W * 0.78} ${H * 0.08} ${W * 0.76} ${H * 0.4} C ${W * 0.7} ${H * 0.24} ${W * 0.3} ${H * 0.24} ${W * 0.24} ${H * 0.4} Z" fill="#0c0c0c"/>
    <g transform="translate(${W * 0.5} ${H * 0.4}) scale(${W / 1900})">${glasses("ruta", id)}</g>
    <path d="M ${W * 0.85} ${H} L ${W * 0.92} ${H * 0.55} L ${W} ${H * 0.5} L ${W} ${H} Z" fill="#5d5d5d"/>`,
};

/* ------------------------------------------------------------------ */
/* Salida                                                              */
/* ------------------------------------------------------------------ */

const eyewear = [
  ["ruta", "RUTA // NEGRO"],
  ["banda", "BANDA // NEGRO HUMO"],
  ["orilla", "ORILLA // NEGRO ESPEJO"],
  ["plaza", "PLAZA // NEGRO"],
  ["filo", "FILO // NEGRO"],
  ["arco", "ARCO // NEGRO MATE"],
];
const views = { front: "FRENTE", side: "3/4", worn: "PUESTO", packaging: "PACKAGING" };

for (const [handle, title] of eyewear) {
  for (const [view, viewLabel] of Object.entries(views)) {
    write(`products/${handle}/${view}.svg`, productSvg(handle, view, `${title} — ${viewLabel}`));
  }
}

for (const [kind, title] of [
  ["cadena", "CADENA // PLATA"],
  ["dije-inicial", "DIJE INICIAL // PLATA"],
  ["anillo-sello", "ANILLO SELLO // PLATA"],
  ["cinturon", "CINTURÓN // NEGRO"],
]) {
  write(`products/${kind}/front.svg`, accessorySvg(kind, title));
}

write("campaign/hero.svg", campaignSvg("hero", 2400, 1500, "DROP 01 — PLAYA", scenes.hero));
for (const [name, title] of [
  ["01-playa", "PLAYA"],
  ["02-aeropuerto", "AEROPUERTO"],
  ["03-auto", "AUTO"],
  ["04-color", "VESTUARIO"],
  ["05-calle", "CALLE"],
  ["06-selfie", "SELFIE"],
]) {
  write(`campaign/${name}.svg`, campaignSvg(name, 1600, 2000, title, scenes[name]));
}

// Estuche para la sección de packaging
write(
  "packaging/estuche.svg",
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1600 1200" width="1600" height="1200" role="img" aria-label="Funda de tela negra con logo">
${defs("pk")}
<rect width="1600" height="1200" fill="url(#studio-pk)"/>
<g transform="translate(200 -150)">${packagingBody("pk")}</g>
${label(1600, 1200, "FUNDA + TARJETA NUMERADA", "PLACEHOLDER")}
</svg>`
);

// Imagen OG por defecto
console.log("Placeholders generados en /public");
