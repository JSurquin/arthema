"use client";

import Link from "next/link";
import { BookOpenIcon } from "lucide-react";
import { LanguageSwitcher } from "@/components/language-switcher";
import { ThemeToggle } from "@/components/theme-toggle";
import { useLocaleContext } from "@/lib/i18n/context";

export function SiteHeader({ compact = false }: { compact?: boolean }) {
  const { t } = useLocaleContext();

  return (
    <header className="border-b border-border/40 bg-background/85 backdrop-blur-xl shrink-0 sticky top-0 z-50 supports-[backdrop-filter]:bg-background/70">
      <div
        className={`mx-auto flex items-center justify-between gap-3 min-w-0 ${
          compact
            ? "max-w-6xl px-4 sm:px-8 py-4"
            : "max-w-7xl px-3 sm:px-5 py-3.5 sm:py-4"
        }`}
      >
        <Link
          href="/"
          className="flex items-center gap-3 hover:opacity-90 transition-opacity group min-w-0"
        >
          <div className="size-10 rounded-xl bg-primary/20 flex items-center justify-center ring-1 ring-primary/30 group-hover:ring-primary/50 transition-all shrink-0">
            <BookOpenIcon className="size-5 text-primary" />
          </div>
          {!compact && (
            <div className="min-w-0">
              <span className="text-xl font-bold tracking-tight text-foreground">
                {t.nav.title}
              </span>
              <p className="text-[10px] text-muted-foreground font-medium uppercase tracking-widest -mt-0.5">
                {t.nav.subtitle}
              </p>
            </div>
          )}
          {compact && (
            <span className="text-xl font-bold tracking-tight truncate">{t.nav.title}</span>
          )}
        </Link>
        <div className="flex items-center gap-2 shrink-0">
          <LanguageSwitcher />
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
