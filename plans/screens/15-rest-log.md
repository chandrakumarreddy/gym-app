# 15 · Rest & log set

Spec: plan.md §3 (15), §4 Logging row. Mockup: `mockups/png/15-rest-log.png`, `mockups/screens/15-rest-log.html`.
State comes from the **shared workout-session store** defined in `plans/screens/14-player.md` §6 (`src/store/workoutSession.ts`).

## 1. Visual inventory (top → bottom)

- Status bar 9:41 on `--bg` (no video visible).
- Top bar:
  - Left: a round 40px button with a chevron-down icon (bg surface-2, 1px line border).
  - Center: caption "Reverse lunge · Set 2 of 3" (13, muted).
  - Right: a round 40px button with a "…" more icon.
- RestRing, centered, 200px:
  - A 12px stroke on a surface-3 track with an ember arc and round caps. It starts at 12 o'clock and goes clockwise, with about 58% remaining (dashoffset 230/553), so the arc runs from 12 o'clock around to about 7 o'clock.
  - Inside: "Rest" (13, muted) and "0:35" (display 52/800, white).
- Two chips, centered, gap 12: "+15 s" and "Skip rest" (36px tall, pill, surface-2 with a line border, 14/500).
- Card "Log set 2" (surface, radius 22, 1px line border, padding 16):
  - Header row: "Log set 2" (h3 17/700) on the left. On the right, a green check icon and "Last time: 10 kg × 8" (13, green).
  - Two columns, gap 12:
    - "Weight (kg)" (13, muted) over Stepper [− | 12.5 | +]
    - "Reps" over Stepper [− | 10 | +]
    - Stepper: surface-2, radius 14, 1px line, padding 6. The buttons are 40×40, radius 10, surface-3. The value is 22/800 display.
  - "How hard was that?" (13, muted).
  - Effort chips, gap 8: "Easy", **"Just right"** (selected, which means bg ember-soft, border ember and text ember-2), "Hard", "Max".
  - A gold crown icon (14) and "Coach tip for set 3: stay at 12.5 kg, aim for 12 reps" (13, gold, wraps to 2 lines). This is the Premium next-weight suggestion.
- Pinned footer: a full-width primary Button "Save & continue" (56px, radius 16, ember gradient, glow), over a bg fade.
- Home indicator.

State shown: resting with 35s left of 60s, a Premium user (the tip is visible), "Just right" preselected and the values prefilled from the suggestion.

## 2. Purpose, entry/exit

- Purpose: log weight, reps and effort during rest, so the video never has to stop.
- Rendering: an overlay layer inside the `player` route (`PlayerRoute` from the 14 plan), mounted while `session.phase === "resting"`. It has no route of its own and no params, and reads `exerciseIndex` and `setIndex` from the store. A standalone `rest-log` route `{ sessionId }` is kept only for deep-link or resume after a cold start, and it renders the same `RestLog` component.
- Entry: 14 set end or manual "next" → `session.completeSet()`.
- Exit:
  - "Save & continue":
    1. `session.logSet(values)`
    2. `session.advance()`
    3. If there are more sets, return to 14 (the overlay unmounts). If that was the last set → `replace("complete", { sessionId })`.
  - Rest reaching 0 doesn't auto-advance. The ring shows 0:00, there's a haptic, and the CTA stays the action.
  - Chevron-down collapses to 14 (the video is visible). The rest keeps counting, and 14 shows a small "Rest 0:35 · Log set" pill (ember) to reopen. This pill is (new, screen-local candidate) `RestPill` in the Player folder.
  - "…" opens a BottomSheet with "Skip exercise", "Swap exercise" (→ 13 swap list, out of scope here) and "End workout" (confirm → `session.finish()` → 16 with partial sets).
  - The coach tip when free → `navigate("paywall", { source: "rest_next_weight" })`.

## 3. Files

- `src/screens/RestLog/RestLog.tsx` and `RestLog.css`, exporting `RestLog`.
- Components:
  - `src/components/RestRing/` (new, shared)
  - `src/components/Stepper/` (new, shared)
  - `src/components/Chip/` (shared, create if absent)
  - `src/components/BottomSheet/` (shared)
  - `src/components/ScreenHeader/` (shared; the `solid` variant)
  - `src/components/IconButton/` (from the 14 plan)
  - `src/components/Button/`: exists. Extend it with a `block` (full-width) prop and a gradient background via `var(--ember-grad)`, without breaking Home.
  - `src/components/CoachTip/` (new, screen-local candidate). It's the gold crown and tip line, plus the free locked variant.
- Data:
  - `src/api/sessions.ts`: `logSet`, `getLastLog`, `getNextWeight` (from the 14 plan).
  - `src/utils/session.ts`: add `prefillFor(exercise, lastLog, suggestion)` and `stepperBounds(exercise)`.
  - `src/utils/format.ts`: add `formatClock` (from 14), `formatKg(12.5) → "12.5"` and `formatSet(10, 8) → "10 kg × 8"`. The last one is shared with the 17 plan.

## 4. Layout tree

Use these tokens (add any that are missing, as in the 14 plan §4): `--bg`, `--surface`, `--surface-2`, `--surface-3`, `--line`, `--text`, `--muted`, `--ember`, `--ember-2`, `--ember-soft`, `--ember-grad`, `--ember-glow`, `--gold`, `--green`.

```
view.restlog                        position absolute; inset 0; bg var(--bg); padding env(safe-area-inset-top) 20px 0; flex column
├ ScreenHeader variant=solid        row space-between; padding 4px 0 14px
│ ├ IconButton solid chev-down       40, radius 999, bg var(--surface-2), border 1px var(--line)
│ ├ text "Reverse lunge · Set 2 of 3" 13 var(--muted), ellipsis
│ └ IconButton solid more
├ RestRing size=200 stroke=12        margin 8px auto 0
│ └ inner (absolute, center): text "Rest" 13 var(--muted) / text "0:35" 52px/800 display var(--text)
├ view.restlog-chips                 row center gap 12 mt16
│ ├ Chip "+15 s"                     h36 pad 0 14 radius 999 bg var(--surface-2) border 1px var(--line) 14/500 var(--text)
│ └ Chip "Skip rest"
├ view.restlog-card                  mt24 bg var(--surface) border 1px var(--line) radius var(--radius-card) padding 16
│ ├ row-between: text "Log set 2" 17/700 | row gap4: icon check 14 + text "Last time: 10 kg × 8" 13 var(--green)
│ ├ row gap12 mt16
│ │ ├ view.grow: text "Weight (kg)" 13 var(--muted) / Stepper mt8
│ │ └ view.grow: text "Reps" / Stepper mt8
│ │    Stepper: row space-between; bg var(--surface-2); border 1px var(--line); radius 14; padding 6
│ │      button 40×40 radius var(--radius-chip) bg var(--surface-3) icon minus/plus 18 var(--text)
│ │      value text 22/800 display var(--text) tabular
│ ├ text "How hard was that?" 13 var(--muted) mt16
│ ├ row gap8 mt8 (wrap): Chip×4 selectable; on = bg var(--ember-soft) border var(--ember) text var(--ember-2)
│ └ CoachTip mt16: row gap8; icon crown 14 var(--gold); text 13 var(--gold), wraps
└ view.restlog-footer                absolute left/right 20 bottom env(safe-area-inset-bottom)+34px
   ├ view.restlog-fade               absolute -40px top, gradient transparent → var(--bg) (real view, no ::before)
   └ Button block "Save & continue"  h56 radius var(--radius-button) bg var(--ember-grad) shadow var(--ember-glow) 17/700
```

- The card scrolls inside a `<scroll-view scroll-orientation="vertical">` if the height is less than about 700px, with bottom padding of 110px so the footer doesn't cover it.
- **RestRing geometry** (no SVG stroke animation; the arc is animated with transforms):
  - The track is a 200px view with a 12px border in `var(--surface-3)` and radius 999.
  - The arc is built from two half-clip containers (`overflow: hidden`, 100×200, left and right). Each holds a 200px circle with a 12px border `var(--ember)`, where only that half's border is coloured.
  - Rotating the halves with `transform: rotate()` reveals or hides the arc.
  - Round end caps are 12px `var(--ember)` dots. One is fixed at 12 o'clock. The other sits in a 200px rotator that turns with the remaining angle.
  - The remaining fraction `f` maps to the angle `θ = 360·f`. The right half covers `min(θ,180)` and the left half covers `max(θ-180,0)`.

## 5. Components

| Element | Component | Notes |
|---|---|---|
| Top bar | ScreenHeader (`solid`) + IconButton | shared |
| Ring + label | RestRing `{ durationMs, remainingMs, label, valueText }` | new shared; animation on the main thread (§7) |
| +15 s / Skip rest | Chip (`variant="action"`) | shared |
| Weight / Reps | Stepper `{ value, step, min, max, format: "kg" \| "int", onChange, label }` | new shared; main-thread press feedback |
| Effort | Chip (`selectable`, `selected`) ×4 | shared |
| Next-weight tip | CoachTip `{ text, locked }` | (new, screen-local candidate) |
| CTA | Button (`variant="primary" block`) | exists, extend |
| More menu | BottomSheet + ListRow ×3 | shared |
| Set counter (optional) | SetDots | not in this PNG; don't add it |

## 6. State and data

- From the store (14 §6), using `useWorkoutSession` selectors:
  - `currentExercise`, `setIndex`, `sets`
  - `rest: { endsAt, durationSec }`
  - `lastLogFor(exerciseId)` (local logs from this session first, then the API)
  - `isLastSet`
- Local background state:
  - `weightKg`, `reps`, `effort`: prefilled by `prefillFor`, in this order:
    1. An existing log for this set (editing)
    2. The Premium suggestion
    3. The last time's values
    4. The exercise defaults (reps = `exercise.reps`, weight = 0 for bodyweight)
    Effort defaults to `"just_right"`.
  - `remainingSec` (1 Hz label)
  - `lastTime` (`SetLog | null`)
  - `suggestion` (`{weightKg, reps} | null`)
  - `sheetOpen`
- Fetch these on mount, both in parallel on the background thread with `useAsync`, and cache them per exercise for the session:
  - `getLastLog(exerciseId)`
  - `getNextWeight(exerciseId, setIndex+1)` (Premium only; skipped on the last set)
- Stepper bounds come from `stepperBounds(exercise)` and are precomputed once:
  - Weight: step `exercise.weightStepKg` (default 2.5; 1 for dumbbells < 10 kg), min 0, max 300.
  - Reps: step 1, min 0, max 50.
  - Bodyweight: hide the weight stepper and show "Bodyweight" text in its place (an edge case not in the PNG).
- Persistence:
  - `session.logSet()` stores the log locally right away (the store persists it), then `logSet` API → on success, `synced=true`. On failure it goes to `sync.queue`.
  - PR detection happens at finish (16) using `detectPRs`. No PR UI here.
- "Last time" uses the most recent completed log of the same exercise from any earlier session (the API). It's hidden when null.

## 7. Threading (AGENTS.md)

- **Timer logic is on the background thread**:
  - `rest.endsAt` in the store is the source of truth.
  - One `setTimeout(onRestEnd, endsAt - now)` runs, plus a 1 Hz `setInterval` that sets `remainingSec = ceil((endsAt-now)/1000)` and formats "0:35" with `formatClock` on the background thread.
  - `onRestEnd`: `FitCueDevice.haptic("success")` and an optional chime. Coach voice says "Next set" if Premium voice is on.
- **Ring animation is on the main thread**, with hand-off only at start, change and end:
  - RestRing holds `rightRef`, `leftRef` and `capRef` (`useMainThreadRef<MainThread.Element>`) and `animsRef = useMainThreadRef<Animation[]>([])`.
  - Start: in a background `useEffect` when rest starts, call `runOnMainThread(startRing)({ remainingMs, totalMs })` **once**.
    - `startRing` (`"main thread"`) cancels the existing animations, then calls `el.animate([{transform:"rotate(Xdeg)"},{transform:"rotate(0deg)"}], { duration, easing:"linear", fill:"forwards" })` on each half and the cap.
    - The keyframe angles and per-half durations are **precomputed on the background thread** by `ringPlan(remainingMs,totalMs)` in `src/components/RestRing/ringPlan.ts`, which returns `{ right:{from,to,delay,duration}, left:{…}, cap:{…} }` as plain numbers. The main-thread function only passes them to `animate()`, with no maths.
  - +15 s: `session.extendRest(15)` (background) → recompute `ringPlan` → `runOnMainThread(startRing)(plan)` once.
  - Skip rest: `session.skipRest()` → `runOnMainThread(stopRing)()` once (cancel; set the end state).
  - Backgrounding: on foreground, recompute from `endsAt` and call `startRing` once. Main-thread animations can be throttled while the app is in the background, so don't trust them.
  - There's no per-frame `setState`. The only React updates are the 1 Hz label and taps.
- **Stepper press feedback on the main thread**:
  - `main-thread:bindtouchstart`: `e.currentTarget.setStyleProperties({ transform:"scale(0.92)", "background-color":"var(--surface-2)" })`.
  - Touchend and touchcancel restore `scale(1)` and `var(--surface-3)`.
  - The value change is a normal `bindtap` on the background thread, so `setState` is fine.
  - Long-press repeat: background `bindlongpress` starts a 120ms `setInterval` stepping the value, and `bindtouchend` (background) clears it. All the stepping logic stays on the background thread.
  - The min and max are precomputed. The disabled state renders the button at `opacity 0.4` through the className (render, not MTS).
- Chips, IconButtons and the CTA use the same opacity/scale MTS feedback as Button.
- **Captured values**: only strings and numbers (`ringPlan` numbers, `"scale(0.92)"`). Never capture the session or the logs.

## 8. Premium gating

- Next-weight suggestion (CoachTip):
  - Premium: gold crown and the computed tip, with copy from `t("rest.tip", { set, kg, reps })`.
  - Free: the same row, showing `LockBadge` and "Get next-weight suggestions" in gold. Tap → `lock_tapped {content:"next_weight"}` → `navigate("paywall", { source: "rest_next_weight" })`. The rest timer keeps running behind the paywall.
- Free users can still log weight, reps and effort (plan.md §4 "Free: Reps and weight per set").
- Coach voice "Next set" at the end of rest is Premium. The free version is a silent haptic, with no gate UI on this screen.

## 9. Analytics

- From plan.md: `lock_tapped {content:"next_weight"}` → 09 fires `paywall_viewed {source:"rest_next_weight"}`.
- Proposed, not in plan.md yet, so flag them to the analytics owner:
  - `set_logged {exerciseId, setIndex, weightKg, reps, effort, usedSuggestion}`
  - `rest_extended`
  - `rest_skipped {remainingSec}`

## 10. Edge cases

- **Buffering**: the video behind the overlay may buffer, but this doesn't affect rest. When the overlay closes, 14 shows its buffering state.
- **Network loss**: `getLastLog` and `getNextWeight` fail silently. "Last time" is hidden and the tip shows "Suggestion unavailable offline" (gold, Premium only). `logSet` queues, and the CTA never blocks on the network.
- **Backgrounding**: before backgrounding, schedule a local notification "Rest over — set {n}" at `endsAt` via `FitCueDevice`. Cancel it on foreground or on save. On return, recompute the remaining time. If it's ≤ 0, show 0:00 and hold.
- **Resume session**: if the persisted `phase === "resting"`, the PlayerRoute mounts RestLog directly. The unsaved stepper values are lost on purpose, and the values are re-prefilled.
- **Captions**: N/A on this screen. Keep the CC state untouched.
- **i18n EN/HI**:
  - Strings go through `t("rest.*")`: "Rest", "+15 s", "Skip rest", "Log set {n}", "Last time: {kg} kg × {reps}", "Weight (kg)", "Reps", "How hard was that?", "Easy / Just right / Hard / Max", the tip and "Save & continue".
  - Effort chips wrap to a second row in HI (`flex-wrap: wrap`).
  - Units stay "kg" in both languages, and the decimal point is always ".".
- **Other**:
  - Saving twice is guarded by a `saving` flag.
  - Editing a set that's already logged (the user came back) upserts it.
  - Weight 0 with an equipment-based exercise → allowed, with no validation error.
  - On the last set, the CTA copy is "Save & finish".

## 11. Implementation steps

1. Make sure the store, types and API from the 14 plan steps 2–4 exist, then add `prefillFor`, `stepperBounds`, `formatKg` and `formatSet`. Acceptance: the prefill order is unit-checked against the mock.
2. Build `RestRing` with `ringPlan.ts` (background) and the main-thread `startRing`/`stopRing` using `element.animate` (Lynx ≥ 3.4). Acceptance: a 60s ring animates smoothly, and React commits happen only at start, +15 and skip, plus the 1 Hz label.
3. Build `Stepper` with MTS press feedback and background long-press repeat. Acceptance: it clamps at min and max, and a 12.5 step works.
4. Build or extend `Chip` (action and selectable), `Button` (`block` plus the gradient) and `CoachTip`.
5. Build `RestLog.tsx`/`.css` with the layout from §4, and mount it as an overlay in `PlayerRoute` when `phase === "resting"`.
6. Wire the actions: +15 s, Skip rest, Save & continue (logSet → advance → 14 or 16), chevron-down → `RestPill` on 14, and the "…" BottomSheet.
7. Add the premium gate for CoachTip → paywall `rest_next_weight`.
8. Add the edge cases: the offline queue, the background notification, resume into rest, and `t()` EN/HI.
9. Add the analytics calls.
10. Do a visual pass against `15-rest-log.png`. Acceptance: no hex in `RestLog.css` or the new component CSS.
11. Run `npx tsc -p .` with zero errors.
