
import { TrophyIcon, UsersIcon, CalendarIcon, TargetIcon, TrendingIcon, StarIcon } from './StatsIcons';

export const createStatsData = (
  statisticsData: any[],
  stats: {
    totalClubs: number;
    totalGames: number;
    totalTeams: number;
    completedGames: number;
    liveGames: number;
  }
) => {
  // Usar estatísticas do backend se disponíveis, senão usar as padrão
  return statisticsData?.length > 0 ? statisticsData.map(stat => {
    const iconMap: { [key: string]: any } = {
      'trophy': TrophyIcon,
      'users': UsersIcon,
      'calendar': CalendarIcon,
      'target': TargetIcon,
      'trending-up': TrendingIcon,
      'star': StarIcon,
      'map-pin': StarIcon
    };

    return {
      title: stat.stat_name,
      value: stat.stat_value,
      numericValue: parseInt(stat.stat_value.replace(/[^0-9]/g, '')) || 0,
      icon: iconMap[stat.icon_name] || TrophyIcon,
      color: "text-blue-600",
      bgColor: "bg-blue-100",
      gradientFrom: "from-blue-500",
      gradientTo: "to-blue-600",
      change: stat.description || ""
    };
  }) : [
    {
      title: "Clubes Licenciados",
      value: stats.totalClubs.toString(),
      numericValue: stats.totalClubs,
      icon: TrophyIcon,
      color: "text-blue-600",
      bgColor: "bg-blue-100",
      gradientFrom: "from-blue-500",
      gradientTo: "to-blue-600",
      change: "+3 este ano"
    },
    {
      title: "Atletas Federados",
      value: "1,250+",
      numericValue: 1250,
      icon: UsersIcon,
      color: "text-green-600", 
      bgColor: "bg-green-100",
      gradientFrom: "from-green-500",
      gradientTo: "to-green-600",
      change: "+12% vs ano anterior"
    },
    {
      title: "Jogos por Época",
      value: stats.totalGames.toString() + "+",
      numericValue: stats.totalGames,
      icon: CalendarIcon,
      color: "text-purple-600",
      bgColor: "bg-purple-100",
      gradientFrom: "from-purple-500",
      gradientTo: "to-purple-600",
      change: `${stats.completedGames} concluídos`
    },
    {
      title: "Equipas Ativas",
      value: stats.totalTeams.toString(),
      numericValue: stats.totalTeams,
      icon: TargetIcon,
      color: "text-orange-600",
      bgColor: "bg-orange-100",
      gradientFrom: "from-orange-500",
      gradientTo: "to-orange-600",
      change: "Masculinas e Femininas"
    },
    {
      title: "Jogos ao Vivo",
      value: stats.liveGames.toString(),
      numericValue: stats.liveGames,
      icon: TrendingIcon,
      color: "text-red-600",
      bgColor: "bg-red-100",
      gradientFrom: "from-red-500",
      gradientTo: "to-red-600",
      change: stats.liveGames > 0 ? "Agora mesmo" : "Próximos em breve"
    },
    {
      title: "Ilhas Participantes",
      value: "9",
      numericValue: 9,
      icon: StarIcon,
      color: "text-yellow-600",
      bgColor: "bg-yellow-100",
      gradientFrom: "from-yellow-500",
      gradientTo: "to-yellow-600",
      change: "Todo o arquipélago"
    }
  ];
};
