
import { useState, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight, Play } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';

interface Slide {
  id: number;
  image: string;
  title: string;
  subtitle: string;
  description: string;
  cta: string;
}

const ModernSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const slides: Slide[] = [
    {
      id: 1,
      image: "https://images.unsplash.com/photo-1546519638-68e109498ffc",
      title: "Seleção Nacional conquista histórica vitória",
      subtitle: "AfroBasket 2024",
      description: "Cabo Verde marca presença no cenário internacional com performance exemplar",
      cta: "Ver Resultados"
    },
    {
      id: 2,
      image: "https://images.unsplash.com/photo-1574623452334-1e0ac2b3ccb4",
      title: "Liga Nacional 2024/25 em grande forma",
      subtitle: "Temporada Emocionante",
      description: "12 equipas disputam o título nacional numa das épocas mais competitivas",
      cta: "Classificações"
    },
    {
      id: 3,
      image: "https://images.unsplash.com/photo-1552847661-dddc6d9e71ba",
      title: "Desenvolvimento do Basquetebol Feminino",
      subtitle: "Programa de Formação",
      description: "FCBB investe no futuro com programa inovador de desenvolvimento feminino",
      cta: "Saber Mais"
    }
  ];

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  }, [slides.length]);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  }, [slides.length]);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  useEffect(() => {
    if (!isAutoPlaying) return;
    
    const timer = setInterval(nextSlide, 5000);
    return () => clearInterval(timer);
  }, [nextSlide, isAutoPlaying]);

  const handleMouseEnter = () => setIsAutoPlaying(false);
  const handleMouseLeave = () => setIsAutoPlaying(true);

  return (
    <div 
      className="relative h-screen overflow-hidden"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          className="absolute inset-0"
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.7, ease: "easeInOut" }}
        >
          <div className="relative h-full">
            <img 
              src={slides[currentSlide].image}
              alt={slides[currentSlide].title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent"></div>
            
            <div className="absolute inset-0 flex items-center">
              <div className="cv-container">
                <motion.div
                  className="max-w-2xl text-white"
                  initial={{ x: -50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.3, duration: 0.6 }}
                >
                  <motion.span 
                    className="inline-block px-4 py-2 bg-cv-accent text-sm font-medium rounded-full mb-4"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.5, duration: 0.4 }}
                  >
                    {slides[currentSlide].subtitle}
                  </motion.span>
                  
                  <motion.h1 
                    className="text-3xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight font-display"
                    initial={{ y: 30, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.6, duration: 0.5 }}
                  >
                    {slides[currentSlide].title}
                  </motion.h1>
                  
                  <motion.p 
                    className="text-lg md:text-xl mb-8 text-gray-200 leading-relaxed"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.8, duration: 0.4 }}
                  >
                    {slides[currentSlide].description}
                  </motion.p>
                  
                  <motion.div
                    className="flex flex-col sm:flex-row gap-4"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 1, duration: 0.4 }}
                  >
                    <Button 
                      size="lg" 
                      className="bg-cv-primary hover:bg-cv-primary/90 text-white px-8 py-4 text-lg font-semibold transform hover:scale-105 transition-all duration-300"
                    >
                      {slides[currentSlide].cta}
                    </Button>
                    <Button 
                      size="lg" 
                      variant="outline" 
                      className="border-white text-white hover:bg-white hover:text-cv-primary backdrop-blur-sm px-8 py-4 text-lg font-semibold transform hover:scale-105 transition-all duration-300"
                    >
                      <Play className="mr-2 h-5 w-5" />
                      Ver Vídeo
                    </Button>
                  </motion.div>
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-6 top-1/2 transform -translate-y-1/2 bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white p-3 rounded-full transition-all duration-300 hover:scale-110"
        aria-label="Slide anterior"
      >
        <ChevronLeft className="h-6 w-6" />
      </button>
      
      <button
        onClick={nextSlide}
        className="absolute right-6 top-1/2 transform -translate-y-1/2 bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white p-3 rounded-full transition-all duration-300 hover:scale-110"
        aria-label="Próximo slide"
      >
        <ChevronRight className="h-6 w-6" />
      </button>

      {/* Slide Indicators */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`transition-all duration-300 ${
              index === currentSlide 
                ? 'w-10 h-3 bg-white rounded-full' 
                : 'w-3 h-3 bg-white/50 rounded-full hover:bg-white/75'
            }`}
            aria-label={`Ir para slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Play/Pause Button */}
      <button
        onClick={() => setIsAutoPlaying(!isAutoPlaying)}
        className="absolute bottom-8 right-8 bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white p-3 rounded-full transition-all duration-300"
        aria-label={isAutoPlaying ? "Pausar autoplay" : "Iniciar autoplay"}
      >
        {isAutoPlaying ? (
          <div className="w-4 h-4 flex space-x-1">
            <div className="w-1 h-4 bg-white"></div>
            <div className="w-1 h-4 bg-white"></div>
          </div>
        ) : (
          <Play className="h-4 w-4 ml-0.5" />
        )}
      </button>
    </div>
  );
};

export default ModernSlider;
