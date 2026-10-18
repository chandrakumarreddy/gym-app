import { useEffect, useRef, useState } from "@lynx-js/react";

import { track } from "@/api/analytics.ts";
import { Chip } from "@/components/Chip/Chip.tsx";
import { DayPicker } from "@/components/DayPicker/DayPicker.tsx";
import { NumberPicker } from "@/components/NumberPicker/NumberPicker.tsx";
import { QuizShell } from "@/components/QuizShell/QuizShell.tsx";
import { useT } from "@/hooks/useLocale.tsx";
import type { StringKey } from "@/hooks/useLocale.tsx";
import { useRouter } from "@/hooks/useRouter.tsx";
import { completeQuizStep, setQuizAnswers, useQuizAnswers } from "@/state/quizAnswers.ts";
import type { SessionMinutes, Weekday } from "@/types/quiz.ts";

import { DEFAULT_DAYS_BY_COUNT, MAX_DAYS, MIN_DAYS, frequencyHintKey, toggleDay } from "./rules.ts";
import "./QuizSchedule.css";

const DAY_KEYS: StringKey[] = [
  "quizSchedule.day.0",
  "quizSchedule.day.1",
  "quizSchedule.day.2",
  "quizSchedule.day.3",
  "quizSchedule.day.4",
  "quizSchedule.day.5",
  "quizSchedule.day.6",
];
const LENGTHS: SessionMinutes[] = [20, 30, 45, 60];
const SHAKE_MS = 300;

const onCount = (n: number) => setQuizAnswers({ daysPerWeek: n, days: DEFAULT_DAYS_BY_COUNT[n] });

export function QuizSchedule() {
  const t = useT();
  const router = useRouter();
  const { answers } = useQuizAnswers();
  const { daysPerWeek, days, sessionMin } = answers;
  const [shake, setShake] = useState(false);
  const shakeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const navigating = useRef(false);

  useEffect(() => () => {
    if (shakeTimer.current) clearTimeout(shakeTimer.current);
  }, []);

  const onToggleDay = (d: Weekday) => {
    const next = toggleDay(days, d);
    if (!next) {
      setShake(true);
      if (shakeTimer.current) clearTimeout(shakeTimer.current);
      shakeTimer.current = setTimeout(() => setShake(false), SHAKE_MS);
      return;
    }
    setQuizAnswers({ days: next, daysPerWeek: next.length });
  };

  const canContinue = days.length === daysPerWeek && days.length >= MIN_DAYS;

  const onContinue = () => {
    if (!canContinue || navigating.current) return;
    navigating.current = true;
    completeQuizStep(3);
    track("quiz_step_completed", {
      step: 3,
      step_name: "schedule",
      days_per_week: daysPerWeek,
      days: days.join(","),
      session_min: sessionMin,
    });
    router.push({ name: "quiz-body" });
    setTimeout(() => (navigating.current = false), 500);
  };

  const labels = DAY_KEYS.map((k) => t(k));

  return (
    <QuizShell
      step={3}
      total={4}
      title={t("quizSchedule.title")}
      ctaLabel={t("common.continue")}
      ctaDisabled={!canContinue}
      onCta={onContinue}
      onBack={() => router.back()}
      headerRight={<text className="quiz-sched-count">3/4</text>}
    >
      <NumberPicker variant="digits" className="quiz-sched-picker" min={MIN_DAYS} max={MAX_DAYS} value={daysPerWeek} onChange={onCount} />
      <text className="quiz-sched-hint">
        <text className="quiz-sched-hint-unit">{t("quizSchedule.unit")}</text>
        <text className="quiz-sched-hint-tone">{t(frequencyHintKey(daysPerWeek))}</text>
      </text>
      <text className="quiz-sched-h3 quiz-sched-h3-first">{t("quizSchedule.which")}</text>
      <DayPicker className={`quiz-sched-days${shake ? " quiz-sched-shake" : ""}`} value={days} labels={labels} onToggle={onToggleDay} />
      <text className="quiz-sched-h3">{t("quizSchedule.length")}</text>
      <view className="quiz-sched-len">
        {LENGTHS.map((m) => (
          <Chip key={m} label={t("quizSchedule.min", { m })} selected={sessionMin === m} onToggle={() => setQuizAnswers({ sessionMin: m })} />
        ))}
      </view>
    </QuizShell>
  );
}
