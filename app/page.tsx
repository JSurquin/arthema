import Link from "next/link";
import { BookOpenIcon } from "lucide-react";
import { getCategoriesWithThumbnails } from "@/lib/enrich-resources";
import { ThemeToggle } from "@/components/theme-toggle";
import { HomeResources } from "@/components/home-resources";
import { SiteFooter } from "@/components/site-footer";

export default async function Home() {
  const categories = await getCategoriesWithThumbnails();

  return (
    <div className="min-h-screen flex flex-col min-w-0 overflow-x-hidden">
      {/* Header */}
      <header className="border-b border-border/40 bg-background/85 backdrop-blur-xl shrink-0 sticky top-0 z-50 supports-[backdrop-filter]:bg-background/70">
        <div className="mx-auto max-w-7xl flex items-center justify-between gap-3 px-3 sm:px-5 py-3.5 sm:py-4 min-w-0">
          <Link
            href="/"
            className="flex items-center gap-3 hover:opacity-90 transition-opacity group"
          >
            <div className="size-10 rounded-xl bg-primary/20 flex items-center justify-center ring-1 ring-primary/30 group-hover:ring-primary/50 transition-all">
              <BookOpenIcon className="size-5 text-primary" />
            </div>
            <div>
              <span className="text-xl font-bold tracking-tight text-foreground">
                Arthema
              </span>
              <p className="text-[10px] text-muted-foreground font-medium uppercase tracking-widest -mt-0.5">
                Ressources de cours
              </p>
            </div>
          </Link>
          <ThemeToggle />
        </div>
      </header>

      <main className="flex-1 mx-auto max-w-7xl w-full px-3 sm:px-5 lg:px-6 py-9 sm:py-12">
        {/* Hero */}
        <section className="text-center space-y-5 sm:space-y-6 mb-8 sm:mb-10 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/35 bg-primary/[0.08] px-4 py-1.5 text-xs font-medium text-primary">
            <span className="size-2 rounded-full bg-primary animate-pulse" />
            Ressources de formation
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-balance">
            Vos ressources de cours{" "}
            <span className="text-primary">centralisées</span>
          </h1>
          <p className="text-base sm:text-lg text-muted-foreground leading-relaxed text-pretty">
            Vidéos et playlists YouTube pour réviser et aller plus loin — lecture
            sur Arthema ou ouverture directe sur YouTube.
          </p>
        </section>

        <HomeResources categories={categories} />
      </main>

      <SiteFooter />
    </div>
  );
}
