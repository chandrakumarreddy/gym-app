import { request, USE_MOCKS } from "@/api/client.ts";
import { respond } from "@/api/mock/respond.ts";
import type { DownloadsSummary, UserProfile } from "@/types/user.ts";

let profile: UserProfile = {
  id: "me",
  name: "Aarav Kumar",
  initials: "AK",
  units: { weight: "kg", length: "cm" },
  reminderTime: "18:30",
  healthSync: true,
  locale: "en",
};

export async function getProfile(): Promise<UserProfile> {
  if (!USE_MOCKS) return request("/me");
  return respond(profile);
}

export async function updateProfile(patch: Partial<UserProfile>): Promise<UserProfile> {
  if (!USE_MOCKS) return request("/me", { method: "PATCH", body: JSON.stringify(patch) });
  profile = { ...profile, ...patch };
  return respond(profile, 200);
}

export async function getDownloadsSummary(): Promise<DownloadsSummary> {
  return respond({ count: 3, bytes: 1_288_490_189 }, 50);
}
