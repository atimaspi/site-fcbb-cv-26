
import { useComputedData } from '@/hooks/useComputedData';
import { useBackendOperations } from '@/hooks/useBackendOperations';
import { useDataFetching } from '@/hooks/useDataFetching';
import { useDataProcessing } from '@/hooks/useDataProcessing';

export const useBackendData = () => {
  const { operations } = useBackendOperations();
  
  // Fetch all raw data
  const fetchingData = useDataFetching();
  
  // Process the raw data into typed arrays
  const processedData = useDataProcessing({
    teamsData: fetchingData.teamsData,
    clubsData: fetchingData.clubsData,
    competitionsData: fetchingData.competitionsData,
    gamesData: fetchingData.gamesData,
    playersData: fetchingData.playersData,
    newsData: fetchingData.newsData,
    eventsData: fetchingData.eventsData,
    refereesData: fetchingData.refereesData,
    federationsData: fetchingData.federationsData,
    regionalAssociationsData: fetchingData.regionalAssociationsData
  });

  // Get computed properties
  const { publishedNews, activeEvents, upcomingGames, recentGames } = useComputedData(
    processedData.news, 
    processedData.events, 
    processedData.games
  );

  return {
    // Data arrays
    ...processedData,

    // Computed properties
    publishedNews,
    activeEvents,
    upcomingGames,
    recentGames,
    newsData: fetchingData.newsData,
    eventsData: fetchingData.eventsData,

    // Loading states
    isLoading: fetchingData.teamsLoading || fetchingData.clubsLoading || fetchingData.newsLoading || fetchingData.federationsLoading,
    ...Object.fromEntries(
      Object.entries(fetchingData).filter(([key]) => key.endsWith('Loading'))
    ),
    coachesLoading: false,

    // All errors for debugging
    ...Object.fromEntries(
      Object.entries(fetchingData).filter(([key]) => key.endsWith('Error'))
    ),

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
