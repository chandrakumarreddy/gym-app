import { Skeleton } from "@/components/Skeleton/Skeleton.tsx";

import "./CountdownSkeleton.css";

const BOXES = [0, 1, 2];

export function CountdownSkeleton() {
  return (
    <view className="cd-sk">
      {BOXES.map((i) => (
        <Skeleton key={i} width={76} height={69} radius={14} className={i > 0 ? "cd-sk-gap" : ""} />
      ))}
    </view>
  );
}
