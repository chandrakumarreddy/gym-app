import type { ReactNode } from "@lynx-js/react";

import { Glass } from "@/components/Glass/Glass.tsx";
import { Icon } from "@/components/Icon/Icon.tsx";
import type { IconName, IconTone } from "@/components/Icon/Icon.tsx";
import { Pressable } from "@/components/Pressable/Pressable.tsx";

import "./IconButton.css";

type IconButtonProps = {
  icon: IconName;
  variant?: "round" | "glass" | "plain";
  size?: number;
  iconSize?: number;
  tone?: IconTone;
  disabled?: boolean;
  badge?: ReactNode;
  className?: string;
  onTap?: () => void;
};

export function IconButton({ icon, variant = "round", size = 40, iconSize, tone, disabled, badge, className = "", onTap }: IconButtonProps) {
  return (
    <Pressable
      className={`icon-button icon-button-${variant} ${className}`}
      style={{ width: `${size}px`, height: `${size}px` }}
      feedback="scale"
      disabled={disabled}
      onTap={onTap}
    >
      {variant === "plain" ? null : <Glass radius={999} />}
      <Icon name={icon} tone={tone ?? "text"} size={iconSize ?? Math.round(size * 0.5)} />
      {badge ? <view className="icon-button-badge">{badge}</view> : null}
    </Pressable>
  );
}
