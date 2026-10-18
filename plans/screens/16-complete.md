# 16 · Workout complete

Spec: plan.md §3 (16), §4 Personalisation row. Mockup: `mockups/png/16-complete.png`, `mockups/screens/16-complete.html`.
State comes from the **shared workout-session store** defined in `plans/screens/14-player.md` §6 (`src/store/workoutSession.ts`).

## 1. Visual inventory (top → bottom)

- Status bar 9:41 on `--bg`.
- Success badge, centered, top margin 44:
  - A 96px circle with the ember gradient and a white check (48).
  - Two soft concentric halo rings: +14px at ember 12% and +28px at ember 6%.
- "Workout complete" (h1 30/800 display, white, centered).
- "Lower Hypertrophy · Week 1, Day 3" (15, muted, centered).
- A 2×2 StatCard grid with gap 12. Each card is surface, 1px line border, radius 16, padding 14, with a label of 12 muted and a value of 24/700 display:
  - "Time": "44:12"
  - "Volume": "3,240" plus a small "kg" (13, muted)
  - "Sets": "18 / 18"
  - "Streak": an ember flame icon (22) and "6 days"
- PR card: green-soft bg, 1px green-40% border, radius 22, padding 16. It holds a green trophy icon (24), "New personal record" (15/700) and "Romanian deadlift · 40 kg × 10" (13, muted).
- "How did today feel?" (h3 17/700).
- Feel chips, gap 8: "Too easy", **"Just right"** (selected, ember-soft, ember border, ember-2 text), "Too hard".
- Pinned footer row, gap 12:
  - A ghost Button that's 120px wide (wider in the PNG, about 240/780 of the width), with a share icon and "Share".
  - A primary Button "Done" that grows to fill the rest.
- Home indicator.

State shown: all sets done, one new PR, streak 6, "Just right" preselected.

## 2. Purpose, entry/exit

- Purpose: celebrate the finish, show stats and PRs, and collect a difficulty rating that feeds the next plan (Premium adapts; Free still records it).
- Route `complete`. Params: `{ sessionId: string }`.
- Entry:
  - 15 "Save & finish" on the last set → `replace("complete", { sessionId })`.
  - 15 "…" → "End workout" (partial sets, e.g. "14 / 18").
  - A cold-start resume where `phase === "complete"` but it isn't synced yet.
- Exit:
  - "Done" → `session.setFeel(feel)` and `completeSession` (if it hasn't already been sent) → `session.discard()` locally → `resetTo("home")`. Back isn't allowed (Android hardware back maps to Done).
  - "Share" → `FitCueDevice.share(text, url)` with a localized summary. It stays on the screen.
  - There's no paywall route on this screen (plan.md: "—").

## 3. Files

- `src/screens/Complete/Complete.tsx` and `Complete.css`, exporting `Complete`.
- Components:
  - `src/components/StatCard/` (shared, create if absent)
  - `src/components/Chip/` (shared, selectable variant from the 15 plan)
  - `src/components/Button/`: exists. Use `block` from 15. Add an `icon` prop and the ghost style, which is surface-2 with a line border.
  - `src/components/PrCard/` (new, screen-local candidate; 17 might reuse it)
  - `src/components/SuccessBadge/` (new, screen-local candidate)
- Data:
  - `src/api/sessions.ts`: `completeSession` (from 14), plus `postFeel(sessionId, feel)` if feel changes after completion.
  - `src/utils/session.ts`: `summarize` and `detectPRs` (from 14).
  - `src/utils/format.ts`: `formatClock` (from 14, `44:12` and `h:mm:ss` over 1h), `formatNumber(locale)` ("3,240") and `formatSet` (from 15).
  - `src/native/device.ts`: `share` (from 14).

## 4. Layout tree

Tokens (add any that are missing, per the 14 plan §4): `--bg`, `--surface`, `--surface-2`, `--line`, `--text`, `--muted`, `--ember`, `--ember-2`, `--ember-soft`, `--ember-grad`, `--ember-glow`, `--green`, `--green-soft`. Add `--green-line` (green at 40%) and `--ember-halo-1` / `--ember-halo-2` (ember at 12% and 6%) as tokens.

```
view.complete                       bg var(--bg); padding env(safe-area-inset-top) 20px 0; flex column; height 100%
├ scroll-view.complete-scroll       vertical; padding-bottom 120px (footer clearance)
│ ├ SuccessBadge                    mt44; center
│ │  └ view.halo2 152px radius 999 bg var(--ember-halo-2)
│ │     └ view.halo1 124px bg var(--ember-halo-1)
│ │        └ view.badge 96px bg var(--ember-grad); icon check 48 var(--text)
│ ├ text.h1 "Workout complete"      mt32 30/800 display var(--text) center
│ ├ text.body "Lower Hypertrophy · Week 1, Day 3"  mt8 15 var(--muted) center
│ ├ view.grid row gap12 mt24: StatCard "Time" "44:12" | StatCard "Volume" "3,240" unit "kg"
│ ├ view.grid row gap12 mt12: StatCard "Sets" "18 / 18" | StatCard "Streak" "6 days" icon flame var(--ember)
│ │    StatCard: flex 1; bg var(--surface); border 1px var(--line); radius var(--radius-button) (16); padding 14
│ │      label 12 var(--muted); value mt6 24/700 display var(--text); unit 13 var(--muted)
│ ├ PrCard mt12                     row gap12; bg var(--green-soft); border 1px var(--green-line); radius var(--radius-card); padding 16
│ │  icon trophy 24 var(--green); title 15/700 var(--text); sub 13 var(--muted)
│ ├ text.h3 "How did today feel?"   mt20 17/700
│ └ view.row gap8 mt12 wrap: Chip×3 selectable (on = var(--ember-soft)/var(--ember)/var(--ember-2))
└ view.complete-footer              absolute left/right 20; bottom env(safe-area-inset-bottom)+34px; row gap12
   ├ view.fade (real view; gradient transparent → var(--bg))
   ├ Button ghost icon=share "Share"  width 30vw (≈120–140px), h56, radius var(--radius-button), bg var(--surface-2), border 1px var(--line)
   └ Button primary "Done" flex 1      bg var(--ember-grad), shadow var(--ember-glow)
```

- With several PRs, stack one PrCard per PR, up to 3, then show "+N more" as text. With zero PRs, hide the PrCard.
- The halo uses nested views instead of a spread `box-shadow` (Lynx `box-shadow` spread support isn't guaranteed).

## 5. Components

| Element | Component | Notes |
|---|---|---|
| Success badge | SuccessBadge | (new, screen-local candidate). A one-time scale-in on mount uses a CSS keyframe animation, with no JS |
| Stats | StatCard `{ label, value, unit?, icon? }` ×4 | shared |
| PR | PrCard `{ title, subtitle }` | (new, screen-local candidate) |
| Feel | Chip selectable ×3 | shared |
| Share / Done | Button (`ghost` + `icon`, `primary` + `block`) | exists, extend |

## 6. State and data

- On mount (background), `const s = getState()` from the session store.
  - If `phase !== "complete"`, call `session.finish()`, which:
    1. Stops `activeMs`.
    2. Calls `completeSession(sessionId, { activeSec, logs, feel })`.
    3. Merges the response `{ streakDays, newPRs }`.
    4. Returns `SessionSummary`.
- Render immediately from a local `summarize(session, cachedPRs, cachedStreak)` so there's no spinner, then replace it with the server summary when it arrives (streak and PRs are authoritative on the server):
  - `activeSec` → "44:12"
  - `volumeKg = Σ weightKg × reps` (per-leg reps count once; this matches the mock's 3,240)
  - `setsDone` / `setsTotal`
- Local PR fallback: `detectPRs(logs, getPersonalRecords() cache)`. A PR means a higher weight at ≥ the same reps, or more reps at the same weight, per exercise. Pick the best one by estimated 1RM for the card.
- Local streak fallback: +1 if the last completed date was yesterday, keep it if it was today, otherwise 1. It's stored under the `progress.streak` key. That key is shared with 10-home and 17-progress, and those plans consume it.
- `feel` is local state, defaulting to `session.feel ?? "just_right"` (matching the PNG). Tapping a chip calls `session.setFeel` and is debounced. If completion has already been sent, it calls `postFeel`.
- Persistence: when `completeSession` succeeds, append the summary to `progress.history` (cached for 17), update `progress.prs`, then `session.discard()` on Done. If it fails, keep `session.active` with `phase="complete"`, queue it in `sync.queue`, and retry on reconnect or next launch.
- Formatting (`formatClock`, `formatNumber`, `formatSet`, the share text) happens in `useMemo` on the background thread.

## 7. Threading (AGENTS.md)

- This screen is static, with no gestures or scroll-linked effects. All logic (summary, PRs, streak, API, share) runs on the background thread in effects and `bindtap`.
- Main thread only:
  - Press feedback on the Chips and Buttons, reusing the Button pattern (`main-thread:bindtouchstart` and `end`/`cancel` → opacity/scale).
  - The SuccessBadge entrance, a CSS `@keyframes` scale 0.6→1 and opacity 0→1 over 400ms ease-out. It's declarative, with no JS on either thread.
- Large objects (logs) never go to the main thread. Captured values are none, beyond the static style strings in feedback handlers.
- `summarize` loops over at most about 30 logs, which is trivial. No chunking is needed.
- Native `share` is called only from a background `bindtap`.

## 8. Premium gating

- None (plan.md §3: "—"). Feel is collected for everyone.
- Premium: the server uses `feel` and the logs to adapt the next session (`nextPlanAdjusted`). There's no UI here, but an optional toast on Home could say "Next session adjusted".
- Free: feel is stored but the plan stays fixed. There's no upsell on this screen, which keeps the celebration clean (one primary action).

## 9. Analytics

- `workout_completed {workoutId, programId, week, day, activeSec, setsDone, setsTotal, volumeKg, newPRs: count, partial: setsDone < setsTotal}` fires once, when `finish()` resolves (or locally if offline). It's guarded by `session.completedAt`.
- Proposed, not in plan.md yet: `workout_feel_submitted {feel}` on Done and `workout_shared`.

## 10. Edge cases

- **Buffering**: N/A (no video). Make sure 14 released the native player on its route `replace`, and that `keepAwake(false)` runs on mount.
- **Network loss**:
  - Show the local summary.
  - The streak shows the local fallback, with no "offline" label (it reconciles later).
  - Done still works.
  - The completion queues, and `workout_completed` is sent locally with `offline:true`.
- **App backgrounding**: nothing is time-based. If the app is killed before Done, the next launch finds `session.active` with `phase="complete"`. It retries the sync and opens 16 once (or silently syncs if it's more than 1h old).
- **Resume session**: covered above. Never show 16 twice for the same `sessionId` after Done.
- **Partial workout** (ended early): Sets "14 / 18", the title stays "Workout complete", and the PRs are computed from the logged sets only. Zero logged sets → skip 16 and go Home.
- **Captions**: N/A.
- **i18n EN/HI**:
  - Strings go through `t("complete.*")`: "Workout complete", "{program} · Week {w}, Day {d}", "Time", "Volume", "Sets", "Streak", "{n} days" (plural rules: 1 day/days, HI दिन), "New personal record", "{exercise} · {kg} kg × {reps}", "How did today feel?", "Too easy/Just right/Too hard", "Share", "Done", and the share text template.
  - Numbers use `Intl.NumberFormat(locale)`. HI uses the Indian grouping "3,240" (the same here, and 1,00,000 for larger numbers).
  - The chips wrap. The Share button width is `min-width` and not fixed, so HI "शेयर करें" fits.
- **Other**: a streak of 0 or 1 shows "1 day". A very long session ≥ 1h shows "1:04:12".

## 11. Implementation steps

1. Make sure the 14-plan store, `summarize`, `detectPRs` and `completeSession` exist. Add `formatNumber` and `postFeel`. Acceptance: the mock session summarizes to 44:12, 3,240 kg and 18/18, with one PR for Romanian deadlift at 40 kg × 10.
2. Build `StatCard`, `PrCard` and `SuccessBadge` (with the CSS keyframe), and extend `Button` (`icon`, ghost style, `block`).
3. Build `Complete.tsx`/`.css` with the layout from §4. Acceptance: no hex in the CSS, and it matches `16-complete.png` on device.
4. Wire mount → `finish()` with the optimistic local summary, then the server merge. Wire feel → `setFeel`/`postFeel`, Share → native share, and Done → `discard` + `resetTo("home")` (hardware back = Done).
5. Add the offline queue, the kill-and-relaunch path, the partial-workout path and the zero-sets skip.
6. Add `workout_completed` (guarded once) and the proposed events.
7. Add the `t()` EN/HI strings and plurals.
8. Run `npx tsc -p .` with zero errors.
