import "./Skeleton.css";

type SkeletonProps = {
  width?: number | string;
  height?: number | string;
  radius?: number;
  className?: string;
};

function px(v: number | string): string {
  return typeof v === "number" ? `${v}px` : v;
}

export function Skeleton({ width = "100%", height = 16, radius = 8, className = "" }: SkeletonProps) {
  return <view className={`skeleton ${className}`} style={{ width: px(width), height: px(height), borderRadius: `${radius}px` }} />;
}
