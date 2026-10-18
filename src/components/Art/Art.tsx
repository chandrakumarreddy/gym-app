import type { ReactNode } from "@lynx-js/react";

import type { ArtSpec, ArtVariant, FigureName } from "@/types/art.ts";

import { FIGURES } from "./figures.ts";

import "./Art.css";

type Size = number | string;

type ArtProps = {
  spec?: ArtSpec;
  variant?: ArtVariant;
  figure?: FigureName;
  width?: Size;
  height?: Size;
  size?: number;
  radius?: number;
  fill?: boolean;
  figureScale?: number;
  scrim?: boolean;
  className?: string;
  children?: ReactNode;
};

function px(v: Size | undefined): string | undefined {
  return typeof v === "number" ? `${v}px` : v;
}

export function Art({ spec, variant, figure, width, height, size, radius, fill, figureScale = 0.7, scrim, className = "", children }: ArtProps) {
  const v = variant ?? spec?.variant ?? "v1";
  const fig = figure ?? spec?.figure;
  const style: Record<string, string> = {};
  const w = px(size ?? width);
  const h = px(size ?? height);
  if (w) style.width = w;
  if (h) style.height = h;
  if (radius !== undefined) style.borderRadius = `${radius}px`;
  const pct = `${Math.round(figureScale * 100)}%`;
  return (
    <view className={`art art-${v}${fill ? " art-fill" : ""} ${className}`} style={style}>
      {fig ? (
        <image className="art-figure" mode="aspectFit" src={FIGURES[v === "dark" ? "ember" : "ink"][fig]} style={{ width: pct, height: pct }} />
      ) : null}
      {scrim ? <view className="art-scrim" /> : null}
      {children}
    </view>
  );
}
