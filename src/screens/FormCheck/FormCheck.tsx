import { useEffect, useMemo, useRef, useState } from "@lynx-js/react";

import { track } from "@/api/analytics.ts";
import { getCoach } from "@/api/coaches.ts";
import { haptic } from "@/api/haptics.ts";
import { getCreditPacks, submitFormCheck } from "@/api/formChecks.ts";
import { LOWER_HYPERTROPHY_EXERCISES } from "@/api/mock/content.ts";
import { getJSON, setJSON } from "@/api/storage.ts";
import { Avatar } from "@/components/Avatar/Avatar.tsx";
import { BottomSheet } from "@/components/BottomSheet/BottomSheet.tsx";
import { Button } from "@/components/Button/Button.tsx";
import { Icon } from "@/components/Icon/Icon.tsx";
import { IconButton } from "@/components/IconButton/IconButton.tsx";
import { Pressable } from "@/components/Pressable/Pressable.tsx";
import { ScreenHeader } from "@/components/ScreenHeader/ScreenHeader.tsx";
import { SettingsGroup, SettingsRow } from "@/components/SettingsGroup/SettingsGroup.tsx";
import { Skeleton } from "@/components/Skeleton/Skeleton.tsx";
import { useAsync } from "@/hooks/useAsync.ts";
import { useLocale } from "@/hooks/useLocale.tsx";
import { useRouter } from "@/hooks/useRouter.tsx";
import { purchase, useEntitlements } from "@/services/purchases.ts";
import type { CreditPack } from "@/types/formCheck.ts";
import type { RouteParams } from "@/types/route.ts";
import { TextSkeleton } from "@/components/TextSkeleton/TextSkeleton.tsx";
import { formatInr } from "@/utils/format.ts";

import { PackList } from "./components/PackList/PackList.tsx";
import type { PackVM } from "./components/PackList/PackList.tsx";
import { PackListSkeleton } from "./components/PackListSkeleton/PackListSkeleton.tsx";
import { SelectField } from "./components/SelectField/SelectField.tsx";
import { UploadDropzone } from "./components/UploadDropzone/UploadDropzone.tsx";
import { useFormCheckUpload } from "./useFormCheckUpload.ts";

import "./FormCheck.css";

const EXERCISE_KEY = "fc.exercise";
const SPENT_KEY = "fc.credits.spent";
const DEFAULT_EXERCISE = "romanian-deadlift";
const DEFAULT_COACH = "priya";
const SLA_HOURS = 48;
const EXERCISES = LOWER_HYPERTROPHY_EXERCISES.filter((e) => e.kind === "sets").map((e) => ({ id: e.id, name: e.name }));

type PurchaseState = "idle" | "busy" | "pending" | "failed";
type Sheet = "exercise" | "menu" | "sent" | null;

export function FormCheck({ coachId, exerciseId: initialExercise, source }: RouteParams<"form-check">) {
  const { t, locale } = useLocale();
  const { back, push } = useRouter();
  const { entitlements, isPremium } = useEntitlements();
  const { upload, pick, retry, clear } = useFormCheckUpload();

  const coach = useAsync(() => getCoach(coachId ?? DEFAULT_COACH), [coachId]);
  const [packsAttempt, setPacksAttempt] = useState(0);
  const packs = useAsync(getCreditPacks, [packsAttempt]);

  const [exerciseId, setExerciseId] = useState(initialExercise ?? DEFAULT_EXERCISE);
  const [selectedPackId, setSelectedPackId] = useState<CreditPack["id"]>("fc_5");
  const [spent, setSpent] = useState(0);
  const [purchaseState, setPurchaseState] = useState<PurchaseState>("idle");
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(false);
  const [sheet, setSheet] = useState<Sheet>(null);

  useEffect(() => {
    if (!initialExercise) {
      const saved = getJSON<string>(EXERCISE_KEY);
      if (saved && EXERCISES.some((e) => e.id === saved)) setExerciseId(saved);
    }
    setSpent(getJSON<number>(SPENT_KEY) ?? 0);
  }, []);

  const prevStatus = useRef(upload.status);
  useEffect(() => {
    const prev = prevStatus.current;
    prevStatus.current = upload.status;
    if (upload.status === "ready" && prev === "uploading") haptic("success");
    else if (upload.status === "failed" && prev !== "failed") haptic("error");
  }, [upload.status]);

  useEffect(() => {
    if (packs.error) haptic("error");
  }, [packs.error]);

  const credits = Math.max(0, entitlements.formCheckCredits - spent);
  const coachName = coach.data?.name.split(" ")[0] ?? "Priya";
  const coachInitials = coach.data?.initials ?? "PN";
  const resolvedCoachId = coachId ?? DEFAULT_COACH;
  const exerciseName = EXERCISES.find((e) => e.id === exerciseId)?.name ?? EXERCISES[0].name;

  const vm = useMemo(() => {
    const list = packs.data ?? [];
    const options: PackVM[] = list.map((p) => {
      const price = isPremium ? p.premiumPriceInr : p.priceInr;
      return {
        id: p.id,
        title: p.reviews === 1 ? t("formCheck.reviewOne") : t("formCheck.reviews", { n: p.reviews }),
        subtitle: p.reviews > 1 ? t("formCheck.each", { price: formatInr(Math.round(price / p.reviews), locale) }) : undefined,
        price: formatInr(price, locale),
        originalPrice: isPremium ? formatInr(p.priceInr, locale) : undefined,
        badge: p.popular ? t("formCheck.mostPopular") : undefined,
      };
    });
    const selected = list.find((p) => p.id === selectedPackId);
    const priceLabel = selected ? formatInr(isPremium ? selected.premiumPriceInr : selected.priceInr, locale) : "";
    const buyLabel = !selected
      ? ""
      : selected.reviews === 1
        ? t("formCheck.buyCtaOne", { price: priceLabel })
        : t("formCheck.buyCta", { n: selected.reviews, price: priceLabel });
    return { options, selected, buyLabel };
  }, [packs.data, selectedPackId, isPremium, locale, t]);

  const dropCopy = useMemo(() => {
    const base = { record: t("formCheck.record"), upload: t("formCheck.upload"), retry: t("formCheck.retry"), replace: t("formCheck.replace") };
    switch (upload.status) {
      case "picking":
        return { ...base, title: t("formCheck.dropTitle"), hint: t("formCheck.picking") };
      case "uploading":
        return { ...base, title: t("formCheck.dropTitle"), hint: t("formCheck.uploading", { pct: `${upload.progressPct}%` }) };
      case "ready":
        return { ...base, title: t("formCheck.readyTitle"), hint: t("formCheck.readyHint", { sec: upload.durationSec ?? 0 }) };
      case "failed":
        return { ...base, title: t("formCheck.failedTitle"), hint: t(upload.error === "too_long" ? "formCheck.tooLong" : "formCheck.networkError") };
      default:
        return { ...base, title: t("formCheck.dropTitle"), hint: t("formCheck.dropHint") };
    }
  }, [upload.status, upload.progressPct, upload.durationSec, upload.error, t]);
  const progressWidth = `${upload.progressPct}%`;

  const clipReady = upload.status === "ready" && !!upload.uploadId;
  const ctaLabel = credits > 0 ? (clipReady ? t("formCheck.submitCta", { n: credits }) : t("formCheck.needClip", { n: credits })) : vm.buyLabel;
  const ctaDisabled = !vm.selected || purchaseState === "pending" || (credits > 0 && !clipReady);
  const ctaLoading = purchaseState === "busy" || submitting;

  async function submit() {
    if (!upload.uploadId || submitting) return;
    setSubmitting(true);
    setSubmitError(false);
    try {
      await submitFormCheck({ exerciseId, coachId: resolvedCoachId, uploadId: upload.uploadId });
      const nextSpent = spent + 1;
      setJSON(SPENT_KEY, nextSpent);
      setSpent(nextSpent);
      track("form_check_submitted", { exercise: exerciseId, coach: resolvedCoachId, source });
      clear();
      haptic("success");
      setSheet("sent");
    } catch {
      haptic("error");
      setSubmitError(true);
    } finally {
      setSubmitting(false);
    }
  }

  async function buy() {
    const pack = vm.selected;
    if (!pack || (purchaseState !== "idle" && purchaseState !== "failed")) return;
    setPurchaseState("busy");
    const res = await purchase(pack.productId);
    if (res.status === "success") {
      track("purchase", { product: pack.productId, price: isPremium ? pack.premiumPriceInr : pack.priceInr, premium: isPremium, source: "form_check" });
      haptic("success");
      setPurchaseState("idle");
      if (clipReady) void submit();
    } else if (res.status === "pending") {
      setPurchaseState("pending");
    } else if (res.status === "cancelled") {
      setPurchaseState("idle");
    } else {
      haptic("error");
      setPurchaseState("failed");
    }
  }

  const onCta = () => (credits > 0 ? void submit() : void buy());

  const pickClip = (via: "record" | "upload") => {
    track("form_check_upload_started", { via });
    void pick();
  };

  const selectExercise = (id: string) => {
    setExerciseId(id);
    setJSON(EXERCISE_KEY, id);
    setSheet(null);
  };

  const openPaywall = () => {
    if (isPremium) return;
    track("paywall_viewed", { source: "form_check" });
    push({ name: "paywall", source: "profile" });
  };

  const status =
    purchaseState === "pending"
      ? t("formCheck.pending")
      : purchaseState === "failed"
        ? t("formCheck.purchaseFailed")
        : submitError
          ? t("formCheck.submitFailed")
          : null;

  return (
    <view className="fc">
      <ScreenHeader
        title={t("formCheck.title")}
        left="back"
        onBack={() => back()}
        right={<IconButton icon="more" onTap={() => setSheet("menu")} />}
      />
      <scroll-view className="fc-scroll" scroll-orientation="vertical">
        <view className="fc-content">
          <UploadDropzone
            status={upload.status}
            progressWidth={progressWidth}
            copy={dropCopy}
            onRecord={() => pickClip("record")}
            onUpload={() => pickClip("upload")}
            onRetry={retry}
            onReplace={() => {
              clear();
              pickClip("upload");
            }}
          />
          <SelectField className="fc-exercise" icon="dumbbell" value={exerciseName} onTap={() => setSheet("exercise")} />
          {coach.loading ? (
            <view className="fc-coach">
              <Skeleton width={28} height={28} radius={14} />
              <TextSkeleton className="fc-coach-sk" textClass="fc-coach-label" sample="Reviewed by Coach" width="72%" />
            </view>
          ) : (
            <view className="fc-coach">
              <Avatar initials={coachInitials} size="xs" tone="warm" />
              <text className="fc-coach-label">{t("formCheck.reviewedBy", { coach: coachName, hours: SLA_HOURS })}</text>
            </view>
          )}
          <text className="fc-h3">{t("formCheck.choosePack")}</text>
          <view className="fc-packs">
            {packs.loading ? (
              <PackListSkeleton showOriginal={isPremium} />
            ) : packs.error ? (
              <view className="fc-packs-error">
                <text className="fc-packs-error-text">{t("formCheck.networkError")}</text>
                <Button label={t("common.retry")} variant="ghost" sm onTap={() => setPacksAttempt((n) => n + 1)} />
              </view>
            ) : (
              <PackList options={vm.options} selectedId={selectedPackId} onSelect={(id) => setSelectedPackId(id as CreditPack["id"])} />
            )}
          </view>
          <Pressable className="fc-premium" disabled={isPremium} onTap={openPaywall}>
            <Icon name="crown" tone="gold" size={14} />
            <text className="fc-premium-label">{t(isPremium ? "formCheck.premiumApplied" : "formCheck.premiumSave")}</text>
          </Pressable>
          {status ? <text className="fc-status">{status}</text> : null}
        </view>
      </scroll-view>
      <view className="fc-footer">
        <Button label={ctaLabel} fullWidth disabled={ctaDisabled} loading={ctaLoading} onTap={onCta} />
      </view>

      <BottomSheet visible={sheet === "exercise"} onDismiss={() => setSheet(null)} title={t("formCheck.chooseExercise")}>
        <view className="fc-sheet-body">
          <SettingsGroup>
            {EXERCISES.map((e, i) => (
              <SettingsRow
                key={e.id}
                label={e.name}
                trailing={e.id === exerciseId ? <Icon name="check" tone="ember" size={18} /> : undefined}
                last={i === EXERCISES.length - 1}
                onTap={() => selectExercise(e.id)}
              />
            ))}
          </SettingsGroup>
        </view>
      </BottomSheet>

      <BottomSheet visible={sheet === "menu"} onDismiss={() => setSheet(null)}>
        <view className="fc-sheet-body">
          <SettingsGroup>
            <SettingsRow icon="video" label={t("formCheck.menuReviews")} chevron onTap={() => setSheet(null)} />
            <SettingsRow icon="target" label={t("formCheck.menuHow")} chevron onTap={() => setSheet(null)} />
            <SettingsRow icon="message" label={t("formCheck.menuHelp")} chevron last onTap={() => setSheet(null)} />
          </SettingsGroup>
        </view>
      </BottomSheet>

      <BottomSheet visible={sheet === "sent"} onDismiss={() => back()} title={t("formCheck.sentTitle", { coach: coachName })}>
        <view className="fc-sheet-body">
          <text className="fc-sent-body">{t("formCheck.sentBody", { hours: SLA_HOURS })}</text>
          <Button label={t("common.done")} fullWidth onTap={() => back()} />
        </view>
      </BottomSheet>
    </view>
  );
}
