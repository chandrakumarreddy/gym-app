import { openHapticsSettings } from "@/api/haptics.ts";
import { Button } from "@/components/Button/Button.tsx";
import { Icon } from "@/components/Icon/Icon.tsx";
import { useT } from "@/hooks/useLocale.tsx";

import "./HapticsPrompt.css";

type HapticsPromptProps = {
  onClose: () => void;
};

export function HapticsPrompt({ onClose }: HapticsPromptProps) {
  const t = useT();

  const onOpen = () => {
    onClose();
    openHapticsSettings();
  };

  return (
    <view className="haptics-prompt">
      <view className="haptics-prompt-icon">
        <Icon name="phone" tone="ember" size={24} />
      </view>
      <text className="haptics-prompt-title">{t("common.haptics.title")}</text>
      <text className="haptics-prompt-body">{t("common.haptics.body")}</text>
      <Button label={t("common.haptics.open")} fullWidth className="haptics-prompt-cta" onTap={onOpen} />
      <Button label={t("common.haptics.later")} variant="link" onTap={onClose} />
    </view>
  );
}
