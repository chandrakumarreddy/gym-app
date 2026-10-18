import { building } from "@/i18n/strings/building.ts";
import { challenges } from "@/i18n/strings/challenges.ts";
import { coach } from "@/i18n/strings/coach.ts";
import { common } from "@/i18n/strings/common.ts";
import { complete } from "@/i18n/strings/complete.ts";
import { formCheck } from "@/i18n/strings/formCheck.ts";
import { home } from "@/i18n/strings/home.ts";
import { library } from "@/i18n/strings/library.ts";
import { locked } from "@/i18n/strings/locked.ts";
import { paywall } from "@/i18n/strings/paywall.ts";
import { planPreview } from "@/i18n/strings/planPreview.ts";
import { player } from "@/i18n/strings/player.ts";
import { profile } from "@/i18n/strings/profile.ts";
import { program } from "@/i18n/strings/program.ts";
import { progress } from "@/i18n/strings/progress.ts";
import { quizBody } from "@/i18n/strings/quizBody.ts";
import { quizExperience } from "@/i18n/strings/quizExperience.ts";
import { quizGoal } from "@/i18n/strings/quizGoal.ts";
import { quizSchedule } from "@/i18n/strings/quizSchedule.ts";
import { restLog } from "@/i18n/strings/restLog.ts";
import { signup } from "@/i18n/strings/signup.ts";
import { welcome } from "@/i18n/strings/welcome.ts";
import { winback } from "@/i18n/strings/winback.ts";
import { workout } from "@/i18n/strings/workout.ts";

export const en = {
  ...common.en,
  ...welcome.en,
  ...quizGoal.en,
  ...quizExperience.en,
  ...quizSchedule.en,
  ...quizBody.en,
  ...building.en,
  ...planPreview.en,
  ...signup.en,
  ...paywall.en,
  ...home.en,
  ...library.en,
  ...program.en,
  ...workout.en,
  ...player.en,
  ...restLog.en,
  ...complete.en,
  ...progress.en,
  ...challenges.en,
  ...locked.en,
  ...coach.en,
  ...formCheck.en,
  ...profile.en,
  ...winback.en,
};

export type StringKey = keyof typeof en;

export const hi: Record<StringKey, string> = {
  ...common.hi,
  ...welcome.hi,
  ...quizGoal.hi,
  ...quizExperience.hi,
  ...quizSchedule.hi,
  ...quizBody.hi,
  ...building.hi,
  ...planPreview.hi,
  ...signup.hi,
  ...paywall.hi,
  ...home.hi,
  ...library.hi,
  ...program.hi,
  ...workout.hi,
  ...player.hi,
  ...restLog.hi,
  ...complete.hi,
  ...progress.hi,
  ...challenges.hi,
  ...locked.hi,
  ...coach.hi,
  ...formCheck.hi,
  ...profile.hi,
  ...winback.hi,
};
