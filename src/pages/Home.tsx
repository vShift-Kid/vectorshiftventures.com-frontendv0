import React from 'react';
import { Link } from 'react-router-dom';
import { Bot, MessageSquare, Database, Calendar, CircuitBoard, Cpu, Network, FileText, PhoneCall, Brain, Search, Users, BarChart3, Globe, Zap } from 'lucide-react';

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
                AI-Powered
                <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent"> Technical Solutions</span>
              </h1>
            </div>
            <p className="text-xl text-gray-400 mb-8 font-mono">
              Advanced AI automation for Field Service, Engineering, Logistics, IT Operations, and Technical Teams. Streamline complex workflows, automate technical documentation, optimize operations, and enhance customer support with intelligent automation across all technical domains.
            </p>
            
            <div className="flex gap-4 flex-wrap">
              <Link
                to="/services"
                className="font-mono bg-gradient-to-r from-cyan-500 to-blue-500 px-8 py-3 rounded-full text-lg font-semibold hover:shadow-lg hover:shadow-cyan-500/20 transition-all focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-offset-2 focus:ring-offset-[#0A0B1E]"
                aria-label="Explore our automation services"
              >
                Explore Services
              </Link>
              <Link
                to="/demo"
                className="font-mono border border-cyan-500/30 px-8 py-3 rounded-full text-lg font-semibold hover:bg-cyan-500/10 transition-all focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-offset-2 focus:ring-offset-[#0A0B1E]"
                aria-label="Request a custom demo"
              >
                Request Demo
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Main Services */}
      <section className="py-20 bg-[#0A0B1E]" aria-labelledby="services-heading">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 id="services-heading" className="text-3xl font-mono font-bold mb-4">
              Comprehensive <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">Technical Solutions</span>
            </h2>
            <p className="text-gray-400 max-w-3xl mx-auto font-mono">
              Advanced AI automation solutions spanning Field Service, Engineering, Logistics, IT Operations, and Technical Teams across all industries.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8" role="list">
            {[
              { icon: CircuitBoard, title: "Field Service AI", description: "Voice assistants and automation for field technicians and service operations" },
              { icon: Cpu, title: "Engineering Solutions", description: "AI-powered technical documentation, CAD integration, and engineering workflow automation" },
              { icon: Network, title: "Logistics & Supply Chain", description: "Intelligent routing, inventory management, and supply chain optimization" },
              { icon: Database, title: "IT Operations", description: "Automated IT support, system monitoring, and technical troubleshooting" },
              { icon: FileText, title: "Technical Documentation", description: "AI-generated technical docs, manuals, and knowledge base automation" },
              { icon: Users, title: "Customer Support", description: "Intelligent customer care and technical support automation" },
              { icon: BarChart3, title: "Analytics & Reporting", description: "Automated quality monitoring, reporting, and performance analytics" },
              { icon: Calendar, title: "Project Management", description: "AI-driven project tracking, resource allocation, and timeline optimization" }
            ].map((service, index) => (
              <article 
                key={index} 
                className="p-6 rounded-2xl bg-gradient-to-b from-cyan-500/10 to-transparent border border-cyan-500/20 hover:border-cyan-500/40 transition-all group"
                role="listitem"
              >
                <service.icon className="w-12 h-12 text-cyan-400 mb-4 group-hover:scale-110 transition-transform" aria-hidden="true" />
                <h3 className="text-lg font-mono font-semibold mb-2">{service.title}</h3>
                <p className="text-gray-400 font-mono text-sm">{service.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Key Features */}
      <section className="py-20 bg-gradient-to-b from-[#0A0B1E] to-[#0A0B1E]/80" aria-labelledby="features-heading">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 id="features-heading" className="text-3xl font-mono font-bold mb-4">
              Built for
              <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent"> Technical Excellence</span>
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto font-mono">
              Advanced AI solutions designed for technical teams across all industries - from field service to engineering, logistics to IT operations.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" role="list">
            {[
              { 
                icon: Brain, 
                title: "Multi-Industry AI", 
                description: "AI trained on diverse technical data across field service, engineering, logistics, and IT operations",
                features: ["Field Service Intelligence", "Engineering Automation", "Logistics Optimization", "IT Operations AI"]
              },
              { 
                icon: Zap, 
                title: "Technical-Ready Solutions", 
                description: "Mobile-optimized AI tools that work across all technical environments and industries",
                features: ["Mobile Voice Assistants", "Cross-Platform Support", "Real-Time Data Processing"]
              },
              { 
                icon: Network, 
                title: "Universal Integration", 
                description: "Seamless integration with technical tools, systems, and workflows across all industries",
                features: ["CAD Integration", "ERP Systems", "Technical Documentation", "Analytics Platforms"]
              }
            ].map((feature, index) => (
              <article 
                key={index} 
                className="p-8 rounded-2xl bg-gradient-to-b from-cyan-500/5 to-transparent border border-cyan-500/20 hover:border-cyan-500/40 transition-all"
                role="listitem"
              >
                <feature.icon className="w-12 h-12 text-cyan-400 mb-4" aria-hidden="true" />
                <h3 className="text-xl font-mono font-semibold mb-3">{feature.title}</h3>
                <p className="text-gray-400 font-mono mb-4">{feature.description}</p>
                <ul className="space-y-2">
                  {feature.features.map((item, itemIndex) => (
                    <li key={itemIndex} className="flex items-center text-sm text-gray-300 font-mono">
                      <div className="w-2 h-2 bg-cyan-400 rounded-full mr-3 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Demo CTA */}
      <section className="py-20 bg-[#0A0B1E]" aria-labelledby="demo-heading">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center bg-gradient-to-b from-cyan-500/10 to-transparent border border-cyan-500/20 rounded-2xl p-12">
            <h2 id="demo-heading" className="text-3xl font-mono font-bold mb-6">
              Ready to Transform Your Technical Operations?
            </h2>
            <p className="text-gray-400 mb-8 font-mono text-lg">
              Get a personalized demo showcasing AI solutions for your field service, engineering, logistics, IT operations, or technical teams - complete with custom proposal and live testing.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              <div className="flex items-center justify-center bg-gradient-to-b from-cyan-500/10 to-transparent border border-cyan-500/20 rounded-xl p-4">
                <FileText className="w-6 h-6 text-cyan-400 mr-2" />
                <span className="font-mono text-sm">Custom Proposal</span>
              </div>
              <div className="flex items-center justify-center bg-gradient-to-b from-cyan-500/10 to-transparent border border-cyan-500/20 rounded-xl p-4">
                <Bot className="w-6 h-6 text-cyan-400 mr-2" />
                <span className="font-mono text-sm">Demo Agent</span>
              </div>
              <div className="flex items-center justify-center bg-gradient-to-b from-cyan-500/10 to-transparent border border-cyan-500/20 rounded-xl p-4">
                <PhoneCall className="w-6 h-6 text-cyan-400 mr-2" />
                <span className="font-mono text-sm">Phone Agent</span>
              </div>
            </div>
            
            <Link
              to="/demo"
              className="font-mono bg-gradient-to-r from-cyan-500 to-blue-500 px-8 py-4 rounded-full text-lg font-semibold hover:shadow-lg hover:shadow-cyan-500/20 transition-all inline-block focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-offset-2 focus:ring-offset-[#0A0B1E]"
              aria-label="Request your custom demo package"
            >
              Request Demo Package
            </Link>
          </div>
        </div>
      </section>

      {/* Trust Signals Section */}
      <section className="py-20 bg-gradient-to-b from-[#0A0B1E] to-[#0A0B1E]/80" aria-labelledby="trust-heading">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 id="trust-heading" className="text-3xl font-mono font-bold mb-4">
              Trusted by <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">500+ Technical Teams</span>
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto font-mono">
              Join industry leaders across field service, engineering, logistics, and IT operations who have transformed their technical workflows with our AI automation solutions.
            </p>
          </div>

          {/* Customer Logos */}
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8 mb-16">
            {[
              "Manufacturing Corp", "Energy Solutions", "Healthcare Systems", 
              "Construction Group", "Logistics Pro", "Utilities Co"
            ].map((company, index) => (
              <div key={index} className="flex items-center justify-center p-4 bg-gray-800/30 rounded-lg border border-cyan-500/20 hover:border-cyan-500/40 transition-all">
                <span className="font-mono text-sm text-gray-300">{company}</span>
              </div>
            ))}
          </div>

          {/* Testimonials */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {[
              {
                name: "Sarah Johnson",
                title: "Operations Director",
                company: "Manufacturing Corp",
                quote: "Vector Shift Ventures transformed our field service operations. We've seen a 60% reduction in response time and 40% increase in customer satisfaction.",
                results: ["60% faster response", "40% higher satisfaction", "50% cost reduction"]
              },
              {
                name: "Mike Chen",
                title: "Service Manager", 
                company: "Energy Solutions",
                quote: "The AI automation system has revolutionized how we handle customer inquiries and dispatch technicians. It's like having a 24/7 expert assistant.",
                results: ["24/7 availability", "80% automation", "35% efficiency gain"]
              },
              {
                name: "Lisa Rodriguez",
                title: "VP of Operations",
                company: "Healthcare Systems", 
                quote: "Our field service team is now more efficient than ever. The AI-powered insights help us predict maintenance needs before they become problems.",
                results: ["Predictive maintenance", "90% uptime", "25% fewer emergencies"]
              }
            ].map((testimonial, index) => (
              <div key={index} className="p-6 bg-gradient-to-b from-cyan-500/10 to-transparent border border-cyan-500/20 rounded-xl hover:border-cyan-500/40 transition-all">
                <div className="mb-4">
                  <p className="text-gray-300 font-mono text-sm mb-4">"{testimonial.quote}"</p>
                  <div className="space-y-1">
                    {testimonial.results.map((result, resultIndex) => (
                      <div key={resultIndex} className="flex items-center text-xs text-green-400 font-mono">
                        <div className="w-2 h-2 bg-green-400 rounded-full mr-2"></div>
                        {result}
                      </div>
                    ))}
                  </div>
                </div>
                <div className="border-t border-cyan-500/20 pt-4">
                  <p className="font-mono font-semibold text-cyan-300">{testimonial.name}</p>
                  <p className="font-mono text-sm text-gray-400">{testimonial.title}</p>
                  <p className="font-mono text-sm text-gray-500">{testimonial.company}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { number: "500+", label: "Companies Served" },
              { number: "60%", label: "Average Cost Reduction" },
              { number: "24/7", label: "AI Availability" },
              { number: "99%", label: "Customer Satisfaction" }
            ].map((stat, index) => (
              <div key={index} className="p-6 bg-gradient-to-b from-cyan-500/5 to-transparent border border-cyan-500/20 rounded-xl">
                <div className="text-3xl font-mono font-bold text-cyan-400 mb-2">{stat.number}</div>
                <div className="text-sm font-mono text-gray-300">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-b from-[#0A0B1E]/80 to-[#0A0B1E]" aria-labelledby="cta-heading">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h2 id="cta-heading" className="text-3xl font-mono font-bold mb-6">Ready to Transform Your Technical Operations?</h2>
            <p className="text-gray-400 mb-8 font-mono">
              Let's discuss how our AI automation solutions can streamline your technical workflows, optimize operations, and drive growth across all industries.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6">
              <Link
                to="/consultation"
                className="font-mono bg-gradient-to-r from-cyan-500 to-blue-500 px-8 py-4 rounded-full text-lg font-semibold hover:shadow-lg hover:shadow-cyan-500/20 transition-all focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-offset-2 focus:ring-offset-[#0A0B1E]"
                aria-label="Schedule a consultation to discuss your needs"
              >
                Get Started Today
              </Link>
              <Link
                to="/services"
                className="font-mono border border-cyan-500/30 px-8 py-4 rounded-full text-lg font-semibold hover:bg-cyan-500/10 transition-all focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-offset-2 focus:ring-offset-[#0A0B1E]"
                aria-label="Learn more about our services"
              >
                View All Services
              </Link>
            </div>
            
            <p className="text-sm text-cyan-400 font-mono">
              ✓ Free consultation ✓ Custom solutions ✓ Expert support ✓ Proven results
            </p>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Home; 