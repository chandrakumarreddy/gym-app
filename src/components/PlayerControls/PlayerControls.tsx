import { Icon } from "@/components/Icon/Icon.tsx";
import { LockBadge } from "@/components/LockBadge/LockBadge.tsx";
import { Pressable } from "@/components/Pressable/Pressable.tsx";

import "./PlayerControls.css";

type PlayerControlsProps = {
  playing: boolean;
  speedLabel: string;
  captionsOn: boolean;
  speedLocked?: boolean;
  onSpeed: () => void;
  onPrev: () => void;
  onToggle: () => void;
  onNext: () => void;
  onCaptions: () => void;
};

export function PlayerControls({ playing, speedLabel, captionsOn, speedLocked, onSpeed, onPrev, onToggle, onNext, onCaptions }: PlayerControlsProps) {
  return (
    <view className="player-controls">
      <Pressable className="player-controls-side" feedback="scale" onTap={onSpeed}>
        <text className="player-controls-speed">{speedLabel}</text>
        {speedLocked ? <LockBadge variant="inline" size={12} /> : null}
      </Pressable>
      <Pressable className="player-controls-btn" feedback="scale" onTap={onPrev}>
        <Icon name="prev" size={26} />
      </Pressable>
      <Pressable className="player-controls-play" feedback="scale" onTap={onToggle}>
        <Icon name={playing ? "pause" : "play"} tone="ink" size={28} />
      </Pressable>
      <Pressable className="player-controls-btn" feedback="scale" onTap={onNext}>
        <Icon name="next" size={26} />
      </Pressable>
      <Pressable className={`player-controls-side${captionsOn ? " player-controls-side-on" : ""}`} feedback="scale" onTap={onCaptions}>
        <Icon name="cc" tone={captionsOn ? "text" : "muted"} size={22} />
      </Pressable>
    </view>
  );
}
