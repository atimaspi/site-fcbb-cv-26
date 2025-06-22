
import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useContentData } from '@/hooks/useContentData';

const ModernSlider = () => {
  const { heroSlidesData, isContentLoading } = useContentData();
  const [currentSlide, setCurrentSlide] = useState(0);

  // Usar dados do backend ou fallback
  const slides = heroSlidesData?.length > 0 ? heroSlidesData : [
    {
      id: 'default-1',
      title: 'FCBB - Federação Cabo-verdiana de Basquetebol',
      subtitle: 'Promovendo o basquetebol em Cabo Verde',
      description: 'Acompanhe as últimas notícias, resultados e competições do basquetebol cabo-verdiano.',
      image_url: '/lovable-uploads/39194785-9ce8-4849-82cb-ad92f0086855.png',
      cta_text: 'Ver Mais',
      cta_link: '/sobre'
    }
  ];

  useEffect(() => {
    if (slides.length === 0) return;
    
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [slides.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  if (isContentLoading) {
    return (
      <div className="relative h-[70vh] bg-gradient-to-r from-cv-blue to-cv-red flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-white"></div>
      </div>
    );
  }

  return (
    <div className="relative h-[70vh] overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -100 }}
          transition={{ duration: 0.5 }}
          className="absolute inset-0"
        >
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url(${slides[currentSlide]?.image_url || '/lovable-uploads/39194785-9ce8-4849-82cb-ad92f0086855.png'})`
            }}
          />
          
          <div className="relative z-10 h-full flex items-center">
            <div className="cv-container">
              <div className="max-w-3xl text-white">
                <motion.h1
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="text-4xl md:text-6xl font-bold mb-4 leading-tight"
                >
                  {slides[currentSlide]?.title}
                </motion.h1>
                
                {slides[currentSlide]?.subtitle && (
                  <motion.h2
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="text-xl md:text-2xl mb-6 text-cv-yellow font-semibold"
                  >
                    {slides[currentSlide].subtitle}
                  </motion.h2>
                )}
                
                {slides[currentSlide]?.description && (
                  <motion.p
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="text-lg md:text-xl mb-8 leading-relaxed"
                  >
                    {slides[currentSlide].description}
                  </motion.p>
                )}
                
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  <a
                    href={slides[currentSlide]?.cta_link || '/sobre'}
                    className="inline-block bg-cv-yellow text-cv-blue px-8 py-4 rounded-lg font-bold text-lg hover:bg-yellow-400 transition-colors duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
                  >
                    {slides[currentSlide]?.cta_text || 'Ver Mais'}
                  </a>
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation Arrows */}
      {slides.length > 1 && (
        <>
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white p-3 rounded-full transition-all duration-300 backdrop-blur-sm"
            aria-label="Slide anterior"
          >
            <ChevronLeft size={24} />
          </button>
          
          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white p-3 rounded-full transition-all duration-300 backdrop-blur-sm"
            aria-label="Próximo slide"
          >
            <ChevronRight size={24} />
          </button>
        </>
      )}

      {/* Dots Indicator */}
      {slides.length > 1 && (
        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentSlide ? 'bg-cv-yellow' : 'bg-white/50'
              }`}
              aria-label={`Ir para slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ModernSlider;
