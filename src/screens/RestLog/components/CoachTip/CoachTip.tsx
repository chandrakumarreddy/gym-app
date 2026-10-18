import { Icon } from "@/components/Icon/Icon.tsx";
import { LockBadge } from "@/components/LockBadge/LockBadge.tsx";
import { Pressable } from "@/components/Pressable/Pressable.tsx";

import "./CoachTip.css";

type CoachTipProps = {
  text: string;
  locked?: boolean;
  onTap?: () => void;
};

export function CoachTip({ text, locked, onTap }: CoachTipProps) {
  const body = (
    <>
      {locked ? <LockBadge variant="inline" size={14} /> : <Icon name="crown" tone="gold" size={14} />}
      <text className="coach-tip-text">{text}</text>
    </>
  );
  if (onTap) {
    return (
      <Pressable className="coach-tip" haptic={locked ? false : "light"} onTap={onTap}>
        {body}
      </Pressable>
    );
  }
  return <view className="coach-tip">{body}</view>;
}
