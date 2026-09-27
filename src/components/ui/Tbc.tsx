/** Segnaposto evidente per contenuti da confermare col cliente (vedi docs/todo-cliente.md). */
export function Tbc({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-block max-w-full rounded-md break-words border-2 border-dashed border-current bg-[#ffe45c] px-2 py-0.5 font-mono text-sm text-inchiostro">
      [[DA_CONFERMARE: {children}]]
    </span>
  );
}
