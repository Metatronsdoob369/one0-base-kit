import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { generateSpeech } from "@/lib/eleven";
import Auth from "@/components/Auth";
export default function NodeOutDashboard() {
    function handleSpeak() {
        generateSpeech("The Node Out engine is online.")
            .then((url) => {
            const audio = new Audio(url);
            audio.play();
        })
            .catch((err) => console.error("Speech error:", err));
    }
    return (_jsx("div", { className: "min-h-screen bg-gray-900 text-white p-8", children: _jsxs("div", { className: "max-w-4xl mx-auto", children: [_jsx("h1", { className: "text-4xl font-bold mb-8", children: "NodeOut" }), _jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-8", children: [_jsxs("div", { className: "space-y-6", children: [_jsxs("div", { className: "bg-gray-800 p-6 rounded-lg", children: [_jsx("h2", { className: "text-2xl font-semibold mb-4", children: "Voice Engine" }), _jsx("button", { onClick: handleSpeak, className: "bg-[#800020] text-white px-6 py-3 rounded-xl hover:bg-[#600018] transition-colors", children: "\uD83C\uDFA4 Activate Voice" })] }), _jsxs("div", { className: "bg-gray-800 p-6 rounded-lg", children: [_jsx("h2", { className: "text-2xl font-semibold mb-4", children: "Firebase Status" }), _jsx("p", { className: "text-green-400", children: "\u2705 Connected to Firebase" }), _jsx("p", { className: "text-sm text-gray-400 mt-2", children: "Project: one0-base-kit" })] })] }), _jsx("div", { children: _jsx(Auth, {}) })] })] }) }));
}
