export type HapticKind = "light" | "medium" | "heavy" | "selection" | "success" | "warning" | "error";

export function haptic(kind: HapticKind = "light"): void {
  try {
    NativeModules.NativeHapticsModule?.trigger(kind);
  } catch (e) {
    console.warn("[haptics] trigger", e);
  }
}
