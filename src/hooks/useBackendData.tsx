
import { useApi } from '@/hooks/useApi';
import { useMemo } from 'react';

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

export const useBackendData = () => {
  const { useFetch, useCreate, useUpdate, useDelete } = useApi();

  // Teams
  const { data: teams, isLoading: teamsLoading } = useFetch('teams');
  const createTeam = useCreate('teams');
  const updateTeam = useUpdate('teams');
  const deleteTeam = useDelete('teams');

  // Competitions
  const { data: competitions, isLoading: competitionsLoading } = useFetch('competitions');
  const createCompetition = useCreate('competitions');
  const updateCompetition = useUpdate('competitions');
  const deleteCompetition = useDelete('competitions');

  // Games
  const { data: games, isLoading: gamesLoading } = useFetch('games');
  const createGame = useCreate('games');
  const updateGame = useUpdate('games');
  const deleteGame = useDelete('games');

  // Players
  const { data: players, isLoading: playersLoading } = useFetch('players');
  const createPlayer = useCreate('players');
  const updatePlayer = useUpdate('players');
  const deletePlayer = useDelete('players');

  // News
  const { data: newsData, isLoading: newsLoading } = useFetch('news');
  const createNews = useCreate('news');
  const updateNews = useUpdate('news');
  const deleteNews = useDelete('news');

  // Events
  const { data: eventsData, isLoading: eventsLoading } = useFetch('events');
  const createEvent = useCreate('events');
  const updateEvent = useUpdate('events');
  const deleteEvent = useDelete('events');

  // National Teams
  const { data: nationalTeams, isLoading: nationalTeamsLoading } = useFetch('national_teams');
  const createNationalTeam = useCreate('national_teams');
  const updateNationalTeam = useUpdate('national_teams');

  // Media Gallery
  const { data: mediaGallery, isLoading: mediaLoading } = useFetch('media_gallery');
  const createMedia = useCreate('media_gallery');
  const updateMedia = useUpdate('media_gallery');
  const deleteMedia = useDelete('media_gallery');

  // Referees
  const { data: referees, isLoading: refereesLoading } = useFetch('referees');
  const createReferee = useCreate('referees');
  const updateReferee = useUpdate('referees');

  // Coaches
  const { data: coaches, isLoading: coachesLoading } = useFetch('coaches');
  const createCoach = useCreate('coaches');
  const updateCoach = useUpdate('coaches');

  // Computed data
  const recentGames = useMemo(() => {
    if (!games) return [];
    return games
      .filter((game: Game) => game.status === 'finalizado')
      .sort((a: Game, b: Game) => new Date(b.game_date).getTime() - new Date(a.game_date).getTime())
      .slice(0, 10);
  }, [games]);

  const upcomingGames = useMemo(() => {
    if (!games) return [];
    return games
      .filter((game: Game) => game.status === 'agendado')
      .sort((a: Game, b: Game) => new Date(a.game_date).getTime() - new Date(b.game_date).getTime())
      .slice(0, 10);
  }, [games]);

  const publishedNews = useMemo(() => {
    if (!newsData) return [];
    return newsData
      .filter((news: NewsItem) => news.status === 'publicado')
      .sort((a: NewsItem, b: NewsItem) => new Date(b.published_at).getTime() - new Date(a.published_at).getTime());
  }, [newsData]);

  const activeEvents = useMemo(() => {
    if (!eventsData) return [];
    return eventsData
      .filter((event: Event) => event.status === 'ativo')
      .sort((a: Event, b: Event) => new Date(a.event_date).getTime() - new Date(b.event_date).getTime());
  }, [eventsData]);

  return {
    // Data
    teams: teams || [],
    competitions: competitions || [],
    games: games || [],
    players: players || [],
    newsData: newsData || [],
    eventsData: eventsData || [],
    nationalTeams: nationalTeams || [],
    mediaGallery: mediaGallery || [],
    referees: referees || [],
    coaches: coaches || [],

    // Computed data
    recentGames,
    upcomingGames,
    publishedNews,
    activeEvents,

    // Loading states
    isLoading: teamsLoading || competitionsLoading || gamesLoading || playersLoading || 
               newsLoading || eventsLoading || nationalTeamsLoading || mediaLoading || 
               refereesLoading || coachesLoading,

    // CRUD operations
    teams: {
      create: createTeam,
      update: updateTeam,
      delete: deleteTeam
    },
    competitions: {
      create: createCompetition,
      update: updateCompetition,
      delete: deleteCompetition
    },
    games: {
      create: createGame,
      update: updateGame,
      delete: deleteGame
    },
    players: {
      create: createPlayer,
      update: updatePlayer,
      delete: deletePlayer
    },
    news: {
      create: createNews,
      update: updateNews,
      delete: deleteNews
    },
    events: {
      create: createEvent,
      update: updateEvent,
      delete: deleteEvent
    },
    nationalTeams: {
      create: createNationalTeam,
      update: updateNationalTeam
    },
    media: {
      create: createMedia,
      update: updateMedia,
      delete: deleteMedia
    },
    referees: {
      create: createReferee,
      update: updateReferee
    },
    coaches: {
      create: createCoach,
      update: updateCoach
    }
  };
};
