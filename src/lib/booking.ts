import { site } from "@/data/site";

/** Utility date/orari senza dipendenze: usate sia dal form (bundle iniziale) sia dallo schema zod. */

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
