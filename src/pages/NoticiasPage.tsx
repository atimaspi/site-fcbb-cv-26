
import { useBackendData } from '@/hooks/useBackendData';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, Eye } from 'lucide-react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import SocialShare from '@/components/ui/social-share';
import PageLayout from './PageLayout';

const NoticiasPage = () => {
  const { publishedNews, newsLoading } = useBackendData();

  if (newsLoading) {
    return (
      <PageLayout title="Notícias">
        <div className="flex items-center justify-center h-32">
          <LoadingSpinner size="lg" />
        </div>
      </PageLayout>
    );
  }

  // Notícias de exemplo se não houver dados
  const exampleNews = [
    {
      id: "example-1",
      title: "ABC vence a SuperTaça de Cabo Verde 2025",
      excerpt: "O Académico do Mindelo conquistou o primeiro título da temporada após vencer o Sporting da Praia por 78-65.",
      published_at: "2025-03-23T00:00:00Z",
      featured_image_url: "https://images.unsplash.com/photo-1546519638-68e109498ffc?auto=format&fit=crop&w=600&h=400&q=80",
      category: "Competições"
    },
    {
      id: "example-2",
      title: "Seleção Nacional convoca 20 jogadores para o AfroBasket",
      excerpt: "O selecionador nacional anunciou a lista de convocados para o próximo AfroBasket que se realiza em setembro.",
      published_at: "2025-03-20T00:00:00Z",
      featured_image_url: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=600&h=400&q=80",
      category: "Seleções"
    },
    {
      id: "example-3",
      title: "Final Four da Liga Nacional em São Vicente",
      excerpt: "As meias-finais e final da Liga Nacional realizar-se-ão no Pavilhão Adão e Eva, em Mindelo.",
      published_at: "2025-03-15T00:00:00Z",
      featured_image_url: "https://images.unsplash.com/photo-1504450758481-7338eba7524a?auto=format&fit=crop&w=600&h=400&q=80",
      category: "Competições"
    }
  ];

  const newsToShow = publishedNews.length > 0 ? publishedNews : exampleNews;

  return (
    <PageLayout 
      title="Notícias" 
      description="Acompanhe as últimas novidades do basquetebol cabo-verdiano"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
        {newsToShow.map((noticia) => (
          <Card key={noticia.id} className="hover:shadow-lg transition-shadow">
            {noticia.featured_image_url && (
              <div className="aspect-video overflow-hidden rounded-t-lg">
                <img 
                  src={noticia.featured_image_url} 
                  alt={noticia.title}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  loading="lazy"
                />
              </div>
            )}
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <Badge variant="secondary" className="bg-cv-blue text-white text-xs">
                  {noticia.category}
                </Badge>
                {noticia.published_at && (
                  <div className="flex items-center text-xs text-gray-500">
                    <Calendar className="w-3 h-3 mr-1" />
                    {format(new Date(noticia.published_at), 'dd MMM, yyyy', { locale: ptBR })}
                  </div>
                )}
              </div>
              
              <h3 className="text-base font-semibold mb-2 text-gray-900 line-clamp-2">
                {noticia.title}
              </h3>
              
              {noticia.excerpt && (
                <p className="text-gray-600 text-sm mb-3 line-clamp-3">
                  {noticia.excerpt}
                </p>
              )}
              
              <div className="flex items-center justify-between">
                <button className="text-cv-blue font-medium hover:text-blue-700 transition-colors text-sm">
                  Ler mais
                </button>
                <div className="flex items-center space-x-2">
                  <div className="flex items-center text-gray-400">
                    <Eye className="w-3 h-3" />
                  </div>
                  <SocialShare
                    url={`${window.location.origin}/noticias/${noticia.id}`}
                    title={noticia.title}
                    description={noticia.excerpt}
                    variant="compact"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {newsToShow.length > 9 && (
        <div className="text-center mt-6">
          <button className="bg-cv-blue text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm">
            Ver mais notícias
          </button>
        </div>
      )}
    </PageLayout>
  );
};

export default NoticiasPage;
