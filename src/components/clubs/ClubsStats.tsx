
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface Club {
  id: string;
  name: string;
  island?: string;
}

interface ClubsStatsProps {
  clubs: Club[];
}

export const ClubsStats = ({ clubs }: ClubsStatsProps) => {
  const islands = [...new Set(clubs?.map(club => club.island).filter(Boolean) || [])];

  if (islands.length === 0) return null;

  return (
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
  );
};
