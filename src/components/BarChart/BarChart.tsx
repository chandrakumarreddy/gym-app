import type { BarVM } from "@/types/progress.ts";

import "./BarChart.css";

type BarChartProps = {
  bars: BarVM[];
  height?: number;
  className?: string;
};

export function BarChart({ bars, height = 140, className = "" }: BarChartProps) {
  return (
    <view className={`bar-chart ${className}`}>
      <view className="bar-chart-plot" style={{ height: `${height}px` }}>
        {bars.map((b, i) => (
          <view key={i} className="bar-chart-col">
            <view className={`bar-chart-bar${b.active ? " bar-chart-bar-active" : ""}`} style={{ height: `${b.heightPct}%` }} />
          </view>
        ))}
      </view>
      <view className="bar-chart-labels">
        {bars.map((b, i) => (
          <text key={i} className={`bar-chart-label${b.active ? " bar-chart-label-active" : ""}`}>
            {b.label}
          </text>
        ))}
      </view>
    </view>
  );
}
