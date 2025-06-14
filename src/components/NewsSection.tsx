
import { ArrowRight } from "lucide-react";
import { useBackendData } from '@/hooks/useBackendData';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { Badge } from '@/components/ui/badge';
import { OptimizedImage } from '@/components/ui/optimized-image';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { memo, useMemo } from 'react';

const NewsSection = memo(() => {
  const { publishedNews, newsLoading } = useBackendData();

  // Pegar apenas as 4 notícias mais recentes
  const recentNews = useMemo(() => publishedNews.slice(0, 4), [publishedNews]);

  // Fallback para notícias estáticas caso não haja notícias no banco
  const fallbackNews = useMemo(() => [
    {
      id: "1",
      title: "ABC vence a SuperTaça de Cabo Verde 2025",
      published_at: "2025-03-23T00:00:00Z",
      featured_image_url: "https://images.unsplash.com/photo-1546519638-68e109498ffc",
      category: "Competições"
    },
    {
      id: "2",
      title: "Seleção Nacional convoca 20 jogadores para o AfroBasket",
      published_at: "2025-03-20T00:00:00Z",
      featured_image_url: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23",
      category: "Seleções"
    },
    {
      id: "3",
      title: "Final Four da Liga Nacional em São Vicente",
      published_at: "2025-03-15T00:00:00Z",
      featured_image_url: "https://images.unsplash.com/photo-1504450758481-7338eba7524a",
      category: "Competições"
    },
    {
      id: "4",
      title: "Workshop para treinadores na Praia",
      published_at: "2025-03-10T00:00:00Z",
      featured_image_url: "https://images.unsplash.com/photo-1519501025264-65ba15a82390",
      category: "Formação"
    }
  ], []);

  const newsToShow = useMemo(() => {
    return recentNews.length > 0 ? recentNews : fallbackNews;
  }, [recentNews, fallbackNews]);

  if (newsLoading) {
    return (
      <section className="py-12">
        <div className="cv-container">
          <div className="flex justify-between items-center mb-6">
            <h2 className="section-title">Últimas Notícias</h2>
          </div>
          <div className="flex items-center justify-center h-64">
            <LoadingSpinner size="lg" />
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-12">
      <div className="cv-container">
        <div className="flex justify-between items-center mb-6">
          <h2 className="section-title">Últimas Notícias</h2>
          <a href="/noticias" className="flex items-center text-cv-blue hover:text-blue-700">
            Ver todas <ArrowRight className="ml-1 w-4 w-4" />
          </a>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {newsToShow.map((item, index) => (
            <article key={item.id} className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow">
              <div className="h-48 overflow-hidden">
                <OptimizedImage
                  src={`${item.featured_image_url || "https://images.unsplash.com/photo-1546519638-68e109498ffc"}?auto=format&fit=crop&w=400&h=200&q=80`}
                  alt={item.title}
                  className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-300"
                  width={400}
                  height={200}
                  priority={index === 0}
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  quality={80}
                />
              </div>
              <div className="p-4">
                <Badge variant="secondary" className="bg-cv-blue text-white text-xs mb-2">
                  {item.category}
                </Badge>
                <h3 className="font-bold text-lg mb-2 line-clamp-2">{item.title}</h3>
                {item.published_at && (
                  <time className="text-gray-600 text-sm" dateTime={item.published_at}>
                    {format(new Date(item.published_at), 'dd MMM, yyyy', { locale: ptBR })}
                  </time>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
});

NewsSection.displayName = 'NewsSection';

export default NewsSection;
