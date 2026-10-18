import type { MainThread } from "@lynx-js/types";

import "./Button.css";

type ButtonProps = {
  label: string;
  variant?: "primary" | "ghost";
  onTap?: () => void;
};

function onPressIn(event: MainThread.TouchEvent) {
  "main thread";
  event.currentTarget.setStyleProperty("opacity", "0.7");
}

function onPressOut(event: MainThread.TouchEvent) {
  "main thread";
  event.currentTarget.setStyleProperty("opacity", "1");
}

export function Button({ label, variant = "primary", onTap }: ButtonProps) {
  return (
    <view
      className={`button button-${variant}`}
      bindtap={onTap}
      main-thread:bindtouchstart={onPressIn}
      main-thread:bindtouchend={onPressOut}
      main-thread:bindtouchcancel={onPressOut}
    >
      <text className="button-label">{label}</text>
    </view>
  );
}
