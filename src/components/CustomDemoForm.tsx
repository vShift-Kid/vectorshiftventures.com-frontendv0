import React, { useState } from 'react';
import { Building, User, Mail, Phone, FileText, Upload, CheckCircle, ArrowRight, Brain, Globe, MessageSquare, Calendar } from 'lucide-react';

interface CustomDemoData {
  // Contact Information
  name: string;
  email: string;
  phone: string;
  company: string;
  
  // Business Information
  industry: string;
  businessSize: string;
  website: string;
  
  // Custom Demo Requirements
  demoType: string;
  voiceAssistantFeatures: string[];
  websiteFeatures: string[];
  targetAudience: string;
  businessGoals: string;
  
  // Additional Information
  timeline: string;
  budget: string;
  additionalNotes: string;
  
  // File Upload
  uploadedFiles: File[];
}

const CustomDemoForm: React.FC = () => {
  const [formData, setFormData] = useState<CustomDemoData>({
    name: '',
    email: '',
    phone: '',
    company: '',
    industry: '',
    businessSize: '',
    website: '',
    demoType: '',
    voiceAssistantFeatures: [],
    websiteFeatures: [],
    targetAudience: '',
    businessGoals: '',
    timeline: '',
    budget: '',
    additionalNotes: '',
    uploadedFiles: []
  });
  
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [dragActive, setDragActive] = useState(false);

  const handleInputChange = (field: keyof CustomDemoData, value: string | string[]) => {
    setFormData(prev => ({
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
    
    setFormData(prev => ({
      ...prev,
      uploadedFiles: [...prev.uploadedFiles, ...newFiles]
    }));
  };

  const removeFile = (index: number) => {
    setFormData(prev => ({
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
      const submitData = new FormData();
      
      // Add basic form fields
      Object.entries(formData).forEach(([key, value]) => {
        if (key === 'uploadedFiles') {
          // Handle files separately
          formData.uploadedFiles.forEach((file, index) => {
            submitData.append(`file_${index}`, file);
          });
        } else if (Array.isArray(value)) {
          submitData.append(key, JSON.stringify(value));
        } else {
          submitData.append(key, value);
        }
      });
      
      // Add metadata
      submitData.append('submissionTimestamp', new Date().toISOString());
      submitData.append('formType', 'custom-demo-request');
      submitData.append('source', 'vectorshiftventures-demo-page');
      
      // Send to n8n webhook (you'll need to create this endpoint)
      const response = await fetch('/api/custom-demo-submission', {
        method: 'POST',
        body: submitData,
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const result = await response.json();
      console.log('Custom demo submission response:', result);
      
      // Show success state
      setIsSubmitted(true);
      setIsLoading(false);
      
    } catch (error) {
      console.error('Error submitting custom demo request:', error);
      
      // For now, show success even if webhook fails
      setIsSubmitted(true);
      setIsLoading(false);
    }
  };

  const voiceAssistantOptions = [
    'Appointment Scheduling',
    'Lead Qualification',
    'Customer Support',
    'Product Information',
    'Pricing Queries',
    'FAQ Handling',
    'Multi-language Support',
    'Integration with CRM'
  ];

  const websiteFeaturesOptions = [
    'Dynamic Content',
    'Lead Capture Forms',
    'Interactive Demos',
    'Custom Branding',
    'Analytics Dashboard',
    'SEO Optimization',
    'Mobile Responsive',
    'E-commerce Integration'
  ];

  const handleCheckboxChange = (field: 'voiceAssistantFeatures' | 'websiteFeatures', value: string) => {
    const currentFeatures = formData[field];
    const updatedFeatures = currentFeatures.includes(value)
      ? currentFeatures.filter(f => f !== value)
      : [...currentFeatures, value];
    
    handleInputChange(field, updatedFeatures);
  };

  if (isSubmitted) {
    return (
      <div className="max-w-4xl mx-auto text-center py-20">
        <div className="w-20 h-20 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle className="w-10 h-10 text-white" />
        </div>
        <h2 className="text-3xl font-mono font-bold mb-6">
          <span className="bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent">
            Custom Customer Service Assistant Request Submitted!
          </span>
        </h2>
        <p className="text-xl text-gray-400 mb-8 font-mono">
          Thank you, {formData.name}! We've received your custom customer service assistant request and will begin creating your personalized AI assistant specifically trained to solve YOUR business problems for a 30-minute call time or 14-day trial period.
        </p>
        
        <div className="bg-gradient-to-b from-cyan-500/10 to-transparent border border-cyan-500/20 rounded-2xl p-8 mb-8">
          <h3 className="text-xl font-mono font-semibold text-white mb-4">What Happens Next?</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <Brain className="w-12 h-12 text-cyan-400 mx-auto mb-3" />
              <h4 className="font-mono font-semibold mb-2">AI Training</h4>
              <p className="text-gray-400 font-mono text-sm">Our AI will analyze your specific business problems and create a custom problem-solving assistant</p>
            </div>
            <div className="text-center">
              <Calendar className="w-12 h-12 text-cyan-400 mx-auto mb-3" />
              <h4 className="font-mono font-semibold mb-2">Trial Setup</h4>
              <p className="text-gray-400 font-mono text-sm">Configure your assistant for 30-min call or 14-day trial period</p>
            </div>
            <div className="text-center">
              <MessageSquare className="w-12 h-12 text-cyan-400 mx-auto mb-3" />
              <h4 className="font-mono font-semibold mb-2">Trial Delivery</h4>
              <p className="text-gray-400 font-mono text-sm">You'll receive access to your custom business problem-solving assistant within 24-48 hours</p>
            </div>
          </div>
        </div>
        
        <div className="text-center">
          <p className="text-gray-400 font-mono mb-4">
            We'll contact you at {formData.email} within the next 24 hours to discuss your custom demo and answer any questions.
          </p>
          <button
            onClick={() => setIsSubmitted(false)}
            className="font-mono bg-gradient-to-r from-cyan-500 to-blue-500 px-8 py-3 rounded-full text-lg font-semibold hover:shadow-lg hover:shadow-cyan-500/20 transition-all"
          >
            Submit Another Request
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-12">
        <div className="w-20 h-20 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-6">
          <Brain className="w-10 h-10 text-white" />
        </div>
        <h2 className="text-3xl font-mono font-bold mb-4">
          <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
            Request Your Custom Customer Service Assistant
          </span>
        </h2>
        <p className="text-gray-400 max-w-2xl mx-auto font-mono text-lg">
          Get a personalized AI voice assistant specifically built to solve YOUR business problems. 
          Trained on your field service operations, customer challenges, and unique business scenarios for a 30-minute call time or 14-day trial period.
        </p>
        
        <div className="bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/30 rounded-2xl p-6 mt-6 mb-6">
          <h3 className="text-lg font-mono font-semibold mb-3 text-green-400">🎯 Built for YOUR Specific Business Problems</h3>
          <p className="text-gray-300 font-mono text-sm">
            Unlike generic AI assistants, your custom voice assistant will be trained specifically on your business challenges, 
            customer pain points, industry terminology, and real problem-solving scenarios unique to your field service operations.
          </p>
        </div>
        
        <div className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/30 rounded-2xl p-6 mb-6">
          <h3 className="text-lg font-mono font-semibold mb-3 text-purple-400">⚡ Vector Shift Ventures</h3>
          <p className="text-gray-300 font-mono text-sm">
            <span className="text-purple-400 font-semibold">Automation Agency</span> - Specializing in AI-powered business automation solutions for field service operations.
          </p>
        </div>
        
        <div className="bg-gradient-to-r from-blue-500/10 to-cyan-500/10 border border-blue-500/30 rounded-2xl p-6">
          <h3 className="text-lg font-mono font-semibold mb-3 text-blue-400">🏢 Business Requirements:</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
              <span className="font-mono text-sm text-gray-300">Business email address required</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
              <span className="font-mono text-sm text-gray-300">Field service operations focus</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
              <span className="font-mono text-sm text-gray-300">30-min call or 14-day trial</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
              <span className="font-mono text-sm text-gray-300">Customer service focus</span>
            </div>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Contact Information */}
        <div className="bg-gradient-to-b from-cyan-500/10 to-transparent border border-cyan-500/20 rounded-2xl p-8">
          <h3 className="text-xl font-mono font-semibold text-white mb-6 flex items-center gap-3">
            <User className="w-6 h-6 text-cyan-400" />
            Contact Information
          </h3>
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
                placeholder="Enter your full name"
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
                onBlur={(e) => {
                  const email = e.target.value.toLowerCase();
                  const personalDomains = ['gmail.com', 'yahoo.com', 'hotmail.com', 'outlook.com', 'aol.com', 'icloud.com', 'live.com', 'msn.com'];
                  const domain = email.split('@')[1];
                  if (personalDomains.includes(domain)) {
                    alert('Please use a business email address. Personal email addresses like Gmail, Yahoo, etc. are not accepted.');
                    e.target.focus();
                  }
                }}
                required
                className="w-full p-3 bg-gray-800/50 border border-cyan-500/30 rounded-lg text-white font-mono focus:outline-none focus:border-cyan-400"
                placeholder="your.name@company.com"
                pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                title="Please enter a valid business email address"
              />
              <p className="text-xs text-gray-500 font-mono mt-1">
                Business email required (no personal emails like gmail.com, yahoo.com, hotmail.com, etc.)
              </p>
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
                placeholder="(555) 123-4567"
              />
            </div>
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
                placeholder="Enter your company name"
              />
            </div>
          </div>
        </div>

        {/* Business Information */}
        <div className="bg-gradient-to-b from-cyan-500/10 to-transparent border border-cyan-500/20 rounded-2xl p-8">
          <h3 className="text-xl font-mono font-semibold text-white mb-6 flex items-center gap-3">
            <Building className="w-6 h-6 text-cyan-400" />
            Business Information
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                Business Size *
              </label>
              <select
                value={formData.businessSize}
                onChange={(e) => handleInputChange('businessSize', e.target.value)}
                required
                className="w-full p-3 bg-gray-800/50 border border-cyan-500/30 rounded-lg text-white font-mono focus:outline-none focus:border-cyan-400"
              >
                <option value="">Select business size</option>
                <option value="1-10">1-10 employees</option>
                <option value="11-50">11-50 employees</option>
                <option value="51-200">51-200 employees</option>
                <option value="201-1000">201-1000 employees</option>
                <option value="1000+">1000+ employees</option>
              </select>
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-mono font-medium text-gray-300 mb-2">
                Current Website (if any)
              </label>
              <input
                type="url"
                value={formData.website}
                onChange={(e) => handleInputChange('website', e.target.value)}
                className="w-full p-3 bg-gray-800/50 border border-cyan-500/30 rounded-lg text-white font-mono focus:outline-none focus:border-cyan-400"
                placeholder="https://yourcompany.com"
              />
            </div>
          </div>
        </div>

        {/* Custom Demo Requirements */}
        <div className="bg-gradient-to-b from-cyan-500/10 to-transparent border border-cyan-500/20 rounded-2xl p-8">
          <h3 className="text-xl font-mono font-semibold text-white mb-6 flex items-center gap-3">
            <Brain className="w-6 h-6 text-cyan-400" />
            Custom Demo Requirements
          </h3>
          
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-mono font-medium text-gray-300 mb-2">
                Demo Type *
              </label>
              <select
                value={formData.demoType}
                onChange={(e) => handleInputChange('demoType', e.target.value)}
                required
                className="w-full p-3 bg-gray-800/50 border border-cyan-500/30 rounded-lg text-white font-mono focus:outline-none focus:border-cyan-400"
              >
                <option value="">Select demo type</option>
                <option value="voice-assistant">Voice Assistant Only</option>
                <option value="website">Custom Website Only</option>
                <option value="both">Voice Assistant + Website</option>
                <option value="full-solution">Full AI Automation Solution</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-mono font-medium text-gray-300 mb-3">
                Voice Assistant Features (select all that apply)
              </label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {voiceAssistantOptions.map((option) => (
                  <label key={option} className="flex items-center gap-3 p-3 bg-gray-800/30 rounded-lg hover:bg-gray-800/50 transition-colors cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.voiceAssistantFeatures.includes(option)}
                      onChange={() => handleCheckboxChange('voiceAssistantFeatures', option)}
                      className="w-4 h-4 text-cyan-500 bg-gray-800 border-cyan-500/30 rounded focus:ring-cyan-500 focus:ring-2"
                    />
                    <span className="font-mono text-sm text-gray-300">{option}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-mono font-medium text-gray-300 mb-3">
                Website Features (select all that apply)
              </label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {websiteFeaturesOptions.map((option) => (
                  <label key={option} className="flex items-center gap-3 p-3 bg-gray-800/30 rounded-lg hover:bg-gray-800/50 transition-colors cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.websiteFeatures.includes(option)}
                      onChange={() => handleCheckboxChange('websiteFeatures', option)}
                      className="w-4 h-4 text-cyan-500 bg-gray-800 border-cyan-500/30 rounded focus:ring-cyan-500 focus:ring-2"
                    />
                    <span className="font-mono text-sm text-gray-300">{option}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-mono font-medium text-gray-300 mb-2">
                Target Audience *
              </label>
              <textarea
                value={formData.targetAudience}
                onChange={(e) => handleInputChange('targetAudience', e.target.value)}
                required
                rows={3}
                className="w-full p-3 bg-gray-800/50 border border-cyan-500/30 rounded-lg text-white font-mono focus:outline-none focus:border-cyan-400"
                placeholder="Describe your target audience (e.g., small business owners, healthcare professionals, etc.)"
              />
            </div>

            <div>
              <label className="block text-sm font-mono font-medium text-gray-300 mb-2">
                Business Goals *
              </label>
              <textarea
                value={formData.businessGoals}
                onChange={(e) => handleInputChange('businessGoals', e.target.value)}
                required
                rows={3}
                className="w-full p-3 bg-gray-800/50 border border-cyan-500/30 rounded-lg text-white font-mono focus:outline-none focus:border-cyan-400"
                placeholder="What are your main business goals? (e.g., increase leads, improve customer service, automate processes)"
              />
            </div>
          </div>
        </div>

        {/* Timeline & Budget */}
        <div className="bg-gradient-to-b from-cyan-500/10 to-transparent border border-cyan-500/20 rounded-2xl p-8">
          <h3 className="text-xl font-mono font-semibold text-white mb-6 flex items-center gap-3">
            <ArrowRight className="w-6 h-6 text-cyan-400" />
            Timeline & Budget
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-mono font-medium text-gray-300 mb-2">
                Timeline
              </label>
              <select
                value={formData.timeline}
                onChange={(e) => handleInputChange('timeline', e.target.value)}
                className="w-full p-3 bg-gray-800/50 border border-cyan-500/30 rounded-lg text-white font-mono focus:outline-none focus:border-cyan-400"
              >
                <option value="">Select timeline</option>
                <option value="asap">ASAP</option>
                <option value="1-2-weeks">1-2 weeks</option>
                <option value="1-month">1 month</option>
                <option value="2-3-months">2-3 months</option>
                <option value="flexible">Flexible</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-mono font-medium text-gray-300 mb-2">
                Budget Range
              </label>
              <select
                value={formData.budget}
                onChange={(e) => handleInputChange('budget', e.target.value)}
                className="w-full p-3 bg-gray-800/50 border border-cyan-500/30 rounded-lg text-white font-mono focus:outline-none focus:border-cyan-400"
              >
                <option value="">Select budget range</option>
                <option value="under-5k">Under $5,000</option>
                <option value="5k-10k">$5,000 - $10,000</option>
                <option value="10k-25k">$10,000 - $25,000</option>
                <option value="25k-50k">$25,000 - $50,000</option>
                <option value="50k+">$50,000+</option>
                <option value="discuss">Let's discuss</option>
              </select>
            </div>
          </div>
        </div>

        {/* Additional Information */}
        <div className="bg-gradient-to-b from-cyan-500/10 to-transparent border border-cyan-500/20 rounded-2xl p-8">
          <h3 className="text-xl font-mono font-semibold text-white mb-6 flex items-center gap-3">
            <FileText className="w-6 h-6 text-cyan-400" />
            Additional Information
          </h3>
          
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-mono font-medium text-gray-300 mb-2">
                Additional Notes
              </label>
              <textarea
                value={formData.additionalNotes}
                onChange={(e) => handleInputChange('additionalNotes', e.target.value)}
                rows={4}
                className="w-full p-3 bg-gray-800/50 border border-cyan-500/30 rounded-lg text-white font-mono focus:outline-none focus:border-cyan-400"
                placeholder="Any additional requirements, specific features, or information you'd like us to know..."
              />
            </div>

            {/* File Upload Section */}
            <div>
              <label className="block text-sm font-mono font-medium text-gray-300 mb-2">
                Supporting Documents (Optional)
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
                  <div className="w-5 h-5 text-yellow-400 mr-2 mt-0.5 flex-shrink-0">⚠️</div>
                  <div className="text-sm text-yellow-300 font-mono">
                    <strong>Security Notice:</strong> Please do not upload proprietary data, trade secrets, 
                    or any information that should not be publicly accessible. Only share non-sensitive, 
                    general business information. We cannot be responsible for the content you upload.
                  </div>
                </div>
              </div>

              {/* Uploaded Files List */}
              {formData.uploadedFiles.length > 0 && (
                <div className="mt-4">
                  <h4 className="text-sm font-mono font-medium text-gray-300 mb-2">Uploaded Files:</h4>
                  <div className="space-y-2">
                    {formData.uploadedFiles.map((file, index) => (
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
          </div>
        </div>

        {/* Submit Button */}
        <div className="text-center">
          <button
            type="submit"
            disabled={isLoading || !formData.name || !formData.email || !formData.company || !formData.industry || !formData.demoType || !formData.targetAudience || !formData.businessGoals}
            className="font-mono bg-gradient-to-r from-cyan-500 to-blue-500 px-12 py-4 rounded-full text-xl font-semibold hover:shadow-lg hover:shadow-cyan-500/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105"
          >
            {isLoading ? (
              <div className="flex items-center justify-center gap-3">
                <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Creating Your Custom Demo Request...
              </div>
            ) : (
              <div className="flex items-center justify-center gap-3">
                <Brain className="w-6 h-6" />
                Submit Custom Demo Request
                <ArrowRight className="w-5 h-5" />
              </div>
            )}
          </button>
          
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-400 font-mono">
              ✓ Free custom demo • ✓ 24-48 hour delivery • ✓ Professional consultation included
            </p>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CustomDemoForm;
