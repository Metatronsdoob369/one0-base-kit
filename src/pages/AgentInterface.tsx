import React, { useState, useEffect } from 'react';

interface Message {
  id: string;
  type: 'user' | 'agent';
  content: string;
}

const AgentInterface: React.FC = () => {
  const [inputValue, setInputValue] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const sendMessage = async () => {
    if (!inputValue.trim() || isLoading) return;

    const userMessage: Message = {
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
        const agentMessage: Message = {
          id: (Date.now() + 1).toString(),
          type: 'agent',
          content: data.response
        };
        setMessages(prev => [...prev, agentMessage]);
      } else {
        throw new Error('Failed to get response');
      }
    } catch (error) {
      console.error('Error sending message:', error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'agent',
        content: 'Sorry, I encountered an error. Please make sure the PATHsassin API server is running on port 5001.'
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleQuickCommand = (command: string) => {
    setInputValue(command);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="bg-white/10 backdrop-blur-md rounded-lg border border-white/20 p-6 mb-6">
          <h1 className="text-white text-3xl font-bold mb-2">🤖 PATHsassin Agent</h1>
          <p className="text-white/60">Your local learning companion for the Master Skills Index</p>
          <div className="mt-4 flex items-center space-x-4 text-sm">
            <span className="text-green-400">● API Connected</span>
            <span className="text-blue-400">● Local Processing</span>
            <span className="text-purple-400">● Private & Secure</span>
          </div>
        </div>

        {/* Chat Area */}
        <div className="bg-white/10 backdrop-blur-md rounded-lg border border-white/20 h-96 flex flex-col">
          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.length === 0 && (
              <div className="text-center text-white/60 py-8">
                <div className="text-4xl mb-4">🧠</div>
                <h3 className="text-lg font-semibold mb-2">Welcome to PATHsassin Agent</h3>
                <p className="text-sm">I'm your specialized learning companion for the Master Skills Index.</p>
                <p className="text-sm mt-2">Try typing a message or use the quick commands below!</p>
              </div>
            )}
            
            {messages.map((message) => (
              <div key={message.id} className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] p-4 rounded-lg ${
                  message.type === 'user' 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-white/10 backdrop-blur-md border border-white/20 text-white'
                }`}>
                  <div className="flex items-center space-x-2 mb-2">
                    {message.type === 'agent' && <span>🤖</span>}
                    <span className="text-xs opacity-60">
                      {message.type === 'user' ? 'You' : 'PATHsassin'}
                    </span>
                  </div>
                  <div className="whitespace-pre-wrap">{message.content}</div>
                </div>
              </div>
            ))}

            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white/10 backdrop-blur-md border border-white/20 text-white p-4 rounded-lg">
                  <div className="flex items-center space-x-2">
                    <span>🤖</span>
                    <span className="text-xs opacity-60">PATHsassin</span>
                  </div>
                  <div className="flex items-center space-x-2 mt-2">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    <span className="text-sm">Thinking...</span>
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
                placeholder="Ask PATHsassin about your skills, research topics, or get recommendations..."
                className="flex-1 px-4 py-3 bg-white/10 backdrop-blur-md rounded-lg border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                disabled={isLoading}
              />
              <button
                onClick={sendMessage}
                disabled={!inputValue.trim() || isLoading}
                className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg text-white hover:from-blue-700 hover:to-purple-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? 'Sending...' : 'Send'}
              </button>
            </div>
          </div>
        </div>

        {/* Quick Commands */}
        <div className="mt-6 bg-white/10 backdrop-blur-md rounded-lg border border-white/20 p-4">
          <h3 className="text-white font-semibold mb-4">Quick Commands</h3>
          <div className="flex flex-wrap gap-2">
            {[
              'analyze 5',
              'recommend 1', 
              'research automation',
              'synthesis',
              'assess 3',
              'help'
            ].map((cmd) => (
              <button
                key={cmd}
                onClick={() => handleQuickCommand(cmd)}
                className="px-3 py-2 bg-white/10 backdrop-blur-md rounded-lg border border-white/20 text-white hover:bg-white/20 transition-all duration-300 text-sm"
              >
                {cmd}
              </button>
            ))}
          </div>
        </div>

        {/* Status */}
        <div className="mt-4 text-center text-white/40 text-sm">
          <p>PATHsassin Agent v1.0 • Local AI • Private Processing</p>
        </div>
      </div>
    </div>
  );
};

export default AgentInterface; 