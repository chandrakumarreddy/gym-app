const memory = new Map<string, string>();

function read(key: string): string | null | undefined {
  const native = NativeModules.NativeLocalStorageModule;
  return native ? native.getStorageItem(key) : memory.get(key);
}

export function getJSON<T>(key: string): T | undefined {
  try {
    const raw = read(key);
    return raw == null ? undefined : (JSON.parse(raw) as T);
  } catch (e) {
    console.warn(`[storage] get ${key}`, e);
    return undefined;
  }
}

export function setJSON(key: string, value: unknown): void {
  try {
    const raw = JSON.stringify(value);
    const native = NativeModules.NativeLocalStorageModule;
    if (native) native.setStorageItem(key, raw);
    else memory.set(key, raw);
  } catch (e) {
    console.warn(`[storage] set ${key}`, e);
  }
}

export function removeKey(key: string): void {
  try {
    const native = NativeModules.NativeLocalStorageModule;
    if (native) native.removeStorageItem(key);
    else memory.delete(key);
  } catch (e) {
    console.warn(`[storage] remove ${key}`, e);
  }
}
