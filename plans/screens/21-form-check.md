# 21 · Form check (add-on)

Source: `mockups/png/21-form-check.png`. Stage 4 "Monetize & account". There is no tab bar because this is a pushed screen.

## 1. Visual inventory (top → bottom)

- Status bar (system).
- Top bar: a round back icon button on the left (chevron-left), the centred title **"Form check"** (17/600), and a round "more" (⋯) icon button on the right.
- Dashed upload card (2px dashed border, surface, radius 22, padding 26/16, centred):
  - A 56×56 rounded (16) tile with an ember-soft background and an ember video-camera icon (28).
  - **"Record or upload one set"** (17/600).
  - "Side angle, full body in frame, up to 60 seconds" (13, muted).
  - Two small ghost buttons side by side: **[video icon] Record** and **[upload-arrow icon] Upload** (40h, radius 12, 14/700).
  - State shown: idle, with no clip selected.
- Exercise select field (52h, radius 14, surface-2, 1px line): a dumbbell icon, then **"Romanian deadlift"** (text colour, 15), then a chevron-down on the right. It is closed.
- Coach line: a small gold-gradient avatar with **"PN"** (28px), then "Reviewed by Coach Priya within 48 hours" (13, muted).
- Heading **"Choose a pack"** (17/600, mt 24).
- Pack list (gap 10). Each row is a selectable card (radius 16, 1.5px line-strong border, surface, padding 14/16):
  - **1 review**, no subtitle, priced **₹299**. Unselected: an empty radio.
  - **5 reviews**, subtitle "₹240 each", priced **₹1,199**. **Selected**: ember border, a faint ember vertical gradient fill, and a filled ember radio with a white check. A **"Most popular"** ember pill overhangs the top-right edge (top −11, right 14).
  - **10 reviews**, subtitle "₹200 each", priced **₹1,999**. Unselected.
  - Prices are in the display font, 700 weight, right-aligned.
- Premium note in **gold**: a crown icon (14) and "Premium members save 20% on every pack" (13). This user is shown as not Premium.
- A pinned footer with a fade-to-bg gradient behind it. Primary CTA **"Buy 5 reviews · ₹1,199"** (56h, ember-grad, radius 16, 16/700, with an ember glow shadow).
- Home indicator (system).

## 2. Purpose and entry/exit

- Purpose: sell form-check credits and submit one set video for an async coach review.
- Entry:
  - Coach profile (20), from its "form reviews" CTA. Params: `{ coachId }`.
  - Workout complete (16) or Rest & log (15) overflow, later. Params: `{ exerciseId?, coachId? }`.
  - Profile → Help, later.
- Params: `FormCheckParams = { coachId?: string; exerciseId?: string; source: 'coach' | 'workout' | 'profile' }`.
- Exits:
  - Back → the previous screen.
  - ⋯ → a BottomSheet with "My reviews", "How it works", "Help".
  - Buying succeeds → stay on the screen. Credits go up and the CTA switches to "Submit for review" when a clip is attached.
  - Submitting → a "Sent to Coach Priya" confirmation, then back.
  - Record → the native camera or recorder. Upload → the native picker.

## 3. Files

- `src/screens/FormCheck/FormCheck.tsx` and `src/screens/FormCheck/FormCheck.css`. Export `export function FormCheck(props: FormCheckParams)`.
- `src/components/ScreenHeader/ScreenHeader.tsx` and `.css`. Create it if no earlier plan has.
- `src/components/PlanSelector/PlanSelector.tsx` and `.css`. Shared with 09-paywall; reuse it if it exists.
- `src/components/UploadDropzone/UploadDropzone.tsx` and `.css` (new, screen-local candidate).
- `src/components/SelectField/SelectField.tsx` and `.css` (new, screen-local candidate).
- `src/components/Avatar/Avatar.tsx` and `.css` (new, screen-local candidate; 10, 20 and 22 need it too).
- `src/components/BottomSheet/BottomSheet.tsx`. Used for the exercise picker and the ⋯ menu.
- `src/types/formCheck.ts`.
- `src/api/formChecks.ts`.
- `src/hooks/useFormCheckUpload.ts`.
- `src/services/purchases.ts`. Defined by the 09-paywall plan; consume it only.
- Imports follow this form: `import { PlanSelector } from "@/components/PlanSelector/PlanSelector.tsx";`

## 4. Layout tree

```
<view .fc>                                   bg var(--bg), flex column, padding 0 20
  <ScreenHeader title="Form check" left="back" right="more"/>   icon-btn 40 round, var(--surface-2), 1px var(--line)
  <scroll-view .fc-scroll scroll-orientation="vertical">       padding-bottom ≥ 120 (clears footer)
    <UploadDropzone .fc-drop>                2px dashed var(--line-strong), var(--surface), radius var(--radius-card), padding 26 16, centred
      <view .fc-drop-icon>                   56×56, radius 16, bg var(--ember-soft), icon tint var(--ember)
      <text .fc-drop-title>                  17/600 var(--text), mt 12
      <text .fc-drop-hint>                   13 var(--muted), mt 4
      <view .fc-drop-actions>                row, gap 8, centre, mt 16
        <Button variant="ghost" size="sm" icon="video"  label="Record"/>
        <Button variant="ghost" size="sm" icon="upload" label="Upload"/>
      [uploading] <view .fc-progress>        track var(--surface-3) 4h radius 999; fill var(--ember), width via style
      [ready]     thumbnail row + "Replace" link (var(--muted))
    <SelectField .fc-exercise icon="dumbbell" value="Romanian deadlift"/>   52h, radius 14, var(--surface-2), 1px var(--line), 15 var(--text), mt 16
    <view .fc-coach>                         row gap 10, mt 12
      <Avatar size="sm" variant="alt" initials="PN"/>   28px, gold gradient (coach-avatar tokens, see note)
      <text .cap>                            13 var(--muted)
    <text .fc-h3>Choose a pack</text>        17/600, mt 24
    <PlanSelector .fc-packs options=[…] selectedId>   column gap 10, mt 12
      option row: radius var(--radius-button), 1.5px var(--line-strong), var(--surface), padding 14 16
      selected:   border var(--ember), bg var(--ember-soft) (approximates the 14%→4% vertical fade)
      radio 22: border 2px var(--line-strong); selected → bg var(--ember) + check icon var(--text)
      title 15/600 var(--text); subtitle 13 var(--muted); price display 17/700 var(--text)
      badge <Chip variant="ember" label="Most popular"/>  absolute top −11 right 14, 24h, radius 999, 12/600
    <view .fc-premium-note>                  row gap 8, mt 12, 13, color var(--gold), crown icon 14
  </scroll-view>
  <view .fc-footer>                          absolute left/right 20, bottom 34; ::before fade var(--bg)
    <Button variant="primary" label={cta}/>  56h, var(--ember-grad), radius var(--radius-button), 16/700
```

- Token gaps: `src/theme/tokens.css` currently has no `--line`, `--line-strong`, `--ember-soft`, `--ember-grad` or `--gold-soft`. Add them from `mockups/styles.css`, unless an earlier plan already added them. Avatar gradients need `--avatar-ember-grad` and `--avatar-gold-grad`, and the white check or text on ember needs `--on-ember`. These are new tokens; never write hex in components.
- Gradient and box-shadow support: check them with the `lynx-check-css-support` skill. If they aren't supported, fall back to a solid `var(--ember)`.

## 5. Components

- **Button**: exists. Extend it with `size?: 'md' | 'sm'` and `icon?`. It keeps the main-thread opacity press.
- **ScreenHeader**: back and more icon buttons, with main-thread press feedback.
- **PlanSelector**: generic `{ options: { id, title, subtitle?, price, badge? }[], selectedId, onSelect }`, shared with 09. Each option uses main-thread press feedback and a background `bindtap` to select.
- **Chip**: the "Most popular" pill (ember variant).
- **BottomSheet**: the exercise picker list and the ⋯ menu.
- **UploadDropzone** (new, screen-local candidate): the idle, uploading, ready and failed states.
- **SelectField** (new, screen-local candidate): a read-only field that opens a BottomSheet.
- **Avatar** (new, screen-local candidate): the initials circle, in `sm`, `md` and `lg` sizes and the `ember`, `alt` and `alt2` colours.
- **ProBadge**: not used. The note is plain gold text and a crown icon.

## 6. State and data (background thread)

- Types go in `src/types/formCheck.ts`:
  - `CreditPack = { id: 'fc_1' | 'fc_5' | 'fc_10'; productId: string; reviews: number; priceInr: number; premiumPriceInr: number; popular?: boolean }`.
  - `FormCheckUpload = { status: 'idle' | 'picking' | 'uploading' | 'ready' | 'failed'; progressPct: number; localUri?: string; uploadId?: string; durationSec?: number; error?: string }`.
  - `FormCheckSubmission = { id; exerciseId; coachId; uploadId; status: 'queued' | 'in_review' | 'reviewed'; dueAt: string }`.
- API in `src/api/formChecks.ts`. It uses `request` and keeps mock fallbacks behind `__DEV__`.
  - `getCreditPacks()` returns `CreditPack[]`. Mock values: 299/1199/1999. Premium prices come from the store's discounted products: 239/959/1599.
  - `getCredits()` returns `{ balance: number }`.
  - `createUploadSession(meta)` returns `{ uploadId, uploadUrl, chunkSize }`.
  - `submitFormCheck({ exerciseId, coachId, uploadId })` returns `FormCheckSubmission`.
  - `getCoach(coachId)`, for "Coach Priya" and the "PN" initials.
- Screen state (`useState` / `useAsync`):
  - `packs`, `selectedPackId` (default `'fc_5'`) and `exerciseId`.
  - `isPremium`, from `purchases.getEntitlements()`.
  - `credits` and `purchaseState: 'idle' | 'pending' | 'failed'`.
  - `upload: FormCheckUpload`, from `useFormCheckUpload`.
- Derived on the background thread with `useMemo`:
  - `displayPrice`, which is `isPremium ? premiumPriceInr : priceInr`.
  - `perEach`, the "₹240 each" label.
  - `ctaLabel`: "Buy 5 reviews · ₹1,199" when there are no credits; "Submit for review (4 left)" when credits are above 0 and the clip is ready.
  - INR formatting with `formatInr()`, added to `src/utils/format.ts` and using `Intl` with an `en-IN` fallback.
- Persisted:
  - The credit balance is server-side. Cache the last value locally for offline display.
  - Persist the in-progress upload (`uploadId`, `localUri`, offset) in local storage under `fc.upload.pending` so it can resume.
  - Persist the last chosen `exerciseId`.

## 7. Threading (AGENTS.md)

- Main thread: press feedback only.
  - Button, the ScreenHeader icon buttons, PlanSelector rows, SelectField and the dropzone buttons each use `main-thread:bindtouchstart`, `bindtouchend` and `bindtouchcancel`, which set `opacity` (and optionally `transform`). They follow the `Button.tsx` pattern.
- Background thread: pack selection (`bindtap` → `setSelectedPackId`), price derivation, the purchase, the credits refresh, the picker and camera native calls, chunked upload, and submit.
- Upload progress:
  - The upload hook runs on the background thread.
  - It throttles `setUpload({ progressPct })` to at most every 250 ms or every 5% step.
  - The progress bar width is a style string precomputed on the background thread (`${pct}%`). There is no per-chunk main-thread work.
- Captured values: the press handlers capture nothing heavy. If a scale press is used, they take `pressedOpacity: '0.7'` as a string. Never capture `packs` or `upload` objects.
- Don't put chunk hashing or reading on the main thread. Each chunk upload is `await`ed in sequence, so the background thread yields between chunks.

## 8. Premium gating

- Packs are consumables bought through `src/services/purchases.ts`, which comes from the 09-paywall plan: `purchase(productId)` returns `PurchaseResult { status: 'success' | 'pending' | 'cancelled' | 'failed' }`.
- **20% off for Premium**:
  - Use separate store products (`fc_5_premium`, etc.) or an Apple promotional offer / Play offer tagged for Premium. Choose the product ID on the background thread from `isPremium`. Don't discount in the client UI.
  - When Premium, show the price with a struck-through original in var(--dim), and the gold note becomes "Premium price applied".
  - When not Premium, the gold note is tappable and opens the Paywall (09) with `source: 'form_check'`.
- Credits are granted only after the server validates the receipt, through the purchases webhook. The client then refreshes `getCredits()`.

## 9. Analytics

- `purchase { product: productId, price, premium: isPremium, source: 'form_check' }` on success.
- `paywall_viewed { source: 'form_check' }` when the gold note opens the paywall.
- Proposed additions (flag for plan.md): `form_check_upload_started`, `form_check_upload_failed`, `form_check_submitted`.

## 10. Edge cases

- Purchase cancelled: return silently to idle.
- Purchase failed: show an inline error toast and keep the selection.
- Purchase pending (Ask to Buy, or Play pending): disable the CTA and show "Purchase pending approval". Listen through `purchases.onUpdate` and refresh credits when it resolves.
- Double tap: guard with `purchaseState !== 'idle'`.
- Upload failed: show the dropzone in its failed state with "Retry". The progress bar keeps its last %.
- Upload resumed: on mount, read `fc.upload.pending` and resume from the server-reported offset. If the session has expired, restart it.
- Clip longer than 60 s or too large: reject it before upload with an inline message. Duration comes from the native picker metadata.
- Camera or photos permission denied: show an inline hint with an "Open settings" link.
- Offline:
  - Disable the buy and upload actions and show a "You're offline" caption.
  - Keep the selected file. Resume automatically when the device comes back online.
  - Show the cached credits.
- 0 credits with a clip ready: the CTA buys the pack and then submits automatically.
- The coach's SLA is not 48 h: show the copy from the server value.
- EN/HI i18n: put every string in `src/i18n/{en,hi}.ts`. Keys: `formCheck.title`, `formCheck.dropTitle`, `formCheck.dropHint`, `formCheck.record`, `formCheck.upload`, `formCheck.reviewedBy` (`{coach}`, `{hours}`), `formCheck.choosePack`, `formCheck.reviews` (plural), `formCheck.each`, `formCheck.mostPopular`, `formCheck.premiumSave`, `formCheck.buyCta` (`{n}`, `{price}`). Format numbers with en-IN grouping in both locales. Hindi strings run longer, so let the CTA wrap or shrink to 15.

## 11. Implementation steps

1. [ ] Add the missing tokens (`--line`, `--line-strong`, `--ember-soft`, `--ember-grad`, `--gold-soft`, `--on-ember`, and the avatar gradients) to `tokens.css`. **AC:** grep shows no hex in `src/screens/FormCheck` or `src/components/*` outside tokens.
2. [ ] Extend Button with `size` and `icon`. **AC:** Home still renders, and press opacity still works.
3. [ ] Create or reuse ScreenHeader, Chip, Avatar and PlanSelector. **AC:** a PlanSelector row shows the selected and badge states exactly as in the PNG.
4. [ ] Add `src/types/formCheck.ts`, `src/api/formChecks.ts` (with mocks) and `formatInr`. **AC:** `formatInr(1199)` returns `₹1,199`.
5. [ ] Build the `FormCheck` layout with static mock data. **AC:** it matches the PNG side by side (spacing, border on the selected pack, pill overhang, gold note, pinned CTA).
6. [ ] Wire pack selection and the CTA label. **AC:** tapping "10 reviews" changes the CTA to "Buy 10 reviews · ₹1,999". There is no main-thread state.
7. [ ] Add the exercise SelectField and the BottomSheet picker. **AC:** the chosen exercise persists across a remount.
8. [ ] Write `useFormCheckUpload`: the picker and recorder, chunked upload, throttled progress, and resume from `fc.upload.pending`. **AC:** killing the app at 40% resumes from at least 40%. Progress updates are at most 4 per second.
9. [ ] Integrate purchases (`purchase`, pending, failed, Premium product choice, credits refresh). **AC:** the mock purchase increments credits. With Premium on, prices show 20% off.
10. [ ] Submit the flow and its confirmation. **AC:** `submitFormCheck` is called once, and credits drop by 1.
11. [ ] Add the analytics calls and EN/HI strings. **AC:** with the locale switched to HI, every string is translated and nothing overflows.
12. [ ] Run `npx tsc -p .`. **AC:** zero errors.
