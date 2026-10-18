# 07 · Plan preview

Source: `mockups/png/07-plan-preview.png` (HTML: `mockups/screens/07-plan-preview.html`).

## 1. Visual inventory (top → bottom)

- Status bar. There is no back button, because 06 was replaced.
- **Eyebrow**: "YOUR PLAN IS READY", 11px, weight 700, letter-spacing .12em, uppercase, `--ember`.
- **Title**: "Strength Builder", 30px display bold, `--text`.
- **Meta row**: 13px `--muted` with icons at 15px and a 12 gap: calendar "8 weeks", dumbbell "4× / week", clock "45 min".
- **Hero art**: 190px tall, full width, 16 radius, with an ember radial gradient, a grid overlay, a bottom dark fade and a squat pictogram (a placeholder for the video still). Bottom-left overlay: a 28px ember-gradient avatar "AM" and "with Coach Arjun Mehta" (14px, 600, `--text`).
- **Week 1 header** (top margin 20): "Week 1", 17px 600, left. A right pill reads "Free" (24h, `--surface-3` background, 12px 600, `--text`).
- **Session list** (3 rows, 10px vertical padding, 12 gap). Each row has a 24px hollow circle (2px `--line-strong`) and a title (15px 600) over a caption (13px `--muted`):
  1. "Lower Body Strength" / "Day 1 · 45 min"
  2. "Upper Push" / "Day 2 · 45 min"
  3. "Lower Hypertrophy · Upper Pull" / "Days 3–4 · 45 min each"
- **Locked card** (top margin 8): `--surface` background, gold-tinted border (gold at 35% alpha), 22 radius. Left: a 30px round lock badge with a gold lock icon. Middle: "Weeks 2–8" (15px 600) over "Progressive overload, 28 more sessions" (13px `--muted`). Right: a **PRO** badge (gold background, dark text, crown icon, 11px 800).
- **Footer** pinned 34 from the bottom, with a gradient fade into `--bg`: a primary "Save my plan" button (56h, ember gradient, glow shadow, 16px 700 white).

## 2. Purpose and entry/exit

- Purpose: show the finished 8-week plan before asking for anything. Week 1 is free, and Weeks 2–8 are visibly locked, which sets up the paywall.
- Entry: `replace` from 06 with `{ planId }`, or a cold-start resume when `onboarding.step === "planPreview"`.
- Exits:
  - "Save my plan" → `push("signup", { planId })`. If already authenticated (a returning user), go to `push("paywall", { source: "onboarding" })`.
  - Tap on the locked card → `lock_tapped`, then the same route as "Save my plan". Signup comes first so the purchase attaches to an account.
  - Session rows are not interactive before an account exists (no press feedback).
  - Android back → exit the app (the root of the onboarding stack). Don't return to 06.

## 3. Files

- `src/screens/PlanPreview/PlanPreview.tsx`, `src/screens/PlanPreview/PlanPreview.css`
- Components: `@/components/HeroVideoCard/HeroVideoCard.tsx`, `@/components/ListRow/ListRow.tsx`, `@/components/LockBadge/LockBadge.tsx`, `@/components/ProBadge/ProBadge.tsx`, `@/components/Chip/Chip.tsx`, `@/components/Button/Button.tsx`
- New, screen-local candidates: `src/components/LockedWeeksCard/` and `src/components/MetaRow/`
- `src/utils/planCopy.ts`: add `toPreviewRows(week)` and `formatPlanMeta(plan)`.

## 4. Layout tree

```
<view class="pp">                                   bg var(--bg); flex column; height 100%
  <scroll-view class="pp-scroll" scroll-y>          padding 8 20 140 (clears footer)
    <text class="pp-eyebrow">                       11px 700 uppercase ls .12em var(--ember)
    <text class="pp-title">                         30px display 700 var(--text); margin-top 8
    <MetaRow items={meta}/>                         row gap 12; icon 15 + 13px var(--muted); margin-top 8
    <HeroVideoCard height=190 radius=var(--radius-button) art="squat"
                   footer={<Avatar initials="AM" size=28/> "with Coach Arjun Mehta"}/>   margin-top 16
    <view class="pp-week-head">                     row space-between; margin-top 20
      <text class="pp-week-title">Week 1</text>     17px 600 var(--text)
      <Chip variant="soft" size="sm" label="Free"/> 24h; radius 999; bg var(--surface-3); 12px 600
    <view class="pp-sessions">                      margin-top 4
      <ListRow leading={<view class="pp-dot"/>}     dot 24 radius 999 border 2 var(--line-strong)
               title subtitle/> ×N                  title 15px 600 var(--text); subtitle 13px var(--muted); padding 10 0; gap 12
    <LockedWeeksCard title sub onTap/>              margin-top 8; bg var(--surface); border 1 var(--gold-line); radius var(--radius-card); padding 16; row gap 12
       <LockBadge size=30/>                         icon var(--gold); bg var(--scrim); border var(--line-strong)
       <view grow> title 15px 600 / sub 13px var(--muted)
       <ProBadge label="PRO"/>                      bg var(--gold); text var(--on-gold); 11px 800; radius 6
  <view class="pp-footer">                          absolute; left/right 20; bottom 34; ::before fade var(--bg)
    <Button variant="primary" label="Save my plan"/>
```

- Tokens to add if missing: `--gold-line` (gold at .35 alpha), `--on-gold` (`#1a1206`), `--scrim` (black at .55), `--ember-grad`.
- Button primary must use `--ember-grad` plus the glow. Update `Button.css` accordingly, since this is shared with 08 and 09.

## 5. Components

- **HeroVideoCard** (canonical): reused with `art` and `footer` slots and no play button. A placeholder image comes from `coach.heroImage` later.
- **ListRow** (canonical): `leading`, `title`, `subtitle`, and `onTap?` (omitted here, so no press feedback).
- **Chip** (canonical): `variant="soft"`, `size="sm"`, non-interactive.
- **LockBadge**, **ProBadge** (canonical).
- **Button** (exists).
- **LockedWeeksCard** (new, screen-local candidate): composes LockBadge and ProBadge. It could later be reused by 12-program, so promote it then.
- **MetaRow** (new, screen-local candidate): icon + label pairs, also seen on 08 and 12.
- **Avatar** (new, screen-local candidate): initials with a gradient circle. Likely to be promoted, since it shows up on 10, 11 and 20.
- **Icon** (new, screen-local candidate) if no shared icon component exists: an `<image>` of bundled SVG/PNG by name.

## 6. State and data (background)

- `const plan = useCurrentPlan()` (`@/state/plan.ts`, from 06). If that's empty, `useAsync(() => getPlan(planId))`.
- Precompute with `useMemo` on the background:
  - `meta = formatPlanMeta(plan, t)` gives `["8 weeks","4× / week","45 min"]`.
  - `rows = toPreviewRows(plan.weeks[0], t)`. Grouping rule: show the first 2 sessions individually, then merge the rest into one row, "A · B" / "Days 3–4 · 45 min each". With ≤ 3 sessions, list them all.
  - `locked = { title: "Weeks 2–{n}", sub: "Progressive overload, {count} more sessions" }`, where count is the sum of sessions in weeks where `free === false` (28 for 8×4 minus 4).
- Auth: `useAuth()` from `@/services/auth.ts` (defined in 08) decides between signup and paywall.
- Persist: `onboarding.step = "planPreview"` (already set by 06). Nothing new.

## 7. Threading (AGENTS.md)

- Main thread:
  - Press feedback on "Save my plan" through `Button`'s existing `main-thread:bindtouchstart/end/cancel` (opacity 0.7).
  - Press feedback on `LockedWeeksCard`: the same pattern. Copy `onPressIn`/`onPressOut` from Button, `"main thread"` first, with only `setStyleProperty("opacity", ...)`.
  - Scroll is a native `scroll-view` with no scroll-linked effects.
- Background: plan load, row grouping and formatting, i18n, auth check, navigation, analytics. `bindtap` handlers stay on the background.
- Captured values: none. The handlers capture nothing besides the event.

## 8. Premium gating

- Week 1 sessions are free and use the "Free" chip (`--surface-3`, not gold).
- Weeks 2–8 use **only** the gold accents allowed: the gold lock icon, the `--gold-line` border and the PRO badge.
- The CTA stays ember, because it means action, not Premium.
- If the user is already Premium (a returning user): hide `LockedWeeksCard`, drop the "Free" chip, and keep the CTA "Save my plan" → signup/home.

## 9. Analytics

- `plan_preview_viewed { planId, weeks, sessionsPerWeek }` fires once on mount, after the plan has loaded.
- `lock_tapped { content: "plan_weeks_2_8" }` fires when the locked card is tapped.

## 10. Edge cases

- Loading (no cached plan, fetching by id): skeleton blocks for the title, hero and 3 rows (`--surface-2`), with the CTA disabled.
- Error: inline "Couldn't load your plan" with a "Try again" ghost Button. If there's no plan at all, `replace("building")`.
- Offline: the cached plan from 06 renders fully. The CTA still proceeds to signup, which handles offline.
- Long coach names and titles: the title wraps to 2 lines at most, and the hero footer text gets one line with ellipsis.
- Fewer than 8 weeks or a different cadence: all copy is derived, with nothing hardcoded.
- i18n EN/HI: the eyebrow uppercase transform applies to Latin only (in Hindi, `text-transform` is a no-op). "×" and "·" are kept. Plurals go through `t()` with a count ("1 week" vs "8 weeks"). Session titles come from the API per locale.

## 11. Implementation steps

1. [ ] Add tokens `--gold-line`, `--on-gold`, `--scrim` (and `--ember-grad` if missing). AC: there is no hex in any component CSS.
2. [ ] Update `Button` primary to `--ember-grad` plus the glow. AC: Home still renders, and the press opacity still works.
3. [ ] Create or reuse `Chip`, `ListRow`, `LockBadge`, `ProBadge` and `HeroVideoCard` with the props above. AC: each lives in its own folder with `.tsx` and `.css`, and uses named exports.
4. [ ] Create the screen-local `MetaRow`, `Avatar`, `LockedWeeksCard` (and `Icon` if needed).
5. [ ] Add `formatPlanMeta` and `toPreviewRows` to `src/utils/planCopy.ts`. AC: mock 8×4×45 gives exactly the PNG copy, including "Days 3–4 · 45 min each" and "28 more sessions".
6. [ ] Build the `PlanPreview` screen with a scroll body and pinned footer. AC: it matches the PNG at 390pt, and the last row clears the footer fade.
7. [ ] Wire navigation: CTA → signup (or paywall if authed), locked card → `lock_tapped` + the same. Back exits.
8. [ ] Fire `plan_preview_viewed` once.
9. [ ] Add EN/HI strings under `planPreview.*`.
10. [ ] `npx tsc -p .` passes.
