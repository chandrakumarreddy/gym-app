import { request, USE_MOCKS } from "@/api/client.ts";
import { mockSession } from "@/api/mock/content.ts";
import { respond } from "@/api/mock/respond.ts";
import type { Session } from "@/types/content.ts";
import type { CompleteSessionResponse, Feel, PersonalRecord, SetLog } from "@/types/session.ts";

const LAST_LOGS: Record<string, Omit<SetLog, "exerciseId" | "setIndex">> = {
  "reverse-lunge": { weightKg: 10, reps: 8, effort: "just_right", loggedAt: Date.now() - 4 * 86_400_000, synced: true },
  "romanian-deadlift": { weightKg: 35, reps: 10, effort: "hard", loggedAt: Date.now() - 4 * 86_400_000, synced: true },
};

const PRS: PersonalRecord[] = [
  { exerciseId: "romanian-deadlift", exerciseName: "Romanian deadlift", weightKg: 35, reps: 10, achievedAt: Date.now() - 4 * 86_400_000 },
  { exerciseId: "db-bench-press", exerciseName: "Dumbbell bench press", weightKg: 22.5, reps: 8, achievedAt: Date.now() - 6 * 86_400_000 },
];

export async function getSession(sessionId: string): Promise<Session> {
  if (!USE_MOCKS) return request<Session>(`/sessions/${sessionId}`);
  return respond(mockSession(sessionId));
}

export async function startSession(workoutId: string): Promise<{ sessionId: string }> {
  if (!USE_MOCKS) return request(`/sessions/${workoutId}/start`, { method: "POST" });
  return respond({ sessionId: workoutId }, 100);
}

export async function logSet(sessionId: string, log: SetLog): Promise<{ ok: true }> {
  if (!USE_MOCKS) return request(`/sessions/${sessionId}/logs`, { method: "PUT", body: JSON.stringify(log) });
  return respond({ ok: true as const }, 150);
}

export async function completeSession(
  sessionId: string,
  body: { activeSec: number; logs: SetLog[]; feel?: Feel },
): Promise<CompleteSessionResponse> {
  if (!USE_MOCKS) return request(`/sessions/${sessionId}/complete`, { method: "POST", body: JSON.stringify(body) });
  const rdl = body.logs.filter((l) => l.exerciseId === "romanian-deadlift").sort((a, b) => b.weightKg - a.weightKg)[0];
  const newPRs: PersonalRecord[] = rdl
    ? [{ exerciseId: rdl.exerciseId, exerciseName: "Romanian deadlift", weightKg: rdl.weightKg, reps: rdl.reps, achievedAt: Date.now() }]
    : [];
  return respond({ streakDays: 6, newPRs, nextPlanAdjusted: true });
}

export async function postFeel(sessionId: string, feel: Feel): Promise<{ ok: true }> {
  if (!USE_MOCKS) return request(`/sessions/${sessionId}/feel`, { method: "POST", body: JSON.stringify({ feel }) });
  return respond({ ok: true as const }, 150);
}

export async function getLastLog(exerciseId: string): Promise<SetLog | null> {
  if (!USE_MOCKS) return request(`/exercises/${exerciseId}/last-log`);
  const l = LAST_LOGS[exerciseId];
  return respond(l ? { ...l, exerciseId, setIndex: 0 } : null);
}

export async function getNextWeight(exerciseId: string, setIndex: number): Promise<{ weightKg: number; reps: number }> {
  if (!USE_MOCKS) return request(`/exercises/${exerciseId}/next-weight?set=${setIndex}`);
  return respond({ weightKg: 12.5, reps: 12 });
}

export async function getPersonalRecords(): Promise<PersonalRecord[]> {
  if (!USE_MOCKS) return request("/records");
  return respond(PRS);
}
