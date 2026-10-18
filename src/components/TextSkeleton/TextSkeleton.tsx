import { Skeleton } from "@/components/Skeleton/Skeleton.tsx";

import "./TextSkeleton.css";

type TextSkeletonProps = {
  textClass: string;
  sample: string;
  width?: number | string;
  align?: "start" | "center" | "end";
  radius?: number;
  className?: string;
};

export function TextSkeleton({ textClass, sample, width = "100%", align = "start", radius = 6, className = "" }: TextSkeletonProps) {
  return (
    <view className={`text-skeleton ${className}`}>
      <text className={`${textClass} text-skeleton-ghost`} text-maxline="1">
        {sample}
      </text>
      <view className={`text-skeleton-fill text-skeleton-${align}`}>
        <Skeleton width={width} height="70%" radius={radius} />
      </view>
    </view>
  );
}
