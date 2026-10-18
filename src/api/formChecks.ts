import { request, USE_MOCKS } from "@/api/client.ts";
import { respond } from "@/api/mock/respond.ts";
import { getEntitlementsSync } from "@/services/purchases.ts";
import type { CreditPack, FormCheckSubmission, UploadSession } from "@/types/formCheck.ts";

export const MOCK_PACKS: CreditPack[] = [
  { id: "fc_1", productId: "formcheck_1", reviews: 1, priceInr: 299, premiumPriceInr: 239 },
  { id: "fc_5", productId: "formcheck_5", reviews: 5, priceInr: 1199, premiumPriceInr: 959, popular: true },
  { id: "fc_10", productId: "formcheck_10", reviews: 10, priceInr: 1999, premiumPriceInr: 1599 },
];

export async function getCreditPacks(): Promise<CreditPack[]> {
  if (!USE_MOCKS) return request("/form-checks/packs");
  return respond(MOCK_PACKS);
}

export async function getCredits(): Promise<{ balance: number }> {
  if (!USE_MOCKS) return request("/form-checks/credits");
  return respond({ balance: getEntitlementsSync().formCheckCredits });
}

export async function createUploadSession(meta: { durationSec: number; bytes: number }): Promise<UploadSession> {
  if (!USE_MOCKS) return request("/form-checks/uploads", { method: "POST", body: JSON.stringify(meta) });
  return respond({ uploadId: `up_${Date.now()}`, uploadUrl: "https://upload.fitcue.app/mock", chunkSize: 1_048_576 });
}

export async function submitFormCheck(body: { exerciseId: string; coachId: string; uploadId: string }): Promise<FormCheckSubmission> {
  if (!USE_MOCKS) return request("/form-checks", { method: "POST", body: JSON.stringify(body) });
  return respond({ id: `fc_${Date.now()}`, ...body, status: "queued", dueAt: new Date(Date.now() + 48 * 3_600_000).toISOString() });
}
