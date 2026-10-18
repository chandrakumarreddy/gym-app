import { Icon } from "@/components/Icon/Icon.tsx";
import type { IconName } from "@/components/Icon/Icon.tsx";
import { Pressable } from "@/components/Pressable/Pressable.tsx";
import { useT } from "@/hooks/useLocale.tsx";
import type { StringKey } from "@/hooks/useLocale.tsx";
import { useRouter } from "@/hooks/useRouter.tsx";
import type { TabId } from "@/types/route.ts";

import "./TabBar.css";

const TABS: { id: TabId; icon: IconName; label: StringKey }[] = [
  { id: "home", icon: "home", label: "common.tab.home" },
  { id: "library", icon: "library", label: "common.tab.library" },
  { id: "progress", icon: "chart", label: "common.tab.progress" },
  { id: "challenges", icon: "trophy", label: "common.tab.challenges" },
  { id: "profile", icon: "user", label: "common.tab.profile" },
];

export function TabBar({ active }: { active?: TabId }) {
  const t = useT();
  const router = useRouter();
  const current = active ?? router.tab;
  return (
    <view className="tab-bar">
      {TABS.map((tab) => {
        const on = tab.id === current;
        return (
          <Pressable key={tab.id} className="tab-bar-item" haptic="selection" onTap={() => router.selectTab(tab.id)}>
            <Icon name={tab.icon} tone={on ? "ember" : "dim"} size={24} />
            <text className={`tab-bar-label${on ? " tab-bar-label-on" : ""}`}>{t(tab.label)}</text>
          </Pressable>
        );
      })}
    </view>
  );
}
