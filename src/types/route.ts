import type { ChallengeTab } from "@/types/challenge.ts";
import type { PaywallSource, ProductId } from "@/types/purchases.ts";

export type TabId = "home" | "library" | "progress" | "challenges" | "profile";

export type WorkoutSource = "home_hero" | "program_cta" | "program_row" | "library" | "notification";

export type Route =
  | { name: "welcome" }
  | { name: "quiz-goal" }
  | { name: "quiz-experience" }
  | { name: "quiz-schedule" }
  | { name: "quiz-body" }
  | { name: "building" }
  | { name: "plan-preview"; planId: string }
  | { name: "signup"; mode?: "signup" | "signin"; planId?: string }
  | { name: "paywall"; source: PaywallSource; contentId?: string }
  | { name: "home" }
  | { name: "library"; filter?: string; section?: string; coachId?: string }
  | { name: "program"; programId: string; weekIndex?: number }
  | { name: "workout"; sessionId: string; source?: WorkoutSource }
  | { name: "player"; sessionId: string; source?: string; resumeAtSec?: number }
  | { name: "rest-log"; sessionId: string }
  | { name: "complete"; sessionId: string }
  | { name: "progress" }
  | { name: "challenges"; challengeId?: string; tab?: ChallengeTab }
  | { name: "coach"; coachId: string; source?: string }
  | { name: "form-check"; coachId?: string; exerciseId?: string; source: "coach" | "workout" | "profile" }
  | { name: "profile" }
  | { name: "winback"; productId: ProductId; source: "profile_manage" | "push" };

export type RouteName = Route["name"];
export type RouteOf<N extends RouteName> = Extract<Route, { name: N }>;
export type RouteParams<N extends RouteName> = Omit<RouteOf<N>, "name">;

export const TAB_IDS: readonly TabId[] = ["home", "library", "progress", "challenges", "profile"];

export function isTabId(name: string): name is TabId {
  return (TAB_IDS as readonly string[]).includes(name);
}
