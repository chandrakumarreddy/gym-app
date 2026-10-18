import { useEffect, useRef } from "@lynx-js/react";
import type { ReactNode } from "@lynx-js/react";

import { Art } from "@/components/Art/Art.tsx";
import type { ArtSpec } from "@/types/art.ts";

import "./Video.css";

export type VideoController = {
  seek: (timeSec: number) => void;
  play: () => void;
  pause: () => void;
  bind: (impl: { seek: (t: number) => void; setPaused: (p: boolean) => void } | null) => void;
};

export function useVideoController(): VideoController {
  const ref = useRef<VideoController | null>(null);
  if (!ref.current) {
    let impl: { seek: (t: number) => void; setPaused: (p: boolean) => void } | null = null;
    ref.current = {
      seek: (t) => impl?.seek(t),
      play: () => impl?.setPaused(false),
      pause: () => impl?.setPaused(true),
      bind: (next) => {
        impl = next;
      },
    };
  }
  return ref.current;
}

type VideoProps = {
  src?: string;
  art: ArtSpec;
  paused: boolean;
  rate?: number;
  muted?: boolean;
  startTime?: number;
  durationSec?: number;
  captionsVisible?: boolean;
  controller?: VideoController;
  className?: string;
  onReady?: (e: { duration: number }) => void;
  onBuffering?: (buffering: boolean) => void;
  onSecond?: (e: { sec: number }) => void;
  onEnded?: () => void;
  onError?: (e: { code: string }) => void;
  children?: ReactNode;
};

export function Video({ src, art, paused, rate = 1, startTime = 0, durationSec = 90, controller, className = "", onReady, onSecond, onEnded, children }: VideoProps) {
  const pos = useRef(startTime);
  const localPaused = useRef(false);
  const handlers = useRef({ onSecond, onEnded });
  handlers.current = { onSecond, onEnded };

  useEffect(() => {
    pos.current = startTime;
    const t = setTimeout(() => onReady?.({ duration: durationSec }), 300);
    return () => clearTimeout(t);
  }, [src, durationSec]);

  useEffect(() => {
    controller?.bind({
      seek: (t) => {
        pos.current = Math.max(0, Math.min(durationSec, t));
        handlers.current.onSecond?.({ sec: Math.floor(pos.current) });
      },
      setPaused: (p) => {
        localPaused.current = p;
      },
    });
    return () => controller?.bind(null);
  }, [controller, durationSec]);

  useEffect(() => {
    if (paused) return;
    localPaused.current = false;
    const id = setInterval(() => {
      if (localPaused.current) return;
      pos.current += 1;
      handlers.current.onSecond?.({ sec: Math.floor(pos.current) });
      if (pos.current >= durationSec) {
        clearInterval(id);
        handlers.current.onEnded?.();
      }
    }, Math.round(1000 / rate));
    return () => clearInterval(id);
  }, [paused, rate, durationSec, src]);

  return (
    <view className={`video ${className}`}>
      <Art spec={art} fill figureScale={0.7} />
      {children}
    </view>
  );
}
