
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from "@/components/ui/card";

interface StatCardProps {
  stat: {
    title: string;
    value: string;
    numericValue: number;
    icon: React.ComponentType<any>;
    color: string;
    bgColor: string;
    gradientFrom: string;
    gradientTo: string;
    change: string;
  };
  index: number;
  isInView: boolean;
}

export const StatCard = ({ stat, index, isInView }: StatCardProps) => {
  const [count, setCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    if (isInView && !hasAnimated) {
      const timer = setTimeout(() => {
        setHasAnimated(true);
        
        const duration = 1500 + index * 200;
        let startTime: number;
        const startCount = 0;
        const targetNum = stat.numericValue;

        const animate = (timestamp: number) => {
          if (!startTime) startTime = timestamp;
          const progress = Math.min((timestamp - startTime) / duration, 1);
          
          const currentCount = Math.floor(progress * (targetNum - startCount) + startCount);
          setCount(currentCount);

          if (progress < 1) {
            requestAnimationFrame(animate);
          }
        };

        requestAnimationFrame(animate);
      }, index * 200);

      return () => clearTimeout(timer);
    }
  }, [isInView, index, stat.numericValue, hasAnimated]);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, y: 30 }}
      animate={isInView ? { opacity: 1, scale: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      whileHover={{ scale: 1.05, y: -10 }}
      className="group"
    >
      <Card className="relative overflow-hidden h-full bg-white/80 backdrop-blur-sm border-0 shadow-xl hover:shadow-2xl transition-all duration-500">
        {/* Gradient Background */}
        <div className={`absolute inset-0 bg-gradient-to-br ${stat.gradientFrom} ${stat.gradientTo} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />
        
        <CardContent className="p-8 relative z-10">
          <div className="flex items-center justify-between mb-6">
            <div className={`p-4 rounded-2xl ${stat.bgColor} group-hover:scale-110 transition-transform duration-300`}>
              <stat.icon className={`w-8 h-8 ${stat.color}`} />
            </div>
            <div className="px-3 py-1 text-xs font-semibold rounded-full bg-gray-100 text-gray-600 group-hover:bg-white group-hover:shadow-md transition-all duration-300">
              {stat.change}
            </div>
          </div>
          
          <div className="text-center">
            <motion.h3 
              className="text-4xl font-bold text-gray-900 mb-3 font-display"
              animate={{ scale: isInView ? [1, 1.1, 1] : 1 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
            >
              {count > 0 ? (
                stat.value.includes('+') ? `${count.toLocaleString()}+` : 
                stat.value.includes(',') ? count.toLocaleString() : 
                count.toString()
              ) : stat.value}
            </motion.h3>
            <p className="text-lg font-semibold text-gray-600 group-hover:text-gray-800 transition-colors duration-300">
              {stat.title}
            </p>
          </div>

          {/* Decorative Element */}
          <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-cv-blue via-cv-yellow to-cv-red opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        </CardContent>
      </Card>
    </motion.div>
  );
};
