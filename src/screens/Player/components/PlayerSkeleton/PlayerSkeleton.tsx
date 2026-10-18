import { Button } from "@/components/Button/Button.tsx";
import { Icon } from "@/components/Icon/Icon.tsx";
import { IconButton } from "@/components/IconButton/IconButton.tsx";
import { Skeleton } from "@/components/Skeleton/Skeleton.tsx";
import { TextSkeleton } from "@/components/TextSkeleton/TextSkeleton.tsx";

import "./PlayerSkeleton.css";

type PlayerSkeletonProps = {
  setTimeLabel: string;
  error?: { text: string; retryLabel: string; onRetry: () => void };
  onCollapse: () => void;
};

export function PlayerSkeleton({ setTimeLabel, error, onCollapse }: PlayerSkeletonProps) {
  return (
    <view className="player">
      <view className="player-stage">
        <view className="player-scrim-top" />
        <view className="player-scrim-bottom" />
        <view className="player-top">
          <IconButton icon="chev-d" variant="glass" onTap={onCollapse} />
          <view className="player-sk-title">
            {error ? null : <TextSkeleton textClass="player-title" sample="Workout title" width="56%" align="center" />}
          </view>
          {error ? <view className="player-sk-icon" /> : <Skeleton width={40} height={40} radius={20} />}
        </view>
        {error ? null : (
          <>
            <view className="player-settime">
              <TextSkeleton textClass="player-settime-value" sample="00:00" align="end" />
              <text className="player-settime-cap">{setTimeLabel}</text>
            </view>
            <view className="player-info">
              <view className="player-info-row">
                <view className="player-info-main">
                  <TextSkeleton textClass="player-info-cap" sample="Exercise 1 of 6" width="40%" />
                  <TextSkeleton textClass="player-info-name" sample="Exercise name" width="70%" />
                </view>
                <view className="player-info-reps">
                  <TextSkeleton textClass="player-info-reps-value" sample="10–12" align="end" />
                  <TextSkeleton textClass="player-info-cap" sample="reps" align="end" />
                </view>
              </view>
              <view className="scrubber">
                <view className="scrubber-hit">
                  <view className="scrubber-track" />
                </view>
                <view className="scrubber-times">
                  <TextSkeleton textClass="scrubber-time" sample="0:00" />
                  <TextSkeleton textClass="scrubber-time" sample="1:30" />
                </view>
              </view>
            </view>
          </>
        )}
      </view>
      {error ? (
        <view className="player-sk-error">
          <text className="player-sk-error-text">{error.text}</text>
          <Button label={error.retryLabel} variant="ghost" sm onTap={error.onRetry} />
        </view>
      ) : (
        <view className="player-body">
          <view className="player-set-row">
            <TextSkeleton textClass="player-set-label" sample="Set 1 of 3" />
            <Skeleton width={74} height={6} radius={3} />
          </view>
          <view className="player-controls-wrap">
            <view className="player-controls">
              <Skeleton width={52} height={40} radius={12} />
              <view className="player-controls-btn">
                <Skeleton width={26} height={26} radius={13} />
              </view>
              <Skeleton width={72} height={72} radius={36} />
              <view className="player-controls-btn">
                <Skeleton width={26} height={26} radius={13} />
              </view>
              <Skeleton width={52} height={40} radius={12} />
            </view>
          </view>
          <view className="up-next">
            <Skeleton width={52} height={52} radius={14} />
            <view className="up-next-body">
              <TextSkeleton textClass="up-next-eyebrow" sample="Up next · rest 60s" width="50%" />
              <TextSkeleton textClass="up-next-title" sample="Exercise name" width="75%" />
            </view>
            <Icon name="chev-r" tone="muted" size={20} />
          </view>
        </view>
      )}
    </view>
  );
}
