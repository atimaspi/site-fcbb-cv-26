
import { useMemo } from 'react';
import type { NewsItem, Event, Game } from '@/types/backend';

export const useComputedData = (news: NewsItem[], events: Event[], games: Game[]) => {
  const publishedNews = useMemo(() => {
    return news
      .filter(item => item.published === true || item.status === 'published')
      .sort((a, b) => {
        if (!a.published_at || !b.published_at) return 0;
        return new Date(b.published_at).getTime() - new Date(a.published_at).getTime();
      })
      .slice(0, 10);
  }, [news]);

  const activeEvents = useMemo(() => {
    return events.filter(event => event.status === 'ativo' || event.status === 'active');
  }, [events]);

  const upcomingGames = useMemo(() => {
    const now = new Date();
    return games
      .filter(game => new Date(game.scheduled_date) > now)
      .sort((a, b) => new Date(a.scheduled_date).getTime() - new Date(b.scheduled_date).getTime())
      .slice(0, 10);
  }, [games]);

  const recentGames = useMemo(() => {
    return games
      .filter(game => game.status === 'finalizado')
      .sort((a, b) => new Date(b.scheduled_date).getTime() - new Date(a.scheduled_date).getTime())
      .slice(0, 10);
  }, [games]);

  return {
    publishedNews,
    activeEvents,
    upcomingGames,
    recentGames,
  };
};
