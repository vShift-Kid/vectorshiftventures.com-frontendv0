import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Bot, User, Mic, MicOff } from 'lucide-react';
import { Vapi } from '@vapi-ai/web';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

const Chatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hi! I'm your VectorShift Ventures AI assistant. I specialize in field service management solutions including scheduling, tracking, dispatch, and customer support automation. I can help you learn about our services, schedule appointments, and answer your field service questions. How can I assist you today?",
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isCallActive, setIsCallActive] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [vapi, setVapi] = useState<any>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    const initializeVapi = async () => {
      try {
        const apiKey = import.meta.env.VITE_VAPI_API_KEY || 'e68bd505-55f0-450a-8993-f4f28c0226b5';
        console.log('VAPI API Key:', apiKey ? 'Set' : 'Not Set');
        console.log('Environment check:', import.meta.env.VITE_VAPI_API_KEY);
        
        if (!apiKey || apiKey === 'your-api-key-here') {
          console.log('VAPI API key not configured for chat');
          setError('Chat assistant not configured. Please contact support.');
          return;
        }
        
        const vapiInstance = new Vapi(apiKey);
      
      // Set up event listeners
      vapiInstance.on('call-start', () => {
        console.log('Call started');
        setIsCallActive(true);
        setIsLoading(false);
        setError(null);
      });

      vapiInstance.on('call-end', () => {
        console.log('Call ended');
        setIsCallActive(false);
        setIsLoading(false);
      });

      vapiInstance.on('speech-start', () => {
        console.log('Assistant started speaking');
      });

      vapiInstance.on('speech-end', () => {
        console.log('Assistant finished speaking');
      });

      vapiInstance.on('error', (e: any) => {
        console.error('Vapi error:', e);
        if (e.error?.type === 'permission-denied') {
          setError('Microphone permission denied. Please allow microphone access.');
        } else if (e.error?.type === 'not-found') {
          setError('No microphone found. Please connect a microphone and try again.');
        } else {
          setError(`Error: ${e.errorMsg || 'Unknown error occurred'}`);
        }
        setIsLoading(false);
      });

        setVapi(vapiInstance);
      } catch (error) {
        console.error('Failed to initialize VAPI:', error);
        setError('Failed to initialize chat assistant');
      }
    };

    initializeVapi();
  }, []);

  const handleStartVoiceCall = async () => {
    if (!vapi) {
      setError('Voice assistant not initialized. Please refresh the page.');
      return;
    }

    try {
      setIsLoading(true);
      setError(null);
      
      if (isCallActive) {
        // Stop the call if it's active
        await vapi.stop();
        return;
      }
      
      // Start the call
      console.log('Starting Vapi call...');
      const assistantId = import.meta.env.VITE_VAPI_ASSISTANT_ID || 'b8ddcdb9-1bb5-4cef-8a09-69c386230084';
      console.log('Assistant ID:', assistantId ? 'Set' : 'Not Set');
      console.log('Environment check:', import.meta.env.VITE_VAPI_ASSISTANT_ID);
      
      if (!assistantId || assistantId === 'your-assistant-id-here') {
        setError('Assistant not configured. Please contact support.');
        setIsLoading(false);
        return;
      }
      
      await vapi.start(assistantId);
      console.log('Vapi call started successfully');
      
    } catch (error: any) {
      console.error('Error in voice call:', error);
      setError('Failed to start conversation. Please try again.');
      setIsLoading(false);
    }
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // For now, use simulated responses since we're focusing on voice
    // In the future, this could connect to a text-based API
    setTimeout(() => {
      const botResponse = generateBotResponse(inputValue);
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: botResponse,
        sender: 'bot',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 1000);
  };

  const generateBotResponse = (userInput: string): string => {
    const input = userInput.toLowerCase();
    
    // Field service management focus
    if (input.includes('service') || input.includes('what do you do') || input.includes('offer')) {
      return "We specialize in field service management automation solutions including mobile workforce management, customer scheduling systems, real-time tracking, automated dispatch, and AI-powered customer support. Our goal is to help field service businesses streamline operations and boost efficiency. Would you like to learn more about any specific solution?";
    }
    
    if (input.includes('field service') || input.includes('field management')) {
      return "Our field service management solutions help you manage your mobile workforce, schedule appointments, track technicians in real-time, and automate customer communications. We serve industries like HVAC, plumbing, electrical, security, and telecommunications. Check out our Services page for detailed information!";
    }
    
    if (input.includes('scheduling') || input.includes('appointments') || input.includes('booking')) {
      return "Our scheduling system allows customers to book appointments online, automatically dispatches technicians, and sends real-time updates. It integrates with your existing calendar and can handle complex scheduling rules. Would you like to see a demo?";
    }
    
    if (input.includes('tracking') || input.includes('gps') || input.includes('location')) {
      return "Our real-time tracking system shows you exactly where your technicians are, estimates arrival times, and helps optimize routes. Customers can track their service appointments in real-time. This improves customer satisfaction and operational efficiency.";
    }
    
    if (input.includes('dispatch') || input.includes('work orders') || input.includes('jobs')) {
      return "Our automated dispatch system intelligently assigns work orders to the best available technician based on location, skills, and workload. It reduces manual coordination and ensures optimal resource utilization.";
    }
    
    if (input.includes('customer support') || input.includes('support') || input.includes('help')) {
      return "We provide AI-powered customer support that can handle inquiries 24/7, schedule appointments, provide status updates, and escalate complex issues to human agents. This reduces response times and improves customer satisfaction.";
    }
    
    if (input.includes('pricing') || input.includes('cost') || input.includes('price')) {
      return "Our pricing is based on the number of technicians and features you need. We offer flexible plans from basic packages to enterprise solutions. I'd be happy to connect you with our sales team for a detailed quote based on your specific requirements.";
    }
    
    if (input.includes('demo') || input.includes('trial') || input.includes('test')) {
      return "Absolutely! We offer free demos and pilot programs. You can request a demo on our website, and we'll show you exactly how our solutions work with your specific business needs. Would you like me to help you schedule a demo?";
    }
    
    if (input.includes('integration') || input.includes('existing') || input.includes('current system')) {
      return "Our solutions integrate seamlessly with your existing systems including CRM, accounting software, and other business tools. We provide custom integrations to ensure everything works together smoothly.";
    }
    
    if (input.includes('industries') || input.includes('who do you serve') || input.includes('clients')) {
      return "We serve a wide range of field service industries including HVAC, plumbing, electrical, security, telecommunications, healthcare, manufacturing, and any business that provides on-site services. Our solutions are customizable for different industry needs.";
    }
    
    if (input.includes('customer service') || input.includes('support')) {
      return "Our customer service automation includes AI chatbots and voice callers that can handle common inquiries, reducing response times and improving customer satisfaction. This frees up your team to focus on complex issues.";
    }
    
    if (input.includes('mobile app') || input.includes('technician app') || input.includes('field app')) {
      return "Our mobile app for technicians provides real-time job updates, GPS navigation, customer information, and the ability to update job status on the go. It works offline and syncs when connected, ensuring technicians always have the information they need.";
    }
    
    if (input.includes('reporting') || input.includes('analytics') || input.includes('data')) {
      return "Our reporting and analytics dashboard gives you insights into technician performance, customer satisfaction, job completion rates, and operational efficiency. You can track KPIs and make data-driven decisions to improve your business.";
    }
    
    if (input.includes('voice') || input.includes('speak') || input.includes('call')) {
      return "I can help you with voice conversations! Click the microphone button to start a voice call with our AI assistant. You can ask questions, schedule appointments, and get instant answers through natural conversation.";
    }
    
    if (input.includes('consultation') || input.includes('meet') || input.includes('demo') || input.includes('talk')) {
      return "Great! We offer free consultations where we'll analyze your field service business needs and create a custom automation strategy. You can book a consultation through our Consultation page, or try our Demo page to see our solutions in action!";
    }
    
    if (input.includes('custom') || input.includes('personalized') || input.includes('tailored')) {
      return "We create custom field service management solutions tailored to your specific industry and business needs. Our solutions integrate with your existing systems and can be customized for your unique workflows and requirements.";
    }
    
    // Default response
    return "I'm here to help you learn about VectorShift Ventures field service management solutions. You can ask me about scheduling, tracking, dispatch, customer support, or click the microphone button to start a voice conversation. What would you like to know?";
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <>
      {/* Chat Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 bg-gradient-to-r from-cyan-500 to-blue-500 p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 group"
      >
        {isOpen ? (
          <X className="w-6 h-6 text-white" />
        ) : (
          <MessageCircle className="w-6 h-6 text-white group-hover:scale-110 transition-transform" />
        )}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 z-40 w-96 h-[500px] bg-[#0A0B1E] border border-cyan-500/30 rounded-2xl shadow-2xl flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-cyan-500/20">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full flex items-center justify-center">
                <Bot className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="font-mono font-semibold text-white">VectorShift AI</h3>
                <p className="text-xs text-cyan-400 font-mono">Voice & Text Assistant</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              {/* Voice Call Button */}
              <button
                onClick={handleStartVoiceCall}
                disabled={isLoading}
                className={`p-2 rounded-lg transition-all ${
                  isCallActive 
                    ? 'bg-red-500 hover:bg-red-600 text-white' 
                    : 'bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-400 hover:text-cyan-300'
                } disabled:opacity-50 disabled:cursor-not-allowed`}
                title={isCallActive ? 'End Voice Call' : 'Start Voice Call'}
              >
                {isLoading ? (
                  <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                ) : isCallActive ? (
                  <MicOff className="w-4 h-4" />
                ) : (
                  <Mic className="w-4 h-4" />
                )}
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className="p-3 bg-red-500/10 border border-red-500/30 mx-4 mt-2 rounded-lg">
              <p className="text-red-400 font-mono text-sm">{error}</p>
            </div>
          )}

          {/* Voice Call Status */}
          {isCallActive && (
            <div className="p-3 bg-green-500/10 border border-green-500/30 mx-4 mt-2 rounded-lg">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <p className="text-green-400 font-mono text-sm">Voice call active - Speak naturally</p>
              </div>
            </div>
          )}

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] p-3 rounded-2xl ${
                    message.sender === 'user'
                      ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white'
                      : 'bg-gray-800/50 text-gray-200 border border-cyan-500/20'
                  }`}
                >
                  <div className="flex items-start gap-2">
                    {message.sender === 'bot' && (
                      <Bot className="w-4 h-4 text-cyan-400 mt-1 flex-shrink-0" />
                    )}
                    <div className="font-mono text-sm">
                      {message.text}
                    </div>
                    {message.sender === 'user' && (
                      <User className="w-4 h-4 text-white mt-1 flex-shrink-0" />
                    )}
                  </div>
                </div>
              </div>
            ))}
            
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-gray-800/50 border border-cyan-500/20 p-3 rounded-2xl">
                  <div className="flex items-center gap-2">
                    <Bot className="w-4 h-4 text-cyan-400" />
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-4 border-t border-cyan-500/20">
            <div className="flex gap-2">
              <input
                ref={inputRef}
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask about our services or click mic for voice..."
                className="flex-1 p-3 bg-gray-800/50 border border-cyan-500/30 rounded-lg text-white font-mono text-sm focus:outline-none focus:border-cyan-400"
                disabled={isTyping || isCallActive}
              />
              <button
                onClick={handleSendMessage}
                disabled={!inputValue.trim() || isTyping}
                className="p-3 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg text-white hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Chatbot; 