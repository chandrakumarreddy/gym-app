import { getJSON, removeKey, setJSON } from "@/api/storage.ts";
import { logIn, logOut } from "@/services/purchases.ts";
import { createStore, useStore } from "@/state/store.ts";
import type { AuthError, AuthMethod, AuthResult, AuthSession, AuthStatus, OtpStart } from "@/types/auth.ts";
import { delay } from "@/utils/delay.ts";

const KEY = "auth.session";
const MOCK_DELAY = 600;
const MOCK_CODE = "123456";

const store = createStore<AuthSession | null>(getJSON<AuthSession>(KEY) ?? null);

function makeSession(method: AuthMethod, contact: { email?: string; phone?: string; name?: string }): AuthSession {
  const now = Date.now();
  return {
    user: { id: `u_${method}_${now}`, ...contact, createdAt: now, isNew: true },
    accessToken: `mock_access_${now}`,
    refreshToken: `mock_refresh_${now}`,
    expiresAt: now + 3_600_000,
  };
}

async function signIn(method: AuthMethod, contact: { email?: string; phone?: string; name?: string }): Promise<AuthResult> {
  await delay(MOCK_DELAY);
  const session = makeSession(method, contact);
  setJSON(KEY, session);
  store.set(session);
  await logIn(session.user.id);
  return { ok: true, session };
}

function fail(code: AuthError["code"], message: string): { ok: false; error: AuthError } {
  return { ok: false, error: { code, message } };
}

export function signInWithApple(): Promise<AuthResult> {
  return signIn("apple", { name: "Aarav Kumar", email: "aarav@privaterelay.appleid.com" });
}

export function signInWithGoogle(): Promise<AuthResult> {
  return signIn("google", { name: "Aarav Kumar", email: "aarav.kumar@gmail.com" });
}

async function startOtp(): Promise<OtpStart> {
  await delay(MOCK_DELAY);
  return { ok: true, requestId: `otp_${Date.now()}`, resendInSec: 30 };
}

export function startPhoneOtp(_phone: string): Promise<OtpStart> {
  return startOtp();
}

export function startEmailOtp(_email: string): Promise<OtpStart> {
  return startOtp();
}

export async function verifyPhoneOtp(_requestId: string, phone: string, code: string): Promise<AuthResult> {
  if (code !== MOCK_CODE) {
    await delay(MOCK_DELAY);
    return fail("invalid_code", "That code didn't match.");
  }
  return signIn("phone", { phone });
}

export async function verifyEmailOtp(_requestId: string, email: string, code: string): Promise<AuthResult> {
  if (code !== MOCK_CODE) {
    await delay(MOCK_DELAY);
    return fail("invalid_code", "That code didn't match.");
  }
  return signIn("email", { email });
}

export function getSession(): AuthSession | null {
  return store.get();
}

export async function signOut(): Promise<void> {
  removeKey(KEY);
  store.set(null);
  await logOut();
}

export function onAuthChange(fn: (session: AuthSession | null) => void): () => void {
  return store.subscribe(() => fn(store.get()));
}

export function useAuth(): { session: AuthSession | null; status: AuthStatus } {
  const session = useStore(store);
  return { session, status: session ? "signed_in" : "signed_out" };
}
