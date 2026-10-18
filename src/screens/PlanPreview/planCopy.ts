import type { IconName } from "@/components/Icon/Icon.tsx";
import type { TFn } from "@/hooks/useLocale.tsx";
import type { Plan, PlanWeek } from "@/types/plan.ts";

export type MetaItem = { icon: IconName; label: string };
export type PreviewRow = { id: string; title: string; subtitle: string };
export type LockedCopy = { title: string; sub: string };

export function formatPlanMeta(plan: Plan, t: TFn): MetaItem[] {
  return [
    {
      icon: "calendar",
      label: plan.totalWeeks === 1 ? t("planPreview.weeksOne") : t("planPreview.weeks", { n: plan.totalWeeks }),
    },
    {
      icon: "dumbbell",
      label: t("planPreview.perWeek", { n: plan.sessionsPerWeek }),
    },
    { icon: "clock", label: t("planPreview.min", { n: plan.sessionMin }) },
  ];
}

export function toPreviewRows(week: PlanWeek | undefined, t: TFn): PreviewRow[] {
  if (!week) return [];
  const s = week.sessions;
  const single = (i: number): PreviewRow => ({
    id: s[i].id,
    title: s[i].title,
    subtitle: t("planPreview.day", { n: i + 1, min: s[i].durationMin }),
  });
  if (s.length <= 3) return s.map((_, i) => single(i));
  const rest = s.slice(2);
  return [
    single(0),
    single(1),
    {
      id: rest.map((x) => x.id).join("+"),
      title: rest.map((x) => x.title).join(" · "),
      subtitle: t("planPreview.days", {
        from: 3,
        to: s.length,
        min: rest[0].durationMin,
      }),
    },
  ];
}

export function lockedCopy(plan: Plan, t: TFn): LockedCopy | null {
  const locked = plan.weeks.filter((w) => !w.free);
  if (!locked.length) return null;
  const from = locked[0].index;
  const to = locked[locked.length - 1].index;
  const count = locked.reduce((n, w) => n + w.sessions.length, 0);
  return {
    title: from === to ? t("planPreview.lockedOne", { n: from }) : t("planPreview.lockedRange", { from, to }),
    sub: t("planPreview.lockedSub", { n: count }),
  };
}
