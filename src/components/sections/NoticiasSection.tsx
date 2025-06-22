
import { motion } from 'framer-motion';
import { Calendar, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const NoticiasSection = () => {
  const noticias = [
    {
      id: 1,
      image: "https://images.unsplash.com/photo-1546519638-68e109498ffc",
      title: "Seleção Nacional prepara-se para o AfroBasket 2025",
      excerpt: "Equipa técnica divulga lista de convocados para o próximo grande evento continental.",
      date: "2024-12-20",
      category: "Seleções"
    },
    {
      id: 2,
      image: "https://images.unsplash.com/photo-1574623452334-1e0ac2b3ccb4",
      title: "Liga Nacional: ABC lidera classificação",
      excerpt: "Clube da Praia mantém-se no topo da tabela após vitória convincente.",
      date: "2024-12-18",
      category: "Liga Nacional"
    },
    {
      id: 3,
      image: "https://images.unsplash.com/photo-1552847661-dddc6d9e71ba",
      title: "Programa de formação feminina expande para mais ilhas",
      excerpt: "FCBB alarga projeto de desenvolvimento do basquetebol feminino.",
      date: "2024-12-15",
      category: "Formação"
    }
  ];

  return (
    <section id="noticias" className="py-20 bg-white">
      <div className="cv-container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-cv-primary mb-4 font-display">
            Últimas Notícias
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Fique a par das últimas novidades do basquetebol cabo-verdiano
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {noticias.map((noticia, index) => (
            <motion.article
              key={noticia.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 * index }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 group"
            >
              <div className="relative overflow-hidden">
                <img 
                  src={noticia.image}
                  alt={noticia.title}
                  className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4">
                  <span className="bg-cv-accent text-white px-3 py-1 text-sm font-medium rounded-full">
                    {noticia.category}
                  </span>
                </div>
              </div>
              
              <div className="p-6">
                <div className="flex items-center text-gray-500 text-sm mb-3">
                  <Calendar className="h-4 w-4 mr-2" />
                  {new Date(noticia.date).toLocaleDateString('pt-CV', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric'
                  })}
                </div>
                
                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-cv-primary transition-colors">
                  {noticia.title}
                </h3>
                
                <p className="text-gray-600 mb-4 leading-relaxed">
                  {noticia.excerpt}
                </p>
                
                <Button 
                  variant="ghost" 
                  className="text-cv-primary hover:text-cv-primary hover:bg-cv-primary/10 p-0 h-auto group"
                >
                  Ler mais 
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </div>
            </motion.article>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <Button 
            size="lg" 
            variant="outline"
            className="border-cv-primary text-cv-primary hover:bg-cv-primary hover:text-white px-8 py-4 font-semibold transform hover:scale-105 transition-all duration-300"
          >
            Ver Todas as Notícias
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default NoticiasSection;
