import { useEffect, useState } from "@lynx-js/react";

import { getJSON, setJSON } from "@/api/storage.ts";

const PREFIX = "fitcue.skeletonCount.";

export function useSkeletonCount(key: string, fallback: number, count: number | undefined): number {
  const [remembered, setRemembered] = useState(() => getJSON<number>(PREFIX + key) ?? fallback);

  useEffect(() => {
    if (count === undefined || count === remembered) return;
    setRemembered(count);
    setJSON(PREFIX + key, count);
  }, [key, count]);

  return remembered;
}
