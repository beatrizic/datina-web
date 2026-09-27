import { site } from "@/data/site";
import { Tbc } from "@/components/ui/Tbc";
import { Ingredient } from "@/components/ingredients/Ingredient";

/** Chiusura in-corpo: sostituisce il footer con la stessa estetica delle sezioni. */
export function Closing() {
  return (
    <section
      aria-label="Informazioni legali"
      data-section="Info"
      className="relative overflow-hidden bg-verde px-4 pt-24 pb-32 text-crema"
    >
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-8 text-center">
        <div className="flex gap-3" aria-hidden>
          {(["pomodoro", "fior-di-latte", "basilico"] as const).map((n) => (
            <Ingredient key={n} name={n} size={64} />
          ))}
        </div>
        <p className="display text-[clamp(2.8rem,8vw,6rem)]">{site.name}</p>
        <p className="text-lg">
          {site.address.street}, {site.address.postalCode} {site.address.city} ({site.address.province})
        </p>
        <p>P.IVA {site.vat ?? <Tbc>P.IVA</Tbc>}</p>
        <ul className="flex flex-wrap justify-center gap-3">
          <li>
            <a href={site.privacyUrl} target="_blank" rel="noopener" className="btn border-2 border-crema/60">
              Privacy Policy
            </a>
          </li>
          <li>
            <a href={site.cookieUrl} target="_blank" rel="noopener" className="btn border-2 border-crema/60">
              Cookie Policy
            </a>
          </li>
        </ul>
        <a href="#top" className="mt-6 text-sm font-bold tracking-widest uppercase underline underline-offset-4">
          Torna all&apos;inizio ↑
        </a>
      </div>
    </section>
  );
}
