import "server-only";

/**
 * Vignette d’une playlist via l’endpoint oEmbed public (pas de clé API).
 * @see https://oembed.com/
 */
export async function fetchPlaylistThumbnailFromOEmbed(
  youtubePlaylistId: string
): Promise<string | null> {
  const playlistUrl = `https://www.youtube.com/playlist?list=${encodeURIComponent(youtubePlaylistId)}`;
  const endpoint = new URL("https://www.youtube.com/oembed");
  endpoint.searchParams.set("url", playlistUrl);
  endpoint.searchParams.set("format", "json");

  const res = await fetch(endpoint.toString(), {
    headers: { Accept: "application/json" },
    next: { revalidate: 3600 },
  });

  if (!res.ok) return null;

  const data = (await res.json()) as { thumbnail_url?: string };
  return typeof data.thumbnail_url === "string" ? data.thumbnail_url : null;
}
