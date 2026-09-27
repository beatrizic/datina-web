"use client";

import { site } from "@/data/site";
import { bookingSlots, reservationSchema, todayInRome } from "@/lib/schemas";
import { Field, Honeypot, PrivacyCheck } from "@/components/ui/Field";
import { useFormSubmit } from "@/components/ui/useFormSubmit";
import { Tbc } from "@/components/ui/Tbc";
import { Ingredient } from "@/components/ingredients/Ingredient";

export function Booking() {
  const { errors, status, onSubmit } = useFormSubmit("/api/reservations", reservationSchema);

  return (
    <section
      id="prenota"
      data-section="Prenota"
      aria-labelledby="prenota-title"
      className="relative overflow-hidden bg-crema px-4 py-24 md:py-36"
    >
      <Ingredient name="friarielli" size={180} className="absolute top-10 -right-8 rotate-12 max-md:hidden" />
      <div className="relative mx-auto max-w-5xl">
        <h2 id="prenota-title" className="display text-[clamp(3.5rem,12vw,9rem)] text-pomodoro-profondo">
          Prenota il tuo tavolo
        </h2>
        <p className="mt-4 max-w-xl text-lg">
          Siamo aperti da mercoledì a domenica. Ti confermiamo la prenotazione il prima possibile.
        </p>

        {status.kind === "ok" ? (
          <p role="status" className="display mt-10 rounded-[var(--radius)] bg-verde p-8 text-4xl text-crema">
            Richiesta inviata! Ti scriviamo per confermare.
          </p>
        ) : (
          <form noValidate onSubmit={onSubmit} className="relative mt-10 grid gap-5 md:grid-cols-2">
            <Field name="name" label="Nome" required autoComplete="name" error={errors.name} />
            <Field
              name="people"
              label="N° persone"
              type="number"
              inputMode="numeric"
              min={1}
              max={30}
              required
              error={errors.people}
            />
            <Field name="date" label="Giorno" type="date"
              required
              // `min` impostato al focus: la pagina è statica e la data di build invecchierebbe.
              onFocus={(e) => (e.currentTarget.min = todayInRome())} error={errors.date} />
            <Field name="time" label="Ora" required error={errors.time}>
              <select
                id="f-time"
                name="time"
                required
                defaultValue=""
                aria-invalid={errors.time ? true : undefined}
                aria-describedby={errors.time ? "f-time-err" : undefined}
              >
                <option value="" disabled>
                  Scegli un orario
                </option>
                {bookingSlots().map((s) => (
                  <option key={s}>{s}</option>
                ))}
              </select>
            </Field>
            <Field name="email" label="Email" type="email" required autoComplete="email" error={errors.email} />
            <Field name="phone" label="Telefono" type="tel" required autoComplete="tel" error={errors.phone} />
            <div className="field md:col-span-2">
              <label htmlFor="f-notes">Note</label>
              <textarea id="f-notes" name="notes" maxLength={500} placeholder="Allergie, seggiolone, occasioni speciali…" />
            </div>
            <div className="md:col-span-2">
              <PrivacyCheck error={errors.privacy} privacyUrl={site.privacyUrl} />
            </div>
            <Honeypot />
            <div className="flex flex-wrap items-center gap-4 md:col-span-2">
              <button type="submit" className="btn btn-rosso text-lg" disabled={status.kind === "sending"}>
                {status.kind === "sending" ? "Invio…" : "Invia richiesta"}
              </button>
              <p aria-live="polite" className="field-error text-pomodoro-profondo">
                {status.kind === "error" ? status.message : ""}
              </p>
            </div>
          </form>
        )}

        <div className="mt-12 flex flex-wrap items-center gap-3 border-t-2 border-inchiostro/15 pt-8">
          <span className="font-bold">Preferisci parlarci?</span>
          {site.phone ? (
            <a className="btn border-2 border-inchiostro" href={`tel:${site.phone.replace(/\s/g, "")}`}>
              Chiama
            </a>
          ) : (
            <Tbc>telefono</Tbc>
          )}
          {site.whatsapp ? (
            <a className="btn border-2 border-inchiostro" href={`https://wa.me/${site.whatsapp.replace(/\D/g, "")}`}>
              WhatsApp
            </a>
          ) : (
            <Tbc>WhatsApp</Tbc>
          )}
        </div>
      </div>
    </section>
  );
}
