/**
 * Tipos TypeScript para las respuestas de las APIs
 */

// ============================================
// FOOTBALL API TYPES (API-Football)
// ============================================
export interface FootballLeague {
  id: number;
  name: string;
  country: string;
  logo: string;
  season: number;
}

export interface FootballTeam {
  id: number;
  name: string;
  logo: string;
  country: string;
}

export interface FootballMatch {
  id: number;
  date: string;
  homeTeam: FootballTeam;
  awayTeam: FootballTeam;
  score: {
    home: number | null;
    away: number | null;
  };
  status: string;
}

// ============================================
// VIDEO GAMES API TYPES (RAWG API)
// ============================================
export interface VideoGame {
  id: number;
  name: string;
  background_image: string;
  rating: number;
  released: string;
  genres: Array<{
    id: number;
    name: string;
  }>;
  platforms: Array<{
    platform: {
      id: number;
      name: string;
    };
  }>;
  short_screenshots?: Array<{
    id: number;
    image: string;
  }>;
}

export interface VideoGamesResponse {
  count: number;
  results: VideoGame[];
}

// ============================================
// BIBLE API TYPES
// ============================================
export interface BibleVerse {
  reference: string;
  verses: Array<{
    book_id: string;
    book_name: string;
    chapter: number;
    verse: number;
    text: string;
  }>;
  text: string;
  translation_id: string;
  translation_name: string;
}

export interface BibleBook {
  id: string;
  name: string;
  testament: 'old' | 'new';
  chapters: number;
}

// ============================================
// ANIME API TYPES (Jikan/MyAnimeList)
// ============================================
export interface AnimeItem {
  mal_id: number;
  title: string;
  title_english: string | null;
  images: {
    jpg: {
      image_url: string;
      small_image_url: string;
      large_image_url: string;
    };
  };
  score: number | null;
  scored_by: number | null;
  rank: number | null;
  synopsis: string;
  year: number | null;
  episodes: number | null;
  status: string;
  genres: Array<{
    mal_id: number;
    name: string;
  }>;
}

export interface AnimeResponse {
  data: AnimeItem[];
  pagination: {
    last_visible_page: number;
    has_next_page: boolean;
    current_page: number;
  };
}

// ============================================
// GENERIC API TYPES
// ============================================
export interface ApiError {
  message: string;
  status?: number;
}

export interface ApiState<T> {
  data: T | null;
  loading: boolean;
  error: ApiError | null;
}
