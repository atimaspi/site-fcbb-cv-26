
import { useApi } from '@/hooks/useApi';
import { useMemo } from 'react';
import { useQueryClient } from '@tanstack/react-query';

export interface Team {
  id: string;
  name: string;
  category: string;
  club_id?: string;
  division?: string;
  created_at?: string;
}

export interface Club {
  id: string;
  name: string;
  island: string;
  founded_year?: number;
  logo_url?: string;
  contact_email?: string;
  contact_phone?: string;
  address?: string;
  website?: string;
  description?: string;
  status?: string;
  active?: boolean;
  regional_association_id?: string;
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
  federation_id?: string;
  regional_association_id?: string;
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
  height_cm?: number;
  weight_kg?: number;
  birth_date?: string;
  nationality?: string;
  status?: string;
  active?: boolean;
}

export interface NewsItem {
  id: string;
  title: string;
  content: string;
  excerpt?: string;
  image_url?: string;
  category?: string;
  published?: boolean;
  status?: string;
  author?: string;
  author_id?: string;
  featured?: boolean;
  created_at?: string;
  updated_at?: string;
}

export interface Event {
  id: string;
  title: string;
  description?: string;
  event_date: string;
  end_date?: string;
  location?: string;
  type?: string;
  organizer?: string;
  created_at?: string;
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
  certified_date?: string;
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

export interface RegionalAssociation {
  id: string;
  name: string;
  island?: string;
  acronym?: string;
  address?: string;
  contact_email?: string;
  contact_phone?: string;
  logo_url?: string;
  federation_id: string;
}

export interface Federation {
  id: string;
  name: string;
  acronym?: string;
  address?: string;
  contact_email?: string;
  contact_phone?: string;
  website?: string;
  logo_url?: string;
  foundation_date?: string;
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

  // Fetch dados das tabelas principais
  const { data: teamsData, isLoading: teamsLoading, error: teamsError, refetch: refetchTeams } = useFetch('teams');
  const { data: clubsData, isLoading: clubsLoading, refetch: refetchClubs } = useFetch('clubs');
  const { data: competitionsData, isLoading: competitionsLoading, refetch: refetchCompetitions } = useFetch('championships');
  const { data: gamesData, isLoading: gamesLoading, refetch: refetchGames } = useFetch('games');
  const { data: playersData, isLoading: playersLoading, refetch: refetchPlayers } = useFetch('players');
  const { data: newsData, isLoading: newsLoading, refetch: refetchNews } = useFetch('news');
  const { data: eventsData, isLoading: eventsLoading, refetch: refetchEvents } = useFetch('events');
  const { data: refereesData, isLoading: refereesLoading, refetch: refetchReferees } = useFetch('referees');
  const { data: regionalAssociationsData, isLoading: regionalAssociationsLoading, refetch: refetchRegionalAssociations } = useFetch('regional_associations');
  const { data: federationsData, isLoading: federationsLoading, refetch: refetchFederations } = useFetch('federations');

  // Arrays de dados processados
  const teams: Team[] = useMemo(() => {
    return safeArrayCast<Team>(teamsData, ['id', 'name', 'category']);
  }, [teamsData]);

  const clubs: Club[] = useMemo(() => {
    return safeArrayCast<Club>(clubsData, ['id', 'name', 'island']);
  }, [clubsData]);

  const competitions: Competition[] = useMemo(() => {
    return safeArrayCast<Competition>(competitionsData, ['id', 'name', 'type', 'season', 'status']);
  }, [competitionsData]);

  const games: Game[] = useMemo(() => {
    return safeArrayCast<Game>(gamesData, ['id', 'scheduled_date']);
  }, [gamesData]);

  const players: Player[] = useMemo(() => {
    return safeArrayCast<Player>(playersData, ['id', 'first_name', 'last_name']);
  }, [playersData]);

  const news: NewsItem[] = useMemo(() => {
    return safeArrayCast<NewsItem>(newsData, ['id', 'title', 'content']);
  }, [newsData]);

  const events: Event[] = useMemo(() => {
    return safeArrayCast<Event>(eventsData, ['id', 'title', 'event_date']);
  }, [eventsData]);

  const referees: Referee[] = useMemo(() => {
    return safeArrayCast<Referee>(refereesData, ['id', 'first_name', 'last_name', 'level']);
  }, [refereesData]);

  const regionalAssociations: RegionalAssociation[] = useMemo(() => {
    return safeArrayCast<RegionalAssociation>(regionalAssociationsData, ['id', 'name', 'federation_id']);
  }, [regionalAssociationsData]);

  const federations: Federation[] = useMemo(() => {
    return safeArrayCast<Federation>(federationsData, ['id', 'name']);
  }, [federationsData]);

  // Função para forçar atualização de dados específicos
  const refreshData = {
    teams: () => {
      queryClient.invalidateQueries({ queryKey: ['teams'] });
      refetchTeams();
    },
    clubs: () => {
      queryClient.invalidateQueries({ queryKey: ['clubs'] });
      refetchClubs();
    },
    competitions: () => {
      queryClient.invalidateQueries({ queryKey: ['championships'] });
      refetchCompetitions();
    },
    games: () => {
      queryClient.invalidateQueries({ queryKey: ['games'] });
      refetchGames();
    },
    players: () => {
      queryClient.invalidateQueries({ queryKey: ['players'] });
      refetchPlayers();
    },
    news: () => {
      queryClient.invalidateQueries({ queryKey: ['news'] });
      refetchNews();
    },
    events: () => {
      queryClient.invalidateQueries({ queryKey: ['events'] });
      refetchEvents();
    },
    referees: () => {
      queryClient.invalidateQueries({ queryKey: ['referees'] });
      refetchReferees();
    },
    regionalAssociations: () => {
      queryClient.invalidateQueries({ queryKey: ['regional_associations'] });
      refetchRegionalAssociations();
    },
    federations: () => {
      queryClient.invalidateQueries({ queryKey: ['federations'] });
      refetchFederations();
    },
    all: () => {
      queryClient.invalidateQueries();
      refetchTeams();
      refetchClubs();
      refetchCompetitions();
      refetchGames();
      refetchPlayers();
      refetchNews();
      refetchEvents();
      refetchReferees();
      refetchRegionalAssociations();
      refetchFederations();
    }
  };

  // Operações CRUD com invalidação automática
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
    regionalAssociations: {
      create: useCreate('regional_associations'),
      update: useUpdate('regional_associations'),
      delete: useDelete('regional_associations')
    },
    federations: {
      create: useCreate('federations'),
      update: useUpdate('federations'),
      delete: useDelete('federations')
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
    regionalAssociations,
    federations,

    // Loading states
    isLoading: teamsLoading || clubsLoading || competitionsLoading || gamesLoading || 
               playersLoading || newsLoading || eventsLoading || refereesLoading ||
               regionalAssociationsLoading || federationsLoading,

    // Individual loading states
    teamsLoading,
    clubsLoading,
    competitionsLoading,
    gamesLoading,
    playersLoading,
    newsLoading,
    eventsLoading,
    refereesLoading,
    regionalAssociationsLoading,
    federationsLoading,

    // CRUD operations
    operations,

    // Refresh functions
    refreshData
  };
};
