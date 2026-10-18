import { Button } from "@/components/Button/Button.tsx";

import "./CoachingOfferCard.css";

type CoachingOfferCardProps = {
  eyebrow: string;
  availabilityLabel?: string;
  title: string;
  description: string;
  priceLabel: string;
  periodLabel: string;
  ctaLabel: string;
  ctaVariant: "primary" | "ghost";
  onApply?: () => void;
};

export function CoachingOfferCard(p: CoachingOfferCardProps) {
  return (
    <view className="offer">
      <view className="offer-row">
        <text className="offer-eyebrow">{p.eyebrow}</text>
        {p.availabilityLabel ? (
          <view className="offer-pill">
            <text className="offer-pill-label">{p.availabilityLabel}</text>
          </view>
        ) : null}
      </view>
      <text className="offer-title">{p.title}</text>
      <text className="offer-desc">{p.description}</text>
      <view className="offer-row offer-foot">
        <text>
          <text className="offer-price">{p.priceLabel}</text>
          <text className="offer-period">{p.periodLabel}</text>
        </text>
        <Button label={p.ctaLabel} variant={p.ctaVariant} size="sm" onTap={p.onApply} />
      </view>
    </view>
  );
}
