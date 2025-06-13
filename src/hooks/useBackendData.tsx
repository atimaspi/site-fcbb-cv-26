
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

  // Data fetching
  const { data: teamsData, isLoading: teamsLoading } = useFetch('teams');
  const { data: competitionsData, isLoading: competitionsLoading } = useFetch('competitions');
  const { data: gamesData, isLoading: gamesLoading } = useFetch('games');
  const { data: playersData, isLoading: playersLoading } = useFetch('players');
  const { data: newsData, isLoading: newsLoading } = useFetch('news');
  const { data: eventsData, isLoading: eventsLoading } = useFetch('events');
  const { data: nationalTeamsData, isLoading: nationalTeamsLoading } = useFetch('national_teams');
  const { data: mediaGalleryData, isLoading: mediaLoading } = useFetch('media_gallery');
  const { data: refereesData, isLoading: refereesLoading } = useFetch('referees');
  const { data: coachesData, isLoading: coachesLoading } = useFetch('coaches');

  // CRUD operations
  const createTeam = useCreate('teams');
  const updateTeam = useUpdate('teams');
  const deleteTeam = useDelete('teams');

  const createCompetition = useCreate('competitions');
  const updateCompetition = useUpdate('competitions');
  const deleteCompetition = useDelete('competitions');

  const createGame = useCreate('games');
  const updateGame = useUpdate('games');
  const deleteGame = useDelete('games');

  const createPlayer = useCreate('players');
  const updatePlayer = useUpdate('players');
  const deletePlayer = useDelete('players');

  const createNews = useCreate('news');
  const updateNews = useUpdate('news');
  const deleteNews = useDelete('news');

  const createEvent = useCreate('events');
  const updateEvent = useUpdate('events');
  const deleteEvent = useDelete('events');

  const createNationalTeam = useCreate('national_teams');
  const updateNationalTeam = useUpdate('national_teams');

  const createMedia = useCreate('media_gallery');
  const updateMedia = useUpdate('media_gallery');
  const deleteMedia = useDelete('media_gallery');

  const createReferee = useCreate('referees');
  const updateReferee = useUpdate('referees');

  const createCoach = useCreate('coaches');
  const updateCoach = useUpdate('coaches');

  // Safe data arrays
  const teams = Array.isArray(teamsData) ? teamsData : [];
  const competitions = Array.isArray(competitionsData) ? competitionsData : [];
  const games = Array.isArray(gamesData) ? gamesData : [];
  const players = Array.isArray(playersData) ? playersData : [];
  const news = Array.isArray(newsData) ? newsData : [];
  const events = Array.isArray(eventsData) ? eventsData : [];
  const nationalTeams = Array.isArray(nationalTeamsData) ? nationalTeamsData : [];
  const mediaGallery = Array.isArray(mediaGalleryData) ? mediaGalleryData : [];
  const referees = Array.isArray(refereesData) ? refereesData : [];
  const coaches = Array.isArray(coachesData) ? coachesData : [];

  // Computed data
  const recentGames = useMemo(() => {
    return games
      .filter((game: Game) => game.status === 'finalizado')
      .sort((a: Game, b: Game) => new Date(b.game_date).getTime() - new Date(a.game_date).getTime())
      .slice(0, 10);
  }, [games]);

  const upcomingGames = useMemo(() => {
    return games
      .filter((game: Game) => game.status === 'agendado')
      .sort((a: Game, b: Game) => new Date(a.game_date).getTime() - new Date(b.game_date).getTime())
      .slice(0, 10);
  }, [games]);

  const publishedNews = useMemo(() => {
    return news
      .filter((newsItem: NewsItem) => newsItem.status === 'publicado')
      .sort((a: NewsItem, b: NewsItem) => new Date(b.published_at).getTime() - new Date(a.published_at).getTime());
  }, [news]);

  const activeEvents = useMemo(() => {
    return events
      .filter((event: Event) => event.status === 'ativo')
      .sort((a: Event, b: Event) => new Date(a.event_date).getTime() - new Date(b.event_date).getTime());
  }, [events]);

  return {
    // Data arrays
    teams,
    competitions,
    games,
    players,
    newsData: news,
    eventsData: events,
    nationalTeams,
    mediaGallery,
    referees,
    coaches,

    // Computed data
    recentGames,
    upcomingGames,
    publishedNews,
    activeEvents,

    // Loading states
    isLoading: teamsLoading || competitionsLoading || gamesLoading || playersLoading || 
               newsLoading || eventsLoading || nationalTeamsLoading || mediaLoading || 
               refereesLoading || coachesLoading,

    // CRUD operations grouped
    operations: {
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
    }
  };
};
