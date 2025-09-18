import React, { useState, useEffect } from 'react';
import { MessageSquare, Mic, MicOff, Phone, PhoneOff } from 'lucide-react';
import { getVapiMCPClient } from '../lib/vapiMCP';

const VoiceAssistant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isCallActive, setIsCallActive] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [vapiMCP, setVapiMCP] = useState<any>(null);

  useEffect(() => {
    const initializeVapiMCP = async () => {
      try {
        const client = getVapiMCPClient();
        await client.initialize();
        setVapiMCP(client);
      } catch (error) {
        console.error('Failed to initialize VAPI MCP:', error);
        setError('Failed to initialize voice assistant');
      }
    };

    initializeVapiMCP();
  }, []);

  const handleStartCall = async () => {
    if (!vapiMCP) {
      setError('Voice assistant not initialized. Please refresh the page.');
      return;
    }

    try {
      setIsLoading(true);
      setError(null);
      
      if (isCallActive) {
        // Stop the call if it's active
        await vapiMCP.stopCall();
        setIsCallActive(false);
        return;
      }
      
      // Start the call using MCP
      console.log('Starting VAPI MCP call...');
      await vapiMCP.startCall();
      setIsCallActive(true);
      console.log('VAPI MCP call started successfully');
      
    } catch (error: any) {
      console.error('Error in voice call:', error);
      setError('Failed to start conversation. Please try again.');
      setIsLoading(false);
    }
  };

  const handleStopCall = async () => {
    if (vapiMCP) {
      try {
        await vapiMCP.stopCall();
        setIsCallActive(false);
      } catch (error) {
        console.error('Error stopping call:', error);
      }
    }
  };

  return (
    <>
      {/* Floating Voice Assistant Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 z-50 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white rounded-full p-3 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 flex items-center gap-2"
          title="Try Voice Assistant"
        >
          <Mic className="w-5 h-5" />
          <span className="font-mono text-sm font-semibold">Try Me</span>
        </button>
      )}

      {/* Voice Assistant Interface */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 z-50 w-80 bg-[#0A0B1E] border border-cyan-500/30 rounded-2xl shadow-2xl">
          {/* Header */}
          <div className="bg-gradient-to-r from-cyan-500/20 to-blue-500/20 px-6 py-4 rounded-t-2xl border-b border-cyan-500/30">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className={`w-3 h-3 rounded-full ${isCallActive ? 'bg-green-400 animate-pulse' : 'bg-gray-400'}`}></div>
                <h3 className="text-white font-mono font-semibold">VectorShift AI Assistant</h3>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="p-6">
            {!isCallActive && (
              <div className="text-center space-y-4">
                <div className="w-16 h-16 mx-auto bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-full flex items-center justify-center">
                  <Mic className="w-8 h-8 text-cyan-400" />
                </div>
                <div>
                  <h4 className="text-white font-mono font-semibold mb-2">Try Our Voice Assistant</h4>
                  <p className="text-gray-400 font-mono text-sm">
                    Speak with our AI assistant about VectorShift Ventures services, automation solutions, and business consultations.
                  </p>
                </div>
              </div>
            )}

            {isCallActive && (
              <div className="text-center space-y-4">
                <div className="w-16 h-16 mx-auto bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-full flex items-center justify-center animate-pulse">
                  <MicOff className="w-8 h-8 text-green-400" />
                </div>
                <div>
                  <h4 className="text-white font-mono font-semibold mb-2">Conversation Active</h4>
                  <p className="text-gray-400 font-mono text-sm">
                    Speak naturally with our AI assistant. Click the button below to end the call.
                  </p>
                </div>
              </div>
            )}

            {/* Error Message */}
            {error && (
              <div className="mt-4 p-3 bg-red-500/10 border border-red-500/30 rounded-lg">
                <p className="text-red-400 font-mono text-sm">{error}</p>
              </div>
            )}

            {/* Action Button */}
            <div className="mt-6">
              <button
                onClick={handleStartCall}
                disabled={isLoading}
                className={`w-full py-3 px-4 rounded-lg font-mono font-semibold transition-all duration-300 ${
                  isCallActive
                    ? 'bg-red-500 hover:bg-red-600 text-white'
                    : 'bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white'
                } disabled:opacity-50 disabled:cursor-not-allowed`}
              >
                {isLoading ? (
                  <div className="flex items-center justify-center space-x-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Connecting...</span>
                  </div>
                ) : isCallActive ? (
                  <div className="flex items-center justify-center space-x-2">
                    <PhoneOff className="w-4 h-4" />
                    <span>End Call</span>
                  </div>
                ) : (
                  <div className="flex items-center justify-center space-x-2">
                    <Phone className="w-4 h-4" />
                    <span>Start Voice Conversation</span>
                  </div>
                )}
              </button>
            </div>

            {/* Instructions */}
            <div className="mt-4 text-center">
              <p className="text-gray-500 font-mono text-xs">
                {isCallActive 
                  ? "Speak naturally and ask about our services"
                  : "Click to start a voice conversation with our AI assistant"
                }
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default VoiceAssistant;
