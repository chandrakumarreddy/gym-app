import { haptic } from "@/api/haptics.ts";
import { Skeleton } from "@/components/Skeleton/Skeleton.tsx";

import "./PaywallFooterLinks.css";

type PaywallFooterLinksProps = {
  restoreLabel: string;
  middle: string;
  middleLoading?: boolean;
  legal: string;
  restoring?: boolean;
  onRestore?: () => void;
};

export function PaywallFooterLinks({ restoreLabel, middle, middleLoading, legal, restoring, onRestore }: PaywallFooterLinksProps) {
  return (
    <view className="pw-links">
      <text className={`pw-link${restoring ? " pw-link-busy" : ""}`} bindtap={
          restoring
            ? undefined
            : () => {
                haptic();
                onRestore?.();
              }
        }>
        {restoreLabel}
      </text>
      {middleLoading ? <Skeleton width={90} height={13} radius={4} /> : <text className="pw-link">{middle}</text>}
      <text className="pw-link">{legal}</text>
    </view>
  );
}
