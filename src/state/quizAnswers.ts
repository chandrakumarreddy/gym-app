import { getJSON, removeKey, setJSON } from "@/api/storage.ts";
import { createStore, useStore } from "@/state/store.ts";
import type { QuizAnswers, QuizDraft, QuizStep } from "@/types/quiz.ts";

export const QUIZ_DRAFT_KEY = "fitcue.quizDraft";
export const QUIZ_COMPLETED_KEY = "fitcue.quizCompleted";

const LAST_STEP: QuizStep = 4;

export const DEFAULT_ANSWERS: QuizAnswers = {
  equipment: [],
  daysPerWeek: 4,
  days: [0, 2, 4, 5],
  sessionMin: 45,
  weightKg: 72,
  weightUnit: "kg",
  heightCm: 175,
  age: 29,
  limits: [],
  noLimits: false,
};

const draft = getJSON<Partial<QuizDraft>>(QUIZ_DRAFT_KEY);
const store = createStore<QuizAnswers>({ ...DEFAULT_ANSWERS, ...draft?.answers });

export function getQuizAnswers(): QuizAnswers {
  return store.get();
}

export function setQuizAnswers(patch: Partial<QuizAnswers>): void {
  store.set((prev) => ({ ...prev, ...patch }));
}

export function completeQuizStep(step: QuizStep): void {
  const value: QuizDraft = { answers: store.get(), lastStep: step, updatedAt: Date.now() };
  setJSON(QUIZ_DRAFT_KEY, value);
  if (step === LAST_STEP) setJSON(QUIZ_COMPLETED_KEY, true);
}

export function isQuizCompleted(): boolean {
  return getJSON<boolean>(QUIZ_COMPLETED_KEY) === true || getJSON<QuizDraft>(QUIZ_DRAFT_KEY)?.lastStep === LAST_STEP;
}

export function resetQuiz(): void {
  removeKey(QUIZ_DRAFT_KEY);
  removeKey(QUIZ_COMPLETED_KEY);
  store.set({ ...DEFAULT_ANSWERS });
}

export function useQuizAnswers() {
  const answers = useStore(store);
  return { answers, set: setQuizAnswers, completeStep: completeQuizStep, reset: resetQuiz };
}

export function useQuizAnswer<K extends keyof QuizAnswers>(key: K): QuizAnswers[K] {
  return useStore(store, (s) => s[key]);
}
