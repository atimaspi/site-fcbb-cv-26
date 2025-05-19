
import { Trophy, Calendar } from "lucide-react";

interface Competition {
  id: number;
  name: string;
  period: string;
  logo: string;
}

interface UpcomingMatch {
  id: number;
  homeTeam: string;
  awayTeam: string;
  date: string;
  time: string;
  venue: string;
  competition: string;
}

const CompetitionsSection = () => {
  const competitions: Competition[] = [
    {
      id: 1,
      name: "Liga Nacional de Basquetebol",
      period: "Janeiro - Maio 2025",
      logo: "https://images.unsplash.com/photo-1577471488278-16eec37ffcc2?q=80&w=1974&auto=format"
    },
    {
      id: 2,
      name: "Taça de Cabo Verde",
      period: "Março - Abril 2025",
      logo: "https://images.unsplash.com/photo-1577471488278-16eec37ffcc2?q=80&w=1974&auto=format"
    },
    {
      id: 3,
      name: "SuperTaça",
      period: "Dezembro 2024",
      logo: "https://images.unsplash.com/photo-1577471488278-16eec37ffcc2?q=80&w=1974&auto=format"
    }
  ];

  const upcomingMatches: UpcomingMatch[] = [
    {
      id: 1,
      homeTeam: "ABC",
      awayTeam: "Académica",
      date: "25 Mar",
      time: "20:00",
      venue: "Pavilhão Vavá Duarte, Praia",
      competition: "Liga Nacional"
    },
    {
      id: 2,
      homeTeam: "Seven Stars",
      awayTeam: "ADESBA",
      date: "26 Mar",
      time: "19:30",
      venue: "Pavilhão Dr. Mário Lima, São Vicente",
      competition: "Liga Nacional"
    },
    {
      id: 3,
      homeTeam: "Vulcânicos",
      awayTeam: "Bairro",
      date: "27 Mar",
      time: "20:00",
      venue: "Polidesportivo de Sal",
      competition: "Liga Nacional"
    }
  ];

  return (
    <section className="py-12 bg-gray-50">
      <div className="cv-container">
        <h2 className="section-title flex items-center">
          <Trophy className="mr-2 text-cv-blue" /> Competições
        </h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {competitions.map((comp) => (
                <div 
                  key={comp.id} 
                  className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow"
                >
                  <div className="h-40 bg-gray-200 flex items-center justify-center p-4">
                    <img 
                      src={comp.logo} 
                      alt={comp.name}
                      className="max-h-full max-w-full object-contain"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-bold text-lg">{comp.name}</h3>
                    <p className="text-gray-600 text-sm">{comp.period}</p>
                    <a 
                      href="#" 
                      className="mt-2 inline-block text-cv-blue hover:underline text-sm"
                    >
                      Ver detalhes
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="font-bold text-xl mb-4 flex items-center">
              <Calendar className="mr-2 text-cv-red" /> Próximos Jogos
            </h3>
            <div className="space-y-4">
              {upcomingMatches.map((match) => (
                <div key={match.id} className="border-b pb-3 last:border-b-0">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-xs bg-cv-blue text-white px-2 py-1 rounded">
                      {match.competition}
                    </span>
                    <span className="text-gray-600 text-sm">{match.date}, {match.time}</span>
                  </div>
                  <div className="flex justify-between items-center my-2">
                    <span className="font-bold">{match.homeTeam}</span>
                    <span className="text-xs px-2">VS</span>
                    <span className="font-bold">{match.awayTeam}</span>
                  </div>
                  <div className="text-gray-600 text-xs">
                    {match.venue}
                  </div>
                </div>
              ))}
              
              <a 
                href="#" 
                className="block text-center mt-3 text-cv-blue hover:underline"
              >
                Ver calendário completo
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CompetitionsSection;
