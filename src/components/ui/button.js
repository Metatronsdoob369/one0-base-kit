import { jsx as _jsx } from "react/jsx-runtime";
import { cn } from '@/lib/utils';
import { forwardRef } from 'react';
import { playLockSound } from '@/lib/utils';
const Button = forwardRef(({ className, variant = 'default', size = 'default', playSound = true, onClick, ...props }, ref) => {
    const baseStyles = "inline-flex items-center justify-center rounded-md text-sm font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 relative overflow-hidden";
    const variants = {
        default: "bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg hover:shadow-xl",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
        luminescent: "bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 text-white font-semibold shadow-[0_0_20px_rgba(168,85,247,0.4)] hover:shadow-[0_0_30px_rgba(168,85,247,0.6)] hover:scale-105",
        frosted: "glass-effect border border-white/20 text-white/90 hover:bg-white/10 hover:border-white/30 hover:text-white shadow-lg hover:shadow-xl backdrop-blur-md",
        bioluminescent: "bg-gradient-to-r from-emerald-400 via-teal-500 to-cyan-500 text-white font-semibold shadow-[0_0_15px_rgba(16,185,129,0.5)] hover:shadow-[0_0_25px_rgba(16,185,129,0.7)] hover:scale-105 before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent before:via-white/20 before:to-transparent before:translate-x-[-100%] hover:before:translate-x-[100%] before:transition-transform before:duration-700"
    };
    const sizes = {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10"
    };
    const handleClick = (e) => {
        if (playSound) {
            playLockSound();
        }
        if (onClick) {
            onClick(e);
        }
    };
    return (_jsx("button", { className: cn(baseStyles, variants[variant], sizes[size], className), ref: ref, onClick: handleClick, ...props }));
});
Button.displayName = "Button";
export { Button };
