import { createContext, useContext, useMemo, useState } from "@lynx-js/react";
import type { ReactNode } from "@lynx-js/react";

import { track } from "@/api/analytics.ts";
import { getEntitlementsSync } from "@/services/purchases.ts";
import type { LockedSheetParams } from "@/types/locked.ts";
import { isTabId } from "@/types/route.ts";
import type { Route, RouteName, RouteOf, TabId } from "@/types/route.ts";

export type Overlay = { kind: "locked"; params: LockedSheetParams } | { kind: "haptics" } | { kind: "app-lock" };

type NavState =
  | { mode: "stack"; stack: Route[] }
  | { mode: "tabs"; tab: TabId; stacks: Record<TabId, Route[]> };

type Router = {
  route: Route;
  mode: NavState["mode"];
  tab: TabId | null;
  depth: number;
  showTabBar: boolean;
  canGoBack: boolean;
  push: (route: Route) => void;
  replace: (route: Route) => void;
  back: () => boolean;
  reset: (route: Route) => void;
  selectTab: (tab: TabId) => void;
  overlay: Overlay | null;
  openLocked: (params: LockedSheetParams) => boolean;
  openHapticsPrompt: () => void;
  openAppLockPrompt: () => void;
  closeOverlay: () => void;
};

const RouterContext = createContext<Router | null>(null);

function tabRoot(tab: TabId): Route {
  return { name: tab } as Route;
}

function freshStacks(): Record<TabId, Route[]> {
  return {
    home: [tabRoot("home")],
    library: [tabRoot("library")],
    progress: [tabRoot("progress")],
    challenges: [tabRoot("challenges")],
    profile: [tabRoot("profile")],
  };
}

function initialState(route: Route): NavState {
  if (isTabId(route.name)) {
    const stacks = freshStacks();
    stacks[route.name] = [route];
    return { mode: "tabs", tab: route.name, stacks };
  }
  return { mode: "stack", stack: [route] };
}

function current(s: NavState): Route[] {
  return s.mode === "stack" ? s.stack : s.stacks[s.tab];
}

function withCurrent(s: NavState, next: Route[]): NavState {
  return s.mode === "stack" ? { mode: "stack", stack: next } : { ...s, stacks: { ...s.stacks, [s.tab]: next } };
}

function selectTabState(s: NavState, tab: TabId): NavState {
  if (s.mode === "stack") return initialState(tabRoot(tab));
  if (s.tab === tab) return { ...s, stacks: { ...s.stacks, [tab]: [s.stacks[tab][0]] } };
  return { ...s, tab };
}

export function RouterProvider({ initial, children }: { initial: Route; children: ReactNode }) {
  const [nav, setNav] = useState<NavState>(() => initialState(initial));
  const [overlay, setOverlay] = useState<Overlay | null>(null);

  const router = useMemo<Router>(() => {
    const stack = current(nav);
    return {
      route: stack[stack.length - 1],
      mode: nav.mode,
      tab: nav.mode === "tabs" ? nav.tab : null,
      depth: stack.length,
      showTabBar: nav.mode === "tabs" && stack.length === 1,
      canGoBack: stack.length > 1,
      push: (route) =>
        setNav((s) => {
          if (s.mode === "tabs" && isTabId(route.name)) return selectTabState(s, route.name);
          return withCurrent(s, [...current(s), route]);
        }),
      replace: (route) => setNav((s) => withCurrent(s, [...current(s).slice(0, -1), route])),
      back: () => {
        if (overlay) {
          setOverlay(null);
          return true;
        }
        if (stack.length < 2) return false;
        setNav((s) => withCurrent(s, current(s).slice(0, -1)));
        return true;
      },
      reset: (route) => setNav(initialState(route)),
      selectTab: (tab) => setNav((s) => selectTabState(s, tab)),
      overlay,
      openLocked: (params) => {
        track("lock_tapped", { content: `${params.contentType}:${params.contentId}`, source: params.source });
        const ent = getEntitlementsSync();
        if (ent.premium.active || (params.packProductId && ent.packs.includes(params.packProductId))) return false;
        setOverlay({ kind: "locked", params });
        return true;
      },
      openHapticsPrompt: () => setOverlay((o) => o ?? { kind: "haptics" }),
      openAppLockPrompt: () => setOverlay((o) => o ?? { kind: "app-lock" }),
      closeOverlay: () => setOverlay(null),
    };
  }, [nav, overlay]);

  return <RouterContext.Provider value={router}>{children}</RouterContext.Provider>;
}

export function useRouter(): Router {
  const router = useContext(RouterContext);
  if (!router) throw new Error("useRouter must be used inside RouterProvider");
  return router;
}

export function useRoute<N extends RouteName>(name: N): RouteOf<N> {
  const { route } = useRouter();
  if (route.name !== name) throw new Error(`useRoute("${name}") called on route "${route.name}"`);
  return route as RouteOf<N>;
}
