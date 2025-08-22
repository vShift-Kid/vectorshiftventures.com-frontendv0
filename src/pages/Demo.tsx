import React from 'react';
import { Link } from 'react-router-dom';
import { MessageSquare, Mic, Brain, Calendar, CheckCircle, ArrowRight, Phone, Users } from 'lucide-react';
import VoiceAssistant from '../components/VoiceAssistant';

const Demo: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#0A0B1E] text-white pt-20">
      {/* Hero Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-cyan-500/10 to-transparent" />
        <div className="container mx-auto px-6 relative">
          <div className="text-center max-w-4xl mx-auto">
            <div className="w-24 h-24 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <MessageSquare className="w-12 h-12 text-white" />
            </div>
            <h1 className="font-mono text-5xl font-bold mb-6">
              <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                Experience Our AI Voice Assistant
              </span>
            </h1>
            <p className="text-xl text-gray-400 mb-8 font-mono">
              Speak directly with our AI assistant to learn about VectorShift Ventures services, get instant answers to your business questions, 
              and experience the future of customer interaction.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button
                onClick={() => {
                  const voiceButton = document.querySelector('[title="Try Voice Assistant"]') as HTMLButtonElement;
                  voiceButton?.click();
                }}
                className="font-mono bg-gradient-to-r from-cyan-500 to-blue-500 px-8 py-4 rounded-full text-lg font-semibold hover:shadow-lg hover:shadow-cyan-500/20 transition-all transform hover:scale-105"
              >
                <div className="flex items-center gap-3">
                  <Mic className="w-5 h-5" />
                  Start Voice Conversation
                </div>
              </button>
              <div className="text-sm text-gray-500 font-mono">
                No registration required • Instant connection
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Voice Assistant Showcase */}
      <section className="py-20 bg-[#0A0B1E]">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Left: Voice Assistant Demo */}
              <div className="text-center lg:text-left">
                <div className="w-20 h-20 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-full flex items-center justify-center mx-auto lg:mx-0 mb-6">
                  <Mic className="w-10 h-10 text-cyan-400" />
                </div>
                <h2 className="text-3xl font-mono font-bold mb-6">
                  <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                    AI-Powered Voice Assistant
                  </span>
                </h2>
                <p className="text-gray-400 font-mono text-lg mb-8">
                  Experience the future of customer interaction with our advanced AI voice assistant. 
                  Get instant answers, schedule appointments, and learn about our services through natural conversation.
                </p>
                
                <div className="space-y-4 mb-8">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                    <span className="font-mono text-gray-300">Natural voice conversation</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                    <span className="font-mono text-gray-300">Instant responses to business questions</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                    <span className="font-mono text-gray-300">Appointment scheduling and booking</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                    <span className="font-mono text-gray-300">Service information and pricing</span>
                  </div>
                </div>

                <button
                  onClick={() => {
                    const voiceButton = document.querySelector('[title="Try Voice Assistant"]') as HTMLButtonElement;
                    voiceButton?.click();
                  }}
                  className="font-mono bg-gradient-to-r from-cyan-500 to-blue-500 px-8 py-4 rounded-full text-lg font-semibold hover:shadow-lg hover:shadow-cyan-500/20 transition-all transform hover:scale-105"
                >
                  <div className="flex items-center gap-3">
                    <Phone className="w-5 h-5" />
                    Try Voice Assistant Now
                  </div>
                </button>
              </div>

              {/* Right: Interactive Demo Card */}
              <div className="bg-gradient-to-b from-cyan-500/10 to-transparent border border-cyan-500/30 rounded-2xl p-8">
                <div className="text-center mb-6">
                  <h3 className="text-xl font-mono font-semibold text-white mb-2">Live Demo</h3>
                  <p className="text-gray-400 font-mono">Click the voice assistant button to start</p>
                </div>
                
                <div className="space-y-4">
                  <div className="bg-gray-800/50 rounded-lg p-4 border border-cyan-500/20">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
                      <span className="font-mono text-sm text-cyan-400">AI Assistant</span>
                    </div>
                    <p className="font-mono text-gray-300 text-sm">
                      "Hello! I'm your VectorShift Ventures AI assistant. I can help you learn about our automation services, 
                      schedule consultations, and answer any business questions you have. How can I assist you today?"
                    </p>
                  </div>
                  
                  <div className="bg-gray-800/50 rounded-lg p-4 border border-gray-600/30">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                      <span className="font-mono text-sm text-gray-400">You</span>
                    </div>
                    <p className="font-mono text-gray-300 text-sm italic">
                      "Tell me about your automation services..."
                    </p>
                  </div>
                  
                  <div className="bg-gray-800/50 rounded-lg p-4 border border-cyan-500/20">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
                      <span className="font-mono text-sm text-cyan-400">AI Assistant</span>
                    </div>
                    <p className="font-mono text-gray-300 text-sm">
                      "We specialize in business automation solutions including lead generation systems, AI chatbots, 
                      customer service automation, and social media management. Would you like to learn more about any specific service?"
                    </p>
                  </div>
                </div>
                
                <div className="mt-6 text-center">
                  <p className="text-xs text-gray-500 font-mono">
                    💡 Try asking about: services, pricing, appointments, automation solutions
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* AI Voice Assistant Features */}
      <section className="py-20 bg-[#0A0B1E]">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-mono font-bold mb-4">
              <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">Voice Assistant Capabilities</span>
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto font-mono">
              Our AI voice assistant can handle a wide range of business interactions and provide instant, professional responses.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="p-8 rounded-2xl bg-gradient-to-b from-cyan-500/10 to-transparent border border-cyan-500/20 hover:border-cyan-500/40 transition-all">
              <MessageSquare className="w-16 h-16 text-cyan-400 mb-6" />
              <h3 className="text-2xl font-mono font-semibold mb-4">Natural Conversation</h3>
              <p className="text-gray-400 font-mono mb-6">Advanced AI that understands context and provides human-like responses to complex business questions.</p>
              <ul className="space-y-2">
                <li className="flex items-center text-gray-300 font-mono">
                  <CheckCircle className="w-4 h-4 text-cyan-400 mr-3 flex-shrink-0" />
                  Context-aware responses
                </li>
                <li className="flex items-center text-gray-300 font-mono">
                  <CheckCircle className="w-4 h-4 text-cyan-400 mr-3 flex-shrink-0" />
                  Multi-turn conversations
                </li>
                <li className="flex items-center text-gray-300 font-mono">
                  <CheckCircle className="w-4 h-4 text-cyan-400 mr-3 flex-shrink-0" />
                  Professional tone and language
                </li>
                <li className="flex items-center text-gray-300 font-mono">
                  <CheckCircle className="w-4 h-4 text-cyan-400 mr-3 flex-shrink-0" />
                  Industry-specific knowledge
                </li>
              </ul>
            </div>

            <div className="p-8 rounded-2xl bg-gradient-to-b from-cyan-500/10 to-transparent border border-cyan-500/20 hover:border-cyan-500/40 transition-all">
              <Calendar className="w-16 h-16 text-cyan-400 mb-6" />
              <h3 className="text-2xl font-mono font-semibold mb-4">Appointment Scheduling</h3>
              <p className="text-gray-400 font-mono mb-6">Seamlessly schedule consultations, demos, and meetings directly through voice conversation.</p>
              <ul className="space-y-2">
                <li className="flex items-center text-gray-300 font-mono">
                  <CheckCircle className="w-4 h-4 text-cyan-400 mr-3 flex-shrink-0" />
                  Calendar integration
                </li>
                <li className="flex items-center text-gray-300 font-mono">
                  <CheckCircle className="w-4 h-4 text-cyan-400 mr-3 flex-shrink-0" />
                  Availability checking
                </li>
                <li className="flex items-center text-gray-300 font-mono">
                  <CheckCircle className="w-4 h-4 text-cyan-400 mr-3 flex-shrink-0" />
                  Meeting confirmation
                </li>
                <li className="flex items-center text-gray-300 font-mono">
                  <CheckCircle className="w-4 h-4 text-cyan-400 mr-3 flex-shrink-0" />
                  Reminder notifications
                </li>
              </ul>
            </div>

            <div className="p-8 rounded-2xl bg-gradient-to-b from-cyan-500/10 to-transparent border border-cyan-500/20 hover:border-cyan-500/40 transition-all">
              <Brain className="w-16 h-16 text-cyan-400 mb-6" />
              <h3 className="text-2xl font-mono font-semibold mb-4">Business Intelligence</h3>
              <p className="text-gray-400 font-mono mb-6">Get detailed information about services, pricing, and automation solutions tailored to your needs.</p>
              <ul className="space-y-2">
                <li className="flex items-center text-gray-300 font-mono">
                  <CheckCircle className="w-4 h-4 text-cyan-400 mr-3 flex-shrink-0" />
                  Service explanations
                </li>
                <li className="flex items-center text-gray-300 font-mono">
                  <CheckCircle className="w-4 h-4 text-cyan-400 mr-3 flex-shrink-0" />
                  Pricing information
                </li>
                <li className="flex items-center text-gray-300 font-mono">
                  <CheckCircle className="w-4 h-4 text-cyan-400 mr-3 flex-shrink-0" />
                  ROI calculations
                </li>
                <li className="flex items-center text-gray-300 font-mono">
                  <CheckCircle className="w-4 h-4 text-cyan-400 mr-3 flex-shrink-0" />
                  Case study examples
                </li>
              </ul>
            </div>

            <div className="p-8 rounded-2xl bg-gradient-to-b from-cyan-500/10 to-transparent border border-cyan-500/20 hover:border-cyan-500/40 transition-all">
              <Users className="w-16 h-16 text-cyan-400 mb-6" />
              <h3 className="text-2xl font-mono font-semibold mb-4">Lead Qualification</h3>
              <p className="text-gray-400 font-mono mb-6">Intelligent lead qualification and routing to ensure prospects get the right information and follow-up.</p>
              <ul className="space-y-2">
                <li className="flex items-center text-gray-300 font-mono">
                  <CheckCircle className="w-4 h-4 text-cyan-400 mr-3 flex-shrink-0" />
                  Need assessment
                </li>
                <li className="flex items-center text-gray-300 font-mono">
                  <CheckCircle className="w-4 h-4 text-cyan-400 mr-3 flex-shrink-0" />
                  Budget qualification
                </li>
                <li className="flex items-center text-gray-300 font-mono">
                  <CheckCircle className="w-4 h-4 text-cyan-400 mr-3 flex-shrink-0" />
                  Timeline evaluation
                </li>
                <li className="flex items-center text-gray-300 font-mono">
                  <CheckCircle className="w-4 h-4 text-cyan-400 mr-3 flex-shrink-0" />
                  Decision maker identification
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Custom Demo CTA Section */}
      <section className="py-20 bg-gradient-to-b from-[#0A0B1E]/80 to-[#0A0B1E]">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <div className="w-20 h-20 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <Brain className="w-10 h-10 text-cyan-400" />
            </div>
            <h2 className="text-3xl font-mono font-bold mb-6">
              <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                Want Your Own Custom Voice Assistant?
              </span>
            </h2>
            <p className="text-gray-400 mb-8 font-mono text-lg">
              Get a personalized AI voice assistant and website demo tailored specifically to your business. 
              Our team will create a custom solution based on your requirements and deliver it within 24-48 hours.
            </p>
            
            <div className="bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-500/30 rounded-2xl p-8 mb-8">
              <h3 className="text-xl font-mono font-semibold mb-4">What You'll Get:</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <Brain className="w-8 h-8 text-cyan-400 mx-auto mb-3" />
                  <h4 className="font-mono font-semibold mb-2">Custom AI Voice Assistant</h4>
                  <p className="text-gray-400 font-mono text-sm">Trained on your business information and processes</p>
                </div>
                <div className="text-center">
                  <MessageSquare className="w-8 h-8 text-cyan-400 mx-auto mb-3" />
                  <h4 className="font-mono font-semibold mb-2">Personalized Website</h4>
                  <p className="text-gray-400 font-mono text-sm">Custom branding and features for your business</p>
                </div>
                <div className="text-center">
                  <Calendar className="w-8 h-8 text-cyan-400 mx-auto mb-3" />
                  <h4 className="font-mono font-semibold mb-2">24-48 Hour Delivery</h4>
                  <p className="text-gray-400 font-mono text-sm">Fast turnaround with professional consultation</p>
                </div>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/consultation"
                className="font-mono bg-gradient-to-r from-cyan-500 to-blue-500 px-8 py-4 rounded-full text-lg font-semibold hover:shadow-lg hover:shadow-cyan-500/20 transition-all transform hover:scale-105"
              >
                <div className="flex items-center gap-3">
                  <Brain className="w-5 h-5" />
                  Request Custom Demo
                  <ArrowRight className="w-5 h-5" />
                </div>
              </Link>
              <Link
                to="/contact"
                className="font-mono border border-cyan-500/30 px-8 py-4 rounded-full text-lg font-semibold hover:bg-cyan-500/10 transition-all"
              >
                Learn More About Our Services
              </Link>
            </div>
            <div className="mt-6 text-center">
              <p className="text-sm text-gray-500 font-mono">
                ✓ Free custom demo • ✓ No obligation • ✓ Professional consultation included
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Voice Assistant */}
      <VoiceAssistant />
    </div>
  );
};

export default Demo; 