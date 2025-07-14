import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
const AgentInterface = () => {
    const [inputValue, setInputValue] = useState('');
    const [messages, setMessages] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const sendMessage = async () => {
        if (!inputValue.trim() || isLoading)
            return;
        const userMessage = {
            id: Date.now().toString(),
            type: 'user',
            content: inputValue
        };
        setMessages(prev => [...prev, userMessage]);
        setInputValue('');
        setIsLoading(true);
        try {
            const response = await fetch('http://localhost:5001/api/chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ message: userMessage.content })
            });
            if (response.ok) {
                const data = await response.json();
                const agentMessage = {
                    id: (Date.now() + 1).toString(),
                    type: 'agent',
                    content: data.response
                };
                setMessages(prev => [...prev, agentMessage]);
            }
            else {
                throw new Error('Failed to get response');
            }
        }
        catch (error) {
            console.error('Error sending message:', error);
            const errorMessage = {
                id: (Date.now() + 1).toString(),
                type: 'agent',
                content: 'Sorry, I encountered an error. Please make sure the PATHsassin API server is running on port 5001.'
            };
            setMessages(prev => [...prev, errorMessage]);
        }
        finally {
            setIsLoading(false);
        }
    };
    const handleQuickCommand = (command) => {
        setInputValue(command);
    };
    return (_jsx("div", { className: "min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-8", children: _jsxs("div", { className: "max-w-4xl mx-auto", children: [_jsxs("div", { className: "bg-white/10 backdrop-blur-md rounded-lg border border-white/20 p-6 mb-6", children: [_jsx("h1", { className: "text-white text-3xl font-bold mb-2", children: "\uD83E\uDD16 PATHsassin Agent" }), _jsx("p", { className: "text-white/60", children: "Your local learning companion for the Master Skills Index" }), _jsxs("div", { className: "mt-4 flex items-center space-x-4 text-sm", children: [_jsx("span", { className: "text-green-400", children: "\u25CF API Connected" }), _jsx("span", { className: "text-blue-400", children: "\u25CF Local Processing" }), _jsx("span", { className: "text-purple-400", children: "\u25CF Private & Secure" })] })] }), _jsxs("div", { className: "bg-white/10 backdrop-blur-md rounded-lg border border-white/20 h-96 flex flex-col", children: [_jsxs("div", { className: "flex-1 overflow-y-auto p-4 space-y-4", children: [messages.length === 0 && (_jsxs("div", { className: "text-center text-white/60 py-8", children: [_jsx("div", { className: "text-4xl mb-4", children: "\uD83E\uDDE0" }), _jsx("h3", { className: "text-lg font-semibold mb-2", children: "Welcome to PATHsassin Agent" }), _jsx("p", { className: "text-sm", children: "I'm your specialized learning companion for the Master Skills Index." }), _jsx("p", { className: "text-sm mt-2", children: "Try typing a message or use the quick commands below!" })] })), messages.map((message) => (_jsx("div", { className: `flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`, children: _jsxs("div", { className: `max-w-[80%] p-4 rounded-lg ${message.type === 'user'
                                            ? 'bg-blue-600 text-white'
                                            : 'bg-white/10 backdrop-blur-md border border-white/20 text-white'}`, children: [_jsxs("div", { className: "flex items-center space-x-2 mb-2", children: [message.type === 'agent' && _jsx("span", { children: "\uD83E\uDD16" }), _jsx("span", { className: "text-xs opacity-60", children: message.type === 'user' ? 'You' : 'PATHsassin' })] }), _jsx("div", { className: "whitespace-pre-wrap", children: message.content })] }) }, message.id))), isLoading && (_jsx("div", { className: "flex justify-start", children: _jsxs("div", { className: "bg-white/10 backdrop-blur-md border border-white/20 text-white p-4 rounded-lg", children: [_jsxs("div", { className: "flex items-center space-x-2", children: [_jsx("span", { children: "\uD83E\uDD16" }), _jsx("span", { className: "text-xs opacity-60", children: "PATHsassin" })] }), _jsxs("div", { className: "flex items-center space-x-2 mt-2", children: [_jsx("div", { className: "animate-spin rounded-full h-4 w-4 border-b-2 border-white" }), _jsx("span", { className: "text-sm", children: "Thinking..." })] })] }) }))] }), _jsx("div", { className: "p-4 border-t border-white/20", children: _jsxs("div", { className: "flex space-x-2", children: [_jsx("input", { type: "text", value: inputValue, onChange: (e) => setInputValue(e.target.value), onKeyPress: (e) => e.key === 'Enter' && sendMessage(), placeholder: "Ask PATHsassin about your skills, research topics, or get recommendations...", className: "flex-1 px-4 py-3 bg-white/10 backdrop-blur-md rounded-lg border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500/50", disabled: isLoading }), _jsx("button", { onClick: sendMessage, disabled: !inputValue.trim() || isLoading, className: "px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg text-white hover:from-blue-700 hover:to-purple-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed", children: isLoading ? 'Sending...' : 'Send' })] }) })] }), _jsxs("div", { className: "mt-6 bg-white/10 backdrop-blur-md rounded-lg border border-white/20 p-4", children: [_jsx("h3", { className: "text-white font-semibold mb-4", children: "Quick Commands" }), _jsx("div", { className: "flex flex-wrap gap-2", children: [
                                'analyze 5',
                                'recommend 1',
                                'research automation',
                                'synthesis',
                                'assess 3',
                                'help'
                            ].map((cmd) => (_jsx("button", { onClick: () => handleQuickCommand(cmd), className: "px-3 py-2 bg-white/10 backdrop-blur-md rounded-lg border border-white/20 text-white hover:bg-white/20 transition-all duration-300 text-sm", children: cmd }, cmd))) })] }), _jsx("div", { className: "mt-4 text-center text-white/40 text-sm", children: _jsx("p", { children: "PATHsassin Agent v1.0 \u2022 Local AI \u2022 Private Processing" }) })] }) }));
};
export default AgentInterface;
