import { request, USE_MOCKS } from "@/api/client.ts";
import { COACHES, PROGRAMS } from "@/api/mock/content.ts";
import { respond } from "@/api/mock/respond.ts";
import type { CoachProfile, CoachProgram } from "@/types/coach.ts";

export async function getCoach(coachId: string): Promise<CoachProfile | null> {
  if (!USE_MOCKS) return request(`/coaches/${coachId}`);
  const c = COACHES.find((x) => x.id === coachId);
  if (!c) return respond(null);
  return respond({
    id: c.id,
    name: c.name,
    initials: c.initials,
    tone: c.tone,
    tagline: c.id === "priya" ? "Mobility & core · Bengaluru" : `${c.specialty} coach · Mumbai`,
    art: { variant: "v4", figure: c.id === "priya" ? "stretch" : "deadlift" },
    stats: { programs: 6, videos: 140, yearsCoaching: 9 },
    following: false,
    coaching: {
      planId: `${c.id}-1on1`,
      title: "1:1 coaching",
      description: "A plan written for you, weekly check-ins and form reviews.",
      priceMonthly: 2999,
      currency: "INR",
      acceptingClients: true,
    },
  });
}

export async function getCoachPrograms(coachId: string, limit = 2): Promise<CoachProgram[]> {
  if (!USE_MOCKS) return request(`/coaches/${coachId}/programs?limit=${limit}`);
  const list = PROGRAMS.map<CoachProgram>((p) => ({
    id: p.id,
    title: p.title,
    weeks: p.weeks,
    art: p.art,
    access: p.premium ? (p.packProductId ? "pack" : "premium") : "free",
    packProductId: p.packProductId,
  }));
  return respond(list.slice(0, limit));
}

export async function followCoach(coachId: string, follow: boolean): Promise<{ following: boolean }> {
  if (!USE_MOCKS) return request(`/coaches/${coachId}/follow`, { method: follow ? "POST" : "DELETE" });
  return respond({ following: follow }, 200);
}
