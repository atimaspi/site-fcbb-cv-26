
import React from 'react';
import { cn } from '@/lib/utils';
import { useResponsive } from '@/hooks/useResponsive';

interface ResponsiveGridProps {
  children: React.ReactNode;
  className?: string;
  cols?: {
    xs?: number;
    sm?: number;
    md?: number;
    lg?: number;
    xl?: number;
  };
  gap?: 'sm' | 'md' | 'lg' | 'xl';
  adaptive?: boolean;
}

const ResponsiveGrid: React.FC<ResponsiveGridProps> = ({
  children,
  className,
  cols = { xs: 1, sm: 2, md: 2, lg: 3, xl: 4 },
  gap = 'md',
  adaptive = true
}) => {
  const { getCurrentBreakpoint, isMobile } = useResponsive();

  const getColumns = () => {
    const breakpoint = getCurrentBreakpoint();
    return cols[breakpoint] || cols.lg || 3;
  };

  const getGapClass = () => {
    const gapClasses = {
      sm: 'gap-2',
      md: 'gap-4',
      lg: 'gap-6',
      xl: 'gap-8'
    };
    return gapClasses[gap];
  };

  const getGridClass = () => {
    if (!adaptive) return '';
    
    const currentCols = getColumns();
    const gridClasses: Record<number, string> = {
      1: 'grid-cols-1',
      2: 'grid-cols-2',
      3: 'grid-cols-3',
      4: 'grid-cols-4',
      5: 'grid-cols-5',
      6: 'grid-cols-6'
    };
    
    return gridClasses[currentCols] || 'grid-cols-3';
  };

  const responsiveClasses = adaptive ? 
    `grid-cols-${cols.xs || 1} sm:grid-cols-${cols.sm || 2} md:grid-cols-${cols.md || 2} lg:grid-cols-${cols.lg || 3} xl:grid-cols-${cols.xl || 4}` :
    getGridClass();

  return (
    <div 
      className={cn(
        'grid',
        responsiveClasses,
        getGapClass(),
        isMobile && 'px-4', // Add padding on mobile
        className
      )}
    >
      {children}
    </div>
  );
};

interface ResponsiveContainerProps {
  children: React.ReactNode;
  className?: string;
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full';
  padding?: 'none' | 'sm' | 'md' | 'lg';
  center?: boolean;
}

const ResponsiveContainer: React.FC<ResponsiveContainerProps> = ({
  children,
  className,
  maxWidth = 'xl',
  padding = 'md',
  center = true
}) => {
  const { isMobile } = useResponsive();

  const maxWidthClasses = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-4xl',
    xl: 'max-w-6xl',
    '2xl': 'max-w-7xl',
    full: 'max-w-full'
  };

  const paddingClasses = {
    none: '',
    sm: isMobile ? 'px-4 py-2' : 'px-6 py-4',
    md: isMobile ? 'px-4 py-4' : 'px-8 py-6',
    lg: isMobile ? 'px-6 py-6' : 'px-12 py-8'
  };

  return (
    <div 
      className={cn(
        maxWidthClasses[maxWidth],
        paddingClasses[padding],
        center && 'mx-auto',
        className
      )}
    >
      {children}
    </div>
  );
};

export { ResponsiveGrid, ResponsiveContainer };
