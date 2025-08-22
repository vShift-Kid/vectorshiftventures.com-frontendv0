import React, { useState } from 'react';
import { Calendar, Clock, User, Mail, Phone, Building, MessageSquare, CheckCircle, Bot, FileText, PhoneCall, Search, Brain, Globe, Target, DollarSign, ArrowRight } from 'lucide-react';
import CustomDemoForm from '../components/CustomDemoForm';

const Consultation: React.FC = () => {
  const [showCustomDemoForm, setShowCustomDemoForm] = useState(false);
  const [formData, setFormData] = useState({
    // Company Information
    companyName: '',
    industry: '',
    companyWebsite: '',
    companySize: '',
    
    // Contact Information
    contactName: '',
    contactEmail: '',
    contactPhone: '',
    contactRole: '',
    
    // Business Needs & Goals
    businessDescription: '',
    currentChallenges: '',
    automationGoals: '',
    timeline: '',
    budgetRange: '',
    
    // Additional
    consultationType: 'strategy',
    preferredDate: '',
    preferredTime: '',
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
      title: "Strategy Consultation",
      duration: "60 minutes",
      description: "Comprehensive consultation to understand your needs and plan automation strategy",
      features: [
        "Business needs assessment and analysis",
        "Custom automation strategy planning",
        "ROI projections and implementation roadmap",
        "Technology recommendations and next steps"
      ],
      price: "Free",
      recommended: true
    },
    {
      title: "Discovery Call",
      duration: "30 minutes",
      description: "Initial consultation to understand your automation needs",
      features: [
        "Business requirements assessment",
        "Automation opportunities review",
        "Service overview and consultation planning"
      ],
      price: "Free"
    },
    {
      title: "Technical Planning",
      duration: "45 minutes",
      description: "Deep dive into your processes and technical requirements",
      features: [
        "Technical requirements analysis",
        "Integration planning and assessment",
        "Implementation strategy development"
      ],
      price: "Free"
    }
  ];

  if (showCustomDemoForm) {
    return (
      <div className="min-h-screen bg-[#0A0B1E] text-white pt-20">
        <div className="container mx-auto px-6 py-20">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-2xl font-mono font-bold mb-4">
              <span className="bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent">
                Your Custom Demo Request
              </span>
            </h2>
            <p className="text-gray-400 font-mono">
              Complete this form to receive your personalized AI voice assistant and website demo within 24-48 hours.
            </p>
          </div>
          <CustomDemoForm />
          <div className="text-center mt-8">
            <button
              onClick={() => setShowCustomDemoForm(false)}
              className="font-mono text-cyan-400 hover:text-cyan-300 transition-colors"
            >
              ← Back to Consultation
            </button>
          </div>
        </div>
      </div>
    );
  }

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
              Thank you for providing your business information! Now let's create your custom AI voice assistant and website demo.
            </p>
            
            <div className="bg-gradient-to-b from-green-500/10 to-transparent border border-green-500/20 rounded-2xl p-8 mb-8">
              <h3 className="text-xl font-mono font-semibold mb-4 text-green-400">🎁 Your Reward: Custom Demo</h3>
              <p className="text-gray-300 font-mono mb-6">
                As a thank you for providing your comprehensive business information, we'll create a personalized AI voice assistant and website demo specifically for your company.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <Brain className="w-12 h-12 text-cyan-400 mx-auto mb-3" />
                  <h4 className="font-mono font-semibold mb-2">Custom AI Voice Assistant</h4>
                  <p className="text-gray-400 font-mono text-sm">Trained on your business information and processes</p>
                </div>
                <div className="text-center">
                  <Globe className="w-12 h-12 text-cyan-400 mx-auto mb-3" />
                  <h4 className="font-mono font-semibold mb-2">Personalized Website</h4>
                  <p className="text-gray-400 font-mono text-sm">Custom branding and features for your business</p>
                </div>
                <div className="text-center">
                  <Calendar className="w-12 h-12 text-cyan-400 mx-auto mb-3" />
                  <h4 className="font-mono font-semibold mb-2">24-48 Hour Delivery</h4>
                  <p className="text-gray-400 font-mono text-sm">Fast turnaround with professional consultation</p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-b from-cyan-500/10 to-transparent border border-cyan-500/20 rounded-2xl p-8 mb-8">
              <h3 className="text-lg font-mono font-semibold mb-4">What Happens Next?</h3>
              <ul className="text-left space-y-3 text-gray-300 font-mono">
                <li className="flex items-center">
                  <Search className="w-5 h-5 text-cyan-400 mr-3 flex-shrink-0" />
                  We analyze your business information and industry data
                </li>
                <li className="flex items-center">
                  <Brain className="w-5 h-5 text-cyan-400 mr-3 flex-shrink-0" />
                  Train AI agents with your company-specific knowledge
                </li>
                <li className="flex items-center">
                  <Bot className="w-5 h-5 text-cyan-400 mr-3 flex-shrink-0" />
                  Create custom voice assistant for your business
                </li>
                <li className="flex items-center">
                  <Globe className="w-5 h-5 text-cyan-400 mr-3 flex-shrink-0" />
                  Build personalized website with your branding
                </li>
                <li className="flex items-center">
                  <Calendar className="w-5 h-5 text-cyan-400 mr-3 flex-shrink-0" />
                  Deliver your custom demo within 24-48 hours
                </li>
              </ul>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => setShowCustomDemoForm(true)}
                className="font-mono bg-gradient-to-r from-cyan-500 to-blue-500 px-8 py-4 rounded-full text-lg font-semibold hover:shadow-lg hover:shadow-cyan-500/20 transition-all transform hover:scale-105"
              >
                <div className="flex items-center gap-3">
                  <Brain className="w-5 h-5" />
                  Request Custom Demo Now
                  <ArrowRight className="w-5 h-5" />
                </div>
              </button>
              <button
                onClick={() => setIsSubmitted(false)}
                className="font-mono border border-cyan-500/30 px-8 py-4 rounded-full text-lg font-semibold hover:bg-cyan-500/10 transition-all"
              >
                Submit Another Request
              </button>
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
            <div className="w-24 h-24 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <Brain className="w-12 h-12 text-white" />
            </div>
            <h1 className="font-mono text-5xl font-bold mb-6">
              <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                Get Your Custom Field Service Voice Assistant
              </span>
            </h1>
            <p className="text-xl text-gray-400 mb-8 font-mono">
              Provide your field service business information and receive a personalized AI voice assistant 
              for customer service and operations. Available for a 7-day trial period.
            </p>
            
            <div className="bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/30 rounded-2xl p-6 mb-8">
              <h3 className="text-lg font-mono font-semibold mb-3 text-green-400">🎁 Free 7-Day Trial Reward</h3>
              <p className="text-gray-300 font-mono text-sm">
                Complete the consultation form below and receive a personalized field service AI voice assistant 
                for a 7-day trial period - completely free! Business email required.
              </p>
            </div>
            
            <div className="bg-gradient-to-r from-blue-500/10 to-cyan-500/10 border border-blue-500/30 rounded-2xl p-6 mb-8">
              <h3 className="text-lg font-mono font-semibold mb-3 text-blue-400">🏢 Built for Field Service Operations</h3>
              <p className="text-gray-300 font-mono text-sm">
                Designed for HVAC, plumbing, electrical, maintenance, and other field service businesses. 
                Handles customer service, scheduling, and business problem-solving for B2B operations.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              <div className="flex items-center bg-gradient-to-b from-cyan-500/10 to-transparent border border-cyan-500/20 rounded-xl p-4">
                <Brain className="w-8 h-8 text-cyan-400 mr-3" />
                <span className="font-mono text-sm">Custom AI Voice Assistant</span>
              </div>
              <div className="flex items-center bg-gradient-to-b from-cyan-500/10 to-transparent border border-cyan-500/20 rounded-xl p-4">
                <Calendar className="w-8 h-8 text-cyan-400 mr-3" />
                <span className="font-mono text-sm">7-Day Trial Period</span>
              </div>
              <div className="flex items-center bg-gradient-to-b from-cyan-500/10 to-transparent border border-cyan-500/20 rounded-xl p-4">
                <MessageSquare className="w-8 h-8 text-cyan-400 mr-3" />
                <span className="font-mono text-sm">Field Service Focus</span>
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
              Choose Your <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">Consultation Package</span>
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto font-mono">
              All consultation packages include trained AI agents based on your comprehensive business information.
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

      {/* Comprehensive Form */}
      <section className="py-20 bg-gradient-to-b from-[#0A0B1E] to-[#0A0B1E]/80">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-mono font-bold mb-4">
                <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                  Provide Comprehensive Business Information
                </span>
              </h2>
              <p className="text-gray-400 font-mono">
                This information will be used to train your custom demo and phone agents with knowledge specific to your business.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Company Information */}
              <div className="bg-gradient-to-b from-cyan-500/5 to-transparent border border-cyan-500/20 rounded-2xl p-8">
                <h3 className="text-xl font-mono font-semibold mb-6 flex items-center">
                  <Building className="w-6 h-6 text-cyan-400 mr-3" />
                  Company Information
                </h3>
                
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-mono text-gray-300 mb-2">Company Name *</label>
                      <input
                        type="text"
                        name="companyName"
                        value={formData.companyName}
                        onChange={handleInputChange}
                        required
                        placeholder="Enter company name"
                        className="w-full bg-[#0A0B1E] border border-cyan-500/30 rounded-lg px-4 py-3 text-white font-mono focus:outline-none focus:border-cyan-400"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-mono text-gray-300 mb-2">Industry *</label>
                      <select
                        name="industry"
                        value={formData.industry}
                        onChange={handleInputChange}
                        required
                        className="w-full bg-[#0A0B1E] border border-cyan-500/30 rounded-lg px-4 py-3 text-white font-mono focus:outline-none focus:border-cyan-400"
                      >
                        <option value="">Select industry</option>
                        <option value="technology">Technology/SaaS</option>
                        <option value="ecommerce">E-commerce/Retail</option>
                        <option value="healthcare">Healthcare</option>
                        <option value="finance">Financial Services</option>
                        <option value="real-estate">Real Estate</option>
                        <option value="professional-services">Professional Services</option>
                        <option value="education">Education</option>
                        <option value="manufacturing">Manufacturing</option>
                        <option value="marketing">Marketing/Advertising</option>
                        <option value="consulting">Consulting</option>
                        <option value="hospitality">Hospitality</option>
                        <option value="construction">Construction</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-mono text-gray-300 mb-2">Company Website</label>
                      <input
                        type="url"
                        name="companyWebsite"
                        value={formData.companyWebsite}
                        onChange={handleInputChange}
                        placeholder="https://yourcompany.com"
                        className="w-full bg-[#0A0B1E] border border-cyan-500/30 rounded-lg px-4 py-3 text-white font-mono focus:outline-none focus:border-cyan-400"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-mono text-gray-300 mb-2">Company Size</label>
                      <select
                        name="companySize"
                        value={formData.companySize}
                        onChange={handleInputChange}
                        className="w-full bg-[#0A0B1E] border border-cyan-500/30 rounded-lg px-4 py-3 text-white font-mono focus:outline-none focus:border-cyan-400"
                      >
                        <option value="">Select company size</option>
                        <option value="1-10">1-10 employees</option>
                        <option value="11-50">11-50 employees</option>
                        <option value="51-200">51-200 employees</option>
                        <option value="201-1000">201-1,000 employees</option>
                        <option value="1000+">1,000+ employees</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>

              {/* Contact Information */}
              <div className="bg-gradient-to-b from-cyan-500/5 to-transparent border border-cyan-500/20 rounded-2xl p-8">
                <h3 className="text-xl font-mono font-semibold mb-6 flex items-center">
                  <User className="w-6 h-6 text-cyan-400 mr-3" />
                  Contact Information
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-mono text-gray-300 mb-2">Contact Name *</label>
                    <input
                      type="text"
                      name="contactName"
                      value={formData.contactName}
                      onChange={handleInputChange}
                      required
                      placeholder="Your full name"
                      className="w-full bg-[#0A0B1E] border border-cyan-500/30 rounded-lg px-4 py-3 text-white font-mono focus:outline-none focus:border-cyan-400"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-mono text-gray-300 mb-2">Contact Email *</label>
                    <input
                      type="email"
                      name="contactEmail"
                      value={formData.contactEmail}
                      onChange={handleInputChange}
                      required
                      placeholder="your.email@company.com"
                      className="w-full bg-[#0A0B1E] border border-cyan-500/30 rounded-lg px-4 py-3 text-white font-mono focus:outline-none focus:border-cyan-400"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-mono text-gray-300 mb-2">Contact Phone</label>
                    <input
                      type="tel"
                      name="contactPhone"
                      value={formData.contactPhone}
                      onChange={handleInputChange}
                      placeholder="+1 (555) 123-4567"
                      className="w-full bg-[#0A0B1E] border border-cyan-500/30 rounded-lg px-4 py-3 text-white font-mono focus:outline-none focus:border-cyan-400"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-mono text-gray-300 mb-2">Your Role</label>
                    <input
                      type="text"
                      name="contactRole"
                      value={formData.contactRole}
                      onChange={handleInputChange}
                      placeholder="e.g., Operations Manager, CEO, etc."
                      className="w-full bg-[#0A0B1E] border border-cyan-500/30 rounded-lg px-4 py-3 text-white font-mono focus:outline-none focus:border-cyan-400"
                    />
                  </div>
                </div>
              </div>

              {/* Business Needs & Goals */}
              <div className="bg-gradient-to-b from-cyan-500/5 to-transparent border border-cyan-500/20 rounded-2xl p-8">
                <h3 className="text-xl font-mono font-semibold mb-6 flex items-center">
                  <Target className="w-6 h-6 text-cyan-400 mr-3" />
                  Business Needs & Goals
                </h3>
                
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-mono text-gray-300 mb-2">Business Description *</label>
                    <textarea
                      name="businessDescription"
                      value={formData.businessDescription}
                      onChange={handleInputChange}
                      required
                      rows={4}
                      placeholder="Describe your business operations and current processes..."
                      className="w-full bg-[#0A0B1E] border border-cyan-500/30 rounded-lg px-4 py-3 text-white font-mono focus:outline-none focus:border-cyan-400"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-mono text-gray-300 mb-2">Current Challenges *</label>
                    <textarea
                      name="currentChallenges"
                      value={formData.currentChallenges}
                      onChange={handleInputChange}
                      required
                      rows={4}
                      placeholder="What challenges are you facing with current processes?"
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
                      rows={4}
                      placeholder="What do you want to achieve with automation?"
                      className="w-full bg-[#0A0B1E] border border-cyan-500/30 rounded-lg px-4 py-3 text-white font-mono focus:outline-none focus:border-cyan-400"
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-mono text-gray-300 mb-2">Timeline</label>
                      <select
                        name="timeline"
                        value={formData.timeline}
                        onChange={handleInputChange}
                        className="w-full bg-[#0A0B1E] border border-cyan-500/30 rounded-lg px-4 py-3 text-white font-mono focus:outline-none focus:border-cyan-400"
                      >
                        <option value="">Select timeline</option>
                        <option value="immediate">Immediate (within 1 month)</option>
                        <option value="short-term">Short-term (1-3 months)</option>
                        <option value="medium-term">Medium-term (3-6 months)</option>
                        <option value="long-term">Long-term (6+ months)</option>
                        <option value="exploring">Just exploring options</option>
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-mono text-gray-300 mb-2">Budget Range</label>
                      <select
                        name="budgetRange"
                        value={formData.budgetRange}
                        onChange={handleInputChange}
                        className="w-full bg-[#0A0B1E] border border-cyan-500/30 rounded-lg px-4 py-3 text-white font-mono focus:outline-none focus:border-cyan-400"
                      >
                        <option value="">Select budget range</option>
                        <option value="under-5k">Under $5,000</option>
                        <option value="5k-15k">$5,000 - $15,000</option>
                        <option value="15k-50k">$15,000 - $50,000</option>
                        <option value="50k-100k">$50,000 - $100,000</option>
                        <option value="100k+">$100,000+</option>
                        <option value="not-sure">Not sure yet</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>

              {/* Consultation Type & Scheduling */}
              <div className="bg-gradient-to-b from-cyan-500/5 to-transparent border border-cyan-500/20 rounded-2xl p-8">
                <h3 className="text-xl font-mono font-semibold mb-6 flex items-center">
                  <Calendar className="w-6 h-6 text-cyan-400 mr-3" />
                  Consultation Preferences
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <label className="block text-sm font-mono text-gray-300 mb-2">Consultation Type</label>
                    <select
                      name="consultationType"
                      value={formData.consultationType}
                      onChange={handleInputChange}
                      className="w-full bg-[#0A0B1E] border border-cyan-500/30 rounded-lg px-4 py-3 text-white font-mono focus:outline-none focus:border-cyan-400"
                    >
                      <option value="strategy">Strategy Consultation</option>
                      <option value="discovery">Discovery Call</option>
                      <option value="technical">Technical Planning</option>
                    </select>
                  </div>
                  
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
                  Submit Consultation Request
                </button>
                <p className="text-sm text-gray-400 font-mono mt-4">
                  We'll use this information to train your custom AI agents and prepare your consultation
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