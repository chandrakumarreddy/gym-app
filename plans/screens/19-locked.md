# 19 · Locked content sheet

Mockup: `mockups/png/19-locked.png` · Stage 4 Monetize · **overlay**, not a full screen (no TabBar). Opened from any 🔒.

## 1. Visual inventory (top → bottom)
- Underlying content (the screen that was tapped, e.g. 12-program "Lean in 30"): hero art with jumping-jack figure, title "Lean in 30" (30px) — all dimmed by a scrim (black 60%). Status bar dimmed too.
- Bottom sheet (bg surface, top radius 30, 1px line-strong top border, pad 10/20/40):
  - Grabber 40×5, r 3, line-strong, centered, 18px below.
  - Row: gold square icon tile 40×40 r 12 with crown (dark) · "Lean in 30 is Premium" (22px display bold) / "Included with every Premium plan" (13px muted).
  - 3 benefit rows, 15px, ember check icons, gap 10:
    - "All 20 follow-along sessions"
    - "Plus every other program in the library"
    - "Download and train offline"
  - Primary Button (ember gradient, glow): "Start 7-day free trial".
  - Divider row: hairline · "or" (13px muted) · hairline.
  - Ghost Button (surface-2, line border): "Buy this program once · ₹799".
  - Tiny centered (11px dim): "Yours forever, even without a subscription".
- Home indicator.

## 2. Purpose and entry/exit
- Any lock opens this instead of a dead end; two ways to pay: trial (subscription) or one-time pack.
- Entry: lock taps on 07-plan-preview (week 2+), 11-library premium tiles, 12-program locked weeks/download, 13 cast/download, 20-coach Premium program row. Caller fires `lock_tapped` then opens sheet.
- Params `LockedSheetParams`: `{ contentType: "program"|"session"|"feature"; contentId: string; title: string; sessionCount?: number; packProductId?: string; source: string }`. Pack option only when `contentType==="program"` and `packProductId` present.
- Exit:
  - "Start 7-day free trial" → either purchase annual-trial directly via purchases service, or `navigate("paywall", { source: "locked", contentId })`. **Decision:** open full paywall (09) with annual pre-selected, preserving honesty rules (trial timeline visible). See open question.
  - "Buy this program once · ₹799" → `purchases.purchase(packProductId)` in place; success → dismiss + unlock content + toast.
  - Swipe down / scrim tap / Android back → dismiss, back to caller unchanged.

## 3. Files
- `src/screens/LockedSheet/LockedSheet.tsx|.css` — `export function LockedSheet(props: LockedSheetParams & { onClose(): void })` (overlay content; folder under screens since it is a route-level overlay).
- `src/components/BottomSheet/BottomSheet.tsx|.css` (shared, **specified here**).
- `src/components/Button/` (exists): add `variant: "primary-grad" | "ghost"` styling + `loading`/`disabled` props (coordinate with 09).
- `src/components/BenefitRow/BenefitRow.tsx|.css` (new, screen-local candidate; same check-list appears on 09 paywall → promote).
- `src/components/PremiumIconTile/` → **no**, use `ProBadge` with `size="tile"` (40×40 crown-only variant).
- `src/hooks/useLockedSheet.ts` (new): global open/close API so any screen can call `openLocked(params)`; mounted once in `App.tsx` above routes.
- `src/types/purchase.ts` (shared with 09), `src/services/purchases.ts` (09 plan).

## 4. Layout tree
```
<BottomSheet visible onDismiss snap="content">
  ── renders ──
  <view .sheet-root>                              position absolute; inset 0; z 100
    <view .sheet-scrim bindtap=onDismiss>         bg var(--scrim) (black .6); opacity driven by main thread
    <view .sheet-panel>                           absolute bottom 0; left/right 0; bg var(--surface);
                                                  r var(--radius-hero)+2 → use 30px via token --radius-sheet; border-top 1px var(--line-strong);
                                                  pad 10px 20px 40px (+ safe-area bottom)
      <view .sheet-grabber>                       40×5 r 3 bg var(--line-strong); mx auto; mb 18
      {children}
  ── LockedSheet children ──
  <view .locked-head>                             row gap 12
    <ProBadge size="tile"/>                       40×40 r 12 bg var(--gold) crown var(--ink)
    <view>
      <text .locked-title>{title} is Premium      22px bold var(--text)
      <text .locked-sub>                          13px var(--muted)
  <view .locked-benefits>                         mt 20; col gap 10
    <BenefitRow icon="check" text/> ×3            check var(--ember) 18px; text 15px var(--text)
  <Button variant="primary" label="Start 7-day free trial"/>   mt 24; h 56; r var(--radius-button); bg var(--ember-grad); glow shadow token --ember-glow
  <view .locked-or>                               mt 16 row gap 12; 1px var(--line) hairlines grow; "or" 13px var(--muted)
  <Button variant="ghost" label="Buy this program once · ₹799"/> mt 16; bg var(--surface-2); border var(--line)
  <text .locked-note>                             mt 12 center 11px var(--dim)
```
- Gold is used only on the Premium tile (correct per rules); CTAs stay ember.

## 5. Components
### BottomSheet (shared, full spec)
- Props: `{ visible: boolean; onDismiss(): void; snapPoints?: number[] /* fractions of panel height visible, default [1] */; dismissible?: boolean; children }`.
- Structure: scrim + panel + grabber; children inside panel. Rendered into the App-level overlay host so it covers TabBar.
- Measurement (background): panel `bindlayoutchange` → `panelHeight` (once per content change). Background computes and stores in state, then passes as captured primitives:
  - `snapYs: number[]` — translateY per snap (`panelHeight * (1 - f)`), closed = `panelHeight`.
  - `dismissY = panelHeight * 0.35`, `flingVy = 0.8` px/ms, `scrimMax = 0.6`.
- Main-thread state: `useMainThreadRef` for `startY`, `baseY`, `curY`, `lastY`, `lastT`, `vy`.
- Gesture (main thread, trivial handlers):
  - `main-thread:bindtouchstart` on grabber/panel header: record `startY=e.touches[0].clientY`, `lastT=e.timeStamp`; clear `transition`.
  - `main-thread:bindtouchmove`: `curY = max(0, baseY + dy)` (rubber-band: `dy<0 → dy*0.3`); `panel.setStyleProperty("transform", "translateY(Npx)")`; `scrim.setStyleProperty("opacity", String(scrimMax*(1-curY/panelHeight)))`; update `vy` from last sample. No loops, no setState.
  - `main-thread:bindtouchend/cancel`: pick target: if `curY > dismissY || vy > flingVy` → closed, else nearest of precomputed `snapYs` (array length ≤3; nearest pick done by precomputed midpoints `snapMids` so the handler only compares against ≤2 numbers). Set `transition: transform 220ms cubic-bezier(.2,.8,.2,1)` and final transform/opacity. **Single hand-off**: `runOnBackground(onSettle)(targetIndex)` once.
  - Scroll-inside-sheet: only grabber/header region starts drag in v1 (content here fits; no inner scroll). Inner `scroll-view` drag-to-close = later.
- Background `onSettle(i)`: if closed → after 220ms `onDismiss()` (unmount); else store snap index.
- Open/close animation: on `visible` true, background sets initial transform `translateY(panelHeight)` via main-thread function `runOnMainThread(animateTo)(0)` once after layout; close via same with `panelHeight`. Respect reduced motion (duration 0).
- Scrim tap → animate close then `onDismiss`. Android back (`useBackHandler` from nav plan) → same.
- A11y: panel `accessibility-element`, scrim label "Close"; focus moves to title.
- Press feedback for any Buttons inside = existing Button main-thread pattern.
### Others
- **Button** (exists): primary (ember gradient), ghost; add `loading` (spinner, disabled) for purchase in flight.
- **ProBadge** (shared): `size="tile"` crown-only 40×40.
- **BenefitRow** (new, screen-local candidate): `{ text }` check icon var(--ember).

## 6. State and data (background thread)
- `useLockedSheet` store (module-level signal / context): `{ params: LockedSheetParams | null }`; `openLocked(params)`, `closeLocked()`.
- Product info: `purchases.getOffering()` (09 service) → pack price string from store (`priceString`, e.g. "₹799") and trial eligibility (`Product.trialEligible`). Never hard-code ₹799 in UI; mockup value is the fallback in mocks only.
- Benefit copy: `sessionCount` param → "All {n} follow-along sessions"; generic for `feature` type ("Cast to TV", etc.).
- `purchaseState: "idle"|"buying"|"success"|"error"|"cancelled"`.
- Persist: nothing local; entitlement/pack ownership comes from purchases service (RevenueCat cache) → callers re-check `entitlements.packs.includes(packProductId) || tier === "premium"`.

## 7. Threading
- All pricing, eligibility, copy formatting, purchase calls on background.
- BottomSheet drag on main thread with snap points/thresholds precomputed on background and captured as numbers; one `runOnBackground` at gesture end only.
- No React state mirrors of drag position.
- Press feedback main-thread (Button).

## 8. Premium gating
- Option A — trial: `navigate("paywall", { source: "locked", contentId })`; close sheet first. If user not trial-eligible (`product.trialEligible=false`), label becomes "Get Premium" (honesty: no trial claim).
- Option B — pack: `purchases.purchase(packProductId)` → on success: `closeLocked()`, caller re-renders unlocked, toast "Lean in 30 is yours". Hidden for `contentType!=="program"` or when no pack product.
- If user already Premium (stale lock), sheet shouldn't open: `openLocked` checks entitlement first and calls the caller's `onUnlocked` instead.
- Restore: small "Restore purchase" not in mockup; available on paywall/profile only.

## 9. Analytics
- `lock_tapped { content: "<type>:<id>" }` — fired by `openLocked` (single place) so every caller is consistent.
- `paywall_viewed { source: "locked", contentId }` — fired by Paywall (09) only when the trial CTA navigates there. Sheet open is measured by `lock_tapped` (no extra `paywall_viewed`, to avoid double counting; open question whether the sheet itself should count as a paywall view).
- `purchase { product: packProductId }` — by purchases service on success.

## 10. Edge cases
- Purchase cancelled: back to idle silently.
- Purchase failed: inline error text under ghost button (13px var(--muted), not red) "Purchase didn't go through. Try again." + button re-enabled.
- Pending (Play deferred payment): message "Payment pending — we'll unlock when it clears".
- Offline: both buttons disabled + tiny "You're offline"; drag/dismiss still works.
- Loading offerings: ghost button shows skeleton price; trial button enabled (paywall loads its own).
- Double tap: buttons disabled while `buying`.
- Sheet open during navigation/back: back closes sheet first.
- i18n EN/HI: `t("locked.*")` with `{title}` interpolation (HI word order: "{title} प्रीमियम है"); price from store already localized; allow title 2 lines; benefits wrap.

## 11. Implementation steps
1. Tokens: `--scrim`, `--line-strong`, `--ember-grad`, `--ember-glow`, `--ink`, `--radius-sheet` (30px) → no hex.
2. BottomSheet component with layout measurement + precomputed snaps → drags at 60fps, release snaps/dismisses, one background call per gesture (verify via log).
3. `useLockedSheet` host mounted in `App.tsx` overlay layer → `openLocked()` from any screen shows sheet above TabBar.
4. ProBadge `tile`, BenefitRow, Button `loading` → match PNG.
5. `LockedSheet.tsx` content with params → copy matches mockup for Lean in 30 mock.
6. Wire purchases service: offerings price, `purchase(packProductId)`, eligibility label → success unlocks, cancel/fail states handled.
7. Trial CTA → paywall with `source` → paywall_viewed shows correct source.
8. Analytics `lock_tapped` centralised in `openLocked`.
9. Offline/back-button/double-tap edge cases.
10. EN/HI strings.
11. `npx tsc -p .` passes.
