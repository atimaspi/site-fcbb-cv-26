
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const HistoriaPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow cv-container py-8">
        <h1 className="section-title">História da Federação</h1>
        
        <div className="prose max-w-none mt-8">
          <p className="mb-4 text-gray-700">
            A Federação Cabo-verdiana de Basquetebol (FCBB) foi fundada em 1986, após a independência de Cabo Verde. Desde então, tem sido a entidade responsável pela organização e promoção do basquetebol no país.
          </p>
          
          <h2 className="text-xl font-bold mt-6 mb-3 text-cv-blue">Os primeiros anos</h2>
          <p className="mb-4 text-gray-700">
            Nos primeiros anos após a sua fundação, a FCBB concentrou-se principalmente na organização de competições locais e no desenvolvimento de infra-estruturas para a prática do basquetebol. O primeiro campeonato nacional foi realizado em 1987, com a participação de equipas das principais ilhas.
          </p>
          
          <h2 className="text-xl font-bold mt-6 mb-3 text-cv-blue">Desenvolvimento Internacional</h2>
          <p className="mb-4 text-gray-700">
            A partir dos anos 90, a FCBB começou a participar em competições internacionais, incluindo os Jogos da CPLP e os campeonatos africanos. Em 2007, Cabo Verde participou pela primeira vez na fase final do Afrobasket, marcando um momento histórico para o basquetebol cabo-verdiano.
          </p>
          
          <h2 className="text-xl font-bold mt-6 mb-3 text-cv-blue">Atualidade</h2>
          <p className="mb-4 text-gray-700">
            Atualmente, a FCBB tem trabalhado para desenvolver o basquetebol em todas as ilhas de Cabo Verde, com especial atenção à formação de jovens jogadores e treinadores. A seleção nacional tem conseguido resultados significativos em competições africanas, e vários jogadores cabo-verdianos têm se destacado em ligas estrangeiras.
          </p>
          
          <h2 className="text-xl font-bold mt-6 mb-3 text-cv-blue">Presidentes</h2>
          <ul className="list-disc list-inside mb-6 ml-4 text-gray-700">
            <li>João Silva (1986-1990)</li>
            <li>Carlos Santos (1990-1998)</li>
            <li>António Rodrigues (1998-2006)</li>
            <li>Maria Monteiro (2006-2014)</li>
            <li>Pedro Almeida (2014-presente)</li>
          </ul>
          
          <div className="mt-8 p-6 bg-gray-100 rounded-lg">
            <h3 className="font-semibold text-lg mb-2">Missão da FCBB:</h3>
            <blockquote className="italic text-gray-700">
              "Promover e desenvolver o basquetebol em Cabo Verde, formando atletas e cidadãos, e elevando o nome de Cabo Verde no cenário internacional."
            </blockquote>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default HistoriaPage;
