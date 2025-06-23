
import { Card, CardContent } from "@/components/ui/card";
import { Users } from 'lucide-react';

interface Club {
  id: string;
  name: string;
}

interface ClubsEmptyStateProps {
  searchTerm: string;
  clubs: Club[] | undefined;
}

export const ClubsEmptyState = ({ searchTerm, clubs }: ClubsEmptyStateProps) => {
  return (
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
  );
};
