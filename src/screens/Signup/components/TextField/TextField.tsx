import type { BaseEvent } from "@lynx-js/types";

import "./TextField.css";

type InputDetail = { value: string };

type TextFieldProps = {
  placeholder: string;
  type?: "text" | "email" | "tel" | "number" | "digit";
  confirmType?: "send" | "done" | "go" | "next";
  maxlength?: number;
  readonly?: boolean;
  invalid?: boolean;
  prefix?: string;
  className?: string;
  onInput?: (value: string) => void;
  onConfirm?: (value: string) => void;
  onBlur?: (value: string) => void;
};

export function TextField({ placeholder, type = "text", confirmType = "done", maxlength, readonly, invalid, prefix, className = "", onInput, onConfirm, onBlur }: TextFieldProps) {
  return (
    <view className={`text-field${invalid ? " text-field-invalid" : ""} ${className}`}>
      {prefix ? <text className="text-field-prefix">{prefix}</text> : null}
      <input
        className="text-field-input"
        placeholder={placeholder}
        type={type}
        confirm-type={confirmType}
        maxlength={maxlength}
        readonly={readonly}
        bindinput={(e: BaseEvent<"bindinput", InputDetail>) => onInput?.(e.detail.value)}
        bindconfirm={(e: BaseEvent<"bindconfirm", InputDetail>) => onConfirm?.(e.detail.value)}
        bindblur={(e: BaseEvent<"bindblur", InputDetail>) => onBlur?.(e.detail.value)}
      />
    </view>
  );
}
