import { useApi } from '@/hooks/useApi';
import { useMemo } from 'react';

export interface Team {
  id: string;
  name: string;
  abbreviation?: string;
  city: string;
  island: string;
  founded_year?: number;
  logo_url?: string;
  website?: string;
  email?: string;
  phone?: string;
  status: string;
}

export interface Competition {
  id: string;
  name: string;
  type: string;
  season: string;
  status: string;
  start_date?: string;
  end_date?: string;
  description?: string;
}

export interface Game {
  id: string;
  competition_id: string;
  home_team_id: string;
  away_team_id: string;
  game_date: string;
  venue?: string;
  home_score: number;
  away_score: number;
  status: string;
}

export interface Player {
  id: string;
  team_id: string;
  name: string;
  jersey_number?: number;
  position?: string;
  height_cm?: number;
  weight_kg?: number;
  birth_date?: string;
  nationality: string;
}

export interface NewsItem {
  id: string;
  title: string;
  content: string;
  excerpt?: string;
  featured_image_url?: string;
  category: string;
  published_at: string;
  status: string;
}

export interface Event {
  id: string;
  title: string;
  description?: string;
  event_date: string;
  end_date?: string;
  location?: string;
  event_type: string;
  status: string;
}

// Improved type guards
const isValidArray = (data: any): data is any[] => {
  return Array.isArray(data);
};

const hasValidStructure = (data: any, requiredFields: string[]): boolean => {
  if (!Array.isArray(data)) return false;
  if (data.length === 0) return true; // Empty arrays are valid
  
  // Check if first item has required fields and is not an error object
  const firstItem = data[0];
  if (!firstItem || typeof firstItem !== 'object') return false;
  if (firstItem.error === true) return false; // Supabase error object
  
  return requiredFields.every(field => field in firstItem);
};

function safeArrayCast<T>(data: any, requiredFields: string[]): T[] {
  if (isValidArray(data) && hasValidStructure(data, requiredFields)) {
    return data as T[];
  }
  return [];
}

export const useBackendData = () => {
  const { useFetch, useCreate, useUpdate, useDelete } = useApi();

  // Data fetching
  const { data: teamsData, isLoading: teamsLoading } = useFetch('teams');
  const { data: competitionsData, isLoading: competitionsLoading } = useFetch('competitions');
  const { data: gamesData, isLoading: gamesLoading } = useFetch('games');
  const { data: playersData, isLoading: playersLoading } = useFetch('players');
  const { data: newsData, isLoading: newsLoading } = useFetch('news');
  const { data: eventsData, isLoading: eventsLoading } = useFetch('events');
  const { data: nationalTeamsData, isLoading: nationalTeamsLoading } = useFetch('national_teams');
  const { data: mediaGalleryData, isLoading: mediaLoading } = useFetch('media_gallery');
  const { data: refereesData, isLoading: refereesLoading } = useFetch('referees');
  const { data: coachesData, isLoading: coachesLoading } = useFetch('coaches');

  // Safe data arrays with proper type checking
  const teams: Team[] = useMemo(() => {
    return safeArrayCast<Team>(teamsData, ['id', 'name', 'city', 'island', 'status']);
  }, [teamsData]);

  const competitions: Competition[] = useMemo(() => {
    return safeArrayCast<Competition>(competitionsData, ['id', 'name', 'type', 'season', 'status']);
  }, [competitionsData]);

  const games: Game[] = useMemo(() => {
    return safeArrayCast<Game>(gamesData, ['id', 'competition_id', 'home_team_id', 'away_team_id', 'status']);
  }, [gamesData]);

  const players: Player[] = useMemo(() => {
    return safeArrayCast<Player>(playersData, ['id', 'team_id', 'name', 'nationality']);
  }, [playersData]);

  const news: NewsItem[] = useMemo(() => {
    return safeArrayCast<NewsItem>(newsData, ['id', 'title', 'content', 'category', 'published_at', 'status']);
  }, [newsData]);

  const events: Event[] = useMemo(() => {
    return safeArrayCast<Event>(eventsData, ['id', 'title', 'event_date', 'event_type', 'status']);
  }, [eventsData]);

  const nationalTeams = useMemo(() => {
    return isValidArray(nationalTeamsData) ? nationalTeamsData : [];
  }, [nationalTeamsData]);

  const mediaGallery = useMemo(() => {
    return isValidArray(mediaGalleryData) ? mediaGalleryData : [];
  }, [mediaGalleryData]);

  const referees = useMemo(() => {
    return isValidArray(refereesData) ? refereesData : [];
  }, [refereesData]);

  const coaches = useMemo(() => {
    return isValidArray(coachesData) ? coachesData : [];
  }, [coachesData]);

  // Computed data with proper type safety
  const recentGames = useMemo(() => {
    if (!games || games.length === 0) return [];
    
    return games
      .filter((game: Game) => game && game.status === 'finalizado')
      .sort((a: Game, b: Game) => new Date(b.game_date).getTime() - new Date(a.game_date).getTime())
      .slice(0, 10);
  }, [games]);

  const upcomingGames = useMemo(() => {
    if (!games || games.length === 0) return [];
    
    return games
      .filter((game: Game) => game && game.status === 'agendado')
      .sort((a: Game, b: Game) => new Date(a.game_date).getTime() - new Date(b.game_date).getTime())
      .slice(0, 10);
  }, [games]);

  const publishedNews = useMemo(() => {
    if (!news || news.length === 0) return [];
    
    return news
      .filter((newsItem: NewsItem) => newsItem && newsItem.status === 'publicado')
      .sort((a: NewsItem, b: NewsItem) => new Date(b.published_at).getTime() - new Date(a.published_at).getTime());
  }, [news]);

  const activeEvents = useMemo(() => {
    if (!events || events.length === 0) return [];
    
    return events
      .filter((event: Event) => event && event.status === 'ativo')
      .sort((a: Event, b: Event) => new Date(a.event_date).getTime() - new Date(b.event_date).getTime());
  }, [events]);

  // CRUD operations
  const operations = {
    teams: {
      create: useCreate('teams'),
      update: useUpdate('teams'),
      delete: useDelete('teams')
    },
    competitions: {
      create: useCreate('competitions'),
      update: useUpdate('competitions'),
      delete: useDelete('competitions')
    },
    games: {
      create: useCreate('games'),
      update: useUpdate('games'),
      delete: useDelete('games')
    },
    players: {
      create: useCreate('players'),
      update: useUpdate('players'),
      delete: useDelete('players')
    },
    news: {
      create: useCreate('news'),
      update: useUpdate('news'),
      delete: useDelete('news')
    },
    events: {
      create: useCreate('events'),
      update: useUpdate('events'),
      delete: useDelete('events')
    },
    nationalTeams: {
      create: useCreate('national_teams'),
      update: useUpdate('national_teams'),
      delete: useDelete('national_teams')
    },
    media: {
      create: useCreate('media_gallery'),
      update: useUpdate('media_gallery'),
      delete: useDelete('media_gallery')
    },
    referees: {
      create: useCreate('referees'),
      update: useUpdate('referees'),
      delete: useDelete('referees')
    },
    coaches: {
      create: useCreate('coaches'),
      update: useUpdate('coaches'),
      delete: useDelete('coaches')
    }
  };

  return {
    // Data arrays (now properly typed)
    teams,
    competitions,
    games,
    players,
    newsData: news,
    eventsData: events,
    nationalTeams,
    mediaGallery,
    referees,
    coaches,

    // Computed data
    recentGames,
    upcomingGames,
    publishedNews,
    activeEvents,

    // Loading states
    isLoading: teamsLoading || competitionsLoading || gamesLoading || playersLoading || 
               newsLoading || eventsLoading || nationalTeamsLoading || mediaLoading || 
               refereesLoading || coachesLoading,

    // CRUD operations
    operations
  };
};
