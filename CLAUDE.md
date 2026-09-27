# Da Tina – Pizzeria Popolare · redesign single page

Ricostruzione di datina.it (Vigone, TO) come single page a scroll infinito, senza header/footer,
con pattern di interazione ispirati a redis.agency (solo pattern: mai asset, codice o testi).

## Stato
- **Fase 0 – Analisi**: IN CORSO. Bloccata: la network policy del container nega `datina.it` e `redis.agency`.
- Fase 1 – Concept & design system: da fare (richiede OK sull'analisi)
- Fase 2 – Sviluppo · Fase 3 – QA & deploy: da fare

## Stack (deciso dal brief, non ancora installato)
Next.js App Router + TypeScript (SSG) · Tailwind + CSS variables · GSAP + ScrollTrigger · Lenis (infinite) ·
matter.js lazy (solo se signature B) · Neon Postgres + Drizzle · Resend · Vercel.
Nessun servizio a pagamento: se serve un abbonamento, fermarsi e chiedere.

## Comandi
_Da definire in Fase 2 (dev, build, lint, typecheck, test Playwright)._

## Convenzioni
- Contenuti mai inventati: dato mancante → `[[DA_CONFERMARE: ...]]` + voce in `docs/todo-cliente.md`.
- Testo "Chi siamo" copiato integralmente dall'originale, non riscritto senza OK.
- Prezzi solo in `data/menu.ts`; il menù del sito (0926) vince sulle stories, previa conferma.
- Commit atomici, uno per step; prima di "fatto": build + lint + typecheck + screenshot.
- Ingredienti decorativi `aria-hidden`; animazioni solo transform/opacity; reduced-motion = scroll nativo.
- Budget: Lighthouse mobile ≥ 90 (Perf/A11y/SEO), LCP < 2,5 s, CLS < 0,1, JS iniziale < 150 KB gz.
- Terze parti (Meta Pixel, Google Maps) solo dopo consenso iubenda.

## Decisioni prese
_(nessuna ancora — aggiornare a ogni fase)_
