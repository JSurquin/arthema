import type { Locale } from "./types";

const en = {
  nav: {
    title: "Andromed Ressources",
    subtitle: "Course resources",
    language: "Language",
  },
  hero: {
    badge: "Training resources",
    title: "Your course resources",
    titleHighlight: "centralized",
    subtitle:
      "YouTube videos and playlists to review and go further — watch here or open directly on YouTube.",
  },
  resources: {
    searchLabel: "Search for a playlist or topic",
    searchPlaceholder: "Search by title, topic, keyword…",
    visibleCount: "{visible} visible out of {total}",
    resultsCount: "{count} result{plural} out of {total}",
    favorites: "Favorites ({count})",
    noResults: 'No playlist matches "{query}". Try another keyword or clear the search.',
    addFavorite: "Add to favorites",
    removeFavorite: "Remove from favorites",
    watchPlaylist: "Watch playlist",
  },
  watch: {
    playlistLabel: "Playlist — {title}",
    openYoutube: "Open on YouTube",
  },
  footer: {
    brand: "Andromed Ressources",
    description:
      "Collection of YouTube playlists and videos to follow courses and deepen topics covered in training — embedded playback or open on YouTube.",
    navigation: "Navigation",
    homeLink: "Home & resources",
    andromedSite: "Andromed website",
    andromed: "Andromed",
    aboutPrefix: "This interface is a project led by ",
    aboutSuffix:
      ", which supports organizations in their digital transformation: web and mobile development, software solutions, training (web development, Git, Unix) and consulting.",
    taglinePrefix: "« Propel your digital vision to infinity » — ",
    taglineLink: "andromed.fr",
    copyright: "© {year} Andromed. All rights reserved.",
    taglineShort: "Andromed Ressources — educational resources",
  },
  theme: {
    light: "Switch to light mode",
    dark: "Switch to dark mode",
  },
  meta: {
    title: "Andromed Ressources — Course resources",
    description:
      "Summary of course resources. YouTube videos and playlists for learning.",
  },
};

export type Messages = {
  nav: {
    title: string;
    subtitle: string;
    language: string;
  };
  hero: {
    badge: string;
    title: string;
    titleHighlight: string;
    subtitle: string;
  };
  resources: {
    searchLabel: string;
    searchPlaceholder: string;
    visibleCount: string;
    resultsCount: string;
    favorites: string;
    noResults: string;
    addFavorite: string;
    removeFavorite: string;
    watchPlaylist: string;
  };
  watch: {
    playlistLabel: string;
    openYoutube: string;
  };
  footer: {
    brand: string;
    description: string;
    navigation: string;
    homeLink: string;
    andromedSite: string;
    andromed: string;
    aboutPrefix: string;
    aboutSuffix: string;
    taglinePrefix: string;
    taglineLink: string;
    copyright: string;
    taglineShort: string;
  };
  theme: {
    light: string;
    dark: string;
  };
  meta: {
    title: string;
    description: string;
  };
};

const fr: Messages = {
  nav: {
    title: "Andromed Ressources",
    subtitle: "Ressources de cours",
    language: "Langue",
  },
  hero: {
    badge: "Ressources de formation",
    title: "Vos ressources de cours",
    titleHighlight: "centralisées",
    subtitle:
      "Vidéos et playlists YouTube pour réviser et aller plus loin — lecture ici ou ouverture directe sur YouTube.",
  },
  resources: {
    searchLabel: "Rechercher une playlist ou un thème",
    searchPlaceholder: "Rechercher par titre, thème, mot-clé…",
    visibleCount: "{visible} visible{plural} sur {total}",
    resultsCount: "{count} résultat{plural} sur {total}",
    favorites: "Favoris ({count})",
    noResults:
      "Aucune playlist ne correspond à « {query} ». Essayez un autre mot-clé ou effacez la recherche.",
    addFavorite: "Ajouter aux favoris",
    removeFavorite: "Retirer des favoris",
    watchPlaylist: "Voir la playlist",
  },
  watch: {
    playlistLabel: "Playlist — {title}",
    openYoutube: "Ouvrir sur YouTube",
  },
  footer: {
    brand: "Andromed Ressources",
    description:
      "Recueil de playlists et vidéos YouTube pour suivre les cours et approfondir les thèmes vus en formation — lecture intégrée ou ouverture sur YouTube.",
    navigation: "Navigation",
    homeLink: "Accueil & ressources",
    andromedSite: "Site Andromed",
    andromed: "Andromed",
    aboutPrefix: "Cette interface est un projet porté par ",
    aboutSuffix:
      ", qui accompagne les organisations dans leur transformation numérique : développement web et mobile, solutions logicielles, formation (développement web, Git, Unix) et conseil.",
    taglinePrefix: "« Propulsez votre vision digitale vers l'infini » — ",
    taglineLink: "andromed.fr",
    copyright: "© {year} Andromed. Tous droits réservés.",
    taglineShort: "Andromed Ressources — ressources pédagogiques",
  },
  theme: {
    light: "Passer en mode clair",
    dark: "Passer en mode sombre",
  },
  meta: {
    title: "Andromed Ressources — Ressources de cours",
    description:
      "Récapitulatif des ressources de cours. Vidéos et playlists YouTube pour apprendre.",
  },
};

const pl: Messages = {
  nav: {
    title: "Andromed Ressources",
    subtitle: "Materiały kursu",
    language: "Język",
  },
  hero: {
    badge: "Materiały szkoleniowe",
    title: "Twoje materiały kursu",
    titleHighlight: "w jednym miejscu",
    subtitle:
      "Filmy i playlisty YouTube do powtórki i pogłębienia wiedzy — odtwarzanie tutaj lub otwarcie bezpośrednio na YouTube.",
  },
  resources: {
    searchLabel: "Szukaj playlisty lub tematu",
    searchPlaceholder: "Szukaj po tytule, temacie, słowie kluczowym…",
    visibleCount: "{visible} widocznych z {total}",
    resultsCount: "{count} wynik{plural} z {total}",
    favorites: "Ulubione ({count})",
    noResults:
      'Żadna playlista nie pasuje do „{query}”. Spróbuj innego słowa kluczowego lub wyczyść wyszukiwanie.',
    addFavorite: "Dodaj do ulubionych",
    removeFavorite: "Usuń z ulubionych",
    watchPlaylist: "Obejrzyj playlistę",
  },
  watch: {
    playlistLabel: "Playlista — {title}",
    openYoutube: "Otwórz na YouTube",
  },
  footer: {
    brand: "Andromed Ressources",
    description:
      "Zbiór playlist i filmów YouTube do śledzenia kursów i pogłębiania tematów omawianych na szkoleniu — odtwarzanie wbudowane lub otwarcie na YouTube.",
    navigation: "Nawigacja",
    homeLink: "Strona główna i materiały",
    andromedSite: "Strona Andromed",
    andromed: "Andromed",
    aboutPrefix: "Ten interfejs to projekt prowadzony przez ",
    aboutSuffix:
      ", który wspiera organizacje w transformacji cyfrowej: rozwój web i mobile, rozwiązania software'owe, szkolenia (web, Git, Unix) i doradztwo.",
    taglinePrefix: "« Napędzaj swoją cyfrową wizję w nieskończoność » — ",
    taglineLink: "andromed.fr",
    copyright: "© {year} Andromed. Wszelkie prawa zastrzeżone.",
    taglineShort: "Andromed Ressources — materiały edukacyjne",
  },
  theme: {
    light: "Przełącz na jasny motyw",
    dark: "Przełącz na ciemny motyw",
  },
  meta: {
    title: "Andromed Ressources — Materiały kursu",
    description:
      "Podsumowanie materiałów kursu. Filmy i playlisty YouTube do nauki.",
  },
};

const de: Messages = {
  nav: {
    title: "Andromed Ressources",
    subtitle: "Kursmaterialien",
    language: "Sprache",
  },
  hero: {
    badge: "Schulungsmaterialien",
    title: "Ihre Kursmaterialien",
    titleHighlight: "zentralisiert",
    subtitle:
      "YouTube-Videos und Playlists zum Wiederholen und Vertiefen — hier ansehen oder direkt auf YouTube öffnen.",
  },
  resources: {
    searchLabel: "Playlist oder Thema suchen",
    searchPlaceholder: "Nach Titel, Thema, Stichwort suchen…",
    visibleCount: "{visible} sichtbar von {total}",
    resultsCount: "{count} Ergebnis{plural} von {total}",
    favorites: "Favoriten ({count})",
    noResults:
      'Keine Playlist entspricht „{query}". Versuchen Sie ein anderes Stichwort oder löschen Sie die Suche.',
    addFavorite: "Zu Favoriten hinzufügen",
    removeFavorite: "Aus Favoriten entfernen",
    watchPlaylist: "Playlist ansehen",
  },
  watch: {
    playlistLabel: "Playlist — {title}",
    openYoutube: "Auf YouTube öffnen",
  },
  footer: {
    brand: "Andromed Ressources",
    description:
      "Sammlung von YouTube-Playlists und -Videos zum Folgen der Kurse und Vertiefen der in der Schulung behandelten Themen — eingebettete Wiedergabe oder Öffnung auf YouTube.",
    navigation: "Navigation",
    homeLink: "Startseite & Materialien",
    andromedSite: "Andromed-Website",
    andromed: "Andromed",
    aboutPrefix: "Diese Oberfläche ist ein Projekt von ",
    aboutSuffix:
      ", das Organisationen bei ihrer digitalen Transformation unterstützt: Web- und Mobile-Entwicklung, Softwarelösungen, Schulungen (Web, Git, Unix) und Beratung.",
    taglinePrefix: "« Treiben Sie Ihre digitale Vision ins Unendliche » — ",
    taglineLink: "andromed.fr",
    copyright: "© {year} Andromed. Alle Rechte vorbehalten.",
    taglineShort: "Andromed Ressources — Lernmaterialien",
  },
  theme: {
    light: "Zum hellen Modus wechseln",
    dark: "Zum dunklen Modus wechseln",
  },
  meta: {
    title: "Andromed Ressources — Kursmaterialien",
    description:
      "Übersicht der Kursmaterialien. YouTube-Videos und Playlists zum Lernen.",
  },
};

const es: Messages = {
  nav: {
    title: "Andromed Ressources",
    subtitle: "Recursos del curso",
    language: "Idioma",
  },
  hero: {
    badge: "Recursos de formación",
    title: "Tus recursos de curso",
    titleHighlight: "centralizados",
    subtitle:
      "Vídeos y listas de YouTube para repasar y profundizar — reproducción aquí o apertura directa en YouTube.",
  },
  resources: {
    searchLabel: "Buscar una lista o un tema",
    searchPlaceholder: "Buscar por título, tema, palabra clave…",
    visibleCount: "{visible} visibles de {total}",
    resultsCount: "{count} resultado{plural} de {total}",
    favorites: "Favoritos ({count})",
    noResults:
      'Ninguna lista coincide con «{query}». Prueba otra palabra clave o borra la búsqueda.',
    addFavorite: "Añadir a favoritos",
    removeFavorite: "Quitar de favoritos",
    watchPlaylist: "Ver la lista",
  },
  watch: {
    playlistLabel: "Lista — {title}",
    openYoutube: "Abrir en YouTube",
  },
  footer: {
    brand: "Andromed Ressources",
    description:
      "Recopilación de listas y vídeos de YouTube para seguir los cursos y profundizar los temas vistos en la formación — reproducción integrada o apertura en YouTube.",
    navigation: "Navegación",
    homeLink: "Inicio y recursos",
    andromedSite: "Sitio web de Andromed",
    andromed: "Andromed",
    aboutPrefix: "Esta interfaz es un proyecto liderado por ",
    aboutSuffix:
      ", que acompaña a las organizaciones en su transformación digital: desarrollo web y móvil, soluciones software, formación (desarrollo web, Git, Unix) y consultoría.",
    taglinePrefix: "« Impulsa tu visión digital hacia el infinito » — ",
    taglineLink: "andromed.fr",
    copyright: "© {year} Andromed. Todos los derechos reservados.",
    taglineShort: "Andromed Ressources — recursos pedagógicos",
  },
  theme: {
    light: "Cambiar a modo claro",
    dark: "Cambiar a modo oscuro",
  },
  meta: {
    title: "Andromed Ressources — Recursos del curso",
    description:
      "Resumen de los recursos del curso. Vídeos y listas de YouTube para aprender.",
  },
};

export const messages: Record<Locale, Messages> = {
  en,
  fr,
  pl,
  de,
  es,
};

export function formatMessage(template: string, values: Record<string, string>): string {
  return template.replace(/\{(\w+)\}/g, (_, key: string) => values[key] ?? `{${key}}`);
}
