# 11 · Library

Source: `mockups/png/11-library.png`. Sizes from `mockups/screens/11-library.html` and `mockups/styles.css`. Shell, tokens, primitives (Icon, IconButton, Avatar, Pill, Art, SectionHeader, Skeleton), `useQuery`, `useEntitlement`, `track` and `useT` all come from `10-home.md`.

## 1. Visual inventory (top → bottom)

- System status bar.
- **Header row**: `Library` (30/700 display, text) on the left. Filter (sliders) IconButton on the right: 40px round, surface-2, line border.
- **Search field**: 48h, radius 14, surface-2, line border. Search icon and the placeholder `Search workouts, coaches, moves` (15, dim).
- **Category chips** (horizontal, bleeding off the right edge), each 36h with radius 999:
  - `All` is **selected** (ember-soft fill, ember border, ember-2 text).
  - `Strength`, `HIIT`, `Yoga`, `Mobility` and `Home` (off-screen) are unselected (surface-2, line border, text color).
- **Section `Programs for you`** with an ember `See all`.
- **Programs carousel**: tiles 160×200, radius 16, 12px gap, bleeding right.
  - Tile 1: squat figure, top-left ember pill `Your plan`, title `Strength Builder` (15/600) and caption `8 wks · Arjun` (13, muted). Unlocked.
  - Tile 2: jump figure, top-right **LockBadge** (30px dark circle, gold lock), `Lean in 30` and `4 wks · Kabir`.
  - Tile 3: partly visible, `Hom…` / `6 wk…` (HTML: `Home Hypertrophy`, `6 wks · Sana`, locked).
- **Section `Coaches`** with `See all`. Row of 5 avatars, 56px, 18/700 initials, with name captions below (13, muted), 16px gap:
  - `AM` Arjun (ember gradient), `PN` Priya (warm/yellow gradient, dark text), `KR` Kabir (brown gradient), `SI` Sana (ember), `VD` Vikram (warm).
- **Section `Quick workouts`** with `See all`. List row: 64px thumbnail (art v4, stretch figure), `Desk-break mobility` (15/600), caption `12 min · No equipment` (cut off in the PNG; from the HTML), and a soft pill `Free` on the right.
- **TabBar** with `Library` active (ember), the rest dim.

## 2. Purpose and entry/exit

- Purpose: browse programs, coaches and quick workouts. Chips and filters default from the quiz (level, equipment).
- Entry: the Library TabBar tab. Home `See all` lands here (`library {filter?}`).
- Exit:
  - Program tile → `program {programId}` (12). Locked tiles go there too: the program page shows its own locks.
  - LockBadge tap (hit area 44) → `locked {kind:'program', id}` (19).
  - Coach avatar → `coach {coachId}` (20).
  - Quick workout row → `workout {sessionId}` (13). Locked → 19.
  - `See all` → `library {section:'programs'|'coaches'|'quick'}`, which pushes the same screen in list mode.
  - Filter button → a filters `BottomSheet` (level, equipment, duration).
- Params: `{filter?: CategoryId, section?: 'programs'|'coaches'|'quick'}`.

## 3. Files

- `src/screens/Library/Library.tsx` and `Library.css`. `export function Library()`.
- New:
  - `src/components/SearchField/` (new, screen-local candidate).
  - `src/components/Chip/` (canonical).
  - `src/components/ListRow/` (canonical).
  - `src/components/BottomSheet/` (canonical).
  - `src/components/ScreenHeader/` (canonical).
- Reuse: `Tile`, `LockBadge`, `Avatar`, `Pill`, `SectionHeader`, `IconButton`, `Skeleton`, `TabBar`.
- Data:
  - `src/types/library.ts`.
  - `src/api/library.ts`, `src/api/mock/library.ts`.
  - `src/utils/search.ts`: index plus filter, pure functions.
  - `src/hooks/useDebouncedValue.ts`.

## 4. Layout tree

```
<view class="library">                               flex col, bg var(--bg)
  <scroll-view class="library-scroll" scroll-orientation="vertical">   padding 0 20px, bottom pad var(--tabbar-h)+16
    <ScreenHeader title="Library" size="large" right={<IconButton icon="filter" shape="round"/>}/>
        row between, padding 4px 0 14px; title 30/700 var(--text), letter-spacing -0.02em
    <SearchField placeholder=t('library.search')/>   48h, radius 14, bg var(--surface-2), border 1px var(--line),
        padding 0 14, gap 10; icon var(--dim); <input> 15 var(--text), placeholder var(--dim)
    <scroll-view scroll-orientation="horizontal" class="library-chips mt16">   gap 8, margin-right -20
      <Chip label selected onTap/>                   36h, padding 0 14, radius 999, 14/500
          off: bg var(--surface-2), border var(--line), var(--text)
          on:  bg var(--ember-soft), border var(--ember), var(--ember-2)
    <SectionHeader title="Programs for you" action="See all"/>
    <scroll-view horizontal class="hscroll">        gap 12, margin-right -20
      <Tile w=160 h=200 radius=16 badge={<Pill tone="ember">Your plan</Pill>} | locked
            title 15/600 mt10 var(--text), caption 13 var(--muted)/>
    <SectionHeader title="Coaches" action="See all"/>
    <scroll-view horizontal class="library-coaches">  gap 16 (5 fit at 390w; scrolls when more)
      <view class="coach">                           col, center, gap 6
        <Avatar size=56 tone=coach.tone initials/>   18/700; tones var(--avatar-ember|warm|brown)
        <text 13 var(--muted)>
    <SectionHeader title="Quick workouts" action="See all"/>
    <ListRow thumb={<Art 64 radius 14/>} title caption trailing={<Pill tone="soft">Free</Pill> | <LockBadge/>}/>
        row, gap 12, padding 10 0; title 15/600; caption 13 var(--muted)
  <TabBar active="library"/>                         from RootNavigator
```

- Search active (query non-empty): the sections are replaced by a results `<list>`. Each result is a `ListRow` with a kind label (`Program`, `Coach`, `Move`).
- Category chip ≠ All: each section filters. A section with 0 items is hidden.

## 5. Components

- **Chip** (new, canonical): props `{label, selected, onTap}`. Main-thread press feedback. Shared with 03/05 quiz chips (those add a check icon).
- **Tile** (from Home): adds `title` and `caption` below the art, plus a `badge` slot (tl) and `locked` (tr LockBadge).
- **LockBadge** (canonical): its own background `bindtap` (lock → 19). `catchtap` stops the tile tap.
- **ListRow** (new, canonical): props `{thumb, eyebrow?, title, caption, trailing?, onTap}`. Reused by 12 and 13.
- **ScreenHeader** (new, canonical): variants `large` (title + right actions) and `nav` (back + actions). Reused by 13.
- **SearchField** (new, screen-local candidate): wraps Lynx `<input>`, using `bindinput`, `confirm-type="search"`, and a clear (×) when non-empty.
- **Avatar** (from Home): coach tones come from the coach data (`tone: 'ember'|'warm'|'brown'`).
- **BottomSheet** (new, canonical): hosts the filter sheet. Also used by 19.

## 6. State and data (background thread)

- `src/types/library.ts`:
  - `LibraryFeed {categories: {id, label}[], programs: ProgramCard[], coaches: CoachCard[], quick: QuickCard[]}`.
  - `ProgramCard {id, title, weeks, coachName, art, premium, isUserPlan, categoryIds[]}`.
  - `CoachCard {id, name, initials, tone}`.
  - `QuickCard {sessionId, title, durationMin, equipmentLabel, art, free, categoryIds[]}`.
- `src/api/library.ts`:
  - `getLibrary({level, equipment}): Promise<LibraryFeed>`, with defaults from the quiz profile.
  - `searchLibrary(q)`: server search, used later when the catalog is large.
  - Mock data matches the PNG copy.
- Cache: `useQuery('library:'+profileHash, …)` with a 10 min TTL. Instant on tab revisit.
- Local state:
  - `category: CategoryId = params.filter ?? 'all'`.
  - `query: string`.
  - `debouncedQuery = useDebouncedValue(query, 200)`.
  - `filters` (from the sheet).
- Derived (`useMemo`):
  - `index = buildIndex(feed)`. Built once per feed, lowercased and diacritic-folded. It holds `{id, kind, title, haystack}`.
  - `visible = applyCategory(feed, category)`.
  - `results = search(index, debouncedQuery).slice(0, 50)`.
- Sort (background): programs put `isUserPlan` first, then owned or free, then server `score`. Quick workouts put free first, then duration ascending.

## 7. Threading (AGENTS.md)

- Main thread:
  - Press feedback on Chip, Tile, ListRow, coach avatar, IconButton and TabBar (`utils/press.ts` worklets).
  - The three horizontal carousels (chips, programs, coaches) are native `<scroll-view scroll-orientation="horizontal">`. No scroll handlers and no per-frame JS.
- Background thread:
  - `bindinput` puts the text in `query` state. A 200 ms debounce (`setTimeout`/`clearTimeout` in `useDebouncedValue`) gates filtering.
  - The filter and sort run in `useMemo`. A stale-result guard compares the query token.
- Chunked work: if the index has more than 500 entries, build it in chunks of 200 via `setTimeout(0)` and show results from the partial index. Results render through `<list>` (virtualized) with `item-key=id`.
- Never per keystroke: no `runOnBackground`, and the full feed is never passed to main thread handlers. Handlers capture only `{id}`.
- Captured values: none beyond the press opacity constant (`0.7`).

## 8. Premium gating

- `ProgramCard.premium && !premium && !owned` → `Tile locked`, which shows the gold LockBadge (top-right).
- `isUserPlan` is never locked, because Week 1 is free.
- Quick workouts: `free` → soft `Free` pill. Otherwise, for free users → LockBadge on the right (in place of the pill).
- Lock tap → `openSheet({name:'locked', content:{kind:'program'|'session', id}})`. Tapping the tile body on a locked program still opens 12, where Weeks 2+ are locked.
- Premium users: no locks, and no `Free` pills (hide the pill when `premium`).

## 9. Analytics

- `lock_tapped {content:'program:<id>'|'session:<id>', source:'library'}` on a LockBadge tap.
- `workout_started` is not fired here (Player owns it).
- No search analytics in the plan.md list, so none are invented.

## 10. Edge cases

- Loading: skeletons for the chip row (5 × 36h pills), 2 tiles 160×200, 5 avatar circles and 2 list rows. The header and search are interactive immediately.
- Error: no cache → an inline retry card in place of the sections. With cache → show it.
- Empty:
  - Search with no hits → "No results for "{q}"" plus a `Clear search` ghost Button.
  - Category with no items → hide the empty sections. If all are empty, show the "Nothing in {category} yet" card.
- Offline: search runs locally on the cached index. Program and quick rows not downloaded are dimmed to 0.4 opacity, and a tap shows an "Available when online" toast. A remote search fallback is skipped.
- i18n EN/HI:
  - Chip labels come from the API (localized). Hindi chips are wider, and the horizontal scroll absorbs that.
  - Tile titles get `text-maxline=1` with ellipsis. Captions use `t('library.weeksBy', {n, coach})`.
  - Search folding handles Devanagari (no lowercasing issue). Match on both `title` and `titleEn` so English queries work in HI.

## 11. Implementation steps

1. [ ] Types, mock and API (`types/library.ts`, `api/library.ts`, `api/mock/library.ts`). Accept: the mock reproduces the PNG copy, including `Home Hypertrophy` and `Free`.
2. [ ] `utils/search.ts` (`buildIndex`, `search`, chunked builder) and `hooks/useDebouncedValue.ts`. Accept: pure functions, no React imports.
3. [ ] Components Chip, ListRow, ScreenHeader, SearchField, BottomSheet. Tile gets a title, caption and badge. Accept: each has a `.tsx` and `.css`, named exports and main-thread press feedback.
4. [ ] Library layout per §4. Accept: matches the PNG at 390w, with All selected and the first 2 tiles/5 coaches visible.
5. [ ] Search and category state (§6–7). Accept: typing doesn't jank the main thread. Filtering fires at most once per 200 ms idle.
6. [ ] Gating and lock taps → 19 (§8), plus analytics. Accept: Premium hides all locks and Free pills.
7. [ ] Navigation exits (§2), and register `library` in `screens.ts`. Accept: tile → 12, avatar → 20, row → 13.
8. [ ] Loading, error, empty and offline states. Accept: each can be forced from the mock.
9. [ ] `npx tsc -p .` passes with 0 errors.

## Open questions

- The `PN` and `VD` avatars use a yellow-gold gradient, which conflicts with "gold only for Premium". The plan uses a separate `--avatar-warm` token. Should it be confirmed or changed to a non-gold hue?
- Filter sheet contents are not mocked. Assumed: level, equipment, duration.
