import type { BodyLimit, WeightUnit } from "@/types/quiz.ts";

const LB_PER_KG = 2.20462;

export const HEIGHT_RANGE = { min: 100, max: 250 };
export const AGE_RANGE = { min: 13, max: 90 };

export function kgToLb(kg: number): number {
  return kg * LB_PER_KG;
}

export function lbToKg(lb: number): number {
  return Math.round((lb / LB_PER_KG) * 10) / 10;
}

export function rulerRange(unit: WeightUnit): { min: number; max: number; step: number } {
  return unit === "kg" ? { min: 30, max: 200, step: 1 } : { min: 66, max: 440, step: 1 };
}

export function displayWeight(kg: number, unit: WeightUnit): number {
  const { min, max } = rulerRange(unit);
  return Math.min(max, Math.max(min, Math.round(unit === "kg" ? kg : kgToLb(kg))));
}

export function toggleLimit(limits: BodyLimit[], l: BodyLimit): BodyLimit[] {
  return limits.includes(l) ? limits.filter((x) => x !== l) : [...limits, l];
}
