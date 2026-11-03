"use client";

import { useId, useState } from "react";

type Status = "idle" | "loading" | "done" | "error";

/**
 * Formulario de lista de espera. Envía a /api/waitlist, que conecta con Klaviyo o Mailchimp.
 * `source` identifica desde dónde se anotó (home, modelo, etc.).
 */
export function WaitlistForm({ source = "home", autoFocus = false }: { source?: string; autoFocus?: boolean }) {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");
  const id = useId();

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const email = String(data.get("email") || "").trim();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setStatus("error");
      setError("Revisá el mail.");
      return;
    }
    setStatus("loading");
    setError("");
    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, source, company: data.get("company") }),
      });
      if (!res.ok) throw new Error();
      setStatus("done");
      form.reset();
    } catch {
      setStatus("error");
      setError("No se pudo anotar. Probá de nuevo en un rato.");
    }
  }

  if (status === "done") {
    return (
      <p role="status" className="border-t border-ink pt-4 text-base font-medium uppercase tracking-[0.04em]">
        Anotado. Te avisamos antes del drop.
      </p>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="w-full">
      <div className="flex flex-col gap-3 sm:flex-row sm:gap-0">
        <label htmlFor={`${id}-email`} className="sr-only">
          Mail
        </label>
        <input
          id={`${id}-email`}
          name="email"
          type="email"
          inputMode="email"
          autoComplete="email"
          required
          autoFocus={autoFocus}
          placeholder="tu@mail.com"
          aria-invalid={status === "error"}
          aria-describedby={`${id}-msg`}
          className="h-12 w-full min-w-0 flex-1 border border-ink bg-transparent px-4 text-sm placeholder:text-muted focus:outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent sm:border-r-0"
        />
        {/* Honeypot anti-spam */}
        <input type="text" name="company" tabIndex={-1} autoComplete="off" aria-hidden className="hidden" />
        <button type="submit" className="btn h-12" disabled={status === "loading"}>
          {status === "loading" ? "Enviando" : "Anotarme"}
        </button>
      </div>
      <p id={`${id}-msg`} role="alert" className="mt-2 min-h-5 font-mono text-[11px] uppercase tracking-label text-accent">
        {status === "error" ? error : ""}
      </p>
    </form>
  );
}
