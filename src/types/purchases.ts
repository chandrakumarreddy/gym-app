export type ProductId =
  | "premium_annual"
  | "premium_monthly"
  | "family_annual"
  | `pack_${string}`
  | `formcheck_${1 | 5 | 10}`;

export type EntitlementId = "premium";
export type Tier = "free" | "premium";

export type Product = {
  id: ProductId;
  title: string;
  priceMicros: number;
  currency: "INR";
  priceString: string;
  period?: "monthly" | "annual";
  introTrialDays?: number;
  trialEligible: boolean;
};

export type Offering = { id: string; products: Product[] };

export type PremiumEntitlement = {
  active: boolean;
  productId?: ProductId;
  expiresAt?: number;
  willRenew: boolean;
  isTrial: boolean;
  store?: "app_store" | "play_store";
  family?: { members: number; max: number };
  pausedUntil?: number;
};

export type Entitlements = { premium: PremiumEntitlement; packs: string[]; formCheckCredits: number };

export type PurchaseResult =
  | { status: "success"; entitlements: Entitlements }
  | { status: "cancelled" }
  | { status: "pending" }
  | { status: "error"; message: string };

export type PromotionalOffer = { offerId: string; signature?: string; offerToken?: string };

export type PaywallSource =
  | "onboarding"
  | "locked"
  | "progress"
  | "challenges"
  | "home_banner"
  | "player"
  | "player_speed"
  | "player_cast"
  | "player_voice_cues"
  | "rest_next_weight"
  | "workout"
  | "program"
  | "profile"
  | "family";

export type PlanOptionVM = {
  id: string;
  title: string;
  subtitle?: string;
  price: string;
  priceCaption?: string;
  badge?: string;
};

export type TrialTimelineItem = {
  icon: "check" | "bell" | "star";
  title: string;
  caption: string;
  active: boolean;
};
