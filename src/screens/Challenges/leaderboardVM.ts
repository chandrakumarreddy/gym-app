import type { Locale } from "@/hooks/useLocale.tsx";
import type { AvatarTone } from "@/types/content.ts";
import type { LeaderboardEntry } from "@/types/challenge.ts";
import { formatNumber } from "@/utils/format.ts";

export type RowVM = { key: string; rank: number; initials: string; avatarTone: AvatarTone; name: string; scoreLabel: string; isMe: boolean };

export const CHUNK = 20;
export const TOP_N = 3;

export function toRow(e: LeaderboardEntry, locale: Locale, meName: string): RowVM {
  return {
    key: e.userId,
    rank: e.rank,
    initials: e.initials,
    avatarTone: e.tone,
    name: e.isMe ? meName : e.name,
    scoreLabel: formatNumber(e.score, locale),
    isMe: e.isMe,
  };
}

export function weekdayLabel(iso: string, locale: Locale): string {
  const d = new Date(iso);
  try {
    return d.toLocaleDateString(locale === "hi" ? "hi-IN" : "en-IN", { weekday: "long" });
  } catch {
    return d.toDateString().slice(0, 3);
  }
}
