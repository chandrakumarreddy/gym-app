import type { ReactNode } from "@lynx-js/react";

import { Button } from "@/components/Button/Button.tsx";
import { ProBadge } from "@/components/ProBadge/ProBadge.tsx";
import { Pressable } from "@/components/Pressable/Pressable.tsx";

import "./BlurLockCard.css";

type BlurLockCardProps = {
  height: number;
  pitch: string;
  cta: string;
  onUnlock: () => void;
  children?: ReactNode;
};

export function BlurLockCard({ height, pitch, cta, onUnlock, children }: BlurLockCardProps) {
  return (
    <Pressable className="blur-lock" style={{ height: `${height}px` }} onTap={onUnlock}>
      <view className="blur-lock-content">{children}</view>
      <view className="blur-lock-overlay">
        <ProBadge size="md" />
        <text className="blur-lock-pitch">{pitch}</text>
        <Button label={cta} variant="gold" size="sm" className="blur-lock-cta" />
      </view>
    </Pressable>
  );
}
