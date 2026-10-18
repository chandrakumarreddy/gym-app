import type { StringKey } from "@/hooks/useLocale.tsx";
import type { Weekday } from "@/types/quiz.ts";

export const MIN_DAYS = 2;
export const MAX_DAYS = 6;

export const DEFAULT_DAYS_BY_COUNT: Record<number, Weekday[]> = {
  2: [0, 3],
  3: [0, 2, 4],
  4: [0, 2, 4, 5],
  5: [0, 1, 2, 4, 5],
  6: [0, 1, 2, 3, 4, 5],
};

const HINT_KEYS: Record<number, StringKey> = {
  2: "quizSchedule.hint.2",
  3: "quizSchedule.hint.3",
  4: "quizSchedule.hint.4",
  5: "quizSchedule.hint.5",
  6: "quizSchedule.hint.6",
};

export function frequencyHintKey(n: number): StringKey {
  return HINT_KEYS[Math.min(MAX_DAYS, Math.max(MIN_DAYS, n))];
}

export function toggleDay(days: Weekday[], d: Weekday): Weekday[] | null {
  const next = days.includes(d) ? days.filter((x) => x !== d) : [...days, d].sort((a, b) => a - b);
  return next.length < MIN_DAYS || next.length > MAX_DAYS ? null : next;
}
