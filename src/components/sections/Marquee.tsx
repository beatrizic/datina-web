import { Ingredient } from "@/components/ingredients/Ingredient";
import { CAST, type CastName } from "@/lib/ingredients";
import { LABEL } from "@/components/ingredients/art";

const ROW_A: CastName[] = ["crudo", "burrata", "fior-di-latte", "friarielli", "olive", "pistacchio", "pomodoro"];
const ROW_B: CastName[] = CAST.filter((c) => !ROW_A.includes(c));

function Row({ items, reverse, tone }: { items: CastName[]; reverse?: boolean; tone: "verde" | "rosso" }) {
  // Contenuto duplicato: la traccia scorre del 50% e riparte senza salto.
  const loop = [...items, ...items];
  return (
    <div
      className={`overflow-hidden py-3 ${tone === "verde" ? "bg-verde text-crema" : "bg-pomodoro-profondo text-crema"}`}
    >
      <ul
        className="marquee-track items-center"
        style={
          {
            "--marquee-direction": reverse ? "reverse" : "normal",
            "--marquee-duration": "48s",
          } as React.CSSProperties
        }
      >
        {loop.map((name, i) => (
          <li key={`${name}-${i}`} className="flex shrink-0 items-center gap-5 px-5" aria-hidden={i >= items.length}>
            <Ingredient name={name} size={56} />
            <span className="display text-[clamp(2.2rem,6vw,4.5rem)] whitespace-nowrap">{LABEL[name]}</span>
            <span aria-hidden className="display text-[clamp(2.2rem,6vw,4.5rem)] text-crosta">
              ·
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function Marquee() {
  return (
    <section aria-label="I nostri ingredienti" className="relative -my-2 -rotate-2 scale-[1.04] select-none">
      <Row items={ROW_A} tone="rosso" />
      <Row items={ROW_B} reverse tone="verde" />
    </section>
  );
}
