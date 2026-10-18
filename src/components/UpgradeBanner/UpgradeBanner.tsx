import { Icon } from "@/components/Icon/Icon.tsx";
import type { IconName } from "@/components/Icon/Icon.tsx";
import { Pressable } from "@/components/Pressable/Pressable.tsx";
import { useT } from "@/hooks/useLocale.tsx";

import "./UpgradeBanner.css";

type UpgradeBannerProps = {
  icon?: IconName;
  title?: string;
  subtitle?: string;
  chevron?: boolean;
  className?: string;
  onTap?: () => void;
};

export function UpgradeBanner({ icon = "crown", title, subtitle, chevron = true, className = "", onTap }: UpgradeBannerProps) {
  const t = useT();
  return (
    <Pressable className={`upgrade-banner ${className}`} onTap={onTap}>
      <view className="upgrade-banner-icon">
        <Icon name={icon} tone="ink" size={20} />
      </view>
      <view className="upgrade-banner-body">
        <text className="upgrade-banner-title">{title ?? t("common.upgrade.title")}</text>
        <text className="upgrade-banner-subtitle">{subtitle ?? t("common.upgrade.subtitle")}</text>
      </view>
      {chevron ? <Icon name="chev-r" tone="gold" size={18} /> : null}
    </Pressable>
  );
}
