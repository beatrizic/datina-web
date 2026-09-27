@AGENTS.md

# Da Tina – Pizzeria Popolare · redesign single page

Ricostruzione di datina.it (Vigone, TO) come single page a scroll infinito, senza header/footer,
con pattern di interazione ispirati a redis.agency (solo pattern: mai asset, codice o testi).

## Stato
- Fase 0 – Analisi: **sospesa** su richiesta di Beatrice. La network policy del container nega `datina.it`
  e `redis.agency`; dal sito attuale servono solo foto e loghi → da caricare a mano in `public/brand/`.
  Il sito attuale NON va toccato.
- Fase 2 – Sviluppo, step 1 (fondamenta) ✅: scaffold, token, cast SVG, tutte le sezioni statiche,
  menù interattivo, form con validazione zod (persistenza non ancora collegata → 503).
- Prossimi step: 2 animazioni GSAP/Lenis + marquee legato allo scroll · 3 form su Neon + Resend ·
  4 scroll infinito + dot di sezione + reduced-motion · 5 consenso iubenda/Pixel/Maps · 6 QA Playwright + Lighthouse.

## Deploy
Progetto Vercel `datina-web` collegato al repo GitHub: **ogni push = deploy automatico** (preview sul branch
di lavoro). Tutto `noindex` finché `ALLOW_INDEXING !== "true"` (anche la production su *.vercel.app). Il dominio datina.it NON va collegato senza OK.

## Stack (deciso dal brief, non ancora installato)
Next.js App Router + TypeScript (SSG) · Tailwind + CSS variables · GSAP + ScrollTrigger · Lenis (infinite) ·
matter.js lazy (solo se signature B) · Neon Postgres + Drizzle · Resend · Vercel.
Nessun servizio a pagamento: se serve un abbonamento, fermarsi e chiedere.

## Comandi
- `npm run dev` · `npm run build` · `npm run lint` · `npm run typecheck` (`next typegen && tsc`)
- `predev`/`prebuild` eseguono `scripts/scan-ingredients.mjs` → genera `src/data/ingredient-renders.ts`
- Next.js 16: API diverse dal passato, leggere `node_modules/next/dist/docs/` prima di usare API nuove.
- Playwright nel container: `chromium.launch({ executablePath: "/opt/pw-browsers/chromium-1194/chrome-linux/chrome" })`.

## Struttura
- `src/data/menu.ts` voci e prezzi (unica fonte) · `src/data/site.ts` dati locale (null = da confermare)
- `src/lib/ingredients.ts` cast, mappa ingrediente→illustrazione, filtri derivati (vegetariane/pesce/bianche)
- `src/lib/schemas.ts` schemi zod condivisi client/server · `src/lib/server/handle-form.ts` pipeline form
- `src/components/ingredients/` `<Ingredient name>`: WebP in `public/ingredients/<nome>.webp` se presente, altrimenti SVG
- `src/components/sections/` una sezione = un file, ordine in `src/app/page.tsx`
- `<Tbc>` = segnaposto visibile `[[DA_CONFERMARE: …]]`

## Convenzioni
- Contenuti mai inventati: dato mancante → `[[DA_CONFERMARE: ...]]` + voce in `docs/todo-cliente.md`.
- Testo "Chi siamo" copiato integralmente dall'originale, non riscritto senza OK.
- Prezzi solo in `data/menu.ts`; il menù del sito (0926) vince sulle stories, previa conferma.
- Commit atomici, uno per step; prima di "fatto": build + lint + typecheck + screenshot.
- Ingredienti decorativi `aria-hidden`; animazioni solo transform/opacity; reduced-motion = scroll nativo.
- Budget: Lighthouse mobile ≥ 90 (Perf/A11y/SEO), LCP < 2,5 s, CLS < 0,1, JS iniziale < 150 KB gz.
- Terze parti (Meta Pixel, Google Maps) solo dopo consenso iubenda.

## Decisioni prese
- Palette: verde #0E5A2B (da verificare campionando le stories), crema #F5ECD7, pomodoro #D63A22 (solo grafica/testo
  grande, 3.98:1), pomodoro profondo #B42A17 (testo e bottoni, 5.4:1), inchiostro #16140F, crosta #E3B774.
- Font (provvisori, Google via next/font = self-hosted): Londrina Solid (display lettering a mano) + Instrument Sans.
- CSS custom in `@layer components` così le utility Tailwind (es. `max-md:hidden`) vincono.
- Esplosione ingredienti nel menù: CSS puro (transform/opacity), hover desktop + tap mobile, `aria-hidden`.
- Rate limit in memoria (best effort su serverless). Honeypot `website`.
- Signature interaction (A/B/C) ancora da scegliere: l'hero attuale ha parallax al puntatore + galleggiamento CSS.
