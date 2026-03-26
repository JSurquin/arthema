import { fetchPlaylistThumbnailFromOEmbed } from "@/lib/youtube-oembed";
import type { PlaylistResource } from "@/lib/types";
import { PlaylistCardStatic } from "@/components/playlist-card-static";

export async function PlaylistCard({ playlist }: { playlist: PlaylistResource }) {
  let src = playlist.thumbnail;
  if (playlist.youtubePlaylistId) {
    const fromYoutube = await fetchPlaylistThumbnailFromOEmbed(
      playlist.youtubePlaylistId
    );
    if (fromYoutube) src = fromYoutube;
  }

  return (
    <PlaylistCardStatic playlist={playlist} thumbnailUrl={src} />
  );
}
