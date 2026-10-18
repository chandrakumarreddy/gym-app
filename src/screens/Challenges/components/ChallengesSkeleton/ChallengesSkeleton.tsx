import { Skeleton } from "@/components/Skeleton/Skeleton.tsx";

import "./ChallengesSkeleton.css";

export function LeaderboardRowSkeleton() {
  return (
    <view className="cks-lb-row">
      <view className="cks-lb-rank">
        <Skeleton width={16} height={14} radius={4} />
      </view>
      <Skeleton width={36} height={36} radius={18} />
      <view className="cks-lb-name">
        <Skeleton width={110} height={14} radius={6} />
      </view>
      <Skeleton width={40} height={16} radius={6} />
    </view>
  );
}

export function BadgeRowSkeleton() {
  return (
    <view className="cks-badge-row">
      <Skeleton width={40} height={40} radius={12} />
      <view className="cks-badge-body">
        <Skeleton width={120} height={14} radius={6} />
      </view>
      <Skeleton width={56} height={14} radius={6} />
    </view>
  );
}

export function PremiumCardSkeleton() {
  return (
    <view className="cks-pro-card">
      <Skeleton width={56} height={56} radius={14} />
      <view className="cks-pro-body">
        <Skeleton width="80%" height={14} radius={6} />
        <Skeleton width="50%" height={12} radius={6} className="cks-pro-caption" />
      </view>
      <Skeleton width={44} height={28} radius={10} />
    </view>
  );
}
