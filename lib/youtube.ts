/**
 * Vignettes YouTube sans clé API : URLs stables par ID vidéo.
 * @see https://developers.google.com/youtube/v3/docs/videos#resource
 */
export type YoutubeVideoThumbnailSize =
  | "default"
  | "medium"
  | "high"
  | "standard"
  | "maxres";

const THUMBNAIL_FILE: Record<YoutubeVideoThumbnailSize, string> = {
  default: "default.jpg",
  medium: "mqdefault.jpg",
  high: "hqdefault.jpg",
  standard: "sddefault.jpg",
  maxres: "maxresdefault.jpg",
};

export function getYoutubeVideoThumbnailUrl(
  videoId: string,
  size: YoutubeVideoThumbnailSize = "high"
): string {
  return `https://img.youtube.com/vi/${videoId}/${THUMBNAIL_FILE[size]}`;
}
