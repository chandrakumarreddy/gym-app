# 09 · Paywall

Source: `mockups/png/09-paywall.png` (HTML: `mockups/screens/09-paywall.html`).

## 1. Visual inventory (top → bottom)

- Status bar.
- **Top row** (padding 2/0/10, space-between):
  - Left: a round close button "×" (40×40, `--surface-2` background, `--line` border, 18px icon, opacity .7). It is **always visible**.
  - Right: a **PREMIUM** badge (gold background, dark text, crown icon, 11px 800, letter-spacing .06em, 6 radius, 22h).
- **Headline**: "Unlock all 8 weeks of your plan", 28px display bold, 2 lines.
- **Benefits** (top margin 16, gap 8, 15px `--text`). Each has an 18px `--ember` check:
  1. "Every program and new videos each month"
  2. "Coach voice cues, offline downloads, cast to TV" (wraps)
  3. "Smart progression and detailed stats"
- **Trial timeline card** (top margin 20): `--surface` background, `--line` border, 22 radius, 16 padding. There are 3 items, each with a 32px dot, a title (15px 600) and a caption (13px `--muted`). The connector is a 2px vertical line, a gradient from `--ember` to `--surface-3`:
  1. Dot `--ember` with a white check. "Today" / "Full access to everything".
  2. Dot `--surface-3` with a `--muted` bell. "Day 5" / "We remind you the trial is ending".
  3. Dot `--surface-3` with a `--muted` star. "Day 7" / "Trial ends. Cancel anytime before".
- **Plan selector** (top margin 20, gap 12), each card a 16 radius, 1.5px border, 14/16 padding:
  - **Annual (selected)**: `--ember` border, ember-tint gradient background. A floating tag "Save 48%" (ember pill, top −11, right 14). Radio is filled ember with a white check. "Annual" (17px 600) over "7-day free trial, then ₹2,499/yr" (13px `--muted`). Right side: "₹208" (18px display bold) over "per month" (11px `--dim`).
  - **Monthly (unselected)**: `--line-strong` border, `--surface` background. Empty radio (2px `--line-strong`). "Monthly" / "Billed monthly, no trial". Right: "₹399" / "per month".
- **Footer** (pinned, bottom 34, fade into `--bg`, gap 12):
  - A primary button "Start my 7-day free trial" (56h, ember gradient, glow).
  - A tiny row (11px `--dim`, padding 0 8, space-between): "Restore purchase" · "₹0 due today" · "Terms · Privacy".

## 2. Purpose and entry/exit

- Purpose: the main conversion point. Annual is pre-selected, and the trial timeline removes the fear of being charged by surprise.
- Route `paywall`, with params `{ source: PaywallSource; contentId?: string }`.
  - `PaywallSource = "onboarding" | "locked" | "progress" | "challenges" | "home_banner" | "player" | "workout" | "program" | "profile"`
- Entries: 08 (`onboarding`), 19-locked "Start 7-day free trial" (`locked`, `contentId`), 17 blurred cards (`progress`), 18 coach challenges (`challenges`), 10 upgrade banner, and 13/14 premium actions.
- Exits:
  - **×** with `onboarding` → `setTier("free")` and `resetTo("home")`. The free tier gives Week 1 only. With any other source → `goBack()` (back to the caller, unchanged).
  - Purchase or trial success → entitlements refresh. `onboarding` → `resetTo("home")`. Other sources → `goBack()`, and the caller re-renders unlocked through the `useEntitlements()` subscription. `locked` → `replace` with the unlocked content route if `contentId` is set.
  - Restore success with `premium` → the same as purchase success. No entitlement → inline "No purchases found".
  - Terms and Privacy → `openUrl`.
  - Android back → the same as ×.
- Copy varies by source (background, `paywallCopy(source, plan)`):
  - onboarding: "Unlock all {n} weeks of your plan"
  - locked: "Unlock {contentTitle} and everything else"
  - progress: "See your full progress"
  - challenges: "Join coach-led challenges"
  - default: "Get FitCue Premium"
  - The benefits list stays the same.

## 3. Files

- `src/screens/Paywall/Paywall.tsx`, `src/screens/Paywall/Paywall.css`
- `src/services/purchases.ts` (new): the RevenueCat abstraction
- `src/types/purchases.ts` (new)
- `src/utils/price.ts` (new): per-month and savings math, and formatting
- Components: `@/components/PlanSelector/PlanSelector.tsx`, `@/components/TrialTimeline/TrialTimeline.tsx`, `@/components/ProBadge/ProBadge.tsx`, `@/components/ScreenHeader/ScreenHeader.tsx`, `@/components/Button/Button.tsx`
- New, screen-local candidates: `src/components/BenefitList/` and `src/components/PaywallFooterLinks/`

## 4. Layout tree

```
<view class="pw">                                   bg var(--bg); padding 0 20; height 100%
  <ScreenHeader leading="close" trailing={<ProBadge label="PREMIUM" size="md"/>}/>
                                                    close: 40 round bg var(--surface-2) border var(--line) opacity .7
                                                    ProBadge: bg var(--gold); color var(--on-gold); 11px 800; radius 6; h 22 (md: h 28, 13px)
  <scroll-view scroll-y class="pw-scroll">          padding-bottom 150 (clears footer)
    <text class="pw-title">                         28px display 700 var(--text) lh 1.12
    <BenefitList items/>                            margin-top 16; gap 8; row gap 10; check 18 var(--ember); 15px var(--text)
    <TrialTimeline items/>                          margin-top 20; card bg var(--surface) border var(--line) radius var(--radius-card) padding 16
       item: dot 32 radius 999 (on: bg var(--ember) icon var(--text); off: bg var(--surface-3) icon var(--muted)); gap 14; padding-bottom 18
       connector: absolute left 15 top 32 w 2; bg linear-gradient(var(--ember), var(--surface-3))
       title 15px 600; caption 13px var(--muted)
    <PlanSelector options selectedId onSelect/>     margin-top 20; gap 12
       card: radius var(--radius-button); border 1.5 var(--line-strong); bg var(--surface); padding 14 16; row gap 12
       selected: border var(--ember); bg var(--ember-soft) (gradient .14→.04)
       tag: absolute top -11 right 14; pill bg var(--ember) 12px 600 var(--text)
       radio 22 border 2 var(--line-strong) | selected bg var(--ember) + check
       name 17px 600; sub 13px var(--muted); price 18px display 700; per 11px var(--dim); right-aligned
  <view class="pw-footer">                          absolute left/right 20 bottom 34; gap 12; ::before fade to var(--bg)
    <Button variant="primary" label={ctaLabel} loading/>
    <PaywallFooterLinks/>                           row space-between padding 0 8; 11px var(--dim)
```

- `ctaLabel`: annual with trial gives "Start my 7-day free trial". Monthly, or a user not eligible for the trial, gives "Continue · ₹399/month".
- The middle footer text: trial gives "₹0 due today", else "Cancel anytime".
- When not trial-eligible, hide the TrialTimeline and remove "7-day free trial" from the annual subtitle. This is an honesty rule.

## 5. Components

- **PlanSelector** (canonical): `{ options: PlanOptionVM[]; selectedId; onSelect(id) }`. Reused by 21 (credit packs) and 23.
- **TrialTimeline** (canonical): `{ items: { icon: "check"|"bell"|"star"; title; caption; active }[] }`.
- **ProBadge** (canonical): `label` and `size` ("sm" PRO / "md" PREMIUM).
- **ScreenHeader** (canonical): `leading="close"`, `trailing` slot.
- **Button** (exists, extended in 08): primary plus `loading`.
- **BenefitList** (new, screen-local candidate). Also fits 19-locked, so promote it then.
- **PaywallFooterLinks** (new, screen-local candidate).

## 6. State and data (background)

### `src/types/purchases.ts`

- `ProductId = "premium_annual" | "premium_monthly" | \`pack_${string}\` | \`formcheck_${1|5|10}\``
- `EntitlementId = "premium"`
- `Product { id: ProductId; priceMicros: number; currency: string; priceString: string; period?: "P1Y"|"P1M"; introTrialDays?: number; trialEligible: boolean }`
- `Offering { id: string; products: Product[] }` (from the RevenueCat offering, which supports paywall experiments)
- `Entitlements { premium: { active: boolean; expiresAt?: string; willRenew: boolean; isTrial: boolean }; packs: string[] }`
- `PurchaseResult = { ok: true; entitlements: Entitlements } | { ok: false; reason: "cancelled"|"pending"|"network"|"store"|"already_owned"|"unknown" }`
- `PaywallSource` (union above), `Tier = "free" | "premium"`

### `src/services/purchases.ts` (named exports, background only)

- `configure(appUserId?: string)`: on app start. Calls `NativeModules.FitCuePurchases.configure(apiKey, appUserId)`.
- `logIn(userId)` / `logOut()`: called from 08 and from Profile sign-out.
- `getOffering(id?: string): Promise<Offering>`: cached in memory for 10 min.
- `purchase(productId): Promise<PurchaseResult>`
- `restore(): Promise<Entitlements>`
- `getEntitlements(): Promise<Entitlements>`, `onEntitlementsChange(cb): () => void`
- `useEntitlements(): { entitlements; tier: Tier; loading }`: the hook that 07, 10–22 use for gating.
- `setTier("free")`: records `onboarding.paywallDismissed = true` and `onboarding.step = "done"` via the storage service.
- Implementation:
  - `NativeModules.FitCuePurchases` bridges `react-native-purchases`-equivalent native SDKs (RevenueCat iOS/Android).
  - When the module is missing (web/dev), use a `mockPurchases` with static products: ₹2,499/yr with 7-day trial, ₹399/mo.
  - Prices always come from the store (`priceString`, `priceMicros`) and are never hardcoded in UI.

### `src/utils/price.ts`

- `perMonth(annual)`: `Math.round(priceMicros/12/1e6)`, formatted with `Intl.NumberFormat("en-IN", { style:"currency", currency, maximumFractionDigits:0 })`, giving "₹208".
- `savingsPct(annual, monthly)`: `Math.round((1 - annual/12 / monthly) * 100)`. Plan.md's ₹2,499 vs ₹399 gives 47.8, which rounds to 48.

### Screen state

- `selectedId` defaults to `"premium_annual"`, `status: "loading"|"ready"|"purchasing"|"restoring"|"error"`, `message?`.
- View models (`PlanOptionVM`, timeline items, CTA label, footer text) are computed in `useMemo` on the background from `Offering` + `source` + `t`.
- Persist: entitlements are cached by the RevenueCat SDK. Locally, store `tier` and `onboarding.step` only.
- Day 5 reminder:
  - On trial start, schedule a local notification for day 5 (`@/services/notifications.ts`, native module), with the server push as a backup. This is an honesty rule.
  - Cancel it if the user cancels the trial (an entitlement change with `willRenew = false`).

## 7. Threading (AGENTS.md)

- Main thread:
  - Press feedback on the CTA (Button), the close button (ScreenHeader) and each PlanSelector card. Copy Button's `onPressIn`/`onPressOut`: `"main thread"` first, then only `setStyleProperty("opacity", ...)`.
  - Optional instant selection highlight: a `main-thread:bindtap` on the card sets `setAttribute("class", ...)` immediately. The background `bindtap` then sets `selectedId`. Default: background only, since it's a single tap.
- Background: offering fetch, price math and formatting, copy per source, purchase and restore, entitlement listener, notification scheduling, navigation and analytics.
- Captured values: none beyond the event. Only `selectedId` (a string) is passed to native `purchase`.
- No scroll-linked effects. The footer fade is static CSS.

## 8. Premium gating

- This screen *is* the Premium touchpoint, so gold is allowed only on the PREMIUM badge.
- Benefits checks, the selected plan, the "Save 48%" tag, the timeline and the CTA are all **ember**. They mean action and selection. Don't make them gold.
- Already Premium on entry (for example a stale link): `goBack()` immediately and fire no event.
- Free tier after ×: `tier = "free"`. Week 1 is unlocked, and everything else shows LockBadge or ProBadge and routes to 19 or here.

## 9. Analytics

- `paywall_viewed { source, contentId?, offeringId }` fires once per mount after the offering has loaded.
- `trial_started { product: "premium_annual", source }` fires when the purchase result has `isTrial`.
- `purchase { product, source, price, currency }` fires on every successful paid purchase (including monthly), and also alongside `trial_started`. Plan.md is ambiguous here, so confirm.
- Proposed (not in plan.md, needs approval): `paywall_closed { source }`, `restore_tapped`.

## 10. Edge cases

- Loading the offering: skeletons for the plan cards and the CTA disabled. × stays enabled (honesty rule).
- Offering error or offline: "Couldn't load prices. Check your connection." with a "Try again" ghost Button. Never show hardcoded prices. × still works.
- Purchase cancelled: silent reset. `pending` (Android, a parent's approval or slow card): "Purchase pending. We'll unlock Premium when it completes." Then close, and the listener will unlock later.
- `already_owned` or restore found: treat it as success.
- Not trial-eligible (already used the trial): hide the timeline, and change the CTA and sub copy (see §4).
- Double tap: the CTA is `loading` and ignores taps while `purchasing`.
- Small screens: the content scrolls under the pinned footer, and the footer never overlaps the last card (padding-bottom 150).
- i18n EN/HI:
  - Prices use `priceString` from the store, already localized.
  - Hindi headlines can run 3 lines, which is allowed. "Day 5" and "Day 7" are built from `introTrialDays` (`day = trialDays - 2`, `trialDays`).
  - "per month", "Save {pct}%" and "₹0 due today" go through `t()`. Format ₹0 with the currency formatter too.

## 11. Implementation steps

1. [ ] Add `src/types/purchases.ts`. AC: the types compile, and `PaywallSource` covers every entry in §2.
2. [ ] Add `src/services/purchases.ts` with the native bridge plus mock fallback, and `useEntitlements`. AC: in mock mode `purchase("premium_annual")` resolves with `ok` and `premium.isTrial = true`, and listeners fire.
3. [ ] Add `src/utils/price.ts`. AC: the mock gives "₹208" and 48.
4. [ ] Create or reuse `PlanSelector`, `TrialTimeline`, `ProBadge` (md size) and `ScreenHeader` (close + trailing slot). AC: they match the PNG and use no hex.
5. [ ] Create the screen-local `BenefitList` and `PaywallFooterLinks`.
6. [ ] Build the `Paywall` screen with `source`-driven copy, annual pre-selected, and CTA and footer text by trial eligibility.
7. [ ] × behavior: `onboarding` → `setTier("free")` + `resetTo("home")`, other sources → `goBack()`. Android back works the same way.
8. [ ] Purchase, restore, the success routing per source, and Day 5 notification scheduling.
9. [ ] Call `purchases.configure()` at app start (`src/index.tsx` or the App bootstrap), and `logIn` from 08.
10. [ ] Analytics: `paywall_viewed`, `trial_started` and `purchase`.
11. [ ] Register the `paywall` route. Confirm it's reachable from 19, 17 and 18 with the proper `source`.
12. [ ] Add EN/HI strings under `paywall.*`.
13. [ ] `npx tsc -p .` passes.
