"use client";

import { useEffect, useMemo, useState } from "react";
import { HeartIcon, SearchIcon } from "lucide-react";
import { PlaylistCardStatic } from "@/components/playlist-card-static";
import { Button } from "@/components/ui/button";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import type { CategoryWithThumbs } from "@/lib/enrich-resources";

function normalize(s: string) {
  return s
    .toLowerCase()
    .normalize("NFD")
    .replace(/\p{M}/gu, "");
}

export function HomeResources({ categories }: { categories: CategoryWithThumbs[] }) {
  const [query, setQuery] = useState("");
  const [favoritesOnly, setFavoritesOnly] = useState(false);
  const [favoriteIds, setFavoriteIds] = useState<string[]>([]);

  useEffect(() => {
    try {
      const raw = localStorage.getItem("arthema:favorites");
      if (!raw) return;
      const parsed = JSON.parse(raw) as string[];
      if (Array.isArray(parsed)) setFavoriteIds(parsed);
    } catch {
      // ignore invalid localStorage content
    }
  }, []);

  function toggleFavorite(playlistId: string) {
    setFavoriteIds((prev) => {
      const next = prev.includes(playlistId)
        ? prev.filter((id) => id !== playlistId)
        : [...prev, playlistId];
      localStorage.setItem("arthema:favorites", JSON.stringify(next));
      return next;
    });
  }

  const filtered = useMemo(() => {
    const q = normalize(query.trim());
    const base = (q ? categories
      .map((cat) => {
        const catHaystack = normalize(`${cat.title} ${cat.description}`);
        const playlists = cat.playlists.filter((p) => {
          const hay = normalize(
            `${cat.title} ${p.title} ${p.description} ${p.id}`
          );
          return hay.includes(q) || catHaystack.includes(q);
        });
        return { ...cat, playlists };
      })
      .filter((c) => c.playlists.length > 0) : categories);

    if (!favoritesOnly) return base;

    return base
      .map((cat) => ({
        ...cat,
        playlists: cat.playlists.filter((p) => favoriteIds.includes(p.id)),
      }))
      .filter((c) => c.playlists.length > 0);
  }, [categories, query, favoritesOnly, favoriteIds]);

  const totalVisible = filtered.reduce((n, c) => n + c.playlists.length, 0);
  const totalAll = categories.reduce((n, c) => n + c.playlists.length, 0);
  const totalFavorites = favoriteIds.length;

  return (
    <>
      <div className="mx-auto max-w-2xl w-full mb-10 sm:mb-12 space-y-3">
        <label htmlFor="resource-search" className="sr-only">
          Rechercher une playlist ou un thème
        </label>
        <InputGroup className="h-11 sm:h-12 rounded-xl border-border/60 bg-background/80 shadow-sm">
          <InputGroupAddon align="inline-start" className="pl-3.5">
            <SearchIcon className="size-[1.125rem] text-muted-foreground" />
          </InputGroupAddon>
          <InputGroupInput
            id="resource-search"
            type="search"
            placeholder="Rechercher par titre, thème, mot-clé…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="h-11 sm:h-12 text-base sm:text-sm placeholder:text-muted-foreground/70"
            autoComplete="off"
          />
        </InputGroup>
        <div className="flex items-center justify-between gap-2">
          <p className="text-sm text-muted-foreground">
            {totalVisible} visible{totalVisible > 1 ? "s" : ""} sur {totalAll}
          </p>
          <Button
            type="button"
            size="sm"
            variant={favoritesOnly ? "default" : "outline"}
            onClick={() => setFavoritesOnly((v) => !v)}
            className="gap-1.5"
          >
            <HeartIcon className={`size-4 ${favoritesOnly ? "fill-current" : ""}`} />
            Favoris ({totalFavorites})
          </Button>
        </div>
        {query.trim() && totalVisible > 0 && (
          <p className="mt-2 text-sm text-muted-foreground text-center sm:text-left">
            {totalVisible} résultat{totalVisible > 1 ? "s" : ""} sur {totalAll}
          </p>
        )}
      </div>

      <section className="space-y-12 sm:space-y-14">
        {filtered.length === 0 ? (
          <p className="text-center text-muted-foreground py-12 text-base">
            Aucune playlist ne correspond à « {query.trim()} ». Essayez un autre
            mot-clé ou effacez la recherche.
          </p>
        ) : (
          filtered.map((category) => (
            <div key={category.id} className="space-y-6 sm:space-y-7">
              <div>
                <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-2">
                  {category.title}
                </h2>
                <p className="text-muted-foreground max-w-2xl">
                  {category.description}
                </p>
              </div>

              <div className="grid gap-5 sm:gap-6 sm:grid-cols-2 xl:grid-cols-3">
                {category.playlists.map((playlist) => (
                  <PlaylistCardStatic
                    key={playlist.id}
                    playlist={playlist}
                    thumbnailUrl={playlist.resolvedThumbnail}
                    isFavorite={favoriteIds.includes(playlist.id)}
                    onToggleFavorite={toggleFavorite}
                  />
                ))}
              </div>
            </div>
          ))
        )}
      </section>
    </>
  );
}
