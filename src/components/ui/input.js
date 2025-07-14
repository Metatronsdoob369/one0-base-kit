import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { cn } from '@/lib/utils';
import { forwardRef } from 'react';
const Input = forwardRef(({ className, variant = 'default', size = 'md', error = false, type, ...props }, ref) => {
    const baseStyles = "flex w-full rounded-md border border-input bg-background text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-all duration-300";
    const variants = {
        default: "border-border bg-background text-foreground",
        glass: "glass-effect border-white/20 text-white/90 placeholder:text-white/50 focus:border-white/40 focus:bg-white/10",
        bioluminescent: "border-emerald-500/30 bg-gradient-to-r from-emerald-900/10 to-cyan-900/10 text-emerald-100 placeholder:text-emerald-300/50 focus:border-emerald-400/50 focus:shadow-[0_0_15px_rgba(16,185,129,0.3)]",
        frosted: "bg-white/5 border-white/10 text-white/90 placeholder:text-white/50 focus:bg-white/10 focus:border-white/30 backdrop-blur-xl"
    };
    const sizes = {
        sm: "h-8 px-3 py-1 text-xs",
        md: "h-10 px-3 py-2",
        lg: "h-12 px-4 py-3 text-base"
    };
    const errorStyles = error ? "border-red-500/50 focus:border-red-400 focus:ring-red-400/20" : "";
    return (_jsx("input", { type: type, className: cn(baseStyles, variants[variant], sizes[size], errorStyles, className), ref: ref, ...props }));
});
Input.displayName = "Input";
const Textarea = forwardRef(({ className, variant = 'default', size = 'md', error = false, ...props }, ref) => {
    const baseStyles = "flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-all duration-300 resize-none";
    const variants = {
        default: "border-border bg-background text-foreground",
        glass: "glass-effect border-white/20 text-white/90 placeholder:text-white/50 focus:border-white/40 focus:bg-white/10",
        bioluminescent: "border-emerald-500/30 bg-gradient-to-r from-emerald-900/10 to-cyan-900/10 text-emerald-100 placeholder:text-emerald-300/50 focus:border-emerald-400/50 focus:shadow-[0_0_15px_rgba(16,185,129,0.3)]",
        frosted: "bg-white/5 border-white/10 text-white/90 placeholder:text-white/50 focus:bg-white/10 focus:border-white/30 backdrop-blur-xl"
    };
    const sizes = {
        sm: "min-h-[60px] px-2 py-1 text-xs",
        md: "min-h-[80px] px-3 py-2",
        lg: "min-h-[120px] px-4 py-3 text-base"
    };
    const errorStyles = error ? "border-red-500/50 focus:border-red-400 focus:ring-red-400/20" : "";
    return (_jsx("textarea", { className: cn(baseStyles, variants[variant], sizes[size], errorStyles, className), ref: ref, ...props }));
});
Textarea.displayName = "Textarea";
const InputGroup = forwardRef(({ className, variant = 'default', children, ...props }, ref) => {
    const variants = {
        default: "space-y-2",
        glass: "space-y-2 p-4 glass-effect rounded-lg",
        bioluminescent: "space-y-2 p-4 bg-gradient-to-r from-emerald-900/10 to-cyan-900/10 border border-emerald-500/20 rounded-lg"
    };
    return (_jsx("div", { className: cn(variants[variant], className), ref: ref, ...props, children: children }));
});
InputGroup.displayName = "InputGroup";
const InputLabel = forwardRef(({ className, variant = 'default', required = false, children, ...props }, ref) => {
    const variants = {
        default: "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
        luminescent: "text-sm font-medium leading-none text-purple-200 peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
        bioluminescent: "text-sm font-medium leading-none text-emerald-200 peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
    };
    return (_jsxs("label", { className: cn(variants[variant], className), ref: ref, ...props, children: [children, required && _jsx("span", { className: "text-red-400 ml-1", children: "*" })] }));
});
InputLabel.displayName = "InputLabel";
export { Input, Textarea, InputGroup, InputLabel };
