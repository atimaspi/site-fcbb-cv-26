
import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, ArrowRight, Play, Trophy, Target } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useContentData } from '@/hooks/useContentData';
import { Link } from 'react-router-dom';

const EnhancedFCBBSlider = () => {
  const { heroSlidesData, isContentLoading } = useContentData();
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = heroSlidesData?.length > 0 ? heroSlidesData : [
    {
      id: 'fcbb-main',
      title: 'Federação Cabo-verdiana de Basquetebol',
      subtitle: 'Elevando o Basquetebol Nacional',
      description: 'Promovendo a excelência desportiva, formação de qualidade e integração comunitária em todas as ilhas de Cabo Verde.',
      image_url: '/lovable-uploads/39194785-9ce8-4849-82cb-ad92f0086855.png',
      cta_text: 'Descobrir Mais',
      cta_link: '/sobre'
    },
    {
      id: 'liga-nacional',
      title: 'Liga Nacional 2024/25',
      subtitle: 'A Elite do Basquetebol Cabo-verdiano',
      description: 'Acompanhe a emocionante temporada com 12 equipas a lutar pelo título nacional. Jogos, classificações e estatísticas em tempo real.',
      image_url: '/lovable-uploads/39194785-9ce8-4849-82cb-ad92f0086855.png',
      cta_text: 'Ver Classificações',
      cta_link: '/competicoes/classificacoes'
    },
    {
      id: 'selecao-nacional',
      title: 'Seleção Nacional',
      subtitle: 'Orgulho de Cabo Verde',
      description: 'Acompanhe a nossa seleção nacional nos principais torneios internacionais. Representando Cabo Verde com excelência e dedicação.',
      image_url: '/lovable-uploads/39194785-9ce8-4849-82cb-ad92f0086855.png',
      cta_text: 'Conhecer Seleções',
      cta_link: '/selecoes'
    }
  ];

  useEffect(() => {
    if (slides.length === 0) return;
    
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 7000);

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
      <div className="relative h-[90vh] bg-gradient-to-br from-cv-blue via-blue-800 to-cv-red flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-4 border-cv-yellow"></div>
      </div>
    );
  }

  return (
    <div className="relative h-[90vh] overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 1, ease: "easeInOut" }}
          className="absolute inset-0"
        >
          {/* Background with Cape Verde Flag Colors */}
          <div className="absolute inset-0 bg-gradient-to-br from-cv-blue via-blue-900 to-cv-red" />
          
          {/* Geometric Pattern Overlay */}
          <div className="absolute inset-0">
            <div className="absolute top-0 right-0 w-96 h-96 bg-cv-yellow/10 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-80 h-80 bg-white/5 rounded-full blur-2xl" />
            <div className="absolute top-1/2 left-1/3 w-64 h-64 bg-cv-red/10 rounded-full blur-xl" />
          </div>

          {/* Basketball Pattern */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute top-20 right-20 w-32 h-32 border-4 border-white rounded-full" />
            <div className="absolute bottom-32 left-16 w-24 h-24 border-2 border-cv-yellow rounded-full" />
            <div className="absolute top-1/3 right-1/4 w-16 h-16 border-2 border-white/50 rounded-full" />
          </div>
          
          <div className="relative z-10 h-full flex items-center">
            <div className="cv-container">
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                {/* Content */}
                <div className="text-white space-y-8">
                  <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.8 }}
                  >
                    <span className="inline-block px-6 py-3 bg-cv-yellow/20 backdrop-blur-sm text-cv-yellow font-bold text-sm uppercase tracking-wider rounded-full border border-cv-yellow/30 mb-6">
                      {slides[currentSlide]?.subtitle}
                    </span>
                  </motion.div>

                  <motion.h1
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.8 }}
                    className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight font-display"
                    style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.5)' }}
                  >
                    {slides[currentSlide]?.title}
                  </motion.h1>
                  
                  <motion.p
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4, duration: 0.8 }}
                    className="text-xl md:text-2xl leading-relaxed text-gray-200 max-w-2xl"
                  >
                    {slides[currentSlide]?.description}
                  </motion.p>
                  
                  <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5, duration: 0.8 }}
                    className="flex flex-col sm:flex-row gap-4"
                  >
                    <Link
                      to={slides[currentSlide]?.cta_link || '/sobre'}
                      className="group inline-flex items-center bg-gradient-to-r from-cv-yellow to-yellow-400 text-cv-blue px-8 py-4 rounded-xl font-bold text-lg hover:from-yellow-400 hover:to-cv-yellow transition-all duration-300 shadow-2xl hover:shadow-yellow-500/25 font-display transform hover:scale-105"
                    >
                      {slides[currentSlide]?.cta_text || 'Ver Mais'}
                      <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                    </Link>
                    
                    <Link
                      to="/resultados/ao-vivo"
                      className="group inline-flex items-center border-2 border-white text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-white hover:text-cv-blue transition-all duration-300 backdrop-blur-sm transform hover:scale-105"
                    >
                      <Play className="mr-2 h-5 w-5" />
                      Jogos ao Vivo
                    </Link>
                  </motion.div>
                </div>

                {/* Stats Cards */}
                <motion.div
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6, duration: 0.8 }}
                  className="grid grid-cols-2 gap-6"
                >
                  {[
                    { number: '12', label: 'Equipas Liga Nacional', icon: Trophy, gradient: 'from-cv-yellow to-yellow-500' },
                    { number: '240+', label: 'Jogadores Federados', icon: Target, gradient: 'from-cv-red to-red-500' },
                    { number: '9', label: 'Ilhas Participantes', icon: Trophy, gradient: 'from-green-500 to-emerald-500' },
                    { number: '38', label: 'Equipas Regionais', icon: Target, gradient: 'from-blue-500 to-cyan-500' }
                  ].map((stat, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.8 + index * 0.1, duration: 0.6 }}
                      className="group p-6 backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl hover:bg-white/20 transition-all duration-500 hover:scale-105 cursor-pointer"
                    >
                      <div className={`w-12 h-12 mx-auto mb-4 rounded-xl bg-gradient-to-br ${stat.gradient} flex items-center justify-center group-hover:rotate-12 transition-transform duration-300`}>
                        <stat.icon className="h-6 w-6 text-white" />
                      </div>
                      <div className="text-3xl font-bold mb-2 bg-gradient-to-br from-white to-gray-300 bg-clip-text text-transparent">
                        {stat.number}
                      </div>
                      <div className="text-sm text-gray-200 font-medium leading-tight text-center">
                        {stat.label}
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation */}
      {slides.length > 1 && (
        <>
          <button
            onClick={prevSlide}
            className="absolute left-6 top-1/2 transform -translate-y-1/2 bg-white/10 hover:bg-white/20 text-white p-4 rounded-full transition-all duration-300 backdrop-blur-md border border-white/20 group"
            aria-label="Slide anterior"
          >
            <ChevronLeft size={24} className="group-hover:-translate-x-1 transition-transform" />
          </button>
          
          <button
            onClick={nextSlide}
            className="absolute right-6 top-1/2 transform -translate-y-1/2 bg-white/10 hover:bg-white/20 text-white p-4 rounded-full transition-all duration-300 backdrop-blur-md border border-white/20 group"
            aria-label="Próximo slide"
          >
            <ChevronRight size={24} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </>
      )}

      {/* Dots */}
      {slides.length > 1 && (
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-3">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-4 h-4 rounded-full transition-all duration-300 border-2 ${
                index === currentSlide 
                  ? 'bg-cv-yellow border-cv-yellow shadow-lg shadow-yellow-500/50' 
                  : 'bg-white/30 border-white/50 hover:bg-white/50'
              }`}
              aria-label={`Ir para slide ${index + 1}`}
            />
          ))}
        </div>
      )}

      {/* Progress Bar */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-white/20">
        <motion.div
          className="h-full bg-gradient-to-r from-cv-yellow to-yellow-400"
          initial={{ width: '0%' }}
          animate={{ width: '100%' }}
          transition={{ duration: 7, ease: "linear", repeat: Infinity }}
          key={currentSlide}
        />
      </div>
    </div>
  );
};

export default EnhancedFCBBSlider;
