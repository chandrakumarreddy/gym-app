import { Icon } from "@/components/Icon/Icon.tsx";
import type { IconName } from "@/components/Icon/Icon.tsx";
import { Pressable } from "@/components/Pressable/Pressable.tsx";

import "./SelectField.css";

type SelectFieldProps = {
  icon?: IconName;
  value: string;
  className?: string;
  onTap: () => void;
};

export function SelectField({ icon, value, className = "", onTap }: SelectFieldProps) {
  return (
    <Pressable className={`select-field ${className}`} onTap={onTap}>
      {icon ? <Icon name={icon} tone="text" size={20} className="select-field-icon" /> : null}
      <text className="select-field-value" text-maxline="1">
        {value}
      </text>
      <Icon name="chev-d" tone="text" size={20} />
    </Pressable>
  );
}
