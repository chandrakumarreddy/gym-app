import type { ReactNode } from "@lynx-js/react";

import type { HapticKind } from "@/api/haptics.ts";
import { Icon } from "@/components/Icon/Icon.tsx";
import type { IconName } from "@/components/Icon/Icon.tsx";
import { Pressable } from "@/components/Pressable/Pressable.tsx";

import "./ProfileRow.css";

type ProfileRowProps = {
  icon: IconName;
  label: string;
  value?: string;
  trailing?: ReactNode;
  chevron?: boolean;
  first?: boolean;
  disabled?: boolean;
  haptic?: HapticKind | false;
  onTap?: () => void;
};

export function ProfileRow({ icon, label, value, trailing, chevron, first, disabled, haptic, onTap }: ProfileRowProps) {
  const body = (
    <>
      <view className="profile-row-tile">
        <Icon name={icon} tone="muted" size={18} />
      </view>
      <text className="profile-row-label">{label}</text>
      {value ? <text className="profile-row-value">{value}</text> : null}
      {trailing}
      {chevron ? <Icon name="chev-r" tone="muted" size={18} className="profile-row-chev" /> : null}
    </>
  );
  const cls = `profile-row${first ? "" : " profile-row-sep"}`;
  if (!onTap) return <view className={cls}>{body}</view>;
  return (
    <Pressable className={cls} disabled={disabled} haptic={haptic} onTap={onTap}>
      {body}
    </Pressable>
  );
}
