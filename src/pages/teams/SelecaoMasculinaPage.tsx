
import PageLayout from '../PageLayout';

const SelecaoMasculinaPage = () => {
  return (
    <PageLayout title="Seleção Masculina">
      <div className="prose max-w-none mt-8">
        <p className="mb-4 text-gray-700">
          A Seleção Masculina de Basquetebol de Cabo Verde representa o país em competições internacionais de basquetebol.
        </p>
        
        {/* Placeholder content */}
        <div className="bg-white p-6 rounded-lg shadow-md mt-6">
          <h2 className="text-xl font-bold text-cv-blue mb-4">Plantel Atual</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[...Array(12)].map((_, index) => (
              <div key={index} className="border p-4 rounded flex items-center">
                <div className="w-16 h-16 bg-gray-200 rounded-full mr-4"></div>
                <div>
                  <h3 className="font-semibold">Jogador {index + 1}</h3>
                  <p className="text-gray-600 text-sm">Posição: {["Base", "Extremo", "Poste"][index % 3]}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default SelecaoMasculinaPage;
