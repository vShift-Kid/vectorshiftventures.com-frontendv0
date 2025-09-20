import React from 'react';
import { Link } from 'react-router-dom';
import { Bot, MessageSquare, Database, Calendar, CircuitBoard, Cpu, Network, FileText, PhoneCall, Brain, Search, Users, BarChart3, Globe, Zap } from 'lucide-react';

const Home: React.FC = () => {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
      {/* Hero Section */}
      <section className="pt-32 pb-20 relative overflow-hidden" aria-labelledby="hero-heading">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-500/15 via-green-500/10 to-transparent" />
        <div className="container mx-auto px-6 relative">
          <div className="max-w-3xl">
            <div className="overflow-hidden">
              <h1 
                id="hero-heading"
                className="font-mono text-5xl font-bold mb-6 leading-tight"
              >
                AI-Powered
                <span className="bg-gradient-to-r from-blue-400 via-green-400 to-blue-500 bg-clip-text text-transparent"> Technical Solutions</span>
              </h1>
            </div>
            <p className="text-xl text-slate-300 mb-8 font-mono">
              Advanced AI automation for Field Service, Engineering, Logistics, IT Operations, and Technical Teams. Streamline complex workflows, automate technical documentation, optimize operations, and enhance customer support with intelligent automation across all technical domains.
            </p>
            
            <div className="flex gap-4 flex-wrap">
              <Link
                to="/services"
                className="font-mono bg-gradient-to-r from-blue-500 to-green-500 px-8 py-3 rounded-full text-lg font-semibold hover:shadow-lg hover:shadow-blue-500/20 transition-all focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-slate-900"
                aria-label="Explore our automation services"
              >
                Explore Services
              </Link>
              <Link
                to="/demo"
                className="font-mono border border-slate-400/50 px-8 py-3 rounded-full text-lg font-semibold hover:bg-slate-400/10 transition-all focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-900"
                aria-label="Request a custom demo"
              >
                Request Demo
              </Link>
            </div>
            
            {/* Subtle Innovation Badge */}
            <div className="mt-8 flex items-center justify-center">
              <div className="bg-slate-800/30 border border-slate-400/20 rounded-full px-4 py-1">
                <span className="text-slate-400 font-mono text-xs">
                  Trusted by technical teams worldwide
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Services */}
      <section className="py-20 bg-gradient-to-b from-slate-800 to-slate-900" aria-labelledby="services-heading">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 id="services-heading" className="text-3xl font-mono font-bold mb-4">
              Comprehensive <span className="bg-gradient-to-r from-blue-400 via-green-400 to-blue-500 bg-clip-text text-transparent">Technical Solutions</span>
            </h2>
            <p className="text-slate-300 max-w-3xl mx-auto font-mono">
              Advanced AI automation solutions spanning Field Service, Engineering, Logistics, IT Operations, and Technical Teams across all industries.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8" role="list">
            {[
              { icon: CircuitBoard, title: "Field Service AI", description: "Voice assistants and automation for field technicians and service operations", subtleNumber: "2" },
              { icon: Cpu, title: "Engineering Solutions", description: "AI-powered technical documentation, CAD integration, and engineering workflow automation", subtleNumber: "7" },
              { icon: Network, title: "Logistics & Supply Chain", description: "Intelligent routing, inventory management, and supply chain optimization", subtleNumber: "11" },
              { icon: Database, title: "IT Operations", description: "Automated IT support, system monitoring, and technical troubleshooting", subtleNumber: "18" },
              { icon: FileText, title: "Technical Documentation", description: "AI-generated technical docs, manuals, and knowledge base automation", subtleNumber: "20" },
              { icon: Users, title: "Customer Support", description: "Intelligent customer care and technical support automation", subtleNumber: "29" },
              { icon: BarChart3, title: "Analytics & Reporting", description: "Automated quality monitoring, reporting, and performance analytics", subtleNumber: "2" },
              { icon: Calendar, title: "Project Management", description: "AI-driven project tracking, resource allocation, and timeline optimization", subtleNumber: "7" }
            ].map((service, index) => (
              <article 
                key={index} 
                className="p-6 rounded-2xl bg-gradient-to-b from-blue-500/10 via-green-500/5 to-transparent border border-slate-400/20 hover:border-blue-400/40 transition-all group relative"
                role="listitem"
              >
                <service.icon className="w-12 h-12 text-blue-400 mb-4 group-hover:scale-110 transition-transform" aria-hidden="true" />
                <h3 className="text-lg font-mono font-semibold mb-2 text-white">{service.title}</h3>
                <p className="text-slate-300 font-mono text-sm">{service.description}</p>
                {/* Subtle lucky number */}
                <div className="absolute top-2 right-2 text-slate-600 font-mono text-xs opacity-30">
                  {service.subtleNumber}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Key Features */}
      <section className="py-20 bg-gradient-to-b from-slate-900 to-slate-800" aria-labelledby="features-heading">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 id="features-heading" className="text-3xl font-mono font-bold mb-4">
              Built for
              <span className="bg-gradient-to-r from-blue-400 via-green-400 to-blue-500 bg-clip-text text-transparent"> Technical Excellence</span>
            </h2>
            <p className="text-slate-300 max-w-2xl mx-auto font-mono">
              Advanced AI solutions designed for technical teams across all industries - from field service to engineering, logistics to IT operations.
            </p>
            
            {/* Subtle capabilities indicator */}
            <div className="mt-6 flex items-center justify-center">
              <div className="bg-slate-800/20 border border-slate-400/10 rounded-full px-4 py-1">
                <span className="text-slate-500 font-mono text-xs">
                  Advanced AI capabilities
                </span>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" role="list">
            {[
              { 
                icon: Brain, 
                title: "Multi-Industry AI", 
                description: "AI trained on diverse technical data across field service, engineering, logistics, and IT operations",
                features: ["Field Service Intelligence", "Engineering Automation", "Logistics Optimization", "IT Operations AI"],
                subtleNumber: "11"
              },
              { 
                icon: Zap, 
                title: "Technical-Ready Solutions", 
                description: "Mobile-optimized AI tools that work across all technical environments and industries",
                features: ["Mobile Voice Assistants", "Cross-Platform Support", "Real-Time Data Processing"],
                subtleNumber: "18"
              },
              { 
                icon: Network, 
                title: "Universal Integration", 
                description: "Seamless integration with technical tools, systems, and workflows across all industries",
                features: ["CAD Integration", "ERP Systems", "Technical Documentation", "Analytics Platforms"],
                subtleNumber: "20"
              }
            ].map((feature, index) => (
              <article 
                key={index} 
                className="p-8 rounded-2xl bg-gradient-to-b from-blue-500/5 via-green-500/5 to-transparent border border-slate-400/20 hover:border-blue-400/40 transition-all relative"
                role="listitem"
              >
                <feature.icon className="w-12 h-12 text-blue-400 mb-4" aria-hidden="true" />
                <h3 className="text-xl font-mono font-semibold mb-3 text-white">{feature.title}</h3>
                <p className="text-slate-300 font-mono mb-4">{feature.description}</p>
                <ul className="space-y-2">
                  {feature.features.map((item, itemIndex) => (
                    <li key={itemIndex} className="flex items-center text-sm text-slate-200 font-mono">
                      <div className="w-2 h-2 bg-green-400 rounded-full mr-3 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
                {/* Subtle lucky number */}
                <div className="absolute top-3 right-3 text-slate-600 font-mono text-xs opacity-20">
                  {feature.subtleNumber}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Demo CTA */}
      <section className="py-20 bg-gradient-to-b from-slate-800 to-slate-900" aria-labelledby="demo-heading">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center bg-gradient-to-b from-blue-500/10 via-green-500/5 to-transparent border border-slate-400/20 rounded-2xl p-12">
            <h2 id="demo-heading" className="text-3xl font-mono font-bold mb-6">
              Ready to Transform Your Technical Operations?
            </h2>
            <p className="text-slate-300 mb-8 font-mono text-lg">
              Get a personalized demo showcasing AI solutions for your field service, engineering, logistics, IT operations, or technical teams - complete with custom proposal and live testing.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              <div className="flex items-center justify-center bg-gradient-to-b from-blue-500/10 to-transparent border border-slate-400/20 rounded-xl p-4">
                <FileText className="w-6 h-6 text-blue-400 mr-2" />
                <span className="font-mono text-sm text-white">Custom Proposal</span>
              </div>
              <div className="flex items-center justify-center bg-gradient-to-b from-green-500/10 to-transparent border border-slate-400/20 rounded-xl p-4">
                <Bot className="w-6 h-6 text-green-400 mr-2" />
                <span className="font-mono text-sm text-white">Demo Agent</span>
              </div>
              <div className="flex items-center justify-center bg-gradient-to-b from-blue-500/10 to-transparent border border-slate-400/20 rounded-xl p-4">
                <PhoneCall className="w-6 h-6 text-blue-400 mr-2" />
                <span className="font-mono text-sm text-white">Phone Agent</span>
              </div>
            </div>
            
            {/* Subtle trial indicator */}
            <div className="mb-8 flex items-center justify-center">
              <div className="bg-slate-800/20 border border-slate-400/10 rounded-full px-4 py-1">
                <span className="text-slate-500 font-mono text-xs">
                  Free trial available
                </span>
              </div>
            </div>
            
            <Link
              to="/demo"
              className="font-mono bg-gradient-to-r from-blue-500 to-green-500 px-8 py-4 rounded-full text-lg font-semibold hover:shadow-lg hover:shadow-blue-500/20 transition-all inline-block focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-slate-900"
              aria-label="Request your custom demo package"
            >
              Request Demo Package
            </Link>
          </div>
        </div>
      </section>

      {/* Trust Signals Section */}
      <section className="py-20 bg-gradient-to-b from-slate-900 to-slate-800" aria-labelledby="trust-heading">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 id="trust-heading" className="text-3xl font-mono font-bold mb-4">
              Ready to <span className="bg-gradient-to-r from-blue-400 via-green-400 to-blue-500 bg-clip-text text-transparent">Transform Your Operations?</span>
            </h2>
            <p className="text-slate-300 max-w-2xl mx-auto font-mono">
              Join the growing number of technical teams across field service, engineering, logistics, and IT operations who are discovering the power of AI automation solutions.
            </p>
            
            {/* Subtle trust indicator */}
            <div className="mt-6 flex items-center justify-center">
              <div className="bg-slate-800/20 border border-slate-400/10 rounded-full px-4 py-1">
                <span className="text-slate-500 font-mono text-xs">
                  Trusted across industries
                </span>
              </div>
            </div>
          </div>

          {/* Industry Focus */}
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8 mb-16">
            {[
              { name: "Manufacturing", subtleNumber: "20" },
              { name: "Energy", subtleNumber: "29" },
              { name: "Healthcare", subtleNumber: "2" },
              { name: "Construction", subtleNumber: "7" },
              { name: "Logistics", subtleNumber: "11" },
              { name: "Utilities", subtleNumber: "18" },
              { name: "HR", subtleNumber: "20" },
              { name: "Legal", subtleNumber: "29" },
              { name: "IT", subtleNumber: "2" },
              { name: "Engineering", subtleNumber: "7" }
            ].map((industry, index) => (
              <div key={index} className="flex items-center justify-center p-4 bg-slate-800/30 rounded-lg border border-slate-400/20 hover:border-blue-400/40 transition-all relative">
                <span className="font-mono text-sm text-slate-300">{industry.name}</span>
                {/* Subtle lucky number */}
                <div className="absolute top-1 right-1 text-slate-600 font-mono text-xs opacity-15">
                  {industry.subtleNumber}
                </div>
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
              <div key={index} className="p-6 bg-gradient-to-b from-blue-500/10 via-green-500/5 to-transparent border border-slate-400/20 rounded-xl hover:border-blue-400/40 transition-all">
                <div className="mb-4">
                  <p className="text-slate-200 font-mono text-sm mb-4">"{testimonial.quote}"</p>
                  <div className="space-y-1">
                    {testimonial.results.map((result, resultIndex) => (
                      <div key={resultIndex} className="flex items-center text-xs text-green-400 font-mono">
                        <div className="w-2 h-2 bg-green-400 rounded-full mr-2"></div>
                        {result}
                      </div>
                    ))}
                  </div>
                </div>
                <div className="border-t border-slate-400/20 pt-4">
                  <p className="font-mono font-semibold text-blue-300">{testimonial.name}</p>
                  <p className="font-mono text-sm text-slate-300">{testimonial.title}</p>
                  <p className="font-mono text-sm text-slate-400">{testimonial.company}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { number: "100%", label: "AI-Powered Solutions", subtleNumber: "2" },
              { number: "24/7", label: "AI Availability", subtleNumber: "7" },
              { number: "11+", label: "Core Industries", subtleNumber: "11" },
              { number: "Custom", label: "Solutions", subtleNumber: "18" }
            ].map((stat, index) => (
              <div key={index} className="p-6 bg-gradient-to-b from-blue-500/5 via-green-500/5 to-transparent border border-slate-400/20 rounded-xl relative">
                <div className="text-3xl font-mono font-bold text-blue-400 mb-2">{stat.number}</div>
                <div className="text-sm font-mono text-slate-300">{stat.label}</div>
                {/* Subtle lucky number */}
                <div className="absolute top-2 right-2 text-slate-600 font-mono text-xs opacity-20">
                  {stat.subtleNumber}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-b from-slate-800 to-slate-900" aria-labelledby="cta-heading">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h2 id="cta-heading" className="text-3xl font-mono font-bold mb-6">Ready to Transform Your Technical Operations?</h2>
            <p className="text-slate-300 mb-8 font-mono">
              Let's discuss how our AI automation solutions can streamline your technical workflows, optimize operations, and drive growth across all industries.
            </p>
            
            {/* Subtle process indicator */}
            <div className="mb-8 flex items-center justify-center">
              <div className="bg-slate-800/20 border border-slate-400/10 rounded-full px-4 py-1">
                <span className="text-slate-500 font-mono text-xs">
                  Streamlined implementation process
                </span>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6">
              <Link
                to="/consultation"
                className="font-mono bg-gradient-to-r from-blue-500 to-green-500 px-8 py-4 rounded-full text-lg font-semibold hover:shadow-lg hover:shadow-blue-500/20 transition-all focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-slate-900"
                aria-label="Schedule a consultation to discuss your needs"
              >
                Get Started Today
              </Link>
              <Link
                to="/services"
                className="font-mono border border-slate-400/50 px-8 py-4 rounded-full text-lg font-semibold hover:bg-slate-400/10 transition-all focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-900"
                aria-label="Learn more about our services"
              >
                View All Services
              </Link>
            </div>
            
            <p className="text-sm text-blue-400 font-mono">
              ✓ Free consultation ✓ Custom solutions ✓ Expert support ✓ Proven results
            </p>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Home; 