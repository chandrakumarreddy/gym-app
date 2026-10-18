import { useEffect, useMemo, useRef, useState } from "@lynx-js/react";

import { track } from "@/api/analytics.ts";
import { haptic } from "@/api/haptics.ts";
import { postFeel } from "@/api/sessions.ts";
import { getJSON } from "@/api/storage.ts";
import { Button } from "@/components/Button/Button.tsx";
import { Chip } from "@/components/Chip/Chip.tsx";
import { StatCard } from "@/components/StatCard/StatCard.tsx";
import { useLocale } from "@/hooks/useLocale.tsx";
import { useRouter } from "@/hooks/useRouter.tsx";
import { useSkeletonCount } from "@/hooks/useSkeletonCount.ts";
import * as session from "@/state/workoutSession.ts";
import type { RouteParams } from "@/types/route.ts";
import type { Feel, SessionSummary, WorkoutSession } from "@/types/session.ts";
import { formatClock, formatNumber, formatSet } from "@/utils/format.ts";
import { summarize } from "@/utils/session.ts";

import { MetaSkeleton, PrCardSkeleton, StatsSkeleton } from "./components/CompleteSkeleton/CompleteSkeleton.tsx";
import { PrCard } from "./components/PrCard/PrCard.tsx";
import { SuccessBadge } from "./components/SuccessBadge/SuccessBadge.tsx";

import "./Complete.css";

const FEELS: Feel[] = ["too_easy", "just_right", "too_hard"];
const MAX_PRS = 3;

type Meta = { title: string; week: number; day: number };

function metaOf(s: WorkoutSession): Meta {
  return {
    title: s.workout.title,
    week: s.workout.weekIndex,
    day: s.workout.dayIndex,
  };
}

function localSummary(s: WorkoutSession): SessionSummary {
  const streak = getJSON<number>(session.STREAK_KEY) ?? 0;
  return { ...summarize(s, [], Math.max(1, streak + 1)), newPRs: [] };
}

export function Complete({ sessionId }: RouteParams<"complete">) {
  const { t, locale } = useLocale();
  const { reset } = useRouter();
  const initial = session.getState();
  const own = initial?.id === sessionId ? initial : null;

  const [meta, setMeta] = useState<Meta | null>(() => (own ? metaOf(own) : null));
  const [summary, setSummary] = useState<SessionSummary | null>(null);
  const [finishing, setFinishing] = useState(true);
  const [finished, setFinished] = useState(false);
  const [feel, setFeelState] = useState<Feel>(own?.feel ?? "just_right");
  const sent = useRef(false);
  const feelTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    let cur = session.getState();
    if (cur?.id !== sessionId) {
      const saved = session.getSaved();
      if (saved?.id === sessionId) session.restore(saved);
      cur = session.getState();
    }
    if (!cur || cur.id !== sessionId || cur.logs.length === 0) {
      if (cur?.id === sessionId) session.discard();
      reset({ name: "home" });
      return;
    }
    setMeta(metaOf(cur));
    setFeelState(cur.feel ?? "just_right");
    setSummary(localSummary(cur));
    setFinishing(true);
    setFinished(false);
    let alive = true;
    session.finish().then(
      (res) => {
        sent.current = true;
        if (!alive) return;
        haptic("success");
        setSummary(res);
        setFinishing(false);
        setFinished(true);
      },
      () => {
        if (!alive) return;
        haptic("success");
        setFinishing(false);
      },
    );
    return () => {
      alive = false;
      if (feelTimer.current) clearTimeout(feelTimer.current);
    };
  }, [sessionId]);

  const view = useMemo(() => {
    if (!summary) return null;
    const prs = summary.newPRs.slice(0, MAX_PRS).map((p) => ({
      id: p.exerciseId,
      line: t("complete.prLine", {
        exercise: p.exerciseName,
        set: formatSet(p.weightKg, p.reps),
      }),
    }));
    const streak = Math.max(1, summary.streakDays);
    return {
      time: formatClock(summary.activeSec),
      volume: formatNumber(Math.round(summary.volumeKg), locale),
      sets: t("complete.setsValue", {
        done: summary.setsDone,
        total: summary.setsTotal,
      }),
      streak: t(streak === 1 ? "complete.day" : "complete.days", { n: streak }),
      prs,
      more: summary.newPRs.length > MAX_PRS ? t("complete.prMore", { n: summary.newPRs.length - MAX_PRS }) : null,
    };
  }, [summary, locale, t]);

  const prCount = useSkeletonCount("complete.prs", 1, finished && view ? view.prs.length : undefined);
  const prSkeletons = Array.from({ length: prCount }, (_, i) => <PrCardSkeleton key={i} />);

  const onFeel = (f: Feel) => {
    setFeelState(f);
    session.setFeel(f);
    if (feelTimer.current) clearTimeout(feelTimer.current);
    feelTimer.current = setTimeout(() => {
      if (sent.current) postFeel(sessionId, f).catch(() => undefined);
    }, 400);
  };

  const onShare = () => {
    track("workout_shared", { sessionId });
  };

  const onDone = () => {
    session.setFeel(feel);
    if (sent.current) postFeel(sessionId, feel).catch(() => undefined);
    track("workout_feel_submitted", { feel });
    session.discard();
    reset({ name: "home" });
  };

  return (
    <view className="complete">
      <scroll-view className="complete-scroll" scroll-orientation="vertical">
        <SuccessBadge />
        <text className="complete-title">{t("complete.title")}</text>
        {meta ? (
          <text className="complete-meta">
            {t("complete.meta", {
              title: meta.title,
              w: meta.week,
              d: meta.day,
            })}
          </text>
        ) : (
          <MetaSkeleton />
        )}
        {view ? (
          <>
            <view className="complete-grid">
              <StatCard label={t("complete.time")} value={view.time} />
              <view className="complete-gap" />
              <StatCard label={t("complete.volume")} value={view.volume} unit={t("complete.kg")} />
            </view>
            <view className="complete-grid complete-grid-2">
              <StatCard label={t("complete.sets")} value={view.sets} />
              <view className="complete-gap" />
              <StatCard label={t("complete.streak")} value={view.streak} icon="flame" tone="default" />
            </view>
            {view.prs.map((p) => (
              <PrCard key={p.id} title={t("complete.pr")} subtitle={p.line} />
            ))}
            {finishing ? prSkeletons : null}
            {view.more ? <text className="complete-more">{view.more}</text> : null}
          </>
        ) : (
          <>
            <StatsSkeleton
              labels={{
                time: t("complete.time"),
                volume: t("complete.volume"),
                sets: t("complete.sets"),
                streak: t("complete.streak"),
              }}
            />
            {prSkeletons}
          </>
        )}
        <text className="complete-feel-q">{t("complete.feelQ")}</text>
        <view className="complete-feels">
          {FEELS.map((f) => (
            <Chip key={f} className="complete-feel" label={t(`complete.feel.${f}`)} selected={feel === f} onToggle={() => onFeel(f)} />
          ))}
        </view>
      </scroll-view>
      <view className="complete-footer">
        <view className="complete-fade" />
        <Button label={t("complete.share")} variant="ghost" icon="share" className="complete-share" onTap={onShare} />
        <Button label={t("complete.done")} className="complete-done" onTap={onDone} />
      </view>
    </view>
  );
}
