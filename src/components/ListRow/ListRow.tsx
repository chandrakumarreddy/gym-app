import type { ReactNode } from "@lynx-js/react";

import { Icon } from "@/components/Icon/Icon.tsx";
import { LockBadge } from "@/components/LockBadge/LockBadge.tsx";
import { Pressable } from "@/components/Pressable/Pressable.tsx";

import "./ListRow.css";

type ListRowProps = {
  title: string;
  eyebrow?: string;
  subtitle?: string;
  caption?: string;
  thumb?: ReactNode;
  leading?: ReactNode;
  trailing?: ReactNode;
  trailingText?: string;
  trailingTone?: "default" | "green" | "muted";
  chevron?: boolean;
  locked?: boolean;
  card?: boolean;
  className?: string;
  onTap?: () => void;
};

export function ListRow({
  title,
  eyebrow,
  subtitle,
  caption,
  thumb,
  leading,
  trailing,
  trailingText,
  trailingTone = "default",
  chevron,
  locked,
  card,
  className = "",
  onTap,
}: ListRowProps) {
  const sub = subtitle ?? caption;
  const cls = `list-row${card ? " list-row-card" : ""} ${className}`;
  const body = (
    <>
      {leading ? <view className="list-row-leading">{leading}</view> : null}
      {thumb ? <view className="list-row-thumb">{thumb}</view> : null}
      <view className="list-row-body">
        {eyebrow ? <text className="list-row-eyebrow">{eyebrow}</text> : null}
        <text className="list-row-title">{title}</text>
        {sub ? <text className="list-row-subtitle">{sub}</text> : null}
      </view>
      {trailingText ? <text className={`list-row-trailing-text list-row-trailing-${trailingTone}`}>{trailingText}</text> : null}
      {trailing}
      {locked ? <LockBadge variant="inline" className="list-row-end" /> : null}
      {chevron ? <Icon name="chev-r" tone="dim" size={18} className="list-row-end" /> : null}
    </>
  );
  if (!onTap) return <view className={cls}>{body}</view>;
  return (
    <Pressable className={cls} onTap={onTap}>
      {body}
    </Pressable>
  );
}
