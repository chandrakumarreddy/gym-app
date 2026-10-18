import { useEffect, useMemo, useState } from "@lynx-js/react";

import { haptic } from "@/api/haptics.ts";
import { followCoach, getCoach, getCoachPrograms } from "@/api/coaches.ts";
import { Art } from "@/components/Art/Art.tsx";
import { Avatar } from "@/components/Avatar/Avatar.tsx";
import { Button } from "@/components/Button/Button.tsx";
import { Chip } from "@/components/Chip/Chip.tsx";
import { Icon } from "@/components/Icon/Icon.tsx";
import { IconButton } from "@/components/IconButton/IconButton.tsx";
import { ListRow } from "@/components/ListRow/ListRow.tsx";
import { ProBadge } from "@/components/ProBadge/ProBadge.tsx";
import { Pressable } from "@/components/Pressable/Pressable.tsx";
import { Skeleton } from "@/components/Skeleton/Skeleton.tsx";
import { useAsync } from "@/hooks/useAsync.ts";
import { useLocale } from "@/hooks/useLocale.tsx";
import { useRouter } from "@/hooks/useRouter.tsx";
import { useSkeletonCount } from "@/hooks/useSkeletonCount.ts";
import { getOffering, purchase, useEntitlements } from "@/services/purchases.ts";
import type { CoachProgram } from "@/types/coach.ts";
import type { ProductId } from "@/types/purchases.ts";
import type { StringKey } from "@/hooks/useLocale.tsx";
import type { RouteParams } from "@/types/route.ts";
import { formatCount, formatInr } from "@/utils/format.ts";

import { CoachingOfferCard } from "./components/CoachingOfferCard/CoachingOfferCard.tsx";

import "./CoachProfile.css";

const ACCESS_KEY: Record<CoachProgram["access"], StringKey> = {
  free: "coach.access.free",
  premium: "coach.access.premium",
  pack: "coach.access.pack",
};

function SkelLine({ h, w, className = "" }: { h: number; w: number | string; className?: string }) {
  return (
    <view className={`coach-skel-line ${className}`} style={{ height: `${h}px` }}>
      <Skeleton width={w} height={Math.round(h * 0.65)} radius={6} />
    </view>
  );
}

function ProgramRowsSkeleton({ count }: { count: number }) {
  return (
    <view>
      {Array.from({ length: count }, (_, i) => (
        <view key={i} className="list-row coach-program">
          <view className="list-row-thumb">
            <Skeleton width={64} height={64} radius={14} />
          </view>
          <view className="list-row-body">
            <Skeleton width="70%" height={14} radius={6} />
            <Skeleton width="50%" height={12} radius={6} className="coach-skel-gap" />
          </view>
          <Skeleton width={72} height={36} radius={12} />
        </view>
      ))}
    </view>
  );
}

function CoachSkeleton({ offer, programs }: { offer: boolean; programs: number }) {
  return (
    <view>
      <view className="coach-avatar-ring">
        <Skeleton width={84} height={84} radius={999} />
      </view>
      <view className="coach-row coach-id">
        <view className="coach-id-copy">
          <SkelLine h={28} w={180} />
          <SkelLine h={18} w={220} className="coach-skel-gap2" />
        </view>
        <Skeleton width={96} height={36} radius={12} />
      </view>
      <view className="coach-stats">
        {[0, 1, 2].map((i) => (
          <view key={i} className="coach-stat">
            <SkelLine h={26} w={40} />
            <SkelLine h={14} w={56} />
          </view>
        ))}
      </view>
      {offer ? <Skeleton height={180} radius={22} className="coach-skel-offer" /> : null}
      {programs > 0 ? (
        <view>
          <view className="coach-row coach-section">
            <SkelLine h={22} w={100} />
          </view>
          <ProgramRowsSkeleton count={programs} />
        </view>
      ) : null}
    </view>
  );
}

type BuyState = { id: string; status: "buying" | "error" | "pending" } | null;

export function CoachProfile({ coachId }: RouteParams<"coach">) {
  const { t, locale } = useLocale();
  const { push, back, openLocked } = useRouter();
  const { isPremium, entitlements } = useEntitlements();
  const [attempt, setAttempt] = useState(0);
  const coach = useAsync(() => getCoach(coachId), [coachId, attempt]);
  const [programsAttempt, setProgramsAttempt] = useState(0);
  const programs = useAsync(() => getCoachPrograms(coachId, 2), [coachId, attempt, programsAttempt]);
  const prices = useAsync(() => getOffering().then((o) => o.products.map((p) => [p.id, p.priceString] as const)), []);
  const skelPrograms = useSkeletonCount("coach.programs", 2, programs.loading ? undefined : programs.data?.length);
  const skelOffer = useSkeletonCount("coach.offer", 1, coach.loading || !coach.data ? undefined : coach.data.coaching ? 1 : 0);
  const [following, setFollowing] = useState(false);
  const [buy, setBuy] = useState<BuyState>(null);

  const c = coach.data ?? null;
  const coachFailed = !!coach.error || (!coach.loading && !c);
  const programsFailed = !programs.loading && !!programs.error;

  useEffect(() => {
    if (coachFailed || programsFailed) haptic("error");
  }, [coachFailed, programsFailed]);
  useEffect(() => {
    if (c) setFollowing(c.following);
  }, [c]);

  const vm = useMemo(() => {
    if (!c) return null;
    return {
      stats: [
        { key: "p", value: formatCount(c.stats.programs), label: t("coach.stat.programs") },
        { key: "v", value: formatCount(c.stats.videos, "+"), label: t("coach.stat.videos") },
        { key: "y", value: t("coach.years", { n: c.stats.yearsCoaching }), label: t("coach.stat.coaching") },
      ],
      price: c.coaching ? formatInr(c.coaching.priceMonthly, locale) : "",
    };
  }, [c, t, locale]);

  const rows = useMemo(() => {
    const priceMap = new Map<string, string>(prices.data ?? []);
    return (programs.data ?? []).map((p) => ({
      ...p,
      subtitle: `${t("coach.program.weeks", { n: p.weeks })} · ${t(ACCESS_KEY[p.access])}`,
      price: p.packProductId ? priceMap.get(p.packProductId) ?? null : null,
      owned: !!p.packProductId && entitlements.packs.includes(p.packProductId),
    }));
  }, [programs.data, prices.data, entitlements.packs, t]);

  const onFollow = () => {
    if (!c) return;
    const next = !following;
    setFollowing(next);
    followCoach(c.id, next).then(
      (r) => setFollowing(r.following),
      () => setFollowing(!next),
    );
  };

  const openProgram = (p: CoachProgram) => {
    if (p.access === "premium" && !isPremium) {
      haptic("warning");
      const opened = openLocked({ contentType: "program", contentId: p.id, title: p.title, source: "coach_profile" });
      if (opened) return;
    }
    push({ name: "program", programId: p.id });
  };

  const buyPack = (p: CoachProgram) => {
    if (!p.packProductId || buy?.status === "buying") return;
    haptic("medium");
    setBuy({ id: p.id, status: "buying" });
    purchase(p.packProductId as ProductId).then(
      (r) => {
        if (r.status === "success") haptic("success");
        else if (r.status === "error") haptic("error");
        if (r.status === "success" || r.status === "cancelled") setBuy(null);
        else setBuy({ id: p.id, status: r.status === "pending" ? "pending" : "error" });
      },
      () => {
        haptic("error");
        setBuy({ id: p.id, status: "error" });
      },
    );
  };

  const trailing = (r: (typeof rows)[number]) => {
    if (r.access === "premium") return <ProBadge size="icon" />;
    if (r.access !== "pack") return <Icon name="chev-r" tone="dim" size={18} />;
    if (r.owned || isPremium) return <Chip label={t("coach.owned")} size="sm" />;
    if (!r.price) return prices.loading ? <Skeleton width={72} height={36} radius={12} /> : <Icon name="chev-r" tone="dim" size={18} />;
    return (
      <view catchtap={() => buyPack(r)}>
        <Button label={r.price} variant="ghost" size="sm" loading={buy?.id === r.id && buy.status === "buying"} />
      </view>
    );
  };

  return (
    <view className="coach">
      <scroll-view className="coach-scroll" scroll-orientation="vertical">
        <view className="coach-hero">
          {c ? (
            <Art spec={{ ...c.art, variant: "dark" }} fill figureScale={0.8} className="coach-hero-art" />
          ) : coach.loading ? (
            <Skeleton height="100%" radius={0} />
          ) : null}
          <view className="coach-hero-floor" />
        </view>

        <view className="coach-body">
          {coach.error || (!coach.loading && !c) ? (
            <view className="coach-error">
              <text className="coach-muted">{t("coach.error")}</text>
              <Button label={t("common.retry")} variant="ghost" size="sm" className="coach-retry" onTap={() => setAttempt((n) => n + 1)} />
            </view>
          ) : !c || !vm ? (
            <CoachSkeleton offer={skelOffer > 0} programs={skelPrograms} />
          ) : (
            <view>
              <view className="coach-avatar-ring">
                <Avatar initials={c.initials} tone={c.tone} size={84} />
              </view>
              <view className="coach-row coach-id">
                <view className="coach-id-copy">
                  <text className="coach-name">{c.name}</text>
                  <text className="coach-muted">{c.tagline}</text>
                </view>
                <Button label={following ? t("coach.following") : t("coach.follow")} variant={following ? "ghost" : "light"} size="sm" onTap={onFollow} />
              </view>

              <view className="coach-stats">
                {vm.stats.map((s) => (
                  <view key={s.key} className="coach-stat">
                    <text className="coach-stat-v">{s.value}</text>
                    <text className="coach-stat-l">{s.label}</text>
                  </view>
                ))}
              </view>

              {c.coaching ? (
                <CoachingOfferCard
                  eyebrow={t("coach.offer.eyebrow")}
                  availabilityLabel={c.coaching.acceptingClients ? t("coach.offer.accepting") : undefined}
                  title={c.coaching.title}
                  description={c.coaching.description}
                  priceLabel={vm.price}
                  periodLabel={t("coach.offer.perMonth")}
                  ctaLabel={c.coaching.acceptingClients ? t("coach.offer.apply") : t("coach.offer.waitlist")}
                  ctaVariant={c.coaching.acceptingClients ? "primary" : "ghost"}
                />
              ) : null}

              {programs.loading ? (
                skelPrograms > 0 ? (
                  <view>
                    <view className="coach-row coach-section">
                      <text className="coach-h3">{t("coach.programs")}</text>
                    </view>
                    <ProgramRowsSkeleton count={skelPrograms} />
                  </view>
                ) : null
              ) : programs.error ? (
                <view>
                  <view className="coach-row coach-section">
                    <text className="coach-h3">{t("coach.programs")}</text>
                    <Button label={t("common.retry")} variant="ghost" size="sm" onTap={() => setProgramsAttempt((n) => n + 1)} />
                  </view>
                </view>
              ) : rows.length > 0 ? (
                <view>
                  <view className="coach-row coach-section">
                    <text className="coach-h3">{t("coach.programs")}</text>
                    {c.stats.programs > rows.length ? (
                      <Pressable onTap={() => push({ name: "library", coachId: c.id })}>
                        <text className="coach-link">{t("coach.programs.all", { n: c.stats.programs })}</text>
                      </Pressable>
                    ) : null}
                  </view>
                  {rows.map((r) => (
                    <view key={r.id}>
                      <ListRow
                        title={r.title}
                        subtitle={r.subtitle}
                        thumb={<Art spec={r.art} size={64} radius={14} />}
                        trailing={trailing(r)}
                        className="coach-program"
                        onTap={() => openProgram(r)}
                      />
                      {buy?.id === r.id && buy.status !== "buying" ? (
                        <text className="coach-buy-msg">{buy.status === "error" ? t("coach.purchaseFailed") : t("coach.purchasePending")}</text>
                      ) : null}
                    </view>
                  ))}
                </view>
              ) : null}
            </view>
          )}
        </view>
      </scroll-view>

      <view className="coach-topbar">
        <IconButton icon="chev-l" variant="glass" onTap={() => back()} />
        {/* Share hidden: no native share module yet. */}
      </view>
    </view>
  );
}
