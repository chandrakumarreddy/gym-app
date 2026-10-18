import { useEffect, useMainThreadRef, useMemo, useRef, useState } from "@lynx-js/react";
import type { MainThread } from "@lynx-js/types";

import { getProgram, getProgramProgress } from "@/api/programs.ts";
import { Art } from "@/components/Art/Art.tsx";
import { Avatar } from "@/components/Avatar/Avatar.tsx";
import { Button } from "@/components/Button/Button.tsx";
import { IconButton } from "@/components/IconButton/IconButton.tsx";
import { ListRow } from "@/components/ListRow/ListRow.tsx";
import { ProBadge } from "@/components/ProBadge/ProBadge.tsx";
import { Skeleton } from "@/components/Skeleton/Skeleton.tsx";
import { useAsync } from "@/hooks/useAsync.ts";
import { useLocale } from "@/hooks/useLocale.tsx";
import type { StringKey } from "@/hooks/useLocale.tsx";
import { useRouter } from "@/hooks/useRouter.tsx";
import { useSkeletonCount } from "@/hooks/useSkeletonCount.ts";
import { useEntitlement } from "@/services/purchases.ts";
import type { RouteParams } from "@/types/route.ts";
import type { MainThreadScrollEvent } from "@/types/lynx.d.ts";

import { StatusDot } from "./components/StatusDot/StatusDot.tsx";
import type { StatusDotState } from "./components/StatusDot/StatusDot.tsx";
import { WeekTabs, WeekTabsSkeleton } from "./components/WeekTabs/WeekTabs.tsx";

import "./Program.css";

const HERO_H = 330;
const FADE_START = HERO_H - 120;
const FADE_RANGE = 80;
const OPACITY_STEPS = 20;
const MOCK_DOWNLOAD_MS = 1500;

type DownloadState = "idle" | "downloading" | "done";

function SkelLine({ h, w, className = "" }: { h: number; w: number | string; className?: string }) {
  return (
    <view className={`program-skel-line ${className}`} style={{ height: `${h}px` }}>
      <Skeleton width={w} height={Math.round(h * 0.65)} radius={6} />
    </view>
  );
}

function RowsSkeleton({ count }: { count: number }) {
  return (
    <view className="program-col program-mt8">
      {Array.from({ length: count }, (_, i) => (
        <view key={i} className="list-row program-row">
          <view className="list-row-thumb">
            <Skeleton width={64} height={64} radius={14} />
          </view>
          <view className="list-row-body">
            <Skeleton width={56} height={10} radius={5} />
            <Skeleton width="70%" height={14} radius={6} className="program-mt6" />
            <Skeleton width="50%" height={12} radius={6} className="program-mt6" />
          </view>
          <Skeleton width={26} height={26} radius={999} className="program-ml10" />
        </view>
      ))}
    </view>
  );
}

function parseSession(id: string): { w: number; d: number } | null {
  const m = /-w(\d+)d(\d+)$/.exec(id);
  return m ? { w: Number(m[1]), d: Number(m[2]) } : null;
}

export function Program({ programId, weekIndex }: RouteParams<"program">) {
  const { t, locale } = useLocale();
  const { push, back, openLocked } = useRouter();
  const { premium, ownedPrograms } = useEntitlement();
  const [reload, setReload] = useState(0);
  const { data: program, loading, error } = useAsync(() => getProgram(programId), [programId, reload]);
  const { data: progress, loading: progressLoading } = useAsync(() => getProgramProgress(programId), [programId, reload]);
  const skelWeeks = useSkeletonCount("program.weeks", 4, program?.weekList.length);
  const [selectedWeek, setSelectedWeek] = useState<number | null>(weekIndex ?? null);
  const [download, setDownload] = useState<DownloadState>("idle");
  const downloadTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(
    () => () => {
      if (downloadTimer.current) clearTimeout(downloadTimer.current);
    },
    [],
  );

  const topbarBgRef = useMainThreadRef<MainThread.Element | null>(null);
  const heroRef = useMainThreadRef<MainThread.Element | null>(null);
  const lastStep = useMainThreadRef(0);

  function onScroll(e: MainThreadScrollEvent) {
    "main thread";
    const y = e.detail.scrollTop;
    const step = Math.round(Math.min(1, Math.max(0, (y - FADE_START) / FADE_RANGE)) * OPACITY_STEPS);
    if (step !== lastStep.current) {
      lastStep.current = step;
      topbarBgRef.current?.setStyleProperty("opacity", String(step / OPACITY_STEPS));
    }
    if (y < HERO_H) heroRef.current?.setStyleProperty("transform", `translateY(${Math.max(0, y) * 0.5}px)`);
  }

  const vm = useMemo(() => {
    if (!program) return null;
    const owned = !!program.packProductId && ownedPrograms.includes(program.packProductId);
    const unlocked = premium || owned;
    const fullyLocked = program.premium && !unlocked;
    const done = new Set(progress?.doneSessionIds ?? []);
    const next = progress?.nextSessionId ?? null;
    const week = selectedWeek ?? progress?.currentWeek ?? 1;
    const tabs = program.weekList.map((w) => ({ index: w.index, label: t("program.week", { n: w.index }), locked: !unlocked && !w.free }));
    const current = program.weekList.find((w) => w.index === week) ?? program.weekList[0];
    const weekLocked = tabs.find((x) => x.index === current?.index)?.locked ?? false;
    const upper = (s: string) => (locale === "en" ? s.toUpperCase() : s);
    const rows = (current?.sessions ?? []).map((s) => {
      const state: StatusDotState = weekLocked ? "locked" : done.has(s.id) ? "done" : s.id === next ? "next" : "todo";
      return {
        id: s.id,
        art: s.art,
        title: s.title,
        eyebrow: upper(s.id === next ? t("program.upNext", { n: s.dayIndex }) : t("program.day", { n: s.dayIndex })),
        caption: t("program.rowCaption", { min: s.durationMin, n: s.exerciseCount }),
        state,
      };
    });
    const nextPos = next ? parseSession(next) : null;
    const cta = fullyLocked
      ? { kind: "unlock" as const, label: t("program.unlock"), sessionId: null }
      : next && nextPos
        ? {
            kind: "continue" as const,
            label: nextPos.w > 1 ? t("program.continueWeek", { w: nextPos.w, d: nextPos.d }) : t("program.continue", { day: nextPos.d }),
            sessionId: next,
          }
        : { kind: "restart" as const, label: t("program.restart"), sessionId: program.weekList[0]?.sessions[0]?.id ?? null };
    return {
      fullyLocked,
      week: current?.index ?? 1,
      tabs,
      rows,
      cta,
      coachLine: `${t("program.coach", { name: program.coach.name })} · ${program.tags.join(" · ")}`,
      pills: [
        t("program.weeks", { n: program.weeks }),
        t("program.perWeek", { n: program.daysPerWeek }),
        t("program.min", { n: program.sessionMin }),
        t(`program.level.${program.level}` as StringKey),
      ],
      sessionCount: program.weeks * program.daysPerWeek,
    };
  }, [program, progress, selectedWeek, premium, ownedPrograms, t, locale]);

  const lockProgram = (week?: number) => {
    if (!program) return;
    openLocked({
      contentType: "program",
      contentId: week ? `${program.id}:week:${week}` : program.id,
      title: program.title,
      sessionCount: vm?.sessionCount,
      packProductId: program.packProductId as `pack_${string}` | undefined,
      source: "program",
    });
  };

  const onDownload = () => {
    if (!program) return;
    if (!premium) {
      openLocked({ contentType: "feature", contentId: "download", title: program.title, source: "program" });
      return;
    }
    if (download !== "idle") return;
    setDownload("downloading");
    downloadTimer.current = setTimeout(() => setDownload("done"), MOCK_DOWNLOAD_MS);
  };

  const onCta = () => {
    if (!vm) return;
    if (vm.cta.kind === "unlock") lockProgram();
    else if (vm.cta.sessionId) push({ name: "workout", sessionId: vm.cta.sessionId, source: "program_cta" });
  };

  const onRow = (id: string, state: StatusDotState) => {
    if (state === "locked") lockProgram(vm?.week);
    else push({ name: "workout", sessionId: id, source: "program_row" });
  };

  const skelRows = useSkeletonCount("program.rows", 3, vm && !progressLoading ? vm.rows.length : undefined);

  const art = program?.art ?? { variant: "v1" as const };
  const notFound = !loading && !error && program === null;

  return (
    <view className="program">
      <scroll-view className="program-scroll" scroll-orientation="vertical" main-thread:bindscroll={onScroll}>
        <view className="program-hero" main-thread:ref={heroRef}>
          {!program && loading ? <Skeleton height="100%" radius={0} /> : <Art spec={art} fill scrim figureScale={0.85} />}
        </view>
        <view className="program-body">
          {vm && program ? (
            <view className="program-col">
              <text className="program-title" text-maxline="2">
                {program.title}
              </text>
              <view className="program-coach">
                <Avatar initials={program.coach.initials} size={28} tone="ember" />
                <text className="program-coach-text" text-maxline="1">
                  {vm.coachLine}
                </text>
              </view>
              <view className="program-pills">
                {vm.pills.map((p) => (
                  <view key={p} className="program-pill">
                    <text className="program-pill-text">{p}</text>
                  </view>
                ))}
              </view>
              {progressLoading ? (
                <view className="program-col">
                  <view className="program-mt20">
                    <WeekTabsSkeleton count={Math.max(1, Math.min(program.weekList.length, 4))} />
                  </view>
                  <RowsSkeleton count={Math.max(1, program.daysPerWeek)} />
                </view>
              ) : (
                <view className="program-col">
                  <view className="program-mt20">
                    <WeekTabs items={vm.tabs} selected={vm.week} onSelect={setSelectedWeek} onLockedTap={lockProgram} />
                  </view>
                  <view className="program-col program-mt8">
                    {vm.rows.length === 0 ? <text className="program-empty">{t("program.restWeek")}</text> : null}
                    {vm.rows.map((r) => (
                      <ListRow
                        key={r.id}
                        className="program-row"
                        thumb={<Art spec={r.art} size={64} radius={14} figureScale={0.75} />}
                        eyebrow={r.eyebrow}
                        title={r.title}
                        caption={r.caption}
                        trailing={<StatusDot state={r.state} />}
                        onTap={() => onRow(r.id, r.state)}
                      />
                    ))}
                  </view>
                </view>
              )}
            </view>
          ) : loading ? (
            <view className="program-col">
              <SkelLine h={36} w={240} className="program-mt16" />
              <view className="program-coach">
                <Skeleton width={28} height={28} radius={999} />
                <Skeleton width={200} height={12} radius={6} className="program-ml8" />
              </view>
              <view className="program-pills">
                {[72, 72, 60, 96].map((w, i) => (
                  <Skeleton key={i} width={w} height={24} radius={999} className="program-pill-skel" />
                ))}
              </view>
              <view className="program-mt20">
                <WeekTabsSkeleton count={Math.max(1, Math.min(skelWeeks, 4))} />
              </view>
              <RowsSkeleton count={Math.max(1, skelRows)} />
            </view>
          ) : (
            <view className="program-state-card">
              <text className="program-state-card-text">{notFound ? t("program.notFound") : t("program.error")}</text>
              {notFound ? (
                <Button label={t("common.back")} variant="ghost" size="sm" onTap={() => back()} />
              ) : (
                <Button label={t("common.retry")} variant="ghost" size="sm" onTap={() => setReload((n) => n + 1)} />
              )}
            </view>
          )}
        </view>
      </scroll-view>

      <view className="program-topbar">
        <view className="program-topbar-bg" main-thread:ref={topbarBgRef} />
        <view className="program-topbar-row">
          <IconButton icon="chev-l" variant="glass" onTap={() => back()} />
          <view className="program-topbar-actions">
            <IconButton
              icon={download === "done" ? "check" : "download"}
              variant="glass"
              disabled={download === "downloading"}
              badge={premium ? undefined : <ProBadge mini />}
              onTap={onDownload}
            />
            <IconButton icon="share" variant="glass" className="program-ml8" />
          </view>
        </view>
      </view>

      {loading || (!!program && progressLoading) ? (
        <view className="program-footer">
          <Skeleton height={56} radius={16} />
        </view>
      ) : vm && (vm.cta.sessionId !== null || vm.cta.kind === "unlock") ? (
        <view className="program-footer">
          <Button
            label={vm.cta.label}
            variant={vm.cta.kind === "restart" ? "ghost" : vm.cta.kind === "unlock" ? "gold" : "primary"}
            icon={vm.cta.kind === "unlock" ? "lock" : "play"}
            fullWidth
            onTap={onCta}
          />
        </view>
      ) : null}
    </view>
  );
}
