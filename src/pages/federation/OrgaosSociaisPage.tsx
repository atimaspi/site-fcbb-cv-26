
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const OrgaosSociaisPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow cv-container py-8">
        <h1 className="section-title">Orgãos Sociais</h1>
        
        <div className="mt-8 space-y-8">
          <section>
            <h2 className="text-xl font-bold text-cv-blue mb-4">Direção</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { name: "Pedro Almeida", role: "Presidente", image: "https://via.placeholder.com/150" },
                { name: "Ana Lopes", role: "Vice-Presidente", image: "https://via.placeholder.com/150" },
                { name: "João Silva", role: "Secretário Geral", image: "https://via.placeholder.com/150" },
                { name: "Maria Costa", role: "Tesoureira", image: "https://via.placeholder.com/150" }
              ].map((member, index) => (
                <div key={index} className="flex items-center bg-white p-4 rounded-lg shadow-sm">
                  <img 
                    src={member.image} 
                    alt={member.name} 
                    className="w-16 h-16 rounded-full object-cover mr-4" 
                  />
                  <div>
                    <h3 className="font-semibold">{member.name}</h3>
                    <p className="text-gray-600 text-sm">{member.role}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
          
          <section>
            <h2 className="text-xl font-bold text-cv-blue mb-4">Assembleia Geral</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { name: "Carlos Santos", role: "Presidente", image: "https://via.placeholder.com/150" },
                { name: "Luísa Tavares", role: "Vice-Presidente", image: "https://via.placeholder.com/150" },
                { name: "António Rodrigues", role: "Secretário", image: "https://via.placeholder.com/150" }
              ].map((member, index) => (
                <div key={index} className="flex items-center bg-white p-4 rounded-lg shadow-sm">
                  <img 
                    src={member.image} 
                    alt={member.name} 
                    className="w-16 h-16 rounded-full object-cover mr-4" 
                  />
                  <div>
                    <h3 className="font-semibold">{member.name}</h3>
                    <p className="text-gray-600 text-sm">{member.role}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
          
          <section>
            <h2 className="text-xl font-bold text-cv-blue mb-4">Conselho Fiscal</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { name: "Paulo Mendes", role: "Presidente", image: "https://via.placeholder.com/150" },
                { name: "Carla Sousa", role: "Vogal", image: "https://via.placeholder.com/150" },
                { name: "Fernando Monteiro", role: "Vogal", image: "https://via.placeholder.com/150" }
              ].map((member, index) => (
                <div key={index} className="flex items-center bg-white p-4 rounded-lg shadow-sm">
                  <img 
                    src={member.image} 
                    alt={member.name} 
                    className="w-16 h-16 rounded-full object-cover mr-4" 
                  />
                  <div>
                    <h3 className="font-semibold">{member.name}</h3>
                    <p className="text-gray-600 text-sm">{member.role}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default OrgaosSociaisPage;
