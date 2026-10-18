import { Art } from "@/components/Art/Art.tsx";
import { Icon } from "@/components/Icon/Icon.tsx";
import { Pressable } from "@/components/Pressable/Pressable.tsx";
import type { ArtSpec } from "@/types/art.ts";

import "./UpNextCard.css";

type UpNextCardProps = {
  art: ArtSpec;
  eyebrow: string;
  title: string;
  onTap?: () => void;
};

export function UpNextCard({ art, eyebrow, title, onTap }: UpNextCardProps) {
  return (
    <Pressable className="up-next" onTap={onTap}>
      <Art spec={art} size={52} radius={14} figureScale={0.8} />
      <view className="up-next-body">
        <text className="up-next-eyebrow">{eyebrow}</text>
        <text className="up-next-title" text-maxline="1">{title}</text>
      </view>
      <Icon name="chev-r" tone="muted" size={20} />
    </Pressable>
  );
}
