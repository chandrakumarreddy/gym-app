import { useEffect, useMemo, useState } from "@lynx-js/react";

import { haptic } from "@/api/haptics.ts";
import { getLibrary } from "@/api/library.ts";
import { Art } from "@/components/Art/Art.tsx";
import { Avatar } from "@/components/Avatar/Avatar.tsx";
import { BottomSheet } from "@/components/BottomSheet/BottomSheet.tsx";
import { Button } from "@/components/Button/Button.tsx";
import { Chip } from "@/components/Chip/Chip.tsx";
import { IconButton } from "@/components/IconButton/IconButton.tsx";
import { ListRow } from "@/components/ListRow/ListRow.tsx";
import { LockBadge } from "@/components/LockBadge/LockBadge.tsx";
import { Pressable } from "@/components/Pressable/Pressable.tsx";
import { ScreenHeader } from "@/components/ScreenHeader/ScreenHeader.tsx";
import { Skeleton } from "@/components/Skeleton/Skeleton.tsx";
import { useAsync } from "@/hooks/useAsync.ts";
import { useT } from "@/hooks/useLocale.tsx";
import type { StringKey } from "@/hooks/useLocale.tsx";
import { useRouter } from "@/hooks/useRouter.tsx";
import { useSkeletonCount } from "@/hooks/useSkeletonCount.ts";
import { useEntitlement } from "@/services/purchases.ts";
import type { Coach, LibraryFeed, Program, QuickWorkout } from "@/types/content.ts";
import type { Level } from "@/types/quiz.ts";
import type { RouteParams } from "@/types/route.ts";

import { ProgramCard } from "./components/ProgramCard/ProgramCard.tsx";
import { SearchField } from "./components/SearchField/SearchField.tsx";

import "./Library.css";

type Section = "programs" | "coaches" | "quick";
type LevelFilter = Level | "any";
type SearchKind = "program" | "coach" | "move";
type SearchEntry = { key: string; id: string; kind: SearchKind; title: string; haystack: string };

const SEARCH_DEBOUNCE_MS = 200;
const MAX_RESULTS = 50;
const LEVELS: LevelFilter[] = ["any", "beginner", "intermediate", "advanced"];
const KIND_KEY: Record<SearchKind, StringKey> = { program: "library.kind.program", coach: "library.kind.coach", move: "library.kind.move" };
const SECTION_KEY: Record<Section, StringKey> = { programs: "library.programs", coaches: "library.coaches", quick: "library.quick" };

function fold(s: string): string {
  const decomposed = typeof s.normalize === "function" ? s.normalize("NFD") : s;
  return decomposed.replace(/[̀-ͯ]/g, "").toLowerCase();
}

function buildIndex(feed: LibraryFeed): SearchEntry[] {
  return [
    ...feed.programs.map((p) => ({ key: `p:${p.id}`, id: p.id, kind: "program" as const, title: p.title, haystack: fold(`${p.title} ${p.coach.name} ${p.tags.join(" ")}`) })),
    ...feed.coaches.map((c) => ({ key: `c:${c.id}`, id: c.id, kind: "coach" as const, title: c.name, haystack: fold(`${c.name} ${c.specialty}`) })),
    ...feed.quick.map((q) => ({ key: `q:${q.sessionId}`, id: q.sessionId, kind: "move" as const, title: q.title, haystack: fold(q.title) })),
  ];
}

function search(index: SearchEntry[], q: string): SearchEntry[] {
  const needle = fold(q.trim());
  if (!needle) return [];
  return index.filter((e) => e.haystack.includes(needle)).slice(0, MAX_RESULTS);
}

function useDebounced<T>(value: T, ms: number): T {
  const [v, setV] = useState(value);
  useEffect(() => {
    const id = setTimeout(() => setV(value), ms);
    return () => clearTimeout(id);
  }, [value]);
  return v;
}

function matchesCategory(p: Program, category: string): boolean {
  return category === "all" || p.tags.some((tag) => tag.toLowerCase() === category);
}

function SkelLine({ h, w, className = "" }: { h: number; w: number | string; className?: string }) {
  return (
    <view className={`library-skel-line ${className}`} style={{ height: `${h}px` }}>
      <Skeleton width={w} height={Math.round(h * 0.65)} radius={6} />
    </view>
  );
}

function SkelSectionHeader({ w }: { w: number }) {
  return (
    <view className="library-section">
      <SkelLine h={22} w={w} />
      <SkelLine h={22} w={48} />
    </view>
  );
}

function SkelThumbRow() {
  return (
    <view className="library-skel-row">
      <Skeleton width={64} height={64} radius={14} className="library-skel-thumb" />
      <view className="library-skel-body">
        <Skeleton width="70%" height={14} radius={6} />
        <Skeleton width="45%" height={12} radius={6} className="library-skel-gap" />
      </view>
    </view>
  );
}

function SkelCoachRow() {
  return (
    <view className="library-skel-row">
      <Skeleton width={56} height={56} radius={999} className="library-skel-avatar" />
      <view className="library-skel-body">
        <Skeleton width="55%" height={14} radius={6} />
        <Skeleton width="40%" height={12} radius={6} className="library-skel-gap" />
      </view>
    </view>
  );
}

function LibrarySkeleton({ programs, quick }: { programs: boolean; quick: number }) {
  return (
    <view className="library-col">
      <view className="library-skel-hrow library-mt16">
        {[64, 96, 64, 72, 96].map((w, i) => (
          <Skeleton key={i} width={w} height={36} radius={999} className="library-gap-r" />
        ))}
      </view>

      {programs ? (
        <view className="library-col">
          <view className="library-pad">
            <SkelSectionHeader w={100} />
          </view>
          <view className="library-skel-hrow">
            {[0, 1, 2].map((i) => (
              <view key={i} className="program-card">
                <Skeleton width={160} height={200} radius={16} />
                <SkelLine h={20} w={120} className="library-skel-card-title" />
                <SkelLine h={18} w={90} className="library-skel-card-caption" />
              </view>
            ))}
          </view>
        </view>
      ) : null}

      <view className="library-pad">
        <SkelSectionHeader w={90} />
      </view>
      <view className="library-skel-hrow">
        {[0, 1, 2, 3, 4].map((i) => (
          <view key={i} className="library-coach">
            <Skeleton width={56} height={56} radius={999} />
            <SkelLine h={18} w={40} className="library-skel-coach-name" />
          </view>
        ))}
      </view>

      {quick > 0 ? (
        <view className="library-col library-pad">
          <SkelSectionHeader w={130} />
          {Array.from({ length: quick }, (_, i) => (
            <SkelThumbRow key={i} />
          ))}
        </view>
      ) : null}
    </view>
  );
}

export function Library({ filter, section: initialSection }: RouteParams<"library">) {
  const t = useT();
  const { push, openLocked } = useRouter();
  const { premium, ownedPrograms } = useEntitlement();
  const [reload, setReload] = useState(0);
  const { data: feed, loading } = useAsync(() => getLibrary(), [reload]);
  const failed = !loading && !feed;

  useEffect(() => {
    if (failed) haptic("error");
  }, [failed]);

  const [category, setCategory] = useState(filter ?? "all");
  const [section, setSection] = useState<Section | null>(
    initialSection === "programs" || initialSection === "coaches" || initialSection === "quick" ? initialSection : null,
  );
  const [query, setQuery] = useState("");
  const debouncedQuery = useDebounced(query, SEARCH_DEBOUNCE_MS);
  const [sheetOpen, setSheetOpen] = useState(false);
  const [level, setLevel] = useState<LevelFilter>("any");
  const [draftLevel, setDraftLevel] = useState<LevelFilter>("any");

  const index = useMemo(() => (feed ? buildIndex(feed) : []), [feed]);
  const results = useMemo(() => search(index, debouncedQuery), [index, debouncedQuery]);

  const vm = useMemo(() => {
    if (!feed) return null;
    const isOwned = (p: Program) => !!p.packProductId && ownedPrograms.includes(p.packProductId);
    const programs = feed.programs
      .filter((p) => matchesCategory(p, category) && (level === "any" || p.level === level))
      .map((p) => ({
        program: p,
        isUserPlan: !p.premium,
        locked: p.premium && !premium && !isOwned(p),
        caption: t("library.weeksBy", { n: p.weeks, coach: p.coach.name.split(" ")[0] }),
      }))
      .sort((a, b) => Number(b.isUserPlan) - Number(a.isUserPlan) || Number(a.locked) - Number(b.locked));
    const quick = (category === "all" ? feed.quick : [])
      .map((q) => ({ quick: q, locked: q.premium && !premium, caption: t("library.quickCaption", { n: q.durationMin }) }))
      .sort((a, b) => Number(a.quick.premium) - Number(b.quick.premium) || a.quick.durationMin - b.quick.durationMin);
    return { programs, quick, coaches: feed.coaches };
  }, [feed, category, level, premium, ownedPrograms, t]);

  const skelPrograms = useSkeletonCount("library.programs", 3, vm?.programs.length);
  const skelQuick = useSkeletonCount("library.quick", 3, vm?.quick.length);
  const skelSection = {
    programs: useSkeletonCount("library.section.programs", 6, vm?.programs.length),
    coaches: useSkeletonCount("library.section.coaches", 6, vm?.coaches.length),
    quick: useSkeletonCount("library.section.quick", 6, vm?.quick.length),
  };

  const lockProgram = (p: Program) => {
    haptic("warning");
    openLocked({
      contentType: "program",
      contentId: p.id,
      title: p.title,
      sessionCount: p.weeks * p.daysPerWeek,
      packProductId: p.packProductId as `pack_${string}` | undefined,
      source: "library",
    });
  };
  const openProgram = (p: Program) => push({ name: "program", programId: p.id });
  const openCoach = (c: Coach) => push({ name: "coach", coachId: c.id, source: "library" });
  const openQuick = (q: QuickWorkout, locked: boolean) => {
    if (locked) {
      haptic("warning");
      openLocked({ contentType: "session", contentId: q.sessionId, title: q.title, source: "library" });
    } else push({ name: "workout", sessionId: q.sessionId, source: "library" });
  };
  const openResult = (e: SearchEntry) => {
    if (!feed) return;
    if (e.kind === "program") push({ name: "program", programId: e.id });
    else if (e.kind === "coach") push({ name: "coach", coachId: e.id, source: "library" });
    else {
      const q = feed.quick.find((x) => x.sessionId === e.id);
      if (q) openQuick(q, q.premium && !premium);
    }
  };

  const sectionHeader = (s: Section) => (
    <view className="library-section">
      <text className="library-section-title">{t(SECTION_KEY[s])}</text>
      <Pressable onTap={() => setSection(s)}>
        <text className="library-section-action">{t("library.seeAll")}</text>
      </Pressable>
    </view>
  );

  const quickRow = (item: { quick: QuickWorkout; locked: boolean; caption: string }) => (
    <ListRow
      key={item.quick.sessionId}
      thumb={<Art spec={item.quick.art} size={64} radius={14} figureScale={0.75} />}
      title={item.quick.title}
      caption={item.caption}
      trailing={
        item.locked ? (
          <LockBadge />
        ) : premium ? null : (
          <view className="library-free-pill">
            <text className="library-free-pill-text">{t("library.free")}</text>
          </view>
        )
      }
      onTap={() => openQuick(item.quick, item.locked)}
    />
  );

  const programRow = (item: { program: Program; locked: boolean; caption: string }) => (
    <ListRow
      key={item.program.id}
      thumb={<Art spec={item.program.art} size={64} radius={14} figureScale={0.75} />}
      title={item.program.title}
      caption={item.caption}
      trailing={item.locked ? <LockBadge /> : null}
      onTap={() => openProgram(item.program)}
    />
  );

  const coachRow = (c: Coach) => (
    <ListRow key={c.id} leading={<Avatar initials={c.initials} size={56} tone={c.tone} />} title={c.name} caption={c.specialty} chevron onTap={() => openCoach(c)} />
  );

  if (section) {
    const sectionItems = vm ? (section === "programs" ? vm.programs.map(programRow) : section === "coaches" ? vm.coaches.map(coachRow) : vm.quick.map(quickRow)) : [];
    const sectionBody =
      loading && !feed ? (
        Array.from({ length: Math.max(1, skelSection[section]) }, (_, i) => (section === "coaches" ? <SkelCoachRow key={i} /> : <SkelThumbRow key={i} />))
      ) : !vm ? (
        <view className="library-card library-mt16">
          <text className="library-card-text">{t("library.error")}</text>
          <Button label={t("common.retry")} variant="ghost" size="sm" onTap={() => setReload((n) => n + 1)} />
        </view>
      ) : sectionItems.length === 0 ? (
        <view className="library-card library-mt16">
          <text className="library-card-text">{t("library.emptyCategory", { category: t(SECTION_KEY[section]) })}</text>
        </view>
      ) : (
        sectionItems
      );
    return (
      <view className="library">
        <view className="library-top-inset" />
        <ScreenHeader variant="nav" title={t(SECTION_KEY[section])} onBack={() => setSection(null)} />
        <scroll-view className="library-scroll" scroll-orientation="vertical">
          <view className="library-col library-pad">
            {sectionBody}
          </view>
          <view className="tab-clearance" />
        </scroll-view>
      </view>
    );
  }

  const searching = debouncedQuery.trim().length > 0;
  const categoryLabel = feed?.filters.find((f) => f.id === category)?.label ?? category;
  const allEmpty = vm ? vm.programs.length === 0 && vm.quick.length === 0 : false;

  return (
    <view className="library">
      <scroll-view className="library-scroll" scroll-orientation="vertical">
        <view className="library-col library-pad library-top">
          <ScreenHeader
            variant="large"
            title={t("library.title")}
            className="library-header"
            right={
              <IconButton
                icon="filter"
                onTap={() => {
                  setDraftLevel(level);
                  setSheetOpen(true);
                }}
              />
            }
          />
          <SearchField value={query} placeholder={t("library.search")} onChange={setQuery} />
        </view>

        {loading && !feed ? (
          <LibrarySkeleton programs={skelPrograms > 0} quick={skelQuick} />
        ) : !feed || !vm ? (
          <view className="library-pad">
            <view className="library-card library-mt24">
              <text className="library-card-text">{t("library.error")}</text>
              <Button label={t("common.retry")} variant="ghost" size="sm" onTap={() => setReload((n) => n + 1)} />
            </view>
          </view>
        ) : searching ? (
          <view className="library-col library-pad library-mt16">
            {results.length === 0 ? (
              <view className="library-card">
                <text className="library-card-text">{t("library.noResults", { q: debouncedQuery })}</text>
                <Button label={t("library.clearSearch")} variant="ghost" size="sm" onTap={() => setQuery("")} />
              </view>
            ) : (
              results.map((r) => <ListRow key={r.key} eyebrow={t(KIND_KEY[r.kind])} title={r.title} chevron onTap={() => openResult(r)} />)
            )}
          </view>
        ) : (
          <view className="library-col">
            <scroll-view className="library-hscroll library-mt16" scroll-orientation="horizontal">
              {feed.filters.map((f) => (
                <Chip key={f.id} label={f.label} selected={category === f.id} className="library-chip" onTap={() => setCategory(f.id)} />
              ))}
              <view className="library-hscroll-end" />
            </scroll-view>

            {allEmpty ? (
              <view className="library-pad">
                <view className="library-card library-mt24">
                  <text className="library-card-text">{t("library.emptyCategory", { category: categoryLabel })}</text>
                </view>
              </view>
            ) : null}

            {vm.programs.length > 0 ? (
              <view className="library-col">
                <view className="library-pad">{sectionHeader("programs")}</view>
                <scroll-view className="library-hscroll" scroll-orientation="horizontal">
                  {vm.programs.map(({ program: p, isUserPlan, locked, caption }) => (
                    <ProgramCard
                      key={p.id}
                      art={p.art}
                      title={p.title}
                      caption={caption}
                      badge={isUserPlan ? t("library.yourPlan") : undefined}
                      locked={locked}
                      onTap={() => openProgram(p)}
                      onLockTap={() => lockProgram(p)}
                    />
                  ))}
                  <view className="library-hscroll-end" />
                </scroll-view>
              </view>
            ) : null}

            <view className="library-pad">{sectionHeader("coaches")}</view>
            <scroll-view className="library-hscroll" scroll-orientation="horizontal">
              {vm.coaches.map((c) => (
                <Pressable key={c.id} className="library-coach" onTap={() => openCoach(c)}>
                  <Avatar initials={c.initials} size={56} tone={c.tone} />
                  <text className="library-coach-name">{c.name.split(" ")[0]}</text>
                </Pressable>
              ))}
              <view className="library-hscroll-end" />
            </scroll-view>

            {vm.quick.length > 0 ? (
              <view className="library-col library-pad">
                {sectionHeader("quick")}
                {vm.quick.map(quickRow)}
              </view>
            ) : null}
          </view>
        )}
        <view className="library-bottom-pad" />
        <view className="tab-clearance" />
      </scroll-view>

      <BottomSheet visible={sheetOpen} onDismiss={() => setSheetOpen(false)} title={t("library.filters")}>
        <view className="library-sheet">
          <text className="library-sheet-label">{t("library.level")}</text>
          <view className="library-sheet-chips">
            {LEVELS.map((l) => (
              <Chip
                key={l}
                label={t(`library.level.${l}` as StringKey)}
                selected={draftLevel === l}
                className="library-chip library-mt8"
                onTap={() => setDraftLevel(l)}
              />
            ))}
          </view>
          <Button
            label={t("library.apply")}
            fullWidth
            className="library-mt24"
            onTap={() => {
              setLevel(draftLevel);
              setSheetOpen(false);
            }}
          />
        </view>
      </BottomSheet>
    </view>
  );
}
