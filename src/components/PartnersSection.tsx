
import { Handshake } from "lucide-react";

const PartnersSection = () => {
  const partners = [
    {
      id: 1, 
      name: "Parceiro 1",
      logo: "https://images.unsplash.com/photo-1604076913837-52ab5629fba9?q=80&w=1974&auto=format"
    },
    {
      id: 2, 
      name: "Parceiro 2",
      logo: "https://images.unsplash.com/photo-1604076913837-52ab5629fba9?q=80&w=1974&auto=format"
    },
    {
      id: 3, 
      name: "Parceiro 3",
      logo: "https://images.unsplash.com/photo-1604076913837-52ab5629fba9?q=80&w=1974&auto=format"
    },
    {
      id: 4, 
      name: "Parceiro 4",
      logo: "https://images.unsplash.com/photo-1604076913837-52ab5629fba9?q=80&w=1974&auto=format"
    }
  ];

  return (
    <section className="py-12 bg-gray-50">
      <div className="cv-container">
        <h2 className="section-title flex items-center">
          <Handshake className="mr-2 text-cv-blue" /> Parceiros Oficiais
        </h2>
        
        <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-8">
          {partners.map(partner => (
            <div key={partner.id} className="bg-white p-6 rounded-lg shadow flex items-center justify-center hover:shadow-lg transition-shadow">
              <img 
                src={partner.logo} 
                alt={partner.name} 
                className="max-h-16 max-w-full object-contain filter grayscale hover:grayscale-0 transition-all"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PartnersSection;
