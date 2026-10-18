import { Icon } from "@/components/Icon/Icon.tsx";
import { LockBadge } from "@/components/LockBadge/LockBadge.tsx";

import "./StatusDot.css";

export type StatusDotState = "done" | "next" | "todo" | "locked";

export function StatusDot({ state }: { state: StatusDotState }) {
  if (state === "locked") return <LockBadge className="status-dot-gap" />;
  if (state === "done") {
    return (
      <view className="status-dot status-dot-done">
        <Icon name="check" tone="text" size={14} />
      </view>
    );
  }
  if (state === "next") {
    return (
      <view className="status-dot status-dot-next">
        <Icon name="play" tone="ink" size={14} />
      </view>
    );
  }
  return <view className="status-dot status-dot-todo" />;
}
