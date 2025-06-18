
import { useState, useEffect, useMemo, memo, useCallback } from 'react';
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Play, Calendar, Trophy, Users } from 'lucide-react';
import { Link } from 'react-router-dom';
import AdvancedImage from '@/components/ui/advanced-image';
import { usePerformanceMonitor } from '@/hooks/usePerformanceMonitor';

const Hero = memo(() => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const { startRenderMeasure, endRenderMeasure } = usePerformanceMonitor();

  const slides = useMemo(() => [
    {
      id: 1,
      image: "https://images.unsplash.com/photo-1546519638-68e109498ffc",
      title: "Seleção Nacional conquista histórica vitória no AfroBasket",
      subtitle: "Cabo Verde marca presença no cenário internacional",
      description: "A nossa seleção nacional masculina alcança novo patamar competitivo com performance exemplar no AfroBasket 2024.",
      cta: "Ver Resultados",
      link: "/resultados"
    },
    {
      id: 2,
      image: "https://images.unsplash.com/photo-1574623452334-1e0ac2b3ccb4",
      title: "Liga Nacional 2024/25 arranca em grande",
      subtitle: "12 equipas disputam o título nacional",
      description: "A nova época da Liga Nacional promete ser emocionante com clubes renovados e jovens talentos em destaque.",
      cta: "Classificações",
      link: "/competicoes/classificacoes"
    },
    {
      id: 3,
      image: "https://images.unsplash.com/photo-1552847661-dddc6d9e71ba",
      title: "Desenvolvimento do Basquetebol Feminino",
      subtitle: "Programa especial de formação",
      description: "FCBB lança programa inovador para promover e desenvolver o basquetebol feminino em todas as ilhas.",
      cta: "Saber Mais",
      link: "/selecoes/senior-feminina"
    }
  ], []);

  const quickStats = useMemo(() => [
    { icon: Trophy, label: "Clubes Licenciados", value: "24", color: "bg-cv-red" },
    { icon: Users, label: "Atletas Federados", value: "1,250+", color: "bg-cv-blue" },
    { icon: Calendar, label: "Jogos por Época", value: "180+", color: "bg-cv-yellow" }
  ], []);

  const nextSlide = useCallback(() => {
    startRenderMeasure();
    setCurrentSlide((prev) => (prev + 1) % slides.length);
    endRenderMeasure();
  }, [slides.length, startRenderMeasure, endRenderMeasure]);

  const prevSlide = useCallback(() => {
    startRenderMeasure();
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    endRenderMeasure();
  }, [slides.length, startRenderMeasure, endRenderMeasure]);

  const goToSlide = useCallback((index: number) => {
    startRenderMeasure();
    setCurrentSlide(index);
    endRenderMeasure();
  }, [startRenderMeasure, endRenderMeasure]);

  // Optimized auto-slide with performance consideration
  useEffect(() => {
    const timer = setInterval(() => {
      // Only auto-advance if page is visible
      if (!document.hidden) {
        nextSlide();
      }
    }, 6000);
    return () => clearInterval(timer);
  }, [nextSlide]);

  // Preload adjacent images for smooth transitions
  useEffect(() => {
    const preloadImages = () => {
      const nextIndex = (currentSlide + 1) % slides.length;
      const prevIndex = (currentSlide - 1 + slides.length) % slides.length;
      
      [slides[nextIndex], slides[prevIndex]].forEach(slide => {
        const img = new Image();
        img.src = slide.image;
      });
    };
    
    preloadImages();
  }, [currentSlide, slides]);

  return (
    <section className="relative">
      {/* Main Hero Slider */}
      <div className="relative h-[60vh] md:h-[70vh] overflow-hidden">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-transform duration-700 ease-out ${
              index === currentSlide ? 'translate-x-0' : 
              index < currentSlide ? '-translate-x-full' : 'translate-x-full'
            }`}
          >
            <div className="relative h-full">
              <AdvancedImage
                src={slide.image}
                alt={slide.title}
                className="w-full h-full"
                width={1920}
                height={1080}
                priority={index === 0}
                quality={85}
                lazy={index !== 0}
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent"></div>
              
              <div className="absolute inset-0 flex items-center">
                <div className="cv-container">
                  <div className="max-w-2xl text-white">
                    <span className="inline-block px-3 py-1 bg-cv-red text-sm font-medium rounded-full mb-4 animate-fade-in-up">
                      {slide.subtitle}
                    </span>
                    <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold mb-4 leading-tight animate-fade-in-up animation-delay-200">
                      {slide.title}
                    </h1>
                    <p className="text-lg md:text-xl mb-6 text-gray-200 animate-fade-in-up animation-delay-400">
                      {slide.description}
                    </p>
                    <div className="flex flex-col sm:flex-row gap-3 animate-fade-in-up animation-delay-600">
                      <Button size="lg" className="bg-cv-blue hover:bg-blue-700 transform hover:scale-105 transition-all duration-200" asChild>
                        <Link to={slide.link}>{slide.cta}</Link>
                      </Button>
                      <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-cv-dark transform hover:scale-105 transition-all duration-200">
                        <Play className="mr-2 h-5 w-5" />
                        Ver Vídeo
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Navigation arrows with improved UX */}
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 backdrop-blur-sm hover:bg-black/70 text-white p-2 md:p-3 rounded-full transition-all duration-200 hover:scale-110"
          aria-label="Slide anterior"
        >
          <ChevronLeft className="h-4 w-4 md:h-6 md:w-6" />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 backdrop-blur-sm hover:bg-black/70 text-white p-2 md:p-3 rounded-full transition-all duration-200 hover:scale-110"
          aria-label="Próximo slide"
        >
          <ChevronRight className="h-4 w-4 md:h-6 md:w-6" />
        </button>

        {/* Enhanced slide indicators */}
        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`transition-all duration-300 ${
                index === currentSlide 
                  ? 'w-8 h-3 bg-white rounded-full' 
                  : 'w-3 h-3 bg-white/50 rounded-full hover:bg-white/75'
              }`}
              aria-label={`Ir para slide ${index + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Enhanced Quick Stats Bar */}
      <div className="bg-cv-blue text-white py-4 md:py-6">
        <div className="cv-container">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {quickStats.map((stat, index) => (
              <div key={index} className="flex items-center justify-center md:justify-start space-x-3 group hover:scale-105 transition-transform duration-200">
                <div className={`${stat.color} p-2 md:p-3 rounded-full flex-shrink-0 group-hover:rotate-12 transition-transform duration-200`}>
                  <stat.icon className="h-4 w-4 md:h-6 md:w-6 text-white" />
                </div>
                <div>
                  <div className="text-xl md:text-2xl font-bold">{stat.value}</div>
                  <div className="text-xs md:text-sm opacity-90">{stat.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Enhanced Live Results Ticker */}
      <div className="bg-cv-dark text-white py-2 md:py-3 overflow-hidden">
        <div className="cv-container">
          <div className="flex items-center">
            <span className="bg-cv-red px-2 md:px-3 py-1 text-xs md:text-sm font-bold rounded mr-3 md:mr-4 flex-shrink-0 animate-pulse">
              AO VIVO
            </span>
            <div className="flex-1 overflow-hidden">
              <div className="animate-scroll-left whitespace-nowrap">
                <span className="text-xs md:text-sm">
                  ABC 78 - 65 Seven Stars • Académica 72 - 68 Inter • Spartak 85 - 79 Unidos • Mindelo 91 - 88 Praia
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
});

Hero.displayName = 'Hero';

export default Hero;
