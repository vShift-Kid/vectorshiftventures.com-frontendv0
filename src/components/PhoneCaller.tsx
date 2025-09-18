import React, { useState, useEffect } from 'react';
import { Phone, PhoneOff, PhoneCall, Users, Clock, CheckCircle, XCircle } from 'lucide-react';
import Vapi from '@vapi-ai/web';

interface CallData {
  id: string;
  phoneNumber: string;
  purpose: string;
  status: 'initiated' | 'ringing' | 'answered' | 'completed' | 'failed';
  timestamp: Date;
}

interface PhoneCallerProps {
  className?: string;
  onCallInitiated?: (callData: CallData) => void;
  onCallCompleted?: (callData: CallData) => void;
}

const PhoneCaller: React.FC<PhoneCallerProps> = ({ 
  className = '', 
  onCallInitiated,
  onCallCompleted 
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isCallActive, setIsCallActive] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [callPurpose, setCallPurpose] = useState('');
  const [vapi, setVapi] = useState<Vapi | null>(null);
  const [recentCalls, setRecentCalls] = useState<CallData[]>([]);

  useEffect(() => {
    const initializeVapi = async () => {
      try {
        const apiKey = import.meta.env.VITE_VAPI_API_KEY;
        if (!apiKey || apiKey === 'your-api-key-here') {
          console.log('VAPI API key not configured');
          setError('Phone calling system not configured. Please contact support.');
          return;
        }
        
        const vapiInstance = new Vapi(apiKey);
        setVapi(vapiInstance);
      } catch (error) {
        console.error('Failed to initialize VAPI:', error);
        setError('Failed to initialize phone calling system');
      }
    };

    initializeVapi();
  }, []);

  const handleStartCall = async () => {
    if (!phoneNumber.trim()) {
      setError('Please enter a phone number');
      return;
    }

    // Validate phone number format (should be in E.164 format)
    const phoneRegex = /^\+[1-9]\d{1,14}$/;
    if (!phoneRegex.test(phoneNumber)) {
      setError('Please enter a valid phone number in international format (e.g., +1234567890)');
      return;
    }

    try {
      setIsLoading(true);
      setError(null);

      console.log('Starting phone call to:', phoneNumber);
      
      // Create call data for tracking
      const callData: CallData = {
        id: `call-${Date.now()}`,
        phoneNumber,
        purpose: callPurpose,
        status: 'initiated',
        timestamp: new Date()
      };
      
      setRecentCalls(prev => [callData, ...prev.slice(0, 4)]); // Keep last 5 calls
      onCallInitiated?.(callData);

      // Make actual phone call using VAPI API
      const response = await fetch('https://api.vapi.ai/call', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${import.meta.env.VITE_VAPI_API_KEY || 'e68bd505-55f0-450a-8993-f4f28c0226b5'}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          assistantId: import.meta.env.VITE_VAPI_ASSISTANT_ID || 'b8ddcdb9-1bb5-4cef-8a09-69c386230084',
          customer: {
            number: phoneNumber
          },
          phoneNumberId: null // Use default phone number
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `HTTP ${response.status}`);
      }

      const callResult = await response.json();
      console.log('Phone call initiated:', callResult);
      
      // Update call data with VAPI call ID
      callData.id = callResult.id;
      callData.status = 'ringing';
      
      setRecentCalls(prev => {
        const updated = [...prev];
        updated[0] = callData;
        return updated;
      });
      
      setIsCallActive(true);
      
    } catch (error: any) {
      console.error('Error starting phone call:', error);
      setError(`Failed to start call: ${error.message || 'Unknown error'}`);
      
      // Update call status to failed
      setRecentCalls(prev => {
        const updated = [...prev];
        if (updated[0]) {
          updated[0].status = 'failed';
        }
        return updated;
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleEndCall = async () => {
    try {
      // For phone calls, we can't directly end them from the frontend
      // The call will end when the customer hangs up or the agent ends it
      setIsCallActive(false);
      
      // Update the most recent call status
      setRecentCalls(prev => {
        const updated = [...prev];
        if (updated[0]) {
          updated[0].status = 'completed';
          onCallCompleted?.(updated[0]);
        }
        return updated;
      });
      
      console.log('Call ended by user');
      
    } catch (error) {
      console.error('Error ending call:', error);
      setError('Failed to end call');
    }
  };

  const formatPhoneNumber = (value: string) => {
    // Remove all non-numeric characters except +
    const cleaned = value.replace(/[^\d+]/g, '');
    
    // If it starts with +, keep it as international format
    if (cleaned.startsWith('+')) {
      return cleaned;
    }
    
    // If it's 10 digits, assume US number and add +1
    if (cleaned.length === 10) {
      return `+1${cleaned}`;
    }
    
    // If it's 11 digits and starts with 1, add +
    if (cleaned.length === 11 && cleaned.startsWith('1')) {
      return `+${cleaned}`;
    }
    
    // Otherwise, add + if it doesn't start with +
    if (!cleaned.startsWith('+')) {
      return `+${cleaned}`;
    }
    
    return cleaned;
  };

  const handlePhoneNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhoneNumber(e.target.value);
    setPhoneNumber(formatted);
  };

  const getStatusIcon = (status: CallData['status']) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-4 h-4 text-green-400" />;
      case 'failed':
        return <XCircle className="w-4 h-4 text-red-400" />;
      case 'answered':
        return <Phone className="w-4 h-4 text-blue-400" />;
      default:
        return <Clock className="w-4 h-4 text-yellow-400" />;
    }
  };

  const getStatusText = (status: CallData['status']) => {
    switch (status) {
      case 'initiated':
        return 'Initiating...';
      case 'ringing':
        return 'Ringing...';
      case 'answered':
        return 'In Progress';
      case 'completed':
        return 'Completed';
      case 'failed':
        return 'Failed';
      default:
        return 'Unknown';
    }
  };

  return (
    <>
      {/* Phone Caller Toggle Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className={`fixed bottom-6 left-6 z-50 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white rounded-full p-3 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 flex items-center gap-2 ${className}`}
          title="Make Phone Call"
        >
          <PhoneCall className="w-5 h-5" />
          <span className="font-mono text-sm font-semibold">Call Now</span>
        </button>
      )}

      {/* Phone Caller Interface */}
      {isOpen && (
        <div className="fixed bottom-6 left-6 z-50 w-80 bg-[#0A0B1E] border border-green-500/30 rounded-2xl shadow-2xl">
          {/* Header */}
          <div className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 px-6 py-4 rounded-t-2xl border-b border-green-500/30">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className={`w-3 h-3 rounded-full ${isCallActive ? 'bg-green-400 animate-pulse' : 'bg-gray-400'}`}></div>
                <h3 className="text-white font-mono font-semibold">Phone Caller</h3>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <XCircle className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="p-6">
            {!isCallActive && (
              <div className="space-y-4">
                <div className="text-center">
                  <div className="w-16 h-16 mx-auto bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-full flex items-center justify-center">
                    <PhoneCall className="w-8 h-8 text-green-400" />
                  </div>
                  <h4 className="text-white font-mono font-semibold mt-3 mb-2">Make a Phone Call</h4>
                  <p className="text-gray-400 font-mono text-sm">
                    Enter a phone number to start a voice conversation with our AI assistant.
                  </p>
                </div>

                {/* Phone Number Input */}
                <div className="space-y-2">
                  <label className="text-gray-300 font-mono text-sm">Phone Number</label>
                  <input
                    type="tel"
                    value={phoneNumber}
                    onChange={handlePhoneNumberChange}
                    placeholder="+1234567890 (international format)"
                    className="w-full p-3 bg-gray-800/50 border border-green-500/30 rounded-lg text-white font-mono text-sm focus:outline-none focus:border-green-400"
                    disabled={isLoading}
                  />
                </div>

                {/* Call Purpose Input */}
                <div className="space-y-2">
                  <label className="text-gray-300 font-mono text-sm">Purpose (Optional)</label>
                  <input
                    type="text"
                    value={callPurpose}
                    onChange={(e) => setCallPurpose(e.target.value)}
                    placeholder="e.g., Lead qualification, Support inquiry"
                    className="w-full p-3 bg-gray-800/50 border border-green-500/30 rounded-lg text-white font-mono text-sm focus:outline-none focus:border-green-400"
                    disabled={isLoading}
                  />
                </div>
              </div>
            )}

            {isCallActive && (
              <div className="text-center space-y-4">
                <div className="w-16 h-16 mx-auto bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-full flex items-center justify-center animate-pulse">
                  <Phone className="w-8 h-8 text-green-400" />
                </div>
                <div>
                  <h4 className="text-white font-mono font-semibold mb-2">Call in Progress</h4>
                  <p className="text-gray-400 font-mono text-sm">
                    Speaking with {phoneNumber}
                  </p>
                  {callPurpose && (
                    <p className="text-gray-500 font-mono text-xs mt-1">
                      Purpose: {callPurpose}
                    </p>
                  )}
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
                onClick={isCallActive ? handleEndCall : handleStartCall}
                disabled={isLoading || (!isCallActive && !phoneNumber.trim())}
                className={`w-full py-3 px-4 rounded-lg font-mono font-semibold transition-all duration-300 ${
                  isCallActive
                    ? 'bg-red-500 hover:bg-red-600 text-white'
                    : 'bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white'
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
                    <span>Start Call</span>
                  </div>
                )}
              </button>
            </div>

            {/* Recent Calls */}
            {recentCalls.length > 0 && (
              <div className="mt-6">
                <h5 className="text-gray-300 font-mono text-sm mb-3 flex items-center gap-2">
                  <Users className="w-4 h-4" />
                  Recent Calls
                </h5>
                <div className="space-y-2">
                  {recentCalls.slice(0, 3).map((call) => (
                    <div
                      key={call.id}
                      className="flex items-center justify-between p-2 bg-gray-800/30 rounded-lg"
                    >
                      <div className="flex items-center gap-2">
                        {getStatusIcon(call.status)}
                        <span className="text-white font-mono text-sm">{call.phoneNumber}</span>
                      </div>
                      <span className="text-gray-400 font-mono text-xs">
                        {getStatusText(call.status)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Instructions */}
            <div className="mt-4 text-center">
              <p className="text-gray-500 font-mono text-xs">
                {isCallActive 
                  ? "AI assistant is handling the conversation"
                  : "Enter a phone number to start an AI-powered call"
                }
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default PhoneCaller;
