import React, { useState, useEffect } from 'react';
import { MessageSquare, Mic, MicOff, Phone, PhoneOff } from 'lucide-react';
import Vapi from '@vapi-ai/web';

const VoiceAssistant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isCallActive, setIsCallActive] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [vapi, setVapi] = useState<Vapi | null>(null);
  const [debugLogs, setDebugLogs] = useState<string[]>([]);
  const [showDebug, setShowDebug] = useState(false);

  // VAPI Configuration
  const apiKey = import.meta.env.VITE_VAPI_API_KEY || 'e68bd505-55f0-450a-8993-f4f28c0226b5';
  const assistantId = import.meta.env.VITE_VAPI_ASSISTANT_ID || 'b8ddcdb9-1bb5-4cef-8a09-69c386230084';

  // Debug logging function
  const addDebugLog = (message: string) => {
    const timestamp = new Date().toLocaleTimeString();
    const logMessage = `[${timestamp}] ${message}`;
    console.log(logMessage);
    setDebugLogs(prev => [...prev.slice(-9), logMessage]); // Keep last 10 logs
  };

  useEffect(() => {
    const initializeVapi = async () => {
      try {
        addDebugLog('VoiceAssistant: Initializing VAPI...');
        addDebugLog(`VAPI constructor: ${typeof Vapi}`);
        addDebugLog(`API Key available: ${!!apiKey}`);
        
        if (!apiKey || apiKey === 'your-api-key-here') {
          addDebugLog('ERROR: VAPI API key not configured');
          setError('Voice assistant not configured. Please contact support.');
          return;
        }
        
        // Check if VAPI is available
        if (typeof Vapi !== 'function') {
          addDebugLog('ERROR: VAPI Web SDK not loaded properly');
          throw new Error('VAPI Web SDK not loaded properly');
        }
        
        // Initialize VAPI with API key
        addDebugLog(`Creating VAPI instance with API key: ${apiKey.substring(0, 8)}...`);
        
        const vapiInstance = new Vapi(apiKey);
        addDebugLog('VAPI instance created successfully');
        addDebugLog(`VAPI instance methods: ${Object.getOwnPropertyNames(vapiInstance).length} methods`);
        
        // Check if VAPI is properly initialized
        if (!vapiInstance || typeof vapiInstance.start !== 'function') {
          addDebugLog('❌ VAPI instance not properly initialized');
          throw new Error('VAPI instance not properly initialized');
        }
        
        addDebugLog('✅ VAPI instance validation passed');
        
        // Add event listeners
        vapiInstance.on('call-start', () => {
          addDebugLog('✅ VAPI call started');
          setIsCallActive(true);
          setIsLoading(false);
          setError(null);
        });
        
        vapiInstance.on('call-end', () => {
          addDebugLog('📞 VAPI call ended');
          setIsCallActive(false);
          setIsLoading(false);
        });
        
        vapiInstance.on('call-start-progress', (event: any) => {
          addDebugLog(`📞 Call start progress: ${event.stage} - ${event.status}`);
          if (event.status === 'failed') {
            addDebugLog(`❌ Call start failed at stage: ${event.stage}`);
            setError(`Call start failed at stage: ${event.stage}`);
            setIsLoading(false);
          }
        });
        
        vapiInstance.on('call-start-success', (event: any) => {
          addDebugLog('✅ Call start success');
          setIsCallActive(true);
          setIsLoading(false);
          setError(null);
        });
        
        vapiInstance.on('call-start-failed', (event: any) => {
          addDebugLog(`❌ Call start failed: ${event.error}`);
          setError(`Call start failed: ${event.error}`);
          setIsLoading(false);
          setIsCallActive(false);
        });
        
        vapiInstance.on('error', (error: any) => {
          addDebugLog(`❌ VAPI error: ${error.error?.message || error.message || 'Unknown error'}`);
          setError(`Voice assistant error: ${error.error?.message || error.message || 'Unknown error'}`);
          setIsLoading(false);
          setIsCallActive(false);
        });
        
        vapiInstance.on('speech-start', () => {
          addDebugLog('🎤 Assistant started speaking');
        });
        
        vapiInstance.on('speech-end', () => {
          addDebugLog('🔇 Assistant finished speaking');
        });
        
        vapiInstance.on('message', (message: any) => {
          addDebugLog(`📨 VAPI message: ${message.type || 'unknown'}`);
        });
        
        setVapi(vapiInstance);
        addDebugLog('✅ VAPI initialized successfully');
        
      } catch (error: any) {
        addDebugLog(`❌ Failed to initialize VAPI: ${error.message || 'Unknown error'}`);
        setError(`Failed to initialize voice assistant: ${error.message || 'Unknown error'}`);
      }
    };

    initializeVapi();
  }, [apiKey]);

  const handleStartCall = async () => {
    if (!vapi) {
      addDebugLog('❌ Voice assistant not initialized');
      setError('Voice assistant not initialized. Please refresh the page.');
      return;
    }

    try {
      setIsLoading(true);
      setError(null);
      addDebugLog('🚀 Starting voice call...');

      if (isCallActive) {
        // Stop the call if it's active
        addDebugLog('Stopping VAPI call...');
        vapi.stop();
        setIsCallActive(false);
        setIsLoading(false);
        return;
      }

      // Check if VAPI is already started (prevent double start)
      if ((vapi as any).started) {
        addDebugLog('VAPI call already started, stopping first...');
        try {
          vapi.stop();
          addDebugLog('VAPI call stopped successfully');
          await new Promise(resolve => setTimeout(resolve, 2000)); // Wait longer
        } catch (stopError: any) {
          addDebugLog(`Warning: Error stopping VAPI call: ${stopError.message}`);
        }
      }

      // Check microphone permissions first
      try {
        addDebugLog('Checking microphone permissions...');
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        addDebugLog('✅ Microphone permission granted');
        stream.getTracks().forEach(track => track.stop()); // Stop the test stream
      } catch (micError) {
        addDebugLog(`❌ Microphone permission error: ${micError.message}`);
        throw new Error('Microphone permission denied. Please allow microphone access and try again.');
      }
      
      addDebugLog(`Starting VAPI call with assistant ID: ${assistantId}`);
      addDebugLog(`VAPI start method available: ${typeof vapi.start}`);
      
      // Validate assistant ID
      if (!assistantId || assistantId === 'your-assistant-id-here') {
        addDebugLog('❌ Assistant ID not configured');
        throw new Error('Assistant ID not configured. Please check your environment variables.');
      }
      
      // Start the call using VAPI web SDK
      if (typeof vapi.start !== 'function') {
        addDebugLog('❌ VAPI start method not available');
        throw new Error('VAPI start method not available');
      }
      
      // Test VAPI configuration
      addDebugLog('Testing VAPI configuration...');
      addDebugLog(`API Key: ${apiKey.substring(0, 8)}...`);
      addDebugLog(`Assistant ID: ${assistantId}`);
      addDebugLog(`VAPI instance: ${vapi ? 'Available' : 'Not available'}`);
      addDebugLog(`VAPI started state: ${(vapi as any).started ? 'Already started' : 'Not started'}`);
      
      // Test API key validity
      try {
        addDebugLog('Testing VAPI API key...');
        const testResponse = await fetch('https://api.vapi.ai/assistant', {
          headers: {
            'Authorization': `Bearer ${apiKey}`,
            'Content-Type': 'application/json'
          }
        });
        
        if (testResponse.ok) {
          addDebugLog('✅ VAPI API key is valid');
        } else {
          addDebugLog(`❌ VAPI API key test failed: ${testResponse.status} ${testResponse.statusText}`);
          const errorText = await testResponse.text();
          addDebugLog(`Error details: ${errorText}`);
        }
      } catch (apiError: any) {
        addDebugLog(`❌ VAPI API test error: ${apiError.message}`);
      }
      
      // The start method returns a Promise<Call | null>
      addDebugLog(`Calling vapi.start() with assistantId: ${assistantId}`);
      
      // Start the call and wait for events instead of relying on return value
      addDebugLog('Setting up call start event listeners...');
      
      // Wait for either call-start event or timeout
      const callStartPromise = new Promise((resolve, reject) => {
        const timeout = setTimeout(() => {
          addDebugLog('❌ Call start timeout after 30 seconds');
          reject(new Error('Call start timeout after 30 seconds'));
        }, 30000);
        
        const onCallStart = () => {
          addDebugLog('✅ Call start event received');
          clearTimeout(timeout);
          vapi.off('call-start', onCallStart);
          vapi.off('call-start-failed', onCallFailed);
          vapi.off('call-start-progress', onCallProgress);
          resolve(true);
        };
        
        const onCallFailed = (event: any) => {
          addDebugLog(`❌ Call start failed event: ${JSON.stringify(event, null, 2)}`);
          clearTimeout(timeout);
          vapi.off('call-start', onCallStart);
          vapi.off('call-start-failed', onCallFailed);
          vapi.off('call-start-progress', onCallProgress);
          reject(new Error(`Call start failed: ${event.error || JSON.stringify(event)}`));
        };
        
        const onCallProgress = (event: any) => {
          addDebugLog(`📞 Call progress: ${event.stage} - ${event.status}`);
          if (event.status === 'failed') {
            addDebugLog(`❌ Call failed at stage: ${event.stage}`);
            clearTimeout(timeout);
            vapi.off('call-start', onCallStart);
            vapi.off('call-start-failed', onCallFailed);
            vapi.off('call-start-progress', onCallProgress);
            reject(new Error(`Call failed at stage: ${event.stage}`));
          }
        };
        
        vapi.on('call-start', onCallStart);
        vapi.on('call-start-failed', onCallFailed);
        vapi.on('call-start-progress', onCallProgress);
      });
      
      // Start the call
      addDebugLog('Calling vapi.start()...');
      let startResult;
      try {
        startResult = await vapi.start(assistantId);
        addDebugLog(`VAPI start() returned: ${startResult ? 'Call object' : 'null'}`);
      } catch (startError: any) {
        addDebugLog(`❌ VAPI start() threw error: ${JSON.stringify(startError, null, 2)}`);
        throw new Error(`VAPI start failed: ${startError.message || JSON.stringify(startError)}`);
      }
      
      // Wait for the call-start event
      addDebugLog('Waiting for call-start event...');
      await callStartPromise;
      addDebugLog('✅ Call is now active');
      
    } catch (error: any) {
      addDebugLog(`❌ Error in voice call: ${error.message || 'Unknown error'}`);
      addDebugLog(`Error name: ${error.name || 'Unknown'}`);
      addDebugLog(`Error details: ${JSON.stringify(error, null, 2).substring(0, 200)}...`);
      
      // Handle specific error types
      if (error.name === 'NotAllowedError' || error.message?.includes('permission')) {
        addDebugLog('❌ Microphone permission denied');
        setError('Microphone permission denied. Please allow microphone access and try again.');
      } else if (error.name === 'NotFoundError' || error.message?.includes('microphone')) {
        addDebugLog('❌ No microphone found');
        setError('No microphone found. Please connect a microphone and try again.');
      } else if (error.message?.includes('HTTPS')) {
        addDebugLog('❌ HTTPS required');
        setError('Voice calls require HTTPS. Please use the secure version of this site.');
      } else if (error.message?.includes('assistant')) {
        addDebugLog('❌ Assistant configuration error');
        setError('Assistant configuration error. Please contact support.');
      } else if (error.message?.includes('network') || error.message?.includes('fetch')) {
        addDebugLog('❌ Network error');
        setError('Network error. Please check your connection and try again.');
      } else if (error.message?.includes('validation-error')) {
        addDebugLog(`❌ Validation error: ${error.message}`);
        setError(`Validation error: ${error.message}`);
      } else if (error.message?.includes('already-started')) {
        addDebugLog('❌ Call already in progress');
        setError('Call is already in progress. Please wait for it to end.');
      } else {
        addDebugLog(`❌ Unknown error: ${error.message || error.errorMsg || 'Unknown error'}`);
        setError(`Failed to start conversation: ${error.message || error.errorMsg || 'Unknown error'}`);
      }
      
      setIsLoading(false);
    }
  };

  const handleStopCall = async () => {
    if (vapi) {
      try {
        console.log('Stopping VAPI call...');
        vapi.stop();
        setIsCallActive(false);
        setIsLoading(false);
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
                      Speak directly with our AI assistant using your microphone. Ask about our AI automation solutions.
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
                      Speak naturally with our AI assistant. Ask about our services, pricing, or schedule a demo.
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
                  disabled={isLoading || !vapi}
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
                    ? "Speak naturally and ask about our AI automation services"
                    : "Click to start a voice conversation with our AI assistant"
                  }
                </p>
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
                    <div>VAPI Status: {vapi ? 'Initialized' : 'Not initialized'}</div>
                    <div>Assistant ID: {assistantId.substring(0, 8)}...</div>
                    <div>API Key: {apiKey.substring(0, 8)}...</div>
                    <div>Call Active: {isCallActive ? 'Yes' : 'No'}</div>
                    <div>Loading: {isLoading ? 'Yes' : 'No'}</div>
                    
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
                    
                    <button
                      onClick={() => setDebugLogs([])}
                      className="mt-2 px-2 py-1 bg-red-600 hover:bg-red-700 text-white rounded text-xs"
                    >
                      Clear Logs
                    </button>
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

export default VoiceAssistant;