import { Pressable } from "@/components/Pressable/Pressable.tsx";

import "./Toggle.css";

type ToggleProps = {
  on: boolean;
  onChange?: (on: boolean) => void;
  disabled?: boolean;
};

export function Toggle({ on, onChange, disabled }: ToggleProps) {
  return (
    <Pressable className={`toggle${on ? " toggle-on" : ""}`} disabled={disabled} onTap={() => onChange?.(!on)}>
      <view className={`toggle-knob${on ? " toggle-knob-on" : ""}`} />
    </Pressable>
  );
}
