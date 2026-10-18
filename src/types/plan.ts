import type { CoachRef } from "@/types/content.ts";
import type { Weekday } from "@/types/quiz.ts";

export type PlanSession = {
  id: string;
  title: string;
  day: Weekday;
  durationMin: number;
  workoutId: string;
};

export type PlanWeek = { index: number; free: boolean; sessions: PlanSession[] };

export type Plan = {
  id: string;
  title: string;
  totalWeeks: number;
  sessionsPerWeek: number;
  sessionMin: number;
  coach: CoachRef & { tone: "ember" | "warm" | "brown" };
  weeks: PlanWeek[];
  createdAt: number;
  synced?: boolean;
};

export type BuildStep = {
  id: "goal" | "schedule" | "limits" | "coach";
  label: string;
  status: "done" | "active" | "pending";
};
