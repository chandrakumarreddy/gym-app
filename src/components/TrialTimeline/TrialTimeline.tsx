import { Icon } from "@/components/Icon/Icon.tsx";
import type { TrialTimelineItem } from "@/types/purchases.ts";

import "./TrialTimeline.css";

type TrialTimelineProps = {
  items: TrialTimelineItem[];
  className?: string;
};

export function TrialTimeline({ items, className = "" }: TrialTimelineProps) {
  return (
    <view className={`trial-timeline ${className}`}>
      {items.map((it, i) => (
        <view key={i} className="trial-step">
          <view className="trial-step-rail">
            <view className={`trial-step-dot${it.active ? " trial-step-dot-on" : ""}`}>
              <Icon name={it.icon} tone={it.active ? "text" : "muted"} size={14} />
            </view>
            {i < items.length - 1 ? <view className="trial-step-line" /> : null}
          </view>
          <view className="trial-step-body">
            <text className="trial-step-title">{it.title}</text>
            <text className="trial-step-caption">{it.caption}</text>
          </view>
        </view>
      ))}
    </view>
  );
}
