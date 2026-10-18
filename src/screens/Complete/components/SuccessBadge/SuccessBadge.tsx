import { Icon } from "@/components/Icon/Icon.tsx";

import "./SuccessBadge.css";

export function SuccessBadge() {
  return (
    <view className="success-badge">
      <view className="success-badge-halo2">
        <view className="success-badge-halo1">
          <view className="success-badge-core">
            <Icon name="check" tone="text" size={48} />
          </view>
        </view>
      </view>
    </view>
  );
}
