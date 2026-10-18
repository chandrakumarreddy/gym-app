import "./Heatmap.css";

export type HeatCell = { key: string; level: 0 | 1 | 2 | 3; label?: string };

type HeatmapProps = { cells: HeatCell[] };

export function Heatmap({ cells }: HeatmapProps) {
  return (
    <view className="heatmap">
      {cells.map((c) => (
        <view key={c.key} className="heatmap-col">
          <view className={`heatmap-cell heatmap-l${c.level}`} />
          {c.label ? <text className="heatmap-label">{c.label}</text> : null}
        </view>
      ))}
    </view>
  );
}
