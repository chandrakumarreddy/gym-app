import { request, USE_MOCKS } from "@/api/client.ts";
import { PROGRAMS, weeksFor } from "@/api/mock/content.ts";
import { respond } from "@/api/mock/respond.ts";
import type { ProgramDetail, ProgramProgress } from "@/types/content.ts";

export async function getProgram(programId: string): Promise<ProgramDetail | null> {
  if (!USE_MOCKS) return request<ProgramDetail>(`/programs/${programId}`);
  const p = PROGRAMS.find((x) => x.id === programId);
  return respond(p ? { ...p, weekList: weeksFor(p) } : null);
}

export async function getProgramProgress(programId: string): Promise<ProgramProgress> {
  if (!USE_MOCKS) return request<ProgramProgress>(`/programs/${programId}/progress`);
  return respond({
    programId,
    doneSessionIds: [`${programId}-w1d1`, `${programId}-w1d2`],
    nextSessionId: `${programId}-w1d3`,
    currentWeek: 1,
  });
}
