import React, { useState } from 'react';
import { MessageSquare, Mic, MicOff } from 'lucide-react';

const VoiceAssistantSimple: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isCallActive, setIsCallActive] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleStartCall = async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      // Simulate call start
      setTimeout(() => {
        setIsCallActive(true);
        setIsLoading(false);
      }, 2000);
      
    } catch (error: any) {
      setError(`Failed to start call: ${error.message}`);
      setIsLoading(false);
    }
  };

  const handleStopCall = () => {
    setIsCallActive(false);
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
                      Speak directly with our AI assistant using your microphone.
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
                      Speak naturally with our AI assistant.
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

export default VoiceAssistantSimple;
