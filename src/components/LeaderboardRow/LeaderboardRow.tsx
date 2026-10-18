import { Avatar } from "@/components/Avatar/Avatar.tsx";
import type { AvatarTone } from "@/types/content.ts";

import "./LeaderboardRow.css";

type LeaderboardRowProps = {
  rank: number;
  initials: string;
  avatarTone?: AvatarTone;
  name: string;
  scoreLabel: string;
  isMe?: boolean;
};

export function LeaderboardRow({ rank, initials, avatarTone = "brown", name, scoreLabel, isMe }: LeaderboardRowProps) {
  return (
    <view className={`lb-row${isMe ? " lb-row-me" : ""}`}>
      <text className={`lb-rank${rank === 1 && !isMe ? " lb-rank-top" : ""}`}>{rank}</text>
      <Avatar initials={initials} tone={avatarTone} size={36} />
      <text className="lb-name">{name}</text>
      <text className="lb-score">{scoreLabel}</text>
    </view>
  );
}
