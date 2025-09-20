import React from 'react';
import { Link } from 'react-router-dom';
import { Bot, MessageSquare, Database, Calendar, CircuitBoard, Cpu, Network, CheckCircle, Zap, Users, BarChart3, Globe, Brain, Search, PhoneCall, FileText } from 'lucide-react';

const Services: React.FC = () => {
  const mainServices = [
    {
      icon: PhoneCall,
      title: "Field Service AI Assistant",
      description: "Specialized AI voice assistant for field service technicians, engineers, and technical operations teams",
      features: [
        "Field technician support & guidance",
        "Technical troubleshooting assistance",
        "Equipment maintenance scheduling",
        "Service call optimization",
        "Real-time technical documentation access",
        "Quality control monitoring",
        "Field data collection & reporting",
        "Emergency response coordination"
      ],
      benefits: ["Reduce field service costs by 40%", "Improve first-call resolution by 70%", "24/7 technical support", "Mobile-optimized for field work"],
      subtleNumber: "2"
    },
    {
      icon: FileText,
      title: "Technical Documentation AI",
      description: "AI-powered technical documentation generation, management, and maintenance for engineering teams",
      features: [
        "Automated technical manual generation",
        "Engineering documentation templates",
        "Technical knowledge base management",
        "Version control & updates",
        "Multi-format documentation output",
        "Technical writing assistance",
        "Compliance documentation automation",
        "Interactive technical guides"
      ],
      benefits: ["Reduce documentation time by 60%", "Improve technical accuracy by 80%", "Standardize documentation", "Real-time updates"],
      subtleNumber: "7"
    },
    {
      icon: Network,
      title: "Logistics & Supply Chain AI",
      description: "Intelligent logistics optimization and supply chain management for technical operations",
      features: [
        "Route optimization for field teams",
        "Inventory management automation",
        "Supply chain monitoring",
        "Equipment tracking & location",
        "Delivery scheduling optimization",
        "Resource allocation planning",
        "Vendor management automation",
        "Cost optimization analysis"
      ],
      benefits: ["Reduce logistics costs by 35%", "Improve delivery efficiency by 50%", "Optimize resource utilization", "Real-time tracking"],
      subtleNumber: "11"
    },
    {
      icon: Bot,
      title: "Technical Support AI",
      description: "Specialized AI chatbots for technical support, customer care, and product assistance",
      features: [
        "Technical troubleshooting guidance",
        "Product support automation",
        "Customer care optimization",
        "Technical FAQ management",
        "Escalation to human experts",
        "Multi-language technical support"
      ],
      benefits: ["Reduce technical support costs by 50%", "Improve customer satisfaction by 65%", "24/7 technical assistance"],
      subtleNumber: "18"
    },
    {
      icon: BarChart3,
      title: "Quality & Analytics AI",
      description: "Advanced analytics and quality monitoring for technical operations and field service",
      features: [
        "Quality control monitoring",
        "Performance analytics & reporting",
        "Predictive maintenance insights",
        "Field service optimization",
        "Technical KPI tracking",
        "Compliance monitoring"
      ],
      benefits: ["Improve quality by 45%", "Reduce maintenance costs by 30%", "Data-driven optimization"],
      subtleNumber: "20"
    },
    {
      icon: CircuitBoard,
      title: "Technical System Integration",
      description: "Seamless integration with engineering tools, field service software, and technical systems",
      features: [
        "CAD software integration",
        "Field service management systems",
        "Technical documentation platforms",
        "Engineering workflow automation",
        "Equipment management systems",
        "Legacy technical system modernization"
      ],
      benefits: ["Streamline technical workflows", "Reduce manual data entry by 70%", "Improve system efficiency"],
      subtleNumber: "29"
    }
  ];

  const testimonials = [
    {
      title: "Field Service Company",
      industry: "Technical Services",
      results: ["70% faster call resolution", "40% reduction in field service costs", "80% improvement in first-call success"],
      description: "Deployed AI voice assistant for field technicians with technical documentation automation and quality monitoring."
    },
    {
      title: "Engineering Firm",
      industry: "Manufacturing",
      results: ["60% reduction in documentation time", "80% improvement in technical accuracy", "50% faster project delivery"],
      description: "Implemented technical documentation AI with engineering workflow automation and CAD system integration."
    },
    {
      title: "Logistics Company",
      industry: "Supply Chain",
      results: ["35% reduction in logistics costs", "50% improvement in delivery efficiency", "45% better resource utilization"],
      description: "Integrated logistics optimization AI with inventory management automation and real-time tracking systems."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white pt-20">
      {/* Hero Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-500/15 via-green-500/10 to-transparent" />
        <div className="container mx-auto px-6 relative">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="font-mono text-5xl font-bold mb-6">
              <span className="bg-gradient-to-r from-blue-400 via-green-400 to-blue-500 bg-clip-text text-transparent">
                Technical AI Solutions
              </span>
            </h1>
            <p className="text-xl text-slate-300 mb-8 font-mono">
              Specialized AI automation for Field Service, Engineering, Logistics, IT, and Technical Operations. Streamline field projects, technical documentation, and customer care.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4 max-w-5xl mx-auto mb-8">
              <div className="flex items-center justify-center bg-gradient-to-b from-blue-500/10 to-transparent border border-slate-400/20 rounded-xl p-4">
                <PhoneCall className="w-6 h-6 text-blue-400 mr-2" />
                <span className="font-mono text-sm text-white">Field Service AI</span>
              </div>
              <div className="flex items-center justify-center bg-gradient-to-b from-green-500/10 to-transparent border border-slate-400/20 rounded-xl p-4">
                <FileText className="w-6 h-6 text-green-400 mr-2" />
                <span className="font-mono text-sm text-white">Technical Docs</span>
              </div>
              <div className="flex items-center justify-center bg-gradient-to-b from-blue-500/10 to-transparent border border-slate-400/20 rounded-xl p-4">
                <Network className="w-6 h-6 text-blue-400 mr-2" />
                <span className="font-mono text-sm text-white">Logistics AI</span>
              </div>
              <div className="flex items-center justify-center bg-gradient-to-b from-green-500/10 to-transparent border border-slate-400/20 rounded-xl p-4">
                <Bot className="w-6 h-6 text-green-400 mr-2" />
                <span className="font-mono text-sm text-white">Tech Support</span>
              </div>
              <div className="flex items-center justify-center bg-gradient-to-b from-blue-500/10 to-transparent border border-slate-400/20 rounded-xl p-4">
                <BarChart3 className="w-6 h-6 text-blue-400 mr-2" />
                <span className="font-mono text-sm text-white">Quality Analytics</span>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/consultation"
                className="font-mono bg-gradient-to-r from-blue-500 to-green-500 px-8 py-3 rounded-full text-lg font-semibold hover:shadow-lg hover:shadow-blue-500/20 transition-all inline-block"
              >
                Get Started
              </Link>
              <Link
                to="/demo"
                className="font-mono border border-slate-400/50 px-8 py-3 rounded-full text-lg font-semibold hover:bg-slate-400/10 transition-all inline-block"
              >
                Request Demo
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 bg-gradient-to-b from-slate-800 to-slate-900">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-mono font-bold mb-4">
              Our <span className="bg-gradient-to-r from-blue-400 via-green-400 to-blue-500 bg-clip-text text-transparent">Automation Solutions</span>
            </h2>
            <p className="text-slate-300 max-w-3xl mx-auto font-mono">
              Comprehensive AI-powered services designed to streamline your business operations and drive growth.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {mainServices.map((service, index) => (
              <div key={index} className="p-8 rounded-2xl bg-gradient-to-b from-blue-500/10 via-green-500/5 to-transparent border border-slate-400/20 hover:border-blue-400/40 transition-all relative">
                <service.icon className="w-12 h-12 text-blue-400 mb-6" />
                <h3 className="text-xl font-mono font-semibold mb-4 text-white">{service.title}</h3>
                <p className="text-slate-300 font-mono mb-6">{service.description}</p>
                {/* Subtle lucky number */}
                <div className="absolute top-3 right-3 text-slate-600 font-mono text-xs opacity-30">
                  {service.subtleNumber}
                </div>
                
                <div className="mb-6">
                  <h4 className="font-mono font-semibold text-blue-400 mb-3">Features:</h4>
                  <ul className="space-y-2">
                    {service.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start text-sm text-slate-200 font-mono">
                        <CheckCircle className="w-4 h-4 text-blue-400 mr-2 mt-0.5 flex-shrink-0" />
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
      <section className="py-20 bg-gradient-to-b from-slate-900 to-slate-800">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-mono font-bold mb-4">
              Success <span className="bg-gradient-to-r from-blue-400 via-green-400 to-blue-500 bg-clip-text text-transparent">Stories</span>
            </h2>
            <p className="text-slate-300 max-w-2xl mx-auto font-mono">
              See how our comprehensive automation solutions have transformed businesses across different industries.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="p-8 rounded-2xl bg-gradient-to-b from-blue-500/10 via-green-500/5 to-transparent border border-slate-400/20 hover:border-blue-400/40 transition-all relative">
                <div className="mb-6">
                  <h3 className="text-xl font-mono font-semibold mb-2 text-white">{testimonial.title}</h3>
                  <p className="text-blue-400 font-mono text-sm">{testimonial.industry}</p>
                </div>
                
                <p className="text-slate-300 font-mono mb-6 text-sm">{testimonial.description}</p>
                {/* Subtle lucky number */}
                <div className="absolute top-3 right-3 text-slate-600 font-mono text-xs opacity-20">
                  {[2, 7, 11][index % 3]}
                </div>
                
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
      <section className="py-20 bg-gradient-to-b from-slate-800 to-slate-900">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-mono font-bold mb-4">
              Our <span className="bg-gradient-to-r from-blue-400 via-green-400 to-blue-500 bg-clip-text text-transparent">Implementation Process</span>
            </h2>
            <p className="text-slate-300 max-w-2xl mx-auto font-mono">
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
              <div key={index} className="text-center relative">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-mono font-bold text-white">{step.step}</span>
                </div>
                <step.icon className="w-8 h-8 text-blue-400 mx-auto mb-4" />
                <h3 className="text-lg font-mono font-semibold mb-2 text-white">{step.title}</h3>
                {/* Subtle lucky number */}
                <div className="absolute top-0 right-0 text-slate-600 font-mono text-xs opacity-20">
                  {[18, 20, 29, 2][index % 4]}
                </div>
                <p className="text-slate-300 font-mono text-sm">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Demo CTA */}
      <section className="py-20 bg-gradient-to-b from-slate-900 to-slate-800">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center bg-gradient-to-b from-blue-500/10 via-green-500/5 to-transparent border border-slate-400/20 rounded-2xl p-12">
            <h2 className="text-3xl font-mono font-bold mb-6">Want to See Our Solutions in Action?</h2>
            <p className="text-slate-300 mb-8 font-mono text-lg">
              Request a comprehensive demo package to see how our AI automation solutions can transform your business operations.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              <div className="flex items-center justify-center bg-gradient-to-b from-blue-500/10 to-transparent border border-slate-400/20 rounded-xl p-4">
                <Database className="w-6 h-6 text-blue-400 mr-2" />
                <span className="font-mono text-sm text-white">Custom Analysis</span>
              </div>
              <div className="flex items-center justify-center bg-gradient-to-b from-green-500/10 to-transparent border border-slate-400/20 rounded-xl p-4">
                <Bot className="w-6 h-6 text-green-400 mr-2" />
                <span className="font-mono text-sm text-white">Live Demo</span>
              </div>
              <div className="flex items-center justify-center bg-gradient-to-b from-blue-500/10 to-transparent border border-slate-400/20 rounded-xl p-4">
                <PhoneCall className="w-6 h-6 text-blue-400 mr-2" />
                <span className="font-mono text-sm text-white">Strategy Session</span>
              </div>
            </div>
            
            <Link
              to="/demo"
              className="font-mono bg-gradient-to-r from-blue-500 to-green-500 px-8 py-4 rounded-full text-lg font-semibold hover:shadow-lg hover:shadow-blue-500/20 transition-all inline-block"
            >
              Request Demo Package
            </Link>
          </div>
        </div>
      </section>

      {/* Industries Section */}
      <section className="py-20 bg-gradient-to-b from-slate-800 to-slate-900">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-mono font-bold mb-4">
              Industries We <span className="bg-gradient-to-r from-blue-400 via-green-400 to-blue-500 bg-clip-text text-transparent">Serve</span>
            </h2>
            <p className="text-slate-300 max-w-2xl mx-auto font-mono">
              Our AI automation solutions work across all industries, customized for your specific business needs.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {[
              { name: "SaaS & Technology", subtleNumber: "7" },
              { name: "E-commerce & Retail", subtleNumber: "11" },
              { name: "Healthcare", subtleNumber: "18" },
              { name: "Financial Services", subtleNumber: "20" },
              { name: "Real Estate", subtleNumber: "29" },
              { name: "Professional Services", subtleNumber: "2" },
              { name: "Education", subtleNumber: "7" },
              { name: "Manufacturing", subtleNumber: "11" },
              { name: "Marketing Agencies", subtleNumber: "18" },
              { name: "Consulting", subtleNumber: "20" }
            ].map((industry, index) => (
              <div key={index} className="text-center p-4 rounded-xl bg-gradient-to-b from-blue-500/5 via-green-500/5 to-transparent border border-slate-400/20 hover:border-blue-400/40 transition-all relative">
                <span className="font-mono text-sm text-slate-200">{industry.name}</span>
                {/* Subtle lucky number */}
                <div className="absolute top-1 right-1 text-slate-600 font-mono text-xs opacity-15">
                  {industry.subtleNumber}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-b from-slate-900 to-slate-800">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-mono font-bold mb-6">Ready to Automate Your Business?</h2>
            <p className="text-slate-300 mb-8 font-mono">
              Let's discuss how our AI automation services can streamline your operations and drive growth.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/consultation"
                className="font-mono bg-gradient-to-r from-blue-500 to-green-500 px-8 py-4 rounded-full text-lg font-semibold hover:shadow-lg hover:shadow-blue-500/20 transition-all"
              >
                Get Started Today
              </Link>
              <Link
                to="/demo"
                className="font-mono border border-slate-400/50 px-8 py-4 rounded-full text-lg font-semibold hover:bg-slate-400/10 transition-all"
              >
                Request Demo
              </Link>
            </div>
            
            <p className="text-sm text-green-400 font-mono mt-6">
              ✓ Free consultation ✓ Custom solutions ✓ Expert support ✓ Proven results
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Services; 