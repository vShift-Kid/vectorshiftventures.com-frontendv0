import React, { useState, useEffect } from 'react';
import { MessageSquare, Mic, MicOff, Phone, PhoneOff } from 'lucide-react';
import Vapi from '@vapi-ai/web';

const VoiceAssistant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isCallActive, setIsCallActive] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [vapi, setVapi] = useState<Vapi | null>(null);

  // Simple initialization - no complex VAPI setup needed
  const apiKey = import.meta.env.VITE_VAPI_API_KEY || 'e68bd505-55f0-450a-8993-f4f28c0226b5';
  const assistantId = import.meta.env.VITE_VAPI_ASSISTANT_ID || 'b8ddcdb9-1bb5-4cef-8a09-69c386230084';

  useEffect(() => {
    const initializeVapi = async () => {
      try {
        console.log('VoiceAssistant: Starting initialization...');
        
        if (!apiKey || apiKey === 'your-api-key-here') {
          console.log('VAPI API key not configured');
          setError('Voice assistant not configured. Please contact support.');
          return;
        }
        
        // Initialize VAPI with your API key
        console.log('Initializing VAPI with API key:', apiKey.substring(0, 8) + '...');
        
        let vapiInstance;
        try {
          vapiInstance = new Vapi(apiKey);
          console.log('VAPI instance created:', vapiInstance);
          console.log('VAPI instance type:', typeof vapiInstance);
          console.log('VAPI instance methods:', Object.getOwnPropertyNames(vapiInstance));
        } catch (vapiError) {
          console.error('VAPI constructor error:', vapiError);
          throw vapiError;
        }
        
        // Add event listeners
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
          setError(`VAPI Error: ${e.error?.message || e.message || 'Unknown error'}`);
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
        setError(`Failed to initialize voice assistant: ${error.message || 'Unknown error'}`);
      }
    };

    initializeVapi();
  }, [apiKey]);

  // Add a simple fallback if VAPI fails to initialize
  if (error && !vapi) {
    return (
      <>
        {/* Floating Action Button */}
        <div className="fixed bottom-6 right-6 z-50">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="w-14 h-14 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center group"
          >
            <MessageSquare className="w-6 h-6" />
          </button>
        </div>

        {/* Error Panel */}
        {isOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-gray-900 rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-hidden">
              <div className="bg-gradient-to-r from-red-500 to-red-600 p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                      <MessageSquare className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h3 className="text-white font-mono font-semibold">Talk Now</h3>
                      <p className="text-red-100 text-sm">Voice Assistant</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="text-white hover:text-gray-200 transition-colors"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              </div>
              <div className="p-6">
                <div className="text-center space-y-4">
                  <div className="w-16 h-16 mx-auto bg-gradient-to-r from-red-500/20 to-red-600/20 rounded-full flex items-center justify-center">
                    <MessageSquare className="w-8 h-8 text-red-400" />
                  </div>
                  <div>
                    <h4 className="text-white font-mono font-semibold mb-2">Voice Assistant Unavailable</h4>
                    <p className="text-gray-400 font-mono text-sm mb-4">
                      {error}
                    </p>
                    <button
                      onClick={() => window.location.reload()}
                      className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white px-4 py-2 rounded-lg font-mono text-sm"
                    >
                      Refresh Page
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </>
    );
  }

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

      // Check microphone permissions first
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        console.log('Microphone permission granted');
        stream.getTracks().forEach(track => track.stop()); // Stop the test stream
      } catch (micError) {
        console.error('Microphone permission error:', micError);
        throw new Error('Microphone permission denied. Please allow microphone access and try again.');
      }
      
      console.log('Starting VAPI call...');
      console.log('Assistant ID:', assistantId);
      console.log('VAPI instance:', vapi);
      console.log('VAPI start method:', typeof vapi.start);
      
      // Start the call using VAPI web SDK
      console.log('Calling vapi.start()...');
      await vapi.start(assistantId);
      console.log('VAPI call started successfully');
      
    } catch (error: any) {
      console.error('Error in voice call:', error);
      
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
        console.log('Call ended by user');
      } catch (error) {
        console.error('Error ending call:', error);
        setError('Failed to end call');
      }
    }
  };

  return (
    <>
      {/* Floating Action Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-14 h-14 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center group"
        >
          <MessageSquare className="w-6 h-6" />
        </button>
      </div>

      {/* Voice Assistant Panel */}
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-900 rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-hidden">
            {/* Header */}
            <div className="bg-gradient-to-r from-cyan-500 to-blue-500 p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                    <MessageSquare className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-white font-mono font-semibold">Talk Now</h3>
                    <p className="text-cyan-100 text-sm">Voice Assistant</p>
                  </div>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-white hover:text-gray-200 transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
                      Speak directly with our AI assistant using your microphone. The AI will connect you to a phone agent.
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
                      Speak naturally with our AI assistant. The AI will connect you to a phone agent.
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
                  onClick={isCallActive ? handleStopCall : handleStartCall}
                  disabled={isLoading}
                  className={`w-full py-3 px-6 rounded-lg font-mono font-semibold transition-all duration-300 ${
                    isCallActive
                      ? 'bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white'
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
                      <MicOff className="w-4 h-4" />
                      <span>End Call</span>
                    </div>
                  ) : (
                    <div className="flex items-center justify-center space-x-2">
                      <Mic className="w-4 h-4" />
                      <span>Start Voice Call</span>
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
        </div>
      )}
    </>
  );
};

export default VoiceAssistant;