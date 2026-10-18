# 10 · Home (+ app shell, TabBar, navigation)

Source: `mockups/png/10-home.png` (390×844 @2x). Exact sizes from `mockups/screens/10-home.html` and `mockups/styles.css`.

## 1. Visual inventory (top → bottom)

- System status bar (9:41, signal, wifi, battery). Not drawn by the app. Respect the safe-area top inset.
- **Greeting header** (row, space-between)
  - Left: avatar circle 40px, ember gradient, initials `AK` in white 14/700. Beside it, a stack of `Good evening` (13, muted) above `Aarav` (17/600, text).
  - Right: streak pill, 36h, surface-3, ember flame icon and `5` (14/600). Bell icon button, 40px round, surface-2, 1px line border.
- **Week strip**: 7 columns, each a 38px circle above a weekday label (12, dim).
  - Mon: done (ember fill, white check). Tue `14`: rest (surface-2, dim number). Wed: done (check). Thu `16`: rest. Fri `17`: **today** (2px ember ring, transparent fill, text-colored number). Sat `18`: scheduled, not done (surface-2, muted number). Sun `19`: rest.
- **Hero video card**: 300h, radius 28, ember radial art, lunge figure.
  - Top-left pills: `Today` (ember fill, white) and `Week 1 · Day 3` (dark translucent).
  - Top-right: glass round download button, 40px.
  - Bottom block: `Lower Hypertrophy` (22/700 display, white). Meta row (13, white at 85%): clock `45 min`, dumbbell `6 exercises`, `Coach Arjun`.
  - Light button, 48h, full width, radius 16: play icon and `Start workout` (16/700, dark text on `--text` fill).
- **Gold upgrade banner** (free users only): radius 22, dark-gold gradient, 1px gold border at 35%.
  - Gold square 34px (radius 10) holding a dark crown.
  - `Weeks 2–8 are waiting` (15/600) above `Start a 7-day free trial` (13, muted).
  - Gold chevron on the right.
- **Section header**: `Continue watching` (17/600) on the left, `See all` (13/600, ember) on the right.
- **Continue watching carousel**: horizontal tiles 160×200, radius 16, 12px gap, bleeding off the right edge. Tile 1 (stretch figure) has a 4px progress meter at 60% at the bottom. Tile 2 shows a run figure. Tile 3 is cut off.
- **TabBar**: 86h, near-opaque bg, 1px line top border, 5 tabs with 11px labels.
  - `Home` is active (ember icon and label). `Library`, `Progress`, `Challenges` and `Profile` are inactive (dim).
  - Icons: house, play-in-rounded-square, bars, trophy, person.
- Home indicator (system).

## 2. Purpose and entry/exit

- Purpose: show today's session as the hero, keep the streak and week strip visible, resume videos, and upsell free users.
- Entry: after 09-paywall (trial/subscribe → Premium, or × → Free), the Home tab, cold start when onboarded, back from 13/14/16. 16-complete `Done` resets the stack to Home.
- Exit:
  - Hero card body tap → `workout {sessionId, programId}` (13).
  - `Start workout` → `player {sessionId, source:'home_hero'}` (14).
  - Hero download → free: `locked {kind:'feature', feature:'download'}` (19). Premium: starts the download in place.
  - Banner → `paywall {source:'home_banner'}` (09).
  - Streak pill → `progress` tab (17).
  - Bell → notifications (out of scope; no-op for now).
  - Week strip day: done → `workout` for that session. Today → same as the hero. Rest → no-op.
  - Continue watching tile → `player {sessionId, resumeAtSec}`. A locked tile goes to 19.
  - `See all` → `library` tab, `filter:'in_progress'`.
- Params: none (tab root).

## 3. Files

- Evolve, don't rewrite: `src/screens/Home/Home.tsx` and `Home.css`.
  - Remove the "Hello world" title, the centered column and the `console.log`.
  - Keep `greeting()` usage, but fix `utils/format.ts` (`"Good afternoon!"` → `"Good afternoon"`) and return an i18n key.
  - Keep `Button` (add a `light` variant).
- Shell (new):
  - `src/navigation/routes.ts`: `Route`, `TabId`, `LockedContent`, `PaywallSource` types.
  - `src/navigation/Nav.tsx`: `NavProvider` and `useNav()`.
  - `src/navigation/RootNavigator.tsx`: renders stacks, sheet overlay and TabBar.
  - `src/navigation/screens.ts`: `Route['name']` → component registry.
  - `src/App.tsx` changes to `<NavProvider><RootNavigator/></NavProvider>`.
- Components:
  - `src/components/TabBar/`, `HeroVideoCard/`, `UpgradeBanner/`, `Tile/`, `LockBadge/`, `ProBadge/`.
  - Plus new candidates: `WeekStrip/`, `IconButton/`, `Avatar/`, `Pill/`, `Icon/`, `Art/`, `SectionHeader/`, `Skeleton/`.
- Data:
  - `src/types/content.ts`, `src/types/home.ts`.
  - `src/api/home.ts`, `src/api/cache.ts`, `src/api/mock/home.ts`.
  - `src/hooks/useQuery.ts`, `src/hooks/useEntitlement.ts`.
  - `src/utils/analytics.ts`, `src/utils/press.ts`.
  - `src/i18n/strings.ts`, `src/i18n/useT.ts`.
- Import style: `import { TabBar } from "@/components/TabBar/TabBar.tsx";` (named exports, extension included).

## 4. Layout tree

```
<view class="home">                                  flex col, bg var(--bg), height 100%
  <scroll-view class="home-scroll" scroll-orientation="vertical">   padding 0 20px, padding-bottom = tabbar 86 + 16
    <view class="home-header">                       row between, padding 4px 0 16px
      <Avatar initials size=40 tone="ember"/>         radius 999, var(--ember-grad)
      <view class="home-hello">
        <text class="home-hello-cap">                 13 / var(--muted)
        <text class="home-hello-name">                17 / 600 / var(--text)
      <view class="home-header-actions">              row gap 8
        <Pill tone="soft" size="md" icon="flame" iconTone="ember" label="5"/>   36h, var(--surface-3), 14/600
        <IconButton icon="bell" shape="round"/>        40, var(--surface-2), border 1px var(--line)
    <WeekStrip days=[7]/>                            row between
      .wd: col, gap 6, label 12 var(--dim)
      .wd-c: 38 circle, 14/600; done: bg/border var(--ember), check var(--on-ember)
             today: border 2px var(--ember), transparent, var(--text)
             rest: var(--dim) on var(--surface-2)   scheduled: var(--muted) on var(--surface-2)
    <HeroVideoCard class="mt20">                     height 300, radius var(--radius-hero) 28
      <Art variant="v1" figure="lunge"/>             radial ember art + bottom scrim var(--art-scrim)
      tl: <Pill tone="ember">Today</Pill><Pill tone="glass">Week 1 · Day 3</Pill>   24h, 12/600, gap 6, inset 10
      tr: <IconButton icon="download" variant="glass" size=40/> (+ <ProBadge mini/> if free)
      bl (inset 16): <text 22/700 var(--on-art)>  meta row 13 var(--on-art-muted) gap 12
           <Button variant="light" height=48 icon="play" label="Start workout"/>   bg var(--text), label var(--on-light)
    <UpgradeBanner class="mt16"/>                    free only; radius 22, padding 16, gap 14
      bg var(--gold-banner-grad), border 1px var(--gold-line)
      crown tile 34, radius var(--radius-chip) 10, bg var(--gold), icon var(--on-gold)
      title 15/600 var(--text); sub 13 var(--muted); chevron var(--gold)
    <SectionHeader title="Continue watching" action="See all"/>   margin 24 0 12; action 13/600 var(--ember)
    <scroll-view scroll-orientation="horizontal" class="hscroll">  margin-right -20, gap 12
      <Tile w=160 h=200 radius=16 progress={0.6} locked?/>       meter 4h track var(--surface-3), fill var(--ember-grad)
  <TabBar active="home"/>                            rendered by RootNavigator, not Home
```

- Fonts: headings Inter Display, UI Inter. Type sizes 30/22/17/15/13/11, plus 12/14/16 as in the mockup.
- Lynx: wrap every string in `<text>`. Set `display:flex` explicitly. Don't use `backdrop-filter` (unsupported); use `var(--glass)` translucent fill. Drop the art grid overlay `mask-image`, or ship it as an image asset.
- **Tokens to add to `src/theme/tokens.css`** (hex only lives there):
  - Lines: `--line`, `--line-strong`.
  - Ember: `--ember-2`, `--ember-soft`, `--ember-grad`.
  - Gold: `--gold-soft`, `--gold-line`, `--gold-banner-grad`.
  - On-colors: `--on-ember`, `--on-light`, `--on-gold`, `--on-art`, `--on-art-muted`.
  - Art: `--glass`, `--art-scrim`, `--art-v1..v4`, `--art-dark`.
  - Avatars: `--avatar-ember`, `--avatar-warm`, `--avatar-brown`.
  - Layout: `--tabbar-bg`, `--tabbar-h: 86px`.

## 5. Components

- **Button** (exists): add a `light` variant (bg `--text`, label `--on-light`), plus optional `icon`, `height` and `fullWidth`. Keep its main-thread press feedback.
- **HeroVideoCard** (new, canonical): props `{art, pills[], title, meta[], cta, onOpen, onCta, onDownload, downloadLocked}`.
- **UpgradeBanner** (new, canonical): props `{title, subtitle, onTap}`. Gold is allowed here, because it is a Premium touchpoint.
- **Tile** (new, canonical): props `{art, title?, caption?, badge?, locked?, progress?, width, height, onTap}`. Reused by Library.
- **LockBadge** (new, canonical): 30px dark circle with a gold lock. It also has an `inline` variant, which Program uses.
- **ProBadge** (new, canonical): gold `PRO` pill 22h. The `mini` variant sits on icon buttons.
- **TabBar** (new, canonical): props `{active: TabId, onSelect(tab)}`, 5 items.
- **WeekStrip** (new, screen-local candidate): it is not `DayPicker`. DayPicker is a quiz multi-select, while this is status display. Props `{days: {id, label, num, state:'done'|'today'|'scheduled'|'rest', sessionId?}[]}`.
- **IconButton** (new, screen-local candidate): props `round|square`, `default|glass`, size and icon. Used on 10–13.
- **Avatar** (new, screen-local candidate): initials, size 28/40/56/84, tone.
- **Pill** (new, screen-local candidate): non-interactive 24h label. Tones `ember|glass|soft`. It is not the interactive filter `Chip`.
- **Icon** (new, screen-local candidate): `<svg content={ICONS[name]} current-color=…/>` from `src/components/Icon/icons.ts`.
- **Art** (new, screen-local candidate): thumbnail placeholder (gradient + figure `<image>`). When real stills ship, it takes a `src`.
- **SectionHeader** (new, screen-local candidate): title plus an optional ember link.
- **Skeleton** (new, screen-local candidate): shimmer-free surface-2 blocks.

## 6. State and data (background thread)

- Types, `src/types/content.ts`, following Coach → Program → Week → Session → Exercise:
  - `Coach {id, name, initials, specialty}`.
  - `Program {id, title, coachId, weeks: Week[], daysPerWeek, sessionMin, level, premium, tags[]}`.
  - `Week {index, sessions: Session[]}`.
  - `Session {id, programId, weekIndex, dayIndex, title, durationMin, exerciseCount, setCount, equipment[], exercises?: Exercise[]}`.
  - `Exercise {id, name, kind:'follow_along'|'sets', durationSec?, sets?, reps?, perSide?, swappedFrom?, demoUrl, videoUrl}`.
  - Migrate `types/workout.ts`: keep `export type Workout = Session` as a temporary alias, and move `api/workouts.ts` to `api/sessions.ts`.
- `src/types/home.ts`: `HomeFeed {user:{firstName, initials}, streakDays, week: WeekDay[], today: {session: SessionSummary, coachName} | null, continueWatching: TileItem[]}`.
- `src/api/home.ts`: `getHome(): Promise<HomeFeed>` uses `request("/home")`. If `USE_MOCKS` (exported from `client.ts`) is set, it returns `mock/home.ts` data, matching the PNG copy exactly.
- `src/api/cache.ts`: in-memory `cached(key, ttlMs, fn)` with stale-while-revalidate. Persistence across cold start uses a native storage module (open question).
- `src/hooks/useQuery.ts`: `useQuery(key, fn)` returns `{data, error, loading, refetch}`. It is built on `useAsync` plus the cache. Keep `useAsync` for one-offs.
- `src/hooks/useEntitlement.ts`: `{premium: boolean, ownedPrograms: string[]}` from `api/entitlements.ts` (RevenueCat later; mock now).
- Screen state: `useQuery('home', getHome)` and `useEntitlement()`.
  - `greetingKey` is computed once per mount from `new Date()`.
  - Derived view models (meta strings, week day states) are built in `useMemo`.
- Refetch when the Home tab regains focus (`useFocusEffect` from `Nav.tsx`) and after `workout_completed`.

## 7. Threading (AGENTS.md)

- Main thread:
  - Press feedback on IconButton, Tile, HeroVideoCard, UpgradeBanner, WeekStrip days and TabBar items.
  - These use `main-thread:bindtouchstart/end/cancel` → `setStyleProperty('opacity'|'transform')`, the same as Button.
  - Shared worklets `pressIn`/`pressOut` live in `src/utils/press.ts`. If the compiler rejects imported worklets, inline them per component as Button does.
- Main thread, carousel: Continue watching is a native horizontal `<scroll-view>`. No JS per frame, and no scroll handlers.
- Main thread, optional header shadow: `main-thread:bindscroll` on the vertical scroll-view toggles header-border opacity once `scrollTop > threshold`.
  - `threshold = 8` is a captured number.
  - The last state is kept in `useMainThreadRef<boolean>` so `setStyleProperty` is called only on change.
  - No `runOnBackground` from scroll.
- Background thread: data fetch, cache, greeting, week-state derivation, meta string formatting, entitlement checks, navigation and analytics.
- Taps use background `bindtap` with IDs only (`sessionId`, `programId`). Never capture `HomeFeed` objects in main-thread handlers.

## 8. Premium gating

- `UpgradeBanner` renders only when `!premium`. Tap → paywall `source:'home_banner'`.
- Hero download: free → `ProBadge mini` on the button, and a tap → 19-locked `{kind:'feature', feature:'download'}`. Premium → download.
- Continue-watching tiles from a premium program the user doesn't own show `LockBadge`. Tap → 19-locked `{kind:'program', id}`.
- The hero is always Week 1 for free users, so it is never locked. If a free user's plan has advanced past Week 1, the hero becomes the upgrade state: copy `Week 2 is ready`, with the CTA going to 19.

## 9. Analytics (plan.md §7)

- `paywall_viewed {source:'home_banner'}`: the Paywall screen fires it on mount, from route params. Home only passes `source`.
- `lock_tapped {content:'feature:download'|'program:<id>'}` on hero download (free) and on locked tiles.
- `workout_started {sessionId, source:'home_hero'|'continue'}`: Player fires it on first play. Home passes `source`.
- No new events invented. `src/utils/analytics.ts` exports `track(name, props)`, which is background-only and batched.

## 10. Edge cases

- Loading: a Skeleton for the header (avatar plus 2 lines), 7 circles, a 300h hero block, a 76h banner and 2 tiles. No spinners.
- Error with no cache: an inline card "Couldn't load today" with a ghost `Retry` Button. Error with cache: show the cache plus a small "Offline" pill in the header.
- Empty:
  - No plan yet: the hero becomes a "Build your plan" card that routes to the quiz (02).
  - Rest day today: the hero shows the next session with a `Tomorrow` pill instead of `Today`.
  - `continueWatching=[]`: hide the section.
  - Streak 0: the pill shows `0`, with the flame in `--dim`.
- Offline/downloads: the hero shows a downloaded check if the session is local. Offline, only downloaded tiles are tappable; the rest are dimmed to 0.4 opacity.
- i18n EN/HI:
  - Every string goes through `t()` (`home.greeting.evening`, `home.banner.title` with `{from:2, to:8}`, and so on).
  - Hindi strings run longer, so the meta row wraps (`flex-wrap`), and the banner title has `text-maxline=2`.
  - Numbers use Latin digits. Program and session titles come localized from the API (`?lang=`).

## 10b. App shell: TabBar and navigation (whole app)

- No router dependency. A tiny background-thread navigator:
  - `routes.ts`:
    - `TabId = 'home'|'library'|'progress'|'challenges'|'profile'`.
    - `Route` is a discriminated union of the screens: `welcome|quiz{step}|building|planPreview|signup|paywall{source}|home|library{filter?}|program{programId, weekIndex?}|workout{sessionId}|player{sessionId, resumeAtSec?, source}|restLog|complete{sessionId}|progress|challenges|locked{content}|coach{coachId}|formCheck|profile|winback`.
    - Params are JSON-serializable IDs only.
  - `Nav.tsx`:
    - `NavState = {root:'onboarding'|'main', tab: TabId, stacks: Record<TabId, Route[]>, onboarding: Route[], sheet: Route|null}`.
    - `useNav()` returns `{push, pop, replace, reset, switchTab, openSheet, closeSheet}`.
    - `useRoute<T>()`, plus `useFocusEffect(cb)`, which runs when the route becomes the top of the active stack.
  - `RootNavigator.tsx`:
    - Renders the top route of each visited tab stack. Inactive tabs stay mounted with `display:none`, which keeps scroll and state.
    - Full-screen pushed routes (program, workout, player, …) render over the tab content. TabBar shows only when the active stack depth is 1 (12 and 13 have no TabBar in the PNGs).
    - `sheet` (19-locked) renders above everything with a scrim.
  - `screens.ts`: `Record<Route['name'], ComponentType>`.
  - Screen enter/exit uses CSS `transition: transform 220ms` on a class toggle, with no per-frame JS.
- Tab reselect pops that stack to root. Switching tabs never clears stacks.
- Android hardware back: `pop()`, or `closeSheet()` when a sheet is open. This needs a host `GlobalEventEmitter` event (open question).
- Root choice: `onboarding` until an account exists. 09-paywall close/subscribe calls `reset({root:'main', tab:'home'})`.

## 11. Implementation steps

1. [ ] Tokens: add the §4 tokens to `tokens.css`. Check gradients and `gap` with the `lynx-check-css-support` skill. Accept: no hex outside `tokens.css` (`grep -rn "#[0-9a-fA-F]\{3,6\}" src --include=*.css` hits only tokens.css).
2. [ ] Types and API: add `types/content.ts`, `types/home.ts`, `api/home.ts`, `api/mock/home.ts`, `api/cache.ts`, `hooks/useQuery.ts`, `hooks/useEntitlement.ts` and `utils/analytics.ts`. Accept: mocks return the PNG copy.
3. [ ] i18n: `src/i18n/strings.ts` (en, hi) and `useT()`. Fix the `greeting()` typo and return keys. Accept: switching the locale flips Home copy.
4. [ ] Navigation: routes, Nav, RootNavigator and screens registry. `App.tsx` uses it. Accept: push/pop/switchTab work, and stacks persist across tab switches.
5. [ ] Shared primitives: `utils/press.ts`, Icon, IconButton, Avatar, Pill, Art, SectionHeader, Skeleton. Button `light` variant. Accept: press feedback runs on the main thread only.
6. [ ] TabBar: 5 tabs, ember active state, 86h, wired to `switchTab`. Accept: it matches the PNG and hides on pushed routes.
7. [ ] WeekStrip, HeroVideoCard, UpgradeBanner, Tile, LockBadge and ProBadge. Accept: all 4 day states render as in the PNG.
8. [ ] Rewrite the Home body as in §4. Accept: it matches the PNG side by side at 390w, and the free/premium toggle shows/hides the banner.
9. [ ] Wire exits (§2), gating (§8) and analytics (§9). Accept: every tap routes correctly, and lock taps open 19 with the right `content`.
10. [ ] Loading, error, empty and offline states (§10). Accept: each can be forced from the mock.
11. [ ] `npx tsc -p .` passes with 0 errors.

## Open questions

- PNG `Start workout`: should it go straight to the player (14), or to the overview (13)? Planned: the button goes to 14, and the card body goes to 13.
- Persistent cache and downloads need native modules (storage, file download). Which host modules are available?
- The Android back event bridge from the host app is not yet present.
