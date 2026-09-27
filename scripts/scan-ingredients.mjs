// Genera src/data/ingredient-renders.ts elencando i render presenti in public/ingredients/.
// Un file <nome>.webp|.png sostituisce l'SVG di quell'ingrediente; se manca, resta l'SVG.
import { readdirSync, writeFileSync } from "node:fs";

const dir = new URL("../public/ingredients/", import.meta.url);
const files = readdirSync(dir).filter((f) => /\.(webp|png)$/i.test(f));
const map = Object.fromEntries(files.map((f) => [f.replace(/\.(webp|png)$/i, ""), `/ingredients/${f}`]));

writeFileSync(
  new URL("../src/data/ingredient-renders.ts", import.meta.url),
  `// File generato da scripts/scan-ingredients.mjs — non modificare a mano.\n` +
    `export const RENDERS: Partial<Record<string, string>> = ${JSON.stringify(map, null, 2)};\n`,
);
console.log(`ingredient renders: ${files.length}`);
