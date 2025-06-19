
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

interface InteractiveCardProps {
  title: string;
  description: string;
  image?: string;
  buttonText?: string;
  onButtonClick?: () => void;
  className?: string;
  variant?: 'glass' | 'neumorphism' | 'default';
}

const InteractiveCard: React.FC<InteractiveCardProps> = ({
  title,
  description,
  image,
  buttonText = "Saber Mais",
  onButtonClick,
  className = "",
  variant = 'default'
}) => {
  const getCardClasses = () => {
    const baseClasses = "group cursor-pointer transition-all duration-300 hover:scale-105 hover-glow";
    
    switch (variant) {
      case 'glass':
        return `${baseClasses} glass-card border-0`;
      case 'neumorphism':
        return `${baseClasses} neumorphism border-0`;
      default:
        return `${baseClasses} shadow-lg hover:shadow-xl`;
    }
  };

  return (
    <Card className={`${getCardClasses()} ${className}`}>
      {image && (
        <div className="overflow-hidden rounded-t-lg">
          <img 
            src={image} 
            alt={title}
            className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
          />
        </div>
      )}
      <CardHeader className="pb-3">
        <CardTitle className="text-xl font-bold text-cv-blue dark:text-cv-yellow group-hover:gradient-text transition-all duration-300">
          {title}
        </CardTitle>
        <CardDescription className="text-gray-600 dark:text-gray-300">
          {description}
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-0">
        <Button 
          onClick={onButtonClick}
          className="w-full bg-cv-blue hover:bg-cv-red transition-all duration-300 group-hover:bg-gradient-to-r group-hover:from-cv-blue group-hover:to-cv-red"
        >
          {buttonText}
          <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
        </Button>
      </CardContent>
    </Card>
  );
};

export default InteractiveCard;
