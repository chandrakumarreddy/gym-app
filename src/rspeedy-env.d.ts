/// <reference types="@lynx-js/rspeedy/client" />
/// <reference types="@lynx-js/react" />
/// <reference types="@lynx-js/types" />

declare let NativeModules: {
  NativeLocalStorageModule?: {
    getStorageItem(key: string): string | null;
    setStorageItem(key: string, value: string): void;
    removeStorageItem(key: string): void;
  };
  NativeSystemBarsModule?: {
    setFullBleed(fullBleed: boolean): void;
    appReady(): void;
  };
};
