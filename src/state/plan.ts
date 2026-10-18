import { getJSON, setJSON } from "@/api/storage.ts";
import { createStore, useStore } from "@/state/store.ts";
import type { Plan } from "@/types/plan.ts";

export const PLAN_KEY = "plan.current";
export const ONBOARDING_KEY = "fitcue.onboarding";

export type OnboardingStep = "quiz" | "plan" | "signup" | "paywall" | "complete";

const store = createStore<Plan | null>(getJSON<Plan>(PLAN_KEY) ?? null);

export function getCurrentPlan(): Plan | null {
  return store.get();
}

export function setCurrentPlan(plan: Plan | null): void {
  setJSON(PLAN_KEY, plan);
  store.set(plan);
}

export function useCurrentPlan(): Plan | null {
  return useStore(store);
}

export type OnboardingState = { step: OnboardingStep; complete: boolean };

export function getOnboarding(): OnboardingState {
  return getJSON<OnboardingState>(ONBOARDING_KEY) ?? { step: "quiz", complete: false };
}

export function setOnboardingStep(step: OnboardingStep): void {
  setJSON(ONBOARDING_KEY, { step, complete: step === "complete" });
}
