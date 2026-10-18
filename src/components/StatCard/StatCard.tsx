import { Icon } from "@/components/Icon/Icon.tsx";
import type { IconName } from "@/components/Icon/Icon.tsx";
import { Pressable } from "@/components/Pressable/Pressable.tsx";

import "./StatCard.css";

type StatCardProps = {
  label: string;
  value: string;
  unit?: string;
  icon?: IconName;
  tone?: "default" | "ember" | "green";
  className?: string;
  onTap?: () => void;
};

export function StatCard({ label, value, unit, icon, tone = "default", className = "", onTap }: StatCardProps) {
  const body = (
    <>
      <view className="stat-card-head">
        {icon ? <Icon name={icon} tone={tone === "green" ? "green" : "ember"} size={16} className="stat-card-icon" /> : null}
        <text className="stat-card-label">{label}</text>
      </view>
      <view className="stat-card-value-row">
        <text className={`stat-card-value stat-card-value-${tone}`}>{value}</text>
        {unit ? <text className="stat-card-unit">{unit}</text> : null}
      </view>
    </>
  );
  if (onTap) {
    return (
      <Pressable className={`stat-card ${className}`} onTap={onTap}>
        {body}
      </Pressable>
    );
  }
  return <view className={`stat-card ${className}`}>{body}</view>;
}
