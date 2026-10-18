import { useEffect, useState } from "@lynx-js/react";

import { Icon } from "@/components/Icon/Icon.tsx";
import { Pressable } from "@/components/Pressable/Pressable.tsx";
import { useT } from "@/hooks/useLocale.tsx";
import { formatClock } from "@/utils/format.ts";

import "./RestPill.css";

type RestPillProps = {
  endsAt: number;
  onTap: () => void;
};

function remaining(endsAt: number): number {
  return Math.max(0, Math.ceil((endsAt - Date.now()) / 1000));
}

export function RestPill({ endsAt, onTap }: RestPillProps) {
  const t = useT();
  const [sec, setSec] = useState(() => remaining(endsAt));

  useEffect(() => {
    setSec(remaining(endsAt));
    const id = setInterval(() => {
      const r = remaining(endsAt);
      setSec(r);
      if (r <= 0) clearInterval(id);
    }, 1000);
    return () => clearInterval(id);
  }, [endsAt]);

  return (
    <Pressable className="rest-pill" feedback="scale" onTap={onTap}>
      <Icon name="timer" tone="text" size={16} />
      <text className="rest-pill-text">{t("player.restPill", { time: formatClock(sec) })}</text>
    </Pressable>
  );
}
