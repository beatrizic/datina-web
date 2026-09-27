"use client";

import { useEffect, useRef, type ReactNode } from "react";

/**
 * Parallax al puntatore (solo dispositivi con hover fine e senza reduced-motion).
 * Solo transform, rAF unico, nessuna libreria: GSAP arriva con lo step animazioni.
 */
export function HeroParallax({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    const ok = window.matchMedia("(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)");
    if (!ok.matches) return;

    const items = [...root.querySelectorAll<HTMLElement>("[data-depth]")];
    let tx = 0,
      ty = 0,
      x = 0,
      y = 0,
      raf = 0;

    const onMove = (e: PointerEvent) => {
      tx = e.clientX / window.innerWidth - 0.5;
      ty = e.clientY / window.innerHeight - 0.5;
      if (!raf) raf = requestAnimationFrame(tick);
    };
    const tick = () => {
      x += (tx - x) * 0.08;
      y += (ty - y) * 0.08;
      for (const el of items) {
        const d = Number(el.dataset.depth);
        el.style.transform = `translate3d(${x * -60 * d}px, ${y * -40 * d}px, 0)`;
      }
      raf = Math.abs(tx - x) + Math.abs(ty - y) > 0.001 ? requestAnimationFrame(tick) : 0;
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div ref={ref} aria-hidden className="pointer-events-none absolute inset-0 -z-0">
      {children}
    </div>
  );
}
