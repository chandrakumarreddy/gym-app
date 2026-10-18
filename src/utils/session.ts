import type { Exercise } from "@/types/content.ts";
import type { PersonalRecord, SessionSummary, SetLog, WorkoutSession } from "@/types/session.ts";

export function currentExercise(s: WorkoutSession): Exercise | undefined {
  return s.workout.exercises[s.exerciseIndex];
}

export function nextExercise(s: WorkoutSession): Exercise | undefined {
  return s.workout.exercises[s.exerciseIndex + 1];
}

export function setsOf(ex: Exercise | undefined): number {
  return ex ? (ex.kind === "sets" ? (ex.sets ?? 1) : 1) : 0;
}

export function isLastSet(s: WorkoutSession): boolean {
  return s.exerciseIndex >= s.workout.exercises.length - 1 && s.setIndex >= setsOf(currentExercise(s)) - 1;
}

export function totalSets(s: WorkoutSession): number {
  return s.workout.exercises.reduce((n, e) => n + (e.sets ?? 0), 0);
}

export function lastLogFor(s: WorkoutSession, exerciseId: string): SetLog | null {
  const logs = s.logs.filter((l) => l.exerciseId === exerciseId);
  return logs.length ? logs[logs.length - 1] : null;
}

export function logFor(s: WorkoutSession, exerciseId: string, setIndex: number): SetLog | null {
  return s.logs.find((l) => l.exerciseId === exerciseId && l.setIndex === setIndex) ?? null;
}

export function activeMsNow(s: WorkoutSession, now = Date.now()): number {
  return s.activeMs + (s.lastResumedAt ? now - s.lastResumedAt : 0);
}

export function volumeKg(logs: SetLog[]): number {
  return logs.reduce((n, l) => n + l.weightKg * l.reps, 0);
}

function e1rm(weightKg: number, reps: number): number {
  return weightKg * (1 + reps / 30);
}

export function detectPRs(s: WorkoutSession, prev: PersonalRecord[]): PersonalRecord[] {
  const best = new Map<string, SetLog>();
  for (const l of s.logs) {
    const b = best.get(l.exerciseId);
    if (!b || e1rm(l.weightKg, l.reps) > e1rm(b.weightKg, b.reps)) best.set(l.exerciseId, l);
  }
  const out: PersonalRecord[] = [];
  best.forEach((l, id) => {
    if (l.weightKg <= 0) return;
    const p = prev.find((r) => r.exerciseId === id);
    const beats = !p || (l.weightKg > p.weightKg && l.reps >= p.reps) || (l.weightKg === p.weightKg && l.reps > p.reps);
    if (!beats) return;
    const name = s.workout.exercises.find((e) => e.id === id)?.name ?? id;
    out.push({ exerciseId: id, exerciseName: name, weightKg: l.weightKg, reps: l.reps, achievedAt: l.loggedAt });
  });
  return out.sort((a, b) => e1rm(b.weightKg, b.reps) - e1rm(a.weightKg, a.reps));
}

export function summarize(s: WorkoutSession, prevPRs: PersonalRecord[], streakDays: number): SessionSummary {
  return {
    activeSec: Math.round(activeMsNow(s) / 1000),
    volumeKg: volumeKg(s.logs),
    setsDone: s.logs.length,
    setsTotal: totalSets(s),
    streakDays,
    newPRs: detectPRs(s, prevPRs),
  };
}

export type StepperBounds = { weight: { step: number; min: number; max: number } | null; reps: { step: number; min: number; max: number } };

export function stepperBounds(ex: Exercise): StepperBounds {
  const bodyweight = ex.equipment.every((e) => e === "bodyweight");
  return {
    weight: bodyweight ? null : { step: ex.weightStepKg || 2.5, min: 0, max: 300 },
    reps: { step: 1, min: 0, max: 50 },
  };
}

export function prefillFor(
  ex: Exercise,
  existing: SetLog | null,
  suggestion: { weightKg: number; reps: number } | null,
  lastTime: SetLog | null,
): { weightKg: number; reps: number } {
  if (existing) return { weightKg: existing.weightKg, reps: existing.reps };
  if (suggestion) return suggestion;
  if (lastTime) return { weightKg: lastTime.weightKg, reps: lastTime.reps };
  const reps = Array.isArray(ex.reps) ? ex.reps[1] : (ex.reps ?? 0);
  return { weightKg: 0, reps };
}
