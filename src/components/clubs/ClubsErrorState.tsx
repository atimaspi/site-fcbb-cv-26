
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users } from 'lucide-react';

interface ClubsErrorStateProps {
  error: any;
}

export const ClubsErrorState = ({ error }: ClubsErrorStateProps) => {
  console.error('Erro no componente:', error);
  
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
          {error.message}
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
};
