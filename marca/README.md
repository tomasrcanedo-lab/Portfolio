# Sitio concepto — anteojos y plata

Next.js 15 (App Router) + Tailwind. Sin carrito ni pagos: preparado para sumar Shopify o Tiendanube.

## Correr

```bash
npm install
npm run dev        # http://localhost:3000
npm run build && npm start
```

## Dónde se cambia cada cosa

| Qué | Dónde |
| --- | --- |
| Nombre de marca (`BRAND_NAME`), mail, Instagram, ciudad | `src/config/brand.ts` |
| Productos, accesorios, campaña | `src/data/catalog.ts` |
| Colores y tipografías | `tailwind.config.ts` |
| Textos de Envíos / Cambios / Contacto | `src/app/info/page.tsx` |
| Lista de espera (Klaviyo / Mailchimp) | `.env.local` (ver `.env.example`), lógica en `src/app/api/waitlist/route.ts` |

## Fotos

Cada carpeta tiene placeholders `.svg`. Para usar fotos reales, agregar el archivo con el mismo nombre en `.jpg` (o `.webp` / `.png`). Si existe, el sitio lo usa; si no, cae al placeholder. Las imágenes se resuelven al compilar: después de sumar fotos, volver a hacer build/deploy.

```
public/products/<handle>/front.jpg      frente, fondo de estudio
public/products/<handle>/side.jpg       3/4
public/products/<handle>/worn.jpg       puesto (aparece en el hover de la card)
public/products/<handle>/packaging.jpg  funda + tarjeta
public/campaign/hero.jpg                hero (horizontal, mín. 2400 px de ancho)
public/campaign/01-playa.jpg … 06-selfie.jpg   (4:5; 01 es la grande, 04 es la de color)
public/packaging/estuche.jpg            sección packaging (4:3)
```

Handles: `ruta`, `banda`, `orilla`, `plaza`, `filo`, `arco`, `cadena`, `dije-inicial`, `anillo-sello`, `cinturon`.
Las fotos de campaña se muestran en blanco y negro por CSS (`grayscale`), salvo la marcada `color: true`.
Regenerar placeholders: `npm run placeholders`.

## Lista de espera

`POST /api/waitlist` con `{ email, source }`. `source` registra desde dónde se anotó (`home`, `modelo:ruta`, etc.).
- Klaviyo: `KLAVIYO_PRIVATE_API_KEY` + `KLAVIYO_LIST_ID`. Suscribe con consentimiento de marketing.
- Mailchimp: `MAILCHIMP_API_KEY` + `MAILCHIMP_AUDIENCE_ID`. Agrega tag con el `source`.
- Sin variables: responde OK y deja el mail en el log del servidor (solo para desarrollo).

## Sumar la tienda

- `handle` de cada producto = handle en Shopify/Tiendanube. `externalId` queda listo para el ID de la tienda.
- `price: null` muestra "Próximamente". Con número, se muestra en ARS.
- `stock` alimenta el contador de la card (`vendidos/50`) y "Quedan X de 50" en la ficha. Con tienda, reemplazar por el inventario real.
- El ícono de bolsa del header (`src/components/Header.tsx`) es el punto de entrada para el carrito.

## Deploy

Pensado para Vercel. Si el repo tiene más proyectos, configurar *Root Directory* = `marca`. Setear `NEXT_PUBLIC_SITE_URL` para SEO, sitemap y Open Graph.

## Video del hero

Subir `public/campaign/hero.mp4` (y opcional `hero.webm`). El hero lo reproduce en loop, sin sonido, en blanco y negro, y usa `hero.jpg` como imagen mientras carga.
Recomendado: 8 a 15 segundos, 1920 px de ancho, menos de 6 MB, sin audio. Con "reducir movimiento" activado en el dispositivo, se muestra la imagen fija.
