import { Icon } from "@/components/Icon/Icon.tsx";
import { Pressable } from "@/components/Pressable/Pressable.tsx";

import "./PackList.css";

export type PackVM = {
  id: string;
  title: string;
  subtitle?: string;
  price: string;
  originalPrice?: string;
  badge?: string;
};

type PackListProps = {
  options: PackVM[];
  selectedId: string;
  onSelect: (id: string) => void;
};

export function PackList({ options, selectedId, onSelect }: PackListProps) {
  return (
    <view className="pack-list">
      {options.map((o) => {
        const on = o.id === selectedId;
        return (
          <Pressable key={o.id} className={`pack${on ? " pack-on" : ""}`} onTap={() => onSelect(o.id)}>
            <view className={`pack-radio${on ? " pack-radio-on" : ""}`}>{on ? <Icon name="check" tone="text" size={14} /> : null}</view>
            <view className="pack-body">
              <text className="pack-title">{o.title}</text>
              {o.subtitle ? <text className="pack-subtitle">{o.subtitle}</text> : null}
            </view>
            <view className="pack-price-col">
              <text className="pack-price">{o.price}</text>
              {o.originalPrice ? <text className="pack-original">{o.originalPrice}</text> : null}
            </view>
            {o.badge ? (
              <view className="pack-badge">
                <text className="pack-badge-label">{o.badge}</text>
              </view>
            ) : null}
          </Pressable>
        );
      })}
    </view>
  );
}
