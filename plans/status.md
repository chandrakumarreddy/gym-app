# Status

Updated: 2026-10-18

## Summary

- All 23 screens implemented (`src/screens/*`), built on the shared foundation (`plans/FOUNDATION.md`).
- `npx tsc -p .`: 0 errors.
- `rspeedy build`: web and lynx bundles OK.
- Rule checks clean:
  - No hex colors outside `src/theme/tokens.css`.
  - No `useLayoutEffect`.
  - No stub screens.
- Device (Android): runs, no crash in logcat.
  - Welcome verified against its mockup.
  - Plan Preview spot-checked against its mockup.
  - The other screens have not been checked on device yet.

## Screens

Every screen below is marked Done (code complete, typecheck and build pass). The device column says whether it has been checked on the phone.

| # | Plan | Screen | Device |
|---|------|--------|--------|
| 01 | [welcome](screens/01-welcome.md) | `Welcome` | Verified |
| 02 | [goal](screens/02-goal.md) | `QuizGoal` | Not yet |
| 03 | [experience](screens/03-experience.md) | `QuizExperience` | Not yet |
| 04 | [schedule](screens/04-schedule.md) | `QuizSchedule` | Not yet |
| 05 | [body](screens/05-body.md) | `QuizBody` | Not yet |
| 06 | [building](screens/06-building.md) | `Building` | Not yet |
| 07 | [plan-preview](screens/07-plan-preview.md) | `PlanPreview` | Spot-checked |
| 08 | [signup](screens/08-signup.md) | `Signup` | Not yet |
| 09 | [paywall](screens/09-paywall.md) | `Paywall` | Not yet |
| 10 | [home](screens/10-home.md) | `Home` | Not yet |
| 11 | [library](screens/11-library.md) | `Library` | Not yet |
| 12 | [program](screens/12-program.md) | `Program` | Not yet |
| 13 | [workout](screens/13-workout.md) | `Workout` | Not yet |
| 14 | [player](screens/14-player.md) | `Player` | Not yet |
| 15 | [rest-log](screens/15-rest-log.md) | `RestLog` (overlay on Player) | Not yet |
| 16 | [complete](screens/16-complete.md) | `Complete` | Not yet |
| 17 | [progress](screens/17-progress.md) | `Progress` | Not yet |
| 18 | [challenges](screens/18-challenges.md) | `Challenges` | Not yet |
| 19 | [locked](screens/19-locked.md) | `LockedSheet` | Not yet |
| 20 | [coach](screens/20-coach.md) | `CoachProfile` | Not yet |
| 21 | [form-check](screens/21-form-check.md) | `FormCheck` | Not yet |
| 22 | [profile](screens/22-profile.md) | `Profile` | Not yet |
| 23 | [winback](screens/23-winback.md) | `WinBack` | Not yet |

## Mocked

- Purchases and auth: mock services. The OTP is `123456`.
- Video: a placeholder driven by a background timer. There is no native player.
- API data comes from `src/api/mock/`.

## Known issues

- `src/utils/format.ts` `greeting()` returns "Good afternoon!" with a stray "!". This is legacy code; Home uses the i18n keys instead.
- One of the implementation agents ran `git checkout -- dist`, which discarded the uncommitted `dist/` changes. The bundles were rebuilt. The dev files under `dist/.lynx/main` and `dist/main` show as deleted until the next dev run.

## Backlog: shared-change requests (not applied)

### Navigation
- Router: a hardware-back hook.
- Router: keep params on tab push.
- Router: new routes for history, records, challenge, friends and coach-apply.

### Native wrappers
- Services: openUrl, toast, notifications and connectivity.
- Native share, haptics and keepAwake.

### Components
- QuizShell: a `count` prop.
- ProgressDots: a continuous bar.
- Video: a main-thread `bindprogress`.
- Stepper and StatCard: a `className` prop. StatCard: an icon next to the value.
- RestRing: a gradient and a `progress` prop.
- PlanSelector: a check radio.
- LockBadge: a gold tone and `catchtap`.
- Tile: a title-below variant.
- New shared components:
  - A neutral Pill.
  - SectionHeader.
  - TextField.
  - OrDivider.
- Toggle: a green variant.
- SettingsRow: an icon tile.
- Countdown: a surface variant.

### Tokens
- Tokens: a safe-area token and `--offer-grad`.

### Data and types
- Move the quiz, unit and planCopy helpers to `src/utils`.
- `useAsync`: retry.
- Types:
  - `CoachProgram` and `Session` need `packProductId`.
  - `HomeFeed` needs dates and sessionIds.
- Purchases:
  - PaywallSource: add `form_check` and `health_lock`.
  - Add `consumeFormCheckCredit`.
  - Add `purchases.onUpdate`.
  - Add `family_annual_addon`.
  - Include the price in purchase analytics.

## Next

1. Walk every screen on the device and compare it with `mockups/png/`.
2. Decide on the backlog items and apply the ones you approve.
3. Answer the open questions in each plan's "Open questions" section.
4. Write `plans/README.md` (an index).
