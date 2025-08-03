import React, { useState } from 'react';
import { Calendar, Clock, User, Mail, Phone, Building, MessageSquare, CheckCircle, Bot, FileText, PhoneCall, Search, Brain } from 'lucide-react';

const Consultation: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    industry: '',
    businessSize: '',
    currentChallenges: '',
    automationGoals: '',
    businessDescription: '',
    targetAudience: '',
    keyProducts: '',
    preferredDate: '',
    preferredTime: '',
    consultationType: 'comprehensive',
    additionalInfo: ''
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the form data to your backend
    console.log('Consultation request:', formData);
    setIsSubmitted(true);
  };

  const consultationTypes = [
    {
      title: "Comprehensive AI Package",
      duration: "60 minutes + Deliverables",
      description: "Complete consultation with custom proposal, demo agent, and phone caller agent",
      features: [
        "Detailed business analysis & custom proposal",
        "AI demo agent with research knowledge of your business",
        "Phone caller agent for customer inquiries",
        "Implementation roadmap"
      ],
      price: "Free",
      recommended: true
    },
    {
      title: "Discovery Call",
      duration: "30 minutes",
      description: "Initial consultation to understand your automation needs",
      features: [
        "Business needs assessment",
        "Automation opportunities review",
        "Next steps planning"
      ],
      price: "Free"
    },
    {
      title: "Strategy Session",
      duration: "45 minutes",
      description: "Deep dive into your processes and automation planning",
      features: [
        "Process analysis",
        "Custom automation roadmap",
        "ROI projections"
      ],
      price: "Free"
    }
  ];

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-[#0A0B1E] text-white pt-20">
        <div className="container mx-auto px-6 py-20">
          <div className="max-w-3xl mx-auto text-center">
            <CheckCircle className="w-20 h-20 text-green-400 mx-auto mb-8" />
            <h1 className="text-4xl font-mono font-bold mb-6">
              <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                Consultation Request Submitted!
              </span>
            </h1>
            <p className="text-xl text-gray-400 mb-8 font-mono">
              Thank you for your interest! We'll begin researching your business and industry to create your customized AI solutions.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-gradient-to-b from-cyan-500/10 to-transparent border border-cyan-500/20 rounded-2xl p-6">
                <FileText className="w-12 h-12 text-cyan-400 mx-auto mb-4" />
                <h3 className="text-lg font-mono font-semibold mb-2">Custom Proposal</h3>
                <p className="text-sm text-gray-400 font-mono">Detailed analysis and automation strategy for your business</p>
              </div>
              
              <div className="bg-gradient-to-b from-cyan-500/10 to-transparent border border-cyan-500/20 rounded-2xl p-6">
                <Bot className="w-12 h-12 text-cyan-400 mx-auto mb-4" />
                <h3 className="text-lg font-mono font-semibold mb-2">Demo Agent</h3>
                <p className="text-sm text-gray-400 font-mono">AI agent with extensive knowledge of your business and industry</p>
              </div>
              
              <div className="bg-gradient-to-b from-cyan-500/10 to-transparent border border-cyan-500/20 rounded-2xl p-6">
                <PhoneCall className="w-12 h-12 text-cyan-400 mx-auto mb-4" />
                <h3 className="text-lg font-mono font-semibold mb-2">Phone Agent</h3>
                <p className="text-sm text-gray-400 font-mono">Automated phone system to handle customer inquiries</p>
              </div>
            </div>

            <div className="bg-gradient-to-b from-cyan-500/10 to-transparent border border-cyan-500/20 rounded-2xl p-8">
              <h3 className="text-lg font-mono font-semibold mb-4">What Happens Next?</h3>
              <ul className="text-left space-y-3 text-gray-300 font-mono">
                <li className="flex items-center">
                  <Search className="w-5 h-5 text-cyan-400 mr-3 flex-shrink-0" />
                  We conduct extensive research on your business and industry
                </li>
                <li className="flex items-center">
                  <FileText className="w-5 h-5 text-cyan-400 mr-3 flex-shrink-0" />
                  Create a comprehensive proposal with automation strategies
                </li>
                <li className="flex items-center">
                  <Bot className="w-5 h-5 text-cyan-400 mr-3 flex-shrink-0" />
                  Build a demo agent with knowledge specific to your business
                </li>
                <li className="flex items-center">
                  <PhoneCall className="w-5 h-5 text-cyan-400 mr-3 flex-shrink-0" />
                  Configure a phone caller agent for customer interactions
                </li>
                <li className="flex items-center">
                  <Calendar className="w-5 h-5 text-cyan-400 mr-3 flex-shrink-0" />
                  Schedule your consultation to review everything together
                </li>
              </ul>
            </div>
          </div>
        </div>
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
                Get Your AI Automation Package
              </span>
            </h1>
            <p className="text-xl text-gray-400 mb-8 font-mono">
              Receive a custom proposal, demo agent with research knowledge, and phone caller agent tailored to your business needs.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              <div className="flex items-center bg-gradient-to-b from-cyan-500/10 to-transparent border border-cyan-500/20 rounded-xl p-4">
                <FileText className="w-8 h-8 text-cyan-400 mr-3" />
                <span className="font-mono text-sm">Custom Proposal</span>
              </div>
              <div className="flex items-center bg-gradient-to-b from-cyan-500/10 to-transparent border border-cyan-500/20 rounded-xl p-4">
                <Brain className="w-8 h-8 text-cyan-400 mr-3" />
                <span className="font-mono text-sm">Research-Based Demo Agent</span>
              </div>
              <div className="flex items-center bg-gradient-to-b from-cyan-500/10 to-transparent border border-cyan-500/20 rounded-xl p-4">
                <PhoneCall className="w-8 h-8 text-cyan-400 mr-3" />
                <span className="font-mono text-sm">Phone Caller Agent</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Consultation Types */}
      <section className="py-20 bg-[#0A0B1E]">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-mono font-bold mb-4">
              Choose Your <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">Package</span>
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto font-mono">
              All packages include comprehensive research and custom AI solutions for your business.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {consultationTypes.map((type, index) => (
              <div 
                key={index} 
                className={`p-8 rounded-2xl bg-gradient-to-b from-cyan-500/10 to-transparent border transition-all relative ${
                  type.recommended 
                    ? 'border-cyan-400 shadow-lg shadow-cyan-500/20' 
                    : 'border-cyan-500/20 hover:border-cyan-500/40'
                }`}
              >
                {type.recommended && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <span className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white px-4 py-1 rounded-full text-sm font-mono font-semibold">
                      Recommended
                    </span>
                  </div>
                )}
                <h3 className="text-2xl font-mono font-semibold mb-4">{type.title}</h3>
                <div className="flex items-center text-cyan-400 mb-4">
                  <Clock className="w-5 h-5 mr-2" />
                  <span className="font-mono">{type.duration}</span>
                </div>
                <p className="text-gray-400 font-mono mb-6">{type.description}</p>
                
                <ul className="space-y-2 mb-6">
                  {type.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start text-sm text-gray-300 font-mono">
                      <CheckCircle className="w-4 h-4 text-cyan-400 mr-2 mt-0.5 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
                
                <div className="text-2xl font-mono font-bold text-green-400">{type.price}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Booking Form */}
      <section className="py-20 bg-gradient-to-b from-[#0A0B1E] to-[#0A0B1E]/80">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-mono font-bold mb-4">
                <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                  Tell Us About Your Business
                </span>
              </h2>
              <p className="text-gray-400 font-mono">
                The more details you provide, the better we can research and customize your AI solutions.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Contact Information */}
              <div className="bg-gradient-to-b from-cyan-500/5 to-transparent border border-cyan-500/20 rounded-2xl p-8">
                <h3 className="text-xl font-mono font-semibold mb-6 flex items-center">
                  <User className="w-6 h-6 text-cyan-400 mr-3" />
                  Contact Information
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-mono text-gray-300 mb-2">Full Name *</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full bg-[#0A0B1E] border border-cyan-500/30 rounded-lg px-4 py-3 text-white font-mono focus:outline-none focus:border-cyan-400"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-mono text-gray-300 mb-2">Email *</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full bg-[#0A0B1E] border border-cyan-500/30 rounded-lg px-4 py-3 text-white font-mono focus:outline-none focus:border-cyan-400"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-mono text-gray-300 mb-2">Phone</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full bg-[#0A0B1E] border border-cyan-500/30 rounded-lg px-4 py-3 text-white font-mono focus:outline-none focus:border-cyan-400"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-mono text-gray-300 mb-2">Company *</label>
                    <input
                      type="text"
                      name="company"
                      value={formData.company}
                      onChange={handleInputChange}
                      required
                      className="w-full bg-[#0A0B1E] border border-cyan-500/30 rounded-lg px-4 py-3 text-white font-mono focus:outline-none focus:border-cyan-400"
                    />
                  </div>
                </div>
              </div>

              {/* Business Information */}
              <div className="bg-gradient-to-b from-cyan-500/5 to-transparent border border-cyan-500/20 rounded-2xl p-8">
                <h3 className="text-xl font-mono font-semibold mb-6 flex items-center">
                  <Building className="w-6 h-6 text-cyan-400 mr-3" />
                  Business Information
                </h3>
                
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-mono text-gray-300 mb-2">Industry *</label>
                      <select
                        name="industry"
                        value={formData.industry}
                        onChange={handleInputChange}
                        required
                        className="w-full bg-[#0A0B1E] border border-cyan-500/30 rounded-lg px-4 py-3 text-white font-mono focus:outline-none focus:border-cyan-400"
                      >
                        <option value="">Select Industry</option>
                        <option value="field-service">Field Service</option>
                        <option value="hvac">HVAC</option>
                        <option value="plumbing">Plumbing</option>
                        <option value="electrical">Electrical</option>
                        <option value="landscaping">Landscaping</option>
                        <option value="cleaning">Cleaning Services</option>
                        <option value="pest-control">Pest Control</option>
                        <option value="roofing">Roofing</option>
                        <option value="security">Security Services</option>
                        <option value="maintenance">Maintenance</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-mono text-gray-300 mb-2">Company Size</label>
                      <select
                        name="businessSize"
                        value={formData.businessSize}
                        onChange={handleInputChange}
                        className="w-full bg-[#0A0B1E] border border-cyan-500/30 rounded-lg px-4 py-3 text-white font-mono focus:outline-none focus:border-cyan-400"
                      >
                        <option value="">Select Size</option>
                        <option value="1-5">1-5 employees</option>
                        <option value="6-20">6-20 employees</option>
                        <option value="21-50">21-50 employees</option>
                        <option value="51-100">51-100 employees</option>
                        <option value="100+">100+ employees</option>
                      </select>
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-mono text-gray-300 mb-2">Business Description *</label>
                    <textarea
                      name="businessDescription"
                      value={formData.businessDescription}
                      onChange={handleInputChange}
                      required
                      rows={3}
                      placeholder="Describe what your business does, your services, and target market..."
                      className="w-full bg-[#0A0B1E] border border-cyan-500/30 rounded-lg px-4 py-3 text-white font-mono focus:outline-none focus:border-cyan-400"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-mono text-gray-300 mb-2">Key Products/Services</label>
                    <textarea
                      name="keyProducts"
                      value={formData.keyProducts}
                      onChange={handleInputChange}
                      rows={2}
                      placeholder="List your main products or services..."
                      className="w-full bg-[#0A0B1E] border border-cyan-500/30 rounded-lg px-4 py-3 text-white font-mono focus:outline-none focus:border-cyan-400"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-mono text-gray-300 mb-2">Target Audience</label>
                    <textarea
                      name="targetAudience"
                      value={formData.targetAudience}
                      onChange={handleInputChange}
                      rows={2}
                      placeholder="Describe your ideal customers and target market..."
                      className="w-full bg-[#0A0B1E] border border-cyan-500/30 rounded-lg px-4 py-3 text-white font-mono focus:outline-none focus:border-cyan-400"
                    />
                  </div>
                </div>
              </div>

              {/* Automation Needs */}
              <div className="bg-gradient-to-b from-cyan-500/5 to-transparent border border-cyan-500/20 rounded-2xl p-8">
                <h3 className="text-xl font-mono font-semibold mb-6 flex items-center">
                  <Bot className="w-6 h-6 text-cyan-400 mr-3" />
                  Automation Needs
                </h3>
                
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-mono text-gray-300 mb-2">Current Challenges *</label>
                    <textarea
                      name="currentChallenges"
                      value={formData.currentChallenges}
                      onChange={handleInputChange}
                      required
                      rows={3}
                      placeholder="What business challenges are you facing? (e.g., customer support, lead generation, scheduling, etc.)"
                      className="w-full bg-[#0A0B1E] border border-cyan-500/30 rounded-lg px-4 py-3 text-white font-mono focus:outline-none focus:border-cyan-400"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-mono text-gray-300 mb-2">Automation Goals *</label>
                    <textarea
                      name="automationGoals"
                      value={formData.automationGoals}
                      onChange={handleInputChange}
                      required
                      rows={3}
                      placeholder="What would you like to automate? What outcomes are you hoping to achieve?"
                      className="w-full bg-[#0A0B1E] border border-cyan-500/30 rounded-lg px-4 py-3 text-white font-mono focus:outline-none focus:border-cyan-400"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-mono text-gray-300 mb-2">Package Type</label>
                    <select
                      name="consultationType"
                      value={formData.consultationType}
                      onChange={handleInputChange}
                      className="w-full bg-[#0A0B1E] border border-cyan-500/30 rounded-lg px-4 py-3 text-white font-mono focus:outline-none focus:border-cyan-400"
                    >
                      <option value="comprehensive">Comprehensive AI Package (Recommended)</option>
                      <option value="discovery">Discovery Call</option>
                      <option value="strategy">Strategy Session</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Scheduling */}
              <div className="bg-gradient-to-b from-cyan-500/5 to-transparent border border-cyan-500/20 rounded-2xl p-8">
                <h3 className="text-xl font-mono font-semibold mb-6 flex items-center">
                  <Calendar className="w-6 h-6 text-cyan-400 mr-3" />
                  Preferred Scheduling
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-mono text-gray-300 mb-2">Preferred Date</label>
                    <input
                      type="date"
                      name="preferredDate"
                      value={formData.preferredDate}
                      onChange={handleInputChange}
                      className="w-full bg-[#0A0B1E] border border-cyan-500/30 rounded-lg px-4 py-3 text-white font-mono focus:outline-none focus:border-cyan-400"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-mono text-gray-300 mb-2">Preferred Time</label>
                    <select
                      name="preferredTime"
                      value={formData.preferredTime}
                      onChange={handleInputChange}
                      className="w-full bg-[#0A0B1E] border border-cyan-500/30 rounded-lg px-4 py-3 text-white font-mono focus:outline-none focus:border-cyan-400"
                    >
                      <option value="">Select Time</option>
                      <option value="9:00 AM">9:00 AM</option>
                      <option value="10:00 AM">10:00 AM</option>
                      <option value="11:00 AM">11:00 AM</option>
                      <option value="1:00 PM">1:00 PM</option>
                      <option value="2:00 PM">2:00 PM</option>
                      <option value="3:00 PM">3:00 PM</option>
                      <option value="4:00 PM">4:00 PM</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Additional Information */}
              <div className="bg-gradient-to-b from-cyan-500/5 to-transparent border border-cyan-500/20 rounded-2xl p-8">
                <h3 className="text-xl font-mono font-semibold mb-6 flex items-center">
                  <MessageSquare className="w-6 h-6 text-cyan-400 mr-3" />
                  Additional Information
                </h3>
                
                <textarea
                  name="additionalInfo"
                  value={formData.additionalInfo}
                  onChange={handleInputChange}
                  rows={4}
                  placeholder="Any additional information that would help us understand your business better..."
                  className="w-full bg-[#0A0B1E] border border-cyan-500/30 rounded-lg px-4 py-3 text-white font-mono focus:outline-none focus:border-cyan-400"
                />
              </div>

              <div className="text-center">
                <button
                  type="submit"
                  className="font-mono bg-gradient-to-r from-cyan-500 to-blue-500 px-12 py-4 rounded-full text-lg font-semibold hover:shadow-lg hover:shadow-cyan-500/20 transition-all focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-offset-2 focus:ring-offset-[#0A0B1E]"
                >
                  Request Your AI Automation Package
                </button>
                <p className="text-sm text-gray-400 font-mono mt-4">
                  We'll begin researching your business immediately after submission
                </p>
              </div>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Consultation; 