# 20 · Coach profile

Mockup: `mockups/png/20-coach.png` · Stage 4 Monetize · full screen, no TabBar (pushed route), content extends under status bar.

## 1. Visual inventory (top → bottom)
- Hero header 250px, dark warm radial art with faint grid; stretch-pose figure (ember) at right bottom; thin floor line.
  - Top row (y≈58): glass round back button (chevron-left) left; glass round share button right.
- Avatar "PN" 84px circle, gold gradient, dark initials, 5px bg-colored ring, overlapping hero bottom (−52px).
- Row: "Priya Nair" (22px display bold) / "Mobility & yoga for lifters" (13px muted) · light "Follow" small button right (text-colored bg, dark label).
- Stats row, gap 28: "6" Programs · "140+" Videos · "9 yrs" Coaching (20px display bold / 11px dim labels).
- 1:1 coaching card (dark ember gradient bg, ember 35% border, r 22):
  - Eyebrow "1:1 COACHING" (11px 700, tracking, ember) · pill "Accepting clients" (surface-3) right.
  - "Weekly check-ins and form reviews" (17px semibold).
  - "Personal plan updates, chat, 4 video form checks a month" (13px muted, wraps).
  - "₹2,999" (22px display bold) + " / month" (13px muted) · ember small "Apply" button with glow.
- Section head "Programs" · "All 6" ember link.
- Program rows (64×64 art thumbs r 14):
  - "Yoga for Lifters" / "6 weeks · included in Premium" · gold crown-only PRO badge.
  - "Hip & Knee Bulletproof" / "4 weeks · one-time pack" · ghost small price button "₹799".
- Home indicator.

## 2. Purpose and entry/exit
- Coaches are the brand; page sells programs (Premium/packs) and 1:1 coaching.
- Entry: 11-library coach avatars; 12-program/13-workout coach name; 18-challenges coach challenge detail; deep link `fitcue://coach/:id`.
- Params: `{ coachId: string; source?: string }`.
- Exit:
  - Back → previous route.
  - Share → native share sheet (background `NativeModules` call) with coach URL.
  - Follow → toggles (optimistic).
  - Apply → coaching application route `coach-apply` `{ coachId, planId }` (stub, TODO) — purchase handled there (see §8).
  - "All 6" → program list filtered by coach (11-library with `{ coachId }`).
  - Program row tap → 12-program `{ programId }`. Premium row lock (free user) → LockedSheet (19). Price button → in-place pack purchase or LockedSheet with pack emphasised.

## 3. Files
- `src/screens/CoachProfile/CoachProfile.tsx|.css` — `export function CoachProfile({ coachId }: CoachProfileParams)`.
- Shared: `ListRow` (program rows with thumb + trailing slot), `ProBadge` (`size="icon"` crown-only), `Button` (light/primary/ghost, `size="sm"`), `Chip` (`tone="soft"` for "Accepting clients"), `LockBadge` (unused here; trailing slot shows ProBadge per mockup).
- `src/components/Avatar/` (new, screen-local candidate — shared with 18 plan; size `lg`, ring).
- `src/components/IconButton/IconButton.tsx|.css` (new, screen-local candidate; `round`, `glass` variants — header buttons on 17/18/20/12).
- `src/components/CoachingOfferCard/CoachingOfferCard.tsx|.css` (new, screen-local candidate).
- `src/components/StatInline/` → **no**; inline in screen CSS (3 simple text pairs).
- `src/types/coach.ts`, `src/api/coaches.ts`.

## 4. Layout tree
```
<view .coach>                                   bg var(--bg)
  <scroll-view .coach-scroll scroll-y>
    <view .coach-hero>                          h 250; bg var(--hero-dark-grad) token; position relative
      <image .coach-hero-figure>                abs right -10 bottom 0; 230×230; opacity .9
    <view .coach-body>                          pad 0 20px; margin-top -52px; z 3
      <Avatar initials="PN" tone="gold" size="lg" ring/>   84×84; ring 5px var(--bg); 28px 700 var(--ink)
      <view .row-between mt12>
        <view><text .h2>Priya Nair</text><text .cap/></view>       22px / 13px var(--muted)
        <Button variant="light" size="sm" label="Follow"/>        bg var(--text) label var(--ink); h 40 r 12
      <view .coach-stats>                       row mt16 gap 28
        <view><text .coach-stat-v>6</text><text .tiny>Programs</text></view> ×3   20px bold var(--text) / 11px var(--dim)
      <CoachingOfferCard/>                      mt 20; bg var(--ember-deep-grad); border 1px var(--ember-line); r var(--radius-card); pad 16
        <view .row-between>
          <text .eyebrow>1:1 COACHING           11px 700 ls .12em uppercase var(--ember)
          <Chip tone="soft">Accepting clients   bg var(--surface-3) var(--text) 12px 600 h 24
        <text .h3 mt8/>                         17px 600
        <text .cap mt4/>                        13px var(--muted)
        <view .row-between mt16>
          <text><text .price>₹2,999</text><text .cap> / month</text></text>  22px bold
          <Button variant="primary" size="sm" label="Apply"/>  bg var(--ember-grad) glow var(--ember-glow)
      <view .section-head>                      mt 24 mb 12
        <text .h3>Programs</text><text .link>All 6</text>           var(--ember)
      <ListRow thumb={64,r14} title subtitle trailing={<ProBadge size="icon"/>}/>
      <ListRow ... trailing={<Button variant="ghost" size="sm" label="₹799"/>}/>
  <view .coach-topbar>                          abs top safe+14; left/right 20; row between; z 5
    <IconButton icon="chev-l" round glass/>     40×40 r 999 bg var(--glass) border var(--glass-line)
    <IconButton icon="share" round glass/>
```
- Tokens to add if missing: `--hero-dark-grad`, `--ember-deep-grad` (card bg), `--ember-line`, `--ember-glow`, `--glass`, `--glass-line`, `--gold-grad`, `--ink`.
- Topbar stays fixed over hero; optional: fades to solid bg after hero scrolls past (see §7).

## 5. Components
- **Button** (exists): add `variant: "light"` and `size: "sm"`; price button = ghost sm.
- **ListRow** (shared): `{ thumb?: {src,size}; title; subtitle; trailing?: JSX; onTap }`.
- **ProBadge** (shared): `size="icon"` (crown only, 28×22 r 6, bg var(--gold)).
- **Chip** (shared): `tone="soft"`.
- **Avatar** (new, screen-local candidate): `{ initials; imageUrl?; tone; size; ring? }`.
- **IconButton** (new, screen-local candidate): `{ icon; round?; glass?; onTap }` with main-thread press feedback.
- **CoachingOfferCard** (new, screen-local candidate): `{ eyebrow; availabilityLabel?; title; description; priceLabel; periodLabel; ctaLabel; onApply }` — availability pill rendered only when `acceptingClients===true` (honesty rule).

## 6. State and data (background thread)
- Types `src/types/coach.ts`:
  - `type Coach = { id; name; initials; avatarUrl?; tagline; heroImageUrl; stats: { programs: number; videos: number; yearsCoaching: number }; following: boolean; coaching?: CoachingOffer }`.
  - `type CoachingOffer = { planId; title; description; priceMonthly: number; currency: "INR"; acceptingClients: boolean; storeProductId?: string; externalCheckoutUrl?: string }`.
  - `type CoachProgram = { id; title; weeks: number; thumbUrl; access: "free"|"premium"|"pack"; packProductId?: string }`.
- API `src/api/coaches.ts`: `getCoach(id)`, `getCoachPrograms(id, limit=2)`, `followCoach(id, follow: boolean)`. Mocks = mockup values.
- Derived (background, `src/utils/format.ts`): `formatCount(140, "+")` → "140+", `formatYears(9)` → "9 yrs", `formatPrice(2999, locale)` → "₹2,999" (pack prices come from store `priceString`, not this), program subtitle `"{weeks} weeks · {accessLabel}"`.
- State: coach + programs via `useAsync`; `following` optimistic local state with rollback on error.
- Persist: follow state server-side; cached coach payload for offline.

## 7. Threading
- Fetching, formatting, follow toggling, share native call, entitlement checks all background.
- Press feedback main-thread on IconButtons, Follow, Apply, rows, price button (Button pattern).
- Optional topbar fade: `main-thread:bindscroll` on scroll-view → `topbar.setStyleProperty("background-color", …)`/opacity using precomputed `fadeStart=150, fadeEnd=200` captured numbers; handler only does one clamp + one setStyleProperty; no setState, no runOnBackground.
- Program list is ≤2 items here (no chunking needed); "All 6" goes to library list.

## 8. Premium gating
- Uses `src/services/purchases.ts` (09 plan) + `useEntitlements()`.
- **Premium program row** ("included in Premium"): free → `openLocked({ contentType:"program", contentId, title, packProductId?, source:"coach_profile" })` (19); premium → 12-program.
- **Pack row** (₹799): price button → `purchases.purchase(packProductId)` directly with Button `loading`; already owned (`entitlements.packs` includes id) → trailing shows "Owned" chip and row opens program. Row body tap → 12-program (locked weeks show LockBadge there).
- **1:1 coaching** (Apply): open `coach-apply` route (application form, capacity check). Payment method TBD: IAP subscription (`purchases.purchase(storeProductId)`) vs external checkout under Apple 3.1.3(d) — see open question. Apply hidden/disabled with "Waitlist" ghost when `acceptingClients=false`.
- Paywall reached via LockedSheet trial CTA gets `{ source: "locked", contentId: programId }` (09 `PaywallSource` has no `coach` value; add `"coach"` only if attribution per screen is wanted — open question).

## 9. Analytics
- `lock_tapped { content: "program:<id>" }` via `openLocked`.
- `paywall_viewed { source: "locked", contentId }` (paywall fires).
- `purchase { product: packProductId | coachingProductId }` (purchases service).
- Optional, not in plan.md list: `coach_followed`, `coaching_apply_tapped` — add to plan.md first if wanted.

## 10. Edge cases
- Coach without coaching offer: card hidden; Programs section moves up.
- Not accepting clients: no "Accepting clients" pill; CTA "Join waitlist" ghost.
- 0 programs: section hidden; "All N" hidden when N ≤ shown.
- No avatar image: initials Avatar (as mockup).
- Loading: hero bg + avatar/text skeletons. Error: full-screen retry with back button kept. Offline: cached profile; Follow/Apply/price disabled with tiny "Offline".
- Follow fails: revert + toast.
- Pack purchase cancelled: silent; failed: toast "Purchase didn't go through"; pending: "Payment pending".
- Share unavailable: hide share button.
- i18n EN/HI: `t("coach.*")`; tagline/program titles from CMS per locale (fallback EN); "yrs"/"weeks" plurals via `Intl.PluralRules`; prices via store or `Intl.NumberFormat("hi-IN"|"en-IN", {style:"currency",currency:"INR"})`; eyebrow uppercase only for Latin script (no `text-transform` effect on Devanagari).

## 11. Implementation steps
1. Add tokens in §4 if missing → no hex in new CSS.
2. Types + API mocks → mockup copy reproduced.
3. Format helpers (count, years, price, subtitle) → unit-checked by eye with mocks.
4. Shared/new components: Avatar, IconButton, CoachingOfferCard; Button `light`/`sm`; ProBadge `icon`; Chip `soft`; ListRow thumb+trailing → each folder `.tsx`+`.css`, named exports, main-thread press feedback.
5. Compose `CoachProfile.tsx` with hero overlap (−52px) and fixed glass topbar → matches PNG.
6. Follow optimistic toggle with rollback.
7. Gating: Premium row → LockedSheet; pack price → `purchase(packProductId)`; Apply → coach-apply stub; `source` passed.
8. Optional main-thread topbar fade with precomputed thresholds.
9. Loading/error/offline/purchase-fail states.
10. EN/HI strings.
11. `npx tsc -p .` passes.
