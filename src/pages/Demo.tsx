import React from 'react';
import { Link } from 'react-router-dom';
import { Bot, MessageSquare, Database, Calendar, CircuitBoard, Cpu, Network, Play, ExternalLink, CheckCircle, FileText, PhoneCall, Brain, Search } from 'lucide-react';
import LiveDemo from '../components/LiveDemo';

const Demo: React.FC = () => {
  const demoPackage = [
    {
      icon: FileText,
      title: "Custom Demo Proposal",
      description: "Comprehensive analysis and tailored automation strategy demo for your business",
      features: [
        "In-depth business and industry research",
        "Custom automation roadmap demonstration", 
        "ROI projections and cost analysis demo",
        "Implementation timeline showcase"
      ]
    },
    {
      icon: Brain,
      title: "Research-Based Demo Agent",
      description: "AI demo agent trained extensively on your business specifics for testing",
      features: [
        "Business-specific knowledge base demo",
        "Industry expertise integration showcase",
        "Product/service deep knowledge demo", 
        "Interactive demo capabilities"
      ]
    },
    {
      icon: PhoneCall,
      title: "Demo Phone Caller Agent", 
      description: "Automated phone demo system showcasing AI customer inquiry handling",
      features: [
        "Natural voice synthesis demonstration",
        "Business-specific responses showcase",
        "Demo appointment scheduling",
        "Lead qualification showcase"
      ]
    }
  ];

  const demoProcess = [
    {
      step: "1",
      title: "Business Research",
      description: "Deep dive into your company, services, and target market",
      icon: Search
    },
    {
      step: "2", 
      title: "Industry Analysis",
      description: "Research industry trends, competitors, and best practices",
      icon: Database
    },
    {
      step: "3",
      title: "Demo Development", 
      description: "Build custom demo agents with your specific business knowledge",
      icon: Brain
    },
    {
      step: "4",
      title: "Demo Delivery",
      description: "Provide complete demo package for testing and evaluation",
      icon: Network
    }
  ];

  return (
    <div className="min-h-screen bg-[#0A0B1E] text-white pt-20">
      {/* Hero Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-cyan-500/10 to-transparent" />
        <div className="container mx-auto px-6 relative">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="font-mono text-5xl font-bold mb-6">
              <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                Request Your Complete Demo Package
              </span>
            </h1>
            <p className="text-xl text-gray-400 mb-8 font-mono">
              Get a comprehensive demo package including custom business proposal, demo agent with extensive research knowledge, and phone caller agent - all built specifically for your business to test and evaluate.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-8">
              <div className="flex items-center bg-gradient-to-b from-cyan-500/10 to-transparent border border-cyan-500/20 rounded-xl p-4">
                <FileText className="w-8 h-8 text-cyan-400 mr-3" />
                <span className="font-mono text-sm">Custom Demo Proposal</span>
              </div>
              <div className="flex items-center bg-gradient-to-b from-cyan-500/10 to-transparent border border-cyan-500/20 rounded-xl p-4">
                <Brain className="w-8 h-8 text-cyan-400 mr-3" />
                <span className="font-mono text-sm">Research-Based Demo Agent</span>
              </div>
              <div className="flex items-center bg-gradient-to-b from-cyan-500/10 to-transparent border border-cyan-500/20 rounded-xl p-4">
                <PhoneCall className="w-8 h-8 text-cyan-400 mr-3" />
                <span className="font-mono text-sm">Demo Phone Agent</span>
              </div>
            </div>
            
            <Link
              to="/consultation"
              className="font-mono bg-gradient-to-r from-cyan-500 to-blue-500 px-8 py-4 rounded-full text-lg font-semibold hover:shadow-lg hover:shadow-cyan-500/20 transition-all inline-block"
            >
              Request Demo Package
            </Link>
          </div>
        </div>
      </section>

      {/* Demo Package Details */}
      <section className="py-20 bg-[#0A0B1E]">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-mono font-bold mb-4">
              Your Complete <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">Demo Package</span>
            </h2>
            <p className="text-gray-400 max-w-3xl mx-auto font-mono">
              When you request a demo, we create this comprehensive package with extensive research and custom development specifically for your business to test and evaluate.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {demoPackage.map((item, index) => (
              <div key={index} className="relative p-8 rounded-2xl bg-gradient-to-b from-cyan-500/10 to-transparent border border-cyan-400 shadow-lg shadow-cyan-500/20">
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <span className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white px-4 py-1 rounded-full text-sm font-mono font-semibold">
                    Demo Included
                  </span>
                </div>
                <item.icon className="w-12 h-12 text-cyan-400 mb-4" />
                <h3 className="text-xl font-mono font-semibold mb-3">{item.title}</h3>
                <p className="text-gray-400 font-mono mb-4">{item.description}</p>
                <ul className="space-y-2">
                  {item.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start text-sm text-gray-300 font-mono">
                      <CheckCircle className="w-4 h-4 text-cyan-400 mr-2 mt-0.5 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Demo Development Process */}
      <section className="py-20 bg-gradient-to-b from-[#0A0B1E] to-[#0A0B1E]/80">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-mono font-bold mb-4">
              Demo Development <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">Process</span>
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto font-mono">
              We conduct extensive research on your business and industry to create truly customized demo packages for you to test.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {demoProcess.map((step, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-mono font-bold text-white">{step.step}</span>
                </div>
                <step.icon className="w-8 h-8 text-cyan-400 mx-auto mb-4" />
                <h3 className="text-lg font-mono font-semibold mb-2">{step.title}</h3>
                <p className="text-gray-400 font-mono text-sm">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive Demo */}
      <section className="py-20 bg-[#0A0B1E]">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-mono font-bold mb-4">
              Try Our <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">Interactive Demo</span>
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto font-mono">
              Experience a sample of our AI automation capabilities with this interactive demonstration.
            </p>
          </div>
          
          <LiveDemo />
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-b from-[#0A0B1E]/80 to-[#0A0B1E]">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-mono font-bold mb-6">Ready to Test Our AI Automation?</h2>
            <p className="text-gray-400 mb-8 font-mono">
              Request your complete demo package - custom proposal, demo agent with research knowledge, and phone caller agent - all built specifically for your business to test.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6">
              <Link
                to="/consultation"
                className="font-mono bg-gradient-to-r from-cyan-500 to-blue-500 px-8 py-4 rounded-full text-lg font-semibold hover:shadow-lg hover:shadow-cyan-500/20 transition-all"
              >
                Request Demo Package
              </Link>
              <Link
                to="/services"
                className="font-mono border border-cyan-500/30 px-8 py-4 rounded-full text-lg font-semibold hover:bg-cyan-500/10 transition-all"
              >
                View All Services
              </Link>
            </div>
            
            <p className="text-sm text-cyan-400 font-mono">
              ✓ Free demo package ✓ Custom research ✓ Complete testing environment ✓ Industry expertise
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Demo; 