/**
 * Menù Da Tina — unica fonte di voci e prezzi.
 *
 * Fonte attuale: stories Instagram del 18 febbraio (trascrizione fornita da Beatrice).
 * [[DA_CONFERMARE: confronto con il menù sul sito (menupizze0926 / menucucina0926) — il sito vince]]
 *
 * Gli ingredienti delle pizze sono stringhe libere come sul menù cartaceo:
 * classificazione (filtri) e illustrazioni si derivano in `src/lib/ingredients.ts`.
 */

export type Price = number | { from: number; to: number };

export type Pizza = {
  name: string;
  ingredients: string[];
  price: Price;
};

export type MenuItem = {
  name: string;
  price: Price;
  /** true se il prodotto può essere surgelato (asterisco sul menù) */
  frozen?: boolean;
};

export type MenuCategoryId =
  | "pizze"
  | "stuzzicherie"
  | "aperitivo"
  | "bevande"
  | "vini"
  | "dolci";

export const pizze: Pizza[] = [
  { name: "Napoli", ingredients: ["pomodoro", "fior di latte", "acciughe", "origano"], price: 8.5 },
  { name: "4 Formaggi", ingredients: ["fior di latte", "gorgonzola", "provola", "stracchino"], price: 9 },
  { name: "Nerano", ingredients: ["fior di latte", "panna", "zucchine fritte", "provola", "pepe"], price: 9.5 },
  { name: "Tirolese", ingredients: ["fior di latte", "speck", "brie", "mele caramellate"], price: 9.5 },
  { name: "Recco", ingredients: ["fior di latte", "stracchino", "rucola", "pomodorini"], price: 9 },
  { name: "La Gustosa", ingredients: ["fior di latte", "speck", "rucola", "glassa di aceto balsamico"], price: 10 },
  { name: "Cristine", ingredients: ["fior di latte", "pomodorini secchi", "olive di Riviera", "burratina", "crema di basilico"], price: 10 },
  { name: "Parmigiana sbagliata", ingredients: ["pomodoro", "fior di latte", "polpette di melanzane", "rucola", "stracciatella di burrata"], price: 10 },
  { name: "Mortazza", ingredients: ["fior di latte", "mortadella", "crema di pistacchio", "burratina"], price: 10 },
  { name: "Crocchè", ingredients: ["fior di latte", "prosciutto cotto", "crocchette di patate*", "provola"], price: 10 },
  { name: "Margherita", ingredients: ["pomodoro", "fior di latte"], price: 7 },
  { name: "Margherita 2.0", ingredients: ["pomodoro", "fior di latte", "bufalina fuori cottura"], price: 10 },
  { name: "Salamino e gorgo", ingredients: ["pomodoro", "fior di latte", "spianata", "gorgonzola"], price: 8.5 },
  { name: "Tonno e cipolla", ingredients: ["pomodoro", "fior di latte", "tonno", "cipolla"], price: 8.5 },
  { name: "Capricciosa", ingredients: ["pomodoro", "fior di latte", "funghi", "carciofini", "olive", "salamino", "salsiccia"], price: 10 },
  { name: "Vegetariana", ingredients: ["pomodoro", "fior di latte", "zucchine", "peperoni", "melanzane", "cipolla"], price: 8.5 },
  { name: "Salsiccia e friarielli", ingredients: ["pomodoro", "fior di latte", "salsiccia", "friarielli", "provola"], price: 9 },
  { name: "La Parmigiana", ingredients: ["pomodoro", "fior di latte", "melanzane fritte", "ricotta salata"], price: 9 },
  { name: "Sfiziosa", ingredients: ["pomodoro", "prosciutto crudo di Cuneo", "burratina"], price: 10 },
  { name: "Audace", ingredients: ["fior di latte", "'nduja", "burratina", "pomodorino arrosto"], price: 10 },
  { name: "Sapori antichi", ingredients: ["pomodoro", "fior di latte", "ragù"], price: 10 },
  { name: "Focaccia mediterranea", ingredients: ["prosciutto crudo di Cuneo", "rucola", "pomodorini", "burratina"], price: 11 },
  { name: "Prosciutto e funghi", ingredients: ["pomodoro", "fior di latte", "prosciutto cotto", "funghi"], price: 8.5 },
  { name: "4 Stagioni", ingredients: ["pomodoro", "fior di latte", "prosciutto cotto", "carciofini", "olive", "funghi"], price: 9 },
  { name: "Greca", ingredients: ["pomodoro", "fior di latte", "olive di Riviera"], price: 8 },
  { name: "Valdostana", ingredients: ["pomodoro", "prosciutto cotto", "fontina"], price: 8.5 },
  { name: "Provola e pepe", ingredients: ["pomodoro", "fior di latte", "provola", "pepe", "pomodorini arrostiti", "crema di basilico"], price: 9 },
  { name: "Pugliese", ingredients: ["pomodoro", "acciughe", "cipolle", "olive di Riviera", "capperi"], price: 9 },
  { name: "Wurstel e patatine", ingredients: ["pomodoro", "fior di latte", "wurstel", "patatine*"], price: 9 },
  { name: "Enigma", ingredients: ["fior di latte", "guanciale", "miele", "noci"], price: 9 },
  { name: "Gorgo e mele", ingredients: ["fior di latte", "gorgonzola", "mele caramellate", "noci"], price: 9 },
];

export type ListSection = { title?: string; items: MenuItem[] };

export const stuzzicherie: ListSection[] = [
  {
    items: [
      { name: "Patatine fritte", price: 5, frozen: true },
      { name: "Crocchette di patate (6 pezzi)", price: 6 },
      { name: "Anelli di cipolle (6 pezzi)", price: 6, frozen: true },
      { name: "Polpette di melanzane (6 pezzi)", price: 6 },
      { name: "Fiori di zucca ripieni di alici e mozzarella (4 pezzi)", price: 6 },
      { name: "Prosciutto crudo di Cuneo con pomodorini e burrata", price: 10 },
      { name: "Chiacchere con prosciutto crudo di Cuneo e burrata", price: 12 },
      { name: "Chiacchere con prosciutto crudo di Cuneo e bufala", price: 12 },
    ],
  },
];

export const aperitivo: ListSection[] = [
  {
    items: [
      { name: "Crodino", price: 5 },
      { name: "Campari soda", price: 5 },
      { name: "Camatti spritz", price: 6 },
      { name: "Calice di prosecco", price: 4 },
      { name: "Aperol spritz", price: 5 },
      { name: "Campari spritz", price: 5 },
      { name: "Sarti spritz", price: 5 },
      { name: "Hugo spritz", price: 5 },
      { name: "Barbera tonic", price: 7 },
      { name: "Gin tonic", price: 7 },
      { name: "Contrattino", price: 6 },
    ],
  },
];

export const bevande: ListSection[] = [
  {
    items: [
      { name: "Acqua 50 cl", price: 2 },
      { name: "Coca Cola piccola 20 cl", price: 4.5 },
      { name: "Coca Cola media 40 cl", price: 5.5 },
      { name: "Birra bionda piccola 20 cl", price: 4.5 },
      { name: "Birra bionda media 40 cl", price: 5.5 },
      { name: "Birra rossa piccola 20 cl", price: 4.5 },
      { name: "Birra rossa media 40 cl", price: 5.5 },
      { name: "Birre al litro", price: 12 },
      { name: "Panachè piccola 20 cl", price: 4.5 },
      { name: "Panachè media 40 cl", price: 5.5 },
      { name: "Bibite in bottiglia", price: 3 },
      { name: "Beck's in bottiglia", price: 5.5 },
      { name: "Tennent's in bottiglia", price: 5.5 },
      { name: "Forst 66 cl in bottiglia", price: 8 },
    ],
  },
];

export const vini: ListSection[] = [
  {
    title: "In bottiglia",
    items: [
      { name: "Prosecco Extra Dry", price: 16 },
      { name: "Alta Langa Alasia", price: 35 },
      { name: "Contratto Alta Langa", price: 35 },
      { name: "Falanghina", price: 16 },
      { name: "Roero Arneis", price: 16 },
      { name: "Gewürztraminer", price: 24 },
      { name: "Chiacchiericcio Rosé", price: 16 },
      { name: "Barbera d'Alba", price: 16 },
      { name: "Croatina rosso leggermente frizzante", price: 16 },
      { name: "Lambrusco rosso frizzante secco", price: 16 },
    ],
  },
];

export const dolci: ListSection[] = [
  {
    title: "Dolci",
    items: [
      { name: "Pizza alla Nutella", price: 12 },
      { name: "Chiacchere alla Nutella", price: 12 },
      { name: "Dolci della casa (chiedi al nostro staff)", price: { from: 5, to: 6 } },
    ],
  },
  {
    title: "Fine pasto",
    items: [
      { name: "Passito di Pantelleria (al calice)", price: 5 },
      { name: "Amari", price: { from: 3.5, to: 6 } },
      { name: "Caffè", price: 1.5 },
    ],
  },
];

export const categories: { id: MenuCategoryId; label: string }[] = [
  { id: "pizze", label: "Pizze" },
  { id: "stuzzicherie", label: "Stuzzicherie" },
  { id: "aperitivo", label: "Aperitivo" },
  { id: "bevande", label: "Bevande" },
  { id: "vini", label: "Vini" },
  { id: "dolci", label: "Dolci & Fine pasto" },
];

export const listSections: Record<Exclude<MenuCategoryId, "pizze">, ListSection[]> = {
  stuzzicherie,
  aperitivo,
  bevande,
  vini,
  dolci,
};

export const menuNotes = {
  coperto: 1.5,
  aggiunte: "Le aggiunte variano da 1€ a 4€ a seconda dell'ingrediente",
  surgelati: "I prodotti contrassegnati con * potrebbero essere surgelati",
  allergie: "Se soffri di allergie o intolleranze, chiedi al nostro staff",
} as const;

const eur = new Intl.NumberFormat("it-IT", { style: "currency", currency: "EUR" });

export function formatPrice(p: Price): string {
  return typeof p === "number" ? eur.format(p) : `${eur.format(p.from)} – ${eur.format(p.to)}`;
}
