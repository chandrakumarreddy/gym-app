import type { Workout } from "@/types/workout.ts";

import { request } from "./client.ts";

export const getWorkouts = () => request<Workout[]>("/workouts");

export const getWorkout = (id: string) => request<Workout>(`/workouts/${id}`);
