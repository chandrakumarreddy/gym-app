import { Icon } from "@/components/Icon/Icon.tsx";
import { Pressable } from "@/components/Pressable/Pressable.tsx";

import "./FamilyBanner.css";

type FamilyBannerProps = {
  title: string;
  subtitle: string;
  disabled?: boolean;
  onTap: () => void;
};

export function FamilyBanner({ title, subtitle, disabled, onTap }: FamilyBannerProps) {
  return (
    <Pressable className="family-banner" disabled={disabled} onTap={onTap}>
      <Icon name="users" tone="gold" size={24} />
      <view className="family-banner-body">
        <text className="family-banner-title">{title}</text>
        <text className="family-banner-sub">{subtitle}</text>
      </view>
      <Icon name="chev-r" tone="gold" size={20} />
    </Pressable>
  );
}
