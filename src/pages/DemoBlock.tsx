import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { MessageSquare, Brain, CheckCircle, ArrowRight, Bot, Globe } from 'lucide-react';

const DemoBlock: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [expandedSections, setExpandedSections] = useState<{[key: string]: boolean}>({});
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    industry: '',
    demoType: '',
    businessDescription: '',
    useCase: '',
    currentChallenges: '',
    rmeSpecializations: [] as string[],
    consultationPackage: '',
    preferredDate: '',
    preferredTime: ''
  });

  const toggleSection = (sectionId: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [sectionId]: !prev[sectionId]
    }));
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted:', formData);
  };

  const steps = [
    { id: 'contact', title: 'Contact Information', description: 'Your basic contact details' },
    { id: 'demoType', title: 'Demo Type Selection', description: 'Choose your preferred demo type' },
    { id: 'painPoints', title: 'Pain Points & Challenges', description: 'Describe your current challenges' },
    { id: 'specializations', title: 'AI Specializations', description: 'Select relevant specializations' },
    { id: 'configuration', title: 'AI Configuration', description: 'Customize your AI agent' },
    { id: 'scheduling', title: 'Scheduling', description: 'Choose your preferred time' }
  ];

  return (
    <div className="min-h-screen bg-[#0A0B1E] text-white">
      {/* Header */}
      <section className="py-20 bg-gradient-to-b from-cyan-500/10 to-transparent">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-4xl font-mono font-bold mb-6">
            <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              Request Your Custom Demo
            </span>
          </h1>
          <p className="text-xl text-gray-400 font-mono max-w-3xl mx-auto">
            Get a personalized AI solution demo tailored to your field service, engineering, or technical operations needs.
          </p>
        </div>
      </section>

      {/* Demo Form Section */}
      <section className="py-20 bg-[#0A0B1E]">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <div className="bg-gradient-to-b from-gray-800/50 to-gray-900/50 rounded-2xl p-8 border border-cyan-500/20">
              
              {/* Progress Indicator */}
              <div className="mb-8">
                <div className="flex items-center justify-center space-x-4">
                  {steps.map((step, index) => (
                    <div key={step.id} className="flex items-center">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-mono font-bold ${
                        index + 1 <= currentStep 
                          ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white' 
                          : 'bg-gray-700 text-gray-400'
                      }`}>
                        {index + 1}
                      </div>
                      {index < steps.length - 1 && (
                        <div className={`w-8 h-0.5 mx-2 ${
                          index + 1 < currentStep ? 'bg-gradient-to-r from-cyan-500 to-blue-500' : 'bg-gray-700'
                        }`} />
                      )}
                    </div>
                  ))}
                </div>
                <div className="text-center mt-2">
                  <p className="text-sm text-gray-400 font-mono">
                    Step {currentStep} of {steps.length}
                  </p>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                {steps.map((step, index) => (
                  <div key={step.id} className={`bg-gray-800/30 rounded-xl p-6 border transition-all ${
                    index + 1 <= currentStep ? 'border-cyan-500/50' : 'border-gray-700'
                  }`}>
                    <div 
                      className="flex items-center justify-between cursor-pointer"
                      onClick={() => toggleSection(step.id)}
                    >
                      <div className="flex items-center space-x-3">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-mono font-bold ${
                          index + 1 <= currentStep ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white' : 'bg-gray-700 text-gray-400'
                        }`}>
                          {index + 1}
                        </div>
                        <div>
                          <h4 className="text-lg font-mono font-semibold text-white">{step.title}</h4>
                          <p className="text-sm text-gray-400 font-mono">{step.description}</p>
                        </div>
                      </div>
                      <div className="text-cyan-400">
                        {expandedSections[step.id] ? '−' : '+'}
                      </div>
                    </div>
                    
                    {expandedSections[step.id] && (
                      <div className="mt-6">
                        {step.id === 'contact' && (
                          <div className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                                  Email Address *
                                </label>
                                <input
                                  type="email"
                                  value={formData.email}
                                  onChange={(e) => handleInputChange('email', e.target.value)}
                                  required
                                  className="w-full p-3 bg-gray-800/50 border border-cyan-500/30 rounded-lg text-white font-mono focus:outline-none focus:border-cyan-400"
                                  placeholder="Enter your email address"
                                />
                              </div>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                              <div>
                                <label className="block text-sm font-mono font-medium text-gray-300 mb-2">
                                  Phone Number *
                                </label>
                                <input
                                  type="tel"
                                  value={formData.phone}
                                  onChange={(e) => handleInputChange('phone', e.target.value)}
                                  required
                                  className="w-full p-3 bg-gray-800/50 border border-cyan-500/30 rounded-lg text-white font-mono focus:outline-none focus:border-cyan-400"
                                  placeholder="Enter your phone number"
                                />
                              </div>
                            </div>
                          </div>
                        )}

                        {step.id === 'demoType' && (
                          <div className="space-y-4">
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
                                <option value="">Select your preferred demo type</option>
                                <option value="chatbot">Chatbot Demo - AI-powered chat interface</option>
                                <option value="voice-agent">Voice Agent Demo - AI voice assistant</option>
                                <option value="daily-briefing">Daily Briefing Demo - AI-generated reports</option>
                              </select>
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
                                <option value="">Select your industry</option>
                                <option value="field-service">Field Service & Technical Operations</option>
                                <option value="engineering">Engineering & Manufacturing</option>
                                <option value="logistics">Logistics & Supply Chain</option>
                                <option value="it">IT & Technology</option>
                                <option value="other">Other</option>
                              </select>
                            </div>
                          </div>
                        )}

                        {step.id === 'painPoints' && (
                          <div className="space-y-4">
                            <div>
                              <label className="block text-sm font-mono font-medium text-gray-300 mb-2">
                                Business Description *
                              </label>
                              <textarea
                                value={formData.businessDescription}
                                onChange={(e) => handleInputChange('businessDescription', e.target.value)}
                                required
                                rows={3}
                                className="w-full p-3 bg-gray-800/50 border border-cyan-500/30 rounded-lg text-white font-mono focus:outline-none focus:border-cyan-400"
                                placeholder="Describe your business and operations"
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-mono font-medium text-gray-300 mb-2">
                                Current Challenges *
                              </label>
                              <textarea
                                value={formData.currentChallenges}
                                onChange={(e) => handleInputChange('currentChallenges', e.target.value)}
                                required
                                rows={3}
                                className="w-full p-3 bg-gray-800/50 border border-cyan-500/30 rounded-lg text-white font-mono focus:outline-none focus:border-cyan-400"
                                placeholder="What challenges are you facing that AI could help solve?"
                              />
                            </div>
                          </div>
                        )}

                        {step.id === 'specializations' && (
                          <div className="space-y-4">
                            <p className="text-sm text-gray-400 font-mono">
                              Select the AI specializations that are most relevant to your needs:
                            </p>
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                              {[
                                'Field Service AI', 'Technical Documentation', 'Logistics Optimization',
                                'Quality Analytics', 'Customer Support', 'Process Automation',
                                'Data Analysis', 'Predictive Maintenance', 'Workflow Management'
                              ].map((spec) => (
                                <label key={spec} className="flex items-center space-x-2 cursor-pointer">
                                  <input
                                    type="checkbox"
                                    checked={formData.rmeSpecializations.includes(spec)}
                                    onChange={(e) => {
                                      if (e.target.checked) {
                                        setFormData(prev => ({
                                          ...prev,
                                          rmeSpecializations: [...prev.rmeSpecializations, spec]
                                        }));
                                      } else {
                                        setFormData(prev => ({
                                          ...prev,
                                          rmeSpecializations: prev.rmeSpecializations.filter(s => s !== spec)
                                        }));
                                      }
                                    }}
                                    className="w-4 h-4 text-cyan-500 bg-gray-800 border-gray-600 rounded focus:ring-cyan-500"
                                  />
                                  <span className="text-sm font-mono text-gray-300">{spec}</span>
                                </label>
                              ))}
                            </div>
                          </div>
                        )}

                        {step.id === 'configuration' && (
                          <div className="space-y-4">
                            <div>
                              <label className="block text-sm font-mono font-medium text-gray-300 mb-2">
                                Use Case *
                              </label>
                              <textarea
                                value={formData.useCase}
                                onChange={(e) => handleInputChange('useCase', e.target.value)}
                                required
                                rows={3}
                                className="w-full p-3 bg-gray-800/50 border border-cyan-500/30 rounded-lg text-white font-mono focus:outline-none focus:border-cyan-400"
                                placeholder="How do you plan to use the AI solution?"
                              />
                            </div>
                          </div>
                        )}

                        {step.id === 'scheduling' && (
                          <div className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div>
                                <label className="block text-sm font-mono font-medium text-gray-300 mb-2">
                                  Preferred Date *
                                </label>
                                <input
                                  type="date"
                                  value={formData.preferredDate}
                                  onChange={(e) => handleInputChange('preferredDate', e.target.value)}
                                  required
                                  className="w-full p-3 bg-gray-800/50 border border-cyan-500/30 rounded-lg text-white font-mono focus:outline-none focus:border-cyan-400"
                                />
                              </div>
                              <div>
                                <label className="block text-sm font-mono font-medium text-gray-300 mb-2">
                                  Preferred Time *
                                </label>
                                <select
                                  value={formData.preferredTime}
                                  onChange={(e) => handleInputChange('preferredTime', e.target.value)}
                                  required
                                  className="w-full p-3 bg-gray-800/50 border border-cyan-500/30 rounded-lg text-white font-mono focus:outline-none focus:border-cyan-400"
                                >
                                  <option value="">Select time</option>
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
                        )}
                      </div>
                    )}
                  </div>
                ))}

                {/* Submit Button */}
                <div className="text-center pt-8">
                  <button
                    type="submit"
                    className="px-8 py-4 rounded-full font-mono font-semibold text-lg transition-all transform bg-gradient-to-r from-cyan-500 to-blue-500 hover:shadow-lg hover:shadow-cyan-500/20 hover:scale-105 cursor-pointer"
                  >
                    <div className="flex items-center justify-center">
                      <Brain className="w-5 h-5" />
                      Request Demo
                      <ArrowRight className="w-5 h-5" />
                    </div>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default DemoBlock;
