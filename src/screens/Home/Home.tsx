import { useEffect, useMemo, useState } from "@lynx-js/react";

import { getHome } from "@/api/home.ts";
import { haptic } from "@/api/haptics.ts";
import { appReady } from "@/api/systemBars.ts";
import { Avatar } from "@/components/Avatar/Avatar.tsx";
import { Button } from "@/components/Button/Button.tsx";
import { Chip } from "@/components/Chip/Chip.tsx";
import { HeroVideoCard } from "@/components/HeroVideoCard/HeroVideoCard.tsx";
import { Icon } from "@/components/Icon/Icon.tsx";
import { IconButton } from "@/components/IconButton/IconButton.tsx";
import { ProBadge } from "@/components/ProBadge/ProBadge.tsx";
import { Pressable } from "@/components/Pressable/Pressable.tsx";
import { Skeleton } from "@/components/Skeleton/Skeleton.tsx";
import { Tile } from "@/components/Tile/Tile.tsx";
import { UpgradeBanner } from "@/components/UpgradeBanner/UpgradeBanner.tsx";
import { useAsync } from "@/hooks/useAsync.ts";
import { useT } from "@/hooks/useLocale.tsx";
import type { StringKey } from "@/hooks/useLocale.tsx";
import { useRouter } from "@/hooks/useRouter.tsx";
import { useEntitlement } from "@/services/purchases.ts";
import type { HomeFeed } from "@/types/content.ts";

import { WeekStrip } from "./components/WeekStrip/WeekStrip.tsx";
import type { WeekDayState, WeekDayVM } from "./components/WeekStrip/WeekStrip.tsx";

import "./Home.css";

const DAY_KEYS: StringKey[] = ["home.day.0", "home.day.1", "home.day.2", "home.day.3", "home.day.4", "home.day.5", "home.day.6"];

function greetingKey(date: Date): StringKey {
  const h = date.getHours();
  if (h < 12) return "home.greeting.morning";
  if (h < 18) return "home.greeting.afternoon";
  return "home.greeting.evening";
}

function parseWeekDay(sessionId: string): { w: number; d: number; programId: string } | null {
  const m = /^(.+)-w(\d+)d(\d+)$/.exec(sessionId);
  return m ? { programId: m[1], w: Number(m[2]), d: Number(m[3]) } : null;
}

function buildWeek(feed: HomeFeed, labels: string[], now: Date): WeekDayVM[] {
  const todayIdx = feed.weekDays.findIndex((d) => d.today);
  const anchor = todayIdx >= 0 ? todayIdx : (now.getDay() + 6) % 7;
  return feed.weekDays.map((day, i) => {
    const date = new Date(now.getFullYear(), now.getMonth(), now.getDate() + (i - anchor));
    const state: WeekDayState = day.done ? "done" : day.today ? "today" : i > anchor ? "scheduled" : "rest";
    return { id: String(i), label: labels[i], num: String(date.getDate()), state };
  });
}

function SkelLine({ h, w, className = "" }: { h: number; w: number | string; className?: string }) {
  return (
    <view className={`home-skel-line ${className}`} style={{ height: `${h}px` }}>
      <Skeleton width={w} height={Math.round(h * 0.65)} radius={6} />
    </view>
  );
}

function HomeSkeleton({ premium, onUpgrade }: { premium: boolean; onUpgrade: () => void }) {
  const t = useT();
  return (
    <scroll-view className="home-scroll" scroll-orientation="vertical">
      <view className="home-content">
        <view className="home-header">
          <Skeleton width={40} height={40} radius={999} />
          <view className="home-hello">
            <SkelLine h={18} w={90} />
            <SkelLine h={22} w={64} />
          </view>
          <view className="home-header-actions">
            <Skeleton width={58} height={36} radius={999} className="home-skel-streak" />
            <IconButton icon="bell" />
          </view>
        </view>

        <view className="week-strip">
          {DAY_KEYS.map((k) => (
            <view key={k} className="week-strip-day">
              <Skeleton width={38} height={38} radius={999} />
              <SkelLine h={16} w={12} className="home-skel-week-label" />
            </view>
          ))}
        </view>

        <Skeleton height={300} radius={28} className="home-mt20" />

        {premium ? null : (
          <UpgradeBanner className="home-mt16" title={t("home.banner.title", { from: 2, to: 8 })} subtitle={t("home.banner.subtitle")} onTap={onUpgrade} />
        )}

        <view className="home-section">
          <SkelLine h={22} w={150} />
          <SkelLine h={22} w={48} />
        </view>
      </view>
      <view className="home-skel-tiles">
        <Skeleton width={160} height={200} radius={16} className="home-tile" />
        <Skeleton width={160} height={200} radius={16} className="home-tile" />
        <Skeleton width={160} height={200} radius={16} className="home-tile" />
      </view>
      <view className="tab-clearance" />
    </scroll-view>
  );
}

export function Home() {
  const t = useT();
  const { push, openLocked } = useRouter();
  const { premium, ownedPrograms } = useEntitlement();
  const [reload, setReload] = useState(0);
  const { data: feed, loading } = useAsync(getHome, [reload]);
  const [helloKey] = useState(() => greetingKey(new Date()));
  const failed = !loading && !feed;
  useEffect(() => {
    if (!loading) appReady();
  }, [loading]);

  useEffect(() => {
    if (failed) haptic("error");
  }, [failed]);

  const vm = useMemo(() => {
    if (!feed) return null;
    const today = feed.today;
    const pos = parseWeekDay(today.sessionId);
    const premiumPrograms = new Map(feed.recommended.filter((p) => p.premium).map((p) => [p.id, p.packProductId ?? ""]));
    return {
      week: buildWeek(feed, DAY_KEYS.map((k) => t(k)), new Date()),
      weekPill: pos ? t("home.weekDay", { w: pos.w, d: pos.d }) : today.eyebrow,
      meta: {
        min: t("home.min", { n: today.durationMin }),
        exercises: t("home.exercises", { n: today.exerciseCount }),
        coach: t("home.coach", { name: today.coach.name.split(" ")[0] }),
      },
      tiles: feed.continueWatching.map((c) => {
        const programId = parseWeekDay(c.sessionId)?.programId ?? "";
        const pack = premiumPrograms.get(programId);
        const locked = pack !== undefined && !premium && !ownedPrograms.includes(pack);
        return { ...c, programId, locked, pack };
      }),
    };
  }, [feed, t, premium, ownedPrograms]);

  if (loading && !feed) {
    return (
      <view className="home">
        <HomeSkeleton premium={premium} onUpgrade={() => push({ name: "paywall", source: "home_banner" })} />
      </view>
    );
  }

  if (!feed || !vm) {
    return (
      <view className="home home-center">
        <view className="home-error">
          <text className="home-error-text">{t("home.error")}</text>
          <Button label={t("common.retry")} variant="ghost" size="sm" onTap={() => setReload((n) => n + 1)} />
        </view>
      </view>
    );
  }

  const today = feed.today;
  const openWorkout = () => push({ name: "workout", sessionId: today.sessionId, source: "home_hero" });
  const startWorkout = () => {
    haptic("medium");
    push({ name: "player", sessionId: today.sessionId, source: "home_hero" });
  };
  const download = () => {
    if (premium) return;
    haptic("warning");
    openLocked({ contentType: "feature", contentId: "download", title: today.title, source: "home" });
  };
  const onDay = (_id: string, state: WeekDayState) => {
    if (state === "today") openWorkout();
  };

  return (
    <view className="home">
      <scroll-view className="home-scroll" scroll-orientation="vertical">
        <view className="home-content">
          <view className="home-header">
            <Avatar initials={feed.user.initials} size={40} tone="ember" />
            <view className="home-hello">
              <text className="home-hello-cap">{t(helloKey)}</text>
              <text className="home-hello-name">{feed.user.name}</text>
            </view>
            <view className="home-header-actions">
              <Pressable className="home-streak" onTap={() => push({ name: "progress" })}>
                <Icon name="flame" tone={feed.streakDays > 0 ? "ember" : "dim"} size={18} />
                <text className="home-streak-num">{String(feed.streakDays)}</text>
              </Pressable>
              <IconButton icon="bell" />
            </view>
          </view>

          <WeekStrip days={vm.week} onSelect={onDay} />

          <HeroVideoCard
            className="home-mt20"
            art={today.art}
            height={300}
            radius={28}
            playButton={false}
            title={today.title}
            onTap={openWorkout}
            badge={
              <view className="home-hero-pills">
                <Chip label={t("home.today")} variant="ember" size="sm" />
                <Chip label={vm.weekPill} tone="glass" size="sm" className="home-hero-pill" />
              </view>
            }
            footer={
              <view className="home-hero-footer">
                <view className="home-hero-meta">
                  <view className="home-hero-meta-item">
                    <Icon name="clock" tone="text" size={14} />
                    <text className="home-hero-meta-text">{vm.meta.min}</text>
                  </view>
                  <view className="home-hero-meta-item">
                    <Icon name="dumbbell" tone="text" size={14} />
                    <text className="home-hero-meta-text">{vm.meta.exercises}</text>
                  </view>
                  <text className="home-hero-meta-text">{vm.meta.coach}</text>
                </view>
                <view className="home-hero-cta" catchtap={startWorkout}>
                  <Button label={t("home.start")} variant="light" icon="play" fullWidth />
                </view>
              </view>
            }
          >
            <view className="home-hero-download" catchtap={download}>
              <IconButton icon="download" variant="glass" badge={premium ? undefined : <ProBadge mini />} />
            </view>
          </HeroVideoCard>

          {premium ? null : (
            <UpgradeBanner
              className="home-mt16"
              title={t("home.banner.title", { from: 2, to: 8 })}
              subtitle={t("home.banner.subtitle")}
              onTap={() => push({ name: "paywall", source: "home_banner" })}
            />
          )}

          {vm.tiles.length > 0 ? (
            <view className="home-section">
              <text className="home-section-title">{t("home.continueWatching")}</text>
              <Pressable onTap={() => push({ name: "library", filter: "in_progress" })}>
                <text className="home-section-action">{t("home.seeAll")}</text>
              </Pressable>
            </view>
          ) : null}
        </view>

        {vm.tiles.length > 0 ? (
          <scroll-view className="home-hscroll" scroll-orientation="horizontal">
            {vm.tiles.map((c) => (
              <Tile
                key={c.sessionId}
                className="home-tile"
                art={c.art}
                title={c.title}
                caption={c.caption}
                progress={c.progress}
                locked={c.locked}
                onTap={() => {
                  if (c.locked) {
                    haptic("warning");
                    openLocked({
                      contentType: "program",
                      contentId: c.programId,
                      title: c.title,
                      packProductId: c.pack ? (c.pack as `pack_${string}`) : undefined,
                      source: "home",
                    });
                  } else {
                    push({ name: "player", sessionId: c.sessionId, source: "continue", resumeAtSec: Math.round(c.progress * 90) });
                  }
                }}
              />
            ))}
            <view className="home-hscroll-end" />
          </scroll-view>
        ) : null}
        <view className="home-bottom-pad" />
        <view className="tab-clearance" />
      </scroll-view>
    </view>
  );
}
