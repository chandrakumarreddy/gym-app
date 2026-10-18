# 02 · Quiz · Goal

Mockup: `mockups/png/02-goal.png` (390×844 pt). Ref: `mockups/screens/02-goal.html`.
This plan also owns the **QuizShell** and the **quiz-answers store** shared by 02–05 and read by 06.

## 1. Visual inventory (top → bottom)

- Status bar (system).
- Quiz header row (top ≈60, height 40, gap 14):
  - Round back button: 40×40, `--surface-2` fill, 1px `--line` border, chevron-left 20.
  - Progress bar: flex 1, 6pt, radius 3, track `--surface-3`, fill ember gradient at **25%**.
  - Caption "1/4" (13pt `--muted`).
- H1 "What's your main goal?" (30pt display bold, one line).
- Body "We'll build your program around it. You can change it later." (15pt `--muted`, 2 lines, mt 8).
- Four option cards, single-select, gap 12, mt 24. Each card: 44×44 icon tile (radius 12) + title (17/600) + caption (13 `--muted`) + 22pt radio on the right.
  - **Build muscle** / "Hypertrophy-focused splits", dumbbell icon. **Selected**: ember 1.5px border, ember tint gradient fill, icon tile `--ember` with white glyph, radio filled ember with a white check.
  - **Lose fat** / "Strength + conditioning", flame icon. Unselected: `--surface` fill, `--line` border, icon tile `--surface-3` with a `--muted` glyph, empty radio ring `--line-strong`.
  - **Get stronger** / "Low reps, heavy compounds", bolt icon. Unselected.
  - **Move better** / "Mobility, yoga, recovery", stretch-figure icon. Unselected.
- Empty space.
- Pinned primary CTA "Continue" (56pt, ember gradient, glow), bottom 34. Enabled because an option is selected.

## 2. Purpose and entry/exit

- Purpose: step 1/4. Choose the primary goal, which drives the program split.
- Entry: Welcome "Get started" (01), or back from 03.
- Exit:
  - Continue → `quiz-experience` (03).
  - Back chevron / hardware back → `welcome` (01). The draft is kept.
- Params: none. Answers live in the quiz store, not in route params.

## 3. Files

- `src/screens/QuizGoal/QuizGoal.{tsx,css}`: `export function QuizGoal()`.
- `src/components/QuizShell/QuizShell.{tsx,css}` (new, screen-local candidate; shared by 02–05).
- `src/components/QuizOptionCard/QuizOptionCard.{tsx,css}` (canonical, new).
- `src/components/ProgressDots/ProgressDots.{tsx,css}` (canonical, new; `variant="bar"` here).
- `src/components/IconButton/IconButton.{tsx,css}` (new, screen-local candidate): round 40pt back button.
- `src/components/Icon/Icon.tsx` (new, screen-local candidate): `name` → `<image src=@/assets/icons/<name>.png>`, tinted by variant.
  - Icons needed: chev-l, check, dumbbell, flame, bolt, stretch.
- Store and data:
  - `src/types/quiz.ts`
  - `src/hooks/useQuizAnswers.ts`
  - `src/api/quiz.ts`

## 4. Layout tree

```
<QuizShell step={1} total={4} title=t("quiz.goal.title") subtitle=t("quiz.goal.sub")
           ctaLabel=t("quiz.continue") ctaDisabled={!goal} onBack onContinue>
  <view class="quiz-goal-list">               column, gap 12, mt 24
    {GOALS.map(g => <QuizOptionCard id icon title caption selected={goal===g.id} onSelect/>)}
  </view>
</QuizShell>
```

QuizShell:

```
<view class="quiz-shell">                     full screen, bg var(--bg), column
  <view class="quiz-shell-header">            row, align center, gap 14, pt safeTop+6, pb 22, px 20
    <IconButton icon="chev-l" round onTap=onBack/>   40×40, bg var(--surface-2), border 1 var(--line), radius 999
    <ProgressDots variant="bar" value={step} total={total}/>  flex 1, h 6, radius 3, track var(--surface-3), fill var(--ember-grad), width `${step/total*100}%`
    <text class="quiz-shell-count">{step}/{total}</text>     13px var(--muted)
  </view>
  <scroll-view class="quiz-shell-body" scroll-orientation="vertical">  flex 1, px 20, pb 120 (clears footer)
    <text class="quiz-shell-title">          30px, lh 34, 700, ls -0.6px, var(--text)
    {subtitle && <text class="quiz-shell-sub">}   15px, lh 22, var(--muted), mt 8
    {children}
  </scroll-view>
  <view class="quiz-shell-fade"/>             abs, bottom 0, h 130, background-image var(--footer-fade), pointer-events none
  <view class="quiz-shell-footer">            abs left/right 20, bottom safeBottom+34
    <Button variant="primary" fullWidth label disabled onTap/>
  </view>
</view>
```

QuizOptionCard (`.quiz-option`):

- Container: row, align center, gap 14, padding 16, radius `var(--radius-button)` (16), bg `var(--surface)`, border 1.5 `var(--line)`.
- Selected (`.quiz-option-on`): border `var(--ember)`, background-image `var(--ember-tint-grad)`.
- `.quiz-option-icon`: 44×44, radius 12, bg `var(--surface-3)`, glyph `--muted`. On: bg `var(--ember)`, glyph `--on-accent`. Omit when there is no `icon` (03 uses no icons).
- `.quiz-option-title`: 17/600 `var(--text)`. `.quiz-option-caption`: 13px `var(--muted)`, mt 2.
- `.quiz-option-radio`: 22×22, radius 999, border 2 `var(--line-strong)`. On: bg + border `var(--ember)`, check icon 14 `--on-accent`.
- Card height ≈77pt with no fixed height, so Hindi can wrap.

## 5. Components

- **QuizShell** (new, screen-local candidate): header + ProgressDots + scrollable body + pinned primary CTA. It is used by 02–05.
  - Props: `step`, `total`, `title`, `subtitle?`, `ctaLabel`, `ctaDisabled`, `onBack`, `onContinue`, `children`.
- **QuizOptionCard** (canonical, new): `{ id, title, caption, icon?, selected, onSelect(id) }`, single- or multi-select agnostic.
- **ProgressDots** (canonical, new): `variant: "dots" | "bar"`. The quiz uses `"bar"` (continuous fill), per the PNG.
- **Button** (exists, extended in 01): primary, fullWidth, disabled.
- **IconButton**, **Icon** (new, screen-local candidates).

## 6. State and data

Types in `src/types/quiz.ts`:

```ts
export type Goal = "build_muscle" | "lose_fat" | "get_stronger" | "move_better";
export type Level = "beginner" | "intermediate" | "advanced";
export type TrainLocation = "gym" | "home" | "both";
export type Equipment = "dumbbells" | "barbell" | "machines" | "bands" | "kettlebell" | "bodyweight";
export type Weekday = 0 | 1 | 2 | 3 | 4 | 5 | 6;          // 0 = Mon
export type SessionMinutes = 20 | 30 | 45 | 60;
export type WeightUnit = "kg" | "lb";
export type BodyLimit = "lower_back" | "knees" | "shoulders" | "wrists";
export type QuizAnswers = {
  goal?: Goal;
  level?: Level; location?: TrainLocation; equipment: Equipment[];
  daysPerWeek: number; days: Weekday[]; sessionMin: SessionMinutes;
  weightKg: number; weightUnit: WeightUnit; heightCm: number; age: number;
  limits: BodyLimit[]; noLimits: boolean;
};
export type QuizDraft = { answers: QuizAnswers; lastStep: 0 | 1 | 2 | 3 | 4; updatedAt: number };
```

Quiz-answers store, `src/hooks/useQuizAnswers.ts`:

- Module-level store + `useSyncExternalStore` (exported by `@lynx-js/react`). It runs on the background thread only.
- API:
  - `useQuizAnswers(): { answers, set(patch), completeStep(n), reset() }`.
  - Selector form `useQuizAnswer(k)` to limit re-renders.
- `DEFAULT_ANSWERS`:
  - `equipment: []`, `daysPerWeek: 4`, `days: [0,2,4,5]`, `sessionMin: 45`.
  - `weightKg: 72`, `weightUnit: "kg"`, `heightCm: 175`, `age: 29`.
  - `limits: []`, `noLimits: false`.
- Persistence: `completeStep(n)` writes `QuizDraft` to the `fitcue.quizDraft` key via `src/api/storage.ts`.
  - Write on Continue only, not on every tap.
  - On app start the draft hydrates the store. Welcome uses `lastStep` to resume.
- Feeds 06: `06-building` reads `answers` from the same hook and calls `buildPlan(answers)`.
  - On success it calls `reset()` and clears the draft key. The draft survives a failed build.

`src/api/quiz.ts`:

- `buildPlan(a: QuizAnswers) => request<PlanPreview>("/plans", { method: "POST", body: JSON.stringify(toPayload(a)) })`.
- `toPayload` lives in `src/utils/quiz.ts`.
- `PlanPreview` type owned by the 06/07 plans.

This screen:

- `goal` from the store, no local state.
- `GOALS` is a static array of `{ id, icon, titleKey, captionKey }` at module scope.
- Default: no goal selected on first visit. The PNG shows the post-tap state. Continue stays disabled until a goal is picked.

## 7. Threading (AGENTS.md)

- Main thread:
  - Press feedback on QuizOptionCard, IconButton and Button: `main-thread:bindtouchstart` → `setStyleProperty("opacity","0.7")`; `touchend`/`touchcancel` → `"1"`.
  - Optional card scale-down via `setStyleProperty("transform","scale(0.98)")`.
- Background thread:
  - `bindtap` → `set({goal})`. Selection is a low-frequency discrete event, so a background `setState` is fine.
  - Selected styling is a className switch.
  - Continue → `completeStep(1)` (persist), `track`, `router.push`.
- Captured values: none (static strings only).
- The progress fill width is computed on the background (`step/total`) and passed as an inline style. Fill animation: CSS `transition: width 300ms` on the fill. No JS per frame.

## 8. Premium gating

- None. The quiz is free on all tiers. No `--gold`.

## 9. Analytics

- `quiz_step_completed { step: 1, step_name: "goal", goal }`, fired on Continue (background).

## 10. Edge cases

- Loading: the store hydrates before Welcome renders, so it's always ready here. No spinner.
- Error / offline: no network. A storage write failure is silent (log only). The flow continues in memory.
- Back preserves the selection. Returning from 03 shows the previous choice selected.
- Double-tap on Continue: guard with a `navigating` ref (background) so the route is pushed once.
- i18n:
  - Titles and captions come from `quiz.goal.*` keys.
  - The Hindi H1 may wrap to 2 lines, and cards grow in height. The body scrolls, so nothing clips under the footer (pb 120).
  - The "1/4" count stays as digits in both locales.
- Accessibility: card `accessibility-label` = title + caption + selected state. Hit area is the whole card.

## 11. Implementation steps

1. [ ] Add `src/types/quiz.ts` (above).
2. [ ] Add `src/hooks/useQuizAnswers.ts` (store, defaults, hydrate, `completeStep` persist, `reset`).
   - AC: a value set in 02 is visible in 05 and after an app restart.
3. [ ] Add `src/api/quiz.ts` (`buildPlan`) and `src/utils/quiz.ts` (`toPayload`).
4. [ ] `Icon`, `IconButton` (with main-thread press feedback) and icon assets.
5. [ ] `ProgressDots` with `variant="bar"`.
   - AC: 25 / 50 / 75 / 100% at steps 1–4, animated width transition.
6. [ ] `QuizOptionCard`.
   - AC: selected and unselected states match the PNG; press dims on the main thread.
7. [ ] `QuizShell`.
   - AC: header matches the PNG; the body scrolls; the CTA is pinned at bottom 34 over the fade; disabled state at 0.4 opacity.
8. [ ] `QuizGoal.tsx` / `.css` with 4 options.
   - AC: single-select; Continue disabled until chosen; Continue persists, tracks and goes to 03; back goes to 01.
9. [ ] Add route `quiz-goal` to `App.tsx`.
10. [ ] Add EN/HI strings for `quiz.goal.*` and `quiz.continue`.
11. [ ] `npx tsc -p .` passes.

## Open questions

- The PNG shows a continuous bar while the canonical name is ProgressDots. Keep `variant="bar"`, or rename to ProgressBar?
- Should Goal be preselected (the PNG shows Build muscle on), or left empty with the CTA disabled? The plan assumes empty.
