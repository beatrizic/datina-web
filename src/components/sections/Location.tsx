import { hoursLabel, site } from "@/data/site";
import { MapFacade } from "./MapFacade";

export function Location() {
  const a = site.address;
  return (
    <section
      id="dove"
      data-section="Dove siamo"
      aria-labelledby="dove-title"
      className="relative bg-inchiostro px-4 py-24 text-crema md:py-36"
    >
      <div className="mx-auto grid max-w-6xl gap-12 md:grid-cols-2 md:items-center">
        <div>
          <h2 id="dove-title" data-split className="display text-[clamp(3.5rem,12vw,9rem)] text-crosta">
            Dove siamo
          </h2>
          <address className="mt-8 text-2xl not-italic">
            {a.street}
            <br />
            {a.postalCode} {a.city} ({a.province})
          </address>
          <ul className="mt-8 space-y-2 text-lg">
            <li>
              <span aria-hidden className="mr-3 text-crosta">
                —
              </span>
              {hoursLabel}
            </li>
            <li>
              <span aria-hidden className="mr-3 text-crosta">
                —
              </span>
              lunedì e martedì chiuso
            </li>
          </ul>
          <div className="mt-10 flex flex-wrap gap-3">
            <a href="#prenota" className="btn btn-crema">
              Prenota un tavolo <span aria-hidden>→</span>
            </a>
            <a href={site.mapsUrl} target="_blank" rel="noopener" className="btn border-2 border-crema">
              Apri in Google Maps
            </a>
          </div>
        </div>
        <MapFacade />
      </div>
    </section>
  );
}
