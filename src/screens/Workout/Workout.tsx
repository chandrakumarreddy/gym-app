import { useEffect, useMainThreadRef, useMemo, useRef, useState } from "@lynx-js/react";
import type { MainThread } from "@lynx-js/types";

import { getSession } from "@/api/sessions.ts";
import { Art } from "@/components/Art/Art.tsx";
import { BottomSheet } from "@/components/BottomSheet/BottomSheet.tsx";
import { Button } from "@/components/Button/Button.tsx";
import { IconButton } from "@/components/IconButton/IconButton.tsx";
import { ListRow } from "@/components/ListRow/ListRow.tsx";
import { ProBadge } from "@/components/ProBadge/ProBadge.tsx";
import { ScreenHeader } from "@/components/ScreenHeader/ScreenHeader.tsx";
import { Skeleton } from "@/components/Skeleton/Skeleton.tsx";
import { StatCard } from "@/components/StatCard/StatCard.tsx";
import { useAsync } from "@/hooks/useAsync.ts";
import { useLocale } from "@/hooks/useLocale.tsx";
import type { StringKey, TFn } from "@/hooks/useLocale.tsx";
import { useRouter } from "@/hooks/useRouter.tsx";
import { useSkeletonCount } from "@/hooks/useSkeletonCount.ts";
import { useEntitlement } from "@/services/purchases.ts";
import type { Exercise, ExerciseEquipment } from "@/types/content.ts";
import type { RouteParams } from "@/types/route.ts";
import type { MainThreadScrollEvent } from "@/types/lynx.d.ts";
import { formatReps } from "@/utils/format.ts";

import { ExerciseDemo } from "./components/ExerciseDemo/ExerciseDemo.tsx";
import type { ExerciseDemoVM } from "./components/ExerciseDemo/ExerciseDemo.tsx";
import { InfoNote } from "./components/InfoNote/InfoNote.tsx";

import "./Workout.css";

const COMPACT_THRESHOLD = 160;
const MOCK_DOWNLOAD_MS = 1500;
const EQUIPMENT_ORDER: ExerciseEquipment[] = ["dumbbell", "barbell", "kettlebell", "machine", "band", "bench"];

type DownloadState = "idle" | "downloading" | "done";

function SkelLine({ h, w, className = "" }: { h: number; w: number | string; className?: string }) {
  return (
    <view className={`workout-skel-line ${className}`} style={{ height: `${h}px` }}>
      <Skeleton width={w} height={Math.round(h * 0.65)} radius={6} />
    </view>
  );
}

function WorkoutSkeleton({ rows }: { rows: number }) {
  return (
    <view className="workout-col">
      <SkelLine h={16} w={110} className="workout-mt8" />
      <SkelLine h={36} w={240} className="workout-mt6" />
      <view className="workout-stats">
        {[0, 1, 2].map((i) => (
          <view key={i} className={`stat-card workout-stat${i ? " workout-stat-gap" : ""}`}>
            <Skeleton width="60%" height={11} radius={6} className="workout-mt4" />
            <Skeleton width="40%" height={20} radius={6} className="workout-mt8" />
          </view>
        ))}
      </view>
      <view className="workout-section">
        <SkelLine h={22} w={90} />
        <SkelLine h={22} w={120} />
      </view>
      {Array.from({ length: rows }, (_, i) => (
        <view key={i} className="list-row">
          <view className="list-row-thumb">
            <Skeleton width={56} height={56} radius={14} />
          </view>
          <view className="list-row-body">
            <Skeleton width="65%" height={14} radius={6} />
            <Skeleton width="40%" height={12} radius={6} className="workout-mt8" />
          </view>
        </view>
      ))}
    </view>
  );
}

function formatPrescription(ex: Exercise, t: TFn): string {
  if (ex.kind === "follow_along") return t("workout.followAlong", { n: Math.round((ex.durationSec ?? 0) / 60) });
  const vars = { s: ex.sets ?? 1, r: formatReps(ex.reps ?? 0) };
  if (ex.repsUnit === "reps_per_leg") return t("workout.sxrEach", vars);
  if (ex.repsUnit === "sec") return t("workout.sxrSec", vars);
  return t("workout.sxr", vars);
}

function summarizeEquipment(list: ExerciseEquipment[], t: TFn): string {
  const set = new Set<ExerciseEquipment>(list.filter((e) => e !== "bodyweight"));
  const sorted = EQUIPMENT_ORDER.filter((e) => set.has(e));
  return sorted.length ? sorted.map((e) => t(`workout.eq.${e}` as StringKey)).join(" · ") : t("workout.noEquipment");
}

export function Workout({ sessionId, source }: RouteParams<"workout">) {
  const { t, locale } = useLocale();
  const { push, back, openLocked } = useRouter();
  const { premium, ownedPrograms } = useEntitlement();
  const [reload, setReload] = useState(0);
  const { data: session, loading } = useAsync(() => getSession(sessionId), [sessionId, reload]);
  const skelRows = useSkeletonCount("workout.exercises", 5, session?.exercises.length);
  const [demoId, setDemoId] = useState<string | null>(null);
  const [download, setDownload] = useState<DownloadState>("idle");
  const downloadTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const compactRef = useMainThreadRef<MainThread.Element | null>(null);
  const compactOn = useMainThreadRef(false);

  function onScroll(e: MainThreadScrollEvent) {
    "main thread";
    const on = e.detail.scrollTop > COMPACT_THRESHOLD;
    if (on !== compactOn.current) {
      compactOn.current = on;
      compactRef.current?.setStyleProperty("opacity", on ? "1" : "0");
    }
  }

  useEffect(
    () => () => {
      if (downloadTimer.current) clearTimeout(downloadTimer.current);
    },
    [],
  );

  useEffect(() => {
    if (!session?.premium || premium) return;
    if (ownedPrograms.some((p) => p === `pack_${session.programId.replace(/-/g, "_")}`)) return;
    if (openLocked({ contentType: "session", contentId: session.id, title: session.title, source: "workout" })) back();
  }, [session?.id]);

  const vm = useMemo(() => {
    if (!session) return null;
    const upper = (s: string) => (locale === "en" ? s.toUpperCase() : s);
    const setCount = session.exercises.reduce((n, ex) => n + (ex.sets ?? 0), 0);
    return {
      eyebrow: upper(t("workout.eyebrow", { w: session.weekIndex, d: session.dayIndex })),
      time: String(session.durationMin),
      exercises: String(session.exercises.length),
      sets: setCount > 0 ? String(setCount) : "—",
      equipment: summarizeEquipment(session.equipment, t),
      swapNote: session.appliedSwapReason && session.exercises.some((e) => e.swappedFrom) ? t(`workout.swap.${session.appliedSwapReason}` as StringKey) : null,
      rows: session.exercises.map((ex) => ({ id: ex.id, art: ex.art, title: ex.name, caption: formatPrescription(ex, t), swapped: !!ex.swappedFrom })),
    };
  }, [session, t, locale]);

  const demo = useMemo<ExerciseDemoVM | null>(() => {
    const ex = session?.exercises.find((e) => e.id === demoId);
    if (!ex) return null;
    return {
      art: ex.art,
      name: ex.name,
      prescription: formatPrescription(ex, t),
      swapNote: ex.swappedFrom ? `${t("workout.swappedFrom", { name: ex.swappedFrom.name })} · ${t(`workout.reason.${ex.swappedFrom.reason}` as StringKey)}` : undefined,
      cuesTitle: t("workout.cues"),
      cues: ex.cues.map((c) => c.text[locale]),
    };
  }, [session, demoId, t, locale]);

  const lockFeature = (feature: "cast" | "download") =>
    openLocked({ contentType: "feature", contentId: feature, title: session?.title ?? "", source: "workout" });

  const onCast = () => {
    if (!premium) lockFeature("cast");
  };

  const onDownload = () => {
    if (!premium) {
      lockFeature("download");
      return;
    }
    if (download !== "idle") return;
    setDownload("downloading");
    downloadTimer.current = setTimeout(() => setDownload("done"), MOCK_DOWNLOAD_MS);
  };

  const start = () => push({ name: "player", sessionId, source: source ?? "workout" });

  return (
    <view className="workout">
      <scroll-view className="workout-scroll" scroll-orientation="vertical" main-thread:bindscroll={onScroll}>
        <view className="workout-content">
          <ScreenHeader
            variant="nav"
            className="workout-header"
            onBack={() => back()}
            right={
              <view className="workout-actions">
                <IconButton icon="cast" badge={premium ? undefined : <ProBadge mini />} onTap={onCast} />
                <IconButton
                  icon={download === "done" ? "check" : "download"}
                  className="workout-ml8"
                  disabled={download === "downloading"}
                  badge={premium ? undefined : <ProBadge mini />}
                  onTap={onDownload}
                />
              </view>
            }
          />

          {vm && session ? (
            <view className="workout-col">
              <text className="workout-eyebrow">{vm.eyebrow}</text>
              <text className="workout-title" text-maxline="2">
                {session.title}
              </text>
              <view className="workout-stats">
                <StatCard label={t("workout.time")} value={vm.time} unit={t("workout.min")} className="workout-stat" />
                <StatCard label={t("workout.exercises")} value={vm.exercises} className="workout-stat workout-stat-gap" />
                <StatCard label={t("workout.sets")} value={vm.sets} className="workout-stat workout-stat-gap" />
              </view>
              {vm.swapNote ? <InfoNote icon="shield" text={vm.swapNote} className="workout-mt16" /> : null}
              <view className="workout-section">
                <text className="workout-section-title">{t("workout.exercises")}</text>
                <text className="workout-section-meta">{vm.equipment}</text>
              </view>
              {vm.rows.map((r) => (
                <ListRow
                  key={r.id}
                  thumb={<Art spec={r.art} size={56} radius={14} figureScale={0.75} />}
                  title={r.title}
                  caption={r.caption}
                  trailing={
                    r.swapped ? (
                      <view className="workout-swapped">
                        <text className="workout-swapped-text">{t("workout.swapped")}</text>
                      </view>
                    ) : null
                  }
                  onTap={() => setDemoId(r.id)}
                />
              ))}
            </view>
          ) : loading ? (
            <WorkoutSkeleton rows={skelRows} />
          ) : (
            <view className="workout-card">
              <text className="workout-card-text">{t("workout.error")}</text>
              <Button label={t("common.retry")} variant="ghost" size="sm" onTap={() => setReload((n) => n + 1)} />
            </view>
          )}
        </view>
      </scroll-view>

      <view className="workout-compact" main-thread:ref={compactRef}>
        <text className="workout-compact-title" text-maxline="1">
          {session?.title ?? ""}
        </text>
      </view>

      <view className="workout-footer">
        <Button label={t("workout.start")} icon="play" fullWidth disabled={!session} onTap={start} />
      </view>

      <BottomSheet visible={demo !== null} onDismiss={() => setDemoId(null)}>
        {demo ? <ExerciseDemo {...demo} /> : null}
      </BottomSheet>
    </view>
  );
}
