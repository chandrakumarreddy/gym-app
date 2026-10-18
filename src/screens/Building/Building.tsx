import { useEffect, useMemo, useState } from "@lynx-js/react";

import { track } from "@/api/analytics.ts";
import { buildMockPlan, generatePlan } from "@/api/plans.ts";
import { Button } from "@/components/Button/Button.tsx";
import { RestRing } from "@/components/RestRing/RestRing.tsx";
import { useT } from "@/hooks/useLocale.tsx";
import type { TFn } from "@/hooks/useLocale.tsx";
import { useRouter } from "@/hooks/useRouter.tsx";
import { setCurrentPlan, setOnboardingStep } from "@/state/plan.ts";
import { getQuizAnswers, useQuizAnswers } from "@/state/quizAnswers.ts";
import type { BuildStep, Plan } from "@/types/plan.ts";
import type { QuizAnswers } from "@/types/quiz.ts";

import { BuildStepList } from "@/screens/Building/components/BuildStepList/BuildStepList.tsx";

import "./Building.css";

const MIN_MS = 3200;
const STAGE_MS = 800;
const API_TIMEOUT_MS = 10_000;
const EXIT_DELAY_MS = 450;
const STAGE_PCT = [25, 50, 76, 90];
const STEP_IDS: BuildStep["id"][] = ["goal", "schedule", "limits", "coach"];

function stepLabels(a: QuizAnswers, t: TFn): Record<BuildStep["id"], string> {
  const goal = t(`building.goal.${a.goal ?? "get_stronger"}`);
  const limit = !a.noLimits && a.limits.length ? a.limits[0] : null;
  return {
    goal: a.level ? t("building.step.goal", { goal, level: t(`building.level.${a.level}`) }) : t("building.step.goalOnly", { goal }),
    schedule: t("building.step.schedule", { n: a.days.length || a.daysPerWeek, min: a.sessionMin }),
    limits: limit ? t("building.step.limits", { limit: t(`building.limit.${limit}`) }) : t("building.step.equipment"),
    coach: t("building.step.coach"),
  };
}

function withTimeout<T>(p: Promise<T>, ms: number, timers: ReturnType<typeof setTimeout>[]): Promise<T> {
  return new Promise<T>((resolve, reject) => {
    timers.push(setTimeout(() => reject(new Error("timeout")), ms));
    p.then(resolve, reject);
  });
}

export function Building() {
  const t = useT();
  const { replace } = useRouter();
  const { answers } = useQuizAnswers();
  const [stage, setStage] = useState(0);
  const [finished, setFinished] = useState(false);
  const [failed, setFailed] = useState(false);
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    const input = getQuizAnswers();
    if (!input.goal) {
      replace({ name: "quiz-goal" });
      return;
    }
    let cancelled = false;
    const timers: ReturnType<typeof setTimeout>[] = [];
    const startedAt = Date.now();
    setStage(0);
    setFinished(false);
    setFailed(false);
    for (let i = 1; i < STAGE_PCT.length; i++) timers.push(setTimeout(() => setStage(i), i * STAGE_MS));

    let source: "api" | "local" = "api";
    const planP = withTimeout(generatePlan(input), API_TIMEOUT_MS, timers).catch(() => {
      source = "local";
      return buildMockPlan(input);
    });
    const minP = new Promise<void>((r) => timers.push(setTimeout(r, MIN_MS)));

    Promise.all([planP, minP]).then(
      ([plan]: [Plan, void]) => {
        if (cancelled) return;
        setCurrentPlan(source === "local" ? { ...plan, synced: false } : plan);
        setOnboardingStep("plan");
        track("plan_generated", { source, ms: Date.now() - startedAt });
        setFinished(true);
        timers.push(setTimeout(() => !cancelled && replace({ name: "plan-preview", planId: plan.id }), EXIT_DELAY_MS));
      },
      () => {
        if (cancelled) return;
        timers.forEach(clearTimeout);
        setFailed(true);
      },
    );

    return () => {
      cancelled = true;
      timers.forEach(clearTimeout);
    };
  }, [attempt]);

  const steps = useMemo<BuildStep[]>(() => {
    const labels = stepLabels(answers, t);
    return STEP_IDS.map((id, i) => ({
      id,
      label: labels[id],
      status: finished || i < stage ? "done" : i === stage ? "active" : "pending",
    }));
  }, [answers, t, stage, finished]);

  const pct = finished ? 100 : STAGE_PCT[stage];

  return (
    <view className="building">
      <RestRing
        className="building-ring"
        size={220}
        stroke={14}
        progress={pct / 100}
        valueText={t("building.percent", { n: pct })}
        caption={t("building.caption")}
      />
      <text className="building-title">{t(finished ? "building.titleDone" : "building.title")}</text>
      <text className="building-sub">{t("building.sub")}</text>
      {failed ? (
        <view className="building-error">
          <text className="building-error-title">{t("building.error.title")}</text>
          <text className="building-error-body">{t("building.error.body")}</text>
          <Button label={t("building.error.retry")} block className="building-error-cta" onTap={() => setAttempt((a) => a + 1)} />
          <Button label={t("building.error.edit")} variant="ghost" block className="building-error-cta" onTap={() => replace({ name: "quiz-body" })} />
        </view>
      ) : (
        <view className="building-steps">
          <BuildStepList steps={steps} />
        </view>
      )}
    </view>
  );
}
