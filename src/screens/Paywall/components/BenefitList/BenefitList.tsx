import { Icon } from "@/components/Icon/Icon.tsx";

import "./BenefitList.css";

type BenefitListProps = { items: string[]; className?: string };

export function BenefitList({ items, className = "" }: BenefitListProps) {
  return (
    <view className={`benefits ${className}`}>
      {items.map((label, i) => (
        <view key={i} className={`benefit${i > 0 ? " benefit-gap" : ""}`}>
          <Icon name="check" tone="ember" size={18} />
          <text className="benefit-label">{label}</text>
        </view>
      ))}
    </view>
  );
}
