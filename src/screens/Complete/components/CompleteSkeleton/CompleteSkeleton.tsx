import { Icon } from "@/components/Icon/Icon.tsx";
import { Skeleton } from "@/components/Skeleton/Skeleton.tsx";
import { TextSkeleton } from "@/components/TextSkeleton/TextSkeleton.tsx";

import "./CompleteSkeleton.css";

type StatSkeletonProps = { label: string; sample: string; flame?: boolean };

function StatSkeleton({ label, sample, flame }: StatSkeletonProps) {
  return (
    <view className="stat-card">
      <view className="stat-card-head">
        {flame ? <Icon name="flame" tone="ember" size={16} className="stat-card-icon" /> : null}
        <text className="stat-card-label">{label}</text>
      </view>
      <view className="stat-card-value-row">
        <TextSkeleton textClass="stat-card-value" sample={sample} width={72} />
      </view>
    </view>
  );
}

type StatsSkeletonProps = {
  labels: { time: string; volume: string; sets: string; streak: string };
};

export function StatsSkeleton({ labels }: StatsSkeletonProps) {
  return (
    <>
      <view className="complete-grid">
        <StatSkeleton label={labels.time} sample="00:00" />
        <view className="complete-gap" />
        <StatSkeleton label={labels.volume} sample="0,000" />
      </view>
      <view className="complete-grid complete-grid-2">
        <StatSkeleton label={labels.sets} sample="00/00" />
        <view className="complete-gap" />
        <StatSkeleton label={labels.streak} sample="0 days" flame />
      </view>
    </>
  );
}

export function MetaSkeleton() {
  return <TextSkeleton textClass="complete-meta" sample="Workout · Week 1 · Day 1" width="64%" align="center" />;
}

export function PrCardSkeleton() {
  return (
    <view className="pr-card complete-sk-pr">
      <Skeleton width={24} height={24} radius={12} />
      <view className="pr-card-body">
        <TextSkeleton textClass="pr-card-title" sample="New personal record" width="50%" />
        <TextSkeleton textClass="pr-card-sub" sample="Exercise · 00 kg × 00" width="70%" />
      </view>
    </view>
  );
}
