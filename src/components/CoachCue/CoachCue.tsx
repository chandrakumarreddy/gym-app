import { Avatar } from "@/components/Avatar/Avatar.tsx";
import type { AvatarTone } from "@/types/content.ts";

import "./CoachCue.css";

type CoachCueProps = {
  initials: string;
  text: string;
  tone?: AvatarTone;
  speaking?: boolean;
  visible?: boolean;
  className?: string;
};

export function CoachCue({ initials, text, tone = "ember", speaking, visible = true, className = "" }: CoachCueProps) {
  return (
    <view className={`coach-cue${visible ? "" : " coach-cue-hidden"} ${className}`}>
      <Avatar initials={initials} tone={tone} size={28} ring={speaking} />
      <text className="coach-cue-text">{text}</text>
    </view>
  );
}
