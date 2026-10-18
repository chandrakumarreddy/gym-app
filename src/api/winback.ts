import { request, USE_MOCKS } from "@/api/client.ts";
import { respond } from "@/api/mock/respond.ts";
import type { ProductId } from "@/types/purchases.ts";
import type { WinBackOffer, WinBackOutcome, WinBackStats, WinBackStatus } from "@/types/winback.ts";

let status: WinBackStatus = { eligible: true };
let expiresAt: string | null = null;

export async function getWinBackOffer(productId: ProductId): Promise<{ offer: WinBackOffer; stats: WinBackStats; status: WinBackStatus }> {
  if (!USE_MOCKS) return request(`/winback?productId=${productId}`);
  expiresAt ??= new Date(Date.now() + 24 * 3_600_000).toISOString();
  return respond({
    offer: {
      id: "wb_50_3m",
      kind: "promo",
      storeOfferId: "winback_50_3m",
      discountPct: 50,
      months: 3,
      basePriceInr: 399,
      offerPriceInr: 199,
      expiresAt,
    },
    stats: { workouts: 23, streakDays: 6 },
    status,
  });
}

export async function markWinBackShown(): Promise<void> {
  if (!USE_MOCKS) return request("/winback/shown", { method: "POST" });
  status = { ...status, shownAt: status.shownAt ?? new Date().toISOString() };
}

export async function recordWinBackOutcome(outcome: WinBackOutcome): Promise<void> {
  if (!USE_MOCKS) return request("/winback/outcome", { method: "POST", body: JSON.stringify({ outcome }) });
  status = { ...status, eligible: false, outcome };
}
