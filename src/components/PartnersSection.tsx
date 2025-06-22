
import { motion } from 'framer-motion';

const PartnersSection = () => {
  const partners = [
    {
      name: "FIBA",
      logo: "https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?w=200&h=100&fit=crop",
      category: "Organização Internacional"
    },
    {
      name: "FIBA África",
      logo: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=200&h=100&fit=crop",
      category: "Organização Continental"
    },
    {
      name: "COC - Comité Olímpico",
      logo: "https://images.unsplash.com/photo-1518611012118-696072aa579a?w=200&h=100&fit=crop",
      category: "Organização Nacional"
    },
    {
      name: "Governo de Cabo Verde",
      logo: "https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=200&h=100&fit=crop",
      category: "Apoio Institucional"
    },
    {
      name: "Câmara Municipal da Praia",
      logo: "https://images.unsplash.com/photo-1583291263867-45d5d4d2e0a0?w=200&h=100&fit=crop",
      category: "Apoio Municipal"
    },
    {
      name: "Banco Comercial do Atlântico",
      logo: "https://images.unsplash.com/photo-1541354329998-f4d9a9f9297f?w=200&h=100&fit=crop",
      category: "Parceiro Financeiro"
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="cv-container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-cv-primary mb-4 font-display">
            Nossos Parceiros
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Trabalhamos em conjunto com organizações nacionais e internacionais 
            para promover o desenvolvimento do basquetebol cabo-verdiano
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
          {partners.map((partner, index) => (
            <motion.div
              key={partner.name}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05, y: -5 }}
              className="group"
            >
              <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 group-hover:border-cv-primary/20">
                <div className="aspect-[2/1] mb-4 overflow-hidden rounded-lg bg-gray-50 flex items-center justify-center">
                  <img
                    src={partner.logo}
                    alt={`Logo ${partner.name}`}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
                <h3 className="font-semibold text-cv-primary text-center mb-2 group-hover:text-cv-accent transition-colors">
                  {partner.name}
                </h3>
                <p className="text-xs text-gray-500 text-center">
                  {partner.category}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <div className="bg-gradient-to-r from-cv-primary to-cv-accent p-8 rounded-2xl text-white">
            <h3 className="text-2xl font-bold mb-4 font-display">
              Seja Nosso Parceiro
            </h3>
            <p className="mb-6 opacity-90">
              Junte-se a nós no desenvolvimento do basquetebol cabo-verdiano. 
              Contacte-nos para saber mais sobre oportunidades de parceria.
            </p>
            <button className="bg-cv-secondary text-cv-primary px-8 py-3 rounded-lg font-semibold hover:bg-cv-secondary/90 transition-colors transform hover:scale-105 duration-200">
              Contactar para Parcerias
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default PartnersSection;
