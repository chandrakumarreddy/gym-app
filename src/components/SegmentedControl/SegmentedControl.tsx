import { LockBadge } from "@/components/LockBadge/LockBadge.tsx";
import { Pressable } from "@/components/Pressable/Pressable.tsx";

import "./SegmentedControl.css";

export type SegmentOption<T extends string> = { id: T; label: string };

type SegmentedControlProps<T extends string> = {
  options: SegmentOption<T>[];
  value: T;
  onChange: (id: T) => void;
  compact?: boolean;
  lockedIds?: T[];
  onLocked?: (id: T) => void;
  className?: string;
};

export function SegmentedControl<T extends string>({ options, value, onChange, compact, lockedIds, onLocked, className = "" }: SegmentedControlProps<T>) {
  return (
    <view className={`segmented${compact ? " segmented-compact" : ""} ${className}`}>
      {options.map((o) => {
        const locked = lockedIds?.includes(o.id) ?? false;
        const active = o.id === value;
        return (
          <Pressable
            key={o.id}
            className={`segmented-item${active ? " segmented-item-active" : ""}`}
            onTap={() => (locked ? onLocked?.(o.id) : onChange(o.id))}
          >
            <text className={`segmented-label${active ? " segmented-label-active" : ""}`}>{o.label}</text>
            {locked ? <LockBadge variant="inline" size={12} className="segmented-lock" /> : null}
          </Pressable>
        );
      })}
    </view>
  );
}
