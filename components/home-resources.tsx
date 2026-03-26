"use client";

import { useMemo, useState } from "react";
import { SearchIcon } from "lucide-react";
import { PlaylistCardStatic } from "@/components/playlist-card-static";
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

  const filtered = useMemo(() => {
    const q = normalize(query.trim());
    if (!q) return categories;

    return categories
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
      .filter((c) => c.playlists.length > 0);
  }, [categories, query]);

  const totalVisible = filtered.reduce((n, c) => n + c.playlists.length, 0);
  const totalAll = categories.reduce((n, c) => n + c.playlists.length, 0);

  return (
    <>
      <div className="mx-auto max-w-2xl w-full mb-10 sm:mb-12">
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
