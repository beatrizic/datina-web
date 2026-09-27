import type { ReactElement } from "react";
import type { CastName } from "@/lib/ingredients";

/**
 * Cast illustrato v1 — SVG flat, viewBox 0 0 120 120.
 * Regole di stile comuni: luce dall'alto a sinistra (riflesso chiaro in alto a sx),
 * ombra piena in basso a dx, contorno inchiostro 3px, nessun gradiente.
 * La grana è un overlay CSS condiviso (vedi `.ingredient` in globals.css).
 */

const INK = "#16140F";
const S = { stroke: INK, strokeWidth: 3, strokeLinejoin: "round" as const, strokeLinecap: "round" as const };

export const ART: Record<CastName, ReactElement> = {
  pomodoro: (
    <>
      <circle cx="60" cy="66" r="40" fill="#D63A22" {...S} />
      <path d="M60 106a40 40 0 0 0 38-28 44 44 0 0 1-58 26z" fill="#A72617" />
      <ellipse cx="44" cy="52" rx="10" ry="6" fill="#F7A08C" transform="rotate(-30 44 52)" />
      <path d="M60 30l7-10 2 13 12-3-8 10 10 6-14 1-4 10-5-11-12 4 7-10-10-6 13-1z" fill="#3F8A3A" {...S} strokeWidth={2.5} />
    </>
  ),
  "fior-di-latte": (
    <>
      <path d="M22 68c0-24 16-40 38-40s38 16 38 40-17 32-38 32-38-8-38-32z" fill="#FBF6EA" {...S} />
      <path d="M98 70c-2 20-18 30-38 30-12 0-24-4-31-12 18 6 50 4 69-18z" fill="#E6DCC4" />
      <ellipse cx="45" cy="50" rx="11" ry="6" fill="#fff" transform="rotate(-25 45 50)" />
    </>
  ),
  basilico: (
    <>
      <path d="M20 96C22 50 58 20 102 22c-2 44-36 76-82 74z" fill="#3F8A3A" {...S} />
      <path d="M20 96c30-8 56-34 70-62" fill="none" stroke="#2A6427" strokeWidth={3} strokeLinecap="round" />
      <path d="M44 72l-6-16M58 58l-4-18M70 46l0-14M50 66l18 2M64 52l16 0" stroke="#2A6427" strokeWidth={2.5} strokeLinecap="round" />
      <path d="M38 40c10-10 22-14 34-15" stroke="#8CC47A" strokeWidth={5} strokeLinecap="round" fill="none" />
    </>
  ),
  burrata: (
    <>
      <path d="M18 74c0-22 18-36 42-36s42 14 42 36-19 28-42 28-42-6-42-28z" fill="#FBF6EA" {...S} />
      <path d="M48 40c-2-10 2-18 12-22 10 4 14 12 12 22-8 4-16 4-24 0z" fill="#FBF6EA" {...S} />
      <path d="M50 30c6 4 14 4 20 0" stroke={INK} strokeWidth={2.5} fill="none" strokeLinecap="round" />
      <path d="M102 76c-3 17-20 26-42 26-14 0-27-3-35-9 22 5 58 2 77-17z" fill="#E6DCC4" />
      <ellipse cx="38" cy="60" rx="10" ry="5" fill="#fff" transform="rotate(-20 38 60)" />
    </>
  ),
  funghi: (
    <>
      <path d="M48 64h24l4 34c-8 6-24 6-32 0z" fill="#F1E3C6" {...S} />
      <path d="M14 66c0-26 20-44 46-44s46 18 46 44c-20 6-72 6-92 0z" fill="#8A5A34" {...S} />
      <path d="M106 66c-20 6-72 6-92 0 10-2 70-8 88-24 3 7 4 15 4 24z" fill="#6B4225" />
      <ellipse cx="42" cy="40" rx="12" ry="6" fill="#C08A5C" transform="rotate(-25 42 40)" />
    </>
  ),
  olive: (
    <>
      <ellipse cx="44" cy="62" rx="22" ry="28" fill="#3B2233" {...S} transform="rotate(-18 44 62)" />
      <ellipse cx="78" cy="68" rx="20" ry="26" fill="#4A2C3F" {...S} transform="rotate(14 78 68)" />
      <ellipse cx="37" cy="48" rx="6" ry="9" fill="#8E6A82" transform="rotate(-18 37 48)" />
      <ellipse cx="72" cy="55" rx="5" ry="8" fill="#9D7891" transform="rotate(14 72 55)" />
    </>
  ),
  salamino: (
    <>
      <circle cx="60" cy="60" r="42" fill="#B8322A" {...S} />
      <path d="M100 70a42 42 0 0 1-72 20c26 6 56-2 72-20z" fill="#8F2019" />
      {[
        [44, 44, 5],
        [70, 38, 4],
        [80, 62, 5],
        [52, 70, 4],
        [36, 62, 3],
        [62, 86, 4],
        [60, 54, 3],
      ].map(([cx, cy, r]) => (
        <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r={r} fill="#F2C9B8" />
      ))}
    </>
  ),
  friarielli: (
    <>
      <path d="M58 104c0-24 2-48 8-76" stroke="#2F6B2A" strokeWidth={5} strokeLinecap="round" fill="none" />
      <path d="M62 56C40 58 22 46 18 28c20-4 38 6 44 28z" fill="#2E5E29" {...S} />
      <path d="M64 44c10-18 28-26 44-20-4 20-22 30-44 20z" fill="#3B7433" {...S} />
      <path d="M60 80c-18 4-34-4-40-18 18-6 34 2 40 18z" fill="#3B7433" {...S} />
      <path d="M62 74c16-8 32-4 40 8-16 10-32 6-40-8z" fill="#2E5E29" {...S} />
      <circle cx="67" cy="24" r="6" fill="#C9B63B" {...S} strokeWidth={2} />
    </>
  ),
  acciuga: (
    <>
      <path d="M10 62c20-18 56-22 84-8l16-12-4 20 4 20-16-12c-28 14-64 10-84-8z" fill="#8FA7B3" {...S} />
      <path d="M14 64c22 12 56 14 80 2-24 18-60 16-80-2z" fill="#5E7784" />
      <path d="M26 56c18-8 40-10 58-6" stroke="#D8E4EA" strokeWidth={4} strokeLinecap="round" fill="none" />
      <circle cx="26" cy="60" r="3.5" fill={INK} />
    </>
  ),
  crocchetta: (
    <>
      <rect x="16" y="42" width="88" height="38" rx="19" fill="#D9973D" {...S} transform="rotate(-12 60 61)" />
      <path d="M22 78c26 8 58 0 80-18l2 6c-6 18-54 30-78 22z" fill="#B0741F" transform="rotate(-2 60 61)" />
      {[
        [34, 56],
        [52, 50],
        [72, 46],
        [86, 54],
        [44, 68],
        [64, 62],
        [80, 66],
      ].map(([cx, cy]) => (
        <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r={2.4} fill="#F3CD85" />
      ))}
    </>
  ),
  mela: (
    <>
      <path d="M16 70c8-28 34-44 62-38 16 4 26 14 28 26-18-8-40-6-56 6-12 10-22 14-34 6z" fill="#F4D892" {...S} />
      <path d="M16 70c8 20 34 30 58 24 18-4 30-16 32-36-18-8-40-6-56 6-12 10-22 14-34 6z" fill="#C8741E" {...S} />
      <path d="M26 84c20 8 44 6 62-8" stroke="#9A5210" strokeWidth={3} strokeLinecap="round" fill="none" />
      <path d="M44 48c10-6 22-8 32-6" stroke="#FFF1C7" strokeWidth={4} strokeLinecap="round" fill="none" />
    </>
  ),
  noce: (
    <>
      <path d="M60 18c26 0 42 20 42 44s-18 40-42 40-42-16-42-40 16-44 42-44z" fill="#B98A57" {...S} />
      <path d="M60 18v84" stroke={INK} strokeWidth={3} />
      <path d="M32 40c6 6 4 12 10 16s2 12 8 18M88 40c-6 6-4 12-10 16s-2 12-8 18M34 78c6-2 10 2 14-2M86 78c-6-2-10 2-14-2" stroke="#7A5530" strokeWidth={3} fill="none" strokeLinecap="round" />
      <ellipse cx="42" cy="32" rx="8" ry="4" fill="#DDB788" transform="rotate(-30 42 32)" />
    </>
  ),
  pistacchio: (
    <>
      <path d="M22 70c-6-26 14-50 40-52 22-2 40 16 38 40-2 26-24 42-46 40-18-2-28-12-32-28z" fill="#E9D9B5" {...S} />
      <path d="M40 72c-4-18 8-34 24-36 14-2 24 8 22 24s-14 26-28 26c-10 0-16-6-18-14z" fill="#7DAA3C" {...S} />
      <path d="M50 58c4-8 10-12 18-12" stroke="#B7D77A" strokeWidth={4} strokeLinecap="round" fill="none" />
      <path d="M60 82c10-2 20-10 24-22" stroke="#5B8428" strokeWidth={3} strokeLinecap="round" fill="none" />
    </>
  ),
  crudo: (
    <>
      <path d="M14 60c10-26 38-40 64-32 18 6 30 20 30 34-16-6-30-2-42 8s-30 18-44 10c-6-4-10-10-8-20z" fill="#E68A8A" {...S} />
      <path d="M108 62c0 14-12 28-30 32-24 6-46-2-56-16 14 8 32 0 44-10s26-14 42-6z" fill="#FBEBDD" {...S} />
      <path d="M26 58c14-18 34-26 54-22" stroke="#F6B8B0" strokeWidth={5} strokeLinecap="round" fill="none" />
      <path d="M40 52c8 6 20 6 30 0M48 40c6 4 14 4 20 0" stroke="#C9606A" strokeWidth={2.5} strokeLinecap="round" fill="none" />
    </>
  ),
};

export const LABEL: Record<CastName, string> = {
  pomodoro: "Pomodoro",
  "fior-di-latte": "Fior di latte",
  basilico: "Basilico",
  burrata: "Burrata",
  funghi: "Funghi",
  olive: "Olive di Riviera",
  salamino: "Salamino",
  friarielli: "Friarielli",
  acciuga: "Acciuga",
  crocchetta: "Crocchetta di patate",
  mela: "Mela caramellata",
  noce: "Noce",
  pistacchio: "Pistacchio",
  crudo: "Prosciutto crudo di Cuneo",
};
