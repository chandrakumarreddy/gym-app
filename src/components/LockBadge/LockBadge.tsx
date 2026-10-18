import { Glass } from "@/components/Glass/Glass.tsx";
import { Icon } from "@/components/Icon/Icon.tsx";

import "./LockBadge.css";

type LockBadgeProps = {
  size?: number;
  variant?: "circle" | "inline";
  className?: string;
};

export function LockBadge({ size, variant = "circle", className = "" }: LockBadgeProps) {
  if (variant === "inline") return <Icon name="lock" tone="muted" size={size ?? 14} className={className} />;
  const d = size ?? 30;
  return (
    <view className={`lock-badge ${className}`} style={{ width: `${d}px`, height: `${d}px` }}>
      <Glass radius={999} />
      <Icon name="lock" tone="text" size={Math.round(d * 0.5)} />
    </view>
  );
}
