import { createContext, useContext, useMemo, useState } from "@lynx-js/react";
import type { ReactNode } from "@lynx-js/react";

import { setJSON } from "@/api/storage.ts";
import { en, hi } from "@/i18n/index.ts";
import type { StringKey } from "@/i18n/index.ts";

export type Locale = "en" | "hi";
export type { StringKey };
export type TVars = Record<string, string | number>;
export type TFn = (key: StringKey, vars?: TVars) => string;

export const LOCALE_KEY = "fitcue.locale";

const tables: Record<Locale, Record<StringKey, string>> = { en, hi };

export function translate(locale: Locale, key: StringKey, vars?: TVars): string {
  const raw = tables[locale][key];
  if (!vars) return raw;
  return raw.replace(/\{(\w+)\}/g, (m, name: string) => (name in vars ? String(vars[name]) : m));
}

type LocaleState = {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: TFn;
};

const LocaleContext = createContext<LocaleState | null>(null);

export function LocaleProvider({ initial, children }: { initial: Locale; children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(initial);

  const value = useMemo<LocaleState>(
    () => ({
      locale,
      setLocale: (next) => {
        setLocaleState(next);
        setJSON(LOCALE_KEY, next);
      },
      t: (key, vars) => translate(locale, key, vars),
    }),
    [locale],
  );

  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>;
}

export function useLocale(): LocaleState {
  const state = useContext(LocaleContext);
  if (!state) throw new Error("useLocale must be used inside LocaleProvider");
  return state;
}

export function useT(): TFn {
  return useLocale().t;
}
