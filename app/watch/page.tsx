import { notFound } from "next/navigation";
import Link from "next/link";
import { BookOpenIcon } from "lucide-react";
import { getResources, getPlaylistEmbedUrl, getPlaylistExternalUrl, getEmbedUrl, getVideoUrl } from "@/lib/resources";
import { VideoPlayer } from "@/components/video-player";
import { ThemeToggle } from "@/components/theme-toggle";

export const dynamic = "force-dynamic";

function findPlaylist(listId: string) {
  const { categories } = getResources();
  for (const cat of categories) {
    const playlist = cat.playlists.find((p) => p.id === listId);
    if (playlist) return { category: cat, playlist };
  }
  return null;
}

export default async function WatchPage({
  searchParams,
}: {
  searchParams: Promise<{ list?: string; v?: string }>;
}) {
  const { list: listId, v: videoId } = await searchParams;
  if (!listId) {
    notFound();
  }

  const found = findPlaylist(listId);
  if (!found) {
    notFound();
  }

  const { category, playlist } = found;

  // Playlist YouTube : embed de toute la playlist
  if (playlist.youtubePlaylistId) {
    const embedUrl = getPlaylistEmbedUrl(playlist.youtubePlaylistId);
    const externalUrl = getPlaylistExternalUrl(playlist.youtubePlaylistId);

    return (
      <div className="min-h-screen flex flex-col min-w-0 overflow-x-hidden">
        <header className="border-b border-border/40 bg-background/90 backdrop-blur-xl shrink-0 sticky top-0 z-50">
          <div className="mx-auto max-w-6xl flex items-center justify-between gap-3 px-4 sm:px-8 py-4 min-w-0">
            <Link
              href="/"
              className="flex items-center gap-3 hover:opacity-90 transition-opacity"
            >
              <div className="size-10 rounded-xl bg-primary/20 flex items-center justify-center ring-1 ring-primary/30">
                <BookOpenIcon className="size-5 text-primary" />
              </div>
              <span className="text-xl font-bold tracking-tight">Arthema</span>
            </Link>
            <ThemeToggle />
          </div>
        </header>

        <main className="flex-1 mx-auto max-w-6xl w-full px-4 sm:px-8 py-6">
          <div className="space-y-4">
            <VideoPlayer
              embedUrl={embedUrl}
              externalUrl={externalUrl}
              title={playlist.title}
            />
            <div>
              <h1 className="text-xl font-bold tracking-tight">{playlist.title}</h1>
              <p className="text-sm text-muted-foreground mt-1">
                {category.title}
              </p>
            </div>
          </div>
        </main>
      </div>
    );
  }

  // Playlist locale (liste de vidéos)
  const videos = playlist.videos ?? [];
  const video = videoId
    ? videos.find((v) => v.id === videoId) ?? videos[0]
    : videos[0];

  if (!video) {
    notFound();
  }

  const embedUrl = getEmbedUrl(video.id);
  const externalUrl = getVideoUrl(video.id);

  return (
    <div className="min-h-screen flex flex-col min-w-0 overflow-x-hidden">
      <header className="border-b border-border/40 bg-background/90 backdrop-blur-xl shrink-0 sticky top-0 z-50">
        <div className="mx-auto max-w-6xl flex items-center justify-between gap-3 px-4 sm:px-8 py-4 min-w-0">
          <Link
            href="/"
            className="flex items-center gap-3 hover:opacity-90 transition-opacity"
          >
            <div className="size-10 rounded-xl bg-primary/20 flex items-center justify-center ring-1 ring-primary/30">
              <BookOpenIcon className="size-5 text-primary" />
            </div>
            <span className="text-xl font-bold tracking-tight">Arthema</span>
          </Link>
            <ThemeToggle />
        </div>
      </header>

      <main className="flex-1 mx-auto max-w-6xl w-full px-4 sm:px-8 py-6">
        <div className="grid gap-8 lg:grid-cols-[1fr_320px]">
          <div className="min-w-0 space-y-4">
            <VideoPlayer
              embedUrl={embedUrl}
              externalUrl={externalUrl}
              title={video.title}
            />
            <div>
              <h1 className="text-xl font-bold tracking-tight">{video.title}</h1>
              <p className="text-sm text-muted-foreground mt-1">
                {playlist.title} · {category.title}
              </p>
            </div>
          </div>

          <aside className="space-y-4">
            <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
              Playlist — {playlist.title}
            </h2>
            <ul className="space-y-2">
              {videos.map((v) => {
                const isActive = v.id === video.id;
                return (
                  <li key={v.id}>
                    <Link
                      href={`/watch?list=${playlist.id}&v=${v.id}`}
                      className={`flex gap-3 rounded-lg p-3 transition-colors ${
                        isActive
                          ? "bg-primary/15 ring-1 ring-primary/30"
                          : "hover:bg-muted/60"
                      }`}
                    >
                      <span className="flex size-8 shrink-0 items-center justify-center rounded bg-muted text-xs font-medium tabular-nums">
                        {v.duration}
                      </span>
                      <span
                        className={`text-sm line-clamp-2 ${
                          isActive ? "font-medium text-foreground" : "text-muted-foreground"
                        }`}
                      >
                        {v.title}
                      </span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </aside>
        </div>
      </main>
    </div>
  );
}
