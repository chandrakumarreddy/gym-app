import type { ReactNode } from "@lynx-js/react";

import { Art } from "@/components/Art/Art.tsx";
import { Icon } from "@/components/Icon/Icon.tsx";
import { Pressable } from "@/components/Pressable/Pressable.tsx";
import type { ArtSpec } from "@/types/art.ts";

import "./HeroVideoCard.css";

type HeroVideoCardProps = {
  art: ArtSpec;
  height?: number;
  radius?: number;
  eyebrow?: string;
  title?: string;
  subtitle?: string;
  badge?: ReactNode;
  footer?: ReactNode;
  playButton?: boolean;
  className?: string;
  onTap?: () => void;
  children?: ReactNode;
};

export function HeroVideoCard({ art, height = 220, radius = 28, eyebrow, title, subtitle, badge, footer, playButton = true, className = "", onTap, children }: HeroVideoCardProps) {
  return (
    <Pressable className={`hero-card ${className}`} style={{ height: `${height}px`, borderRadius: `${radius}px` }} onTap={onTap}>
      <Art spec={art} fill scrim figureScale={0.75} />
      {badge ? <view className="hero-card-badge">{badge}</view> : null}
      {playButton ? (
        <view className="hero-card-play">
          <Icon name="play" tone="ink" size={22} />
        </view>
      ) : null}
      {children}
      <view className="hero-card-footer">
        {eyebrow ? <text className="hero-card-eyebrow">{eyebrow}</text> : null}
        {title ? <text className="hero-card-title">{title}</text> : null}
        {subtitle ? <text className="hero-card-subtitle">{subtitle}</text> : null}
        {footer}
      </view>
    </Pressable>
  );
}
