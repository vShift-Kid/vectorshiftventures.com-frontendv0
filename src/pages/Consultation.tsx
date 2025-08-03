import React, { useState } from 'react';
import { Calendar, Clock, User, Mail, Phone, Building, MessageSquare, CheckCircle, Bot, FileText, PhoneCall, Search, Brain, Globe, Upload, Target, DollarSign } from 'lucide-react';

const Consultation: React.FC = () => {
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
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setUploadedFiles(Array.from(e.target.files));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the form data to your backend
    console.log('Consultation request:', formData);
    console.log('Uploaded files:', uploadedFiles);
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
              Thank you! We'll use your comprehensive business information to train custom demo and phone agents specifically for your company.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-gradient-to-b from-cyan-500/10 to-transparent border border-cyan-500/20 rounded-2xl p-6">
                <Bot className="w-12 h-12 text-cyan-400 mx-auto mb-4" />
                <h3 className="text-lg font-mono font-semibold mb-2">Trained Demo Agent</h3>
                <p className="text-sm text-gray-400 font-mono">AI agent trained on your business, industry, and specific challenges</p>
              </div>
              
              <div className="bg-gradient-to-b from-cyan-500/10 to-transparent border border-cyan-500/20 rounded-2xl p-6">
                <PhoneCall className="w-12 h-12 text-cyan-400 mx-auto mb-4" />
                <h3 className="text-lg font-mono font-semibold mb-2">Trained Phone Agent</h3>
                <p className="text-sm text-gray-400 font-mono">Phone system trained on your company information and processes</p>
              </div>
              
              <div className="bg-gradient-to-b from-cyan-500/10 to-transparent border border-cyan-500/20 rounded-2xl p-6">
                <FileText className="w-12 h-12 text-cyan-400 mx-auto mb-4" />
                <h3 className="text-lg font-mono font-semibold mb-2">Custom Strategy</h3>
                <p className="text-sm text-gray-400 font-mono">Tailored automation proposal based on your specific needs</p>
              </div>
            </div>

            <div className="bg-gradient-to-b from-cyan-500/10 to-transparent border border-cyan-500/20 rounded-2xl p-8">
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
                  Create demo agent that understands your business challenges
                </li>
                <li className="flex items-center">
                  <PhoneCall className="w-5 h-5 text-cyan-400 mr-3 flex-shrink-0" />
                  Configure phone agent with your company information
                </li>
                <li className="flex items-center">
                  <Calendar className="w-5 h-5 text-cyan-400 mr-3 flex-shrink-0" />
                  Schedule consultation to present your custom solution
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
                Consultation Capture Demo
              </span>
            </h1>
            <p className="text-xl text-gray-400 mb-8 font-mono">
              Provide comprehensive information about your business to receive a custom automation solution with trained AI agents.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              <div className="flex items-center bg-gradient-to-b from-cyan-500/10 to-transparent border border-cyan-500/20 rounded-xl p-4">
                <Bot className="w-8 h-8 text-cyan-400 mr-3" />
                <span className="font-mono text-sm">Trained Demo Agent</span>
              </div>
              <div className="flex items-center bg-gradient-to-b from-cyan-500/10 to-transparent border border-cyan-500/20 rounded-xl p-4">
                <PhoneCall className="w-8 h-8 text-cyan-400 mr-3" />
                <span className="font-mono text-sm">Trained Phone Agent</span>
              </div>
              <div className="flex items-center bg-gradient-to-b from-cyan-500/10 to-transparent border border-cyan-500/20 rounded-xl p-4">
                <FileText className="w-8 h-8 text-cyan-400 mr-3" />
                <span className="font-mono text-sm">Custom Solution</span>
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

              {/* Additional Documents */}
              <div className="bg-gradient-to-b from-cyan-500/5 to-transparent border border-cyan-500/20 rounded-2xl p-8">
                <h3 className="text-xl font-mono font-semibold mb-6 flex items-center">
                  <Upload className="w-6 h-6 text-cyan-400 mr-3" />
                  Additional Documents
                </h3>
                
                <div>
                  <label className="block text-sm font-mono text-gray-300 mb-2">
                    Upload relevant documents (PDF, Word, Excel, etc.)
                  </label>
                  <div className="border-2 border-dashed border-cyan-500/30 rounded-lg p-6 text-center hover:border-cyan-500/50 transition-colors">
                    <Upload className="w-12 h-12 text-cyan-400 mx-auto mb-4" />
                    <input
                      type="file"
                      multiple
                      accept=".pdf,.doc,.docx,.xls,.xlsx,.txt"
                      onChange={handleFileUpload}
                      className="hidden"
                      id="file-upload"
                    />
                    <label 
                      htmlFor="file-upload"
                      className="cursor-pointer font-mono text-cyan-400 hover:text-cyan-300 transition-colors"
                    >
                      Choose Files
                    </label>
                    <p className="text-sm text-gray-400 font-mono mt-2">
                      Drag and drop files here or click to browse
                    </p>
                    {uploadedFiles.length > 0 && (
                      <div className="mt-4 text-left">
                        <p className="text-sm font-mono text-gray-300 mb-2">Uploaded files:</p>
                        <ul className="space-y-1">
                          {uploadedFiles.map((file, index) => (
                            <li key={index} className="text-sm font-mono text-cyan-400">
                              • {file.name}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
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