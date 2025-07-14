import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { cn } from '@/lib/utils';
import { forwardRef } from 'react';
const Loading = forwardRef(({ className, variant = 'default', size = 'md', text, ...props }, ref) => {
    const sizes = {
        sm: "w-4 h-4",
        md: "w-8 h-8",
        lg: "w-12 h-12"
    };
    const variants = {
        default: (_jsx("div", { className: cn("animate-spin rounded-full border-2 border-gray-300 border-t-white", sizes[size]) })),
        bioluminescent: (_jsxs("div", { className: cn("relative", sizes[size]), children: [_jsx("div", { className: "absolute inset-0 rounded-full border-2 border-emerald-500/30 animate-pulse" }), _jsx("div", { className: "absolute inset-0 rounded-full border-2 border-transparent border-t-emerald-400 animate-spin" }), _jsx("div", { className: "absolute inset-0 rounded-full bg-gradient-to-r from-emerald-400/20 to-cyan-400/20 animate-pulse" })] })),
        luminescent: (_jsxs("div", { className: cn("relative", sizes[size]), children: [_jsx("div", { className: "absolute inset-0 rounded-full border-2 border-purple-500/30 animate-pulse" }), _jsx("div", { className: "absolute inset-0 rounded-full border-2 border-transparent border-t-purple-400 animate-spin" }), _jsx("div", { className: "absolute inset-0 rounded-full bg-gradient-to-r from-purple-400/20 to-pink-400/20 animate-pulse" })] })),
        pulse: (_jsx("div", { className: cn("flex space-x-1", sizes[size]), children: [0, 1, 2].map((i) => (_jsx("div", { className: "w-2 h-2 bg-emerald-400 rounded-full animate-pulse", style: { animationDelay: `${i * 0.2}s` } }, i))) })),
        spinner: (_jsxs("div", { className: cn("relative", sizes[size]), children: [_jsx("div", { className: "absolute inset-0 rounded-full border-4 border-white/10" }), _jsx("div", { className: "absolute inset-0 rounded-full border-4 border-transparent border-t-emerald-400 animate-spin" }), _jsx("div", { className: "absolute inset-0 rounded-full bg-gradient-to-r from-emerald-400/10 to-cyan-400/10 animate-pulse" })] }))
    };
    return (_jsxs("div", { className: cn("flex flex-col items-center justify-center space-y-2", className), ref: ref, ...props, children: [variants[variant], text && (_jsx("p", { className: "text-sm text-muted-foreground animate-pulse", children: text }))] }));
});
Loading.displayName = "Loading";
const LoadingOverlay = forwardRef(({ className, loading = false, variant = 'default', children, ...props }, ref) => {
    const variants = {
        default: "bg-background/80 backdrop-blur-sm",
        glass: "glass-effect",
        bioluminescent: "bg-gradient-to-br from-emerald-900/20 via-teal-800/30 to-cyan-900/20 backdrop-blur-md"
    };
    if (!loading) {
        return _jsx(_Fragment, { children: children });
    }
    return (_jsxs("div", { className: "relative", ref: ref, ...props, children: [children, _jsx("div", { className: cn("absolute inset-0 z-50 flex items-center justify-center", variants[variant], className), children: _jsx(Loading, { variant: "bioluminescent", size: "lg", text: "Loading..." }) })] }));
});
LoadingOverlay.displayName = "LoadingOverlay";
const LoadingDots = forwardRef(({ className, size = 'md', color = 'default', ...props }, ref) => {
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
    return (_jsx("div", { className: cn("flex space-x-1", className), ref: ref, ...props, children: [0, 1, 2].map((i) => (_jsx("div", { className: cn("rounded-full animate-bounce", sizes[size], colors[color]), style: { animationDelay: `${i * 0.1}s` } }, i))) }));
});
LoadingDots.displayName = "LoadingDots";
export { Loading, LoadingOverlay, LoadingDots };
