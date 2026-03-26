import "server-only";

const YOUTUBE_DATA_V3 = "https://www.googleapis.com/youtube/v3";

type ThumbnailMap = Record<
  string,
  { url?: string; width?: number; height?: number } | undefined
>;

function pickBestThumbnailUrl(thumbnails: ThumbnailMap | undefined): string | null {
  if (!thumbnails) return null;
  const order = ["maxres", "standard", "high", "medium", "default"] as const;
  for (const key of order) {
    const u = thumbnails[key]?.url;
    if (u) return u;
  }
  return null;
}

function getApiKey(): string | null {
  const key = process.env.YOUTUBE_API_KEY;
  return key?.trim() ? key : null;
}

/**
 * Vignette officielle de la playlist (YouTube Data API v3 — playlists.list).
 * Nécessite `YOUTUBE_API_KEY` et l’API activée sur le projet Google Cloud.
 */
export async function fetchPlaylistThumbnailUrl(
  youtubePlaylistId: string
): Promise<string | null> {
  const key = getApiKey();
  if (!key) return null;

  const url = new URL(`${YOUTUBE_DATA_V3}/playlists`);
  url.searchParams.set("part", "snippet");
  url.searchParams.set("id", youtubePlaylistId);
  url.searchParams.set("key", key);

  const res = await fetch(url.toString(), { next: { revalidate: 3600 } });
  if (!res.ok) return null;

  const data = (await res.json()) as {
    items?: { snippet?: { thumbnails?: ThumbnailMap } }[];
  };
  const thumbs = data.items?.[0]?.snippet?.thumbnails;
  return pickBestThumbnailUrl(thumbs);
}

/**
 * Jusqu’à 50 IDs par appel (limite de l’API videos.list).
 */
export async function fetchVideoThumbnailUrls(
  videoIds: string[]
): Promise<Map<string, string | null>> {
  const out = new Map<string, string | null>();
  const key = getApiKey();
  if (!key || videoIds.length === 0) {
    for (const id of videoIds) out.set(id, null);
    return out;
  }

  const unique = [...new Set(videoIds)];
  const chunkSize = 50;

  for (let i = 0; i < unique.length; i += chunkSize) {
    const chunk = unique.slice(i, i + chunkSize);
    const url = new URL(`${YOUTUBE_DATA_V3}/videos`);
    url.searchParams.set("part", "snippet");
    url.searchParams.set("id", chunk.join(","));
    url.searchParams.set("key", key);

    const res = await fetch(url.toString(), { next: { revalidate: 3600 } });
    if (!res.ok) {
      for (const id of chunk) out.set(id, null);
      continue;
    }

    const data = (await res.json()) as {
      items?: { id?: string; snippet?: { thumbnails?: ThumbnailMap } }[];
    };
    const byId = new Map<string, ThumbnailMap | undefined>();
    for (const item of data.items ?? []) {
      if (item.id) byId.set(item.id, item.snippet?.thumbnails);
    }
    for (const id of chunk) {
      out.set(id, pickBestThumbnailUrl(byId.get(id)));
    }
  }

  return out;
}
