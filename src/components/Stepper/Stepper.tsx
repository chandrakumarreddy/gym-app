import { useEffect, useRef } from "@lynx-js/react";
import type { MainThread } from "@lynx-js/types";

import { Icon } from "@/components/Icon/Icon.tsx";
import { formatKg } from "@/utils/format.ts";

import "./Stepper.css";

type StepperProps = {
  label: string;
  value: number;
  step: number;
  min: number;
  max: number;
  format?: "kg" | "int";
  unit?: string;
  onChange: (value: number) => void;
};

function pressIn(e: MainThread.TouchEvent) {
  "main thread";
  e.currentTarget.setStyleProperty("transform", "scale(0.92)");
  e.currentTarget.setStyleProperty("background-color", "var(--surface-2)");
}

function pressOut(e: MainThread.TouchEvent) {
  "main thread";
  e.currentTarget.setStyleProperty("transform", "scale(1)");
  e.currentTarget.setStyleProperty("background-color", "var(--surface-3)");
}

function clamp(v: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, Math.round(v * 100) / 100));
}

export function Stepper({ label, value, step, min, max, format = "int", unit, onChange }: StepperProps) {
  const valueRef = useRef(value);
  valueRef.current = value;
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);

  const stop = () => {
    if (timer.current) clearInterval(timer.current);
    timer.current = null;
  };
  useEffect(() => stop, []);

  const bump = (dir: 1 | -1) => {
    const next = clamp(valueRef.current + dir * step, min, max);
    if (next !== valueRef.current) {
      valueRef.current = next;
      onChange(next);
    }
  };
  const repeat = (dir: 1 | -1) => {
    stop();
    timer.current = setInterval(() => bump(dir), 120);
  };

  const text = format === "kg" ? formatKg(value) : String(value);
  const btn = (dir: 1 | -1) => {
    const disabled = dir < 0 ? value <= min : value >= max;
    if (disabled) {
      return (
        <view className="stepper-btn stepper-btn-disabled">
          <Icon name={dir < 0 ? "minus" : "plus"} size={22} />
        </view>
      );
    }
    return (
      <view
        className="stepper-btn"
        bindtap={() => bump(dir)}
        bindlongpress={() => repeat(dir)}
        bindtouchend={stop}
        bindtouchcancel={stop}
        main-thread:bindtouchstart={pressIn}
        main-thread:bindtouchend={pressOut}
        main-thread:bindtouchcancel={pressOut}
      >
        <Icon name={dir < 0 ? "minus" : "plus"} size={22} />
      </view>
    );
  };

  return (
    <view className="stepper">
      <text className="stepper-label">{label}</text>
      <view className="stepper-row">
        {btn(-1)}
        <view className="stepper-value-wrap">
          <text className="stepper-value">{text}</text>
          {unit ? <text className="stepper-unit">{unit}</text> : null}
        </view>
        {btn(1)}
      </view>
    </view>
  );
}
