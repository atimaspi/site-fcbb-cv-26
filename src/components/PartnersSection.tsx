
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent } from '@/components/ui/card';
import { ExternalLink } from 'lucide-react';

const PartnersSection = () => {
  const { data: partners, isLoading } = useQuery({
    queryKey: ['partners'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('partners')
        .select('*')
        .eq('active', true)
        .order('order_index', { ascending: true });
      
      if (error) throw error;
      return data || [];
    },
    staleTime: 10 * 60 * 1000, // 10 minutes
  });

  if (isLoading) {
    return (
      <section className="py-16 bg-gray-50">
        <div className="cv-container">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-cv-blue mb-4">Parceiros Oficiais</h2>
            <div className="animate-pulse">
              <div className="h-4 bg-gray-300 rounded w-64 mx-auto"></div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  const categorizedPartners = {
    institutional: partners?.filter(p => p.category === 'institutional') || [],
    sponsor: partners?.filter(p => p.category === 'sponsor') || [],
    federation: partners?.filter(p => p.category === 'federation') || [],
    media: partners?.filter(p => p.category === 'media') || []
  };

  return (
    <section className="py-16 bg-gray-50">
      <div className="cv-container">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-cv-blue mb-4">Parceiros Oficiais</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Juntos construímos o futuro do basquetebol cabo-verdiano
          </p>
        </div>

        {/* Parceiros Institucionais */}
        {categorizedPartners.institutional.length > 0 && (
          <div className="mb-12">
            <h3 className="text-2xl font-semibold text-cv-blue mb-6 text-center">
              Parceiros Institucionais
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
              {categorizedPartners.institutional.map((partner) => (
                <Card key={partner.id} className="group hover:shadow-lg transition-all duration-300">
                  <CardContent className="p-6 flex flex-col items-center">
                    <div className="relative mb-4">
                      <img
                        src={partner.logo_url}
                        alt={partner.name}
                        className="h-16 w-auto object-contain group-hover:scale-110 transition-transform duration-300"
                      />
                      {partner.website_url && (
                        <ExternalLink className="absolute -top-2 -right-2 h-4 w-4 text-cv-blue opacity-0 group-hover:opacity-100 transition-opacity" />
                      )}
                    </div>
                    <h4 className="text-sm font-medium text-center text-gray-800">
                      {partner.name}
                    </h4>
                    {partner.description && (
                      <p className="text-xs text-gray-600 text-center mt-1">
                        {partner.description}
                      </p>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Federações e Organizações */}
        {categorizedPartners.federation.length > 0 && (
          <div className="mb-12">
            <h3 className="text-2xl font-semibold text-cv-blue mb-6 text-center">
              Federações e Organizações
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {categorizedPartners.federation.map((partner) => (
                <Card key={partner.id} className="group hover:shadow-lg transition-all duration-300">
                  <CardContent className="p-6 flex flex-col items-center">
                    <div className="relative mb-4">
                      <img
                        src={partner.logo_url}
                        alt={partner.name}
                        className="h-20 w-auto object-contain group-hover:scale-110 transition-transform duration-300"
                      />
                      {partner.website_url && (
                        <ExternalLink className="absolute -top-2 -right-2 h-4 w-4 text-cv-blue opacity-0 group-hover:opacity-100 transition-opacity" />
                      )}
                    </div>
                    <h4 className="text-sm font-medium text-center text-gray-800">
                      {partner.name}
                    </h4>
                    {partner.description && (
                      <p className="text-xs text-gray-600 text-center mt-1">
                        {partner.description}
                      </p>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Patrocinadores */}
        {categorizedPartners.sponsor.length > 0 && (
          <div className="mb-12">
            <h3 className="text-2xl font-semibold text-cv-blue mb-6 text-center">
              Patrocinadores
            </h3>
            <div className="grid grid-cols-3 md:grid-cols-5 lg:grid-cols-7 gap-4">
              {categorizedPartners.sponsor.map((partner) => (
                <Card key={partner.id} className="group hover:shadow-lg transition-all duration-300">
                  <CardContent className="p-4 flex flex-col items-center">
                    <div className="relative">
                      <img
                        src={partner.logo_url}
                        alt={partner.name}
                        className="h-12 w-auto object-contain group-hover:scale-110 transition-transform duration-300"
                      />
                      {partner.website_url && (
                        <ExternalLink className="absolute -top-1 -right-1 h-3 w-3 text-cv-blue opacity-0 group-hover:opacity-100 transition-opacity" />
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Parceiros de Mídia */}
        {categorizedPartners.media.length > 0 && (
          <div>
            <h3 className="text-2xl font-semibold text-cv-blue mb-6 text-center">
              Parceiros de Mídia
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
              {categorizedPartners.media.map((partner) => (
                <Card key={partner.id} className="group hover:shadow-lg transition-all duration-300">
                  <CardContent className="p-4 flex flex-col items-center">
                    <div className="relative">
                      <img
                        src={partner.logo_url}
                        alt={partner.name}
                        className="h-14 w-auto object-contain group-hover:scale-110 transition-transform duration-300"
                      />
                      {partner.website_url && (
                        <ExternalLink className="absolute -top-2 -right-2 h-4 w-4 text-cv-blue opacity-0 group-hover:opacity-100 transition-opacity" />
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default PartnersSection;
