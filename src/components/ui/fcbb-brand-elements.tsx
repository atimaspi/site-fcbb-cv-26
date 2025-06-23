
import { motion } from 'framer-motion';
import { Trophy, Target, Users, Globe } from 'lucide-react';

export const FCBBLogo = ({ size = 'md', className = '' }: { size?: 'sm' | 'md' | 'lg', className?: string }) => {
  const sizeClasses = {
    sm: 'h-8 w-auto',
    md: 'h-12 w-auto',
    lg: 'h-16 w-auto'
  };

  return (
    <motion.img 
      src="/lovable-uploads/8c0e50b0-b06a-42cf-b3fc-9a08063308b3.png" 
      alt="FCBB Logo" 
      className={`${sizeClasses[size]} ${className}`}
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.2 }}
    />
  );
};

export const FCBBBrandPattern = () => {
  return (
    <div className="absolute inset-0 opacity-5 pointer-events-none">
      <div className="absolute top-10 right-10 w-32 h-32 border-4 border-current rounded-full animate-pulse" />
      <div className="absolute bottom-20 left-10 w-24 h-24 border-2 border-current rounded-full animate-pulse" style={{ animationDelay: '1s' }} />
      <div className="absolute top-1/3 left-1/3 w-16 h-16 border-2 border-current rounded-full animate-pulse" style={{ animationDelay: '2s' }} />
      <div className="absolute bottom-1/3 right-1/4 w-20 h-20 border-3 border-current rounded-full animate-pulse" style={{ animationDelay: '3s' }} />
    </div>
  );
};

export const FCBBStatsCard = ({ 
  icon: Icon, 
  number, 
  label, 
  gradient = 'from-cv-blue to-blue-600',
  delay = 0 
}: {
  icon: any;
  number: string;
  label: string;
  gradient?: string;
  delay?: number;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.6 }}
      className="group p-6 backdrop-blur-xl bg-white/95 border border-gray-200 rounded-2xl hover:shadow-2xl transition-all duration-500 hover:scale-105 cursor-pointer"
    >
      <div className={`w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br ${gradient} flex items-center justify-center group-hover:rotate-12 transition-transform duration-300 shadow-lg`}>
        <Icon className="h-8 w-8 text-white" />
      </div>
      <div className="text-4xl font-bold mb-2 bg-gradient-to-br from-cv-blue to-blue-600 bg-clip-text text-transparent">
        {number}
      </div>
      <div className="text-sm text-gray-600 font-medium leading-tight text-center">
        {label}
      </div>
    </motion.div>
  );
};

export const FCBBSectionHeader = ({ 
  title, 
  subtitle, 
  description,
  centered = true 
}: {
  title: string;
  subtitle?: string;
  description?: string;
  centered?: boolean;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className={`mb-12 ${centered ? 'text-center' : ''}`}
    >
      {subtitle && (
        <span className="inline-block px-4 py-2 bg-cv-yellow/20 text-cv-blue font-bold text-sm uppercase tracking-wider rounded-full border border-cv-yellow/30 mb-4">
          {subtitle}
        </span>
      )}
      <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-cv-blue mb-4 font-display">
        {title}
      </h2>
      {description && (
        <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
          {description}
        </p>
      )}
    </motion.div>
  );
};

export const FCBBButton = ({ 
  variant = 'primary',
  size = 'md',
  children,
  className = '',
  ...props
}: {
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  className?: string;
  [key: string]: any;
}) => {
  const baseClasses = "inline-flex items-center justify-center font-bold transition-all duration-300 rounded-xl transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2";
  
  const variantClasses = {
    primary: "bg-gradient-to-r from-cv-yellow to-yellow-400 text-cv-blue hover:from-yellow-400 hover:to-cv-yellow shadow-lg hover:shadow-yellow-500/25",
    secondary: "bg-gradient-to-r from-cv-blue to-blue-600 text-white hover:from-blue-600 hover:to-cv-blue shadow-lg hover:shadow-blue-500/25",
    outline: "border-2 border-cv-blue text-cv-blue hover:bg-cv-blue hover:text-white backdrop-blur-sm"
  };
  
  const sizeClasses = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg"
  };

  return (
    <motion.button
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.98 }}
      {...props}
    >
      {children}
    </motion.button>
  );
};
