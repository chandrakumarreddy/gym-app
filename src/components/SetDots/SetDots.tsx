import "./SetDots.css";

type SetDotsProps = {
  total: number;
  done: number;
  current: number;
  className?: string;
};

export function SetDots({ total, done, current, className = "" }: SetDotsProps) {
  return (
    <view className={`set-dots ${className}`}>
      {Array.from({ length: total }, (_, i) => (
        <view key={i} className={`set-dot${i < done ? " set-dot-done" : i === current ? " set-dot-current" : ""}`} />
      ))}
    </view>
  );
}
