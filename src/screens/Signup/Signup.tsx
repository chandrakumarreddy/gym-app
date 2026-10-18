import { useMemo, useState } from "@lynx-js/react";

import { track } from "@/api/analytics.ts";
import { haptic } from "@/api/haptics.ts";
import { claimPlan, uploadPlan } from "@/api/plans.ts";
import { Button } from "@/components/Button/Button.tsx";
import { Icon } from "@/components/Icon/Icon.tsx";
import { ScreenHeader } from "@/components/ScreenHeader/ScreenHeader.tsx";
import { useT } from "@/hooks/useLocale.tsx";
import { useRouter } from "@/hooks/useRouter.tsx";
import { formatPlanMeta } from "@/screens/PlanPreview/planCopy.ts";
import { OrDivider } from "@/screens/Signup/components/OrDivider/OrDivider.tsx";
import { OtpSheet } from "@/screens/Signup/components/OtpSheet/OtpSheet.tsx";
import type { OtpKind } from "@/screens/Signup/components/OtpSheet/OtpSheet.tsx";
import { PlanSummaryCard } from "@/screens/Signup/components/PlanSummaryCard/PlanSummaryCard.tsx";
import { TextField } from "@/screens/Signup/components/TextField/TextField.tsx";
import { signInWithApple, signInWithGoogle } from "@/services/auth.ts";
import { getEntitlementsSync } from "@/services/purchases.ts";
import { getCurrentPlan, setCurrentPlan, setOnboardingStep, useCurrentPlan } from "@/state/plan.ts";
import type { ArtSpec } from "@/types/art.ts";
import type { AuthMethod, AuthResult, AuthSession } from "@/types/auth.ts";
import type { RouteParams } from "@/types/route.ts";

import "./Signup.css";

const THUMB: ArtSpec = { variant: "v1", figure: "squat" };
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function Signup({ mode = "signup" }: RouteParams<"signup">) {
  const t = useT();
  const { back, replace, reset } = useRouter();
  const plan = useCurrentPlan();
  const signin = mode === "signin";
  const [pending, setPending] = useState<AuthMethod | null>(null);
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [sheet, setSheet] = useState<OtpKind | null>(null);
  const [error, setError] = useState<string | null>(null);

  const summary = useMemo(() => {
    if (!plan || signin) return null;
    const meta = formatPlanMeta(plan, t);
    const coach = t("signup.coach", { name: plan.coach.name.split(" ")[0] });
    return { title: plan.title, meta: `${meta[0].label} · ${meta[1].label} · ${coach}` };
  }, [plan, signin, t]);

  const finish = async (session: AuthSession, method: AuthMethod) => {
    const current = getCurrentPlan();
    if (current) {
      try {
        if (current.synced) await claimPlan(current.id, session.user.id);
        else setCurrentPlan(await uploadPlan(current));
      } catch {
        // The plan stays saved on this phone; sync retries later.
      }
    }
    haptic("success");
    if (session.user.isNew) track("account_created", { method, isNew: true });
    setPending(null);
    setSheet(null);
    if (getEntitlementsSync().premium.active) {
      setOnboardingStep("complete");
      reset({ name: "home" });
      return;
    }
    setOnboardingStep("paywall");
    replace({ name: "paywall", source: "onboarding" });
  };

  const social = async (method: "apple" | "google") => {
    if (pending) return;
    setPending(method);
    setError(null);
    let res: AuthResult;
    try {
      res = await (method === "apple" ? signInWithApple() : signInWithGoogle());
    } catch {
      res = { ok: false, error: { code: "unknown", message: "" } };
    }
    if (res.ok) {
      await finish(res.session, method);
      return;
    }
    setPending(null);
    if (res.error.code !== "cancelled") {
      haptic("error");
      setError(t("signup.error"));
    }
  };

  const submitEmail = (value: string) => {
    if (pending) return;
    const v = value.trim();
    if (!EMAIL_RE.test(v)) {
      haptic("error");
      setEmailError(true);
      return;
    }
    setEmail(v);
    setEmailError(false);
    setError(null);
    setSheet("email");
  };

  const onBlur = (value: string) => {
    const v = value.trim();
    setEmailError(v.length > 0 && !EMAIL_RE.test(v));
  };

  const busy = pending !== null;

  return (
    <view className="su">
      <view className="su-header">
        <ScreenHeader leading="back" onBack={() => back()} />
      </view>
      <scroll-view className="su-scroll" scroll-orientation="vertical">
        <view className="su-body">
          {summary ? <PlanSummaryCard art={THUMB} title={summary.title} meta={summary.meta} done /> : null}
          <text className={`su-title${summary ? "" : " su-title-top"}`}>{t(signin ? "signup.titleSignin" : "signup.title")}</text>
          <text className="su-copy">{t(signin ? "signup.bodySignin" : "signup.body")}</text>
          <view className="su-auth">
            <Button
              variant="light"
              icon="apple"
              block
              label={t("signup.apple")}
              loading={pending === "apple"}
              disabled={busy && pending !== "apple"}
              onTap={() => void social("apple")}
            />
            <Button
              variant="ghost"
              icon="google"
              block
              className="su-auth-gap"
              label={t("signup.google")}
              loading={pending === "google"}
              disabled={busy && pending !== "google"}
              onTap={() => void social("google")}
            />
            <Button
              variant="ghost"
              icon="phone"
              block
              className="su-auth-gap"
              label={t("signup.phone")}
              disabled={busy}
              onTap={() => {
                setError(null);
                setSheet("phone");
              }}
            />
            {error ? (
              <view className="su-error">
                <Icon name="bolt" tone="muted" size={14} />
                <text className="su-error-text">{error}</text>
              </view>
            ) : null}
          </view>
          <OrDivider label={t("signup.or")} className="su-or" />
          <TextField
            className="su-email"
            type="email"
            confirmType="send"
            placeholder={t("signup.email")}
            readonly={busy}
            invalid={emailError}
            onInput={(v) => {
              setEmail(v);
              if (emailError) setEmailError(false);
            }}
            onConfirm={submitEmail}
            onBlur={onBlur}
          />
          {emailError ? <text className="su-field-error">{t("signup.emailInvalid")}</text> : null}
          <text className="su-legal">
            {t("signup.legalPrefix")}
            <text className="su-link">{t("signup.terms")}</text>
            {t("signup.legalAnd")}
            <text className="su-link">{t("signup.privacy")}</text>
            {t("signup.legalSuffix")}
          </text>
          <text className="su-legal su-legal-note">{t("signup.legalNote")}</text>
        </view>
      </scroll-view>
      <OtpSheet kind={sheet} email={email} onClose={() => setSheet(null)} onSuccess={(s, kind) => void finish(s, kind)} />
    </view>
  );
}
