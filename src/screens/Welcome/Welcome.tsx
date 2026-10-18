import jumpFigure from "@/assets/figures/jump.png";
import { Button } from "@/components/Button/Button.tsx";
import { LanguageToggle } from "@/components/LanguageToggle/LanguageToggle.tsx";
import { Logo } from "@/components/Logo/Logo.tsx";
import { useT } from "@/hooks/useLocale.tsx";
import { useRouter } from "@/hooks/useRouter.tsx";
import { quizResumeRoute } from "@/state/startRoute.ts";

import "./Welcome.css";

export function Welcome() {
  const t = useT();
  const { push } = useRouter();

  const start = () => push(quizResumeRoute());

  return (
    <view className="welcome">
      <view className="welcome-hero">
        <view className="welcome-ring welcome-ring-lg" />
        <view className="welcome-ring welcome-ring-sm" />
        <image className="welcome-figure" src={jumpFigure} />
      </view>
      <view className="welcome-fade" />
      <view className="welcome-top">
        <Logo />
        <LanguageToggle />
      </view>
      <view className="welcome-copy">
        <text className="welcome-eyebrow">{t("welcome.eyebrow")}</text>
        <text className="welcome-title">{t("welcome.title")}</text>
        <text className="welcome-body">{t("welcome.body")}</text>
      </view>
      <view className="welcome-footer">
        <Button label={t("welcome.cta")} fullWidth onTap={start} />
        <Button label={t("welcome.signin")} variant="link" onTap={() => push({ name: "signup", mode: "signin" })} />
      </view>
    </view>
  );
}
