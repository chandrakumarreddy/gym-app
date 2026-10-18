# 03 · Quiz · Level & equipment

Mockup: `mockups/png/03-experience.png`. Ref: `mockups/screens/03-experience.html`.
Uses QuizShell and the quiz store defined in `plans/screens/02-goal.md`.

## 1. Visual inventory (top → bottom)

- Quiz header: back button, progress bar at **50%**, "2/4".
- H1 "How experienced are you?" (30pt, wraps to 2 lines). No subtitle.
- Three option cards, gap 10, mt 20. They have **no icon tile**: title + caption + radio.
  - **Beginner** / "New to lifting or coming back". Unselected.
  - **Intermediate** / "Training consistently for 6+ months". **Selected**: ember border, tint fill, ember radio with check.
  - **Advanced** / "Following structured programs for years". Unselected.
- H3 "Where do you train?" (17/600, mt 24).
- Segmented control, full width, mt 12:
  - Container `--surface-2`, radius 12, padding 4, 1px `--line`.
  - Segments: **Gym** (selected: light `--text` pill, dark text, radius 9), Home, Both (`--muted` 14/600).
- H3 "Equipment you can use" (mt 24).
- Chip group, wrapping, gap 8, mt 12. Multi-select.
  - Row 1: **✓ Dumbbells**, **✓ Barbell**, **✓ Machines**. Selected: ember-soft fill, ember border, `--ember-2` text, check icon 14.
  - Row 2: Bands, Kettlebell, Bodyweight only. Unselected: `--surface-2` fill, `--line` border, `--text` text.
  - Chips are 36pt high, radius 999, 14/500.
- Pinned CTA "Continue". Enabled.

## 2. Purpose and entry/exit

- Purpose: step 2/4. Level + training location + owned equipment. It filters the library and plan to what the user can do.
- Entry: 02 Continue, or back from 04.
- Exit:
  - Continue → `quiz-schedule` (04).
  - Back → `quiz-goal` (02).
- Params: none.

## 3. Files

- `src/screens/QuizExperience/QuizExperience.{tsx,css}`: `export function QuizExperience()`.
- Reuses QuizShell, QuizOptionCard, Button, Icon (from 02).
- New canonical:
  - `src/components/SegmentedControl/SegmentedControl.{tsx,css}`
  - `src/components/Chip/Chip.{tsx,css}`
- `src/utils/quiz.ts`: add `defaultEquipmentFor(location)`.

## 4. Layout tree

```
<QuizShell step={2} total={4} title=t("quiz.exp.title") ctaLabel=t("quiz.continue") ctaDisabled={!canContinue}>
  <view class="quiz-exp-levels">                 column, gap 10, mt 20 (title→list)
    {LEVELS.map(l => <QuizOptionCard id title caption selected onSelect/>)}   no icon prop
  </view>
  <text class="quiz-exp-h3">t("quiz.exp.where")</text>     17/600 var(--text), mt 24
  <SegmentedControl class mt 12 options=[gym,home,both] value onChange/>
  <text class="quiz-exp-h3">t("quiz.exp.equipment")</text> mt 24
  <view class="quiz-exp-chips">                  row, flex-wrap wrap, gap 8, mt 12
    {EQUIPMENT.map(e => <Chip label selected={has(e)} showCheck onToggle/>)}
  </view>
</QuizShell>
```

SegmentedControl (`.seg`):

- Container: row, bg `var(--surface-2)`, radius 12, padding 4, border 1 `var(--line)`.
- `.seg-thumb`: absolute, width `100%/n` minus padding, bg `var(--text)`, radius 9.
  - Moved with `transform: translateX(index*100%)` and `transition: transform 200ms`.
- `.seg-item`: flex 1, padding 8/0, centered.
  - Label 14/600 `var(--muted)`. Active: `var(--on-light)`.
- Height ≈42pt in 03 (full width). 05 reuses it at 120pt width.

Chip (`.chip`):

- Base: height 36, padding 0 14, radius 999, bg `var(--surface-2)`, border 1 `var(--line)`, row gap 6.
- Label 14/500 `var(--text)`.
- On (`.chip-on`): bg `var(--ember-soft)`, border `var(--ember)`, label + check `var(--ember-2)`.

## 5. Components

- **QuizShell**, **QuizOptionCard** (reuse; option card without `icon`).
- **SegmentedControl** (canonical, new): `{ options: {id,label}[], value, onChange, compact? }`. Reused in 05 (kg/lb) and 17 (Week/Month/Year).
- **Chip** (canonical, new): `{ label, selected, showCheck?, onToggle }`. Reused in 04, 05, 11, 16.
- **Button** (reuse).

## 6. State and data

- Store fields: `level?`, `location?`, `equipment: Equipment[]` (types in `src/types/quiz.ts`).
- Defaults:
  - `level`: unset.
  - `location`: unset, treated as `"gym"` on first render. It is written to the store on first change or on Continue.
  - `equipment`: when the location changes and the user hasn't edited chips yet, prefill from `defaultEquipmentFor`:
    - gym → dumbbells, barbell, machines (matches the PNG)
    - home → bodyweight, bands
    - both → dumbbells, bands, bodyweight
- Business rules (background, in `src/utils/quiz.ts`):
  - `toggleEquipment(list, e)`. Selecting **Bodyweight only** clears the others; selecting any other chip deselects Bodyweight only.
  - `canContinue = !!level && equipment.length > 0`.
  - Track `equipmentTouched` in local `useState` (not persisted) so that later location changes don't overwrite edits.
- Persistence: `completeStep(2)` on Continue.

## 7. Threading (AGENTS.md)

- Main thread:
  - Press feedback (opacity 0.7) on cards, chips, segments and the CTA via `main-thread:bindtouchstart/end/cancel`.
  - The segment thumb slide is a pure CSS transition, so no JS runs per frame.
- Background thread:
  - All taps (`bindtap`): selection, toggle rules, the equipment prefill, `canContinue`, persistence, analytics, navigation.
- Captured values: none.
- The thumb `translateX` percentage string is precomputed on the background and passed as inline style.

## 8. Premium gating

- None. No `--gold`.

## 9. Analytics

- `quiz_step_completed { step: 2, step_name: "experience", level, location, equipment_count, equipment }` on Continue.

## 10. Edge cases

- Loading / error / offline: local only, so none. A storage write failure is silent.
- Content height:
  - The H1 wraps to 2 lines and the content ≈1290px@2× fits on 844pt.
  - On short screens or with Hindi, the body scrolls under the pinned CTA (pb 120 in QuizShell).
- Back from 04 restores level, location and equipment exactly. `equipmentTouched` resets to true if equipment exists in the store.
- i18n:
  - Chip labels in Hindi are longer. flex-wrap handles it, and the chips use `white-space: nowrap` on the text.
  - The segment labels must fit at 1/3 width. Truncate with ellipsis via `text-maxline="1"`.

## 11. Implementation steps

1. [ ] Build `SegmentedControl` (thumb + CSS transition, main-thread press feedback).
   - AC: three segments; the thumb slides; active label uses `--on-light`.
2. [ ] Build `Chip` (on/off, optional check icon, press feedback).
   - AC: visuals match the PNG chips.
3. [ ] Add `toggleEquipment` and `defaultEquipmentFor` to `src/utils/quiz.ts`.
   - AC: Bodyweight only is exclusive.
4. [ ] Build `QuizExperience.tsx` / `.css`.
   - AC: level single-select; location defaults to Gym with its 3 chips preselected; Continue is disabled without a level or equipment.
5. [ ] Wire Continue: `completeStep(2)`, then `track`, then push `quiz-schedule`. Back pops to 02.
6. [ ] Add the route to `App.tsx`. Add EN/HI strings `quiz.exp.*`.
7. [ ] `npx tsc -p .` passes.

## Open questions

- Confirm the equipment prefill per location, and that Bodyweight only is exclusive.
