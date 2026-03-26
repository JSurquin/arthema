import { getResources } from "./resources";
import { fetchPlaylistThumbnailFromOEmbed } from "./youtube-oembed";
import type { CategoryResource, PlaylistResource } from "./types";

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
        cat.playlists.map(async (p) => {
          let resolvedThumbnail = p.thumbnail;
          if (p.youtubePlaylistId) {
            const fromYt = await fetchPlaylistThumbnailFromOEmbed(
              p.youtubePlaylistId
            );
            if (fromYt) resolvedThumbnail = fromYt;
          }
          return { ...p, resolvedThumbnail };
        })
      ),
    }))
  );
}
