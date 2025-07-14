import { cn } from '@/lib/utils';
import { forwardRef } from 'react';

export interface NavigationProps extends React.HTMLAttributes<HTMLElement> {
  variant?: 'default' | 'glass' | 'bioluminescent';
}

const Navigation = forwardRef<HTMLElement, NavigationProps>(
  ({ className, variant = 'default', ...props }, ref) => {
    const variants = {
      default: "bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60",
      glass: "glass-effect border-b border-white/10",
      bioluminescent: "bg-gradient-to-r from-emerald-900/20 via-teal-800/30 to-cyan-900/20 border-b border-emerald-500/30 backdrop-blur-md"
    };

    return (
      <nav
        className={cn(
          "sticky top-0 z-50 w-full transition-all duration-300",
          variants[variant],
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);

Navigation.displayName = "Navigation";

export interface NavigationListProps extends React.HTMLAttributes<HTMLUListElement> {}

const NavigationList = forwardRef<HTMLUListElement, NavigationListProps>(
  ({ className, ...props }, ref) => {
    return (
      <ul
        className={cn("flex items-center space-x-6", className)}
        ref={ref}
        {...props}
      />
    );
  }
);

NavigationList.displayName = "NavigationList";

export interface NavigationItemProps extends React.HTMLAttributes<HTMLLIElement> {
  active?: boolean;
  variant?: 'default' | 'luminescent';
}

const NavigationItem = forwardRef<HTMLLIElement, NavigationItemProps>(
  ({ className, active = false, variant = 'default', ...props }, ref) => {
    const variants = {
      default: cn(
        "relative px-3 py-2 text-sm font-medium transition-colors hover:text-primary",
        active ? "text-primary" : "text-muted-foreground"
      ),
      luminescent: cn(
        "relative px-3 py-2 text-sm font-medium transition-all duration-300 hover:text-white",
        active 
          ? "text-white bg-gradient-to-r from-purple-600/20 to-pink-600/20 rounded-md shadow-[0_0_10px_rgba(168,85,247,0.3)]" 
          : "text-muted-foreground hover:bg-white/5 hover:rounded-md"
      )
    };

    return (
      <li
        className={cn(variants[variant], className)}
        ref={ref}
        {...props}
      />
    );
  }
);

NavigationItem.displayName = "NavigationItem";

export interface NavigationLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  active?: boolean;
  variant?: 'default' | 'luminescent' | 'bioluminescent';
}

const NavigationLink = forwardRef<HTMLAnchorElement, NavigationLinkProps>(
  ({ className, active = false, variant = 'default', ...props }, ref) => {
    const variants = {
      default: cn(
        "transition-colors hover:text-primary",
        active ? "text-primary" : "text-muted-foreground"
      ),
      luminescent: cn(
        "transition-all duration-300 hover:text-white",
        active 
          ? "text-white" 
          : "text-muted-foreground hover:text-white"
      ),
      bioluminescent: cn(
        "transition-all duration-300 font-medium",
        active 
          ? "text-emerald-400 bg-gradient-to-r from-emerald-400/10 to-cyan-400/10 px-3 py-1 rounded-md shadow-[0_0_10px_rgba(16,185,129,0.3)]" 
          : "text-muted-foreground hover:text-emerald-400 hover:bg-emerald-400/5 hover:px-3 hover:py-1 hover:rounded-md"
      )
    };

    return (
      <a
        className={cn(variants[variant], className)}
        ref={ref}
        {...props}
      />
    );
  }
);

NavigationLink.displayName = "NavigationLink";

export { Navigation, NavigationList, NavigationItem, NavigationLink }; 