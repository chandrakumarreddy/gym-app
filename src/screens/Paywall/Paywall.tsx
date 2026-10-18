import { useEffect, useMemo, useRef, useState } from "@lynx-js/react";

import { track } from "@/api/analytics.ts";
import { Button } from "@/components/Button/Button.tsx";
import { PlanSelector } from "@/components/PlanSelector/PlanSelector.tsx";
import { ProBadge } from "@/components/ProBadge/ProBadge.tsx";
import { ScreenHeader } from "@/components/ScreenHeader/ScreenHeader.tsx";
import { TrialTimeline } from "@/components/TrialTimeline/TrialTimeline.tsx";
import { useLocale } from "@/hooks/useLocale.tsx";
import type { TFn } from "@/hooks/useLocale.tsx";
import { useRouter } from "@/hooks/useRouter.tsx";
import { useSkeletonCount } from "@/hooks/useSkeletonCount.ts";
import { BenefitList } from "@/screens/Paywall/components/BenefitList/BenefitList.tsx";
import { PaywallFooterLinks } from "@/screens/Paywall/components/PaywallFooterLinks/PaywallFooterLinks.tsx";
import { PaywallSkeleton } from "@/screens/Paywall/components/PaywallSkeleton/PaywallSkeleton.tsx";
import { getEntitlementsSync, getOffering, purchase, restore, setTier } from "@/services/purchases.ts";
import { setOnboardingStep, useCurrentPlan } from "@/state/plan.ts";
import type { Offering, PaywallSource, PlanOptionVM, Product, ProductId, TrialTimelineItem } from "@/types/purchases.ts";
import type { RouteParams } from "@/types/route.ts";
import { formatInr } from "@/utils/format.ts";

import "./Paywall.css";

type Status = "loading" | "ready" | "purchasing" | "restoring" | "error";

const ANNUAL: ProductId = "premium_annual";
const MONTHLY: ProductId = "premium_monthly";

function titleFor(source: PaywallSource, weeks: number, t: TFn): string {
  switch (source) {
    case "onboarding":
      return t("paywall.title.onboarding", { n: weeks });
    case "locked":
      return t("paywall.title.locked");
    case "progress":
      return t("paywall.title.progress");
    case "challenges":
      return t("paywall.title.challenges");
    default:
      return t("paywall.title.default");
  }
}

function perMonth(p: Product): number {
  return Math.round(p.priceMicros / 12 / 1e6);
}

function savingsPct(annual: Product, monthly: Product): number {
  return Math.round((1 - annual.priceMicros / 12 / monthly.priceMicros) * 100);
}

export function Paywall({ source, contentId }: RouteParams<"paywall">) {
  const { t, locale } = useLocale();
  const { back, reset } = useRouter();
  const plan = useCurrentPlan();
  const [offering, setOffering] = useState<Offering | null>(null);
  const [status, setStatus] = useState<Status>("loading");
  const [selectedId, setSelectedId] = useState<string>(ANNUAL);
  const [message, setMessage] = useState<string | null>(null);
  const [attempt, setAttempt] = useState(0);
  const viewed = useRef(false);

  const leave = () => {
    if (source === "onboarding") {
      setOnboardingStep("complete");
      reset({ name: "home" });
    } else if (!back()) {
      reset({ name: "home" });
    }
  };

  useEffect(() => {
    if (getEntitlementsSync().premium.active) leave();
  }, []);

  useEffect(() => {
    let cancelled = false;
    setStatus("loading");
    getOffering().then(
      (o) => {
        if (cancelled) return;
        setOffering(o);
        setStatus("ready");
        if (!viewed.current) {
          viewed.current = true;
          track("paywall_viewed", {
            source,
            offeringId: o.id,
            ...(contentId ? { contentId } : {}),
          });
        }
      },
      () => !cancelled && setStatus("error"),
    );
    return () => {
      cancelled = true;
    };
  }, [attempt]);

  const vm = useMemo(() => {
    const annual = offering?.products.find((p) => p.id === ANNUAL);
    const monthly = offering?.products.find((p) => p.id === MONTHLY);
    if (!annual || !monthly) return null;
    const trialDays = annual.trialEligible ? (annual.introTrialDays ?? 0) : 0;
    const trial = trialDays > 0;
    const zero = formatInr(0, locale);
    const options: PlanOptionVM[] = [
      {
        id: annual.id,
        title: t("paywall.annual"),
        subtitle: trial
          ? t("paywall.annualTrialSub", {
              days: trialDays,
              price: annual.priceString,
            })
          : t("paywall.annualSub", { price: annual.priceString }),
        price: formatInr(perMonth(annual), locale),
        priceCaption: t("paywall.perMonth"),
        badge: t("paywall.save", { pct: savingsPct(annual, monthly) }),
      },
      {
        id: monthly.id,
        title: t("paywall.monthly"),
        subtitle: t("paywall.monthlySub"),
        price: monthly.priceString,
        priceCaption: t("paywall.perMonth"),
      },
    ];
    const timeline: TrialTimelineItem[] = trial
      ? [
          {
            icon: "check",
            title: t("paywall.timeline.today"),
            caption: t("paywall.timeline.todayCaption"),
            active: true,
          },
          {
            icon: "bell",
            title: t("paywall.timeline.day", { n: Math.max(1, trialDays - 2) }),
            caption: t("paywall.timeline.reminderCaption"),
            active: false,
          },
          {
            icon: "star",
            title: t("paywall.timeline.day", { n: trialDays }),
            caption: t("paywall.timeline.endCaption"),
            active: false,
          },
        ]
      : [];
    const annualSelected = selectedId === annual.id;
    const cta = annualSelected
      ? trial
        ? t("paywall.ctaTrial", { days: trialDays })
        : t("paywall.ctaAnnual", { price: annual.priceString })
      : t("paywall.ctaMonthly", { price: monthly.priceString });
    const middle = annualSelected && trial ? t("paywall.dueToday", { price: zero }) : t("paywall.cancelAnytime");
    return { options, timeline, cta, middle };
  }, [offering, selectedId, t, locale]);

  const timelineCount = useSkeletonCount("paywall.timeline", 1, vm ? (vm.timeline.length ? 1 : 0) : undefined);

  const title = useMemo(() => titleFor(source, plan?.totalWeeks ?? 8, t), [source, plan?.totalWeeks, t]);
  const benefits = useMemo(() => [t("paywall.benefit.programs"), t("paywall.benefit.coach"), t("paywall.benefit.stats")], [t]);

  const buy = async () => {
    if (status !== "ready") return;
    setStatus("purchasing");
    setMessage(null);
    const res = await purchase(selectedId as ProductId);
    if (res.status === "success") {
      if (res.entitlements.premium.isTrial) track("trial_started", { product: selectedId, source });
      leave();
      return;
    }
    setStatus("ready");
    if (res.status === "pending") setMessage(t("paywall.pending"));
    else if (res.status === "error") setMessage(t("paywall.purchaseError"));
  };

  const onRestore = async () => {
    if (status !== "ready") return;
    setStatus("restoring");
    setMessage(null);
    try {
      const ent = await restore();
      if (ent.premium.active) {
        leave();
        return;
      }
      setMessage(t("paywall.noPurchases"));
    } catch {
      setMessage(t("paywall.purchaseError"));
    }
    setStatus("ready");
  };

  const close = () => {
    if (source === "onboarding") setTier("free");
    leave();
  };

  return (
    <view className="pw">
      <view className="pw-header">
        <ScreenHeader leading="close" onBack={close} trailing={<ProBadge label={t("common.premium")} size="md" />} />
      </view>
      <scroll-view className="pw-scroll" scroll-orientation="vertical">
        <view className="pw-body">
          <text className="pw-title">{title}</text>
          <BenefitList items={benefits} className="pw-benefits" />
          {status === "error" || (status !== "loading" && !vm) ? (
            <view className="pw-load-error">
              <text className="pw-message">{t("paywall.loadError")}</text>
              <Button label={t("paywall.retry")} variant="ghost" sm onTap={() => setAttempt((a) => a + 1)} />
            </view>
          ) : vm ? (
            <>
              {vm.timeline.length ? (
                <view className="pw-card">
                  <TrialTimeline items={vm.timeline} />
                </view>
              ) : null}
              <PlanSelector className="pw-plans" options={vm.options} selectedId={selectedId} onSelect={setSelectedId} />
            </>
          ) : (
            <PaywallSkeleton timeline={timelineCount > 0} />
          )}
          {message ? <text className="pw-message pw-message-gap">{message}</text> : null}
        </view>
      </scroll-view>
      <view className="pw-footer">
        <view className="pw-footer-fade" />
        <Button
          label={vm?.cta ?? t("paywall.ctaTrial", { days: 7 })}
          block
          loading={status === "purchasing"}
          disabled={!vm || status === "restoring" || status === "error"}
          onTap={() => void buy()}
        />
        <PaywallFooterLinks
          restoreLabel={t("paywall.restore")}
          middle={vm?.middle ?? ""}
          middleLoading={status === "loading"}
          legal={`${t("paywall.terms")} · ${t("paywall.privacy")}`}
          restoring={status !== "ready"}
          onRestore={() => void onRestore()}
        />
      </view>
    </view>
  );
}
