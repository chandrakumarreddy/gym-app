export type Goal = "build_muscle" | "lose_fat" | "get_stronger" | "move_better";
export type Level = "beginner" | "intermediate" | "advanced";
export type TrainLocation = "gym" | "home" | "both";
export type Equipment = "dumbbells" | "barbell" | "machines" | "bands" | "kettlebell" | "bodyweight";
export type Weekday = 0 | 1 | 2 | 3 | 4 | 5 | 6;
export type SessionMinutes = 20 | 30 | 45 | 60;
export type WeightUnit = "kg" | "lb";
export type BodyLimit = "lower_back" | "knees" | "shoulders" | "wrists";

export type QuizAnswers = {
  goal?: Goal;
  level?: Level;
  location?: TrainLocation;
  equipment: Equipment[];
  daysPerWeek: number;
  days: Weekday[];
  sessionMin: SessionMinutes;
  weightKg: number;
  weightUnit: WeightUnit;
  heightCm: number;
  age: number;
  limits: BodyLimit[];
  noLimits: boolean;
};

export type QuizStep = 0 | 1 | 2 | 3 | 4;

export type QuizDraft = {
  answers: QuizAnswers;
  lastStep: QuizStep;
  updatedAt: number;
};
