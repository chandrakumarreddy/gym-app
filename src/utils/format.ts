export function greeting(date: Date): string {
  const h = date.getHours();
  if (h < 12) return "Good morning";
  if (h < 18) return "Good afternoon!";
  return "Good evening";
}

export function formatDuration(totalSec: number): string {
  const m = Math.floor(totalSec / 60);
  const s = totalSec % 60;
  return `${m}:${String(s).padStart(2, "0")}`;
}

export type NumberLocale = "en" | "hi";

function intlLocale(locale: NumberLocale): string {
  return locale === "hi" ? "hi-IN" : "en-IN";
}

export function formatClock(totalSec: number): string {
  const sec = Math.max(0, Math.floor(totalSec));
  const h = Math.floor(sec / 3600);
  const m = Math.floor((sec % 3600) / 60);
  const s = sec % 60;
  const ss = String(s).padStart(2, "0");
  return h > 0 ? `${h}:${String(m).padStart(2, "0")}:${ss}` : `${m}:${ss}`;
}

export function formatNumber(n: number, locale: NumberLocale = "en"): string {
  try {
    return new Intl.NumberFormat(intlLocale(locale)).format(n);
  } catch {
    return String(n).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
}

export function formatKg(kg: number): string {
  return Number.isInteger(kg) ? String(kg) : kg.toFixed(1).replace(/\.0$/, "");
}

export function formatSet(weightKg: number, reps: number): string {
  return `${formatKg(weightKg)} kg × ${reps}`;
}

export function formatTonnes(kg: number): string {
  return (kg / 1000).toFixed(1).replace(/\.0$/, "");
}

export function formatDeltaPct(pct: number): string {
  const r = Math.round(pct);
  return r > 0 ? `+${r}%` : r < 0 ? `−${Math.abs(r)}%` : "0%";
}

export function formatInr(amount: number, locale: NumberLocale = "en"): string {
  return `₹${formatNumber(amount, locale)}`;
}

export function formatBytes(bytes: number): string {
  if (bytes >= 1_073_741_824) return `${(bytes / 1_073_741_824).toFixed(1)} GB`;
  if (bytes >= 1_048_576) return `${Math.round(bytes / 1_048_576)} MB`;
  return `${Math.max(1, Math.round(bytes / 1024))} KB`;
}

export function formatCount(n: number, suffix = ""): string {
  return `${n}${suffix}`;
}

export function formatPercent(fraction: number): string {
  return `${Math.round(Math.max(0, Math.min(1, fraction)) * 100)}%`;
}

export function formatReps(reps: number | [number, number]): string {
  return Array.isArray(reps) ? `${reps[0]}–${reps[1]}` : String(reps);
}

export function formatTime12(hhmm: string): string {
  const [h, m] = hhmm.split(":").map(Number);
  const suffix = h >= 12 ? "pm" : "am";
  return `${h % 12 || 12}:${String(m).padStart(2, "0")} ${suffix}`;
}

export function pad2(n: number): string {
  return String(Math.max(0, Math.floor(n))).padStart(2, "0");
}
