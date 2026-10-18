import { runOnMainThread, useEffect, useMainThreadRef } from "@lynx-js/react";
import type { MainThread } from "@lynx-js/types";

import { ringAngles, ringPlan } from "./ringPlan.ts";
import type { RingAngles, RingPlan } from "./ringPlan.ts";

import "./RestRing.css";

type RestRingProps = {
  size?: number;
  stroke?: number;
  progress?: number;
  durationMs?: number;
  remainingMs?: number;
  running?: boolean;
  label?: string;
  valueText?: string;
  caption?: string;
  className?: string;
};

type Anim = { cancel: () => void };

export function RestRing({ size = 220, stroke = 14, progress = 0, durationMs, remainingMs, running, label, valueText, caption, className = "" }: RestRingProps) {
  const rightRef = useMainThreadRef<MainThread.Element | null>(null);
  const leftRef = useMainThreadRef<MainThread.Element | null>(null);
  const animsRef = useMainThreadRef<Anim[]>([]);

  const staticProgress = durationMs && remainingMs !== undefined ? remainingMs / durationMs : progress;
  const angles = ringAngles(staticProgress);
  const half = size / 2;

  function startRing(plan: RingPlan) {
    "main thread";
    animsRef.current.forEach((a) => a.cancel());
    const opts = { easing: "linear", fill: "forwards" } as const;
    const r = rightRef.current?.animate([{ transform: plan.right.from }, { transform: plan.right.to }], { ...opts, delay: plan.right.delay, duration: plan.right.duration });
    const l = leftRef.current?.animate([{ transform: plan.left.from }, { transform: plan.left.to }], { ...opts, delay: plan.left.delay, duration: plan.left.duration });
    animsRef.current = [r, l].filter((a): a is NonNullable<typeof a> => !!a);
  }

  function stopRing(a: RingAngles) {
    "main thread";
    animsRef.current.forEach((x) => x.cancel());
    animsRef.current = [];
    rightRef.current?.setStyleProperty("transform", a.right);
    leftRef.current?.setStyleProperty("transform", a.left);
  }

  useEffect(() => {
    if (durationMs === undefined || remainingMs === undefined) return;
    if (running) void runOnMainThread(startRing)(ringPlan(remainingMs, durationMs));
    else void runOnMainThread(stopRing)(ringAngles(remainingMs / durationMs));
  }, [running, durationMs, running ? remainingMs : undefined]);

  const box = { width: `${size}px`, height: `${size}px` };
  const ringStyle = { width: `${size}px`, height: `${size}px`, borderWidth: `${stroke}px` };
  const halfW = `${half}px`;

  return (
    <view className={`rest-ring ${className}`} style={box}>
      <view className="rest-ring-track" style={ringStyle} />
      <view className="rest-ring-clip" style={{ left: halfW, width: halfW, height: `${size}px` }}>
        <view main-thread:ref={rightRef} className="rest-ring-rotator" style={{ left: `-${half}px`, ...box, transform: angles.right }}>
          <view className="rest-ring-clip" style={{ left: "0px", width: halfW, height: `${size}px` }}>
            <view className="rest-ring-arc" style={ringStyle} />
          </view>
        </view>
      </view>
      <view className="rest-ring-clip" style={{ left: "0px", width: halfW, height: `${size}px` }}>
        <view main-thread:ref={leftRef} className="rest-ring-rotator" style={{ left: "0px", ...box, transform: angles.left }}>
          <view className="rest-ring-clip" style={{ left: halfW, width: halfW, height: `${size}px` }}>
            <view className="rest-ring-arc" style={{ ...ringStyle, marginLeft: `-${half}px` }} />
          </view>
        </view>
      </view>
      <view className="rest-ring-center">
        {label ? <text className="rest-ring-label">{label}</text> : null}
        {valueText ? <text className="rest-ring-value">{valueText}</text> : null}
        {caption ? <text className="rest-ring-caption">{caption}</text> : null}
      </view>
    </view>
  );
}
