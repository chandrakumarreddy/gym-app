export type LockedContentType = "program" | "session" | "feature";

export type LockedSheetParams = {
  contentType: LockedContentType;
  contentId: string;
  title: string;
  sessionCount?: number;
  packProductId?: `pack_${string}`;
  source: string;
};
