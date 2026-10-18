import { request, USE_MOCKS } from "@/api/client.ts";
import { respond } from "@/api/mock/respond.ts";
import type { Badge, Challenge, LeaderboardEntry, LeaderboardPage, LeaderboardScope } from "@/types/challenge.ts";

const DAY = 86_400_000;

export const MOCK_CHALLENGE: Challenge = {
  id: "oct-pushup-ladder",
  title: "October push-up ladder",
  art: { variant: "v1", figure: "pushup" },
  premium: false,
  startsAt: new Date(Date.now() - 19 * DAY).toISOString(),
  endsAt: new Date(Date.now() + 12 * DAY).toISOString(),
  goalReps: 1000,
  joined: true,
  myReps: 620,
};

const TOP: LeaderboardEntry[] = [
  { userId: "u_riya", rank: 1, name: "Riya V.", initials: "RV", tone: "warm", score: 1000, isMe: false },
  { userId: "u_dev", rank: 2, name: "Dev S.", initials: "DS", tone: "ember", score: 940, isMe: false },
  { userId: "u_meera", rank: 3, name: "Meera K.", initials: "MK", tone: "brown", score: 875, isMe: false },
];
const ME: LeaderboardEntry = { userId: "me", rank: 14, name: "You", initials: "AK", tone: "ember", score: 620, isMe: true };
const NAMES = ["Rohan P.", "Isha G.", "Karan M.", "Neha T.", "Aditya B.", "Zoya H.", "Varun L.", "Anaya R."];
const TONES = ["ember", "warm", "brown"] as const;

function filler(from: number, count: number): LeaderboardEntry[] {
  return Array.from({ length: count }, (_, i) => {
    const rank = from + i;
    const name = NAMES[rank % NAMES.length];
    return {
      userId: `u_${rank}`,
      rank,
      name,
      initials: name.split(" ").map((p) => p[0]).join(""),
      tone: TONES[rank % 3],
      score: Math.max(0, 870 - rank * 18),
      isMe: rank === ME.rank,
    };
  });
}

export async function getCurrentChallenge(): Promise<Challenge | null> {
  if (!USE_MOCKS) return request("/challenges/current");
  return respond(MOCK_CHALLENGE);
}

export async function getLeaderboard(challengeId: string, scope: LeaderboardScope, cursor?: string): Promise<LeaderboardPage> {
  if (!USE_MOCKS) return request(`/challenges/${challengeId}/leaderboard?scope=${scope}${cursor ? `&cursor=${cursor}` : ""}`);
  if (scope === "friends") return respond({ entries: [], me: ME });
  const page = cursor ? Number(cursor) : 0;
  const entries = page === 0 ? [...TOP, ...filler(4, 17)] : filler(page * 20 + 1, 20);
  return respond({ entries, me: ME, nextCursor: page < 24 ? String(page + 1) : undefined });
}

export async function getBadges(): Promise<Badge[]> {
  if (!USE_MOCKS) return request("/badges");
  return respond([
    { id: "first-workout", name: "First workout", icon: "check", earned: true },
    { id: "streak-7", name: "7-day streak", icon: "flame", earned: false },
    { id: "pr-hunter", name: "PR hunter", icon: "trophy", earned: true },
  ]);
}

export async function getUpcomingChallenges(): Promise<Challenge[]> {
  if (!USE_MOCKS) return request("/challenges/upcoming");
  return respond([
    {
      id: "core-21-priya",
      title: "21-day core with Coach Priya",
      art: { variant: "dark", figure: "stretch" },
      coachId: "priya",
      premium: true,
      startsAt: new Date(Date.now() + 3 * DAY).toISOString(),
      endsAt: new Date(Date.now() + 24 * DAY).toISOString(),
      goalReps: 0,
      joined: false,
      myReps: 0,
    },
  ]);
}

export async function joinChallenge(id: string): Promise<{ ok: true }> {
  if (!USE_MOCKS) return request(`/challenges/${id}/join`, { method: "POST" });
  return respond({ ok: true as const });
}
