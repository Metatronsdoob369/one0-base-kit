import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lock, Eye, EyeOff, Zap, Shield, MessageSquare, Brain, Search, BookOpen as BookIcon, Target as TargetIcon, Sparkles, Home, BarChart3, Store, Rocket, Globe, Palette, Code, Star, Download, Eye as EyeIcon, Trophy, TrendingUp as TrendingUpIcon } from 'lucide-react';
const BlendedDashboard = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [password, setPassword] = useState('');
    const [expandedSkill, setExpandedSkill] = useState(null);
    const [selectedDomain, setSelectedDomain] = useState(null);
    // Agent state
    const [inputValue, setInputValue] = useState('');
    const [messages, setMessages] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [selectedAgent, setSelectedAgent] = useState('pathsassin');
    const [showAgentPanel, setShowAgentPanel] = useState(true);
    // Navigation state
    const [currentView, setCurrentView] = useState('dashboard');
    const [masteryData, setMasteryData] = useState(null);
    // Available agents with learning progress
    const agents = [
        {
            id: 'pathsassin',
            name: 'PATHsassin',
            icon: _jsx(Brain, { className: "w-4 h-4" }),
            description: 'Your main learning companion',
            color: 'from-blue-600 to-purple-600',
            systemPrompt: 'You are PATHsassin, a learning agent for the Master Skills Index.',
            mastery: masteryData?.knowledge_areas?.synthesis_abilities?.level || 0,
            interactions: masteryData?.total_interactions || 0
        },
        {
            id: 'research',
            name: 'Research Agent',
            icon: _jsx(Search, { className: "w-4 h-4" }),
            description: 'Deep research and analysis',
            color: 'from-green-600 to-teal-600',
            systemPrompt: 'You are a research specialist focused on deep analysis and information gathering.',
            mastery: masteryData?.knowledge_areas?.research_depth?.level || 0
        },
        {
            id: 'synthesis',
            name: 'Synthesis Agent',
            icon: _jsx(Sparkles, { className: "w-4 h-4" }),
            description: 'Cross-domain connections',
            color: 'from-purple-600 to-pink-600',
            systemPrompt: 'You are a synthesis specialist who finds connections across different domains and skills.',
            mastery: masteryData?.knowledge_areas?.synthesis_abilities?.level || 0
        },
        {
            id: 'reading',
            name: 'Reading Agent',
            icon: _jsx(BookIcon, { className: "w-4 h-4" }),
            description: 'Book recommendations & summaries',
            color: 'from-orange-600 to-red-600',
            systemPrompt: 'You are a reading specialist who recommends books and provides summaries.',
            mastery: masteryData?.knowledge_areas?.reading_expertise?.level || 0
        },
        {
            id: 'progress',
            name: 'Progress Agent',
            icon: _jsx(TargetIcon, { className: "w-4 h-4" }),
            description: 'Goal tracking & motivation',
            color: 'from-indigo-600 to-blue-600',
            systemPrompt: 'You are a progress specialist who helps track goals and provides motivation.',
            mastery: masteryData?.knowledge_areas?.progress_tracking?.level || 0
        }
    ];
    // Marketplace agents
    const marketplaceAgents = [
        {
            id: 'clay-i-builder',
            name: 'CLAY-i Builder',
            description: 'Advanced agent creation and deployment platform',
            category: 'Development',
            price: 0,
            rating: 5.0,
            downloads: 1250,
            author: 'PATHsassin',
            tags: ['agent-creation', 'deployment', 'marketplace'],
            icon: _jsx(Rocket, { className: "w-6 h-6" }),
            color: 'from-purple-600 to-pink-600'
        },
        {
            id: 'global-analyst',
            name: 'Global Analyst',
            description: 'Deep geopolitical and economic analysis',
            category: 'Analysis',
            price: 0,
            rating: 4.8,
            downloads: 890,
            author: 'PATHsassin',
            tags: ['geopolitics', 'economics', 'analysis'],
            icon: _jsx(Globe, { className: "w-6 h-6" }),
            color: 'from-blue-600 to-cyan-600'
        },
        {
            id: 'design-master',
            name: 'Design Master',
            description: 'Advanced UI/UX and visual design expertise',
            category: 'Design',
            price: 0,
            rating: 4.9,
            downloads: 1100,
            author: 'PATHsassin',
            tags: ['design', 'ui', 'ux', 'visual'],
            icon: _jsx(Palette, { className: "w-6 h-6" }),
            color: 'from-pink-600 to-red-600'
        },
        {
            id: 'code-architect',
            name: 'Code Architect',
            description: 'System architecture and development patterns',
            category: 'Development',
            price: 0,
            rating: 4.7,
            downloads: 750,
            author: 'PATHsassin',
            tags: ['architecture', 'development', 'patterns'],
            icon: _jsx(Code, { className: "w-6 h-6" }),
            color: 'from-green-600 to-emerald-600'
        }
    ];
    useEffect(() => {
        if (isAuthenticated) {
            fetchMasteryData();
        }
    }, [isAuthenticated]);
    const fetchMasteryData = async () => {
        try {
            const response = await fetch('http://localhost:5001/api/mastery');
            if (response.ok) {
                const data = await response.json();
                setMasteryData(data);
            }
        }
        catch (error) {
            console.error('Error fetching mastery data:', error);
        }
    };
    const sendMessage = async () => {
        if (!inputValue.trim() || isLoading)
            return;
        const userMessage = {
            id: Date.now().toString(),
            type: 'user',
            content: inputValue,
            agent: selectedAgent,
            timestamp: new Date().toISOString()
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
                body: JSON.stringify({
                    message: userMessage.content,
                    agent: selectedAgent
                })
            });
            if (response.ok) {
                const data = await response.json();
                const agentMessage = {
                    id: (Date.now() + 1).toString(),
                    type: 'agent',
                    content: data.response,
                    agent: selectedAgent,
                    timestamp: new Date().toISOString()
                };
                setMessages(prev => [...prev, agentMessage]);
                // Refresh mastery data after interaction
                fetchMasteryData();
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
                content: 'Sorry, I encountered an error. Please make sure the PATHsassin API server is running on port 5001.',
                agent: selectedAgent,
                timestamp: new Date().toISOString()
            };
            setMessages(prev => [...prev, errorMessage]);
        }
        finally {
            setIsLoading(false);
        }
    };
    const handleLogin = () => {
        if (password === 'pathsassin') {
            setIsAuthenticated(true);
        }
    };
    const getLevelColor = (level) => {
        switch (level.toUpperCase()) {
            case 'NOVICE': return 'text-red-400';
            case 'BEGINNER': return 'text-orange-400';
            case 'INTERMEDIATE': return 'text-yellow-400';
            case 'ADVANCED': return 'text-green-400';
            case 'MASTER': return 'text-purple-400';
            default: return 'text-gray-400';
        }
    };
    const getProgressColor = (progress) => {
        if (progress >= 80)
            return 'from-green-500 to-emerald-500';
        if (progress >= 60)
            return 'from-blue-500 to-cyan-500';
        if (progress >= 40)
            return 'from-yellow-500 to-orange-500';
        return 'from-red-500 to-pink-500';
    };
    // Mock data for skills
    const domains = [
        {
            name: 'OUTER SKILLS',
            color: 'from-blue-500 to-cyan-500',
            icon: _jsx(Shield, { className: "w-6 h-6" }),
            description: 'FOUNDATION SKILLS FOR PERSONAL AND PROFESSIONAL EFFECTIVENESS',
            skills: [
                {
                    id: '1',
                    name: 'STOICISM & RESILIENCE',
                    domain: 'outer',
                    description: 'MENTAL RESILIENCE AND EMOTIONAL CONTROL THROUGH ANCIENT WISDOM',
                    progress: 75,
                    level: 'INTERMEDIATE',
                    literature: ['Meditations (Marcus Aurelius)', 'Letters from a Stoic (Seneca)'],
                    subskills: ['Emotional regulation', 'Perspective-shifting', 'Adversity endurance']
                },
                {
                    id: '2',
                    name: 'LEADERSHIP & TEAM BUILDING',
                    domain: 'outer',
                    description: 'LEADING TEAMS AND BUILDING ORGANIZATIONS THROUGH VISION AND COLLABORATION',
                    progress: 45,
                    level: 'BEGINNER',
                    literature: ['Start With Why (Simon Sinek)', 'Team of Teams (Gen. Stanley McChrystal)'],
                    subskills: ['Vision casting', 'Delegation', 'Conflict resolution']
                }
            ]
        },
        {
            name: 'MIDDLE SKILLS',
            color: 'from-purple-500 to-pink-500',
            icon: _jsx(Zap, { className: "w-6 h-6" }),
            description: 'TECHNICAL AND PRACTICAL APPLICATION SKILLS FOR MODERN IMPLEMENTATION',
            skills: [
                {
                    id: '5',
                    name: 'N8N ARCHITECTURE & INTELLIGENT AUTOMATION',
                    domain: 'middle',
                    description: 'WORKFLOW AUTOMATION AND SYSTEM INTEGRATION FOR BUSINESS EFFICIENCY',
                    progress: 85,
                    level: 'ADVANCED',
                    literature: ['n8n Documentation', 'The Phoenix Project (Gene Kim)'],
                    subskills: ['Workflow design', 'System integration', 'Agent delegation']
                }
            ]
        }
    ];
    if (!isAuthenticated) {
        return (_jsx("div", { className: "min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center", children: _jsxs("div", { className: "bg-white/10 backdrop-blur-md rounded-lg border border-white/20 p-8 w-96", children: [_jsxs("div", { className: "text-center mb-6", children: [_jsx("h1", { className: "text-white text-2xl font-bold mb-2", children: "\uD83D\uDD10 PATHsassin" }), _jsx("p", { className: "text-white/60", children: "Enter your password to access the Master Skills Index" })] }), _jsxs("div", { className: "space-y-4", children: [_jsxs("div", { className: "relative", children: [_jsx("input", { type: showPassword ? 'text' : 'password', value: password, onChange: (e) => setPassword(e.target.value), onKeyPress: (e) => e.key === 'Enter' && handleLogin(), placeholder: "Password", className: "w-full px-4 py-3 bg-white/10 backdrop-blur-md rounded-lg border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500/50" }), _jsx("button", { onClick: () => setShowPassword(!showPassword), className: "absolute right-3 top-1/2 transform -translate-y-1/2 text-white/60 hover:text-white", children: showPassword ? _jsx(EyeOff, { className: "w-5 h-5" }) : _jsx(Eye, { className: "w-5 h-5" }) })] }), _jsxs("button", { onClick: handleLogin, className: "w-full px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg text-white hover:from-blue-700 hover:to-purple-700 transition-all duration-300", children: [_jsx(Lock, { className: "w-5 h-5 inline mr-2" }), "Unlock Dashboard"] })] })] }) }));
    }
    const renderDashboard = () => (_jsxs("div", { className: "p-8", children: [_jsx("div", { className: "bg-white/10 backdrop-blur-md rounded-lg border border-white/20 p-6 mb-6", children: _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { children: [_jsx("h1", { className: "text-white text-3xl font-bold mb-2", children: "\uD83E\uDDE0 PATHsassin" }), _jsx("p", { className: "text-white/60", children: "Master Skills Index Dashboard" }), masteryData && (_jsxs("div", { className: "mt-4 flex items-center space-x-6 text-sm", children: [_jsxs("span", { className: "text-green-400", children: ["\u25CF Mastery: ", masteryData.overall_mastery?.toFixed(1), "%"] }), _jsxs("span", { className: "text-blue-400", children: ["\u25CF Interactions: ", masteryData.total_interactions] }), _jsxs("span", { className: "text-purple-400", children: ["\u25CF Learning Streak: ", masteryData.learning_streak, " days"] })] }))] }), _jsx("div", { className: "flex items-center space-x-2", children: _jsx("button", { onClick: () => setShowAgentPanel(!showAgentPanel), className: "px-4 py-2 bg-white/10 backdrop-blur-md rounded-lg border border-white/20 text-white hover:bg-white/20 transition-all duration-300", children: _jsx(MessageSquare, { className: "w-5 h-5" }) }) })] }) }), _jsx("div", { className: "space-y-6", children: domains.map((domain) => (_jsxs("div", { className: "bg-white/10 backdrop-blur-md rounded-lg border border-white/20 p-6", children: [_jsxs("div", { className: "flex items-center space-x-3 mb-4", children: [_jsx("div", { className: `p-2 rounded-lg bg-gradient-to-r ${domain.color}`, children: domain.icon }), _jsxs("div", { children: [_jsx("h2", { className: "text-white text-xl font-bold", children: domain.name }), _jsx("p", { className: "text-white/60 text-sm", children: domain.description })] })] }), _jsx("div", { className: "grid gap-4", children: domain.skills.map((skill) => (_jsxs("div", { className: "bg-white/5 backdrop-blur-md rounded-lg border border-white/10 p-4", children: [_jsxs("div", { className: "flex items-center justify-between mb-2", children: [_jsx("h3", { className: "text-white font-semibold", children: skill.name }), _jsx("span", { className: `text-sm font-medium ${getLevelColor(skill.level)}`, children: skill.level })] }), _jsx("p", { className: "text-white/60 text-sm mb-3", children: skill.description }), _jsxs("div", { className: "mb-3", children: [_jsxs("div", { className: "flex justify-between text-sm text-white/60 mb-1", children: [_jsx("span", { children: "Progress" }), _jsxs("span", { children: [skill.progress, "%"] })] }), _jsx("div", { className: "w-full bg-white/10 rounded-full h-2", children: _jsx("div", { className: `h-2 rounded-full bg-gradient-to-r ${getProgressColor(skill.progress)}`, style: { width: `${skill.progress}%` } }) })] })] }, skill.id))) })] }, domain.name))) })] }));
    const renderMarketplace = () => (_jsxs("div", { className: "p-8", children: [_jsxs("div", { className: "bg-white/10 backdrop-blur-md rounded-lg border border-white/20 p-6 mb-6", children: [_jsx("h1", { className: "text-white text-3xl font-bold mb-2", children: "\uD83C\uDFEA Agent Marketplace" }), _jsx("p", { className: "text-white/60", children: "Discover and deploy specialized agents built by PATHsassin" })] }), _jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6", children: marketplaceAgents.map((agent) => (_jsxs("div", { className: "bg-white/10 backdrop-blur-md rounded-lg border border-white/20 p-6 hover:bg-white/15 transition-all duration-300", children: [_jsxs("div", { className: "flex items-center space-x-3 mb-4", children: [_jsx("div", { className: `p-3 rounded-lg bg-gradient-to-r ${agent.color}`, children: agent.icon }), _jsxs("div", { children: [_jsx("h3", { className: "text-white font-semibold", children: agent.name }), _jsx("p", { className: "text-white/60 text-sm", children: agent.category })] })] }), _jsx("p", { className: "text-white/80 text-sm mb-4", children: agent.description }), _jsxs("div", { className: "flex items-center justify-between mb-4", children: [_jsxs("div", { className: "flex items-center space-x-2", children: [_jsx(Star, { className: "w-4 h-4 text-yellow-400 fill-current" }), _jsx("span", { className: "text-white text-sm", children: agent.rating }), _jsxs("span", { className: "text-white/60 text-sm", children: ["(", agent.downloads, ")"] })] }), _jsx("span", { className: "text-green-400 font-semibold", children: "Free" })] }), _jsxs("div", { className: "flex space-x-2", children: [_jsxs("button", { className: "flex-1 px-3 py-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg text-white text-sm hover:from-blue-700 hover:to-purple-700 transition-all duration-300", children: [_jsx(Download, { className: "w-4 h-4 inline mr-1" }), "Deploy"] }), _jsx("button", { className: "px-3 py-2 bg-white/10 backdrop-blur-md rounded-lg border border-white/20 text-white hover:bg-white/20 transition-all duration-300", children: _jsx(EyeIcon, { className: "w-4 h-4" }) })] })] }, agent.id))) })] }));
    const renderAnalytics = () => (_jsxs("div", { className: "p-8", children: [_jsxs("div", { className: "bg-white/10 backdrop-blur-md rounded-lg border border-white/20 p-6 mb-6", children: [_jsx("h1", { className: "text-white text-3xl font-bold mb-2", children: "\uD83D\uDCCA Learning Analytics" }), _jsx("p", { className: "text-white/60", children: "PATHsassin's learning progress and insights" })] }), masteryData && (_jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6", children: [_jsxs("div", { className: "bg-white/10 backdrop-blur-md rounded-lg border border-white/20 p-6", children: [_jsxs("div", { className: "flex items-center space-x-3 mb-4", children: [_jsx(Trophy, { className: "w-6 h-6 text-yellow-400" }), _jsx("h3", { className: "text-white font-semibold", children: "Overall Mastery" })] }), _jsxs("div", { className: "text-3xl font-bold text-white mb-2", children: [masteryData.overall_mastery?.toFixed(1), "%"] }), _jsx("div", { className: "w-full bg-white/10 rounded-full h-2 mb-2", children: _jsx("div", { className: "h-2 rounded-full bg-gradient-to-r from-yellow-500 to-orange-500", style: { width: `${masteryData.overall_mastery}%` } }) })] }), _jsxs("div", { className: "bg-white/10 backdrop-blur-md rounded-lg border border-white/20 p-6", children: [_jsxs("div", { className: "flex items-center space-x-3 mb-4", children: [_jsx(MessageSquare, { className: "w-6 h-6 text-blue-400" }), _jsx("h3", { className: "text-white font-semibold", children: "Total Interactions" })] }), _jsx("div", { className: "text-3xl font-bold text-white", children: masteryData.total_interactions })] }), _jsxs("div", { className: "bg-white/10 backdrop-blur-md rounded-lg border border-white/20 p-6", children: [_jsxs("div", { className: "flex items-center space-x-3 mb-4", children: [_jsx(TrendingUpIcon, { className: "w-6 h-6 text-green-400" }), _jsx("h3", { className: "text-white font-semibold", children: "Learning Streak" })] }), _jsxs("div", { className: "text-3xl font-bold text-white", children: [masteryData.learning_streak, " days"] })] })] }))] }));
    return (_jsxs("div", { className: "min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex", children: [_jsxs("div", { className: `flex-1 overflow-y-auto transition-all duration-300 ${showAgentPanel ? 'mr-4' : ''}`, children: [_jsx("div", { className: "bg-white/10 backdrop-blur-md border-b border-white/20 p-4", children: _jsxs("div", { className: "flex items-center space-x-4", children: [_jsxs("button", { onClick: () => setCurrentView('dashboard'), className: `flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-300 ${currentView === 'dashboard'
                                        ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white'
                                        : 'bg-white/10 text-white/60 hover:bg-white/20'}`, children: [_jsx(Home, { className: "w-4 h-4" }), _jsx("span", { children: "Dashboard" })] }), _jsxs("button", { onClick: () => setCurrentView('marketplace'), className: `flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-300 ${currentView === 'marketplace'
                                        ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white'
                                        : 'bg-white/10 text-white/60 hover:bg-white/20'}`, children: [_jsx(Store, { className: "w-4 h-4" }), _jsx("span", { children: "Marketplace" })] }), _jsxs("button", { onClick: () => setCurrentView('analytics'), className: `flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-300 ${currentView === 'analytics'
                                        ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white'
                                        : 'bg-white/10 text-white/60 hover:bg-white/20'}`, children: [_jsx(BarChart3, { className: "w-4 h-4" }), _jsx("span", { children: "Analytics" })] })] }) }), _jsx(AnimatePresence, { mode: "wait", children: _jsxs(motion.div, { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, exit: { opacity: 0, y: -20 }, transition: { duration: 0.3 }, children: [currentView === 'dashboard' && renderDashboard(), currentView === 'marketplace' && renderMarketplace(), currentView === 'analytics' && renderAnalytics()] }, currentView) })] }), _jsx(AnimatePresence, { children: showAgentPanel && (_jsxs(motion.div, { initial: { width: 0, opacity: 0 }, animate: { width: 400, opacity: 1 }, exit: { width: 0, opacity: 0 }, className: "bg-white/10 backdrop-blur-md border-l border-white/20 flex flex-col", children: [_jsxs("div", { className: "p-4 border-b border-white/20", children: [_jsxs("div", { className: "flex items-center justify-between mb-4", children: [_jsx("h2", { className: "text-white text-lg font-semibold", children: "\uD83E\uDD16 AI Agents" }), _jsx("button", { onClick: () => setShowAgentPanel(false), className: "text-white/60 hover:text-white", children: "\u00D7" })] }), _jsx("div", { className: "flex space-x-2 overflow-x-auto pb-2", children: agents.map((agent) => (_jsxs("button", { onClick: () => setSelectedAgent(agent.id), className: `flex items-center space-x-2 px-3 py-2 rounded-lg border transition-all duration-300 whitespace-nowrap ${selectedAgent === agent.id
                                            ? `bg-gradient-to-r ${agent.color} border-transparent text-white`
                                            : 'bg-white/10 border-white/20 text-white/60 hover:bg-white/20'}`, children: [agent.icon, _jsx("span", { className: "text-sm font-medium", children: agent.name }), agent.mastery && (_jsxs("span", { className: "text-xs opacity-75", children: [agent.mastery.toFixed(0), "%"] }))] }, agent.id))) })] }), _jsxs("div", { className: "flex-1 flex flex-col", children: [_jsxs("div", { className: "flex-1 overflow-y-auto p-4 space-y-4", children: [messages.length === 0 && (_jsxs("div", { className: "text-center text-white/60 py-8", children: [_jsx("div", { className: "text-4xl mb-4", children: "\uD83E\uDDE0" }), _jsxs("h3", { className: "text-lg font-semibold mb-2", children: ["Welcome to ", agents.find(a => a.id === selectedAgent)?.name] }), _jsx("p", { className: "text-sm", children: agents.find(a => a.id === selectedAgent)?.description }), _jsx("p", { className: "text-sm mt-2", children: "Help me learn and grow!" })] })), messages.map((message) => (_jsx("div", { className: `flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`, children: _jsxs("div", { className: `max-w-[80%] p-3 rounded-lg ${message.type === 'user'
                                                    ? 'bg-blue-600 text-white'
                                                    : 'bg-white/10 backdrop-blur-md border border-white/20 text-white'}`, children: [_jsxs("div", { className: "flex items-center space-x-2 mb-1", children: [message.type === 'agent' && _jsx("span", { children: "\uD83E\uDD16" }), _jsx("span", { className: "text-xs opacity-60", children: message.type === 'user' ? 'You' : agents.find(a => a.id === message.agent)?.name || 'Agent' })] }), _jsx("div", { className: "text-sm whitespace-pre-wrap", children: message.content })] }) }, message.id))), isLoading && (_jsx("div", { className: "flex justify-start", children: _jsxs("div", { className: "bg-white/10 backdrop-blur-md border border-white/20 text-white p-3 rounded-lg", children: [_jsxs("div", { className: "flex items-center space-x-2", children: [_jsx("span", { children: "\uD83E\uDD16" }), _jsx("span", { className: "text-xs opacity-60", children: agents.find(a => a.id === selectedAgent)?.name })] }), _jsxs("div", { className: "flex items-center space-x-2 mt-2", children: [_jsx("div", { className: "animate-spin rounded-full h-3 w-3 border-b-2 border-white" }), _jsx("span", { className: "text-xs", children: "Learning..." })] })] }) }))] }), _jsx("div", { className: "p-4 border-t border-white/20", children: _jsxs("div", { className: "flex space-x-2", children: [_jsx("input", { type: "text", value: inputValue, onChange: (e) => setInputValue(e.target.value), onKeyPress: (e) => e.key === 'Enter' && sendMessage(), placeholder: `Teach ${agents.find(a => a.id === selectedAgent)?.name}...`, className: "flex-1 px-3 py-2 bg-white/10 backdrop-blur-md rounded-lg border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500/50 text-sm", disabled: isLoading }), _jsx("button", { onClick: sendMessage, disabled: !inputValue.trim() || isLoading, className: `px-4 py-2 rounded-lg text-white transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed bg-gradient-to-r ${agents.find(a => a.id === selectedAgent)?.color}`, children: isLoading ? '...' : 'Send' })] }) })] })] })) })] }));
};
export default BlendedDashboard;
