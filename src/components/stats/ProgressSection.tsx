
import { motion } from 'framer-motion';
import { Card, CardContent } from "@/components/ui/card";

interface ProgressSectionProps {
  isInView: boolean;
  stats: {
    completedGames: number;
    totalGames: number;
  };
}

export const ProgressSection = ({ isInView, stats }: ProgressSectionProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: 0.8 }}
      className="mt-20"
    >
      <Card className="bg-gradient-to-r from-cv-blue via-cv-blue to-cv-red text-white overflow-hidden">
        <CardContent className="p-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="relative">
              <h3 className="text-3xl font-bold mb-3 font-display">Época 2024/25</h3>
              <p className="text-xl opacity-90 mb-4">
                {Math.round((stats.completedGames / stats.totalGames) * 100)}% Completa
              </p>
              <div className="bg-white/20 rounded-full h-3 overflow-hidden">
                <motion.div 
                  className="bg-cv-yellow h-3 rounded-full"
                  initial={{ width: 0 }}
                  animate={isInView ? { width: `${(stats.completedGames / stats.totalGames) * 100}%` } : {}}
                  transition={{ duration: 2, delay: 1 }}
                />
              </div>
            </div>
            
            <div className="relative">
              <h3 className="text-3xl font-bold mb-3 font-display">Participação</h3>
              <p className="text-xl opacity-90 mb-4">
                Crescimento de 12% em atletas federados
              </p>
              <div className="bg-white/20 rounded-full h-3 overflow-hidden">
                <motion.div 
                  className="bg-cv-yellow h-3 rounded-full"
                  initial={{ width: 0 }}
                  animate={isInView ? { width: '78%' } : {}}
                  transition={{ duration: 2, delay: 1.2 }}
                />
              </div>
            </div>
            
            <div className="relative">
              <h3 className="text-3xl font-bold mb-3 font-display">Cobertura</h3>
              <p className="text-xl opacity-90 mb-4">
                Presente em todas as 9 ilhas de Cabo Verde
              </p>
              <div className="bg-white/20 rounded-full h-3 overflow-hidden">
                <motion.div 
                  className="bg-cv-yellow h-3 rounded-full"
                  initial={{ width: 0 }}
                  animate={isInView ? { width: '100%' } : {}}
                  transition={{ duration: 2, delay: 1.4 }}
                />
              </div>
            </div>
          </div>

          {/* Decorative Elements */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-cv-yellow/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-cv-red/10 rounded-full blur-2xl" />
        </CardContent>
      </Card>
    </motion.div>
  );
};
