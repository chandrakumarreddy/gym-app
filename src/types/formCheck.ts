export type CreditPack = {
  id: "fc_1" | "fc_5" | "fc_10";
  productId: "formcheck_1" | "formcheck_5" | "formcheck_10";
  reviews: number;
  priceInr: number;
  premiumPriceInr: number;
  popular?: boolean;
};

export type FormCheckUpload = {
  status: "idle" | "picking" | "uploading" | "ready" | "failed";
  progressPct: number;
  localUri?: string;
  uploadId?: string;
  durationSec?: number;
  error?: string;
};

export type FormCheckSubmission = {
  id: string;
  exerciseId: string;
  coachId: string;
  uploadId: string;
  status: "queued" | "in_review" | "reviewed";
  dueAt: string;
};

export type UploadSession = { uploadId: string; uploadUrl: string; chunkSize: number };
