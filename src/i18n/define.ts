export type StringTable = Record<string, string>;

export function defineStrings<const E extends StringTable>(en: E, hi: { [K in keyof E]: string }) {
  return { en, hi };
}
