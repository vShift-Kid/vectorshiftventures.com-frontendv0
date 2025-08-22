import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Bot, User, Mic, MicOff } from 'lucide-react';

// Initialize Vapi with the public key
const vapiKey = '349dbab8-5f4e-4c16-a1a7-5dce7e63d512';
const assistantId = '94189137-6370-4561-a03f-a69e22fd29de';

// Dynamic import of Vapi to avoid SSR issues
let Vapi: any = null;
if (typeof window !== 'undefined') {
  import('@vapi-ai/web').then((module) => {
    Vapi = module.default;
  });
}

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
      text: "Hi! I'm your VectorShift Ventures AI assistant. I can help you learn about our services, schedule appointments, and answer your business questions. How can I assist you today?",
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
    if (typeof window !== 'undefined' && Vapi) {
      const vapiInstance = new Vapi(vapiKey);
      
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
    }
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
      await vapi.start();
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
    
    // Business services and capabilities
    if (input.includes('service') || input.includes('what do you do') || input.includes('offer')) {
      return "We specialize in business automation solutions including lead generation systems, AI chatbots, customer service automation, and social media management. Our goal is to help businesses streamline operations and grow efficiently. Would you like to learn more about any specific service?";
    }
    
    if (input.includes('lead generation') || input.includes('leads')) {
      return "Our lead generation systems help businesses capture and nurture potential customers automatically. We can help you identify opportunities in your market and create systems to convert them. Check out our Services page for more details!";
    }
    
    if (input.includes('chatbot') || input.includes('ai chat') || input.includes('bot')) {
      return "We create custom AI chatbots that can handle customer inquiries, qualify leads, and provide 24/7 support. These are trained specifically on your business information. Visit our Demo page to see how this works!";
    }
    
    if (input.includes('customer service') || input.includes('support')) {
      return "Our customer service automation includes AI chatbots and voice callers that can handle common inquiries, reducing response times and improving customer satisfaction. This frees up your team to focus on complex issues.";
    }
    
    if (input.includes('social media') || input.includes('reputation')) {
      return "We help businesses manage their online presence and reputation through automated social media management and monitoring systems. This ensures consistent brand messaging and quick response to customer feedback.";
    }
    
    // Pricing and consultation
    if (input.includes('price') || input.includes('cost') || input.includes('quote') || input.includes('how much')) {
      return "We offer free consultations to understand your specific needs and provide custom solutions. Pricing varies based on your requirements and the complexity of the automation needed. Would you like to book a consultation?";
    }
    
    if (input.includes('consultation') || input.includes('meet') || input.includes('demo') || input.includes('talk')) {
      return "Great! We offer free consultations where we'll analyze your business needs and create a custom automation strategy. You can book a consultation through our Consultation page, or try our Demo page to see our process in action!";
    }
    
    if (input.includes('voice') || input.includes('speak') || input.includes('call')) {
      return "I can help you with voice conversations! Click the microphone button to start a voice call with our AI assistant. You can ask questions, schedule appointments, and get instant answers through natural conversation.";
    }
    
    if (input.includes('custom') || input.includes('personalized') || input.includes('demo')) {
      return "We can create custom AI voice assistants and websites specifically for your business! Visit our Demo page to learn more about our custom demo creation process and how we can tailor solutions to your needs.";
    }
    
    // Default response
    return "I'm here to help you learn about VectorShift Ventures services and automation solutions. You can ask me about our services, pricing, or click the microphone button to start a voice conversation. What would you like to know?";
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