import { Icon } from "@/components/Icon/Icon.tsx";
import type { IconName } from "@/components/Icon/Icon.tsx";
import { Pressable } from "@/components/Pressable/Pressable.tsx";

import "./QuizOptionCard.css";

type QuizOptionCardProps<T extends string> = {
  id: T;
  title: string;
  caption?: string;
  icon?: IconName;
  selected: boolean;
  onSelect: (id: T) => void;
  className?: string;
};

export function QuizOptionCard<T extends string>({ id, title, caption, icon, selected, onSelect, className = "" }: QuizOptionCardProps<T>) {
  return (
    <Pressable className={`quiz-option${selected ? " quiz-option-selected" : ""} ${className}`} onTap={() => onSelect(id)}>
      {icon ? (
        <view className={`quiz-option-icon${selected ? " quiz-option-icon-selected" : ""}`}>
          <Icon name={icon} tone={selected ? "text" : "ember"} size={22} />
        </view>
      ) : null}
      <view className="quiz-option-body">
        <text className="quiz-option-title">{title}</text>
        {caption ? <text className="quiz-option-caption">{caption}</text> : null}
      </view>
      <view className={`quiz-option-radio${selected ? " quiz-option-radio-on" : ""}`}>
        {selected ? <Icon name="check" tone="text" size={14} /> : null}
      </view>
    </Pressable>
  );
}
