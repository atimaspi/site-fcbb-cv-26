
import { useOptimizedDataFetching } from './useOptimizedDataFetching';
import { useUnifiedApi } from './useUnifiedApi';

export const useSupabaseData = () => {
  const { useOptimizedFetch } = useUnifiedApi();
  
  // Fetch news from Supabase
  const { data: newsData, isLoading: newsLoading, error: newsError } = useOptimizedFetch('news', {
    select: 'id, title, content, created_at, image_url, category, published, featured',
    orderBy: { column: 'created_at', ascending: false },
    limit: 6,
    filters: { published: true }
  });

  // Fetch clubs from Supabase
  const { data: clubsData, isLoading: clubsLoading, error: clubsError } = useOptimizedFetch('clubs', {
    select: 'id, name, logo_url, founded_year, city, description',
    orderBy: { column: 'name', ascending: true }
  });

  // Fetch games from Supabase
  const { data: gamesData, isLoading: gamesLoading, error: gamesError } = useOptimizedFetch('games', {
    select: 'id, home_team, away_team, home_score, away_score, game_date, status, championship_id',
    orderBy: { column: 'game_date', ascending: false },
    limit: 10
  });

  // Fetch championships/competitions from Supabase
  const { data: competitionsData, isLoading: competitionsLoading, error: competitionsError } = useOptimizedFetch('championships', {
    select: 'id, name, season, start_date, end_date, status, logo_url',
    orderBy: { column: 'start_date', ascending: false }
  });

  // Fetch teams from Supabase
  const { data: teamsData, isLoading: teamsLoading, error: teamsError } = useOptimizedFetch('teams', {
    select: 'id, name, club_id, category, logo_url',
    orderBy: { column: 'name', ascending: true }
  });

  // Fetch players from Supabase
  const { data: playersData, isLoading: playersLoading, error: playersError } = useOptimizedFetch('players', {
    select: 'id, name, team_id, position, jersey_number, height, weight, birth_date',
    orderBy: { column: 'name', ascending: true }
  });

  return {
    // Data
    newsData: newsData || [],
    clubsData: clubsData || [],
    gamesData: gamesData || [],
    competitionsData: competitionsData || [],
    teamsData: teamsData || [],
    playersData: playersData || [],

    // Loading states
    newsLoading,
    clubsLoading,
    gamesLoading,
    competitionsLoading,
    teamsLoading,
    playersLoading,
    isLoading: newsLoading || clubsLoading || gamesLoading || competitionsLoading,

    // Error states
    newsError,
    clubsError,
    gamesError,
    competitionsError,
    teamsError,
    playersError
  };
};
