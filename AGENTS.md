# AGENTS.md

FitCue: a video-first gym app. Spec: `plan.md`. Mockups: `mockups/`.

## Rules

- Stay on ReactLynx. Don't move to vanilla Element PAPI or a custom runtime.
- One folder per screen and per component: `src/screens/<Name>/` and `src/components/<Name>/`, each with `<Name>.tsx` and `<Name>.css`.
- Named exports. Import with `@/…` and include the file extension.
- Colors come from `var(--token)` in `src/theme/tokens.css`, never hex values. `--ember` means action. `--gold` is only for Premium.
- No `useLayoutEffect`.
- Every API-backed region shows a loading skeleton (`@/components/Skeleton/Skeleton.tsx`) while its request is in flight, including retries and param changes. The skeleton matches the final layout's size and position, so nothing shifts when data arrives. Never render `null`, blank space or a spinner in place of content that is loading. Keep static chrome (header, tabs, CTAs) rendered during loading. For lists or optional blocks, size the skeleton with `useSkeletonCount(key, fallback, count)` from `@/hooks/useSkeletonCount.ts`, which remembers the last real count. For text, use `@/components/TextSkeleton/TextSkeleton.tsx`. A failed request shows an error with a Retry button, never the empty state.
- Haptics go through `haptic(kind)` from `@/api/haptics.ts`, called on the background thread (in `bindtap` or an effect), never from a main-thread handler. `Pressable` fires `light` and `Button` fires `medium` by default; override with the `haptic` prop, or pass `haptic={false}` when the screen fires its own. Use `selection` for choices, toggles, tabs and value changes; `heavy` for long-press and destructive actions; `success` for completions, PRs and purchases; `warning` for locked or blocked actions; `error` for failures. Fire once per user action or event, never per frame or scroll tick.

## Threading

- All computation runs on the background thread: state, data fetching, parsing, sorting, filtering, formatting, timers, business logic and native-module calls. That's the default for components, hooks, `bind*` handlers and effects.
- The main thread only renders and handles frame-critical input: gestures, scroll-linked effects, animations and press feedback. See `src/components/Button/Button.tsx`.
- Main-thread handlers (`main-thread:bind*` with `"main thread"` as the first statement) must stay trivial: read the event, then call `setStyleProperty` / `setAttribute`. No loops, parsing, formatting or API calls.
- Precompute on the background thread whatever a main-thread handler needs (thresholds, sizes, strings). Pass it in as small, JSON-serializable captured values.
- Keep main-thread state in `useMainThreadRef`. Never mirror it in React state on every frame.
- Cross threads rarely. Don't call `runOnBackground` or `setState` from high-frequency events (scroll, touchmove). Hand off once, at gesture or scroll end.
- Don't pass large objects or lists across threads, and don't capture them in main-thread handlers. Pass IDs or the few fields that are needed.
- Break up long background work, such as big lists or chunked processing, so it doesn't delay how quickly the UI reacts.

## Commands

- `bun run dev:android`: installs the debug APK, then the app reloads on every rebuild.
- `npx tsc -p .`: typecheck.
