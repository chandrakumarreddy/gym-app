import { request, USE_MOCKS } from "@/api/client.ts";
import { coachRef } from "@/api/mock/content.ts";
import { respond } from "@/api/mock/respond.ts";
import type { Plan, PlanWeek } from "@/types/plan.ts";
import type { QuizAnswers, SessionMinutes, Weekday } from "@/types/quiz.ts";

const TITLES: Record<NonNullable<QuizAnswers["goal"]>, string> = {
  build_muscle: "Muscle Builder",
  lose_fat: "Lean & Strong",
  get_stronger: "Strength Builder",
  move_better: "Move Better",
};

const SESSIONS = ["Lower Body Strength", "Upper Push", "Lower Hypertrophy", "Upper Pull", "Full Body", "Conditioning", "Mobility"];

const plans = new Map<string, Plan>();

export function buildMockPlan(answers: QuizAnswers): Plan {
  const id = `plan_${Date.now()}`;
  const days: Weekday[] = answers.days.length ? answers.days : [0, 2, 4, 5];
  const sessionMin: SessionMinutes = answers.sessionMin;
  const weeks: PlanWeek[] = Array.from({ length: 8 }, (_, w) => ({
    index: w + 1,
    free: w === 0,
    sessions: days.map((day, i) => ({
      id: `${id}-w${w + 1}d${i + 1}`,
      title: SESSIONS[i % SESSIONS.length],
      day,
      durationMin: sessionMin,
      workoutId: `strength-builder-w${w + 1}d${(i % 4) + 1}`,
    })),
  }));
  return {
    id,
    title: TITLES[answers.goal ?? "get_stronger"],
    totalWeeks: 8,
    sessionsPerWeek: days.length,
    sessionMin,
    coach: { ...coachRef("arjun"), tone: "ember" },
    weeks,
    createdAt: Date.now(),
    synced: false,
  };
}

export async function generatePlan(answers: QuizAnswers): Promise<Plan> {
  if (!USE_MOCKS) return request<Plan>("/plans/generate", { method: "POST", body: JSON.stringify(answers) });
  const plan = buildMockPlan(answers);
  plans.set(plan.id, plan);
  return respond(plan, 1200);
}

export async function getPlan(id: string): Promise<Plan | null> {
  if (!USE_MOCKS) return request<Plan>(`/plans/${id}`);
  return respond(plans.get(id) ?? null);
}

export async function claimPlan(planId: string, userId: string): Promise<Plan | null> {
  if (!USE_MOCKS) return request<Plan>(`/plans/${planId}/claim`, { method: "POST", body: JSON.stringify({ userId }) });
  const plan = plans.get(planId);
  if (plan) plans.set(planId, { ...plan, synced: true });
  return respond(plans.get(planId) ?? null);
}

export async function uploadPlan(plan: Plan): Promise<Plan> {
  if (!USE_MOCKS) return request<Plan>("/plans", { method: "POST", body: JSON.stringify(plan) });
  const synced = { ...plan, synced: true };
  plans.set(plan.id, synced);
  return respond(synced);
}
