import { useMemo, useState } from "@lynx-js/react";

import { track } from "@/api/analytics.ts";
import { getMuscleBalance, getProgress } from "@/api/progress.ts";
import { BarChart } from "@/components/BarChart/BarChart.tsx";
import { Button } from "@/components/Button/Button.tsx";
import { IconButton } from "@/components/IconButton/IconButton.tsx";
import { ListRow } from "@/components/ListRow/ListRow.tsx";
import { Pressable } from "@/components/Pressable/Pressable.tsx";
import { SegmentedControl } from "@/components/SegmentedControl/SegmentedControl.tsx";
import { StatCard } from "@/components/StatCard/StatCard.tsx";
import { useAsync } from "@/hooks/useAsync.ts";
import { useT } from "@/hooks/useLocale.tsx";
import { useRouter } from "@/hooks/useRouter.tsx";
import { useSkeletonCount } from "@/hooks/useSkeletonCount.ts";
import { useEntitlements } from "@/services/purchases.ts";
import type { MuscleBalance, ProgressRange } from "@/types/progress.ts";

import { BlurLockCard } from "./components/BlurLockCard/BlurLockCard.tsx";
import { Heatmap } from "./components/Heatmap/Heatmap.tsx";
import {
  BarChartSkeleton,
  EmptyRecordsSkeleton,
  HeatmapSkeleton,
  RecordRowSkeleton,
  StatCardSkeleton,
} from "./components/ProgressSkeleton/ProgressSkeleton.tsx";
import { PLACEHOLDER_CELLS, toHeatCells, toProgressVM } from "./progressVM.ts";

import "./Progress.css";

const LOCKED_RANGES: ProgressRange[] = ["month", "year"];
const CHART_HEIGHT = 120;

export function Progress() {
  const t = useT();
  const { push } = useRouter();
  const { isPremium } = useEntitlements();
  const [picked, setPicked] = useState<ProgressRange>("week");
  const [attempt, setAttempt] = useState(0);
  const [balanceAttempt, setBalanceAttempt] = useState(0);
  const range: ProgressRange = isPremium ? picked : "week";

  const summary = useAsync(() => getProgress(range), [range, attempt]);
  const balance = useAsync<MuscleBalance | null>(() => (isPremium ? getMuscleBalance() : Promise.resolve(null)), [isPremium, balanceAttempt]);

  const vm = useMemo(() => (summary.data ? toProgressVM(summary.data, t) : null), [summary.data, t]);
  const recordCount = useSkeletonCount("progress.records", 2, vm ? (vm.empty ? 0 : vm.records.length) : undefined);
  const heatCells = useMemo(() => (balance.data ? toHeatCells(balance.data) : null), [balance.data]);

  const options = useMemo(
    () => [
      { id: "week" as const, label: t("progress.range.week") },
      { id: "month" as const, label: t("progress.range.month") },
      { id: "year" as const, label: t("progress.range.year") },
    ],
    [t],
  );

  const onLockedRange = (id: ProgressRange) => {
    track("lock_tapped", { content: `trends_${id}` });
    push({ name: "paywall", source: "progress", contentId: "trends" });
  };

  const onUnlockBalance = () => {
    track("lock_tapped", { content: "muscle_balance" });
    push({ name: "paywall", source: "progress", contentId: "muscle_balance" });
  };

  return (
    <view className="progress">
      <scroll-view className="progress-scroll" scroll-orientation="vertical">
        <view className="progress-head">
          <text className="progress-title">{t("progress.title")}</text>
          {/* TODO: workout history route */}
          <IconButton icon="calendar" variant="round" />
        </view>

        <SegmentedControl options={options} value={range} onChange={setPicked} lockedIds={isPremium ? undefined : LOCKED_RANGES} onLocked={onLockedRange} />

        {summary.error ? (
          <view className="progress-card progress-error">
            <text className="progress-error-text">{t("progress.error")}</text>
            <Button label={t("common.retry")} variant="ghost" size="sm" onTap={() => setAttempt((n) => n + 1)} />
          </view>
        ) : !vm ? (
          <view>
            <view className="progress-stats">
              <StatCardSkeleton label={t("progress.stat.workouts")} />
              <StatCardSkeleton label={t("progress.stat.volume")} className="progress-stat-mid" />
              <StatCardSkeleton label={t("progress.stat.streak")} />
            </view>

            <view className="progress-card progress-volume">
              <view className="progress-row">
                <text className="progress-h3">{t("progress.volume.title")}</text>
              </view>
              <BarChartSkeleton height={CHART_HEIGHT} className="progress-chart" />
            </view>

            <view className="progress-section-head">
              <text className="progress-h3">{t("progress.records.title")}</text>
              <text className="progress-link">{t("progress.records.all")}</text>
            </view>

            {recordCount === 0 ? (
              <EmptyRecordsSkeleton text={t("progress.records.empty")} />
            ) : (
              <view className="progress-card progress-records">
                {Array.from({ length: recordCount }, (_, i) => (
                  <view key={i}>
                    {i > 0 ? <view className="progress-divider" /> : null}
                    <RecordRowSkeleton className="progress-record" />
                  </view>
                ))}
              </view>
            )}
          </view>
        ) : (
          <view>
            <view className="progress-stats">
              <StatCard label={t("progress.stat.workouts")} value={vm.workouts} unit={vm.workoutsUnit} />
              <StatCard label={t("progress.stat.volume")} value={vm.volume} unit={t("progress.unit.tonnes")} className="progress-stat-mid" />
              <StatCard label={t("progress.stat.streak")} value={vm.streak} icon={vm.hasStreak ? "flame" : undefined} />
            </view>

            <view className="progress-card progress-volume">
              <view className="progress-row">
                <text className="progress-h3">{t("progress.volume.title")}</text>
                {vm.deltaLabel ? <text className={`progress-delta${vm.deltaUp ? " progress-delta-up" : ""}`}>{vm.deltaLabel}</text> : null}
              </view>
              <BarChart bars={vm.bars} height={CHART_HEIGHT} className="progress-chart" />
            </view>

            <view className="progress-section-head">
              <text className="progress-h3">{t("progress.records.title")}</text>
              {/* TODO: records route */}
              <Pressable>
                <text className="progress-link">{t("progress.records.all")}</text>
              </Pressable>
            </view>

            {vm.empty ? (
              <view className="progress-card progress-empty">
                <text className="progress-empty-text">{t("progress.records.empty")}</text>
                <Button label={t("progress.records.start")} variant="ghost" size="sm" onTap={() => push({ name: "home" })} />
              </view>
            ) : (
              <view className="progress-card progress-records">
                {vm.records.map((r, i) => (
                  <view key={r.id}>
                    {i > 0 ? <view className="progress-divider" /> : null}
                    <ListRow title={r.title} trailingText={r.value} trailingTone={r.isNew ? "green" : "default"} className="progress-record" />
                  </view>
                ))}
              </view>
            )}
          </view>
        )}

        {isPremium ? (
          <view className="progress-card progress-balance">
            <text className="progress-h3">{t("progress.balance.title")}</text>
            {balance.error ? (
              <view className="progress-error">
                <text className="progress-error-text">{t("progress.error")}</text>
                <Button label={t("common.retry")} variant="ghost" size="sm" onTap={() => setBalanceAttempt((n) => n + 1)} />
              </view>
            ) : heatCells ? (
              <Heatmap cells={heatCells} />
            ) : (
              <HeatmapSkeleton count={PLACEHOLDER_CELLS.length} />
            )}
          </view>
        ) : (
          <BlurLockCard height={150} pitch={t("progress.balance.pitch")} cta={t("progress.balance.unlock")} onUnlock={onUnlockBalance}>
            <text className="progress-h3">{t("progress.balance.title")}</text>
            <Heatmap cells={PLACEHOLDER_CELLS} />
          </BlurLockCard>
        )}
      </scroll-view>
    </view>
  );
}
