import { Icon } from "@/components/Icon/Icon.tsx";

import "./PrCard.css";

type PrCardProps = {
  title: string;
  subtitle: string;
};

export function PrCard({ title, subtitle }: PrCardProps) {
  return (
    <view className="pr-card">
      <Icon name="trophy" tone="green" size={24} />
      <view className="pr-card-body">
        <text className="pr-card-title">{title}</text>
        <text className="pr-card-sub">{subtitle}</text>
      </view>
    </view>
  );
}
