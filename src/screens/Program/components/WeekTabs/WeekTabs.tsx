import { LockBadge } from "@/components/LockBadge/LockBadge.tsx";
import { Pressable } from "@/components/Pressable/Pressable.tsx";
import { Skeleton } from "@/components/Skeleton/Skeleton.tsx";

import "./WeekTabs.css";

export type WeekTabVM = { index: number; label: string; locked: boolean };

type WeekTabsProps = {
  items: WeekTabVM[];
  selected: number;
  onSelect: (index: number) => void;
  onLockedTap: (index: number) => void;
};

export function WeekTabs({ items, selected, onSelect, onLockedTap }: WeekTabsProps) {
  return (
    <view className="week-tabs">
      <scroll-view className="week-tabs-scroll" scroll-orientation="horizontal">
        {items.map((it) => {
          const on = it.index === selected;
          return (
            <Pressable key={it.index} className="week-tab" onTap={() => (it.locked ? onLockedTap(it.index) : onSelect(it.index))}>
              <view className="week-tab-row">
                <text className={`week-tab-label${on ? " week-tab-label-on" : ""}`}>{it.label}</text>
                {it.locked ? <LockBadge variant="inline" size={14} className="week-tab-lock" /> : null}
              </view>
              <view className={`week-tab-bar${on ? " week-tab-bar-on" : ""}`} />
            </Pressable>
          );
        })}
      </scroll-view>
    </view>
  );
}

export function WeekTabsSkeleton({ count }: { count: number }) {
  return (
    <view className="week-tabs">
      <view className="week-tabs-scroll week-tabs-skel">
        {Array.from({ length: count }, (_, i) => (
          <view key={i} className="week-tab">
            <view className="week-tab-row">
              <view className="week-tab-skel-line">
                <Skeleton width={58} height={13} radius={6} />
              </view>
            </view>
            <view className="week-tab-bar" />
          </view>
        ))}
      </view>
    </view>
  );
}
