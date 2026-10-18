import { runOnBackground, runOnMainThread, useEffect, useMainThreadRef, useRef, useState } from "@lynx-js/react";
import type { ReactNode } from "@lynx-js/react";
import type { LayoutChangeEvent, MainThread } from "@lynx-js/types";

import { Glass } from "@/components/Glass/Glass.tsx";

import "./BottomSheet.css";

type BottomSheetProps = {
  visible: boolean;
  onDismiss: () => void;
  snapPoints?: number[];
  dismissible?: boolean;
  title?: string;
  children?: ReactNode;
};

type Geometry = { panelH: number; snapYs: number[]; snapMids: number[]; dismissY: number };

const SETTLE_MS = 220;
const FLING_VY = 0.8;
// One frame after parking, so the open animation starts from below the screen.
const OPEN_DELAY_MS = 32;
const SCRIM_MAX = 0.6;
const EASE = `transform ${SETTLE_MS}ms cubic-bezier(.2,.8,.2,1)`;
const SCRIM_EASE = `opacity ${SETTLE_MS}ms linear`;

function geometry(panelH: number, snapPoints: number[]): Geometry {
  const snapYs = snapPoints.map((f) => Math.round(panelH * (1 - f)));
  const snapMids = snapYs.slice(1).map((y, i) => (y + snapYs[i]) / 2);
  return { panelH, snapYs, snapMids, dismissY: panelH * 0.35 };
}

export function BottomSheet({ visible, onDismiss, snapPoints = [1], dismissible = true, title, children }: BottomSheetProps) {
  const [mounted, setMounted] = useState(visible);
  const [geo, setGeo] = useState<Geometry | null>(null);
  const closing = useRef(false);
  const opened = useRef(false);
  const settleTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const panelRef = useMainThreadRef<MainThread.Element | null>(null);
  const scrimRef = useMainThreadRef<MainThread.Element | null>(null);
  const startY = useMainThreadRef(0);
  const baseY = useMainThreadRef(0);
  const curY = useMainThreadRef(0);
  const lastY = useMainThreadRef(0);
  const lastT = useMainThreadRef(0);
  const vy = useMainThreadRef(0);

  const panelH = geo?.panelH ?? 0;
  const snapYs = geo?.snapYs ?? [0];
  const snapMids = geo?.snapMids ?? [];
  const dismissY = geo?.dismissY ?? 0;

  function animateTo(y: number, opacity: number) {
    "main thread";
    baseY.current = y;
    curY.current = y;
    panelRef.current?.setStyleProperty("transition", EASE);
    panelRef.current?.setStyleProperty("transform", `translateY(${y}px)`);
    scrimRef.current?.setStyleProperty("transition", SCRIM_EASE);
    scrimRef.current?.setStyleProperty("opacity", String(opacity));
  }

  // Park the panel just below the screen in px, so the open transition has a committed start.
  function park(y: number) {
    "main thread";
    panelRef.current?.setStyleProperty("transition", "none");
    panelRef.current?.setStyleProperty("transform", `translateY(${y}px)`);
    scrimRef.current?.setStyleProperty("transition", "none");
    scrimRef.current?.setStyleProperty("opacity", "0");
  }

  function onStart(e: MainThread.TouchEvent) {
    "main thread";
    startY.current = e.touches[0].clientY;
    lastY.current = startY.current;
    lastT.current = e.timestamp;
    vy.current = 0;
    panelRef.current?.setStyleProperty("transition", "none");
    scrimRef.current?.setStyleProperty("transition", "none");
  }

  function onMove(e: MainThread.TouchEvent) {
    "main thread";
    const y = e.touches[0].clientY;
    const dy = y - startY.current;
    const next = Math.max(0, baseY.current + (dy < 0 ? dy * 0.3 : dy));
    const dt = e.timestamp - lastT.current;
    if (dt > 0) vy.current = (y - lastY.current) / dt;
    lastY.current = y;
    lastT.current = e.timestamp;
    curY.current = next;
    panelRef.current?.setStyleProperty("transform", `translateY(${next}px)`);
    scrimRef.current?.setStyleProperty("opacity", String(SCRIM_MAX * (1 - next / panelH)));
  }

  function onEnd() {
    "main thread";
    const y = curY.current;
    let target = 0;
    if (dismissible && (y > snapYs[snapYs.length - 1] + dismissY || vy.current > FLING_VY)) target = -1;
    else if (snapMids.length > 0 && y > snapMids[0]) target = snapMids.length > 1 && y > snapMids[1] ? 2 : 1;
    const ty = target < 0 ? panelH : snapYs[target];
    panelRef.current?.setStyleProperty("transition", EASE);
    panelRef.current?.setStyleProperty("transform", `translateY(${ty}px)`);
    scrimRef.current?.setStyleProperty("transition", SCRIM_EASE);
    scrimRef.current?.setStyleProperty("opacity", target < 0 ? "0" : String(SCRIM_MAX));
    baseY.current = ty;
    void runOnBackground(onSettle)(target);
  }

  function finishClose() {
    settleTimer.current = setTimeout(() => {
      closing.current = false;
      opened.current = false;
      setMounted(false);
      setGeo(null);
      onDismiss();
    }, SETTLE_MS);
  }

  function onSettle(target: number) {
    if (target < 0 && !closing.current) {
      closing.current = true;
      finishClose();
    }
  }

  function close() {
    if (!geo || closing.current) return;
    closing.current = true;
    void runOnMainThread(animateTo)(geo.panelH, 0);
    finishClose();
  }

  useEffect(() => {
    if (visible) {
      closing.current = false;
      setMounted(true);
    } else if (mounted && geo && !closing.current) {
      closing.current = true;
      void runOnMainThread(animateTo)(geo.panelH, 0);
      settleTimer.current = setTimeout(() => {
        closing.current = false;
        opened.current = false;
        setMounted(false);
        setGeo(null);
      }, SETTLE_MS);
    } else if (!geo) {
      setMounted(false);
    }
  }, [visible]);

  useEffect(
    () => () => {
      if (settleTimer.current) clearTimeout(settleTimer.current);
    },
    [],
  );

  useEffect(() => {
    if (!geo || !visible || closing.current) return;
    if (opened.current) {
      void runOnMainThread(animateTo)(geo.snapYs[0], SCRIM_MAX);
      return;
    }
    opened.current = true;
    void runOnMainThread(park)(geo.panelH);
    const id = setTimeout(() => void runOnMainThread(animateTo)(geo.snapYs[0], SCRIM_MAX), OPEN_DELAY_MS);
    return () => clearTimeout(id);
  }, [geo?.panelH]);

  const onLayout = (e: LayoutChangeEvent) => {
    const h = Math.round(e.detail.height);
    if (h > 0 && h !== geo?.panelH) setGeo(geometry(h, snapPoints));
  };

  if (!mounted) return null;

  return (
    <view className="sheet-root">
      <view main-thread:ref={scrimRef} className="sheet-scrim" bindtap={dismissible ? close : undefined} />
      <view main-thread:ref={panelRef} className="sheet-panel" bindlayoutchange={onLayout} accessibility-element>
        <Glass radius={30} corners="top" />
        <view
          className="sheet-handle-area"
          main-thread:bindtouchstart={onStart}
          main-thread:bindtouchmove={onMove}
          main-thread:bindtouchend={onEnd}
          main-thread:bindtouchcancel={onEnd}
        >
          <view className="sheet-grabber" />
          {title ? <text className="sheet-title">{title}</text> : null}
        </view>
        <view className="sheet-content">{children}</view>
      </view>
    </view>
  );
}
