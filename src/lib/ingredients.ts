import type { Pizza } from "@/data/menu";

/** Cast illustrato: ogni nome ha un SVG in `components/ingredients/art.tsx`
 *  e, opzionalmente, un render in `public/ingredients/<nome>.webp`. */
export const CAST = [
  "pomodoro",
  "fior-di-latte",
  "basilico",
  "burrata",
  "funghi",
  "olive",
  "salamino",
  "friarielli",
  "acciuga",
  "crocchetta",
  "mela",
  "noce",
  "pistacchio",
  "crudo",
] as const;

export type CastName = (typeof CAST)[number];

type Kind = "carne" | "pesce" | "altro";

/** Regole su sottostringa (ingrediente in minuscolo, senza asterisco).
 *  L'ordine conta: la prima regola che corrisponde vince. */
const RULES: { match: string; kind: Kind; art?: CastName }[] = [
  { match: "pomodorin", kind: "altro", art: "pomodoro" },
  { match: "pomodoro", kind: "altro", art: "pomodoro" },
  { match: "fior di latte", kind: "altro", art: "fior-di-latte" },
  { match: "bufalina", kind: "altro", art: "fior-di-latte" },
  { match: "crema di basilico", kind: "altro", art: "basilico" },
  { match: "basilico", kind: "altro", art: "basilico" },
  { match: "burrat", kind: "altro", art: "burrata" },
  { match: "stracciatella", kind: "altro", art: "burrata" },
  { match: "funghi", kind: "altro", art: "funghi" },
  { match: "olive", kind: "altro", art: "olive" },
  { match: "salamino", kind: "carne", art: "salamino" },
  { match: "spianata", kind: "carne", art: "salamino" },
  { match: "'nduja", kind: "carne", art: "salamino" },
  { match: "friarielli", kind: "altro", art: "friarielli" },
  { match: "acciug", kind: "pesce", art: "acciuga" },
  { match: "alici", kind: "pesce", art: "acciuga" },
  { match: "tonno", kind: "pesce" },
  { match: "crocchett", kind: "altro", art: "crocchetta" },
  { match: "mele", kind: "altro", art: "mela" },
  { match: "noci", kind: "altro", art: "noce" },
  { match: "pistacchio", kind: "altro", art: "pistacchio" },
  { match: "prosciutto crudo", kind: "carne", art: "crudo" },
  { match: "prosciutto", kind: "carne" },
  { match: "speck", kind: "carne", art: "crudo" },
  { match: "mortadella", kind: "carne" },
  { match: "salsiccia", kind: "carne" },
  { match: "guanciale", kind: "carne" },
  { match: "wurstel", kind: "carne" },
  { match: "ragù", kind: "carne" },
];

function lookup(ingredient: string) {
  const key = ingredient.toLowerCase().replace("*", "").trim();
  return RULES.find((r) => key.includes(r.match));
}

export function castFor(ingredients: string[]): CastName[] {
  const out = new Set<CastName>();
  for (const i of ingredients) {
    const art = lookup(i)?.art;
    if (art) out.add(art);
  }
  return [...out];
}

export type PizzaFilter = "vegetariane" | "pesce" | "bianche";

export const PIZZA_FILTERS: { id: PizzaFilter; label: string }[] = [
  { id: "vegetariane", label: "Vegetariane" },
  { id: "pesce", label: "Con pesce" },
  { id: "bianche", label: "Bianche (senza pomodoro)" },
];

/** Filtri derivati dagli ingredienti, mai scritti a mano sulla singola pizza. */
export function matchesFilter(pizza: Pizza, filter: PizzaFilter): boolean {
  const kinds = pizza.ingredients.map((i) => lookup(i)?.kind ?? "altro");
  switch (filter) {
    case "vegetariane":
      return !kinds.includes("carne") && !kinds.includes("pesce");
    case "pesce":
      return kinds.includes("pesce");
    case "bianche":
      // "pomodorini" non è salsa: una pizza è bianca se non ha la base di pomodoro.
      return !pizza.ingredients.some((i) => i.toLowerCase() === "pomodoro");
  }
}
