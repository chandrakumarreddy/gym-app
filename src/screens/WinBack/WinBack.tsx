import { useEffect, useMemo, useRef, useState } from "@lynx-js/react";

import { track } from "@/api/analytics.ts";
import { setJSON } from "@/api/storage.ts";
import { getWinBackOffer, markWinBackShown, recordWinBackOutcome } from "@/api/winback.ts";
import { BottomSheet } from "@/components/BottomSheet/BottomSheet.tsx";
import { Button } from "@/components/Button/Button.tsx";
import { IconButton } from "@/components/IconButton/IconButton.tsx";
import { useAsync } from "@/hooks/useAsync.ts";
import { useLocale } from "@/hooks/useLocale.tsx";
import type { Locale, StringKey } from "@/hooks/useLocale.tsx";
import { useRouter } from "@/hooks/useRouter.tsx";
import { openManageSubscriptions, pauseSubscription, purchase } from "@/services/purchases.ts";
import type { RouteParams } from "@/types/route.ts";
import type { WinBackOutcome } from "@/types/winback.ts";
import { formatInr } from "@/utils/format.ts";

import { Skeleton } from "@/components/Skeleton/Skeleton.tsx";
import { CountdownBoxes } from "@/screens/WinBack/components/CountdownBoxes/CountdownBoxes.tsx";
import { CountdownSkeleton } from "@/screens/WinBack/components/CountdownSkeleton/CountdownSkeleton.tsx";
import { OfferCard } from "@/screens/WinBack/components/OfferCard/OfferCard.tsx";
import { OfferSkeleton } from "@/screens/WinBack/components/OfferSkeleton/OfferSkeleton.tsx";
import { useCountdown } from "@/screens/WinBack/useCountdown.ts";

import "./WinBack.css";

const SHOWN_KEY = "winback.shownAt";
const DAY = 86_400_000;
const DONE_DELAY_MS = 1400;

type Busy = "idle" | "promo" | "pause" | "pending";
type Note = { key: StringKey; vars?: Record<string, string | number>; tone: "ok" | "error" } | null;

function formatDayMonth(ms: number, locale: Locale): string {
  const d = new Date(ms);
  try {
    return new Intl.DateTimeFormat(locale === "hi" ? "hi-IN" : "en-IN", { day: "numeric", month: "short" }).format(d);
  } catch {
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    return `${d.getDate()} ${months[d.getMonth()]}`;
  }
}

export function WinBack({ productId, source }: RouteParams<"winback">) {
  const { t, locale } = useLocale();
  const { back } = useRouter();
  const res = useAsync(() => getWinBackOffer(productId), [productId]);
  const [busy, setBusy] = useState<Busy>("idle");
  const [note, setNote] = useState<Note>(null);
  const [confirmPause, setConfirmPause] = useState(false);
  const [finished, setFinished] = useState(false);
  const shownOnce = useRef(false);
  const expiredOnce = useRef(false);
  const doneTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const offer = res.data?.offer ?? null;
  const expiresAt = offer ? Date.parse(offer.expiresAt) : null;
  const { parts, done: expired } = useCountdown(expiresAt);

  const record = (outcome: WinBackOutcome) => {
    void recordWinBackOutcome(outcome).catch(() => {});
  };

  const handOff = () => {
    void openManageSubscriptions();
    back();
  };

  useEffect(() => {
    const data = res.data;
    if (!data || shownOnce.current) return;
    shownOnce.current = true;
    const stale = !!data.status.shownAt && Date.parse(data.offer.expiresAt) <= Date.now();
    if (!data.status.eligible || stale) {
      handOff();
      return;
    }
    void markWinBackShown().catch(() => {});
    setJSON(SHOWN_KEY, data.status.shownAt ?? new Date().toISOString());
    if (source === "push") track("cancel_flow_viewed", { source, eligible: true, product: productId });
  }, [res.data]);

  useEffect(() => {
    if (expired && !expiredOnce.current) {
      expiredOnce.current = true;
      track("winback_expired", { product: productId });
    }
  }, [expired]);

  useEffect(
    () => () => {
      if (doneTimer.current) clearTimeout(doneTimer.current);
    },
    [],
  );

  const vm = useMemo(() => {
    if (!res.data) return null;
    const { offer: o, stats } = res.data;
    const body =
      stats.workouts <= 0
        ? t("winback.bodyEmpty")
        : stats.streakDays > 1
          ? t("winback.body", { workouts: stats.workouts, streak: stats.streakDays })
          : t("winback.bodyNoStreak", { workouts: stats.workouts });
    const base = formatInr(o.basePriceInr, locale);
    const promo = formatInr(o.offerPriceInr, locale);
    return {
      body,
      badge: t("winback.badge"),
      big: t("winback.big", { pct: o.discountPct }),
      sub: t("winback.months", { n: o.months }),
      strike: base,
      strong: t("winback.priceStrong", { price: promo }),
      rest: t("winback.priceRest", { price: base }),
      keepCta: t("winback.keepCta", { price: promo }),
      pauseDate: formatDayMonth(Date.now() + 30 * DAY, locale),
    };
  }, [res.data, locale, t]);

  const finish = (n: Note) => {
    setNote(n);
    setFinished(true);
    doneTimer.current = setTimeout(() => back(), DONE_DELAY_MS);
  };

  const keep = async () => {
    if (!offer || busy !== "idle" || expired) return;
    setBusy("promo");
    setNote(null);
    const r = await purchase(productId, { promotionalOffer: { offerId: offer.storeOfferId } });
    if (r.status === "success") {
      record("accepted");
      track("winback_accepted", { kind: "promo", product: productId, offerId: offer.storeOfferId });
      track("purchase", { product: productId, offer: offer.storeOfferId });
      setBusy("idle");
      finish({ key: "winback.saved", vars: { pct: offer.discountPct, n: offer.months }, tone: "ok" });
    } else if (r.status === "pending") {
      setBusy("pending");
      setNote({ key: "winback.pending", tone: "ok" });
    } else {
      setBusy("idle");
      if (r.status === "error") setNote({ key: "winback.failed", tone: "error" });
    }
  };

  const pause = async () => {
    if (busy !== "idle") return;
    setBusy("pause");
    try {
      const e = await pauseSubscription(1);
      record("paused");
      track("winback_accepted", { kind: "pause", product: productId, offerId: "pause_1m" });
      setConfirmPause(false);
      setBusy("idle");
      const until = e.premium.pausedUntil ?? Date.now() + 30 * DAY;
      finish({ key: "winback.paused", vars: { date: formatDayMonth(until, locale) }, tone: "ok" });
    } catch {
      setBusy("idle");
      setConfirmPause(false);
      setNote({ key: "winback.failed", tone: "error" });
    }
  };

  const onContinue = () => {
    record("cancelled");
    track("winback_declined", { via: "continue" });
    handOff();
  };

  const onClose = () => {
    if (!finished) {
      record("dismissed");
      track("winback_declined", { via: "close" });
    }
    back();
  };

  const locked = busy !== "idle" || finished;
  const showOffer = !!vm && !res.error;
  const loading = res.loading;

  return (
    <view className="wb">
      <view className="wb-top">
        <IconButton icon="x" onTap={onClose} />
      </view>
      <scroll-view className="wb-scroll" scroll-orientation="vertical">
        <view className="wb-content">
          <text className="wb-title">{t("winback.title")}</text>
          {loading ? (
            <view className="wb-body-sk">
              <Skeleton height={14} radius={6} />
              <Skeleton width="70%" height={14} radius={6} />
            </view>
          ) : (
            <text className="wb-body">{vm ? vm.body : t("winback.unavailable")}</text>
          )}
          {loading ? (
            <>
              <view className="wb-offer">
                <OfferSkeleton />
              </view>
              <text className="wb-ends">{t("winback.endsIn")}</text>
              <view className="wb-countdown">
                <CountdownSkeleton />
              </view>
            </>
          ) : showOffer && vm ? (
            <>
              <view className="wb-offer">
                <OfferCard badge={vm.badge} big={vm.big} sub={vm.sub} strike={vm.strike} strong={vm.strong} rest={vm.rest} />
              </view>
              <text className="wb-ends">{t("winback.endsIn")}</text>
              <view className="wb-countdown">
                <CountdownBoxes parts={parts} labels={[t("winback.hours"), t("winback.min"), t("winback.sec")]} />
              </view>
            </>
          ) : null}
          {note ? <text className={`wb-note wb-note-${note.tone}`}>{t(note.key, note.vars)}</text> : null}
        </view>
      </scroll-view>
      <view className="wb-footer">
        {loading ? (
          <Skeleton height={56} radius={16} />
        ) : showOffer && vm ? (
          <Button
            label={expired ? t("winback.expiredCta") : vm.keepCta}
            fullWidth
            loading={busy === "promo"}
            disabled={expired || locked}
            onTap={() => void keep()}
          />
        ) : null}
        <Button
          variant="ghost"
          icon="clock"
          label={t("winback.pauseCta")}
          fullWidth
          disabled={locked}
          className="wb-gap"
          onTap={() => setConfirmPause(true)}
        />
        <Button variant="link" label={t("winback.continue")} fullWidth className="wb-gap" onTap={onContinue} />
      </view>

      <BottomSheet visible={confirmPause} onDismiss={() => setConfirmPause(false)} title={t("winback.pauseTitle")}>
        <view className="wb-sheet">
          <text className="wb-sheet-body">{t("winback.pauseBody", { date: vm?.pauseDate ?? "" })}</text>
          <Button
            variant="ghost"
            icon="clock"
            label={t("winback.pauseConfirm", { date: vm?.pauseDate ?? "" })}
            fullWidth
            loading={busy === "pause"}
            onTap={() => void pause()}
          />
        </view>
      </BottomSheet>
    </view>
  );
}
