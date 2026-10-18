import type { ReactNode } from "@lynx-js/react";

import { Icon } from "@/components/Icon/Icon.tsx";
import type { IconName } from "@/components/Icon/Icon.tsx";
import { Pressable } from "@/components/Pressable/Pressable.tsx";

import "./SettingsGroup.css";

type SettingsGroupProps = {
  title?: string;
  className?: string;
  children?: ReactNode;
};

export function SettingsGroup({ title, className = "", children }: SettingsGroupProps) {
  return (
    <view className={`settings-group ${className}`}>
      {title ? <text className="settings-group-title">{title}</text> : null}
      <view className="settings-group-card">{children}</view>
    </view>
  );
}

type SettingsRowProps = {
  label: string;
  icon?: IconName;
  value?: string;
  trailing?: ReactNode;
  chevron?: boolean;
  tone?: "default" | "danger";
  last?: boolean;
  onTap?: () => void;
};

export function SettingsRow({ label, icon, value, trailing, chevron, tone = "default", last, onTap }: SettingsRowProps) {
  const cls = `settings-row${last ? " settings-row-last" : ""}`;
  const body = (
    <>
      {icon ? <Icon name={icon} tone="muted" size={20} className="settings-row-icon" /> : null}
      <text className={`settings-row-label settings-row-label-${tone}`}>{label}</text>
      {value ? <text className="settings-row-value">{value}</text> : null}
      {trailing}
      {chevron ? <Icon name="chev-r" tone="dim" size={18} className="settings-row-chev" /> : null}
    </>
  );
  if (!onTap) return <view className={cls}>{body}</view>;
  return (
    <Pressable className={cls} onTap={onTap}>
      {body}
    </Pressable>
  );
}
