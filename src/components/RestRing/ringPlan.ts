export type RingSegment = { from: string; to: string; delay: number; duration: number };
export type RingPlan = { right: RingSegment; left: RingSegment };
export type RingAngles = { right: string; left: string };

function rot(deg: number): string {
  return `rotate(${Math.round(deg * 100) / 100}deg)`;
}

export function ringAngles(progress: number): RingAngles {
  const a = Math.min(1, Math.max(0, progress)) * 360;
  return { right: rot(Math.min(a, 180)), left: rot(Math.max(a - 180, 0)) };
}

export function ringPlan(remainingMs: number, totalMs: number): RingPlan {
  const rem = Math.max(0, remainingMs);
  const a0 = totalMs > 0 ? Math.min(1, rem / totalMs) * 360 : 0;
  const leftMs = a0 > 180 ? Math.round((rem * (a0 - 180)) / a0) : 0;
  return {
    left: { from: rot(Math.max(a0 - 180, 0)), to: rot(0), delay: 0, duration: Math.max(1, leftMs) },
    right: { from: rot(Math.min(a0, 180)), to: rot(0), delay: leftMs, duration: Math.max(1, rem - leftMs) },
  };
}
