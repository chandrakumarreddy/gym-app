import { Pressable } from "@/components/Pressable/Pressable.tsx";
import type { Weekday } from "@/types/quiz.ts";

import "./DayPicker.css";

const DAYS: Weekday[] = [0, 1, 2, 3, 4, 5, 6];

type DayPickerProps = {
  value: Weekday[];
  labels: string[];
  onToggle: (day: Weekday) => void;
  className?: string;
};

export function DayPicker({ value, labels, onToggle, className = "" }: DayPickerProps) {
  return (
    <view className={`day-picker ${className}`}>
      {DAYS.map((d) => {
        const on = value.includes(d);
        return (
          <Pressable key={d} className={`day${on ? " day-on" : ""}`} haptic="selection" onTap={() => onToggle(d)}>
            <text className={`day-label${on ? " day-label-on" : ""}`}>{labels[d]}</text>
          </Pressable>
        );
      })}
    </view>
  );
}
