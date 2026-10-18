import type { ReactNode } from "@lynx-js/react";
import type { MainThread } from "@lynx-js/types";

import "./Pressable.css";

export type PressFeedback = "opacity" | "scale";

type PressableProps = {
  className?: string;
  style?: Record<string, string | number>;
  feedback?: PressFeedback;
  disabled?: boolean;
  onTap?: () => void;
  onLongPress?: () => void;
  onRelease?: () => void;
  children?: ReactNode;
};

function opacityIn(e: MainThread.TouchEvent) {
  "main thread";
  e.currentTarget.setStyleProperty("opacity", "0.7");
}

function opacityOut(e: MainThread.TouchEvent) {
  "main thread";
  e.currentTarget.setStyleProperty("opacity", "1");
}

function scaleIn(e: MainThread.TouchEvent) {
  "main thread";
  e.currentTarget.setStyleProperty("transform", "scale(0.94)");
  e.currentTarget.setStyleProperty("opacity", "0.85");
}

function scaleOut(e: MainThread.TouchEvent) {
  "main thread";
  e.currentTarget.setStyleProperty("transform", "scale(1)");
  e.currentTarget.setStyleProperty("opacity", "1");
}

export function Pressable({ className = "", style, feedback = "opacity", disabled, onTap, onLongPress, onRelease, children }: PressableProps) {
  if (disabled) {
    return (
      <view className={`pressable pressable-disabled ${className}`} style={style}>
        {children}
      </view>
    );
  }
  if (feedback === "scale") {
    return (
      <view
        className={`pressable ${className}`}
        style={style}
        bindtap={onTap}
        bindlongpress={onLongPress}
        bindtouchend={onRelease}
        bindtouchcancel={onRelease}
        main-thread:bindtouchstart={scaleIn}
        main-thread:bindtouchend={scaleOut}
        main-thread:bindtouchcancel={scaleOut}
      >
        {children}
      </view>
    );
  }
  return (
    <view
      className={`pressable ${className}`}
      style={style}
      bindtap={onTap}
      bindlongpress={onLongPress}
      bindtouchend={onRelease}
      bindtouchcancel={onRelease}
      main-thread:bindtouchstart={opacityIn}
      main-thread:bindtouchend={opacityOut}
      main-thread:bindtouchcancel={opacityOut}
    >
      {children}
    </view>
  );
}
