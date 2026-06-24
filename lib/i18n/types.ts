export const LOCALE_STORAGE_KEY = "arthema-locale";

export const SUPPORTED_LOCALES = ["en", "fr", "pl", "de", "es"] as const;

export type Locale = (typeof SUPPORTED_LOCALES)[number];

export const DEFAULT_LOCALE: Locale = "en";

export const LOCALE_LABELS: Record<Locale, string> = {
  en: "English",
  fr: "Français",
  pl: "Polski",
  de: "Deutsch",
  es: "Español",
};

export const LOCALE_FLAGS: Record<Locale, string> = {
  en: "🇬🇧",
  fr: "🇫🇷",
  pl: "🇵🇱",
  de: "🇩🇪",
  es: "🇪🇸",
};

export function isLocale(value: string): value is Locale {
  return (SUPPORTED_LOCALES as readonly string[]).includes(value);
}

export function detectBrowserLocale(): Locale {
  if (typeof navigator === "undefined") return DEFAULT_LOCALE;

  const candidates = [navigator.language, ...(navigator.languages ?? [])];

  for (const tag of candidates) {
    const base = tag.split("-")[0]?.toLowerCase();
    if (base && isLocale(base)) return base;
  }

  return DEFAULT_LOCALE;
}

export function readStoredLocale(): Locale | null {
  if (typeof window === "undefined") return null;

  try {
    const stored = localStorage.getItem(LOCALE_STORAGE_KEY);
    if (stored && isLocale(stored)) return stored;
  } catch {
    // ignore storage errors
  }

  return null;
}
