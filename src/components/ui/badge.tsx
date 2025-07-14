import { cn } from '@/lib/utils';
import { forwardRef } from 'react';

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'secondary' | 'destructive' | 'outline' | 'bioluminescent' | 'luminescent' | 'success' | 'warning' | 'info';
  size?: 'sm' | 'md' | 'lg';
}

const Badge = forwardRef<HTMLDivElement, BadgeProps>(
  ({ className, variant = 'default', size = 'md', ...props }, ref) => {
    const baseStyles = "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2";
    
    const variants = {
      default: "border-transparent bg-primary text-primary-foreground hover:bg-primary/80",
      secondary: "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
      destructive: "border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80",
      outline: "text-foreground border-border",
      bioluminescent: "border-emerald-500/30 bg-gradient-to-r from-emerald-900/20 to-cyan-900/20 text-emerald-400 shadow-[0_0_10px_rgba(16,185,129,0.3)] hover:shadow-[0_0_15px_rgba(16,185,129,0.5)]",
      luminescent: "border-purple-500/30 bg-gradient-to-r from-purple-900/20 to-pink-900/20 text-purple-400 shadow-[0_0_10px_rgba(168,85,247,0.3)] hover:shadow-[0_0_15px_rgba(168,85,247,0.5)]",
      success: "border-green-500/30 bg-green-900/20 text-green-400 shadow-[0_0_10px_rgba(34,197,94,0.3)]",
      warning: "border-yellow-500/30 bg-yellow-900/20 text-yellow-400 shadow-[0_0_10px_rgba(234,179,8,0.3)]",
      info: "border-blue-500/30 bg-blue-900/20 text-blue-400 shadow-[0_0_10px_rgba(59,130,246,0.3)]"
    };

    const sizes = {
      sm: "px-2 py-0.5 text-xs",
      md: "px-2.5 py-0.5 text-xs",
      lg: "px-3 py-1 text-sm"
    };

    return (
      <div
        className={cn(
          baseStyles,
          variants[variant],
          sizes[size],
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);

Badge.displayName = "Badge";

export interface StatusBadgeProps extends BadgeProps {
  status: 'online' | 'offline' | 'busy' | 'away' | 'loading';
}

const StatusBadge = forwardRef<HTMLDivElement, StatusBadgeProps>(
  ({ className, status, ...props }, ref) => {
    const statusConfig = {
      online: {
        variant: 'bioluminescent' as const,
        text: 'Online',
        icon: '●'
      },
      offline: {
        variant: 'destructive' as const,
        text: 'Offline',
        icon: '○'
      },
      busy: {
        variant: 'warning' as const,
        text: 'Busy',
        icon: '●'
      },
      away: {
        variant: 'secondary' as const,
        text: 'Away',
        icon: '○'
      },
      loading: {
        variant: 'info' as const,
        text: 'Loading',
        icon: '⟳'
      }
    };

    const config = statusConfig[status];

    return (
      <Badge
        className={cn("flex items-center gap-1", className)}
        variant={config.variant}
        ref={ref}
        {...props}
      >
        <span className="text-xs">{config.icon}</span>
        {config.text}
      </Badge>
    );
  }
);

StatusBadge.displayName = "StatusBadge";

export interface SkillBadgeProps extends BadgeProps {
  skill: string;
  level?: 'beginner' | 'intermediate' | 'advanced' | 'master';
}

const SkillBadge = forwardRef<HTMLDivElement, SkillBadgeProps>(
  ({ className, skill, level = 'beginner', ...props }, ref) => {
    const levelConfig = {
      beginner: {
        variant: 'outline' as const,
        color: 'text-blue-400'
      },
      intermediate: {
        variant: 'luminescent' as const,
        color: 'text-purple-400'
      },
      advanced: {
        variant: 'bioluminescent' as const,
        color: 'text-emerald-400'
      },
      master: {
        variant: 'default' as const,
        color: 'text-yellow-400'
      }
    };

    const config = levelConfig[level];

    return (
      <Badge
        className={cn(config.color, className)}
        variant={config.variant}
        ref={ref}
        {...props}
      >
        {skill}
      </Badge>
    );
  }
);

SkillBadge.displayName = "SkillBadge";

export { Badge, StatusBadge, SkillBadge }; 