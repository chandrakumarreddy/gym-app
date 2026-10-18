# 06 · Building your plan

Source: `mockups/png/06-building.png` (HTML: `mockups/screens/06-building.html`).

## 1. Visual inventory (top → bottom)

- Status bar only. There is no back button, header, progress bar or footer button.
- **Progress ring**: 220×220, centered, top margin 32. 14px stroke, round caps. The track is `--surface-3`. The arc is the ember gradient (`--ember-2` → `--ember-deep`-ish `#e2410f`) and starts at 12 o'clock going clockwise. Shown at 76%.
  - Center: **"76%"**, display font, 56px, bold, `--text`. Below it, **"building"**, 13px, `--muted`.
- **Title**: "Building your plan…", 22px display bold, centered, top margin 32.
- **Subtitle**: "Matching coach videos to your answers.", 15px, `--muted`, centered, top margin 8.
- **Step card**: `--surface` background, 1px `--line` border, 22 radius, 16 padding, 16 gap, top margin 32. It holds 4 rows, each with a 26px dot and 15px text:
  1. Done: filled `--ember` dot with a white check. "Goal: build muscle, intermediate" (`--text`).
  2. Done: same dot. "4 sessions a week · 45 min".
  3. Active: a spinner dot (2.5px `--surface-3` ring with an `--ember` top arc, rotating). "Swapping in knee-friendly moves" (`--text`).
  4. Pending: a hollow dot (2px `--line-strong` border). "Choosing your coach" (`--muted`).
- The rest of the screen is empty `--bg`, then the home indicator.

## 2. Purpose and entry/exit

- Purpose: build the plan from the quiz answers, and show that the answers mattered.
- Entry: 05-body → "Build my plan". Params: none. It reads the quiz-answers store.
- Exit: `replace("planPreview", { planId })` when generation and the minimum display time are both done. It is never pushed onto the stack, so pressing back on 07 can't return here.
- Back (Android hardware back or swipe) is ignored while building. On error, the error state offers Retry or Edit answers, and Edit answers goes to `replace("quizBody")`.

## 3. Files

- `src/screens/Building/Building.tsx`, `src/screens/Building/Building.css`
- `src/components/RestRing/RestRing.tsx` + `.css`: the canonical ring, created here if 15-rest-log hasn't created it yet.
- `src/components/BuildStepList/BuildStepList.tsx` + `.css` (new, screen-local candidate)
- `src/types/plan.ts` (new), plus `src/types/quiz.ts` (owned by the 01–05 plans; consume it only)
- `src/api/plans.ts` (new): `generatePlan`, `getPlan`
- `src/utils/planCopy.ts` (new): pure step-label builders
- `src/state/plan.ts` (new): the current-plan store
- Imports: `import { RestRing } from "@/components/RestRing/RestRing.tsx";`, `import { generatePlan } from "@/api/plans.ts";`

## 4. Layout tree

```
<view class="building">                      bg var(--bg); padding 0 20px; flex column; align center
  <RestRing size=220 stroke=14 progress={pct}  track var(--surface-3); arc var(--ember-grad)
            label="76%" caption="building"/>  label 56px display bold var(--text); caption 13px var(--muted)
  <text class="building-title">               22px bold var(--text) center; margin-top 32
  <text class="building-sub">                 15px var(--muted) center; margin-top 8; line-height 1.5
  <BuildStepList steps={steps}/>              margin-top 32; width 100%
    <view class="step-card">                  bg var(--surface); 1px var(--line); radius var(--radius-card); padding 16; gap 16
      <view class="step-row">                 flex row; align center; gap 12
        <view class="step-dot step-dot--done|--active|--pending">   26×26 radius 999
          done:    bg var(--ember); check icon 14 color var(--text)
          active:  border 2.5 var(--surface-3); border-top-color var(--ember); CSS keyframes rotate 0.9s linear infinite
          pending: border 2 var(--line-strong); transparent
        <text class="step-label [step-label--pending]">  15px; var(--text) | pending var(--muted)
```

- Ring rendering: use two half-disc masks (`overflow:hidden` + `transform: rotate()`), or Lynx `<svg content>` if `lynx-check-css-support` confirms stroke-dasharray and gradient support. Pick whichever passes on Android. The gradient comes from `var(--ember-grad)` and no hex goes in the component CSS.
- Tokens to add to `src/theme/tokens.css` if missing: `--line`, `--line-strong`, `--ember-2`, `--ember-grad`. Values come from `mockups/styles.css`.

## 5. Components

- **RestRing** (canonical, reused by 15): props `{ size, stroke, progress (0..1), label, caption?, durationMs? }`. Here it is a progress ring with no countdown.
- **BuildStepList** (new, screen-local candidate): props `{ steps: BuildStep[] }`, rendered only on this screen.
- Not used: Button, ScreenHeader, ProgressDots.

## 6. State and data (background thread)

- Input: `useQuizAnswers()` from the 01–05 quiz-answers store (`@/state/quizAnswers.ts`). Type `QuizAnswers` = `{ goal, level, equipment[], location, daysPerWeek, days[], sessionMin, weightKg, heightCm, age, limits[] }`.
- `src/types/plan.ts`:
  - `PlanSession { id; title; day: number; durationMin; workoutId }`
  - `PlanWeek { index: number; free: boolean; sessions: PlanSession[] }`
  - `Coach { id; name; initials }`
  - `Plan { id; title; totalWeeks; sessionsPerWeek; sessionMin; coach: Coach; weeks: PlanWeek[]; createdAt }`
  - `BuildStep { id: "goal"|"schedule"|"limits"|"coach"; label: string; status: "done"|"active"|"pending" }`
- `src/api/plans.ts`:
  - `generatePlan(answers: QuizAnswers) => request<Plan>("/plans", { method: "POST", body })`
  - `getPlan(id) => request<Plan>(\`/plans/${id}\`)`
  - On a network error (no account exists yet), fall back to `generatePlanLocally(answers)` (a mock in `src/api/plans.mock.ts`) so the funnel never blocks.
- `src/utils/planCopy.ts`: `buildSteps(answers, t)` returns 4 labels.
  - goal: "Goal: {goal}, {level}"
  - schedule: "{n} sessions a week · {min} min"
  - limits: "Swapping in {limit}-friendly moves" when limits exist, else "Matching moves to your equipment"
  - coach: "Choosing your coach"
- Sequencer (in `Building.tsx`, using `useEffect` and `setTimeout`):
  - `MIN_MS = 3200`. There are 4 stages at 0, 800, 1600 and 2400 ms, plus a final "all done" at ≥3200 ms *and* when the API has resolved.
  - `pct` is the target percent per stage (25/50/76/100). The ring animates between targets with a CSS transition (`durationMs` 700), so the background only does ~5 setStates.
  - Percent label: a single setState per stage, and the number jumps with the stage. Optionally, a 120 ms background ticker that runs only while the stage is active (≤ 30 updates total). Never per frame.
  - If the API is slower than 3200 ms, hold at stage 4 active ("Choosing your coach" spinning) and 90%.
- Persist: `setCurrentPlan(plan)` in `src/state/plan.ts`, which writes to `@/services/storage.ts` (key `plan.current`). Also set `onboarding.step = "planPreview"` so a cold start resumes at 07.
- Cleanup: clear all timers on unmount and ignore late API results (`cancelled` flag, same pattern as `useAsync`).

## 7. Threading (AGENTS.md)

- Main thread: none. There are no gestures and no main-thread handlers. The spinner rotation and the ring arc transition are pure CSS animation and transition, run by the engine.
- Background: reading answers, building step copy, the API call and fallback, timers, stage sequencing, persistence, navigation and analytics.
- Captured values: none. The ring gets `progress` as a number prop, and the CSS transition does the interpolation.
- Cross-thread traffic: ≤ 6 renders for stages, plus an optional ≤ 30 percent ticks. No scroll or touch events.

## 8. Premium gating

- None. Don't use `--gold`, since everything shown is about the free plan build.

## 9. Analytics

- No plan.md event belongs to this screen. `quiz_step_completed` fires on 05 before navigating here.
- Proposed (needs approval, not in plan.md): `plan_generated { source: "api"|"local", ms }`.

## 10. Edge cases

- Loading: this whole screen is the loading state. Enforce `MIN_MS` even on a fast API so the steps are legible.
- Error: the API fails *and* the local fallback throws, for example when answers are incomplete. Swap the card for an error row: "We couldn't build your plan" with a primary "Try again" Button and a ghost "Edit answers" Button. Stop the spinner.
- Missing answers (cold start without a store): `replace("quizGoal")`.
- Offline: use the local generator, mark `plan.synced = false`, and let 08 upload it after auth.
- Timeout: 10 s on the API, then fall back to local.
- App backgrounded mid-build: timers keep going, and on resume, if done, navigate immediately.
- i18n EN/HI: every label goes through `t()`. Hindi strings are longer, so `step-label` wraps (`flex:1`, no ellipsis). Goal and level values use translated enum labels, not raw keys. Digits stay Western. "%" placement comes from `t("building.percent", { n })`.

## 11. Implementation steps

1. [ ] Add any missing tokens (`--line`, `--line-strong`, `--ember-2`, `--ember-grad`) to `tokens.css`. AC: no hex in the new CSS.
2. [ ] Create `src/types/plan.ts`. AC: the types compile and are exported by name.
3. [ ] Create `src/api/plans.ts` and `plans.mock.ts`. AC: `generatePlanLocally` returns an 8-week plan with Week 1 `free: true`, and `sessionsPerWeek` and `sessionMin` match the answers.
4. [ ] Create `src/utils/planCopy.ts` `buildSteps`. AC: the labels match the mockup for the mock answers (build muscle, intermediate, 4×45, knees).
5. [ ] Create `src/state/plan.ts` (`getCurrentPlan`, `setCurrentPlan`, `useCurrentPlan`) backed by the storage service.
6. [ ] Create or reuse the `RestRing` component. AC: at 0.76 it renders like the PNG, and progress changes animate.
7. [ ] Create `BuildStepList`. AC: done, active and pending dots match the PNG, and the active dot spins via CSS.
8. [ ] Create the `Building` screen with the sequencer, minimum time, fallback and error state. AC: it lands on 07 via `replace` after about 3.2 s, back is ignored, and no timers leak on unmount.
9. [ ] Register the `building` route in the navigator, and have 05 navigate to it.
10. [ ] Add EN/HI strings under `building.*`.
11. [ ] `npx tsc -p .` passes.
