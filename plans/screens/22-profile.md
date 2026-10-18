# 22 · Profile & subscription

Source: `mockups/png/22-profile.png`. This is a tab root: the Profile tab is active.

## 1. Visual inventory (top → bottom)

- Status bar (system).
- Header row (padding 4/0/18):
  - An avatar circle, 60px, with an ember gradient and the initials **"AK"** (20/700).
  - **"Aarav Kumar"** (22/700, display font).
  - Below the name, a gold **PREMIUM** badge (crown icon, 11/800, letter-spaced, dark text on gold, radius 6, 22h) followed by "Annual" (13, muted).
  - On the right, a round settings (gear) icon button.
- Plan card (surface, 1px line, radius 22, padding 16):
  - Left column: "Your plan" (13, muted), with **"Premium · Annual"** (17/600) below it.
  - Right: a small ghost button, **"Manage"**.
  - Below: "Free trial ends 24 Oct · then ₹2,499 / year" (13, muted).
  - State shown: annual plan, still in the trial.
- Family banner (gold-tinted gradient, 1px gold border at about 35%, radius 22, padding 16):
  - A gold "users" icon (24).
  - **"Train with family"** (15/600).
  - "Add up to 4 people for ₹1,499 / year more" (13, muted). It wraps to two lines.
  - A gold chevron-right on the far right.
- Settings group 1 (surface, radius 22, rows 14/16 separated by 1px lines). Each row has a 32×32 icon tile (radius 9, surface-3, muted icon):
  - Downloads (download icon). Value "3 workouts · 1.2 GB" (13, muted) and a chevron.
  - Apple Health / Health Connect (heart icon). It wraps to two lines. A **toggle that is ON** (green track, white knob on the right).
  - Workout reminders (bell icon). Value "6:30 pm" and a chevron.
  - Units (scale icon). Value "kg · cm" and a chevron.
- Settings group 2:
  - Restore purchases (refresh icon). No value and no chevron.
  - Help & feedback (message icon), with a chevron.
- Tab bar (86h, top border line): Home, Library, Progress, Challenges and **Profile**. Profile is active in ember (icon and label). The others are dim. Labels are 11/500.
- Home indicator.
- Not shown in the PNG:
  - The free-user variant: no PREMIUM badge; the plan card says "Free" and has a CTA.
  - Sign out.
  - The language switch (EN/HI) under the settings gear.

## 2. Purpose and entry/exit

- Purpose: account and subscription status, the family upsell, device and integration settings, restore, and help.
- Entry: the TabBar Profile tab. Also a deep link `fitcue://profile`. There are no params.
- Exits:
  - Gear → Settings (account, language EN/HI, sign out, legal). That screen has no mockup yet, so it's a stub.
  - **Manage**:
    - Premium and win-back not yet shown → `WinBack` (23) with `{ productId, source: 'profile_manage' }`.
    - Otherwise → the native store subscription management (`purchases.openManageSubscriptions()`).
    - Free user → Paywall (09) with `{ source: 'profile' }`.
  - Family banner → a family-plan purchase sheet (BottomSheet), or Paywall (09) with `{ source: 'family' }` for free users.
  - Downloads → a Downloads list (stub).
  - Reminders → a BottomSheet with a time picker.
  - Units → a BottomSheet with a SegmentedControl (kg/lb, cm/in).
  - Help → Help (stub, or mailto/webview).
  - Tabs → Home, Library, Progress, Challenges.

## 3. Files

- `src/screens/Profile/Profile.tsx` and `src/screens/Profile/Profile.css`. Export `export function Profile()`.
- `src/components/SettingsGroup/SettingsGroup.tsx` and `.css`. Contains the group container and the `SettingsRow` sub-export.
- `src/components/ListRow/ListRow.tsx`. Reuse it if 11 or 13 created it. `SettingsRow` may wrap ListRow.
- `src/components/UpgradeBanner/UpgradeBanner.tsx` and `.css`. The gold banner, shared with Home (10).
- `src/components/ProBadge/ProBadge.tsx` and `.css`. Supports a `label="PREMIUM"` variant.
- `src/components/TabBar/TabBar.tsx` and `.css`.
- `src/components/Toggle/Toggle.tsx` and `.css` (new, screen-local candidate).
- `src/components/Avatar/Avatar.tsx` (new, screen-local candidate; shared with 21).
- `src/components/BottomSheet/BottomSheet.tsx`, `src/components/SegmentedControl/SegmentedControl.tsx`, and NumberPicker (the reminder time).
- `src/types/user.ts` and `src/types/subscription.ts`.
- `src/api/profile.ts`.
- `src/services/purchases.ts` (from the 09-paywall plan).
- `src/services/health.ts` (new): a native Health / Health Connect bridge.
- `src/services/storage.ts`: the local KV store. Reuse it if another plan defines it.

## 4. Layout tree

```
<view .profile>                               bg var(--bg), flex column, full height
  <scroll-view .profile-scroll>               padding 0 20, padding-bottom 24
    <view .profile-head>                      row gap 12, padding 4 0 18
      <Avatar size="md60" initials="AK"/>     60px, radius 999, var(--avatar-ember-grad), 20/700 var(--on-ember)
      <view .profile-id grow>
        <text .h2>Aarav Kumar</text>          22/700 display, var(--text)
        <view .row gap8 mt4>
          <ProBadge label="PREMIUM"/>         22h, radius 6, bg var(--gold), text var(--on-gold), 11/800 ls .06em, crown 12
          <text .cap>Annual</text>            13 var(--muted)
      <IconButton round icon="settings"/>     40, var(--surface-2), 1px var(--line)
    <view .profile-plan card>                 var(--surface), 1px var(--line), radius var(--radius-card), padding 16
      <view .row between>
        <view> <text .cap>Your plan</text> <text .h3 mt4>Premium · Annual</text>
        <Button variant="ghost" size="sm" label="Manage"/>   40h radius 12, var(--surface-2), 1px var(--line)
      <text .cap mt12>{statusLine}</text>
    <UpgradeBanner icon="users" title subtitle chevron mt12/>  radius var(--radius-card), padding 16, gap 14,
                                              bg var(--gold-banner-grad), border 1px var(--gold-line); icon/chevron var(--gold); title 15/600; sub 13 var(--muted)
    <SettingsGroup mt20>                      var(--surface), 1px var(--line), radius var(--radius-card), overflow hidden
      <SettingsRow icon="download" label="Downloads" value="3 workouts · 1.2 GB" chevron/>
      <SettingsRow icon="heart" label="Apple Health / Health Connect" trailing=<Toggle on/>/>
      <SettingsRow icon="bell" label="Workout reminders" value="6:30 pm" chevron/>
      <SettingsRow icon="scale" label="Units" value="kg · cm" chevron/>
         row: row gap 12, padding 14 16, 15 var(--text); separator 1px var(--line) top (not first)
         icon tile: 32×32 radius 9 var(--surface-3), icon var(--muted); value 13 var(--muted); chevron var(--muted)
    <SettingsGroup mt12>
      <SettingsRow icon="refresh" label="Restore purchases" [trailing spinner when restoring]/>
      <SettingsRow icon="message" label="Help & feedback" chevron/>
  <TabBar active="profile"/>                  86h, bg var(--bg), border-top 1px var(--line); tab 11/500 var(--dim); active var(--ember)
```

- Toggle: 46×28, radius 999. Off: `var(--surface-3)`. On: `var(--green)`. The knob is 22px in `var(--text)`, at left 3 when off and left 21 when on. Lynx has no `::after`, so the knob is a child view.
- New tokens, if no earlier plan added them: `--line`, `--gold-soft`, `--gold-line` (rgba gold 35%), `--gold-banner-grad`, `--on-gold`, `--on-ember`, `--avatar-ember-grad`. Don't write hex in the screen CSS.

## 5. Components

- **Button**: exists. The `ghost` + `sm` variant is used for Manage.
- **SettingsGroup**: contains `SettingsRow`, which is built on **ListRow**: the icon tile, label, value, chevron or trailing slot. Each row has main-thread press feedback that sets background to `var(--surface-2)`, and a background `bindtap`.
- **UpgradeBanner**: the family banner, using the gold variant.
- **ProBadge**: the PREMIUM label variant.
- **TabBar**: the shared bottom nav.
- **BottomSheet**: the reminders, units and family-purchase sheets.
- **SegmentedControl**: units. **NumberPicker**: the reminder hour and minute.
- **Toggle** (new, screen-local candidate). Knob movement is a main-thread `setStyleProperty('left', …)` on tap for instant feedback; state is committed on the background thread.
- **Avatar** (new, screen-local candidate). **IconButton** (new, screen-local candidate). ScreenHeader doesn't fit this header, so use IconButton.

## 6. State and data (background thread)

- Types:
  - `src/types/user.ts`: `UserProfile = { id; name; initials; units: { weight: 'kg' | 'lb'; length: 'cm' | 'in' }; reminderTime: 'HH:mm'; healthSync: boolean; locale: 'en' | 'hi' }`.
  - `src/types/subscription.ts`: `Entitlement = { tier: 'free' | 'premium'; period?: 'monthly' | 'annual'; productId?: string; inTrial: boolean; trialEndsAt?: string; renewsAt?: string; priceInr?: number; willRenew: boolean; store: 'app_store' | 'play_store'; family?: { members: number; max: 4 } }`.
- API (`src/api/profile.ts`, with `__DEV__` mocks):
  - `getProfile()`.
  - `updateProfile(patch)`, an optimistic PATCH.
  - `getDownloadsSummary()` returns `{ count, bytes }`, read from the local download store, not the network.
- Services:
  - `purchases.getEntitlements()`, `purchases.restore()`, `purchases.purchase('family_annual')`, `purchases.openManageSubscriptions()`, `purchases.onUpdate(cb)`.
  - `health.requestPermission()` and `health.setSyncEnabled(bool)`.
- Derived with `useMemo` (background):
  - `statusLine`:
    - In trial: "Free trial ends {d MMM} · then ₹2,499 / year".
    - Not in trial: "Renews {date} · ₹2,499 / year".
    - `willRenew: false`: "Ends {date}".
  - `downloadsLabel`: "3 workouts · 1.2 GB", using `formatBytes()` (new) in `src/utils/format.ts`.
  - `reminderLabel`: "6:30 pm", localised.
  - `unitsLabel`: "kg · cm".
- Persisted:
  - Profile fields are server-side, with a local cache for offline.
  - `healthSync` and `reminderTime` are also stored locally, because native scheduling needs them.
  - Read `winback.shownAt` from storage (written by 23) to route Manage.

## 7. Threading (AGENTS.md)

- Main thread:
  - Press feedback on the rows, Manage, the gear, the banner and the tabs (`opacity` / `background-color`, as in `Button.tsx`).
  - Optimistic flip of the toggle knob: set `left` and `background-color` from precomputed captured strings (`knobOn: '21px'`, `knobOff: '3px'`). Keep the visual state in `useMainThreadRef<boolean>`.
  - Only `setStyleProperty`; no logic.
- Background thread:
  - The toggle commit (`setHealthSync`, then the health permission, then `updateProfile`). If it fails, re-render the toggle `off` from React state. The main-thread ref resyncs from props on render.
  - Restore, family purchase, manage routing, entitlement fetch, date and byte formatting, and reminder scheduling (native module).
- Cross threads once per tap. Don't stream anything.

## 8. Premium gating

- Premium user (as in the PNG): the PREMIUM badge, the plan card with Manage, and the family banner.
- Free user:
  - The badge is hidden. The plan card reads "Free plan · Week 1 only" with a gold **"Go Premium"** CTA → Paywall (09) `{ source: 'profile' }`.
  - The family banner → Paywall.
  - Apple Health shows a LockBadge; tapping it opens the Paywall (it's a Premium integration per plan.md §4).
- **Family plan upsell**: `purchases.purchase('family_annual_addon')`, an add-on of +₹1,499/yr for up to 4 people. On success, the banner switches to "Family · 1 of 4 members", which leads to an invite flow (stub).
- **Manage → cancel**:
  - There's no in-app cancel API. FitCue shows win-back (23) once before handing off to `openManageSubscriptions()`.
  - If `winback.shownAt` is already set, or the entitlement is not `willRenew`, go straight to the store.
- **Restore**: `purchases.restore()`. The row shows an inline spinner.
  - On success, re-fetch entitlements and show a "Purchases restored" toast.
  - If nothing was found, show "No purchases found for this account".
  - On failure, show an error toast with Retry.

## 9. Analytics

- `cancel_flow_viewed { source: 'profile_manage' }` fires when Manage is tapped by a renewing Premium user, before routing.
- `paywall_viewed { source: 'profile' | 'family' | 'health_lock' }`.
- `purchase { product: 'family_annual_addon' }` on success.
- `lock_tapped { content: 'health_sync' }` for free users.
- Proposed: `restore_tapped { result }` and `health_sync_toggled { on }`.

## 10. Edge cases

- Restore with nothing found, restore that fails, and restore while offline (disable the row and show "Connect to restore").
- Family purchase is pending (Ask to Buy): the banner shows "Pending approval". It's resolved by `purchases.onUpdate`.
- Family purchase fails or is cancelled: show a toast, or return silently on cancel.
- Health permission denied: the toggle reverts to off and shows a hint linking to system Settings. On Android, Health Connect isn't installed: open its Play Store page.
- Offline:
  - Render from the cached profile and entitlement.
  - Disable Manage, Restore and Family, with a muted "Offline" caption.
  - Queue toggle and settings changes and flush them when back online.
- The entitlement changes while the screen is open (renewal, expiry or refund): subscribe to `purchases.onUpdate` and re-render.
- Trial ended or billing grace: the status line says "Payment issue: update in store" in `var(--ember)`, and Manage opens the store.
- A long name truncates to 1 line with an ellipsis. Avatar initials fall back to a person icon.
- The win-back has already been shown (persisted): Manage skips 23.
- EN/HI: keys `profile.yourPlan`, `profile.planName` (`{tier}`, `{period}`), `profile.trialEnds` (`{date}`, `{price}`), `profile.manage`, `profile.familyTitle`, `profile.familySub` (`{n}`, `{price}`), `profile.downloads`, `profile.downloadsValue` (`{count}`, `{size}`), `profile.health` ("Apple Health" on iOS, "Health Connect" on Android: per-platform, not both), `profile.reminders`, `profile.units`, `profile.restore`, `profile.help`, and `tabs.*`. Format dates with `Intl` for `en-IN` and `hi-IN`.

## 11. Implementation steps

1. [ ] Add the tokens (`--line`, `--gold-soft`, `--gold-line`, `--gold-banner-grad`, `--on-gold`, `--on-ember`, `--avatar-ember-grad`). **AC:** no hex outside `tokens.css`.
2. [ ] Build Avatar, IconButton, ProBadge (PREMIUM variant) and Toggle. **AC:** the toggle knob moves instantly on tap without a React re-render; check this with a trace or a log.
3. [ ] Build SettingsGroup with SettingsRow on ListRow. **AC:** separators appear only between rows; chevron and value are optional.
4. [ ] Build UpgradeBanner with the gold variant. **AC:** it matches the family banner, wrapped subtitle included.
5. [ ] Build TabBar with Profile active. **AC:** the active tab is ember and the others are dim.
6. [ ] Add the types, `src/api/profile.ts` mocks, `formatBytes`, and the date formatter. **AC:** the mock renders exactly the PNG copy.
7. [ ] Assemble the Profile layout. **AC:** side by side with the PNG, spacing, radii and colours match.
8. [ ] Wire the entitlement through `purchases.getEntitlements()` and the free variant. **AC:** toggling the mock tier flips badge, plan card and banner routing.
9. [ ] Implement Manage routing with `cancel_flow_viewed` and the win-back once-check. **AC:** the first tap opens 23 and the second goes to the store.
10. [ ] Implement Restore (spinner, success, none, failed, offline). **AC:** each result shows the correct toast.
11. [ ] Wire the Health toggle commit and revert, plus the reminders and units sheets. **AC:** denying permission reverts the toggle; the reminder time persists across restart.
12. [ ] Add analytics and EN/HI strings. **AC:** the HI locale fits on a 360dp width.
13. [ ] Run `npx tsc -p .`. **AC:** zero errors.
