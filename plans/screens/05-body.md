# 05 · Quiz · Body & limits

Mockup: `mockups/png/05-body.png`. Ref: `mockups/screens/05-body.html`.
Uses QuizShell and the quiz store from `plans/screens/02-goal.md`. This is the last quiz step and hands off to 06.

## 1. Visual inventory (top → bottom)

- Quiz header: back button, progress bar at **100%**, "4/4".
- H1 "A few details to set your intensity" (30pt, 2 lines).
- Row, space-between, mt 24:
  - H3 "Weight" (left).
  - Compact segmented control, 120pt wide (right): **kg** selected (light pill), lb unselected.
- Big value, centered, mt 16: "72" (64pt display bold `--text`) + " kg" (17/600 `--muted`, baseline).
- Weight ruler, mt 8, 34pt tall:
  - Vertical ticks every 12pt (2pt wide, `--line-strong`).
  - Fades to transparent at both edges.
  - Center indicator: 3pt ember bar extending 6pt above and below.
- Two cards, row gap 12, mt 24, equal width:
  - **Height**: cap "Height" (13 `--muted`) + "175" (22pt bold) + " cm" (13 `--muted`).
  - **Age**: cap "Age" + "29" (22pt bold).
  - Cards use `--surface`, 1px `--line`, radius 22, padding 12.
- H3 "Anything we should work around?" (mt 24).
- Chip group, wrap, gap 8, mt 12, multi-select:
  - Lower back, **✓ Knees** (selected), Shoulders, Wrists, Nothing.
- Pinned CTA **"Build my plan"** (different label from 02–04). Enabled.

## 2. Purpose and entry/exit

- Purpose: step 4/4. Body weight, height, age and injury limits. These set starting loads and the exercise swaps (e.g. "knee-friendly swaps applied" on 06/13).
- Entry: 04 Continue.
- Exit:
  - "Build my plan" → `building` (06). It uses `replace`-style semantics for the quiz: 06's back is disabled, and 06 → 07 continues forward.
  - Back → `quiz-schedule` (04).
- Params: none. 06 reads the store (see 02 §6).

## 3. Files

- `src/screens/QuizBody/QuizBody.{tsx,css}`: `export function QuizBody()`.
- Extends canonical `src/components/NumberPicker/NumberPicker.{tsx,css}` with `variant="ruler"`.
- Reuses:
  - `SegmentedControl` (compact)
  - `Chip`
  - `StatCard` (canonical, new if not yet built by 16/17): `src/components/StatCard/StatCard.{tsx,css}`
  - `BottomSheet` (canonical, new if not yet built by 19): for editing height/age
  - `QuizShell`, `Button`
- `src/utils/units.ts` (new): `kgToLb`, `lbToKg`, `rulerRange(unit)`.
- `src/utils/quiz.ts`: add `toggleLimit`.

## 4. Layout tree

```
<QuizShell step={4} total={4} title=t("quiz.body.title") ctaLabel=t("quiz.body.cta") ctaDisabled={!canContinue}>
  <view class="quiz-body-weight-row">            row, space-between, align center, mt 24
    <text class="quiz-body-h3">t("quiz.body.weight")</text>   17/600 var(--text)
    <SegmentedControl compact class="quiz-body-unit" options=[kg,lb] value={unit} onChange/>  width 120
  </view>
  <view class="quiz-body-value">                 row, centered, baseline, mt 16
    <text class="quiz-body-num" ref=valueTextRef>{display}</text>  64px, 700, ls -1.3px, var(--text)
    <text class="quiz-body-unit-label"> {unitLabel}</text>        17/600 var(--muted)
  </view>
  <NumberPicker variant="ruler" class="mt8" min max step value onChange/>  h 34
  <view class="quiz-body-cards">                 row, gap 12, mt 24
    <StatCard label=t("quiz.body.height") value="175" unit="cm" onTap=openHeight/>  flex 1
    <StatCard label=t("quiz.body.age") value="29" onTap=openAge/>                    flex 1
  </view>
  <text class="quiz-body-h3 mt24">t("quiz.body.limits")</text>
  <view class="quiz-body-chips">                 row wrap, gap 8, mt 12
    {LIMITS.map(l => <Chip showCheck label selected onToggle/>)}  + "Nothing" chip
  </view>
</QuizShell>
<BottomSheet open={sheet!==null} title onClose>
  <NumberPicker variant="digits" min max value onChange/>      height 100–250 cm / age 13–90
  <Button label=t("common.done") onTap=commitSheet/>
</BottomSheet>
```

NumberPicker `ruler`:

- `<scroll-view horizontal>` containing a single wide `.np-ticks` row.
- Ticks are rendered as N small `<view>`s, 2×34, 12pt pitch, colour `var(--line-strong)`.
  - Built once per range, because Lynx has no `repeating-linear-gradient`.
  - Ranges: kg 30–200 by 1 = 171 ticks; lb 66–440 by 1 = 375. Build the range in background chunks of 100 if needed (AGENTS "break up long work").
- Center indicator `.np-ruler-mark`: an absolutely positioned overlay view (not scrolled), 3×46, radius 2, `var(--ember)`.
- Edge fades: two overlay views, 30% width each, background-image `var(--ruler-fade-l/r)` (`--bg` → transparent). Mask-image is not relied on.

StatCard (quiz usage):

- bg `var(--surface)`, border 1 `var(--line)`, radius `var(--radius-card)` (22), padding 12.
- Label 13 `var(--muted)`. Value 22px 700 `var(--text)`, mt 4. Unit 13 `var(--muted)`.

Chips: same as 03 (`showCheck`).

## 5. Components

- **NumberPicker** (canonical): adds `variant="ruler"`. The `digits` variant is reused inside the BottomSheet for height and age.
- **SegmentedControl** (reuse, `compact`: 120 wide).
- **StatCard** (canonical): needs `onTap?` + press feedback for this tappable use.
- **BottomSheet** (canonical): title, content, drag-to-dismiss.
  - Height and age edit flow. The PNG shows only the cards, so the sheet is an implementation choice; see open questions.
- **Chip**, **QuizShell**, **Button** (reuse).

## 6. State and data

- Store fields: `weightKg` (default 72), `weightUnit` (default "kg"), `heightCm` (175), `age` (29), `limits: BodyLimit[]`, `noLimits: boolean`.
- The canonical weight is stored in kg (1 decimal).
- Display, derived on the background:
  - `display = unit === "kg" ? round(weightKg) : round(kgToLb(weightKg))`
  - `unitLabel = t("unit.kg"|"unit.lb")`
  - `rulerRange(unit)` → `{min,max,step}`
- Unit switch: re-centre the ruler with `scrollTo((display−min)*TICK_PX)` and swap the tick set. `weightKg` itself is unchanged, so there is no rounding drift.
- Limits (`src/utils/quiz.ts` `toggleLimit`):
  - "Nothing" sets `noLimits=true` and clears `limits`.
  - Any limit clears `noLimits`.
- `canContinue = limits.length > 0 || noLimits`. One explicit answer is required; the PNG state satisfies it.
- Height and age validation: height 100–250 cm, age 13–90. Under-13 is blocked by the picker range.
- Persistence: `completeStep(4)` on "Build my plan" writes the full draft.
  - It does **not** call the API. 06 calls `buildPlan(answers)` from `src/api/quiz.ts` so that it can show progress, retry and handle errors.
- Feeding 06: 06 reads `useQuizAnswers().answers`. The fields 06 echoes back ("Goal: build muscle, intermediate", "4 sessions a week · 45 min", "Swapping in knee-friendly moves") all come from this store.

## 7. Threading (AGENTS.md)

- Main thread, ruler scroll (scroll-linked):
  - `main-thread:bindscroll` computes `i = Math.round(scrollLeft / TICK_PX)`.
  - If `i !== lastIdxRef.current` (`useMainThreadRef`), it updates the big number text:
    - `valueTextRef.current.setAttribute("text", LABELS[i])`
    - `LABELS` is precomputed on the background and captured. It is a small array of short strings (≤375 entries of ≤3 chars), so no formatting runs on the main thread. See the open question if this capture is deemed "large".
- Hand-off at scroll end:
  - The background `bindscrollend` fires once and runs `onChange(min + i*step)`.
  - This converts to kg on the background and updates the store.
  - No `setState` or `runOnBackground` runs during scroll.
- Precomputed captured values: `TICK_PX` (12), `min`, `step`, `LABELS` (string[]).
- Press feedback (main thread, opacity 0.7): StatCards, chips, segment items, CTA, back.
- BottomSheet drag (if canonical BottomSheet supports it): main-thread `touchmove` → `setStyleProperty("transform", translateY)`. On `touchend`, `runOnBackground(close)` is called once, only when past the threshold. The threshold is precomputed px.
- Background thread: unit conversion, tick-array building (chunked), limit rules, validation, persistence, analytics, navigation.

## 8. Premium gating

- None. No `--gold`.

## 9. Analytics

- `quiz_step_completed { step: 4, step_name: "body", weight_unit, has_limits, limits }` on "Build my plan".
- Raw weight, height and age are **not** sent to analytics (PII/health data). Send only `bmi_bucket` if product wants it (open question).

## 10. Edge cases

- Loading / error / offline: no network here. The build call and its offline/error handling live in 06.
- A storage write failure is silent, and the in-memory store still feeds 06.
- Unit toggle mid-scroll: ignore the toggle until `scrollend`, or cancel the scroll momentum, then switch.
- lb rounding: switching kg → lb → kg must return to the same kg. This holds because the canonical value is untouched unless the ruler moves.
- Restore from the store: the initial `scroll-left` and initial text are rendered by the background on mount. There is no main-thread pass before the first scroll.
- Long tick list: render ticks as fixed-width views. If rendering 375 views is slow on low-end Android, use a `<list>` horizontal or a tiled tick image (open question).
- i18n:
  - The Hindi title will wrap to 2–3 lines; the body scrolls.
  - Unit labels: "kg"/"lb"/"cm" stay Latin in Hindi (common usage). Confirm.
  - The CTA "Build my plan" → "मेरा प्लान बनाएं".
  - Chip labels wrap via flex-wrap.
- Accessibility: the ruler has `accessibility-label` "Weight, 72 kilograms" and ±1 via tap on the left/right halves.

## 11. Implementation steps

1. [ ] Add `src/utils/units.ts` (`kgToLb`, `lbToKg`, `rulerRange`) and `toggleLimit` in `src/utils/quiz.ts`.
   - AC: kg→lb→kg round-trip is stable.
2. [ ] Add `NumberPicker` `variant="ruler"`:
   - ticks + fixed ember marker + edge fades
   - main-thread `bindscroll` updates the value text only on index change
   - `bindscrollend` → `onChange`
   - AC: no per-frame thread crossing; the value text tracks the ruler live; snaps to an integer.
3. [ ] Build `StatCard` (if not yet built) with `onTap` + press feedback, and `BottomSheet` (if not yet built).
4. [ ] Build `QuizBody.tsx` / `.css`.
   - AC: matches the PNG (kg selected, 72, Height 175 cm, Age 29, Knees chip on); "Nothing" is exclusive.
5. [ ] Height and age sheets using NumberPicker `digits`. Done commits to the store.
6. [ ] Wire "Build my plan": `completeStep(4)`, `track`, push `building`. Back → 04.
7. [ ] Add the route to `App.tsx`. Add EN/HI strings `quiz.body.*` and `unit.*`.
8. [ ] Verify on device via `bun run dev:android`: ruler drag smoothness, unit toggle.
9. [ ] `npx tsc -p .` passes.

## Open questions

- AGENTS.md says no formatting on the main thread. Is capturing a precomputed `LABELS` string[] (≤375 items) acceptable, or should the number update only at scroll end?
- Is the height and age edit UI (a BottomSheet + NumberPicker) acceptable? The mockup shows only static cards.
- Ruler with 375 tick views: a tiled image or a horizontal `<list>` may be needed on low-end Android.
- Should analytics get a `bmi_bucket`, or no body data at all?
