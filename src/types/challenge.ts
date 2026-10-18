import type { ArtSpec } from "@/types/art.ts";
import type { AvatarTone } from "@/types/content.ts";

export type Challenge = {
  id: string;
  title: string;
  art: ArtSpec;
  coachId?: string;
  premium: boolean;
  startsAt: string;
  endsAt: string;
  goalReps: number;
  joined: boolean;
  myReps: number;
};

export type LeaderboardEntry = {
  userId: string;
  rank: number;
  name: string;
  initials: string;
  tone: AvatarTone;
  score: number;
  isMe: boolean;
};

export type LeaderboardPage = { entries: LeaderboardEntry[]; me: LeaderboardEntry; nextCursor?: string };
export type LeaderboardScope = "global" | "friends";
export type ChallengeTab = "leaderboard" | "friends" | "badges";

export type Badge = { id: string; name: string; icon: string; earned: boolean };
