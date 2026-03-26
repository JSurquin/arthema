import Link from "next/link";
import { PlayIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { fetchPlaylistThumbnailFromOEmbed } from "@/lib/youtube-oembed";
import type { PlaylistResource } from "@/lib/types";

export async function PlaylistCard({ playlist }: { playlist: PlaylistResource }) {
  let src = playlist.thumbnail;
  if (playlist.youtubePlaylistId) {
    const fromYoutube = await fetchPlaylistThumbnailFromOEmbed(
      playlist.youtubePlaylistId
    );
    if (fromYoutube) src = fromYoutube;
  }

  return (
    <Card className="group overflow-hidden border-border/60 bg-card/60 backdrop-blur-sm hover:border-primary/30 hover:bg-card/80 transition-all duration-300">
      <CardHeader className="pb-2">
        <div className="aspect-video rounded-lg overflow-hidden bg-muted mb-2 ring-1 ring-border/50">
          <img
            src={src}
            alt={playlist.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            loading="lazy"
          />
        </div>
        <CardTitle className="text-lg line-clamp-2">{playlist.title}</CardTitle>
        <CardDescription className="line-clamp-2">
          {playlist.description}
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-0">
        <Link href={`/watch?list=${playlist.id}`}>
          <Button className="w-full gap-2" size="sm">
            <PlayIcon className="size-4" />
            Voir la playlist
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
}
