import { Skeleton } from "@/components/Skeleton/Skeleton.tsx";

import "./PaywallSkeleton.css";

const STEPS = [0, 1, 2];
const OPTIONS = [0, 1];

type PaywallSkeletonProps = { timeline: boolean };

export function PaywallSkeleton({ timeline }: PaywallSkeletonProps) {
  return (
    <view>
      {timeline ? (
        <view className="pws-card">
          {STEPS.map((i) => (
            <view key={i} className="pws-step">
              <Skeleton width={28} height={28} radius={14} className="pws-dot" />
              <view className="pws-step-body">
                <Skeleton width={110} height={18} radius={6} />
                <Skeleton width={180} height={16} radius={6} className="pws-gap" />
              </view>
            </view>
          ))}
        </view>
      ) : null}
      <view className="pws-plans">
        {OPTIONS.map((i) => (
          <view key={i} className="pws-option">
            <Skeleton width={22} height={22} radius={11} className="pws-radio" />
            <view className="pws-option-body">
              <Skeleton width={90} height={19} radius={6} />
              <Skeleton width={150} height={15} radius={6} className="pws-gap" />
            </view>
            <view className="pws-price-col">
              <Skeleton width={56} height={20} radius={6} />
              <Skeleton width={44} height={15} radius={6} className="pws-gap" />
            </view>
          </view>
        ))}
      </view>
    </view>
  );
}
