import { Icon } from "@/components/Icon/Icon.tsx";
import { useT } from "@/hooks/useLocale.tsx";

import "./ProBadge.css";

type ProBadgeProps = {
  label?: string;
  size?: "sm" | "md" | "tile" | "icon";
  mini?: boolean;
  className?: string;
};

export function ProBadge({ label, size = "sm", mini, className = "" }: ProBadgeProps) {
  const t = useT();
  if (mini) return <view className={`pro-badge-mini ${className}`} />;
  if (size === "tile" || size === "icon") {
    return (
      <view className={`pro-badge pro-badge-${size} ${className}`}>
        <Icon name="crown" tone="ink" size={size === "tile" ? 20 : 14} />
      </view>
    );
  }
  return (
    <view className={`pro-badge pro-badge-${size} ${className}`}>
      <Icon name="crown" tone="ink" size={size === "md" ? 14 : 12} />
      <text className={`pro-badge-label pro-badge-label-${size}`}>{label ?? t("common.pro")}</text>
    </view>
  );
}
