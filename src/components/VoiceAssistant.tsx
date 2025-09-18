import React, { useState, useEffect } from 'react';
import { MessageSquare, Mic, MicOff, Phone, PhoneOff } from 'lucide-react';
import Vapi from '@vapi-ai/web';

const VoiceAssistant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isCallActive, setIsCallActive] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [vapi, setVapi] = useState<Vapi | null>(null);

  useEffect(() => {
    const initializeVapi = async () => {
      try {
        const apiKey = import.meta.env.VITE_VAPI_API_KEY || 'e68bd505-55f0-450a-8993-f4f28c0226b5';
        console.log('Voice Assistant - API Key:', apiKey ? 'Set' : 'Not Set');
        
        if (!apiKey || apiKey === 'your-api-key-here') {
          console.log('VAPI API key not configured');
          setError('Voice assistant not configured. Please contact support.');
          return;
        }
        
        // Initialize VAPI with your API key and assistant ID
        const vapiInstance = new Vapi(apiKey);
        
        // Add event listeners for debugging
        vapiInstance.on('call-start', () => {
          console.log('✅ VAPI call started successfully');
          setIsCallActive(true);
          setIsLoading(false);
          setError(null);
        });
        
        vapiInstance.on('call-end', () => {
          console.log('📞 VAPI call ended');
          setIsCallActive(false);
          setIsLoading(false);
        });
        
        vapiInstance.on('error', (e: any) => {
          console.error('❌ VAPI error:', e);
          console.error('❌ Error details:', JSON.stringify(e, null, 2));
          setError(`VAPI Error: ${e.error?.message || e.message || e.errorMsg || 'Unknown error'}`);
          setIsLoading(false);
        });
        
        vapiInstance.on('speech-start', () => {
          console.log('🎤 Assistant started speaking');
        });
        
        vapiInstance.on('speech-end', () => {
          console.log('🔇 Assistant finished speaking');
        });
        
        setVapi(vapiInstance);
        console.log('✅ VAPI instance created successfully');
      } catch (error) {
        console.error('Failed to initialize VAPI:', error);
        setError('Failed to initialize voice assistant');
      }
    };

    initializeVapi();
  }, []);

  const handleStartCall = async () => {
    if (!vapi) {
      setError('Voice assistant not initialized. Please refresh the page.');
      return;
    }

    try {
      setIsLoading(true);
      setError(null);
      
      if (isCallActive) {
        // Stop the call if it's active
        vapi.stop();
        setIsCallActive(false);
        return;
      }
      
      // Start the call using VAPI web SDK
      console.log('Starting VAPI call...');
      const assistantId = import.meta.env.VITE_VAPI_ASSISTANT_ID || 'b8ddcdb9-1bb5-4cef-8a09-69c386230084';
      console.log('Voice Assistant - Assistant ID:', assistantId ? 'Set' : 'Not Set');
      
      // Test VAPI instance before starting
      if (!vapi || typeof vapi.start !== 'function') {
        throw new Error('VAPI instance not properly initialized');
      }
      
      console.log('VAPI instance ready, starting call...');
      await vapi.start(assistantId);
      setIsCallActive(true);
      console.log('VAPI call started successfully');
      
    } catch (error: any) {
      console.error('Error in voice call:', error);
      console.error('Error details:', JSON.stringify(error, null, 2));
      
      // Handle specific error types
      if (error.name === 'NotAllowedError' || error.message?.includes('permission')) {
        setError('Microphone permission denied. Please allow microphone access and try again.');
      } else if (error.name === 'NotFoundError' || error.message?.includes('microphone')) {
        setError('No microphone found. Please connect a microphone and try again.');
      } else if (error.message?.includes('HTTPS')) {
        setError('Voice calls require HTTPS. Please use the secure version of this site.');
      } else if (error.message?.includes('assistant')) {
        setError('Assistant configuration error. Please contact support.');
      } else if (error.message?.includes('network') || error.message?.includes('fetch')) {
        setError('Network error. Please check your connection and try again.');
      } else {
        setError(`Failed to start conversation: ${error.message || error.errorMsg || 'Unknown error'}`);
      }
      
      setIsLoading(false);
    }
  };

  const handleStopCall = async () => {
    if (vapi) {
      try {
        vapi.stop();
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
                  <h4 className="text-white font-mono font-semibold mb-2">Talk Now - Voice Assistant</h4>
                  <p className="text-gray-400 font-mono text-sm">
                    Speak directly with our AI assistant using your microphone. Ask about our services, get quotes, or schedule consultations.
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
                    <Mic className="w-4 h-4" />
                    <span>Talk Now</span>
                  </div>
                )}
              </button>
            </div>

            {/* Instructions */}
            <div className="mt-4 text-center">
              <p className="text-gray-500 font-mono text-xs">
                {isCallActive 
                  ? "Speak naturally and ask about our services"
                  : "Talk directly with our AI assistant using your microphone"
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
