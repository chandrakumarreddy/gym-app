import { Pressable } from "@/components/Pressable/Pressable.tsx";
import type { PlanOptionVM } from "@/types/purchases.ts";

import "./PlanSelector.css";

type PlanSelectorProps = {
  options: PlanOptionVM[];
  selectedId: string;
  onSelect: (id: string) => void;
  className?: string;
};

export function PlanSelector({ options, selectedId, onSelect, className = "" }: PlanSelectorProps) {
  return (
    <view className={`plan-selector ${className}`}>
      {options.map((o) => {
        const on = o.id === selectedId;
        return (
          <Pressable key={o.id} className={`plan-option${on ? " plan-option-on" : ""}`} onTap={() => onSelect(o.id)}>
            {o.badge ? (
              <view className="plan-option-badge">
                <text className="plan-option-badge-label">{o.badge}</text>
              </view>
            ) : null}
            <view className={`plan-option-radio${on ? " plan-option-radio-on" : ""}`}>{on ? <view className="plan-option-radio-dot" /> : null}</view>
            <view className="plan-option-body">
              <text className="plan-option-title">{o.title}</text>
              {o.subtitle ? <text className="plan-option-subtitle">{o.subtitle}</text> : null}
            </view>
            <view className="plan-option-price-col">
              <text className="plan-option-price">{o.price}</text>
              {o.priceCaption ? <text className="plan-option-subtitle">{o.priceCaption}</text> : null}
            </view>
          </Pressable>
        );
      })}
    </view>
  );
}
