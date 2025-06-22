
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
        .select('*')
        .eq('published', true)
        .order('created_at', { ascending: false });
      
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
        .select('*')
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
        .select('*')
        .order('scheduled_date', { ascending: false });
      
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
        .select('*')
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
        .select('*')
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
        .select('*')
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

  // Fetch players from Supabase
  const { data: playersData, isLoading: playersLoading, error: playersError } = useQuery({
    queryKey: ['players'],
    queryFn: async () => {
      console.log('Fetching players data...');
      const { data, error } = await supabase
        .from('players')
        .select('*')
        .eq('active', true)
        .order('last_name', { ascending: true });
      
      if (error) {
        console.error('Error fetching players:', error);
        throw error;
      }
      
      console.log('Players data fetched:', data);
      return data || [];
    }
  });

  // Fetch referees from Supabase
  const { data: refereesData, isLoading: refereesLoading, error: refereesError } = useQuery({
    queryKey: ['referees'],
    queryFn: async () => {
      console.log('Fetching referees data...');
      const { data, error } = await supabase
        .from('referees')
        .select('*')
        .eq('active', true)
        .order('last_name', { ascending: true });
      
      if (error) {
        console.error('Error fetching referees:', error);
        throw error;
      }
      
      console.log('Referees data fetched:', data);
      return data || [];
    }
  });

  // Fetch events from Supabase
  const { data: eventsData, isLoading: eventsLoading, error: eventsError } = useQuery({
    queryKey: ['events'],
    queryFn: async () => {
      console.log('Fetching events data...');
      const { data, error } = await supabase
        .from('events')
        .select('*')
        .order('event_date', { ascending: false });
      
      if (error) {
        console.error('Error fetching events:', error);
        throw error;
      }
      
      console.log('Events data fetched:', data);
      return data || [];
    }
  });

  // Fetch federations from Supabase
  const { data: federationsData, isLoading: federationsLoading, error: federationsError } = useQuery({
    queryKey: ['federations'],
    queryFn: async () => {
      console.log('Fetching federations data...');
      const { data, error } = await supabase
        .from('federations')
        .select('*')
        .order('name', { ascending: true });
      
      if (error) {
        console.error('Error fetching federations:', error);
        throw error;
      }
      
      console.log('Federations data fetched:', data);
      return data || [];
    }
  });

  // Fetch regional associations from Supabase
  const { data: regionalAssociationsData, isLoading: regionalAssociationsLoading, error: regionalAssociationsError } = useQuery({
    queryKey: ['regional_associations'],
    queryFn: async () => {
      console.log('Fetching regional associations data...');
      const { data, error } = await supabase
        .from('regional_associations')
        .select('*')
        .order('name', { ascending: true });
      
      if (error) {
        console.error('Error fetching regional associations:', error);
        throw error;
      }
      
      console.log('Regional associations data fetched:', data);
      return data || [];
    }
  });

  // Fetch partners from Supabase
  const { data: partnersData, isLoading: partnersLoading, error: partnersError } = useQuery({
    queryKey: ['partners'],
    queryFn: async () => {
      console.log('Fetching partners data...');
      const { data, error } = await supabase
        .from('partners')
        .select('*')
        .eq('active', true)
        .order('order_index', { ascending: true });
      
      if (error) {
        console.error('Error fetching partners:', error);
        throw error;
      }
      
      console.log('Partners data fetched:', data);
      return data || [];
    }
  });

  // Fetch hero slides from Supabase
  const { data: heroSlidesData, isLoading: heroSlidesLoading, error: heroSlidesError } = useQuery({
    queryKey: ['hero_slides'],
    queryFn: async () => {
      console.log('Fetching hero slides data...');
      const { data, error } = await supabase
        .from('hero_slides')
        .select('*')
        .eq('active', true)
        .order('order_index', { ascending: true });
      
      if (error) {
        console.error('Error fetching hero slides:', error);
        throw error;
      }
      
      console.log('Hero slides data fetched:', data);
      return data || [];
    }
  });

  // Fetch gallery from Supabase
  const { data: galleryData, isLoading: galleryLoading, error: galleryError } = useQuery({
    queryKey: ['gallery'],
    queryFn: async () => {
      console.log('Fetching gallery data...');
      const { data, error } = await supabase
        .from('gallery')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) {
        console.error('Error fetching gallery:', error);
        throw error;
      }
      
      console.log('Gallery data fetched:', data);
      return data || [];
    }
  });

  // Fetch gallery images from Supabase
  const { data: galleryImagesData, isLoading: galleryImagesLoading, error: galleryImagesError } = useQuery({
    queryKey: ['gallery_images'],
    queryFn: async () => {
      console.log('Fetching gallery images data...');
      const { data, error } = await supabase
        .from('gallery_images')
        .select('*')
        .order('order_index', { ascending: true });
      
      if (error) {
        console.error('Error fetching gallery images:', error);
        throw error;
      }
      
      console.log('Gallery images data fetched:', data);
      return data || [];
    }
  });

  // Fetch site settings from Supabase
  const { data: siteSettingsData, isLoading: siteSettingsLoading, error: siteSettingsError } = useQuery({
    queryKey: ['site_settings'],
    queryFn: async () => {
      console.log('Fetching site settings data...');
      const { data, error } = await supabase
        .from('site_settings')
        .select('*');
      
      if (error) {
        console.error('Error fetching site settings:', error);
        throw error;
      }
      
      console.log('Site settings data fetched:', data);
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
  console.log('Players:', { data: playersData, loading: playersLoading, error: playersError });
  console.log('Referees:', { data: refereesData, loading: refereesLoading, error: refereesError });
  console.log('Events:', { data: eventsData, loading: eventsLoading, error: eventsError });
  console.log('Federations:', { data: federationsData, loading: federationsLoading, error: federationsError });
  console.log('Regional Associations:', { data: regionalAssociationsData, loading: regionalAssociationsLoading, error: regionalAssociationsError });
  console.log('Partners:', { data: partnersData, loading: partnersLoading, error: partnersError });
  console.log('Hero Slides:', { data: heroSlidesData, loading: heroSlidesLoading, error: heroSlidesError });
  console.log('Gallery:', { data: galleryData, loading: galleryLoading, error: galleryError });
  console.log('Gallery Images:', { data: galleryImagesData, loading: galleryImagesLoading, error: galleryImagesError });
  console.log('Site Settings:', { data: siteSettingsData, loading: siteSettingsLoading, error: siteSettingsError });
  console.log('==================================');

  return {
    // Data
    newsData: newsData || [],
    clubsData: clubsData || [],
    gamesData: gamesData || [],
    competitionsData: competitionsData || [],
    teamsData: teamsData || [],
    statsData: statsData || [],
    playersData: playersData || [],
    refereesData: refereesData || [],
    eventsData: eventsData || [],
    federationsData: federationsData || [],
    regionalAssociationsData: regionalAssociationsData || [],
    partnersData: partnersData || [],
    heroSlidesData: heroSlidesData || [],
    galleryData: galleryData || [],
    galleryImagesData: galleryImagesData || [],
    siteSettingsData: siteSettingsData || [],

    // Loading states
    newsLoading,
    clubsLoading,
    gamesLoading,
    competitionsLoading,
    teamsLoading,
    statsLoading,
    playersLoading,
    refereesLoading,
    eventsLoading,
    federationsLoading,
    regionalAssociationsLoading,
    partnersLoading,
    heroSlidesLoading,
    galleryLoading,
    galleryImagesLoading,
    siteSettingsLoading,
    isLoading: newsLoading || clubsLoading || gamesLoading || competitionsLoading || teamsLoading || statsLoading || 
               playersLoading || refereesLoading || eventsLoading || federationsLoading || regionalAssociationsLoading ||
               partnersLoading || heroSlidesLoading || galleryLoading || galleryImagesLoading || siteSettingsLoading,

    // Error states
    newsError,
    clubsError,
    gamesError,
    competitionsError,
    teamsError,
    statsError,
    playersError,
    refereesError,
    eventsError,
    federationsError,
    regionalAssociationsError,
    partnersError,
    heroSlidesError,
    galleryError,
    galleryImagesError,
    siteSettingsError
  };
};
