
import PageLayout from '../PageLayout';

const CompeticoesRegionaisPage = () => {
  return (
    <PageLayout title="Competições Regionais">
      <div className="prose max-w-none mt-8">
        <p className="mb-4 text-gray-700">
          As competições regionais são organizadas pelas associações regionais de basquetebol, sob a supervisão da Federação Cabo-verdiana de Basquetebol.
        </p>
        
        {/* Placeholder content */}
        <div className="bg-white p-6 rounded-lg shadow-md mt-6">
          <h2 className="text-xl font-bold text-cv-blue mb-4">Regiões</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              "Santiago Norte", 
              "Santiago Sul", 
              "São Vicente", 
              "Santo Antão", 
              "Sal", 
              "Fogo"
            ].map((region, index) => (
              <div key={index} className="border p-4 rounded hover:bg-gray-50">
                <h3 className="font-semibold">{region}</h3>
                <a href="#" className="text-cv-blue text-sm hover:underline">Ver competições</a>
              </div>
            ))}
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default CompeticoesRegionaisPage;
