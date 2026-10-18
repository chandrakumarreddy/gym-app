import type { Equipment, TrainLocation } from "@/types/quiz.ts";

const DEFAULT_EQUIPMENT: Record<TrainLocation, Equipment[]> = {
  gym: ["dumbbells", "barbell", "machines"],
  home: ["bodyweight", "bands"],
  both: ["dumbbells", "bands", "bodyweight"],
};

export function defaultEquipmentFor(location: TrainLocation): Equipment[] {
  return [...DEFAULT_EQUIPMENT[location]];
}

export function toggleEquipment(list: Equipment[], e: Equipment): Equipment[] {
  if (list.includes(e)) return list.filter((x) => x !== e);
  if (e === "bodyweight") return ["bodyweight"];
  return [...list.filter((x) => x !== "bodyweight"), e];
}
