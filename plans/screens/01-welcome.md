# 01 · Welcome

Mockup: `mockups/png/01-welcome.png` (780×1688 @2× → 390×844 pt). Ref HTML: `mockups/screens/01-welcome.html`.
This plan also owns the **shared onboarding foundations** (tokens, Button extension, router, i18n, analytics, storage) that 02–05 depend on.

## 1. Visual inventory (top → bottom)

- Full-bleed hero art, top 600pt, drawn under the status bar: warm radial gradient (light peach top-right → ember → deep brown), faint 22pt grid lines fading in toward the bottom.
- Two concentric thin rings (300pt and 200pt diameter, white at 25% / 18%), centered horizontally, top 150 / 200.
- Black pictogram figure, "jumping jack" pose, 360×360, centered, top 110. Placeholder for a future video still.
- Bottom fade: transparent at 40% height → `--bg` at 70%.
- Top bar (top 60, 20pt side insets), space-between:
  - Left: logo mark (36×36, radius 11, ember gradient, white kettlebell-heartbeat glyph) + wordmark "FitCue" (22, weight 800, white).
  - Right: language pill "EN · हिंदी" (24pt high, translucent dark, 12pt semibold white). The PNG shows no visible selected-language state.
- Copy block, bottom-anchored (its bottom edge 150 above the screen bottom):
  - Eyebrow "FOLLOW-ALONG VIDEO WORKOUTS" (11, bold, letter-spacing .12em, `--ember`).
  - H1, 36pt, 3 lines: "Real coaches." / "Your plan." / "Press play." (`--text`, display bold).
  - Body, 15pt `--muted`: "Personal programs built from guided videos — at the gym or at home."
- Pinned footer (20pt insets, bottom 34, gap 12):
  - Primary button "Get started" (56pt, radius 16, ember gradient, glow shadow, white 16pt bold). Enabled.
  - Text link "I already have an account" (14pt semibold, `--muted`, centered).
- Home indicator: system, not drawn by the app.

## 2. Purpose and entry/exit

- Purpose: first launch. One promise, one CTA, and an EN/HI language choice.
- Entry: cold start when `onboardingComplete !== true` and there is no session. This is the app's initial route.
- Exit:
  - "Get started" → `quiz-goal` (02), no params. If a quiz draft exists, resume at `draft.lastStep + 1`.
  - "I already have an account" → `signup` (08) with `{ mode: "signin" }`.
  - Language pill → toggles locale in place (no navigation).
- Params: none. Hardware back exits the app.

## 3. Files

- `src/screens/Welcome/Welcome.tsx`, `src/screens/Welcome/Welcome.css`: `export function Welcome()`.
- `src/components/LanguageToggle/LanguageToggle.{tsx,css}` (new, screen-local candidate).
- `src/components/Logo/Logo.{tsx,css}` (new, screen-local candidate). 08 and the splash can reuse it.
- Shared foundations (built here, used by 02–23):
  - `src/theme/tokens.css`: token additions (see §4).
  - `src/components/Button/Button.{tsx,css}`: extend it (see §5).
  - `src/types/route.ts`: `Route` union + params.
  - `src/hooks/useRouter.tsx`: `RouterProvider`, `useRouter()`.
  - `src/hooks/useLocale.tsx`: `LocaleProvider`, `useLocale()`, `useT()`.
  - `src/i18n/en.ts`, `src/i18n/hi.ts`: string tables (keyed `welcome.*`, `quiz.*`).
  - `src/api/analytics.ts`: `track(event, props)`.
  - `src/api/storage.ts`: `getJSON<T>(key)`, `setJSON(key, v)`.
  - `src/assets/figures/jump.png`: placeholder pictogram, exported from the mockup SVG.
- Imports, for example: `import { Button } from "@/components/Button/Button.tsx";`

## 4. Layout tree

```
<view class="welcome">                       full screen, bg var(--bg), position relative
  <view class="welcome-hero">                abs top 0, h 600, background-image var(--hero-grad)
    <view class="welcome-grid"/>             optional: tiled grid image at 7% white; drop if Lynx can't mask it
    <view class="welcome-ring welcome-ring-lg"/>  300×300, radius 999, border 2 var(--ring-strong)
    <view class="welcome-ring welcome-ring-sm"/>  200×200, border 2 var(--ring-soft)
    <image class="welcome-figure" src=jump.png/> 360×360, top 110, centered
  </view>
  <view class="welcome-fade"/>               abs inset 0, background-image var(--hero-fade) (transparent 40% → var(--bg) 70%)
  <view class="welcome-top">                 abs top safeTop+16 (≈60), left/right 20, row space-between, z 3
    <Logo size="md"/>                        mark 36, radius 11, var(--ember-grad); text 22/800 var(--text)
    <LanguageToggle/>                        h 24 (hit area padded to 44), radius 999, bg var(--scrim), text 12/600 var(--text)
  </view>
  <view class="welcome-copy">                abs left/right 20, bottom 150
    <text class="welcome-eyebrow">           11/700, letter-spacing 1.3px, color var(--ember), uppercase via string table
    <text class="welcome-title">             36px, line-height 40px, 700, letter-spacing -0.7px, var(--text), mt 12; 3 lines from "\n"
    <text class="welcome-body">              15px, line-height 22px, var(--muted), mt 12
  </view>
  <view class="welcome-footer">              abs left/right 20, bottom safeBottom+34, column gap 12, z 4
    <Button label=t("welcome.cta") variant="primary" fullWidth/>
    <Button label=t("welcome.signin") variant="link"/>
  </view>
</view>
```

- Token additions to `src/theme/tokens.css` (values copied from `mockups/styles.css`; hex lives only in tokens.css):
  - `--line`, `--line-strong`, `--ember-2`, `--ember-soft`, `--ember-grad`, `--ember-tint-grad` (option-card selected fill).
  - `--on-accent` (white on ember), `--on-light` (#120d0b on light segment).
  - `--scrim` (rgba(0,0,0,.45)), `--ring-strong`, `--ring-soft`, `--hero-grad` (art v4 radial), `--hero-fade`, `--footer-fade`, `--ember-glow` (shadow color).
- Radius: buttons `var(--radius-button)` (16), pill 999.
- Lynx CSS check: radial-gradient, box-shadow, letter-spacing. Run `lynx-check-css-support`. Fallbacks: a linear gradient for the hero and no shadow.

## 5. Components

- **Button** (exists): extend, keeping its main-thread press feedback.
  - `variant: "primary" | "ghost" | "link"`. Primary becomes `background-image: var(--ember-grad)` + `box-shadow` glow, height 56 (it is 52 today).
  - `link`: no background, 14/600 `--muted`, height 44.
  - `disabled?: boolean`: opacity 0.4, no `bindtap`, no press feedback.
  - `fullWidth?: boolean`.
- **Logo** (new, screen-local candidate).
- **LanguageToggle** (new, screen-local candidate): label "EN · हिंदी". The active locale is shown bold `--text` and the inactive one `--muted`. That is a small addition; the PNG shows both at equal weight. Press feedback is the same as Button.

## 6. State and data

- Background-thread state:
  - `locale: "en" | "hi"` in `LocaleProvider` (React context at the App root).
  - `t(key)` is a plain object lookup. The tables are imported statically, both small.
- Router: `RouterProvider` holds a `stack: Route[]` in `useState`. It exposes `push`, `replace`, `back`, `reset`.
  - `Route = { name: "welcome" } | { name: "quiz-goal" } | { name: "quiz-experience" } | { name: "quiz-schedule" } | { name: "quiz-body" } | { name: "building" } | { name: "signup"; mode: "signup" | "signin" } | …`.
  - `App.tsx` switches on `top.name`.
- Persistence (`src/api/storage.ts`, backed by a Lynx native storage module; see open question):
  - `fitcue.locale`: read on boot. The default comes from the device language (`hi*` → "hi", else "en").
  - `fitcue.onboarding`: `{ complete: boolean }`. It decides whether Welcome or Home is the initial route.
  - Reads the quiz draft key (defined in 02) for "resume".
- No network on this screen.

## 7. Threading (AGENTS.md)

- Main thread:
  - Press feedback only: Button and LanguageToggle use `main-thread:bindtouchstart/end/cancel` → `setStyleProperty("opacity", …)`, the same pattern as `Button.tsx`.
- Background thread:
  - Locale toggle (`bindtap` → `setLocale` + `setJSON`).
  - Navigation, the storage read on boot, `track`.
- Captured values: none beyond the static opacity strings. Nothing crosses threads per frame.
- No entrance animation. If one is added later, use a CSS `animation` on the copy block, not JS.

## 8. Premium gating

- None. No `--gold` on this screen.

## 9. Analytics

- plan.md defines no event for Welcome; none required.
- Funnel start is implied by the first `quiz_step_completed`.
- Optional (not in plan.md, needs approval): `onboarding_started {resume: boolean}`, `language_changed {locale}`.

## 10. Edge cases

- Loading:
  - Gate the first render on the storage reads (locale + onboarding).
  - Render `--bg` only, with no flash of the wrong language. Use a timeout fallback of 300 ms to the defaults.
- Error / offline: the screen is fully static, so it works offline. If storage fails, use the defaults and don't block.
- Returning user with `onboarding.complete` → never shown; go straight to `home`.
- i18n:
  - Hindi title lines are longer. Allow wrap and don't fix the height.
  - The copy block is bottom-anchored, so growth goes upward. Verify that it clears the figure at 36pt. If not, use `font-size: 32px` for `hi`.
  - Eyebrow: uppercase EN in the string table. Hindi has no case.
  - The "EN · हिंदी" label is identical in both locales.
- Small screens (<700pt tall): the hero scales and the copy stays anchored. The figure may tuck under the fade, which is acceptable.
- Safe areas: the top bar is offset by the status-bar inset. The footer is offset by the bottom inset + 34 (see open question on inset source).

## 11. Implementation steps

1. [ ] Add the tokens from §4 to `src/theme/tokens.css`.
   - AC: no hex anywhere outside tokens.css (`grep -rn '#[0-9a-fA-F]\{3,6\}' src --include=*.css --include=*.tsx` only matches tokens.css).
2. [ ] Extend Button (`variant: "link"`, `disabled`, `fullWidth`, gradient primary at 56pt).
   - AC: Home still renders; press dims to 0.7 on the main thread; disabled ignores taps.
3. [ ] `src/types/route.ts` + `src/hooks/useRouter.tsx`.
   - Wire `App.tsx` to render by route. Initial route = `welcome` or `home` from `fitcue.onboarding`.
   - AC: `push` and `back` work; hardware back pops the stack.
4. [ ] `src/api/storage.ts` (`getJSON`/`setJSON`, try/catch, returns `undefined` on failure). `src/api/analytics.ts` (`track` = fire-and-forget, console in dev).
5. [ ] `src/i18n/en.ts`, `src/i18n/hi.ts`, `src/hooks/useLocale.tsx` (`useT`).
   - AC: switching locale re-renders all `t()` strings.
6. [ ] `Logo` and `LanguageToggle` components.
7. [ ] `Welcome.tsx` / `.css` per §4.
   - AC: matches the PNG at 390×844 (hero, rings, figure, copy positions, CTA at bottom 34).
8. [ ] Wire the CTAs: Get started → `quiz-goal` (or resume step); link → `signup {mode:"signin"}`.
9. [ ] Verify on device with `bun run dev:android` in EN and HI.
10. [ ] `npx tsc -p .` passes.

## Open questions

- Storage: which Lynx native module backs `src/api/storage.ts` (no localStorage in Lynx)?
- Safe-area insets: where do they come from (`lynx.__globalProps`, a native module)?
- Router and i18n: these are shared across all screens, so confirm one owner and one API before 06+ planners diverge.
- `onboarding_started` and `language_changed` events are not in plan.md. Add them?
