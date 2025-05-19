
import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Slide {
  id: number;
  title: string;
  subtitle: string;
  image: string;
  link: string;
}

const Hero = () => {
  const slides: Slide[] = [
    {
      id: 1,
      title: "Liga Nacional de Basquetebol 2025",
      subtitle: "Os melhores jogos do basquetebol cabo-verdiano",
      image: "https://images.unsplash.com/photo-1608245449230-4ac19066d2d0?q=80&w=1974&auto=format",
      link: "#"
    },
    {
      id: 2,
      title: "Seleção Nacional em Preparação",
      subtitle: "Rumo ao AfroBasket 2025",
      image: "https://images.unsplash.com/photo-1518407613690-d9fc990e795f?q=80&w=1974&auto=format",
      link: "#"
    },
    {
      id: 3,
      title: "Campeonato Sub-18",
      subtitle: "Formando as novas estrelas do basquetebol cabo-verdiano",
      image: "https://images.unsplash.com/photo-1519861531473-9200262188bf?q=80&w=2071&auto=format",
      link: "#"
    }
  ];

  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative h-[400px] md:h-[500px] overflow-hidden">
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentSlide ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <div 
            className="w-full h-full bg-center bg-cover"
            style={{ backgroundImage: `url(${slide.image})` }}
          >
            <div className="absolute inset-0 bg-black bg-opacity-40"></div>
            <div className="cv-container h-full flex flex-col justify-center items-start text-white relative z-10">
              <h2 className="text-3xl md:text-5xl font-bold mb-2 animate-fade-in">{slide.title}</h2>
              <p className="text-xl md:text-2xl mb-6 animate-fade-in">{slide.subtitle}</p>
              <Button className="bg-cv-red hover:bg-red-700">Saber Mais</Button>
            </div>
          </div>
        </div>
      ))}

      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-black bg-opacity-30 p-2 rounded-full text-white hover:bg-opacity-50 transition-all z-20"
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-black bg-opacity-30 p-2 rounded-full text-white hover:bg-opacity-50 transition-all z-20"
        aria-label="Next slide"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2 z-20">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full ${
              index === currentSlide ? 'bg-cv-red' : 'bg-white bg-opacity-50'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          ></button>
        ))}
      </div>
    </div>
  );
};

export default Hero;
