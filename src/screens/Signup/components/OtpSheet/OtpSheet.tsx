import { useEffect, useState } from "@lynx-js/react";

import { BottomSheet } from "@/components/BottomSheet/BottomSheet.tsx";
import { Button } from "@/components/Button/Button.tsx";
import { Skeleton } from "@/components/Skeleton/Skeleton.tsx";
import { useT } from "@/hooks/useLocale.tsx";
import { TextField } from "@/screens/Signup/components/TextField/TextField.tsx";
import { startEmailOtp, startPhoneOtp, verifyEmailOtp, verifyPhoneOtp } from "@/services/auth.ts";
import type { AuthSession } from "@/types/auth.ts";

import "./OtpSheet.css";

export type OtpKind = "phone" | "email";

type OtpSheetProps = {
  kind: OtpKind | null;
  email?: string;
  onClose: () => void;
  onSuccess: (session: AuthSession, kind: OtpKind) => void;
};

type Phase = "contact" | "code";

const PHONE_RE = /^[6-9]\d{9}$/;

export function OtpSheet({ kind, email = "", onClose, onSuccess }: OtpSheetProps) {
  const t = useT();
  const [phase, setPhase] = useState<Phase>("contact");
  const [phone, setPhone] = useState("");
  const [code, setCode] = useState("");
  const [requestId, setRequestId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [resendIn, setResendIn] = useState(0);

  const target = kind === "phone" ? `+91 ${phone}` : email;

  const send = async () => {
    if (!kind || busy) return;
    if (kind === "phone" && !PHONE_RE.test(phone)) {
      setError(t("signup.otp.phoneInvalid"));
      return;
    }
    setBusy(true);
    setError(null);
    const res = kind === "phone" ? await startPhoneOtp(`+91${phone}`) : await startEmailOtp(email);
    setBusy(false);
    if (!res.ok) {
      setError(t("signup.error"));
      return;
    }
    setRequestId(res.requestId);
    setResendIn(res.resendInSec);
    setPhase("code");
  };

  const verify = async () => {
    if (!kind || !requestId || busy || code.length !== 6) return;
    setBusy(true);
    setError(null);
    const res = kind === "phone" ? await verifyPhoneOtp(requestId, `+91${phone}`, code) : await verifyEmailOtp(requestId, email, code);
    setBusy(false);
    if (res.ok) onSuccess(res.session, kind);
    else setError(res.error.code === "invalid_code" ? t("signup.otp.wrong") : t("signup.error"));
  };

  useEffect(() => {
    setPhase("contact");
    setCode("");
    setRequestId(null);
    setError(null);
    setResendIn(0);
    if (kind === "email") void send();
  }, [kind, email]);

  useEffect(() => {
    if (resendIn <= 0) return;
    const id = setTimeout(() => setResendIn((n) => n - 1), 1000);
    return () => clearTimeout(id);
  }, [resendIn]);

  return (
    <BottomSheet visible={kind !== null} onDismiss={onClose} title={t(kind === "email" ? "signup.otp.emailTitle" : "signup.otp.phoneTitle")}>
      <view className="otp">
        {phase === "contact" && kind === "phone" ? (
          <>
            <TextField
              prefix="+91"
              type="tel"
              confirmType="send"
              maxlength={10}
              placeholder={t("signup.otp.phonePlaceholder")}
              invalid={!!error}
              onInput={setPhone}
              onConfirm={() => void send()}
            />
            {error ? <text className="otp-error">{error}</text> : null}
            <Button label={t("signup.otp.send")} block loading={busy} className="otp-cta" onTap={() => void send()} />
          </>
        ) : (
          <>
            {busy && !requestId ? (
              <Skeleton width={220} height={20} radius={6} className="otp-hint-sk" />
            ) : (
              <text className="otp-hint">{t("signup.otp.sentTo", { to: target })}</text>
            )}
            <TextField
              className="otp-code"
              type="number"
              confirmType="done"
              maxlength={6}
              placeholder={t("signup.otp.codePlaceholder")}
              invalid={!!error}
              onInput={setCode}
              onConfirm={() => void verify()}
            />
            {error ? <text className="otp-error">{error}</text> : null}
            <Button label={t("signup.otp.verify")} block loading={busy} disabled={code.length !== 6 || !requestId} className="otp-cta" onTap={() => void verify()} />
            <Button
              label={resendIn > 0 ? t("signup.otp.resendIn", { n: resendIn }) : t("signup.otp.resend")}
              variant="link"
              disabled={resendIn > 0 || busy}
              onTap={() => void send()}
            />
          </>
        )}
      </view>
    </BottomSheet>
  );
}
