import logoGlyph from "@/assets/icons/logo.png";

import "./Logo.css";

export function Logo() {
  return (
    <view className="logo">
      <view className="logo-mark">
        <image className="logo-glyph" src={logoGlyph} />
      </view>
      <text className="logo-text">FitCue</text>
    </view>
  );
}
