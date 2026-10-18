import { getSession } from "@/services/auth.ts";
import { getCurrentPlan } from "@/state/plan.ts";
import { getJSON } from "@/api/storage.ts";
import { isQuizCompleted, QUIZ_DRAFT_KEY } from "@/state/quizAnswers.ts";
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

// Welcome only for a fresh start; signed out after that means the quiz (resumed, or retaken once done).
export function startRoute(): Route {
  const plan = getCurrentPlan();
  const signedIn = getSession() !== null;
  if (signedIn && plan) return { name: "home" };
  if (isQuizCompleted()) {
    if (!signedIn) return { name: "quiz-goal" };
    return plan ? { name: "plan-preview", planId: plan.id } : { name: "building" };
  }
  return getJSON<QuizDraft>(QUIZ_DRAFT_KEY) ? quizResumeRoute() : { name: "welcome" };
}
