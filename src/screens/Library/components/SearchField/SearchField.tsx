import { useState } from "@lynx-js/react";

import { Icon } from "@/components/Icon/Icon.tsx";
import { Pressable } from "@/components/Pressable/Pressable.tsx";

import "./SearchField.css";

type SearchFieldProps = {
  value: string;
  placeholder: string;
  onChange: (value: string) => void;
};

export function SearchField({ value, placeholder, onChange }: SearchFieldProps) {
  const [inputKey, setInputKey] = useState(0);
  const clear = () => {
    setInputKey((k) => k + 1);
    onChange("");
  };
  return (
    <view className="search-field">
      <Icon name="search" tone="dim" size={18} />
      <input
        key={inputKey}
        className="search-field-input"
        placeholder={placeholder}
        confirm-type="search"
        bindinput={(e: { detail: { value: string } }) => onChange(e.detail.value)}
      />
      {value ? (
        <Pressable className="search-field-clear" onTap={clear}>
          <Icon name="x" tone="muted" size={16} />
        </Pressable>
      ) : null}
    </view>
  );
}
