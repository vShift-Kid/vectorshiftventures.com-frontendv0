import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Bot, MessageSquare, Database, Calendar, CircuitBoard, Cpu, Network, Play, ExternalLink, CheckCircle, Zap, TrendingUp, Calculator, Lightbulb, ArrowRight, Download, BarChart3, Target, Clock, DollarSign, Phone, Brain, FileText, Users, Mail, MessageSquare as TextIcon, Users as SocialIcon, Star } from 'lucide-react';

interface ContactData {
  name: string;
  email: string;
  company: string;
  industry: string;
  preferredContact: string;
  businessChallenge: string;
}

interface ValueProposition {
  title: string;
  description: string;
  icon: React.ComponentType<any>;
  value: string;
}

const Demo: React.FC = () => {
  const [contactData, setContactData] = useState<ContactData>({
    name: '',
    email: '',
    company: '',
    industry: '',
    preferredContact: 'email',
    businessChallenge: ''
  });
  
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (field: keyof ContactData, value: string) => {
    setContactData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate processing time
    setTimeout(() => {
      setIsSubmitted(true);
      setIsLoading(false);
    }, 2000);
  };

  const valuePropositions: ValueProposition[] = [
    {
      title: "Strategic Automation Blueprint",
      description: "Comprehensive roadmap with step-by-step automation strategy for your specific business challenges",
      icon: FileText,
      value: "Free Strategic Plan"
    },
    {
      title: "Lead Generation Analysis",
      description: "Custom lead generation strategy and automation recommendations for your industry",
      icon: Users,
      value: "Free Lead Strategy"
    },
    {
      title: "Customer Service Optimization",
      description: "AI-powered customer service automation strategy with voice caller recommendations",
      icon: MessageSquare,
      value: "Free Service Plan"
    },
    {
      title: "Social Media & Reputation Plan",
      description: "Social media management and online reputation automation strategy",
      icon: SocialIcon,
      value: "Free Social Strategy"
    }
  ];

  const services = [
    {
      icon: Users,
      title: "Lead Generation Systems",
      description: "Automated lead capture, qualification, and nurturing workflows",
      features: ["Web form automation", "Lead scoring", "CRM integration", "Follow-up sequences", "Conversion optimization"]
    },
    {
      icon: Bot,
      title: "AI Chatbots & Voice Callers",
      description: "Intelligent chatbots and voice callers trained on your customer data",
      features: ["Custom AI training", "24/7 customer support", "Voice synthesis", "Multi-language support", "Integration with your systems"]
    },
    {
      icon: MessageSquare,
      title: "Customer Service Automation",
      description: "Complete customer service automation with AI-powered responses",
      features: ["Ticket automation", "Response templates", "Customer satisfaction tracking", "Escalation management", "Knowledge base integration"]
    },
    {
      icon: SocialIcon,
      title: "Social Media & Reputation Management",
      description: "Automated social media posting and online reputation monitoring",
      features: ["Content scheduling", "Reputation monitoring", "Review management", "Social listening", "Brand sentiment analysis"]
    }
  ];

  const caseStudies = [
    {
      title: "Field Service Company A",
      industry: "HVAC Services",
      results: ["40% increase in lead conversion", "25% improvement in customer satisfaction", "30% reduction in response time"],
      description: "Implemented strategic automation blueprint with lead generation and customer service automation."
    },
    {
      title: "E-commerce Business B",
      industry: "Online Retail",
      results: ["50% faster lead processing", "35% increase in sales", "Automated 80% of customer inquiries"],
      description: "Deployed comprehensive automation strategy with chatbots and social media management."
    }
  ];

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-[#0A0B1E] text-white pt-20">
        {/* Success Hero Section */}
        <section className="py-20 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-green-500/10 to-transparent" />
          <div className="container mx-auto px-6 relative">
            <div className="text-center max-w-4xl mx-auto">
              <div className="w-20 h-20 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="w-10 h-10 text-white" />
              </div>
              <h1 className="font-mono text-5xl font-bold mb-6">
                <span className="bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent">
                  Your Strategic Blueprint is Ready!
                </span>
              </h1>
              <p className="text-xl text-gray-400 mb-8 font-mono">
                Hi {contactData.name}, we've analyzed {contactData.company}'s challenges and created a comprehensive automation strategy. 
                Here's your exclusive strategic package:
              </p>
            </div>
          </div>
        </section>

        {/* Value Propositions Grid */}
        <section className="py-20 bg-[#0A0B1E]">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-mono font-bold mb-4">
                Your <span className="bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent">Strategic Implementation Package</span>
              </h2>
              <p className="text-gray-400 max-w-2xl mx-auto font-mono">
                Custom automation strategy and tools specifically designed to solve your {contactData.industry} business challenges.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
              {valuePropositions.map((proposition, index) => (
                <div key={index} className="p-8 rounded-2xl bg-gradient-to-b from-green-500/10 to-transparent border border-green-500/20 hover:border-green-500/40 transition-all">
                  <div className="flex items-start justify-between mb-6">
                    <proposition.icon className="w-16 h-16 text-green-400" />
                    <span className="text-sm text-green-400 font-mono bg-green-500/20 px-3 py-1 rounded-full">
                      {proposition.value}
                    </span>
                  </div>
                  <h3 className="text-2xl font-mono font-semibold mb-4">{proposition.title}</h3>
                  <p className="text-gray-400 font-mono mb-6">{proposition.description}</p>
                  <button className="flex items-center gap-2 text-green-400 hover:text-green-300 font-mono transition-colors">
                    <Download className="w-4 h-4" />
                    Access Now
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>

            {/* Strategic Impact Calculator */}
            <div className="max-w-4xl mx-auto mb-16">
              <div className="bg-gradient-to-b from-cyan-500/10 to-transparent border border-cyan-500/20 rounded-2xl p-8">
                <div className="text-center mb-8">
                  <Target className="w-16 h-16 text-cyan-400 mx-auto mb-4" />
                  <h3 className="text-2xl font-mono font-semibold text-white mb-2">Strategic Impact Analysis</h3>
                  <p className="text-gray-400 font-mono">Your personalized automation strategy impact</p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="text-3xl font-mono font-bold text-cyan-400 mb-2">$67,000</div>
                    <div className="text-gray-400 font-mono text-sm">Annual Savings</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-mono font-bold text-green-400 mb-2">73%</div>
                    <div className="text-gray-400 font-mono text-sm">Efficiency Gain</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-mono font-bold text-blue-400 mb-2">3.8</div>
                    <div className="text-gray-400 font-mono text-sm">Month Payback</div>
                  </div>
                </div>
                
                <div className="mt-8 text-center">
                  <button className="font-mono bg-gradient-to-r from-cyan-500 to-blue-500 px-8 py-3 rounded-full text-lg font-semibold hover:shadow-lg hover:shadow-cyan-500/20 transition-all">
                    Get Detailed Strategy
                  </button>
                </div>
              </div>
            </div>

            {/* Next Steps */}
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl font-mono font-bold mb-6">Ready to Implement Your Strategic Blueprint?</h2>
              <p className="text-gray-400 mb-8 font-mono">
                Based on your {contactData.industry} business challenges, we've created a comprehensive automation strategy. 
                We'll contact you via your preferred method to discuss implementation.
              </p>
              <div className="flex gap-4 justify-center">
                <Link
                  to="/consultation"
                  className="font-mono bg-gradient-to-r from-cyan-500 to-blue-500 px-8 py-4 rounded-full text-lg font-semibold hover:shadow-lg hover:shadow-cyan-500/20 transition-all"
                >
                  Schedule Strategy Call
                </Link>
                <Link
                  to="/contact"
                  className="font-mono border border-cyan-500/30 px-8 py-4 rounded-full text-lg font-semibold hover:bg-cyan-500/10 transition-all"
                >
                  Get Custom Proposal
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0A0B1E] text-white pt-20">
      {/* Hero Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-cyan-500/10 to-transparent" />
        <div className="container mx-auto px-6 relative">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="font-mono text-5xl font-bold mb-6">
              <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                Get Your Strategic Automation Blueprint
              </span>
            </h1>
            <p className="text-xl text-gray-400 mb-8 font-mono">
              Tell us about your business challenges and receive a comprehensive strategic blueprint for lead generation, 
              customer service automation, and social media management.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Capture Form */}
      <section className="py-20 bg-[#0A0B1E]">
        <div className="container mx-auto px-6">
          <div className="max-w-2xl mx-auto">
            <div className="bg-gradient-to-b from-cyan-500/10 to-transparent border border-cyan-500/20 rounded-2xl p-8">
              <div className="text-center mb-8">
                <div className="w-16 h-16 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Brain className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-mono font-semibold text-white mb-2">Unlock Your Strategic Blueprint</h3>
                <p className="text-gray-400 font-mono">
                  Get instant access to your custom automation strategy and implementation plan
                </p>
              </div>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-mono font-medium text-gray-300 mb-2">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    value={contactData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    required
                    className="w-full p-3 bg-gray-800/50 border border-cyan-500/30 rounded-lg text-white font-mono focus:outline-none focus:border-cyan-400"
                    placeholder="Enter your full name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-mono font-medium text-gray-300 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    value={contactData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    required
                    className="w-full p-3 bg-gray-800/50 border border-cyan-500/30 rounded-lg text-white font-mono focus:outline-none focus:border-cyan-400"
                    placeholder="your.email@company.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-mono font-medium text-gray-300 mb-2">
                    Company Name *
                  </label>
                  <input
                    type="text"
                    value={contactData.company}
                    onChange={(e) => handleInputChange('company', e.target.value)}
                    required
                    className="w-full p-3 bg-gray-800/50 border border-cyan-500/30 rounded-lg text-white font-mono focus:outline-none focus:border-cyan-400"
                    placeholder="Enter your company name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-mono font-medium text-gray-300 mb-2">
                    Industry *
                  </label>
                  <select
                    value={contactData.industry}
                    onChange={(e) => handleInputChange('industry', e.target.value)}
                    required
                    className="w-full p-3 bg-gray-800/50 border border-cyan-500/30 rounded-lg text-white font-mono focus:outline-none focus:border-cyan-400"
                  >
                    <option value="">Select your industry</option>
                    <option value="field-service">Field Service</option>
                    <option value="e-commerce">E-commerce</option>
                    <option value="construction">Construction</option>
                    <option value="maintenance">Maintenance & Repair</option>
                    <option value="utilities">Utilities</option>
                    <option value="telecommunications">Telecommunications</option>
                    <option value="manufacturing">Manufacturing</option>
                    <option value="logistics">Logistics & Transportation</option>
                    <option value="healthcare">Healthcare</option>
                    <option value="real-estate">Real Estate</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-mono font-medium text-gray-300 mb-2">
                    Your Biggest Business Challenge *
                  </label>
                  <textarea
                    value={contactData.businessChallenge}
                    onChange={(e) => handleInputChange('businessChallenge', e.target.value)}
                    required
                    rows={3}
                    className="w-full p-3 bg-gray-800/50 border border-cyan-500/30 rounded-lg text-white font-mono focus:outline-none focus:border-cyan-400"
                    placeholder="Describe your main business challenge or pain point..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-mono font-medium text-gray-300 mb-2">
                    Preferred Contact Method *
                  </label>
                  <select
                    value={contactData.preferredContact}
                    onChange={(e) => handleInputChange('preferredContact', e.target.value)}
                    required
                    className="w-full p-3 bg-gray-800/50 border border-cyan-500/30 rounded-lg text-white font-mono focus:outline-none focus:border-cyan-400"
                  >
                    <option value="email">Email</option>
                    <option value="phone">Phone Call</option>
                    <option value="text">Text Message</option>
                  </select>
                </div>

                <button
                  type="submit"
                  disabled={isLoading || !contactData.name || !contactData.email || !contactData.company || !contactData.industry || !contactData.businessChallenge}
                  className="w-full font-mono bg-gradient-to-r from-cyan-500 to-blue-500 px-8 py-4 rounded-lg text-lg font-semibold hover:shadow-lg hover:shadow-cyan-500/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? (
                    <div className="flex items-center justify-center gap-3">
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Creating Your Strategic Blueprint...
                    </div>
                  ) : (
                    <div className="flex items-center justify-center gap-3">
                      <Brain className="w-5 h-5" />
                      Get My Strategic Blueprint
                    </div>
                  )}
                </button>
              </form>

              <div className="mt-6 text-center">
                <p className="text-sm text-gray-400 font-mono">
                  ✓ No credit card required • ✓ Instant access • ✓ 100% free
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What You'll Get Preview */}
      <section className="py-20 bg-gradient-to-b from-[#0A0B1E] to-[#0A0B1E]/80">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-mono font-bold mb-4">
              What's Included in Your <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">Strategic Blueprint</span>
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto font-mono">
              Comprehensive automation strategy with lead generation, customer service, and social media management.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {valuePropositions.map((proposition, index) => (
              <div key={index} className="p-6 rounded-2xl bg-gradient-to-b from-cyan-500/5 to-transparent border border-cyan-500/20 hover:border-cyan-500/40 transition-all">
                <proposition.icon className="w-12 h-12 text-cyan-400 mb-4" />
                <h3 className="text-lg font-mono font-semibold mb-2">{proposition.title}</h3>
                <p className="text-gray-400 font-mono text-sm">{proposition.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-[#0A0B1E]">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-mono font-bold mb-4">
              Our <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">Automation Services</span>
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto font-mono">
              We provide comprehensive automation solutions to transform your business operations.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {services.map((service, index) => (
              <div key={index} className="p-8 rounded-2xl bg-gradient-to-b from-cyan-500/10 to-transparent border border-cyan-500/20 hover:border-cyan-500/40 transition-all">
                <service.icon className="w-16 h-16 text-cyan-400 mb-6" />
                <h3 className="text-2xl font-mono font-semibold mb-4">{service.title}</h3>
                <p className="text-gray-400 font-mono mb-6">{service.description}</p>
                <ul className="space-y-2">
                  {service.features.map((feature, featureIndex) => (
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
              Real results from businesses we've transformed with strategic automation blueprints.
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
            <h2 className="text-3xl font-mono font-bold mb-6">Ready to Transform Your Business?</h2>
            <p className="text-gray-400 mb-8 font-mono">
              Get your strategic automation blueprint and discover how our services can revolutionize your lead generation, 
              customer service, and social media management.
            </p>
            <div className="flex gap-4 justify-center">
              <button
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="font-mono bg-gradient-to-r from-cyan-500 to-blue-500 px-8 py-4 rounded-full text-lg font-semibold hover:shadow-lg hover:shadow-cyan-500/20 transition-all"
              >
                Get My Strategic Blueprint
              </button>
              <Link
                to="/contact"
                className="font-mono border border-cyan-500/30 px-8 py-4 rounded-full text-lg font-semibold hover:bg-cyan-500/10 transition-all"
              >
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Demo; 