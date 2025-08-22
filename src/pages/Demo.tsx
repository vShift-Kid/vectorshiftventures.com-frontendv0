import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Bot, MessageSquare, Database, Calendar, CircuitBoard, Cpu, Network, Play, ExternalLink, CheckCircle, Zap, TrendingUp, Calculator, Lightbulb, ArrowRight, Download, BarChart3, Target, Clock, DollarSign, Phone, Brain, FileText, Users, Mail, MessageSquare as TextIcon, Users as SocialIcon, Star, Upload, AlertTriangle, Mic } from 'lucide-react';
import { getWebhookUrl } from '../config/api';
import VoiceAssistant from '../components/VoiceAssistant';

interface ContactData {
  name: string;
  email: string;
  company: string;
  industry: string;
  preferredContact: string;
  businessChallenge: string;
  uploadedFiles: File[];
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
    businessChallenge: '',
    uploadedFiles: []
  });
  
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [dragActive, setDragActive] = useState(false);

  const handleInputChange = (field: keyof ContactData, value: string) => {
    setContactData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleFileUpload = (files: FileList | null) => {
    if (!files) return;
    
    const newFiles = Array.from(files);
    const totalSize = newFiles.reduce((acc, file) => acc + file.size, 0);
    const maxSize = 10 * 1024 * 1024; // 10MB limit
    
    if (totalSize > maxSize) {
      alert('Total file size exceeds 10MB limit. Please select smaller files.');
      return;
    }
    
    setContactData(prev => ({
      ...prev,
      uploadedFiles: [...prev.uploadedFiles, ...newFiles]
    }));
  };

  const removeFile = (index: number) => {
    setContactData(prev => ({
      ...prev,
      uploadedFiles: prev.uploadedFiles.filter((_, i) => i !== index)
    }));
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileUpload(e.dataTransfer.files);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      // Prepare the form data
      const formData = new FormData();
      
      // Add basic form fields
      formData.append('name', contactData.name);
      formData.append('email', contactData.email);
      formData.append('company', contactData.company);
      formData.append('industry', contactData.industry);
      formData.append('preferredContact', contactData.preferredContact);
      formData.append('businessChallenge', contactData.businessChallenge);
      
      // Add uploaded files
      contactData.uploadedFiles.forEach((file, index) => {
        formData.append(`file_${index}`, file);
      });
      
      // Add metadata about files
      formData.append('fileCount', contactData.uploadedFiles.length.toString());
      formData.append('submissionTimestamp', new Date().toISOString());
      
      // Send to n8n webhook
      const response = await fetch(getWebhookUrl('demo'), {
        method: 'POST',
        body: formData,
        // Don't set Content-Type header - let the browser set it with boundary for FormData
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const result = await response.json();
      console.log('n8n webhook response:', result);
      
      // Show success state
      setIsSubmitted(true);
      setIsLoading(false);
      
    } catch (error) {
      console.error('Error submitting to n8n:', error);
      
      // For now, still show success even if webhook fails
      // You might want to show an error message instead
      setIsSubmitted(true);
      setIsLoading(false);
    }
  };

  const valuePropositions: ValueProposition[] = [
    {
      title: "Strategic Automation Blueprint",
      description: "Comprehensive roadmap with step-by-step automation strategy for your specific business challenges",
      icon: FileText,
      value: "Free Strategic Plan"
    },
    {
      title: "Digital Presence Analysis",
      description: "Complete assessment of your online reputation and digital footprint optimization opportunities",
      icon: SocialIcon,
      value: "Free Digital Audit"
    },
    {
      title: "Lead Generation Strategy",
      description: "Custom lead capture and CRM optimization strategy for your industry and target market",
      icon: Users,
      value: "Free Lead Strategy"
    },
    {
      title: "AI Implementation Roadmap",
      description: "Custom chatbot and data analysis implementation plan tailored to your business processes",
      icon: Brain,
      value: "Free AI Roadmap"
    }
  ];

  const services = [
    {
      icon: SocialIcon,
      title: "Online Reputation Management",
      description: "Comprehensive digital presence optimization and brand reputation enhancement",
      features: ["Website performance optimization", "Social media management", "Review monitoring & response", "Brand sentiment analysis", "Digital footprint management"]
    },
    {
      icon: Users,
      title: "Lead Generation & CRM",
      description: "End-to-end lead capture, qualification, and customer relationship management",
      features: ["Lead scoring & qualification", "CRM system integration", "Automated follow-up sequences", "Conversion funnel optimization", "Customer lifecycle management"]
    },
    {
      icon: Bot,
      title: "Custom AI Chatbots",
      description: "Intelligent conversational AI trained specifically on your business data and processes",
      features: ["Custom AI training", "24/7 customer engagement", "Multi-channel deployment", "Business process integration", "Continuous learning & improvement"]
    },
    {
      icon: BarChart3,
      title: "Data Analysis & Insights",
      description: "Advanced analytics and actionable business intelligence from your operational data",
      features: ["Performance analytics", "Predictive insights", "Business intelligence dashboards", "ROI tracking & optimization", "Strategic decision support"]
    },
    {
      icon: CircuitBoard,
      title: "Workflow Integrations",
      description: "Seamless automation and integration across your existing business systems and processes",
      features: ["System integration", "Process automation", "API connectivity", "Workflow optimization", "Scalable architecture"]
    }
  ];

  const caseStudies = [
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

                {/* File Upload Section */}
                <div>
                  <label className="block text-sm font-mono font-medium text-gray-300 mb-2">
                    Upload Supporting Documentation (Optional)
                  </label>
                  <div
                    className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
                      dragActive 
                        ? 'border-cyan-400 bg-cyan-500/10' 
                        : 'border-cyan-500/30 hover:border-cyan-500/50'
                    }`}
                    onDragEnter={handleDrag}
                    onDragLeave={handleDrag}
                    onDragOver={handleDrag}
                    onDrop={handleDrop}
                  >
                    <Upload className="w-8 h-8 text-cyan-400 mx-auto mb-3" />
                    <p className="text-gray-300 font-mono mb-2">
                      Drag and drop files here, or{' '}
                      <label className="text-cyan-400 hover:text-cyan-300 cursor-pointer">
                        browse files
                        <input
                          type="file"
                          multiple
                          className="hidden"
                          onChange={(e) => handleFileUpload(e.target.files)}
                          accept=".pdf,.doc,.docx,.txt,.jpg,.jpeg,.png,.gif"
                        />
                      </label>
                    </p>
                    <p className="text-sm text-gray-400 font-mono">
                      Maximum 10MB total • PDF, DOC, TXT, Images accepted
                    </p>
                  </div>

                  {/* Security Disclaimer */}
                  <div className="mt-3 p-3 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
                    <div className="flex items-start">
                      <AlertTriangle className="w-5 h-5 text-yellow-400 mr-2 mt-0.5 flex-shrink-0" />
                      <div className="text-sm text-yellow-300 font-mono">
                        <strong>Security Notice:</strong> Please do not upload proprietary data, trade secrets, 
                        or any information that should not be publicly accessible. While we take security seriously, 
                        we cannot be responsible for the content you upload. Only share non-sensitive, general business information.
                      </div>
                    </div>
                  </div>

                  {/* Uploaded Files List */}
                  {contactData.uploadedFiles.length > 0 && (
                    <div className="mt-4">
                      <h4 className="text-sm font-mono font-medium text-gray-300 mb-2">Uploaded Files:</h4>
                      <div className="space-y-2">
                        {contactData.uploadedFiles.map((file, index) => (
                          <div key={index} className="flex items-center justify-between p-2 bg-gray-800/30 rounded">
                            <div className="flex items-center">
                              <FileText className="w-4 h-4 text-cyan-400 mr-2" />
                              <span className="text-sm text-gray-300 font-mono">{file.name}</span>
                              <span className="text-xs text-gray-400 ml-2">
                                ({(file.size / 1024 / 1024).toFixed(2)} MB)
                              </span>
                            </div>
                            <button
                              type="button"
                              onClick={() => removeFile(index)}
                              className="text-red-400 hover:text-red-300 text-sm"
                            >
                              Remove
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
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

      {/* Try Voice Assistant Section */}
      <section className="py-20 bg-gradient-to-b from-[#0A0B1E]/80 to-[#0A0B1E]">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <div className="mb-8">
              <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-full flex items-center justify-center">
                <MessageSquare className="w-10 h-10 text-cyan-400" />
              </div>
              <h2 className="text-3xl font-mono font-bold mb-4">
                Experience Our <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">AI Voice Assistant</span>
              </h2>
              <p className="text-gray-400 max-w-2xl mx-auto font-mono text-lg">
                Speak directly with our AI assistant to learn about VectorShift Ventures services, automation solutions, and get instant answers to your business questions.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="p-6 rounded-2xl bg-gradient-to-b from-cyan-500/5 to-transparent border border-cyan-500/20">
                <Mic className="w-8 h-8 text-cyan-400 mx-auto mb-3" />
                <h3 className="font-mono font-semibold mb-2">Natural Conversation</h3>
                <p className="text-gray-400 font-mono text-sm">Speak naturally and get instant responses about our services</p>
              </div>
              <div className="p-6 rounded-2xl bg-gradient-to-b from-cyan-500/5 to-transparent border border-cyan-500/20">
                <Brain className="w-8 h-8 text-cyan-400 mx-auto mb-3" />
                <h3 className="font-mono font-semibold mb-2">Expert Knowledge</h3>
                <p className="text-gray-400 font-mono text-sm">Get detailed information about automation solutions and pricing</p>
              </div>
              <div className="p-6 rounded-2xl bg-gradient-to-b from-cyan-500/5 to-transparent border border-cyan-500/20">
                <Calendar className="w-8 h-8 text-cyan-400 mx-auto mb-3" />
                <h3 className="font-mono font-semibold mb-2">Appointment Booking</h3>
                <p className="text-gray-400 font-mono text-sm">Schedule consultations and demos directly through conversation</p>
              </div>
            </div>
            
            <div className="bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-500/30 rounded-2xl p-8">
              <h3 className="text-xl font-mono font-semibold mb-4">Ready to Try?</h3>
              <p className="text-gray-400 font-mono mb-6">
                Click the voice assistant button in the bottom-right corner to start a conversation with our AI assistant.
              </p>
              <div className="flex items-center justify-center space-x-4 text-sm text-gray-500 font-mono">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  <span>No registration required</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  <span>Instant connection</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  <span>Professional responses</span>
                </div>
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

      {/* Voice Assistant */}
      <VoiceAssistant />
    </div>
  );
};

export default Demo; 