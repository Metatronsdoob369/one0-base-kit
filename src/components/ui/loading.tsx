import { cn } from '@/lib/utils';
import { forwardRef } from 'react';

export interface LoadingProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'bioluminescent' | 'luminescent' | 'pulse' | 'spinner';
  size?: 'sm' | 'md' | 'lg';
  text?: string;
}

const Loading = forwardRef<HTMLDivElement, LoadingProps>(
  ({ className, variant = 'default', size = 'md', text, ...props }, ref) => {
    const sizes = {
      sm: "w-4 h-4",
      md: "w-8 h-8", 
      lg: "w-12 h-12"
    };

    const variants = {
      default: (
        <div className={cn("animate-spin rounded-full border-2 border-gray-300 border-t-white", sizes[size])} />
      ),
      bioluminescent: (
        <div className={cn("relative", sizes[size])}>
          <div className="absolute inset-0 rounded-full border-2 border-emerald-500/30 animate-pulse" />
          <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-emerald-400 animate-spin" />
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-emerald-400/20 to-cyan-400/20 animate-pulse" />
        </div>
      ),
      luminescent: (
        <div className={cn("relative", sizes[size])}>
          <div className="absolute inset-0 rounded-full border-2 border-purple-500/30 animate-pulse" />
          <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-purple-400 animate-spin" />
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-400/20 to-pink-400/20 animate-pulse" />
        </div>
      ),
      pulse: (
        <div className={cn("flex space-x-1", sizes[size])}>
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"
              style={{ animationDelay: `${i * 0.2}s` }}
            />
          ))}
        </div>
      ),
      spinner: (
        <div className={cn("relative", sizes[size])}>
          <div className="absolute inset-0 rounded-full border-4 border-white/10" />
          <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-emerald-400 animate-spin" />
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-emerald-400/10 to-cyan-400/10 animate-pulse" />
        </div>
      )
    };

    return (
      <div
        className={cn("flex flex-col items-center justify-center space-y-2", className)}
        ref={ref}
        {...props}
      >
        {variants[variant]}
        {text && (
          <p className="text-sm text-muted-foreground animate-pulse">
            {text}
          </p>
        )}
      </div>
    );
  }
);

Loading.displayName = "Loading";

export interface LoadingOverlayProps extends React.HTMLAttributes<HTMLDivElement> {
  loading?: boolean;
  variant?: 'default' | 'glass' | 'bioluminescent';
}

const LoadingOverlay = forwardRef<HTMLDivElement, LoadingOverlayProps>(
  ({ className, loading = false, variant = 'default', children, ...props }, ref) => {
    const variants = {
      default: "bg-background/80 backdrop-blur-sm",
      glass: "glass-effect",
      bioluminescent: "bg-gradient-to-br from-emerald-900/20 via-teal-800/30 to-cyan-900/20 backdrop-blur-md"
    };

    if (!loading) {
      return <>{children}</>;
    }

    return (
      <div className="relative" ref={ref} {...props}>
        {children}
        <div
          className={cn(
            "absolute inset-0 z-50 flex items-center justify-center",
            variants[variant],
            className
          )}
        >
          <Loading variant="bioluminescent" size="lg" text="Loading..." />
        </div>
      </div>
    );
  }
);

LoadingOverlay.displayName = "LoadingOverlay";

export interface LoadingDotsProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: 'sm' | 'md' | 'lg';
  color?: 'default' | 'bioluminescent' | 'luminescent';
}

const LoadingDots = forwardRef<HTMLDivElement, LoadingDotsProps>(
  ({ className, size = 'md', color = 'default', ...props }, ref) => {
    const sizes = {
      sm: "w-1 h-1",
      md: "w-2 h-2",
      lg: "w-3 h-3"
    };

    const colors = {
      default: "bg-white",
      bioluminescent: "bg-emerald-400",
      luminescent: "bg-purple-400"
    };

    return (
      <div
        className={cn("flex space-x-1", className)}
        ref={ref}
        {...props}
      >
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className={cn(
              "rounded-full animate-bounce",
              sizes[size],
              colors[color]
            )}
            style={{ animationDelay: `${i * 0.1}s` }}
          />
        ))}
      </div>
    );
  }
);

LoadingDots.displayName = "LoadingDots";

export { Loading, LoadingOverlay, LoadingDots }; 