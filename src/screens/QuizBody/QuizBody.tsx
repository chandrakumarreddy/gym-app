import { useRef, useState } from "@lynx-js/react";

import { track } from "@/api/analytics.ts";
import { BottomSheet } from "@/components/BottomSheet/BottomSheet.tsx";
import { Button } from "@/components/Button/Button.tsx";
import { Chip } from "@/components/Chip/Chip.tsx";
import { NumberPicker } from "@/components/NumberPicker/NumberPicker.tsx";
import { QuizShell } from "@/components/QuizShell/QuizShell.tsx";
import { SegmentedControl } from "@/components/SegmentedControl/SegmentedControl.tsx";
import { StatCard } from "@/components/StatCard/StatCard.tsx";
import { useT } from "@/hooks/useLocale.tsx";
import type { StringKey } from "@/hooks/useLocale.tsx";
import { useRouter } from "@/hooks/useRouter.tsx";
import {
  completeQuizStep,
  setQuizAnswers,
  useQuizAnswers,
} from "@/state/quizAnswers.ts";
import type { BodyLimit, WeightUnit } from "@/types/quiz.ts";

import {
  AGE_RANGE,
  HEIGHT_RANGE,
  displayWeight,
  lbToKg,
  rulerRange,
  toggleLimit,
} from "./rules.ts";
import "./QuizBody.css";

const LIMITS: { id: BodyLimit; labelKey: StringKey }[] = [
  { id: "lower_back", labelKey: "quizBody.lowerBack" },
  { id: "knees", labelKey: "quizBody.knees" },
  { id: "shoulders", labelKey: "quizBody.shoulders" },
  { id: "wrists", labelKey: "quizBody.wrists" },
];

type SheetKind = "height" | "age";

export function QuizBody() {
  const t = useT();
  const router = useRouter();
  const { answers } = useQuizAnswers();
  const { weightKg, weightUnit, heightCm, age, limits, noLimits } = answers;
  const [sheet, setSheet] = useState<SheetKind>("height");
  const [open, setOpen] = useState(false);
  const [draft, setDraft] = useState(0);
  const navigating = useRef(false);

  const range = rulerRange(weightUnit);
  const display = displayWeight(weightKg, weightUnit);

  const onUnit = (unit: WeightUnit) => {
    if (unit !== weightUnit) setQuizAnswers({ weightUnit: unit });
  };

  const onWeight = (v: number) =>
    setQuizAnswers({ weightKg: weightUnit === "kg" ? v : lbToKg(v) });

  const openSheet = (kind: SheetKind) => {
    setDraft(kind === "height" ? heightCm : age);
    setSheet(kind);
    setOpen(true);
  };

  const commitSheet = () => {
    setQuizAnswers(sheet === "height" ? { heightCm: draft } : { age: draft });
    setOpen(false);
  };

  const onLimit = (l: BodyLimit) =>
    setQuizAnswers({ limits: toggleLimit(limits, l), noLimits: false });
  const onNothing = () =>
    setQuizAnswers(
      noLimits ? { noLimits: false } : { noLimits: true, limits: [] },
    );

  const canContinue = limits.length > 0 || noLimits;

  const onContinue = () => {
    if (!canContinue || navigating.current) return;
    navigating.current = true;
    completeQuizStep(4);
    track("quiz_step_completed", {
      step: 4,
      step_name: "body",
      weight_unit: weightUnit,
      has_limits: limits.length > 0,
      limits: limits.join(","),
    });
    router.push({ name: "building" });
    setTimeout(() => (navigating.current = false), 500);
  };

  const sheetRange = sheet === "age" ? AGE_RANGE : HEIGHT_RANGE;

  return (
    <view className="quiz-body">
      <QuizShell
        step={4}
        total={4}
        title={t("quizBody.title")}
        ctaLabel={t("quizBody.cta")}
        ctaDisabled={!canContinue}
        onCta={onContinue}
        onBack={() => router.back()}
        headerRight={<text className="quiz-body-count">4/4</text>}
      >
        <view className="quiz-body-weight-row">
          <text className="quiz-body-h3">{t("quizBody.weight")}</text>
          <SegmentedControl
            compact
            options={[
              { id: "kg", label: t("quizBody.unit.kg") },
              { id: "lb", label: t("quizBody.unit.lb") },
            ]}
            value={weightUnit}
            onChange={onUnit}
          />
        </view>
        <NumberPicker
          key={weightUnit}
          variant="ruler"
          className="quiz-body-ruler"
          min={range.min}
          max={range.max}
          step={range.step}
          value={display}
          unitLabel={t(
            weightUnit === "kg" ? "quizBody.unit.kg" : "quizBody.unit.lb",
          )}
          onChange={onWeight}
        />
        <view className="quiz-body-cards">
          <StatCard
            label={t("quizBody.height")}
            value={String(heightCm)}
            unit={t("quizBody.unit.cm")}
            onTap={() => openSheet("height")}
          />
          <StatCard
            label={t("quizBody.age")}
            value={String(age)}
            onTap={() => openSheet("age")}
          />
        </view>
        <text className="quiz-body-h3 quiz-body-h3-gap">
          {t("quizBody.limits")}
        </text>
        <view className="quiz-body-chips">
          {LIMITS.map((l) => (
            <Chip
              key={l.id}
              label={t(l.labelKey)}
              selected={limits.includes(l.id)}
              showCheck
              onToggle={() => onLimit(l.id)}
            />
          ))}
          <Chip
            label={t("quizBody.nothing")}
            selected={noLimits}
            showCheck
            onToggle={onNothing}
          />
        </view>
      </QuizShell>
      <BottomSheet
        visible={open}
        onDismiss={() => setOpen(false)}
        title={t(sheet === "age" ? "quizBody.age" : "quizBody.height")}
      >
        <view className="quiz-body-sheet">
          <NumberPicker
            key={sheet}
            variant="ruler"
            min={sheetRange.min}
            max={sheetRange.max}
            value={draft}
            unitLabel={sheet === "height" ? t("quizBody.unit.cm") : undefined}
            onChange={setDraft}
          />
          <Button
            label={t("common.done")}
            fullWidth
            className="quiz-body-sheet-done"
            onTap={commitSheet}
          />
        </view>
      </BottomSheet>
    </view>
  );
}
