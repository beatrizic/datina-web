"use client";

import { useState } from "react";
import type { FieldErrors, SchemaName } from "@/lib/schemas";

type Status = { kind: "idle" | "sending" | "ok" } | { kind: "error"; message: string };

/** zod resta fuori dal bundle iniziale: si scarica al primo focus nel form (o al submit). */
const loadSchemas = () => import("@/lib/schemas");

/** Validazione client con lo stesso schema zod del server, poi POST JSON. */
export function useFormSubmit(endpoint: string, schemaName: SchemaName) {
  const [errors, setErrors] = useState<FieldErrors>({});
  const [status, setStatus] = useState<Status>({ kind: "idle" });

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    const data: Record<string, unknown> = Object.fromEntries(fd.entries());
    for (const el of form.querySelectorAll<HTMLInputElement>("input[type=checkbox]")) data[el.name] = el.checked;

    const { schemas, flattenErrors } = await loadSchemas();
    const parsed = schemas[schemaName].safeParse(data);
    if (!parsed.success) {
      const errs = flattenErrors(parsed.error);
      setErrors(errs);
      setStatus({ kind: "idle" });
      form.querySelector<HTMLElement>(`[name="${Object.keys(errs)[0]}"]`)?.focus();
      return;
    }

    setErrors({});
    setStatus({ kind: "sending" });
    try {
      const r = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = (await r.json()) as { ok: boolean; message?: string; errors?: FieldErrors };
      if (json.ok) {
        setStatus({ kind: "ok" });
        form.reset();
      } else {
        setErrors(json.errors ?? {});
        setStatus({ kind: "error", message: json.message ?? "Invio non riuscito." });
      }
    } catch {
      setStatus({ kind: "error", message: "Connessione assente. Riprova tra poco." });
    }
  }

  /** Da collegare a onFocus del form: precarica zod mentre l'utente compila. */
  const prefetch = () => void loadSchemas();

  return { errors, status, onSubmit, prefetch };
}
