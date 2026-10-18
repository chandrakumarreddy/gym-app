# 13 · Workout overview

Source: `mockups/png/13-workout.png`. Sizes from `mockups/screens/13-workout.html`. Shell, tokens and primitives come from `10-home.md`; ListRow and ScreenHeader from `11-library.md`; BottomCTA from `12-program.md`.

## 1. Visual inventory (top → bottom)

- System status bar.
- **Top bar** (row between, padding 4 0 14): back chevron IconButton (40 round, surface-2, line border). On the right, cast and download IconButtons (same style, gap 8). No PRO badge is visible in the PNG (Premium state).
- **Eyebrow** `WEEK 1 · DAY 3` (11/700, tracking .12em, uppercase, muted).
- **Title** `Lower Hypertrophy` (30/700 display), 8px below.
- **3 stat cards** (row, gap 16, equal flex), each surface with a line border, radius 16, padding 14:
  - `Time`: `45` with a smaller `min`.
  - `Exercises`: `6`.
  - `Sets`: `18`.
  - Labels are 12, muted. Values are 24/700 display.
- **Swap notice card**: surface with a line border, radius 22, padding 12. Ember shield icon and `Knee-friendly swaps applied from your profile` (13, text color).
- **Section header** `Exercises` (17/600) on the left, with `Dumbbells · Bench` (13, muted) on the right as an equipment summary, not a link.
- **Exercise list**: each row has a 56px dark-art thumbnail (dark brown gradient, ember figure, radius 14), a title (15/600) and a caption (13, muted):
  - `Warm-up flow` · `5 min · follow along`.
  - `Reverse lunge` · `3 × 10 each leg`. Trailing soft pill `Swapped`.
  - `Romanian deadlift` · `4 × 8–10`.
  - `Goblet box squat` · `3 × 12`.
  - Exercises 5–6 sit below the fold (the list scrolls under the footer fade).
- **Pinned footer CTA**: ember gradient primary, play icon and `Start workout`.
- No TabBar. Home indicator.

## 2. Purpose and entry/exit

- Purpose: everything needed before pressing start. Shows moves, sets, equipment, and the personalised swaps that were applied.
- Entry: Program row, play circle or CTA (12). The Home hero card body or a done week-strip day (10). Library quick workout (11). A deep link from a reminder notification.
- Exit:
  - Back → pop.
  - `Start workout` → `player {sessionId, source}` (14). `push`, so back from the player returns here.
  - Exercise row → exercise demo sheet: `BottomSheet` with the demo loop, cues and the "swapped from X" reason (screen-local, no new route).
  - Cast and download, free → 19-locked. Premium → cast picker / download.
- Params: `{sessionId: string, source?: 'home_hero'|'program_cta'|'program_row'|'library'|'notification'}`.

## 3. Files

- `src/screens/Workout/Workout.tsx` and `Workout.css`. `export function Workout()`.
- New:
  - `src/components/StatCard/` (canonical).
  - `src/components/InfoNote/` (new, screen-local candidate): icon plus text card.
  - `src/components/ExerciseDemoSheet/` (new, screen-local candidate): content inside `BottomSheet`.
- Reuse: `ScreenHeader` (nav variant), `IconButton`, `ProBadge` (mini), `SectionHeader` (with a text-only trailing slot), `ListRow`, `Art` (dark), `Pill`, `BottomCTA`, `Button`, `BottomSheet`, `Skeleton`.
- Data:
  - `src/api/sessions.ts` (`getSession`; replaces `getWorkout` in `api/workouts.ts`).
  - `src/api/mock/sessions.ts`.
  - `src/utils/format.ts`: add `formatPrescription(ex, t)` and `summarizeEquipment(list, t)`.

## 4. Layout tree

```
<view class="workout">                               bg var(--bg), height 100%
  <scroll-view class="workout-scroll" vertical main-thread:bindscroll={onScroll}>   padding 0 20, bottom pad 56+34+40
    <ScreenHeader variant="nav" onBack right={[cast, download]}/>
        IconButton 40 round, bg var(--surface-2), border 1px var(--line), icon var(--text)
        free: <ProBadge mini/> absolute top -4 right -4 on cast and download
    <text class="workout-eyebrow">                   11/700, letter-spacing 1.3px, uppercase, var(--muted)
    <text class="workout-title" ref=titleRef>        30/700 display, var(--text), mt8
    <view class="workout-stats mt16">                row, gap 16
      <StatCard label="Time" value="45" unit="min"/> flex 1, bg var(--surface), border 1px var(--line),
      <StatCard label="Exercises" value="6"/>          radius var(--radius-button) 16, padding 14
      <StatCard label="Sets" value="18"/>              label 12 var(--muted); value 24/700 display mt6; unit 13 var(--muted)
    <InfoNote icon="shield" iconTone="ember" class="mt16">   row gap 10, padding 12, bg var(--surface),
                                                      border 1px var(--line), radius var(--radius-card) 22; text 13 var(--text)
    <SectionHeader title="Exercises" trailingText="Dumbbells · Bench"/>   trailing 13 var(--muted)
    <view class="workout-exercises">                 col
      <ListRow thumb={<Art variant="dark" size=56 radius=14 figure/>} title caption
               trailing={swapped && <Pill tone="soft">Swapped</Pill>}/>
          art dark bg var(--art-dark), figure tint var(--ember)
  <view class="workout-compact-bar">                 absolute top, height 56, bg var(--bg), opacity 0, centered 15/600 title
  <BottomCTA><Button variant="primary" icon="play" label=t('workout.start')/></BottomCTA>
```

- Swapped pill: 24h, `var(--surface-3)`, 12/600. The PNG renders it slightly larger (~28h, 14px). Use the PNG size: height 28, font 14.

## 5. Components

- **StatCard** (new, canonical): props `{label, value, unit?, tone?}`. Reused by 16 and 17.
- **InfoNote** (new, screen-local candidate): props `{icon, iconTone, text}`.
- **ExerciseDemoSheet** (new, screen-local candidate): demo `<video>` loop (muted, looping), cues, prescription and swap reason. Hosted in `BottomSheet`.
- **ScreenHeader** `nav` (canonical, from 11): back plus right slot.
- **SectionHeader**: add a `trailingText` prop (non-link, muted) alongside `action`.
- **ListRow**, **Pill**, **Art** (`dark`), **IconButton**, **ProBadge**, **BottomCTA**, **Button**: reused.

## 6. State and data (background thread)

- `getSession(sessionId): Promise<Session>` with full `exercises: Exercise[]`. Each `Exercise` is `{id, name, kind, durationSec?, sets?, reps?: number | [min, max], perSide?, swappedFrom?: {exerciseId, name, reason:'knee'|'back'|'shoulder'}, equipment[], art, demoUrl, videoUrl}`.
  - The session carries `weekIndex`, `dayIndex`, `programId` and `appliedSwapReason?: 'knee'|'back'|'shoulder'`.
- Cache: `useQuery('session:'+id)` with a 30 min TTL. 12 prefetches it, so it is usually instant.
- Derived (`useMemo`, background):
  - `eyebrow = t('workout.eyebrow', {w, d})`.
  - `stats = {timeMin, exerciseCount, setCount}`, where `setCount` is the sum of `ex.sets ?? 0`. 18 in the mock.
  - `equipmentSummary`: dedupe, then sort by a fixed order, then join with ` · `.
  - `rows[]`: `{id, title, caption: formatPrescription(ex), swapped: !!ex.swappedFrom}`.
  - `swapNote` (null when there are no swaps).
- Local state: `demoExerciseId: string | null` and `castState`/`downloadState`.
- On `Start`: navigate with the `sessionId` only. The player re-reads it from the cache. No large objects in params.

## 7. Threading (AGENTS.md)

- Main thread:
  - Scroll-linked compact header: `main-thread:bindscroll`. When `scrollTop > threshold`, the handler sets `compactBar` opacity to 1, and to 0 otherwise.
    - `threshold` is precomputed on the background thread as `titleBottom = 54 + 58 + 22 + 8 + 34 ≈ 176`. The captured number is passed in.
    - The last state is kept in `useMainThreadRef<boolean>`, so a style is written only when the state flips.
    - The compact title string is precomputed and rendered statically. The handler toggles opacity only.
  - Press feedback on IconButtons, rows and the CTA.
- Background thread: fetch, prescription formatting, set summing, equipment dedupe and sort, gating, sheet open/close state, cast/download calls (native modules) and navigation.
- No cross-thread calls during scroll. The demo `<video>` is a native element, so there is no JS per frame.

## 8. Premium gating

- Cast and download for free users: `ProBadge mini` overlays each IconButton.
  - A tap fires `lock_tapped {content:'feature:cast'|'feature:download'}` and opens 19 with `{kind:'feature', feature}`.
- Premium: cast opens the device picker (native), and download toggles `idle → downloading (progress ring in the icon) → done (check)`.
- Session gating: if a free user reaches a locked session (deep link), redirect to 19 with `{kind:'session', id}`, and replace this route on dismiss with pop.
- `Swapped` and the swap note are free. Personalisation from the quiz is in the free tier.

## 9. Analytics

- `lock_tapped {content:'feature:cast'|'feature:download'|'session:<id>', source:'workout'}`.
- `workout_started {sessionId, source}`: fired by Player (14) on first play. This screen forwards `source` in route params.

## 10. Edge cases

- Loading: nav bar is live. Skeletons for the eyebrow (60w), the title (2 lines), 3 stat cards, the note (44h) and 4 rows.
- Error: a retry card. 404 → "Session not found" plus back.
- Empty:
  - No swaps → hide InfoNote.
  - No equipment → `t('workout.noEquipment')` ("No equipment").
  - A follow-along-only session → the Sets card shows `—`.
- Offline: if the session is downloaded, everything works and Start plays local files. If not, Start is disabled with `Available when online` under it, and cast is hidden.
- Downloads: progress shows in the icon. A failure → toast plus reset to idle. Low storage → toast with a link to Profile → Downloads (22).
- i18n EN/HI:
  - `formatPrescription`: `3 × 10 each leg`, `4 × 8–10` and `5 min · follow along` via `t()` plurals.
  - `×` and `–` stay as symbols. The eyebrow drops uppercase in HI.
  - The swap note reason maps from `t('workout.swap.knee')`, and so on.
  - Exercise names come from the API.

## 11. Implementation steps

1. [ ] `api/sessions.ts` (`getSession`) and `mock/sessions.ts` with the 6 PNG exercises (the 4 shown plus 2). Migrate `api/workouts.ts` callers. Accept: stats derive to 45/6/18.
2. [ ] `formatPrescription` and `summarizeEquipment` in `utils/format.ts`, as pure functions. Accept: outputs equal the PNG captions.
3. [ ] Components StatCard, InfoNote, ExerciseDemoSheet, SectionHeader `trailingText`, and ScreenHeader `nav`. Accept: named exports, `.tsx`/`.css` pairs, tokens only.
4. [ ] Workout layout per §4, and register it with TabBar hidden. Accept: side-by-side match at 390w.
5. [ ] Main-thread compact header (§7). Accept: no React render while scrolling, and the bar appears once the title scrolls out.
6. [ ] Gating for cast/download with ProBadge → 19, plus the Premium download state machine. Accept: the free/premium toggle switches the behaviour.
7. [ ] Start → player with `{sessionId, source}`. Row → demo sheet. Accept: back from the player returns here.
8. [ ] Loading, error, empty and offline states. Accept: each can be forced from the mock.
9. [ ] `npx tsc -p .` passes with 0 errors.

## Open questions

- The plan.md caption says cast and download "show a PRO badge for free users", but the PNG shows none (it is the Premium state). Planned: a mini ProBadge for free users only. Is that right?
- The PNG shows 4 of 6 exercises. Are the identities of the last 2 needed for the mock?
