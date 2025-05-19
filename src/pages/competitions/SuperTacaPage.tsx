
import PageLayout from '../PageLayout';

const SuperTacaPage = () => {
  return (
    <PageLayout title="Super Taça">
      <div className="prose max-w-none mt-8">
        <p className="mb-4 text-gray-700">
          A Super Taça de Cabo Verde é uma competição que marca o início da temporada, colocando frente a frente o campeão nacional e o vencedor da Taça de Cabo Verde da época anterior.
        </p>
        
        {/* Placeholder content */}
        <div className="bg-white p-6 rounded-lg shadow-md mt-6">
          <h2 className="text-xl font-bold text-cv-blue mb-4">Últimos Vencedores</h2>
          <ul className="space-y-2">
            {["2024 - ABC", "2023 - Seven Stars", "2022 - Académica", "2021 - Inter", "2020 - ABC"].map((winner, index) => (
              <li key={index} className="p-2 border-b last:border-0">{winner}</li>
            ))}
          </ul>
        </div>
      </div>
    </PageLayout>
  );
};

export default SuperTacaPage;
