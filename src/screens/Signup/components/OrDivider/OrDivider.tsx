import "./OrDivider.css";

type OrDividerProps = { label: string; className?: string };

export function OrDivider({ label, className = "" }: OrDividerProps) {
  return (
    <view className={`or-divider ${className}`}>
      <view className="or-divider-rule" />
      <text className="or-divider-label">{label}</text>
      <view className="or-divider-rule" />
    </view>
  );
}
