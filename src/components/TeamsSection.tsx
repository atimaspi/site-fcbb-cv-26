
import { Users } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Team {
  id: number;
  name: string;
  image: string;
  achievements: string;
}

const TeamsSection = () => {
  const teams: Team[] = [
    {
      id: 1,
      name: "Seleção Masculina",
      image: "https://images.unsplash.com/photo-1519861531473-9200262188bf?q=80&w=2071&auto=format",
      achievements: "5º Lugar AfroBasket 2023"
    },
    {
      id: 2,
      name: "Seleção Feminina",
      image: "https://images.unsplash.com/photo-1567910735398-e06304d348f2?q=80&w=1974&auto=format",
      achievements: "Participação AfroBasket 2024"
    },
    {
      id: 3,
      name: "Seleção Sub-18 Masculina",
      image: "https://images.unsplash.com/photo-1626163015922-5694aff2dae7?q=80&w=2070&auto=format",
      achievements: "Campeões Zonais 2024"
    }
  ];

  return (
    <section className="py-12">
      <div className="cv-container">
        <h2 className="section-title flex items-center">
          <Users className="mr-2 text-cv-blue" /> Seleções Nacionais
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {teams.map((team) => (
            <div 
              key={team.id}
              className="rounded-lg overflow-hidden shadow-md group"
            >
              <div className="relative h-64">
                <img 
                  src={team.image} 
                  alt={team.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent">
                  <div className="absolute bottom-0 left-0 p-4 text-white">
                    <h3 className="text-xl font-bold mb-1">{team.name}</h3>
                    <p className="text-sm text-gray-200">{team.achievements}</p>
                  </div>
                </div>
              </div>
              <div className="bg-white p-4">
                <Button className="w-full bg-cv-blue hover:bg-blue-700">
                  Ver Detalhes
                </Button>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-10 text-center">
          <p className="text-xl mb-4">
            Apoie as nossas seleções nacionais na sua jornada internacional.
          </p>
          <Button size="lg" className="bg-cv-red hover:bg-red-700">
            Calendário das Seleções
          </Button>
        </div>
      </div>
    </section>
  );
};

export default TeamsSection;
