import React, { useState, useEffect } from 'react';
import { Phone, PhoneOff, PhoneCall, Users, Clock, CheckCircle, XCircle, RefreshCw, ExternalLink } from 'lucide-react';
import { analytics } from '../lib/analytics';

interface CallData {
  id: string;
  phoneNumber: string;
  purpose: string;
  status: 'initiated' | 'queued' | 'ringing' | 'answered' | 'completed' | 'failed' | 'error';
  timestamp: Date;
  vapiCallId?: string;
  duration?: number;
  cost?: number;
  transcript?: string;
  summary?: string;
}

interface EnhancedPhoneCallerProps {
  className?: string;
  onCallInitiated?: (callData: CallData) => void;
  onCallCompleted?: (callData: CallData) => void;
  webhookUrl?: string;
}

const EnhancedPhoneCaller: React.FC<EnhancedPhoneCallerProps> = ({ 
  className = '', 
  onCallInitiated,
  onCallCompleted,
  webhookUrl = 'http://localhost:3001'
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isCallActive, setIsCallActive] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [callPurpose, setCallPurpose] = useState('');
  const [recentCalls, setRecentCalls] = useState<CallData[]>([]);
  const [callStats, setCallStats] = useState({
    totalCalls: 0,
    successfulCalls: 0,
    failedCalls: 0,
    totalDuration: 0
  });

  // VAPI Configuration
  const apiKey = import.meta.env.VITE_VAPI_API_KEY || 'e68bd505-55f0-450a-8993-f4f28c0226b5';
  const assistantId = import.meta.env.VITE_VAPI_ASSISTANT_ID || 'b8ddcdb9-1bb5-4cef-8a09-69c386230084';
  const phoneNumberId = import.meta.env.VITE_VAPI_PHONE_NUMBER_ID || '59e6d346-2976-4ff4-86d3-d99fcf69df99';
  const vapiPhoneNumber = '+18339572961'; // Our VAPI phone number for outbound calls

  // Load recent calls from localStorage on mount
  useEffect(() => {
    const savedCalls = localStorage.getItem('vsv-recent-calls');
    if (savedCalls) {
      try {
        const calls = JSON.parse(savedCalls).map((call: any) => ({
          ...call,
          timestamp: new Date(call.timestamp)
        }));
        setRecentCalls(calls);
        updateCallStats(calls);
      } catch (error) {
        console.error('Error loading saved calls:', error);
      }
    }
  }, []);

  // Save calls to localStorage whenever recentCalls changes
  useEffect(() => {
    localStorage.setItem('vsv-recent-calls', JSON.stringify(recentCalls));
    updateCallStats(recentCalls);
  }, [recentCalls]);

  const updateCallStats = (calls: CallData[]) => {
    const stats = {
      totalCalls: calls.length,
      successfulCalls: calls.filter(call => call.status === 'completed').length,
      failedCalls: calls.filter(call => call.status === 'failed' || call.status === 'error').length,
      totalDuration: calls.reduce((total, call) => total + (call.duration || 0), 0)
    };
    setCallStats(stats);
  };

  const handleStartCall = async () => {
    if (!phoneNumber.trim()) {
      setError('Please enter a phone number');
      return;
    }

    // Validate phone number format (should be in E.164 format)
    const phoneRegex = /^\+[1-9]\d{6,14}$/; // 7-15 digits total (1-15 after +)
    if (!phoneRegex.test(phoneNumber)) {
      setError('Please enter a valid phone number in international format (e.g., +1234567890). Must be 7-15 digits after the country code.');
      return;
    }

    try {
      setIsLoading(true);
      setError(null);

      console.log('🚀 Starting enhanced phone call to:', phoneNumber);
      console.log('📱 Phone number validation:', {
        phoneNumber,
        length: phoneNumber.length,
        startsWithPlus: phoneNumber.startsWith('+'),
        isValidFormat: /^\+[1-9]\d{6,14}$/.test(phoneNumber),
        digitsAfterPlus: phoneNumber.substring(1)
      });
      
      // Create call data for tracking
      const callData: CallData = {
        id: `call-${Date.now()}`,
        phoneNumber,
        purpose: callPurpose,
        status: 'initiated',
        timestamp: new Date()
      };
      
      setRecentCalls(prev => [callData, ...prev.slice(0, 9)]); // Keep last 10 calls
      onCallInitiated?.(callData);

      // Track phone call initiation
      analytics.trackPhoneCall(phoneNumber, callPurpose, 'initiated');

      // Make phone call using VAPI API with enhanced configuration
      const requestBody = {
        assistantId: assistantId,
        phoneNumberId: phoneNumberId,
        customer: {
          number: phoneNumber
        }
      };
      
      console.log('📞 API Request Body:', JSON.stringify(requestBody, null, 2));
      
      const response = await fetch('https://api.vapi.ai/call', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestBody)
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('❌ API Error Response:', errorData);
        throw new Error(errorData.message || `HTTP ${response.status}`);
      }

      const callResult = await response.json();
      console.log('✅ Phone call initiated successfully:', callResult);
      
      // Update call data with VAPI call ID and status
      callData.vapiCallId = callResult.id;
      callData.status = 'queued';
      
      setRecentCalls(prev => {
        const updated = [...prev];
        updated[0] = callData;
        return updated;
      });
      
      setIsCallActive(true);

      // Track successful call initiation
      analytics.trackPhoneCall(phoneNumber, callPurpose, 'queued');
      
      // Start polling for call updates
      startCallPolling(callResult.id);
      
    } catch (error: any) {
      console.error('❌ Error starting phone call:', error);
      setError(`Failed to start call: ${error.message || 'Unknown error'}`);
      
      // Update call status to failed
      setRecentCalls(prev => {
        const updated = [...prev];
        if (updated[0]) {
          updated[0].status = 'failed';
        }
        return updated;
      });

      // Track failed call
      analytics.trackPhoneCall(phoneNumber, callPurpose, 'failed');
    } finally {
      setIsLoading(false);
    }
  };

  const startCallPolling = (vapiCallId: string) => {
    const pollInterval = setInterval(async () => {
      try {
        const response = await fetch(`${webhookUrl}/api/call/${vapiCallId}`);
        if (response.ok) {
          const callData = await response.json();
          
          setRecentCalls(prev => {
            const updated = [...prev];
            const callIndex = updated.findIndex(call => call.vapiCallId === vapiCallId);
            if (callIndex !== -1) {
              updated[callIndex] = {
                ...updated[callIndex],
                status: mapVapiStatus(callData.status),
                duration: callData.duration,
                cost: callData.cost,
                transcript: callData.transcript,
                summary: callData.summary
              };
              
              // If call ended, stop polling
              if (callData.status === 'ended' || callData.status === 'error') {
                clearInterval(pollInterval);
                setIsCallActive(false);
                onCallCompleted?.(updated[callIndex]);
              }
            }
            return updated;
          });
        }
      } catch (error) {
        console.error('Error polling call status:', error);
      }
    }, 2000); // Poll every 2 seconds

    // Stop polling after 30 minutes
    setTimeout(() => {
      clearInterval(pollInterval);
    }, 30 * 60 * 1000);
  };

  const mapVapiStatus = (vapiStatus: string): CallData['status'] => {
    switch (vapiStatus) {
      case 'queued': return 'queued';
      case 'ringing': return 'ringing';
      case 'in-progress': return 'answered';
      case 'ended': return 'completed';
      case 'error': return 'error';
      default: return 'initiated';
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
      
      console.log('📞 Call ended by user');
      
    } catch (error) {
      console.error('Error ending call:', error);
      setError('Failed to end call');
    }
  };

  const formatPhoneNumber = (value: string) => {
    // Remove all non-numeric characters except +
    const cleaned = value.replace(/[^\d+]/g, '');
    
    // If it starts with +, validate and return
    if (cleaned.startsWith('+')) {
      // Ensure it has at least 7 digits and max 15 digits (E.164 standard)
      const digits = cleaned.substring(1);
      if (digits.length >= 7 && digits.length <= 15) {
        return cleaned;
      }
    }
    
    // If it's 10 digits, assume US number and add +1
    if (cleaned.length === 10 && /^\d{10}$/.test(cleaned)) {
      return `+1${cleaned}`;
    }
    
    // If it's 11 digits and starts with 1, add +
    if (cleaned.length === 11 && /^1\d{10}$/.test(cleaned)) {
      return `+${cleaned}`;
    }
    
    // For other cases, add + if it doesn't start with +
    if (!cleaned.startsWith('+') && cleaned.length >= 7 && cleaned.length <= 15) {
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
      case 'error':
        return <XCircle className="w-4 h-4 text-red-400" />;
      case 'answered':
        return <Phone className="w-4 h-4 text-blue-400" />;
      case 'ringing':
        return <PhoneCall className="w-4 h-4 text-yellow-400 animate-pulse" />;
      default:
        return <Clock className="w-4 h-4 text-gray-400" />;
    }
  };

  const getStatusText = (status: CallData['status']) => {
    switch (status) {
      case 'initiated':
        return 'Initiating...';
      case 'queued':
        return 'Queued...';
      case 'ringing':
        return 'Ringing...';
      case 'answered':
        return 'In Progress';
      case 'completed':
        return 'Completed';
      case 'failed':
        return 'Failed';
      case 'error':
        return 'Error';
      default:
        return 'Unknown';
    }
  };

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
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
        <div className="fixed bottom-6 left-6 z-50 w-96 bg-[#0A0B1E] border border-green-500/30 rounded-2xl shadow-2xl">
          {/* Header */}
          <div className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 px-6 py-4 rounded-t-2xl border-b border-green-500/30">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className={`w-3 h-3 rounded-full ${isCallActive ? 'bg-green-400 animate-pulse' : 'bg-gray-400'}`}></div>
                <h3 className="text-white font-mono font-semibold">Enhanced Phone Caller</h3>
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
                  <h4 className="text-white font-mono font-semibold mt-3 mb-2">AI Sales Agent Call</h4>
                  <p className="text-gray-400 font-mono text-sm mb-3">
                    Our AI sales agent will call and engage with potential customers about our AI automation solutions.
                  </p>
                  <div className="bg-gray-800/50 rounded-lg p-3 mb-4">
                    <p className="text-green-400 font-mono text-sm font-semibold">Calling From:</p>
                    <p className="text-white font-mono text-lg">{vapiPhoneNumber}</p>
                    <p className="text-gray-500 font-mono text-xs">VectorShift Ventures AI</p>
                    <a 
                      href={`tel:${vapiPhoneNumber}`}
                      className="inline-flex items-center gap-1 text-blue-400 hover:text-blue-300 font-mono text-xs mt-1"
                    >
                      <Phone className="w-3 h-3" />
                      Tap to call us directly
                    </a>
                  </div>
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
                  <div className="text-gray-500 font-mono text-xs mt-1">
                    Examples: +18339572961, +15551234567, +44123456789
                  </div>
                  <button
                    onClick={() => setPhoneNumber('+18339572961')}
                    className="text-blue-400 hover:text-blue-300 font-mono text-xs mt-1"
                    disabled={isLoading}
                  >
                    Use test number (+18339572961)
                  </button>
                </div>

                {/* Call Purpose Input */}
                <div className="space-y-2">
                  <label className="text-gray-300 font-mono text-sm">Call Purpose</label>
                  <select
                    value={callPurpose}
                    onChange={(e) => setCallPurpose(e.target.value)}
                    className="w-full p-3 bg-gray-800/50 border border-green-500/30 rounded-lg text-white font-mono text-sm focus:outline-none focus:border-green-400"
                    disabled={isLoading}
                  >
                    <option value="">Select call purpose</option>
                    <option value="lead_qualification">Lead Qualification</option>
                    <option value="demo_request">Demo Request</option>
                    <option value="pricing_inquiry">Pricing Inquiry</option>
                    <option value="consultation">Consultation Booking</option>
                    <option value="support">Support Inquiry</option>
                    <option value="follow_up">Follow Up</option>
                  </select>
                </div>
              </div>
            )}

            {isCallActive && (
              <div className="text-center space-y-4">
                <div className="w-16 h-16 mx-auto bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-full flex items-center justify-center animate-pulse">
                  <Phone className="w-8 h-8 text-green-400" />
                </div>
                <div>
                  <h4 className="text-white font-mono font-semibold mb-2">AI Agent Calling</h4>
                  <p className="text-gray-400 font-mono text-sm">
                    Our AI sales agent is calling {phoneNumber}
                  </p>
                  {callPurpose && (
                    <p className="text-gray-500 font-mono text-xs mt-1">
                      Purpose: {callPurpose.replace('_', ' ').toUpperCase()}
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
                    <span>Start AI Call</span>
                  </div>
                )}
              </button>
            </div>

            {/* Call Stats */}
            {callStats.totalCalls > 0 && (
              <div className="mt-4 p-3 bg-gray-800/30 rounded-lg">
                <h5 className="text-gray-300 font-mono text-sm mb-2 flex items-center gap-2">
                  <Users className="w-4 h-4" />
                  Call Statistics
                </h5>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="text-gray-400 font-mono">Total: {callStats.totalCalls}</div>
                  <div className="text-green-400 font-mono">Success: {callStats.successfulCalls}</div>
                  <div className="text-red-400 font-mono">Failed: {callStats.failedCalls}</div>
                  <div className="text-blue-400 font-mono">Duration: {formatDuration(callStats.totalDuration)}</div>
                </div>
              </div>
            )}

            {/* Recent Calls */}
            {recentCalls.length > 0 && (
              <div className="mt-4">
                <h5 className="text-gray-300 font-mono text-sm mb-3 flex items-center gap-2">
                  <Users className="w-4 h-4" />
                  Recent Calls
                </h5>
                <div className="space-y-2 max-h-32 overflow-y-auto">
                  {recentCalls.slice(0, 5).map((call) => (
                    <div
                      key={call.id}
                      className="flex items-center justify-between p-2 bg-gray-800/30 rounded-lg"
                    >
                      <div className="flex items-center gap-2">
                        {getStatusIcon(call.status)}
                        <div>
                          <span className="text-white font-mono text-sm">{call.phoneNumber}</span>
                          {call.duration && (
                            <span className="text-gray-500 font-mono text-xs ml-2">
                              {formatDuration(call.duration)}
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="text-right">
                        <span className="text-gray-400 font-mono text-xs">
                          {getStatusText(call.status)}
                        </span>
                        {call.vapiCallId && (
                          <button
                            onClick={() => window.open(`https://dashboard.vapi.ai/calls/${call.vapiCallId}`, '_blank')}
                            className="text-blue-400 hover:text-blue-300 ml-1"
                            title="View in VAPI Dashboard"
                          >
                            <ExternalLink className="w-3 h-3" />
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Instructions */}
            <div className="mt-4 text-center">
              <p className="text-gray-500 font-mono text-xs">
                {isCallActive 
                  ? "AI sales agent is handling the conversation"
                  : "Enter a phone number to start an AI-powered sales call"
                }
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default EnhancedPhoneCaller;
