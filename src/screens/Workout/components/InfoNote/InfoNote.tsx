import { Icon } from "@/components/Icon/Icon.tsx";
import type { IconName, IconTone } from "@/components/Icon/Icon.tsx";

import "./InfoNote.css";

type InfoNoteProps = { icon: IconName; iconTone?: IconTone; text: string; className?: string };

export function InfoNote({ icon, iconTone = "ember", text, className = "" }: InfoNoteProps) {
  return (
    <view className={`info-note ${className}`}>
      <Icon name={icon} tone={iconTone} size={20} />
      <text className="info-note-text">{text}</text>
    </view>
  );
}
