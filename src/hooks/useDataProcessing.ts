
import { useMemo } from 'react';
import { safeArrayCast } from '@/utils/dataUtils';
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

interface UseDataProcessingProps {
  teamsData: any;
  clubsData: any;
  competitionsData: any;
  gamesData: any;
  playersData: any;
  newsData: any;
  eventsData: any;
  refereesData: any;
  federationsData: any;
  regionalAssociationsData: any;
}

export const useDataProcessing = ({
  teamsData,
  clubsData,
  competitionsData,
  gamesData,
  playersData,
  newsData,
  eventsData,
  refereesData,
  federationsData,
  regionalAssociationsData
}: UseDataProcessingProps) => {
  
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
    regionalAssociations
  };
};
