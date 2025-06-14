
import { useApi } from '@/hooks/useApi';
import { useMemo } from 'react';
import { safeArrayCast, getCacheConfig } from '@/utils/dataUtils';
import { useComputedData } from '@/hooks/useComputedData';
import { useBackendOperations } from '@/hooks/useBackendOperations';
import type {
  Team,
  Club,
  Competition,
  Game,
  Player,
  NewsItem,
  Event,
  Referee,
  Coach,
  Federation,
  RegionalAssociation
} from '@/types/backend';

export const useBackendData = () => {
  const { useFetch } = useApi();
  const { operations } = useBackendOperations();

  // Cache configuration
  const cacheConfig = getCacheConfig();

  // Fetch data with optimized configuration
  const { data: teamsData, isLoading: teamsLoading } = useFetch('teams', cacheConfig);
  const { data: clubsData, isLoading: clubsLoading } = useFetch('clubs', cacheConfig);
  const { data: competitionsData, isLoading: competitionsLoading } = useFetch('championships', cacheConfig);
  const { data: gamesData, isLoading: gamesLoading } = useFetch('games', cacheConfig);
  const { data: playersData, isLoading: playersLoading } = useFetch('players', cacheConfig);
  const { data: newsData, isLoading: newsLoading } = useFetch('news', cacheConfig);
  const { data: eventsData, isLoading: eventsLoading } = useFetch('events', cacheConfig);
  const { data: refereesData, isLoading: refereesLoading } = useFetch('referees', cacheConfig);
  const { data: coachesData, isLoading: coachesLoading } = useFetch('coaches', cacheConfig);
  const { data: federationsData, isLoading: federationsLoading } = useFetch('federations', cacheConfig);
  const { data: regionalAssociationsData, isLoading: regionalAssociationsLoading } = useFetch('regional_associations', cacheConfig);

  // Process arrays with memoization
  const teams: Team[] = useMemo(() => safeArrayCast<Team>(teamsData), [teamsData]);
  const clubs: Club[] = useMemo(() => safeArrayCast<Club>(clubsData), [clubsData]);
  const competitions: Competition[] = useMemo(() => safeArrayCast<Competition>(competitionsData), [competitionsData]);
  const games: Game[] = useMemo(() => safeArrayCast<Game>(gamesData), [gamesData]);
  const players: Player[] = useMemo(() => safeArrayCast<Player>(playersData), [playersData]);
  const news: NewsItem[] = useMemo(() => safeArrayCast<NewsItem>(newsData), [newsData]);
  const events: Event[] = useMemo(() => safeArrayCast<Event>(eventsData), [eventsData]);
  const referees: Referee[] = useMemo(() => safeArrayCast<Referee>(refereesData), [refereesData]);
  const coaches: Coach[] = useMemo(() => safeArrayCast<Coach>(coachesData), [coachesData]);
  const federations: Federation[] = useMemo(() => safeArrayCast<Federation>(federationsData), [federationsData]);
  const regionalAssociations: RegionalAssociation[] = useMemo(() => safeArrayCast<RegionalAssociation>(regionalAssociationsData), [regionalAssociationsData]);

  // Get computed properties
  const { publishedNews, activeEvents, upcomingGames, recentGames } = useComputedData(news, events, games);

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
    federations,
    regionalAssociations,

    // Computed properties
    publishedNews,
    activeEvents,
    upcomingGames,
    recentGames,
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
    federationsLoading,
    regionalAssociationsLoading,

    // CRUD operations
    operations
  };
};

// Re-export types for convenience
export type {
  Team,
  Club,
  Competition,
  Game,
  Player,
  NewsItem,
  Event,
  Referee,
  Coach,
  Federation,
  RegionalAssociation
} from '@/types/backend';
