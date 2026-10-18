import { useEffect, useMemo, useRef, useState } from "@lynx-js/react";

import { track } from "@/api/analytics.ts";
import { haptic } from "@/api/haptics.ts";
import { getDownloadsSummary, getProfile, updateProfile } from "@/api/profile.ts";
import { getJSON, setJSON } from "@/api/storage.ts";
import { Avatar } from "@/components/Avatar/Avatar.tsx";
import { BottomSheet } from "@/components/BottomSheet/BottomSheet.tsx";
import { Button } from "@/components/Button/Button.tsx";
import { IconButton } from "@/components/IconButton/IconButton.tsx";
import { LanguageToggle } from "@/components/LanguageToggle/LanguageToggle.tsx";
import { LockBadge } from "@/components/LockBadge/LockBadge.tsx";
import { NumberPicker } from "@/components/NumberPicker/NumberPicker.tsx";
import { ProBadge } from "@/components/ProBadge/ProBadge.tsx";
import { SegmentedControl } from "@/components/SegmentedControl/SegmentedControl.tsx";
import { Skeleton } from "@/components/Skeleton/Skeleton.tsx";
import { useAsync } from "@/hooks/useAsync.ts";
import { useLocale } from "@/hooks/useLocale.tsx";
import type { Locale, StringKey } from "@/hooks/useLocale.tsx";
import { useRouter } from "@/hooks/useRouter.tsx";
import { signOut } from "@/services/auth.ts";
import { openManageSubscriptions, purchase, restore, useEntitlements } from "@/services/purchases.ts";
import { startRoute } from "@/state/startRoute.ts";
import type { PaywallSource } from "@/types/purchases.ts";
import type { UserProfile } from "@/types/user.ts";
import { formatBytes, formatInr, formatTime12, pad2 } from "@/utils/format.ts";

import { FamilyBanner } from "./components/FamilyBanner/FamilyBanner.tsx";
import { HealthToggle } from "./components/HealthToggle/HealthToggle.tsx";
import { ProfileRow } from "./components/ProfileRow/ProfileRow.tsx";

import "./Profile.css";

const WINBACK_SHOWN_KEY = "winback.shownAt";
const REMINDER_KEY = "fitcue.reminderTime";
const HEALTH_KEY = "fitcue.healthSync";
const FAMILY_ADDON_INR = 1499;
const FAMILY_MAX = 4;
const PRICE_INR = { annual: 2499, monthly: 399 } as const;

type Toast = { key: StringKey; tone: "ok" | "error" } | null;
type Sheet = "settings" | "family" | "reminders" | "units" | null;
type FamilyState = "idle" | "busy" | "pending";

function formatDayMonth(ms: number, locale: Locale): string {
  const d = new Date(ms);
  try {
    return new Intl.DateTimeFormat(locale === "hi" ? "hi-IN" : "en-IN", { day: "numeric", month: "short" }).format(d);
  } catch {
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    return `${d.getDate()} ${months[d.getMonth()]}`;
  }
}

function isIos(): boolean {
  return typeof SystemInfo !== "undefined" && SystemInfo.platform === "iOS";
}

export function Profile() {
  const { t, locale } = useLocale();
  const { push, reset } = useRouter();
  const { entitlements, isPremium } = useEntitlements();
  const premium = entitlements.premium;

  const [attempt, setAttempt] = useState(0);
  const remote = useAsync(getProfile, [attempt]);
  const downloads = useAsync(getDownloadsSummary, [attempt]);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [sheet, setSheet] = useState<Sheet>(null);
  const [restoring, setRestoring] = useState(false);
  const [familyState, setFamilyState] = useState<FamilyState>("idle");
  const [toast, setToast] = useState<Toast>(null);
  const [draftHour, setDraftHour] = useState(18);
  const [draftMinute, setDraftMinute] = useState(30);
  const toastTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (!remote.data) return;
    const localReminder = getJSON<string>(REMINDER_KEY);
    const localHealth = getJSON<boolean>(HEALTH_KEY);
    setProfile({
      ...remote.data,
      reminderTime: localReminder ?? remote.data.reminderTime,
      healthSync: localHealth ?? remote.data.healthSync,
    });
  }, [remote.data]);

  useEffect(() => {
    if (remote.error) haptic("error");
  }, [remote.error]);

  useEffect(
    () => () => {
      if (toastTimer.current) clearTimeout(toastTimer.current);
    },
    [],
  );

  const showToast = (next: Toast) => {
    if (toastTimer.current) clearTimeout(toastTimer.current);
    setToast(next);
    toastTimer.current = setTimeout(() => setToast(null), 3000);
  };

  const vm = useMemo(() => {
    const period = premium.productId === "premium_monthly" ? "monthly" : "annual";
    const periodLabel = premium.productId === "family_annual" ? t("profile.family") : t(period === "monthly" ? "profile.monthly" : "profile.annual");
    const price = formatInr(premium.productId === "family_annual" ? 3999 : PRICE_INR[period], locale);
    const unit = t(period === "monthly" ? "profile.unitMonth" : "profile.unitYear");
    const date = premium.expiresAt ? formatDayMonth(premium.expiresAt, locale) : "";
    let statusLine = "";
    if (premium.pausedUntil && premium.pausedUntil > Date.now()) statusLine = t("profile.pausedUntil", { date: formatDayMonth(premium.pausedUntil, locale) });
    else if (!premium.willRenew) statusLine = t("profile.ends", { date });
    else if (premium.isTrial) statusLine = t("profile.trialEnds", { date, price, unit });
    else statusLine = t("profile.renews", { date, price, unit });

    const family = premium.family;
    const familyTitle = family ? t("profile.familyActive", { n: family.members, max: family.max }) : t("profile.familyTitle");
    const familySub =
      familyState === "pending" ? t("profile.familyPending") : t("profile.familySub", { n: FAMILY_MAX, price: formatInr(FAMILY_ADDON_INR, locale) });

    return { periodLabel, planName: t("profile.planName", { period: periodLabel }), statusLine, familyTitle, familySub };
  }, [premium, familyState, locale, t]);

  const downloadsLabel = useMemo(
    () => (downloads.data ? t("profile.downloadsValue", { count: downloads.data.count, size: formatBytes(downloads.data.bytes) }) : ""),
    [downloads.data, t],
  );
  const reminderLabel = profile ? formatTime12(profile.reminderTime) : "";
  const unitsLabel = profile ? `${profile.units.weight} · ${profile.units.length}` : "";
  const healthLabel = t(isIos() ? "profile.healthIos" : "profile.healthAndroid");

  const openPaywall = (source: PaywallSource, event = source as string) => {
    track("paywall_viewed", { source: event });
    push({ name: "paywall", source });
  };

  const onManage = () => {
    if (!isPremium) return openPaywall("profile");
    if (premium.willRenew && !getJSON<string>(WINBACK_SHOWN_KEY)) {
      track("cancel_flow_viewed", { source: "profile_manage" });
      push({ name: "winback", productId: premium.productId ?? "premium_annual", source: "profile_manage" });
      return;
    }
    void openManageSubscriptions();
  };

  const onFamily = () => {
    if (!isPremium) return openPaywall("family");
    if (premium.family || familyState !== "idle") return;
    setSheet("family");
  };

  const buyFamily = async () => {
    setFamilyState("busy");
    const res = await purchase("family_annual");
    if (res.status === "success") {
      haptic("success");
      track("purchase", { product: "family_annual" });
      setFamilyState("idle");
      setSheet(null);
    } else if (res.status === "pending") {
      setFamilyState("pending");
      setSheet(null);
    } else {
      setFamilyState("idle");
      if (res.status === "error") {
        haptic("error");
        showToast({ key: "profile.purchaseFailed", tone: "error" });
      }
    }
  };

  const patchProfile = async (patch: Partial<UserProfile>) => {
    if (!profile) return;
    const prev = profile;
    setProfile({ ...profile, ...patch });
    try {
      await updateProfile(patch);
      return true;
    } catch {
      setProfile(prev);
      return false;
    }
  };

  const onHealth = async (on: boolean) => {
    if (!isPremium) {
      haptic("warning");
      track("lock_tapped", { content: "health_sync" });
      return openPaywall("profile", "health_lock");
    }
    track("health_sync_toggled", { on });
    const ok = await patchProfile({ healthSync: on });
    if (ok) setJSON(HEALTH_KEY, on);
    else {
      haptic("error");
      showToast({ key: "profile.healthDenied", tone: "error" });
    }
  };

  const onRestore = async () => {
    if (restoring) return;
    setRestoring(true);
    try {
      const e = await restore();
      const found = e.premium.active || e.packs.length > 0 || e.formCheckCredits > 0;
      haptic(found ? "success" : "warning");
      track("restore_tapped", { result: found ? "restored" : "none" });
      showToast({ key: found ? "profile.restored" : "profile.restoreNone", tone: found ? "ok" : "error" });
    } catch {
      haptic("error");
      track("restore_tapped", { result: "failed" });
      showToast({ key: "profile.restoreFailed", tone: "error" });
    } finally {
      setRestoring(false);
    }
  };

  const openReminders = () => {
    if (!profile) return;
    const [h, m] = profile.reminderTime.split(":").map(Number);
    setDraftHour(h);
    setDraftMinute(Math.round(m / 5) * 5);
    setSheet("reminders");
  };

  const saveReminder = () => {
    const time = `${pad2(draftHour)}:${pad2(draftMinute)}`;
    setJSON(REMINDER_KEY, time);
    void patchProfile({ reminderTime: time });
    setSheet(null);
  };

  const onSignOut = async () => {
    setSheet(null);
    await signOut();
    reset(startRoute());
  };

  const name = profile?.name ?? remote.data?.name ?? "";
  const initials = profile?.initials ?? remote.data?.initials ?? "";
  const profilePending = !profile && !remote.error;
  const valueSkeleton = <Skeleton width={72} height={14} radius={6} className="profile-value-skel" />;

  return (
    <view className="profile">
      <scroll-view className="profile-scroll" scroll-orientation="vertical">
        <view className="profile-content">
          <view className="profile-head">
            {profilePending ? <Skeleton width={60} height={60} radius={30} /> : <Avatar initials={initials} size="lg" tone="ember" />}
            <view className="profile-id">
              {remote.error ? (
                <Button label={t("common.retry")} variant="ghost" size="sm" className="profile-retry" onTap={() => setAttempt((n) => n + 1)} />
              ) : profilePending ? (
                <Skeleton width={140} height={22} radius={6} className="profile-name-skel" />
              ) : (
                <text className="profile-name" text-maxline="1">
                  {name}
                </text>
              )}
              {isPremium ? (
                <view className="profile-tier">
                  <ProBadge label={t("common.premium")} />
                  <text className="profile-period">{vm.periodLabel}</text>
                </view>
              ) : null}
            </view>
            <IconButton icon="settings" onTap={() => setSheet("settings")} />
          </view>

          <view className="profile-plan">
            <view className="profile-plan-top">
              <view className="profile-plan-copy">
                <text className="profile-cap">{t("profile.yourPlan")}</text>
                <text className="profile-plan-name">{isPremium ? vm.planName : t("profile.freePlan")}</text>
              </view>
              {isPremium ? <Button variant="ghost" size="sm" label={t("profile.manage")} className="profile-manage" onTap={onManage} /> : null}
            </view>
            <text className="profile-cap profile-plan-status">{isPremium ? vm.statusLine : t("profile.freeSub")}</text>
            {isPremium ? null : <Button variant="gold" label={t("profile.goPremium")} icon="crown" fullWidth className="profile-go" onTap={onManage} />}
          </view>

          <view className="profile-family">
            <FamilyBanner title={vm.familyTitle} subtitle={vm.familySub} onTap={onFamily} />
          </view>

          <view className="profile-group profile-group-first">
            <ProfileRow
              icon="download"
              label={t("profile.downloads")}
              value={downloadsLabel}
              trailing={downloads.loading ? valueSkeleton : undefined}
              chevron
              first
              onTap={() => {}}
            />
            <ProfileRow
              icon="heart"
              label={healthLabel}
              trailing={
                isPremium && profilePending ? (
                  <Skeleton width={46} height={28} radius={14} className="profile-toggle-skel" />
                ) : isPremium ? (
                  <HealthToggle on={profile?.healthSync ?? false} disabled={!profile} onChange={(on) => void onHealth(on)} />
                ) : (
                  <LockBadge variant="inline" size={16} />
                )
              }
              haptic={false}
              onTap={isPremium ? undefined : () => void onHealth(true)}
            />
            <ProfileRow
              icon="bell"
              label={t("profile.reminders")}
              value={reminderLabel}
              trailing={profilePending ? valueSkeleton : undefined}
              chevron
              onTap={openReminders}
            />
            <ProfileRow
              icon="scale"
              label={t("profile.units")}
              value={unitsLabel}
              trailing={profilePending ? valueSkeleton : undefined}
              chevron
              onTap={() => setSheet("units")}
            />
          </view>

          <view className="profile-group">
            <ProfileRow
              icon="refresh"
              label={t("profile.restore")}
              first
              trailing={restoring ? <view className="profile-spinner" /> : undefined}
              onTap={() => void onRestore()}
            />
            <ProfileRow icon="message" label={t("profile.help")} chevron onTap={() => {}} />
          </view>

          {toast ? <text className={`profile-toast profile-toast-${toast.tone}`}>{t(toast.key)}</text> : null}
        </view>
      </scroll-view>

      <BottomSheet visible={sheet === "settings"} onDismiss={() => setSheet(null)} title={t("profile.settings")}>
        <view className="profile-sheet">
          <view className="profile-sheet-row">
            <text className="profile-sheet-label">{t("profile.language")}</text>
            <LanguageToggle />
          </view>
          <Button variant="ghost" label={t("profile.signOut")} fullWidth haptic="heavy" onTap={() => void onSignOut()} />
        </view>
      </BottomSheet>

      <BottomSheet visible={sheet === "family"} onDismiss={() => setSheet(null)} title={t("profile.familySheetTitle")}>
        <view className="profile-sheet">
          <text className="profile-sheet-body">
            {t("profile.familySheetBody", { n: FAMILY_MAX, price: formatInr(FAMILY_ADDON_INR, locale) })}
          </text>
          <Button
            variant="gold"
            label={t("profile.familyCta", { price: formatInr(FAMILY_ADDON_INR, locale) })}
            fullWidth
            loading={familyState === "busy"}
            onTap={() => void buyFamily()}
          />
        </view>
      </BottomSheet>

      <BottomSheet visible={sheet === "reminders"} onDismiss={() => setSheet(null)} title={t("profile.remindersSheet")}>
        <view className="profile-sheet">
          <text className="profile-sheet-preview">{formatTime12(`${pad2(draftHour)}:${pad2(draftMinute)}`)}</text>
          <NumberPicker min={0} max={23} value={draftHour} onChange={setDraftHour} formatLabel={pad2} className="profile-picker" />
          <NumberPicker min={0} max={55} step={5} value={draftMinute} onChange={setDraftMinute} formatLabel={pad2} className="profile-picker" />
          <Button label={t("profile.save")} fullWidth onTap={saveReminder} />
        </view>
      </BottomSheet>

      <BottomSheet visible={sheet === "units"} onDismiss={() => setSheet(null)} title={t("profile.units")}>
        <view className="profile-sheet">
          <text className="profile-sheet-label">{t("profile.weight")}</text>
          <SegmentedControl
            className="profile-segment"
            options={[
              { id: "kg", label: "kg" },
              { id: "lb", label: "lb" },
            ]}
            value={profile?.units.weight ?? "kg"}
            onChange={(weight) => profile && void patchProfile({ units: { ...profile.units, weight } })}
          />
          <text className="profile-sheet-label">{t("profile.length")}</text>
          <SegmentedControl
            className="profile-segment"
            options={[
              { id: "cm", label: "cm" },
              { id: "in", label: "in" },
            ]}
            value={profile?.units.length ?? "cm"}
            onChange={(length) => profile && void patchProfile({ units: { ...profile.units, length } })}
          />
        </view>
      </BottomSheet>
    </view>
  );
}
