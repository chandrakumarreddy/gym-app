import { Art } from "@/components/Art/Art.tsx";
import { ProBadge } from "@/components/ProBadge/ProBadge.tsx";
import { Pressable } from "@/components/Pressable/Pressable.tsx";
import type { ArtSpec } from "@/types/art.ts";

import "./PremiumChallengeCard.css";

type PremiumChallengeCardProps = {
  art: ArtSpec;
  title: string;
  caption: string;
  onTap: () => void;
};

export function PremiumChallengeCard({ art, title, caption, onTap }: PremiumChallengeCardProps) {
  return (
    <Pressable className="pch-card" onTap={onTap}>
      <Art spec={art} size={56} radius={14} />
      <view className="pch-body">
        <text className="pch-title" text-maxline="2">{title}</text>
        <text className="pch-caption">{caption}</text>
      </view>
      <ProBadge size="md" />
    </Pressable>
  );
}
