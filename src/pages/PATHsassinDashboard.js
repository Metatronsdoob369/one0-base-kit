import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
// SVG ICONS
const iconSize = 62;
const SelfIcon = (_jsxs("svg", { width: iconSize, height: iconSize, viewBox: "0 0 62 62", fill: "none", xmlns: "http://www.w3.org/2000/svg", children: [_jsx("circle", { cx: "31", cy: "31", r: "20", stroke: "#b993d6", strokeWidth: "2", fill: "none" }), _jsx("circle", { cx: "31", cy: "31", r: "6", fill: "#b993d6" })] }));
const SkillsIcon = (_jsx("svg", { width: iconSize, height: iconSize, viewBox: "0 0 62 62", fill: "none", xmlns: "http://www.w3.org/2000/svg", children: _jsx("rect", { x: "16", y: "16", width: "30", height: "30", rx: "4", stroke: "#b993d6", strokeWidth: "2", fill: "none" }) }));
const OthersIcon = (_jsx("svg", { width: iconSize, height: iconSize, viewBox: "0 0 62 62", fill: "none", xmlns: "http://www.w3.org/2000/svg", children: _jsx("circle", { cx: "31", cy: "31", r: "20", stroke: "#b993d6", strokeWidth: "2", fill: "none" }) }));
const AgentIcon = (_jsxs("svg", { width: iconSize, height: iconSize, viewBox: "0 0 62 62", fill: "none", xmlns: "http://www.w3.org/2000/svg", children: [_jsx("circle", { cx: "31", cy: "25", r: "8", stroke: "#b993d6", strokeWidth: "2", fill: "none" }), _jsx("path", { d: "M15 45 C15 35 23 30 31 30 C39 30 47 35 47 45", stroke: "#b993d6", strokeWidth: "2", fill: "none" }), _jsx("circle", { cx: "26", cy: "22", r: "2", fill: "#b993d6" }), _jsx("circle", { cx: "36", cy: "22", r: "2", fill: "#b993d6" }), _jsx("path", { d: "M28 28 Q31 30 34 28", stroke: "#b993d6", strokeWidth: "1.5", fill: "none" })] }));
const View3DIcon = (_jsxs("svg", { width: iconSize, height: iconSize, viewBox: "0 0 62 62", fill: "none", xmlns: "http://www.w3.org/2000/svg", children: [_jsx("path", { d: "M20 20 L42 20 L42 42 L20 42 Z", stroke: "#b993d6", strokeWidth: "2", fill: "none" }), _jsx("path", { d: "M20 20 L30 12 L50 12 L50 32 L42 20", stroke: "#b993d6", strokeWidth: "2", fill: "none" }), _jsx("path", { d: "M30 12 L30 32 L42 42", stroke: "#b993d6", strokeWidth: "2", fill: "none" }), _jsx("circle", { cx: "31", cy: "31", r: "3", fill: "#b993d6" })] }));
const DemoIcon = (_jsxs("svg", { width: iconSize, height: iconSize, viewBox: "0 0 62 62", fill: "none", xmlns: "http://www.w3.org/2000/svg", children: [_jsx("rect", { x: "16", y: "16", width: "30", height: "20", rx: "2", stroke: "#b993d6", strokeWidth: "2", fill: "none" }), _jsx("rect", { x: "20", y: "20", width: "22", height: "12", rx: "1", stroke: "#b993d6", strokeWidth: "1.5", fill: "none" }), _jsx("circle", { cx: "26", cy: "26", r: "1.5", fill: "#b993d6" }), _jsx("circle", { cx: "31", cy: "26", r: "1.5", fill: "#b993d6" }), _jsx("circle", { cx: "36", cy: "26", r: "1.5", fill: "#b993d6" }), _jsx("path", { d: "M20 40 L42 40", stroke: "#b993d6", strokeWidth: "2" }), _jsx("path", { d: "M25 40 L25 44", stroke: "#b993d6", strokeWidth: "2" }), _jsx("path", { d: "M31 40 L31 44", stroke: "#b993d6", strokeWidth: "2" }), _jsx("path", { d: "M37 40 L37 44", stroke: "#b993d6", strokeWidth: "2" })] }));
// Optics/Sphere SVG for header
const OpticsIcon = (_jsxs("svg", { width: "48", height: "48", viewBox: "0 0 48 48", fill: "none", xmlns: "http://www.w3.org/2000/svg", children: [_jsx("defs", { children: _jsxs("radialGradient", { id: "lensReflection", cx: "40%", cy: "40%", r: "30%", children: [_jsx("stop", { offset: "0%", stopColor: "#fff", stopOpacity: "0.9" }), _jsx("stop", { offset: "50%", stopColor: "#fff", stopOpacity: "0.4" }), _jsx("stop", { offset: "100%", stopColor: "#fff", stopOpacity: "0" })] }) }), _jsx("circle", { cx: "24", cy: "24", r: "20", stroke: "#b993d6", strokeWidth: "2", fill: "none" }), _jsx("path", { d: "M24 12 L32 24 L24 36 L16 24 Z", stroke: "#b993d6", strokeWidth: "2", fill: "none" }), _jsx("ellipse", { cx: "18", cy: "18", rx: "4", ry: "2", fill: "url(#lensReflection)" })] }));
// Brushed metal background (use uploaded texture)
const brushedMetal = `url('/gunmetal-brushed.png') center/cover, linear-gradient(135deg, #232526 0%, #414345 100%)`;
const embeddedText = {
    color: '#2a2b2c',
    fontWeight: 700,
    fontSize: '2rem',
    letterSpacing: '0.1em',
    textShadow: '0 2px 2px #232526, 0 1px 0 #c0c0c0',
    textTransform: 'uppercase',
    transition: 'filter 0.3s, text-shadow 0.3s',
    filter: 'brightness(0.8)',
    background: 'none',
    WebkitBackgroundClip: 'initial',
    WebkitTextFillColor: 'initial',
};
const embeddedTextHover = {
    ...embeddedText,
    filter: 'brightness(1.8)',
    background: 'linear-gradient(90deg, #e0e0e0 0%, #f0f0f0 100%)',
    backgroundClip: 'text',
    WebkitBackgroundClip: 'text',
    color: 'transparent',
    WebkitTextFillColor: 'transparent',
    textShadow: '0 0 8px #fff, 0 2px 2px #c0c0c0',
};
const cards = [
    {
        label: 'SELF',
        icon: SelfIcon,
        onClick: () => { },
    },
    {
        label: 'SKILLS',
        icon: SkillsIcon,
        onClick: () => { },
    },
    {
        label: 'OTHERS',
        icon: OthersIcon,
        onClick: () => { },
    },
    {
        label: 'AGENT',
        icon: AgentIcon,
        onClick: () => { },
    },
    {
        label: '3D VIEW',
        icon: View3DIcon,
        onClick: () => { },
    },
    {
        label: 'DEMO',
        icon: DemoIcon,
        onClick: () => { },
    },
    // TODO: Add the rest of the 13 disciplines here as you define them
];
const PATHsassinDashboard = () => {
    const navigate = useNavigate();
    const [hovered, setHovered] = React.useState(null);
    const [active, setActive] = React.useState(null);
    const [headerHover, setHeaderHover] = React.useState(false);
    const audioContextRef = useRef(null);
    // Initialize audio context on first user interaction
    const initAudio = () => {
        if (!audioContextRef.current) {
            audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)();
        }
    };
    const playClickSound = (frequency = 800, duration = 0.1) => {
        try {
            initAudio();
            if (!audioContextRef.current)
                return;
            const oscillator = audioContextRef.current.createOscillator();
            const gainNode = audioContextRef.current.createGain();
            oscillator.connect(gainNode);
            gainNode.connect(audioContextRef.current.destination);
            // Use square wave for more mechanical sound
            oscillator.frequency.setValueAtTime(frequency, audioContextRef.current.currentTime);
            oscillator.type = 'square';
            // Create a sharp attack and quick decay for click sound
            gainNode.gain.setValueAtTime(0, audioContextRef.current.currentTime);
            gainNode.gain.linearRampToValueAtTime(0.2, audioContextRef.current.currentTime + 0.01);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioContextRef.current.currentTime + duration);
            oscillator.start(audioContextRef.current.currentTime);
            oscillator.stop(audioContextRef.current.currentTime + duration);
        }
        catch (error) {
            console.error('Audio playback error:', error);
        }
    };
    const playDeepClick = () => {
        console.log('playDeepClick called');
        // Single heavy mechanical lock sound
        playClickSound(60, 0.15);
    };
    const handleCardClick = (i) => {
        console.log('Card clicked:', i, 'Current active:', active);
        if (active === i) {
            // Returning to unlocked state - double click
            console.log('Deactivating card');
            playDeepClick();
            setTimeout(() => {
                playDeepClick();
            }, 100);
            setActive(null);
        }
        else {
            // Activating - double click
            console.log('Activating card');
            playDeepClick();
            setTimeout(() => {
                playDeepClick();
            }, 100);
            setActive(i);
        }
        // Navigate to 3D View if that card is clicked
        if (cards[i].label === '3D VIEW') {
            navigate('/pathsassin-3d');
        }
    };
    return (_jsxs("div", { style: {
            minHeight: '100vh',
            width: '100vw',
            backgroundImage: `
          linear-gradient(135deg, #18191a 0%, #232526 100%),
          url('/hex-grade.png')
        `,
            backgroundSize: 'cover, 60%',
            backgroundPosition: 'center, center',
            backgroundRepeat: 'no-repeat, repeat',
            // Optional: overlay for extra depth
            position: 'relative',
        }, children: [_jsx("div", { style: {
                    position: 'absolute',
                    inset: 0,
                    background: 'rgba(0,0,0,0.35)', // adjust for more/less darkness
                    pointerEvents: 'none',
                    zIndex: 2,
                    mixBlendMode: 'overlay',
                } }), _jsxs("div", { style: { display: 'flex', alignItems: 'center', marginBottom: '2.5rem', position: 'relative', zIndex: 10 }, children: [_jsxs("div", { style: {
                            display: 'flex',
                            flexDirection: 'row',
                            alignItems: 'center',
                            position: 'relative',
                            background: brushedMetal,
                            backgroundBlendMode: 'overlay',
                            borderRadius: '1.2rem',
                            boxShadow: '0 8px 40px #000a, 0 1px 0 #fff2 inset',
                            border: '2px solid #b993d6',
                            padding: '1.5rem 2.5rem',
                            minWidth: '420px',
                            overflow: 'hidden',
                            gap: '1.5rem',
                        }, onMouseEnter: () => setHeaderHover(true), onMouseLeave: () => setHeaderHover(false), children: [_jsx("div", { style: { display: 'flex', alignItems: 'center', height: '100%' }, children: OpticsIcon }), _jsxs("div", { style: { display: 'flex', flexDirection: 'column', alignItems: 'center' }, children: [_jsx("div", { style: {
                                            ...embeddedText,
                                            fontSize: '2.2rem',
                                            letterSpacing: '0.18em',
                                            textAlign: 'center',
                                            textTransform: 'uppercase',
                                            position: 'relative',
                                            zIndex: 2,
                                            color: '#3a3b3c',
                                            filter: 'brightness(1.0)',
                                            background: headerHover
                                                ? 'linear-gradient(120deg, #3a3b3c 0%, #3a3b3c 35%, #fff8 45%, #fff 50%, #fff8 55%, #3a3b3c 65%, #3a3b3c 100%)'
                                                : 'none',
                                            backgroundSize: headerHover ? '200% 100%' : undefined,
                                            backgroundPosition: headerHover ? '0% 0' : undefined,
                                            WebkitBackgroundClip: headerHover ? 'text' : undefined,
                                            WebkitTextFillColor: headerHover ? 'transparent' : undefined,
                                            animation: headerHover ? 'streakTextRTL 0.8s linear 1' : undefined,
                                        }, children: "PATHSASSIN" }), _jsx("div", { style: {
                                            ...embeddedText,
                                            fontSize: '1.5rem',
                                            letterSpacing: '0.12em',
                                            textAlign: 'center',
                                            textTransform: 'uppercase',
                                            position: 'relative',
                                            zIndex: 2,
                                            color: '#3a3b3c',
                                            filter: 'brightness(1.0)',
                                            background: headerHover
                                                ? 'linear-gradient(120deg, #3a3b3c 0%, #3a3b3c 35%, #fff8 45%, #fff 50%, #fff8 55%, #3a3b3c 65%, #3a3b3c 100%)'
                                                : 'none',
                                            backgroundSize: headerHover ? '200% 100%' : undefined,
                                            backgroundPosition: headerHover ? '0% 0' : undefined,
                                            WebkitBackgroundClip: headerHover ? 'text' : undefined,
                                            WebkitTextFillColor: headerHover ? 'transparent' : undefined,
                                            animation: headerHover ? 'streakTextRTL 0.8s linear 1' : undefined,
                                        }, children: "DISCIPLINES" })] })] }), _jsx("button", { onClick: () => {
                            console.log('Test button clicked');
                            playDeepClick();
                        }, style: {
                            marginLeft: '2rem',
                            padding: '0.5rem 1rem',
                            background: 'rgba(255,255,255,0.1)',
                            border: '1px solid #b993d6',
                            borderRadius: '0.5rem',
                            color: '#b993d6',
                            cursor: 'pointer',
                            fontSize: '0.8rem',
                        }, children: "Test Sound" })] }), _jsx("div", { style: {
                    display: 'flex',
                    flexWrap: 'wrap',
                    justifyContent: 'center',
                    gap: '2.5rem',
                    width: '100%',
                    maxWidth: '950px',
                    position: 'relative',
                    zIndex: 2,
                }, children: cards.map((card, i) => {
                    const isActive = active === i;
                    return (_jsxs("div", { style: {
                            background: brushedMetal,
                            backgroundBlendMode: 'overlay',
                            borderRadius: '1.5rem',
                            boxShadow: isActive
                                ? '0 2px 8px #000a, 0 1px 0 #fff2 inset'
                                : hovered === i
                                    ? '0 16px 60px #b993d6cc, 0 1px 0 #fff4 inset'
                                    : '0 8px 40px #000a, 0 1px 0 #fff2 inset',
                            border: isActive ? '2px solid #fff' : '2px solid #b993d6',
                            position: 'relative',
                            overflow: 'hidden',
                            minWidth: '220px',
                            minHeight: '220px',
                            maxWidth: '260px',
                            flex: '1 1 260px',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            transition: 'all 0.2s cubic-bezier(.4,2,.6,1)',
                            cursor: 'pointer',
                            outline: 'none',
                            transform: isActive
                                ? 'scale(0.97) translateY(2px)'
                                : hovered === i
                                    ? 'scale(1.04) translateY(-6px)'
                                    : 'scale(1) translateY(0)',
                        }, tabIndex: 0, onClick: () => handleCardClick(i), onMouseEnter: e => {
                            setHovered(i);
                        }, onMouseLeave: e => {
                            setHovered(null);
                        }, children: [_jsx("div", { className: "icon", style: {
                                    marginBottom: '1.2rem',
                                    color: '#b993d6',
                                    filter: hovered === i || isActive
                                        ? 'drop-shadow(0 0 16px #fff) brightness(2)'
                                        : 'drop-shadow(0 2px 8px #fff6) brightness(1)',
                                    zIndex: 2,
                                    transition: 'filter 0.3s',
                                }, children: card.icon }), _jsx("div", { style: hovered === i || isActive ? embeddedTextHover : embeddedText, children: card.label })] }, i));
                }) }), _jsx("style", { children: `
          @keyframes streakTextRTL {
            0% { background-position: 100% 0; }
            100% { background-position: 0 0; }
          }
        ` })] }));
};
export default PATHsassinDashboard;
