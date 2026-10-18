import type { StringKey, TFn } from "@/hooks/useLocale.tsx";
import type { BarVM, MuscleBalance, ProgressRange, ProgressSummary } from "@/types/progress.ts";
import { formatDeltaPct, formatSet, formatTonnes } from "@/utils/format.ts";

import type { HeatCell } from "./components/Heatmap/Heatmap.tsx";

const DAY_KEYS: StringKey[] = ["progress.day.0", "progress.day.1", "progress.day.2", "progress.day.3", "progress.day.4", "progress.day.5", "progress.day.6"];
const DELTA_KEYS: Record<ProgressRange, StringKey> = {
  week: "progress.delta.week",
  month: "progress.delta.month",
  year: "progress.delta.year",
};

export type RecordVM = {
  id: string;
  title: string;
  value: string;
  isNew: boolean;
};

export type ProgressVM = {
  workouts: string;
  workoutsUnit: string;
  volume: string;
  streak: string;
  hasStreak: boolean;
  deltaLabel: string | null;
  deltaUp: boolean;
  bars: BarVM[];
  records: RecordVM[];
  empty: boolean;
};

export function toBars(days: ProgressSummary["days"], t: TFn): BarVM[] {
  const max = Math.max(1, ...days.map((d) => d.kg));
  return days.map((d, i) => ({
    label: t(DAY_KEYS[i % 7]),
    heightPct: d.kg > 0 ? Math.max(8, Math.round((d.kg / max) * 100)) : 8,
    active: d.kg > 0,
  }));
}

export function toProgressVM(s: ProgressSummary, t: TFn): ProgressVM {
  const records = [...s.records]
    .sort((a, b) => (a.achievedAt < b.achievedAt ? 1 : -1))
    .slice(0, 2)
    .map((r) => ({
      id: r.id,
      title: r.exercise,
      value: formatSet(r.weightKg, r.reps),
      isNew: r.isNew,
    }));
  return {
    workouts: String(s.workoutsDone),
    workoutsUnit: t("progress.unit.of", { n: s.workoutsPlanned }),
    volume: formatTonnes(s.volumeKg),
    streak: String(s.streakDays),
    hasStreak: s.streakDays > 0,
    deltaLabel: s.workoutsDone > 0 ? t(DELTA_KEYS[s.range], { pct: formatDeltaPct(s.volumeDeltaPct) }) : null,
    deltaUp: s.volumeDeltaPct > 0,
    bars: toBars(s.days, t),
    records,
    empty: s.workoutsDone === 0 && records.length === 0,
  };
}

export const PLACEHOLDER_CELLS: HeatCell[] = [2, 3, 1, 0, 2, 1, 0, 1, 3, 0, 2, 0, 3, 1].map((level, i) => ({
  key: `p${i}`,
  level: level as HeatCell["level"],
}));

export function toHeatCells(balance: MuscleBalance): HeatCell[] {
  return balance.map((m) => ({
    key: m.muscle,
    level: m.level,
    label: m.muscle,
  }));
}
