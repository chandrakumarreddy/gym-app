import type { ReactNode } from "@lynx-js/react";

import { IconButton } from "@/components/IconButton/IconButton.tsx";

import "./ScreenHeader.css";

export type HeaderLeading = "back" | "close" | "none" | ReactNode;

type ScreenHeaderProps = {
  variant?: "large" | "nav" | "overlay" | "solid";
  title?: string;
  subtitle?: string;
  leading?: HeaderLeading;
  left?: HeaderLeading;
  trailing?: ReactNode;
  right?: ReactNode;
  onBack?: () => void;
  className?: string;
};

export function ScreenHeader({ variant = "nav", title, subtitle, leading, left, trailing, right, onBack, className = "" }: ScreenHeaderProps) {
  const lead = leading ?? left ?? (variant === "large" ? "none" : "back");
  const trail = trailing ?? right;
  const glass = variant === "overlay";
  const leadNode =
    lead === "back" || lead === "close" ? (
      <IconButton icon={lead === "back" ? "chev-l" : "x"} variant={glass ? "glass" : "round"} onTap={onBack} />
    ) : lead === "none" ? null : (
      lead
    );

  if (variant === "large") {
    return (
      <view className={`screen-header screen-header-large ${className}`}>
        {leadNode}
        <view className="screen-header-large-body">
          <text className="screen-header-large-title">{title}</text>
          {subtitle ? <text className="screen-header-subtitle">{subtitle}</text> : null}
        </view>
        <view className="screen-header-actions">{trail}</view>
      </view>
    );
  }

  return (
    <view className={`screen-header screen-header-${variant} ${className}`}>
      <view className="screen-header-side">{leadNode}</view>
      <view className="screen-header-center">
        {title ? <text className={`screen-header-title${glass ? " screen-header-title-video" : ""}`}>{title}</text> : null}
        {subtitle ? <text className="screen-header-subtitle">{subtitle}</text> : null}
      </view>
      <view className="screen-header-side screen-header-actions">{trail}</view>
    </view>
  );
}
