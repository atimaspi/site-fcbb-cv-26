
import { Card, CardContent } from "@/components/ui/card";

interface Club {
  id: string;
  name: string;
}

interface ClubsDebugInfoProps {
  clubs: Club[] | undefined;
  filteredClubs: Club[];
  searchTerm: string;
  loading: boolean;
  error: any;
}

export const ClubsDebugInfo = ({ 
  clubs, 
  filteredClubs, 
  searchTerm, 
  loading, 
  error 
}: ClubsDebugInfoProps) => {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="p-4 bg-blue-50 rounded-lg text-sm">
          <p><strong>Debug Info:</strong></p>
          <p>Total de clubes carregados: {clubs?.length || 0}</p>
          <p>Clubes após filtro: {filteredClubs.length}</p>
          <p>Termo de busca: "{searchTerm}"</p>
          <p>Loading: {loading ? 'Sim' : 'Não'}</p>
          <p>Erro: {error ? error.message : 'Nenhum'}</p>
        </div>
      </CardContent>
    </Card>
  );
};
