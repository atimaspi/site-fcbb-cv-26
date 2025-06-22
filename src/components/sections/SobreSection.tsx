
import { motion } from 'framer-motion';
import { Trophy, Users, MapPin, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';

const SobreSection = () => {
  const stats = [
    { icon: Trophy, label: "Clubes Licenciados", value: "24", color: "text-cv-accent" },
    { icon: Users, label: "Atletas Federados", value: "1,250+", color: "text-cv-primary" },
    { icon: MapPin, label: "Ilhas Participantes", value: "9", color: "text-cv-secondary" },
    { icon: Calendar, label: "Anos de História", value: "45+", color: "text-cv-accent" }
  ];

  return (
    <section id="sobre" className="py-20 bg-gray-50">
      <div className="cv-container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-cv-primary mb-6 font-display">
              Sobre a FCBB
            </h2>
            <p className="text-lg text-gray-700 mb-6 leading-relaxed">
              A Federação Cabo-verdiana de Basquetebol é a entidade responsável pelo desenvolvimento 
              e promoção do basquetebol em todo o arquipélago de Cabo Verde.
            </p>
            <p className="text-lg text-gray-700 mb-8 leading-relaxed">
              Desde a nossa fundação, temos trabalhado incansavelmente para elevar o nível do 
              basquetebol nacional, promovendo a formação de jovens talentos e a competitividade 
              das nossas equipas a nível internacional.
            </p>
            <Button 
              size="lg" 
              className="bg-cv-primary hover:bg-cv-primary/90 text-white px-8 py-4 font-semibold transform hover:scale-105 transition-all duration-300"
            >
              Conhecer História
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="grid grid-cols-2 gap-6">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 * index }}
                  viewport={{ once: true }}
                  className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300"
                >
                  <div className={`${stat.color} mb-4`}>
                    <stat.icon className="h-8 w-8" />
                  </div>
                  <div className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</div>
                  <div className="text-sm text-gray-600">{stat.label}</div>
                </motion.div>
              ))}
            </div>
            
            {/* Floating decoration */}
            <motion.div
              className="absolute -top-4 -right-4 w-20 h-20 bg-cv-secondary/20 rounded-full blur-xl"
              animate={{ 
                scale: [1, 1.2, 1],
                opacity: [0.5, 0.8, 0.5]
              }}
              transition={{ 
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default SobreSection;
