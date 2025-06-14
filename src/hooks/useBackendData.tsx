
import { useApi } from '@/hooks/useApi';
import { useMemo } from 'react';

export interface Team {
  id: string;
  name: string;
  category?: string;
  abbreviation?: string;
  city?: string;
  island?: string;
  status?: string;
}

export interface Club {
  id: string;
  name: string;
  island?: string;
  abbreviation?: string;
  city?: string;
  status?: string;
  active?: boolean;
}

export interface Competition {
  id: string;
  name: string;
  type?: string;
  season?: string;
  status?: string;
  start_date?: string;
  end_date?: string;
}

export interface Game {
  id: string;
  competition_id?: string;
  home_team_id?: string;
  away_team_id?: string;
  scheduled_date: string;
  venue?: string;
  home_score?: number;
  away_score?: number;
  status?: string;
  round?: string;
}

export interface Player {
  id: string;
  first_name: string;
  last_name: string;
  team_id?: string;
  jersey_number?: number;
  position?: string;
  status?: string;
  active?: boolean;
}

export interface NewsItem {
  id: string;
  title: string;
  content: string;
  excerpt?: string;
  featured_image_url?: string;
  category?: string;
  published?: boolean;
  published_at?: string;
  status?: string;
  author?: string;
  featured?: boolean;
}

export interface Event {
  id: string;
  title: string;
  description?: string;
  event_date: string;
  location?: string;
  type?: string;
  status?: string;
}

export interface Referee {
  id: string;
  first_name: string;
  last_name: string;
  license_number?: string;
  level: string;
  phone?: string;
  email?: string;
  island?: string;
  active?: boolean;
}

export interface Coach {
  id: string;
  name: string;
  team_id?: string;
  license_number?: string;
  phone?: string;
  email?: string;
  status: string;
}

// Funções de validação simplificadas
const isValidArray = (data: any): data is any[] => {
  return Array.isArray(data) && data.length >= 0;
};

function safeArrayCast<T>(data: any): T[] {
  if (isValidArray(data)) {
    return data.filter(item => item && typeof item === 'object' && 'id' in item);
  }
  return [];
}

export const useBackendData = () => {
  const { useFetch, useCreate, useUpdate, useDelete } = useApi();

  // Configuração otimizada de cache
  const cacheConfig = {
    staleTime: 2 * 60 * 1000, // 2 minutos
    gcTime: 5 * 60 * 1000, // 5 minutos
    retry: 1,
    refetchOnWindowFocus: false,
  };

  // Fetch dados com configuração otimizada
  const { data: teamsData, isLoading: teamsLoading } = useFetch('teams', cacheConfig);
  const { data: clubsData, isLoading: clubsLoading } = useFetch('clubs', cacheConfig);
  const { data: competitionsData, isLoading: competitionsLoading } = useFetch('championships', cacheConfig);
  const { data: gamesData, isLoading: gamesLoading } = useFetch('games', cacheConfig);
  const { data: playersData, isLoading: playersLoading } = useFetch('players', cacheConfig);
  const { data: newsData, isLoading: newsLoading } = useFetch('news', cacheConfig);
  const { data: eventsData, isLoading: eventsLoading } = useFetch('events', cacheConfig);
  const { data: refereesData, isLoading: refereesLoading } = useFetch('referees', cacheConfig);
  const { data: coachesData, isLoading: coachesLoading } = useFetch('coaches', cacheConfig);

  // Arrays processados com memoização
  const teams: Team[] = useMemo(() => safeArrayCast<Team>(teamsData), [teamsData]);
  const clubs: Club[] = useMemo(() => safeArrayCast<Club>(clubsData), [clubsData]);
  const competitions: Competition[] = useMemo(() => safeArrayCast<Competition>(competitionsData), [competitionsData]);
  const games: Game[] = useMemo(() => safeArrayCast<Game>(gamesData), [gamesData]);
  const players: Player[] = useMemo(() => safeArrayCast<Player>(playersData), [playersData]);
  const news: NewsItem[] = useMemo(() => safeArrayCast<NewsItem>(newsData), [newsData]);
  const events: Event[] = useMemo(() => safeArrayCast<Event>(eventsData), [eventsData]);
  const referees: Referee[] = useMemo(() => safeArrayCast<Referee>(refereesData), [refereesData]);
  const coaches: Coach[] = useMemo(() => safeArrayCast<Coach>(coachesData), [coachesData]);

  // Computed properties otimizadas
  const publishedNews = useMemo(() => {
    return news
      .filter(item => item.published === true || item.status === 'published')
      .sort((a, b) => {
        if (!a.published_at || !b.published_at) return 0;
        return new Date(b.published_at).getTime() - new Date(a.published_at).getTime();
      })
      .slice(0, 10);
  }, [news]);

  // Operações CRUD
  const operations = {
    teams: {
      create: useCreate('teams'),
      update: useUpdate('teams'),
      delete: useDelete('teams')
    },
    clubs: {
      create: useCreate('clubs'),
      update: useUpdate('clubs'),
      delete: useDelete('clubs')
    },
    competitions: {
      create: useCreate('championships'),
      update: useUpdate('championships'),
      delete: useDelete('championships')
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
    // Data arrays
    teams,
    clubs,
    competitions,
    games,
    players,
    news,
    events,
    referees,
    coaches,

    // Computed properties
    publishedNews,
    newsData,
    eventsData,

    // Loading states
    isLoading: teamsLoading || clubsLoading || newsLoading,
    teamsLoading,
    clubsLoading,
    competitionsLoading,
    gamesLoading,
    playersLoading,
    newsLoading,
    eventsLoading,
    refereesLoading,
    coachesLoading,

    // CRUD operations
    operations
  };
};
