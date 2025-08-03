import React from 'react';
import { Link } from 'react-router-dom';
import { Bot, MessageSquare, Database, Calendar, CircuitBoard, Cpu, Network } from 'lucide-react';

const Home: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#0A0B1E] text-white">
      {/* Hero Section */}
      <section className="pt-32 pb-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-cyan-500/10 to-transparent" />
        <div className="container mx-auto px-6 relative">
          <div className="max-w-3xl">
            <div className="overflow-hidden">
              <h1 className="font-mono text-5xl font-bold mb-6 leading-tight typewriter">
                Streamline Your Business with
                <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent"> AI-Powered </span>
                Automation
              </h1>
            </div>
            <p className="text-xl text-gray-400 mb-8 font-mono">
              Transform your field service operations by automating workflows, streamlining processes, and leveraging intelligent solutions for unprecedented efficiency.
            </p>
            <div className="flex gap-4">
              <Link
                to="/demo"
                className="font-mono bg-gradient-to-r from-cyan-500 to-blue-500 px-8 py-3 rounded-full text-lg font-semibold hover:shadow-lg hover:shadow-cyan-500/20 transition-all"
              >
                View Demo
              </Link>
              <Link
                to="/services"
                className="font-mono border border-cyan-500/30 px-8 py-3 rounded-full text-lg font-semibold hover:bg-cyan-500/10 transition-all"
              >
                Explore Solutions
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-[#0A0B1E]">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 rounded-2xl bg-gradient-to-b from-cyan-500/10 to-transparent border border-cyan-500/20 hover:border-cyan-500/40 transition-all">
              <Bot className="w-12 h-12 text-cyan-400 mb-4" />
              <h3 className="text-xl font-mono font-semibold mb-3">Automated Chat Agents</h3>
              <p className="text-gray-400 font-mono">Streamline customer support with intelligent AI agents that transform inquiry handling and automate responses 24/7.</p>
            </div>
            <div className="p-6 rounded-2xl bg-gradient-to-b from-cyan-500/10 to-transparent border border-cyan-500/20 hover:border-cyan-500/40 transition-all">
              <MessageSquare className="w-12 h-12 text-cyan-400 mb-4" />
              <h3 className="text-xl font-mono font-semibold mb-3">Automated Lead Generation</h3>
              <p className="text-gray-400 font-mono">Transform your sales pipeline with automated lead capture systems that streamline qualification and conversion.</p>
            </div>
            <div className="p-6 rounded-2xl bg-gradient-to-b from-cyan-500/10 to-transparent border border-cyan-500/20 hover:border-cyan-500/40 transition-all">
              <Database className="w-12 h-12 text-cyan-400 mb-4" />
              <h3 className="text-xl font-mono font-semibold mb-3">Streamlined CRM</h3>
              <p className="text-gray-400 font-mono">Automate your customer relationship management with seamless integrations that transform data handling.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Field Service Focus */}
      <section className="py-20 bg-gradient-to-b from-[#0A0B1E] to-[#0A0B1E]/80">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-mono font-bold mb-4">
              Transform Your
              <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent"> Field Service </span>
              Operations
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto font-mono">
              Our automated solutions streamline field service management, transforming efficiency and productivity through intelligent optimization.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: CircuitBoard, title: "Automated Scheduling" },
              { icon: Cpu, title: "Streamlined Resources" },
              { icon: Network, title: "Real-time Automation" },
              { icon: Calendar, title: "Transform Dispatch" }
            ].map((feature, index) => (
              <div key={index} className="p-6 rounded-2xl bg-gradient-to-b from-cyan-500/5 to-transparent border border-cyan-500/10 hover:border-cyan-500/30 transition-all cursor-pointer group">
                <feature.icon className="w-10 h-10 text-cyan-400 mb-4 group-hover:scale-110 transition-transform" />
                <h3 className="text-lg font-mono font-semibold">{feature.title}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-b from-[#0A0B1E]/80 to-[#0A0B1E]">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-mono font-bold mb-6">Ready to Automate Your Success?</h2>
            <p className="text-gray-400 mb-8 font-mono">
              Schedule a consultation to discover how our automated solutions can streamline operations and transform your field service business.
            </p>
            <Link
              to="/consultation"
              className="font-mono bg-gradient-to-r from-cyan-500 to-blue-500 px-8 py-4 rounded-full text-lg font-semibold hover:shadow-lg hover:shadow-cyan-500/20 transition-all inline-block"
            >
              Transform Your Business Today
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home; 