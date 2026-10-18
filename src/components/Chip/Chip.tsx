import { Icon } from "@/components/Icon/Icon.tsx";
import type { IconName } from "@/components/Icon/Icon.tsx";
import { Pressable } from "@/components/Pressable/Pressable.tsx";

import "./Chip.css";

export type ChipTone = "default" | "ember" | "glass" | "soft";

type ChipProps = {
  label: string;
  selected?: boolean;
  showCheck?: boolean;
  tone?: ChipTone;
  variant?: "pill" | "action" | "ember" | "soft";
  size?: "sm" | "md";
  icon?: IconName;
  disabled?: boolean;
  className?: string;
  onTap?: () => void;
  onToggle?: () => void;
};

export function Chip({ label, selected, showCheck, tone, variant = "pill", size = "md", icon, disabled, className = "", onTap, onToggle }: ChipProps) {
  const t: ChipTone = tone ?? (variant === "ember" ? "ember" : variant === "soft" ? "soft" : "default");
  const kind = variant === "action" ? "action" : "pill";
  const cls = `chip chip-${kind} chip-${t} chip-${size}${selected ? " chip-selected" : ""} ${className}`;
  const handler = onToggle ?? onTap;
  const labelCls = `chip-label chip-label-${t}${size === "sm" ? " chip-label-sm" : ""}${selected ? " chip-label-selected" : ""}`;
  const body = (
    <>
      {showCheck && selected ? <Icon name="check" tone="ember" size={14} className="chip-icon" /> : null}
      {icon ? <Icon name={icon} tone={t === "ember" ? "text" : "muted"} size={14} className="chip-icon" /> : null}
      <text className={labelCls}>{label}</text>
    </>
  );
  if (!handler) return <view className={cls}>{body}</view>;
  return (
    <Pressable className={cls} disabled={disabled} haptic="selection" onTap={handler}>
      {body}
    </Pressable>
  );
}
