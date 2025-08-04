import React from 'react';
import { Link } from 'react-router-dom';
import { Bot, MessageSquare, Database, Calendar, CircuitBoard, Cpu, Network, CheckCircle, Zap, Users, BarChart3, Globe, Brain, Search, PhoneCall, MessageSquare as SocialIcon } from 'lucide-react';

const Services: React.FC = () => {
  const mainServices = [
    {
      icon: SocialIcon,
      title: "Online Reputation Management",
      description: "Comprehensive digital presence optimization and brand reputation enhancement",
      features: [
        "Website performance optimization",
        "Social media management",
        "Review monitoring & response",
        "Brand sentiment analysis",
        "Digital footprint management",
        "Reputation crisis management"
      ],
      benefits: ["Improve online visibility by 60%", "Enhance brand trust and credibility", "Protect and strengthen reputation"]
    },
    {
      icon: Users,
      title: "Lead Generation & CRM",
      description: "End-to-end lead capture, qualification, and customer relationship management",
      features: [
        "Lead scoring & qualification",
        "CRM system integration",
        "Automated follow-up sequences",
        "Conversion funnel optimization",
        "Customer lifecycle management",
        "Multi-channel lead capture"
      ],
      benefits: ["Increase lead quality by 40%", "Reduce manual follow-up by 70%", "Improve conversion rates"]
    },
    {
      icon: Bot,
      title: "Custom AI Chatbots",
      description: "Intelligent conversational AI trained specifically on your business data and processes",
      features: [
        "Custom AI training",
        "24/7 customer engagement",
        "Multi-channel deployment",
        "Business process integration",
        "Continuous learning & improvement",
        "Natural language processing"
      ],
      benefits: ["Reduce support costs by 60%", "Improve response time by 80%", "24/7 availability"]
    },
    {
      icon: BarChart3,
      title: "Data Analysis & Insights",
      description: "Advanced analytics and actionable business intelligence from your operational data",
      features: [
        "Performance analytics",
        "Predictive insights",
        "Business intelligence dashboards",
        "ROI tracking & optimization",
        "Strategic decision support",
        "Real-time reporting"
      ],
      benefits: ["Data-driven decisions", "Time-saving automation", "Performance insights"]
    },
    {
      icon: CircuitBoard,
      title: "Workflow Integrations",
      description: "Seamless automation and integration across your existing business systems and processes",
      features: [
        "System integration",
        "Process automation",
        "API connectivity",
        "Workflow optimization",
        "Scalable architecture",
        "Legacy system modernization"
      ],
      benefits: ["Increase efficiency by 50%", "Reduce manual errors", "Streamline operations"]
    }
  ];

  const testimonials = [
    {
      title: "Professional Services Firm",
      industry: "Legal Services",
      results: ["45% increase in lead quality", "30% improvement in online reputation", "Automated 70% of client inquiries"],
      description: "Implemented comprehensive digital presence optimization with lead generation automation and custom AI chatbots."
    },
    {
      title: "E-commerce Business",
      industry: "Online Retail",
      results: ["50% faster lead processing", "40% increase in conversion rates", "25% reduction in customer service costs"],
      description: "Deployed end-to-end automation strategy with CRM integration, data analytics, and workflow optimization."
    },
    {
      title: "Healthcare Practice",
      industry: "Medical Services",
      results: ["35% improvement in patient engagement", "Automated 80% of appointment scheduling", "Enhanced online reputation management"],
      description: "Integrated custom AI solutions with workflow automation and comprehensive digital presence management."
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
                AI Automation Services
              </span>
            </h1>
            <p className="text-xl text-gray-400 mb-8 font-mono">
              Transform your business operations with our comprehensive AI automation solutions including lead generation, social media management, custom chatbots, and more.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 max-w-4xl mx-auto mb-8">
              <div className="flex items-center justify-center bg-gradient-to-b from-cyan-500/10 to-transparent border border-cyan-500/20 rounded-xl p-4">
                <MessageSquare className="w-6 h-6 text-cyan-400 mr-2" />
                <span className="font-mono text-sm">Lead Generation</span>
              </div>
              <div className="flex items-center justify-center bg-gradient-to-b from-cyan-500/10 to-transparent border border-cyan-500/20 rounded-xl p-4">
                <Globe className="w-6 h-6 text-cyan-400 mr-2" />
                <span className="font-mono text-sm">Social Media</span>
              </div>
              <div className="flex items-center justify-center bg-gradient-to-b from-cyan-500/10 to-transparent border border-cyan-500/20 rounded-xl p-4">
                <Bot className="w-6 h-6 text-cyan-400 mr-2" />
                <span className="font-mono text-sm">Custom Chatbots</span>
              </div>
              <div className="flex items-center justify-center bg-gradient-to-b from-cyan-500/10 to-transparent border border-cyan-500/20 rounded-xl p-4">
                <CircuitBoard className="w-6 h-6 text-cyan-400 mr-2" />
                <span className="font-mono text-sm">Automation</span>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/consultation"
                className="font-mono bg-gradient-to-r from-cyan-500 to-blue-500 px-8 py-3 rounded-full text-lg font-semibold hover:shadow-lg hover:shadow-cyan-500/20 transition-all inline-block"
              >
                Get Started
              </Link>
              <Link
                to="/demo"
                className="font-mono border border-cyan-500/30 px-8 py-3 rounded-full text-lg font-semibold hover:bg-cyan-500/10 transition-all inline-block"
              >
                Request Demo
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 bg-[#0A0B1E]">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-mono font-bold mb-4">
              Our <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">Automation Solutions</span>
            </h2>
            <p className="text-gray-400 max-w-3xl mx-auto font-mono">
              Comprehensive AI-powered services designed to streamline your business operations and drive growth.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {mainServices.map((service, index) => (
              <div key={index} className="p-8 rounded-2xl bg-gradient-to-b from-cyan-500/10 to-transparent border border-cyan-500/20 hover:border-cyan-500/40 transition-all">
                <service.icon className="w-12 h-12 text-cyan-400 mb-6" />
                <h3 className="text-xl font-mono font-semibold mb-4">{service.title}</h3>
                <p className="text-gray-400 font-mono mb-6">{service.description}</p>
                
                <div className="mb-6">
                  <h4 className="font-mono font-semibold text-cyan-400 mb-3">Features:</h4>
                  <ul className="space-y-2">
                    {service.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start text-sm text-gray-300 font-mono">
                        <CheckCircle className="w-4 h-4 text-cyan-400 mr-2 mt-0.5 flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-mono font-semibold text-green-400 mb-3">Benefits:</h4>
                  <ul className="space-y-1">
                    {service.benefits.map((benefit, benefitIndex) => (
                      <li key={benefitIndex} className="flex items-center text-sm text-green-300 font-mono">
                        <Zap className="w-3 h-3 text-green-400 mr-2 flex-shrink-0" />
                        {benefit}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-gradient-to-b from-[#0A0B1E] to-[#0A0B1E]/80">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-mono font-bold mb-4">
              Success <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">Stories</span>
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto font-mono">
              See how our comprehensive automation solutions have transformed businesses across different industries.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="p-8 rounded-2xl bg-gradient-to-b from-cyan-500/10 to-transparent border border-cyan-500/20 hover:border-cyan-500/40 transition-all">
                <div className="mb-6">
                  <h3 className="text-xl font-mono font-semibold mb-2">{testimonial.title}</h3>
                  <p className="text-cyan-400 font-mono text-sm">{testimonial.industry}</p>
                </div>
                
                <p className="text-gray-400 font-mono mb-6 text-sm">{testimonial.description}</p>
                
                <div>
                  <h4 className="font-mono font-semibold text-green-400 mb-3">Results:</h4>
                  <ul className="space-y-2">
                    {testimonial.results.map((result, resultIndex) => (
                      <li key={resultIndex} className="flex items-start text-sm text-green-300 font-mono">
                        <CheckCircle className="w-4 h-4 text-green-400 mr-2 mt-0.5 flex-shrink-0" />
                        {result}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 bg-gradient-to-b from-[#0A0B1E] to-[#0A0B1E]/80">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-mono font-bold mb-4">
              Our <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">Implementation Process</span>
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto font-mono">
              A proven methodology to implement AI automation solutions that deliver results.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                step: "1",
                title: "Discovery & Analysis",
                description: "Understand your business needs and identify automation opportunities",
                icon: Search
              },
              {
                step: "2", 
                title: "Solution Design",
                description: "Create custom automation strategy tailored to your requirements",
                icon: Brain
              },
              {
                step: "3",
                title: "Development & Testing",
                description: "Build and thoroughly test your automation solutions",
                icon: CircuitBoard
              },
              {
                step: "4",
                title: "Deployment & Support",
                description: "Launch your solutions with ongoing support and optimization",
                icon: Network
              }
            ].map((step, index) => (
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

      {/* Demo CTA */}
      <section className="py-20 bg-[#0A0B1E]">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center bg-gradient-to-b from-cyan-500/10 to-transparent border border-cyan-500/20 rounded-2xl p-12">
            <h2 className="text-3xl font-mono font-bold mb-6">Want to See Our Solutions in Action?</h2>
            <p className="text-gray-400 mb-8 font-mono text-lg">
              Request a comprehensive demo package to see how our AI automation solutions can transform your business operations.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              <div className="flex items-center justify-center bg-gradient-to-b from-cyan-500/10 to-transparent border border-cyan-500/20 rounded-xl p-4">
                <Database className="w-6 h-6 text-cyan-400 mr-2" />
                <span className="font-mono text-sm">Custom Analysis</span>
              </div>
              <div className="flex items-center justify-center bg-gradient-to-b from-cyan-500/10 to-transparent border border-cyan-500/20 rounded-xl p-4">
                <Bot className="w-6 h-6 text-cyan-400 mr-2" />
                <span className="font-mono text-sm">Live Demo</span>
              </div>
              <div className="flex items-center justify-center bg-gradient-to-b from-cyan-500/10 to-transparent border border-cyan-500/20 rounded-xl p-4">
                <PhoneCall className="w-6 h-6 text-cyan-400 mr-2" />
                <span className="font-mono text-sm">Strategy Session</span>
              </div>
            </div>
            
            <Link
              to="/demo"
              className="font-mono bg-gradient-to-r from-cyan-500 to-blue-500 px-8 py-4 rounded-full text-lg font-semibold hover:shadow-lg hover:shadow-cyan-500/20 transition-all inline-block"
            >
              Request Demo Package
            </Link>
          </div>
        </div>
      </section>

      {/* Industries Section */}
      <section className="py-20 bg-gradient-to-b from-[#0A0B1E]/80 to-[#0A0B1E]">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-mono font-bold mb-4">
              Industries We <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">Serve</span>
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto font-mono">
              Our AI automation solutions work across all industries, customized for your specific business needs.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {[
              "SaaS & Technology", "E-commerce & Retail", "Healthcare", "Financial Services", "Real Estate", 
              "Professional Services", "Education", "Manufacturing", "Marketing Agencies", "Consulting"
            ].map((industry, index) => (
              <div key={index} className="text-center p-4 rounded-xl bg-gradient-to-b from-cyan-500/5 to-transparent border border-cyan-500/20 hover:border-cyan-500/40 transition-all">
                <span className="font-mono text-sm text-gray-300">{industry}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-b from-[#0A0B1E] to-[#0A0B1E]/80">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-mono font-bold mb-6">Ready to Automate Your Business?</h2>
            <p className="text-gray-400 mb-8 font-mono">
              Let's discuss how our AI automation services can streamline your operations and drive growth.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/consultation"
                className="font-mono bg-gradient-to-r from-cyan-500 to-blue-500 px-8 py-4 rounded-full text-lg font-semibold hover:shadow-lg hover:shadow-cyan-500/20 transition-all"
              >
                Get Started Today
              </Link>
              <Link
                to="/demo"
                className="font-mono border border-cyan-500/30 px-8 py-4 rounded-full text-lg font-semibold hover:bg-cyan-500/10 transition-all"
              >
                Request Demo
              </Link>
            </div>
            
            <p className="text-sm text-cyan-400 font-mono mt-6">
              ✓ Free consultation ✓ Custom solutions ✓ Expert support ✓ Proven results
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Services; 