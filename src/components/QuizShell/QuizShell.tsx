import type { ReactNode } from "@lynx-js/react";

import { Button } from "@/components/Button/Button.tsx";
import { IconButton } from "@/components/IconButton/IconButton.tsx";
import { ProgressDots } from "@/components/ProgressDots/ProgressDots.tsx";

import "./QuizShell.css";

type QuizShellProps = {
  step: number;
  total: number;
  title: string;
  subtitle?: string;
  ctaLabel?: string;
  ctaDisabled?: boolean;
  ctaLoading?: boolean;
  onCta?: () => void;
  onBack?: () => void;
  headerRight?: ReactNode;
  footer?: ReactNode;
  children?: ReactNode;
};

export function QuizShell({ step, total, title, subtitle, ctaLabel, ctaDisabled, ctaLoading, onCta, onBack, headerRight, footer, children }: QuizShellProps) {
  return (
    <view className="quiz-shell">
      <view className="quiz-shell-top">
        {onBack ? <IconButton icon="chev-l" onTap={onBack} /> : <view className="quiz-shell-spacer" />}
        <ProgressDots variant="bar" value={step} total={total} className="quiz-shell-progress" />
        {headerRight ?? <view className="quiz-shell-spacer" />}
      </view>
      <scroll-view className="quiz-shell-scroll" scroll-orientation="vertical">
        <view className="quiz-shell-content">
          <text className="quiz-shell-title">{title}</text>
          {subtitle ? <text className="quiz-shell-subtitle">{subtitle}</text> : null}
          {children}
        </view>
      </scroll-view>
      {ctaLabel || footer ? (
        <view className="quiz-shell-footer">
          {footer}
          {ctaLabel ? <Button label={ctaLabel} fullWidth disabled={ctaDisabled} loading={ctaLoading} onTap={onCta} /> : null}
        </view>
      ) : null}
    </view>
  );
}
