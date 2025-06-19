
import React from 'react';
import { Calendar, User, ArrowRight } from 'lucide-react';
import InteractiveCard from './InteractiveCard';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const ModernNewsSection = () => {
  const newsItems = [
    {
      id: 1,
      title: "FCBB anuncia novos programas de formação para jovens atletas",
      description: "Iniciativa visa desenvolver talentos em todas as ilhas do arquipélago, com foco na inclusão e desenvolvimento técnico dos jovens cabo-verdianos.",
      image: "https://images.unsplash.com/photo-1552847661-dddc6d9e71ba?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      date: "15 Jun 2024",
      author: "FCBB Media",
      category: "Formação"
    },
    {
      id: 2,
      title: "Seleção Nacional prepara-se para o AfroBasket 2025",
      description: "Equipa técnica divulga lista de convocados para os treinos preparatórios. Grandes expectativas para a participação cabo-verdiana.",
      image: "https://images.unsplash.com/photo-1546519638-68e109498ffc?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      date: "12 Jun 2024",
      author: "João Silva",
      category: "Seleção Nacional"
    },
    {
      id: 3,
      title: "Liga Nacional 2024/25: Calendário completo divulgado",
      description: "Conhece as datas e confrontos da nova temporada. 12 equipas lutam pelo título nacional numa competição que promete ser emocionante.",
      image: "https://images.unsplash.com/photo-1574623452334-1e0ac2b3ccb4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      date: "10 Jun 2024",
      author: "Maria Santos",
      category: "Competições"
    }
  ];

  return (
    <section className="py-16 bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      <div className="cv-container">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="gradient-text">Últimas Notícias</span>
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Mantenha-se atualizado com as novidades do basquetebol cabo-verdiano
          </p>
        </div>

        {/* News Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {newsItems.map((news, index) => (
            <article 
              key={news.id}
              className={`group ${index === 0 ? 'md:col-span-2 lg:col-span-1' : ''}`}
            >
              <div className="glass-card rounded-2xl overflow-hidden hover-glow h-full">
                <div className="relative overflow-hidden">
                  <img 
                    src={news.image} 
                    alt={news.title}
                    className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="glass-card px-3 py-1 text-xs font-medium text-white rounded-full">
                      {news.category}
                    </span>
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-3 space-x-4">
                    <span className="flex items-center">
                      <Calendar className="h-4 w-4 mr-1" />
                      {news.date}
                    </span>
                    <span className="flex items-center">
                      <User className="h-4 w-4 mr-1" />
                      {news.author}
                    </span>
                  </div>
                  
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-cv-blue transition-colors">
                    {news.title}
                  </h3>
                  
                  <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
                    {news.description}
                  </p>
                  
                  <Button 
                    variant="ghost" 
                    className="p-0 h-auto text-cv-blue hover:text-cv-red font-medium group"
                  >
                    Ler mais
                    <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center">
          <Button 
            size="lg" 
            className="neumorphism bg-transparent text-cv-blue hover:bg-cv-blue hover:text-white border-0 px-8 py-4"
            asChild
          >
            <Link to="/noticias">
              Ver Todas as Notícias
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ModernNewsSection;
