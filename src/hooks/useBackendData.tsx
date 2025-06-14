
import { useApi } from '@/hooks/useApi';
import { useMemo } from 'react';
import { safeArrayCast } from '@/utils/dataUtils';
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

  // Fetch data without problematic cache config
  const { data: teamsData, isLoading: teamsLoading } = useFetch('teams');
  const { data: clubsData, isLoading: clubsLoading } = useFetch('clubs');
  const { data: competitionsData, isLoading: competitionsLoading } = useFetch('championships');
  const { data: gamesData, isLoading: gamesLoading } = useFetch('games');
  const { data: playersData, isLoading: playersLoading } = useFetch('players');
  const { data: newsData, isLoading: newsLoading } = useFetch('news');
  const { data: eventsData, isLoading: eventsLoading } = useFetch('events');
  const { data: refereesData, isLoading: refereesLoading } = useFetch('referees');
  
  // Tentar fetch direto das federações com debug detalhado
  const { data: federationsData, isLoading: federationsLoading, error: federationsError } = useFetch('federations');
  const { data: regionalAssociationsData, isLoading: regionalAssociationsLoading } = useFetch('regional_associations');

  // Debug federations com informações mais detalhadas
  console.log('=== DETAILED FEDERATIONS DEBUG ===');
  console.log('Raw federationsData:', federationsData);
  console.log('Type of federationsData:', typeof federationsData);
  console.log('Is federationsData null?', federationsData === null);
  console.log('Is federationsData undefined?', federationsData === undefined);
  console.log('Is federationsData an array?', Array.isArray(federationsData));
  console.log('federationsData length:', federationsData?.length);
  console.log('federationsLoading:', federationsLoading);
  console.log('federationsError:', federationsError);
  if (federationsError) {
    console.error('Federations error details:', {
      message: federationsError.message,
      code: (federationsError as any).code,
      details: (federationsError as any).details,
      hint: (federationsError as any).hint
    });
  }
  console.log('==============================');

  // Process arrays with memoization
  const teams: Team[] = useMemo(() => safeArrayCast<Team>(teamsData), [teamsData]);
  const clubs: Club[] = useMemo(() => safeArrayCast<Club>(clubsData), [clubsData]);
  const competitions: Competition[] = useMemo(() => safeArrayCast<Competition>(competitionsData), [competitionsData]);
  const games: Game[] = useMemo(() => safeArrayCast<Game>(gamesData), [gamesData]);
  const players: Player[] = useMemo(() => safeArrayCast<Player>(playersData), [playersData]);
  const news: NewsItem[] = useMemo(() => safeArrayCast<NewsItem>(newsData), [newsData]);
  const events: Event[] = useMemo(() => safeArrayCast<Event>(eventsData), [eventsData]);
  const referees: Referee[] = useMemo(() => safeArrayCast<Referee>(refereesData), [refereesData]);
  const federations: Federation[] = useMemo(() => {
    console.log('Processing federations data in useMemo...');
    console.log('Input federationsData:', federationsData);
    const result = safeArrayCast<Federation>(federationsData);
    console.log('Processed federations result:', result);
    console.log('Processed federations length:', result.length);
    return result;
  }, [federationsData]);
  const regionalAssociations: RegionalAssociation[] = useMemo(() => safeArrayCast<RegionalAssociation>(regionalAssociationsData), [regionalAssociationsData]);

  // Handle coaches separately since the table doesn't exist
  const coaches: Coach[] = useMemo(() => [], []);
  const coachesLoading = false;

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

    // Errors for debug
    federationsError,

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
