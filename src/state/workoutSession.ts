import { useSyncExternalStore } from "@lynx-js/react";

import { track } from "@/api/analytics.ts";
import { completeSession, getPersonalRecords, logSet as apiLogSet } from "@/api/sessions.ts";
import { getJSON, removeKey, setJSON } from "@/api/storage.ts";
import type { Session } from "@/types/content.ts";
import type { Effort, Feel, PlaybackSpeed, SessionSummary, SetLog, WorkoutSession } from "@/types/session.ts";
import { activeMsNow, currentExercise, setsOf, summarize } from "@/utils/session.ts";

export const SESSION_KEY = "session.active";
export const SYNC_QUEUE_KEY = "sync.queue";
export const STREAK_KEY = "progress.streak";

let state: WorkoutSession | null = null;
const listeners = new Set<() => void>();

function emit(next: WorkoutSession | null, persist = true): void {
  state = next;
  if (persist) {
    if (next) setJSON(SESSION_KEY, next);
    else removeKey(SESSION_KEY);
  }
  listeners.forEach((fn) => fn());
}

function update(fn: (s: WorkoutSession) => WorkoutSession, persist = true): void {
  if (state) emit(fn(state), persist);
}

function running(phase: WorkoutSession["phase"]): boolean {
  return phase === "playing" || phase === "resting";
}

function withPhase(s: WorkoutSession, phase: WorkoutSession["phase"], now = Date.now()): WorkoutSession {
  const wasRunning = running(s.phase);
  const isRunning = running(phase);
  if (wasRunning === isRunning) return { ...s, phase };
  if (isRunning) return { ...s, phase, lastResumedAt: now };
  return { ...s, phase, activeMs: activeMsNow(s, now), lastResumedAt: null };
}

function queueLog(log: SetLog): void {
  const q = getJSON<SetLog[]>(SYNC_QUEUE_KEY) ?? [];
  setJSON(SYNC_QUEUE_KEY, [...q, log]);
}

export function getState(): WorkoutSession | null {
  return state;
}

export function subscribe(fn: () => void): () => void {
  listeners.add(fn);
  return () => listeners.delete(fn);
}

export function getSaved(): WorkoutSession | null {
  return getJSON<WorkoutSession>(SESSION_KEY) ?? null;
}

export function start(workout: Session): void {
  const now = Date.now();
  emit({
    id: workout.id,
    workoutId: workout.id,
    workout,
    startedAt: now,
    activeMs: 0,
    lastResumedAt: null,
    exerciseIndex: 0,
    setIndex: 0,
    positionSec: 0,
    phase: "loading",
    rest: null,
    speed: 1,
    captions: false,
    voiceCues: false,
    logs: [],
  });
}

export function restore(saved: WorkoutSession): void {
  emit({ ...saved, phase: saved.phase === "resting" || saved.phase === "complete" ? saved.phase : "paused", lastResumedAt: saved.phase === "resting" ? Date.now() : null });
}

export function play(): void {
  update((s) => withPhase(s, "playing"));
}

export function pause(): void {
  update((s) => withPhase(s, "paused"));
}

export function setBuffering(buffering: boolean): void {
  update((s) => (s.phase === "resting" || s.phase === "complete" ? s : withPhase(s, buffering ? "buffering" : "playing")), false);
}

export function syncPosition(sec: number): void {
  update((s) => ({ ...s, positionSec: sec }));
}

export function setSpeed(speed: PlaybackSpeed): void {
  update((s) => ({ ...s, speed }));
}

export function toggleCaptions(): void {
  update((s) => ({ ...s, captions: !s.captions }));
}

export function toggleVoice(): void {
  update((s) => ({ ...s, voiceCues: !s.voiceCues }));
}

export function completeSet(): void {
  update((s) => {
    const restSec = currentExercise(s)?.restSec ?? 60;
    const now = Date.now();
    return { ...withPhase(s, "resting", now), rest: { startedAt: now, endsAt: now + restSec * 1000, durationSec: restSec } };
  });
}

export function extendRest(sec: number): void {
  update((s) => (s.rest ? { ...s, rest: { ...s.rest, endsAt: s.rest.endsAt + sec * 1000, durationSec: s.rest.durationSec + sec } } : s));
}

export function skipRest(): void {
  update((s) => (s.rest ? { ...s, rest: { ...s.rest, endsAt: Date.now() } } : s));
}

export function logSet(values: { weightKg: number; reps: number; effort: Effort }): void {
  const s = state;
  const ex = s && currentExercise(s);
  if (!s || !ex) return;
  const log: SetLog = { exerciseId: ex.id, setIndex: s.setIndex, ...values, loggedAt: Date.now(), synced: false };
  update((prev) => ({
    ...prev,
    logs: [...prev.logs.filter((l) => !(l.exerciseId === log.exerciseId && l.setIndex === log.setIndex)), log],
  }));
  apiLogSet(s.id, log).then(
    () =>
      update((prev) => ({
        ...prev,
        logs: prev.logs.map((l) => (l.exerciseId === log.exerciseId && l.setIndex === log.setIndex ? { ...l, synced: true } : l)),
      })),
    () => queueLog(log),
  );
}

export function advance(): void {
  update((s) => {
    const base = { ...s, rest: null };
    if (s.setIndex + 1 < setsOf(currentExercise(s))) return withPhase({ ...base, setIndex: s.setIndex + 1 }, "playing");
    if (s.exerciseIndex + 1 < s.workout.exercises.length)
      return withPhase({ ...base, exerciseIndex: s.exerciseIndex + 1, setIndex: 0, positionSec: 0 }, "playing");
    return withPhase(base, "complete");
  });
}

export function prev(): void {
  update((s) => (s.exerciseIndex > 0 ? { ...s, exerciseIndex: s.exerciseIndex - 1, setIndex: 0, positionSec: 0, rest: null } : { ...s, positionSec: 0 }));
}

export function jumpTo(exerciseIndex: number): void {
  update((s) => ({ ...s, exerciseIndex, setIndex: 0, positionSec: 0, rest: null }));
}

export function setFeel(feel: Feel): void {
  update((s) => ({ ...s, feel }));
}

export async function finish(): Promise<SessionSummary> {
  const s = state;
  if (!s) throw new Error("No active session");
  const now = Date.now();
  const done = { ...withPhase(s, "complete", now), completedAt: s.completedAt ?? now };
  emit(done);
  const streak = getJSON<number>(STREAK_KEY) ?? 0;
  const local = summarize(done, await getPersonalRecords().catch(() => []), Math.max(1, streak + 1));
  try {
    const res = await completeSession(done.id, { activeSec: local.activeSec, logs: done.logs, feel: done.feel });
    setJSON(STREAK_KEY, res.streakDays);
    const summary = { ...local, streakDays: res.streakDays, newPRs: res.newPRs.length ? res.newPRs : local.newPRs };
    if (!s.completedAt) {
      track("workout_completed", {
        workoutId: done.workoutId,
        programId: done.workout.programId,
        week: done.workout.weekIndex,
        day: done.workout.dayIndex,
        activeSec: summary.activeSec,
        setsDone: summary.setsDone,
        setsTotal: summary.setsTotal,
        volumeKg: summary.volumeKg,
        newPRs: summary.newPRs.length,
        partial: summary.setsDone < summary.setsTotal,
      });
    }
    return summary;
  } catch {
    return local;
  }
}

export function discard(): void {
  emit(null);
}

export function useWorkoutSession<T>(selector: (s: WorkoutSession | null) => T): T {
  return useSyncExternalStore(subscribe, () => selector(state));
}
