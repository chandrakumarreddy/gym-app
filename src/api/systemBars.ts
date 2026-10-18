export function setFullBleed(fullBleed: boolean): void {
  try {
    NativeModules.NativeSystemBarsModule?.setFullBleed(fullBleed);
  } catch (e) {
    console.warn("[systemBars] setFullBleed", e);
  }
}

export function appReady(): void {
  try {
    NativeModules.NativeSystemBarsModule?.appReady();
  } catch (e) {
    console.warn("[systemBars] appReady", e);
  }
}
