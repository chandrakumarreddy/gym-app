import { useEffect, useState } from "@lynx-js/react";

import { Glass } from "@/components/Glass/Glass.tsx";
import { useT } from "@/hooks/useLocale.tsx";
import { pad2 } from "@/utils/format.ts";

import "./Countdown.css";

type CountdownProps = {
  endsAt: number;
  mode?: "hms" | "days";
  onEnd?: () => void;
  className?: string;
};

function remaining(endsAt: number): number {
  return Math.max(0, Math.ceil((endsAt - Date.now()) / 1000));
}

export function Countdown({ endsAt, mode = "hms", onEnd, className = "" }: CountdownProps) {
  const t = useT();
  const [sec, setSec] = useState(() => remaining(endsAt));

  useEffect(() => {
    setSec(remaining(endsAt));
    const id = setInterval(() => {
      const r = remaining(endsAt);
      setSec(r);
      if (r === 0) {
        clearInterval(id);
        onEnd?.();
      }
    }, mode === "days" ? 60_000 : 1000);
    return () => clearInterval(id);
  }, [endsAt, mode]);

  if (mode === "days") {
    const days = Math.ceil(sec / 86_400);
    const label = sec === 0 ? t("common.ended") : days === 1 ? t("common.dayLeft") : t("common.daysLeft", { n: days });
    return <text className={`countdown-days ${className}`}>{label}</text>;
  }

  const parts = [
    { v: pad2(Math.floor(sec / 3600)), l: t("common.countdown.h") },
    { v: pad2(Math.floor((sec % 3600) / 60)), l: t("common.countdown.m") },
    { v: pad2(sec % 60), l: t("common.countdown.s") },
  ];
  return (
    <view className={`countdown ${className}`}>
      {parts.map((p) => (
        <view key={p.l} className="countdown-part">
          <Glass radius={12} />
          <text className="countdown-value">{p.v}</text>
          <text className="countdown-label">{p.l}</text>
        </view>
      ))}
    </view>
  );
}
