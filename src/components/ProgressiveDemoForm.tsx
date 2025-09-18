import React, { useState } from 'react';
import { ArrowRight, ArrowLeft, CheckCircle, Brain, User, Building, Phone, Calendar, FileText, Upload, X } from 'lucide-react';

interface FormData {
  // Basic Information
  name: string;
  email: string;
  company: string;
  phone: string;
  industry: string;
  
  // Business Details
  businessDescription: string;
  currentChallenges: string;
  teamSize: string;
  
  // Consultation Package
  consultationPackage: string;
  preferredDate: string;
  preferredTime: string;
  
  // AI Agent Configuration
  agentPersonality: string;
  communicationStyle: string;
  technicalLevel: string;
  problemSolvingApproach: string;
  responseTone: string;
  expertiseLevel: string;
  
  // Research & Demo
  researchFocus: string;
  researchDepth: string;
  demoType: string;
  rmeSpecializations: string[];
  
  // Files
  uploadedFiles: File[];
}

const steps = [
  { id: 1, title: 'Basic Info', icon: User, description: 'Tell us about yourself' },
  { id: 2, title: 'Business', icon: Building, description: 'Your company details' },
  { id: 3, title: 'Challenges', icon: FileText, description: 'Current pain points' },
  { id: 4, title: 'AI Agent', icon: Brain, description: 'Customize your AI' },
  { id: 5, title: 'Demo Setup', icon: Calendar, description: 'Schedule & preferences' },
  { id: 6, title: 'Review', icon: CheckCircle, description: 'Review & submit' }
];

const ProgressiveDemoForm: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    company: '',
    phone: '',
    industry: '',
    businessDescription: '',
    currentChallenges: '',
    teamSize: '',
    consultationPackage: '',
    preferredDate: '',
    preferredTime: '',
    agentPersonality: '',
    communicationStyle: '',
    technicalLevel: '',
    problemSolvingApproach: '',
    responseTone: '',
    expertiseLevel: '',
    researchFocus: '',
    researchDepth: '',
    demoType: '',
    rmeSpecializations: [],
    uploadedFiles: []
  });

  const updateFormData = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const nextStep = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const isStepValid = (step: number): boolean => {
    switch (step) {
      case 1:
        return formData.name.length > 0 && formData.email.length > 0 && formData.company.length > 0 && formData.phone.length > 0;
      case 2:
        return formData.industry.length > 0 && formData.businessDescription.length > 10;
      case 3:
        return true; // Optional step
      case 4:
        return formData.agentPersonality.length > 0 && formData.communicationStyle.length > 0 && formData.technicalLevel.length > 0;
      case 5:
        return formData.researchFocus.length > 0 && formData.demoType.length > 0 && formData.rmeSpecializations.length > 0;
      case 6:
        return true; // Review step
      default:
        return false;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const webhookData = {
        ...formData,
        uploadedFiles: formData.uploadedFiles.map(file => ({
          name: file.name,
          size: file.size,
          type: file.type
        }))
      };

      const response = await fetch('https://vectorshift-n8n-ventures.onrender.com/webhook/vectorshift-consultation-enhanced-fixed', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(webhookData)
      });

      if (response.ok) {
        setIsSubmitted(true);
      } else {
        alert('Failed to submit form. Please try again.');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('An error occurred while submitting the form. Please try again.');
    }
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-[#0A0B1E] text-white pt-20">
        <div className="container mx-auto px-6 py-20">
          <div className="max-w-2xl mx-auto text-center">
            <div className="w-24 h-24 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-12 h-12 text-white" />
            </div>
            <h2 className="text-3xl font-mono font-bold mb-4 text-green-400">
              Demo Request Submitted Successfully!
            </h2>
            <p className="text-gray-300 font-mono mb-6">
              Thank you for your interest! We've received your demo request and will begin building your personalized AI solution.
            </p>
            <div className="bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-500/20 rounded-lg p-6">
              <h3 className="text-xl font-mono font-semibold mb-4 text-cyan-400">
                What happens next?
              </h3>
              <ul className="text-left text-gray-300 font-mono space-y-2">
                <li>• <strong className="text-orange-300">Check your email</strong> for a verification link</li>
                <li>• Our team will analyze your requirements and begin building your AI solution</li>
                <li>• You'll receive a detailed proposal and demo access within 24 hours</li>
                <li>• We'll schedule your personalized demo session</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0A0B1E] text-white pt-20">
      <div className="container mx-auto px-6 py-20">
        <div className="max-w-4xl mx-auto">
          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              {steps.map((step, index) => (
                <div key={step.id} className="flex items-center">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all ${
                    currentStep >= step.id
                      ? 'bg-cyan-500 border-cyan-500 text-white'
                      : 'border-gray-600 text-gray-400'
                  }`}>
                    {currentStep > step.id ? (
                      <CheckCircle className="w-5 h-5" />
                    ) : (
                      <step.icon className="w-5 h-5" />
                    )}
                  </div>
                  {index < steps.length - 1 && (
                    <div className={`w-16 h-0.5 mx-2 ${
                      currentStep > step.id ? 'bg-cyan-500' : 'bg-gray-600'
                    }`} />
                  )}
                </div>
              ))}
            </div>
            <div className="text-center">
              <h2 className="text-2xl font-mono font-bold mb-2">
                {steps[currentStep - 1].title}
              </h2>
              <p className="text-gray-400 font-mono">
                {steps[currentStep - 1].description}
              </p>
            </div>
          </div>

          {/* Form Content */}
          <div className="bg-gradient-to-b from-gray-800/50 to-gray-900/50 rounded-2xl p-8 border border-cyan-500/20">
            <form onSubmit={handleSubmit}>
              {/* Step 1: Basic Information */}
              {currentStep === 1 && (
                <div className="space-y-6">
                  <h3 className="text-xl font-mono font-bold mb-6 text-cyan-400">
                    Basic Information
                  </h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-mono font-medium text-gray-300 mb-2">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => updateFormData('name', e.target.value)}
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
                        value={formData.email}
                        onChange={(e) => updateFormData('email', e.target.value)}
                        required
                        className="w-full p-3 bg-gray-800/50 border border-cyan-500/30 rounded-lg text-white font-mono focus:outline-none focus:border-cyan-400"
                        placeholder="Enter your email address"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-mono font-medium text-gray-300 mb-2">
                        Company *
                      </label>
                      <input
                        type="text"
                        value={formData.company}
                        onChange={(e) => updateFormData('company', e.target.value)}
                        required
                        className="w-full p-3 bg-gray-800/50 border border-cyan-500/30 rounded-lg text-white font-mono focus:outline-none focus:border-cyan-400"
                        placeholder="Enter your company name"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-mono font-medium text-gray-300 mb-2">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => updateFormData('phone', e.target.value)}
                        required
                        className="w-full p-3 bg-gray-800/50 border border-cyan-500/30 rounded-lg text-white font-mono focus:outline-none focus:border-cyan-400"
                        placeholder="Enter your phone number"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Step 2: Business Details */}
              {currentStep === 2 && (
                <div className="space-y-6">
                  <h3 className="text-xl font-mono font-bold mb-6 text-cyan-400">
                    Business Details
                  </h3>
                  
                  <div>
                    <label className="block text-sm font-mono font-medium text-gray-300 mb-2">
                      Industry *
                    </label>
                    <select
                      value={formData.industry}
                      onChange={(e) => updateFormData('industry', e.target.value)}
                      required
                      className="w-full p-3 bg-gray-800/50 border border-cyan-500/30 rounded-lg text-white font-mono focus:outline-none focus:border-cyan-400"
                    >
                      <option value="">Select your industry</option>
                      <option value="field-service">Field Service & Maintenance</option>
                      <option value="manufacturing">Manufacturing</option>
                      <option value="healthcare">Healthcare & Medical</option>
                      <option value="energy">Energy & Utilities</option>
                      <option value="construction">Construction & Engineering</option>
                      <option value="logistics">Logistics & Transportation</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-mono font-medium text-gray-300 mb-2">
                      What does your business do? *
                    </label>
                    <textarea
                      value={formData.businessDescription}
                      onChange={(e) => updateFormData('businessDescription', e.target.value)}
                      required
                      rows={4}
                      className="w-full p-3 bg-gray-800/50 border border-cyan-500/30 rounded-lg text-white font-mono focus:outline-none focus:border-cyan-400"
                      placeholder="Describe what your business does, your main operations, and core activities"
                    />
                  </div>
                </div>
              )}

              {/* Step 3: Challenges */}
              {currentStep === 3 && (
                <div className="space-y-6">
                  <h3 className="text-xl font-mono font-bold mb-6 text-cyan-400">
                    Current Challenges
                  </h3>
                  
                  <div>
                    <label className="block text-sm font-mono font-medium text-gray-300 mb-2">
                      What challenges are you facing? (Optional)
                    </label>
                    <textarea
                      value={formData.currentChallenges}
                      onChange={(e) => updateFormData('currentChallenges', e.target.value)}
                      rows={4}
                      className="w-full p-3 bg-gray-800/50 border border-orange-500/30 rounded-lg text-white font-mono focus:outline-none focus:border-orange-400"
                      placeholder="Describe the specific pain points, inefficiencies, or challenges you're currently facing"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-mono font-medium text-gray-300 mb-2">
                      Team Size & Equipment
                    </label>
                    <textarea
                      value={formData.teamSize}
                      onChange={(e) => updateFormData('teamSize', e.target.value)}
                      rows={3}
                      className="w-full p-3 bg-gray-800/50 border border-green-500/30 rounded-lg text-white font-mono focus:outline-none focus:border-green-400"
                      placeholder="Describe your team size, equipment, systems, and technical specifications"
                    />
                  </div>
                </div>
              )}

              {/* Step 4: AI Agent Configuration */}
              {currentStep === 4 && (
                <div className="space-y-6">
                  <h3 className="text-xl font-mono font-bold mb-6 text-cyan-400">
                    AI Agent Configuration
                  </h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-mono font-medium text-gray-300 mb-2">
                        Agent Personality *
                      </label>
                      <select
                        value={formData.agentPersonality}
                        onChange={(e) => updateFormData('agentPersonality', e.target.value)}
                        required
                        className="w-full p-3 bg-gray-800/50 border border-pink-500/30 rounded-lg text-white font-mono focus:outline-none focus:border-pink-400"
                      >
                        <option value="">Select agent personality</option>
                        <option value="professional">Professional & Formal</option>
                        <option value="friendly">Friendly & Approachable</option>
                        <option value="expert">Expert & Authoritative</option>
                        <option value="collaborative">Collaborative & Supportive</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-mono font-medium text-gray-300 mb-2">
                        Communication Style *
                      </label>
                      <select
                        value={formData.communicationStyle}
                        onChange={(e) => updateFormData('communicationStyle', e.target.value)}
                        required
                        className="w-full p-3 bg-gray-800/50 border border-pink-500/30 rounded-lg text-white font-mono focus:outline-none focus:border-pink-400"
                      >
                        <option value="">Select communication style</option>
                        <option value="concise">Concise & Direct</option>
                        <option value="detailed">Detailed & Comprehensive</option>
                        <option value="conversational">Conversational & Natural</option>
                        <option value="technical">Technical & Precise</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-mono font-medium text-gray-300 mb-2">
                        Technical Level *
                      </label>
                      <select
                        value={formData.technicalLevel}
                        onChange={(e) => updateFormData('technicalLevel', e.target.value)}
                        required
                        className="w-full p-3 bg-gray-800/50 border border-pink-500/30 rounded-lg text-white font-mono focus:outline-none focus:border-pink-400"
                      >
                        <option value="">Select technical level</option>
                        <option value="beginner">Beginner - Basic concepts</option>
                        <option value="intermediate">Intermediate - Some technical knowledge</option>
                        <option value="advanced">Advanced - Deep technical expertise</option>
                        <option value="expert">Expert - Industry specialist level</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-mono font-medium text-gray-300 mb-2">
                        Problem Solving Approach
                      </label>
                      <select
                        value={formData.problemSolvingApproach}
                        onChange={(e) => updateFormData('problemSolvingApproach', e.target.value)}
                        className="w-full p-3 bg-gray-800/50 border border-pink-500/30 rounded-lg text-white font-mono focus:outline-none focus:border-pink-400"
                      >
                        <option value="">Select approach</option>
                        <option value="systematic">Systematic & Step-by-step</option>
                        <option value="diagnostic">Diagnostic & Troubleshooting</option>
                        <option value="creative">Creative & Out-of-the-box</option>
                        <option value="data-driven">Data-driven & Analytical</option>
                      </select>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 5: Demo Setup */}
              {currentStep === 5 && (
                <div className="space-y-6">
                  <h3 className="text-xl font-mono font-bold mb-6 text-cyan-400">
                    Demo Setup & Preferences
                  </h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-mono font-medium text-gray-300 mb-2">
                        Research Focus *
                      </label>
                      <select
                        value={formData.researchFocus}
                        onChange={(e) => updateFormData('researchFocus', e.target.value)}
                        required
                        className="w-full p-3 bg-gray-800/50 border border-purple-500/30 rounded-lg text-white font-mono focus:outline-none focus:border-purple-400"
                      >
                        <option value="">Select research focus</option>
                        <option value="equipment-reliability">Equipment Reliability & Performance</option>
                        <option value="maintenance-optimization">Maintenance Optimization</option>
                        <option value="predictive-analytics">Predictive Analytics & Forecasting</option>
                        <option value="troubleshooting-methods">Troubleshooting & Diagnostics</option>
                        <option value="compliance-safety">Compliance & Safety Standards</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-mono font-medium text-gray-300 mb-2">
                        Demo Type *
                      </label>
                      <select
                        value={formData.demoType}
                        onChange={(e) => updateFormData('demoType', e.target.value)}
                        required
                        className="w-full p-3 bg-gray-800/50 border border-purple-500/30 rounded-lg text-white font-mono focus:outline-none focus:border-purple-400"
                      >
                        <option value="">Select demo type</option>
                        <option value="voice-agent">Voice Agent</option>
                        <option value="chatbot">Chatbot</option>
                        <option value="customized-newsletter">Customized Newsletter</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-mono font-medium text-gray-300 mb-2">
                      Consultation Package
                    </label>
                    <select
                      value={formData.consultationPackage}
                      onChange={(e) => updateFormData('consultationPackage', e.target.value)}
                      className="w-full p-3 bg-gray-800/50 border border-cyan-500/30 rounded-lg text-white font-mono focus:outline-none focus:border-cyan-400"
                    >
                      <option value="">Select consultation package</option>
                      <option value="Demo Request Only - Evaluation Phase">Demo Request Only - Evaluation Phase</option>
                      <option value="Full Consultation - Implementation Ready">Full Consultation - Implementation Ready</option>
                    </select>
                  </div>
                </div>
              )}

              {/* Step 6: Review */}
              {currentStep === 6 && (
                <div className="space-y-6">
                  <h3 className="text-xl font-mono font-bold mb-6 text-cyan-400">
                    Review Your Information
                  </h3>
                  
                  <div className="space-y-4">
                    <div className="bg-gray-800/30 rounded-lg p-4">
                      <h4 className="font-mono font-semibold text-cyan-300 mb-2">Contact Information</h4>
                      <p className="text-gray-300 font-mono">Name: {formData.name}</p>
                      <p className="text-gray-300 font-mono">Email: {formData.email}</p>
                      <p className="text-gray-300 font-mono">Company: {formData.company}</p>
                      <p className="text-gray-300 font-mono">Phone: {formData.phone}</p>
                    </div>

                    <div className="bg-gray-800/30 rounded-lg p-4">
                      <h4 className="font-mono font-semibold text-cyan-300 mb-2">Business Details</h4>
                      <p className="text-gray-300 font-mono">Industry: {formData.industry}</p>
                      <p className="text-gray-300 font-mono">Description: {formData.businessDescription}</p>
                    </div>

                    <div className="bg-gray-800/30 rounded-lg p-4">
                      <h4 className="font-mono font-semibold text-cyan-300 mb-2">AI Agent Configuration</h4>
                      <p className="text-gray-300 font-mono">Personality: {formData.agentPersonality}</p>
                      <p className="text-gray-300 font-mono">Communication: {formData.communicationStyle}</p>
                      <p className="text-gray-300 font-mono">Technical Level: {formData.technicalLevel}</p>
                    </div>

                    <div className="bg-gray-800/30 rounded-lg p-4">
                      <h4 className="font-mono font-semibold text-cyan-300 mb-2">Demo Preferences</h4>
                      <p className="text-gray-300 font-mono">Research Focus: {formData.researchFocus}</p>
                      <p className="text-gray-300 font-mono">Demo Type: {formData.demoType}</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Navigation Buttons */}
              <div className="flex justify-between mt-8">
                <button
                  type="button"
                  onClick={prevStep}
                  disabled={currentStep === 1}
                  className={`px-6 py-3 rounded-lg font-mono font-semibold transition-all ${
                    currentStep === 1
                      ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                      : 'bg-gray-700 text-white hover:bg-gray-600'
                  }`}
                >
                  <ArrowLeft className="w-4 h-4 inline mr-2" />
                  Previous
                </button>

                {currentStep < steps.length ? (
                  <button
                    type="button"
                    onClick={nextStep}
                    disabled={!isStepValid(currentStep)}
                    className={`px-6 py-3 rounded-lg font-mono font-semibold transition-all ${
                      isStepValid(currentStep)
                        ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white hover:shadow-lg hover:shadow-cyan-500/20'
                        : 'bg-gray-600 text-gray-400 cursor-not-allowed'
                    }`}
                  >
                    Next
                    <ArrowRight className="w-4 h-4 inline ml-2" />
                  </button>
                ) : (
                  <button
                    type="submit"
                    className="px-8 py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-lg font-mono font-semibold hover:shadow-lg hover:shadow-green-500/20 transition-all"
                  >
                    <Brain className="w-4 h-4 inline mr-2" />
                    Submit Demo Request
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProgressiveDemoForm;
