import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
export const UIDemo = () => {
    const [activeTab, setActiveTab] = useState('buttons');
    // State for inputs
    const [inputs, setInputs] = useState({
        green: '',
        purple: '',
        orange: '',
        glass: '',
        blueTextarea: '',
    });
    const handleInput = (key, value) => setInputs((prev) => ({ ...prev, [key]: value }));
    const handleSubmit = () => {
        alert(`Submitted values:\n` +
            `Green: ${inputs.green}\n` +
            `Purple: ${inputs.purple}\n` +
            `Orange: ${inputs.orange}\n` +
            `Glass: ${inputs.glass}\n` +
            `Blue Textarea: ${inputs.blueTextarea}`);
    };
    const handleClear = () => setInputs({ green: '', purple: '', orange: '', glass: '', blueTextarea: '' });
    return (_jsx("div", { style: {
            minHeight: '100vh',
            background: 'linear-gradient(135deg, #0f0f0f 0%, #1a1a1a 50%, #0f0f0f 100%)',
            color: 'white',
            padding: '2rem',
            fontFamily: 'Inter, sans-serif'
        }, children: _jsxs("div", { style: { maxWidth: '1200px', margin: '0 auto' }, children: [_jsxs("div", { style: { textAlign: 'center', marginBottom: '3rem' }, children: [_jsx("h1", { style: {
                                fontSize: '3.5rem',
                                fontWeight: 'bold',
                                marginBottom: '1rem',
                                background: 'linear-gradient(45deg, #ff0080, #ff8c00, #40e0d0, #ee82ee, #ff0080)',
                                backgroundSize: '400% 400%',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                                animation: 'gradientShift 3s ease infinite'
                            }, children: "PATHsassin UI Showcase" }), _jsx("p", { style: {
                                fontSize: '1.25rem',
                                color: '#9ca3af',
                                maxWidth: '600px',
                                margin: '0 auto'
                            }, children: "Experience the enhanced UI components with vibrant bioluminescent lighting, glass morphism, and sophisticated animations" })] }), _jsx("nav", { style: {
                        background: 'rgba(255, 255, 255, 0.1)',
                        backdropFilter: 'blur(20px)',
                        border: '1px solid rgba(255, 255, 255, 0.2)',
                        borderRadius: '12px',
                        padding: '1rem',
                        marginBottom: '2rem'
                    }, children: _jsx("div", { style: { display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }, children: ['buttons', 'cards', 'loading', 'badges', 'inputs'].map((tab) => (_jsx("button", { style: {
                                padding: '0.75rem 1.5rem',
                                fontSize: '0.875rem',
                                fontWeight: '500',
                                borderRadius: '8px',
                                border: 'none',
                                cursor: 'pointer',
                                transition: 'all 0.3s ease',
                                textTransform: 'capitalize',
                                ...(activeTab === tab ? {
                                    background: 'linear-gradient(45deg, #ff0080, #ff8c00)',
                                    color: 'white',
                                    boxShadow: '0 0 20px rgba(255, 0, 128, 0.4)'
                                } : {
                                    background: 'rgba(255, 255, 255, 0.1)',
                                    color: '#9ca3af',
                                    border: '1px solid rgba(255, 255, 255, 0.2)'
                                })
                            }, onClick: () => setActiveTab(tab), children: tab }, tab))) }) }), _jsxs("div", { children: [activeTab === 'buttons' && (_jsxs("div", { style: {
                                background: 'rgba(255, 255, 255, 0.1)',
                                backdropFilter: 'blur(20px)',
                                border: '1px solid rgba(255, 255, 255, 0.2)',
                                borderRadius: '16px',
                                padding: '2rem',
                                marginBottom: '2rem'
                            }, children: [_jsx("h2", { style: {
                                        fontSize: '2rem',
                                        fontWeight: '600',
                                        marginBottom: '1rem',
                                        background: 'linear-gradient(45deg, #ff0080, #ff8c00)',
                                        WebkitBackgroundClip: 'text',
                                        WebkitTextFillColor: 'transparent'
                                    }, children: "Enhanced Button Components" }), _jsx("p", { style: { color: '#9ca3af', marginBottom: '2rem' }, children: "Multiple variants with vibrant bioluminescent lighting and glass morphism effects" }), _jsxs("div", { style: {
                                        display: 'grid',
                                        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                                        gap: '1rem',
                                        marginBottom: '2rem'
                                    }, children: [_jsx("button", { style: {
                                                padding: '12px 24px',
                                                fontSize: '1rem',
                                                fontWeight: '600',
                                                borderRadius: '8px',
                                                border: 'none',
                                                cursor: 'pointer',
                                                transition: 'all 0.3s ease',
                                                background: 'linear-gradient(45deg, #10b981, #06b6d4)',
                                                color: 'white',
                                                boxShadow: '0 0 15px rgba(16, 185, 129, 0.5)',
                                                transform: 'translateY(0)'
                                            }, onMouseOver: (e) => {
                                                e.currentTarget.style.transform = 'translateY(-2px)';
                                                e.currentTarget.style.boxShadow = '0 0 25px rgba(16, 185, 129, 0.7)';
                                            }, onMouseOut: (e) => {
                                                e.currentTarget.style.transform = 'translateY(0)';
                                                e.currentTarget.style.boxShadow = '0 0 15px rgba(16, 185, 129, 0.5)';
                                            }, children: "Green Bioluminescent" }), _jsx("button", { style: {
                                                padding: '12px 24px',
                                                fontSize: '1rem',
                                                fontWeight: '600',
                                                borderRadius: '8px',
                                                border: 'none',
                                                cursor: 'pointer',
                                                transition: 'all 0.3s ease',
                                                background: 'linear-gradient(45deg, #8b5cf6, #ec4899)',
                                                color: 'white',
                                                boxShadow: '0 0 15px rgba(139, 92, 246, 0.5)',
                                                transform: 'translateY(0)'
                                            }, onMouseOver: (e) => {
                                                e.currentTarget.style.transform = 'translateY(-2px)';
                                                e.currentTarget.style.boxShadow = '0 0 25px rgba(139, 92, 246, 0.7)';
                                            }, onMouseOut: (e) => {
                                                e.currentTarget.style.transform = 'translateY(0)';
                                                e.currentTarget.style.boxShadow = '0 0 15px rgba(139, 92, 246, 0.5)';
                                            }, children: "Purple Luminescent" }), _jsx("button", { style: {
                                                padding: '12px 24px',
                                                fontSize: '1rem',
                                                fontWeight: '600',
                                                borderRadius: '8px',
                                                border: 'none',
                                                cursor: 'pointer',
                                                transition: 'all 0.3s ease',
                                                background: 'linear-gradient(45deg, #f97316, #ef4444)',
                                                color: 'white',
                                                boxShadow: '0 0 15px rgba(249, 115, 22, 0.5)',
                                                transform: 'translateY(0)'
                                            }, onMouseOver: (e) => {
                                                e.currentTarget.style.transform = 'translateY(-2px)';
                                                e.currentTarget.style.boxShadow = '0 0 25px rgba(249, 115, 22, 0.7)';
                                            }, onMouseOut: (e) => {
                                                e.currentTarget.style.transform = 'translateY(0)';
                                                e.currentTarget.style.boxShadow = '0 0 15px rgba(249, 115, 22, 0.5)';
                                            }, children: "Orange Fire" }), _jsx("button", { style: {
                                                padding: '12px 24px',
                                                fontSize: '1rem',
                                                fontWeight: '600',
                                                borderRadius: '8px',
                                                border: 'none',
                                                cursor: 'pointer',
                                                transition: 'all 0.3s ease',
                                                background: 'linear-gradient(45deg, #3b82f6, #06b6d4)',
                                                color: 'white',
                                                boxShadow: '0 0 15px rgba(59, 130, 246, 0.5)',
                                                transform: 'translateY(0)'
                                            }, onMouseOver: (e) => {
                                                e.currentTarget.style.transform = 'translateY(-2px)';
                                                e.currentTarget.style.boxShadow = '0 0 25px rgba(59, 130, 246, 0.7)';
                                            }, onMouseOut: (e) => {
                                                e.currentTarget.style.transform = 'translateY(0)';
                                                e.currentTarget.style.boxShadow = '0 0 15px rgba(59, 130, 246, 0.5)';
                                            }, children: "Blue Ocean" }), _jsx("button", { style: {
                                                padding: '12px 24px',
                                                fontSize: '1rem',
                                                fontWeight: '600',
                                                borderRadius: '8px',
                                                border: 'none',
                                                cursor: 'pointer',
                                                transition: 'all 0.3s ease',
                                                background: 'linear-gradient(45deg, #ec4899, #f97316)',
                                                color: 'white',
                                                boxShadow: '0 0 15px rgba(236, 72, 153, 0.5)',
                                                transform: 'translateY(0)'
                                            }, onMouseOver: (e) => {
                                                e.currentTarget.style.transform = 'translateY(-2px)';
                                                e.currentTarget.style.boxShadow = '0 0 25px rgba(236, 72, 153, 0.7)';
                                            }, onMouseOut: (e) => {
                                                e.currentTarget.style.transform = 'translateY(0)';
                                                e.currentTarget.style.boxShadow = '0 0 15px rgba(236, 72, 153, 0.5)';
                                            }, children: "Pink Neon" }), _jsx("button", { style: {
                                                padding: '12px 24px',
                                                fontSize: '1rem',
                                                fontWeight: '600',
                                                borderRadius: '8px',
                                                border: '1px solid rgba(255, 255, 255, 0.3)',
                                                cursor: 'pointer',
                                                transition: 'all 0.3s ease',
                                                background: 'rgba(255, 255, 255, 0.1)',
                                                backdropFilter: 'blur(20px)',
                                                color: 'white',
                                                boxShadow: '0 0 15px rgba(255, 255, 255, 0.2)',
                                                transform: 'translateY(0)'
                                            }, onMouseOver: (e) => {
                                                e.currentTarget.style.transform = 'translateY(-2px)';
                                                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)';
                                                e.currentTarget.style.boxShadow = '0 0 25px rgba(255, 255, 255, 0.3)';
                                            }, onMouseOut: (e) => {
                                                e.currentTarget.style.transform = 'translateY(0)';
                                                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
                                                e.currentTarget.style.boxShadow = '0 0 15px rgba(255, 255, 255, 0.2)';
                                            }, children: "Glass Morphism" })] })] })), activeTab === 'cards' && (_jsxs("div", { style: {
                                display: 'grid',
                                gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                                gap: '1.5rem'
                            }, children: [_jsxs("div", { style: {
                                        background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.1), rgba(6, 182, 212, 0.1))',
                                        border: '1px solid rgba(16, 185, 129, 0.3)',
                                        borderRadius: '16px',
                                        padding: '1.5rem',
                                        boxShadow: '0 0 20px rgba(16, 185, 129, 0.3)',
                                        transition: 'all 0.3s ease'
                                    }, onMouseOver: (e) => {
                                        e.currentTarget.style.boxShadow = '0 0 30px rgba(16, 185, 129, 0.5)';
                                    }, onMouseOut: (e) => {
                                        e.currentTarget.style.boxShadow = '0 0 20px rgba(16, 185, 129, 0.3)';
                                    }, children: [_jsx("h3", { style: {
                                                fontSize: '1.5rem',
                                                fontWeight: '600',
                                                marginBottom: '0.5rem',
                                                background: 'linear-gradient(45deg, #10b981, #06b6d4)',
                                                WebkitBackgroundClip: 'text',
                                                WebkitTextFillColor: 'transparent'
                                            }, children: "Green Bioluminescent" }), _jsx("p", { style: { color: '#9ca3af', marginBottom: '1rem' }, children: "Ethereal green glow effects" }), _jsx("p", { children: "Beautiful bioluminescent lighting with emerald and cyan gradients." })] }), _jsxs("div", { style: {
                                        background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.1), rgba(236, 72, 153, 0.1))',
                                        border: '1px solid rgba(139, 92, 246, 0.3)',
                                        borderRadius: '16px',
                                        padding: '1.5rem',
                                        boxShadow: '0 0 20px rgba(139, 92, 246, 0.3)',
                                        transition: 'all 0.3s ease'
                                    }, onMouseOver: (e) => {
                                        e.currentTarget.style.boxShadow = '0 0 30px rgba(139, 92, 246, 0.5)';
                                    }, onMouseOut: (e) => {
                                        e.currentTarget.style.boxShadow = '0 0 20px rgba(139, 92, 246, 0.3)';
                                    }, children: [_jsx("h3", { style: {
                                                fontSize: '1.5rem',
                                                fontWeight: '600',
                                                marginBottom: '0.5rem',
                                                background: 'linear-gradient(45deg, #8b5cf6, #ec4899)',
                                                WebkitBackgroundClip: 'text',
                                                WebkitTextFillColor: 'transparent'
                                            }, children: "Purple Luminescent" }), _jsx("p", { style: { color: '#9ca3af', marginBottom: '1rem' }, children: "Vibrant purple energy" }), _jsx("p", { children: "Dynamic purple and pink gradients with luminescent effects." })] }), _jsxs("div", { style: {
                                        background: 'linear-gradient(135deg, rgba(249, 115, 22, 0.1), rgba(239, 68, 68, 0.1))',
                                        border: '1px solid rgba(249, 115, 22, 0.3)',
                                        borderRadius: '16px',
                                        padding: '1.5rem',
                                        boxShadow: '0 0 20px rgba(249, 115, 22, 0.3)',
                                        transition: 'all 0.3s ease'
                                    }, onMouseOver: (e) => {
                                        e.currentTarget.style.boxShadow = '0 0 30px rgba(249, 115, 22, 0.5)';
                                    }, onMouseOut: (e) => {
                                        e.currentTarget.style.boxShadow = '0 0 20px rgba(249, 115, 22, 0.3)';
                                    }, children: [_jsx("h3", { style: {
                                                fontSize: '1.5rem',
                                                fontWeight: '600',
                                                marginBottom: '0.5rem',
                                                background: 'linear-gradient(45deg, #f97316, #ef4444)',
                                                WebkitBackgroundClip: 'text',
                                                WebkitTextFillColor: 'transparent'
                                            }, children: "Orange Fire" }), _jsx("p", { style: { color: '#9ca3af', marginBottom: '1rem' }, children: "Burning intensity" }), _jsx("p", { children: "Fiery orange and red gradients with warm glow effects." })] }), _jsxs("div", { style: {
                                        background: 'rgba(255, 255, 255, 0.1)',
                                        backdropFilter: 'blur(20px)',
                                        border: '1px solid rgba(255, 255, 255, 0.2)',
                                        borderRadius: '16px',
                                        padding: '1.5rem',
                                        boxShadow: '0 0 20px rgba(255, 255, 255, 0.1)',
                                        transition: 'all 0.3s ease'
                                    }, onMouseOver: (e) => {
                                        e.currentTarget.style.background = 'rgba(255, 255, 255, 0.15)';
                                        e.currentTarget.style.boxShadow = '0 0 30px rgba(255, 255, 255, 0.2)';
                                    }, onMouseOut: (e) => {
                                        e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
                                        e.currentTarget.style.boxShadow = '0 0 20px rgba(255, 255, 255, 0.1)';
                                    }, children: [_jsx("h3", { style: {
                                                fontSize: '1.5rem',
                                                fontWeight: '600',
                                                marginBottom: '0.5rem',
                                                color: 'white'
                                            }, children: "Glass Morphism" }), _jsx("p", { style: { color: '#9ca3af', marginBottom: '1rem' }, children: "Frosted glass effect" }), _jsx("p", { children: "Beautiful glass morphism with backdrop blur and transparency." })] })] })), activeTab === 'loading' && (_jsxs("div", { style: {
                                background: 'rgba(255, 255, 255, 0.1)',
                                backdropFilter: 'blur(20px)',
                                border: '1px solid rgba(255, 255, 255, 0.2)',
                                borderRadius: '16px',
                                padding: '2rem'
                            }, children: [_jsx("h2", { style: {
                                        fontSize: '2rem',
                                        fontWeight: '600',
                                        marginBottom: '1rem',
                                        background: 'linear-gradient(45deg, #ff0080, #ff8c00)',
                                        WebkitBackgroundClip: 'text',
                                        WebkitTextFillColor: 'transparent'
                                    }, children: "Loading Components" }), _jsx("p", { style: { color: '#9ca3af', marginBottom: '2rem' }, children: "Sophisticated loading states and animations" }), _jsxs("div", { style: {
                                        display: 'grid',
                                        gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
                                        gap: '2rem'
                                    }, children: [_jsxs("div", { style: { textAlign: 'center' }, children: [_jsxs("div", { style: {
                                                        width: '40px',
                                                        height: '40px',
                                                        margin: '0 auto 1rem',
                                                        position: 'relative'
                                                    }, children: [_jsx("div", { style: {
                                                                position: 'absolute',
                                                                inset: 0,
                                                                borderRadius: '50%',
                                                                border: '3px solid rgba(16, 185, 129, 0.3)',
                                                                animation: 'pulse 2s ease-in-out infinite'
                                                            } }), _jsx("div", { style: {
                                                                position: 'absolute',
                                                                inset: 0,
                                                                borderRadius: '50%',
                                                                border: '3px solid transparent',
                                                                borderTop: '3px solid #10b981',
                                                                animation: 'spin 1s linear infinite'
                                                            } })] }), _jsx("p", { style: { fontSize: '0.875rem', color: '#10b981' }, children: "Green Bioluminescent" })] }), _jsxs("div", { style: { textAlign: 'center' }, children: [_jsxs("div", { style: {
                                                        width: '40px',
                                                        height: '40px',
                                                        margin: '0 auto 1rem',
                                                        position: 'relative'
                                                    }, children: [_jsx("div", { style: {
                                                                position: 'absolute',
                                                                inset: 0,
                                                                borderRadius: '50%',
                                                                border: '3px solid rgba(139, 92, 246, 0.3)',
                                                                animation: 'pulse 2s ease-in-out infinite'
                                                            } }), _jsx("div", { style: {
                                                                position: 'absolute',
                                                                inset: 0,
                                                                borderRadius: '50%',
                                                                border: '3px solid transparent',
                                                                borderTop: '3px solid #8b5cf6',
                                                                animation: 'spin 1s linear infinite'
                                                            } })] }), _jsx("p", { style: { fontSize: '0.875rem', color: '#8b5cf6' }, children: "Purple Luminescent" })] }), _jsxs("div", { style: { textAlign: 'center' }, children: [_jsxs("div", { style: {
                                                        width: '40px',
                                                        height: '40px',
                                                        margin: '0 auto 1rem',
                                                        position: 'relative'
                                                    }, children: [_jsx("div", { style: {
                                                                position: 'absolute',
                                                                inset: 0,
                                                                borderRadius: '50%',
                                                                border: '3px solid rgba(249, 115, 22, 0.3)',
                                                                animation: 'pulse 2s ease-in-out infinite'
                                                            } }), _jsx("div", { style: {
                                                                position: 'absolute',
                                                                inset: 0,
                                                                borderRadius: '50%',
                                                                border: '3px solid transparent',
                                                                borderTop: '3px solid #f97316',
                                                                animation: 'spin 1s linear infinite'
                                                            } })] }), _jsx("p", { style: { fontSize: '0.875rem', color: '#f97316' }, children: "Orange Fire" })] }), _jsxs("div", { style: { textAlign: 'center' }, children: [_jsx("div", { style: {
                                                        display: 'flex',
                                                        gap: '0.25rem',
                                                        justifyContent: 'center',
                                                        marginBottom: '1rem'
                                                    }, children: [0, 1, 2].map((i) => (_jsx("div", { style: {
                                                            width: '8px',
                                                            height: '8px',
                                                            borderRadius: '50%',
                                                            background: 'linear-gradient(45deg, #ff0080, #ff8c00)',
                                                            animation: 'pulse 1.5s ease-in-out infinite',
                                                            animationDelay: `${i * 0.2}s`
                                                        } }, i))) }), _jsx("p", { style: { fontSize: '0.875rem', color: '#ff0080' }, children: "Rainbow Pulse" })] })] })] })), activeTab === 'badges' && (_jsxs("div", { style: {
                                background: 'rgba(255, 255, 255, 0.1)',
                                backdropFilter: 'blur(20px)',
                                border: '1px solid rgba(255, 255, 255, 0.2)',
                                borderRadius: '16px',
                                padding: '2rem'
                            }, children: [_jsx("h2", { style: {
                                        fontSize: '2rem',
                                        fontWeight: '600',
                                        marginBottom: '1rem',
                                        background: 'linear-gradient(45deg, #ff0080, #ff8c00)',
                                        WebkitBackgroundClip: 'text',
                                        WebkitTextFillColor: 'transparent'
                                    }, children: "Badge Components" }), _jsx("p", { style: { color: '#9ca3af', marginBottom: '2rem' }, children: "Status indicators and skill badges with glowing effects" }), _jsxs("div", { style: { display: 'flex', flexWrap: 'wrap', gap: '1rem', marginBottom: '2rem' }, children: [_jsxs("div", { style: {
                                                display: 'inline-flex',
                                                alignItems: 'center',
                                                gap: '0.5rem',
                                                padding: '0.5rem 1rem',
                                                borderRadius: '9999px',
                                                fontSize: '0.875rem',
                                                fontWeight: '600',
                                                background: 'linear-gradient(45deg, rgba(16, 185, 129, 0.2), rgba(6, 182, 212, 0.2))',
                                                border: '1px solid rgba(16, 185, 129, 0.3)',
                                                color: '#10b981',
                                                boxShadow: '0 0 10px rgba(16, 185, 129, 0.3)'
                                            }, children: [_jsx("span", { style: { fontSize: '0.75rem' }, children: "\u25CF" }), "Online"] }), _jsxs("div", { style: {
                                                display: 'inline-flex',
                                                alignItems: 'center',
                                                gap: '0.5rem',
                                                padding: '0.5rem 1rem',
                                                borderRadius: '9999px',
                                                fontSize: '0.875rem',
                                                fontWeight: '600',
                                                background: 'linear-gradient(45deg, rgba(139, 92, 246, 0.2), rgba(236, 72, 153, 0.2))',
                                                border: '1px solid rgba(139, 92, 246, 0.3)',
                                                color: '#8b5cf6',
                                                boxShadow: '0 0 10px rgba(139, 92, 246, 0.3)'
                                            }, children: [_jsx("span", { style: { fontSize: '0.75rem' }, children: "\u25CF" }), "Busy"] }), _jsxs("div", { style: {
                                                display: 'inline-flex',
                                                alignItems: 'center',
                                                gap: '0.5rem',
                                                padding: '0.5rem 1rem',
                                                borderRadius: '9999px',
                                                fontSize: '0.875rem',
                                                fontWeight: '600',
                                                background: 'linear-gradient(45deg, rgba(249, 115, 22, 0.2), rgba(239, 68, 68, 0.2))',
                                                border: '1px solid rgba(249, 115, 22, 0.3)',
                                                color: '#f97316',
                                                boxShadow: '0 0 10px rgba(249, 115, 22, 0.3)'
                                            }, children: [_jsx("span", { style: { fontSize: '0.75rem' }, children: "\u25CF" }), "Away"] })] }), _jsxs("div", { style: { display: 'flex', flexWrap: 'wrap', gap: '1rem' }, children: [_jsx("div", { style: {
                                                padding: '0.5rem 1rem',
                                                borderRadius: '9999px',
                                                fontSize: '0.875rem',
                                                fontWeight: '600',
                                                background: 'linear-gradient(45deg, rgba(59, 130, 246, 0.2), rgba(6, 182, 212, 0.2))',
                                                border: '1px solid rgba(59, 130, 246, 0.3)',
                                                color: '#3b82f6'
                                            }, children: "React" }), _jsx("div", { style: {
                                                padding: '0.5rem 1rem',
                                                borderRadius: '9999px',
                                                fontSize: '0.875rem',
                                                fontWeight: '600',
                                                background: 'linear-gradient(45deg, rgba(139, 92, 246, 0.2), rgba(236, 72, 153, 0.2))',
                                                border: '1px solid rgba(139, 92, 246, 0.3)',
                                                color: '#8b5cf6'
                                            }, children: "TypeScript" }), _jsx("div", { style: {
                                                padding: '0.5rem 1rem',
                                                borderRadius: '9999px',
                                                fontSize: '0.875rem',
                                                fontWeight: '600',
                                                background: 'linear-gradient(45deg, rgba(16, 185, 129, 0.2), rgba(6, 182, 212, 0.2))',
                                                border: '1px solid rgba(16, 185, 129, 0.3)',
                                                color: '#10b981'
                                            }, children: "Node.js" }), _jsx("div", { style: {
                                                padding: '0.5rem 1rem',
                                                borderRadius: '9999px',
                                                fontSize: '0.875rem',
                                                fontWeight: '600',
                                                background: 'linear-gradient(45deg, rgba(249, 115, 22, 0.2), rgba(239, 68, 68, 0.2))',
                                                border: '1px solid rgba(249, 115, 22, 0.3)',
                                                color: '#f97316'
                                            }, children: "AI/ML" })] })] })), activeTab === 'inputs' && (_jsxs("div", { style: {
                                background: 'rgba(255, 255, 255, 0.1)',
                                backdropFilter: 'blur(20px)',
                                border: '1px solid rgba(255, 255, 255, 0.2)',
                                borderRadius: '16px',
                                padding: '2rem'
                            }, children: [_jsx("h2", { style: {
                                        fontSize: '2rem',
                                        fontWeight: '600',
                                        marginBottom: '1rem',
                                        background: 'linear-gradient(45deg, #ff0080, #ff8c00)',
                                        WebkitBackgroundClip: 'text',
                                        WebkitTextFillColor: 'transparent'
                                    }, children: "Input Components" }), _jsx("p", { style: { color: '#9ca3af', marginBottom: '2rem' }, children: "Enhanced input fields with glass morphism and bioluminescent effects" }), _jsxs("div", { style: { display: 'flex', flexDirection: 'column', gap: '1.5rem' }, children: [_jsxs("div", { children: [_jsx("label", { style: {
                                                        display: 'block',
                                                        fontSize: '0.875rem',
                                                        fontWeight: '500',
                                                        marginBottom: '0.5rem',
                                                        color: '#10b981'
                                                    }, children: "Green Bioluminescent Input" }), _jsx("input", { type: "text", placeholder: "Enter your text here...", value: inputs.green, onChange: e => handleInput('green', e.target.value), style: {
                                                        width: '100%',
                                                        padding: '12px 16px',
                                                        fontSize: '1rem',
                                                        borderRadius: '8px',
                                                        border: '1px solid rgba(16, 185, 129, 0.3)',
                                                        background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.1), rgba(6, 182, 212, 0.1))',
                                                        color: 'white',
                                                        outline: 'none',
                                                        transition: 'all 0.3s ease',
                                                        boxSizing: 'border-box'
                                                    }, onFocus: e => {
                                                        e.target.style.border = '1px solid rgba(16, 185, 129, 0.5)';
                                                        e.target.style.boxShadow = '0 0 15px rgba(16, 185, 129, 0.3)';
                                                        e.target.style.transform = 'scale(1.02)';
                                                    }, onBlur: e => {
                                                        e.target.style.border = '1px solid rgba(16, 185, 129, 0.3)';
                                                        e.target.style.boxShadow = 'none';
                                                        e.target.style.transform = 'scale(1)';
                                                    } })] }), _jsxs("div", { children: [_jsx("label", { style: {
                                                        display: 'block',
                                                        fontSize: '0.875rem',
                                                        fontWeight: '500',
                                                        marginBottom: '0.5rem',
                                                        color: '#8b5cf6'
                                                    }, children: "Purple Luminescent Input" }), _jsx("input", { type: "text", placeholder: "Purple glow effect...", value: inputs.purple, onChange: e => handleInput('purple', e.target.value), style: {
                                                        width: '100%',
                                                        padding: '12px 16px',
                                                        fontSize: '1rem',
                                                        borderRadius: '8px',
                                                        border: '1px solid rgba(139, 92, 246, 0.3)',
                                                        background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.1), rgba(236, 72, 153, 0.1))',
                                                        color: 'white',
                                                        outline: 'none',
                                                        transition: 'all 0.3s ease',
                                                        boxSizing: 'border-box'
                                                    }, onFocus: e => {
                                                        e.target.style.border = '1px solid rgba(139, 92, 246, 0.5)';
                                                        e.target.style.boxShadow = '0 0 15px rgba(139, 92, 246, 0.3)';
                                                        e.target.style.transform = 'scale(1.02)';
                                                    }, onBlur: e => {
                                                        e.target.style.border = '1px solid rgba(139, 92, 246, 0.3)';
                                                        e.target.style.boxShadow = 'none';
                                                        e.target.style.transform = 'scale(1)';
                                                    } })] }), _jsxs("div", { children: [_jsx("label", { style: {
                                                        display: 'block',
                                                        fontSize: '0.875rem',
                                                        fontWeight: '500',
                                                        marginBottom: '0.5rem',
                                                        color: '#f97316'
                                                    }, children: "Orange Fire Input" }), _jsx("input", { type: "text", placeholder: "Fiery orange effect...", value: inputs.orange, onChange: e => handleInput('orange', e.target.value), style: {
                                                        width: '100%',
                                                        padding: '12px 16px',
                                                        fontSize: '1rem',
                                                        borderRadius: '8px',
                                                        border: '1px solid rgba(249, 115, 22, 0.3)',
                                                        background: 'linear-gradient(135deg, rgba(249, 115, 22, 0.1), rgba(239, 68, 68, 0.1))',
                                                        color: 'white',
                                                        outline: 'none',
                                                        transition: 'all 0.3s ease',
                                                        boxSizing: 'border-box'
                                                    }, onFocus: e => {
                                                        e.target.style.border = '1px solid rgba(249, 115, 22, 0.5)';
                                                        e.target.style.boxShadow = '0 0 15px rgba(249, 115, 22, 0.3)';
                                                        e.target.style.transform = 'scale(1.02)';
                                                    }, onBlur: e => {
                                                        e.target.style.border = '1px solid rgba(249, 115, 22, 0.3)';
                                                        e.target.style.boxShadow = 'none';
                                                        e.target.style.transform = 'scale(1)';
                                                    } })] }), _jsxs("div", { children: [_jsx("label", { style: {
                                                        display: 'block',
                                                        fontSize: '0.875rem',
                                                        fontWeight: '500',
                                                        marginBottom: '0.5rem',
                                                        color: 'white'
                                                    }, children: "Glass Morphism Input" }), _jsx("input", { type: "text", placeholder: "Glass morphism effect...", value: inputs.glass, onChange: e => handleInput('glass', e.target.value), style: {
                                                        width: '100%',
                                                        padding: '12px 16px',
                                                        fontSize: '1rem',
                                                        borderRadius: '8px',
                                                        border: '1px solid rgba(255, 255, 255, 0.2)',
                                                        background: 'rgba(255, 255, 255, 0.1)',
                                                        backdropFilter: 'blur(20px)',
                                                        color: 'white',
                                                        outline: 'none',
                                                        transition: 'all 0.3s ease',
                                                        boxSizing: 'border-box'
                                                    }, onFocus: e => {
                                                        e.target.style.border = '1px solid rgba(255, 255, 255, 0.4)';
                                                        e.target.style.background = 'rgba(255, 255, 255, 0.15)';
                                                        e.target.style.transform = 'scale(1.02)';
                                                    }, onBlur: e => {
                                                        e.target.style.border = '1px solid rgba(255, 255, 255, 0.2)';
                                                        e.target.style.background = 'rgba(255, 255, 255, 0.1)';
                                                        e.target.style.transform = 'scale(1)';
                                                    } })] }), _jsxs("div", { children: [_jsx("label", { style: {
                                                        display: 'block',
                                                        fontSize: '0.875rem',
                                                        fontWeight: '500',
                                                        marginBottom: '0.5rem',
                                                        color: '#3b82f6'
                                                    }, children: "Blue Ocean Textarea" }), _jsx("textarea", { placeholder: "Multi-line text input with blue ocean styling...", rows: 4, value: inputs.blueTextarea, onChange: e => handleInput('blueTextarea', e.target.value), style: {
                                                        width: '100%',
                                                        padding: '12px 16px',
                                                        fontSize: '1rem',
                                                        borderRadius: '8px',
                                                        border: '1px solid rgba(59, 130, 246, 0.3)',
                                                        background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.1), rgba(6, 182, 212, 0.1))',
                                                        color: 'white',
                                                        outline: 'none',
                                                        transition: 'all 0.3s ease',
                                                        resize: 'vertical',
                                                        minHeight: '100px',
                                                        boxSizing: 'border-box',
                                                        fontFamily: 'Inter, sans-serif'
                                                    }, onFocus: e => {
                                                        e.target.style.border = '1px solid rgba(59, 130, 246, 0.5)';
                                                        e.target.style.boxShadow = '0 0 15px rgba(59, 130, 246, 0.3)';
                                                        e.target.style.transform = 'scale(1.01)';
                                                    }, onBlur: e => {
                                                        e.target.style.border = '1px solid rgba(59, 130, 246, 0.3)';
                                                        e.target.style.boxShadow = 'none';
                                                        e.target.style.transform = 'scale(1)';
                                                    } })] }), _jsxs("div", { style: {
                                                display: 'flex',
                                                gap: '1rem',
                                                flexWrap: 'wrap',
                                                marginTop: '1rem'
                                            }, children: [_jsx("button", { style: {
                                                        padding: '8px 16px',
                                                        fontSize: '0.875rem',
                                                        fontWeight: '600',
                                                        borderRadius: '6px',
                                                        border: 'none',
                                                        cursor: 'pointer',
                                                        transition: 'all 0.3s ease',
                                                        background: 'linear-gradient(45deg, #10b981, #06b6d4)',
                                                        color: 'white',
                                                        boxShadow: '0 0 10px rgba(16, 185, 129, 0.3)'
                                                    }, onClick: handleSubmit, onMouseOver: (e) => {
                                                        e.currentTarget.style.transform = 'translateY(-2px)';
                                                        e.currentTarget.style.boxShadow = '0 0 15px rgba(16, 185, 129, 0.5)';
                                                    }, onMouseOut: (e) => {
                                                        e.currentTarget.style.transform = 'translateY(0)';
                                                        e.currentTarget.style.boxShadow = '0 0 10px rgba(16, 185, 129, 0.3)';
                                                    }, children: "Submit" }), _jsx("button", { style: {
                                                        padding: '8px 16px',
                                                        fontSize: '0.875rem',
                                                        fontWeight: '600',
                                                        borderRadius: '6px',
                                                        border: '1px solid rgba(255, 255, 255, 0.3)',
                                                        cursor: 'pointer',
                                                        transition: 'all 0.3s ease',
                                                        background: 'rgba(255, 255, 255, 0.1)',
                                                        color: 'white'
                                                    }, onClick: handleClear, onMouseOver: (e) => {
                                                        e.currentTarget.style.transform = 'translateY(-2px)';
                                                        e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)';
                                                    }, onMouseOut: (e) => {
                                                        e.currentTarget.style.transform = 'translateY(0)';
                                                        e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
                                                    }, children: "Clear" })] })] })] }))] })] }) }));
};
