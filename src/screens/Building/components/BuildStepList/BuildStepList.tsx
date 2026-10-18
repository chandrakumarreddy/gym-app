import { Icon } from "@/components/Icon/Icon.tsx";
import type { BuildStep } from "@/types/plan.ts";

import "./BuildStepList.css";

type BuildStepListProps = { steps: BuildStep[] };

export function BuildStepList({ steps }: BuildStepListProps) {
  return (
    <view className="step-card">
      {steps.map((s, i) => (
        <view key={s.id} className={`step-row${i > 0 ? " step-row-gap" : ""}`}>
          <view className={`step-dot step-dot-${s.status}`}>{s.status === "done" ? <Icon name="check" tone="text" size={14} /> : null}</view>
          <text className={`step-label${s.status === "pending" ? " step-label-pending" : ""}`}>{s.label}</text>
        </view>
      ))}
    </view>
  );
}
