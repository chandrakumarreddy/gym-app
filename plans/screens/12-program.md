# 12 · Program

Source: `mockups/png/12-program.png`. Sizes from `mockups/screens/12-program.html` (`flush`, `under`: content runs under the status bar, no TabBar). Shell, tokens and primitives come from `10-home.md`; ListRow and ScreenHeader come from `11-library.md`.

## 1. Visual inventory (top → bottom)

- **Full-bleed hero art**: 330h, radius 0, ember radial gradient with a squat (barbell) figure. It extends under the status bar.
- **Overlay controls** (top 58, inset 20): glass round back chevron (left). Glass round download and share buttons (right, gap 8, 40px each).
- `Strength Builder` (30/700 display), 16px under the hero.
- **Coach row**: small 28px ember avatar `AM` and `Coach Arjun Mehta · Strength & hypertrophy` (13, muted).
- **Meta pills** (soft, surface-3, text color): `8 weeks`, `4× / week`, `45 min`, `Intermediate`.
- **Week tabs** (underline style, 1px line under the row):
  - `Week 1` is **selected** (text color, 2px ember underline).
  - `Week 2` and `Week 3` are **locked**, in dim text with a small inline lock icon in the same dim tint. The PNG shows dim, not gold; see Open questions.
  - `…` means more weeks (8 total).
- **Session list** (Week 1). Each row has a 64px thumbnail (radius 14), an ember uppercase eyebrow (12/700, tracking .06em), a title (15/600) and a caption (13, muted):
  - `DAY 1` · `Lower Body Strength` · `45 min · 6 exercises`. Trailing: **done** (26px ember circle, white check).
  - `DAY 2` · `Upper Push` · `44 min · 6 exercises`. **Done**.
  - `DAY 3 · UP NEXT` · `Lower Hypertrophy` · `45 min · 6 exercises`. Trailing: **play** (32px white circle, dark play).
  - Day 4 is hidden behind the footer fade (the list scrolls).
- **Pinned footer CTA**: ember gradient primary button, 56h, radius 16, glow shadow. Play icon and `Continue · Day 3` (16/700, white). A bg fade sits above it.
- No TabBar. Home indicator.

## 2. Purpose and entry/exit

- Purpose: a program is a playlist of session videos grouped by week. It shows progress and the next session.
- Entry:
  - Library program tile (11).
  - Home (via a hero program link or the continue tile's program).
  - Coach profile program row (20).
  - 07 plan preview, post-onboarding.
- Exit:
  - Back → pop.
  - Session row → `workout {sessionId}` (13).
  - Play circle and the footer CTA → `workout {sessionId: upNext}` (13).
  - Locked week tab, locked row and download (free) → `locked` sheet (19).
  - Share → native share (open question).
- Params: `{programId: string, weekIndex?: number}`. `weekIndex` defaults to the week holding the up-next session.

## 3. Files

- `src/screens/Program/Program.tsx` and `Program.css`. `export function Program()`, reading `useRoute<'program'>()`.
- New:
  - `src/components/UnderlineTabs/` (new, screen-local candidate). Also fits 18-challenges.
  - `src/components/StatusDot/` (new, screen-local candidate): done check, or play circle.
  - `src/components/BottomCTA/` (new, screen-local candidate): pinned footer with fade. Also used by 13, 15 and 19.
- Reuse: `Art`, `IconButton` (glass), `Avatar`, `Pill`, `ListRow`, `LockBadge` (inline variant), `ProBadge` (mini), `Button` (primary), `Skeleton`.
- Data: `src/api/programs.ts` (`getProgram`), `src/api/mock/programs.ts`, `src/api/progress.ts` (`getProgramProgress`), and `src/types/content.ts` (from Home).

## 4. Layout tree

```
<view class="program">                               bg var(--bg), height 100%
  <scroll-view class="program-scroll" vertical main-thread:bindscroll={onScroll}>
    <view class="program-hero">                      height 330, radius 0
      <Art variant="v1" figure="squat" fill/>        var(--art-v1) + var(--art-scrim)
    <view class="program-body">                      padding 0 20, padding-bottom 56+34+40
      <text class="program-title">                   30/700 display, var(--text), mt16, letter-spacing -0.02em
      <view class="program-coach">                   row gap 8 mt8
        <Avatar size=28 tone="ember"/> <text 13 var(--muted)>
      <view class="program-pills">                   row gap 8 mt16, flex-wrap
        <Pill tone="soft">                           24h, padding 0 9, 12/600, bg var(--surface-3), var(--text)
      <UnderlineTabs class="mt20" items=weeks selected locked/>   gap 22, border-bottom 1px var(--line)
          item 15/600 padding-bottom 10; off var(--dim); on var(--text) + 2px var(--ember) bar
          locked: label + <LockBadge variant="inline" size=14/> (var(--dim))
          horizontal <scroll-view> (8 weeks overflow; the "…" in the PNG is the overflow cue)
      <view class="program-sessions mt8">
        <ListRow thumb={<Art 64 radius 14/>} eyebrow="Day 3 · Up next" title caption
                 trailing={<StatusDot state="done"|"next"|"todo"|"locked"/>}/>
            eyebrow 12/700 uppercase var(--ember); title 15/600; caption 13 var(--muted)
            done: 26 circle bg var(--ember), check var(--on-ember)
            next: 32 circle bg var(--text), play var(--on-light)
            todo: 26 circle border 2px var(--line-strong)
            locked: <LockBadge/> (30, gold)
  <view class="program-topbar">                      absolute, top = safe-area + 4, inset 0 20, row between, z 5
    <view class="program-topbar-bg"/>                absolute fill, bg var(--bg), opacity 0 (main-thread driven)
    <IconButton icon="chev-l" variant="glass"/>
    <view row gap 8><IconButton icon="download" variant="glass"/>(+<ProBadge mini/> free)<IconButton icon="share" variant="glass"/>
  <BottomCTA>                                        absolute left/right 20, bottom 34; fade var(--bottom-fade)
    <Button variant="primary" icon="play" label=t('program.continue',{day:3})/>
        56h, radius 16, bg var(--ember-grad), shadow var(--ember-glow), 16/700 var(--on-ember)
```

- Additional tokens (add to `tokens.css`): `--bottom-fade` (bg-alpha → bg gradient) and `--ember-glow` (box-shadow color).
- Button `primary` changes from flat `--ember` to `--ember-grad` plus glow, which matches every PNG. This affects Home's existing usage, which is fine.

## 5. Components

- **UnderlineTabs** (new, screen-local candidate): props `{items: {id, label, locked}[], selectedId, onSelect, onLockedTap}`. Lynx has no `box-shadow inset`, so the selected bar is a 2px child view.
- **StatusDot** (new, screen-local candidate): `done | next | todo | locked`.
- **BottomCTA** (new, screen-local candidate): positions children and draws the fade. It holds one primary Button.
- **ListRow** (canonical, from 11): uses the `eyebrow` slot.
- **IconButton** `glass`: background `var(--glass)`, border `var(--line-strong)`. No blur in Lynx.
- **LockBadge**: the `inline` variant (no circle) sits in tabs. The `badge` variant sits on rows.
- **ProBadge** `mini`: on download for free users.

## 6. State and data (background thread)

- `getProgram(programId): Promise<Program>` returns the full Coach → Program → Week → Session summaries, without the exercise arrays. Its fields are `coach {name, initials, specialty}` and `weeks[].sessions[] {id, dayIndex, title, durationMin, exerciseCount, art}`.
- `getProgramProgress(programId): Promise<{completedSessionIds: string[], upNextSessionId: string | null}>`.
- Cache: `useQuery('program:'+id)` with a 30 min TTL. Progress uses a 0 TTL and is refetched on focus (after returning from 16).
- Screen state: `selectedWeek: number` (initialised from params or up-next) and `downloadState: 'idle'|'downloading'|'done'`.
- Derived (`useMemo`):
  - `weekTabs`: label plus `locked = !premium && !owned && index > 0`.
  - `rows` for the selected week, each `{id, eyebrow, title, caption, state}`. Strings are preformatted with `t()`.
  - `cta` (label, plus the target `sessionId`).
- Prefetch: on mount, `prefetch('session:'+upNextSessionId)` warms screen 13.

## 7. Threading (AGENTS.md)

- Main thread:
  - Scroll-linked topbar: `main-thread:bindscroll` on the vertical scroll-view.
    - The handler reads `e.detail.scrollTop` and calls `topbarBg.setStyleProperty('opacity', String(min(1, max(0, (y - fadeStart) / fadeRange))))`.
    - It sets the hero `transform: translateY(y*0.5px)` for a parallax effect while `y < heroH`.
  - Captured values are precomputed on the background thread: `fadeStart = 330 - 120`, `fadeRange = 80` and `heroH = 330`. They are plain numbers.
  - The last applied opacity bucket is kept in `useMainThreadRef<number>`, and only a change in 0.05 steps writes a style.
  - Element refs come from `useMainThreadRef<MainThread.Element>` via `main-thread:ref`.
- Main thread, other:
  - Press feedback on rows, StatusDot, tabs, IconButtons and the CTA.
  - The week tabs' horizontal scroll is native.
- Background thread: fetch, progress merge, lock computation, string formatting, week switching (`bindtap` → `setSelectedWeek`), navigation, downloads, share and analytics.
- Never call `runOnBackground` from the scroll handler. The topbar state is purely visual and doesn't need React.

## 8. Premium gating

- Free tier: Week 1 of the user's own plan only. Weeks 2+ tabs show an inline lock. A tap fires `lock_tapped` and opens 19 with `{kind:'program', id, weekIndex}`, without switching the tab.
- A premium program not in the user's plan, for free users: all weeks are locked, every row shows a LockBadge, and the CTA becomes `Unlock program` → 19. One-time pack ownership (`ownedPrograms`) unlocks everything.
- Download (all of the program's downloadable sessions): free → `ProBadge mini`, and a tap → 19 `{kind:'feature', feature:'download'}`. Premium → download all of Week N.
- Premium users: no locks. All tabs are selectable.

## 9. Analytics

- `lock_tapped {content:'program:<id>:week:<n>'|'feature:download', source:'program'}`.
- `workout_started`: not here (Player). CTA navigation passes `source:'program_cta'` through 13 to 14.

## 10. Edge cases

- Loading: hero `Art` placeholder (static gradient), a 30h title bar, 4 pill skeletons, 3 tab skeletons and 3 row skeletons. Back stays tappable.
- Error: keep the topbar. The body shows a retry card. A 404 shows "This program is no longer available" with a back Button.
- Empty:
  - A week with no sessions → "Rest week".
  - Program fully complete → the CTA becomes `Restart program` (ghost) with a "Completed" pill.
  - Up-next on a later week → the CTA label is `Continue · Week {w} Day {d}`.
- Offline/downloads: show cached data. Rows that aren't downloaded are dimmed, and their taps raise an "Available when online" toast. Downloaded rows get a small download-done icon in the caption.
- i18n EN/HI:
  - Pills: `t('program.weeks', {n})`, `t('program.perWeek', {n})`, `t('program.min', {n})`. Level comes from the API.
  - The eyebrow has `text-transform` off for HI (Devanagari has no case).
  - The title has `text-maxline=2`, and the coach row `text-maxline=1` with ellipsis.

## 11. Implementation steps

1. [ ] `api/programs.ts`, `api/progress.ts` and mocks (Strength Builder: 8 weeks × 4 sessions; Days 1–2 done, Day 3 up next). Accept: matches the PNG copy.
2. [ ] Tokens `--bottom-fade` and `--ember-glow`. Button primary → gradient + glow. Accept: no hex outside tokens.
3. [ ] Components UnderlineTabs, StatusDot, BottomCTA, and ListRow's `eyebrow`. Accept: named exports, `.tsx`/`.css` pairs.
4. [ ] Program layout per §4, and register it in `screens.ts` with TabBar hidden. Accept: side-by-side match at 390w, with the hero under the status bar.
5. [ ] Main-thread scroll topbar and parallax (§7). Accept: no React re-render during scroll (check with the devtool/trace), and the topbar reaches opacity 1 after 290px of scroll.
6. [ ] Week switching, row states and CTA target. Accept: switching weeks has no refetch, and the CTA always points at up-next.
7. [ ] Gating (§8), lock → 19, download and share, plus analytics. Accept: a free user can't select Week 2, and Premium sees no locks.
8. [ ] Loading, error, empty and offline states. Accept: each can be forced from the mock.
9. [ ] `npx tsc -p .` passes with 0 errors.

## Open questions

- Week-tab lock color: the PNG renders it dim. The HTML intends gold, but CSS specificity overrode it. Planned: dim, matching the PNG. Should it be gold, as a Premium signal?
- Share target: native share sheet module availability.
- Does the download button download the whole program or the selected week?
