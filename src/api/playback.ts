import { request, USE_MOCKS } from "@/api/client.ts";
import { respond } from "@/api/mock/respond.ts";

export const MOCK_HLS_URL = "https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8";

export async function getPlaybackUrl(exerciseId: string): Promise<{ hlsUrl: string; expiresAt: number }> {
  if (!USE_MOCKS) return request(`/playback/${exerciseId}`);
  return respond({ hlsUrl: MOCK_HLS_URL, expiresAt: Date.now() + 3_600_000 }, 100);
}
