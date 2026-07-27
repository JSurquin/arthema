import "server-only";

import type { VideoResource } from "./types";

const YOUTUBE_DATA_V3 = "https://www.googleapis.com/youtube/v3";
const BROWSER_UA =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36";

function getApiKey(): string | null {
  const key = process.env.YOUTUBE_API_KEY;
  return key?.trim() ? key : null;
}

function parseDurationFromLockup(lockup: Record<string, unknown>): string {
  const contentImage = lockup.contentImage as Record<string, unknown> | undefined;
  const thumbnailViewModel = contentImage?.thumbnailViewModel as
    | Record<string, unknown>
    | undefined;
  const overlays = thumbnailViewModel?.overlays as unknown[] | undefined;
  for (const overlay of overlays ?? []) {
    const o = overlay as Record<string, unknown>;
    const bottom = o.thumbnailBottomOverlayViewModel as
      | Record<string, unknown>
      | undefined;
    const badges = bottom?.badges as unknown[] | undefined;
    for (const badge of badges ?? []) {
      const b = badge as Record<string, unknown>;
      const vm = b.thumbnailBadgeViewModel as Record<string, unknown> | undefined;
      const text = vm?.text;
      if (typeof text === "string" && /^\d/.test(text)) return text;
    }
  }
  return "";
}

function extractVideosFromYtInitialData(data: unknown): VideoResource[] {
  const seen = new Set<string>();
  const videos: VideoResource[] = [];

  function walk(node: unknown): void {
    if (!node || typeof node !== "object") return;

    const obj = node as Record<string, unknown>;

    if (obj.lockupViewModel) {
      const lockup = obj.lockupViewModel as Record<string, unknown>;
      const videoId =
        typeof lockup.contentId === "string"
          ? lockup.contentId
          : (
              (
                (lockup.onTap as Record<string, unknown> | undefined)
                  ?.innertubeCommand as Record<string, unknown> | undefined
              )?.watchEndpoint as { videoId?: string } | undefined
            )?.videoId;

      const title = (
        (
          (lockup.metadata as Record<string, unknown> | undefined)
            ?.lockupMetadataViewModel as Record<string, unknown> | undefined
        )?.title as { content?: string } | undefined
      )?.content;

      if (videoId && title && !seen.has(videoId)) {
        seen.add(videoId);
        videos.push({
          id: videoId,
          title,
          duration: parseDurationFromLockup(lockup),
        });
      }
    }

    for (const value of Object.values(obj)) {
      if (Array.isArray(value)) {
        for (const item of value) walk(item);
      } else {
        walk(value);
      }
    }
  }

  walk(data);
  return videos;
}

function parseYtInitialDataJson(html: string): unknown | null {
  const marker = "var ytInitialData = ";
  const idx = html.indexOf(marker);
  if (idx < 0) return null;

  let start = idx + marker.length;
  let depth = 0;
  let inString = false;
  let escaped = false;

  for (let i = start; i < html.length; i++) {
    const char = html[i];
    if (inString) {
      if (escaped) escaped = false;
      else if (char === "\\") escaped = true;
      else if (char === '"') inString = false;
      continue;
    }
    if (char === '"') {
      inString = true;
      continue;
    }
    if (char === "{") depth++;
    if (char === "}") {
      depth--;
      if (depth === 0) {
        try {
          return JSON.parse(html.slice(start, i + 1));
        } catch {
          return null;
        }
      }
    }
  }

  return null;
}

async function fetchPlaylistVideosFromApi(
  youtubePlaylistId: string
): Promise<VideoResource[]> {
  const key = getApiKey();
  if (!key) return [];

  const videos: VideoResource[] = [];
  let pageToken: string | undefined;

  do {
    const url = new URL(`${YOUTUBE_DATA_V3}/playlistItems`);
    url.searchParams.set("part", "snippet,contentDetails");
    url.searchParams.set("playlistId", youtubePlaylistId);
    url.searchParams.set("maxResults", "50");
    url.searchParams.set("key", key);
    if (pageToken) url.searchParams.set("pageToken", pageToken);

    const res = await fetch(url.toString(), { next: { revalidate: 3600 } });
    if (!res.ok) break;

    const data = (await res.json()) as {
      items?: {
        snippet?: { title?: string };
        contentDetails?: { videoId?: string };
      }[];
      nextPageToken?: string;
    };

    for (const item of data.items ?? []) {
      const id = item.contentDetails?.videoId;
      const title = item.snippet?.title;
      if (!id || !title) continue;
      if (title === "Deleted video" || title === "Private video") continue;
      videos.push({ id, title, duration: "" });
    }

    pageToken = data.nextPageToken;
  } while (pageToken);

  return videos;
}

async function fetchPlaylistVideosFromPage(
  youtubePlaylistId: string
): Promise<VideoResource[]> {
  const playlistUrl = `https://www.youtube.com/playlist?list=${encodeURIComponent(youtubePlaylistId)}`;
  const res = await fetch(playlistUrl, {
    headers: { "User-Agent": BROWSER_UA },
    next: { revalidate: 3600 },
  });

  if (!res.ok) return [];

  const html = await res.text();
  const initialData = parseYtInitialDataJson(html);
  if (!initialData) return [];

  return extractVideosFromYtInitialData(initialData);
}

/**
 * Récupère les vidéos d’une playlist YouTube (API v3 si clé dispo, sinon page publique).
 */
export async function fetchPlaylistVideos(
  youtubePlaylistId: string
): Promise<VideoResource[]> {
  const fromApi = await fetchPlaylistVideosFromApi(youtubePlaylistId);
  if (fromApi.length > 0) return fromApi;

  return fetchPlaylistVideosFromPage(youtubePlaylistId);
}
