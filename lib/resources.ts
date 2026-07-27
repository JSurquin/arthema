import type { ResourcesData } from "./types";
import data from "@/data/resources.json";

export function getResources(): ResourcesData {
  return data as ResourcesData;
}

export function getVideoUrl(videoId: string): string {
  return `https://www.youtube.com/watch?v=${videoId}`;
}

export function getEmbedUrl(videoId: string): string {
  return `https://www.youtube-nocookie.com/embed/${videoId}`;
}

export function getPlaylistEmbedUrl(youtubePlaylistId: string): string {
  return `https://www.youtube-nocookie.com/embed/videoseries?list=${youtubePlaylistId}`;
}

export function getPlaylistVideoEmbedUrl(
  videoId: string,
  youtubePlaylistId: string
): string {
  return `https://www.youtube-nocookie.com/embed/${videoId}?list=${youtubePlaylistId}`;
}

export function getPlaylistExternalUrl(youtubePlaylistId: string): string {
  return `https://www.youtube.com/playlist?list=${youtubePlaylistId}`;
}

export function getPlaylistVideoExternalUrl(
  videoId: string,
  youtubePlaylistId: string
): string {
  return `https://www.youtube.com/watch?v=${videoId}&list=${youtubePlaylistId}`;
}
