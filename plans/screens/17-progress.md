# 17 · Progress

Mockup: `mockups/png/17-progress.png` · Stage 3 Retain · tab `progress`.

## 1. Visual inventory (top → bottom)
- Status bar (system).
- Header row: title "Progress" (30px display bold) left; round icon button with calendar glyph right (40×40, surface-2, hairline border).
- SegmentedControl: "Week" (selected: light pill, dark text) · "Month" · "Year" (muted).
- Row of 3 StatCards, equal width:
  - "Workouts" → `3` + small "/ 4".
  - "Volume" → `9.6` + small "t".
  - "Streak" → ember flame icon + `6`.
- Card "Training volume" (17px semibold) + right "+12% vs last week" (green, 13px).
  - BarChart, 7 bars M T W T F S S. Active days (M 55%, W 70%, F 88%) ember gradient; inactive days (T 8%, T 8%, S 30%, S 8%) surface-3 stubs. Day labels 11px dim.
- Section head "Personal records" left, "All" ember link right.
- Card with 2 rows split by divider:
  - "Romanian deadlift" → "40 kg × 10" in **green** (new PR this week).
  - "Dumbbell bench press" → "22.5 kg × 8" in text color.
- Locked card (150px tall, clipped): blurred content = "Muscle balance" title + 7-col heatmap of ember-opacity squares. Overlay centered: gold PRO badge (crown + "PRO"), "See which muscles you're neglecting" (15px semibold), gold "Unlock" small button.
- TabBar: Home · Library · **Progress (active, ember)** · Challenges · Profile.

## 2. Purpose and entry/exit
- Shows earned results (streak, volume, PRs) to drive retention; blurred Premium insight is a paywall touchpoint.
- Entry: TabBar "Progress"; deep link from 16-complete ("see progress"), push reminders.
- Exit:
  - Calendar button → workout history (out of scope; stub route `history`, TODO).
  - "All" → PR list (stub route `records`, TODO).
  - Unlock / tap anywhere on locked card → `paywall` with `{ source: "progress", contentId: "muscle_balance" }`.
  - Month/Year segment for free user → trends locked → `paywall` `{ source: "progress", contentId: "trends" }`.
  - TabBar → other tabs.
- Params: none (`range` held locally, default `"week"`).

## 3. Files
- `src/screens/Progress/Progress.tsx`, `src/screens/Progress/Progress.css` — `export function Progress()`.
- `src/components/SegmentedControl/` (shared, create if not already made by 03/22 plans).
- `src/components/StatCard/`, `src/components/BarChart/`, `src/components/ProBadge/`, `src/components/TabBar/`, `src/components/ListRow/` (shared).
- `src/components/BlurLockCard/BlurLockCard.tsx|.css` (new, screen-local candidate; also usable on 15 next-weight hint).
- `src/components/Heatmap/Heatmap.tsx|.css` (new, screen-local candidate; can live inside `Progress/` until reused).
- `src/types/progress.ts`, `src/api/progress.ts`, `useEntitlements` from `@/services/purchases.ts` (09 plan).
- Imports e.g. `import { BarChart } from "@/components/BarChart/BarChart.tsx";`.

## 4. Layout tree
```
<view .progress>                          bg var(--bg); flex col; full height
  <scroll-view .progress-scroll scroll-y> padding 0 20px 24px
    <view .progress-head>                 row space-between; padding 4px 0 14px
      <text .progress-title>Progress      30px bold var(--text)
      <view .icon-btn-round>              40×40 r999 var(--surface-2) border 1px var(--line); calendar icon var(--text)
    <SegmentedControl options=[week,month,year] value onChange />
    <view .progress-stats>                row gap 12px; mt 16px
      <StatCard label value unit icon? /> ×3
    <view .card .progress-volume>         mt 12px; var(--surface); border var(--line); r var(--radius-card); pad 16px
      <view .row-between>
        <text .h3>Training volume         17px 600 var(--text)
        <text .progress-delta>            13px var(--green) (var(--muted) if ≤0, never red)
      <BarChart bars={precomputed} />      mt 16px; height 120px
    <view .section-head>                   mt 24px mb 12px; row space-between baseline
      <text .h3>Personal records
      <text .link>All                      13px 600 var(--ember)
    <view .card .card-tight>               pad 12px
      <ListRow title trailing tone="green"|"default" /> + <view .divider/> (1px var(--line))
    <BlurLockCard height=150 title="Muscle balance" cta="Unlock" onUnlock>
      <Heatmap cells={14 levels} />
  <TabBar active="progress" />
```
- Type scale: 30 / 17 / 15 / 13 / 11 only. Stat value 24px display bold; unit 13px muted.
- Radii: stat cards var(--radius-button) (16); cards var(--radius-card) (22); seg outer 12px, inner 9px (use var(--radius-chip) 10 for both — 1px deviation acceptable).
- Tokens to add to `src/theme/tokens.css` (missing today, shared step owned by design-system/tokens plan; add if absent): `--line`, `--line-strong`, `--ember-soft`, `--ember-grad`, `--gold-soft`, `--gold-grad`, `--green-soft`, `--ink` (dark text on light/gold), `--scrim`.

## 5. Components
- **SegmentedControl** (shared): props `{ options: {id,label}[]; value; onChange(id); lockedIds?: string[] }`. Locked options show small LockBadge; tap fires `onLocked(id)` instead of `onChange`.
- **StatCard** (shared): `{ label; value; unit?; icon?: "flame" }`. Flame icon colored var(--ember).
- **BarChart** (shared): `{ bars: { label; heightPct; active }[]; height?: number }`. Pure render — no math inside; heights arrive precomputed. Active bar bg var(--ember-grad), radius 8 8 4 4; inactive var(--surface-3).
- **ListRow** (shared): `{ title; trailing; trailingTone?: "default"|"green"; onTap? }`.
- **ProBadge** (shared): crown + "PRO", bg var(--gold), text var(--ink), 11px 800, r 6px, h 22.
- **Button** (exists): extend with `variant: "gold"` and `size: "sm"` (h 40, r 12, 14px) — coordinate with 09/10 plans; keep main-thread press feedback.
- **BlurLockCard** (new, screen-local candidate): `{ height; title; cta; onUnlock; children }`. Renders children in `.blur-content` (blur 6px, opacity .6) + absolute overlay with ProBadge, title, gold sm Button. Whole card tappable.
- **Heatmap** (new, screen-local candidate): 7-col grid; cell level 0–3 → class `l0..l3` (var(--surface-3), ember 30/60%, var(--ember)). For free users render static placeholder levels (never fetch real data).
- **TabBar** (shared): `active="progress"`.

## 6. State and data (background thread)
- Types `src/types/progress.ts`:
  - `type ProgressRange = "week" | "month" | "year"`.
  - `type DayVolume = { day: string; kg: number }`.
  - `type PersonalRecord = { id; exercise; weightKg; reps; achievedAt: string; isNew: boolean }`.
  - `type ProgressSummary = { range; workoutsDone; workoutsPlanned; volumeKg; volumeDeltaPct; streakDays; days: DayVolume[]; records: PersonalRecord[] }`.
  - `type MuscleBalance = { muscle: string; level: 0|1|2|3 }[]` (Premium only).
- API `src/api/progress.ts`: `getProgress(range)` → `request<ProgressSummary>("/progress?range=")`; `getMuscleBalance()` (Premium only). Mock fallback `mockProgress(range)` returning mockup values while backend absent.
- Hook: `useAsync(() => getProgress(range), [range])`.
- Derived (useMemo, background): `bars = toBars(days)` in `src/utils/progress.ts` — `max = Math.max(...kg, 1)`; `heightPct = kg ? max(8, round(kg/max*100)) : 8`; `active = kg > 0`; label = localized day initial. Also `volumeLabel` via `formatTonnes(kg)` ("9.6"), `deltaLabel` ("+12% vs last week"), `formatSet(weightKg, reps)` ("22.5 kg × 8") in `src/utils/format.ts`.
- Top 2 records only (sorted by `achievedAt` desc in util).
- Persist: last `range` (local storage, nice-to-have); last successful `ProgressSummary` cached for offline.

## 7. Threading
- All fetch/sort/format/BarChart height math on background thread; BarChart receives `{label,heightPct,active}[7]` (tiny, serializable).
- No main-thread scroll effects needed; `scroll-view` native.
- Press feedback main-thread (Button pattern: `main-thread:bindtouchstart/end/cancel` → `setStyleProperty("opacity")`) on icon button, segment items, "All", BlurLockCard, TabBar items.
- `bindtap` handlers (navigate, analytics) stay background.

## 8. Premium gating
- `useEntitlements()` (shared hook wrapping `src/services/purchases.ts` from 09-paywall plan) → `{ isPremium, loading }`.
- Free: BlurLockCard rendered with placeholder Heatmap; Month/Year in SegmentedControl are `lockedIds` → tap opens paywall `source: "progress", contentId: "trends"`.
- Premium: BlurLockCard replaced by real Muscle balance card (`getMuscleBalance`), Month/Year selectable.
- Unlock → `navigate("paywall", { source: "progress", contentId: "muscle_balance" })`. On return, re-read entitlement (purchases listener) and re-render.
- Never fetch Premium data for free users (keeps data off device).

## 9. Analytics
- `lock_tapped { content: "muscle_balance" | "trends_month" | "trends_year" }` on lock taps, before navigating.
- `paywall_viewed { source }` fired by Paywall screen itself (not here).
- `purchase { product }` fired by purchases service.

## 10. Edge cases
- Empty (new user, 0 workouts): stats show `0 / N`, `0`, streak `0` without flame color (var(--dim)); BarChart all 8% stubs; delta hidden; PR card replaced by cap "Finish a workout to set your first record" + ghost Button "Start today's workout" → home/workout.
- Loading: skeleton cards (surface-2 blocks same sizes); no spinner flash under 300ms.
- Error: inline card "Couldn't load progress" + ghost "Retry" (re-run useAsync).
- Offline: show cached summary + tiny "Offline · last updated HH:MM"; Unlock still navigates (paywall handles offline).
- Purchase failed (on paywall) → user returns still free; card unchanged, no error here.
- Delta ≤ 0: muted text "−4% vs last week"; no red.
- i18n EN/HI: all strings via `t("progress.*")`; day initials from locale (HI: सो मं बु गु शु श र); numbers via `Intl.NumberFormat(locale)`; "kg × reps" format key; allow 2-line wrap for overlay CTA text in HI; stat labels single-line with ellipsis.

## 11. Implementation steps
1. Ensure tokens listed in §4 exist in `tokens.css` → no hex in new CSS (`grep -n '#' src/screens/Progress/*.css` empty).
2. Types `src/types/progress.ts`; API + mock `src/api/progress.ts` → mock returns mockup values.
3. Utils `toBars`, `formatTonnes`, `formatSet`, `formatDelta` → `toBars` on mock gives 55/8/70/8/88/30/8-shaped output with min 8.
4. Shared components (create only if missing): SegmentedControl, StatCard, BarChart, ListRow, ProBadge, TabBar; Button `gold`/`sm` → each has folder + `.tsx` + `.css`, named export, main-thread press feedback.
5. BlurLockCard + Heatmap → blurred content + crisp overlay visible.
6. `Progress.tsx` composing §4 → pixel-matches PNG at 390pt width with mock data.
7. Entitlement gating + paywall navigation with `source` → free shows blur, premium shows real card; Month/Year locked for free.
8. Analytics `lock_tapped` → fires once per tap with correct `content`.
9. Empty/loading/error/offline states → each reachable via mock flags.
10. EN/HI strings → switching locale re-renders without layout overflow.
11. `npx tsc -p .` passes.
