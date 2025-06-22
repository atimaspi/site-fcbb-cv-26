
import { useState, useEffect, useMemo, memo, useCallback } from 'react';
import { ChevronLeft, ChevronRight, Play } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const ModernSlider = memo(() => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = useMemo(() => [
    {
      id: 1,
      image: "https://images.unsplash.com/photo-1546519638-68e109498ffc",
      title: "Liga Nacional 2024/25 em grande forma",
      subtitle: "Temporada Emocionante",
      description: "12 equipas disputam o título nacional numa das épocas mais competitivas",
      cta: "Classificações",
      link: "/competicoes/classificacoes"
    },
    {
      id: 2,
      image: "https://images.unsplash.com/photo-1574623452334-1e0ac2b3ccb4",
      title: "Seleção Nacional conquista histórica vitória",
      subtitle: "Cabo Verde no cenário internacional",
      description: "A nossa seleção nacional alcança novo patamar competitivo no AfroBasket 2024",
      cta: "Ver Resultados",
      link: "/resultados"
    },
    {
      id: 3,
      image: "https://images.unsplash.com/photo-1552847661-dddc6d9e71ba",
      title: "Desenvolvimento do Basquetebol Feminino",
      subtitle: "Programa especial de formação",
      description: "FCBB lança programa inovador para promover o basquetebol feminino em todas as ilhas",
      cta: "Saber Mais",
      link: "/selecoes/senior-feminina"
    }
  ], []);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  }, [slides.length]);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  }, [slides.length]);

  const goToSlide = useCallback((index: number) => {
    setCurrentSlide(index);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      if (!document.hidden) {
        nextSlide();
      }
    }, 6000);
    return () => clearInterval(timer);
  }, [nextSlide]);

  return (
    <section className="relative">
      {/* Main Hero Slider - altura reduzida */}
      <div className="relative h-[50vh] md:h-[55vh] overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.7, ease: "easeInOut" }}
            className="absolute inset-0"
          >
            <div className="relative h-full">
              <img
                src={slides[currentSlide].image}
                alt={slides[currentSlide].title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-cv-primary/80 via-cv-primary/60 to-transparent"></div>
              
              <div className="absolute inset-0 flex items-center">
                <div className="cv-container">
                  <div className="max-w-2xl text-white">
                    <motion.span 
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                      className="inline-block px-4 py-2 bg-cv-accent text-sm font-semibold rounded-full mb-4"
                    >
                      {slides[currentSlide].subtitle}
                    </motion.span>
                    <motion.h1 
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                      className="text-3xl md:text-5xl lg:text-6xl font-bold mb-4 leading-tight font-display"
                    >
                      {slides[currentSlide].title}
                    </motion.h1>
                    <motion.p 
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 }}
                      className="text-lg md:text-xl mb-6 text-gray-200 leading-relaxed"
                    >
                      {slides[currentSlide].description}
                    </motion.p>
                    <motion.div 
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 }}
                      className="flex flex-col sm:flex-row gap-3"
                    >
                      <Button size="lg" className="bg-cv-secondary hover:bg-cv-secondary/90 text-cv-primary font-semibold shadow-xl" asChild>
                        <Link to={slides[currentSlide].link}>{slides[currentSlide].cta}</Link>
                      </Button>
                      <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-cv-primary">
                        <Play className="mr-2 h-5 w-5" />
                        Ver Vídeo
                      </Button>
                    </motion.div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Navigation arrows */}
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/40 backdrop-blur-sm hover:bg-black/60 text-white p-3 rounded-full transition-all duration-200 hover:scale-110 z-10"
        >
          <ChevronLeft className="h-6 w-6" />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/40 backdrop-blur-sm hover:bg-black/60 text-white p-3 rounded-full transition-all duration-200 hover:scale-110 z-10"
        >
          <ChevronRight className="h-6 w-6" />
        </button>

        {/* Slide indicators */}
        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-2 z-10">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`transition-all duration-300 ${
                index === currentSlide 
                  ? 'w-8 h-3 bg-cv-secondary rounded-full' 
                  : 'w-3 h-3 bg-white/50 rounded-full hover:bg-white/75'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Quick Stats Bar */}
      <div className="bg-cv-primary text-white py-6">
        <div className="cv-container">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              { label: "Clubes Licenciados", value: "24", icon: "🏆" },
              { label: "Atletas Federados", value: "1,250+", icon: "👥" },
              { label: "Jogos por Época", value: "180+", icon: "📅" },
              { label: "Ilhas Participantes", value: "9", icon: "🏝️" }
            ].map((stat, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center justify-center space-x-3 group hover:scale-105 transition-transform duration-200"
              >
                <div className="text-2xl">{stat.icon}</div>
                <div className="text-center">
                  <div className="text-2xl md:text-3xl font-bold text-cv-secondary">{stat.value}</div>
                  <div className="text-sm opacity-90">{stat.label}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
});

ModernSlider.displayName = 'ModernSlider';

export default ModernSlider;
