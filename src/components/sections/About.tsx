import { Tbc } from "@/components/ui/Tbc";
import { Ingredient } from "@/components/ingredients/Ingredient";
import { PhotoSwap } from "./PhotoSwap";

export function About() {
  return (
    <section
      id="chi-siamo"
      data-section="Chi siamo"
      aria-labelledby="chi-siamo-title"
      className="relative bg-crema px-4 py-24 md:py-36"
    >
      <div className="mx-auto grid max-w-6xl gap-14 md:grid-cols-[1.1fr_1fr] md:items-center">
        <div>
          <h2 id="chi-siamo-title" className="display text-[clamp(3.5rem,12vw,9rem)] text-verde">
            Chi siamo
          </h2>
          <div className="mt-8 space-y-5 text-lg leading-relaxed">
            <p>
              <Tbc>testo integrale &quot;Chi siamo&quot; (nonna Tina e Vigone) dal sito originale</Tbc>
            </p>
          </div>
          <a href="#prenota" className="btn btn-rosso mt-10">
            Prenota un tavolo <span aria-hidden>→</span>
          </a>
        </div>

        <PhotoSwap
          base={
            <div className="grid h-full w-full place-items-center bg-crema-scura p-6 text-center">
              <Tbc>foto del locale da datina.it → public/brand/</Tbc>
            </div>
          }
          reveal={
            <div className="relative h-full w-full bg-verde">
              {(["pomodoro", "burrata", "basilico", "crudo", "olive", "friarielli"] as const).map((n, i) => (
                <Ingredient
                  key={n}
                  name={n}
                  size={130}
                  className="absolute"
                  style={{
                    left: `${[8, 55, 30, 62, 12, 40][i]}%`,
                    top: `${[8, 12, 38, 58, 64, 78][i]}%`,
                    width: "32%",
                    height: "auto",
                    rotate: `${[-10, 12, -4, 8, -14, 6][i]}deg`,
                  }}
                />
              ))}
            </div>
          }
          label="Foto del locale Da Tina"
        />
      </div>
    </section>
  );
}
