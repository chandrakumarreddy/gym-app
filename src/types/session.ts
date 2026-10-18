import type { Session } from "@/types/content.ts";

export type Effort = "easy" | "just_right" | "hard" | "max";
export type Feel = "too_easy" | "just_right" | "too_hard";
export type SessionPhase = "loading" | "playing" | "paused" | "buffering" | "resting" | "complete";
export type PlaybackSpeed = 0.75 | 1 | 1.25 | 1.5;

export type SetLog = {
  exerciseId: string;
  setIndex: number;
  weightKg: number;
  reps: number;
  effort: Effort;
  loggedAt: number;
  synced: boolean;
};

export type RestState = { startedAt: number; endsAt: number; durationSec: number } | null;

export type PersonalRecord = {
  exerciseId: string;
  exerciseName: string;
  weightKg: number;
  reps: number;
  achievedAt: number;
};

export type WorkoutSession = {
  id: string;
  workoutId: string;
  workout: Session;
  startedAt: number;
  activeMs: number;
  lastResumedAt: number | null;
  exerciseIndex: number;
  setIndex: number;
  positionSec: number;
  phase: SessionPhase;
  rest: RestState;
  speed: PlaybackSpeed;
  captions: boolean;
  voiceCues: boolean;
  logs: SetLog[];
  feel?: Feel;
  completedAt?: number;
};

export type SessionSummary = {
  activeSec: number;
  volumeKg: number;
  setsDone: number;
  setsTotal: number;
  streakDays: number;
  newPRs: PersonalRecord[];
};

export type CompleteSessionResponse = {
  streakDays: number;
  newPRs: PersonalRecord[];
  nextPlanAdjusted: boolean;
};
