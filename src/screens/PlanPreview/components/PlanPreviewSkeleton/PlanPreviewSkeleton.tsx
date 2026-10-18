import { Skeleton } from "@/components/Skeleton/Skeleton.tsx";

import "./PlanPreviewSkeleton.css";

const META = [70, 64, 56];
type PlanPreviewSkeletonProps = {
  premium: boolean;
  rows: number;
  locked: boolean;
};

export function PlanPreviewSkeleton({ premium, rows, locked }: PlanPreviewSkeletonProps) {
  return (
    <view className="pps">
      <Skeleton width={120} height={13} radius={4} />
      <Skeleton width={240} height={36} className="pps-title" />
      <view className="pps-meta">
        {META.map((w) => (
          <Skeleton key={w} width={w} height={16} radius={6} className="pps-meta-item" />
        ))}
      </view>
      <Skeleton height={190} radius={16} className="pps-hero" />
      <view className="pps-week-head">
        <Skeleton width={110} height={21} radius={6} />
        {premium ? null : <Skeleton width={48} height={24} radius={12} />}
      </view>
      <view className="pps-sessions">
        {Array.from({ length: rows }, (_, i) => (
          <view key={i} className="pps-row">
            <Skeleton width={24} height={24} radius={12} className="pps-dot" />
            <view className="pps-row-body">
              <Skeleton width={160} height={18} radius={6} />
              <Skeleton width={100} height={16} radius={6} className="pps-row-sub" />
            </view>
          </view>
        ))}
      </view>
      {premium || !locked ? null : <Skeleton height={73} radius={22} className="pps-locked" />}
    </view>
  );
}
