export type ProgressRange = "week" | "month" | "year";
export type DayVolume = { day: string; kg: number };

export type RecordItem = {
  id: string;
  exercise: string;
  weightKg: number;
  reps: number;
  achievedAt: string;
  isNew: boolean;
};

export type ProgressSummary = {
  range: ProgressRange;
  workoutsDone: number;
  workoutsPlanned: number;
  volumeKg: number;
  volumeDeltaPct: number;
  streakDays: number;
  days: DayVolume[];
  records: RecordItem[];
};

export type MuscleBalance = { muscle: string; level: 0 | 1 | 2 | 3 }[];

export type BarVM = { label: string; heightPct: number; active: boolean };
