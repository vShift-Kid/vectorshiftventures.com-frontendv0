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
                B2B Field Service Voice Assistant
              </span>
            </h1>
            <p className="text-xl text-gray-400 mb-8 font-mono">
              Experience our AI voice assistant designed specifically for B2B field service operations. 
              Handle customer inquiries, schedule appointments, and solve business problems through natural conversation.
            </p>
            
            <div className="bg-gradient-to-r from-red-500/10 to-orange-500/10 border border-red-500/30 rounded-2xl p-6 mb-8">
              <h3 className="text-lg font-mono font-semibold mb-3 text-red-400">🏢 B2B Business Focus</h3>
              <p className="text-gray-300 font-mono text-sm">
                <strong>Business-to-Business Solutions:</strong> Designed exclusively for field service companies serving other businesses. 
                Not for individual consumers - this is professional B2B customer service automation.
              </p>
            </div>
            
            <div className="bg-gradient-to-r from-blue-500/10 to-cyan-500/10 border border-blue-500/30 rounded-2xl p-6 mb-8">
              <h3 className="text-lg font-mono font-semibold mb-3 text-blue-400">🏢 Built for Field Service Businesses</h3>
              <p className="text-gray-300 font-mono text-sm">
                Designed for HVAC, plumbing, electrical, maintenance, and other field service operations. 
                Handles customer service, scheduling, and business problem-solving.
              </p>
            </div>
            
            <div className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/30 rounded-2xl p-6 mb-8">
              <h3 className="text-lg font-mono font-semibold mb-3 text-purple-400">⚡ Vector Shift Ventures</h3>
              <p className="text-gray-300 font-mono text-sm">
                <span className="text-purple-400 font-semibold">Automation Agency</span> - Specializing in AI-powered business automation solutions for field service operations.
              </p>
            </div>
            
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
                  Try Voice Assistant
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
                    Field Service AI Assistant
                  </span>
                </h2>
                <p className="text-gray-400 font-mono text-lg mb-8">
                  Our AI voice assistant is specifically designed for field service operations. 
                  Handle customer inquiries, schedule appointments, and solve business problems through natural conversation.
                </p>
                
                <div className="space-y-4 mb-8">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                    <span className="font-mono text-gray-300">Customer service & support</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                    <span className="font-mono text-gray-300">Appointment scheduling & management</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                    <span className="font-mono text-gray-300">Business problem-solving</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                    <span className="font-mono text-gray-300">Field service operations support</span>
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
                      "Hello! I'm your field service AI assistant. I can help with customer inquiries, schedule appointments, 
                      and solve business problems. How can I assist your field service operation today?"
                    </p>
                  </div>
                  
                  <div className="bg-gray-800/50 rounded-lg p-4 border border-gray-600/30">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                      <span className="font-mono text-sm text-gray-400">Customer</span>
                    </div>
                    <p className="font-mono text-gray-300 text-sm italic">
                      "I need to schedule an HVAC maintenance appointment..."
                    </p>
                  </div>
                  
                  <div className="bg-gray-800/50 rounded-lg p-4 border border-cyan-500/20">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
                      <span className="font-mono text-sm text-cyan-400">AI Assistant</span>
                    </div>
                    <p className="font-mono text-gray-300 text-sm">
                      "I'd be happy to help schedule your HVAC maintenance. I can check our technician availability, 
                      provide pricing information, and book the appointment. What's your preferred date and time?"
                    </p>
                  </div>
                </div>
                
                <div className="mt-6 text-center">
                  <p className="text-xs text-gray-500 font-mono">
                    💡 Try asking about: scheduling, customer service, field service operations, business problems
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
              <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">Field Service Voice Assistant Capabilities</span>
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto font-mono">
              Our AI voice assistant is specifically designed for field service operations and can handle a wide range of business interactions.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="p-8 rounded-2xl bg-gradient-to-b from-cyan-500/10 to-transparent border border-cyan-500/20 hover:border-cyan-500/40 transition-all">
              <MessageSquare className="w-16 h-16 text-cyan-400 mb-6" />
              <h3 className="text-2xl font-mono font-semibold mb-4">Customer Service & Support</h3>
              <p className="text-gray-400 font-mono mb-6">Handle customer inquiries, troubleshoot issues, and provide support for field service operations.</p>
              <ul className="space-y-2">
                <li className="flex items-center text-gray-300 font-mono">
                  <CheckCircle className="w-4 h-4 text-cyan-400 mr-3 flex-shrink-0" />
                  Customer inquiry handling
                </li>
                <li className="flex items-center text-gray-300 font-mono">
                  <CheckCircle className="w-4 h-4 text-cyan-400 mr-3 flex-shrink-0" />
                  Technical support assistance
                </li>
                <li className="flex items-center text-gray-300 font-mono">
                  <CheckCircle className="w-4 h-4 text-cyan-400 mr-3 flex-shrink-0" />
                  Service request processing
                </li>
                <li className="flex items-center text-gray-300 font-mono">
                  <CheckCircle className="w-4 h-4 text-cyan-400 mr-3 flex-shrink-0" />
                  Emergency response coordination
                </li>
              </ul>
            </div>

            <div className="p-8 rounded-2xl bg-gradient-to-b from-cyan-500/10 to-transparent border border-cyan-500/20 hover:border-cyan-500/40 transition-all">
              <Calendar className="w-16 h-16 text-cyan-400 mb-6" />
              <h3 className="text-2xl font-mono font-semibold mb-4">Appointment & Scheduling</h3>
              <p className="text-gray-400 font-mono mb-6">Manage appointments, schedule technicians, and coordinate field service operations efficiently.</p>
              <ul className="space-y-2">
                <li className="flex items-center text-gray-300 font-mono">
                  <CheckCircle className="w-4 h-4 text-cyan-400 mr-3 flex-shrink-0" />
                  Technician scheduling
                </li>
                <li className="flex items-center text-gray-300 font-mono">
                  <CheckCircle className="w-4 h-4 text-cyan-400 mr-3 flex-shrink-0" />
                  Service appointment booking
                </li>
                <li className="flex items-center text-gray-300 font-mono">
                  <CheckCircle className="w-4 h-4 text-cyan-400 mr-3 flex-shrink-0" />
                  Route optimization
                </li>
                <li className="flex items-center text-gray-300 font-mono">
                  <CheckCircle className="w-4 h-4 text-cyan-400 mr-3 flex-shrink-0" />
                  Maintenance scheduling
                </li>
              </ul>
            </div>

            <div className="p-8 rounded-2xl bg-gradient-to-b from-cyan-500/10 to-transparent border border-cyan-500/20 hover:border-cyan-500/40 transition-all">
              <Brain className="w-16 h-16 text-cyan-400 mb-6" />
              <h3 className="text-2xl font-mono font-semibold mb-4">Business Problem Solving</h3>
              <p className="text-gray-400 font-mono mb-6">Solve complex business problems and provide solutions for field service challenges.</p>
              <ul className="space-y-2">
                <li className="flex items-center text-gray-300 font-mono">
                  <CheckCircle className="w-4 h-4 text-cyan-400 mr-3 flex-shrink-0" />
                  Operational efficiency analysis
                </li>
                <li className="flex items-center text-gray-300 font-mono">
                  <CheckCircle className="w-4 h-4 text-cyan-400 mr-3 flex-shrink-0" />
                  Cost optimization recommendations
                </li>
                <li className="flex items-center text-gray-300 font-mono">
                  <CheckCircle className="w-4 h-4 text-cyan-400 mr-3 flex-shrink-0" />
                  Process improvement suggestions
                </li>
                <li className="flex items-center text-gray-300 font-mono">
                  <CheckCircle className="w-4 h-4 text-cyan-400 mr-3 flex-shrink-0" />
                  Resource allocation optimization
                </li>
              </ul>
            </div>

            <div className="p-8 rounded-2xl bg-gradient-to-b from-cyan-500/10 to-transparent border border-cyan-500/20 hover:border-cyan-500/40 transition-all">
              <Users className="w-16 h-16 text-cyan-400 mb-6" />
              <h3 className="text-2xl font-mono font-semibold mb-4">Field Service Operations</h3>
              <p className="text-gray-400 font-mono mb-6">Support field service operations with intelligent routing, technician management, and service coordination.</p>
              <ul className="space-y-2">
                <li className="flex items-center text-gray-300 font-mono">
                  <CheckCircle className="w-4 h-4 text-cyan-400 mr-3 flex-shrink-0" />
                  Technician dispatch coordination
                </li>
                <li className="flex items-center text-gray-300 font-mono">
                  <CheckCircle className="w-4 h-4 text-cyan-400 mr-3 flex-shrink-0" />
                  Service area management
                </li>
                <li className="flex items-center text-gray-300 font-mono">
                  <CheckCircle className="w-4 h-4 text-cyan-400 mr-3 flex-shrink-0" />
                  Equipment tracking & management
                </li>
                <li className="flex items-center text-gray-300 font-mono">
                  <CheckCircle className="w-4 h-4 text-cyan-400 mr-3 flex-shrink-0" />
                  Quality assurance monitoring
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
                Get Your Custom Business Problem-Solving Assistant
              </span>
            </h2>
            <p className="text-xl text-gray-400 mb-8 font-mono">
              Receive a personalized AI voice assistant specifically built to solve YOUR business problems. 
              Trained on your field service operations, customer data, and unique challenges for a 30-minute call time or 14-day trial period.
            </p>
            
            <div className="bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/30 rounded-2xl p-8 mb-8">
              <h3 className="text-xl font-mono font-semibold mb-4 text-green-400">🎯 Built for YOUR Specific Business Problems</h3>
              <p className="text-gray-300 font-mono mb-6">
                Unlike generic AI assistants, your custom voice assistant will be trained specifically on:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                    <span className="font-mono text-sm text-gray-300">Your specific field service challenges</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                    <span className="font-mono text-sm text-gray-300">Customer pain points and common issues</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                    <span className="font-mono text-sm text-gray-300">Your business processes and workflows</span>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                    <span className="font-mono text-sm text-gray-300">Industry-specific terminology and solutions</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                    <span className="font-mono text-sm text-gray-300">Your pricing and service offerings</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                    <span className="font-mono text-sm text-gray-300">Real business problem-solving scenarios</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-500/30 rounded-2xl p-8 mb-8">
              <h3 className="text-xl font-mono font-semibold mb-4">What You'll Get:</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <Brain className="w-8 h-8 text-cyan-400 mx-auto mb-3" />
                  <h4 className="font-mono font-semibold mb-2">Custom Problem-Solving AI</h4>
                  <p className="text-gray-400 font-mono text-sm">Trained specifically on your business problems and field service challenges</p>
                </div>
                <div className="text-center">
                  <MessageSquare className="w-8 h-8 text-cyan-400 mx-auto mb-3" />
                  <h4 className="font-mono font-semibold mb-2">30-Min Call / 14-Day Trial</h4>
                  <p className="text-gray-400 font-mono text-sm">Choose between 30-minute call time or 14-day trial period</p>
                </div>
                <div className="text-center">
                  <Calendar className="w-8 h-8 text-cyan-400 mx-auto mb-3" />
                  <h4 className="font-mono font-semibold mb-2">24-48 Hour Setup</h4>
                  <p className="text-gray-400 font-mono text-sm">Quick deployment with professional consultation</p>
                </div>
              </div>
            </div>
            
            <div className="bg-gradient-to-r from-blue-500/10 to-cyan-500/10 border border-blue-500/30 rounded-2xl p-6 mb-8">
              <h3 className="text-lg font-mono font-semibold mb-3 text-blue-400">🏢 B2B Business Requirements:</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                  <span className="font-mono text-sm text-gray-300">Business email address required</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                  <span className="font-mono text-sm text-gray-300">Field service operations focus</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                  <span className="font-mono text-sm text-gray-300">30-min call or 14-day trial</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                  <span className="font-mono text-sm text-gray-300">B2B customer service focus</span>
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
                  Get Your Custom Business Assistant
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
                ✓ Custom business problem-solving • ✓ 30-min call or 14-day trial • ✓ Business email required • ✓ Professional consultation included
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