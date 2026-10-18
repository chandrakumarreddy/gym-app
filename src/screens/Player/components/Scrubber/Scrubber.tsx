import { runOnBackground, useMainThreadRef, useState } from "@lynx-js/react";
import type { LayoutChangeEvent, MainThread } from "@lynx-js/types";

import "./Scrubber.css";

type ScrubberProps = {
  ratio: number;
  elapsedLabel: string;
  durationLabel: string;
  onScrubEnd: (ratio: number) => void;
};

export function Scrubber({ ratio, elapsedLabel, durationLabel, onScrubEnd }: ScrubberProps) {
  const [trackW, setTrackW] = useState(0);
  const fillRef = useMainThreadRef<MainThread.Element | null>(null);
  const knobRef = useMainThreadRef<MainThread.Element | null>(null);
  const lastRef = useMainThreadRef(0);

  const onLayout = (e: LayoutChangeEvent) => {
    if (e.detail.width !== trackW) setTrackW(e.detail.width);
  };

  function onMove(e: MainThread.TouchEvent) {
    "main thread";
    if (trackW <= 0) return;
    const r = Math.min(1, Math.max(0, e.touches[0].x / trackW));
    lastRef.current = r;
    fillRef.current?.setStyleProperty("width", `${r * 100}%`);
    knobRef.current?.setStyleProperty("left", `${r * 100}%`);
  }

  function onEnd() {
    "main thread";
    if (trackW <= 0) return;
    void runOnBackground(onScrubEnd)(lastRef.current);
  }

  const pct = `${Math.min(1, Math.max(0, ratio)) * 100}%`;

  return (
    <view className="scrubber">
      <view
        className="scrubber-hit"
        bindlayoutchange={onLayout}
        main-thread:bindtouchstart={onMove}
        main-thread:bindtouchmove={onMove}
        main-thread:bindtouchend={onEnd}
      >
        <view className="scrubber-track" user-interaction-enabled={false}>
          <view main-thread:ref={fillRef} className="scrubber-fill" style={{ width: pct }} />
        </view>
        <view main-thread:ref={knobRef} className="scrubber-knob" user-interaction-enabled={false} style={{ left: pct }} />
      </view>
      <view className="scrubber-times">
        <text className="scrubber-time">{elapsedLabel}</text>
        <text className="scrubber-time">{durationLabel}</text>
      </view>
    </view>
  );
}
