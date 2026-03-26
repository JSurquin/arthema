import Link from "next/link";
import { BookOpenIcon } from "lucide-react";
import { getResources } from "@/lib/resources";
import { ThemeToggle } from "@/components/theme-toggle";
import { PlaylistCard } from "@/components/playlist-card";

export default function Home() {
  const { categories } = getResources();

  return (
    <div className="min-h-screen flex flex-col min-w-0 overflow-x-hidden bg-gradient-to-b from-background via-background to-primary/5">
      {/* Header */}
      <header className="border-b border-border/40 bg-background/80 backdrop-blur-xl shrink-0 sticky top-0 z-50">
        <div className="mx-auto max-w-6xl flex items-center justify-between gap-3 px-4 sm:px-8 py-4 min-w-0">
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

      <main className="flex-1 mx-auto max-w-6xl w-full px-4 sm:px-8 py-12 sm:py-20">
        {/* Hero — style Andromed */}
        <section className="text-center space-y-6 mb-16 sm:mb-24">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-xs font-medium text-primary mb-2">
            <span className="size-2 rounded-full bg-primary animate-pulse" />
            Récapitulatif des ressources
          </div>
          <h1 className="text-4xl sm:text-6xl font-bold tracking-tight text-balance">
            Vos ressources de cours{" "}
            <span className="text-primary">centralisées</span>
          </h1>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed text-pretty">
            Vidéos et playlists YouTube pour apprendre. Cliquez pour lire sur le
            site ou ouvrir sur YouTube.
          </p>
        </section>

        {/* Catégories */}
        <section className="space-y-16">
          {categories.map((category) => (
            <div key={category.id} className="space-y-8">
              <div>
                <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-2">
                  {category.title}
                </h2>
                <p className="text-muted-foreground max-w-2xl">
                  {category.description}
                </p>
              </div>

              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {category.playlists.map((playlist) => (
                  <PlaylistCard key={playlist.id} playlist={playlist} />
                ))}
              </div>
            </div>
          ))}
        </section>
      </main>

      <footer className="border-t border-border/40 bg-background/50 backdrop-blur-sm mt-auto">
        <div className="mx-auto max-w-6xl px-4 sm:px-8 py-6">
          <p className="text-sm text-muted-foreground font-medium">
            Arthema — Ressources de cours
          </p>
        </div>
      </footer>
    </div>
  );
}
