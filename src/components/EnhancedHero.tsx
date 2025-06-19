
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Play, ArrowDown } from 'lucide-react';
import { Link } from 'react-router-dom';

const EnhancedHero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      id: 1,
      image: "https://images.unsplash.com/photo-1546519638-68e109498ffc",
      title: "Cabo Verde no Cenário Internacional",
      subtitle: "Seleção Nacional conquista histórica vitória",
      description: "A nossa seleção nacional alcança novo patamar competitivo com performance exemplar no AfroBasket 2024, colocando Cabo Verde no mapa do basquetebol africano.",
      cta: "Ver Conquistas",
      link: "/selecoes/masculina"
    },
    {
      id: 2,
      image: "https://images.unsplash.com/photo-1574623452334-1e0ac2b3ccb4",
      title: "Liga Nacional 2024/25",
      subtitle: "O melhor do basquetebol cabo-verdiano",
      description: "Acompanhe a emocionante temporada com 12 equipas disputando o título nacional. Novos talentos, jogos espetaculares e a paixão pelo basquetebol.",
      cta: "Classificações",
      link: "/competicoes/nacional-masculino"
    },
    {
      id: 3,
      image: "https://images.unsplash.com/photo-1552847661-dddc6d9e71ba",
      title: "Formação e Desenvolvimento",
      subtitle: "Construindo o futuro do basquetebol",
      description: "Programas inovadores de formação em todas as ilhas, desenvolvendo jovens talentos e promovendo a inclusão através do desporto.",
      cta: "Programas",
      link: "/formacao"
    }
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  useEffect(() => {
    const timer = setInterval(nextSlide, 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative h-screen overflow-hidden">
      {/* Background Slides */}
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentSlide ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <div 
            className="w-full h-full bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url(${slide.image})` }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />
        </div>
      ))}

      {/* Content Overlay */}
      <div className="relative z-10 h-full flex items-center">
        <div className="cv-container">
          <div className="max-w-3xl">
            {/* Animated Badge */}
            <div className="mb-6 floating-animation">
              <span className="glass-card px-4 py-2 text-white font-medium rounded-full backdrop-blur-md">
                {slides[currentSlide].subtitle}
              </span>
            </div>

            {/* Main Title with Gradient */}
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
              <span className="text-white block mb-2">
                {slides[currentSlide].title.split(' ').slice(0, 2).join(' ')}
              </span>
              <span className="gradient-text block">
                {slides[currentSlide].title.split(' ').slice(2).join(' ')}
              </span>
            </h1>

            {/* Description */}
            <p className="text-lg md:text-xl text-gray-200 mb-8 max-w-2xl leading-relaxed">
              {slides[currentSlide].description}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <Button 
                size="lg" 
                className="glass-card bg-cv-blue/80 hover:bg-cv-blue text-white border-0 hover-glow px-8 py-4 text-lg"
                asChild
              >
                <Link to={slides[currentSlide].link}>
                  {slides[currentSlide].cta}
                </Link>
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="glass-card text-white border-white/30 hover:bg-white/10 px-8 py-4 text-lg"
              >
                <Play className="mr-2 h-5 w-5" />
                Assistir Vídeo
              </Button>
            </div>

            {/* Scroll Indicator */}
            <div className="hidden md:flex items-center text-white/70 animate-bounce">
              <span className="mr-2 text-sm">Descubra mais</span>
              <ArrowDown className="h-4 w-4" />
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Controls */}
      <button
        onClick={prevSlide}
        className="absolute left-6 top-1/2 -translate-y-1/2 glass-card p-3 text-white hover-glow rounded-full"
        aria-label="Slide anterior"
      >
        <ChevronLeft className="h-6 w-6" />
      </button>
      
      <button
        onClick={nextSlide}
        className="absolute right-6 top-1/2 -translate-y-1/2 glass-card p-3 text-white hover-glow rounded-full"
        aria-label="Próximo slide"
      >
        <ChevronRight className="h-6 w-6" />
      </button>

      {/* Slide Indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex space-x-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`transition-all duration-300 rounded-full ${
              index === currentSlide 
                ? 'w-12 h-3 bg-white' 
                : 'w-3 h-3 bg-white/50 hover:bg-white/75'
            }`}
            aria-label={`Ir para slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
};

export default EnhancedHero;
