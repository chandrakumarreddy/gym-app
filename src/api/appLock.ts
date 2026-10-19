export function appLockAvailable(): boolean {
  try {
    return NativeModules.NativeAppLockModule?.isAvailable() ?? false;
  } catch (e) {
    console.warn("[appLock] isAvailable", e);
    return false;
  }
}

export function appLockEnabled(): boolean {
  try {
    return NativeModules.NativeAppLockModule?.isEnabled() ?? false;
  } catch (e) {
    console.warn("[appLock] isEnabled", e);
    return false;
  }
}

// Resolves true once the user confirms with fingerprint or screen lock and the setting is saved.
export function setAppLock(enabled: boolean): Promise<boolean> {
  return new Promise((resolve) => {
    try {
      const mod = NativeModules.NativeAppLockModule;
      if (!mod) return resolve(false);
      mod.setEnabled(enabled, (ok) => resolve(ok));
    } catch (e) {
      console.warn("[appLock] setEnabled", e);
      resolve(false);
    }
  });
}
