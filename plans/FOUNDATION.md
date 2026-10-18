# FOUNDATION — shared API reference

Screens own only `src/screens/<Name>/`, plus their own `src/i18n/strings/<key>.ts`. Every other file is shared. If you need a change in a shared file, ask the coordinator first. Don't edit it in place.

## Ownership

| Path | Owner |
|---|---|
| `src/screens/<Name>/<Name>.{tsx,css}` | the screen agent |
| `src/screens/<Name>/components/<Part>/<Part>.{tsx,css}` | the screen agent (screen-local components go here) |
| `src/i18n/strings/<key>.ts` | the screen agent |
| `src/components/*`, `src/hooks/*`, `src/state/*`, `src/services/*`, `src/api/*`, `src/types/*`, `src/utils/*`, `src/theme/tokens.css`, `src/App.tsx` | shared. Do not edit. |

## Router: `@/hooks/useRouter.tsx`

```ts
const r = useRouter();
r.route; r.mode /* "stack"|"tabs" */; r.tab; r.canGoBack; r.showTabBar; r.overlay
r.push(route)      // in tabs mode, pushing a tab route switches tabs
r.replace(route)
r.back(): boolean  // closes the overlay first; returns false at the root
r.reset(route)     // a tab route enters tabs mode (5 stacks); anything else gives a single stack
r.selectTab(tab)   // re-selecting the current tab pops it to its root
r.openLocked(params: LockedSheetParams): boolean  // tracks lock_tapped; false (no sheet) if premium or pack owned
r.closeOverlay()
useRoute("program") // typed current route, throws if the name doesn't match
```

- App renders the TabBar only when `showTabBar` is true (a tab root in tabs mode). Pushed screens have no TabBar.
- Screens receive their route params as props (`RouteParams<"x">`).

## Routes: `@/types/route.ts`

| Route | Params |
|---|---|
| `welcome`, `quiz-goal`, `quiz-experience`, `quiz-schedule`, `quiz-body`, `building` | none |
| `plan-preview` | `{planId}` |
| `signup` | `{mode?: "signup"\|"signin", planId?}` |
| `paywall` | `{source: PaywallSource, contentId?}` |
| `home`, `progress`, `profile` | none (tab roots) |
| `library` | `{filter?, section?, coachId?}` (tab root) |
| `challenges` | `{challengeId?, tab?}` (tab root) |
| `program` | `{programId, weekIndex?}` |
| `workout` | `{sessionId, source?: WorkoutSource}` |
| `player` | `{sessionId, source?, resumeAtSec?}` |
| `rest-log` | `{sessionId}` |
| `complete` | `{sessionId}` |
| `coach` | `{coachId, source?}` |
| `form-check` | `{coachId?, exerciseId?, source: "coach"\|"workout"\|"profile"}` |
| `winback` | `{productId, source: "profile_manage"\|"push"}` |

- Locked content is **not a route**. Call `openLocked({contentType, contentId, title, sessionCount?, packProductId?, source})`, and App renders `LockedSheet` inside a `BottomSheet`.
- Helpers: `RouteName`, `RouteOf<N>`, `RouteParams<N>`, `TabId`, `TAB_IDS`, `isTabId`.

| Screen | Folder | Route |
|---|---|---|
| 02 | `QuizGoal` | `quiz-goal` |
| 03 | `QuizExperience` | `quiz-experience` |
| 04 | `QuizSchedule` | `quiz-schedule` |
| 05 | `QuizBody` | `quiz-body` |
| 06 | `Building` | `building` |
| 07 | `PlanPreview` | `plan-preview` |
| 08 | `Signup` | `signup` |
| 09 | `Paywall` | `paywall` |
| 10 | `Home` | `home` |
| 11 | `Library` | `library` |
| 12 | `Program` | `program` |
| 13 | `Workout` | `workout` |
| 14 | `Player` | `player` |
| 15 | `RestLog` | `rest-log` |
| 16 | `Complete` | `complete` |
| 17 | `Progress` | `progress` |
| 18 | `Challenges` | `challenges` |
| 19 | `LockedSheet` | props `LockedSheetParams & {onClose}` |
| 20 | `CoachProfile` | `coach` |
| 21 | `FormCheck` | `form-check` |
| 22 | `Profile` | `profile` |
| 23 | `WinBack` | `winback` |

Every one of these is currently a stub that renders its name. Replace the body and keep the named export and its signature.

## Strings: `@/i18n`

- Your module is `src/i18n/strings/<key>.ts`, and it is already merged in `src/i18n/index.ts`. The modules are: `common`, `welcome`, `quizGoal`, `quizExperience`, `quizSchedule`, `quizBody`, `building`, `planPreview`, `signup`, `paywall`, `home`, `library`, `program`, `workout`, `player`, `restLog`, `complete`, `progress`, `challenges`, `locked`, `coach`, `formCheck`, `profile`, `winback`.
- Fill it like this:
  ```ts
  export const restLog = defineStrings({ "restLog.title": "Rest" }, { "restLog.title": "आराम" });
  ```
  - `hi` must have exactly the keys in `en` (a type error otherwise).
  - Prefix every key with the module name.
- Use it with `const t = useT(); t("restLog.title"); t("common.daysLeft", {n: 3})`. `{var}` is interpolated.
- `useLocale()` returns `{locale, setLocale, t}`. `translate(locale, key, vars)` works outside React.
- `common.*` already has:
  - Navigation and actions: `tab.home|library|progress|challenges|profile`, `continue`, `retry`, `close`, `back`, `done`
  - Badges and status: `pro`, `premium`, `locked`, `offline`, `ended`, `speaking`, `you`
  - Upgrade banner: `upgrade.title`, `upgrade.subtitle`
  - Countdown: `countdown.h|m|s|d`, `daysLeft`, `dayLeft`

## Components: `@/components/<Name>/<Name>.tsx`

All are named exports. Pressable components already have main-thread press feedback; put your logic in `onTap`.

### Base

- **Pressable** `{className?, style?, feedback?: "opacity"|"scale", disabled?, onTap?, onLongPress?, onRelease?, children}`: wraps any tappable view with MTS feedback.
- **Button** `{label, variant?: "primary"|"ghost"|"link"|"light"|"gold", size?: "md"|"sm", sm?, icon?: IconName, loading?, disabled?, fullWidth?, block?, className?, onTap?}`. `gold` is for Premium only.
- **Icon** `{name: IconName, tone?: "text"|"muted"|"dim"|"ember"|"gold"|"green"|"ink", size?=20, className?}`.
  - Icons are pre-tinted PNGs; there is no tint-color.
  - Names: home library chart trophy user users play pause next prev lock crown bell search filter clock flame dumbbell download cast check chev-r chev-l chev-d x heart pulse star share plus minus calendar settings apple phone video message timer bolt upload shield refresh more target stretch cc gift scale google.
- **IconButton** `{icon, variant?: "round"|"glass"|"plain", size?=40, iconSize?, tone?, disabled?, badge?, className?, onTap?}`.
- **Art** `{spec?: ArtSpec, variant?, figure?, width?, height?, size?, radius?, fill?, figureScale?=0.7, scrim?, className?, children?}`.
  - Variants: v1–v4 (ember gradients) and dark.
  - Figures: squat curl pushup lunge run stretch jump deadlift.
  - `fill` makes it absolute-fill its parent.
- **Avatar** `{initials, size?: number|"xs"|"sm"|"md"|"lg"|"xl", tone?: "ember"|"warm"|"brown", ring?, className?}`.
- **Skeleton** `{width?, height?, radius?, className?}`.
- **Toggle** `{on, onChange?, disabled?}`.

### Quiz and forms

- **QuizShell** `{step, total, title, subtitle?, ctaLabel?, ctaDisabled?, ctaLoading?, onCta?, onBack?, headerRight?, footer?, children}`: progress bar, scroll body, and a sticky CTA.
- **QuizOptionCard** `{id, title, caption?, icon?, selected, onSelect(id)}`.
- **SegmentedControl** `{options: {id,label}[], value, onChange(id), compact?, lockedIds?, onLocked?(id)}`.
- **Chip** `{label, selected?, showCheck?, tone?: "default"|"ember"|"glass"|"soft", variant?: "pill"|"action"|"ember"|"soft", size?: "sm"|"md", icon?, disabled?, onTap?, onToggle?}`.
  - `variant="action"` is the +15 s / Skip-rest button.
  - Without a handler it is a static pill.
- **NumberPicker** `{variant?: "digits"|"ruler", min, max, step?=1, value, onChange, unitLabel?, formatLabel?, className?}`.
  - Main-thread scroll; `onChange` fires once on scroll end.
  - `ruler` renders its own big value and unit label.
- **DayPicker** `{value: Weekday[], labels: string[7], onToggle(day)}`. Weekday 0 is Monday by convention: pass labels in that order.
- **Stepper** `{label, value, step, min, max, format?: "kg"|"int", unit?, onChange}`: long-press repeats at 120ms on the background thread.
- **ProgressDots** `{value, total, variant?: "dots"|"bar"}`.

### Layout and navigation

- **ScreenHeader** `{variant?: "large"|"nav"|"overlay"|"solid", title?, subtitle?, leading?|left?: "back"|"close"|"none"|node, trailing?|right?: node, onBack?}`.
- **TabBar** `{active?: TabId}`. App renders it; screens don't.
- **BottomSheet** `{visible, onDismiss, snapPoints?: number[]=[1], dismissible?=true, title?, children}`.
  - Main-thread drag from the grabber or title, with a single `runOnBackground` hand-off at gesture end.
  - It is `position: fixed`.
- **SettingsGroup** `{title?, children}` and **SettingsRow** `{label, icon?, value?, trailing?, chevron?, tone?: "default"|"danger", last?, onTap?}`. Both live in `SettingsGroup.tsx`.
- **ListRow** `{title, eyebrow?, subtitle?|caption?, thumb?, leading?, trailing?, trailingText?, trailingTone?: "default"|"green"|"muted", chevron?, locked?, card?, onTap?}`.

### Content and cards

- **Tile** `{art: ArtSpec, title?, caption?, badge?, locked?, progress?: 0..1, width?=160, height?=200, radius?=16, onTap?}`.
- **HeroVideoCard** `{art: ArtSpec, height?=220, radius?=28, eyebrow?, title?, subtitle?, badge?, footer?, playButton?=true, onTap?, children?}`.
- **StatCard** `{label, value: string, unit?, icon?, tone?: "default"|"ember"|"green", onTap?}`.
- **BarChart** `{bars: BarVM[] /* {label, heightPct, active} */, height?=140}`: pure render, with values precomputed.

### Premium

- **LockBadge** `{size?, variant?: "circle"|"inline"}`.
- **ProBadge** `{label?, size?: "sm"|"md"|"tile"|"icon", mini?}`. It uses gold.
- **UpgradeBanner** `{icon?, title?, subtitle?, chevron?, onTap?}`: the copy defaults to `common.upgrade.*`.
- **PlanSelector** `{options: PlanOptionVM[], selectedId, onSelect(id)}`.
- **TrialTimeline** `{items: TrialTimelineItem[]}`.

### Workout and player

- **RestRing** `{size?=220, stroke?=14, progress?: 0..1, durationMs?, remainingMs?, running?, label?, valueText?, caption?}`.
  - Static mode uses `progress`.
  - Countdown mode uses `durationMs` + `remainingMs` + `running`, and starts a main-thread `animate()` once whenever those change.
  - `ringPlan`/`ringAngles` are in `RestRing/ringPlan.ts`.
- **PlayerControls** `{playing, speedLabel, captionsOn, speedLocked?, onSpeed, onPrev, onToggle, onNext, onCaptions}`.
- **SetDots** `{total, done, current}`.
- **CoachCue** `{initials, text, tone?, speaking?, visible?}`.
- **Video** (mock, no native code) `{src?, art, paused, rate?, muted?, startTime?, durationSec?=90, captionsVisible?, controller?, onReady?({duration}), onBuffering?, onSecond?({sec}), onEnded?, onError?, children?}`.
  - `useVideoController()` returns `{seek(t), play(), pause()}`.
  - The mock ticks `onSecond` at 1 Hz × rate. There is no `main-thread:bindprogress` yet.

### Challenges

- **LeaderboardRow** `{rank, initials, avatarTone?, name, scoreLabel, isMe?}`.
- **Countdown** `{endsAt: ms, mode?: "hms"|"days", onEnd?}`: a background timer.

Screen-local components go in `src/screens/<Name>/components/<Part>/<Part>.{tsx,css}`. If you think one belongs in `src/components`, ask the coordinator.

## State: `@/state/*`

All of these are module singletons on `useSyncExternalStore`, running on the background thread.

- **`store.ts`**: `createStore(initial)` returns `{get, set, subscribe}`, and there is `useStore(store, selector?)`.
- **`quizAnswers.ts`**
  - `useQuizAnswers()` returns `{answers, set(patch), completeStep(step), reset}`.
  - Also: `useQuizAnswer(key)`, `getQuizAnswers`, `setQuizAnswers`, `completeQuizStep`, `resetQuiz`, `DEFAULT_ANSWERS`.
  - The draft persists under `fitcue.quizDraft`.
- **`plan.ts`**
  - Plans: `useCurrentPlan()`, `getCurrentPlan`, `setCurrentPlan` (`plan.current`).
  - Onboarding: `getOnboarding()` returns `{step, complete}`; `setOnboardingStep("quiz"|"plan"|"signup"|"paywall"|"complete")` (`fitcue.onboarding`). `complete` makes the app start on Home.
- **`workoutSession.ts`**
  - Reads: `useWorkoutSession(sel)`, `getState`, `subscribe`, `getSaved`.
  - Actions:
    - Lifecycle: `start(workout)`, `restore(saved)`, `discard()`, and `finish()`, which returns `Promise<SessionSummary>`, calls the API and tracks `workout_completed`.
    - Playback: `play`, `pause`, `setBuffering(b)`, `syncPosition(sec)`, `setSpeed`, `toggleCaptions`, `toggleVoice`.
    - Rest: `completeSet` (enters resting with `rest.endsAt`), `extendRest(sec)`, `skipRest`.
    - Sets: `logSet({weightKg, reps, effort})` (an upsert; failures go to the `sync.queue`), `advance`, `prev`, `jumpTo(i)`, `setFeel`.
  - Persists under `session.active`.
- **Selectors** in `@/utils/session.ts`: `currentExercise`, `nextExercise`, `setsOf`, `isLastSet`, `totalSets`, `lastLogFor`, `logFor`, `activeMsNow`, `volumeKg`, `detectPRs`, `summarize`, `stepperBounds`, `prefillFor`.

## Services: `@/services/*` (mocks)

- **`purchases.ts`**
  - Hooks: `useEntitlements()` returns `{entitlements, tier, isPremium, loading}`; `useEntitlement()` returns `{premium, ownedPrograms}`.
  - Catalog: `getOffering`, `getProduct`.
  - Buying: `purchase(productId, {promotionalOffer?})` returns success/cancelled/pending/error; `restore`; `pauseSubscription(months)`; `openManageSubscriptions`.
  - Entitlements: `getEntitlements`, `getEntitlementsSync`, `onEntitlementsChange`.
  - Account and debug: `logIn`, `logOut`, `getUserId`, `configure`, and `setTier(tier)` (debug).
  - Products and prices:

    | Product | Price |
    |---|---|
    | `premium_annual` | ₹2,499, 7-day trial |
    | `premium_monthly` | ₹399 |
    | `family_annual` | ₹3,999 |
    | `pack_lean_in_30`, `pack_home_hypertrophy` | ₹799 |
    | `formcheck_1` / `_5` / `_10` | ₹299 / ₹1,199 / ₹1,999 |
- **`auth.ts`**
  - Sign-in: `signInWithApple`, `signInWithGoogle`.
  - OTP: `startPhoneOtp` / `startEmailOtp` return `{requestId}`; `verifyPhoneOtp(reqId, phone, code)` / `verifyEmailOtp(reqId, email, code)`. The OTP is `123456`.
  - Session: `getSession`, `signOut`, `onAuthChange`, `useAuth()` returning `{session, status}`.

## API: `@/api/*`

Mocks are controlled by `USE_MOCKS` / `MOCK_LATENCY_MS` in `client.ts`. Fetch with `useAsync(fn, deps)`, which returns `{data, error, loading}` (`@/hooks/useAsync.ts`).

- **Plans and feeds**
  - `plans`: `generatePlan(answers)`, `getPlan`, `claimPlan`, `uploadPlan`, `buildMockPlan`.
  - `home`: `getHome()`.
  - `library`: `getLibrary(filter?)`.
  - `programs`: `getProgram(id)`, `getProgramProgress(id)`.
- **Workouts**
  - `sessions`: `getSession`, `startSession`, `logSet`, `completeSession`, `postFeel`, `getLastLog`, `getNextWeight`, `getPersonalRecords`.
  - `playback`: `getPlaybackUrl(exerciseId)`.
- **Progress and challenges**
  - `progress`: `getProgress(range)`, `getMuscleBalance()`.
  - `challenges`: `getCurrentChallenge`, `getLeaderboard(id, scope, cursor?)`, `getBadges`, `getUpcomingChallenges`, `joinChallenge`.
- **Coaches and form checks**
  - `coaches`: `getCoach`, `getCoachPrograms`, `followCoach`.
  - `formChecks`: `getCreditPacks`, `getCredits`, `createUploadSession`, `submitFormCheck`.
- **Account**
  - `profile`: `getProfile`, `updateProfile`, `getDownloadsSummary`.
  - `winback`: `getWinBackOffer(productId)`, `markWinBackShown`, `recordWinBackOutcome`.
- **Infrastructure**
  - `storage`: `getJSON`, `setJSON`, `removeKey`.
  - `analytics`: `track(event, props)`.
- **Mock data** (`api/mock/content.ts`)
  - Coaches: arjun, priya, kabir, sana, vikram.
  - Programs: `strength-builder` (free), `lean-in-30` and `home-hypertrophy` (premium packs).
  - Session ids follow `${programId}-w{W}d{D}`. Today's session is `TODAY_SESSION_ID = "strength-builder-w1d3"`, the Lower Hypertrophy workout (6 exercises, 18 sets).

Types live in `src/types/*`: art, auth, challenge, coach, content, formCheck, locked, plan, progress, purchases, quiz, route, session, user, winback. `src/types/lynx.d.ts` adds `main-thread:bindscroll` on `<scroll-view>` (`MainThreadScrollEvent`).

Formatting helpers are in `@/utils/format.ts`: `formatClock`, `formatNumber`, `formatKg`, `formatSet`, `formatTonnes`, `formatDeltaPct`, `formatInr`, `formatBytes`, `formatCount`, `formatPercent`, `formatReps`, `formatTime12`, `pad2`, `formatDuration`, `greeting`. Format on the background thread only.

## Tokens: `src/theme/tokens.css`

Use `var(--token)` only. Hex values never appear outside this file.

- **Surfaces**: `--bg`, `--surface`, `--surface-2`, `--surface-3`, `--line`, `--line-strong`.
- **Text**: `--text`, `--muted`, `--dim`.
- **Action (ember)**: `--ember`, `--ember-2`, `--ember-deep`, `--ember-soft`, `--ember-line`, `--ember-glow`, `--ember-grad`, `--ember-tint-grad`, `--selected-grad`, `--ember-halo-1/2`, `--ember-heat-1/2`.
- **Premium only (gold)**: `--gold`, `--gold-soft`, `--gold-line`, `--gold-grad`, `--gold-banner-grad`.
- **Status**: `--green`, `--green-soft`, `--green-line`, `--red`.
- **On-colors**: `--on-accent`, `--on-ember`, `--on-light`, `--on-gold`, `--ink`, `--on-art`, `--on-art-muted`, `--on-video`, `--on-video-muted`, `--on-video-dim`.
- **Video and meters**: `--play-circle`, `--scrub-track`, `--meter-track`.
- **Scrims and glass**: `--scrim`, `--sheet-scrim`, `--glass`, `--glass-strong`, `--glass-line`, `--glass-line-strong`, `--ring-strong`, `--ring-soft`.
- **Art**: `--hero-grad`, `--art-v1..v4`, `--art-dark`, `--art-scrim`, `--avatar-ember|warm|brown`.
- **Fades**: `--hero-fade`, `--footer-fade`, `--bottom-fade`, `--ruler-fade-l/r`.
- **Tab bar**: `--tabbar-bg`, `--tabbar-h` (86px).
- **Radii**: `--radius-chip` 10, `-sm` 12, `-md` 14, `-button` 16, `-card` 22, `-hero` 28, `-sheet` 30, `-pill` 999.

## Threading reminders

- Never format strings, sort data or call APIs inside `"main thread"` functions.
- Capture only small primitives.
- Hand off to the background once, at gesture or scroll end.
- See `BottomSheet`, `NumberPicker`, `RestRing` and `Stepper` for the patterns.
