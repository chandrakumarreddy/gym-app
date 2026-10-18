export type WinBackOffer = {
  id: string;
  kind: "promo" | "pause";
  storeOfferId: string;
  discountPct: number;
  months: number;
  basePriceInr: number;
  offerPriceInr: number;
  expiresAt: string;
};

export type WinBackStats = { workouts: number; streakDays: number };

export type WinBackOutcome = "accepted" | "paused" | "cancelled" | "dismissed";

export type WinBackStatus = { eligible: boolean; shownAt?: string; outcome?: WinBackOutcome };
