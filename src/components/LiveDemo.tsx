import React, { useState, useRef } from 'react';
import { Bot, Loader2, CheckCircle, XCircle, Play, Zap, Construction, Upload, Building, Globe, User, Mail, Phone, FileText, Briefcase } from 'lucide-react';

interface DemoState {
  loading: boolean;
  response: any;
  error: string | null;
}

interface ConsultationData {
  // Company Information
  companyName: string;
  industry: string;
  companyWebsite: string;
  companySize: string;
  
  // Contact Information
  contactName: string;
  contactEmail: string;
  contactPhone: string;
  contactRole: string;
  
  // Business Needs
  businessDescription: string;
  currentChallenges: string;
  automationGoals: string;
  timeline: string;
  budget: string;
  
  // File Upload
  uploadedFile: File | null;
  fileName: string;
  
  // Additional Information
  preferredContactMethod: string;
  additionalNotes: string;
}

const LiveDemo: React.FC = () => {
  const [demoState, setDemoState] = useState<DemoState>({
    loading: false,
    response: null,
    error: null
  });
  
  const [consultationData, setConsultationData] = useState<ConsultationData>({
    companyName: '',
    industry: '',
    companyWebsite: '',
    companySize: '',
    contactName: '',
    contactEmail: '',
    contactPhone: '',
    contactRole: '',
    businessDescription: '',
    currentChallenges: '',
    automationGoals: '',
    timeline: '',
    budget: '',
    uploadedFile: null,
    fileName: '',
    preferredContactMethod: 'email',
    additionalNotes: ''
  });

  const fileInputRef = useRef<HTMLInputElement>(null);
  const API_BASE_URL = 'https://vectorshift-n8n-ventures.onrender.com';

  const handleInputChange = (field: keyof ConsultationData, value: string) => {
    setConsultationData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setConsultationData(prev => ({
        ...prev,
        uploadedFile: file,
        fileName: file.name
      }));
    }
  };

  const handleDemoTest = async () => {
    setDemoState({ loading: true, response: null, error: null });

    try {
      // Create FormData for file upload
      const formData = new FormData();
      
      // Add all consultation data
      Object.entries(consultationData).forEach(([key, value]) => {
        if (key === 'uploadedFile' && value) {
          formData.append('file', value);
        } else if (key !== 'uploadedFile') {
          formData.append(key, value);
        }
      });

      // Add metadata
      formData.append('timestamp', new Date().toISOString());
      formData.append('source', 'website-consultation-demo');
      formData.append('formType', 'consultation-capture');

      const response = await fetch(`${API_BASE_URL}/webhook/consultation-capture`, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const responseText = await response.text();
      
      let result;
      if (responseText.trim()) {
        try {
          result = JSON.parse(responseText);
        } catch (parseError) {
          result = {
            status: 'success',
            message: 'Consultation captured successfully',
            rawResponse: responseText,
            contentType: response.headers.get('content-type')
          };
        }
      } else {
        result = {
          status: 'success',
          message: 'Consultation information captured',
          note: 'Your consultation request has been submitted successfully',
          timestamp: new Date().toISOString()
        };
      }

      setDemoState({ loading: false, response: result, error: null });
    } catch (error) {
      console.error('Demo error:', error);
      setDemoState({ 
        loading: false, 
        response: null, 
        error: error instanceof Error ? error.message : 'An error occurred' 
      });
    }
  };

  const getStatusIcon = () => {
    if (demoState.loading) return <Loader2 className="w-5 h-5 animate-spin text-blue-400" />;
    if (demoState.error) return <XCircle className="w-5 h-5 text-red-400" />;
    if (demoState.response) return <CheckCircle className="w-5 h-5 text-green-400" />;
    return <Zap className="w-5 h-5 text-gray-400" />;
  };

  const getStatusText = () => {
    if (demoState.loading) return 'Processing consultation...';
    if (demoState.error) return 'Error occurred';
    if (demoState.response) return 'Consultation submitted!';
    return 'Ready to capture consultation';
  };

  return (
    <section className="py-20 bg-gradient-to-b from-[#0A0B1E] to-[#0A0B1E]/80">
      <div className="container mx-auto px-6">
        {/* Under Development Banner */}
        <div className="max-w-6xl mx-auto mb-8">
          <div className="bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border border-yellow-500/30 rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-3">
              <Construction className="w-6 h-6 text-yellow-400" />
              <h3 className="text-lg font-mono font-semibold text-yellow-400">Under Development</h3>
            </div>
            <p className="text-gray-300 font-mono text-sm">
              This consultation capture system is currently being developed. The automation workflow will process your information 
              and create a custom solution proposal. You can still test the form and see how it captures comprehensive business information.
            </p>
          </div>
        </div>

        <div className="text-center mb-16">
          <h2 className="text-3xl font-mono font-bold mb-4">
            <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              Custom Automation Consultation
            </span>
          </h2>
          <p className="text-gray-400 max-w-3xl mx-auto font-mono">
            Capture comprehensive business information to create a tailored automation solution for your field service operations.
          </p>
        </div>

        {/* Status Panel */}
        <div className="max-w-4xl mx-auto mb-12">
          <div className="bg-gradient-to-b from-cyan-500/10 to-transparent border border-cyan-500/20 rounded-2xl p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-mono font-semibold text-white">Consultation Status</h3>
              <div className="flex items-center gap-2">
                {getStatusIcon()}
                <span className="font-mono text-sm">{getStatusText()}</span>
              </div>
            </div>
            
            {demoState.response && (
              <div className="bg-gray-800/50 rounded-lg p-4">
                <h4 className="font-mono font-semibold text-cyan-400 mb-2">Response:</h4>
                <pre className="text-sm text-gray-300 font-mono overflow-x-auto max-h-64 overflow-y-auto">
                  {JSON.stringify(demoState.response, null, 2)}
                </pre>
              </div>
            )}
            
            {demoState.error && (
              <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4">
                <h4 className="font-mono font-semibold text-red-400 mb-2">Error:</h4>
                <p className="text-sm text-red-300 font-mono">{demoState.error}</p>
              </div>
            )}
          </div>
        </div>

        {/* Consultation Form */}
        <div className="max-w-6xl mx-auto mb-12">
          <div className="bg-gradient-to-b from-cyan-500/10 to-transparent border border-cyan-500/20 rounded-2xl p-8">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Bot className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-mono font-semibold text-white mb-2">Consultation Capture Demo</h3>
              <p className="text-gray-400 font-mono">
                Provide comprehensive information about your business to receive a custom automation solution
              </p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Company Information */}
              <div className="space-y-6">
                <div className="flex items-center gap-3 mb-4">
                  <Building className="w-5 h-5 text-cyan-400" />
                  <h4 className="text-lg font-mono font-semibold text-white">Company Information</h4>
                </div>
                
                <div>
                  <label className="block text-sm font-mono font-medium text-gray-300 mb-2">
                    Company Name *
                  </label>
                  <input
                    type="text"
                    value={consultationData.companyName}
                    onChange={(e) => handleInputChange('companyName', e.target.value)}
                    className="w-full p-3 bg-gray-800/50 border border-cyan-500/30 rounded-lg text-white font-mono focus:outline-none focus:border-cyan-400"
                    placeholder="Enter company name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-mono font-medium text-gray-300 mb-2">
                    Industry *
                  </label>
                  <select
                    value={consultationData.industry}
                    onChange={(e) => handleInputChange('industry', e.target.value)}
                    className="w-full p-3 bg-gray-800/50 border border-cyan-500/30 rounded-lg text-white font-mono focus:outline-none focus:border-cyan-400"
                  >
                    <option value="">Select industry</option>
                    <option value="field-service">Field Service</option>
                    <option value="construction">Construction</option>
                    <option value="maintenance">Maintenance & Repair</option>
                    <option value="utilities">Utilities</option>
                    <option value="telecommunications">Telecommunications</option>
                    <option value="manufacturing">Manufacturing</option>
                    <option value="logistics">Logistics & Transportation</option>
                    <option value="healthcare">Healthcare</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-mono font-medium text-gray-300 mb-2">
                    Company Website
                  </label>
                  <div className="flex items-center gap-2">
                    <Globe className="w-4 h-4 text-gray-400" />
                    <input
                      type="url"
                      value={consultationData.companyWebsite}
                      onChange={(e) => handleInputChange('companyWebsite', e.target.value)}
                      className="flex-1 p-3 bg-gray-800/50 border border-cyan-500/30 rounded-lg text-white font-mono focus:outline-none focus:border-cyan-400"
                      placeholder="https://yourcompany.com"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-mono font-medium text-gray-300 mb-2">
                    Company Size
                  </label>
                  <select
                    value={consultationData.companySize}
                    onChange={(e) => handleInputChange('companySize', e.target.value)}
                    className="w-full p-3 bg-gray-800/50 border border-cyan-500/30 rounded-lg text-white font-mono focus:outline-none focus:border-cyan-400"
                  >
                    <option value="">Select company size</option>
                    <option value="1-10">1-10 employees</option>
                    <option value="11-50">11-50 employees</option>
                    <option value="51-200">51-200 employees</option>
                    <option value="201-1000">201-1000 employees</option>
                    <option value="1000+">1000+ employees</option>
                  </select>
                </div>
              </div>

              {/* Contact Information */}
              <div className="space-y-6">
                <div className="flex items-center gap-3 mb-4">
                  <User className="w-5 h-5 text-cyan-400" />
                  <h4 className="text-lg font-mono font-semibold text-white">Contact Information</h4>
                </div>
                
                <div>
                  <label className="block text-sm font-mono font-medium text-gray-300 mb-2">
                    Contact Name *
                  </label>
                  <input
                    type="text"
                    value={consultationData.contactName}
                    onChange={(e) => handleInputChange('contactName', e.target.value)}
                    className="w-full p-3 bg-gray-800/50 border border-cyan-500/30 rounded-lg text-white font-mono focus:outline-none focus:border-cyan-400"
                    placeholder="Your full name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-mono font-medium text-gray-300 mb-2">
                    Contact Email *
                  </label>
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4 text-gray-400" />
                    <input
                      type="email"
                      value={consultationData.contactEmail}
                      onChange={(e) => handleInputChange('contactEmail', e.target.value)}
                      className="flex-1 p-3 bg-gray-800/50 border border-cyan-500/30 rounded-lg text-white font-mono focus:outline-none focus:border-cyan-400"
                      placeholder="your.email@company.com"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-mono font-medium text-gray-300 mb-2">
                    Contact Phone
                  </label>
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-gray-400" />
                    <input
                      type="tel"
                      value={consultationData.contactPhone}
                      onChange={(e) => handleInputChange('contactPhone', e.target.value)}
                      className="flex-1 p-3 bg-gray-800/50 border border-cyan-500/30 rounded-lg text-white font-mono focus:outline-none focus:border-cyan-400"
                      placeholder="+1 (555) 123-4567"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-mono font-medium text-gray-300 mb-2">
                    Your Role
                  </label>
                  <input
                    type="text"
                    value={consultationData.contactRole}
                    onChange={(e) => handleInputChange('contactRole', e.target.value)}
                    className="w-full p-3 bg-gray-800/50 border border-cyan-500/30 rounded-lg text-white font-mono focus:outline-none focus:border-cyan-400"
                    placeholder="e.g., Operations Manager, CEO, etc."
                  />
                </div>
              </div>
            </div>

            {/* Business Needs */}
            <div className="mt-8 space-y-6">
              <div className="flex items-center gap-3 mb-4">
                <Briefcase className="w-5 h-5 text-cyan-400" />
                <h4 className="text-lg font-mono font-semibold text-white">Business Needs & Goals</h4>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-mono font-medium text-gray-300 mb-2">
                    Business Description *
                  </label>
                  <textarea
                    value={consultationData.businessDescription}
                    onChange={(e) => handleInputChange('businessDescription', e.target.value)}
                    rows={3}
                    className="w-full p-3 bg-gray-800/50 border border-cyan-500/30 rounded-lg text-white font-mono focus:outline-none focus:border-cyan-400"
                    placeholder="Describe your business operations and current processes..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-mono font-medium text-gray-300 mb-2">
                    Current Challenges *
                  </label>
                  <textarea
                    value={consultationData.currentChallenges}
                    onChange={(e) => handleInputChange('currentChallenges', e.target.value)}
                    rows={3}
                    className="w-full p-3 bg-gray-800/50 border border-cyan-500/30 rounded-lg text-white font-mono focus:outline-none focus:border-cyan-400"
                    placeholder="What challenges are you facing with current processes?"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-mono font-medium text-gray-300 mb-2">
                    Automation Goals *
                  </label>
                  <textarea
                    value={consultationData.automationGoals}
                    onChange={(e) => handleInputChange('automationGoals', e.target.value)}
                    rows={3}
                    className="w-full p-3 bg-gray-800/50 border border-cyan-500/30 rounded-lg text-white font-mono focus:outline-none focus:border-cyan-400"
                    placeholder="What do you want to achieve with automation?"
                  />
                </div>

                <div>
                  <label className="block text-sm font-mono font-medium text-gray-300 mb-2">
                    Timeline
                  </label>
                  <select
                    value={consultationData.timeline}
                    onChange={(e) => handleInputChange('timeline', e.target.value)}
                    className="w-full p-3 bg-gray-800/50 border border-cyan-500/30 rounded-lg text-white font-mono focus:outline-none focus:border-cyan-400"
                  >
                    <option value="">Select timeline</option>
                    <option value="immediate">Immediate (1-2 weeks)</option>
                    <option value="short-term">Short-term (1-3 months)</option>
                    <option value="medium-term">Medium-term (3-6 months)</option>
                    <option value="long-term">Long-term (6+ months)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-mono font-medium text-gray-300 mb-2">
                    Budget Range
                  </label>
                  <select
                    value={consultationData.budget}
                    onChange={(e) => handleInputChange('budget', e.target.value)}
                    className="w-full p-3 bg-gray-800/50 border border-cyan-500/30 rounded-lg text-white font-mono focus:outline-none focus:border-cyan-400"
                  >
                    <option value="">Select budget range</option>
                    <option value="under-5k">Under $5,000</option>
                    <option value="5k-15k">$5,000 - $15,000</option>
                    <option value="15k-50k">$15,000 - $50,000</option>
                    <option value="50k-100k">$50,000 - $100,000</option>
                    <option value="100k+">$100,000+</option>
                    <option value="discuss">Let's discuss</option>
                  </select>
                </div>
              </div>
            </div>

            {/* File Upload */}
            <div className="mt-8">
              <div className="flex items-center gap-3 mb-4">
                <Upload className="w-5 h-5 text-cyan-400" />
                <h4 className="text-lg font-mono font-semibold text-white">Additional Documents</h4>
              </div>
              
              <div className="border-2 border-dashed border-cyan-500/30 rounded-lg p-6 text-center hover:border-cyan-500/50 transition-colors">
                <input
                  ref={fileInputRef}
                  type="file"
                  onChange={handleFileUpload}
                  className="hidden"
                  accept=".pdf,.doc,.docx,.txt,.csv,.xlsx,.xls"
                />
                
                {consultationData.uploadedFile ? (
                  <div className="space-y-3">
                    <div className="flex items-center justify-center gap-2 text-green-400">
                      <FileText className="w-5 h-5" />
                      <span className="font-mono">{consultationData.fileName}</span>
                    </div>
                    <button
                      onClick={() => {
                        setConsultationData(prev => ({ ...prev, uploadedFile: null, fileName: '' }));
                        if (fileInputRef.current) fileInputRef.current.value = '';
                      }}
                      className="text-sm text-red-400 hover:text-red-300 font-mono"
                    >
                      Remove file
                    </button>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <Upload className="w-8 h-8 text-cyan-400 mx-auto" />
                    <p className="text-gray-300 font-mono">
                      Upload relevant documents (PDF, Word, Excel, etc.)
                    </p>
                    <button
                      onClick={() => fileInputRef.current?.click()}
                      className="px-4 py-2 bg-cyan-500/20 border border-cyan-500/30 rounded-lg text-cyan-400 hover:bg-cyan-500/30 transition-colors font-mono"
                    >
                      Choose File
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Additional Information */}
            <div className="mt-8 space-y-6">
              <div>
                <label className="block text-sm font-mono font-medium text-gray-300 mb-2">
                  Preferred Contact Method
                </label>
                <div className="flex gap-4">
                  {['email', 'phone', 'video-call'].map((method) => (
                    <label key={method} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="contactMethod"
                        value={method}
                        checked={consultationData.preferredContactMethod === method}
                        onChange={(e) => handleInputChange('preferredContactMethod', e.target.value)}
                        className="text-cyan-400 focus:ring-cyan-400"
                      />
                      <span className="text-gray-300 font-mono capitalize">{method.replace('-', ' ')}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-mono font-medium text-gray-300 mb-2">
                  Additional Notes
                </label>
                <textarea
                  value={consultationData.additionalNotes}
                  onChange={(e) => handleInputChange('additionalNotes', e.target.value)}
                  rows={3}
                  className="w-full p-3 bg-gray-800/50 border border-cyan-500/30 rounded-lg text-white font-mono focus:outline-none focus:border-cyan-400"
                  placeholder="Any additional information or specific requirements..."
                />
              </div>
            </div>

            {/* Submit Button */}
            <div className="mt-8">
              <button
                onClick={handleDemoTest}
                disabled={demoState.loading || !consultationData.companyName || !consultationData.contactName || !consultationData.contactEmail}
                className="w-full font-mono bg-gradient-to-r from-cyan-500 to-blue-500 px-8 py-4 rounded-lg text-lg font-semibold hover:shadow-lg hover:shadow-cyan-500/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {demoState.loading ? (
                  <div className="flex items-center justify-center gap-3">
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Processing Consultation...
                  </div>
                ) : (
                  <div className="flex items-center justify-center gap-3">
                    <Play className="w-5 h-5" />
                    Submit Consultation Request
                  </div>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Info Panel */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-b from-cyan-500/5 to-transparent border border-cyan-500/20 rounded-2xl p-6">
            <h3 className="text-lg font-mono font-semibold text-white mb-4">How It Works</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm font-mono">
              <div>
                <h4 className="text-cyan-400 font-semibold mb-2">1. Provide Information</h4>
                <p className="text-gray-400">Fill out the comprehensive consultation form with your business details and needs.</p>
              </div>
              <div>
                <h4 className="text-cyan-400 font-semibold mb-2">2. Submit Request</h4>
                <p className="text-gray-400">Your information is sent to our automation platform for processing.</p>
              </div>
              <div>
                <h4 className="text-cyan-400 font-semibold mb-2">3. Receive Proposal</h4>
                <p className="text-gray-400">We'll analyze your needs and create a custom automation solution proposal.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LiveDemo; 