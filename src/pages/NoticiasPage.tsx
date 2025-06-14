
import { useBackendData } from '@/hooks/useBackendData';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, User, Eye } from 'lucide-react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import PageLayout from './PageLayout';

const NoticiasPage = () => {
  const { publishedNews, newsLoading } = useBackendData();

  if (newsLoading) {
    return (
      <PageLayout title="Notícias">
        <div className="flex items-center justify-center h-64">
          <LoadingSpinner size="lg" />
        </div>
      </PageLayout>
    );
  }

  if (publishedNews.length === 0) {
    return (
      <PageLayout title="Notícias">
        <div className="text-center py-12">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Nenhuma notícia disponível
          </h3>
          <p className="text-gray-600">
            As notícias publicadas aparecerão aqui em breve.
          </p>
        </div>
      </PageLayout>
    );
  }

  return (
    <PageLayout 
      title="Notícias" 
      description="Acompanhe as últimas novidades do basquetebol cabo-verdiano"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
        {publishedNews.map((noticia) => (
          <Card key={noticia.id} className="hover:shadow-lg transition-shadow">
            {noticia.featured_image_url && (
              <div className="aspect-video overflow-hidden rounded-t-lg">
                <img 
                  src={noticia.featured_image_url} 
                  alt={noticia.title}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
            )}
            <CardContent className="p-6">
              <div className="flex items-center gap-2 mb-3">
                <Badge variant="secondary" className="bg-cv-blue text-white">
                  {noticia.category}
                </Badge>
                <div className="flex items-center text-sm text-gray-500">
                  <Calendar className="w-4 h-4 mr-1" />
                  {format(new Date(noticia.published_at), 'dd MMM, yyyy', { locale: ptBR })}
                </div>
              </div>
              
              <h3 className="text-lg font-semibold mb-3 text-gray-900 line-clamp-2">
                {noticia.title}
              </h3>
              
              {noticia.excerpt && (
                <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                  {noticia.excerpt}
                </p>
              )}
              
              <div className="flex items-center justify-between">
                <button className="text-cv-blue font-medium hover:text-blue-700 transition-colors">
                  Ler mais
                </button>
                <div className="flex items-center text-gray-400">
                  <Eye className="w-4 h-4" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {publishedNews.length > 9 && (
        <div className="text-center mt-8">
          <button className="bg-cv-blue text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors">
            Ver mais notícias
          </button>
        </div>
      )}
    </PageLayout>
  );
};

export default NoticiasPage;
