
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const NoticiasPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow cv-container py-8">
        <h1 className="section-title">Notícias</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          {/* This would typically be dynamically generated from a database */}
          <div className="bg-white rounded-lg overflow-hidden shadow-md">
            <img 
              src="https://via.placeholder.com/400x200" 
              alt="Notícia" 
              className="w-full h-48 object-cover" 
            />
            <div className="p-4">
              <span className="text-sm text-gray-500">05 Mai, 2025</span>
              <h3 className="text-lg font-semibold mt-2">Cabo Verde defronta Angola no AfroBasket 2025</h3>
              <p className="mt-2 text-sm text-gray-600">A seleção cabo-verdiana de basquetebol vai defrontar Angola na fase de qualificação para o AfroBasket 2025.</p>
              <a href="#" className="mt-3 inline-block text-cv-blue font-medium">Ler mais</a>
            </div>
          </div>
          
          <div className="bg-white rounded-lg overflow-hidden shadow-md">
            <img 
              src="https://via.placeholder.com/400x200" 
              alt="Notícia" 
              className="w-full h-48 object-cover" 
            />
            <div className="p-4">
              <span className="text-sm text-gray-500">28 Abr, 2025</span>
              <h3 className="text-lg font-semibold mt-2">Liga Nacional inicia no próximo mês</h3>
              <p className="mt-2 text-sm text-gray-600">A Liga Nacional de Basquetebol iniciará no próximo mês com 12 equipas em competição.</p>
              <a href="#" className="mt-3 inline-block text-cv-blue font-medium">Ler mais</a>
            </div>
          </div>
          
          <div className="bg-white rounded-lg overflow-hidden shadow-md">
            <img 
              src="https://via.placeholder.com/400x200" 
              alt="Notícia" 
              className="w-full h-48 object-cover" 
            />
            <div className="p-4">
              <span className="text-sm text-gray-500">20 Abr, 2025</span>
              <h3 className="text-lg font-semibold mt-2">Workshop para treinadores em São Vicente</h3>
              <p className="mt-2 text-sm text-gray-600">A FCBB organizou um workshop para treinadores em São Vicente com participação internacional.</p>
              <a href="#" className="mt-3 inline-block text-cv-blue font-medium">Ler mais</a>
            </div>
          </div>
          
          {/* Add more news items as needed */}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default NoticiasPage;
