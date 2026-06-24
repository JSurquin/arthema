"use client";

import { LOCALE_FLAGS, LOCALE_LABELS, SUPPORTED_LOCALES, isLocale } from "@/lib/i18n/types";
import { useLocaleContext } from "@/lib/i18n/context";

export function LanguageSwitcher() {
  const { locale, setLocale, t } = useLocaleContext();

  return (
    <label className="flex items-center gap-2">
      <span className="sr-only">{t.nav.language}</span>
      <select
        value={locale}
        onChange={(event) => {
          const next = event.target.value;
          if (isLocale(next)) setLocale(next);
        }}
        aria-label={t.nav.language}
        className="cursor-pointer rounded-full border border-border/60 bg-background/80 px-3 py-1.5 text-xs font-medium text-foreground outline-none transition hover:border-primary/40 focus:border-primary/60 focus:ring-2 focus:ring-primary/20 sm:text-sm"
      >
        {SUPPORTED_LOCALES.map((code) => (
          <option key={code} value={code} className="bg-background text-foreground">
            {`${LOCALE_FLAGS[code]} ${LOCALE_LABELS[code]}`}
          </option>
        ))}
      </select>
    </label>
  );
}
