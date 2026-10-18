import { ICONS } from "./icons.ts";
import type { IconName, IconTone } from "./icons.ts";

import "./Icon.css";

export type { IconName, IconTone };

type IconProps = {
  name: IconName;
  tone?: IconTone;
  size?: number;
  className?: string;
};

export function Icon({ name, tone = "text", size = 20, className = "" }: IconProps) {
  return <image className={`icon ${className}`} src={ICONS[tone][name]} style={{ width: `${size}px`, height: `${size}px` }} />;
}
