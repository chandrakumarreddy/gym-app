import { MOCK_LATENCY_MS } from "@/api/client.ts";
import { delay } from "@/utils/delay.ts";

export async function respond<T>(value: T, ms = MOCK_LATENCY_MS): Promise<T> {
  await delay(ms);
  return value;
}
