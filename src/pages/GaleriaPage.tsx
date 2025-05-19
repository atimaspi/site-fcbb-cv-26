
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const GaleriaPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow cv-container py-8">
        <h1 className="section-title">Galeria</h1>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-8">
          {/* Gallery items */}
          {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
            <div key={item} className="relative group overflow-hidden rounded-lg shadow-md">
              <img 
                src={`https://via.placeholder.com/300x300?text=Galeria+${item}`} 
                alt={`Galeria ${item}`} 
                className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-105" 
              />
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-opacity duration-300 flex items-end">
                <div className="p-4 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                  <h3 className="font-medium text-lg">Evento de Basquetebol {item}</h3>
                  <p className="text-sm opacity-90">Abril 2025</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default GaleriaPage;
