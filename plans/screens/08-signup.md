# 08 · Create account (Save your plan)

Source: `mockups/png/08-signup.png` (HTML: `mockups/screens/08-signup.html`).

## 1. Visual inventory (top → bottom)

- Status bar.
- **Top bar**: a round back button (40×40, `--surface-2` background, 1px `--line` border, chevron-left 20px `--text`).
- **Plan summary card**: `--surface` background, `--line` border, 22 radius, 16 padding, row gap 12.
  - Left: a 64×64 art thumbnail (14 radius, ember gradient, squat pictogram).
  - Middle: "Strength Builder" (17px 600) over "8 weeks · 4× / week · Coach Arjun" (13px `--muted`, wraps to 2 lines).
  - Right: a filled ember check dot (26px, white check). The plan is saved locally, which signals it's done.
- **Title** (top margin 32): "Save your plan", 30px display bold.
- **Body** (top margin 8): "Create a free account to keep your plan, progress and downloads on every device.", 15px `--muted`, line-height 1.5.
- **Auth buttons** (top margin 32, gap 12), each 56h, 16 radius, 16px 700, with a 20px leading icon:
  1. "Continue with Apple": **light** variant (`--text` background, dark text), Apple logo.
  2. "Continue with Google": **ghost** (`--surface-2` background, `--line` border), Google "G" logo in color.
  3. "Continue with phone number": ghost, phone outline icon.
- **Divider** (top margin 24): a 1px `--line` rule, "or" (13px `--muted`), then another 1px rule.
- **Email input** (top margin 24): 52h, 14 radius, `--surface-2` background, `--line` border, placeholder "Email address" (15px `--dim`). Empty, unfocused.
- **Legal** (top margin 32): centered, 11px `--dim`, line-height 1.5. "By continuing you agree to the Terms and Privacy Policy." / "We never post anything without asking." "Terms" and "Privacy Policy" are tappable links.
- No pinned footer. The primary action is the first social button.

## 2. Purpose and entry/exit

- Purpose: create an account before purchase, so the plan and subscription sync across devices.
- Entry: `push("signup", { planId })` from 07. Also reachable from 01 "I already have an account" with `{ mode: "signin" }`. In that case the plan card is hidden and the title becomes "Welcome back".
- Exits:
  - Success → `uploadPlan` if the plan is unsynced, `purchases.logIn(userId)`, then `replace("paywall", { source: "onboarding" })`. If the user already has the `premium` entitlement, go to `resetTo("home")` instead.
  - Back → `goBack()` to 07.
  - Phone → the PhoneOtp bottom sheet, which stays on this route.
  - Email submit → the EmailCode bottom sheet (6-digit code, passwordless), which stays on this route.
  - Terms and Privacy → `openUrl` (a native module call on the background).

## 3. Files

- `src/screens/Signup/Signup.tsx`, `src/screens/Signup/Signup.css`
- `src/services/auth.ts` (new): the auth abstraction
- `src/types/auth.ts` (new)
- `src/api/plans.ts`: add `claimPlan(planId)` / `uploadPlan(plan)`
- Components: `@/components/Button/Button.tsx` (extend), `@/components/ScreenHeader/ScreenHeader.tsx`, `@/components/BottomSheet/BottomSheet.tsx`
- New, screen-local candidates: `src/components/PlanSummaryCard/`, `src/components/TextField/`, `src/components/OrDivider/`, `src/components/OtpSheet/`

## 4. Layout tree

```
<view class="su">                                   bg var(--bg); padding 0 20; flex column
  <ScreenHeader leading="back" onBack/>             icon-btn 40 radius 999 bg var(--surface-2) border var(--line); padding 4 0 14
  <scroll-view scroll-y class="su-scroll">          keyboard-safe
    <PlanSummaryCard thumb title meta done/>        bg var(--surface); border var(--line); radius var(--radius-card); padding 16; gap 12
       thumb 64×64 radius 14; title 17px 600; meta 13px var(--muted); check-dot 26 bg var(--ember)
    <text class="su-title">                         30px display 700 var(--text); margin-top 32
    <text class="su-body">                          15px var(--muted) lh 1.5; margin-top 8
    <view class="su-auth">                          column gap 12; margin-top 32
      <Button variant="light" icon="apple" label/>  bg var(--text); color var(--on-light)
      <Button variant="ghost" icon="google" label/> bg var(--surface-2); border 1 var(--line); color var(--text)
      <Button variant="ghost" icon="phone" label/>
    <OrDivider label="or"/>                         margin-top 24; rules 1px var(--line); 13px var(--muted)
    <TextField type="email" placeholder           margin-top 24; h 52; radius 14; bg var(--surface-2); border var(--line);
               confirm-type="send"/>                placeholder var(--dim) 15px; focus border var(--ember)
    <text class="su-legal">                         11px var(--dim) center lh 1.5; margin-top 32; links var(--muted) underline
  <OtpSheet open kind="phone"|"email"/>             BottomSheet: phone input (+91 default) → 6-digit code → verify
```

- Button needs `variant: "primary"|"ghost"|"light"|"gold"`, `icon?`, `disabled?` and `loading?`. Height becomes 56 to match the mockups, and the 52 on Home changes too (accept that).
- Tokens to add if missing: `--on-light` (`#120d0b`), `--line`.
- Brand logos (Apple and Google) are image assets, not tokens. The Google "G" keeps its brand colors inside the asset, which is allowed because it isn't CSS.

## 5. Components

- **Button** (exists): extend it with `light`, `icon`, `loading` (inline spinner, tap disabled) and `disabled`.
- **ScreenHeader** (canonical): `leading="back"`.
- **BottomSheet** (canonical): hosts OtpSheet. The drag-to-dismiss gesture runs on the main thread inside BottomSheet.
- **PlanSummaryCard** (new, screen-local candidate).
- **TextField** (new, screen-local candidate): wraps Lynx `<input>` and is likely promoted later (used by 11 search and 21).
- **OrDivider** (new, screen-local candidate).
- **OtpSheet** (new, screen-local candidate): a phone or email field, then a 6-box code, a resend timer and a Verify Button.

## 6. State and data (background)

- `src/types/auth.ts`:
  - `AuthMethod = "apple"|"google"|"phone"|"email"`
  - `User { id; email?; phone?; name?; createdAt; isNew: boolean }`
  - `Session { user: User; accessToken; refreshToken; expiresAt }`
  - `AuthError { code: "cancelled"|"network"|"invalid_code"|"rate_limited"|"unavailable"|"unknown"; message }`
- `src/services/auth.ts` (named exports, all async, background):
  - `signInWithApple()` and `signInWithGoogle()` call the native modules (`NativeModules.FitCueAuth`) for the ID token, then `POST /auth/{provider}`.
  - `startPhoneOtp(e164)` / `verifyPhoneOtp(e164, code)`, then `POST /auth/phone/start|verify`.
  - `startEmailOtp(email)` / `verifyEmailOtp(email, code)`.
  - `getSession()`, `signOut()`, `useAuth()` (a hook with `{ session, status }`), and `onAuthChange(cb)`.
  - Persists the `Session` via `@/services/storage.ts` (secure storage native module) under the `auth.session` key.
  - Adds `Authorization` to `request()`. Extend `src/api/client.ts` with a token provider and 401 → refresh.
- Screen state: `pending: AuthMethod | null`, `email: string`, `emailError?: string`, `sheet: null | "phone" | "email"`, `error?: AuthError`.
- Email validation is a simple regex on the background, run on `bindconfirm` and blur. It doesn't run on each keystroke.
- Plan summary: `useCurrentPlan()`, then `formatPlanMeta` (from 07) joined with the coach's short name.
- After auth: `claimPlan(planId)` if synced, else `uploadPlan(plan)`. Then `purchases.logIn(user.id)` (`@/services/purchases.ts`, defined in 09) and `setOnboardingStep("paywall")`.

## 7. Threading (AGENTS.md)

- Main thread:
  - Press feedback on all three auth buttons via Button's existing handlers.
  - Back button press feedback: the same opacity pattern in ScreenHeader.
  - BottomSheet drag and snap (inside the canonical component): `main-thread:bindtouchmove` with `setStyleProperty("transform")`, state in `useMainThreadRef`, and a single `runOnBackground(close)` at gesture end only when past the threshold.
  - OTP box focus highlight comes from native input focus and CSS, with no JS.
- Background: provider SDK calls, network, validation, persistence, RevenueCat logIn, navigation and analytics. `<input bindinput>` updates `email` state on the background, which is low frequency (keystrokes).
- Precomputed captured values: the sheet `dismissThreshold` (px) and `sheetHeight` are passed into BottomSheet as numbers.

## 8. Premium gating

- None. No `--gold` on this screen. The account is free.

## 9. Analytics

- `account_created { method, isNew }` fires on success with `isNew === true`.
- An existing user signing in emits nothing new (optionally `login { method }`, which is not in plan.md and needs approval).

## 10. Edge cases

- Loading: tapping a provider disables all auth buttons, and the tapped one shows `loading`. The email field is read-only while pending.
- Cancelled (the user dismisses the Apple or Google sheet): silent reset with no error toast.
- Errors: inline 13px text under the auth stack (`--muted`, with a warning icon). For example, "Couldn't sign you in. Try again." and "That code is wrong." in the sheet. Rate-limited: disable resend and show the countdown.
- Offline: check reachability before starting. Show "You're offline. Your plan is saved on this phone." and keep the buttons enabled for retry, but don't block the plan, which is already saved locally.
- Platform:
  - Android: Apple Sign In via a web OAuth flow, or hide it (open question).
  - iOS: Apple must be offered because Google is (App Store 4.8).
  - Google on iOS uses the Google SDK native module.
- Account already exists with a different method: the server links by email. If there's a conflict, show "Use {method} to sign in".
- Keyboard: the scroll view keeps the email field visible, and `confirm-type="send"` submits.
- Returning user with an existing plan on the server: ask "Keep new plan / Keep saved plan" (open question, default: keep new).
- i18n EN/HI: provider names stay in English, while "Continue with" is translated. Use the Hindi legal copy, which needs approval from legal. The phone default country is +91. OTP SMS language follows the app locale.

## 11. Implementation steps

1. [ ] Add `--on-light` (and `--line`) tokens.
2. [ ] Extend `Button`: `light` variant, `icon`, `loading`, `disabled`, height 56. AC: existing usages compile, and press feedback stays main-thread only.
3. [ ] Create or reuse `ScreenHeader` and `BottomSheet` (canonical). AC: the sheet drag is main-thread only, with one `runOnBackground` call at release.
4. [ ] Create the screen-local `PlanSummaryCard`, `TextField`, `OrDivider` and `OtpSheet`.
5. [ ] Add `src/types/auth.ts` and `src/services/auth.ts`, with a mock implementation when `NativeModules.FitCueAuth` is absent (dev/web). AC: the mock returns a `User` after 600 ms. Each method can return `cancelled`.
6. [ ] Extend `src/api/client.ts` with the auth header and refresh, and add `claimPlan` / `uploadPlan` to `src/api/plans.ts`.
7. [ ] Build the `Signup` screen. AC: the layout matches the PNG, and all four methods reach success in mock mode and route to the paywall with `source: "onboarding"`.
8. [ ] Wire `purchases.logIn(userId)` after auth (depends on 09's service).
9. [ ] Fire `account_created`.
10. [ ] Add EN/HI strings under `signup.*`.
11. [ ] `npx tsc -p .` passes.
