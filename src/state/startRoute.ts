import { getSession } from "@/services/auth.ts";
import { getCurrentPlan } from "@/state/plan.ts";
import { getJSON } from "@/api/storage.ts";
import { isQuizCompleted, QUIZ_DRAFT_KEY, resetQuiz } from "@/state/quizAnswers.ts";
import type { QuizDraft } from "@/types/quiz.ts";
import type { Route } from "@/types/route.ts";

const QUIZ_STEPS: Route[] = [
  { name: "quiz-goal" },
  { name: "quiz-experience" },
  { name: "quiz-schedule" },
  { name: "quiz-body" },
  { name: "building" },
];

// The quiz step after the last one answered, or the first.
export function quizResumeRoute(): Route {
  const draft = getJSON<QuizDraft>(QUIZ_DRAFT_KEY);
  return QUIZ_STEPS[draft ? Math.min(draft.lastStep + 1, QUIZ_STEPS.length - 1) : 0];
}

// Welcome until the quiz is done (a half-done quiz is dropped); signed out after that means retaking it.
export function startRoute(): Route {
  const plan = getCurrentPlan();
  const signedIn = getSession() !== null;
  if (signedIn && plan) return { name: "home" };
  if (isQuizCompleted()) {
    if (!signedIn) return { name: "quiz-goal" };
    return plan ? { name: "plan-preview", planId: plan.id } : { name: "building" };
  }
  resetQuiz();
  return { name: "welcome" };
}
