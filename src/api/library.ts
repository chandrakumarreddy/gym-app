import { request, USE_MOCKS } from "@/api/client.ts";
import { COACHES, PROGRAMS } from "@/api/mock/content.ts";
import { respond } from "@/api/mock/respond.ts";
import type { LibraryFeed } from "@/types/content.ts";

export const MOCK_LIBRARY: LibraryFeed = {
  filters: [
    { id: "all", label: "All" },
    { id: "gym", label: "Gym" },
    { id: "home", label: "Home" },
    { id: "strength", label: "Strength" },
    { id: "mobility", label: "Mobility" },
  ],
  programs: PROGRAMS,
  coaches: COACHES,
  quick: [
    { sessionId: "quick-desk-break", title: "Desk-break mobility", durationMin: 12, premium: false, art: { variant: "v3", figure: "stretch" } },
    { sessionId: "quick-core-burn", title: "10-min core burn", durationMin: 10, premium: true, art: { variant: "v1", figure: "pushup" } },
  ],
};

export async function getLibrary(filter?: string): Promise<LibraryFeed> {
  if (!USE_MOCKS) return request<LibraryFeed>(`/library${filter ? `?filter=${filter}` : ""}`);
  return respond(MOCK_LIBRARY);
}
