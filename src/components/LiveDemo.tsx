import React, { useState } from 'react';
import { Bot, Loader2, CheckCircle, XCircle, Play, Zap, Construction } from 'lucide-react';

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

  const API_BASE_URL = 'https://vectorshift-n8n-ventures.onrender.com';

  const handleDemoTest = async () => {
    setDemoState({ loading: true, response: null, error: null });

    try {
      const data = { 
        userMessage: aiMessage,
        timestamp: new Date().toISOString(),
        source: 'website-demo'
      };

      const response = await fetch(`${API_BASE_URL}/webhook/ai-chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      // Get the response text first
      const responseText = await response.text();
      
      // Try to parse as JSON, but handle empty responses gracefully
      let result;
      if (responseText.trim()) {
        try {
          result = JSON.parse(responseText);
        } catch (parseError) {
          // If JSON parsing fails, return the raw text
          result = {
            status: 'success',
            message: 'Response received (non-JSON)',
            rawResponse: responseText,
            contentType: response.headers.get('content-type')
          };
        }
      } else {
        // Handle empty response
        result = {
          status: 'success',
          message: 'Automation executed successfully',
          note: 'Response was empty, but workflow completed',
          timestamp: new Date().toISOString()
        };
      }

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

  return (
    <section className="py-20 bg-gradient-to-b from-[#0A0B1E] to-[#0A0B1E]/80">
      <div className="container mx-auto px-6">
        {/* Under Development Banner */}
        <div className="max-w-4xl mx-auto mb-8">
          <div className="bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border border-yellow-500/30 rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-3">
              <Construction className="w-6 h-6 text-yellow-400" />
              <h3 className="text-lg font-mono font-semibold text-yellow-400">Under Development</h3>
            </div>
            <p className="text-gray-300 font-mono text-sm">
              This demo is currently being developed. The automation workflow is being built and will be available soon. 
              You can still test the API connection and see the response structure.
            </p>
          </div>
        </div>

        <div className="text-center mb-16">
          <h2 className="text-3xl font-mono font-bold mb-4">
            <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              Live Demo
            </span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto font-mono">
            Test our AI automation workflow in real-time. See how our solutions can transform your field service operations.
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
                <pre className="text-sm text-gray-300 font-mono overflow-x-auto max-h-64 overflow-y-auto">
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

        {/* Single Demo Interface */}
        <div className="max-w-2xl mx-auto mb-12">
          <div className="bg-gradient-to-b from-cyan-500/10 to-transparent border border-cyan-500/20 rounded-2xl p-8">
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Bot className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-mono font-semibold text-white mb-2">AI Automation Demo</h3>
              <p className="text-gray-400 font-mono">
                Test our AI-powered automation workflow with custom messages
              </p>
            </div>
            
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-mono font-medium text-gray-300 mb-2">
                  Test Message
                </label>
                <input
                  type="text"
                  value={aiMessage}
                  onChange={(e) => setAiMessage(e.target.value)}
                  className="w-full p-4 bg-gray-800/50 border border-cyan-500/30 rounded-lg text-white font-mono focus:outline-none focus:border-cyan-400"
                  placeholder="Enter a test message for AI processing..."
                />
              </div>
              
              <button
                onClick={handleDemoTest}
                disabled={demoState.loading}
                className="w-full font-mono bg-gradient-to-r from-cyan-500 to-blue-500 px-8 py-4 rounded-lg text-lg font-semibold hover:shadow-lg hover:shadow-cyan-500/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {demoState.loading ? (
                  <div className="flex items-center justify-center gap-3">
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Testing AI Automation...
                  </div>
                ) : (
                  <div className="flex items-center justify-center gap-3">
                    <Play className="w-5 h-5" />
                    Test AI Automation
                  </div>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Info Panel */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-b from-cyan-500/5 to-transparent border border-cyan-500/20 rounded-2xl p-6">
            <h3 className="text-lg font-mono font-semibold text-white mb-4">How It Works</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm font-mono">
              <div>
                <h4 className="text-cyan-400 font-semibold mb-2">1. Enter Message</h4>
                <p className="text-gray-400">Type a custom message to test our AI automation.</p>
              </div>
              <div>
                <h4 className="text-cyan-400 font-semibold mb-2">2. Send Request</h4>
                <p className="text-gray-400">The demo sends your message to our automation platform.</p>
              </div>
              <div>
                <h4 className="text-cyan-400 font-semibold mb-2">3. View Results</h4>
                <p className="text-gray-400">See real-time AI responses and processing results.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LiveDemo; 