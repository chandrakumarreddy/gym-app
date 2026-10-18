import { runOnMainThread, useEffect, useMainThreadRef } from "@lynx-js/react";
import type { MainThread } from "@lynx-js/types";

import "./HealthToggle.css";

type HealthToggleProps = {
  on: boolean;
  disabled?: boolean;
  onChange: (on: boolean) => void;
};

const KNOB_ON = "translateX(18px)";
const KNOB_OFF = "translateX(0px)";

export function HealthToggle({ on, disabled, onChange }: HealthToggleProps) {
  const visual = useMainThreadRef(on);
  const knobRef = useMainThreadRef<MainThread.Element | null>(null);
  const fillRef = useMainThreadRef<MainThread.Element | null>(null);

  function paint(next: boolean) {
    "main thread";
    visual.current = next;
    knobRef.current?.setStyleProperty("transform", next ? KNOB_ON : KNOB_OFF);
    fillRef.current?.setStyleProperty("opacity", next ? "1" : "0");
  }

  function onFlip() {
    "main thread";
    paint(!visual.current);
  }

  useEffect(() => {
    void runOnMainThread(paint)(on);
  }, [on]);

  return (
    <view
      className={`health-toggle${disabled ? " health-toggle-disabled" : ""}`}
      bindtap={disabled ? undefined : () => onChange(!on)}
      main-thread:bindtap={disabled ? undefined : onFlip}
    >
      <view main-thread:ref={fillRef} className="health-toggle-fill" style={{ opacity: on ? 1 : 0 }} />
      <view main-thread:ref={knobRef} className="health-toggle-knob" style={{ transform: on ? KNOB_ON : KNOB_OFF }} />
    </view>
  );
}
