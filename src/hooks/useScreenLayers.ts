import { useEffect, useRef, useState } from "@lynx-js/react";

import type { Route } from "@/types/route.ts";

export type ScreenAnim = "" | "in-push" | "out-push" | "in-pop" | "out-pop" | "fade";
export type ScreenLayer = { id: number; route: Route; anim: ScreenAnim; leaving: boolean };

export const SCREEN_TRANSITION_MS = 320;

// Stack entries keep their object identity across navigations, so they double as screen keys.
const ids = new WeakMap<Route, number>();
let nextId = 0;
function routeId(route: Route): number {
  let id = ids.get(route);
  if (id === undefined) {
    id = ++nextId;
    ids.set(route, id);
  }
  return id;
}

// The screens to render: the current one, plus the outgoing one while a push or pop slides.
// Deeper in the same tab or stack is a push, shallower a pop; anything else (tab switch, reset) fades.
export function useScreenLayers(route: Route, depth: number, tab: string | null): ScreenLayer[] {
  const [layers, setLayers] = useState<ScreenLayer[]>(() => [{ id: routeId(route), route, anim: "", leaving: false }]);
  const prev = useRef({ id: routeId(route), depth, tab });
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const id = routeId(route);
    const p = prev.current;
    if (id === p.id) return;
    prev.current = { id, depth, tab };
    const sameStack = tab === p.tab;
    const kind = sameStack && depth > p.depth ? "push" : sameStack && depth < p.depth ? "pop" : "fade";

    setLayers((ls) => {
      const top = ls.find((l) => !l.leaving) ?? ls[ls.length - 1];
      const incoming: ScreenLayer = { id, route, anim: kind === "fade" ? "fade" : `in-${kind}`, leaving: false };
      if (kind === "fade") return [incoming];
      const outgoing: ScreenLayer = { ...top, anim: `out-${kind}`, leaving: true };
      // The layer that slides over the other is drawn last.
      return kind === "push" ? [outgoing, incoming] : [incoming, outgoing];
    });

    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => {
      timer.current = null;
      setLayers((ls) => ls.filter((l) => !l.leaving).map((l) => ({ ...l, anim: "" })));
    }, SCREEN_TRANSITION_MS);
  }, [route]);

  useEffect(
    () => () => {
      if (timer.current) clearTimeout(timer.current);
    },
    [],
  );

  return layers;
}
