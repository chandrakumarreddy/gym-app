import { runOnMainThread, useEffect, useMainThreadRef, useMemo, useRef, useState } from "@lynx-js/react";
import type { LayoutChangeEvent, MainThread, ScrollEndEvent } from "@lynx-js/types";

import { haptic } from "@/api/haptics.ts";
import type { MainThreadScrollEvent } from "@/types/lynx.d.ts";

import "./NumberPicker.css";

type NumberPickerProps = {
  variant?: "digits" | "ruler";
  min: number;
  max: number;
  step?: number;
  value: number;
  onChange: (value: number) => void;
  unitLabel?: string;
  formatLabel?: (value: number) => string;
  className?: string;
};

const ITEM_W = 64;
const TICK_PX = 12;
const SCALES = [1, 0.42, 0.29];
const COLORS = ["var(--text)", "var(--muted)", "var(--dim)"];
const TICK_CHUNK = 100;

let seq = 0;

function scaleAt(d: number): number {
  if (d <= 1) return SCALES[0] - d * (SCALES[0] - SCALES[1]);
  if (d <= 2) return SCALES[1] - (d - 1) * (SCALES[1] - SCALES[2]);
  return SCALES[2];
}

function scrollTo(id: string, offset: number) {
  lynx.createSelectorQuery().select(`#${id}`).invoke({ method: "scrollTo", params: { offset, smooth: true } }).exec();
}

export function NumberPicker({ variant = "digits", min, max, step = 1, value, onChange, unitLabel, formatLabel, className = "" }: NumberPickerProps) {
  const [id] = useState(() => `np-${++seq}`);
  const [viewW, setViewW] = useState(0);
  const unit = variant === "ruler" ? TICK_PX : ITEM_W;
  const count = Math.floor((max - min) / step) + 1;
  const index = Math.min(count - 1, Math.max(0, Math.round((value - min) / step)));
  const labels = useMemo(() => Array.from({ length: count }, (_, i) => (formatLabel ? formatLabel(min + i * step) : String(min + i * step))), [min, max, step, formatLabel]);
  const emitted = useRef(value);
  const [ticks, setTicks] = useState(Math.min(count, TICK_CHUNK));

  useEffect(() => {
    if (variant !== "ruler") return;
    setTicks(Math.min(count, TICK_CHUNK));
    if (count <= TICK_CHUNK) return;
    let n = TICK_CHUNK;
    const timer = setInterval(() => {
      n = Math.min(count, n + TICK_CHUNK);
      setTicks(n);
      if (n >= count) clearInterval(timer);
    }, 16);
    return () => clearInterval(timer);
  }, [count, variant]);

  useEffect(() => {
    if (value !== emitted.current && viewW > 0) scrollTo(id, index * unit);
    emitted.current = value;
  }, [value, min, step]);

  const itemsRef = useMainThreadRef<MainThread.Element[]>([]);
  const valueTextRef = useMainThreadRef<MainThread.Element | null>(null);
  const lastIdxRef = useMainThreadRef(-1);
  const labelsRef = useMainThreadRef<string[]>([]);

  function setLabels(next: string[]) {
    "main thread";
    labelsRef.current = next;
  }

  useEffect(() => {
    if (variant === "ruler") void runOnMainThread(setLabels)(labels);
  }, [labels, variant]);

  function onDigitsScroll(e: MainThreadScrollEvent) {
    "main thread";
    if (itemsRef.current.length === 0) itemsRef.current = e.currentTarget.querySelectorAll(".np-digit");
    const c = e.detail.scrollLeft / ITEM_W;
    const r = Math.round(c);
    for (let j = Math.max(0, r - 3); j <= Math.min(itemsRef.current.length - 1, r + 3); j++) {
      const d = Math.abs(j - c);
      const el = itemsRef.current[j];
      const k = d <= 1 ? SCALES[0] - d * (SCALES[0] - SCALES[1]) : d <= 2 ? SCALES[1] - (d - 1) * (SCALES[1] - SCALES[2]) : SCALES[2];
      el.setStyleProperty("transform", `scale(${k})`);
      el.setStyleProperty("color", COLORS[Math.min(2, Math.round(d))]);
    }
  }

  function onRulerScroll(e: MainThreadScrollEvent) {
    "main thread";
    const i = Math.round(e.detail.scrollLeft / TICK_PX);
    if (i !== lastIdxRef.current && i >= 0 && i < labelsRef.current.length) {
      lastIdxRef.current = i;
      valueTextRef.current?.setAttribute("text", labelsRef.current[i]);
    }
  }

  const onScrollEnd = (e: ScrollEndEvent) => {
    const i = Math.min(count - 1, Math.max(0, Math.round(e.detail.scrollLeft / unit)));
    if (Math.abs(e.detail.scrollLeft - i * unit) > 1) scrollTo(id, i * unit);
    const next = min + i * step;
    if (next !== emitted.current) {
      emitted.current = next;
      haptic("selection");
      onChange(next);
    }
  };

  const onLayout = (e: LayoutChangeEvent) => setViewW(Math.round(e.detail.width));
  const spacer = Math.max(0, (viewW - (variant === "ruler" ? 2 : ITEM_W)) / 2);

  if (variant === "ruler") {
    return (
      <view className={`np-ruler ${className}`}>
        <view className="np-ruler-value">
          <text main-thread:ref={valueTextRef} className="np-ruler-number">
            {labels[index]}
          </text>
          {unitLabel ? <text className="np-ruler-unit">{unitLabel}</text> : null}
        </view>
        <view className="np-ruler-track" bindlayoutchange={onLayout}>
          {viewW > 0 ? (
            <scroll-view
              id={id}
              className="np-ruler-scroll"
              scroll-orientation="horizontal"
              initial-scroll-offset={index * TICK_PX}
              main-thread:bindscroll={onRulerScroll}
              bindscrollend={onScrollEnd}
            >
              <view className="np-ticks" style={{ width: `${spacer * 2 + count * TICK_PX}px`, paddingLeft: `${spacer}px` }}>
                {Array.from({ length: ticks }, (_, i) => (
                  <view key={i} className="np-tick" />
                ))}
              </view>
            </scroll-view>
          ) : null}
          <view className="np-ruler-fade np-ruler-fade-l" />
          <view className="np-ruler-fade np-ruler-fade-r" />
          <view className="np-ruler-mark" style={{ left: `${viewW / 2 - 1.5}px` }} />
        </view>
      </view>
    );
  }

  return (
    <view className={`np-digits ${className}`} bindlayoutchange={onLayout}>
      {viewW > 0 ? (
        <scroll-view
          id={id}
          className="np-digits-scroll"
          scroll-orientation="horizontal"
          initial-scroll-offset={index * ITEM_W}
          main-thread:bindscroll={onDigitsScroll}
          bindscrollend={onScrollEnd}
        >
          <view className="np-digits-row" style={{ paddingLeft: `${spacer}px`, paddingRight: `${spacer}px` }}>
            {labels.map((l, i) => {
              const d = Math.abs(i - index);
              return (
                <view key={i} className="np-digit-cell" bindtap={() => scrollTo(id, i * ITEM_W)}>
                  <text className="np-digit" style={{ transform: `scale(${scaleAt(d)})`, color: COLORS[Math.min(2, d)] }}>
                    {l}
                  </text>
                </view>
              );
            })}
          </view>
        </scroll-view>
      ) : null}
    </view>
  );
}
