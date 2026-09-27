/**
 * Motore di animazione — caricato in lazy da <Motion /> dopo il primo render.
 * Le sezioni restano server component: dichiarano le animazioni con attributi data-*.
 *
 *   [data-split]          titolo display: righe che salgono da una maschera
 *   [data-reveal]         blocco che entra dal basso (opacity + y)
 *   [data-stagger]        contenitore i cui figli entrano a cascata (card del menù)
 *   [data-scroll-speed]   parallax verticale legato allo scroll (numero, 1 = ~ -30% vh)
 *   [data-depth]          parallax al puntatore (solo mouse)
 *   [data-mask-reveal]    immagine che si apre con una maschera
 *   [data-marquee-track]  riga del marquee; data-direction = 1 | -1
 *
 * Regole: solo transform/opacity (e clip-path per la maschera); niente con prefers-reduced-motion;
 * gli elementi già visibili all'avvio non vengono nascosti (niente flash).
 */
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import Lenis from "lenis";

gsap.registerPlugin(ScrollTrigger, SplitText);

const MOTION_OK = "(prefers-reduced-motion: no-preference)";
const FINE_POINTER = "(prefers-reduced-motion: no-preference) and (hover: hover) and (pointer: fine)";

const $$ = <T extends Element = HTMLElement>(sel: string, root: ParentNode = document) =>
  Array.from(root.querySelectorAll<T>(sel));

/** true se l'elemento è già (anche in parte) a schermo: in quel caso non lo nascondiamo. */
const inView = (el: Element) => ScrollTrigger.isInViewport(el, 0.05);

export function initMotion(): () => void {
  const mm = gsap.matchMedia();

  mm.add(MOTION_OK, () => {
    document.documentElement.classList.add("motion-ready");

    // ── Smooth scroll ─────────────────────────────────────────────
    // Touch: scroll nativo (syncTouch off) → inerzia iOS intatta.
    const lenis = new Lenis({ autoRaf: false, anchors: { offset: 0 }, stopInertiaOnNavigate: true });
    lenis.on("scroll", ScrollTrigger.update);
    const raf = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    // ── Titoli: righe da maschera ─────────────────────────────────
    const revealed = new WeakSet<Element>();
    const splits = $$("[data-split]").map((el) =>
      SplitText.create(el, {
        type: "lines",
        mask: "lines",
        autoSplit: true, // ri-divide dopo il caricamento font e al resize
        onSplit(self) {
          if (revealed.has(el) || inView(el)) {
            revealed.add(el);
            return;
          }
          return gsap.from(self.lines, {
            yPercent: 110,
            duration: 1.1,
            ease: "expo.out",
            stagger: 0.08,
            scrollTrigger: { trigger: el, start: "top 88%", once: true, onEnter: () => revealed.add(el) },
          });
        },
      }),
    );

    // ── Blocchi ───────────────────────────────────────────────────
    for (const el of $$("[data-reveal]")) {
      if (inView(el)) continue;
      gsap.from(el, {
        y: 48,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: { trigger: el, start: "top 90%", once: true },
      });
    }

    for (const box of $$("[data-stagger]")) {
      const items = Array.from(box.children).filter((c) => !inView(c));
      gsap.set(items, { y: 40, opacity: 0 });
      ScrollTrigger.batch(items, {
        start: "top 92%",
        once: true,
        onEnter: (batch) =>
          gsap.to(batch, { y: 0, opacity: 1, duration: 0.8, ease: "power3.out", stagger: 0.06, clearProps: "transform,opacity" }),
      });
    }

    // ── Maschera foto ─────────────────────────────────────────────
    for (const el of $$("[data-mask-reveal]")) {
      if (inView(el)) continue;
      gsap.fromTo(
        el,
        { clipPath: "inset(100% 0% 0% 0% round 2.5rem)" },
        {
          clipPath: "inset(0% 0% 0% 0% round 2.5rem)",
          duration: 1.4,
          ease: "expo.inOut",
          clearProps: "clipPath",
          scrollTrigger: { trigger: el, start: "top 80%", once: true },
        },
      );
    }

    // ── Parallax di scroll ────────────────────────────────────────
    for (const el of $$("[data-scroll-speed]")) {
      const speed = Number(el.dataset.scrollSpeed) || 0;
      const trigger = el.closest("section") ?? el;
      gsap.fromTo(
        el,
        { y: () => speed * window.innerHeight * 0.15 },
        {
          y: () => -speed * window.innerHeight * 0.3,
          ease: "none",
          scrollTrigger: { trigger, start: "top bottom", end: "bottom top", scrub: true, invalidateOnRefresh: true },
        },
      );
    }

    // Hero: il titolo si allontana leggermente mentre si scende.
    const heroTitle = document.querySelector("[data-hero-title]");
    if (heroTitle) {
      gsap.to(heroTitle, {
        yPercent: 18,
        scale: 0.94,
        opacity: 0.2,
        ease: "none",
        scrollTrigger: { trigger: heroTitle.closest("section"), start: "top top", end: "bottom top", scrub: true },
      });
    }

    // ── Marquee con velocità legata allo scroll ───────────────────
    const tracks = $$("[data-marquee-track]").map((el) => ({
      el,
      dir: Number(el.dataset.direction) || 1,
      x: 0,
      half: el.scrollWidth / 2,
      setX: gsap.quickSetter(el, "x", "px") as (v: number) => void,
    }));
    const measure = () => tracks.forEach((t) => (t.half = t.el.scrollWidth / 2));
    ScrollTrigger.addEventListener("refresh", measure);

    let boost = 0; // extra velocità dallo scroll, decade nel tempo
    let scrollDir = 1; // scendendo le righe vanno avanti, salendo invertono
    let marqueeVisible = false;
    const marqueeSection = document.querySelector("[data-marquee]");
    const visibility = marqueeSection
      ? ScrollTrigger.create({
          trigger: marqueeSection,
          start: "top bottom",
          end: "bottom top",
          onToggle: (st) => (marqueeVisible = st.isActive),
        })
      : null;

    const onLenisScroll = (l: Lenis) => {
      boost = gsap.utils.clamp(-40, 40, l.velocity);
      if (l.direction) scrollDir = l.direction;
    };
    lenis.on("scroll", onLenisScroll);

    const BASE = 1.1; // px per frame a 60 fps
    const tick = (_t: number, deltaMs: number) => {
      boost *= 0.92;
      if (!marqueeVisible) return;
      const f = deltaMs / 16.67;
      const speed = (BASE + Math.abs(boost) * 0.5) * scrollDir * f;
      for (const t of tracks) {
        t.x = gsap.utils.wrap(-t.half, 0, t.x - speed * t.dir);
        t.setX(t.x);
      }
    };
    if (tracks.length) gsap.ticker.add(tick);

    // Font e immagini cambiano le altezze: ricalcola i trigger quando sono pronti.
    document.fonts?.ready.then(() => ScrollTrigger.refresh());

    return () => {
      gsap.ticker.remove(raf);
      gsap.ticker.remove(tick);
      ScrollTrigger.removeEventListener("refresh", measure);
      visibility?.kill();
      splits.forEach((s) => s.revert());
      lenis.destroy();
      document.documentElement.classList.remove("motion-ready");
    };
  });

  // ── Parallax al puntatore (solo mouse) ──────────────────────────
  mm.add(FINE_POINTER, () => {
    const layers = $$("[data-depth]").map((el) => {
      const d = Number(el.dataset.depth) || 0;
      return {
        d,
        x: gsap.quickTo(el, "x", { duration: 1.2, ease: "power3.out" }),
        y: gsap.quickTo(el, "y", { duration: 1.2, ease: "power3.out" }),
      };
    });
    const onMove = (e: PointerEvent) => {
      const nx = e.clientX / window.innerWidth - 0.5;
      const ny = e.clientY / window.innerHeight - 0.5;
      for (const l of layers) {
        l.x(nx * -70 * l.d);
        l.y(ny * -45 * l.d);
      }
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  });

  return () => mm.revert();
}
