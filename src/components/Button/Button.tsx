import type { MainThread } from "@lynx-js/types";

import { haptic as fireHaptic } from "@/api/haptics.ts";
import type { HapticKind } from "@/api/haptics.ts";
import { Icon } from "@/components/Icon/Icon.tsx";
import type { IconName, IconTone } from "@/components/Icon/Icon.tsx";

import "./Button.css";

export type ButtonVariant = "primary" | "ghost" | "link" | "light" | "gold";

type ButtonProps = {
  label: string;
  variant?: ButtonVariant;
  size?: "md" | "sm";
  sm?: boolean;
  icon?: IconName;
  loading?: boolean;
  disabled?: boolean;
  fullWidth?: boolean;
  block?: boolean;
  className?: string;
  haptic?: HapticKind | false;
  onTap?: () => void;
};

const ICON_TONE: Record<ButtonVariant, IconTone> = {
  primary: "text",
  ghost: "text",
  link: "muted",
  light: "ink",
  gold: "ink",
};

function onPressIn(event: MainThread.TouchEvent) {
  "main thread";
  event.currentTarget.setStyleProperty("opacity", "0.7");
}

function onPressOut(event: MainThread.TouchEvent) {
  "main thread";
  event.currentTarget.setStyleProperty("opacity", "1");
}

export function Button({ label, variant = "primary", size, sm, icon, loading, disabled, fullWidth, block, className = "", haptic, onTap }: ButtonProps) {
  const small = sm || size === "sm";
  const inactive = disabled || loading;
  const cls = `button button-${variant}${small ? " button-sm" : ""}${fullWidth ? " button-full" : ""}${block ? " button-block" : ""}${disabled ? " button-disabled" : ""} ${className}`;
  const content = (
    <>
      {loading ? <view className={`button-spinner button-spinner-${variant}`} /> : icon ? <Icon name={icon} tone={ICON_TONE[variant]} size={small ? 16 : 20} /> : null}
      <text className={`button-label button-label-${variant}${small ? " button-label-sm" : ""}${loading || icon ? " button-label-gap" : ""}`}>{label}</text>
    </>
  );

  const kind = haptic ?? (variant === "link" ? "light" : "medium");
  const handleTap = onTap
    ? () => {
        if (kind) fireHaptic(kind);
        onTap();
      }
    : undefined;

  if (inactive) {
    return <view className={cls}>{content}</view>;
  }

  return (
    <view
      className={cls}
      bindtap={handleTap}
      main-thread:bindtouchstart={onPressIn}
      main-thread:bindtouchend={onPressOut}
      main-thread:bindtouchcancel={onPressOut}
    >
      {content}
    </view>
  );
}
