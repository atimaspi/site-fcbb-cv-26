
import PageLayout from '../PageLayout';

const SelecoesJovensPage = () => {
  return (
    <PageLayout title="Seleções Jovens">
      <div className="prose max-w-none mt-8">
        <p className="mb-4 text-gray-700">
          As Seleções Jovens de Cabo Verde representam o futuro do basquetebol nacional.
        </p>
        
        {/* Placeholder content */}
        <div className="bg-white p-6 rounded-lg shadow-md mt-6">
          <h2 className="text-xl font-bold text-cv-blue mb-4">Categorias</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
            {[
              {title: "Sub-18 Masculino", desc: "Equipa de desenvolvimento para futuros jogadores da seleção principal."},
              {title: "Sub-18 Feminino", desc: "Equipa de desenvolvimento para futuras jogadoras da seleção principal."},
              {title: "Sub-16 Masculino", desc: "Formação de base para jovens talentos masculinos."},
              {title: "Sub-16 Feminino", desc: "Formação de base para jovens talentos femininos."}
            ].map((category, index) => (
              <div key={index} className="border p-4 rounded">
                <h3 className="font-semibold">{category.title}</h3>
                <p className="text-gray-600 text-sm mt-2">{category.desc}</p>
                <a href="#" className="text-cv-blue text-sm hover:underline mt-2 inline-block">Ver mais</a>
              </div>
            ))}
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default SelecoesJovensPage;
