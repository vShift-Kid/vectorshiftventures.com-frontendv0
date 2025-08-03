import React from 'react';
import { Link } from 'react-router-dom';
import { Bot, MessageSquare, Database, Calendar, CircuitBoard, Cpu, Network, CheckCircle, Zap, Users, BarChart3 } from 'lucide-react';

const Services: React.FC = () => {
  const services = [
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
        "Scheduling automation",
        "Resource allocation",
        "Dispatch optimization",
        "Performance tracking",
        "Mobile app integration"
      ],
      benefits: ["Optimize route efficiency by 30%", "Reduce scheduling conflicts", "Improve technician productivity"]
    }
  ];

  const processSteps = [
    {
      icon: Users,
      title: "Discovery & Analysis",
      description: "We analyze your current processes and identify automation opportunities"
    },
    {
      icon: Zap,
      title: "Solution Design",
      description: "Custom automation strategy tailored to your specific business needs"
    },
    {
      icon: CircuitBoard,
      title: "Implementation",
      description: "Seamless integration and deployment of automation solutions"
    },
    {
      icon: BarChart3,
      title: "Optimization",
      description: "Continuous monitoring and improvement of automation performance"
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
                Our Services
              </span>
            </h1>
            <p className="text-xl text-gray-400 mb-8 font-mono">
              Comprehensive automation solutions designed specifically for field service B2B optimization.
            </p>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 bg-[#0A0B1E]">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {services.map((service, index) => (
              <div key={index} className="p-8 rounded-2xl bg-gradient-to-b from-cyan-500/10 to-transparent border border-cyan-500/20 hover:border-cyan-500/40 transition-all">
                <service.icon className="w-16 h-16 text-cyan-400 mb-6" />
                <h3 className="text-2xl font-mono font-semibold mb-4">{service.title}</h3>
                <p className="text-gray-400 font-mono mb-6">{service.description}</p>
                
                <div className="mb-6">
                  <h4 className="text-lg font-mono font-semibold mb-3 text-cyan-400">Key Features</h4>
                  <ul className="space-y-2">
                    {service.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center text-gray-300 font-mono">
                        <CheckCircle className="w-4 h-4 text-cyan-400 mr-3 flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="text-lg font-mono font-semibold mb-3 text-green-400">Expected Benefits</h4>
                  <ul className="space-y-2">
                    {service.benefits.map((benefit, benefitIndex) => (
                      <li key={benefitIndex} className="flex items-center text-gray-300 font-mono">
                        <CheckCircle className="w-4 h-4 text-green-400 mr-3 flex-shrink-0" />
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
              Our <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">Process</span>
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto font-mono">
              A proven methodology to transform your field service business with automation.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {processSteps.map((step, index) => (
              <div key={index} className="text-center">
                <div className="relative">
                  <div className="w-20 h-20 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-6">
                    <step.icon className="w-10 h-10 text-white" />
                  </div>
                  {index < processSteps.length - 1 && (
                    <div className="hidden lg:block absolute top-10 left-full w-full h-0.5 bg-gradient-to-r from-cyan-500 to-transparent transform translate-x-4"></div>
                  )}
                </div>
                <h3 className="text-xl font-mono font-semibold mb-3">{step.title}</h3>
                <p className="text-gray-400 font-mono">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-b from-[#0A0B1E]/80 to-[#0A0B1E]">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-mono font-bold mb-6">Ready to Transform Your Business?</h2>
            <p className="text-gray-400 mb-8 font-mono">
              Let's discuss your specific needs and create a custom automation solution for your field service business.
            </p>
            <div className="flex gap-4 justify-center">
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
                View Demo
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Services; 