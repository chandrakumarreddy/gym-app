import { request, USE_MOCKS } from "@/api/client.ts";
import { respond } from "@/api/mock/respond.ts";
import type { MuscleBalance, ProgressRange, ProgressSummary } from "@/types/progress.ts";

const DAY = 86_400_000;

export function mockProgress(range: ProgressRange): ProgressSummary {
  return {
    range,
    workoutsDone: 3,
    workoutsPlanned: 4,
    volumeKg: 9600,
    volumeDeltaPct: 12,
    streakDays: 6,
    days: [
      { day: "M", kg: 3000 },
      { day: "T", kg: 0 },
      { day: "W", kg: 3800 },
      { day: "T", kg: 0 },
      { day: "F", kg: 4800 },
      { day: "S", kg: 1600 },
      { day: "S", kg: 0 },
    ],
    records: [
      { id: "pr1", exercise: "Romanian deadlift", weightKg: 40, reps: 10, achievedAt: new Date(Date.now() - DAY).toISOString(), isNew: true },
      { id: "pr2", exercise: "Dumbbell bench press", weightKg: 22.5, reps: 8, achievedAt: new Date(Date.now() - 6 * DAY).toISOString(), isNew: false },
    ],
  };
}

export async function getProgress(range: ProgressRange): Promise<ProgressSummary> {
  if (!USE_MOCKS) return request(`/progress?range=${range}`);
  return respond(mockProgress(range));
}

export async function getMuscleBalance(): Promise<MuscleBalance> {
  if (!USE_MOCKS) return request("/progress/muscle-balance");
  const muscles = ["Chest", "Back", "Shoulders", "Arms", "Core", "Quads", "Glutes", "Hamstrings", "Calves"];
  return respond(muscles.map((muscle, i) => ({ muscle, level: ((i * 7) % 4) as 0 | 1 | 2 | 3 })));
}
