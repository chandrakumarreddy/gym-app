import { Chip } from "@/components/Chip/Chip.tsx";
import { LockBadge } from "@/components/LockBadge/LockBadge.tsx";
import { Pressable } from "@/components/Pressable/Pressable.tsx";
import { Tile } from "@/components/Tile/Tile.tsx";
import type { ArtSpec } from "@/types/art.ts";

import "./ProgramCard.css";

type ProgramCardProps = {
  art: ArtSpec;
  title: string;
  caption: string;
  badge?: string;
  locked?: boolean;
  onTap: () => void;
  onLockTap?: () => void;
};

export function ProgramCard({ art, title, caption, badge, locked, onTap, onLockTap }: ProgramCardProps) {
  return (
    <Pressable className="program-card" onTap={onTap}>
      <Tile art={art} width={160} height={200} radius={16} badge={badge ? <Chip label={badge} variant="ember" size="sm" /> : undefined} />
      {locked ? (
        <view className="program-card-lock" catchtap={onLockTap}>
          <LockBadge />
        </view>
      ) : null}
      <text className="program-card-title" text-maxline="1">
        {title}
      </text>
      <text className="program-card-caption" text-maxline="1">
        {caption}
      </text>
    </Pressable>
  );
}
