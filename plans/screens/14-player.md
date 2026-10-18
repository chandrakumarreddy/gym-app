# 14 · Video player

Spec: plan.md §3 (14), §4 Video player row, §7 Video. Mockup: `mockups/png/14-player.png`, `mockups/screens/14-player.html`.
This plan also owns the **shared workout-session store** (§6), which 13, 15 and 16 use.

## 1. Visual inventory (top → bottom)

**Video area** (top ~62% of screen, runs under the status bar, bottom corners rounded, ember-gradient placeholder with a faint grid and the lunge pictogram where the HLS video will go)
- Status bar 9:41 drawn over the video.
- Top row: round glass button with a chevron-down icon (left), title "Lower Hypertrophy" (15/600, centered, white), round glass button with a cast icon (right).
- Top right: big timer "00:42" (display ~40px, bold, tabular), caption "set time" under it (13, white 80%).
- Left, below the title: CoachCue pill. It's a dark glass rounded rect holding the "AM" ember avatar (28px) and the text "Drive through the front heel" (14).
- Bottom-left overlay: "Exercise 2 of 6" (13, white 80%), then "Reverse lunge" (h2 22/700).
- Bottom-right overlay: "10" (display 28, bold), then "reps / leg" (13, white 80%).
- Scrubber: 4px track (white 25%), ember fill at about 46%, 14px white round knob at the fill end.
- Under the scrubber: "0:42" on the left and "1:30" on the right (11, white 70%).

**Below the video** (bg `--bg`)
- Row: "Set 2 of 3" (13, muted) on the left. SetDots on the right: 3 pills of 26×6. The first is ember (done), the second is ember-2 at 55% (current), the third is surface-3 (todo).
- PlayerControls row, centered with gaps of 28: "1.0×" (15/700, muted), prev-track icon (28), a 72px ember-gradient circle with a pause icon (30) and an ember glow, next-track icon (28), CC icon (24, muted).
- Up-next card: a surface card with radius 22 and a 1px line border. It holds a 52px dark art thumbnail (deadlift pictogram), "UP NEXT · after 60s rest" (11, dim, uppercase lead-in), "Romanian deadlift" (15/700) and a chevron-right (muted).
- Home indicator. There is no tab bar (the screen is full-screen).

State shown: playing (the pause glyph is visible), 1.0× speed, captions off, set 2 of 3 in progress, a free or premium user (no lock badges are drawn; see §8).

## 2. Purpose, entry/exit

- Purpose: a follow-along coach video for the current set, with a set timer, set counter, coach cue and what's up next.
- Route `player`. Params: `{ sessionId: string }`. The session is created by 13 (`startSession`) or restored by resume.
- Entry:
  - 13-workout "Start workout" → `navigate("player", { sessionId })`.
  - 10-home resume card or a cold-start resume → same route.
  - 15 "Save & continue" (not the last set) or chevron-down → collapse the rest overlay back to the player.
- Exit:
  - When the set segment ends, or on manual "next" during the last rep, call `session.completeSet()`. This opens 15-rest-log as an **overlay layer on the same route**, so the native video is not unmounted and keeps playing the rest and next-exercise segment ("the video never has to stop").
  - After the last set of the last exercise, 15 "Save & continue" → `replace("complete", { sessionId })`.
  - Chevron-down calls `session.pause()` and persists, then `back()` to 13. 13 shows "Resume".
  - Premium actions without the entitlement → `navigate("paywall", { source })` (see §8).
- Decision: `PlayerRoute` hosts `Player` (14) and `RestLog` (15) as stacked layers. 15 is a separate screen folder but is rendered inside the player route.

## 3. Files

- `src/screens/Player/Player.tsx`, `Player.css`. Exports `Player` and `PlayerRoute` (the route host that mounts `RestLog` from `@/screens/RestLog/RestLog.tsx` as an overlay when `phase === "resting"`).
- New components (each in its own folder with `.tsx` and `.css`):
  - `src/components/PlayerControls/`
  - `src/components/SetDots/`
  - `src/components/CoachCue/`
  - `src/components/ScreenHeader/`. Shared. Needs an `overlay` (glass) variant here; other plans may create it first.
  - `src/components/HlsVideo/` (new, screen-local candidate; 13's hero preview may reuse it): a typed wrapper around the native `<fitcue-video>` element.
  - `src/components/Scrubber/` (new, screen-local candidate)
  - `src/components/UpNextCard/` (new, screen-local candidate). Built on the same markup as ListRow. If ListRow lands with `thumb` and `eyebrow` slots, use `ListRow` instead.
  - `src/components/IconButton/` (new, screen-local candidate): a 40px round button with `glass | solid` variants and main-thread press feedback copied from Button.
- Store and data (shared with 13, 15, 16, 17):
  - `src/store/workoutSession.ts`: the session store (§6).
  - `src/hooks/useWorkoutSession.ts`: a selector hook.
  - `src/types/session.ts`
  - Extend `src/types/workout.ts`.
  - `src/api/sessions.ts`, `src/api/playback.ts`
  - `src/api/mocks/session.mock.ts`
  - `src/utils/session.ts`: pure selectors, summary and PR detection.
  - `src/utils/format.ts`: add `formatClock`.
  - `src/native/video.ts`, `src/native/device.ts`: background-only NativeModule wrappers.
- Imports use named exports and include the extension, for example `import { PlayerControls } from "@/components/PlayerControls/PlayerControls.tsx";`.

## 4. Layout tree

Tokens to add to `src/theme/tokens.css` if they're missing (shared with the 17 plan): `--line`, `--line-strong`, `--ember-2`, `--ember-soft`, `--ember-grad`, `--green-soft`, `--gold-soft`, plus player-specific `--on-video` (white), `--on-video-muted` (white 80%), `--on-video-dim` (white 70%), `--scrub-track` (white 25%), `--glass` (black 35%), `--glass-strong` (black 55%), `--glass-line` (white 12%) and `--ember-glow` (for box-shadow). Don't use hex in any CSS file.

```
view.player                         bg var(--bg); flex column; height 100%
├ view.player-stage                 height 62vh (520/844); position relative; overflow hidden;
│                                   border-radius 0 0 var(--radius-hero) var(--radius-hero); bg var(--ember-grad) (placeholder)
│ ├ HlsVideo.player-video           position absolute; inset 0; object-fit cover (native attr `fit="cover"`)
│ ├ view.player-scrim               absolute bottom gradient (transparent → var(--glass-strong)) for legibility; also a top scrim
│ ├ ScreenHeader variant=overlay    absolute top: env(safe-area-inset-top)+4px; left/right 20px; row space-between
│ │  ├ IconButton glass icon=chev-down (40, radius 999, bg var(--glass), border 1px var(--glass-line))
│ │  ├ text.player-title "Lower Hypertrophy"  15/600 var(--on-video), ellipsis, max 60vw
│ │  └ IconButton glass icon=cast  (+ ProBadge dot when !premium? — no, mockup shows none; see §8)
│ ├ view.player-settime             absolute top 118px right 20px; align end
│ │  ├ text.player-settime-value "00:42"   40px/800 Inter Display, line-height 1, var(--on-video)
│ │  └ text.player-settime-cap "set time"  13 var(--on-video-muted)
│ ├ CoachCue                        absolute top 190px left 20px; max-width calc(100% - 40px)
│ │                                 bg var(--glass-strong); border 1px var(--glass-line); radius 14px; padding 10/12; gap 10
│ │                                 avatar 28px var(--ember-grad) "AM" 11/700; text 14 var(--on-video)
│ ├ HlsVideo buffering spinner      centered, only while buffering
│ └ view.player-info                absolute left/right 20px bottom 20px
│    ├ view.row-between
│    │  ├ view: text.cap "Exercise 2 of 6" (13 var(--on-video-muted)) / text.h2 "Reverse lunge" (22/700 var(--on-video))
│    │  └ view.align-end: text "10" (28/800 display) / text.cap "reps / leg"
│    ├ Scrubber (mt16)              track h4 radius 2 bg var(--scrub-track); fill bg var(--ember) (scaleX, origin left);
│    │                              knob 14×14 radius 999 bg var(--on-video), translateX; hit area 32px tall
│    └ view.row-between.mt8: text "0:42" / text "1:30"   11 var(--on-video-dim)
└ view.player-body                  padding 16px 20px 0
   ├ view.row-between: text.cap "Set 2 of 3" (13 var(--muted)) | SetDots total=3 done=1 current=1
   ├ PlayerControls (mt16)          row center gap 28
   │  ├ view.speed  text "1.0×" 15/700 var(--muted)           (premium gate)
   │  ├ IconButton bare icon=prev 28 var(--text)
   │  ├ view.play   72×72 radius 999 bg var(--ember-grad), box-shadow var(--ember-glow); icon pause/play 30 var(--text)
   │  ├ IconButton bare icon=next 28 var(--text)
   │  └ IconButton bare icon=cc 24 var(--muted) / var(--ember) when on
   └ UpNextCard (mt20)              bg var(--surface); border 1px var(--line); radius var(--radius-card); padding 12; row gap 12
      ├ image thumb 52×52 radius 14 (bg var(--surface-2) fallback)
      ├ view.grow: text "UP NEXT · after 60s rest" 11 var(--dim) / text "Romanian deadlift" 15/700 var(--text)
      └ icon chev-right 20 var(--muted)
```

- Icons: use the SVG icon set via `<svg content=…>` (see the lynx-api-docs `elements/svg.md`). Use the same icon names as the mockup (`chev-d`, `cast`, `prev`, `pause`, `play`, `next`, `cc`, `chev-r`).
- Don't use `::before` or `::after`, which Lynx doesn't support. Scrims are real `<view>` elements.
- Numbers use `font-variant-numeric: tabular-nums` if it's supported. If it isn't, give the value a fixed width so the timer doesn't jitter.

## 5. Components

| Element | Component | Status |
|---|---|---|
| Top bar | ScreenHeader (`variant="overlay"`, `left`/`title`/`right` slots) | shared, create or extend |
| Round buttons | IconButton | (new, screen-local candidate) |
| Coach cue pill | CoachCue `{ initials, text, speaking? }` | shared, create |
| Video | HlsVideo | (new, screen-local candidate) |
| Progress bar | Scrubber | (new, screen-local candidate) |
| Set pills | SetDots `{ total, done, current }` | shared, create (15 reuses it in the header if needed) |
| Speed/prev/play/next/CC | PlayerControls `{ playing, speedLabel, captionsOn, onSpeed, onPrev, onToggle, onNext, onCaptions, speedLocked }` | shared, create |
| Up next | UpNextCard (or ListRow) | (new, screen-local candidate) |
| Premium hints | LockBadge / ProBadge (small, on speed and cast when free; see §8) | shared |
| Up-next queue | BottomSheet | shared |

## 6. State and data — shared workout-session store

**Types**: `src/types/session.ts`. Extend `src/types/workout.ts`.

```ts
// workout.ts additions
Exercise += { sets: number; reps: number; repsUnit: "reps" | "reps_per_leg" | "sec";
              restSec: number; segmentSec: number; thumbUrl: string;
              coach: { id: string; initials: string; name: string };
              cues: { atSec: number; text: Record<Locale, string>; audioUrl?: string }[];
              captions: Partial<Record<Locale, string>>; // VTT urls
              equipment: "dumbbell" | "barbell" | "machine" | "bodyweight" | "band" | "kettlebell";
              weightStepKg: number; swappedFrom?: string }
Workout += { programId: string; programTitle: string; week: number; day: number }

// session.ts
export type Locale = "en" | "hi";
export type Effort = "easy" | "just_right" | "hard" | "max";
export type Feel = "too_easy" | "just_right" | "too_hard";
export type SessionPhase = "loading" | "playing" | "paused" | "buffering" | "resting" | "complete";
export type SetLog = { exerciseId: string; setIndex: number; weightKg: number; reps: number;
                       effort: Effort; loggedAt: number; synced: boolean };
export type RestState = { startedAt: number; endsAt: number; durationSec: number } | null;
export type PersonalRecord = { exerciseId: string; exerciseName: string; weightKg: number; reps: number; achievedAt: number };
export type WorkoutSession = {
  id: string; workoutId: string; workout: Workout;          // workout snapshot so resume works offline
  startedAt: number; activeMs: number; lastResumedAt: number | null;
  exerciseIndex: number; setIndex: number; positionSec: number;
  phase: SessionPhase; rest: RestState;
  speed: 0.75 | 1 | 1.25 | 1.5; captions: boolean; voiceCues: boolean;
  logs: SetLog[]; feel?: Feel; completedAt?: number;
};
export type SessionSummary = { activeSec: number; volumeKg: number; setsDone: number; setsTotal: number;
                               streakDays: number; newPRs: PersonalRecord[] };
```

**Store**: `src/store/workoutSession.ts`. It's a plain module singleton on the background thread with no library.
- `getState()`, `subscribe(fn) → unsubscribe`. Notifications are synchronous after each action.
- Actions:
  - `start(workout)`
  - `restore(saved)`
  - `play()`, `pause()`, `setBuffering(b)`
  - `syncPosition(sec)`: called only on pause, scrub end, background and set end, never per frame.
  - `setSpeed(s)`, `toggleCaptions()`, `toggleVoice()`
  - `completeSet()`: sets `phase="resting"` and `rest={startedAt, endsAt: now+restSec*1000}`.
  - `extendRest(15)`, `skipRest()`
  - `logSet({weightKg, reps, effort})`: upserts by `(exerciseId, setIndex)`.
  - `advance()`: next set, or next exercise with `positionSec=0`, or `phase="complete"`.
  - `prev()`, `jumpTo(exerciseIndex)`
  - `setFeel(f)`
  - `finish() → Promise<SessionSummary>`
  - `discard()`
- `activeMs` accrues only while `playing` or `resting`. Compute it as `now - lastResumedAt` at each phase change, without a ticking timer.
- Hook: `src/hooks/useWorkoutSession.ts`. `useWorkoutSession(selector)` subscribes in `useEffect` and calls `setState` only when the selected slice changes (shallow compare). Selectors live in `src/utils/session.ts`: `currentExercise`, `nextExercise`, `setLabel`, `upNextLabel`, `lastLogFor(exerciseId)`, `summarize(session, prevPRs, streak)` and `detectPRs(logs, prevPRs)`.
- Persistence:
  - `persist()` writes the session JSON through `src/native/storage.ts`, a background-only wrapper over the native KV module (see the open question in §10).
  - Key `session.active`. Save on every action except `syncPosition`, which is debounced to the next action, `pause` or `background`.
  - Clear it on `finish()` success or `discard()`.
  - Unsynced `SetLog`s go to the `sync.queue` key and flush on reconnect.
- API (`src/api/sessions.ts`, using `request` from `client.ts`):
  - `startSession(workoutId) → { sessionId }`
  - `logSet(sessionId, SetLog)`: idempotent on `(exerciseId,setIndex)`
  - `completeSession(sessionId, { activeSec, logs, feel }) → { streakDays, newPRs, nextPlanAdjusted }`
  - `getLastLog(exerciseId) → SetLog | null`
  - `getNextWeight(exerciseId, setIndex) → { weightKg, reps }`: Premium only.
  - `getPersonalRecords()` (shared with 17).
- `src/api/playback.ts`: `getPlaybackUrl(exerciseId) → { hlsUrl, expiresAt }`. It returns a signed, short-lived URL (plan.md §7). Refetch it on 401/403 or when it's within 60s of expiry.
- Mocks: `src/api/mocks/session.mock.ts` has the Lower Hypertrophy W1D3 fixture (6 exercises, 18 sets, Reverse lunge 3×10/leg, 90s segment, 60s rest, cue "Drive through the front heel" at 0s, AM coach) and a public test HLS URL. Toggle it with `USE_MOCKS` in `client.ts`.
- Screen-local background state in Player:
  - `setTimeLabel`, `elapsedLabel`, `durationLabel`: 1 Hz.
  - `cueIndex`: changes only at cue boundaries.
  - `trackWidthPx`: from `bindlayoutchange`.
  - `upNextOpen`.

## 7. Threading (AGENTS.md)

- **Video**: use the native custom element `<fitcue-video>`, because Lynx has no built-in video element (it isn't in the lynx-api-docs element list). Register it in `android/` (Media3 ExoPlayer, HLS) and `ios/` (AVPlayer) as a Lynx custom UI.
  - Attributes: `src`, `paused`, `rate`, `muted`, `start-time`, `captions-src`, `captions-visible`, `fit`, `poster`.
  - Events:
    - `bindready {duration}`
    - `bindbuffering {buffering}`
    - `bindsecond {sec}`: fires once per whole second. Background thread.
    - `bindended`
    - `binderror {code}`
    - `main-thread:bindprogress {currentTime, duration}`: fires about once per vsync, on the main thread only.
  - UI methods: `invoke("seek", {time})`, `invoke("play")`, `invoke("pause")`.
  - `HlsVideo` exposes these as props. React state drives `paused` and `rate` only on user taps.
- **Native modules** (background only, wrapped in `src/native/*.ts`):
  - `FitCueCast` (show route picker, cast `{hlsUrl, positionSec}`)
  - `FitCueDevice` (keepAwake on/off, haptic(kind), share(text,url), scheduleLocalNotification)
  - `FitCueAudio` (play coach voice cue clip, duck video)
  - `FitCueStorage` (get/set/remove)
  - Never call these during render. Call them from effects and `bind*` handlers only.
- **Scrubber and progress (main thread)**:
  - `fillRef` and `knobRef` are `useMainThreadRef<MainThread.Element>()`.
  - `draggingRef = useMainThreadRef(false)`.
  - `onProgress(e)`:
    ```
    "main thread"
    if (draggingRef.current) return
    r = e.detail.currentTime / e.detail.duration
    fillRef.current.setStyleProperty("transform", `scaleX(${r})`)
    knobRef.current.setStyleProperty("transform", `translateX(${r * trackW}px)`)
    ```
    There's no `setState`.
  - `trackW` is a captured number, precomputed on the background thread from `bindlayoutchange` on the track.
  - Scrub gesture on the track uses `main-thread:bindtouchstart`, `bindtouchmove` and `bindtouchend`. Start and move set `draggingRef` and the knob and fill transforms from `e.touches[0].clientX - trackLeft` (clamped, where `trackLeft` is a captured precomputed number). End calls `videoRef.current.invoke("seek", {time: r*duration})` and runs `runOnBackground(onScrubEnd)(r)` **once**, which calls `session.syncPosition` and analytics.
  - The time labels "0:42" and "1:30" and the set-time "00:42" update from the background `bindsecond` event (1 Hz `setState` with `formatClock` on the background thread). This is not per frame.
  - During a drag, the elapsed label shows the last second until release. That's accepted, to avoid formatting on the main thread.
- **Press feedback**: IconButton, the play button, speed and CC use the Button pattern, `main-thread:bindtouchstart` and `bindtouchend`/`cancel` → `setStyleProperty("opacity","0.7")` and `"transform","scale(0.94)"`. Logic runs in a normal `bindtap`.
- **Precomputed captured values** (background → main thread, JSON-serializable numbers only): `trackW`, `trackLeft`, `durationSec`. Don't capture the Workout or the logs.
- **Coach cues**: the background `bindsecond` compares against `cues[].atSec` (a precomputed sorted array of numbers held in background state) and sets `cueIndex`. CoachCue fades in with a CSS transition on `opacity`. With voice on (Premium), it calls `FitCueAudio.play(audioUrl)`.
- **Set end**: `bindended` (or `bindsecond >= segmentSec`) runs on the background thread → `session.completeSet()` → the RestLog overlay mounts. The video keeps playing the rest and next segment, muted to 30% via the `rate`/`muted` attributes.
- **Long work**: building the up-next queue for the BottomSheet is small (fewer than 20 items). No chunking is needed.

## 8. Premium gating

Use `useEntitlement()` from the 09-paywall plan, which returns `{ isPremium }`. Free users see the controls with a small ProBadge or LockBadge, in gold, since gold is only for Premium. Tapping one runs `navigate("paywall", { source })` and fires `lock_tapped {content}`.

| Control | Free | source |
|---|---|---|
| Speed "1.0×" | stays at 1.0×; LockBadge 12px top-right of label | `player_speed` |
| Cast icon | ProBadge dot on IconButton | `player_cast` |
| Coach voice cues (on-screen text cue is free) | tapping the CoachCue avatar or speaker toggles voice; free → paywall | `player_voice_cues` |
| Next-weight suggestion | owned by 15 | `rest_next_weight` |

- Premium users get these behaviors:
  - Speed cycles 0.75 → 1.0 → 1.25 → 1.5. Only the label is shown.
  - Cast opens `FitCueCast.pickRoute()`.
  - Voice toggles `session.toggleVoice()`.
- The mockup shows no badges. A note for design: keep the badges subtle (12px) so the premium layout matches the PNG.

## 9. Analytics (plan.md §7)

- `workout_started {workoutId, programId, week, day, resumed:false}` fires on the first `ready` of a new session. Resuming doesn't send it again, but sends `resumed:true` once per cold resume if the analytics owner agrees.
- `lock_tapped {content: "speed" | "cast" | "voice_cues"}` and then 09 fires `paywall_viewed {source}`.
- These events are proposed and not in plan.md yet, so flag them to the analytics owner: `video_buffering {exerciseId, ms}`, `set_completed`, `player_scrubbed`, `cast_started`.
- All `track()` calls happen on the background thread.

## 10. Edge cases

- **Buffering**: `bindbuffering` → `session.setBuffering(true)`. It shows a centered spinner and freezes the set-time clock (the next `bindsecond` doesn't arrive). If it lasts more than 8s, show a toast "Slow connection — lowering quality" (the player handles ABR itself).
- **Network loss mid-workout**:
  - The video plays its buffer.
  - On `binderror` the video pauses and shows a retry overlay ("You're offline · Retry"), while the logs and rest timer keep working offline.
  - `logSet` calls queue in `sync.queue`.
  - Downloaded sessions (Premium) play local files.
  - A signed URL expiry (403) calls `getPlaybackUrl` again and resumes at `positionSec`.
- **App backgrounding**: subscribe to `lynx.getJSModule("GlobalEventEmitter")` app background and foreground events (verify the event names on Lynx 3.x).
  - On background, pause the video, `syncPosition`, `persist()` and `keepAwake(false)`. While resting, schedule a local notification at `rest.endsAt`.
  - On foreground, `keepAwake(true)`, and the user taps play to resume. There's no autoplay.
- **Resume session**:
  - On app start, if `session.active` exists and is less than 12h old, Home shows the resume card.
  - The player restores `exerciseIndex`, `setIndex` and `positionSec` with `start-time`.
  - If `phase` was `resting`, it recomputes the remaining rest from `endsAt`. If that has already passed, it opens 15 with 0:00.
  - Sessions older than 12h are discarded after a prompt.
- **Captions**:
  - CC toggles `captions-visible`.
  - The track follows the app locale (`hi` falls back to `en` with a toast "Hindi captions coming soon").
  - Captions sit above the scrubber with `bottom` padding so they don't overlap the info block.
  - The state persists in the session.
- **i18n EN/HI**:
  - All copy goes through `t("player.*")`: "Exercise {i} of {n}", "Set {i} of {n}", "set time", "reps / leg", "UP NEXT · after {s}s rest".
  - Exercise names and cues come from the API keyed by locale.
  - Digits stay Latin.
  - Hindi titles are longer: ellipsize the header title and the exercise name at 2 lines.
- **Other**:
  - Screen rotation is locked to portrait.
  - Headphones unplugged → pause.
  - An incoming call → background path.
  - Tapping next on the last set of the last exercise → completeSet → 15 with the CTA "Finish workout".
  - Double taps on play are debounced on the background thread.

## 11. Implementation steps

1. Add the missing tokens to `tokens.css`. Acceptance: `rg -n '#[0-9a-fA-F]{3,8}' src/screens/Player src/components/{PlayerControls,SetDots,CoachCue,Scrubber,UpNextCard,IconButton,HlsVideo}` is empty.
2. Add the types (`session.ts`, the workout extensions), `formatClock` and the `src/utils/session.ts` selectors with pure functions. Acceptance: the mock fixture typechecks, and `summarize` returns 18/18 sets and the correct volume.
3. Build `src/store/workoutSession.ts` and `useWorkoutSession`, plus persistence through `src/native/storage.ts`. Acceptance: start → completeSet → logSet → advance produces the expected indices, and `restore()` round-trips.
4. Add `src/api/sessions.ts`, `playback.ts` and the mocks behind `USE_MOCKS`.
5. Add the native `<fitcue-video>` custom element (Android ExoPlayer and iOS AVPlayer) and `HlsVideo.tsx` with its typings (a JSX intrinsic element declaration in `src/rspeedy-env.d.ts`). Acceptance: the test HLS plays in `bun run dev:android`, and `bindsecond` and `main-thread:bindprogress` fire.
6. Build IconButton, ScreenHeader (overlay), CoachCue, SetDots, PlayerControls, Scrubber and UpNextCard, with main-thread press feedback on every tappable element.
7. Build `Player.tsx` and `PlayerRoute` with the layout from §4, wire everything to the store, and drive the scrubber on the main thread. Acceptance: a trace shows no React commits while playing, except about one per second.
8. Wire set end → `completeSet` → overlay 15. Chevron-down → pause, persist, back.
9. Add the premium gates in §8 and the paywall navigation with `source`.
10. Add the edge cases in §10: buffering, offline, backgrounding, resume, captions and `t()` strings EN/HI.
11. Add analytics `workout_started` and `lock_tapped`.
12. Do a visual pass against `14-player.png` on device.
13. Run `npx tsc -p .` with zero errors.
