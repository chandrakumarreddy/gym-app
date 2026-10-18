import { request, USE_MOCKS } from "@/api/client.ts";
import { coachRef, PROGRAMS, TODAY_SESSION_ID } from "@/api/mock/content.ts";
import { respond } from "@/api/mock/respond.ts";
import type { HomeFeed } from "@/types/content.ts";

export const MOCK_HOME: HomeFeed = {
  user: { name: "Aarav", initials: "AK" },
  streakDays: 5,
  weekDays: [
    { label: "M", done: true, today: false },
    { label: "T", done: true, today: false },
    { label: "W", done: false, today: true },
    { label: "T", done: false, today: false },
    { label: "F", done: false, today: false },
    { label: "S", done: false, today: false },
    { label: "S", done: false, today: false },
  ],
  today: {
    sessionId: TODAY_SESSION_ID,
    programId: "strength-builder",
    title: "Lower Hypertrophy",
    eyebrow: "WEEK 1 · DAY 3",
    durationMin: 45,
    exerciseCount: 6,
    coach: coachRef("arjun"),
    art: { variant: "v4", figure: "lunge" },
  },
  continueWatching: [
    { sessionId: "strength-builder-w1d2", title: "Upper Push", caption: "12 min left", progress: 0.6, art: { variant: "v3", figure: "pushup" } },
    { sessionId: "lean-in-30-w1d1", title: "Lean in 30 · Day 1", caption: "Preview", progress: 0.2, art: { variant: "v2", figure: "jump" } },
  ],
  recommended: PROGRAMS.slice(1),
};

export async function getHome(): Promise<HomeFeed> {
  if (!USE_MOCKS) return request<HomeFeed>("/home");
  return respond(MOCK_HOME);
}
