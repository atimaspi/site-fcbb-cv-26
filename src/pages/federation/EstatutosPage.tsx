
import PageLayout from '../PageLayout';

const EstatutosPage = () => {
  return (
    <PageLayout title="Estatutos">
      <div className="prose max-w-none mt-8">
        <p className="mb-4 text-gray-700">
          Os estatutos da Federação Cabo-verdiana de Basquetebol (FCBB) definem a sua organização, funcionamento e objectivos.
        </p>
        
        <div className="bg-white p-6 rounded-lg shadow-md mt-6">
          <h2 className="text-xl font-bold text-cv-blue mb-4">Capítulo I - Disposições Gerais</h2>
          
          <h3 className="font-semibold mt-4 mb-2">Artigo 1.º - Natureza e Sede</h3>
          <p className="text-gray-700 mb-3">
            1. A Federação Cabo-verdiana de Basquetebol, adiante designada por FCBB, é uma pessoa coletiva de direito privado, constituída sob a forma de associação sem fins lucrativos.
          </p>
          <p className="text-gray-700 mb-3">
            2. A FCBB tem a sua sede na cidade da Praia, ilha de Santiago.
          </p>
          
          <h3 className="font-semibold mt-4 mb-2">Artigo 2.º - Objeto</h3>
          <p className="text-gray-700 mb-3">
            1. A FCBB tem por objeto promover, regulamentar e dirigir a nível nacional a prática do basquetebol.
          </p>
          <p className="text-gray-700 mb-3">
            2. A FCBB representa o basquetebol cabo-verdiano junto das organizações desportivas internacionais.
          </p>
          
          <h3 className="font-semibold mt-4 mb-2">Artigo 3.º - Composição</h3>
          <p className="text-gray-700 mb-3">
            1. A FCBB é composta pelos clubes ou sociedades com fins desportivos, associações de âmbito territorial, associações de praticantes, treinadores e árbitros, ou agentes desportivos.
          </p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md mt-6">
          <h2 className="text-xl font-bold text-cv-blue mb-4">Capítulo II - Dos Associados</h2>
          
          <h3 className="font-semibold mt-4 mb-2">Artigo 4.º - Categorias de Associados</h3>
          <p className="text-gray-700 mb-3">
            1. A FCBB tem as seguintes categorias de associados:
          </p>
          <ol className="list-decimal list-inside ml-4 text-gray-700 mb-3">
            <li>Associados ordinários;</li>
            <li>Associados de mérito;</li>
            <li>Associados honorários.</li>
          </ol>
          
          <h3 className="font-semibold mt-4 mb-2">Artigo 5.º - Direitos e Deveres</h3>
          <p className="text-gray-700 mb-3">
            1. São direitos dos associados ordinários:
          </p>
          <ol className="list-decimal list-inside ml-4 text-gray-700 mb-3">
            <li>Participar nas assembleias gerais;</li>
            <li>Eleger e ser eleito para os órgãos sociais;</li>
            <li>Participar nas competições oficiais organizadas pela FCBB.</li>
          </ol>
          <p className="text-gray-700 mb-3">
            2. São deveres dos associados ordinários:
          </p>
          <ol className="list-decimal list-inside ml-4 text-gray-700 mb-3">
            <li>Cumprir os estatutos e regulamentos da FCBB;</li>
            <li>Pagar as quotas e outras contribuições que forem fixadas;</li>
            <li>Acatar as deliberações dos órgãos sociais.</li>
          </ol>
        </div>
        
        <div className="mt-6 flex justify-center">
          <a 
            href="#" 
            className="bg-cv-blue hover:bg-blue-700 text-white font-bold py-2 px-6 rounded inline-flex items-center"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            Download dos Estatutos (PDF)
          </a>
        </div>
      </div>
    </PageLayout>
  );
};

export default EstatutosPage;
