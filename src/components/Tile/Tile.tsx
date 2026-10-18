import type { ReactNode } from "@lynx-js/react";

import { Art } from "@/components/Art/Art.tsx";
import { LockBadge } from "@/components/LockBadge/LockBadge.tsx";
import { Pressable } from "@/components/Pressable/Pressable.tsx";
import type { ArtSpec } from "@/types/art.ts";

import "./Tile.css";

type TileProps = {
  art: ArtSpec;
  title?: string;
  caption?: string;
  badge?: ReactNode;
  locked?: boolean;
  progress?: number;
  width?: number;
  height?: number;
  radius?: number;
  className?: string;
  onTap?: () => void;
};

export function Tile({ art, title, caption, badge, locked, progress, width = 160, height = 200, radius = 16, className = "", onTap }: TileProps) {
  return (
    <Pressable className={`tile ${className}`} style={{ width: `${width}px`, height: `${height}px`, borderRadius: `${radius}px` }} onTap={onTap}>
      <Art spec={art} fill scrim figureScale={0.6} />
      {badge ? <view className="tile-badge">{badge}</view> : null}
      {locked ? <LockBadge className="tile-lock" /> : null}
      <view className="tile-footer">
        {title ? <text className="tile-title">{title}</text> : null}
        {caption ? <text className="tile-caption">{caption}</text> : null}
        {progress !== undefined ? (
          <view className="tile-progress">
            <view className="tile-progress-fill" style={{ width: `${Math.round(progress * 100)}%` }} />
          </view>
        ) : null}
      </view>
    </Pressable>
  );
}
