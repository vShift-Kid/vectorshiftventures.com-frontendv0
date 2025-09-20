import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { MessageSquare, Brain, CheckCircle, ArrowRight, Bot, Globe } from 'lucide-react';


// Function to filter specializations based on search query
const getFilteredSpecializations = (specializations: string[], query: string): string[] => {
  if (!query.trim()) return specializations;
  
  const searchTerms = query.toLowerCase().split(' ').filter(term => term.length > 0);
  
  return specializations.filter(specialization => 
    searchTerms.every(term => 
      specialization.toLowerCase().includes(term)
    )
  );
};


// Comprehensive AI Agent Specializations - Full Spectrum Coverage
const mainSpecializations = {
  'Field Service Operations': [
    'Field Technician Support', 'Equipment Maintenance', 'Preventive Maintenance', 'Emergency Response',
    'Service Call Optimization', 'Technical Troubleshooting', 'Field Engineering', 'Mobile Workforce Management',
    'Route Optimization', 'Dispatch Coordination', 'Field Data Collection', 'Remote Diagnostics',
    'Equipment Performance Monitoring', 'Maintenance Scheduling', 'Spare Parts Management', 'Work Order Management',
    'Field Service Software', 'Mobile Apps', 'GPS Tracking', 'Field Documentation'
  ],
  'Engineering & Technical': [
    'CAD Integration', 'Technical Documentation', 'Engineering Workflows', 'Design Optimization',
    'Technical Analysis', 'System Integration', 'Engineering Management', 'Technical Training',
    'Engineering Standards', 'Technical Specifications', 'Design Validation', 'Technical Innovation',
    'Engineering Quality', 'Technical Risk Management', 'Engineering Compliance', 'Technical Support',
    'Technical Writing', 'Process Documentation', 'Knowledge Management', 'Technical Consulting'
  ],
  'Logistics & Supply Chain': [
    'Inventory Management', 'Supply Chain Optimization', 'Fleet Management', 'Warehouse Operations',
    'Route Planning', 'Delivery Optimization', 'Vendor Management', 'Procurement',
    'Distribution Networks', 'Supply Chain Analytics', 'Logistics Coordination', 'Transportation Management',
    'Inventory Control', 'Order Fulfillment', 'Supply Chain Visibility', 'Logistics Automation',
    'Fleet Tracking', 'Delivery Scheduling', 'Supply Chain Risk Management', 'Logistics Reporting'
  ],
  'IT & Technology': [
    'System Administration', 'Technical Support', 'Network Management', 'Cybersecurity',
    'Software Development', 'System Integration', 'Data Management', 'IT Operations',
    'Cloud Computing', 'API Development', 'Database Management', 'IT Security',
    'System Monitoring', 'IT Automation', 'Technical Documentation', 'IT Training',
    'Software Maintenance', 'System Optimization', 'IT Compliance', 'Technical Consulting'
  ],
  'Quality & Analytics': [
    'Quality Control', 'Performance Analytics', 'Predictive Maintenance', 'Compliance Monitoring',
    'Quality Assurance', 'KPI Tracking', 'Data Analytics', 'Business Intelligence',
    'Quality Metrics', 'Performance Monitoring', 'Statistical Analysis', 'Trend Analysis',
    'Quality Management', 'Analytics Reporting', 'Data Visualization', 'Performance Optimization',
    'Quality Standards', 'Analytics Automation', 'Quality Training', 'Analytics Consulting'
  ],
  'Management & Executive': [
    'Strategic Planning', 'Project Management', 'Operations Management', 'Business Analysis',
    'Executive Decision Making', 'Resource Allocation', 'Performance Management', 'Strategic Consulting',
    'Business Process Optimization', 'Change Management', 'Leadership Development', 'Executive Support',
    'Strategic Analysis', 'Business Intelligence', 'Executive Reporting', 'Strategic Implementation',
    'Management Consulting', 'Executive Training', 'Strategic Planning', 'Executive Analytics'
  ],
  'Customer & Support': [
    'Customer Service', 'Support Ticket Management', 'Customer Experience', 'Customer Satisfaction',
    'Customer Support', 'Service Level Management', 'Customer Care', 'Support Operations',
    'Customer Feedback', 'Support Analytics', 'Customer Success', 'Service Optimization',
    'Customer Relationship Management', 'Support Training', 'Customer Insights', 'Service Delivery',
    'Customer Support Automation', 'Support Reporting', 'Customer Retention', 'Support Quality'
  ],
  'Compliance & Standards': [
    'Regulatory Compliance', 'Industry Standards', 'Safety Compliance', 'Quality Standards',
    'Compliance Monitoring', 'Audit Management', 'Regulatory Reporting', 'Standards Compliance',
    'Compliance Training', 'Risk Management', 'Compliance Documentation', 'Regulatory Analysis',
    'Compliance Automation', 'Compliance Reporting', 'Standards Implementation', 'Compliance Consulting',
    'Regulatory Updates', 'Compliance Analytics', 'Standards Training', 'Compliance Optimization'
  ],
  'Manufacturing & Production': [
    'Production Management', 'Manufacturing Operations', 'Process Optimization', 'Production Planning',
    'Manufacturing Analytics', 'Production Control', 'Manufacturing Quality', 'Production Efficiency',
    'Manufacturing Automation', 'Production Scheduling', 'Manufacturing Compliance', 'Production Reporting',
    'Manufacturing Training', 'Production Optimization', 'Manufacturing Support', 'Production Analytics',
    'Manufacturing Standards', 'Production Documentation', 'Manufacturing Consulting', 'Production Management'
  ],
  'Healthcare & Medical': [
    'Medical Equipment', 'Healthcare Operations', 'Medical Compliance', 'Healthcare Analytics',
    'Medical Documentation', 'Healthcare Quality', 'Medical Training', 'Healthcare Support',
    'Medical Standards', 'Healthcare Reporting', 'Medical Automation', 'Healthcare Optimization',
    'Medical Consulting', 'Healthcare Management', 'Medical Analytics', 'Healthcare Compliance',
    'Medical Support', 'Healthcare Training', 'Medical Quality', 'Healthcare Documentation'
  ],
  'Financial & Banking': [
    'Financial Analysis', 'Banking Operations', 'Financial Compliance', 'Banking Analytics',
    'Financial Reporting', 'Banking Quality', 'Financial Training', 'Banking Support',
    'Financial Standards', 'Banking Management', 'Financial Automation', 'Banking Optimization',
    'Financial Consulting', 'Banking Compliance', 'Financial Documentation', 'Banking Analytics',
    'Financial Support', 'Banking Training', 'Financial Quality', 'Banking Reporting'
  ],
  'Custom Specializations': [
    'Add Custom Specialization', 'Industry-Specific Solutions', 'Custom AI Training', 'Specialized Automation',
    'Custom Integration', 'Specialized Analytics', 'Custom Reporting', 'Specialized Training',
    'Custom Compliance', 'Specialized Support', 'Custom Documentation', 'Specialized Management'
  ]
};

const Demo: React.FC = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);
  const [showTooltips, setShowTooltips] = useState<{[key: string]: boolean}>({});

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    industry: '',
    consultationPackage: '',
    businessDescription: '',
    preferredDate: '',
    preferredTime: '',
    // AI Agent Customization Fields
    useCase: '',
    targetUsers: '',
    languageStyle: '',
    interactionMode: '',
    industryContext: '',
    businessRole: '',
    teamSize: '',
    currentChallenges: '',
    // Research Focus Fields
    researchFocus: '',
    researchDepth: '',
    // Demo Type Field
    demoType: '',
    // Additional AI Agent Attributes
    agentPersonality: '',
    communicationStyle: '',
    technicalLevel: '',
    problemSolvingApproach: '',
    customerInteractionStyle: '',
    // RME Specializations
    rmeSpecializations: [] as string[]
  });

  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [dragActive, setDragActive] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [customSpecialization, setCustomSpecialization] = useState('');

  const handleTooltipShow = (tooltipId: string) => {
    setShowTooltips(prev => ({ ...prev, [tooltipId]: true }));
  };

  const handleTooltipHide = (tooltipId: string) => {
    setShowTooltips(prev => ({ ...prev, [tooltipId]: false }));
  };

  const handleAddCustomSpecialization = () => {
    if (customSpecialization.trim() && !formData.rmeSpecializations.includes(customSpecialization.trim())) {
      setFormData(prev => ({
        ...prev,
        rmeSpecializations: [...prev.rmeSpecializations, customSpecialization.trim()]
      }));
      setCustomSpecialization('');
    }
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
      const newFiles = Array.from(e.dataTransfer.files) as File[];
      setUploadedFiles(prev => [...prev, ...newFiles]);
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files) as File[];
      setUploadedFiles(prev => [...prev, ...newFiles]);
    }
  };

  const removeFile = (index: number) => {
    setUploadedFiles(prev => prev.filter((_, i) => i !== index));
  };



  const handleInputChange = (field: string, value: string) => {
    const updatedFormData = {
      ...formData,
      [field]: value
    };
    setFormData(updatedFormData);
    
    // Re-evaluate form validity with updated data
    const isDemoOnly = updatedFormData.consultationPackage === 'Demo Request Only - Evaluation Phase';
    
    setIsFormValid(
      updatedFormData.name.length > 0 &&
      updatedFormData.email.length > 0 &&
      updatedFormData.company.length > 0 &&
      updatedFormData.phone.length > 0 &&
      updatedFormData.industry.length > 0 &&
      updatedFormData.consultationPackage.length > 0 &&
      updatedFormData.businessDescription.length > 10 &&
      updatedFormData.useCase.length > 0 &&
      updatedFormData.targetUsers.length > 0 &&
      updatedFormData.languageStyle.length > 0 &&
      updatedFormData.interactionMode.length > 0 &&
      updatedFormData.industryContext.length > 0 &&
      updatedFormData.businessRole.length > 0 &&
      updatedFormData.teamSize.length > 0 &&
      updatedFormData.currentChallenges.length > 10 &&
      updatedFormData.researchFocus.length > 0 &&
      updatedFormData.demoType.length > 0 &&
      updatedFormData.rmeSpecializations.length > 0 &&
      updatedFormData.agentPersonality.length > 0 &&
      updatedFormData.communicationStyle.length > 0 &&
      updatedFormData.technicalLevel.length > 0 &&
      updatedFormData.problemSolvingApproach.length > 0 &&
      (isDemoOnly || (updatedFormData.preferredDate.length > 0 && updatedFormData.preferredTime.length > 0))
    );
  };



  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      // Prepare the data for the n8n webhook
      const webhookData = {
        contactInfo: {
          name: formData.name,
          email: formData.email,
          phone: formData.phone
        },
        businessInfo: {
          companyName: formData.company,
          industry: formData.industry,
          website: '', // Will be researched by n8n
          businessDescription: formData.businessDescription
        },
        consultationPackage: formData.consultationPackage,
        scheduling: {
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
          teamSize: formData.teamSize,
          currentChallenges: formData.currentChallenges
        },
        researchPreferences: {
          researchFocus: formData.researchFocus,
          researchDepth: formData.researchDepth
        },
        demoType: formData.demoType,
        uploadedFiles: uploadedFiles.map(file => ({
          name: file.name,
          size: file.size,
          type: file.type
        })),
        timestamp: new Date().toISOString()
      };

      // Send to n8n webhook
      const response = await fetch('https://n8n.vectorshiftventures.com/webhook/demo-request', {
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
      console.error('Error details:', error);
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
                Demo Request Submitted
              </span>
            </h2>
            <p className="text-xl text-gray-400 mb-8 font-mono">
              {formData.consultationPackage === 'Demo Request Only - Evaluation Phase' 
                ? `Thank you, ${formData.name}. We've received your demo request and will contact you within 24 hours to discuss your business automation needs and create your custom AI solution tailored for ${formData.useCase} with ${formData.targetUsers}.`
                : `Thank you, ${formData.name}. We've received your consultation request and will contact you within 24 hours to discuss your business automation needs and create your custom AI solution tailored for ${formData.useCase} with ${formData.targetUsers}.`
              }
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/"
                className="font-mono bg-gradient-to-r from-cyan-500 to-blue-500 px-8 py-4 rounded-full text-lg font-semibold hover:shadow-lg hover:shadow-cyan-500/20 transition-all transform hover:scale-105"
              >
                Return Home
              </Link>
              <Link
                to="/services"
                className="font-mono border border-cyan-500/30 px-8 py-4 rounded-full text-lg font-semibold hover:bg-cyan-500/10 transition-all"
              >
                View Services
              </Link>
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
              Complete the form below to schedule your consultation and receive your custom technical AI demo.
            </p>
            
            <div className="bg-gradient-to-b from-cyan-500/10 to-transparent border border-cyan-500/20 rounded-2xl p-8 mb-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Bot className="w-8 h-8 text-white" />
              </div>
                  <h3 className="font-mono font-semibold mb-2">Field Service AI</h3>
                  <p className="text-sm text-gray-400">Voice assistant for technicians and field operations</p>
              </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Globe className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="font-mono font-semibold mb-2">Technical Documentation</h3>
                  <p className="text-sm text-gray-400">AI-generated technical docs and knowledge base</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <MessageSquare className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="font-mono font-semibold mb-2">Technical Consultation</h3>
                  <p className="text-sm text-gray-400">Specialized strategy for technical operations</p>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <div className="flex items-center text-cyan-400">
                <MessageSquare className="w-8 h-8 text-cyan-400 mr-3" />
                <span className="font-mono text-sm">Expert Consultation</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Request Demo Form Section */}
      <section className="py-20 bg-[#0A0B1E]">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto">
            <div className="bg-gradient-to-b from-gray-800/50 to-gray-900/50 rounded-2xl p-8 border border-cyan-500/20">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-mono font-bold mb-4">
                  <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                    Request Your Custom Demo
                  </span>
                </h3>
                <p className="text-gray-400 font-mono">
                  Complete the form below to schedule your consultation and receive your personalized AI solution demo.
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
                    <option value="">Select your technical operations industry</option>
                    <optgroup label="Field Service Operations">
                      <option value="field-service-technical">Field Service - Technical Operations (Equipment maintenance, technical support, field engineering, service optimization)</option>
                      <option value="equipment-maintenance">Equipment Maintenance & Repair (Industrial equipment, machinery, technical systems, preventive maintenance)</option>
                      <option value="technical-support">Technical Support & Troubleshooting (Field technician support, technical assistance, problem resolution)</option>
                      <option value="emergency-response">Emergency Response Services (24/7 technical support, emergency repairs, critical system maintenance)</option>
                      <option value="quality-control">Quality Control & Assurance (Technical inspections, compliance monitoring, quality standards)</option>
                    </optgroup>
                    <optgroup label="Engineering & Manufacturing">
                      <option value="engineering-design">Engineering Design & Development (CAD systems, technical design, engineering workflows, product development)</option>
                      <option value="manufacturing-operations">Manufacturing Operations (Production systems, process optimization, equipment management, quality control)</option>
                      <option value="technical-documentation">Technical Documentation (Engineering manuals, technical writing, knowledge management, standards compliance)</option>
                      <option value="cad-integration">CAD & Design Systems (Engineering software, design automation, technical modeling, system integration)</option>
                      <option value="project-management">Technical Project Management (Engineering projects, technical implementation, resource allocation)</option>
                    </optgroup>
                    <optgroup label="Logistics & Supply Chain">
                      <option value="logistics-optimization">Logistics & Distribution (Route optimization, supply chain management, distribution networks)</option>
                      <option value="inventory-management">Inventory Management (Parts tracking, supply optimization, warehouse operations, asset management)</option>
                      <option value="fleet-management">Fleet Management (Vehicle tracking, maintenance scheduling, route optimization, driver support)</option>
                      <option value="supply-chain">Supply Chain Management (Vendor management, procurement, logistics coordination, cost optimization)</option>
                      <option value="warehouse-operations">Warehouse Operations (Inventory control, order fulfillment, logistics automation, space optimization)</option>
                    </optgroup>
                    <optgroup label="IT & Technology">
                      <option value="it-operations">IT Operations & Support (System administration, technical support, network management, cybersecurity)</option>
                      <option value="software-development">Software Development (Application development, system integration, technical implementation, code maintenance)</option>
                      <option value="system-integration">System Integration (Technical integration, API development, data management, system optimization)</option>
                      <option value="cybersecurity">Cybersecurity & Compliance (Security monitoring, compliance management, risk assessment, technical security)</option>
                      <option value="data-analytics">Data Analytics & BI (Data analysis, reporting, business intelligence, technical insights)</option>
                    </optgroup>
                    <optgroup label="Quality & Analytics">
                      <option value="quality-assurance">Quality Assurance & Control (Quality monitoring, compliance tracking, technical standards, process improvement)</option>
                      <option value="performance-analytics">Performance Analytics (KPI tracking, performance monitoring, technical metrics, optimization)</option>
                      <option value="predictive-maintenance">Predictive Maintenance (Equipment monitoring, failure prediction, maintenance optimization, technical forecasting)</option>
                      <option value="compliance-monitoring">Compliance Monitoring (Regulatory compliance, technical standards, audit management, quality control)</option>
                      <option value="technical-reporting">Technical Reporting (Engineering reports, technical documentation, performance analysis, data visualization)</option>
                    </optgroup>
                    <optgroup label="Management & Executive">
                      <option value="executive-management">Executive Management (Strategic planning, technical decision-making, resource allocation, leadership)</option>
                      <option value="project-management">Project Management (Technical project oversight, resource planning, timeline management, delivery)</option>
                      <option value="operations-management">Operations Management (Technical operations, process optimization, efficiency improvement, team management)</option>
                      <option value="business-analysis">Business Analysis (Technical requirements, process analysis, improvement recommendations, strategic planning)</option>
                      <option value="consulting">Technical Consulting (Strategic technical advice, implementation guidance, optimization recommendations)</option>
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
                      <option value="">Select consultation package</option>
                    <option value="Full Consultation - Strategy & Implementation">Full Consultation - Strategy & Implementation</option>
                      <option value="Demo Request Only - Evaluation Phase">Demo Request Only - Evaluation Phase</option>
                    <option value="Custom Package - Let's Discuss">Custom Package - Let's Discuss</option>
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
                    rows={3}
                    className="w-full p-3 bg-gray-800/50 border border-cyan-500/30 rounded-lg text-white font-mono focus:outline-none focus:border-cyan-400"
                    placeholder="Describe your technical operations, field service capabilities, and target customers"
                  />
                </div>

                {/* Demo Type Selection - Moved to be right after problem description */}
                <div className="border-t border-cyan-500/20 pt-8">
                  <h4 className="text-xl font-mono font-bold mb-6 text-indigo-400">
                    Demo Type Selection
                  </h4>

                <div>
                    <label className="block text-sm font-mono font-medium text-gray-300 mb-2 flex items-center gap-2">
                      Demo Type *
                      <div className="relative">
                        <button 
                          type="button" 
                          className="w-5 h-5 bg-indigo-500/20 hover:bg-indigo-500/30 rounded-full flex items-center justify-center text-indigo-400 text-xs font-bold transition-colors p-1"
                          onMouseEnter={() => handleTooltipShow('demoType')}
                          onMouseLeave={() => handleTooltipHide('demoType')}
                        >
                          ?
                        </button>
                        <div 
                          className={`absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-64 p-3 bg-gray-800 border border-indigo-500/30 rounded-lg text-xs font-mono text-gray-300 transition-opacity duration-300 pointer-events-auto z-20 shadow-lg ${
                            showTooltips.demoType ? 'opacity-100' : 'opacity-0'
                          }`}
                          onMouseEnter={() => handleTooltipShow('demoType')}
                          onMouseLeave={() => handleTooltipHide('demoType')}
                        >
                          Voice Agent: Field technician support, technical troubleshooting, and equipment maintenance via phone calls. Chatbot: Technical support interface for field service and engineering teams. Newsletter: Industry insights, technical documentation, and field operations updates.
                      </div>
                      </div>
                        </label>
                    <select
                      value={formData.demoType || ''}
                      onChange={(e) => handleInputChange('demoType', e.target.value)}
                      required
                      className="w-full p-3 bg-gray-800/50 border border-indigo-500/30 rounded-lg text-white font-mono focus:outline-none focus:border-indigo-400"
                    >
                      <option value="">Select your preferred demo type</option>
                      <option value="voice-agent">Voice Agent Demo - Field technician support, technical troubleshooting, and equipment maintenance</option>
                      <option value="chatbot">Chatbot Demo - Technical support interface for field service and engineering teams</option>
                      <option value="newsletter">Technical Newsletter Demo - Industry insights, technical documentation, and field operations updates</option>
                    </select>
                  </div>
                </div>

                {/* Demo Setup & Preferences - Moved to logical position */}
                <div className="border-t border-cyan-500/20 pt-8">
                  <h4 className="text-xl font-mono font-bold mb-6 text-purple-400">
                    Demo Setup & Preferences
                  </h4>
                  
                  <div className="mb-6">
                    <p className="text-sm text-gray-400 font-mono mb-4">
                      Configure your demo preferences and provide context about your team and challenges.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-mono font-medium text-gray-300 mb-2">
                        Business Role *
                      </label>
                      <select
                        value={formData.businessRole}
                        onChange={(e) => handleInputChange('businessRole', e.target.value)}
                        required
                        className="w-full p-3 bg-gray-800/50 border border-purple-500/30 rounded-lg text-white font-mono focus:outline-none focus:border-purple-400"
                      >
                        <option value="">Select your business role</option>
                        <optgroup label="Field Service Operations">
                          <option value="field-technician">Field Technician</option>
                          <option value="service-manager">Service Manager</option>
                          <option value="dispatcher">Dispatcher</option>
                          <option value="quality-inspector">Quality Inspector</option>
                        </optgroup>
                        <optgroup label="Engineering & Technical">
                          <option value="engineer">Engineer</option>
                          <option value="project-manager">Project Manager</option>
                          <option value="technical-writer">Technical Writer</option>
                          <option value="design-engineer">Design Engineer</option>
                        </optgroup>
                        <optgroup label="Operations & Management">
                          <option value="operations-manager">Operations Manager</option>
                          <option value="logistics-coordinator">Logistics Coordinator</option>
                          <option value="inventory-manager">Inventory Manager</option>
                          <option value="supply-chain-manager">Supply Chain Manager</option>
                        </optgroup>
                        <optgroup label="Executive & Leadership">
                          <option value="executive">C-Level Executive</option>
                          <option value="director">Director/VP</option>
                          <option value="department-manager">Department Manager</option>
                          <option value="business-analyst">Business Analyst</option>
                        </optgroup>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-mono font-medium text-gray-300 mb-2">
                        Team Size *
                      </label>
                      <select
                        value={formData.teamSize}
                        onChange={(e) => handleInputChange('teamSize', e.target.value)}
                        required
                        className="w-full p-3 bg-gray-800/50 border border-purple-500/30 rounded-lg text-white font-mono focus:outline-none focus:border-purple-400"
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
                  </div>

                  <div className="mt-6">
                    <label className="block text-sm font-mono font-medium text-gray-300 mb-2">
                      Current Challenges *
                    </label>
                    <textarea
                      value={formData.currentChallenges}
                      onChange={(e) => handleInputChange('currentChallenges', e.target.value)}
                      required
                      rows={4}
                      className="w-full p-3 bg-gray-800/50 border border-purple-500/30 rounded-lg text-white font-mono focus:outline-none focus:border-purple-400"
                      placeholder="Describe your current challenges and pain points that AI automation could help solve..."
                    />
                    <p className="text-xs text-gray-400 font-mono mt-1">
                      Minimum 10 characters. Be specific about your technical challenges, operational inefficiencies, or business problems.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                    <div>
                      <label className="block text-sm font-mono font-medium text-gray-300 mb-2">
                        Research Focus *
                      </label>
                      <select
                        value={formData.researchFocus}
                        onChange={(e) => handleInputChange('researchFocus', e.target.value)}
                        required
                        className="w-full p-3 bg-gray-800/50 border border-purple-500/30 rounded-lg text-white font-mono focus:outline-none focus:border-purple-400"
                      >
                        <option value="">Select research focus</option>
                        <option value="field-service-optimization">Field Service Optimization</option>
                        <option value="technical-documentation">Technical Documentation</option>
                        <option value="logistics-efficiency">Logistics & Supply Chain Efficiency</option>
                        <option value="quality-control">Quality Control & Compliance</option>
                        <option value="customer-support">Customer Support Enhancement</option>
                        <option value="predictive-maintenance">Predictive Maintenance</option>
                        <option value="workflow-automation">Workflow Automation</option>
                        <option value="data-analytics">Data Analytics & Reporting</option>
                        <option value="integration-systems">System Integration</option>
                        <option value="training-development">Training & Development</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-mono font-medium text-gray-300 mb-2">
                        Research Depth *
                      </label>
                      <select
                        value={formData.researchDepth}
                        onChange={(e) => handleInputChange('researchDepth', e.target.value)}
                        required
                        className="w-full p-3 bg-gray-800/50 border border-purple-500/30 rounded-lg text-white font-mono focus:outline-none focus:border-purple-400"
                      >
                        <option value="">Select research depth</option>
                        <option value="overview">Overview - High-level analysis and recommendations</option>
                        <option value="detailed">Detailed - In-depth analysis with specific solutions</option>
                        <option value="comprehensive">Comprehensive - Complete analysis with implementation roadmap</option>
                        <option value="custom">Custom - Tailored to specific requirements</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* AI Agent Customization Section */}
                <div className="border-t border-cyan-500/20 pt-8">
                  <h4 className="text-xl font-mono font-bold mb-6 text-cyan-400">
                    AI Agent Customization
                    </h4>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-mono font-medium text-gray-300 mb-2">
                        Primary Use Case *
                      </label>
                      <select
                        value={formData.useCase}
                        onChange={(e) => handleInputChange('useCase', e.target.value)}
                        required
                        className="w-full p-3 bg-gray-800/50 border border-cyan-500/30 rounded-lg text-white font-mono focus:outline-none focus:border-cyan-400"
                      >
                        <option value="">What should your AI agent primarily do?</option>
                        <optgroup label="Field Service Operations">
                          <option value="field-technician-support">Field Technician Support & Guidance</option>
                          <option value="technical-troubleshooting">Technical Troubleshooting Assistance</option>
                          <option value="equipment-maintenance">Equipment Maintenance Scheduling</option>
                          <option value="service-call-optimization">Service Call Optimization</option>
                        </optgroup>
                        <optgroup label="Engineering & Technical">
                          <option value="technical-documentation">Technical Documentation Generation</option>
                          <option value="engineering-workflow">Engineering Workflow Automation</option>
                          <option value="cad-integration">CAD System Integration</option>
                          <option value="technical-standards">Technical Standards Compliance</option>
                        </optgroup>
                        <optgroup label="Logistics & Supply Chain">
                          <option value="route-optimization">Route Optimization for Field Teams</option>
                          <option value="inventory-management">Inventory & Parts Management</option>
                          <option value="supply-chain-monitoring">Supply Chain Monitoring</option>
                          <option value="resource-allocation">Resource Allocation Planning</option>
                        </optgroup>
                        <optgroup label="Quality & Analytics">
                          <option value="quality-control">Quality Control Monitoring</option>
                          <option value="performance-analytics">Performance Analytics & Reporting</option>
                          <option value="predictive-maintenance">Predictive Maintenance Insights</option>
                          <option value="compliance-monitoring">Compliance Monitoring</option>
                        </optgroup>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-mono font-medium text-gray-300 mb-2">
                        Target Users *
                      </label>
                      <select
                        value={formData.targetUsers}
                        onChange={(e) => handleInputChange('targetUsers', e.target.value)}
                        required
                        className="w-full p-3 bg-gray-800/50 border border-cyan-500/30 rounded-lg text-white font-mono focus:outline-none focus:border-cyan-400"
                      >
                        <option value="">Who will primarily interact with your AI agent?</option>
                        <optgroup label="Field Service Teams">
                          <option value="field-technicians">Field Technicians & Engineers</option>
                          <option value="service-managers">Service Managers & Supervisors</option>
                          <option value="dispatchers">Dispatchers & Coordinators</option>
                          <option value="quality-inspectors">Quality Inspectors & Auditors</option>
                        </optgroup>
                        <optgroup label="Engineering Teams">
                          <option value="engineers">Engineers & Technical Staff</option>
                          <option value="project-managers">Project Managers & Leads</option>
                          <option value="technical-writers">Technical Writers & Documentation</option>
                          <option value="design-engineers">Design Engineers & CAD Users</option>
                        </optgroup>
                        <optgroup label="Operations Teams">
                          <option value="logistics-coordinators">Logistics Coordinators</option>
                          <option value="inventory-managers">Inventory Managers</option>
                          <option value="supply-chain-managers">Supply Chain Managers</option>
                          <option value="operations-managers">Operations Managers</option>
                        </optgroup>
                        <optgroup label="Management & Executives">
                          <option value="executives">C-Level Executives</option>
                          <option value="directors">Directors & VPs</option>
                          <option value="managers">Department Managers</option>
                          <option value="analysts">Business Analysts</option>
                        </optgroup>
                      </select>
                    </div>
                    </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                    <div>
                      <label className="block text-sm font-mono font-medium text-gray-300 mb-2">
                        Language Style *
                      </label>
                      <select
                        value={formData.languageStyle}
                        onChange={(e) => handleInputChange('languageStyle', e.target.value)}
                        required
                        className="w-full p-3 bg-gray-800/50 border border-cyan-500/30 rounded-lg text-white font-mono focus:outline-none focus:border-cyan-400"
                      >
                        <option value="">How should users interact?</option>
                        <option value="professional">Professional & Formal</option>
                        <option value="friendly">Friendly & Conversational</option>
                        <option value="technical">Technical & Detailed</option>
                        <option value="casual">Casual & Relaxed</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-mono font-medium text-gray-300 mb-2">
                        Interaction Mode *
                      </label>
                      <select
                        value={formData.interactionMode}
                        onChange={(e) => handleInputChange('interactionMode', e.target.value)}
                        required
                        className="w-full p-3 bg-gray-800/50 border border-cyan-500/30 rounded-lg text-white font-mono focus:outline-none focus:border-cyan-400"
                      >
                        <option value="">How should users interact?</option>
                        <option value="voice-only">Voice Only (Phone Calls)</option>
                        <option value="chat-only">Chat Only (Text Messages)</option>
                        <option value="both">Both Voice & Chat</option>
                        <option value="video">Video Calls (Future)</option>
                      </select>
                    </div>
                    </div>

                    <div className="md:col-span-2">
                    <label className="block text-sm font-mono font-medium text-gray-300 mb-2 flex items-center gap-2">
                      AI Agent Specialization *
                      <div className="relative">
                        <button 
                          type="button" 
                          className="w-5 h-5 bg-cyan-500/20 hover:bg-cyan-500/30 rounded-full flex items-center justify-center text-cyan-400 text-xs font-bold transition-colors p-1"
                          onMouseEnter={() => handleTooltipShow('voiceAgentSpecialization')}
                          onMouseLeave={() => handleTooltipHide('voiceAgentSpecialization')}
                        >
                          ?
                        </button>
                        <div 
                          className={`absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-64 p-3 bg-gray-800 border border-cyan-500/30 rounded-lg text-xs font-mono text-gray-300 transition-opacity duration-300 pointer-events-auto z-20 shadow-lg ${
                            showTooltips.voiceAgentSpecialization ? 'opacity-100' : 'opacity-0'
                          }`}
                          onMouseEnter={() => handleTooltipShow('voiceAgentSpecialization')}
                          onMouseLeave={() => handleTooltipHide('voiceAgentSpecialization')}
                        >
                          This helps us train your AI solutions with technical terminology, processes, and knowledge. AI agents understand technical terms like "MTBF", "predictive maintenance", "CAD integration", and "quality control". Voice agents can handle field technician calls, chatbots can answer technical questions, and newsletters can share engineering insights and field operations updates.
                        </div>
                      </div>
                      </label>
                      <select
                        value={formData.industryContext}
                        onChange={(e) => handleInputChange('industryContext', e.target.value)}
                        required
                        className="w-full p-3 bg-gray-800/50 border border-cyan-500/30 rounded-lg text-white font-mono focus:outline-none focus:border-cyan-400"
                      >
                      <option value="">How should your AI agent be specialized?</option>
                      <optgroup label="Field Service Operations">
                        <option value="field-service-technical">Field Service - Technical Operations</option>
                        <option value="equipment-maintenance">Equipment Maintenance & Repair</option>
                        <option value="preventive-maintenance">Preventive Maintenance Services</option>
                        <option value="emergency-response">Emergency Response Services</option>
                        <option value="technical-support">Technical Support & Troubleshooting</option>
                      </optgroup>
                      <optgroup label="Engineering & Manufacturing">
                        <option value="engineering-design">Engineering Design & Development</option>
                        <option value="manufacturing-operations">Manufacturing Operations</option>
                        <option value="quality-assurance">Quality Assurance & Control</option>
                        <option value="technical-documentation">Technical Documentation</option>
                        <option value="cad-integration">CAD & Design Systems</option>
                      </optgroup>
                      <optgroup label="Logistics & Supply Chain">
                        <option value="logistics-optimization">Logistics & Distribution</option>
                        <option value="supply-chain-management">Supply Chain Management</option>
                        <option value="inventory-management">Inventory Management</option>
                        <option value="fleet-management">Fleet Management</option>
                        <option value="warehouse-operations">Warehouse Operations</option>
                      </optgroup>
                      <optgroup label="IT & Technology">
                        <option value="it-operations">IT Operations & Support</option>
                        <option value="software-development">Software Development</option>
                        <option value="system-integration">System Integration</option>
                        <option value="cybersecurity">Cybersecurity & Compliance</option>
                        <option value="data-analytics">Data Analytics & BI</option>
                      </optgroup>
                      </select>
                    </div>
                </div>

                {/* AI Agent Personality & Communication */}
                <div className="border-t border-cyan-500/20 pt-8">
                  <h4 className="text-xl font-mono font-bold mb-6 text-green-400">
                    AI Agent Personality & Communication
                  </h4>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-mono font-medium text-gray-300 mb-2">
                        Agent Personality *
                  </label>
                      <select
                        value={formData.agentPersonality}
                        onChange={(e) => handleInputChange('agentPersonality', e.target.value)}
                        required
                        className="w-full p-3 bg-gray-800/50 border border-green-500/30 rounded-lg text-white font-mono focus:outline-none focus:border-green-400"
                      >
                        <option value="">Select agent personality</option>
                        <option value="professional">Professional - Formal, authoritative, expert tone</option>
                        <option value="friendly">Friendly - Warm, approachable, conversational</option>
                        <option value="technical">Technical - Precise, detailed, engineering-focused</option>
                        <option value="consultative">Consultative - Advisory, solution-oriented, strategic</option>
                        <option value="empathetic">Empathetic - Understanding, patient, supportive</option>
                        <option value="efficient">Efficient - Direct, quick, results-focused</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-mono font-medium text-gray-300 mb-2">
                        Communication Style *
                      </label>
                      <select
                        value={formData.communicationStyle}
                        onChange={(e) => handleInputChange('communicationStyle', e.target.value)}
                        required
                        className="w-full p-3 bg-gray-800/50 border border-green-500/30 rounded-lg text-white font-mono focus:outline-none focus:border-green-400"
                      >
                        <option value="">Select communication style</option>
                        <option value="step-by-step">Step-by-Step - Detailed instructions, sequential guidance</option>
                        <option value="overview-first">Overview First - Big picture, then details</option>
                        <option value="problem-focused">Problem-Focused - Identify issue, then solution</option>
                        <option value="solution-focused">Solution-Focused - Immediate answers, quick fixes</option>
                        <option value="interactive">Interactive - Questions, clarification, dialogue</option>
                        <option value="reference-based">Reference-Based - Manuals, specs, documentation</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-mono font-medium text-gray-300 mb-2">
                        Technical Level *
                      </label>
                      <select
                        value={formData.technicalLevel}
                        onChange={(e) => handleInputChange('technicalLevel', e.target.value)}
                        required
                        className="w-full p-3 bg-gray-800/50 border border-green-500/30 rounded-lg text-white font-mono focus:outline-none focus:border-green-400"
                      >
                        <option value="">Select technical level</option>
                        <option value="beginner">Beginner - Basic concepts, simple explanations</option>
                        <option value="intermediate">Intermediate - Some technical knowledge, moderate detail</option>
                        <option value="advanced">Advanced - High technical knowledge, detailed explanations</option>
                        <option value="expert">Expert - Deep technical expertise, complex problem solving</option>
                        <option value="adaptive">Adaptive - Adjusts based on user's technical level</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-mono font-medium text-gray-300 mb-2">
                        Problem Solving Approach *
                      </label>
                      <select
                        value={formData.problemSolvingApproach}
                        onChange={(e) => handleInputChange('problemSolvingApproach', e.target.value)}
                        required
                        className="w-full p-3 bg-gray-800/50 border border-green-500/30 rounded-lg text-white font-mono focus:outline-none focus:border-green-400"
                      >
                        <option value="">Select problem solving approach</option>
                        <option value="systematic">Systematic - Methodical, step-by-step diagnosis</option>
                        <option value="creative">Creative - Innovative solutions, thinking outside the box</option>
                        <option value="collaborative">Collaborative - Team-based, multiple perspectives</option>
                        <option value="data-driven">Data-Driven - Evidence-based, analytical approach</option>
                        <option value="experience-based">Experience-Based - Past cases, lessons learned</option>
                        <option value="preventive">Preventive - Proactive, risk mitigation focus</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>

                {/* AI Agent Specializations - Moved to logical position */}
                <div className="border-t border-cyan-500/20 pt-8">
                  <h4 className="text-xl font-mono font-bold mb-6 text-orange-400">
                    AI Agent Specializations
                  </h4>
                  
                  <div className="mb-6">
                    <p className="text-sm text-gray-400 font-mono mb-4">
                      Select the areas your AI agent should specialize in. These will guide deep research and training for your demo application.
                    </p>
                  </div>
                  
                  <div className="mb-6">
                    <div className="flex items-center space-x-4 mb-4">
                      <div className="flex-1">
                        <input
                          type="text"
                          placeholder="Search specializations..."
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          className="w-full p-3 bg-gray-800/50 border border-orange-500/30 rounded-lg text-white font-mono focus:outline-none focus:border-orange-400"
                        />
                      </div>
                      <div className="text-orange-400 text-2xl">
                        🔍
                      </div>
                    </div>

                    {/* Selected Specializations */}
                    {formData.rmeSpecializations.length > 0 && (
                      <div className="bg-orange-900/20 border border-orange-500/30 rounded-lg p-4">
                        <h5 className="text-sm font-mono font-semibold text-orange-300 mb-3">
                          Selected Specializations ({formData.rmeSpecializations.length})
                        </h5>
                        <div className="flex flex-wrap gap-2">
                          {formData.rmeSpecializations.map((specialization) => (
                            <span
                              key={specialization}
                              className="inline-flex items-center px-3 py-1 bg-orange-600/20 border border-orange-500/30 rounded-full text-xs font-mono text-orange-300"
                            >
                              {specialization}
                              <button
                                onClick={() => {
                                  setFormData(prev => ({
                                    ...prev,
                                    rmeSpecializations: prev.rmeSpecializations.filter(c => c !== specialization)
                                  }));
                                }}
                                className="ml-2 text-orange-400 hover:text-orange-300"
                              >
                                ✕
                              </button>
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Custom Specialization Input */}
                    <div className="mb-4">
                      <div className="flex items-center space-x-2">
                        <input
                          type="text"
                          value={customSpecialization}
                          onChange={(e) => setCustomSpecialization(e.target.value)}
                          placeholder="Add custom specialization..."
                          className="flex-1 p-3 bg-gray-800/50 border border-orange-500/30 rounded-lg text-white font-mono focus:outline-none focus:border-orange-400"
                          onKeyPress={(e) => e.key === 'Enter' && handleAddCustomSpecialization()}
                        />
                        <button
                          type="button"
                          onClick={handleAddCustomSpecialization}
                          className="px-4 py-3 bg-orange-600 hover:bg-orange-700 text-white font-mono rounded-lg transition-colors"
                        >
                          Add
                        </button>
                      </div>
                      <p className="text-xs text-gray-400 font-mono mt-1">
                        Add your own custom specialization if it's not in the list above
                      </p>
                    </div>

                    <div className="bg-gray-800/30 border border-gray-600/30 rounded-lg p-4 max-h-96 overflow-y-auto">
                      <h5 className="text-sm font-mono font-semibold text-gray-300 mb-4">
                        Comprehensive AI Agent Specializations
                      </h5>
                      
                      {Object.entries(mainSpecializations).map(([category, specializations]) => {
                        const filteredSpecializations = getFilteredSpecializations(specializations, searchQuery);
                        
                        if (filteredSpecializations.length === 0) return null;
                        
                        return (
                          <div key={category} className="mb-6 last:mb-0">
                            <h6 className="text-lg font-mono font-semibold text-orange-300 mb-4 border-b border-orange-500/30 pb-2">
                              {category}
                            </h6>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
                              {filteredSpecializations.map((specialization) => (
                                <label key={specialization} className="flex items-center p-2 hover:bg-gray-700/30 rounded cursor-pointer">
                                  <input
                                    type="checkbox"
                                    checked={formData.rmeSpecializations.includes(specialization)}
                                    onChange={(e) => {
                                      if (e.target.checked) {
                                        setFormData(prev => ({
                                          ...prev,
                                          rmeSpecializations: [...prev.rmeSpecializations, specialization]
                                        }));
                                      } else {
                                        setFormData(prev => ({
                                          ...prev,
                                          rmeSpecializations: prev.rmeSpecializations.filter(c => c !== specialization)
                                        }));
                                      }
                                    }}
                                    className="mr-3 text-orange-500 focus:ring-orange-400"
                                  />
                                  <span className="text-sm font-mono text-gray-300">{specialization}</span>
                                </label>
                              ))}
                            </div>
                          </div>
                        );
                      })}
                      
                      {Object.values(mainSpecializations).every(specializations => 
                        getFilteredSpecializations(specializations, searchQuery).length === 0
                      ) && searchQuery && (
                        <p className="text-sm text-gray-400 font-mono text-center py-4">
                          No specializations found for "{searchQuery}"
                        </p>
                      )}
                    </div>
                  </div>
                </div>


            {/* Document Upload Section */}
            <div className="border-t border-cyan-500/20 pt-8">
              <h4 className="text-xl font-mono font-bold mb-6 text-purple-400">
                Knowledge Base Document Upload
              </h4>
              
              <div className="space-y-6">
                {/* Upload Area */}
                <div
                  className={`relative border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                      dragActive 
                      ? 'border-purple-400 bg-purple-400/10'
                      : 'border-gray-600 hover:border-purple-400/50'
                    }`}
                    onDragEnter={handleDrag}
                    onDragLeave={handleDrag}
                    onDragOver={handleDrag}
                    onDrop={handleDrop}
                  >
                    <div className="space-y-4">
                    <div className="text-4xl text-purple-400">📁</div>
                      <div>
                      <p className="text-lg font-mono text-gray-300 mb-2">
                        Upload Documents for Knowledge Base
                      </p>
                      <p className="text-sm text-gray-400 mb-4">
                        Drag and drop files here or click to browse
                      </p>
                          <input
                            type="file"
                            multiple
                        accept=".pdf,.doc,.docx,.txt,.md,.csv,.xlsx,.pptx"
                        onChange={handleFileUpload}
                            className="hidden"
                        id="file-upload"
                          />
                      <label
                        htmlFor="file-upload"
                        className="inline-block px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white font-mono rounded-lg cursor-pointer transition-colors"
                      >
                        Choose Files
                        </label>
                      </div>
                    </div>
                  </div>

                  {/* Uploaded Files List */}
                  {uploadedFiles.length > 0 && (
                  <div className="space-y-3">
                    <h5 className="text-lg font-mono font-semibold text-gray-300">
                      Uploaded Files ({uploadedFiles.length})
                    </h5>
                      <div className="space-y-2">
                        {uploadedFiles.map((file, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between bg-gray-800/50 rounded-lg p-3"
                        >
                          <div className="flex items-center space-x-3">
                            <div className="text-purple-400">📄</div>
                              <div>
                              <p className="text-sm font-mono text-gray-300">{file.name}</p>
                              <p className="text-xs text-gray-400">
                                {(file.size / 1024 / 1024).toFixed(2)} MB
                              </p>
                              </div>
                            </div>
                            <button
                              onClick={() => removeFile(index)}
                            className="text-red-400 hover:text-red-300 transition-colors"
                            >
                            ✕
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                {/* Document Guidelines */}
                <div className="bg-blue-900/20 border border-blue-500/30 rounded-lg p-6">
                  <h5 className="text-lg font-mono font-semibold text-blue-400 mb-4">
                    📋 Document Upload Guidelines
                  </h5>
                  <div className="space-y-4">
                    <div>
                      <h6 className="font-mono font-medium text-blue-300 mb-2">✅ Recommended Documents:</h6>
                      <ul className="text-sm text-gray-300 space-y-1 ml-4">
                        <li>• Equipment manuals and technical specifications</li>
                        <li>• Service bulletins and maintenance procedures</li>
                        <li>• Training materials and knowledge bases</li>
                        <li>• Historical service records and case studies</li>
                        <li>• Customer feedback and support tickets</li>
                        <li>• Industry standards and compliance documents</li>
                        <li>• Troubleshooting guides and FAQs</li>
                        <li>• Parts catalogs and inventory lists</li>
                      </ul>
                </div>

                    <div>
                      <h6 className="font-mono font-medium text-red-300 mb-2">⚠️ What to Avoid:</h6>
                      <ul className="text-sm text-gray-300 space-y-1 ml-4">
                        <li>• Proprietary or confidential company data</li>
                        <li>• Personal information or customer data</li>
                        <li>• Financial records or sensitive business information</li>
                        <li>• Copyrighted materials you don't own</li>
                      </ul>
                    </div>

                    <div>
                      <h6 className="font-mono font-medium text-green-300 mb-2">💡 Pro Tips:</h6>
                      <ul className="text-sm text-gray-300 space-y-1 ml-4">
                        <li>• Upload 5-15 documents for best results</li>
                        <li>• Include a mix of technical and procedural documents</li>
                        <li>• Ensure documents are clear and well-formatted</li>
                        <li>• Focus on content that will help the AI understand your specific processes</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>

                {/* Scheduling Section - Moved to end for logical flow */}
                <div className="border-t border-cyan-500/20 pt-8">
                  <h4 className="text-xl font-mono font-bold mb-6 text-purple-400">
                    Scheduling
                  </h4>

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
                        className="w-full p-3 bg-gray-800/50 border border-purple-500/30 rounded-lg text-white font-mono focus:outline-none focus:border-purple-400"
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

                <div className="text-center">
                  <button
                    type="submit"
                    disabled={!isFormValid}
                    className={`px-8 py-4 rounded-full font-mono font-semibold text-lg transition-all transform ${
                      isFormValid
                        ? 'bg-gradient-to-r from-cyan-500 to-blue-500 hover:shadow-lg hover:shadow-cyan-500/20 hover:scale-105 cursor-pointer'
                        : 'bg-gray-600 cursor-not-allowed opacity-50'
                    }`}
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

export default Demo; 