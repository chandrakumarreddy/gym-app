import { useEffect, useMemo, useRef, useState } from "@lynx-js/react";
import type { ReactNode } from "@lynx-js/react";

import { track } from "@/api/analytics.ts";
import { getBadges, getCurrentChallenge, getLeaderboard, getUpcomingChallenges, joinChallenge } from "@/api/challenges.ts";
import { Button } from "@/components/Button/Button.tsx";
import { Icon } from "@/components/Icon/Icon.tsx";
import type { IconName } from "@/components/Icon/Icon.tsx";
import { IconButton } from "@/components/IconButton/IconButton.tsx";
import { LeaderboardRow } from "@/components/LeaderboardRow/LeaderboardRow.tsx";
import { ListRow } from "@/components/ListRow/ListRow.tsx";
import { Skeleton } from "@/components/Skeleton/Skeleton.tsx";
import { useAsync } from "@/hooks/useAsync.ts";
import { useLocale } from "@/hooks/useLocale.tsx";
import { useSkeletonCount } from "@/hooks/useSkeletonCount.ts";
import { useRouter } from "@/hooks/useRouter.tsx";
import { useEntitlements } from "@/services/purchases.ts";
import type { Badge, ChallengeTab, LeaderboardEntry } from "@/types/challenge.ts";
import type { RouteParams } from "@/types/route.ts";
import { formatNumber, formatPercent } from "@/utils/format.ts";

import { ChallengeHero } from "./components/ChallengeHero/ChallengeHero.tsx";
import { BadgeRowSkeleton, LeaderboardRowSkeleton, PremiumCardSkeleton } from "./components/ChallengesSkeleton/ChallengesSkeleton.tsx";
import { PremiumChallengeCard } from "./components/PremiumChallengeCard/PremiumChallengeCard.tsx";
import { UnderlineTabs } from "./components/UnderlineTabs/UnderlineTabs.tsx";
import { CHUNK, TOP_N, toRow, weekdayLabel } from "./leaderboardVM.ts";
import type { RowVM } from "./leaderboardVM.ts";

import "./Challenges.css";

type LbPhase = "initial" | "more" | "idle";

const LB_SKELETON_TOP = 4;
const LB_SKELETON_REST = 6;
const LB_SKELETON_MORE = 2;
const LIST_SKELETON_ROWS = 3;

export function Challenges({ challengeId: _challengeId, tab: initialTab }: RouteParams<"challenges">) {
  const { t, locale } = useLocale();
  const { push } = useRouter();
  const { isPremium } = useEntitlements();
  const [tab, setTab] = useState<ChallengeTab>(initialTab ?? "leaderboard");
  const [attempt, setAttempt] = useState(0);
  const [joinedNow, setJoinedNow] = useState(false);
  const [joining, setJoining] = useState(false);

  const current = useAsync(() => getCurrentChallenge(), [attempt]);
  const upcoming = useAsync(() => getUpcomingChallenges(), [attempt]);
  const challenge = current.data ?? null;
  const challengeId = challenge?.id;

  const [rows, setRows] = useState<RowVM[]>([]);
  const [me, setMe] = useState<RowVM | null>(null);
  const [friends, setFriends] = useState<RowVM[] | null>(null);
  const [badges, setBadges] = useState<Badge[] | null>(null);
  const [friendsError, setFriendsError] = useState(false);
  const [badgesError, setBadgesError] = useState(false);
  const [lbPhase, setLbPhase] = useState<LbPhase>("initial");
  const [lbError, setLbError] = useState(false);
  const cursor = useRef<string | undefined>(undefined);
  const busy = useRef(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const meName = t("common.you");

  const appendChunked = (entries: LeaderboardEntry[], done: () => void) => {
    let i = 0;
    const step = () => {
      const chunk = entries.slice(i, i + CHUNK).map((e) => toRow(e, locale, meName));
      i += CHUNK;
      setRows((prev) => [...prev, ...chunk]);
      if (i < entries.length) timer.current = setTimeout(step, 0);
      else done();
    };
    step();
  };

  const loadPage = () => {
    if (!challengeId || busy.current) return;
    busy.current = true;
    const first = cursor.current === undefined && rows.length === 0;
    setLbError(false);
    setLbPhase(first ? "initial" : "more");
    getLeaderboard(challengeId, "global", cursor.current).then(
      (page) => {
        cursor.current = page.nextCursor ?? "";
        if (first) setMe(toRow(page.me, locale, meName));
        appendChunked(page.entries, () => {
          busy.current = false;
          setLbPhase("idle");
        });
      },
      () => {
        busy.current = false;
        setLbPhase("idle");
        if (first) setLbError(true);
      },
    );
  };

  useEffect(() => {
    setRows([]);
    setMe(null);
    setLbError(false);
    setLbPhase("initial");
    cursor.current = undefined;
    busy.current = false;
    if (challengeId) loadPage();
    return () => {
      if (timer.current) clearTimeout(timer.current);
    };
  }, [challengeId, locale]);

  useEffect(() => {
    if (tab === "friends" && friends === null && !friendsError && challengeId) {
      getLeaderboard(challengeId, "friends").then(
        (page) => setFriends(page.entries.map((e) => toRow(e, locale, meName))),
        () => setFriendsError(true),
      );
    }
    if (tab === "badges" && badges === null && !badgesError) {
      getBadges().then(setBadges, () => setBadgesError(true));
    }
  }, [tab, challengeId, friendsError, badgesError]);

  const onLower = () => {
    if (tab === "leaderboard" && cursor.current) loadPage();
  };

  const hero = useMemo(() => {
    if (!challenge) return null;
    const ratio = challenge.goalReps > 0 ? challenge.myReps / challenge.goalReps : 0;
    return {
      endsAt: Date.parse(challenge.endsAt),
      progressLabel: t("challenges.progress", { done: formatNumber(challenge.myReps, locale), goal: formatNumber(challenge.goalReps, locale) }),
      percentLabel: formatPercent(ratio),
      meterWidth: formatPercent(ratio),
    };
  }, [challenge, t, locale]);

  const premiumCards = useMemo(
    () =>
      (upcoming.data ?? [])
        .filter((c) => c.premium)
        .map((c) => ({ id: c.id, art: c.art, title: c.title, caption: t("challenges.startsOn", { day: weekdayLabel(c.startsAt, locale) }) })),
    [upcoming.data, t, locale],
  );

  const top = useMemo(() => rows.filter((r) => r.rank <= TOP_N), [rows]);
  const rest = useMemo(() => rows.filter((r) => r.rank > TOP_N), [rows]);
  const pinMe = me && me.rank > TOP_N ? me : null;

  const tabs = useMemo(
    () => [
      { id: "leaderboard" as const, label: t("challenges.tab.leaderboard") },
      { id: "friends" as const, label: t("challenges.tab.friends") },
      { id: "badges" as const, label: t("challenges.tab.badges") },
    ],
    [t],
  );

  const onJoin = () => {
    if (!challenge || joining) return;
    setJoining(true);
    joinChallenge(challenge.id).then(
      () => {
        setJoining(false);
        setJoinedNow(true);
      },
      () => setJoining(false),
    );
  };

  const onPremiumCard = (id: string) => {
    if (isPremium) return; // TODO: challenge detail route
    track("lock_tapped", { content: `challenge:${id}` });
    push({ name: "paywall", source: "challenges", contentId: id });
  };

  const premiumCount = useSkeletonCount("challenges.premium", 1, upcoming.loading ? undefined : premiumCards.length);
  const premiumItems = upcoming.loading
    ? Array.from({ length: premiumCount }, (_, i) => (
        <list-item key={`pro-sk-${i}`} item-key={`pro-sk-${i}`} className="challenges-item">
          <PremiumCardSkeleton />
        </list-item>
      ))
    : premiumCards.map((c) => (
        <list-item key={`pro-${c.id}`} item-key={`pro-${c.id}`} className="challenges-item">
          <PremiumChallengeCard art={c.art} title={c.title} caption={c.caption} onTap={() => onPremiumCard(c.id)} />
        </list-item>
      ));

  const skeletonRows = (prefix: string, count: number) =>
    Array.from({ length: count }, (_, i) => (
      <list-item key={`${prefix}-${i}`} item-key={`${prefix}-${i}`} className="challenges-item challenges-row">
        <LeaderboardRowSkeleton />
      </list-item>
    ));

  const lbPending = rows.length === 0 && !lbError && (current.loading || (!!challengeId && lbPhase !== "idle"));
  const friendsPending = friends === null && !friendsError && (current.loading || !!challengeId);
  const topCount = useSkeletonCount("challenges.top", LB_SKELETON_TOP, lbPhase === "idle" ? top.length + (pinMe ? 1 : 0) : undefined);
  const friendsCount = useSkeletonCount("challenges.friends", LIST_SKELETON_ROWS, friends?.length);
  const badgesCount = useSkeletonCount("challenges.badges", LIST_SKELETON_ROWS, badges?.length);

  const errorItem = (key: string, onRetry: () => void) => (
    <list-item key={key} item-key={key} className="challenges-item">
      <view className="challenges-card challenges-empty">
        <text className="challenges-empty-text">{t("challenges.listError")}</text>
        <Button label={t("common.retry")} variant="ghost" size="sm" onTap={onRetry} />
      </view>
    </list-item>
  );

  const rowItem = (r: RowVM, prefix: string) => (
    <list-item key={`${prefix}-${r.key}`} item-key={`${prefix}-${r.key}`} className="challenges-item challenges-row">
      <LeaderboardRow rank={r.rank} initials={r.initials} avatarTone={r.avatarTone} name={r.name} scoreLabel={r.scoreLabel} isMe={r.isMe} />
    </list-item>
  );

  const friendsEmptyBody = (
    <view className="challenges-empty">
      <text className="challenges-empty-text">{t("challenges.friends.empty")}</text>
      {/* TODO: friends/invite route */}
      <Button label={t("challenges.friends.invite")} variant="ghost" size="sm" />
    </view>
  );

  const ghostItem = (key: string, content: ReactNode) => (
    <list-item key={key} item-key={key} className="challenges-item">
      <view className="challenges-ghost">
        <view className="challenges-ghost-content">{content}</view>
        <Skeleton height="100%" radius={14} className="challenges-ghost-skeleton" />
      </view>
    </list-item>
  );

  let body;
  if (tab === "leaderboard" && lbPending) {
    body = [
      ...skeletonRows("lb-sk-top", topCount),
      ...premiumItems,
      <list-item key="everyone" item-key="everyone" className="challenges-item">
        <text className="challenges-section">{t("challenges.everyone")}</text>
      </list-item>,
      ...skeletonRows("lb-sk-all", LB_SKELETON_REST),
    ];
  } else if (tab === "leaderboard" && lbError) {
    body = [
      <list-item key="lb-error" item-key="lb-error" className="challenges-item">
        <view className="challenges-card challenges-empty">
          <text className="challenges-empty-text">{t("challenges.error")}</text>
          <Button label={t("common.retry")} variant="ghost" size="sm" onTap={loadPage} />
        </view>
      </list-item>,
      ...premiumItems,
    ];
  } else if (tab === "leaderboard") {
    body = [
      ...top.map((r) => rowItem(r, "top")),
      ...(pinMe ? [rowItem(pinMe, "pin")] : []),
      ...premiumItems,
      ...(rest.length > 0
        ? [
            <list-item key="everyone" item-key="everyone" className="challenges-item">
              <text className="challenges-section">{t("challenges.everyone")}</text>
            </list-item>,
          ]
        : []),
      ...rest.map((r) => rowItem(r, "all")),
      ...(lbPhase === "more" ? skeletonRows("lb-sk-more", LB_SKELETON_MORE) : []),
    ];
  } else if (tab === "friends") {
    body = [
      ...(friendsPending
        ? friendsCount === 0
          ? [ghostItem("fr-empty-sk", friendsEmptyBody)]
          : skeletonRows("fr-sk", friendsCount)
        : friendsError
          ? [errorItem("fr-error", () => setFriendsError(false))]
          : friends && friends.length > 0
            ? friends.map((r) => rowItem(r, "fr"))
            : [
                <list-item key="fr-empty" item-key="fr-empty" className="challenges-item">
                  {friendsEmptyBody}
                </list-item>,
              ]),
      ...premiumItems,
    ];
  } else {
    body = [
      ...(badgesError ? [errorItem("b-error", () => setBadgesError(false))] : []),
      ...(badges === null && !badgesError
        ? Array.from({ length: badgesCount }, (_, i) => (
            <list-item key={`b-sk-${i}`} item-key={`b-sk-${i}`} className="challenges-item">
              <BadgeRowSkeleton />
            </list-item>
          ))
        : []),
      ...(badges ?? []).map((b) => (
        <list-item key={`b-${b.id}`} item-key={`b-${b.id}`} className="challenges-item">
          <ListRow
            title={b.name}
            leading={
              <view className={`challenges-badge${b.earned ? " challenges-badge-earned" : ""}`}>
                <Icon name={b.icon as IconName} tone={b.earned ? "ember" : "dim"} size={20} />
              </view>
            }
            trailingText={b.earned ? t("challenges.badge.earned") : t("challenges.badge.locked")}
            trailingTone={b.earned ? "green" : "muted"}
          />
        </list-item>
      )),
      ...premiumItems,
    ];
  }

  return (
    <view className="challenges">
      <list className="challenges-list" scroll-orientation="vertical" lower-threshold-item-count={5} bindscrolltolower={onLower}>
        <list-item key="head" item-key="head" className="challenges-item">
          <view className="challenges-head">
            <text className="challenges-title">{t("challenges.title")}</text>
            <IconButton icon="users" variant="round" onTap={() => setTab("friends")} />
          </view>
          {current.error ? (
            <view className="challenges-card challenges-empty">
              <text className="challenges-empty-text">{t("challenges.error")}</text>
              <Button label={t("common.retry")} variant="ghost" size="sm" onTap={() => setAttempt((n) => n + 1)} />
            </view>
          ) : current.loading ? (
            <Skeleton height={200} radius={22} />
          ) : challenge && hero ? (
            <ChallengeHero
              art={challenge.art}
              title={challenge.title}
              joined={challenge.joined || joinedNow}
              joinedLabel={t("challenges.joined")}
              endsAt={hero.endsAt}
              progressLabel={hero.progressLabel}
              percentLabel={hero.percentLabel}
              meterWidth={hero.meterWidth}
              joinLabel={t("challenges.join")}
              joining={joining}
              onJoin={onJoin}
            />
          ) : (
            <view className="challenges-card challenges-empty">
              <text className="challenges-empty-text">{t("challenges.none")}</text>
            </view>
          )}
          <UnderlineTabs tabs={tabs} value={tab} onChange={setTab} />
          <view className="challenges-gap" />
        </list-item>
        {body}
        <list-item key="foot" item-key="foot" className="challenges-item">
          <view className="challenges-foot" />
        </list-item>
      </list>
    </view>
  );
}
