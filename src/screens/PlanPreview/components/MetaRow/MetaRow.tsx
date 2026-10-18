import { Icon } from "@/components/Icon/Icon.tsx";

import type { MetaItem } from "@/screens/PlanPreview/planCopy.ts";

import "./MetaRow.css";

type MetaRowProps = { items: MetaItem[]; className?: string };

export function MetaRow({ items, className = "" }: MetaRowProps) {
  return (
    <view className={`meta-row ${className}`}>
      {items.map((m) => (
        <view key={m.icon} className="meta-item">
          <Icon name={m.icon} tone="muted" size={15} />
          <text className="meta-label">{m.label}</text>
        </view>
      ))}
    </view>
  );
}
