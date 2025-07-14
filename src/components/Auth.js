import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
const Auth = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isSignUp, setIsSignUp] = useState(false);
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(`${isSignUp ? 'Sign up' : 'Sign in'} with:`, { email, password });
        // In a real implementation, this would integrate with Firebase Auth
    };
    return (_jsxs("div", { className: "bg-gray-800 p-6 rounded-lg", children: [_jsx("h2", { className: "text-2xl font-semibold mb-4", children: isSignUp ? 'Create Account' : 'Sign In' }), _jsxs("form", { onSubmit: handleSubmit, className: "space-y-4", children: [_jsxs("div", { children: [_jsx("label", { htmlFor: "email", className: "block text-sm font-medium text-gray-300 mb-1", children: "Email" }), _jsx("input", { type: "email", id: "email", value: email, onChange: (e) => setEmail(e.target.value), className: "w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#800020] focus:border-transparent", placeholder: "Enter your email", required: true })] }), _jsxs("div", { children: [_jsx("label", { htmlFor: "password", className: "block text-sm font-medium text-gray-300 mb-1", children: "Password" }), _jsx("input", { type: "password", id: "password", value: password, onChange: (e) => setPassword(e.target.value), className: "w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#800020] focus:border-transparent", placeholder: "Enter your password", required: true })] }), _jsx("button", { type: "submit", className: "w-full bg-[#800020] text-white px-4 py-2 rounded-md hover:bg-[#600018] transition-colors", children: isSignUp ? 'Create Account' : 'Sign In' })] }), _jsx("div", { className: "mt-4 text-center", children: _jsx("button", { onClick: () => setIsSignUp(!isSignUp), className: "text-sm text-gray-400 hover:text-white transition-colors", children: isSignUp ? 'Already have an account? Sign in' : "Don't have an account? Sign up" }) })] }));
};
export default Auth;
