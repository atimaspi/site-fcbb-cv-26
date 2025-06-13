
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MapPin, Phone, Mail, Globe, Users, Search } from 'lucide-react';
import { useState } from 'react';

const ClubsDirectory = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const clubs = [
    {
      id: 1,
      name: "Sporting Clube de Cabo Verde",
      abbreviation: "SCV",
      island: "Santiago",
      city: "Praia",
      founded: 1923,
      phone: "+238 261 2345",
      email: "info@sportingcv.cv",
      website: "www.sportingcv.cv",
      teams: ["Sénior Masculino", "Sénior Feminino", "Sub-18"],
      achievements: "Campeão Nacional 2023"
    },
    {
      id: 2,
      name: "Clube Desportivo Travadores",
      abbreviation: "CDT",
      island: "Santiago", 
      city: "Cidade Velha",
      founded: 1975,
      phone: "+238 261 3456",
      email: "geral@travadores.cv",
      website: "",
      teams: ["Sénior Masculino", "Sub-18"],
      achievements: "Vice-Campeão Nacional 2023"
    },
    {
      id: 3,
      name: "Académica do Porto Novo",
      abbreviation: "APN",
      island: "Santo Antão",
      city: "Porto Novo",
      founded: 1960,
      phone: "+238 225 1234",
      email: "academica@portonovo.cv",
      website: "",
      teams: ["Sénior Masculino", "Sénior Feminino"],
      achievements: "Campeão Regional Norte 2023"
    },
    {
      id: 4,
      name: "Clube Sport Mindelense",
      abbreviation: "CSM",
      island: "São Vicente",
      city: "Mindelo",
      founded: 1922,
      phone: "+238 232 5678",
      email: "mindelense@mindelo.cv",
      website: "www.mindelense.cv",
      teams: ["Sénior Masculino", "Sénior Feminino", "Sub-18", "Sub-16"],
      achievements: "Campeão Regional Centro 2023"
    },
    {
      id: 5,
      name: "Barreirense Clube",
      abbreviation: "BC",
      island: "Santiago",
      city: "Santa Cruz",
      founded: 1985,
      phone: "+238 261 7890",
      email: "barreirense@santacruz.cv",
      website: "",
      teams: ["Sénior Masculino"],
      achievements: ""
    },
    {
      id: 6,
      name: "ABC Basket Clube",
      abbreviation: "ABC",
      island: "Sal",
      city: "Espargos",
      founded: 1990,
      phone: "+238 241 2345",
      email: "abc@sal.cv",
      website: "",
      teams: ["Sénior Masculino", "Sénior Feminino"],
      achievements: "Campeão Regional Sul 2022"
    }
  ];

  const filteredClubs = clubs.filter(club =>
    club.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    club.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
    club.island.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const islands = [...new Set(clubs.map(club => club.island))];

  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  type="text"
                  placeholder="Pesquisar clubes por nome, cidade ou ilha..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredClubs.map((club) => (
          <Card key={club.id} className="hover:shadow-lg transition-all duration-300">
            <CardHeader>
              <CardTitle className="text-lg">
                <div className="flex items-center justify-between">
                  <span>{club.name}</span>
                  <Badge variant="outline">{club.abbreviation}</Badge>
                </div>
              </CardTitle>
              <div className="flex items-center text-sm text-gray-600">
                <MapPin className="w-4 h-4 mr-1" />
                <span>{club.city}, {club.island}</span>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="text-sm">
                  <strong>Fundado:</strong> {club.founded}
                </div>
                
                {club.achievements && (
                  <div className="text-sm">
                    <strong>Conquistas:</strong> {club.achievements}
                  </div>
                )}

                <div className="space-y-1">
                  <div className="text-sm font-medium">Equipas:</div>
                  <div className="flex flex-wrap gap-1">
                    {club.teams.map((team, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {team}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>

              <div className="space-y-2 pt-4 border-t">
                <div className="flex items-center text-sm text-gray-600">
                  <Phone className="w-4 h-4 mr-2 flex-shrink-0" />
                  <span>{club.phone}</span>
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <Mail className="w-4 h-4 mr-2 flex-shrink-0" />
                  <span className="break-all">{club.email}</span>
                </div>
                {club.website && (
                  <div className="flex items-center text-sm text-gray-600">
                    <Globe className="w-4 h-4 mr-2 flex-shrink-0" />
                    <a 
                      href={`https://${club.website}`} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-cv-blue hover:underline break-all"
                    >
                      {club.website}
                    </a>
                  </div>
                )}
              </div>

              <Button variant="outline" className="w-full mt-4">
                Ver Detalhes
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredClubs.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <Users className="mx-auto h-16 w-16 text-gray-400 mb-4" />
            <h3 className="text-lg font-semibold text-gray-600 mb-2">
              Nenhum clube encontrado
            </h3>
            <p className="text-gray-500">
              Tente ajustar os termos de pesquisa.
            </p>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Distribuição por Ilha</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {islands.map((island) => {
              const clubCount = clubs.filter(club => club.island === island).length;
              return (
                <div key={island} className="text-center p-4 bg-gray-50 rounded-lg">
                  <div className="text-2xl font-bold text-cv-blue">{clubCount}</div>
                  <div className="text-sm text-gray-600">{island}</div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ClubsDirectory;
