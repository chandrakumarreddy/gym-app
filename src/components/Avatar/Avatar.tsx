import type { AvatarTone } from "@/types/content.ts";

import "./Avatar.css";

export type AvatarSize = number | "xs" | "sm" | "md" | "lg" | "xl";

const SIZES = { xs: 28, sm: 36, md: 44, lg: 60, xl: 80 } as const;

type AvatarProps = {
  initials: string;
  size?: AvatarSize;
  tone?: AvatarTone;
  ring?: boolean;
  className?: string;
};

export function Avatar({ initials, size = "md", tone = "ember", ring, className = "" }: AvatarProps) {
  const d = typeof size === "number" ? size : SIZES[size];
  return (
    <view
      className={`avatar avatar-${tone}${ring ? " avatar-ring" : ""} ${className}`}
      style={{ width: `${d}px`, height: `${d}px` }}
    >
      <text className="avatar-label" style={{ fontSize: `${Math.round(d * 0.38)}px` }}>
        {initials}
      </text>
    </view>
  );
}
