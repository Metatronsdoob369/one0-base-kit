
import { cn } from '@/lib/utils';
import { forwardRef } from 'react';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'glass' | 'bioluminescent' | 'frosted' | 'elevated';
  glow?: boolean;
}

const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant = 'default', glow = false, ...props }, ref) => {
    const baseStyles = "rounded-xl border transition-all duration-300";
    
    const variants = {
      default: "bg-card text-card-foreground shadow border-border",
      glass: "glass-effect border-white/20 text-white/90 shadow-lg hover:shadow-xl backdrop-blur-md",
      bioluminescent: "bg-gradient-to-br from-emerald-900/20 via-teal-800/30 to-cyan-900/20 border-emerald-500/30 text-white shadow-[0_0_20px_rgba(16,185,129,0.3)] hover:shadow-[0_0_30px_rgba(16,185,129,0.5)] backdrop-blur-sm",
      frosted: "bg-white/5 border-white/10 text-white/90 shadow-lg hover:bg-white/10 hover:border-white/20 backdrop-blur-xl",
      elevated: "bg-gradient-to-br from-slate-800/80 to-slate-900/80 border-slate-700/50 text-white shadow-2xl hover:shadow-3xl backdrop-blur-md"
    };

    const glowEffect = glow ? "before:absolute before:inset-0 before:bg-gradient-to-r before:from-emerald-400/20 before:via-transparent before:to-cyan-400/20 before:rounded-xl before:blur-xl before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-500" : "";

    return (
      <div
        className={cn(
          baseStyles,
          variants[variant],
          glowEffect,
          "relative",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);

Card.displayName = "Card";

export interface CardHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'luminescent';
}

const CardHeader = forwardRef<HTMLDivElement, CardHeaderProps>(
  ({ className, variant = 'default', ...props }, ref) => {
    const variants = {
      default: "flex flex-col space-y-1.5 p-6",
      luminescent: "flex flex-col space-y-1.5 p-6 bg-gradient-to-r from-purple-600/10 to-pink-600/10 border-b border-purple-500/20"
    };

    return (
      <div
        className={cn(variants[variant], className)}
        ref={ref}
        {...props}
      />
    );
  }
);

CardHeader.displayName = "CardHeader";

export interface CardTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {
  variant?: 'default' | 'luminescent' | 'bioluminescent';
}

const CardTitle = forwardRef<HTMLHeadingElement, CardTitleProps>(
  ({ className, variant = 'default', ...props }, ref) => {
    const variants = {
      default: "text-2xl font-semibold leading-none tracking-tight",
      luminescent: "text-2xl font-semibold leading-none tracking-tight iridescent-text",
      bioluminescent: "text-2xl font-semibold leading-none tracking-tight bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent"
    };

    return (
      <h3
        className={cn(variants[variant], className)}
        ref={ref}
        {...props}
      />
    );
  }
);

CardTitle.displayName = "CardTitle";

export interface CardDescriptionProps extends React.HTMLAttributes<HTMLParagraphElement> {}

const CardDescription = forwardRef<HTMLParagraphElement, CardDescriptionProps>(
  ({ className, ...props }, ref) => {
    return (
      <p
        className={cn("text-sm text-muted-foreground", className)}
        ref={ref}
        {...props}
      />
    );
  }
);

CardDescription.displayName = "CardDescription";

export interface CardContentProps extends React.HTMLAttributes<HTMLDivElement> {}

const CardContent = forwardRef<HTMLDivElement, CardContentProps>(
  ({ className, ...props }, ref) => {
    return (
      <div
        className={cn("p-6 pt-0", className)}
        ref={ref}
        {...props}
      />
    );
  }
);

CardContent.displayName = "CardContent";

export interface CardFooterProps extends React.HTMLAttributes<HTMLDivElement> {}

const CardFooter = forwardRef<HTMLDivElement, CardFooterProps>(
  ({ className, ...props }, ref) => {
    return (
      <div
        className={cn("flex items-center p-6 pt-0", className)}
        ref={ref}
        {...props}
      />
    );
  }
);

CardFooter.displayName = "CardFooter";

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent };
