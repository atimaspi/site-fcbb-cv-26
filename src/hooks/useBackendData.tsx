
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

  // Fetch data with simplified approach
  const { data: teamsData, isLoading: teamsLoading, error: teamsError } = useFetch('teams');
  const { data: clubsData, isLoading: clubsLoading, error: clubsError } = useFetch('clubs');
  const { data: competitionsData, isLoading: competitionsLoading, error: competitionsError } = useFetch('championships');
  const { data: gamesData, isLoading: gamesLoading, error: gamesError } = useFetch('games');
  const { data: playersData, isLoading: playersLoading, error: playersError } = useFetch('players');
  const { data: newsData, isLoading: newsLoading, error: newsError } = useFetch('news');
  const { data: eventsData, isLoading: eventsLoading, error: eventsError } = useFetch('events');
  const { data: refereesData, isLoading: refereesLoading, error: refereesError } = useFetch('referees');
  const { data: federationsData, isLoading: federationsLoading, error: federationsError } = useFetch('federations');
  const { data: regionalAssociationsData, isLoading: regionalAssociationsLoading, error: regionalAssociationsError } = useFetch('regional_associations');

  // Comprehensive logging for all data
  console.log('=== COMPLETE DATA LOADING STATUS ===');
  console.log('Teams:', { data: teamsData, loading: teamsLoading, error: teamsError });
  console.log('Clubs:', { data: clubsData, loading: clubsLoading, error: clubsError });
  console.log('Competitions:', { data: competitionsData, loading: competitionsLoading, error: competitionsError });
  console.log('Games:', { data: gamesData, loading: gamesLoading, error: gamesError });
  console.log('Players:', { data: playersData, loading: playersLoading, error: playersError });
  console.log('News:', { data: newsData, loading: newsLoading, error: newsError });
  console.log('Events:', { data: eventsData, loading: eventsLoading, error: eventsError });
  console.log('Referees:', { data: refereesData, loading: refereesLoading, error: refereesError });
  console.log('Federations:', { data: federationsData, loading: federationsLoading, error: federationsError });
  console.log('Regional Associations:', { data: regionalAssociationsData, loading: regionalAssociationsLoading, error: regionalAssociationsError });
  console.log('====================================');

  // Process arrays with detailed logging
  const teams: Team[] = useMemo(() => {
    const result = safeArrayCast<Team>(teamsData);
    console.log('Processed teams:', result);
    return result;
  }, [teamsData]);

  const clubs: Club[] = useMemo(() => {
    const result = safeArrayCast<Club>(clubsData);
    console.log('Processed clubs:', result);
    return result;
  }, [clubsData]);

  const competitions: Competition[] = useMemo(() => {
    const result = safeArrayCast<Competition>(competitionsData);
    console.log('Processed competitions:', result);
    return result;
  }, [competitionsData]);

  const games: Game[] = useMemo(() => {
    const result = safeArrayCast<Game>(gamesData);
    console.log('Processed games:', result);
    return result;
  }, [gamesData]);

  const players: Player[] = useMemo(() => {
    const result = safeArrayCast<Player>(playersData);
    console.log('Processed players:', result);
    return result;
  }, [playersData]);

  const news: NewsItem[] = useMemo(() => {
    const result = safeArrayCast<NewsItem>(newsData);
    console.log('Processed news:', result);
    return result;
  }, [newsData]);

  const events: Event[] = useMemo(() => {
    const result = safeArrayCast<Event>(eventsData);
    console.log('Processed events:', result);
    return result;
  }, [eventsData]);

  const referees: Referee[] = useMemo(() => {
    const result = safeArrayCast<Referee>(refereesData);
    console.log('Processed referees:', result);
    return result;
  }, [refereesData]);

  const federations: Federation[] = useMemo(() => {
    console.log('Processing federations - raw data:', federationsData);
    const result = safeArrayCast<Federation>(federationsData);
    console.log('Processed federations result:', result);
    return result;
  }, [federationsData]);

  const regionalAssociations: RegionalAssociation[] = useMemo(() => {
    const result = safeArrayCast<RegionalAssociation>(regionalAssociationsData);
    console.log('Processed regional associations:', result);
    return result;
  }, [regionalAssociationsData]);

  // Handle coaches separately since the table doesn't exist
  const coaches: Coach[] = useMemo(() => [], []);
  const coachesLoading = false;

  // Get computed properties
  const { publishedNews, activeEvents, upcomingGames, recentGames } = useComputedData(news, events, games);

  // Log summary
  console.log('=== DATA SUMMARY ===');
  console.log('Teams count:', teams.length);
  console.log('Clubs count:', clubs.length);
  console.log('Competitions count:', competitions.length);
  console.log('Games count:', games.length);
  console.log('Players count:', players.length);
  console.log('News count:', news.length);
  console.log('Events count:', events.length);
  console.log('Referees count:', referees.length);
  console.log('Federations count:', federations.length);
  console.log('Regional Associations count:', regionalAssociations.length);
  console.log('===================');

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
    isLoading: teamsLoading || clubsLoading || newsLoading || federationsLoading,
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

    // All errors for debugging
    teamsError,
    clubsError,
    competitionsError,
    gamesError,
    playersError,
    newsError,
    eventsError,
    refereesError,
    federationsError,
    regionalAssociationsError,

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
