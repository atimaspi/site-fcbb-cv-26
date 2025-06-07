
import { Trophy, Clock, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';

const LiveResultsWidget = () => {
  const liveGames = [
    {
      id: 1,
      competition: "Liga Nacional Masculina",
      homeTeam: "ABC",
      awayTeam: "Seven Stars",
      homeScore: 78,
      awayScore: 65,
      status: "Final",
      time: "19:30"
    },
    {
      id: 2,
      competition: "Liga Nacional Masculina", 
      homeTeam: "Académica",
      awayTeam: "Inter",
      homeScore: 45,
      awayScore: 42,
      status: "2º Quarto",
      time: "15:32"
    }
  ];

  const recentResults = [
    { home: "Spartak", away: "Unidos", homeScore: 85, awayScore: 79, date: "Ontem" },
    { home: "Travadores", away: "Queluz", homeScore: 92, awayScore: 88, date: "Ontem" },
    { home: "Bairro", away: "Tchadense", homeScore: 76, awayScore: 82, date: "Sexta" }
  ];

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="bg-cv-blue text-white px-4 py-3">
        <h3 className="font-bold flex items-center">
          <Trophy className="mr-2 h-5 w-5" />
          Resultados ao Vivo
        </h3>
      </div>
      
      <div className="p-4">
        {/* Live Games */}
        <div className="space-y-3 mb-6">
          {liveGames.map((game) => (
            <div key={game.id} className="border border-gray-200 rounded-lg p-3">
              <div className="text-xs text-gray-500 mb-2">{game.competition}</div>
              <div className="flex justify-between items-center">
                <div className="flex-1">
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-medium text-sm">{game.homeTeam}</span>
                    <span className="font-bold text-lg">{game.homeScore}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-medium text-sm">{game.awayTeam}</span>
                    <span className="font-bold text-lg">{game.awayScore}</span>
                  </div>
                </div>
              </div>
              <div className="flex justify-between items-center mt-2 text-xs">
                <span className={`px-2 py-1 rounded ${
                  game.status === 'Final' ? 'bg-gray-200 text-gray-700' : 'bg-red-100 text-red-700'
                }`}>
                  {game.status}
                </span>
                <span className="text-gray-500 flex items-center">
                  <Clock className="mr-1 h-3 w-3" />
                  {game.time}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Recent Results */}
        <div>
          <h4 className="font-semibold text-sm mb-3 text-cv-blue">Resultados Recentes</h4>
          <div className="space-y-2">
            {recentResults.map((result, index) => (
              <div key={index} className="flex justify-between items-center text-sm border-b border-gray-100 pb-2">
                <div className="flex-1">
                  <div className="flex justify-between">
                    <span>{result.home}</span>
                    <span className="font-medium">{result.homeScore}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>{result.away}</span>
                    <span className="font-medium">{result.awayScore}</span>
                  </div>
                </div>
                <span className="text-xs text-gray-500 ml-3">{result.date}</span>
              </div>
            ))}
          </div>
        </div>

        <Link 
          to="/resultados/ao-vivo" 
          className="block mt-4 text-center bg-cv-blue text-white py-2 rounded hover:bg-blue-700 transition-colors text-sm font-medium"
        >
          Ver Todos os Resultados
        </Link>
      </div>
    </div>
  );
};

export default LiveResultsWidget;
