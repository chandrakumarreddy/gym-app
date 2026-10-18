export type UserProfile = {
  id: string;
  name: string;
  initials: string;
  units: { weight: "kg" | "lb"; length: "cm" | "in" };
  reminderTime: string;
  healthSync: boolean;
  locale: "en" | "hi";
};

export type DownloadsSummary = { count: number; bytes: number };
