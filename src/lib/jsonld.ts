import { site } from "@/data/site";

const DAY = ["", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

export function restaurantJsonLd() {
  const a = site.address;
  return {
    "@context": "https://schema.org",
    "@type": "Restaurant",
    name: site.name,
    url: site.url,
    servesCuisine: "Pizza",
    acceptsReservations: true,
    hasMenu: `${site.url}/#menu`,
    address: {
      "@type": "PostalAddress",
      streetAddress: a.street,
      postalCode: a.postalCode,
      addressLocality: a.city,
      addressRegion: a.province,
      addressCountry: a.country,
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: site.openDays.map((d) => `https://schema.org/${DAY[d]}`),
        opens: site.opens,
        closes: site.closes,
      },
    ],
    ...(site.phone ? { telephone: site.phone } : {}),
    ...(site.vat ? { vatID: site.vat } : {}),
  };
}
