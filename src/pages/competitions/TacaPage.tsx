
import PageLayout from '../PageLayout';

const TacaPage = () => {
  return (
    <PageLayout title="Taça de Cabo Verde">
      <div className="prose max-w-none mt-8">
        <p className="mb-4 text-gray-700">
          A Taça de Cabo Verde é uma competição eliminatória organizada anualmente pela Federação Cabo-verdiana de Basquetebol.
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

export default TacaPage;
