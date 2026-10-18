import { Skeleton } from "@/components/Skeleton/Skeleton.tsx";

import "./ProgressSkeleton.css";

type GhostProps = { textClass: string; sample: string; className?: string };

function GhostLine({ textClass, sample, className = "" }: GhostProps) {
  return (
    <view className={`psk-ghost ${className}`}>
      <text className={`${textClass} psk-ghost-text`}>{sample}</text>
      <Skeleton width="100%" height="100%" radius={6} className="psk-ghost-fill" />
    </view>
  );
}

type StatSkeletonProps = { label: string; className?: string };

export function StatCardSkeleton({ label, className = "" }: StatSkeletonProps) {
  return (
    <view className={`stat-card ${className}`}>
      <view className="stat-card-head">
        <text className="stat-card-label">{label}</text>
      </view>
      <view className="stat-card-value-row">
        <GhostLine textClass="stat-card-value" sample="00" className="psk-stat-value" />
      </view>
    </view>
  );
}

const BAR_HEIGHTS = ["45%", "70%", "30%", "85%", "55%", "40%", "65%"];

export function BarChartSkeleton({ height, className = "" }: { height: number; className?: string }) {
  return (
    <view className={`bar-chart ${className}`}>
      <view className="bar-chart-plot" style={{ height: `${height}px` }}>
        {BAR_HEIGHTS.map((h, i) => (
          <view key={i} className="bar-chart-col">
            <Skeleton width="100%" height={h} radius={8} />
          </view>
        ))}
      </view>
      <view className="bar-chart-labels">
        {BAR_HEIGHTS.map((_, i) => (
          <text key={i} className="bar-chart-label psk-ghost-text">
            M
          </text>
        ))}
      </view>
    </view>
  );
}

export function RecordRowSkeleton({ className = "" }: { className?: string }) {
  return (
    <view className={`list-row ${className}`}>
      <view className="list-row-body">
        <GhostLine textClass="list-row-title" sample="Bench press" className="psk-record-title" />
      </view>
      <GhostLine textClass="list-row-title" sample="60 kg × 8" className="psk-record-value" />
    </view>
  );
}

export function HeatmapSkeleton({ count }: { count: number }) {
  return (
    <view className="heatmap">
      {Array.from({ length: count }, (_, i) => (
        <view key={i} className="heatmap-col">
          <Skeleton width={36} height={32} radius={8} />
          <text className="heatmap-label psk-ghost-text">Core</text>
        </view>
      ))}
    </view>
  );
}

export function EmptyRecordsSkeleton({ text }: { text: string }) {
  return (
    <view className="progress-card progress-empty">
      <GhostLine textClass="psk-empty-text" sample={text} className="psk-empty-line" />
      <Skeleton width={120} height={36} radius={12} />
    </view>
  );
}
