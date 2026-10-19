import { setAppLock } from "@/api/appLock.ts";
import { haptic } from "@/api/haptics.ts";
import { Button } from "@/components/Button/Button.tsx";
import { Icon } from "@/components/Icon/Icon.tsx";
import { useT } from "@/hooks/useLocale.tsx";

import "./AppLockPrompt.css";

type AppLockPromptProps = {
  onClose: () => void;
};

export function AppLockPrompt({ onClose }: AppLockPromptProps) {
  const t = useT();

  const onEnable = async () => {
    if (await setAppLock(true)) {
      haptic("success");
      onClose();
    }
  };

  return (
    <view className="app-lock-prompt">
      <view className="app-lock-prompt-icon">
        <Icon name="shield" tone="ember" size={24} />
      </view>
      <text className="app-lock-prompt-title">{t("common.appLock.title")}</text>
      <text className="app-lock-prompt-body">{t("common.appLock.body")}</text>
      <Button label={t("common.appLock.enable")} fullWidth haptic={false} className="app-lock-prompt-cta" onTap={() => void onEnable()} />
      <Button label={t("common.appLock.later")} variant="link" onTap={onClose} />
    </view>
  );
}
