import type { Coach, CoachRef, Exercise, ExerciseEquipment, Program, Session, Week } from "@/types/content.ts";

export const COACHES: Coach[] = [
  { id: "arjun", name: "Arjun Mehta", initials: "AM", specialty: "Strength", tone: "ember" },
  { id: "priya", name: "Priya Nair", initials: "PN", specialty: "Mobility & core", tone: "warm" },
  { id: "kabir", name: "Kabir Rao", initials: "KR", specialty: "Hypertrophy", tone: "brown" },
  { id: "sana", name: "Sana Iqbal", initials: "SI", specialty: "Conditioning", tone: "ember" },
  { id: "vikram", name: "Vikram Das", initials: "VD", specialty: "Powerlifting", tone: "brown" },
];

export function coachRef(id: string): CoachRef {
  const c = COACHES.find((x) => x.id === id) ?? COACHES[0];
  return { id: c.id, name: c.name, initials: c.initials };
}

export const PROGRAMS: Program[] = [
  {
    id: "strength-builder",
    title: "Strength Builder",
    coachId: "arjun",
    coach: coachRef("arjun"),
    weeks: 8,
    daysPerWeek: 4,
    sessionMin: 45,
    level: "intermediate",
    premium: false,
    tags: ["Gym", "Strength"],
    art: { variant: "v1", figure: "squat" },
    description: "Four guided sessions a week to build real strength on the big lifts.",
  },
  {
    id: "lean-in-30",
    title: "Lean in 30",
    coachId: "sana",
    coach: coachRef("sana"),
    weeks: 5,
    daysPerWeek: 4,
    sessionMin: 30,
    level: "beginner",
    premium: true,
    packProductId: "pack_lean_in_30",
    tags: ["Home", "Fat loss"],
    art: { variant: "v4", figure: "jump" },
    description: "20 follow-along sessions, 30 minutes each. No equipment needed.",
  },
  {
    id: "home-hypertrophy",
    title: "Home Hypertrophy",
    coachId: "kabir",
    coach: coachRef("kabir"),
    weeks: 6,
    daysPerWeek: 3,
    sessionMin: 40,
    level: "intermediate",
    premium: true,
    packProductId: "pack_home_hypertrophy",
    tags: ["Home", "Muscle"],
    art: { variant: "v2", figure: "curl" },
    description: "Build muscle with dumbbells and a bench at home.",
  },
];

const SESSION_TITLES = ["Lower Body Strength", "Upper Push", "Lower Hypertrophy", "Upper Pull"];
const SESSION_ART = [
  { variant: "v1", figure: "squat" },
  { variant: "v3", figure: "pushup" },
  { variant: "v2", figure: "lunge" },
  { variant: "v4", figure: "curl" },
] as const;

export function weeksFor(program: Program): Week[] {
  return Array.from({ length: program.weeks }, (_, w) => ({
    index: w + 1,
    free: !program.premium && w === 0,
    sessions: Array.from({ length: program.daysPerWeek }, (_, d) => ({
      id: `${program.id}-w${w + 1}d${d + 1}`,
      title: program.id === "strength-builder" ? SESSION_TITLES[d % 4] : `${program.title} · Day ${d + 1}`,
      dayIndex: d + 1,
      durationMin: program.sessionMin,
      exerciseCount: 6,
      art: { ...SESSION_ART[d % 4] },
    })),
  }));
}

const COACH = coachRef("arjun");
const BASE = "https://cdn.fitcue.app/mock";

function ex(
  id: string,
  name: string,
  p: Partial<Exercise> & Pick<Exercise, "kind" | "equipment" | "art">,
): Exercise {
  return {
    id,
    name,
    repsUnit: "reps",
    restSec: 60,
    segmentSec: 90,
    weightStepKg: 2.5,
    coach: COACH,
    cues: [],
    captions: { en: `${BASE}/${id}.en.vtt`, hi: `${BASE}/${id}.hi.vtt` },
    thumbUrl: `${BASE}/${id}.jpg`,
    demoUrl: `${BASE}/${id}-demo.m3u8`,
    videoUrl: `${BASE}/${id}.m3u8`,
    ...p,
  };
}

export const LOWER_HYPERTROPHY_EXERCISES: Exercise[] = [
  ex("warmup-flow", "Warm-up flow", { kind: "follow_along", durationSec: 300, segmentSec: 300, restSec: 0, equipment: ["bodyweight"], art: { variant: "dark", figure: "stretch" } }),
  ex("reverse-lunge", "Reverse lunge", {
    kind: "sets", sets: 3, reps: 10, repsUnit: "reps_per_leg", perSide: true, equipment: ["dumbbell"], weightStepKg: 1,
    swappedFrom: { exerciseId: "bulgarian-split-squat", name: "Bulgarian split squat", reason: "knee" },
    cues: [
      { atSec: 0, text: { en: "Drive through the front heel", hi: "आगे वाली एड़ी से ज़ोर लगाएँ" } },
      { atSec: 30, text: { en: "Keep your chest tall", hi: "छाती सीधी रखें" } },
    ],
    art: { variant: "dark", figure: "lunge" },
  }),
  ex("romanian-deadlift", "Romanian deadlift", { kind: "sets", sets: 4, reps: [8, 10], equipment: ["dumbbell"], restSec: 90, art: { variant: "dark", figure: "deadlift" } }),
  ex("goblet-box-squat", "Goblet box squat", { kind: "sets", sets: 3, reps: 12, equipment: ["dumbbell", "bench"], art: { variant: "dark", figure: "squat" } }),
  ex("hip-thrust", "Dumbbell hip thrust", { kind: "sets", sets: 4, reps: 10, equipment: ["dumbbell", "bench"], art: { variant: "dark", figure: "stretch" } }),
  ex("calf-raise", "Standing calf raise", { kind: "sets", sets: 4, reps: 15, equipment: ["dumbbell"], weightStepKg: 1, restSec: 45, art: { variant: "dark", figure: "jump" } }),
];

function equipmentOf(list: Exercise[]): ExerciseEquipment[] {
  return [...new Set(list.flatMap((e) => e.equipment).filter((e) => e !== "bodyweight"))];
}

export function mockSession(sessionId: string): Session {
  const m = /^(.+)-w(\d+)d(\d+)$/.exec(sessionId);
  const program = PROGRAMS.find((p) => p.id === m?.[1]) ?? PROGRAMS[0];
  const weekIndex = m ? Number(m[2]) : 1;
  const dayIndex = m ? Number(m[3]) : 3;
  const meta = weeksFor(program)[weekIndex - 1]?.sessions[dayIndex - 1];
  const exercises = LOWER_HYPERTROPHY_EXERCISES;
  return {
    id: sessionId,
    programId: program.id,
    programTitle: program.title,
    weekIndex,
    dayIndex,
    title: meta?.title ?? "Lower Hypertrophy",
    durationMin: meta?.durationMin ?? 45,
    exerciseCount: exercises.length,
    setCount: exercises.reduce((n, e) => n + (e.sets ?? 0), 0),
    equipment: equipmentOf(exercises),
    appliedSwapReason: "knee",
    premium: program.premium,
    art: meta?.art ?? { variant: "v2", figure: "lunge" },
    exercises,
  };
}

export const TODAY_SESSION_ID = "strength-builder-w1d3";
