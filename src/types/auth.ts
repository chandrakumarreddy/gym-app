export type AuthMethod = "apple" | "google" | "phone" | "email";

export type User = {
  id: string;
  email?: string;
  phone?: string;
  name?: string;
  createdAt: number;
  isNew: boolean;
};

export type AuthSession = {
  user: User;
  accessToken: string;
  refreshToken: string;
  expiresAt: number;
};

export type AuthErrorCode = "cancelled" | "network" | "invalid_code" | "rate_limited" | "unavailable" | "unknown";

export type AuthError = { code: AuthErrorCode; message: string };

export type AuthStatus = "loading" | "signed_out" | "signed_in";

export type AuthResult = { ok: true; session: AuthSession } | { ok: false; error: AuthError };
export type OtpStart = { ok: true; requestId: string; resendInSec: number } | { ok: false; error: AuthError };
