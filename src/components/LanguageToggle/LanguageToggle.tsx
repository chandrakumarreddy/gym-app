import type { MainThread } from "@lynx-js/types";

import { haptic } from "@/api/haptics.ts";
import { useLocale } from "@/hooks/useLocale.tsx";

import "./LanguageToggle.css";

function onPressIn(event: MainThread.TouchEvent) {
  "main thread";
  event.currentTarget.setStyleProperty("opacity", "0.7");
}

function onPressOut(event: MainThread.TouchEvent) {
  "main thread";
  event.currentTarget.setStyleProperty("opacity", "1");
}

export function LanguageToggle() {
  const { locale, setLocale } = useLocale();

  return (
    <view
      className="language-toggle"
      bindtap={() => {
        haptic("selection");
        setLocale(locale === "en" ? "hi" : "en");
      }}
      main-thread:bindtouchstart={onPressIn}
      main-thread:bindtouchend={onPressOut}
      main-thread:bindtouchcancel={onPressOut}
    >
      <view className="language-pill">
        <text className={`language-option${locale === "en" ? " language-option-active" : ""}`}>EN</text>
        <text className="language-option"> · </text>
        <text className={`language-option${locale === "hi" ? " language-option-active" : ""}`}>हिंदी</text>
      </view>
    </view>
  );
}
