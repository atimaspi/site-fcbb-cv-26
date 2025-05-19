
import { ArrowRight } from "lucide-react";

interface NewsItem {
  id: number;
  title: string;
  date: string;
  image: string;
  category: string;
}

const NewsSection = () => {
  const newsItems: NewsItem[] = [
    {
      id: 1,
      title: "ABC vence a SuperTaça de Cabo Verde 2025",
      date: "23 Mar, 2025",
      image: "https://images.unsplash.com/photo-1546519638-68e109498ffc?q=80&w=2090&auto=format",
      category: "Competições"
    },
    {
      id: 2,
      title: "Seleção Nacional convoca 20 jogadores para o AfroBasket",
      date: "20 Mar, 2025",
      image: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=2069&auto=format",
      category: "Seleções"
    },
    {
      id: 3,
      title: "Final Four da Liga Nacional em São Vicente",
      date: "15 Mar, 2025",
      image: "https://images.unsplash.com/photo-1504450758481-7338eba7524a?q=80&w=2069&auto=format",
      category: "Competições"
    },
    {
      id: 4,
      title: "Workshop para treinadores na Praia",
      date: "10 Mar, 2025",
      image: "https://images.unsplash.com/photo-1519501025264-65ba15a82390?q=80&w=1964&auto=format",
      category: "Formação"
    }
  ];

  return (
    <section className="py-12">
      <div className="cv-container">
        <div className="flex justify-between items-center mb-6">
          <h2 className="section-title">Últimas Notícias</h2>
          <a href="#" className="flex items-center text-cv-blue hover:text-blue-700">
            Ver todas <ArrowRight className="ml-1 w-4 h-4" />
          </a>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {newsItems.map((item) => (
            <div key={item.id} className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow">
              <div className="h-48 overflow-hidden">
                <img 
                  src={item.image} 
                  alt={item.title} 
                  className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-4">
                <span className="inline-block bg-cv-blue text-white text-xs px-2 py-1 rounded mb-2">
                  {item.category}
                </span>
                <h3 className="font-bold text-lg mb-2 line-clamp-2">{item.title}</h3>
                <p className="text-gray-600 text-sm">{item.date}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default NewsSection;
