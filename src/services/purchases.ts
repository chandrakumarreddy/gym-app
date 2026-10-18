import { track } from "@/api/analytics.ts";
import { getJSON, setJSON } from "@/api/storage.ts";
import { createStore, useStore } from "@/state/store.ts";
import type {
  Entitlements,
  Offering,
  Product,
  ProductId,
  PromotionalOffer,
  PurchaseResult,
  Tier,
} from "@/types/purchases.ts";
import { delay } from "@/utils/delay.ts";

const KEY = "purchases.entitlements";
const MOCK_DELAY = 700;

const FREE: Entitlements = {
  premium: { active: false, willRenew: false, isTrial: false },
  packs: [],
  formCheckCredits: 0,
};

const PRODUCTS: Product[] = [
  { id: "premium_annual", title: "Annual", priceMicros: 2_499_000_000, currency: "INR", priceString: "₹2,499", period: "annual", introTrialDays: 7, trialEligible: true },
  { id: "premium_monthly", title: "Monthly", priceMicros: 399_000_000, currency: "INR", priceString: "₹399", period: "monthly", trialEligible: false },
  { id: "family_annual", title: "Family", priceMicros: 3_999_000_000, currency: "INR", priceString: "₹3,999", period: "annual", trialEligible: false },
  { id: "pack_lean_in_30", title: "Lean in 30", priceMicros: 799_000_000, currency: "INR", priceString: "₹799", trialEligible: false },
  { id: "pack_home_hypertrophy", title: "Home Hypertrophy", priceMicros: 799_000_000, currency: "INR", priceString: "₹799", trialEligible: false },
  { id: "formcheck_1", title: "1 review", priceMicros: 299_000_000, currency: "INR", priceString: "₹299", trialEligible: false },
  { id: "formcheck_5", title: "5 reviews", priceMicros: 1_199_000_000, currency: "INR", priceString: "₹1,199", trialEligible: false },
  { id: "formcheck_10", title: "10 reviews", priceMicros: 1_999_000_000, currency: "INR", priceString: "₹1,999", trialEligible: false },
];

const store = createStore<Entitlements>(getJSON<Entitlements>(KEY) ?? FREE);
let userId: string | null = null;

function commit(next: Entitlements): Entitlements {
  setJSON(KEY, next);
  store.set(next);
  return next;
}

const DAY = 86_400_000;

export function configure(_apiKey: string): void {}

export async function logIn(id: string): Promise<Entitlements> {
  userId = id;
  return store.get();
}

export async function logOut(): Promise<void> {
  userId = null;
  commit(FREE);
}

export function getUserId(): string | null {
  return userId;
}

export async function getOffering(): Promise<Offering> {
  await delay(300);
  const trialUsed = store.get().premium.isTrial || store.get().premium.active;
  return {
    id: "default",
    products: PRODUCTS.map((p) => (p.introTrialDays ? { ...p, trialEligible: !trialUsed } : p)),
  };
}

export async function getProduct(id: ProductId): Promise<Product | undefined> {
  return (await getOffering()).products.find((p) => p.id === id);
}

export async function purchase(productId: ProductId, _opts?: { promotionalOffer?: PromotionalOffer }): Promise<PurchaseResult> {
  await delay(MOCK_DELAY);
  const prev = store.get();
  let next: Entitlements;
  if (productId.startsWith("pack_")) {
    next = { ...prev, packs: prev.packs.includes(productId) ? prev.packs : [...prev.packs, productId] };
  } else if (productId.startsWith("formcheck_")) {
    next = { ...prev, formCheckCredits: prev.formCheckCredits + Number(productId.split("_")[1]) };
  } else {
    const product = PRODUCTS.find((p) => p.id === productId);
    const trial = !!product?.introTrialDays && !prev.premium.isTrial;
    const days = trial ? 7 : product?.period === "monthly" ? 30 : 365;
    next = {
      ...prev,
      premium: {
        active: true,
        productId,
        expiresAt: Date.now() + days * DAY,
        willRenew: true,
        isTrial: trial,
        store: "play_store",
        family: productId === "family_annual" ? { members: 1, max: 4 } : undefined,
      },
    };
  }
  track("purchase", { product: productId });
  return { status: "success", entitlements: commit(next) };
}

export async function restore(): Promise<Entitlements> {
  await delay(MOCK_DELAY);
  return store.get();
}

export async function getEntitlements(): Promise<Entitlements> {
  return store.get();
}

export function getEntitlementsSync(): Entitlements {
  return store.get();
}

export function onEntitlementsChange(fn: (e: Entitlements) => void): () => void {
  return store.subscribe(() => fn(store.get()));
}

export async function openManageSubscriptions(): Promise<void> {}

export async function pauseSubscription(months: number): Promise<Entitlements> {
  await delay(MOCK_DELAY);
  const prev = store.get();
  return commit({ ...prev, premium: { ...prev.premium, pausedUntil: Date.now() + months * 30 * DAY } });
}

export function setTier(tier: Tier): void {
  const prev = store.get();
  commit(
    tier === "premium"
      ? { ...prev, premium: { active: true, productId: "premium_annual", expiresAt: Date.now() + 365 * DAY, willRenew: true, isTrial: false, store: "play_store" } }
      : { ...prev, premium: FREE.premium },
  );
}

export function useEntitlements(): { entitlements: Entitlements; tier: Tier; isPremium: boolean; loading: boolean } {
  const entitlements = useStore(store);
  const isPremium = entitlements.premium.active;
  return { entitlements, tier: isPremium ? "premium" : "free", isPremium, loading: false };
}

export function useEntitlement(): { premium: boolean; ownedPrograms: string[] } {
  const premium = useStore(store, (e) => e.premium.active);
  const ownedPrograms = useStore(store, (e) => e.packs);
  return { premium, ownedPrograms };
}
