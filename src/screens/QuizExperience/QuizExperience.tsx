import { useEffect, useRef, useState } from "@lynx-js/react";

import { track } from "@/api/analytics.ts";
import { Chip } from "@/components/Chip/Chip.tsx";
import { QuizOptionCard } from "@/components/QuizOptionCard/QuizOptionCard.tsx";
import { QuizShell } from "@/components/QuizShell/QuizShell.tsx";
import { SegmentedControl } from "@/components/SegmentedControl/SegmentedControl.tsx";
import { useT } from "@/hooks/useLocale.tsx";
import type { StringKey } from "@/hooks/useLocale.tsx";
import { useRouter } from "@/hooks/useRouter.tsx";
import { completeQuizStep, setQuizAnswers, useQuizAnswers } from "@/state/quizAnswers.ts";
import type { Equipment, Level, TrainLocation } from "@/types/quiz.ts";

import { defaultEquipmentFor, toggleEquipment } from "./rules.ts";
import "./QuizExperience.css";

const LEVELS: { id: Level; titleKey: StringKey; captionKey: StringKey }[] = [
  { id: "beginner", titleKey: "quizExperience.beginner", captionKey: "quizExperience.beginner.caption" },
  { id: "intermediate", titleKey: "quizExperience.intermediate", captionKey: "quizExperience.intermediate.caption" },
  { id: "advanced", titleKey: "quizExperience.advanced", captionKey: "quizExperience.advanced.caption" },
];

const LOCATIONS: { id: TrainLocation; labelKey: StringKey }[] = [
  { id: "gym", labelKey: "quizExperience.gym" },
  { id: "home", labelKey: "quizExperience.home" },
  { id: "both", labelKey: "quizExperience.both" },
];

const EQUIPMENT: { id: Equipment; labelKey: StringKey }[] = [
  { id: "dumbbells", labelKey: "quizExperience.dumbbells" },
  { id: "barbell", labelKey: "quizExperience.barbell" },
  { id: "machines", labelKey: "quizExperience.machines" },
  { id: "bands", labelKey: "quizExperience.bands" },
  { id: "kettlebell", labelKey: "quizExperience.kettlebell" },
  { id: "bodyweight", labelKey: "quizExperience.bodyweight" },
];

const selectLevel = (level: Level) => setQuizAnswers({ level });

export function QuizExperience() {
  const t = useT();
  const router = useRouter();
  const { answers } = useQuizAnswers();
  const { level, equipment } = answers;
  const location = answers.location ?? "gym";
  const [touched, setTouched] = useState(() => answers.equipment.length > 0);
  const navigating = useRef(false);

  useEffect(() => {
    if (answers.equipment.length === 0) setQuizAnswers({ equipment: defaultEquipmentFor(location) });
  }, []);

  const onLocation = (next: TrainLocation) => {
    if (next === location) return;
    setQuizAnswers(touched ? { location: next } : { location: next, equipment: defaultEquipmentFor(next) });
  };

  const onToggle = (e: Equipment) => {
    setTouched(true);
    setQuizAnswers({ equipment: toggleEquipment(equipment, e) });
  };

  const canContinue = !!level && equipment.length > 0;

  const onContinue = () => {
    if (!canContinue || navigating.current) return;
    navigating.current = true;
    setQuizAnswers({ location });
    completeQuizStep(2);
    track("quiz_step_completed", {
      step: 2,
      step_name: "experience",
      level,
      location,
      equipment_count: equipment.length,
      equipment: equipment.join(","),
    });
    router.push({ name: "quiz-schedule" });
    setTimeout(() => (navigating.current = false), 500);
  };

  return (
    <QuizShell
      step={2}
      total={4}
      title={t("quizExperience.title")}
      ctaLabel={t("common.continue")}
      ctaDisabled={!canContinue}
      onCta={onContinue}
      onBack={() => router.back()}
      headerRight={<text className="quiz-exp-count">2/4</text>}
    >
      <view className="quiz-exp-levels">
        {LEVELS.map((l) => (
          <QuizOptionCard
            key={l.id}
            id={l.id}
            title={t(l.titleKey)}
            caption={t(l.captionKey)}
            selected={level === l.id}
            onSelect={selectLevel}
          />
        ))}
      </view>
      <text className="quiz-exp-h3">{t("quizExperience.where")}</text>
      <SegmentedControl
        className="quiz-exp-seg"
        options={LOCATIONS.map((o) => ({ id: o.id, label: t(o.labelKey) }))}
        value={location}
        onChange={onLocation}
      />
      <text className="quiz-exp-h3">{t("quizExperience.equipment")}</text>
      <view className="quiz-exp-chips">
        {EQUIPMENT.map((e) => (
          <Chip key={e.id} label={t(e.labelKey)} selected={equipment.includes(e.id)} showCheck onToggle={() => onToggle(e.id)} />
        ))}
      </view>
    </QuizShell>
  );
}
