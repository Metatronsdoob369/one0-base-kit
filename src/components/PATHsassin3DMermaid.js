import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useRef, useMemo, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Line, Sphere, Html, MeshDistortMaterial, Float } from '@react-three/drei';
import { motion } from 'framer-motion';
// Particle system for ambient intelligence
const IntelligenceParticles = ({ count, masteryLevel }) => {
    const particlesRef = useRef(null);
    const particles = useMemo(() => {
        const positions = new Float32Array(count * 3);
        const colors = new Float32Array(count * 3);
        for (let i = 0; i < count; i++) {
            // Create particles in a sphere
            const theta = Math.random() * Math.PI * 2;
            const phi = Math.acos((Math.random() * 2) - 1);
            const r = 12 + Math.random() * 8;
            positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
            positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
            positions[i * 3 + 2] = r * Math.cos(phi);
            // Color based on mastery
            const intensity = 0.5 + (masteryLevel / 13) * 0.5;
            colors[i * 3] = intensity;
            colors[i * 3 + 1] = intensity;
            colors[i * 3 + 2] = intensity;
        }
        return { positions, colors };
    }, [count, masteryLevel]);
    useFrame((state) => {
        if (particlesRef.current) {
            particlesRef.current.rotation.y = state.clock.elapsedTime * 0.05;
            particlesRef.current.rotation.x = state.clock.elapsedTime * 0.03;
        }
    });
    return (_jsxs("points", { ref: particlesRef, children: [_jsxs("bufferGeometry", { children: [_jsx("bufferAttribute", { attach: "attributes-position", count: particles.positions.length / 3, array: particles.positions, itemSize: 3 }), _jsx("bufferAttribute", { attach: "attributes-color", count: particles.colors.length / 3, array: particles.colors, itemSize: 3 })] }), _jsx("pointsMaterial", { size: 0.05, vertexColors: true, transparent: true, opacity: 0.6 })] }));
};
// Central consciousness core
const ConsciousnessCore = ({ masteredSkills, activeConnections }) => {
    const coreRef = useRef(null);
    const innerRef = useRef(null);
    useFrame((state) => {
        if (coreRef.current) {
            coreRef.current.rotation.y = state.clock.elapsedTime * 0.1;
        }
        if (innerRef.current) {
            innerRef.current.rotation.x = state.clock.elapsedTime * 0.15;
            innerRef.current.rotation.z = state.clock.elapsedTime * 0.1;
        }
    });
    const coreSize = 2 + (masteredSkills.length * 0.15);
    const brightness = 0.2 + (activeConnections * 0.1);
    return (_jsxs("group", { children: [_jsx(Sphere, { ref: coreRef, args: [coreSize, 32, 32], children: _jsx(MeshDistortMaterial, { color: "#ffffff", emissive: "#ffffff", emissiveIntensity: brightness, metalness: 0.8, roughness: 0.2, transparent: true, opacity: 0.3, distort: 0.2, speed: 2 }) }), _jsx(Sphere, { ref: innerRef, args: [coreSize * 0.6, 16, 16], children: _jsx("meshStandardMaterial", { color: "#00ffff", emissive: "#00ffff", emissiveIntensity: brightness * 1.5, wireframe: true }) }), _jsx(Sphere, { args: [coreSize * 1.5, 16, 16], children: _jsx("meshBasicMaterial", { color: "#ffffff", transparent: true, opacity: 0.1, wireframe: true }) }), _jsx(Html, { position: [0, 0, 0], center: true, children: _jsxs("div", { className: "text-center pointer-events-none", children: [_jsxs("div", { className: "text-2xl font-bold text-white drop-shadow-lg", children: [masteredSkills.length, "/13"] }), _jsx("div", { className: "text-xs text-white/80 uppercase tracking-wider", children: "Disciplines Integrated" }), _jsxs("div", { className: "text-xs text-cyan-400 mt-1", children: [activeConnections, " Active Syntheses"] })] }) })] }));
};
// Skill node with neural aesthetic
const NeuralSkillNode = ({ node, isSelected, onSelect, masteredSkills, allNodes }) => {
    const meshRef = useRef(null);
    const [hovered, setHovered] = useState(false);
    const isMastered = masteredSkills.includes(node.id);
    const synthesisCount = node.connections.filter(conn => masteredSkills.includes(conn)).length;
    const synthesisIntensity = synthesisCount / node.connections.length;
    useFrame((state) => {
        if (meshRef.current) {
            // Orbital motion around core
            const time = state.clock.elapsedTime;
            const orbitSpeed = 0.1 + (node.synthesisStrength * 0.1);
            const orbitRadius = Math.sqrt(node.position[0] ** 2 + node.position[2] ** 2);
            if (!isSelected && !hovered) {
                meshRef.current.position.x = node.position[0] + Math.sin(time * orbitSpeed) * 0.5;
                meshRef.current.position.z = node.position[2] + Math.cos(time * orbitSpeed) * 0.5;
            }
            // Pulse when synthesizing
            if (synthesisCount > 0) {
                const pulse = 1 + Math.sin(time * 3) * 0.1 * synthesisIntensity;
                meshRef.current.scale.setScalar(pulse);
            }
        }
    });
    return (_jsx(Float, { speed: 2, rotationIntensity: 0.2, floatIntensity: 0.3, children: _jsxs("group", { ref: meshRef, position: node.position, children: [isMastered && (_jsx(Sphere, { args: [1.2, 16, 16], children: _jsx("meshBasicMaterial", { color: "#ffffff", transparent: true, opacity: 0.2, wireframe: true }) })), synthesisCount > 0 && (_jsx(Sphere, { args: [1 + synthesisCount * 0.2, 12, 12], children: _jsx("meshBasicMaterial", { color: "#00ff88", transparent: true, opacity: 0.1 * synthesisIntensity }) })), _jsx(Sphere, { args: [0.6, 32, 32], onPointerOver: () => {
                        setHovered(true);
                        document.body.style.cursor = 'pointer';
                    }, onPointerOut: () => {
                        setHovered(false);
                        document.body.style.cursor = 'default';
                    }, onClick: (e) => {
                        e.stopPropagation();
                        onSelect(node.id);
                    }, children: _jsx(MeshDistortMaterial, { color: isMastered ? "#ffffff" : node.color, emissive: isMastered ? "#ffffff" : node.color, emissiveIntensity: isMastered ? 0.8 : (hovered ? 0.6 : 0.3), metalness: 0.7, roughness: 0.3, distort: hovered ? 0.3 : 0.1, speed: 2 }) }), _jsxs("mesh", { rotation: [Math.PI / 2, 0, 0], children: [_jsx("torusGeometry", { args: [0.8, 0.02, 8, 32, (node.progress / 100) * Math.PI * 2] }), _jsx("meshBasicMaterial", { color: "#00ffff", transparent: true, opacity: 0.8 })] }), isMastered && node.connections.map(connId => {
                    const connNode = allNodes.find(n => n.id === connId);
                    if (connNode && masteredSkills.includes(connId)) {
                        return (_jsx(Line, { points: [[0, 0, 0], [
                                    connNode.position[0] - node.position[0],
                                    connNode.position[1] - node.position[1],
                                    connNode.position[2] - node.position[2]
                                ]], color: "#00ffff", lineWidth: 2, transparent: true, opacity: 0.3 }, connId));
                    }
                    return null;
                }), _jsx(Html, { position: [0, 1.2, 0], center: true, children: _jsxs("div", { className: "text-center pointer-events-none", children: [_jsx("div", { className: `text-xs font-bold px-3 py-1 rounded-full backdrop-blur-sm ${isMastered
                                    ? 'bg-white/90 text-black'
                                    : 'bg-black/60 text-white border border-white/30'}`, children: node.name }), synthesisCount > 0 && (_jsxs("div", { className: "text-xs text-cyan-400 mt-1 bg-black/60 px-2 py-0.5 rounded", children: [synthesisCount, " synthesis links"] }))] }) })] }) }));
};
// Energy streams connecting to core
const CoreConnection = ({ from, to, intensity }) => {
    const lineRef = useRef(null);
    useFrame((state) => {
        if (lineRef.current) {
            const time = state.clock.elapsedTime;
            // @ts-ignore
            lineRef.current.material.opacity = 0.3 + Math.sin(time * 2) * 0.2 * intensity;
        }
    });
    return (_jsx(Line, { ref: lineRef, points: [from, to], color: "#ffffff", lineWidth: 3, transparent: true, opacity: 0.5 }));
};
// Domain rings
const DomainRing = ({ radius, height, color, name, mastered, total }) => {
    return (_jsxs("group", { position: [0, height, 0], children: [_jsxs("mesh", { rotation: [-Math.PI / 2, 0, 0], children: [_jsx("torusGeometry", { args: [radius, 0.05, 8, 64] }), _jsx("meshStandardMaterial", { color: color, emissive: color, emissiveIntensity: 0.3, transparent: true, opacity: 0.4 })] }), _jsx(Html, { position: [radius + 1, 0, 0], center: true, children: _jsxs("div", { className: "text-xs font-bold text-white bg-black/60 px-2 py-1 rounded backdrop-blur-sm", children: [name, " (", mastered, "/", total, ")"] }) })] }));
};
const PATHsassin3DMermaid = () => {
    const [selectedNode, setSelectedNode] = useState(null);
    const [masteredSkills, setMasteredSkills] = useState(['stoicism', 'n8n']);
    const [showMilestoneFusion, setShowMilestoneFusion] = useState(false);
    // Calculate active synthesis connections
    const calculateActiveConnections = () => {
        let connections = 0;
        skillNodes.forEach(node => {
            if (masteredSkills.includes(node.id)) {
                node.connections.forEach(conn => {
                    if (masteredSkills.includes(conn)) {
                        connections++;
                    }
                });
            }
        });
        return connections / 2; // Divide by 2 to avoid counting twice
    };
    const skillNodes = [
        // Foundation Layer (Outer ring)
        {
            id: 'stoicism',
            name: 'Stoicism',
            domain: 'foundation',
            progress: 75,
            level: 'INTERMEDIATE',
            position: [8, 0, 0],
            color: '#3B82F6',
            connections: ['leadership', 'motivation', 'theosophy'],
            description: 'Mental resilience and emotional mastery',
            synthesisStrength: 0.8
        },
        {
            id: 'leadership',
            name: 'Leadership',
            domain: 'foundation',
            progress: 45,
            level: 'BEGINNER',
            position: [5.7, 0, 5.7],
            color: '#3B82F6',
            connections: ['stoicism', 'motivation', 'mentorship'],
            description: 'Team building and vision casting',
            synthesisStrength: 0.7
        },
        {
            id: 'motivation',
            name: 'Motivation',
            domain: 'foundation',
            progress: 60,
            level: 'INTERMEDIATE',
            position: [0, 0, 8],
            color: '#3B82F6',
            connections: ['leadership', 'executive', 'webdesign'],
            description: 'Influence and inspiration',
            synthesisStrength: 0.6
        },
        {
            id: 'executive',
            name: 'Executive',
            domain: 'foundation',
            progress: 30,
            level: 'NOVICE',
            position: [-5.7, 0, 5.7],
            color: '#3B82F6',
            connections: ['motivation', 'n8n', 'finance'],
            description: 'Strategic vision and decision making',
            synthesisStrength: 0.9
        },
        // Technical Layer (Middle ring)
        {
            id: 'n8n',
            name: 'Automation',
            domain: 'technical',
            progress: 85,
            level: 'ADVANCED',
            position: [6, 3, 0],
            color: '#8B5CF6',
            connections: ['executive', 'webdesign', 'graphicdesign'],
            description: 'Workflow automation mastery',
            synthesisStrength: 0.9
        },
        {
            id: 'webdesign',
            name: 'Web Design',
            domain: 'technical',
            progress: 55,
            level: 'INTERMEDIATE',
            position: [4.2, 3, 4.2],
            color: '#8B5CF6',
            connections: ['n8n', 'graphicdesign', 'motivation'],
            description: 'Digital architecture',
            synthesisStrength: 0.7
        },
        {
            id: 'graphicdesign',
            name: 'Visual Design',
            domain: 'technical',
            progress: 40,
            level: 'BEGINNER',
            position: [0, 3, 6],
            color: '#8B5CF6',
            connections: ['webdesign', 'mentorship', 'n8n'],
            description: 'Visual communication',
            synthesisStrength: 0.6
        },
        {
            id: 'mentorship',
            name: 'Mentorship',
            domain: 'technical',
            progress: 65,
            level: 'INTERMEDIATE',
            position: [-4.2, 3, 4.2],
            color: '#8B5CF6',
            connections: ['graphicdesign', 'language', 'leadership'],
            description: 'Knowledge transfer',
            synthesisStrength: 0.8
        },
        // Wisdom Layer (Inner ring)
        {
            id: 'language',
            name: 'Language',
            domain: 'wisdom',
            progress: 25,
            level: 'NOVICE',
            position: [4, 6, 0],
            color: '#F59E0B',
            connections: ['mentorship', 'business', 'theosophy'],
            description: 'Cross-cultural wisdom',
            synthesisStrength: 0.9
        },
        {
            id: 'business',
            name: 'Business',
            domain: 'wisdom',
            progress: 35,
            level: 'BEGINNER',
            position: [2.8, 6, 2.8],
            color: '#F59E0B',
            connections: ['language', 'finance', 'executive'],
            description: 'Global commerce understanding',
            synthesisStrength: 0.8
        },
        {
            id: 'finance',
            name: 'Finance',
            domain: 'wisdom',
            progress: 20,
            level: 'NOVICE',
            position: [0, 6, 4],
            color: '#F59E0B',
            connections: ['business', 'government', 'executive'],
            description: 'Economic systems',
            synthesisStrength: 0.7
        },
        {
            id: 'government',
            name: 'Governance',
            domain: 'wisdom',
            progress: 15,
            level: 'NOVICE',
            position: [-2.8, 6, 2.8],
            color: '#F59E0B',
            connections: ['finance', 'theosophy'],
            description: 'Political systems',
            synthesisStrength: 0.6
        },
        {
            id: 'theosophy',
            name: 'Philosophy',
            domain: 'wisdom',
            progress: 50,
            level: 'INTERMEDIATE',
            position: [-4, 6, 0],
            color: '#F59E0B',
            connections: ['government', 'stoicism', 'language'],
            description: 'Spiritual wisdom',
            synthesisStrength: 0.95
        }
    ];
    const testMasteryProgression = () => {
        const allSkills = skillNodes.map(n => n.id);
        const currentIndex = masteredSkills.length;
        if (currentIndex < allSkills.length) {
            // Add next skill in a logical progression
            const nextSkill = allSkills.find(skill => !masteredSkills.includes(skill));
            if (nextSkill) {
                setMasteredSkills(prev => [...prev, nextSkill]);
                setShowMilestoneFusion(true);
                setTimeout(() => setShowMilestoneFusion(false), 2000);
            }
        }
        else {
            // Reset
            setMasteredSkills(['stoicism', 'n8n']);
        }
    };
    const handleNodeSelect = (nodeId) => {
        setSelectedNode(selectedNode === nodeId ? null : nodeId);
    };
    return (_jsxs("div", { className: "w-full h-screen bg-gradient-to-br from-slate-900 via-indigo-900 to-purple-900", children: [_jsxs(Canvas, { camera: { position: [15, 10, 15], fov: 50 }, style: { background: 'transparent' }, gl: { antialias: true, alpha: true }, children: [_jsx("ambientLight", { intensity: 0.1 }), _jsx("directionalLight", { position: [10, 10, 5], intensity: 0.8, color: "#ffffff" }), _jsx("pointLight", { position: [0, 0, 0], intensity: 0.5, color: "#00ffff" }), _jsx(IntelligenceParticles, { count: 1000, masteryLevel: masteredSkills.length }), _jsx(OrbitControls, { enablePan: true, enableZoom: true, enableRotate: true, maxDistance: 30, minDistance: 8, autoRotate: true, autoRotateSpeed: 0.5 }), _jsx(ConsciousnessCore, { masteredSkills: masteredSkills, activeConnections: calculateActiveConnections() }), _jsx(DomainRing, { radius: 8, height: 0, color: "#3B82F6", name: "Foundation", mastered: masteredSkills.filter(id => skillNodes.find(n => n.id === id)?.domain === 'foundation').length, total: 4 }), _jsx(DomainRing, { radius: 6, height: 3, color: "#8B5CF6", name: "Technical", mastered: masteredSkills.filter(id => skillNodes.find(n => n.id === id)?.domain === 'technical').length, total: 4 }), _jsx(DomainRing, { radius: 4, height: 6, color: "#F59E0B", name: "Wisdom", mastered: masteredSkills.filter(id => skillNodes.find(n => n.id === id)?.domain === 'wisdom').length, total: 5 }), skillNodes.map((node) => (_jsx(NeuralSkillNode, { node: node, isSelected: selectedNode === node.id, onSelect: handleNodeSelect, masteredSkills: masteredSkills, allNodes: skillNodes }, node.id))), skillNodes.filter(node => masteredSkills.includes(node.id)).map(node => (_jsx(CoreConnection, { from: node.position, to: [0, 0, 0], intensity: node.synthesisStrength }, `core-${node.id}`))), showMilestoneFusion && (_jsx(Sphere, { args: [15, 32, 32], position: [0, 0, 0], children: _jsx("meshBasicMaterial", { color: "#ffffff", transparent: true, opacity: 0.3, wireframe: true }) }))] }), _jsxs("div", { className: "absolute top-4 left-4 right-4 flex justify-between items-start pointer-events-none", children: [_jsx(motion.div, { initial: { opacity: 0, x: -20 }, animate: { opacity: 1, x: 0 }, className: "pointer-events-auto", children: _jsxs("button", { onClick: testMasteryProgression, className: "bg-white/10 backdrop-blur-md rounded-lg px-4 py-2 border border-white/20 text-white hover:bg-white/20 transition-all", children: ["Simulate Learning (", masteredSkills.length, "/13)"] }) }), _jsxs(motion.div, { initial: { opacity: 0, y: -20 }, animate: { opacity: 1, y: 0 }, className: "text-center", children: [_jsx("h1", { className: "text-4xl font-bold text-white mb-2", children: "AI SAGE BUILDER" }), _jsx("p", { className: "text-white/60 text-sm", children: "Visualizing Agent Consciousness Development" })] }), _jsxs(motion.div, { initial: { opacity: 0, x: 20 }, animate: { opacity: 1, x: 0 }, className: "text-right", children: [_jsx("div", { className: "text-2xl font-bold text-white", children: calculateActiveConnections() }), _jsx("div", { className: "text-xs text-white/60 uppercase", children: "Active Syntheses" })] })] }), selectedNode && (_jsx(motion.div, { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, className: "absolute bottom-4 left-4 right-4 bg-black/60 backdrop-blur-md rounded-lg p-6 border border-white/20 max-w-2xl mx-auto", children: _jsxs("div", { className: "grid grid-cols-2 gap-6", children: [_jsxs("div", { children: [_jsx("h3", { className: "text-xl font-bold text-white mb-2", children: skillNodes.find(n => n.id === selectedNode)?.name }), _jsx("p", { className: "text-white/70 text-sm mb-4", children: skillNodes.find(n => n.id === selectedNode)?.description }), _jsxs("div", { className: "space-y-2", children: [_jsxs("div", { className: "flex justify-between text-white/80", children: [_jsx("span", { children: "Progress:" }), _jsxs("span", { children: [skillNodes.find(n => n.id === selectedNode)?.progress, "%"] })] }), _jsxs("div", { className: "flex justify-between text-white/80", children: [_jsx("span", { children: "Synthesis Strength:" }), _jsxs("span", { children: [(skillNodes.find(n => n.id === selectedNode)?.synthesisStrength || 0) * 100, "%"] })] })] })] }), _jsxs("div", { children: [_jsx("h4", { className: "text-sm font-bold text-white/80 mb-2", children: "Connected Disciplines:" }), _jsx("div", { className: "space-y-1", children: skillNodes.find(n => n.id === selectedNode)?.connections.map(connId => {
                                        const connected = skillNodes.find(n => n.id === connId);
                                        const isMastered = masteredSkills.includes(connId);
                                        return (_jsxs("div", { className: "flex items-center gap-2", children: [_jsx("div", { className: `w-2 h-2 rounded-full ${isMastered ? 'bg-white' : 'bg-white/30'}` }), _jsxs("span", { className: `text-sm ${isMastered ? 'text-white' : 'text-white/50'}`, children: [connected?.name, " ", isMastered && '✓'] })] }, connId));
                                    }) })] })] }) })), _jsxs(motion.div, { initial: { opacity: 0, x: -20 }, animate: { opacity: 1, x: 0 }, className: "absolute bottom-4 left-4 bg-black/40 backdrop-blur-md rounded-lg p-4 border border-white/20", children: [_jsx("h3", { className: "text-white font-semibold mb-2 text-sm", children: "Neural Map" }), _jsxs("div", { className: "space-y-1 text-xs", children: [_jsxs("div", { className: "flex items-center gap-2", children: [_jsx("div", { className: "w-3 h-3 rounded-full bg-white" }), _jsx("span", { className: "text-white/70", children: "Mastered Discipline" })] }), _jsxs("div", { className: "flex items-center gap-2", children: [_jsx("div", { className: "w-3 h-3 rounded-full bg-cyan-400" }), _jsx("span", { className: "text-white/70", children: "Active Synthesis" })] }), _jsxs("div", { className: "flex items-center gap-2", children: [_jsx("div", { className: "w-3 h-3 rounded-full bg-white/30" }), _jsx("span", { className: "text-white/70", children: "Learning in Progress" })] })] })] })] }));
};
export default PATHsassin3DMermaid;
