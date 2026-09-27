"use client";

import { useId, useMemo, useState } from "react";
import { categories, formatPrice, listSections, menuNotes, pizze, type MenuCategoryId, type Pizza } from "@/data/menu";
import { castFor, matchesFilter, PIZZA_FILTERS, type PizzaFilter } from "@/lib/ingredients";
import { Ingredient } from "@/components/ingredients/Ingredient";

export function Menu() {
  const [tab, setTab] = useState<MenuCategoryId>("pizze");
  const [filter, setFilter] = useState<PizzaFilter | null>(null);
  const baseId = useId();

  const visiblePizze = useMemo(() => (filter ? pizze.filter((p) => matchesFilter(p, filter)) : pizze), [filter]);

  function onTabKey(e: React.KeyboardEvent, i: number) {
    const dir = e.key === "ArrowRight" ? 1 : e.key === "ArrowLeft" ? -1 : 0;
    if (!dir) return;
    e.preventDefault();
    const next = categories[(i + dir + categories.length) % categories.length];
    setTab(next.id);
    document.getElementById(`${baseId}-tab-${next.id}`)?.focus();
  }

  return (
    <section
      id="menu"
      data-section="Menù"
      aria-labelledby="menu-title"
      className="relative bg-verde px-4 py-24 text-crema md:py-36"
    >
      <div className="mx-auto max-w-7xl">
        <h2 id="menu-title" data-split className="display text-[clamp(4rem,16vw,13rem)]">
          Il menù
        </h2>

        <div role="tablist" aria-label="Categorie del menù" className="mt-10 flex gap-2 overflow-x-auto pb-2">
          {categories.map((c, i) => (
            <button
              key={c.id}
              id={`${baseId}-tab-${c.id}`}
              role="tab"
              type="button"
              aria-selected={tab === c.id}
              aria-controls={`${baseId}-panel`}
              tabIndex={tab === c.id ? 0 : -1}
              onClick={() => setTab(c.id)}
              onKeyDown={(e) => onTabKey(e, i)}
              className={`btn shrink-0 border-2 border-crema ${tab === c.id ? "bg-crema text-verde" : "text-crema hover:bg-verde-scuro"}`}
            >
              {c.label}
            </button>
          ))}
        </div>

        <div id={`${baseId}-panel`} role="tabpanel" aria-labelledby={`${baseId}-tab-${tab}`} className="mt-10">
          {tab === "pizze" ? (
            <>
              <fieldset className="flex flex-wrap items-center gap-2">
                <legend className="mb-3 text-sm font-bold tracking-widest uppercase">Filtra</legend>
                {PIZZA_FILTERS.map((f) => (
                  <button
                    key={f.id}
                    type="button"
                    aria-pressed={filter === f.id}
                    onClick={() => setFilter((cur) => (cur === f.id ? null : f.id))}
                    className={`min-h-11 rounded-full border-2 px-4 text-sm font-bold ${
                      filter === f.id ? "border-crosta bg-crosta text-inchiostro" : "border-crema/50 hover:border-crema"
                    }`}
                  >
                    {f.label}
                  </button>
                ))}
                <span aria-live="polite" className="ml-2 text-sm text-crema/80">
                  {visiblePizze.length} pizze
                </span>
              </fieldset>
              <ul data-stagger className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {visiblePizze.map((p) => (
                  <PizzaCard key={p.name} pizza={p} />
                ))}
              </ul>
            </>
          ) : (
            <div className="grid gap-12 md:grid-cols-2">
              {listSections[tab].map((s, i) => (
                <div key={s.title ?? i}>
                  {s.title && <h3 className="display mb-4 text-4xl text-crosta">{s.title}</h3>}
                  <ul className="divide-y divide-crema/25 border-y border-crema/25">
                    {s.items.map((it) => (
                      <li key={it.name} className="flex items-baseline justify-between gap-6 py-3 text-lg">
                        <span>
                          <span aria-hidden className="mr-3 text-crosta">
                            —
                          </span>
                          {it.name}
                          {it.frozen && <span title="Potrebbe essere surgelato">*</span>}
                        </span>
                        <span className="shrink-0 font-bold tabular-nums">{formatPrice(it.price)}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          )}
        </div>

        <ul className="mt-14 grid gap-2 border-t-2 border-crema/40 pt-6 text-base md:grid-cols-2">
          <li>{menuNotes.aggiunte}.</li>
          <li>{menuNotes.surgelati}.</li>
          <li>{menuNotes.allergie}.</li>
          <li>Coperto {formatPrice(menuNotes.coperto)}.</li>
        </ul>

        <a href="#prenota" className="btn btn-crema mt-12 text-lg">
          Prenota un tavolo <span aria-hidden>→</span>
        </a>
      </div>
    </section>
  );
}

function PizzaCard({ pizza }: { pizza: Pizza }) {
  const [open, setOpen] = useState(false);
  const cast = castFor(pizza.ingredients);
  return (
    <li
      data-open={open || undefined}
      onClick={() => setOpen((v) => !v)}
      className="group relative isolate rounded-[var(--radius)] bg-crema p-6 text-inchiostro transition-transform duration-300 hover:z-10 hover:-rotate-1 data-[open]:z-10 motion-reduce:transition-none"
    >
      {/* Esplosione ingredienti: decorativa, solo transform/opacity */}
      <div aria-hidden className="pointer-events-none absolute inset-0 z-20">
        {cast.map((name, i) => {
          // Ventaglio sopra la card: da -70° a +70° rispetto alla verticale.
          const angle = (cast.length === 1 ? 0 : -70 + (140 / (cast.length - 1)) * i) * (Math.PI / 180);
          return (
            <span
              key={name}
              className="absolute top-0 left-1/2 -mt-8 -ml-8 scale-50 opacity-0 transition-[transform,opacity] duration-500 ease-[cubic-bezier(.2,1.4,.4,1)] group-hover:scale-100 group-hover:opacity-100 group-data-[open]:scale-100 group-data-[open]:opacity-100 motion-reduce:hidden"
              style={
                {
                  "--tx": `${Math.sin(angle) * 150}px`,
                  "--ty": `${-Math.cos(angle) * 70 - 70}px`,
                  transitionDelay: `${i * 40}ms`,
                } as React.CSSProperties
              }
            >
              <span className="block transition-transform duration-500 group-hover:[transform:translate(var(--tx),var(--ty))] group-data-[open]:[transform:translate(var(--tx),var(--ty))]">
                <Ingredient name={name} size={64} />
              </span>
            </span>
          );
        })}
      </div>
      <div className="flex items-start justify-between gap-4">
        <h3 className="display text-[2.4rem] text-verde">{pizza.name}</h3>
        <span className="mt-1 shrink-0 text-lg font-bold tabular-nums">{formatPrice(pizza.price)}</span>
      </div>
      <p className="mt-3 text-base leading-snug">{pizza.ingredients.join(", ")}</p>
    </li>
  );
}
