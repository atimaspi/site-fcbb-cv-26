import { useApi } from '@/hooks/useApi';
import { useMemo } from 'react';
import { useQueryClient } from '@tanstack/react-query';

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
  address?: string;
  president_name?: string;
  coach_name?: string;
  home_venue?: string;
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
  regulations_url?: string;
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

export interface Referee {
  id: string;
  name: string;
  license_number?: string;
  category: string;
  phone?: string;
  email?: string;
  island: string;
  status: string;
}

export interface Coach {
  id: string;
  name: string;
  team_id?: string;
  license_number?: string;
  phone?: string;
  email?: string;
  experience_years?: number;
  status: string;
}

// Funções de validação melhoradas
const isValidArray = (data: any): data is any[] => {
  return Array.isArray(data);
};

const hasValidStructure = (data: any, requiredFields: string[]): boolean => {
  if (!Array.isArray(data)) return false;
  if (data.length === 0) return true;
  
  const firstItem = data[0];
  if (!firstItem || typeof firstItem !== 'object') return false;
  if (firstItem.error === true) return false;
  
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
  const queryClient = useQueryClient();

  // Fetch dados com cache otimizado - reduzir stale time para refletir mudanças mais rapidamente
  const { data: teamsData, isLoading: teamsLoading, error: teamsError, refetch: refetchTeams } = useFetch('teams');
  const { data: competitionsData, isLoading: competitionsLoading, refetch: refetchCompetitions } = useFetch('competitions');
  const { data: gamesData, isLoading: gamesLoading, refetch: refetchGames } = useFetch('games');
  const { data: playersData, isLoading: playersLoading, refetch: refetchPlayers } = useFetch('players');
  const { data: newsData, isLoading: newsLoading, refetch: refetchNews } = useFetch('news');
  const { data: eventsData, isLoading: eventsLoading, refetch: refetchEvents } = useFetch('events');
  const { data: refereesData, isLoading: refereesLoading, refetch: refetchReferees } = useFetch('referees');
  const { data: coachesData, isLoading: coachesLoading, refetch: refetchCoaches } = useFetch('coaches');

  // Arrays de dados processados
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

  const referees: Referee[] = useMemo(() => {
    return safeArrayCast<Referee>(refereesData, ['id', 'name', 'category', 'island', 'status']);
  }, [refereesData]);

  const coaches: Coach[] = useMemo(() => {
    return safeArrayCast<Coach>(coachesData, ['id', 'name', 'status']);
  }, [coachesData]);

  // Dados computados
  const recentGames = useMemo(() => {
    return games
      .filter(game => game.status === 'finalizado')
      .sort((a, b) => new Date(b.game_date).getTime() - new Date(a.game_date).getTime())
      .slice(0, 10);
  }, [games]);

  const upcomingGames = useMemo(() => {
    return games
      .filter(game => game.status === 'agendado')
      .sort((a, b) => new Date(a.game_date).getTime() - new Date(b.game_date).getTime())
      .slice(0, 10);
  }, [games]);

  const publishedNews = useMemo(() => {
    return news
      .filter(newsItem => newsItem.status === 'publicado' || newsItem.status === 'published')
      .sort((a, b) => new Date(b.published_at).getTime() - new Date(a.published_at).getTime());
  }, [news]);

  const activeEvents = useMemo(() => {
    return events
      .filter(event => event.status === 'ativo')
      .sort((a, b) => new Date(a.event_date).getTime() - new Date(b.event_date).getTime());
  }, [events]);

  // Função para forçar atualização de dados específicos
  const refreshData = {
    news: () => {
      queryClient.invalidateQueries({ queryKey: ['news'] });
      refetchNews();
    },
    events: () => {
      queryClient.invalidateQueries({ queryKey: ['events'] });
      refetchEvents();
    },
    teams: () => {
      queryClient.invalidateQueries({ queryKey: ['teams'] });
      refetchTeams();
    },
    games: () => {
      queryClient.invalidateQueries({ queryKey: ['games'] });
      refetchGames();
    },
    all: () => {
      queryClient.invalidateQueries();
      refetchNews();
      refetchEvents();
      refetchTeams();
      refetchGames();
      refetchCompetitions();
      refetchPlayers();
      refetchReferees();
      refetchCoaches();
    }
  };

  // Operações CRUD com invalidação automática
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
    competitions,
    games,
    players,
    newsData: news,
    eventsData: events,
    referees,
    coaches,

    // Computed data
    recentGames,
    upcomingGames,
    publishedNews,
    activeEvents,

    // Loading states
    isLoading: teamsLoading || competitionsLoading || gamesLoading || playersLoading || 
               newsLoading || eventsLoading || refereesLoading || coachesLoading,

    // Individual loading states
    teamsLoading,
    competitionsLoading,
    gamesLoading,
    playersLoading,
    newsLoading,
    eventsLoading,
    refereesLoading,
    coachesLoading,

    // CRUD operations
    operations,

    // Refresh functions
    refreshData
  };
};
