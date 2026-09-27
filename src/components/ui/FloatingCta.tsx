/** Bottone persistente (pattern "Get in touch"): elemento fisso minimo, non una navbar. */
export function FloatingCta() {
  return (
    <a
      href="#prenota"
      className="btn btn-rosso fixed right-4 bottom-4 z-50 shadow-[0_8px_0_0_var(--inchiostro)] md:right-8 md:bottom-8"
    >
      Prenota un tavolo
    </a>
  );
}
