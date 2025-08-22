import React, { useState } from 'react';
import { Calendar, Clock, User, Mail, Phone, Building, MessageSquare, CheckCircle, Bot, FileText, PhoneCall, Search, Brain, Globe, Target, DollarSign, ArrowRight } from 'lucide-react';
import CustomDemoForm from '../components/CustomDemoForm';

const Consultation: React.FC = () => {
  const [showCustomDemoForm, setShowCustomDemoForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    industry: '',
    consultationPackage: '',
    businessDescription: ''
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
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
            <h2 className="text-3xl font-mono font-bold mb-6">
              <span className="bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent">
                Consultation Request Submitted
              </span>
            </h2>
            <p className="text-xl text-gray-400 mb-8 font-mono">
              Thank you, {formData.name}. We've received your consultation request and will contact you within 24 hours to confirm your appointment and discuss your business automation needs.
            </p>
            
            <div className="bg-gradient-to-b from-cyan-500/10 to-transparent border border-cyan-500/20 rounded-2xl p-8 mb-8">
              <h3 className="text-xl font-mono font-semibold text-white mb-4">What Happens Next?</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <Brain className="w-12 h-12 text-cyan-400 mx-auto mb-3" />
                  <h4 className="font-mono font-semibold mb-2">Confirmation</h4>
                  <p className="text-gray-400 font-mono text-sm">We'll confirm your consultation appointment within 24 hours</p>
                </div>
                <div className="text-center">
                  <Calendar className="w-12 h-12 text-cyan-400 mx-auto mb-3" />
                  <h4 className="font-mono font-semibold mb-2">Consultation</h4>
                  <p className="text-gray-400 font-mono text-sm">Meet with our experts to discuss your automation needs</p>
                </div>
                <div className="text-center">
                  <MessageSquare className="w-12 h-12 text-cyan-400 mx-auto mb-3" />
                  <h4 className="font-mono font-semibold mb-2">Custom Solution</h4>
                  <p className="text-gray-400 font-mono text-sm">Receive a tailored automation strategy for your business</p>
                </div>
              </div>
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
          <div className="text-center max-w-4xl mx-auto mb-12">
            <div className="w-24 h-24 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <Brain className="w-12 h-12 text-white" />
            </div>
            <h1 className="font-mono text-5xl font-bold mb-6">
              <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                Book Your Consultation
              </span>
            </h1>
            <p className="text-xl text-gray-400 mb-8 font-mono">
              Schedule a consultation to discuss your field service business automation needs. 
              Our experts will help you identify opportunities and create a customized solution for your business.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              <div className="flex items-center bg-gradient-to-b from-cyan-500/10 to-transparent border border-cyan-500/20 rounded-xl p-4">
                <Brain className="w-8 h-8 text-cyan-400 mr-3" />
                <span className="font-mono text-sm">Custom AI Solutions</span>
              </div>
              <div className="flex items-center bg-gradient-to-b from-cyan-500/10 to-transparent border border-cyan-500/20 rounded-xl p-4">
                <Calendar className="w-8 h-8 text-cyan-400 mr-3" />
                <span className="font-mono text-sm">Flexible Scheduling</span>
              </div>
              <div className="flex items-center bg-gradient-to-b from-cyan-500/10 to-transparent border border-cyan-500/20 rounded-xl p-4">
                <MessageSquare className="w-8 h-8 text-cyan-400 mr-3" />
                <span className="font-mono text-sm">Expert Consultation</span>
              </div>
            </div>
          </div>

          {/* Consultation Packages */}
          <div className="max-w-6xl mx-auto mb-12">
            <h2 className="text-2xl font-mono font-bold text-center mb-8">
              <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                Choose Your Consultation Package
              </span>
            </h2>
            <p className="text-gray-400 text-center mb-8 font-mono">
              All consultation packages include comprehensive business analysis and customized automation recommendations.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Discovery Call */}
              <div className="bg-gradient-to-b from-gray-800/50 to-gray-900/50 rounded-2xl p-6 border border-gray-600/30">
                <div className="text-center mb-6">
                  <h3 className="text-xl font-mono font-semibold mb-2">Discovery Call</h3>
                  <div className="text-3xl font-mono font-bold text-green-400 mb-1">Free</div>
                  <div className="text-gray-400 font-mono text-sm">30 minutes</div>
                </div>
                <p className="text-gray-300 font-mono text-sm mb-6">
                  Initial consultation to understand your automation needs
                </p>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-start text-sm text-gray-300 font-mono">
                    <CheckCircle className="w-4 h-4 text-cyan-400 mr-2 mt-0.5 flex-shrink-0" />
                    Business requirements assessment
                  </li>
                  <li className="flex items-start text-sm text-gray-300 font-mono">
                    <CheckCircle className="w-4 h-4 text-cyan-400 mr-2 mt-0.5 flex-shrink-0" />
                    Automation opportunities review
                  </li>
                  <li className="flex items-start text-sm text-gray-300 font-mono">
                    <CheckCircle className="w-4 h-4 text-cyan-400 mr-2 mt-0.5 flex-shrink-0" />
                    Service overview and consultation planning
                  </li>
                </ul>
              </div>

              {/* Strategy Consultation - Recommended */}
              <div className="bg-gradient-to-b from-cyan-500/10 to-blue-500/10 rounded-2xl p-6 border border-cyan-500/30 relative">
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <span className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white px-4 py-1 rounded-full text-xs font-mono font-semibold">
                    Recommended
                  </span>
                </div>
                <div className="text-center mb-6">
                  <h3 className="text-xl font-mono font-semibold mb-2">Strategy Consultation</h3>
                  <div className="text-3xl font-mono font-bold text-cyan-400 mb-1">$297</div>
                  <div className="text-gray-400 font-mono text-sm">60 minutes</div>
                </div>
                <p className="text-gray-300 font-mono text-sm mb-6">
                  Comprehensive consultation to understand your needs and plan automation strategy
                </p>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-start text-sm text-gray-300 font-mono">
                    <CheckCircle className="w-4 h-4 text-cyan-400 mr-2 mt-0.5 flex-shrink-0" />
                    Business needs assessment and analysis
                  </li>
                  <li className="flex items-start text-sm text-gray-300 font-mono">
                    <CheckCircle className="w-4 h-4 text-cyan-400 mr-2 mt-0.5 flex-shrink-0" />
                    Custom automation strategy planning
                  </li>
                  <li className="flex items-start text-sm text-gray-300 font-mono">
                    <CheckCircle className="w-4 h-4 text-cyan-400 mr-2 mt-0.5 flex-shrink-0" />
                    ROI projections and implementation roadmap
                  </li>
                  <li className="flex items-start text-sm text-gray-300 font-mono">
                    <CheckCircle className="w-4 h-4 text-cyan-400 mr-2 mt-0.5 flex-shrink-0" />
                    Technology recommendations and next steps
                  </li>
                </ul>
              </div>

              {/* Technical Planning */}
              <div className="bg-gradient-to-b from-gray-800/50 to-gray-900/50 rounded-2xl p-6 border border-gray-600/30">
                <div className="text-center mb-6">
                  <h3 className="text-xl font-mono font-semibold mb-2">Technical Planning</h3>
                  <div className="text-3xl font-mono font-bold text-green-400 mb-1">$197</div>
                  <div className="text-gray-400 font-mono text-sm">45 minutes</div>
                </div>
                <p className="text-gray-300 font-mono text-sm mb-6">
                  Deep dive into your processes and technical requirements
                </p>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-start text-sm text-gray-300 font-mono">
                    <CheckCircle className="w-4 h-4 text-cyan-400 mr-2 mt-0.5 flex-shrink-0" />
                    Technical requirements analysis
                  </li>
                  <li className="flex items-start text-sm text-gray-300 font-mono">
                    <CheckCircle className="w-4 h-4 text-cyan-400 mr-2 mt-0.5 flex-shrink-0" />
                    Integration planning and assessment
                  </li>
                  <li className="flex items-start text-sm text-gray-300 font-mono">
                    <CheckCircle className="w-4 h-4 text-cyan-400 mr-2 mt-0.5 flex-shrink-0" />
                    Implementation strategy development
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Custom Demo Form */}
          {showCustomDemoForm ? (
            <CustomDemoForm />
          ) : (
            <div className="max-w-4xl mx-auto">
              <div className="bg-gradient-to-b from-gray-800/50 to-gray-900/50 rounded-2xl p-8 border border-cyan-500/20">
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-mono font-bold mb-4">
                    <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                      Book Your Consultation
                    </span>
                  </h3>
                  <p className="text-gray-400 font-mono">
                    Complete the form below to schedule your consultation and discuss your business automation needs.
                  </p>
                </div>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-mono font-medium text-gray-300 mb-2">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => handleInputChange('name', e.target.value)}
                        required
                        className="w-full p-3 bg-gray-800/50 border border-cyan-500/30 rounded-lg text-white font-mono focus:outline-none focus:border-cyan-400"
                        placeholder="Your full name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-mono font-medium text-gray-300 mb-2">
                        Business Email Address *
                      </label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        required
                        className="w-full p-3 bg-gray-800/50 border border-cyan-500/30 rounded-lg text-white font-mono focus:outline-none focus:border-cyan-400"
                        placeholder="your.name@company.com"
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-mono font-medium text-gray-300 mb-2">
                        Company Name *
                      </label>
                      <input
                        type="text"
                        value={formData.company}
                        onChange={(e) => handleInputChange('company', e.target.value)}
                        required
                        className="w-full p-3 bg-gray-800/50 border border-cyan-500/30 rounded-lg text-white font-mono focus:outline-none focus:border-cyan-400"
                        placeholder="Your company name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-mono font-medium text-gray-300 mb-2">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => handleInputChange('phone', e.target.value)}
                        className="w-full p-3 bg-gray-800/50 border border-cyan-500/30 rounded-lg text-white font-mono focus:outline-none focus:border-cyan-400"
                        placeholder="Your phone number"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-mono font-medium text-gray-300 mb-2">
                      Industry *
                    </label>
                    <select
                      value={formData.industry}
                      onChange={(e) => handleInputChange('industry', e.target.value)}
                      required
                      className="w-full p-3 bg-gray-800/50 border border-cyan-500/30 rounded-lg text-white font-mono focus:outline-none focus:border-cyan-400"
                    >
                      <option value="">Select your field service industry</option>
                      <option value="hvac">HVAC & Climate Control</option>
                      <option value="plumbing">Plumbing Services</option>
                      <option value="electrical">Electrical Services</option>
                      <option value="maintenance">Maintenance & Repair</option>
                      <option value="landscaping">Landscaping & Grounds</option>
                      <option value="cleaning">Commercial Cleaning</option>
                      <option value="security">Security & Access Control</option>
                      <option value="telecommunications">Telecommunications</option>
                      <option value="utilities">Utilities & Infrastructure</option>
                      <option value="manufacturing">Manufacturing Support</option>
                      <option value="other-field-service">Other Field Service</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-mono font-medium text-gray-300 mb-2">
                      Consultation Package *
                    </label>
                    <select
                      value={formData.consultationPackage}
                      onChange={(e) => handleInputChange('consultationPackage', e.target.value)}
                      required
                      className="w-full p-3 bg-gray-800/50 border border-cyan-500/30 rounded-lg text-white font-mono focus:outline-none focus:border-cyan-400"
                    >
                      <option value="">Select your consultation package</option>
                      <option value="discovery">Discovery Call - Free (30 minutes)</option>
                      <option value="strategy">Strategy Consultation - $297 (60 minutes)</option>
                      <option value="technical">Technical Planning - $197 (45 minutes)</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-mono font-medium text-gray-300 mb-2">
                      Business Description *
                    </label>
                    <textarea
                      value={formData.businessDescription}
                      onChange={(e) => handleInputChange('businessDescription', e.target.value)}
                      required
                      rows={4}
                      className="w-full p-3 bg-gray-800/50 border border-cyan-500/30 rounded-lg text-white font-mono focus:outline-none focus:border-cyan-400"
                      placeholder="Describe your field service business, current challenges, and what you hope to achieve with automation..."
                    />
                  </div>
                  
                  <div className="text-center">
                    <button
                      type="submit"
                      disabled={false} // isLoading state removed
                      className="font-mono bg-gradient-to-r from-cyan-500 to-blue-500 px-8 py-4 rounded-full text-lg font-semibold hover:shadow-lg hover:shadow-cyan-500/20 transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {/* isLoading ? (
                        <div className="flex items-center gap-3">
                          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          Submitting...
                        </div>
                      ) : ( */}
                        <div className="flex items-center gap-3">
                          <Brain className="w-5 h-5" />
                          Book Consultation
                          <ArrowRight className="w-5 h-5" />
                        </div>
                      {/* ) */}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Consultation; 