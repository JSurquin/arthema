import type { ResourcesData } from "./types";
import data from "@/data/resources.json";

export function getResources(): ResourcesData {
  return data as ResourcesData;
}

export function getVideoUrl(videoId: string): string {
  return `https://www.youtube.com/watch?v=${videoId}`;
}

export function getEmbedUrl(videoId: string): string {
  return `https://www.youtube.com/embed/${videoId}?autoplay=1`;
}
