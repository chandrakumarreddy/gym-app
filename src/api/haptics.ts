export type HapticKind = "light" | "medium" | "heavy" | "selection" | "success" | "warning" | "error";

export function haptic(kind: HapticKind = "light"): void {
  try {
    NativeModules.NativeHapticsModule?.trigger(kind);
  } catch (e) {
    console.warn("[haptics] trigger", e);
  }
}

export function hapticsEnabled(): boolean {
  try {
    return NativeModules.NativeHapticsModule?.isEnabled() ?? true;
  } catch (e) {
    console.warn("[haptics] isEnabled", e);
    return true;
  }
}

export function openHapticsSettings(): void {
  try {
    NativeModules.NativeHapticsModule?.openSettings();
  } catch (e) {
    console.warn("[haptics] openSettings", e);
  }
}
