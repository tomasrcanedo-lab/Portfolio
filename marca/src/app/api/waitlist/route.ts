import { createHash } from "node:crypto";
import { NextResponse } from "next/server";

/**
 * Lista de espera.
 * Proveedor según variables de entorno (ver .env.example):
 * - Klaviyo:   KLAVIYO_PRIVATE_API_KEY + KLAVIYO_LIST_ID
 * - Mailchimp: MAILCHIMP_API_KEY + MAILCHIMP_AUDIENCE_ID
 * Sin ninguno configurado responde OK y registra el mail en el log (modo desarrollo).
 */

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(req: Request) {
  let body: { email?: unknown; source?: unknown; company?: unknown };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "invalid_body" }, { status: 400 });
  }

  // Honeypot: si viene completo, es un bot. Respondemos OK sin guardar.
  if (body.company) return NextResponse.json({ ok: true });

  const email = typeof body.email === "string" ? body.email.trim().toLowerCase() : "";
  const source = typeof body.source === "string" ? body.source.slice(0, 64) : "home";
  if (!EMAIL_RE.test(email) || email.length > 254) {
    return NextResponse.json({ ok: false, error: "invalid_email" }, { status: 400 });
  }

  try {
    if (process.env.KLAVIYO_PRIVATE_API_KEY && process.env.KLAVIYO_LIST_ID) {
      await subscribeKlaviyo(email, source);
    } else if (process.env.MAILCHIMP_API_KEY && process.env.MAILCHIMP_AUDIENCE_ID) {
      await subscribeMailchimp(email, source);
    } else {
      console.info(`[waitlist] sin proveedor configurado. Alta: ${email} (${source})`);
    }
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[waitlist]", err);
    return NextResponse.json({ ok: false, error: "provider_error" }, { status: 502 });
  }
}

async function subscribeKlaviyo(email: string, source: string) {
  const res = await fetch("https://a.klaviyo.com/api/profile-subscription-bulk-create-jobs", {
    method: "POST",
    headers: {
      Authorization: `Klaviyo-API-Key ${process.env.KLAVIYO_PRIVATE_API_KEY}`,
      revision: "2024-10-15",
      "Content-Type": "application/vnd.api+json",
      Accept: "application/vnd.api+json",
    },
    body: JSON.stringify({
      data: {
        type: "profile-subscription-bulk-create-job",
        attributes: {
          custom_source: `web:${source}`,
          profiles: {
            data: [
              {
                type: "profile",
                attributes: { email, subscriptions: { email: { marketing: { consent: "SUBSCRIBED" } } } },
              },
            ],
          },
        },
        relationships: { list: { data: { type: "list", id: process.env.KLAVIYO_LIST_ID } } },
      },
    }),
  });
  if (!res.ok) throw new Error(`Klaviyo ${res.status}: ${await res.text()}`);
}

async function subscribeMailchimp(email: string, source: string) {
  const key = process.env.MAILCHIMP_API_KEY!;
  const dc = key.split("-")[1];
  if (!dc) throw new Error("MAILCHIMP_API_KEY sin datacenter (formato xxxx-us21)");
  const hash = createHash("md5").update(email).digest("hex");
  const doubleOptIn = process.env.MAILCHIMP_DOUBLE_OPT_IN === "true";
  const url = `https://${dc}.api.mailchimp.com/3.0/lists/${process.env.MAILCHIMP_AUDIENCE_ID}/members/${hash}`;
  const auth = `Basic ${Buffer.from(`anystring:${key}`).toString("base64")}`;

  const res = await fetch(url, {
    method: "PUT",
    headers: { Authorization: auth, "Content-Type": "application/json" },
    body: JSON.stringify({ email_address: email, status_if_new: doubleOptIn ? "pending" : "subscribed" }),
  });
  if (!res.ok) throw new Error(`Mailchimp ${res.status}: ${await res.text()}`);

  // Etiqueta con el origen (home, modelo:ruta, etc.). No bloquea el alta si falla.
  await fetch(`${url}/tags`, {
    method: "POST",
    headers: { Authorization: auth, "Content-Type": "application/json" },
    body: JSON.stringify({ tags: [{ name: source, status: "active" }] }),
  }).catch(() => undefined);
}
