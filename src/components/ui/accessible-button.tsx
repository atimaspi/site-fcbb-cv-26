
import React from 'react';
import { Button, ButtonProps } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface AccessibleButtonProps extends ButtonProps {
  ariaLabel?: string;
  description?: string;
  loading?: boolean;
  loadingText?: string;
}

const AccessibleButton = React.forwardRef<HTMLButtonElement, AccessibleButtonProps>(
  ({ 
    children, 
    ariaLabel, 
    description, 
    loading = false, 
    loadingText = "A carregar...", 
    className,
    disabled,
    ...props 
  }, ref) => {
    return (
      <Button
        ref={ref}
        className={cn("focus-visible-cv transition-colors", className)}
        disabled={disabled || loading}
        aria-label={ariaLabel || (typeof children === 'string' ? children : undefined)}
        title={description}
        aria-busy={loading}
        {...props}
      >
        {loading ? (
          <>
            <span className="animate-spin mr-2 h-4 w-4 border-2 border-current border-t-transparent rounded-full" aria-hidden="true" />
            {loadingText}
          </>
        ) : (
          children
        )}
      </Button>
    );
  }
);

AccessibleButton.displayName = "AccessibleButton";

export { AccessibleButton };
