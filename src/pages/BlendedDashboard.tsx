import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Lock, 
  Unlock, 
  Eye, 
  EyeOff, 
  TrendingUp, 
  BookOpen, 
  Users, 
  Zap,
  Lightbulb,
  Shield,
  Target,
  Award,
  ChevronRight,
  ChevronDown,
  ArrowRight,
  Box,
  MessageSquare,
  Brain,
  Search,
  BookOpen as BookIcon,
  Target as TargetIcon,
  Sparkles,
  Home,
  Settings,
  BarChart3,
  Store,
  Rocket,
  Globe,
  Layers,
  Palette,
  Code,
  BookMarked,
  Compass,
  Star,
  Plus,
  Download,
  Upload,
  Share2,
  Heart,
  Eye as EyeIcon,
  Zap as ZapIcon,
  Crown,
  Trophy,
  TrendingUp as TrendingUpIcon
} from 'lucide-react';

interface Message {
  id: string;
  type: 'user' | 'agent';
  content: string;
  agent?: string;
  timestamp?: string;
}

interface Agent {
  id: string;
  name: string;
  icon: React.ReactNode;
  description: string;
  color: string;
  systemPrompt: string;
  mastery?: number;
  interactions?: number;
}

interface MarketplaceAgent {
  id: string;
  name: string;
  description: string;
  category: string;
  price: number;
  rating: number;
  downloads: number;
  author: string;
  tags: string[];
  icon: React.ReactNode;
  color: string;
}

const BlendedDashboard: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState('');
  const [expandedSkill, setExpandedSkill] = useState<string | null>(null);
  const [selectedDomain, setSelectedDomain] = useState<string | null>(null);
  
  // Agent state
  const [inputValue, setInputValue] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedAgent, setSelectedAgent] = useState<string>('pathsassin');
  const [showAgentPanel, setShowAgentPanel] = useState(true);
  
  // Navigation state
  const [currentView, setCurrentView] = useState<'dashboard' | 'marketplace' | 'analytics' | 'settings'>('dashboard');
  const [masteryData, setMasteryData] = useState<any>(null);

  // Available agents with learning progress
  const agents: Agent[] = [
    {
      id: 'pathsassin',
      name: 'PATHsassin',
      icon: <Brain className="w-4 h-4" />,
      description: 'Your main learning companion',
      color: 'from-blue-600 to-purple-600',
      systemPrompt: 'You are PATHsassin, a learning agent for the Master Skills Index.',
      mastery: masteryData?.knowledge_areas?.synthesis_abilities?.level || 0,
      interactions: masteryData?.total_interactions || 0
    },
    {
      id: 'research',
      name: 'Research Agent',
      icon: <Search className="w-4 h-4" />,
      description: 'Deep research and analysis',
      color: 'from-green-600 to-teal-600',
      systemPrompt: 'You are a research specialist focused on deep analysis and information gathering.',
      mastery: masteryData?.knowledge_areas?.research_depth?.level || 0
    },
    {
      id: 'synthesis',
      name: 'Synthesis Agent',
      icon: <Sparkles className="w-4 h-4" />,
      description: 'Cross-domain connections',
      color: 'from-purple-600 to-pink-600',
      systemPrompt: 'You are a synthesis specialist who finds connections across different domains and skills.',
      mastery: masteryData?.knowledge_areas?.synthesis_abilities?.level || 0
    },
    {
      id: 'reading',
      name: 'Reading Agent',
      icon: <BookIcon className="w-4 h-4" />,
      description: 'Book recommendations & summaries',
      color: 'from-orange-600 to-red-600',
      systemPrompt: 'You are a reading specialist who recommends books and provides summaries.',
      mastery: masteryData?.knowledge_areas?.reading_expertise?.level || 0
    },
    {
      id: 'progress',
      name: 'Progress Agent',
      icon: <TargetIcon className="w-4 h-4" />,
      description: 'Goal tracking & motivation',
      color: 'from-indigo-600 to-blue-600',
      systemPrompt: 'You are a progress specialist who helps track goals and provides motivation.',
      mastery: masteryData?.knowledge_areas?.progress_tracking?.level || 0
    }
  ];

  // Marketplace agents
  const marketplaceAgents: MarketplaceAgent[] = [
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
      icon: <Rocket className="w-6 h-6" />,
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
      icon: <Globe className="w-6 h-6" />,
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
      icon: <Palette className="w-6 h-6" />,
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
      icon: <Code className="w-6 h-6" />,
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
    } catch (error) {
      console.error('Error fetching mastery data:', error);
    }
  };

  const sendMessage = async () => {
    if (!inputValue.trim() || isLoading) return;

    const userMessage: Message = {
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
        const agentMessage: Message = {
          id: (Date.now() + 1).toString(),
          type: 'agent',
          content: data.response,
          agent: selectedAgent,
          timestamp: new Date().toISOString()
        };
        setMessages(prev => [...prev, agentMessage]);
        
        // Refresh mastery data after interaction
        fetchMasteryData();
      } else {
        throw new Error('Failed to get response');
      }
    } catch (error) {
      console.error('Error sending message:', error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'agent',
        content: 'Sorry, I encountered an error. Please make sure the PATHsassin API server is running on port 5001.',
        agent: selectedAgent,
        timestamp: new Date().toISOString()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogin = () => {
    if (password === 'pathsassin') {
      setIsAuthenticated(true);
    }
  };

  const getLevelColor = (level: string) => {
    switch (level.toUpperCase()) {
      case 'NOVICE': return 'text-red-400';
      case 'BEGINNER': return 'text-orange-400';
      case 'INTERMEDIATE': return 'text-yellow-400';
      case 'ADVANCED': return 'text-green-400';
      case 'MASTER': return 'text-purple-400';
      default: return 'text-gray-400';
    }
  };

  const getProgressColor = (progress: number) => {
    if (progress >= 80) return 'from-green-500 to-emerald-500';
    if (progress >= 60) return 'from-blue-500 to-cyan-500';
    if (progress >= 40) return 'from-yellow-500 to-orange-500';
    return 'from-red-500 to-pink-500';
  };

  // Mock data for skills
  const domains = [
    {
      name: 'OUTER SKILLS',
      color: 'from-blue-500 to-cyan-500',
      icon: <Shield className="w-6 h-6" />,
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
      icon: <Zap className="w-6 h-6" />,
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
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="bg-white/10 backdrop-blur-md rounded-lg border border-white/20 p-8 w-96">
          <div className="text-center mb-6">
            <h1 className="text-white text-2xl font-bold mb-2">🔐 PATHsassin</h1>
            <p className="text-white/60">Enter your password to access the Master Skills Index</p>
          </div>
          <div className="space-y-4">
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleLogin()}
                placeholder="Password"
                className="w-full px-4 py-3 bg-white/10 backdrop-blur-md rounded-lg border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
              />
              <button
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/60 hover:text-white"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
            <button
              onClick={handleLogin}
              className="w-full px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg text-white hover:from-blue-700 hover:to-purple-700 transition-all duration-300"
            >
              <Lock className="w-5 h-5 inline mr-2" />
              Unlock Dashboard
            </button>
          </div>
        </div>
      </div>
    );
  }

  const renderDashboard = () => (
    <div className="p-8">
      {/* Header with Mastery Status */}
      <div className="bg-white/10 backdrop-blur-md rounded-lg border border-white/20 p-6 mb-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-white text-3xl font-bold mb-2">🧠 PATHsassin</h1>
            <p className="text-white/60">Master Skills Index Dashboard</p>
            {masteryData && (
              <div className="mt-4 flex items-center space-x-6 text-sm">
                <span className="text-green-400">● Mastery: {masteryData.overall_mastery?.toFixed(1)}%</span>
                <span className="text-blue-400">● Interactions: {masteryData.total_interactions}</span>
                <span className="text-purple-400">● Learning Streak: {masteryData.learning_streak} days</span>
              </div>
            )}
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setShowAgentPanel(!showAgentPanel)}
              className="px-4 py-2 bg-white/10 backdrop-blur-md rounded-lg border border-white/20 text-white hover:bg-white/20 transition-all duration-300"
            >
              <MessageSquare className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Skills Grid */}
      <div className="space-y-6">
        {domains.map((domain) => (
          <div key={domain.name} className="bg-white/10 backdrop-blur-md rounded-lg border border-white/20 p-6">
            <div className="flex items-center space-x-3 mb-4">
              <div className={`p-2 rounded-lg bg-gradient-to-r ${domain.color}`}>
                {domain.icon}
              </div>
              <div>
                <h2 className="text-white text-xl font-bold">{domain.name}</h2>
                <p className="text-white/60 text-sm">{domain.description}</p>
              </div>
            </div>
            
            <div className="grid gap-4">
              {domain.skills.map((skill) => (
                <div key={skill.id} className="bg-white/5 backdrop-blur-md rounded-lg border border-white/10 p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-white font-semibold">{skill.name}</h3>
                    <span className={`text-sm font-medium ${getLevelColor(skill.level)}`}>
                      {skill.level}
                    </span>
                  </div>
                  <p className="text-white/60 text-sm mb-3">{skill.description}</p>
                  
                  <div className="mb-3">
                    <div className="flex justify-between text-sm text-white/60 mb-1">
                      <span>Progress</span>
                      <span>{skill.progress}%</span>
                    </div>
                    <div className="w-full bg-white/10 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full bg-gradient-to-r ${getProgressColor(skill.progress)}`}
                        style={{ width: `${skill.progress}%` }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderMarketplace = () => (
    <div className="p-8">
      <div className="bg-white/10 backdrop-blur-md rounded-lg border border-white/20 p-6 mb-6">
        <h1 className="text-white text-3xl font-bold mb-2">🏪 Agent Marketplace</h1>
        <p className="text-white/60">Discover and deploy specialized agents built by PATHsassin</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {marketplaceAgents.map((agent) => (
          <div key={agent.id} className="bg-white/10 backdrop-blur-md rounded-lg border border-white/20 p-6 hover:bg-white/15 transition-all duration-300">
            <div className="flex items-center space-x-3 mb-4">
              <div className={`p-3 rounded-lg bg-gradient-to-r ${agent.color}`}>
                {agent.icon}
              </div>
              <div>
                <h3 className="text-white font-semibold">{agent.name}</h3>
                <p className="text-white/60 text-sm">{agent.category}</p>
              </div>
            </div>
            
            <p className="text-white/80 text-sm mb-4">{agent.description}</p>
            
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-2">
                <Star className="w-4 h-4 text-yellow-400 fill-current" />
                <span className="text-white text-sm">{agent.rating}</span>
                <span className="text-white/60 text-sm">({agent.downloads})</span>
              </div>
              <span className="text-green-400 font-semibold">Free</span>
            </div>
            
            <div className="flex space-x-2">
              <button className="flex-1 px-3 py-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg text-white text-sm hover:from-blue-700 hover:to-purple-700 transition-all duration-300">
                <Download className="w-4 h-4 inline mr-1" />
                Deploy
              </button>
              <button className="px-3 py-2 bg-white/10 backdrop-blur-md rounded-lg border border-white/20 text-white hover:bg-white/20 transition-all duration-300">
                <EyeIcon className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderAnalytics = () => (
    <div className="p-8">
      <div className="bg-white/10 backdrop-blur-md rounded-lg border border-white/20 p-6 mb-6">
        <h1 className="text-white text-3xl font-bold mb-2">📊 Learning Analytics</h1>
        <p className="text-white/60">PATHsassin's learning progress and insights</p>
      </div>

      {masteryData && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white/10 backdrop-blur-md rounded-lg border border-white/20 p-6">
            <div className="flex items-center space-x-3 mb-4">
              <Trophy className="w-6 h-6 text-yellow-400" />
              <h3 className="text-white font-semibold">Overall Mastery</h3>
            </div>
            <div className="text-3xl font-bold text-white mb-2">
              {masteryData.overall_mastery?.toFixed(1)}%
            </div>
            <div className="w-full bg-white/10 rounded-full h-2 mb-2">
              <div 
                className="h-2 rounded-full bg-gradient-to-r from-yellow-500 to-orange-500"
                style={{ width: `${masteryData.overall_mastery}%` }}
              />
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-md rounded-lg border border-white/20 p-6">
            <div className="flex items-center space-x-3 mb-4">
              <MessageSquare className="w-6 h-6 text-blue-400" />
              <h3 className="text-white font-semibold">Total Interactions</h3>
            </div>
            <div className="text-3xl font-bold text-white">
              {masteryData.total_interactions}
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-md rounded-lg border border-white/20 p-6">
            <div className="flex items-center space-x-3 mb-4">
              <TrendingUpIcon className="w-6 h-6 text-green-400" />
              <h3 className="text-white font-semibold">Learning Streak</h3>
            </div>
            <div className="text-3xl font-bold text-white">
              {masteryData.learning_streak} days
            </div>
          </div>
        </div>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex">
      {/* Left Panel - Main Content */}
      <div className={`flex-1 overflow-y-auto transition-all duration-300 ${showAgentPanel ? 'mr-4' : ''}`}>
        {/* Navigation */}
        <div className="bg-white/10 backdrop-blur-md border-b border-white/20 p-4">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setCurrentView('dashboard')}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-300 ${
                currentView === 'dashboard' 
                  ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white' 
                  : 'bg-white/10 text-white/60 hover:bg-white/20'
              }`}
            >
              <Home className="w-4 h-4" />
              <span>Dashboard</span>
            </button>
            <button
              onClick={() => setCurrentView('marketplace')}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-300 ${
                currentView === 'marketplace' 
                  ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white' 
                  : 'bg-white/10 text-white/60 hover:bg-white/20'
              }`}
            >
              <Store className="w-4 h-4" />
              <span>Marketplace</span>
            </button>
            <button
              onClick={() => setCurrentView('analytics')}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-300 ${
                currentView === 'analytics' 
                  ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white' 
                  : 'bg-white/10 text-white/60 hover:bg-white/20'
              }`}
            >
              <BarChart3 className="w-4 h-4" />
              <span>Analytics</span>
            </button>
          </div>
        </div>

        {/* Content Area */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentView}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {currentView === 'dashboard' && renderDashboard()}
            {currentView === 'marketplace' && renderMarketplace()}
            {currentView === 'analytics' && renderAnalytics()}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Right Panel - Agent Interface */}
      <AnimatePresence>
        {showAgentPanel && (
          <motion.div
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: 400, opacity: 1 }}
            exit={{ width: 0, opacity: 0 }}
            className="bg-white/10 backdrop-blur-md border-l border-white/20 flex flex-col"
          >
            {/* Agent Header */}
            <div className="p-4 border-b border-white/20">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-white text-lg font-semibold">🤖 AI Agents</h2>
                <button
                  onClick={() => setShowAgentPanel(false)}
                  className="text-white/60 hover:text-white"
                >
                  ×
                </button>
              </div>
              
              {/* Agent Selector */}
              <div className="flex space-x-2 overflow-x-auto pb-2">
                {agents.map((agent) => (
                  <button
                    key={agent.id}
                    onClick={() => setSelectedAgent(agent.id)}
                    className={`flex items-center space-x-2 px-3 py-2 rounded-lg border transition-all duration-300 whitespace-nowrap ${
                      selectedAgent === agent.id
                        ? `bg-gradient-to-r ${agent.color} border-transparent text-white`
                        : 'bg-white/10 border-white/20 text-white/60 hover:bg-white/20'
                    }`}
                  >
                    {agent.icon}
                    <span className="text-sm font-medium">{agent.name}</span>
                    {agent.mastery && (
                      <span className="text-xs opacity-75">{agent.mastery.toFixed(0)}%</span>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Chat Area */}
            <div className="flex-1 flex flex-col">
              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.length === 0 && (
                  <div className="text-center text-white/60 py-8">
                    <div className="text-4xl mb-4">🧠</div>
                    <h3 className="text-lg font-semibold mb-2">Welcome to {agents.find(a => a.id === selectedAgent)?.name}</h3>
                    <p className="text-sm">{agents.find(a => a.id === selectedAgent)?.description}</p>
                    <p className="text-sm mt-2">Help me learn and grow!</p>
                  </div>
                )}
                
                {messages.map((message) => (
                  <div key={message.id} className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-[80%] p-3 rounded-lg ${
                      message.type === 'user' 
                        ? 'bg-blue-600 text-white' 
                        : 'bg-white/10 backdrop-blur-md border border-white/20 text-white'
                    }`}>
                      <div className="flex items-center space-x-2 mb-1">
                        {message.type === 'agent' && <span>🤖</span>}
                        <span className="text-xs opacity-60">
                          {message.type === 'user' ? 'You' : agents.find(a => a.id === message.agent)?.name || 'Agent'}
                        </span>
                      </div>
                      <div className="text-sm whitespace-pre-wrap">{message.content}</div>
                    </div>
                  </div>
                ))}

                {isLoading && (
                  <div className="flex justify-start">
                    <div className="bg-white/10 backdrop-blur-md border border-white/20 text-white p-3 rounded-lg">
                      <div className="flex items-center space-x-2">
                        <span>🤖</span>
                        <span className="text-xs opacity-60">{agents.find(a => a.id === selectedAgent)?.name}</span>
                      </div>
                      <div className="flex items-center space-x-2 mt-2">
                        <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-white"></div>
                        <span className="text-xs">Learning...</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Input */}
              <div className="p-4 border-t border-white/20">
                <div className="flex space-x-2">
                  <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                    placeholder={`Teach ${agents.find(a => a.id === selectedAgent)?.name}...`}
                    className="flex-1 px-3 py-2 bg-white/10 backdrop-blur-md rounded-lg border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500/50 text-sm"
                    disabled={isLoading}
                  />
                  <button
                    onClick={sendMessage}
                    disabled={!inputValue.trim() || isLoading}
                    className={`px-4 py-2 rounded-lg text-white transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed bg-gradient-to-r ${agents.find(a => a.id === selectedAgent)?.color}`}
                  >
                    {isLoading ? '...' : 'Send'}
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default BlendedDashboard; 