import { Icon } from "@/components/Icon/Icon.tsx";
import { Pressable } from "@/components/Pressable/Pressable.tsx";
import { ProBadge } from "@/components/ProBadge/ProBadge.tsx";

import "./LockedWeeksCard.css";

type LockedWeeksCardProps = { title: string; sub: string; onTap?: () => void };

export function LockedWeeksCard({ title, sub, onTap }: LockedWeeksCardProps) {
  return (
    <Pressable className="locked-weeks" haptic="warning" onTap={onTap}>
      <view className="locked-weeks-lock">
        <Icon name="lock" tone="gold" size={15} />
      </view>
      <view className="locked-weeks-body">
        <text className="locked-weeks-title">{title}</text>
        <text className="locked-weeks-sub">{sub}</text>
      </view>
      <ProBadge size="sm" />
    </Pressable>
  );
}
