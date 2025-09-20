import React, { useState, useEffect } from 'react';
import { MessageSquare, Mic, MicOff, Volume2, VolumeX } from 'lucide-react';

const VoiceAssistantFallback: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isCallActive, setIsCallActive] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isMuted, setIsMuted] = useState(false);
  const [debugLogs, setDebugLogs] = useState<string[]>([]);
  const [showDebug, setShowDebug] = useState(false);

  // Debug logging function
  const addDebugLog = (message: string) => {
    const timestamp = new Date().toLocaleTimeString();
    const logMessage = `[${timestamp}] ${message}`;
    console.log(logMessage);
    setDebugLogs(prev => [...prev.slice(-9), logMessage]); // Keep last 10 logs
  };

  const handleStartCall = async () => {
    try {
      setIsLoading(true);
      setError(null);
      addDebugLog('🚀 Starting fallback voice call...');

      // Check microphone permissions
      try {
        addDebugLog('Checking microphone permissions...');
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        addDebugLog('✅ Microphone permission granted');
        
        // Check available audio devices
        const devices = await navigator.mediaDevices.enumerateDevices();
        const audioInputs = devices.filter(device => device.kind === 'audioinput');
        const audioOutputs = devices.filter(device => device.kind === 'audiooutput');
        
        addDebugLog(`🎤 Available microphones: ${audioInputs.length}`);
        addDebugLog(`🔊 Available speakers: ${audioOutputs.length}`);
        
        if (audioOutputs.length === 0) {
          addDebugLog('⚠️ No audio output devices found - you may not hear anything');
        }
        
        stream.getTracks().forEach(track => track.stop()); // Stop the test stream
      } catch (micError: any) {
        addDebugLog(`❌ Microphone permission error: ${micError.message}`);
        throw new Error('Microphone permission denied. Please allow microphone access and try again.');
      }

      // Simulate call start with realistic timing
      addDebugLog('Simulating call connection...');
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      addDebugLog('✅ Fallback call started successfully');
      setIsCallActive(true);
      setIsLoading(false);
      
      // Simulate some conversation
      setTimeout(() => {
        addDebugLog('🎤 Simulating AI response...');
        playNotificationSound();
      }, 3000);

    } catch (error: any) {
      addDebugLog(`❌ Error in fallback voice call: ${error.message}`);
      setError(`Failed to start conversation: ${error.message}`);
      setIsLoading(false);
    }
  };

  const handleStopCall = () => {
    addDebugLog('📞 Ending fallback call...');
    setIsCallActive(false);
    setIsLoading(false);
  };

  const playNotificationSound = () => {
    try {
      addDebugLog('🔊 Playing notification sound...');
      
      // Create a simple notification sound
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
      
      // Play a pleasant notification sound
      oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
      gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
      
      oscillator.start();
      addDebugLog('🔊 Notification sound played');
      
      setTimeout(() => {
        oscillator.stop();
      }, 500);
      
    } catch (error: any) {
      addDebugLog(`❌ Audio test failed: ${error.message}`);
    }
  };

  const testAudio = async () => {
    try {
      addDebugLog('🔊 Testing audio output...');
      
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
      
      oscillator.frequency.setValueAtTime(440, audioContext.currentTime); // A4 note
      gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
      
      oscillator.start();
      addDebugLog('🔊 Playing test tone (440Hz) - you should hear a beep');
      
      setTimeout(() => {
        oscillator.stop();
        addDebugLog('🔊 Test tone finished');
      }, 1000);
      
    } catch (error: any) {
      addDebugLog(`❌ Audio test failed: ${error.message}`);
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
                    <p className="text-cyan-100 text-sm">Voice Assistant (Demo Mode)</p>
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
                    <h4 className="text-white font-mono font-semibold mb-2">Talk Now - Demo Mode</h4>
                    <p className="text-gray-400 font-mono text-sm">
                      This is a demo version of our voice assistant. In production, this would connect to our AI system.
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
                    <h4 className="text-white font-mono font-semibold mb-2">Demo Call Active</h4>
                    <p className="text-gray-400 font-mono text-sm">
                      This is a demo call. In production, you would be speaking with our AI assistant.
                    </p>
                  </div>
                </div>
              )}

              {/* Error Message */}
              {error && (
                <div className="mt-4 p-3 bg-red-500/10 border border-red-500/30 rounded-lg">
                  <p className="text-red-400 font-mono text-sm">{error}</p>
                  <button
                    onClick={() => setError(null)}
                    className="text-red-300 hover:text-red-200 font-mono text-xs mt-2"
                  >
                    Dismiss
                  </button>
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
                      <span>End Demo Call</span>
                    </div>
                  ) : (
                    <div className="flex items-center justify-center space-x-2">
                      <Mic className="w-4 h-4" />
                      <span>Start Demo Call</span>
                    </div>
                  )}
                </button>
              </div>

              {/* Instructions */}
              <div className="mt-4 text-center">
                <p className="text-gray-500 font-mono text-xs">
                  {isCallActive 
                    ? "This is a demo call - no actual AI conversation is happening"
                    : "Click to start a demo voice call (microphone test)"
                  }
                </p>
                {isCallActive && (
                  <div className="mt-2 p-2 bg-blue-500/10 border border-blue-500/30 rounded text-xs">
                    <p className="text-blue-300 font-mono">
                      🔊 This is a demo - you can test microphone and audio functionality
                    </p>
                  </div>
                )}
              </div>

              {/* Debug Panel */}
              <div className="mt-4">
                <button
                  onClick={() => setShowDebug(!showDebug)}
                  className="w-full py-2 px-3 bg-gray-700 hover:bg-gray-600 text-white rounded text-xs font-mono"
                >
                  {showDebug ? 'Hide' : 'Show'} Debug Logs
                </button>
                
                {showDebug && (
                  <div className="mt-2 p-3 bg-gray-800/50 rounded text-xs text-gray-300 max-h-40 overflow-y-auto">
                    <div className="mb-2 font-semibold text-white">Debug Information:</div>
                    <div>Mode: Demo Fallback</div>
                    <div>Call Active: {isCallActive ? 'Yes' : 'No'}</div>
                    <div>Loading: {isLoading ? 'Yes' : 'No'}</div>
                    <div>Error: {error || 'None'}</div>
                    
                    <div className="mt-3 font-semibold text-white">Recent Logs:</div>
                    <div className="space-y-1 mt-1">
                      {debugLogs.length === 0 ? (
                        <div className="text-gray-500">No logs yet...</div>
                      ) : (
                        debugLogs.map((log, index) => (
                          <div key={index} className="text-xs font-mono break-words">
                            {log}
                          </div>
                        ))
                      )}
                    </div>
                    
                    <div className="mt-2 space-x-2">
                      <button
                        onClick={() => setDebugLogs([])}
                        className="px-2 py-1 bg-red-600 hover:bg-red-700 text-white rounded text-xs"
                      >
                        Clear Logs
                      </button>
                      <button
                        onClick={testAudio}
                        className="px-2 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded text-xs"
                      >
                        Test Audio
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default VoiceAssistantFallback;
