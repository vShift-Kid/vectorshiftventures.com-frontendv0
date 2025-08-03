import React from 'react';
import { Link } from 'react-router-dom';
import { Bot, MessageSquare, Database, Calendar, CircuitBoard, Cpu, Network, CheckCircle, Zap, Users, BarChart3, FileText, PhoneCall, Brain, Search } from 'lucide-react';

const Services: React.FC = () => {
  const mainServices = [
    {
      icon: FileText,
      title: "Custom Demo Proposal",
      description: "Comprehensive analysis and tailored automation strategy demo for your business",
      features: [
        "In-depth business and industry research",
        "Custom automation roadmap demonstration",
        "ROI projections and cost analysis demo",
        "Implementation timeline showcase",
        "Competitive analysis overview",
        "Risk assessment and mitigation demo"
      ],
      benefits: ["Test data-driven strategy", "See clear implementation path", "Evaluate measurable outcomes"],
      highlighted: true
    },
    {
      icon: Brain,
      title: "Research-Based Demo Agent",
      description: "AI demo agent trained extensively on your business, industry, and market specifics for testing",
      features: [
        "Business-specific knowledge base demo",
        "Industry expertise and trends showcase",
        "Product/service deep knowledge demo",
        "Customer interaction scenario testing",
        "Real-time learning capabilities demo",
        "Multi-channel integration showcase"
      ],
      benefits: ["Test intelligent interactions", "Experience consistent messaging", "Try 24/7 availability"],
      highlighted: true
    },
    {
      icon: PhoneCall,
      title: "Demo Phone Caller Agent",
      description: "Automated phone demo system that showcases how AI can handle customer inquiries with business expertise",
      features: [
        "Natural voice synthesis demonstration",
        "Business-specific responses showcase",
        "Call routing and escalation demo",
        "Appointment scheduling demonstration",
        "Lead qualification showcase",
        "Call analytics and reporting demo"
      ],
      benefits: ["Test call handling", "Experience professional service", "See lead capture in action"],
      highlighted: true
    }
  ];

  const additionalServices = [
    {
      icon: Bot,
      title: "AI Chat Automation",
      description: "Intelligent customer support agents that handle inquiries 24/7",
      features: [
        "Natural language processing",
        "Multi-language support", 
        "Integration with CRM systems",
        "Custom response training",
        "Analytics and reporting"
      ],
      benefits: ["Reduce support costs by 60%", "Improve response time by 80%", "24/7 customer availability"]
    },
    {
      icon: MessageSquare,
      title: "Lead Generation Systems",
      description: "Automated lead capture and qualification workflows",
      features: [
        "Web form automation",
        "Lead scoring algorithms",
        "CRM integration",
        "Follow-up sequences",
        "Conversion tracking"
      ],
      benefits: ["Increase lead quality by 40%", "Reduce manual follow-up by 70%", "Improve conversion rates"]
    },
    {
      icon: Database,
      title: "Data Processing & CRM",
      description: "Streamlined data management and customer relationship automation",
      features: [
        "Data validation and cleaning",
        "Automated data entry",
        "Report generation",
        "Real-time sync",
        "Custom dashboards"
      ],
      benefits: ["Eliminate data entry errors", "Save 15+ hours per week", "Real-time business insights"]
    },
    {
      icon: CircuitBoard,
      title: "Workflow Automation",
      description: "Custom automation solutions for field service operations",
      features: [
        "Process mapping",
        "Automated task routing",
        "Notification systems",
        "Performance tracking",
        "Integration capabilities"
      ],
      benefits: ["Increase efficiency by 50%", "Reduce manual errors", "Streamline operations"]
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
                Test Our AI Automation with a Complete Demo Package
              </span>
            </h1>
            <p className="text-xl text-gray-400 mb-8 font-mono">
              Request a demo and get a complete AI automation package including custom proposal, demo agent with research knowledge, and phone caller agent - all built specifically for your business to test and evaluate.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-3xl mx-auto mb-8">
              <div className="flex items-center justify-center bg-gradient-to-b from-cyan-500/10 to-transparent border border-cyan-500/20 rounded-xl p-4">
                <Search className="w-6 h-6 text-cyan-400 mr-2" />
                <span className="font-mono text-sm">Research-Based Demo</span>
              </div>
              <div className="flex items-center justify-center bg-gradient-to-b from-cyan-500/10 to-transparent border border-cyan-500/20 rounded-xl p-4">
                <Brain className="w-6 h-6 text-cyan-400 mr-2" />
                <span className="font-mono text-sm">AI-Powered Testing</span>
              </div>
              <div className="flex items-center justify-center bg-gradient-to-b from-cyan-500/10 to-transparent border border-cyan-500/20 rounded-xl p-4">
                <Zap className="w-6 h-6 text-cyan-400 mr-2" />
                <span className="font-mono text-sm">Business-Specific Demo</span>
              </div>
            </div>
            
            <Link
              to="/consultation"
              className="font-mono bg-gradient-to-r from-cyan-500 to-blue-500 px-8 py-3 rounded-full text-lg font-semibold hover:shadow-lg hover:shadow-cyan-500/20 transition-all inline-block"
            >
              Request Demo Package
            </Link>
          </div>
        </div>
      </section>

      {/* Main Services */}
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

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-20">
            {mainServices.map((service, index) => (
              <div key={index} className="relative">
                {service.highlighted && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white px-4 py-1 rounded-full text-sm font-mono font-semibold">
                      Demo Included
                    </span>
                  </div>
                )}
                <div className="p-8 rounded-2xl bg-gradient-to-b from-cyan-500/10 to-transparent border border-cyan-400 shadow-lg shadow-cyan-500/20 h-full">
                  <service.icon className="w-16 h-16 text-cyan-400 mb-6" />
                  <h3 className="text-2xl font-mono font-semibold mb-4">{service.title}</h3>
                  <p className="text-gray-400 font-mono mb-6">{service.description}</p>
                  
                  <div className="mb-6">
                    <h4 className="font-mono font-semibold text-cyan-400 mb-3">Key Features:</h4>
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
              Our <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">Demo Development Process</span>
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto font-mono">
              We conduct extensive research on your business and industry to create truly customized demo packages for you to test.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
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
                icon: BarChart3
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

      {/* Additional Services */}
      <section className="py-20 bg-[#0A0B1E]">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-mono font-bold mb-4">
              Production <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">Automation Services</span>
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto font-mono">
              After testing our demo package, implement these production-ready automation services for your business.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {additionalServices.map((service, index) => (
              <div key={index} className="p-8 rounded-2xl bg-gradient-to-b from-cyan-500/5 to-transparent border border-cyan-500/20 hover:border-cyan-500/40 transition-all">
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

      {/* Industries Section */}
      <section className="py-20 bg-gradient-to-b from-[#0A0B1E]/80 to-[#0A0B1E]">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-mono font-bold mb-4">
              Industry <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">Expertise</span>
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto font-mono">
              Our research-based approach works across all industries. We customize every solution based on your specific market and business model.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {[
              "HVAC", "Plumbing", "Electrical", "Landscaping", "Cleaning", 
              "Pest Control", "Roofing", "Security", "Maintenance", "General Field Service"
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
            <h2 className="text-3xl font-mono font-bold mb-6">Ready to Test Our AI Automation?</h2>
            <p className="text-gray-400 mb-8 font-mono">
              Request your complete demo package - custom proposal, demo agent with research knowledge, and phone caller agent - all built specifically for your business to test and evaluate.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/consultation"
                className="font-mono bg-gradient-to-r from-cyan-500 to-blue-500 px-8 py-4 rounded-full text-lg font-semibold hover:shadow-lg hover:shadow-cyan-500/20 transition-all"
              >
                Request Demo Package
              </Link>
              <Link
                to="/demo"
                className="font-mono border border-cyan-500/30 px-8 py-4 rounded-full text-lg font-semibold hover:bg-cyan-500/10 transition-all"
              >
                View Demo
              </Link>
            </div>
            
            <p className="text-sm text-cyan-400 font-mono mt-6">
              ✓ Free demo package ✓ Custom research ✓ Complete testing environment ✓ Industry expertise
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Services; 