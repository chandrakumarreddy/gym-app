import { Icon } from "@/components/Icon/Icon.tsx";
import { Pressable } from "@/components/Pressable/Pressable.tsx";

import "./WeekStrip.css";

export type WeekDayState = "done" | "today" | "scheduled" | "rest";

export type WeekDayVM = { id: string; label: string; num: string; state: WeekDayState };

type WeekStripProps = {
  days: WeekDayVM[];
  onSelect?: (id: string, state: WeekDayState) => void;
};

export function WeekStrip({ days, onSelect }: WeekStripProps) {
  return (
    <view className="week-strip">
      {days.map((d) => (
        <Pressable key={d.id} className="week-strip-day" onTap={onSelect ? () => onSelect(d.id, d.state) : undefined}>
          <view className={`week-strip-circle week-strip-${d.state}`}>
            {d.state === "done" ? <Icon name="check" tone="text" size={16} /> : <text className={`week-strip-num week-strip-num-${d.state}`}>{d.num}</text>}
          </view>
          <text className="week-strip-label">{d.label}</text>
        </Pressable>
      ))}
    </view>
  );
}
