
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, MapPin, Trophy } from 'lucide-react';
import { useOptimizedDataFetching } from '@/hooks/useOptimizedDataFetching';

const GameResults = () => {
  const { gamesData, isLoading } = useOptimizedDataFetching();
  const [liveGames, setLiveGames] = useState<any[]>([]);
  const [recentResults, setRecentResults] = useState<any[]>([]);

  useEffect(() => {
    if (gamesData && gamesData.length > 0) {
      // Separar jogos ao vivo e resultados recentes
      const live = gamesData.filter((game: any) => game.status === 'live' || game.status === 'in_progress');
      const completed = gamesData.filter((game: any) => game.status === 'completed').slice(0, 6);
      
      setLiveGames(live);
      setRecentResults(completed);
    }
  }, [gamesData]);

  if (isLoading) {
    return (
      <div className="fcbb-container">
        <div className="fcbb-grid fcbb-grid-2">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="fcbb-skeleton h-32"></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="fcbb-section">
      <div className="fcbb-container">
        {/* Jogos ao Vivo */}
        {liveGames.length > 0 && (
          <div className="mb-8">
            <h2 className="fcbb-title text-3xl flex items-center mb-6">
              <div className="w-3 h-3 bg-red-500 rounded-full mr-3 animate-pulse"></div>
              Jogos ao Vivo
            </h2>
            <div className="fcbb-grid fcbb-grid-2">
              {liveGames.map((game) => (
                <Card key={game.id} className="game-card border-l-4 border-red-500">
                  <CardHeader className="pb-3">
                    <div className="flex justify-between items-center">
                      <Badge className="live-indicator">
                        AO VIVO
                      </Badge>
                      <span className="text-sm text-gray-500">
                        {game.competition || 'Liga Nacional'}
                      </span>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-3 items-center gap-4">
                      <div className="text-right">
                        <p className="team-name">{game.home_team || 'Equipa Casa'}</p>
                      </div>
                      <div className="text-center">
                        <div className="flex items-center justify-center space-x-3">
                          <span className="score-display">
                            {game.home_score || 0}
                          </span>
                          <span className="text-gray-400">-</span>
                          <span className="score-display">
                            {game.away_score || 0}
                          </span>
                        </div>
                        <p className="text-sm text-gray-500 mt-1">
                          {game.period || '1º Período'} • {game.time_remaining || '10:00'}
                        </p>
                      </div>
                      <div className="text-left">
                        <p className="team-name">{game.away_team || 'Equipa Fora'}</p>
                      </div>
                    </div>
                    {game.venue && (
                      <div className="flex items-center justify-center mt-3 text-sm text-gray-500">
                        <MapPin className="w-4 h-4 mr-1" />
                        {game.venue}
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Resultados Recentes */}
        <div>
          <h2 className="fcbb-title text-3xl flex items-center mb-6">
            <Trophy className="w-8 h-8 mr-3 text-cv-accent" />
            Resultados Recentes
          </h2>
          <div className="fcbb-grid fcbb-grid-3">
            {recentResults.length > 0 ? (
              recentResults.map((result) => (
                <Card key={result.id} className="fcbb-card">
                  <CardHeader className="pb-3">
                    <div className="flex justify-between items-center">
                      <Badge variant="outline">
                        {result.competition || 'Liga Nacional'}
                      </Badge>
                      <span className="text-sm text-gray-500">
                        {new Date(result.scheduled_date || Date.now()).toLocaleDateString('pt-PT')}
                      </span>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-3 items-center gap-4">
                      <div className="text-right">
                        <p className="team-name text-sm">{result.home_team || 'Equipa Casa'}</p>
                      </div>
                      <div className="text-center">
                        <div className="flex items-center justify-center space-x-3">
                          <span className={`score-display text-lg ${
                            (result.home_score || 0) > (result.away_score || 0) 
                              ? 'text-green-600' 
                              : 'text-gray-600'
                          }`}>
                            {result.home_score || 0}
                          </span>
                          <span className="text-gray-400">-</span>
                          <span className={`score-display text-lg ${
                            (result.away_score || 0) > (result.home_score || 0) 
                              ? 'text-green-600' 
                              : 'text-gray-600'
                          }`}>
                            {result.away_score || 0}
                          </span>
                        </div>
                        <Badge className="mt-2 bg-green-100 text-green-800 text-xs">
                          Final
                        </Badge>
                      </div>
                      <div className="text-left">
                        <p className="team-name text-sm">{result.away_team || 'Equipa Fora'}</p>
                      </div>
                    </div>
                    {result.venue && (
                      <div className="flex items-center justify-center mt-3 text-xs text-gray-500">
                        <MapPin className="w-3 h-3 mr-1" />
                        {result.venue}
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))
            ) : (
              <div className="col-span-full text-center py-8">
                <Trophy className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="fcbb-text">Nenhum resultado disponível no momento</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameResults;
