# 04 · Quiz · Schedule

Mockup: `mockups/png/04-schedule.png`. Ref: `mockups/screens/04-schedule.html`.
Uses QuizShell and the quiz store from `plans/screens/02-goal.md`.

## 1. Visual inventory (top → bottom)

- Quiz header: back button, progress bar at **75%**, "3/4".
- H1 "How many days a week can you train?" (30pt, 2 lines). No subtitle.
- Horizontal number picker, centered, mt 32. Values 2 3 **4** 5 6:
  - Selected **4**: 96pt display bold, `--text`.
  - Neighbours 3 and 5: 40pt `--muted`.
  - Outer 2 and 6: 28pt `--dim`.
  - Gap 14, baseline-aligned.
- Caption, centered, mt 12, 13pt: "days a week · " (`--muted`) + "great for steady progress" (`--ember`).
- H3 "Which days?" (mt 32).
- Day row, 7 circles 42×42, space-between, mt 12. Labels M T W T F S S.
  - **On**: M, W, F, S (first S = Saturday). Filled `--ember`, white bold label.
  - Off: T, T, S. 1.5px `--line-strong` ring, `--muted` label.
- H3 "How long per session?" (mt 24).
- Chip row, gap 8, mt 12, single-select: 20 min, 30 min, **45 min** (on: ember-soft fill, ember border, `--ember-2` text, no check icon), 60 min.
- Pinned CTA "Continue". Enabled.

## 2. Purpose and entry/exit

- Purpose: step 3/4. Training frequency, which days, and session length. These set the weekly plan + reminder schedule.
- Entry: 03 Continue, or back from 05.
- Exit:
  - Continue → `quiz-body` (05).
  - Back → `quiz-experience` (03).
- Params: none.

## 3. Files

- `src/screens/QuizSchedule/QuizSchedule.{tsx,css}`: `export function QuizSchedule()`.
- New canonical:
  - `src/components/NumberPicker/NumberPicker.{tsx,css}`: `variant="digits"` here. 05 adds `variant="ruler"`.
  - `src/components/DayPicker/DayPicker.{tsx,css}`
- Reuses QuizShell, Chip (from 03), Button.
- `src/utils/quiz.ts`: add `DEFAULT_DAYS_BY_COUNT`, `frequencyHintKey(n)`, `toggleDay`.

## 4. Layout tree

```
<QuizShell step={3} total={4} title=t("quiz.sched.title") ctaLabel=t("quiz.continue") ctaDisabled={!canContinue}>
  <NumberPicker variant="digits" class="mt32" min={2} max={6} value={daysPerWeek} onChange/>
  <text class="quiz-sched-hint">                 13px, centered, mt 12
    <text class="quiz-sched-hint-unit">t("quiz.sched.unit") · </text>   var(--muted)
    <text class="quiz-sched-hint-tone">t(hintKey)</text>               var(--ember)
  </text>
  <text class="quiz-sched-h3">t("quiz.sched.which")</text>              17/600, mt 32
  <DayPicker class="mt12" value={days} labels={weekdayInitials} onToggle/>
  <text class="quiz-sched-h3">t("quiz.sched.length")</text>             mt 24
  <view class="quiz-sched-len">                   row, gap 8, mt 12
    {[20,30,45,60].map(m => <Chip label={t("quiz.sched.min",{m})} selected={sessionMin===m} onToggle/>)}
  </view>
</QuizShell>
```

NumberPicker `digits`:

- `<scroll-view scroll-orientation="horizontal">`, height 110, with `enable-scroll` and a snap per item.
- Item width 64pt. Leading/trailing spacers = (viewport − 64)/2, so the value can center.
- Each `.np-digit` is a fixed 64-wide box with its text bottom-aligned.
- Visual scale is applied with `transform: scale()` from a 96px base glyph (not font-size), so there is no relayout:
  - scale 1.0 at center, 0.42 at ±1, 0.29 at ±2.
  - `--text` at center, `--muted` at ±1, `--dim` at ±2+.
- Tap on a digit scrolls it to center.
- Hint value set: "great for steady progress" for 4. Other copy is in the open questions.

DayPicker:

- Row, `justify-content: space-between`.
- `.day`: 42×42, radius 999, border 1.5 `var(--line-strong)`. Label 14/600 `var(--muted)`.
- `.day-on`: bg + border `var(--ember)`, label `var(--on-accent)`.

## 5. Components

- **NumberPicker** (canonical, new): `{ variant: "digits" | "ruler", min, max, step?, value, onChange }`. Here: digits 2–6.
- **DayPicker** (canonical, new): `{ value: Weekday[], labels: string[7], onToggle(day) }`.
  - Reused later in Profile → Workout reminders (22).
- **Chip** (reuse), single-select usage with no check icon (`showCheck={false}`), per the PNG.
- **QuizShell**, **Button** (reuse).

## 6. State and data

- Store fields: `daysPerWeek` (default 4), `days: Weekday[]` (default `[0,2,4,5]` = M W F S, as in the PNG), `sessionMin` (default 45).
- Rules (background, `src/utils/quiz.ts`):
  - Picker change → `daysPerWeek = n`, `days = DEFAULT_DAYS_BY_COUNT[n]`:
    - 2: M, Th
    - 3: M, W, F
    - 4: M, W, F, S
    - 5: M, T, W, F, S
    - 6: M–S
  - Day tap → `toggleDay(days, d)`. Then `daysPerWeek = clamp(days.length, 2, 6)`, and the picker scrolls to match. Toggling is blocked beyond 6 days or below 2 days (a light shake via CSS class on the day row).
  - `canContinue = days.length === daysPerWeek && days.length >= 2`. It is always true under these rules; kept as a guard.
  - `hintKey = frequencyHintKey(daysPerWeek)`, precomputed in render.
- Weekday initials come from the locale table (`["M","T","W","T","F","S","S"]` EN; Hindi `["सो","मं","बु","गु","शु","श","र"]`). Index 0 = Monday.
- Persistence: `completeStep(3)` on Continue. `days` + `sessionMin` later drive reminders (22) and the plan (06).

## 7. Threading (AGENTS.md)

- Main thread, for the NumberPicker only (scroll-linked):
  - `main-thread:bindscroll` on the scroll-view reads `e.detail.scrollLeft` and computes `c = scrollLeft / ITEM_W` (one division).
  - For each of the 5 item refs (`useMainThreadRef` array, fixed small count), it calls `setStyleProperty("transform", "scale(x)")` + `setStyleProperty("color", …)`.
    - x is linear interpolation from the precomputed scale table `[1, .42, .29]`.
    - Colour comes from the precomputed var strings `["var(--text)","var(--muted)","var(--dim)"]`.
    - Five items is constant-bounded and trivial. For larger ranges, only the ±2 window around `round(c)` is touched.
  - `lastIndexRef = useMainThreadRef(-1)` tracks the centered index and is never mirrored in React state.
- Hand-off at scroll end:
  - `bindscrollend` (background handler, fires once) → `onChange(min + round(scrollLeft/ITEM_W))`.
  - It does not cross threads during the scroll.
- Precomputed captured values (JSON-serializable): `ITEM_W` (64), `count` (5), `SCALES` ([1,.42,.29]), `COLORS` (3 strings).
- Press feedback (main thread): DayPicker circles, Chips, CTA, back button (opacity 0.7).
- Background thread:
  - Day toggles, picker → days defaults, hint selection, persistence, analytics, navigation.
  - Programmatic `scrollTo` when days change the count, via the `scroll-view` `scrollTo` invoke on the background.

## 8. Premium gating

- None. No `--gold`.

## 9. Analytics

- `quiz_step_completed { step: 3, step_name: "schedule", days_per_week, days, session_min }` on Continue.

## 10. Edge cases

- Loading / error / offline: local only, so none.
- Fast fling past the ends: the spacers + snap clamp to 2..6, and `bindscrollend` rounds and clamps.
- Day toggles that would hit 1 or 7 days are rejected, with a CSS shake class for 300 ms.
- Restoring from the store:
  - The initial `scroll-left` = `(value−min)*ITEM_W`.
  - The initial item styles are rendered statically from the background (no main-thread pass needed before first scroll), so there is no flicker.
- i18n:
  - "days a week" and the hint are separate keys; the unit precedes the hint in both languages.
  - "{m} min" → "{m} मिनट".
  - Hindi day initials fit 42pt circles at 14px. Verify; fall back to 12px.
- Accessibility: the picker exposes ±1 actions via tap on neighbours. Each day has an `accessibility-label` with the full weekday name.

## 11. Implementation steps

1. [ ] Add `DEFAULT_DAYS_BY_COUNT`, `toggleDay`, `frequencyHintKey` to `src/utils/quiz.ts`.
2. [ ] Build `DayPicker`.
   - AC: 7 circles; on/off visuals match the PNG; press feedback on the main thread.
3. [ ] Build `NumberPicker` `digits`: scroll-view + snap; main-thread scroll-linked scale and colour; `bindscrollend` → `onChange` once.
   - AC: smooth at 60fps on Android; no `setState` during scroll (verify with a log in the background handler).
4. [ ] Build `QuizSchedule.tsx` / `.css`.
   - AC: defaults 4 / M W F S / 45 min as in the PNG; picker change resets days; day toggle updates the picker.
5. [ ] Wire Continue (`completeStep(3)`, `track`, push `quiz-body`) and Back.
6. [ ] Add the route to `App.tsx`. Add EN/HI strings `quiz.sched.*` and weekday initials.
7. [ ] `npx tsc -p .` passes.

## Open questions

- Hint copy for 2, 3, 5 and 6 days (only "great for steady progress" for 4 is in the mockup).
- Should days/week and selected days stay coupled (as planned), or be independent with a validation error?
- Is a picker range of 2–6 final? Should 1 or 7 be allowed?
