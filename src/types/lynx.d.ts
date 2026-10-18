import type { BaseScrollInfo, MainThread } from "@lynx-js/types";

export type MainThreadScrollEvent = { type: string; timestamp: number; detail: BaseScrollInfo; currentTarget: MainThread.Element };

declare module "@lynx-js/types" {
  interface ScrollViewProps {
    "main-thread:bindscroll"?: (e: MainThreadScrollEvent) => void;
  }
}
