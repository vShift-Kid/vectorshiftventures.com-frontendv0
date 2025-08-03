import React from 'react';
import { Link } from 'react-router-dom';
import { Bot, MessageSquare, Database, Calendar, CircuitBoard, Cpu, Network, Play, ExternalLink, CheckCircle } from 'lucide-react';
import LiveDemo from '../components/LiveDemo';

const Demo: React.FC = () => {
  const capabilities = [
    {
      icon: Bot,
      title: "AI Chat Automation",
      description: "Intelligent customer support agents that handle inquiries 24/7",
      features: ["Natural language processing", "Multi-language support", "Integration with CRM systems"]
    },
    {
      icon: MessageSquare,
      title: "Lead Generation Systems",
      description: "Automated lead capture and qualification workflows",
      features: ["Web form automation", "Lead scoring", "CRM integration", "Follow-up sequences"]
    },
    {
      icon: Database,
      title: "Data Processing & CRM",
      description: "Streamlined data management and customer relationship automation",
      features: ["Data validation", "Automated data entry", "Report generation", "Real-time sync"]
    },
    {
      icon: CircuitBoard,
      title: "Workflow Automation",
      description: "Custom automation solutions for field service operations",
      features: ["Scheduling automation", "Resource allocation", "Dispatch optimization", "Performance tracking"]
    }
  ];

  const caseStudies = [
    {
      title: "Field Service Company A",
      industry: "HVAC Services",
      results: ["40% reduction in response time", "25% increase in customer satisfaction", "30% improvement in scheduling efficiency"],
      description: "Implemented automated scheduling and dispatch system with AI-powered route optimization."
    },
    {
      title: "Maintenance Services B",
      industry: "Facility Management",
      results: ["50% faster lead processing", "35% increase in conversion rate", "Automated 80% of routine tasks"],
      description: "Deployed comprehensive lead generation and customer management automation."
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
                Capabilities & Portfolio
              </span>
            </h1>
            <p className="text-xl text-gray-400 mb-8 font-mono">
              Explore our proven automation solutions and see how we've transformed field service businesses.
            </p>
            <div className="flex gap-4 justify-center">
              <Link
                to="/consultation"
                className="font-mono bg-gradient-to-r from-cyan-500 to-blue-500 px-8 py-3 rounded-full text-lg font-semibold hover:shadow-lg hover:shadow-cyan-500/20 transition-all"
              >
                Schedule Demo
              </Link>
              <Link
                to="/contact"
                className="font-mono border border-cyan-500/30 px-8 py-3 rounded-full text-lg font-semibold hover:bg-cyan-500/10 transition-all"
              >
                Get Custom Quote
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Live Demo Section */}
      <LiveDemo />

      {/* Capabilities Section */}
      <section className="py-20 bg-[#0A0B1E]">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-mono font-bold mb-4">
              Our <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">Core Capabilities</span>
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto font-mono">
              Specialized automation solutions designed specifically for field service B2B optimization.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {capabilities.map((capability, index) => (
              <div key={index} className="p-8 rounded-2xl bg-gradient-to-b from-cyan-500/10 to-transparent border border-cyan-500/20 hover:border-cyan-500/40 transition-all">
                <capability.icon className="w-16 h-16 text-cyan-400 mb-6" />
                <h3 className="text-2xl font-mono font-semibold mb-4">{capability.title}</h3>
                <p className="text-gray-400 font-mono mb-6">{capability.description}</p>
                <ul className="space-y-2">
                  {capability.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center text-gray-300 font-mono">
                      <CheckCircle className="w-4 h-4 text-cyan-400 mr-3 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Case Studies Section */}
      <section className="py-20 bg-gradient-to-b from-[#0A0B1E] to-[#0A0B1E]/80">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-mono font-bold mb-4">
              <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                Success Stories
              </span>
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto font-mono">
              Real results from field service businesses we've transformed with automation.
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {caseStudies.map((study, index) => (
              <div key={index} className="p-8 rounded-2xl bg-gradient-to-b from-cyan-500/5 to-transparent border border-cyan-500/20 hover:border-cyan-500/40 transition-all">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-mono font-semibold">{study.title}</h3>
                  <span className="text-sm text-cyan-400 font-mono">{study.industry}</span>
                </div>
                <p className="text-gray-400 font-mono mb-6">{study.description}</p>
                <div className="space-y-2">
                  {study.results.map((result, resultIndex) => (
                    <div key={resultIndex} className="flex items-center text-gray-300 font-mono">
                      <CheckCircle className="w-4 h-4 text-green-400 mr-3 flex-shrink-0" />
                      {result}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-b from-[#0A0B1E]/80 to-[#0A0B1E]">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-mono font-bold mb-6">Ready to See Your Business Transformed?</h2>
            <p className="text-gray-400 mb-8 font-mono">
              Let's discuss your specific needs and create a custom automation solution for your field service business.
            </p>
            <div className="flex gap-4 justify-center">
              <Link
                to="/consultation"
                className="font-mono bg-gradient-to-r from-cyan-500 to-blue-500 px-8 py-4 rounded-full text-lg font-semibold hover:shadow-lg hover:shadow-cyan-500/20 transition-all"
              >
                Book Free Consultation
              </Link>
              <Link
                to="/contact"
                className="font-mono border border-cyan-500/30 px-8 py-4 rounded-full text-lg font-semibold hover:bg-cyan-500/10 transition-all"
              >
                Get Custom Demo
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Demo; 