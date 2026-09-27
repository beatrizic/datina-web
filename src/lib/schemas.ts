import { z } from "zod";
import { site } from "@/data/site";

const consent = z.literal(true, { error: "Serve il consenso al trattamento dei dati" });
/** Honeypot: campo nascosto che un umano lascia vuoto. */
const honeypot = z.string().max(0).optional();

export const subscribeSchema = z.object({
  firstName: z.string().trim().min(1, "Inserisci il nome").max(80),
  lastName: z.string().trim().min(1, "Inserisci il cognome").max(80),
  email: z.email("Email non valida").max(160),
  privacy: consent,
  website: honeypot,
});
export type SubscribeInput = z.infer<typeof subscribeSchema>;

/** Slot ogni 30' dall'apertura all'ultimo orario prenotabile. */
export function bookingSlots(): string[] {
  const toMin = (t: string) => Number(t.slice(0, 2)) * 60 + Number(t.slice(3));
  const out: string[] = [];
  for (let m = toMin(site.opens); m <= toMin(site.lastBookingSlot); m += 30) {
    out.push(`${String(Math.floor(m / 60)).padStart(2, "0")}:${String(m % 60).padStart(2, "0")}`);
  }
  return out;
}

/** Data odierna a Roma in formato YYYY-MM-DD (indipendente dal fuso del server). */
export function todayInRome(now = new Date()): string {
  return new Intl.DateTimeFormat("en-CA", { timeZone: "Europe/Rome" }).format(now);
}

/** Giorno ISO (1 = lun … 7 = dom) di una data YYYY-MM-DD. */
export function isoWeekday(date: string): number {
  const d = new Date(`${date}T12:00:00Z`).getUTCDay();
  return d === 0 ? 7 : d;
}

export const reservationSchema = z
  .object({
    name: z.string().trim().min(1, "Inserisci il nome").max(120),
    people: z.coerce.number({ error: "Numero non valido" }).int().min(1, "Almeno 1 persona").max(30, "Per gruppi oltre 30 persone chiamaci"),
    date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Scegli il giorno"),
    time: z.string().refine((t) => bookingSlots().includes(t), "Scegli un orario tra quelli disponibili"),
    email: z.email("Email non valida").max(160),
    phone: z
      .string()
      .trim()
      .regex(/^\+?[0-9 ()./-]{6,20}$/, "Numero di telefono non valido"),
    notes: z.string().trim().max(500, "Massimo 500 caratteri").optional().default(""),
    privacy: consent,
    website: honeypot,
  })
  .superRefine((v, ctx) => {
    if (!/^\d{4}-\d{2}-\d{2}$/.test(v.date)) return;
    if (v.date < todayInRome()) ctx.addIssue({ code: "custom", path: ["date"], message: "La data è già passata" });
    else if (!(site.openDays as readonly number[]).includes(isoWeekday(v.date)))
      ctx.addIssue({ code: "custom", path: ["date"], message: "Siamo aperti da mercoledì a domenica" });
  });
export type ReservationInput = z.infer<typeof reservationSchema>;

export type FieldErrors = Partial<Record<string, string>>;

export function flattenErrors(err: z.ZodError): FieldErrors {
  const out: FieldErrors = {};
  for (const issue of err.issues) {
    const key = String(issue.path[0] ?? "form");
    out[key] ??= issue.message;
  }
  return out;
}
