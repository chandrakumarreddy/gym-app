import { Skeleton } from "@/components/Skeleton/Skeleton.tsx";
import { TextSkeleton } from "@/components/TextSkeleton/TextSkeleton.tsx";

import "./PackListSkeleton.css";

const ROWS = [{ subtitle: false }, { subtitle: true }, { subtitle: true }];

type PackListSkeletonProps = { showOriginal: boolean };

export function PackListSkeleton({ showOriginal }: PackListSkeletonProps) {
  return (
    <view className="pack-list">
      {ROWS.map((r, i) => (
        <view key={i} className="pack pack-sk">
          <Skeleton width={22} height={22} radius={11} className="pack-sk-radio" />
          <view className="pack-body">
            <TextSkeleton textClass="pack-title" sample="10 reviews" width="45%" />
            {r.subtitle ? <TextSkeleton textClass="pack-subtitle" sample="₹000 each" width="35%" /> : null}
          </view>
          <view className="pack-price-col">
            <TextSkeleton textClass="pack-price" sample="₹0,000" align="end" />
            {showOriginal ? <TextSkeleton textClass="pack-original" sample="₹0,000" align="end" /> : null}
          </view>
        </view>
      ))}
    </view>
  );
}
