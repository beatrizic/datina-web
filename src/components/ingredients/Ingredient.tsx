import Image from "next/image";
import type { CSSProperties } from "react";
import type { CastName } from "@/lib/ingredients";
import { RENDERS } from "@/data/ingredient-renders";
import { ART } from "./art";

type Props = {
  name: CastName;
  /** lato in px; il componente è sempre quadrato */
  size?: number;
  className?: string;
  style?: CSSProperties;
};

/** Ingrediente decorativo: render WebP se presente in public/ingredients/, altrimenti SVG. */
export function Ingredient({ name, size = 120, className = "", style }: Props) {
  const render = RENDERS[name];
  const cls = `ingredient ${className}`;

  if (render) {
    return (
      <Image
        src={render}
        alt=""
        aria-hidden
        width={size}
        height={size}
        className={cls}
        style={style}
        draggable={false}
      />
    );
  }

  return (
    <svg
      viewBox="0 0 120 120"
      width={size}
      height={size}
      aria-hidden
      focusable="false"
      className={cls}
      style={style}
    >
      {ART[name]}
    </svg>
  );
}
