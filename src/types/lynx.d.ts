import type { BaseScrollInfo, MainThread, StandardProps } from "@lynx-js/types";

export type MainThreadScrollEvent = { type: string; timestamp: number; detail: BaseScrollInfo; currentTarget: MainThread.Element };

declare module "@lynx-js/types" {
  interface IntrinsicElements {
    "glass-view": StandardProps & { radius?: number; corners?: "all" | "top"; material?: "glass" | "blur" };
  }

  interface ScrollViewProps {
    "main-thread:bindscroll"?: (e: MainThreadScrollEvent) => void;
  }
}
