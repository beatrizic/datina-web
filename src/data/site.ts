/** Dati del locale. Tutto ciò che è `[[DA_CONFERMARE: …]]` è elencato in docs/todo-cliente.md. */

export const TBC = (what: string) => `[[DA_CONFERMARE: ${what}]]`;

export const site = {
  name: "Da Tina – Pizzeria Popolare",
  shortName: "Da Tina",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://datina.it",
  claim: "Il sapore di una pizza che sa di casa",
  subtitle: "Dove l'unica cosa che conta è la qualità del tempo che passi qui",
  address: {
    street: "Via Bosca 12A",
    postalCode: "10067", // [[DA_CONFERMARE: CAP]]
    city: "Vigone",
    province: "TO",
    country: "IT",
  },
  /** giorni ISO: 1 = lunedì … 7 = domenica */
  openDays: [3, 4, 5, 6, 7],
  opens: "18:30",
  closes: "22:30",
  /** ultimo orario prenotabile — [[DA_CONFERMARE: ultimo slot]] */
  lastBookingSlot: "22:00",
  phone: null as string | null, // [[DA_CONFERMARE: telefono]]
  whatsapp: null as string | null, // [[DA_CONFERMARE: WhatsApp]]
  vat: null as string | null, // [[DA_CONFERMARE: P.IVA]]
  instagram: null as string | null,
  facebook: null as string | null,
  privacyUrl: "https://www.iubenda.com/privacy-policy/88166374",
  cookieUrl: "https://www.iubenda.com/privacy-policy/88166374/cookie-policy",
  mapsUrl:
    "https://www.google.com/maps/search/?api=1&query=" +
    encodeURIComponent("Da Tina Pizzeria Popolare, Via Bosca 12A, Vigone TO"),
} as const;

export const hoursLabel = "mercoledì – domenica · 18:30 – 22:30";
