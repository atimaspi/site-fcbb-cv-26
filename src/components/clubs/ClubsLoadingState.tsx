
import { Card, CardContent } from "@/components/ui/card";
import { Loader2 } from 'lucide-react';

export const ClubsLoadingState = () => {
  return (
    <Card>
      <CardContent className="p-12 text-center">
        <Loader2 className="mx-auto h-8 w-8 animate-spin text-cv-blue mb-4" />
        <p className="text-gray-600">Carregando clubes...</p>
      </CardContent>
    </Card>
  );
};
