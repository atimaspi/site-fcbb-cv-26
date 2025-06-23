
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { ClubsSearch } from './clubs/ClubsSearch';
import { ClubsDebugInfo } from './clubs/ClubsDebugInfo';
import { ClubsLoadingState } from './clubs/ClubsLoadingState';
import { ClubsErrorState } from './clubs/ClubsErrorState';
import { ClubsEmptyState } from './clubs/ClubsEmptyState';
import { ClubCard } from './clubs/ClubCard';
import { ClubsStats } from './clubs/ClubsStats';

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
    return <ClubsLoadingState />;
  }

  if (clubsError) {
    return <ClubsErrorState error={clubsError} />;
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

  return (
    <div className="space-y-6">
      <ClubsSearch 
        searchTerm={searchTerm} 
        onSearchChange={setSearchTerm} 
      />
      
      {/* Debug info - remover depois */}
      <ClubsDebugInfo 
        clubs={clubs}
        filteredClubs={filteredClubs}
        searchTerm={searchTerm}
        loading={clubsLoading}
        error={clubsError}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredClubs.map((club) => (
          <ClubCard key={club.id} club={club} />
        ))}
      </div>

      {filteredClubs.length === 0 && !clubsLoading && (
        <ClubsEmptyState searchTerm={searchTerm} clubs={clubs} />
      )}

      <ClubsStats clubs={clubs || []} />
    </div>
  );
};

export default ClubsDirectory;
