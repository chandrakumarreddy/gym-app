import "./ProgressDots.css";

type ProgressDotsProps = {
  value: number;
  total: number;
  variant?: "dots" | "bar";
  className?: string;
};

export function ProgressDots({ value, total, variant = "dots", className = "" }: ProgressDotsProps) {
  const items = Array.from({ length: total }, (_, i) => i);
  if (variant === "bar") {
    return (
      <view className={`progress-bar ${className}`}>
        {items.map((i) => (
          <view key={i} className={`progress-bar-seg${i < value ? " progress-bar-seg-on" : ""}`} />
        ))}
      </view>
    );
  }
  return (
    <view className={`progress-dots ${className}`}>
      {items.map((i) => (
        <view key={i} className={`progress-dot${i === value ? " progress-dot-on" : ""}`} />
      ))}
    </view>
  );
}
