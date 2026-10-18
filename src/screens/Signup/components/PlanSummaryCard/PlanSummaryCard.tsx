import { Art } from "@/components/Art/Art.tsx";
import { Icon } from "@/components/Icon/Icon.tsx";
import type { ArtSpec } from "@/types/art.ts";

import "./PlanSummaryCard.css";

type PlanSummaryCardProps = { art: ArtSpec; title: string; meta: string; done?: boolean };

export function PlanSummaryCard({ art, title, meta, done }: PlanSummaryCardProps) {
  return (
    <view className="plan-summary">
      <Art spec={art} size={64} radius={14} figureScale={0.8} />
      <view className="plan-summary-body">
        <text className="plan-summary-title" text-maxline="1">
          {title}
        </text>
        <text className="plan-summary-meta">{meta}</text>
      </view>
      {done ? (
        <view className="plan-summary-check">
          <Icon name="check" tone="text" size={14} />
        </view>
      ) : null}
    </view>
  );
}
