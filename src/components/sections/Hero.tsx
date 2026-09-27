import { site } from "@/data/site";
import { Ingredient } from "@/components/ingredients/Ingredient";
import type { CastName } from "@/lib/ingredients";

/** Posizioni in % della hero; depth guida il parallax (0 = fermo, 1 = massimo). */
const FLOATERS: { name: CastName; x: number; y: number; size: number; depth: number; rot: number }[] = [
  { name: "pomodoro", x: 8, y: 14, size: 150, depth: 0.9, rot: -8 },
  { name: "basilico", x: 78, y: 8, size: 120, depth: 0.6, rot: 10 },
  { name: "burrata", x: 84, y: 58, size: 170, depth: 1, rot: 6 },
  { name: "olive", x: 4, y: 64, size: 110, depth: 0.5, rot: -12 },
  { name: "salamino", x: 60, y: 76, size: 110, depth: 0.7, rot: 14 },
  { name: "crudo", x: 26, y: 80, size: 140, depth: 0.8, rot: -6 },
  { name: "funghi", x: 46, y: 4, size: 90, depth: 0.4, rot: 8 },
];

export function Hero() {
  return (
    <section
      id="top"
      data-section="Benvenuti"
      className="relative isolate flex min-h-[100svh] flex-col items-center justify-center overflow-hidden bg-verde px-4 py-24 text-crema"
    >
      {/* Tre livelli, ognuno con il suo transform: scroll (esterno) → puntatore → galleggiamento */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        {FLOATERS.map((f, i) => (
          <div
            key={f.name}
            data-scroll-speed={f.depth * 1.6}
            className="absolute"
            style={{ left: `${f.x}%`, top: `${f.y}%`, width: "clamp(64px, 11vw, 180px)" }}
          >
            <div data-depth={f.depth}>
            <div
              className="float"
              style={
                {
                  "--float-delay": `${-i * 0.9}s`,
                  "--float-duration": `${5 + (i % 3)}s`,
                  "--float-rot": `${f.rot}deg`,
                } as React.CSSProperties
              }
            >
              <Ingredient name={f.name} size={f.size} className="h-auto w-full" />
            </div>
            </div>
          </div>
        ))}
      </div>

      <div data-hero-title className="relative z-10 flex max-w-5xl flex-col items-center text-center">
        <p className="mb-4 rounded-full border-2 border-crema/60 px-4 py-1 text-sm font-bold tracking-widest uppercase">
          Pizzeria popolare · Vigone (TO)
        </p>
        <h1 className="display text-[clamp(5.5rem,26vw,22rem)]">
          <span className="sr-only">{site.name} a Vigone</span>
          <span aria-hidden>Da Tina</span>
        </h1>
        <p className="display mt-4 max-w-3xl text-[clamp(1.8rem,5vw,3.6rem)] text-crosta">{site.claim}</p>
        <p className="mt-5 max-w-xl text-lg text-crema/90 md:text-xl">{site.subtitle}</p>
        <a href="#prenota" className="btn btn-crema mt-9 text-lg">
          Prenota un tavolo <span aria-hidden>→</span>
        </a>
      </div>
    </section>
  );
}
