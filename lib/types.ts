export interface VideoResource {
  id: string;
  title: string;
  duration: string;
}

export interface PlaylistResource {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  videos: VideoResource[];
}

export interface CategoryResource {
  id: string;
  title: string;
  description: string;
  playlists: PlaylistResource[];
}

export interface ResourcesData {
  categories: CategoryResource[];
}
