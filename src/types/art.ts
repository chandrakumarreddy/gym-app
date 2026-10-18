export type ArtVariant = "v1" | "v2" | "v3" | "v4" | "dark";
export type FigureName = "squat" | "curl" | "pushup" | "lunge" | "run" | "stretch" | "jump" | "deadlift";

export type ArtSpec = { variant: ArtVariant; figure?: FigureName };
