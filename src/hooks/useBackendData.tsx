
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

// Type guard functions
const isValidDataArray = (data: any): data is any[] => {
  return Array.isArray(data) && data.length >= 0;
};

const isValidData = (data: any): boolean => {
  return data && !data.error && (Array.isArray(data) || typeof data === 'object');
};

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
    if (isValidData(teamsData) && isValidDataArray(teamsData)) {
      return teamsData as Team[];
    }
    return [];
  }, [teamsData]);

  const competitions: Competition[] = useMemo(() => {
    if (isValidData(competitionsData) && isValidDataArray(competitionsData)) {
      return competitionsData as Competition[];
    }
    return [];
  }, [competitionsData]);

  const games: Game[] = useMemo(() => {
    if (isValidData(gamesData) && isValidDataArray(gamesData)) {
      return gamesData as Game[];
    }
    return [];
  }, [gamesData]);

  const players: Player[] = useMemo(() => {
    if (isValidData(playersData) && isValidDataArray(playersData)) {
      return playersData as Player[];
    }
    return [];
  }, [playersData]);

  const news: NewsItem[] = useMemo(() => {
    if (isValidData(newsData) && isValidDataArray(newsData)) {
      return newsData as NewsItem[];
    }
    return [];
  }, [newsData]);

  const events: Event[] = useMemo(() => {
    if (isValidData(eventsData) && isValidDataArray(eventsData)) {
      return eventsData as Event[];
    }
    return [];
  }, [eventsData]);

  const nationalTeams = useMemo(() => {
    if (isValidData(nationalTeamsData) && isValidDataArray(nationalTeamsData)) {
      return nationalTeamsData;
    }
    return [];
  }, [nationalTeamsData]);

  const mediaGallery = useMemo(() => {
    if (isValidData(mediaGalleryData) && isValidDataArray(mediaGalleryData)) {
      return mediaGalleryData;
    }
    return [];
  }, [mediaGalleryData]);

  const referees = useMemo(() => {
    if (isValidData(refereesData) && isValidDataArray(refereesData)) {
      return refereesData;
    }
    return [];
  }, [refereesData]);

  const coaches = useMemo(() => {
    if (isValidData(coachesData) && isValidDataArray(coachesData)) {
      return coachesData;
    }
    return [];
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
      update: useUpdate('national_teams')
    },
    media: {
      create: useCreate('media_gallery'),
      update: useUpdate('media_gallery'),
      delete: useDelete('media_gallery')
    },
    referees: {
      create: useCreate('referees'),
      update: useUpdate('referees')
    },
    coaches: {
      create: useCreate('coaches'),
      update: useUpdate('coaches')
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
