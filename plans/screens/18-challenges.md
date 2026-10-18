# 18 · Challenges

Mockup: `mockups/png/18-challenges.png` · Stage 3 Retain · tab `community` (TabBar label "Challenges").

## 1. Visual inventory (top → bottom)
- Status bar.
- Header row: "Challenges" (30px display bold) left; round icon button with users/friends glyph right.
- Hero challenge card (200px, r 22, ember art gradient + faint grid, push-up figure silhouette, bottom dark fade):
  - Top-left pill "Joined" (ember fill, white text).
  - Top-right pill clock icon + "12 days left" (dark translucent).
  - Bottom: title "October push-up ladder" (22px display bold, white); row "You: 620 / 1,000 reps" left, "62%" right (13px, white 85%); progress meter 8px, track white 20%, fill white 62%.
- Underline tabs: **"Leaderboard"** (active, text color, 2px ember underline) · "Friends" · "Badges" (dim). Full-width hairline below.
- Leaderboard rows (gap 4):
  - `1` · avatar "RV" (gold gradient) · "Riya V." · "1,000".
  - `2` · avatar "DS" (ember gradient) · "Dev S." · "940".
  - `3` · avatar "MK" (dark brown gradient) · "Meera K." · "875".
  - Highlighted "me" row: `14` · avatar "AK" · "You" · "620" — bg ember-soft, 1px ember 40% border, r 14.
- Premium challenge card (gold-tinted border 35%): 56×56 art thumb (stretch figure) · "21-day core with Coach Priya" (15px semibold, wraps 2 lines) · "Starts Monday" (13px muted) · gold PRO badge right.
- TabBar: Home · Library · Progress · **Challenges (active)** · Profile.

## 2. Purpose and entry/exit
- Gives a reason to open on rest days; coach-led challenges are a Premium touchpoint.
- Entry: TabBar; push "You moved up to #14"; 16-complete reps contribute.
- Exit:
  - Friends icon (header) → friends/invite (stub route `friends`, TODO).
  - Hero card tap → challenge detail (stub `challenge` `{ challengeId }`, TODO); "Join" CTA when not joined.
  - Leaderboard row tap → no-op v1.
  - PRO challenge card, free user → `paywall` `{ source: "challenges", contentId: challengeId }`; premium → `challenge` `{ challengeId }`.
- Params: optional `{ challengeId?: string; tab?: "leaderboard"|"friends"|"badges" }` (deep link); default = current monthly challenge.

## 3. Files
- `src/screens/Challenges/Challenges.tsx|.css` — `export function Challenges()`.
- Shared: `src/components/LeaderboardRow/`, `src/components/ProBadge/`, `src/components/TabBar/`, `src/components/Chip/` (used for pills "Joined"/"12 days left"), `src/components/Countdown/` (days-left text mode).
- `src/components/UnderlineTabs/UnderlineTabs.tsx|.css` (new, screen-local candidate; SegmentedControl is pill-style, this is underline-style).
- `src/components/ChallengeHeroCard/ChallengeHeroCard.tsx|.css` (new, screen-local candidate; HeroVideoCard has video/duration semantics, this has meter + pills — could be a HeroVideoCard variant if 10-home owner prefers).
- `src/components/ProgressMeter/ProgressMeter.tsx|.css` (new, screen-local candidate; reused by 07/12 if they need one).
- `src/components/Avatar/Avatar.tsx|.css` (new, screen-local candidate; also needed by 10, 20, 22 — likely promote).
- `src/types/challenge.ts`, `src/api/challenges.ts`, `src/utils/leaderboard.ts`.

## 4. Layout tree
```
<view .challenges>                               bg var(--bg)
  <list .challenges-list scroll-orientation=vertical>   padding 0 20px
    header item:
      <view .challenges-head> row between; pad 4px 0 14px
        <text .challenges-title>Challenges        30px bold var(--text)
        <view .icon-btn-round> users icon          40×40 var(--surface-2) border var(--line)
      <ChallengeHeroCard>                          h 200; r var(--radius-card); bg var(--ember-grad) + art image
        <Chip tone="ember">Joined                  h 24 r 999 12px 600; bg var(--ember) text var(--text)
        <Chip tone="glass"><Countdown mode="days" endsAt/>  bg var(--scrim) text var(--text)
        <text .hero-title>                         22px bold var(--text)
        <view .row-between> 13px var(--text) opacity .85
        <ProgressMeter value=0.62 tone="onArt"/>   h 8 r 4; track var(--line-strong); fill var(--text)
      <UnderlineTabs tabs value onChange/>         mt 20; gap 22; 15px 600; active var(--text) + 2px var(--ember) bottom; idle var(--dim); border-bottom 1px var(--line)
    list-item per entry (chunked):
      <LeaderboardRow rank initials avatarTone name scoreLabel isMe/>
    footer item:
      <view .card .premium-challenge>              mt 16; var(--surface); border 1px var(--gold-soft)*; r var(--radius-card); pad 16; row gap 12
        <image .thumb>                             56×56 r 14
        <view .grow> <text 15px 600/> <text 13px var(--muted)/>
        <ProBadge/>
  <TabBar active="challenges"/>
```
- *Gold border at 35% alpha: add `--gold-line` token (rgba gold .35) to tokens.css. `--ember-line` (ember .4) for me-row.
- Avatar tones map to tokens: `gold` → var(--gold-grad), `ember` → var(--ember-grad), `dark` → var(--surface-3)-based gradient token `--avatar-dark`.

## 5. Components
- **LeaderboardRow** (shared): `{ rank: number; initials; avatarTone; name; scoreLabel: string; isMe?: boolean }`. Row pad 12/14, r 14, gap 12. Rank 15px 700 var(--muted) (rank 1 → var(--gold) is NOT allowed since gold = Premium; mockup shows rank 1 muted/white → use var(--text)). `isMe`: bg var(--ember-soft), border var(--ember-line), rank var(--muted). Score 17px display 700 right.
- **Chip** (shared): add `tone: "ember" | "glass" | "soft"` for pills.
- **Countdown** (shared): mode `"days"` renders "12 days left"; logic background (see §7).
- **ProBadge** (shared).
- **TabBar** (shared).
- **ChallengeHeroCard** (new, screen-local candidate): `{ title; imageSrc; joined; endsAt; progressLabel; percentLabel; progress: number; onTap }`.
- **UnderlineTabs** (new, screen-local candidate): `{ tabs: {id,label}[]; value; onChange }`; main-thread press feedback.
- **ProgressMeter** (new, screen-local candidate): `{ value: 0..1; tone: "ember"|"onArt" }` width set as `%` string precomputed.
- **Avatar** (new, screen-local candidate): `{ initials; tone; size: "sm"|"md"|"lg" }` (28 / 40 / 84).

## 6. State and data (background thread)
- Types `src/types/challenge.ts`:
  - `type Challenge = { id; title; imageUrl; coachId?: string; premium: boolean; startsAt; endsAt; goalReps: number; joined: boolean; myReps: number }`.
  - `type LeaderboardEntry = { userId; rank; name; initials; score: number; isMe: boolean }`.
  - `type LeaderboardPage = { entries: LeaderboardEntry[]; me: LeaderboardEntry; nextCursor?: string }`.
  - `type Badge = { id; name; iconUrl; earned: boolean }`.
- API `src/api/challenges.ts`: `getCurrentChallenge()`, `getLeaderboard(challengeId, scope: "global"|"friends", cursor?)`, `getBadges()`, `getUpcomingChallenges()` (includes premium ones), `joinChallenge(id)`. Mocks returning mockup data.
- State: `tab` (useState), challenge via `useAsync`, leaderboard page(s), rendered rows (chunked).
- Derived in `src/utils/leaderboard.ts`: `toRows(entries, me, locale)` → `{ key, rank, initials, avatarTone, name, scoreLabel, isMe }` with `Intl.NumberFormat` ("1,000"); pins me-row after top N when `me.rank > N` (mockup: top 3 + me). Hero: `progress = myReps/goalReps`, `percentLabel`, `progressLabel` ("You: 620 / 1,000 reps").
- Persist: last tab (nice-to-have); cached challenge + first leaderboard page for offline.

## 7. Threading
- **Leaderboard chunked**: Lynx `<list>` (virtualized) with `list-item` keys; background appends rows in chunks of 20 per tick (`setTimeout(0)`/idle) after the first 20 render; further pages fetched on `bindscrolltolower` (background, fired once at threshold — not per-frame). Formatting done per chunk, not all upfront.
- **Countdown** logic on background: compute `daysLeft` from `endsAt` once on mount and on a coarse background timer (re-check every 60s or at next local midnight); passes only the string. No main-thread timers.
- Hero `ProgressMeter` width precomputed (`"62%"`).
- Press feedback main-thread on icon button, hero card, tabs, PRO card, rows (Button pattern).
- No `setState` from scroll; only `bindscrolltolower` → one fetch.

## 8. Premium gating
- `useEntitlements()` over `src/services/purchases.ts` (09-paywall plan).
- Coach-led challenges (`premium: true`) show ProBadge for everyone; free tap → `lock_tapped` then `navigate("paywall", { source: "challenges", contentId: challengeId })`. Premium tap → detail/join.
- Public monthly challenge, leaderboard, friends, badges free.
- After purchase return, entitlement listener updates; PRO card becomes tappable into detail (badge stays as label).

## 9. Analytics
- `lock_tapped { content: "challenge:<id>" }` on PRO card tap (free).
- `paywall_viewed { source: "challenges", contentId: challengeId }` (paywall fires).
- `purchase { product }` (purchases service).
- Optional non-spec: `challenge_joined` — only if added to plan.md list; otherwise skip.

## 10. Edge cases
- No active challenge: hero becomes "Next challenge starts {date}" with Countdown; leaderboard hidden; badges tab still works.
- Not joined: pill "Joined" hidden; ember primary Button "Join challenge" in hero bottom instead of meter; me-row hidden.
- Me in top 3: highlight that row, no extra pinned row.
- Friends tab empty: "Invite friends" ghost Button → friends route.
- Ties: same rank shown; stable sort by userId.
- Countdown honesty: only show "N days left" from server `endsAt`; ≤0 → "Ended" and hide join.
- Loading: hero skeleton + 4 row skeletons. Error: inline retry card. Offline: cached data + "Offline" tiny label; join disabled.
- Purchase failed: user returns free; PRO card unchanged.
- i18n EN/HI: `t("challenges.*")`; plural rules for "days left" (`Intl.PluralRules`); numbers with locale grouping (HI may use 1,000 / lakh grouping via `en-IN`/`hi-IN`); names not translated; 2-line clamp on challenge titles.

## 11. Implementation steps
1. Add `--gold-line`, `--ember-line`, `--avatar-dark`, `--gold-grad`, `--scrim` tokens if missing → no hex in new CSS.
2. Types + API mocks → mock matches mockup copy.
3. `toRows` + hero derivations in utils → me-row pinned when rank > 3.
4. Create/confirm Avatar, LeaderboardRow, Chip tones, ProBadge, Countdown(days), ProgressMeter, UnderlineTabs, ChallengeHeroCard → each folder `.tsx`+`.css`, named exports, main-thread press feedback.
5. Compose `Challenges.tsx` with `<list>` header/footer items → matches PNG.
6. Chunked append + paged fetch on scroll-to-lower → 500-row mock scrolls without jank; first paint ≤ 20 rows.
7. Background Countdown → label updates at day boundary, no main-thread timers.
8. Gating + `lock_tapped` + paywall `source` → free tap opens paywall; premium opens detail.
9. Tabs Friends/Badges with empty states → switchable, no refetch of cached tabs.
10. EN/HI strings + plurals.
11. `npx tsc -p .` passes.
