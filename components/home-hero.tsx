"use client";

import { useLocaleContext } from "@/lib/i18n/context";

export function HomeHero() {
  const { t } = useLocaleContext();

  return (
    <section className="text-center space-y-5 sm:space-y-6 mb-8 sm:mb-10 max-w-3xl mx-auto">
      <div className="inline-flex items-center gap-2 rounded-full border border-primary/35 bg-primary/[0.08] px-4 py-1.5 text-xs font-medium text-primary">
        <span className="size-2 rounded-full bg-primary animate-pulse" />
        {t.hero.badge}
      </div>
      <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-balance">
        {t.hero.title}{" "}
        <span className="text-primary">{t.hero.titleHighlight}</span>
      </h1>
      <p className="text-base sm:text-lg text-muted-foreground leading-relaxed text-pretty">
        {t.hero.subtitle}
      </p>
    </section>
  );
}
