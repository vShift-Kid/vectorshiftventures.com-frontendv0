import React, { useState } from 'react';
import { Calendar, Clock, User, Mail, Phone, Building, MessageSquare, CheckCircle, Bot, FileText, PhoneCall, Search, Brain, Globe, Target, DollarSign, ArrowRight, Gift } from 'lucide-react';
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
    businessDescription: '',
    preferredDate: '',
    preferredTime: ''
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false); // New state for form validity

  const handleInputChange = (field: string, value: string) => {
    const updatedFormData = {
      ...formData,
      [field]: value
    };
    setFormData(updatedFormData);
    
    // Re-evaluate form validity with updated data
    setIsFormValid(
      updatedFormData.name.length > 0 &&
      updatedFormData.email.length > 0 &&
      updatedFormData.company.length > 0 &&
      updatedFormData.industry !== '' &&
      updatedFormData.consultationPackage !== '' &&
      updatedFormData.businessDescription.length > 20 && // Require meaningful business description
      updatedFormData.preferredDate.length > 0 &&
      updatedFormData.preferredTime.length > 0
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  const consultationTypes = [
    {
      title: "Executive AI Strategy",
      duration: "60 minutes",
      subtleNumber: "18",
      description: "Strategic consultation for management on AI automation for technical operations and field service",
      features: [
        "Technical operations assessment and analysis",
        "AI automation strategy for field service teams",
        "ROI analysis for technical AI implementation",
        "Executive implementation roadmap and next steps"
      ],
      price: "Free",
      recommended: true
    },
    {
      title: "Technical Operations Review",
      duration: "30 minutes",
      subtleNumber: "20",
      description: "Initial consultation to understand your technical operations and field service needs",
      features: [
        "Field service operations assessment",
        "Technical automation opportunities review",
        "Service overview and consultation planning"
      ],
      price: "Free"
    },
    {
      title: "Engineering AI Planning",
      duration: "45 minutes",
      subtleNumber: "29",
      description: "Deep dive into engineering processes and technical AI requirements",
      features: [
        "Engineering process analysis and optimization",
        "Technical AI requirements assessment",
        "Integration planning for engineering tools"
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
              Thank you, {formData.name}. We've received your consultation request for {formData.preferredDate} at {formData.preferredTime}. 
              We'll contact you within 24 hours to confirm your appointment and discuss your business automation needs.
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
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white pt-20">
      {/* Hero Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-500/15 via-green-500/10 to-transparent" />
        <div className="container mx-auto px-6 relative">
          <div className="text-center max-w-4xl mx-auto mb-12">
            <div className="w-24 h-24 bg-gradient-to-r from-blue-500 to-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <Brain className="w-12 h-12 text-white" />
            </div>
            <h1 className="font-mono text-5xl font-bold mb-6">
              <span className="bg-gradient-to-r from-blue-400 via-green-400 to-blue-500 bg-clip-text text-transparent">
                Executive AI Strategy Consultation
              </span>
            </h1>
            <p className="text-xl text-slate-300 mb-8 font-mono">
              Strategic consultation for management and executives on AI automation for field service, engineering, and technical operations. 
              Get ROI-focused recommendations and implementation strategies tailored to your technical teams.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              <div className="flex items-center bg-gradient-to-b from-blue-500/10 to-transparent border border-slate-400/20 rounded-xl p-4 relative">
                <Brain className="w-8 h-8 text-blue-400 mr-3" />
                <span className="font-mono text-sm text-white">Custom AI Solutions</span>
                <div className="absolute top-1 right-1 text-slate-600 font-mono text-xs opacity-30">2</div>
              </div>
              <div className="flex items-center bg-gradient-to-b from-green-500/10 to-transparent border border-slate-400/20 rounded-xl p-4 relative">
                <Calendar className="w-8 h-8 text-green-400 mr-3" />
                <span className="font-mono text-sm text-white">Flexible Scheduling</span>
                <div className="absolute top-1 right-1 text-slate-600 font-mono text-xs opacity-30">7</div>
              </div>
              <div className="flex items-center bg-gradient-to-b from-blue-500/10 to-transparent border border-slate-400/20 rounded-xl p-4 relative">
                <MessageSquare className="w-8 h-8 text-blue-400 mr-3" />
                <span className="font-mono text-sm text-white">Expert Consultation</span>
                <div className="absolute top-1 right-1 text-slate-600 font-mono text-xs opacity-30">11</div>
              </div>
            </div>
          </div>

          {/* Consultation Packages */}
          <div className="max-w-6xl mx-auto mb-12">
            <h2 className="text-2xl font-mono font-bold text-center mb-8">
              <span className="bg-gradient-to-r from-blue-400 via-green-400 to-blue-500 bg-clip-text text-transparent">
                Executive Consultation Packages
              </span>
            </h2>
            <p className="text-slate-300 text-center mb-8 font-mono">
              Strategic AI consultation packages designed for management and executives in technical operations, field service, and engineering teams.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Discovery Call */}
              <div className="bg-gradient-to-b from-slate-800/50 to-slate-900/50 rounded-2xl p-6 border border-slate-400/30 relative">
                <div className="text-center mb-6">
                  <h3 className="text-xl font-mono font-semibold mb-2 text-white">Discovery Call</h3>
                  <div className="text-3xl font-mono font-bold text-green-400 mb-1">Free</div>
                  <div className="text-slate-400 font-mono text-sm">30 minutes</div>
                </div>
                <p className="text-slate-300 font-mono text-sm mb-6">
                  Initial consultation to understand your automation needs
                </p>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-start text-sm text-slate-200 font-mono">
                    <CheckCircle className="w-4 h-4 text-blue-400 mr-2 mt-0.5 flex-shrink-0" />
                    Business requirements assessment
                  </li>
                  <li className="flex items-start text-sm text-slate-200 font-mono">
                    <CheckCircle className="w-4 h-4 text-blue-400 mr-2 mt-0.5 flex-shrink-0" />
                    Automation opportunities review
                  </li>
                  <li className="flex items-start text-sm text-slate-200 font-mono">
                    <CheckCircle className="w-4 h-4 text-blue-400 mr-2 mt-0.5 flex-shrink-0" />
                    Service overview and consultation planning
                  </li>
                </ul>
                {/* Subtle lucky number */}
                <div className="absolute top-3 right-3 text-slate-600 font-mono text-xs opacity-30">2</div>
              </div>

              {/* Strategy Consultation - Recommended */}
              <div className="bg-gradient-to-b from-blue-500/10 via-green-500/5 to-transparent rounded-2xl p-6 border border-slate-400/30 relative">
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <span className="bg-gradient-to-r from-blue-500 to-green-500 text-white px-4 py-1 rounded-full text-xs font-mono font-semibold">
                    Recommended
                  </span>
                </div>
                {/* Subtle lucky number */}
                <div className="absolute top-3 right-3 text-slate-600 font-mono text-xs opacity-30">7</div>
                <div className="text-center mb-6">
                  <h3 className="text-xl font-mono font-semibold mb-2 text-white">Strategy Consultation</h3>
                  <div className="text-3xl font-mono font-bold text-blue-400 mb-1">$297</div>
                  <div className="text-slate-400 font-mono text-sm">60 minutes</div>
                </div>
                <p className="text-slate-300 font-mono text-sm mb-6">
                  Comprehensive consultation to understand your needs and plan automation strategy
                </p>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-start text-sm text-slate-200 font-mono">
                    <CheckCircle className="w-4 h-4 text-blue-400 mr-2 mt-0.5 flex-shrink-0" />
                    Business needs assessment and analysis
                  </li>
                  <li className="flex items-start text-sm text-slate-200 font-mono">
                    <CheckCircle className="w-4 h-4 text-blue-400 mr-2 mt-0.5 flex-shrink-0" />
                    Custom automation strategy planning
                  </li>
                  <li className="flex items-start text-sm text-slate-200 font-mono">
                    <CheckCircle className="w-4 h-4 text-blue-400 mr-2 mt-0.5 flex-shrink-0" />
                    ROI projections and implementation roadmap
                  </li>
                  <li className="flex items-start text-sm text-slate-200 font-mono">
                    <CheckCircle className="w-4 h-4 text-blue-400 mr-2 mt-0.5 flex-shrink-0" />
                    Technology recommendations and next steps
                  </li>
                </ul>
              </div>

              {/* Technical Planning */}
              <div className="bg-gradient-to-b from-slate-800/50 to-slate-900/50 rounded-2xl p-6 border border-slate-400/30 relative">
                {/* Subtle lucky number */}
                <div className="absolute top-3 right-3 text-slate-600 font-mono text-xs opacity-30">11</div>
                <div className="text-center mb-6">
                  <h3 className="text-xl font-mono font-semibold mb-2 text-white">Technical Planning</h3>
                  <div className="text-3xl font-mono font-bold text-green-400 mb-1">$197</div>
                  <div className="text-slate-400 font-mono text-sm">45 minutes</div>
                </div>
                <p className="text-slate-300 font-mono text-sm mb-6">
                  Deep dive into your processes and technical requirements
                </p>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-start text-sm text-slate-200 font-mono">
                    <CheckCircle className="w-4 h-4 text-green-400 mr-2 mt-0.5 flex-shrink-0" />
                    Technical requirements analysis
                  </li>
                  <li className="flex items-start text-sm text-slate-200 font-mono">
                    <CheckCircle className="w-4 h-4 text-green-400 mr-2 mt-0.5 flex-shrink-0" />
                    Integration planning and assessment
                  </li>
                  <li className="flex items-start text-sm text-slate-200 font-mono">
                    <CheckCircle className="w-4 h-4 text-green-400 mr-2 mt-0.5 flex-shrink-0" />
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
                      <optgroup label="HVAC & Climate Control">
                        <option value="hvac-residential">HVAC - Residential</option>
                        <option value="hvac-commercial">HVAC - Commercial</option>
                        <option value="hvac-industrial">HVAC - Industrial</option>
                        <option value="refrigeration">Refrigeration Services</option>
                        <option value="duct-cleaning">Duct Cleaning & Maintenance</option>
                      </optgroup>
                      <optgroup label="Plumbing Services">
                        <option value="plumbing-residential">Plumbing - Residential</option>
                        <option value="plumbing-commercial">Plumbing - Commercial</option>
                        <option value="plumbing-industrial">Plumbing - Industrial</option>
                        <option value="drain-cleaning">Drain Cleaning & Sewer</option>
                        <option value="water-treatment">Water Treatment Systems</option>
                      </optgroup>
                      <optgroup label="Electrical Services">
                        <option value="electrical-residential">Electrical - Residential</option>
                        <option value="electrical-commercial">Electrical - Commercial</option>
                        <option value="electrical-industrial">Electrical - Industrial</option>
                        <option value="low-voltage">Low Voltage Systems</option>
                        <option value="generator-services">Generator Services</option>
                      </optgroup>
                      <optgroup label="Maintenance & Repair">
                        <option value="facility-maintenance">Facility Maintenance</option>
                        <option value="equipment-repair">Equipment Repair</option>
                        <option value="preventive-maintenance">Preventive Maintenance</option>
                        <option value="emergency-repair">Emergency Repair Services</option>
                        <option value="warranty-services">Warranty Services</option>
                      </optgroup>
                      <optgroup label="Landscaping & Grounds">
                        <option value="landscaping-residential">Landscaping - Residential</option>
                        <option value="landscaping-commercial">Landscaping - Commercial</option>
                        <option value="lawn-care">Lawn Care & Maintenance</option>
                        <option value="tree-services">Tree Services</option>
                        <option value="irrigation">Irrigation Systems</option>
                      </optgroup>
                      <optgroup label="Cleaning Services">
                        <option value="commercial-cleaning">Commercial Cleaning</option>
                        <option value="residential-cleaning">Residential Cleaning</option>
                        <option value="specialized-cleaning">Specialized Cleaning</option>
                        <option value="post-construction">Post-Construction Cleanup</option>
                        <option value="carpet-cleaning">Carpet & Upholstery</option>
                      </optgroup>
                      <optgroup label="Security & Access Control">
                        <option value="security-systems">Security Systems</option>
                        <option value="access-control">Access Control Systems</option>
                        <option value="cctv-surveillance">CCTV & Surveillance</option>
                        <option value="alarm-systems">Alarm Systems</option>
                        <option value="fire-safety">Fire Safety Systems</option>
                      </optgroup>
                      <optgroup label="Technology & Communications">
                        <option value="telecommunications">Telecommunications</option>
                        <option value="network-installation">Network Installation</option>
                        <option value="cable-services">Cable & Internet Services</option>
                        <option value="phone-systems">Phone Systems</option>
                        <option value="it-support">IT Support Services</option>
                      </optgroup>
                      <optgroup label="Utilities & Infrastructure">
                        <option value="utilities">Utilities Services</option>
                        <option value="infrastructure">Infrastructure Maintenance</option>
                        <option value="pipeline-services">Pipeline Services</option>
                        <option value="power-distribution">Power Distribution</option>
                        <option value="water-systems">Water Systems</option>
                      </optgroup>
                      <optgroup label="Manufacturing & Industrial">
                        <option value="manufacturing-support">Manufacturing Support</option>
                        <option value="industrial-equipment">Industrial Equipment</option>
                        <option value="production-line">Production Line Services</option>
                        <option value="quality-control">Quality Control Services</option>
                        <option value="safety-compliance">Safety & Compliance</option>
                      </optgroup>
                      <optgroup label="Healthcare & Medical">
                        <option value="medical-equipment">Medical Equipment Services</option>
                        <option value="healthcare-facilities">Healthcare Facilities</option>
                        <option value="laboratory-services">Laboratory Services</option>
                        <option value="pharmaceutical">Pharmaceutical Services</option>
                        <option value="dental-equipment">Dental Equipment</option>
                      </optgroup>
                      <optgroup label="Transportation & Logistics">
                        <option value="fleet-maintenance">Fleet Maintenance</option>
                        <option value="logistics-support">Logistics Support</option>
                        <option value="warehouse-services">Warehouse Services</option>
                        <option value="delivery-services">Delivery Services</option>
                        <option value="transportation-repair">Transportation Repair</option>
                      </optgroup>
                      <optgroup label="Other Field Services">
                        <option value="other-field-service">Other Field Service</option>
                        <option value="consulting-services">Consulting Services</option>
                        <option value="inspection-services">Inspection Services</option>
                        <option value="testing-services">Testing Services</option>
                        <option value="custom-solution">Custom Solution</option>
                      </optgroup>
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
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-mono font-medium text-gray-300 mb-2">
                        Preferred Date *
                      </label>
                      <input
                        type="date"
                        value={formData.preferredDate}
                        onChange={(e) => handleInputChange('preferredDate', e.target.value)}
                        required
                        min={new Date().toISOString().split('T')[0]}
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
                        <option value="">Select a time</option>
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
                  
                  <div className="text-center">
                    <button
                      type="submit"
                      className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-mono font-semibold py-4 px-8 rounded-xl transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-3"
                    >
                      <div className="flex items-center gap-3">
                        <Brain className="w-5 h-5" />
                        Book Consultation
                        <ArrowRight className="w-5 h-5" />
                      </div>
                    </button>
                  </div>
                </form>
                
                {/* Custom Demo Reward Block - Only shows when form is valid */}
                {isFormValid && (
                  <div 
                    className="mt-8 bg-gradient-to-b from-green-500/10 to-transparent border border-green-500/30 rounded-2xl p-6 transition-all duration-500 ease-in-out"
                    style={{
                      animation: 'fadeInUp 0.5s ease-out'
                    }}
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <Gift className="w-6 h-6 text-green-400" />
                      <h4 className="font-mono font-semibold text-green-400 text-lg">
                        🎁 Your Custom Voice Assistant Demo
                      </h4>
                    </div>
                    <p className="text-gray-300 font-mono mb-4">
                      As a thank you for providing your comprehensive business information, we'll create a personalized AI voice assistant specifically trained on your business processes and challenges.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                      <div className="flex items-center gap-2">
                        <Bot className="w-4 h-4 text-green-400" />
                        <span className="font-mono text-gray-300">Custom AI Voice Assistant</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Brain className="w-4 h-4 text-green-400" />
                        <span className="font-mono text-gray-300">Trained on Your Business</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-green-400" />
                        <span className="font-mono text-gray-300">24-48 Hour Delivery</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Consultation; 