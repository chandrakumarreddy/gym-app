export type Exercise = {
  id: string;
  name: string;
  videoUrl: string;
  durationSec: number;
};

export type Workout = {
  id: string;
  title: string;
  coach: string;
  durationMin: number;
  premium: boolean;
  exercises: Exercise[];
};
