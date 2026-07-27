"use client";

import { useState } from "react";
import Link from "next/link";
import { HeartIcon, PlayIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useLocaleContext } from "@/lib/i18n/context";
import type { PlaylistResource } from "@/lib/types";

export function PlaylistCardStatic({
  playlist,
  thumbnailUrl,
  isFavorite = false,
  onToggleFavorite,
}: {
  playlist: PlaylistResource;
  thumbnailUrl: string;
  isFavorite?: boolean;
  onToggleFavorite?: (playlistId: string) => void;
}) {
  const { t } = useLocaleContext();
  const [imgSrc, setImgSrc] = useState(thumbnailUrl);

  return (
    <Card className="group h-full overflow-hidden border-border/60 bg-card/60 backdrop-blur-sm py-5 gap-5 rounded-2xl hover:border-primary/35 hover:bg-card/85 hover:shadow-md transition-all duration-300">
      <CardHeader className="px-5 pb-0 gap-2.5">
        <div className="relative aspect-video rounded-xl overflow-hidden bg-muted ring-1 ring-border/50 shadow-sm">
          <img
            src={imgSrc}
            alt={playlist.title}
            className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-300"
            loading="lazy"
            onError={() => {
              if (imgSrc !== playlist.thumbnail) setImgSrc(playlist.thumbnail);
            }}
          />
          <Button
            type="button"
            size="icon-sm"
            variant="secondary"
            className="absolute top-2 right-2 backdrop-blur-sm bg-background/70 hover:bg-background"
            onClick={() => onToggleFavorite?.(playlist.id)}
            aria-label={isFavorite ? t.resources.removeFavorite : t.resources.addFavorite}
          >
            <HeartIcon className={`size-4 ${isFavorite ? "fill-current text-primary" : ""}`} />
          </Button>
        </div>
        <CardTitle className="text-xl font-semibold tracking-tight line-clamp-2 pt-1">
          {playlist.title}
        </CardTitle>
        <CardDescription className="text-[15px] leading-snug line-clamp-2">
          {playlist.description}
        </CardDescription>
      </CardHeader>
      <CardContent className="px-5 pt-0">
        <Link href={`/watch?list=${playlist.id}`}>
          <Button className="w-full gap-2 h-10" size="default">
            <PlayIcon className="size-4" />
            {t.resources.watchPlaylist}
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
}
