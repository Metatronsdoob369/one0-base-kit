import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
function App() {
    return (_jsx("div", { style: {
            minHeight: '100vh',
            background: 'linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)',
            color: 'white',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '2rem',
            fontWeight: 'bold'
        }, children: _jsxs("div", { children: [_jsx("h1", { children: "\uD83E\uDDEA React is Working!" }), _jsx("p", { children: "If you can see this, the app is loading correctly." }), _jsx("button", { onClick: () => alert('Button clicked!'), style: {
                        padding: '1rem 2rem',
                        background: 'rgba(255,255,255,0.2)',
                        border: '2px solid white',
                        borderRadius: '8px',
                        color: 'white',
                        fontSize: '1rem',
                        cursor: 'pointer'
                    }, children: "Test Button" })] }) }));
}
export default App;
