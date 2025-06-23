
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, Phone, Mail, Globe } from 'lucide-react';

interface Club {
  id: string;
  name: string;
  address?: string;
  island?: string;
  status?: string;
  founded_year?: number;
  description?: string;
  contact_phone?: string;
  contact_email?: string;
  website?: string;
}

interface ClubCardProps {
  club: Club;
}

export const ClubCard = ({ club }: ClubCardProps) => {
  console.log('Renderizando clube:', club);
  
  return (
    <Card className="hover:shadow-lg transition-all duration-300">
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
};
