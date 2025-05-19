
import PageLayout from '../PageLayout';

const LigaNacionalPage = () => {
  return (
    <PageLayout title="Liga Nacional">
      <div className="prose max-w-none mt-8">
        <p className="mb-4 text-gray-700">
          A Liga Nacional de Basquetebol de Cabo Verde é a principal competição de basquetebol masculino do país, organizada pela Federação Cabo-verdiana de Basquetebol.
        </p>
        
        <div className="bg-white p-6 rounded-lg shadow-md mt-6">
          <h2 className="text-xl font-bold text-cv-blue mb-4">Equipas Participantes</h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {["ABC", "Académica", "Seven Stars", "Atlético", "Celtic", "Desportivo", "Inter", "Juventude", "Oásis"].map((team, index) => (
              <div key={index} className="flex items-center bg-gray-50 p-4 rounded">
                <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center mr-3">
                  {team.charAt(0)}
                </div>
                <span className="font-medium">{team}</span>
              </div>
            ))}
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md mt-6">
          <h2 className="text-xl font-bold text-cv-blue mb-4">Últimos Resultados</h2>
          
          <div className="space-y-4">
            {[1, 2, 3].map((game) => (
              <div key={game} className="flex flex-col sm:flex-row sm:items-center justify-between border-b pb-4">
                <div className="flex-1 flex items-center justify-end">
                  <span className="font-medium mr-2">ABC</span>
                  <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
                </div>
                
                <div className="mx-4 my-2 sm:my-0 flex items-center justify-center">
                  <span className="px-3 py-1 bg-gray-100 rounded font-bold">78 - 72</span>
                </div>
                
                <div className="flex-1 flex items-center">
                  <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
                  <span className="font-medium ml-2">Académica</span>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md mt-6">
          <h2 className="text-xl font-bold text-cv-blue mb-4">Classificação</h2>
          
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white">
              <thead>
                <tr className="bg-gray-100 text-gray-700">
                  <th className="py-2 px-4 text-left">Pos.</th>
                  <th className="py-2 px-4 text-left">Equipa</th>
                  <th className="py-2 px-4 text-center">J</th>
                  <th className="py-2 px-4 text-center">V</th>
                  <th className="py-2 px-4 text-center">D</th>
                  <th className="py-2 px-4 text-center">Pts</th>
                </tr>
              </thead>
              <tbody className="text-gray-700">
                {["ABC", "Académica", "Seven Stars", "Atlético", "Celtic"].map((team, index) => (
                  <tr key={index} className="border-b hover:bg-gray-50">
                    <td className="py-2 px-4">{index + 1}</td>
                    <td className="py-2 px-4 font-medium">{team}</td>
                    <td className="py-2 px-4 text-center">{10}</td>
                    <td className="py-2 px-4 text-center">{10 - index}</td>
                    <td className="py-2 px-4 text-center">{index}</td>
                    <td className="py-2 px-4 text-center font-semibold">{(10 - index) * 2}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default LigaNacionalPage;
