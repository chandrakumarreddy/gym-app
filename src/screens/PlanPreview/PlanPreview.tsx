import { useEffect, useMemo, useRef, useState } from "@lynx-js/react";

import { track } from "@/api/analytics.ts";
import { haptic } from "@/api/haptics.ts";
import { getPlan } from "@/api/plans.ts";
import { Avatar } from "@/components/Avatar/Avatar.tsx";
import { Button } from "@/components/Button/Button.tsx";
import { Chip } from "@/components/Chip/Chip.tsx";
import { HeroVideoCard } from "@/components/HeroVideoCard/HeroVideoCard.tsx";
import { ListRow } from "@/components/ListRow/ListRow.tsx";
import { useT } from "@/hooks/useLocale.tsx";
import { useRouter } from "@/hooks/useRouter.tsx";
import { useSkeletonCount } from "@/hooks/useSkeletonCount.ts";
import { LockedWeeksCard } from "@/screens/PlanPreview/components/LockedWeeksCard/LockedWeeksCard.tsx";
import { MetaRow } from "@/screens/PlanPreview/components/MetaRow/MetaRow.tsx";
import { PlanPreviewSkeleton } from "@/screens/PlanPreview/components/PlanPreviewSkeleton/PlanPreviewSkeleton.tsx";
import { formatPlanMeta, lockedCopy, toPreviewRows } from "@/screens/PlanPreview/planCopy.ts";
import { useAuth } from "@/services/auth.ts";
import { useEntitlements } from "@/services/purchases.ts";
import { setCurrentPlan, setOnboardingStep, useCurrentPlan } from "@/state/plan.ts";
import { resetQuiz } from "@/state/quizAnswers.ts";
import type { ArtSpec } from "@/types/art.ts";
import type { Plan } from "@/types/plan.ts";
import type { RouteParams } from "@/types/route.ts";

import "./PlanPreview.css";

const HERO_ART: ArtSpec = { variant: "v1", figure: "squat" };

type Remote = { plan?: Plan; error?: boolean };

export function PlanPreview({ planId }: RouteParams<"plan-preview">) {
  const t = useT();
  const { push, replace, reset } = useRouter();
  const { status } = useAuth();
  const { isPremium } = useEntitlements();
  const cached = useCurrentPlan();
  const local = cached && cached.id === planId ? cached : null;
  const [remote, setRemote] = useState<Remote>({});
  const [attempt, setAttempt] = useState(0);
  const viewed = useRef(false);

  useEffect(() => {
    if (local) return;
    let cancelled = false;
    setRemote({});
    getPlan(planId).then(
      (p) => {
        if (cancelled) return;
        if (!p) {
          replace({ name: "building" });
          return;
        }
        setCurrentPlan(p);
        setRemote({ plan: p });
      },
      () => {
        if (cancelled) return;
        setRemote({ error: true });
        haptic("error");
      },
    );
    return () => {
      cancelled = true;
    };
  }, [planId, attempt, !!local]);

  const plan = local ?? remote.plan ?? null;

  const vm = useMemo(() => {
    if (!plan) return null;
    return {
      meta: formatPlanMeta(plan, t),
      rows: toPreviewRows(plan.weeks[0], t),
      weekTitle: t("planPreview.weekTitle", { n: plan.weeks[0]?.index ?? 1 }),
      locked: lockedCopy(plan, t),
      coach: t("planPreview.withCoach", { name: plan.coach.name }),
    };
  }, [plan, t]);

  const rowCount = useSkeletonCount("planPreview.sessions", 3, vm?.rows.length);
  const lockedCount = useSkeletonCount("planPreview.locked", 1, vm ? (vm.locked && !isPremium ? 1 : 0) : undefined);

  useEffect(() => {
    if (!plan || viewed.current) return;
    viewed.current = true;
    track("plan_preview_viewed", {
      planId: plan.id,
      weeks: plan.totalWeeks,
      sessionsPerWeek: plan.sessionsPerWeek,
    });
  }, [plan]);

  const save = () => {
    if (status === "signed_in") {
      if (isPremium) {
        setOnboardingStep("complete");
        reset({ name: "home" });
        return;
      }
      setOnboardingStep("paywall");
      push({ name: "paywall", source: "onboarding" });
      return;
    }
    setOnboardingStep("signup");
    push({ name: "signup", planId });
  };

  const startOver = () => {
    track("plan_reset", { planId });
    // Leave first so clearing the plan doesn't make this screen refetch it.
    reset({ name: "quiz-goal" });
    resetQuiz();
    setCurrentPlan(null);
    setOnboardingStep("quiz");
  };

  const onLocked = () => {
    track("lock_tapped", { content: "plan_weeks_2_8" });
    save();
  };

  return (
    <view className="pp">
      <scroll-view className="pp-scroll" scroll-orientation="vertical">
        <view className="pp-body">
          {vm && plan ? (
            <>
              <view className="pp-top">
                <text className="pp-eyebrow">{t("planPreview.eyebrow")}</text>
                <Button label={t("planPreview.reset")} variant="link" sm haptic="heavy" onTap={startOver} />
              </view>
              <text className="pp-title" text-maxline="2">
                {plan.title}
              </text>
              <MetaRow items={vm.meta} className="pp-meta" />
              <HeroVideoCard
                className="pp-hero"
                art={HERO_ART}
                height={190}
                radius={16}
                playButton={false}
                footer={
                  <view className="pp-coach">
                    <Avatar initials={plan.coach.initials} size={28} tone={plan.coach.tone} />
                    <text className="pp-coach-name" text-maxline="1">
                      {vm.coach}
                    </text>
                  </view>
                }
              />
              <view className="pp-week-head">
                <text className="pp-week-title">{vm.weekTitle}</text>
                {isPremium ? null : <Chip variant="soft" size="sm" label={t("planPreview.free")} />}
              </view>
              <view className="pp-sessions">
                {vm.rows.map((r) => (
                  <ListRow key={r.id} className="pp-row" leading={<view className="pp-dot" />} title={r.title} subtitle={r.subtitle} />
                ))}
              </view>
              {vm.locked && !isPremium ? (
                <view className="pp-locked">
                  <LockedWeeksCard title={vm.locked.title} sub={vm.locked.sub} onTap={onLocked} />
                </view>
              ) : null}
            </>
          ) : remote.error ? (
            <view className="pp-error">
              <text className="pp-error-text">{t("planPreview.error")}</text>
              <Button label={t("planPreview.retry")} variant="ghost" sm onTap={() => setAttempt((a) => a + 1)} />
            </view>
          ) : (
            <PlanPreviewSkeleton premium={isPremium} rows={rowCount} locked={lockedCount > 0} />
          )}
        </view>
      </scroll-view>
      <view className="pp-footer">
        <view className="pp-footer-fade" />
        <Button label={t("planPreview.cta")} block disabled={!plan} onTap={save} />
      </view>
    </view>
  );
}
