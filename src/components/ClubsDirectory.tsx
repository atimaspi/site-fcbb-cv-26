
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MapPin, Phone, Mail, Globe, Users, Search, Loader2 } from 'lucide-react';
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

const ClubsDirectory = () => {
  const [searchTerm, setSearchTerm] = useState('');

  // Fetch clubs directly from Supabase with more detailed logging
  const { data: clubs, isLoading: clubsLoading, error: clubsError } = useQuery({
    queryKey: ['clubs'],
    queryFn: async () => {
      console.log('=== INICIANDO BUSCA DE CLUBES ===');
      console.log('Supabase client:', supabase);
      
      try {
        const { data, error, count } = await supabase
          .from('clubs')
          .select('*', { count: 'exact' })
          .order('name');
        
        console.log('Resposta do Supabase:', { data, error, count });
        
        if (error) {
          console.error('ERRO ao buscar clubes:', error);
          console.error('Detalhes do erro:', error.message, error.details, error.hint);
          throw error;
        }
        
        console.log('Clubes encontrados:', data?.length || 0);
        console.log('Dados dos clubes:', data);
        
        return data || [];
      } catch (err) {
        console.error('ERRO na consulta:', err);
        throw err;
      }
    },
    retry: 1,
    staleTime: 30000,
  });

  console.log('Estado atual:', { clubs, clubsLoading, clubsError });

  if (clubsLoading) {
    return (
      <Card>
        <CardContent className="p-12 text-center">
          <Loader2 className="mx-auto h-8 w-8 animate-spin text-cv-blue mb-4" />
          <p className="text-gray-600">Carregando clubes...</p>
        </CardContent>
      </Card>
    );
  }

  if (clubsError) {
    console.error('Erro no componente:', clubsError);
    return (
      <Card>
        <CardContent className="p-12 text-center">
          <Users className="mx-auto h-16 w-16 text-gray-400 mb-4" />
          <h3 className="text-lg font-semibold text-gray-600 mb-2">
            Erro ao carregar clubes
          </h3>
          <p className="text-gray-500">
            Não foi possível carregar os dados dos clubes.
          </p>
          <p className="text-sm text-red-500 mt-2">
            {clubsError.message}
          </p>
          <Button 
            variant="outline" 
            className="mt-4"
            onClick={() => window.location.reload()}
          >
            Tentar Novamente
          </Button>
        </CardContent>
      </Card>
    );
  }

  // Debug do filtro
  console.log('Dados dos clubes antes do filtro:', clubs);
  
  const filteredClubs = clubs?.filter(club => {
    const matchesName = club.name?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesAddress = club.address?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesIsland = club.island?.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesName || matchesAddress || matchesIsland;
  }) || [];

  console.log('Clubes filtrados:', filteredClubs);
  console.log('Total de clubes:', clubs?.length || 0);
  console.log('Clubes após filtro:', filteredClubs.length);

  const islands = [...new Set(clubs?.map(club => club.island).filter(Boolean) || [])];

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
                  placeholder="Pesquisar clubes por nome, morada ou ilha..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
          </div>
          
          {/* Debug info - remover depois */}
          <div className="mt-4 p-4 bg-blue-50 rounded-lg text-sm">
            <p><strong>Debug Info:</strong></p>
            <p>Total de clubes carregados: {clubs?.length || 0}</p>
            <p>Clubes após filtro: {filteredClubs.length}</p>
            <p>Termo de busca: "{searchTerm}"</p>
            <p>Loading: {clubsLoading ? 'Sim' : 'Não'}</p>
            <p>Erro: {clubsError ? clubsError.message : 'Nenhum'}</p>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredClubs.map((club) => {
          console.log('Renderizando clube:', club);
          return (
            <Card key={club.id} className="hover:shadow-lg transition-all duration-300">
              <CardHeader>
                <CardTitle className="text-lg">
                  <div className="flex items-center justify-between">
                    <span>{club.name || 'Nome não definido'}</span>
                    {club.status && (
                      <Badge variant={club.status === 'active' ? 'default' : 'secondary'}>
                        {club.status === 'active' ? 'Ativo' : 'Inativo'}
                      </Badge>
                    )}
                  </div>
                </CardTitle>
                {(club.address || club.island) && (
                  <div className="flex items-center text-sm text-gray-600">
                    <MapPin className="w-4 h-4 mr-1" />
                    <span>{club.address}{club.address && club.island ? ', ' : ''}{club.island}</span>
                  </div>
                )}
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  {club.founded_year && (
                    <div className="text-sm">
                      <strong>Fundado:</strong> {club.founded_year}
                    </div>
                  )}
                  
                  {club.description && (
                    <div className="text-sm">
                      <strong>Descrição:</strong> {club.description}
                    </div>
                  )}
                </div>

                <div className="space-y-2 pt-4 border-t">
                  {club.contact_phone && (
                    <div className="flex items-center text-sm text-gray-600">
                      <Phone className="w-4 h-4 mr-2 flex-shrink-0" />
                      <span>{club.contact_phone}</span>
                    </div>
                  )}
                  {club.contact_email && (
                    <div className="flex items-center text-sm text-gray-600">
                      <Mail className="w-4 h-4 mr-2 flex-shrink-0" />
                      <span className="break-all">{club.contact_email}</span>
                    </div>
                  )}
                  {club.website && (
                    <div className="flex items-center text-sm text-gray-600">
                      <Globe className="w-4 h-4 mr-2 flex-shrink-0" />
                      <a 
                        href={club.website.startsWith('http') ? club.website : `https://${club.website}`} 
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
          );
        })}
      </div>

      {filteredClubs.length === 0 && !clubsLoading && (
        <Card>
          <CardContent className="p-12 text-center">
            <Users className="mx-auto h-16 w-16 text-gray-400 mb-4" />
            <h3 className="text-lg font-semibold text-gray-600 mb-2">
              Nenhum clube encontrado
            </h3>
            <p className="text-gray-500">
              {searchTerm ? 'Tente ajustar os termos de pesquisa.' : 'Não há clubes registados na base de dados.'}
            </p>
            {clubs && clubs.length > 0 && (
              <p className="text-sm text-blue-600 mt-2">
                Total de clubes na base de dados: {clubs.length}
              </p>
            )}
          </CardContent>
        </Card>
      )}

      {islands.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Distribuição por Ilha</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {islands.map((island) => {
                const clubCount = clubs?.filter(club => club.island === island).length || 0;
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
      )}
    </div>
  );
};

export default ClubsDirectory;
