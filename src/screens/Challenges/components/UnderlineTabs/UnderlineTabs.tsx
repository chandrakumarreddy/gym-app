import { Pressable } from "@/components/Pressable/Pressable.tsx";

import "./UnderlineTabs.css";

type UnderlineTabsProps<T extends string> = {
  tabs: { id: T; label: string }[];
  value: T;
  onChange: (id: T) => void;
};

export function UnderlineTabs<T extends string>({ tabs, value, onChange }: UnderlineTabsProps<T>) {
  return (
    <view className="u-tabs">
      {tabs.map((tab) => {
        const active = tab.id === value;
        return (
          <Pressable key={tab.id} className={`u-tab${active ? " u-tab-active" : ""}`} haptic="selection" onTap={() => onChange(tab.id)}>
            <text className={`u-tab-label${active ? " u-tab-label-active" : ""}`}>{tab.label}</text>
          </Pressable>
        );
      })}
    </view>
  );
}
