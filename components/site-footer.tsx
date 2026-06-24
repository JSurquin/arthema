"use client";

import Link from "next/link";
import { ExternalLinkIcon } from "lucide-react";
import { useLocaleContext } from "@/lib/i18n/context";

const ANDROMED_URL = "https://andromed.fr";

export function SiteFooter() {
  const { t, format } = useLocaleContext();
  const year = String(new Date().getFullYear());

  return (
    <footer className="border-t border-border/50 bg-muted/25 backdrop-blur-sm mt-auto">
      <div className="mx-auto max-w-7xl px-3 sm:px-5 lg:px-6 py-10 sm:py-12">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
          <div className="space-y-3">
            <p className="text-sm font-semibold tracking-tight text-foreground">
              {t.footer.brand}
            </p>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-sm">
              {t.footer.description}
            </p>
          </div>

          <div className="space-y-3">
            <p className="text-sm font-semibold tracking-tight text-foreground">
              {t.footer.navigation}
            </p>
            <ul className="text-sm text-muted-foreground space-y-2">
              <li>
                <Link
                  href="/"
                  className="hover:text-foreground underline-offset-4 hover:underline transition-colors"
                >
                  {t.footer.homeLink}
                </Link>
              </li>
              <li>
                <a
                  href={ANDROMED_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 hover:text-foreground underline-offset-4 hover:underline transition-colors"
                >
                  {t.footer.andromedSite}
                  <ExternalLinkIcon className="size-3.5 opacity-70" />
                </a>
              </li>
            </ul>
          </div>

          <div className="space-y-3 sm:col-span-2 lg:col-span-1">
            <p className="text-sm font-semibold tracking-tight text-foreground">
              {t.footer.andromed}
            </p>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {t.footer.aboutPrefix}
              <a
                href={ANDROMED_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="text-foreground font-medium underline-offset-4 hover:underline inline-flex items-center gap-1"
              >
                Andromed
                <ExternalLinkIcon className="size-3.5 opacity-70" />
              </a>
              {t.footer.aboutSuffix}
            </p>
            <p className="text-xs text-muted-foreground/90 italic">
              {t.footer.taglinePrefix}
              <a
                href={ANDROMED_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="underline-offset-2 hover:underline not-italic"
              >
                {t.footer.taglineLink}
              </a>
            </p>
          </div>
        </div>

        <div className="mt-10 pt-8 border-t border-border/40 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 text-xs text-muted-foreground">
          <span>{format(t.footer.copyright, { year })}</span>
          <span className="sm:text-right">{t.footer.taglineShort}</span>
        </div>
      </div>
    </footer>
  );
}
