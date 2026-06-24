"use client";

import { useLocaleContext } from "@/lib/i18n/context";

export function WatchPlaylistHeading({ title }: { title: string }) {
  const { format, t } = useLocaleContext();

  return (
    <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
      {format(t.watch.playlistLabel, { title })}
    </h2>
  );
}
