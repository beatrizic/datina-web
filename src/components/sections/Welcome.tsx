"use client";

import { site } from "@/data/site";
import { Field, Honeypot, PrivacyCheck } from "@/components/ui/Field";
import { useFormSubmit } from "@/components/ui/useFormSubmit";
import { Tbc } from "@/components/ui/Tbc";
import { Ingredient } from "@/components/ingredients/Ingredient";

export function Welcome() {
  const { errors, status, onSubmit, prefetch } = useFormSubmit("/api/subscribe", "subscribe");

  return (
    <section
      id="regalo"
      data-section="Regalo"
      aria-labelledby="regalo-title"
      className="relative overflow-hidden bg-pomodoro-profondo px-4 py-24 text-crema md:py-32"
    >
      <div data-scroll-speed="1.2" className="absolute -top-6 right-[6%]">
        <Ingredient name="pistacchio" size={160} className="rotate-12 max-md:h-auto max-md:w-24" />
      </div>
      <div data-scroll-speed="0.6" className="absolute bottom-10 left-[4%]">
        <Ingredient name="noce" size={120} className="-rotate-12 max-md:h-auto max-md:w-20" />
      </div>
      <div className="relative mx-auto grid max-w-6xl gap-12 md:grid-cols-2 md:items-center">
        <div>
          <h2 id="regalo-title" data-split className="display text-[clamp(3.5rem,11vw,8rem)]">
            Un regalo di benvenuto
          </h2>
          <p className="mt-6 max-w-md text-lg">
            <Tbc>testo del regalo di benvenuto dal sito originale</Tbc>
          </p>
        </div>

        {status.kind === "ok" ? (
          <p role="status" className="display rounded-[var(--radius)] bg-crema p-8 text-4xl text-pomodoro-profondo">
            Grazie! Controlla la tua email.
          </p>
        ) : (
          <form noValidate onSubmit={onSubmit} onFocus={prefetch} data-reveal className="relative grid min-w-0 gap-5">
            <div className="grid gap-5 sm:grid-cols-2">
              <Field name="firstName" label="Nome" required autoComplete="given-name" error={errors.firstName} />
              <Field name="lastName" label="Cognome" required autoComplete="family-name" error={errors.lastName} />
            </div>
            <Field name="email" label="Email" type="email" required autoComplete="email" error={errors.email} />
            <PrivacyCheck error={errors.privacy} privacyUrl={site.privacyUrl} />
            <Honeypot />
            <button type="submit" className="btn btn-crema justify-self-start" disabled={status.kind === "sending"}>
              {status.kind === "sending" ? "Invio…" : "Voglio il regalo"}
            </button>
            <p aria-live="polite" className="field-error min-h-5">
              {status.kind === "error" ? status.message : ""}
            </p>
          </form>
        )}
      </div>
    </section>
  );
}
