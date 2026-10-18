import type { ArtSpec } from "@/types/art.ts";
import type { Level } from "@/types/quiz.ts";

export type AvatarTone = "ember" | "warm" | "brown";
export type ExerciseEquipment = "dumbbell" | "barbell" | "machine" | "bodyweight" | "band" | "kettlebell" | "bench";
export type SwapReason = "knee" | "back" | "shoulder";

export type Coach = {
  id: string;
  name: string;
  initials: string;
  specialty: string;
  tone: AvatarTone;
};

export type CoachRef = Pick<Coach, "id" | "name" | "initials">;

export type Program = {
  id: string;
  title: string;
  coachId: string;
  coach: CoachRef;
  weeks: number;
  daysPerWeek: number;
  sessionMin: number;
  level: Level;
  premium: boolean;
  packProductId?: string;
  tags: string[];
  art: ArtSpec;
  description: string;
};

export type Week = {
  index: number;
  free: boolean;
  sessions: SessionSummaryItem[];
};

export type SessionSummaryItem = {
  id: string;
  title: string;
  dayIndex: number;
  durationMin: number;
  exerciseCount: number;
  art: ArtSpec;
};

export type Cue = { atSec: number; text: Record<"en" | "hi", string>; audioUrl?: string };

export type RepsUnit = "reps" | "reps_per_leg" | "sec";

export type Exercise = {
  id: string;
  name: string;
  kind: "follow_along" | "sets";
  durationSec?: number;
  sets?: number;
  reps?: number | [number, number];
  repsUnit: RepsUnit;
  perSide?: boolean;
  restSec: number;
  segmentSec: number;
  weightStepKg: number;
  swappedFrom?: { exerciseId: string; name: string; reason: SwapReason };
  equipment: ExerciseEquipment[];
  coach: CoachRef;
  cues: Cue[];
  captions: Partial<Record<"en" | "hi", string>>;
  art: ArtSpec;
  thumbUrl: string;
  demoUrl: string;
  videoUrl: string;
};

export type Session = {
  id: string;
  programId: string;
  programTitle: string;
  weekIndex: number;
  dayIndex: number;
  title: string;
  durationMin: number;
  exerciseCount: number;
  setCount: number;
  equipment: ExerciseEquipment[];
  appliedSwapReason?: SwapReason;
  premium: boolean;
  art: ArtSpec;
  exercises: Exercise[];
};

export type ProgramDetail = Program & { weekList: Week[] };

export type ProgramProgress = {
  programId: string;
  doneSessionIds: string[];
  nextSessionId: string | null;
  currentWeek: number;
};

export type ContinueItem = {
  sessionId: string;
  title: string;
  caption: string;
  progress: number;
  art: ArtSpec;
};

export type HomeFeed = {
  user: { name: string; initials: string };
  streakDays: number;
  weekDays: { label: string; done: boolean; today: boolean }[];
  today: {
    sessionId: string;
    programId: string;
    title: string;
    eyebrow: string;
    durationMin: number;
    exerciseCount: number;
    coach: CoachRef;
    art: ArtSpec;
  };
  continueWatching: ContinueItem[];
  recommended: Program[];
};

export type QuickWorkout = {
  sessionId: string;
  title: string;
  durationMin: number;
  premium: boolean;
  art: ArtSpec;
};

export type LibraryFeed = {
  filters: { id: string; label: string }[];
  programs: Program[];
  coaches: Coach[];
  quick: QuickWorkout[];
};
