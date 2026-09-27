"use client";

import { useEffect } from "react";

/**
 * Avvia le animazioni fuori dal percorso critico: il modulo (GSAP + ScrollTrigger + SplitText + Lenis)
 * è un chunk separato, scaricato quando il browser è inattivo dopo il primo render.
 */
export function Motion() {
  useEffect(() => {
    let cleanup: (() => void) | undefined;
    let cancelled = false;

    const start = () =>
      import("@/lib/motion/init").then(({ initMotion }) => {
        if (!cancelled) cleanup = initMotion();
      });

    const idle = window.requestIdleCallback
      ? window.requestIdleCallback(start, { timeout: 1500 })
      : window.setTimeout(start, 200);

    return () => {
      cancelled = true;
      if (window.cancelIdleCallback) window.cancelIdleCallback(idle);
      else window.clearTimeout(idle);
      cleanup?.();
    };
  }, []);

  return null;
}
