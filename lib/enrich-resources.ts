import { getResources } from "./resources";
import { getYoutubeVideoThumbnailUrl } from "./youtube";
import { fetchPlaylistThumbnailUrl } from "./youtube-api";
import { fetchPlaylistThumbnailFromOEmbed } from "./youtube-oembed";
import { fetchPlaylistVideos } from "./youtube-playlist";
import type { CategoryResource, PlaylistResource } from "./types";

async function resolvePlaylistThumbnail(
  playlist: PlaylistResource
): Promise<string> {
  if (!playlist.youtubePlaylistId) return playlist.thumbnail;

  const fromOEmbed = await fetchPlaylistThumbnailFromOEmbed(
    playlist.youtubePlaylistId
  );
  if (fromOEmbed) return fromOEmbed;

  const fromApi = await fetchPlaylistThumbnailUrl(playlist.youtubePlaylistId);
  if (fromApi) return fromApi;

  const videos = await fetchPlaylistVideos(playlist.youtubePlaylistId);
  if (videos[0]?.id) {
    return getYoutubeVideoThumbnailUrl(videos[0].id);
  }

  return playlist.thumbnail;
}

export type PlaylistWithResolvedThumb = PlaylistResource & {
  resolvedThumbnail: string;
};

export type CategoryWithThumbs = Omit<CategoryResource, "playlists"> & {
  playlists: PlaylistWithResolvedThumb[];
};

export async function getCategoriesWithThumbnails(): Promise<CategoryWithThumbs[]> {
  const { categories } = getResources();

  return Promise.all(
    categories.map(async (cat) => ({
      ...cat,
      playlists: await Promise.all(
        cat.playlists.map(async (p) => ({
          ...p,
          resolvedThumbnail: await resolvePlaylistThumbnail(p),
        }))
      ),
    }))
  );
}
