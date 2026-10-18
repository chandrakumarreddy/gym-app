import { Button } from "@/components/Button/Button.tsx";
import { IconButton } from "@/components/IconButton/IconButton.tsx";
import { Skeleton } from "@/components/Skeleton/Skeleton.tsx";
import { TextSkeleton } from "@/components/TextSkeleton/TextSkeleton.tsx";

import "./RestLogSkeleton.css";

type RestLogSkeletonProps = {
  effortQ: string;
  saveLabel: string;
  onCollapse: () => void;
};

function StepperSkeleton() {
  return (
    <view className="stepper">
      <TextSkeleton textClass="stepper-label" sample="Weight" width="45%" />
      <view className="stepper-row">
        <Skeleton width={40} height={40} radius={12} />
        <view className="stepper-value-wrap">
          <TextSkeleton textClass="stepper-value" sample="00.0" align="center" />
        </view>
        <Skeleton width={40} height={40} radius={12} />
      </view>
    </view>
  );
}

export function RestLogSkeleton({ effortQ, saveLabel, onCollapse }: RestLogSkeletonProps) {
  return (
    <view className="restlog">
      <view className="restlog-header">
        <IconButton icon="chev-d" onTap={onCollapse} />
        <view className="restlog-sk-subtitle">
          <TextSkeleton textClass="restlog-subtitle" sample="Exercise · Set 1 of 3" width="60%" align="center" />
        </view>
        <IconButton icon="more" disabled />
      </view>
      <scroll-view className="restlog-scroll" scroll-orientation="vertical">
        <view className="restlog-ring">
          <Skeleton width={200} height={200} radius={100} />
        </view>
        <view className="restlog-chips">
          <Skeleton width={96} height={40} radius={20} />
          <Skeleton width={84} height={40} radius={20} className="restlog-chip-gap" />
        </view>
        <view className="restlog-card">
          <view className="restlog-card-head">
            <TextSkeleton textClass="restlog-card-title" sample="Log set 1" width={96} />
          </view>
          <view className="restlog-steppers">
            <StepperSkeleton />
            <view className="restlog-stepper-gap" />
            <StepperSkeleton />
          </view>
          <text className="restlog-effort-q">{effortQ}</text>
          <view className="restlog-efforts">
            <Skeleton width={72} height={40} radius={20} className="restlog-effort" />
            <Skeleton width={104} height={40} radius={20} className="restlog-effort" />
            <Skeleton width={72} height={40} radius={20} className="restlog-effort" />
            <Skeleton width={68} height={40} radius={20} className="restlog-effort" />
          </view>
        </view>
      </scroll-view>
      <view className="restlog-footer">
        <view className="restlog-fade" />
        <Button label={saveLabel} fullWidth disabled />
      </view>
    </view>
  );
}

export function StepperValueSkeleton() {
  return (
    <view className="restlog-sk-stepper-value">
      <Skeleton width={56} height={26} radius={6} />
    </view>
  );
}

export function LastTimeSkeleton() {
  return <Skeleton width={128} height={14} radius={7} />;
}

export function CoachTipSkeleton() {
  return (
    <view className="coach-tip">
      <Skeleton width={14} height={14} radius={7} />
      <view className="restlog-sk-tip">
        <TextSkeleton textClass="coach-tip-text" sample="Go 12.5 kg × 12 on set 2" width="80%" />
      </view>
    </view>
  );
}
