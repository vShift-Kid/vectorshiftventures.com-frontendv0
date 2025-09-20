import React, { useState } from 'react';
import { ArrowRight, ArrowLeft, CheckCircle, Brain, User, Building, Phone, Calendar, FileText, Upload, MessageSquare, Bot, Globe, Settings, Target } from 'lucide-react';

interface FormData {
  // Contact Information
  name: string;
  email: string;
  company: string;
  phone: string;
  
  // Business Information
  industry: string;
  businessDescription: string;
  teamSize: string;
  currentChallenges: string;
  
  // Demo Configuration
  demoType: string;
  consultationPackage: string;
  preferredDate: string;
  preferredTime: string;
  
  // AI Agent Customization
  useCase: string;
  targetUsers: string;
  languageStyle: string;
  interactionMode: string;
  industryContext: string;
  businessRole: string;
  agentPersonality: string;
  communicationStyle: string;
  technicalLevel: string;
  problemSolvingApproach: string;
  
  // Research & Specializations
  researchFocus: string;
  researchDepth: string;
  rmeSpecializations: string[];
  
  // Files
  uploadedFiles: File[];
}

const steps = [
  { 
    id: 1, 
    title: 'Contact Information', 
    icon: User, 
    description: 'Tell us about yourself and your company',
    color: 'cyan'
  },
  { 
    id: 2, 
    title: 'Business Details', 
    icon: Building, 
    description: 'Describe your business and challenges',
    color: 'blue'
  },
  { 
    id: 3, 
    title: 'Demo Type', 
    icon: Bot, 
    description: 'Choose your preferred demo experience',
    color: 'purple'
  },
  { 
    id: 4, 
    title: 'AI Configuration', 
    icon: Settings, 
    description: 'Customize your AI agent personality',
    color: 'green'
  },
  { 
    id: 5, 
    title: 'Specializations', 
    icon: Target, 
    description: 'Select your technical focus areas',
    color: 'orange'
  },
  { 
    id: 6, 
    title: 'Review & Submit', 
    icon: CheckCircle, 
    description: 'Review your information and submit',
    color: 'emerald'
  }
];

const GuidedDemoForm: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    company: '',
    phone: '',
    industry: '',
    businessDescription: '',
    teamSize: '',
    currentChallenges: '',
    demoType: '',
    consultationPackage: '',
    preferredDate: '',
    preferredTime: '',
    useCase: '',
    targetUsers: '',
    languageStyle: '',
    interactionMode: '',
    industryContext: '',
    businessRole: '',
    agentPersonality: '',
    communicationStyle: '',
    technicalLevel: '',
    problemSolvingApproach: '',
    researchFocus: '',
    researchDepth: '',
    rmeSpecializations: [],
    uploadedFiles: []
  });

  const updateFormData = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const nextStep = () => {
    if (currentStep < steps.length && isStepValid(currentStep)) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const goToStep = (stepNumber: number) => {
    if (stepNumber <= currentStep || isStepValid(stepNumber - 1)) {
      setCurrentStep(stepNumber);
    }
  };

  const isStepValid = (step: number): boolean => {
    switch (step) {
      case 1:
        return formData.name.length > 0 && formData.email.length > 0 && formData.company.length > 0 && formData.phone.length > 0;
      case 2:
        return formData.industry.length > 0 && formData.businessDescription.length > 10;
      case 3:
        return formData.demoType.length > 0;
      case 4:
        return formData.agentPersonality.length > 0 && formData.communicationStyle.length > 0 && formData.technicalLevel.length > 0;
      case 5:
        return formData.rmeSpecializations.length > 0;
      case 6:
        return true; // Review step
      default:
        return false;
    }
  };

  const handleSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    
    try {
      const webhookData = {
        contactInfo: {
          name: formData.name,
          email: formData.email,
          phone: formData.phone
        },
        businessInfo: {
          companyName: formData.company,
          industry: formData.industry,
          businessDescription: formData.businessDescription,
          teamSize: formData.teamSize,
          currentChallenges: formData.currentChallenges
        },
        demoConfiguration: {
          demoType: formData.demoType,
          consultationPackage: formData.consultationPackage,
          preferredDate: formData.preferredDate,
          preferredTime: formData.preferredTime
        },
        aiAgentCustomization: {
          useCase: formData.useCase,
          targetUsers: formData.targetUsers,
          languageStyle: formData.languageStyle,
          interactionMode: formData.interactionMode,
          industryContext: formData.industryContext,
          businessRole: formData.businessRole,
          agentPersonality: formData.agentPersonality,
          communicationStyle: formData.communicationStyle,
          technicalLevel: formData.technicalLevel,
          problemSolvingApproach: formData.problemSolvingApproach
        },
        researchPreferences: {
          researchFocus: formData.researchFocus,
          researchDepth: formData.researchDepth,
          rmeSpecializations: formData.rmeSpecializations
        },
        uploadedFiles: formData.uploadedFiles.map(file => ({
          name: file.name,
          size: file.size,
          type: file.type
        })),
        timestamp: new Date().toISOString()
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
        console.log('Demo request submitted successfully');
      } else {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
    } catch (error) {
      console.error('Error submitting demo request:', error);
      alert('Error submitting form: ' + (error instanceof Error ? error.message : 'Unknown error'));
    }
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-[#0A0B1E] text-white pt-20">
        <div className="container mx-auto px-6 py-20">
          <div className="max-w-3xl mx-auto text-center">
            <CheckCircle className="w-20 h-20 text-green-400 mx-auto mb-8" />
            <h2 className="text-3xl font-mono font-bold mb-6">
              <span className="bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent">
                Demo Request Submitted Successfully!
              </span>
            </h2>
            <p className="text-xl text-gray-400 mb-8 font-mono">
              Thank you, {formData.name}. We've received your demo request and will contact you within 24 hours to discuss your business automation needs and create your custom AI solution.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => {
                  setIsSubmitted(false);
                  setCurrentStep(1);
                  setFormData({
                    name: '',
                    email: '',
                    company: '',
                    phone: '',
                    industry: '',
                    businessDescription: '',
                    teamSize: '',
                    currentChallenges: '',
                    demoType: '',
                    consultationPackage: '',
                    preferredDate: '',
                    preferredTime: '',
                    useCase: '',
                    targetUsers: '',
                    languageStyle: '',
                    interactionMode: '',
                    industryContext: '',
                    businessRole: '',
                    agentPersonality: '',
                    communicationStyle: '',
                    technicalLevel: '',
                    problemSolvingApproach: '',
                    researchFocus: '',
                    researchDepth: '',
                    rmeSpecializations: [],
                    uploadedFiles: []
                  });
                }}
                className="font-mono bg-gradient-to-r from-cyan-500 to-blue-500 px-8 py-4 rounded-full text-lg font-semibold hover:shadow-lg hover:shadow-cyan-500/20 transition-all transform hover:scale-105"
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
              <MessageSquare className="w-12 h-12 text-white" />
            </div>
            <h1 className="font-mono text-5xl font-bold mb-6">
              <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                Request Your Technical AI Demo
              </span>
            </h1>
            <p className="text-xl text-gray-400 mb-8 font-mono">
              Get a personalized AI solution demo specifically built for your field service, engineering, logistics, or technical operations. 
              Follow our guided process to create your custom technical AI demo.
            </p>
          </div>
        </div>
      </section>

      {/* Progress Indicator */}
      <section className="py-8 bg-[#0A0B1E]">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center justify-between mb-8">
              {steps.map((step, index) => (
                <div key={step.id} className="flex items-center">
                  <button
                    onClick={() => goToStep(step.id)}
                    className={`w-12 h-12 rounded-full flex items-center justify-center border-2 transition-all ${
                      currentStep >= step.id
                        ? `bg-gradient-to-r from-${step.color}-500 to-${step.color}-600 border-${step.color}-500 text-white`
                        : 'border-gray-600 text-gray-400 hover:border-gray-500'
                    } ${step.id <= currentStep ? 'cursor-pointer' : 'cursor-not-allowed'}`}
                    disabled={step.id > currentStep && !isStepValid(step.id - 1)}
                  >
                    {currentStep > step.id ? (
                      <CheckCircle className="w-6 h-6" />
                    ) : (
                      <step.icon className="w-6 h-6" />
                    )}
                  </button>
                  {index < steps.length - 1 && (
                    <div className={`w-16 h-0.5 mx-2 ${
                      currentStep > step.id ? `bg-gradient-to-r from-${step.color}-500 to-${steps[index + 1].color}-500` : 'bg-gray-600'
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
        </div>
      </section>

      {/* Form Content */}
      <section className="py-20 bg-[#0A0B1E]">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <div className="bg-gradient-to-b from-gray-800/50 to-gray-900/50 rounded-2xl p-8 border border-cyan-500/20">
              <form>
                {/* Step 1: Contact Information */}
                {currentStep === 1 && (
                  <div className="space-y-6">
                    <h3 className="text-2xl font-mono font-bold mb-6 text-cyan-400">
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
                          Company Name *
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
                    <h3 className="text-2xl font-mono font-bold mb-6 text-blue-400">
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
                        className="w-full p-3 bg-gray-800/50 border border-blue-500/30 rounded-lg text-white font-mono focus:outline-none focus:border-blue-400"
                      >
                        <option value="">Select your industry</option>
                        <optgroup label="Field Service Operations">
                          <option value="field-service-technical">Field Service - Technical Operations</option>
                          <option value="equipment-maintenance">Equipment Maintenance & Repair</option>
                          <option value="technical-support">Technical Support & Troubleshooting</option>
                          <option value="emergency-response">Emergency Response Services</option>
                        </optgroup>
                        <optgroup label="Engineering & Manufacturing">
                          <option value="engineering-design">Engineering Design & Development</option>
                          <option value="manufacturing-operations">Manufacturing Operations</option>
                          <option value="technical-documentation">Technical Documentation</option>
                          <option value="cad-integration">CAD & Design Systems</option>
                        </optgroup>
                        <optgroup label="Logistics & Supply Chain">
                          <option value="logistics-optimization">Logistics & Distribution</option>
                          <option value="inventory-management">Inventory Management</option>
                          <option value="fleet-management">Fleet Management</option>
                          <option value="supply-chain">Supply Chain Management</option>
                        </optgroup>
                        <optgroup label="IT & Technology">
                          <option value="it-operations">IT Operations & Support</option>
                          <option value="software-development">Software Development</option>
                          <option value="system-integration">System Integration</option>
                          <option value="cybersecurity">Cybersecurity & Compliance</option>
                        </optgroup>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-mono font-medium text-gray-300 mb-2">
                        Business Description *
                      </label>
                      <textarea
                        value={formData.businessDescription}
                        onChange={(e) => updateFormData('businessDescription', e.target.value)}
                        required
                        rows={4}
                        className="w-full p-3 bg-gray-800/50 border border-blue-500/30 rounded-lg text-white font-mono focus:outline-none focus:border-blue-400"
                        placeholder="Describe your business operations, main activities, and core services"
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-mono font-medium text-gray-300 mb-2">
                          Team Size
                        </label>
                        <select
                          value={formData.teamSize}
                          onChange={(e) => updateFormData('teamSize', e.target.value)}
                          className="w-full p-3 bg-gray-800/50 border border-blue-500/30 rounded-lg text-white font-mono focus:outline-none focus:border-blue-400"
                        >
                          <option value="">Select team size</option>
                          <option value="1-5">1-5 people</option>
                          <option value="6-20">6-20 people</option>
                          <option value="21-50">21-50 people</option>
                          <option value="51-100">51-100 people</option>
                          <option value="101-500">101-500 people</option>
                          <option value="500+">500+ people</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-mono font-medium text-gray-300 mb-2">
                          Current Challenges
                        </label>
                        <textarea
                          value={formData.currentChallenges}
                          onChange={(e) => updateFormData('currentChallenges', e.target.value)}
                          rows={3}
                          className="w-full p-3 bg-gray-800/50 border border-blue-500/30 rounded-lg text-white font-mono focus:outline-none focus:border-blue-400"
                          placeholder="Describe your current challenges and pain points"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* Step 3: Demo Type */}
                {currentStep === 3 && (
                  <div className="space-y-6">
                    <h3 className="text-2xl font-mono font-bold mb-6 text-purple-400">
                      Demo Type Selection
                    </h3>
                    
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
                        <option value="">Select your preferred demo type</option>
                        <option value="chatbot">Chatbot Demo - AI-powered chat interface for technical support and customer service</option>
                        <option value="voice-agent">Voice Agent Demo - AI voice assistant for field technicians and phone support</option>
                        <option value="daily-briefing">Daily Briefing Demo - AI-generated reports and insights for management</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-mono font-medium text-gray-300 mb-2">
                        Consultation Package
                      </label>
                      <select
                        value={formData.consultationPackage}
                        onChange={(e) => updateFormData('consultationPackage', e.target.value)}
                        className="w-full p-3 bg-gray-800/50 border border-purple-500/30 rounded-lg text-white font-mono focus:outline-none focus:border-purple-400"
                      >
                        <option value="">Select consultation package</option>
                        <option value="Demo Request Only - Evaluation Phase">Demo Request Only - Evaluation Phase</option>
                        <option value="Full Consultation - Strategy & Implementation">Full Consultation - Strategy & Implementation</option>
                        <option value="Custom Package - Let's Discuss">Custom Package - Let's Discuss</option>
                      </select>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-mono font-medium text-gray-300 mb-2">
                          Preferred Date
                        </label>
                        <input
                          type="date"
                          value={formData.preferredDate}
                          onChange={(e) => updateFormData('preferredDate', e.target.value)}
                          className="w-full p-3 bg-gray-800/50 border border-purple-500/30 rounded-lg text-white font-mono focus:outline-none focus:border-purple-400"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-mono font-medium text-gray-300 mb-2">
                          Preferred Time
                        </label>
                        <select
                          value={formData.preferredTime}
                          onChange={(e) => updateFormData('preferredTime', e.target.value)}
                          className="w-full p-3 bg-gray-800/50 border border-purple-500/30 rounded-lg text-white font-mono focus:outline-none focus:border-purple-400"
                        >
                          <option value="">Select preferred time</option>
                          <option value="9:00 AM">9:00 AM</option>
                          <option value="10:00 AM">10:00 AM</option>
                          <option value="11:00 AM">11:00 AM</option>
                          <option value="12:00 PM">12:00 PM</option>
                          <option value="1:00 PM">1:00 PM</option>
                          <option value="2:00 PM">2:00 PM</option>
                          <option value="3:00 PM">3:00 PM</option>
                          <option value="4:00 PM">4:00 PM</option>
                          <option value="5:00 PM">5:00 PM</option>
                        </select>
                      </div>
                    </div>
                  </div>
                )}

                {/* Step 4: AI Configuration */}
                {currentStep === 4 && (
                  <div className="space-y-6">
                    <h3 className="text-2xl font-mono font-bold mb-6 text-green-400">
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
                          className="w-full p-3 bg-gray-800/50 border border-green-500/30 rounded-lg text-white font-mono focus:outline-none focus:border-green-400"
                        >
                          <option value="">Select agent personality</option>
                          <option value="professional">Professional - Formal, authoritative, expert tone</option>
                          <option value="friendly">Friendly - Warm, approachable, conversational</option>
                          <option value="technical">Technical - Precise, detailed, engineering-focused</option>
                          <option value="consultative">Consultative - Advisory, solution-oriented, strategic</option>
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
                          className="w-full p-3 bg-gray-800/50 border border-green-500/30 rounded-lg text-white font-mono focus:outline-none focus:border-green-400"
                        >
                          <option value="">Select communication style</option>
                          <option value="step-by-step">Step-by-Step - Detailed instructions, sequential guidance</option>
                          <option value="overview-first">Overview First - Big picture, then details</option>
                          <option value="problem-focused">Problem-Focused - Identify issue, then solution</option>
                          <option value="solution-focused">Solution-Focused - Immediate answers, quick fixes</option>
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
                          className="w-full p-3 bg-gray-800/50 border border-green-500/30 rounded-lg text-white font-mono focus:outline-none focus:border-green-400"
                        >
                          <option value="">Select technical level</option>
                          <option value="beginner">Beginner - Basic concepts, simple explanations</option>
                          <option value="intermediate">Intermediate - Some technical knowledge, moderate detail</option>
                          <option value="advanced">Advanced - High technical knowledge, detailed explanations</option>
                          <option value="expert">Expert - Deep technical expertise, complex problem solving</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-mono font-medium text-gray-300 mb-2">
                          Problem Solving Approach
                        </label>
                        <select
                          value={formData.problemSolvingApproach}
                          onChange={(e) => updateFormData('problemSolvingApproach', e.target.value)}
                          className="w-full p-3 bg-gray-800/50 border border-green-500/30 rounded-lg text-white font-mono focus:outline-none focus:border-green-400"
                        >
                          <option value="">Select problem solving approach</option>
                          <option value="systematic">Systematic - Methodical, step-by-step diagnosis</option>
                          <option value="creative">Creative - Innovative solutions, thinking outside the box</option>
                          <option value="data-driven">Data-Driven - Evidence-based, analytical approach</option>
                          <option value="experience-based">Experience-Based - Past cases, lessons learned</option>
                        </select>
                      </div>
                    </div>
                  </div>
                )}

                {/* Step 5: Specializations */}
                {currentStep === 5 && (
                  <div className="space-y-6">
                    <h3 className="text-2xl font-mono font-bold mb-6 text-orange-400">
                      Technical Specializations
                    </h3>
                    
                    <div>
                      <label className="block text-sm font-mono font-medium text-gray-300 mb-2">
                        Research Focus
                      </label>
                      <select
                        value={formData.researchFocus}
                        onChange={(e) => updateFormData('researchFocus', e.target.value)}
                        className="w-full p-3 bg-gray-800/50 border border-orange-500/30 rounded-lg text-white font-mono focus:outline-none focus:border-orange-400"
                      >
                        <option value="">Select research focus</option>
                        <option value="field-service-optimization">Field Service Optimization</option>
                        <option value="technical-documentation">Technical Documentation</option>
                        <option value="logistics-efficiency">Logistics & Supply Chain Efficiency</option>
                        <option value="quality-control">Quality Control & Compliance</option>
                        <option value="predictive-maintenance">Predictive Maintenance</option>
                        <option value="workflow-automation">Workflow Automation</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-mono font-medium text-gray-300 mb-2">
                        Research Depth
                      </label>
                      <select
                        value={formData.researchDepth}
                        onChange={(e) => updateFormData('researchDepth', e.target.value)}
                        className="w-full p-3 bg-gray-800/50 border border-orange-500/30 rounded-lg text-white font-mono focus:outline-none focus:border-orange-400"
                      >
                        <option value="">Select research depth</option>
                        <option value="overview">Overview - High-level analysis and recommendations</option>
                        <option value="detailed">Detailed - In-depth analysis with specific solutions</option>
                        <option value="comprehensive">Comprehensive - Complete analysis with implementation roadmap</option>
                        <option value="custom">Custom - Tailored to specific requirements</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-mono font-medium text-gray-300 mb-3">
                        Select Technical Specializations (select at least one) *
                      </label>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {[
                          'Field Technician Support',
                          'Equipment Maintenance',
                          'Technical Troubleshooting',
                          'Service Call Optimization',
                          'Quality Control',
                          'Predictive Maintenance',
                          'Technical Documentation',
                          'CAD Integration',
                          'Logistics Optimization',
                          'Inventory Management',
                          'Fleet Management',
                          'Supply Chain Management',
                          'IT Operations',
                          'System Integration',
                          'Cybersecurity',
                          'Data Analytics'
                        ].map((specialization) => (
                          <label key={specialization} className="flex items-center p-3 bg-gray-800/30 rounded-lg hover:bg-gray-800/50 transition-colors cursor-pointer">
                            <input
                              type="checkbox"
                              checked={formData.rmeSpecializations.includes(specialization)}
                              onChange={(e) => {
                                if (e.target.checked) {
                                  updateFormData('rmeSpecializations', [...formData.rmeSpecializations, specialization]);
                                } else {
                                  updateFormData('rmeSpecializations', formData.rmeSpecializations.filter(s => s !== specialization));
                                }
                              }}
                              className="mr-3 text-orange-500 focus:ring-orange-400"
                            />
                            <span className="text-sm font-mono text-gray-300">{specialization}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* Step 6: Review */}
                {currentStep === 6 && (
                  <div className="space-y-6">
                    <h3 className="text-2xl font-mono font-bold mb-6 text-emerald-400">
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
                        <h4 className="font-mono font-semibold text-blue-300 mb-2">Business Details</h4>
                        <p className="text-gray-300 font-mono">Industry: {formData.industry}</p>
                        <p className="text-gray-300 font-mono">Description: {formData.businessDescription}</p>
                        <p className="text-gray-300 font-mono">Team Size: {formData.teamSize}</p>
                      </div>

                      <div className="bg-gray-800/30 rounded-lg p-4">
                        <h4 className="font-mono font-semibold text-purple-300 mb-2">Demo Configuration</h4>
                        <p className="text-gray-300 font-mono">Demo Type: {formData.demoType}</p>
                        <p className="text-gray-300 font-mono">Package: {formData.consultationPackage}</p>
                      </div>

                      <div className="bg-gray-800/30 rounded-lg p-4">
                        <h4 className="font-mono font-semibold text-green-300 mb-2">AI Agent Configuration</h4>
                        <p className="text-gray-300 font-mono">Personality: {formData.agentPersonality}</p>
                        <p className="text-gray-300 font-mono">Communication: {formData.communicationStyle}</p>
                        <p className="text-gray-300 font-mono">Technical Level: {formData.technicalLevel}</p>
                      </div>

                      <div className="bg-gray-800/30 rounded-lg p-4">
                        <h4 className="font-mono font-semibold text-orange-300 mb-2">Specializations</h4>
                        <p className="text-gray-300 font-mono">Research Focus: {formData.researchFocus}</p>
                        <p className="text-gray-300 font-mono">Selected: {formData.rmeSpecializations.join(', ')}</p>
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
                      type="button"
                      onClick={handleSubmit}
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
      </section>
    </div>
  );
};

export default GuidedDemoForm;
