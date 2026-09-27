"use client";

import { useState, type ReactNode } from "react";

/**
 * Reinterpretazione del "team hover swap": all'hover (desktop) o al tap (touch)
 * una maschera circolare rivela la versione "con ingredienti" dell'immagine.
 */
export function PhotoSwap({ base, reveal, label }: { base: ReactNode; reveal: ReactNode; label: string }) {
  const [on, setOn] = useState(false);
  return (
    <figure data-mask-reveal className="relative">
      <button
        type="button"
        aria-pressed={on}
        aria-label={`${label}: mostra la versione con gli ingredienti`}
        onPointerEnter={(e) => e.pointerType === "mouse" && setOn(true)}
        onPointerLeave={(e) => e.pointerType === "mouse" && setOn(false)}
        onClick={() => setOn((v) => !v)}
        className="group relative block aspect-[4/5] w-full overflow-hidden rounded-[2.5rem] border-4 border-inchiostro"
      >
        <div className="absolute inset-0">{base}</div>
        <div
          aria-hidden
          className="absolute inset-0 transition-[clip-path] duration-700 ease-[cubic-bezier(.7,0,.2,1)] motion-reduce:transition-none"
          style={{ clipPath: on ? "circle(150% at 50% 100%)" : "circle(0% at 50% 100%)" }}
        >
          {reveal}
        </div>
      </button>
      <figcaption className="mt-3 text-sm font-bold text-verde">
        {on ? "Tocca di nuovo per tornare alla foto" : "Passa sopra (o tocca) la foto"}
      </figcaption>
    </figure>
  );
}
