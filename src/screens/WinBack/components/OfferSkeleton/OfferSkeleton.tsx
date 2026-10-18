import { Skeleton } from "@/components/Skeleton/Skeleton.tsx";

import "./OfferSkeleton.css";

export function OfferSkeleton() {
  return (
    <view className="offer-sk">
      <Skeleton width={110} height={24} radius={12} />
      <Skeleton width={170} height={56} radius={10} className="offer-sk-big" />
      <Skeleton width={140} height={21} radius={6} className="offer-sk-line" />
      <Skeleton width={210} height={16} radius={6} className="offer-sk-line" />
    </view>
  );
}
