import type { ArtSpec } from "@/types/art.ts";
import type { AvatarTone } from "@/types/content.ts";

export type CoachingOffer = {
  planId: string;
  title: string;
  description: string;
  priceMonthly: number;
  currency: "INR";
  acceptingClients: boolean;
  storeProductId?: string;
  externalCheckoutUrl?: string;
};

export type CoachProfile = {
  id: string;
  name: string;
  initials: string;
  tone: AvatarTone;
  tagline: string;
  art: ArtSpec;
  stats: { programs: number; videos: number; yearsCoaching: number };
  following: boolean;
  coaching?: CoachingOffer;
};

export type CoachProgram = {
  id: string;
  title: string;
  weeks: number;
  art: ArtSpec;
  access: "free" | "premium" | "pack";
  packProductId?: string;
};
