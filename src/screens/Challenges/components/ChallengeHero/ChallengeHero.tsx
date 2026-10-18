import { Art } from "@/components/Art/Art.tsx";
import { Button } from "@/components/Button/Button.tsx";
import { Countdown } from "@/components/Countdown/Countdown.tsx";
import { Icon } from "@/components/Icon/Icon.tsx";
import { Pressable } from "@/components/Pressable/Pressable.tsx";
import type { ArtSpec } from "@/types/art.ts";

import "./ChallengeHero.css";

type ChallengeHeroProps = {
  art: ArtSpec;
  title: string;
  joined: boolean;
  joinedLabel: string;
  endsAt: number;
  progressLabel: string;
  percentLabel: string;
  meterWidth: string;
  joinLabel: string;
  joining: boolean;
  onJoin: () => void;
  onTap?: () => void;
};

export function ChallengeHero(p: ChallengeHeroProps) {
  return (
    <Pressable className="ch-hero" onTap={p.onTap}>
      <Art spec={p.art} fill figureScale={0.75} className="ch-hero-art" />
      <view className="ch-hero-fade" />
      <view className="ch-hero-top">
        {p.joined ? (
          <view className="ch-pill ch-pill-ember">
            <text className="ch-pill-label">{p.joinedLabel}</text>
          </view>
        ) : (
          <view />
        )}
        <view className="ch-pill ch-pill-glass">
          <Icon name="clock" tone="text" size={14} />
          <Countdown endsAt={p.endsAt} mode="days" className="ch-pill-label ch-pill-gap" />
        </view>
      </view>
      <view className="ch-hero-bottom">
        <text className="ch-hero-title">{p.title}</text>
        {p.joined ? (
          <view>
            <view className="ch-hero-row">
              <text className="ch-hero-meta">{p.progressLabel}</text>
              <text className="ch-hero-meta">{p.percentLabel}</text>
            </view>
            <view className="ch-meter">
              <view className="ch-meter-fill" style={{ width: p.meterWidth }} />
            </view>
          </view>
        ) : (
          <Button label={p.joinLabel} loading={p.joining} size="sm" className="ch-hero-join" onTap={p.onJoin} />
        )}
      </view>
    </Pressable>
  );
}
