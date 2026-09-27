"use client";

import { useState } from "react";
import { site } from "@/data/site";

/**
 * Facade statica: l'iframe di Google Maps (che imposta cookie di terze parti)
 * viene caricato solo al click esplicito. [[step consenso: integrare con iubenda]]
 */
export function MapFacade() {
  const [loaded, setLoaded] = useState(false);
  const q = encodeURIComponent(`${site.address.street}, ${site.address.postalCode} ${site.address.city}`);

  return (
    <div className="relative aspect-square overflow-hidden rounded-[2.5rem] border-4 border-crema bg-verde">
      {loaded ? (
        <iframe
          title="Mappa: Da Tina, Via Bosca 12A, Vigone"
          src={`https://www.google.com/maps?q=${q}&output=embed`}
          className="absolute inset-0 h-full w-full"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      ) : (
        <div className="absolute inset-0 grid place-items-center p-8 text-center">
          <svg aria-hidden viewBox="0 0 200 200" className="absolute inset-0 h-full w-full opacity-30">
            <path d="M0 120 C60 100 120 150 200 110M40 0 C60 80 50 140 90 200M130 0 C120 60 160 120 150 200" stroke="#f5ecd7" strokeWidth="6" fill="none" />
            <circle cx="98" cy="118" r="10" fill="#d63a22" />
          </svg>
          <div className="relative">
            <p className="text-lg">La mappa è di Google: caricandola accetti i loro cookie.</p>
            <button type="button" onClick={() => setLoaded(true)} className="btn btn-crema mt-5">
              Carica la mappa
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
