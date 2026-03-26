import Link from "next/link";
import { ExternalLinkIcon } from "lucide-react";

const ANDROMED_URL = "https://andromed.fr";

export function SiteFooter() {
  return (
    <footer className="border-t border-border/50 bg-muted/25 backdrop-blur-sm mt-auto">
      <div className="mx-auto max-w-7xl px-3 sm:px-5 lg:px-6 py-10 sm:py-12">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
          <div className="space-y-3">
            <p className="text-sm font-semibold tracking-tight text-foreground">
              Arthema
            </p>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-sm">
              Recueil de playlists et vidéos YouTube pour suivre les cours et
              approfondir les thèmes vus en formation — lecture intégrée ou
              ouverture sur YouTube.
            </p>
          </div>

          <div className="space-y-3">
            <p className="text-sm font-semibold tracking-tight text-foreground">
              Navigation
            </p>
            <ul className="text-sm text-muted-foreground space-y-2">
              <li>
                <Link
                  href="/"
                  className="hover:text-foreground underline-offset-4 hover:underline transition-colors"
                >
                  Accueil & ressources
                </Link>
              </li>
              <li>
                <a
                  href={ANDROMED_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 hover:text-foreground underline-offset-4 hover:underline transition-colors"
                >
                  Site Andromed
                  <ExternalLinkIcon className="size-3.5 opacity-70" />
                </a>
              </li>
            </ul>
          </div>

          <div className="space-y-3 sm:col-span-2 lg:col-span-1">
            <p className="text-sm font-semibold tracking-tight text-foreground">
              Andromed
            </p>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Cette interface est un projet porté par{" "}
              <a
                href={ANDROMED_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="text-foreground font-medium underline-offset-4 hover:underline inline-flex items-center gap-1"
              >
                Andromed
                <ExternalLinkIcon className="size-3.5 opacity-70" />
              </a>
              , qui accompagne les organisations dans leur transformation
              numérique : développement web et mobile, solutions logicielles,
              formation (développement web, Git, Unix) et conseil.
            </p>
            <p className="text-xs text-muted-foreground/90 italic">
              « Propulsez votre vision digitale vers l&apos;infini » —{" "}
              <a
                href={ANDROMED_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="underline-offset-2 hover:underline not-italic"
              >
                andromed.fr
              </a>
            </p>
          </div>
        </div>

        <div className="mt-10 pt-8 border-t border-border/40 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 text-xs text-muted-foreground">
          <span>© {new Date().getFullYear()} Andromed. Tous droits réservés.</span>
          <span className="sm:text-right">
            Arthema — ressources pédagogiques
          </span>
        </div>
      </div>
    </footer>
  );
}
