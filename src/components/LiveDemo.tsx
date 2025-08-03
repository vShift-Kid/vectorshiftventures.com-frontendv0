import React, { useState } from 'react';
import { Bot, MessageSquare, Database, Loader2, CheckCircle, XCircle, Play, Zap } from 'lucide-react';

interface DemoState {
  loading: boolean;
  response: any;
  error: string | null;
}

const LiveDemo: React.FC = () => {
  const [demoState, setDemoState] = useState<DemoState>({
    loading: false,
    response: null,
    error: null
  });
  const [aiMessage, setAiMessage] = useState('How can AI automation help my field service business?');

  const N8N_BASE_URL = 'https://vectorshift-n8n-ventures.onrender.com';

  const handleWorkflowTest = async (workflowType: 'ai' | 'file' | 'api') => {
    setDemoState({ loading: true, response: null, error: null });

    try {
      let endpoint = '';
      let data = {};

      switch (workflowType) {
        case 'ai':
          endpoint = '/webhook/ai-chat';
          data = { userMessage: aiMessage };
          break;
        case 'file':
          endpoint = '/webhook/file-operations';
          data = { 
            operation: 'test',
            filename: 'demo-test.txt',
            content: 'This is a test file operation from the live demo.'
          };
          break;
        case 'api':
          endpoint = '/webhook/api-integration';
          data = { 
            test: true,
            message: 'Testing API integration from live demo'
          };
          break;
      }

      const response = await fetch(`${N8N_BASE_URL}${endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      setDemoState({ loading: false, response: result, error: null });
    } catch (error) {
      console.error('Demo error:', error);
      setDemoState({ 
        loading: false, 
        response: null, 
        error: error instanceof Error ? error.message : 'An error occurred' 
      });
    }
  };

  const getStatusIcon = () => {
    if (demoState.loading) return <Loader2 className="w-5 h-5 animate-spin text-blue-400" />;
    if (demoState.error) return <XCircle className="w-5 h-5 text-red-400" />;
    if (demoState.response) return <CheckCircle className="w-5 h-5 text-green-400" />;
    return <Zap className="w-5 h-5 text-gray-400" />;
  };

  const getStatusText = () => {
    if (demoState.loading) return 'Processing...';
    if (demoState.error) return 'Error occurred';
    if (demoState.response) return 'Success!';
    return 'Ready to test';
  };

  const workflowCards = [
    {
      type: 'ai' as const,
      title: 'AI Chat Automation',
      description: 'Test our AI-powered chat system with custom messages',
      icon: Bot,
      color: 'from-cyan-500 to-blue-500'
    },
    {
      type: 'file' as const,
      title: 'File Operations',
      description: 'Test automated file processing and management',
      icon: Database,
      color: 'from-green-500 to-emerald-500'
    },
    {
      type: 'api' as const,
      title: 'API Integration',
      description: 'Test external API connections and data processing',
      icon: MessageSquare,
      color: 'from-purple-500 to-pink-500'
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-[#0A0B1E] to-[#0A0B1E]/80">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-mono font-bold mb-4">
            <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              Live Demo
            </span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto font-mono">
            Test our automation workflows in real-time. See how our solutions can transform your field service operations.
          </p>
        </div>

        {/* Status Panel */}
        <div className="max-w-2xl mx-auto mb-12">
          <div className="bg-gradient-to-b from-cyan-500/10 to-transparent border border-cyan-500/20 rounded-2xl p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-mono font-semibold text-white">Demo Status</h3>
              <div className="flex items-center gap-2">
                {getStatusIcon()}
                <span className="font-mono text-sm">{getStatusText()}</span>
              </div>
            </div>
            
            {demoState.response && (
              <div className="bg-gray-800/50 rounded-lg p-4">
                <h4 className="font-mono font-semibold text-cyan-400 mb-2">Response:</h4>
                <pre className="text-sm text-gray-300 font-mono overflow-x-auto">
                  {JSON.stringify(demoState.response, null, 2)}
                </pre>
              </div>
            )}
            
            {demoState.error && (
              <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4">
                <h4 className="font-mono font-semibold text-red-400 mb-2">Error:</h4>
                <p className="text-sm text-red-300 font-mono">{demoState.error}</p>
              </div>
            )}
          </div>
        </div>

        {/* AI Chat Demo */}
        <div className="max-w-2xl mx-auto mb-12">
          <div className="bg-gradient-to-b from-cyan-500/10 to-transparent border border-cyan-500/20 rounded-2xl p-6">
            <h3 className="text-lg font-mono font-semibold text-white mb-4">AI Chat Demo</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-mono font-medium text-gray-300 mb-2">
                  Test Message
                </label>
                <input
                  type="text"
                  value={aiMessage}
                  onChange={(e) => setAiMessage(e.target.value)}
                  className="w-full p-3 bg-gray-800/50 border border-cyan-500/30 rounded-lg text-white font-mono focus:outline-none focus:border-cyan-400"
                  placeholder="Enter a test message for AI processing..."
                />
              </div>
              <button
                onClick={() => handleWorkflowTest('ai')}
                disabled={demoState.loading}
                className="w-full font-mono bg-gradient-to-r from-cyan-500 to-blue-500 px-6 py-3 rounded-lg text-white font-semibold hover:shadow-lg hover:shadow-cyan-500/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {demoState.loading ? (
                  <div className="flex items-center justify-center gap-2">
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Testing AI Chat...
                  </div>
                ) : (
                  <div className="flex items-center justify-center gap-2">
                    <Bot className="w-4 h-4" />
                    Test AI Chat
                  </div>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Workflow Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {workflowCards.map((card) => (
            <div key={card.type} className="p-6 rounded-2xl bg-gradient-to-b from-cyan-500/10 to-transparent border border-cyan-500/20 hover:border-cyan-500/40 transition-all">
              <div className={`w-12 h-12 bg-gradient-to-r ${card.color} rounded-lg flex items-center justify-center mb-4`}>
                <card.icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-mono font-semibold mb-3">{card.title}</h3>
              <p className="text-gray-400 font-mono mb-6">{card.description}</p>
              <button
                onClick={() => handleWorkflowTest(card.type)}
                disabled={demoState.loading}
                className="font-mono bg-gradient-to-r from-cyan-500 to-blue-500 px-6 py-2 rounded-lg text-white font-semibold hover:shadow-lg hover:shadow-cyan-500/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed w-full"
              >
                {demoState.loading ? (
                  <div className="flex items-center justify-center gap-2">
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Testing...
                  </div>
                ) : (
                  <div className="flex items-center justify-center gap-2">
                    <Play className="w-4 h-4" />
                    Test Workflow
                  </div>
                )}
              </button>
            </div>
          ))}
        </div>

        {/* Info Panel */}
        <div className="max-w-4xl mx-auto mt-12">
          <div className="bg-gradient-to-b from-cyan-500/5 to-transparent border border-cyan-500/20 rounded-2xl p-6">
            <h3 className="text-lg font-mono font-semibold text-white mb-4">How It Works</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm font-mono">
              <div>
                <h4 className="text-cyan-400 font-semibold mb-2">1. Select Workflow</h4>
                <p className="text-gray-400">Choose from our three main automation workflows to test.</p>
              </div>
              <div>
                <h4 className="text-cyan-400 font-semibold mb-2">2. Send Request</h4>
                <p className="text-gray-400">The demo sends a test request to our n8n automation platform.</p>
              </div>
              <div>
                <h4 className="text-cyan-400 font-semibold mb-2">3. View Results</h4>
                <p className="text-gray-400">See real-time responses and data processing results.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LiveDemo; 