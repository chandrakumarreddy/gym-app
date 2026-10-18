import { useRef } from "@lynx-js/react";

import { track } from "@/api/analytics.ts";
import type { IconName } from "@/components/Icon/Icon.tsx";
import { QuizOptionCard } from "@/components/QuizOptionCard/QuizOptionCard.tsx";
import { QuizShell } from "@/components/QuizShell/QuizShell.tsx";
import { useT } from "@/hooks/useLocale.tsx";
import type { StringKey } from "@/hooks/useLocale.tsx";
import { useRouter } from "@/hooks/useRouter.tsx";
import { completeQuizStep, setQuizAnswers, useQuizAnswer } from "@/state/quizAnswers.ts";
import type { Goal } from "@/types/quiz.ts";

import "./QuizGoal.css";

type GoalOption = { id: Goal; icon: IconName; titleKey: StringKey; captionKey: StringKey };

const GOALS: GoalOption[] = [
  { id: "build_muscle", icon: "dumbbell", titleKey: "quizGoal.buildMuscle", captionKey: "quizGoal.buildMuscle.caption" },
  { id: "lose_fat", icon: "flame", titleKey: "quizGoal.loseFat", captionKey: "quizGoal.loseFat.caption" },
  { id: "get_stronger", icon: "bolt", titleKey: "quizGoal.getStronger", captionKey: "quizGoal.getStronger.caption" },
  { id: "move_better", icon: "stretch", titleKey: "quizGoal.moveBetter", captionKey: "quizGoal.moveBetter.caption" },
];

const select = (goal: Goal) => setQuizAnswers({ goal });

export function QuizGoal() {
  const t = useT();
  const router = useRouter();
  const goal = useQuizAnswer("goal");
  const navigating = useRef(false);

  const onContinue = () => {
    if (!goal || navigating.current) return;
    navigating.current = true;
    completeQuizStep(1);
    track("quiz_step_completed", { step: 1, step_name: "goal", goal });
    router.push({ name: "quiz-experience" });
    setTimeout(() => (navigating.current = false), 500);
  };

  return (
    <QuizShell
      step={1}
      total={4}
      title={t("quizGoal.title")}
      subtitle={t("quizGoal.subtitle")}
      ctaLabel={t("common.continue")}
      ctaDisabled={!goal}
      onCta={onContinue}
      onBack={() => router.back()}
      headerRight={<text className="quiz-goal-count">1/4</text>}
    >
      <view className="quiz-goal-list">
        {GOALS.map((g) => (
          <QuizOptionCard
            key={g.id}
            id={g.id}
            icon={g.icon}
            title={t(g.titleKey)}
            caption={t(g.captionKey)}
            selected={goal === g.id}
            onSelect={select}
          />
        ))}
      </view>
    </QuizShell>
  );
}
