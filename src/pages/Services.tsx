import React from 'react';
import { Link } from 'react-router-dom';
import { Bot, MessageSquare, Database, Calendar, CircuitBoard, Cpu, Network, CheckCircle, Zap, Users, BarChart3, Globe, Brain, Search, PhoneCall } from 'lucide-react';

const Services: React.FC = () => {
  const mainServices = [
    {
      icon: MessageSquare,
      title: "Lead Generation Systems",
      description: "Automated lead capture, qualification, and nurturing workflows to maximize your sales pipeline",
      features: [
        "Web form automation and optimization",
        "Lead scoring and qualification algorithms",
        "CRM integration and data sync",
        "Automated follow-up sequences",
        "Conversion tracking and analytics",
        "Multi-channel lead capture"
      ],
      benefits: ["Increase lead quality by 40%", "Reduce manual follow-up by 70%", "Improve conversion rates"]
    },
    {
      icon: Globe,
      title: "Social Media Management",
      description: "AI-powered content creation and social media automation to boost your online presence",
      features: [
        "Automated content creation and scheduling",
        "Multi-platform posting and management",
        "Engagement monitoring and response",
        "Analytics and performance tracking",
        "Hashtag research and optimization",
        "Community management automation"
      ],
      benefits: ["Save 20+ hours per week", "Increase engagement by 60%", "Consistent brand presence"]
    },
    {
      icon: Bot,
      title: "Custom Chatbots",
      description: "Intelligent conversational AI for customer support, sales, and lead qualification",
      features: [
        "Natural language processing and understanding",
        "Multi-language support capabilities",
        "Integration with existing systems",
        "Custom response training and optimization",
        "24/7 customer support automation",
        "Advanced conversation flow design"
      ],
      benefits: ["Reduce support costs by 60%", "Improve response time by 80%", "24/7 availability"]
    },
    {
      icon: Database,
      title: "CRM Automation",
      description: "Streamlined customer relationship management and data processing automation",
      features: [
        "Automated data entry and validation",
        "Contact management and segmentation",
        "Pipeline automation and tracking",
        "Report generation and analytics",
        "Integration with multiple platforms",
        "Custom workflow automation"
      ],
      benefits: ["Eliminate data entry errors", "Save 15+ hours per week", "Real-time insights"]
    },
    {
      icon: Users,
      title: "Customer Support Automation",
      description: "24/7 AI-powered customer service and support ticket management",
      features: [
        "Automated ticket routing and prioritization",
        "AI-powered response suggestions",
        "Knowledge base integration",
        "Escalation management",
        "Customer satisfaction tracking",
        "Multi-channel support integration"
      ],
      benefits: ["Faster resolution times", "Improved customer satisfaction", "Reduced support costs"]
    },
    {
      icon: BarChart3,
      title: "Analytics & Reporting",
      description: "Automated data analysis and business intelligence reporting systems",
      features: [
        "Real-time dashboard creation",
        "Automated report generation",
        "Data visualization and insights",
        "Performance metrics tracking",
        "Predictive analytics capabilities",
        "Custom KPI monitoring"
      ],
      benefits: ["Data-driven decisions", "Time-saving automation", "Performance insights"]
    },
    {
      icon: CircuitBoard,
      title: "Workflow Automation",
      description: "Custom process automation for operational efficiency and productivity",
      features: [
        "Business process mapping and optimization",
        "Automated task routing and assignment",
        "Notification and alert systems",
        "Performance tracking and monitoring",
        "Integration with existing tools",
        "Custom workflow design"
      ],
      benefits: ["Increase efficiency by 50%", "Reduce manual errors", "Streamline operations"]
    },
    {
      icon: Network,
      title: "Integration Services",
      description: "Seamless integration with existing business systems and third-party tools",
      features: [
        "API development and integration",
        "Third-party platform connections",
        "Legacy system modernization",
        "Data migration and synchronization",
        "Custom connector development",
        "System optimization and maintenance"
      ],
      benefits: ["Unified system ecosystem", "Improved data flow", "Enhanced productivity"]
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