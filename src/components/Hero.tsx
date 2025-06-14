
import { useState, useEffect, useMemo, memo } from 'react';
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Play, Calendar, Trophy, Users } from 'lucide-react';
import { Link } from 'react-router-dom';

const Hero = memo(() => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = useMemo(() => [
    {
      id: 1,
      image: "https://images.unsplash.com/photo-1546519638-68e109498ffc?auto=format&fit=crop&w=1920&h=1080&q=80",
      title: "Seleção Nacional conquista histórica vitória no AfroBasket",
      subtitle: "Cabo Verde marca presença no cenário internacional",
      description: "A nossa seleção nacional masculina alcança novo patamar competitivo com performance exemplar no AfroBasket 2024.",
      cta: "Ver Resultados",
      link: "/resultados"
    },
    {
      id: 2,
      image: "https://images.unsplash.com/photo-1574623452334-1e0ac2b3ccb4?auto=format&fit=crop&w=1920&h=1080&q=80",
      title: "Liga Nacional 2024/25 arranca em grande",
      subtitle: "12 equipas disputam o título nacional",
      description: "A nova época da Liga Nacional promete ser emocionante com clubes renovados e jovens talentos em destaque.",
      cta: "Classificações",
      link: "/competicoes/classificacoes"
    },
    {
      id: 3,
      image: "https://images.unsplash.com/photo-1552847661-dddc6d9e71ba?auto=format&fit=crop&w=1920&h=1080&q=80",
      title: "Desenvolvimento do Basquetebol Feminino",
      subtitle: "Programa especial de formação",
      description: "FCBB lança programa inovador para promover e desenvolver o basquetebol feminino em todas as ilhas.",
      cta: "Saber Mais",
      link: "/selecoes/senior-feminina"
    }
  ], []);

  const quickStats = useMemo(() => [
    { icon: Trophy, label: "Clubes Licenciados", value: "24" },
    { icon: Users, label: "Atletas Federados", value: "1,250+" },
    { icon: Calendar, label: "Jogos por Época", value: "180+" }
  ], []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <section className="relative">
      {/* Main Hero Slider */}
      <div className="relative h-[70vh] overflow-hidden">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-transform duration-700 ease-in-out ${
              index === currentSlide ? 'translate-x-0' : 
              index < currentSlide ? '-translate-x-full' : 'translate-x-full'
            }`}
          >
            <div className="relative h-full">
              <img
                src={slide.image}
                alt={slide.title}
                className="w-full h-full object-cover"
                loading={index === 0 ? 'eager' : 'lazy'}
                decoding="async"
              />
              <div className="absolute inset-0 bg-black bg-opacity-50"></div>
              
              <div className="absolute inset-0 flex items-center">
                <div className="cv-container">
                  <div className="max-w-2xl text-white">
                    <span className="inline-block px-3 py-1 bg-cv-red text-sm font-medium rounded-full mb-4">
                      {slide.subtitle}
                    </span>
                    <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
                      {slide.title}
                    </h1>
                    <p className="text-xl mb-6 text-gray-200">
                      {slide.description}
                    </p>
                    <div className="flex space-x-4">
                      <Button size="lg" className="bg-cv-blue hover:bg-blue-700" asChild>
                        <Link to={slide.link}>{slide.cta}</Link>
                      </Button>
                      <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-cv-dark">
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

        {/* Navigation arrows */}
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 hover:bg-opacity-70 text-white p-3 rounded-full transition-all"
          aria-label="Slide anterior"
        >
          <ChevronLeft className="h-6 w-6" />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 hover:bg-opacity-70 text-white p-3 rounded-full transition-all"
          aria-label="Próximo slide"
        >
          <ChevronRight className="h-6 w-6" />
        </button>

        {/* Slide indicators */}
        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-all ${
                index === currentSlide ? 'bg-white' : 'bg-white bg-opacity-50'
              }`}
              aria-label={`Ir para slide ${index + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Quick Stats Bar */}
      <div className="bg-cv-blue text-white py-6">
        <div className="cv-container">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {quickStats.map((stat, index) => (
              <div key={index} className="flex items-center justify-center md:justify-start space-x-3">
                <div className="bg-cv-red p-3 rounded-full">
                  <stat.icon className="h-6 w-6" />
                </div>
                <div>
                  <div className="text-2xl font-bold">{stat.value}</div>
                  <div className="text-sm opacity-90">{stat.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Latest Results ticker */}
      <div className="bg-cv-dark text-white py-3">
        <div className="cv-container">
          <div className="flex items-center">
            <span className="bg-cv-red px-3 py-1 text-sm font-bold rounded mr-4">AO VIVO</span>
            <div className="flex-1 overflow-hidden">
              <div className="animate-slide-in">
                <span className="text-sm">
                  ABC 78 - 65 Seven Stars • Académica 72 - 68 Inter • Spartak 85 - 79 Unidos
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
