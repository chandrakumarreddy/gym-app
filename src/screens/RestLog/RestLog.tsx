import { useEffect, useRef, useState } from "@lynx-js/react";

import { track } from "@/api/analytics.ts";
import { getLastLog, getNextWeight } from "@/api/sessions.ts";
import { BottomSheet } from "@/components/BottomSheet/BottomSheet.tsx";
import { Button } from "@/components/Button/Button.tsx";
import { Chip } from "@/components/Chip/Chip.tsx";
import { Icon } from "@/components/Icon/Icon.tsx";
import { IconButton } from "@/components/IconButton/IconButton.tsx";
import { ListRow } from "@/components/ListRow/ListRow.tsx";
import { RestRing } from "@/components/RestRing/RestRing.tsx";
import { Stepper } from "@/components/Stepper/Stepper.tsx";
import { useAsync } from "@/hooks/useAsync.ts";
import { useT } from "@/hooks/useLocale.tsx";
import { useRouter } from "@/hooks/useRouter.tsx";
import { useEntitlement } from "@/services/purchases.ts";
import * as session from "@/state/workoutSession.ts";
import type { RouteParams } from "@/types/route.ts";
import type { Effort } from "@/types/session.ts";
import { formatClock, formatKg, formatSet } from "@/utils/format.ts";
import { currentExercise, isLastSet, logFor, prefillFor, setsOf, stepperBounds } from "@/utils/session.ts";

import { CoachTip } from "./components/CoachTip/CoachTip.tsx";
import { CoachTipSkeleton, LastTimeSkeleton, RestLogSkeleton, StepperValueSkeleton } from "./components/RestLogSkeleton/RestLogSkeleton.tsx";

import "./RestLog.css";

const EFFORTS: Effort[] = ["easy", "just_right", "hard", "max"];

type RestLogProps = RouteParams<"rest-log"> & { onCollapse?: () => void };

function remainingMs(endsAt: number | undefined): number {
  return endsAt ? Math.max(0, endsAt - Date.now()) : 0;
}

export function RestLog({ sessionId, onCollapse }: RestLogProps) {
  const t = useT();
  const { push, replace } = useRouter();
  const { premium } = useEntitlement();
  const s = session.useWorkoutSession((x) => (x && x.id === sessionId ? x : null));

  useEffect(() => {
    if (session.getState()?.id === sessionId) return;
    const saved = session.getSaved();
    if (saved?.id === sessionId) session.restore(saved);
  }, [sessionId]);

  const ex = s ? currentExercise(s) : undefined;
  const exId = ex?.id ?? "";
  const setIndex = s?.setIndex ?? 0;
  const setCount = setsOf(ex);
  const hasNextSet = setIndex + 1 < setCount;
  const last = s ? isLastSet(s) : false;

  const endsAt = s?.rest?.endsAt;
  const durationMs = (s?.rest?.durationSec ?? 60) * 1000;
  const [ring, setRing] = useState(() => ({ remaining: remainingMs(endsAt), running: remainingMs(endsAt) > 0 }));
  const [remainingSec, setRemainingSec] = useState(() => Math.ceil(remainingMs(endsAt) / 1000));

  useEffect(() => {
    const r = remainingMs(endsAt);
    setRing({ remaining: r, running: r > 0 });
    setRemainingSec(Math.ceil(r / 1000));
    if (r <= 0) return;
    const id = setInterval(() => {
      const left = remainingMs(endsAt);
      setRemainingSec(Math.ceil(left / 1000));
      if (left <= 0) {
        clearInterval(id);
        setRing({ remaining: 0, running: false });
        track("rest_ended", { exerciseId: exId, setIndex });
      }
    }, 1000);
    return () => clearInterval(id);
  }, [endsAt]);

  const lastTime = useAsync(() => (exId ? getLastLog(exId) : Promise.resolve(null)), [exId]);
  const suggestion = useAsync(
    () => (exId && premium && hasNextSet ? getNextWeight(exId, setIndex + 1) : Promise.resolve(null)),
    [exId, setIndex, premium, hasNextSet],
  );

  const [weightKg, setWeightKg] = useState(0);
  const [reps, setReps] = useState(0);
  const [effort, setEffort] = useState<Effort>("just_right");
  const touched = useRef(false);
  const saving = useRef(false);
  const [sheetOpen, setSheetOpen] = useState(false);
  const [confirmEnd, setConfirmEnd] = useState(false);

  useEffect(() => {
    touched.current = false;
    saving.current = false;
    setEffort((s && ex && logFor(s, ex.id, setIndex)?.effort) || "just_right");
  }, [exId, setIndex]);

  useEffect(() => {
    if (!s || !ex || touched.current) return;
    const v = prefillFor(ex, logFor(s, ex.id, setIndex), suggestion.data ?? null, lastTime.data ?? null);
    setWeightKg(v.weightKg);
    setReps(v.reps);
  }, [exId, setIndex, lastTime.loading, suggestion.loading]);

  if (!s || !ex) {
    return (
      <RestLogSkeleton
        effortQ={t("restLog.effortQ")}
        saveLabel={t("restLog.save")}
        onCollapse={() => (onCollapse ? onCollapse() : replace({ name: "player", sessionId }))}
      />
    );
  }

  const bounds = stepperBounds(ex);
  const edit = (fn: () => void) => {
    touched.current = true;
    fn();
  };

  const onSave = () => {
    if (saving.current) return;
    saving.current = true;
    const usedSuggestion = !!suggestion.data && suggestion.data.weightKg === weightKg && suggestion.data.reps === reps;
    session.logSet({ weightKg, reps, effort });
    track("set_logged", { exerciseId: ex.id, setIndex, weightKg, reps, effort, usedSuggestion });
    session.advance();
    if (last) replace({ name: "complete", sessionId });
    else if (!onCollapse) replace({ name: "player", sessionId });
  };

  const onCollapseTap = () => {
    if (onCollapse) onCollapse();
    else replace({ name: "player", sessionId });
  };

  const onExtend = () => {
    session.extendRest(15);
    track("rest_extended", { exerciseId: ex.id });
  };

  const onSkip = () => {
    track("rest_skipped", { remainingSec });
    session.skipRest();
  };

  const onTipLocked = () => {
    track("lock_tapped", { content: "next_weight" });
    push({ name: "paywall", source: "rest_next_weight" });
  };

  const closeSheet = () => {
    setSheetOpen(false);
    setConfirmEnd(false);
  };

  const onSkipExercise = () => {
    closeSheet();
    const cur = session.getState();
    if (!cur) return;
    if (cur.exerciseIndex + 1 < cur.workout.exercises.length) {
      session.jumpTo(cur.exerciseIndex + 1);
      session.play();
      if (!onCollapse) replace({ name: "player", sessionId });
    } else {
      replace({ name: "complete", sessionId });
    }
  };

  const onSwap = () => {
    closeSheet();
    push({ name: "workout", sessionId });
  };

  const onEnd = () => {
    if (!confirmEnd) {
      setConfirmEnd(true);
      return;
    }
    closeSheet();
    replace({ name: "complete", sessionId });
  };

  const lastLog = lastTime.data;
  const sug = suggestion.data;
  const prefillPending = !touched.current && (lastTime.loading || suggestion.loading);
  const tipPending = hasNextSet && premium && suggestion.loading;
  let tip: { text: string; locked?: boolean; onTap?: () => void } | null = null;
  if (hasNextSet) {
    if (!premium) tip = { text: t("restLog.tipLocked"), locked: true, onTap: onTipLocked };
    else if (sug) tip = { text: t(sug.weightKg === weightKg ? "restLog.tipStay" : "restLog.tipGo", { set: setIndex + 2, kg: formatKg(sug.weightKg), reps: sug.reps }) };
    else if (suggestion.error) tip = { text: t("restLog.tipOffline") };
  }

  return (
    <view className="restlog">
      <view className="restlog-header">
        <IconButton icon="chev-d" onTap={onCollapseTap} />
        <text className="restlog-subtitle" text-maxline="1">{t("restLog.subtitle", { exercise: ex.name, i: setIndex + 1, n: setCount })}</text>
        <IconButton icon="more" onTap={() => setSheetOpen(true)} />
      </view>
      <scroll-view className="restlog-scroll" scroll-orientation="vertical">
        <view className="restlog-ring">
          <RestRing
            size={200}
            stroke={12}
            durationMs={durationMs}
            remainingMs={ring.remaining}
            running={ring.running}
            label={t("restLog.rest")}
            valueText={formatClock(remainingSec)}
          />
        </view>
        <view className="restlog-chips">
          <Chip label={t("restLog.extend")} onTap={onExtend} />
          <Chip label={t("restLog.skip")} className="restlog-chip-gap" onTap={onSkip} />
        </view>
        <view className="restlog-card">
          <view className="restlog-card-head">
            <text className="restlog-card-title">{t("restLog.logSet", { n: setIndex + 1 })}</text>
            {lastTime.loading ? (
              <LastTimeSkeleton />
            ) : lastLog ? (
              <view className="restlog-last">
                <Icon name="check" tone="green" size={14} />
                <text className="restlog-last-text">{t("restLog.lastTime", { set: formatSet(lastLog.weightKg, lastLog.reps) })}</text>
              </view>
            ) : null}
          </view>
          <view className="restlog-steppers">
            {bounds.weight ? (
              <view className="restlog-stepper-slot">
                <Stepper
                  label={t("restLog.weight")}
                  value={weightKg}
                  step={bounds.weight.step}
                  min={bounds.weight.min}
                  max={bounds.weight.max}
                  format="kg"
                  onChange={(v) => edit(() => setWeightKg(v))}
                />
                {prefillPending ? <StepperValueSkeleton /> : null}
              </view>
            ) : (
              <view className="restlog-bodyweight">
                <text className="restlog-bodyweight-text">{t("restLog.bodyweight")}</text>
              </view>
            )}
            <view className="restlog-stepper-gap" />
            <view className="restlog-stepper-slot">
              <Stepper
                label={t("restLog.reps")}
                value={reps}
                step={bounds.reps.step}
                min={bounds.reps.min}
                max={bounds.reps.max}
                onChange={(v) => edit(() => setReps(v))}
              />
              {prefillPending ? <StepperValueSkeleton /> : null}
            </view>
          </view>
          <text className="restlog-effort-q">{t("restLog.effortQ")}</text>
          <view className="restlog-efforts">
            {EFFORTS.map((e) => (
              <Chip key={e} className="restlog-effort" label={t(`restLog.effort.${e}`)} selected={effort === e} onToggle={() => setEffort(e)} />
            ))}
          </view>
          {tipPending ? <CoachTipSkeleton /> : tip ? <CoachTip text={tip.text} locked={tip.locked} onTap={tip.onTap} /> : null}
        </view>
      </scroll-view>
      <view className="restlog-footer">
        <view className="restlog-fade" />
        <Button label={t(last ? "restLog.saveFinish" : "restLog.save")} fullWidth onTap={onSave} />
      </view>
      <BottomSheet visible={sheetOpen} onDismiss={closeSheet} title={t("restLog.more.title")}>
        <ListRow title={t("restLog.more.skip")} leading={<Icon name="next" size={20} />} onTap={onSkipExercise} />
        <ListRow title={t("restLog.more.swap")} leading={<Icon name="refresh" size={20} />} chevron onTap={onSwap} />
        <ListRow
          title={t(confirmEnd ? "restLog.more.endConfirm" : "restLog.more.end")}
          leading={<Icon name="x" size={20} />}
          onTap={onEnd}
        />
      </BottomSheet>
    </view>
  );
}
