# 23 · Cancel → win-back offer

Source: `mockups/png/23-winback.png`. This is a full-screen modal with no tab bar. It is shown **once per user** when they start cancelling.

## 1. Visual inventory (top → bottom)

- Status bar (system).
- Top bar: a round close (×) icon button on the left. There's no title.
- **"Before you go…"** (30/700, display font, left-aligned).
- Body (15, muted, line-height 1.5): "You've trained 14 times and you're on a 6-day streak. Keep your plan and progress for less."
- Offer card (radius 22, padding 22, centred; a dark ember→brown diagonal gradient; 1px ember border at about 45%), mt 24:
  - An ember pill, **"One-time offer"** (12/600, white).
  - **"50% off"**: huge display numerals, 52/700, line-height 1.
  - "for your next 3 months" (17/600).
  - The price line (13):
    - "₹399", struck through in dim.
    - **"₹199 / month"**, bold in text colour.
    - ", then ₹399", muted.
- "Offer ends in" (13, muted, centred), mt 20.
- Countdown: three boxes (76 wide, surface-2, 1px line, radius 14, padding 10/0, gap 10):
  - **23** hours
  - **59** min
  - **12** sec
  - The digits are 28 in the display font; the labels are 11, muted.
- Empty space.
- Pinned footer (gap 12):
  - Primary **"Keep Premium for ₹199"** (ember-grad, 56h, with a glow).
  - Ghost **"[clock icon] Pause for 1 month instead"** (56h, surface-2, 1px line).
  - Text link **"Continue to cancel"** (14/600, muted, centred).
- Home indicator.

## 2. Purpose and entry/exit

- Purpose: save a cancelling subscriber with a store promotional offer (50% off for 3 months) or a 1-month pause, before handing off to store cancellation.
- Entry: Profile (22) → Manage, only if the user is Premium, `willRenew`, and the win-back has never been shown. Also a deep link from a cancel-intent push (later), with the same guard.
- Params: `WinBackParams = { productId: string; source: 'profile_manage' | 'push' }`.
- Exits:
  - × → back to Profile. This counts as dismissed, so the offer is spent.
  - **Keep Premium** succeeds → Profile, with a toast "You're saving 50% for 3 months".
  - **Pause** succeeds → Profile. The status line becomes "Paused until {date}".
  - **Continue to cancel** → `purchases.openManageSubscriptions()` (native store), and the screen pops.
  - Countdown reaches 0 → the offer CTA is disabled and the screen offers only Pause or Continue.

## 3. Files

- `src/screens/WinBack/WinBack.tsx` and `src/screens/WinBack/WinBack.css`. Export `export function WinBack(props: WinBackParams)`.
- `src/components/Countdown/Countdown.tsx` and `.css` (canonical).
- `src/components/OfferCard/OfferCard.tsx` and `.css` (new, screen-local candidate).
- `src/components/Chip/Chip.tsx`, for the "One-time offer" pill (ember variant).
- `src/components/Button/Button.tsx`. Exists; add the `icon` prop and a `link` variant.
- `src/components/IconButton/IconButton.tsx` (new, screen-local candidate; shared with 22). Alternatively ScreenHeader with `left="close"` and no title.
- `src/types/winback.ts`.
- `src/api/winback.ts`.
- `src/hooks/useCountdown.ts`.
- `src/services/purchases.ts` (from the 09-paywall plan).
- `src/services/storage.ts`.

## 4. Layout tree

```
<view .wb>                                    bg var(--bg), flex column, padding 0 20, full height
  <view .wb-top> <IconButton round icon="x"/>  40, var(--surface-2), 1px var(--line); padding 4 0 14
  <text .wb-title>Before you go…</text>       30/700 display, ls -0.02em, var(--text)
  <text .wb-body mt8>{bodyCopy}</text>        15/1.5 var(--muted)
  <OfferCard .wb-offer mt24>                  radius var(--radius-card), padding 22, centred,
                                              bg var(--offer-grad), border 1px var(--ember-line)
    <Chip variant="ember" label="One-time offer"/>   24h, radius 999, bg var(--ember), 12/600 var(--on-ember)
    <text .wb-offer-big mt12>50% off</text>  52/700 display, line-height 1, var(--text)
    <text .wb-offer-sub mt8>for your next 3 months</text>   17/600 var(--text)
    <view .wb-offer-price mt8 row>            13
      <text .wb-strike>₹399</text>            var(--dim), text-decoration line-through
      <text .wb-price-strong>₹199 / month</text>   var(--text) 700
      <text .wb-price-rest>, then ₹399</text> var(--muted)
  <text .wb-ends mt20>Offer ends in</text>    13 var(--muted), centred
  <Countdown .mt8 parts={[h,m,s]}/>           row gap 10 centred; box 76w, padding 10 0, radius 14,
                                              var(--surface-2), 1px var(--line); digit 28 display var(--text); label 11 var(--muted)
  <view .wb-spacer flex 1/>
  <view .wb-footer>                           column gap 12, padding-bottom 34; fade var(--bg)
    <Button variant="primary" label="Keep Premium for ₹199"/>
    <Button variant="ghost" icon="clock" label="Pause for 1 month instead"/>
    <Button variant="link" label="Continue to cancel"/>   14/600 var(--muted)
```

- New tokens, unless an earlier plan already added them: `--line`, `--ember-line` (ember at 45%), `--offer-grad` (from #3a1a0a to #1b100b at 160°), `--ember-grad`, and `--on-ember`.
- Use `var(--ember)` for both CTAs' accent. Gold is **not** used on this screen, even though it's Premium-related, because the mockup uses ember. Keep it that way.

## 5. Components

- **Button**: exists. Add `icon` and the `link` variant. Main-thread press opacity applies to all three variants.
- **Countdown**: canonical. Props `{ parts: [string, string, string]; labels: [string, string, string] }`. It is purely presentational and does no timing.
- **Chip**: the ember pill.
- **OfferCard** (new, screen-local candidate): the gradient card and its slot content.
- **IconButton** (new, screen-local candidate): close.
- **BottomSheet**: the pause confirmation ("Pause until 18 Nov? You won't be charged.").

## 6. State and data (background thread)

- Types (`src/types/winback.ts`):
  - `WinBackOffer = { id: string; kind: 'promo' | 'pause'; storeOfferId: string; discountPct: 50; months: 3; basePriceInr: 399; offerPriceInr: 199; expiresAt: string }`.
  - `WinBackStats = { workouts: number; streakDays: number }`.
  - `WinBackStatus = { eligible: boolean; shownAt?: string; outcome?: 'accepted' | 'paused' | 'cancelled' | 'dismissed' }`.
- API (`src/api/winback.ts`, with `__DEV__` mocks):
  - `getWinBackOffer(productId)` returns `{ offer, stats, status }`.
    - The server decides eligibility (one per user, across devices) and issues `expiresAt`, which is 24 h from first view.
    - It also signs the Apple promotional offer.
  - `markWinBackShown()`.
  - `recordWinBackOutcome(outcome)`.
- Services:
  - `purchases.purchase(productId, { promotionalOffer: { offerId, signature } })` on iOS, or `{ offerToken }` on Play.
  - `purchases.pauseSubscription(months: 1)`:
    - Play: the server calls `subscriptions.defer` or the Play pause API.
    - iOS has no pause. Fall back to a 1-month free promotional offer, or hide Pause on iOS (see open question).
- `useCountdown(expiresAt)` (background): a `setInterval` of 1000 ms.
  - It computes `[hh, mm, ss]` zero-padded strings on the background thread and `setState`s once per second. That's low-frequency, so a background re-render is acceptable.
  - It stops at 0 and clears on unmount.
- Derived:
  - `bodyCopy`, from stats with i18n plurals.
  - `ctaLabel` "Keep Premium for ₹199", using `formatInr`.
  - Price parts.
- Persisted (show-once):
  - On first render with `eligible`, call `markWinBackShown()` on the server. Also write the local `storage.set('winback.shownAt', iso)` so Profile routing works offline.
  - On re-entry with `shownAt` set and `expiresAt` in the past, skip straight to the store.
  - On re-entry within 24 h, show the same offer with the remaining countdown. It's honest because it's the same timer.
  - Store the outcome on the server.

## 7. Threading (AGENTS.md)

- Main thread: press feedback only (the close button and the three Buttons), using the `Button.tsx` pattern. It captures no data.
- Background thread:
  - The countdown interval and formatting.
  - Offer fetch, purchase, pause, the store hand-off, the show-once persistence, and analytics.
- The countdown doesn't run a main-thread animation. Updating once per second through React is fine; no per-frame work.
- Captured values: none beyond constants. Don't pass the `offer` object into main-thread handlers.

## 8. Premium gating

- **50% off for 3 months** is a store promotional offer:
  - Apple: a Subscription Offer on the existing monthly or annual product, signed by the server.
  - Play: a developer-determined offer on the base plan, tagged `winback`.
  - Applied through `src/services/purchases.ts` (09-paywall plan). The client never computes the price; it shows the store's localised price where available.
  - Annual subscribers: the mockup shows monthly pricing (₹399 → ₹199). For an annual subscriber, either offer a 50% discount on the next period or switch them to monthly with the promo. **Open question.**
- **Pause** is the Play pause API (1 month). On iOS there's no native pause; see the open question.
- Honesty (plan.md §5): the countdown must reflect the real server `expiresAt`. "One-time offer" must be true: enforced by server eligibility. "Continue to cancel" must always be visible and must never be hidden or delayed.

## 9. Analytics

- `cancel_flow_viewed { source, eligible: true, product }` on mount. The Profile Manage tap also fires one with `source: 'profile_manage'`, so de-duplicate: fire it **here** only when entered from push.
- `winback_accepted { kind: 'promo' | 'pause', product, offerId }` on success.
- `purchase { product, offer: 'winback_50_3m' }` on promo success.
- Proposed: `winback_declined { via: 'continue' | 'close' }` and `winback_expired`.

## 10. Edge cases

- Purchase failed: show a toast, keep the screen, and allow retry.
- Purchase cancelled by the user in the store sheet: no-op.
- Purchase pending (Ask to Buy / Play pending): show "Pending approval" and disable the CTAs. Resolve through `purchases.onUpdate`, then record `accepted`.
- Signature fetch failed, or the offer is ineligible according to the store (user already redeemed it): hide the offer card. Show only Pause and Continue, with a muted note.
- Countdown reaches 0 while open: disable the primary CTA and change its label to "Offer expired". Fire `winback_expired`.
- Offline:
  - With the offer cached from this session, show it, but disable the CTAs ("Connect to continue").
  - With no cached offer, skip straight to the store hand-off, or show "Can't load offer" with Continue.
- Show once:
  - Server `status.shownAt` is the source of truth.
  - The local `winback.shownAt` is a fallback.
  - Reinstalls and other devices are covered by the server.
  - A dismissal (×) also counts as shown.
- App killed mid-flow: the outcome stays unrecorded. The next Manage tap sees `shownAt` and goes to the store.
- Stats are 0 (a new subscriber): use the alternate body copy "Keep your plan and progress for less."
- EN/HI: keys `winback.title`, `winback.body` (`{workouts}` and `{streak}` plurals), `winback.badge`, `winback.big` (`{pct}`), `winback.months` (`{n}`), `winback.priceLine`, `winback.endsIn`, `winback.hours`, `winback.min`, `winback.sec`, `winback.keepCta` (`{price}`), `winback.pauseCta`, `winback.continue`. The Hindi title must fit on 2 lines at 30.

## 11. Implementation steps

1. [ ] Add the tokens `--ember-line`, `--offer-grad` and `--on-ember` (plus `--line` and `--ember-grad` if missing). **AC:** no hex in WinBack or its components.
2. [ ] Extend Button with `icon` and the `link` variant. **AC:** all three footer buttons match the PNG and have press opacity.
3. [ ] Build Countdown, Chip (ember) and OfferCard. **AC:** static props render exactly "23 / 59 / 12".
4. [ ] Write `useCountdown(expiresAt)`. **AC:** it ticks once per second, stops at 0, clears on unmount, and does no main-thread work.
5. [ ] Add the types, `src/api/winback.ts` mocks and `formatInr`. **AC:** the mock renders the PNG copy.
6. [ ] Assemble the WinBack layout. **AC:** side by side with the PNG.
7. [ ] Show-once: `markWinBackShown`, plus the local flag, plus Profile's Manage guard. **AC:** the second Manage tap goes to the store, including after an app restart.
8. [ ] Wire the promo purchase through `purchases.purchase(..., { promotionalOffer })` with the pending, failed and cancelled states. **AC:** a mock success records `accepted` and returns to Profile with the toast.
9. [ ] Wire pause (Play), with a BottomSheet confirm and the iOS fallback per the decision. **AC:** a paused status shows in Profile.
10. [ ] Wire Continue and × to `openManageSubscriptions()` / back, and record the outcome. **AC:** Continue is always enabled, even when offline.
11. [ ] Add analytics and EN/HI strings. **AC:** events fire once each, and HI fits.
12. [ ] Run `npx tsc -p .`. **AC:** zero errors.
