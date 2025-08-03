import React from 'react';
import { Link } from 'react-router-dom';
import { Bot, MessageSquare, Database, Calendar, CircuitBoard, Cpu, Network, FileText, PhoneCall, Brain, Search } from 'lucide-react';

const Home: React.FC = () => {
  return (
    <main className="min-h-screen bg-[#0A0B1E] text-white">
      {/* Hero Section */}
      <section className="pt-32 pb-20 relative overflow-hidden" aria-labelledby="hero-heading">
        <div className="absolute inset-0 bg-gradient-to-b from-cyan-500/10 to-transparent" />
        <div className="container mx-auto px-6 relative">
          <div className="max-w-3xl">
            <div className="overflow-hidden">
              <h1 
                id="hero-heading"
                className="font-mono text-5xl font-bold mb-6 leading-tight"
              >
                Get Your Complete
                <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent"> AI Automation Package</span>
              </h1>
            </div>
            <p className="text-xl text-gray-400 mb-8 font-mono">
              Receive a custom proposal, demo agent with extensive research knowledge of your business, and phone caller agent - all tailored specifically to your industry and needs.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              <div className="flex items-center bg-gradient-to-b from-cyan-500/10 to-transparent border border-cyan-500/20 rounded-xl p-3">
                <FileText className="w-6 h-6 text-cyan-400 mr-2" />
                <span className="font-mono text-sm">Custom Proposal</span>
              </div>
              <div className="flex items-center bg-gradient-to-b from-cyan-500/10 to-transparent border border-cyan-500/20 rounded-xl p-3">
                <Brain className="w-6 h-6 text-cyan-400 mr-2" />
                <span className="font-mono text-sm">Research-Based Demo Agent</span>
              </div>
              <div className="flex items-center bg-gradient-to-b from-cyan-500/10 to-transparent border border-cyan-500/20 rounded-xl p-3">
                <PhoneCall className="w-6 h-6 text-cyan-400 mr-2" />
                <span className="font-mono text-sm">Phone Caller Agent</span>
              </div>
            </div>
            
            <div className="flex gap-4 flex-wrap">
              <Link
                to="/consultation"
                className="font-mono bg-gradient-to-r from-cyan-500 to-blue-500 px-8 py-3 rounded-full text-lg font-semibold hover:shadow-lg hover:shadow-cyan-500/20 transition-all focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-offset-2 focus:ring-offset-[#0A0B1E]"
                aria-label="Get your complete AI automation package"
              >
                Get Your AI Package
              </Link>
              <Link
                to="/services"
                className="font-mono border border-cyan-500/30 px-8 py-3 rounded-full text-lg font-semibold hover:bg-cyan-500/10 transition-all focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-offset-2 focus:ring-offset-[#0A0B1E]"
                aria-label="Learn about our AI automation services"
              >
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Main Package Features */}
      <section className="py-20 bg-[#0A0B1E]" aria-labelledby="package-heading">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 id="package-heading" className="text-3xl font-mono font-bold mb-4">
              Your Complete <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">AI Automation Package</span>
            </h2>
            <p className="text-gray-400 max-w-3xl mx-auto font-mono">
              Every client receives this comprehensive package with extensive research and custom development for their specific business and industry.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8" role="list">
            <article className="relative p-8 rounded-2xl bg-gradient-to-b from-cyan-500/10 to-transparent border border-cyan-400 shadow-lg shadow-cyan-500/20" role="listitem">
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <span className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white px-4 py-1 rounded-full text-sm font-mono font-semibold">
                  Included
                </span>
              </div>
              <FileText className="w-12 h-12 text-cyan-400 mb-4" aria-hidden="true" />
              <h3 className="text-xl font-mono font-semibold mb-3">Custom Business Proposal</h3>
              <p className="text-gray-400 font-mono mb-4">Comprehensive analysis and tailored automation strategy based on extensive research of your business and industry.</p>
              <ul className="text-sm text-gray-300 font-mono space-y-1">
                <li>• In-depth business research</li>
                <li>• Custom automation roadmap</li>
                <li>• ROI projections & analysis</li>
                <li>• Implementation timeline</li>
              </ul>
            </article>
            
            <article className="relative p-8 rounded-2xl bg-gradient-to-b from-cyan-500/10 to-transparent border border-cyan-400 shadow-lg shadow-cyan-500/20" role="listitem">
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <span className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white px-4 py-1 rounded-full text-sm font-mono font-semibold">
                  Included
                </span>
              </div>
              <Brain className="w-12 h-12 text-cyan-400 mb-4" aria-hidden="true" />
              <h3 className="text-xl font-mono font-semibold mb-3">Demo Agent with Research Knowledge</h3>
              <p className="text-gray-400 font-mono mb-4">AI agent trained extensively on your business specifics, industry trends, and customer interaction scenarios.</p>
              <ul className="text-sm text-gray-300 font-mono space-y-1">
                <li>• Business-specific knowledge base</li>
                <li>• Industry expertise integration</li>
                <li>• Product/service deep knowledge</li>
                <li>• Real-time learning capabilities</li>
              </ul>
            </article>
            
            <article className="relative p-8 rounded-2xl bg-gradient-to-b from-cyan-500/10 to-transparent border border-cyan-400 shadow-lg shadow-cyan-500/20" role="listitem">
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <span className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white px-4 py-1 rounded-full text-sm font-mono font-semibold">
                  Included
                </span>
              </div>
              <PhoneCall className="w-12 h-12 text-cyan-400 mb-4" aria-hidden="true" />
              <h3 className="text-xl font-mono font-semibold mb-3">Phone Caller Agent</h3>
              <p className="text-gray-400 font-mono mb-4">Automated phone system that handles customer inquiries with your business expertise and professional responses.</p>
              <ul className="text-sm text-gray-300 font-mono space-y-1">
                <li>• Natural voice synthesis</li>
                <li>• Business-specific responses</li>
                <li>• Appointment scheduling</li>
                <li>• Lead qualification & routing</li>
              </ul>
            </article>
          </div>
        </div>
      </section>

      {/* Research Process */}
      <section className="py-20 bg-gradient-to-b from-[#0A0B1E] to-[#0A0B1E]/80" aria-labelledby="process-heading">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 id="process-heading" className="text-3xl font-mono font-bold mb-4">
              Research-Based
              <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent"> Development Process</span>
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto font-mono">
              We conduct extensive research on your business and industry to create truly customized AI solutions.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8" role="list">
            {[
              { icon: Search, title: "Business Research", description: "Deep dive into your company and market" },
              { icon: Database, title: "Industry Analysis", description: "Research trends and best practices" },
              { icon: Brain, title: "AI Development", description: "Build custom agents with your knowledge" },
              { icon: Network, title: "Integration", description: "Deploy and connect all systems" }
            ].map((step, index) => (
              <article 
                key={index} 
                className="text-center p-6 rounded-2xl bg-gradient-to-b from-cyan-500/5 to-transparent border border-cyan-500/10 hover:border-cyan-500/30 transition-all"
                role="listitem"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-mono font-bold text-white">{index + 1}</span>
                </div>
                <step.icon className="w-8 h-8 text-cyan-400 mx-auto mb-4" aria-hidden="true" />
                <h3 className="text-lg font-mono font-semibold mb-2">{step.title}</h3>
                <p className="text-gray-400 font-mono text-sm">{step.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Additional Automation Services */}
      <section className="py-20 bg-[#0A0B1E]" aria-labelledby="additional-services-heading">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 id="additional-services-heading" className="text-3xl font-mono font-bold mb-4">
              Additional
              <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent"> Automation Services</span>
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto font-mono">
              Expand your automation with additional services, all built with the same research-based approach.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8" role="list">
            {[
              { icon: Bot, title: "AI Chat Automation", description: "24/7 intelligent customer support" },
              { icon: MessageSquare, title: "Lead Generation", description: "Automated lead capture & qualification" },
              { icon: Database, title: "CRM Integration", description: "Streamlined data management" },
              { icon: CircuitBoard, title: "Workflow Automation", description: "Custom process optimization" }
            ].map((service, index) => (
              <article 
                key={index} 
                className="p-6 rounded-2xl bg-gradient-to-b from-cyan-500/5 to-transparent border border-cyan-500/20 hover:border-cyan-500/40 transition-all group"
                role="listitem"
              >
                <service.icon className="w-10 h-10 text-cyan-400 mb-4 group-hover:scale-110 transition-transform" aria-hidden="true" />
                <h3 className="text-lg font-mono font-semibold mb-2">{service.title}</h3>
                <p className="text-gray-400 font-mono text-sm">{service.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-b from-[#0A0B1E]/80 to-[#0A0B1E]" aria-labelledby="cta-heading">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h2 id="cta-heading" className="text-3xl font-mono font-bold mb-6">Ready for Your Complete AI Automation Package?</h2>
            <p className="text-gray-400 mb-8 font-mono">
              Get your custom proposal, demo agent with research knowledge, and phone caller agent - all backed by extensive research of your business and industry.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6">
              <Link
                to="/consultation"
                className="font-mono bg-gradient-to-r from-cyan-500 to-blue-500 px-8 py-4 rounded-full text-lg font-semibold hover:shadow-lg hover:shadow-cyan-500/20 transition-all focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-offset-2 focus:ring-offset-[#0A0B1E]"
                aria-label="Get your complete AI automation package today"
              >
                Get Your AI Package
              </Link>
              <Link
                to="/services"
                className="font-mono border border-cyan-500/30 px-8 py-4 rounded-full text-lg font-semibold hover:bg-cyan-500/10 transition-all focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-offset-2 focus:ring-offset-[#0A0B1E]"
                aria-label="Learn more about our services"
              >
                Learn More
              </Link>
            </div>
            
            <p className="text-sm text-cyan-400 font-mono">
              ✓ Free consultation ✓ Custom research ✓ Complete AI package ✓ Industry expertise
            </p>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Home; 