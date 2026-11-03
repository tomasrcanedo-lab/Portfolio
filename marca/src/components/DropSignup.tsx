"use client";

import { useState } from "react";
import { WaitlistForm } from "./WaitlistForm";

export function DropSignup({ source }: { source: string }) {
  const [open, setOpen] = useState(false);
  if (!open) {
    return (
      <button type="button" className="btn w-full" onClick={() => setOpen(true)}>
        Anotarme para el drop
      </button>
    );
  }
  return (
    <div>
      <p className="label mb-3">La lista entra 24 horas antes. Un mail por drop.</p>
      <WaitlistForm source={source} autoFocus />
    </div>
  );
}
