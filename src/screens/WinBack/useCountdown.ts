import { useEffect, useState } from "@lynx-js/react";

import { pad2 } from "@/utils/format.ts";

function remaining(endsAt: number): number {
  return Math.max(0, Math.ceil((endsAt - Date.now()) / 1000));
}

export function useCountdown(endsAt: number | null): { parts: [string, string, string]; done: boolean } {
  const [, setTick] = useState(0);

  useEffect(() => {
    if (!endsAt || remaining(endsAt) === 0) return;
    const id = setInterval(() => {
      setTick((n) => n + 1);
      if (remaining(endsAt) === 0) clearInterval(id);
    }, 1000);
    return () => clearInterval(id);
  }, [endsAt]);

  const sec = endsAt ? remaining(endsAt) : 0;
  return {
    parts: [pad2(Math.floor(sec / 3600)), pad2(Math.floor((sec % 3600) / 60)), pad2(sec % 60)],
    done: endsAt !== null && sec === 0,
  };
}
