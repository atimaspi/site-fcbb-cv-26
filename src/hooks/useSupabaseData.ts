
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export const useSupabaseData = () => {
  console.log('=== SUPABASE DATA HOOK INITIALIZED ===');

  // Fetch news from Supabase
  const { data: newsData, isLoading: newsLoading, error: newsError } = useQuery({
    queryKey: ['news'],
    queryFn: async () => {
      console.log('Fetching news data...');
      const { data, error } = await supabase
        .from('news')
        .select('id, title, content, created_at, image_url, category, published, featured')
        .eq('published', true)
        .order('created_at', { ascending: false })
        .limit(6);
      
      if (error) {
        console.error('Error fetching news:', error);
        throw error;
      }
      
      console.log('News data fetched:', data);
      return data || [];
    }
  });

  // Fetch clubs from Supabase
  const { data: clubsData, isLoading: clubsLoading, error: clubsError } = useQuery({
    queryKey: ['clubs'],
    queryFn: async () => {
      console.log('Fetching clubs data...');
      const { data, error } = await supabase
        .from('clubs')
        .select('id, name, logo_url, founded_year, island, description, active')
        .eq('active', true)
        .order('name', { ascending: true });
      
      if (error) {
        console.error('Error fetching clubs:', error);
        throw error;
      }
      
      console.log('Clubs data fetched:', data);
      return data || [];
    }
  });

  // Fetch games from Supabase
  const { data: gamesData, isLoading: gamesLoading, error: gamesError } = useQuery({
    queryKey: ['games'],
    queryFn: async () => {
      console.log('Fetching games data...');
      const { data, error } = await supabase
        .from('games')
        .select('id, home_team_id, away_team_id, home_score, away_score, scheduled_date, status, competition_id')
        .order('scheduled_date', { ascending: false })
        .limit(10);
      
      if (error) {
        console.error('Error fetching games:', error);
        throw error;
      }
      
      console.log('Games data fetched:', data);
      return data || [];
    }
  });

  // Fetch competitions/championships from Supabase
  const { data: competitionsData, isLoading: competitionsLoading, error: competitionsError } = useQuery({
    queryKey: ['championships'],
    queryFn: async () => {
      console.log('Fetching championships data...');
      const { data, error } = await supabase
        .from('championships')
        .select('id, name, season, start_date, end_date, status, type')
        .order('start_date', { ascending: false });
      
      if (error) {
        console.error('Error fetching championships:', error);
        throw error;
      }
      
      console.log('Championships data fetched:', data);
      return data || [];
    }
  });

  // Fetch teams from Supabase
  const { data: teamsData, isLoading: teamsLoading, error: teamsError } = useQuery({
    queryKey: ['teams'],
    queryFn: async () => {
      console.log('Fetching teams data...');
      const { data, error } = await supabase
        .from('teams')
        .select('id, name, club_id, category, division')
        .order('name', { ascending: true });
      
      if (error) {
        console.error('Error fetching teams:', error);
        throw error;
      }
      
      console.log('Teams data fetched:', data);
      return data || [];
    }
  });

  // Fetch basketball stats from Supabase
  const { data: statsData, isLoading: statsLoading, error: statsError } = useQuery({
    queryKey: ['basketball_stats'],
    queryFn: async () => {
      console.log('Fetching basketball stats data...');
      const { data, error } = await supabase
        .from('basketball_stats')
        .select('id, stat_name, stat_value, stat_key, icon_name, description, active, order_index')
        .eq('active', true)
        .order('order_index', { ascending: true });
      
      if (error) {
        console.error('Error fetching basketball stats:', error);
        throw error;
      }
      
      console.log('Basketball stats data fetched:', data);
      return data || [];
    }
  });

  console.log('=== SUPABASE DATA HOOK STATUS ===');
  console.log('News:', { data: newsData, loading: newsLoading, error: newsError });
  console.log('Clubs:', { data: clubsData, loading: clubsLoading, error: clubsError });
  console.log('Games:', { data: gamesData, loading: gamesLoading, error: gamesError });
  console.log('Competitions:', { data: competitionsData, loading: competitionsLoading, error: competitionsError });
  console.log('Teams:', { data: teamsData, loading: teamsLoading, error: teamsError });
  console.log('Stats:', { data: statsData, loading: statsLoading, error: statsError });
  console.log('==================================');

  return {
    // Data
    newsData: newsData || [],
    clubsData: clubsData || [],
    gamesData: gamesData || [],
    competitionsData: competitionsData || [],
    teamsData: teamsData || [],
    statsData: statsData || [],

    // Loading states
    newsLoading,
    clubsLoading,
    gamesLoading,
    competitionsLoading,
    teamsLoading,
    statsLoading,
    isLoading: newsLoading || clubsLoading || gamesLoading || competitionsLoading || teamsLoading || statsLoading,

    // Error states
    newsError,
    clubsError,
    gamesError,
    competitionsError,
    teamsError,
    statsError
  };
};
