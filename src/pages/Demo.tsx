import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { MessageSquare, Brain, CheckCircle, ArrowRight, Bot, Globe } from 'lucide-react';

// Function to get tailored analytics specializations based on target users
const getAnalyticsSpecializations = (targetUsers: string): string[] => {
  const allSpecializations = {
    // Field Service Technicians
    technicians: [
      'Equipment Diagnostics', 'Troubleshooting Procedures', 'Calibration Analysis', 'Tool Performance',
      'Vibration Analysis', 'Thermal Analysis', 'Electrical System Analysis', 'Mechanical System Analysis',
      'Sensor Data Analysis', 'Error Code Analysis', 'Maintenance Procedures', 'Safety Protocols',
      'Parts Identification', 'Warranty Procedures', 'Service Documentation', 'Quality Control'
    ],
    
    // Project Managers
    projectManagers: [
      'Project Timeline Analysis', 'Resource Allocation', 'Budget Performance', 'Risk Assessment',
      'Team Productivity Analysis', 'Client Satisfaction Metrics', 'Project Success Rates', 'Cost-Benefit Analysis',
      'Schedule Optimization', 'Resource Utilization', 'Quality Metrics', 'Delivery Performance',
      'Stakeholder Communication', 'Change Management', 'Project ROI Analysis', 'Performance Dashboards'
    ],
    
    // Program Managers
    programManagers: [
      'Strategic Planning Analysis', 'Portfolio Performance', 'Resource Planning', 'Strategic Alignment',
      'Program ROI Analysis', 'Stakeholder Management', 'Risk Management', 'Compliance Monitoring',
      'Performance Metrics', 'Budget Forecasting', 'Resource Optimization', 'Strategic Initiatives',
      'Market Analysis', 'Competitive Intelligence', 'Innovation Tracking', 'Executive Reporting'
    ],
    
    // Data Analysts
    dataAnalysts: [
      'Statistical Analysis', 'Predictive Modeling', 'Data Mining', 'Trend Analysis',
      'Correlation Analysis', 'Regression Analysis', 'Time Series Analysis', 'Machine Learning',
      'Big Data Analytics', 'Data Visualization', 'Performance Metrics', 'KPI Analysis',
      'Anomaly Detection', 'Pattern Recognition', 'Data Quality Analysis', 'Reporting Automation'
    ],
    
    // Executives
    executives: [
      'Strategic Performance', 'Financial Analysis', 'Market Intelligence', 'Competitive Analysis',
      'ROI Analysis', 'Risk Assessment', 'Growth Metrics', 'Market Share Analysis',
      'Customer Analytics', 'Revenue Analysis', 'Cost Analysis', 'Investment Analysis',
      'Strategic Planning', 'Performance Dashboards', 'Executive Reporting', 'Decision Support'
    ],
    
    // Logistics & Supply Chain
    logistics: [
      'Inventory Optimization', 'Supply Chain Analysis', 'Demand Forecasting', 'Supplier Performance',
      'Logistics Efficiency', 'Cost Optimization', 'Delivery Performance', 'Warehouse Management',
      'Transportation Analysis', 'Procurement Analysis', 'Vendor Management', 'Supply Chain Risk',
      'Order Fulfillment', 'Distribution Analysis', 'Logistics Planning', 'Supply Chain Visibility'
    ],
    
    // Customer Care & Support
    customerCare: [
      'Customer Satisfaction', 'Support Ticket Analysis', 'Response Time Analysis', 'Resolution Rates',
      'Customer Feedback Analysis', 'Service Quality Metrics', 'Customer Journey Analysis', 'Retention Analysis',
      'Support Performance', 'Customer Experience', 'Complaint Analysis', 'Service Level Analysis',
      'Customer Insights', 'Support Efficiency', 'Customer Success Metrics', 'Service Optimization'
    ],
    
    // IT & Engineering
    itEngineering: [
      'System Performance', 'Network Analysis', 'Security Analysis', 'Infrastructure Monitoring',
      'Software Performance', 'Database Analysis', 'API Performance', 'System Reliability',
      'Capacity Planning', 'Technology Trends', 'Integration Analysis', 'System Optimization',
      'Cybersecurity Analysis', 'Cloud Performance', 'Data Management', 'Technology Roadmap'
    ],
    
    // Manufacturing & Operations
    manufacturing: [
      'Production Analysis', 'Quality Control', 'Process Optimization', 'Efficiency Analysis',
      'Manufacturing Metrics', 'Equipment Performance', 'Production Planning', 'Quality Assurance',
      'Process Improvement', 'Manufacturing Intelligence', 'Production Forecasting', 'Operational Excellence',
      'Lean Manufacturing', 'Six Sigma Analysis', 'Process Monitoring', 'Manufacturing Analytics'
    ]
  };

  // Get specializations based on target users
  let specializations: string[] = [];
  
  if (targetUsers.includes('Field Service Technicians') || targetUsers.includes('Technicians')) {
    specializations = [...specializations, ...allSpecializations.technicians];
  }
  if (targetUsers.includes('Project Managers') || targetUsers.includes('Project Management')) {
    specializations = [...specializations, ...allSpecializations.projectManagers];
  }
  if (targetUsers.includes('Program Managers') || targetUsers.includes('Program Management')) {
    specializations = [...specializations, ...allSpecializations.programManagers];
  }
  if (targetUsers.includes('Data Analysts') || targetUsers.includes('Analytics Team')) {
    specializations = [...specializations, ...allSpecializations.dataAnalysts];
  }
  if (targetUsers.includes('Executives') || targetUsers.includes('Senior Management')) {
    specializations = [...specializations, ...allSpecializations.executives];
  }
  if (targetUsers.includes('Logistics') || targetUsers.includes('Supply Chain')) {
    specializations = [...specializations, ...allSpecializations.logistics];
  }
  if (targetUsers.includes('Customer Care') || targetUsers.includes('Customer Support')) {
    specializations = [...specializations, ...allSpecializations.customerCare];
  }
  if (targetUsers.includes('IT') || targetUsers.includes('Engineering')) {
    specializations = [...specializations, ...allSpecializations.itEngineering];
  }
  if (targetUsers.includes('Manufacturing') || targetUsers.includes('Operations')) {
    specializations = [...specializations, ...allSpecializations.manufacturing];
  }

  // If no specific target users selected, show all specializations
  if (specializations.length === 0) {
    specializations = [
      ...allSpecializations.technicians,
      ...allSpecializations.projectManagers,
      ...allSpecializations.programManagers,
      ...allSpecializations.dataAnalysts,
      ...allSpecializations.executives,
      ...allSpecializations.logistics,
      ...allSpecializations.customerCare,
      ...allSpecializations.itEngineering,
      ...allSpecializations.manufacturing
    ];
  }

  // Remove duplicates and return
  return [...new Set(specializations)];
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
    specializations: [] as string[],
    performanceGoals: [] as string[],
    integrationRequirements: [] as string[],
    complianceNeeds: [] as string[],
    reportingNeeds: [] as string[],
    // Advanced AI & Analytics Capabilities
    advancedCapabilities: [] as string[],
    troubleshootingMethodology: [] as string[],
    predictiveCapabilities: [] as string[]
  });

  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [dragActive, setDragActive] = useState(false);

  const handleTooltipShow = (tooltipId: string) => {
    setShowTooltips(prev => ({ ...prev, [tooltipId]: true }));
  };

  const handleTooltipHide = (tooltipId: string) => {
    setShowTooltips(prev => ({ ...prev, [tooltipId]: false }));
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
      updatedFormData.specializations.length > 0 &&
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
                Request Your Custom Demo
              </span>
            </h1>
            <p className="text-xl text-gray-400 mb-8 font-mono">
              Get a personalized AI solution and website demo specifically built for your field service business. 
              Complete the form below to schedule your consultation and receive your custom demo.
            </p>
            
            <div className="bg-gradient-to-b from-cyan-500/10 to-transparent border border-cyan-500/20 rounded-2xl p-8 mb-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Bot className="w-8 h-8 text-white" />
              </div>
                  <h3 className="font-mono font-semibold mb-2">Custom AI Agent</h3>
                  <p className="text-sm text-gray-400">AI-powered system trained on your business</p>
              </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Globe className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="font-mono font-semibold mb-2">Smart Website</h3>
                  <p className="text-sm text-gray-400">Lead capture and customer engagement platform</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <MessageSquare className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="font-mono font-semibold mb-2">Expert Consultation</h3>
                  <p className="text-sm text-gray-400">Personalized strategy and implementation plan</p>
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
                    <option value="">Select your field service industry</option>
                    <optgroup label="HVAC & Climate Control">
                      <option value="hvac-residential">HVAC - Residential (Furnaces, AC units, thermostats, ductwork, SEER ratings, energy efficiency)</option>
                      <option value="hvac-commercial">HVAC - Commercial (RTUs, VAV systems, building automation, maintenance contracts, zoning)</option>
                      <option value="hvac-industrial">HVAC - Industrial (Chillers, boilers, process cooling, clean rooms, air handling units)</option>
                      <option value="refrigeration">Refrigeration (Walk-in coolers, commercial freezers, ice machines, refrigerant handling, temperature control)</option>
                      <option value="ductwork">Ductwork & Ventilation (Duct cleaning, air balancing, indoor air quality, ventilation systems, airflow testing)</option>
                    </optgroup>
                    <optgroup label="Plumbing Services">
                      <option value="plumbing-residential">Plumbing - Residential (Faucets, toilets, sinks, garbage disposals, pipe repairs, water pressure, leaks)</option>
                      <option value="plumbing-commercial">Plumbing - Commercial (Restaurant plumbing, grease traps, commercial fixtures, backflow prevention, water systems)</option>
                      <option value="plumbing-industrial">Plumbing - Industrial (Process piping, water treatment, pump systems, chemical handling, large-scale installations)</option>
                      <option value="drain-cleaning">Drain Cleaning (Sewer lines, main line cleaning, hydro jetting, camera inspections, root removal, clog prevention)</option>
                      <option value="water-heater">Water Heater Services (Tankless, traditional tanks, heat pumps, maintenance, temperature control, energy efficiency)</option>
                    </optgroup>
                    <optgroup label="Electrical Services">
                      <option value="electrical-residential">Electrical - Residential (Outlets, switches, lighting, panels, GFCI, AFCI, smart home wiring, surge protection)</option>
                      <option value="electrical-commercial">Electrical - Commercial (LED retrofits, emergency lighting, power distribution, data cabling, energy management)</option>
                      <option value="electrical-industrial">Electrical - Industrial (Motor controls, VFDs, power quality, three-phase systems, automation, safety systems)</option>
                      <option value="generator">Generator Services (Standby generators, transfer switches, load testing, maintenance, fuel systems, automatic start)</option>
                      <option value="security-systems">Security Systems (Access control, cameras, alarms, intercoms, smart locks, monitoring, integration)</option>
                    </optgroup>
                    <optgroup label="Home & Property Services">
                      <option value="landscaping">Landscaping & Lawn Care (Mowing, trimming, fertilization, irrigation, pest control, seasonal cleanup, design)</option>
                      <option value="pest-control">Pest Control (Termite treatment, rodent control, insect management, inspection, prevention, wildlife removal)</option>
                      <option value="cleaning">Commercial Cleaning (Office cleaning, janitorial, carpet cleaning, window washing, sanitization, maintenance)</option>
                      <option value="pool-service">Pool & Spa Services (Pool cleaning, chemical balancing, equipment repair, winterization, safety compliance, automation)</option>
                      <option value="roofing">Roofing & Gutters (Shingle repair, gutter cleaning, leak detection, storm damage, maintenance, ventilation)</option>
                      <option value="siding">Siding & Exterior (Vinyl siding, painting, pressure washing, weatherproofing, maintenance, repairs)</option>
                    </optgroup>
                    <optgroup label="Automotive & Transportation">
                      <option value="auto-repair">Auto Repair (Engine diagnostics, brake service, oil changes, transmission, electrical, emissions testing)</option>
                      <option value="towing">Towing & Recovery (Emergency towing, roadside assistance, vehicle recovery, impound services, fleet management)</option>
                      <option value="fleet-maintenance">Fleet Maintenance (Commercial vehicle service, preventive maintenance, compliance, fuel management, driver support)</option>
                      <option value="mobile-mechanic">Mobile Mechanic (On-site repairs, emergency service, fleet support, diagnostic services, convenience repairs)</option>
                    </optgroup>
                    <optgroup label="Technology & Security">
                      <option value="it-support">IT Support & Services (Computer repair, network setup, cybersecurity, data recovery, software support, remote assistance)</option>
                      <option value="security-installation">Security Installation (Alarm systems, cameras, access control, monitoring, smart home integration, maintenance)</option>
                      <option value="av-installation">Audio/Visual Installation (Home theaters, conference rooms, sound systems, video walls, smart displays, integration)</option>
                      <option value="network-installation">Network & Cabling (Ethernet, fiber optic, WiFi, structured cabling, data centers, telecommunications)</option>
                    </optgroup>
                    <optgroup label="Health & Safety Services">
                      <option value="medical-equipment">Medical Equipment Service (Hospital equipment, diagnostic machines, maintenance, calibration, compliance, training)</option>
                      <option value="fire-safety">Fire Safety & Protection (Fire extinguisher service, sprinkler systems, alarms, inspections, emergency planning)</option>
                      <option value="environmental">Environmental Services (Air quality testing, mold remediation, asbestos removal, water testing, compliance)</option>
                      <option value="safety-consulting">Safety Consulting (OSHA compliance, safety training, risk assessment, emergency planning, workplace safety)</option>
                    </optgroup>
                    <optgroup label="Specialized Services">
                      <option value="locksmith">Locksmith Services (Lock installation, key cutting, security systems, safe services, emergency access, commercial locks)</option>
                      <option value="appliance-repair">Appliance Repair (Washers, dryers, refrigerators, ovens, dishwashers, microwaves, warranty service)</option>
                      <option value="garage-doors">Garage Door Services (Installation, repair, maintenance, opener service, spring replacement, safety systems)</option>
                      <option value="window-treatment">Window & Door Services (Window repair, door installation, glass replacement, weatherproofing, security upgrades)</option>
                      <option value="hvac-ductwork">HVAC Ductwork (Duct cleaning, sealing, insulation, design, installation, air quality improvement)</option>
                    </optgroup>
                    <optgroup label="Commercial & Industrial">
                      <option value="facility-maintenance">Facility Maintenance (Preventive maintenance, repairs, equipment servicing, building systems, emergency response)</option>
                      <option value="janitorial">Janitorial Services (Office cleaning, floor care, restroom maintenance, waste management, specialized cleaning)</option>
                      <option value="waste-management">Waste Management (Trash collection, recycling, hazardous waste, dumpster service, sustainability programs)</option>
                      <option value="grounds-keeping">Grounds Keeping (Landscape maintenance, snow removal, parking lot cleaning, seasonal services, property management)</option>
                      <option value="other">Other Field Service (Specify your specialized service area in business description)</option>
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
                    placeholder="Describe your business, services, and target customers"
                  />
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
                        <optgroup label="Customer Service & Support">
                          <option value="customer-support">Customer Support & Help Desk</option>
                          <option value="technical-support">Technical Support & Troubleshooting</option>
                          <option value="complaint-handling">Complaint Handling & Resolution</option>
                          <option value="service-requests">Service Request Management</option>
                        </optgroup>
                        <optgroup label="Sales & Lead Generation">
                          <option value="lead-qualification">Lead Qualification & Nurturing</option>
                          <option value="appointment-booking">Appointment Booking & Scheduling</option>
                          <option value="sales-calls">Outbound Sales Calls</option>
                          <option value="follow-up">Customer Follow-up & Retention</option>
                        </optgroup>
                        <optgroup label="Operations & Management">
                          <option value="dispatch-coordination">Dispatch & Technician Coordination</option>
                          <option value="inventory-management">Inventory & Parts Management</option>
                          <option value="billing-inquiries">Billing & Payment Inquiries</option>
                          <option value="emergency-response">Emergency Response & Dispatch</option>
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
                        <optgroup label="External Customers">
                          <option value="residential-customers">Residential Customers</option>
                          <option value="commercial-clients">Commercial Clients</option>
                          <option value="property-managers">Property Managers</option>
                          <option value="homeowners">Homeowners</option>
                        </optgroup>
                        <optgroup label="Internal Team">
                          <option value="field-technicians">Field Technicians</option>
                          <option value="dispatchers">Dispatchers & Coordinators</option>
                          <option value="office-staff">Office Staff & Administrators</option>
                          <option value="management">Management & Supervisors</option>
                        </optgroup>
                        <optgroup label="Business Partners">
                          <option value="suppliers">Suppliers & Vendors</option>
                          <option value="contractors">Subcontractors</option>
                          <option value="partners">Business Partners</option>
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
                          This helps us train your AI solutions with industry-specific terminology, processes, and knowledge. AI agents understand technical terms like "SEER rating", "short cycling", "backflow prevention", and "VFD controls". Voice agents can handle phone calls, chatbots can answer questions about equipment and scheduling, and newsletters can share industry trends and maintenance tips.
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
                      <optgroup label="HVAC & Climate Control">
                        <option value="hvac-residential">HVAC - Residential Services</option>
                        <option value="hvac-commercial">HVAC - Commercial Services</option>
                        <option value="hvac-industrial">HVAC - Industrial Services</option>
                        <option value="refrigeration">Refrigeration Systems</option>
                        <option value="ductwork">Ductwork & Ventilation</option>
                      </optgroup>
                      <optgroup label="Plumbing Services">
                        <option value="plumbing-residential">Plumbing - Residential</option>
                        <option value="plumbing-commercial">Plumbing - Commercial</option>
                        <option value="plumbing-industrial">Plumbing - Industrial</option>
                        <option value="drain-cleaning">Drain Cleaning Services</option>
                        <option value="water-heater">Water Heater Services</option>
                      </optgroup>
                      <optgroup label="Electrical Services">
                        <option value="electrical-residential">Electrical - Residential</option>
                        <option value="electrical-commercial">Electrical - Commercial</option>
                        <option value="electrical-industrial">Electrical - Industrial</option>
                        <option value="generator">Generator Services</option>
                        <option value="security-systems">Security Systems</option>
                      </optgroup>
                      <optgroup label="Other Field Services">
                        <option value="landscaping">Landscaping & Lawn Care</option>
                        <option value="pest-control">Pest Control Services</option>
                        <option value="cleaning">Commercial Cleaning</option>
                        <option value="maintenance">Facility Maintenance</option>
                        <option value="other">Other Field Service</option>
                      </optgroup>
                      </select>
                    </div>
                </div>

                {/* Demo Type Selection */}
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
                          Voice Agent: Phone-based customer service, appointment booking, and technical support. Chatbot: Website chat interface for instant customer support and lead qualification. Newsletter: Industry-specific content, maintenance tips, and customer engagement.
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
                      <option value="voice-agent">Voice Agent Demo - Phone-based customer service, appointment booking, and technical support</option>
                      <option value="chatbot">Chatbot Demo - Website chat interface for instant customer support and lead qualification</option>
                      <option value="newsletter">Customized Newsletter Demo - Industry-specific content, maintenance tips, and customer engagement</option>
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

                {/* Specializations & Performance Goals */}
                <div className="border-t border-cyan-500/20 pt-8">
                  <h4 className="text-xl font-mono font-bold mb-6 text-yellow-400">
                    Specializations & Performance Goals
                  </h4>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-mono font-medium text-gray-300 mb-2">
                        Specializations (Select all that apply)
                      </label>
                      <div className="space-y-2">
                        {[
                          'Equipment Manuals', 'Technical Specifications', 'Service Bulletins', 'Training Materials',
                          'Historical Service Records', 'Customer Feedback', 'Industry Standards', 'Regulatory Guidelines',
                          'Best Practices', 'Troubleshooting Guides', 'Parts Catalogs', 'Warranty Information',
                          'Safety Procedures', 'Compliance Documentation', 'Software Documentation', 'Video Tutorials'
                        ].map((source) => (
                          <label key={source} className="flex items-center">
                            <input
                              type="checkbox"
                              checked={formData.specializations.includes(source)}
                              onChange={(e) => {
                                if (e.target.checked) {
                                  setFormData(prev => ({
                                    ...prev,
                                    specializations: [...prev.specializations, source]
                                  }));
                                } else {
                                  setFormData(prev => ({
                                    ...prev,
                                    specializations: prev.specializations.filter(s => s !== source)
                                  }));
                                }
                              }}
                              className="mr-3 text-yellow-500 focus:ring-yellow-400"
                            />
                            <span className="text-sm font-mono text-gray-300">{source}</span>
                          </label>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-mono font-medium text-gray-300 mb-2">
                        Performance Goals (Select all that apply)
                      </label>
                      <div className="space-y-2">
                        {[
                          'Reduce Service Time', 'Improve First-Call Resolution', 'Increase Customer Satisfaction',
                          'Minimize Equipment Downtime', 'Reduce Parts Inventory', 'Improve Technician Efficiency',
                          'Enhance Safety Compliance', 'Reduce Warranty Claims', 'Improve Documentation',
                          'Increase Revenue', 'Reduce Travel Time', 'Improve Scheduling', 'Enhance Training',
                          'Reduce Errors', 'Improve Communication', 'Increase Repeat Business'
                        ].map((goal) => (
                          <label key={goal} className="flex items-center">
                            <input
                              type="checkbox"
                              checked={formData.performanceGoals.includes(goal)}
                              onChange={(e) => {
                                if (e.target.checked) {
                                  setFormData(prev => ({
                                    ...prev,
                                    performanceGoals: [...prev.performanceGoals, goal]
                                  }));
                                } else {
                                  setFormData(prev => ({
                                    ...prev,
                                    performanceGoals: prev.performanceGoals.filter(g => g !== goal)
                                  }));
                                }
                              }}
                              className="mr-3 text-yellow-500 focus:ring-yellow-400"
                            />
                            <span className="text-sm font-mono text-gray-300">{goal}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Integration & Compliance Requirements */}
                <div className="border-t border-cyan-500/20 pt-8">
                  <h4 className="text-xl font-mono font-bold mb-6 text-red-400">
                    Integration & Compliance Requirements
                  </h4>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-mono font-medium text-gray-300 mb-2">
                        Integration Requirements (Select all that apply)
                      </label>
                      <div className="space-y-2">
                        {[
                          'CRM Systems', 'ERP Systems', 'Field Service Software', 'Inventory Management',
                          'Scheduling Systems', 'Mobile Apps', 'Email Systems', 'Phone Systems',
                          'Video Conferencing', 'Document Management', 'Accounting Software', 'HR Systems',
                          'Quality Management', 'Compliance Tracking', 'Reporting Dashboards', 'API Integrations'
                        ].map((integration) => (
                          <label key={integration} className="flex items-center">
                            <input
                              type="checkbox"
                              checked={formData.integrationRequirements.includes(integration)}
                              onChange={(e) => {
                                if (e.target.checked) {
                                  setFormData(prev => ({
                                    ...prev,
                                    integrationRequirements: [...prev.integrationRequirements, integration]
                                  }));
                                } else {
                                  setFormData(prev => ({
                                    ...prev,
                                    integrationRequirements: prev.integrationRequirements.filter(i => i !== integration)
                                  }));
                                }
                              }}
                              className="mr-3 text-red-500 focus:ring-red-400"
                            />
                            <span className="text-sm font-mono text-gray-300">{integration}</span>
                          </label>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-mono font-medium text-gray-300 mb-2">
                        Compliance Needs (Select all that apply)
                      </label>
                      <div className="space-y-2">
                        {[
                          'OSHA Compliance', 'FDA Regulations', 'ISO Standards', 'HIPAA Compliance',
                          'Environmental Regulations', 'Safety Standards', 'Quality Certifications',
                          'Industry Standards', 'Local Regulations', 'International Standards',
                          'Audit Requirements', 'Documentation Standards', 'Training Requirements',
                          'Reporting Requirements', 'Licensing Requirements', 'Insurance Requirements'
                        ].map((compliance) => (
                          <label key={compliance} className="flex items-center">
                            <input
                              type="checkbox"
                              checked={formData.complianceNeeds.includes(compliance)}
                              onChange={(e) => {
                                if (e.target.checked) {
                                  setFormData(prev => ({
                                    ...prev,
                                    complianceNeeds: [...prev.complianceNeeds, compliance]
                                  }));
                                } else {
                                  setFormData(prev => ({
                                    ...prev,
                                    complianceNeeds: prev.complianceNeeds.filter(c => c !== compliance)
                                  }));
                                }
                              }}
                              className="mr-3 text-red-500 focus:ring-red-400"
                            />
                            <span className="text-sm font-mono text-gray-300">{compliance}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Reporting & Analytics Needs */}
                <div className="border-t border-cyan-500/20 pt-8">
                  <h4 className="text-xl font-mono font-bold mb-6 text-blue-400">
                    Reporting & Analytics Needs
                  </h4>
                  
                  <div>
                    <label className="block text-sm font-mono font-medium text-gray-300 mb-2">
                      Reporting Needs (Select all that apply)
                    </label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {[
                        'Service Call Reports', 'Performance Metrics', 'Customer Satisfaction', 'Equipment Status',
                        'Parts Usage', 'Technician Productivity', 'Revenue Reports', 'Cost Analysis',
                        'Compliance Reports', 'Safety Incidents', 'Training Records', 'Warranty Claims',
                        'Preventive Maintenance', 'Emergency Response', 'Quality Metrics', 'ROI Analysis'
                      ].map((report) => (
                        <label key={report} className="flex items-center">
                          <input
                            type="checkbox"
                            checked={formData.reportingNeeds.includes(report)}
                            onChange={(e) => {
                              if (e.target.checked) {
                                setFormData(prev => ({
                                  ...prev,
                                  reportingNeeds: [...prev.reportingNeeds, report]
                                }));
                              } else {
                                setFormData(prev => ({
                                  ...prev,
                                  reportingNeeds: prev.reportingNeeds.filter(r => r !== report)
                                }));
                              }
                            }}
                            className="mr-3 text-blue-500 focus:ring-blue-400"
                          />
                          <span className="text-sm font-mono text-gray-300">{report}</span>
                        </label>
                      ))}
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

            {/* Data Analytics Specializations */}
            <div className="border-t border-cyan-500/20 pt-8">
              <h4 className="text-xl font-mono font-bold mb-6 text-orange-400">
                Data Analytics Specializations
              </h4>
              
              <div className="mb-6">
                <p className="text-sm text-gray-400 font-mono mb-4">
                  Select the analytical areas your AI agent should specialize in. These will guide deep research and training for your demo application.
                </p>
              </div>
              
                    <div>
                      <label className="block text-sm font-mono font-medium text-gray-300 mb-2">
                  Analytics Specializations (Select all that apply)
                      </label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {getAnalyticsSpecializations(formData.targetUsers).map((specialization) => (
                    <label key={specialization} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={formData.advancedCapabilities.includes(specialization)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setFormData(prev => ({
                              ...prev,
                              advancedCapabilities: [...prev.advancedCapabilities, specialization]
                            }));
                          } else {
                            setFormData(prev => ({
                              ...prev,
                              advancedCapabilities: prev.advancedCapabilities.filter(c => c !== specialization)
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
            </div>

                {/* Troubleshooting Methodology */}
                <div className="border-t border-cyan-500/20 pt-8">
                  <h4 className="text-xl font-mono font-bold mb-6 text-teal-400">
                    Troubleshooting Methodology
                  </h4>
                  
                    <div>
                      <label className="block text-sm font-mono font-medium text-gray-300 mb-2">
                      Troubleshooting Approaches (Select all that apply)
                      </label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {[
                        'Systematic Diagnosis', 'Symptom-Based Analysis', 'Component Isolation', 'Signal Tracing',
                        'Voltage/Current Analysis', 'Temperature Analysis', 'Vibration Analysis', 'Acoustic Analysis',
                        'Pressure Analysis', 'Flow Analysis', 'Chemical Analysis', 'Visual Inspection',
                        'Functional Testing', 'Load Testing', 'Stress Testing', 'Environmental Testing',
                        'Historical Analysis', 'Comparative Analysis', 'Statistical Analysis', 'Expert System Rules'
                      ].map((method) => (
                        <label key={method} className="flex items-center">
                          <input
                            type="checkbox"
                            checked={formData.troubleshootingMethodology.includes(method)}
                            onChange={(e) => {
                              if (e.target.checked) {
                                setFormData(prev => ({
                                  ...prev,
                                  troubleshootingMethodology: [...prev.troubleshootingMethodology, method]
                                }));
                              } else {
                                setFormData(prev => ({
                                  ...prev,
                                  troubleshootingMethodology: prev.troubleshootingMethodology.filter(m => m !== method)
                                }));
                              }
                            }}
                            className="mr-3 text-teal-500 focus:ring-teal-400"
                          />
                          <span className="text-sm font-mono text-gray-300">{method}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>


                {/* Predictive Capabilities */}
                <div className="border-t border-cyan-500/20 pt-8">
                  <h4 className="text-xl font-mono font-bold mb-6 text-cyan-400">
                    Predictive Capabilities
                  </h4>
                  
                  <div>
                    <label className="block text-sm font-mono font-medium text-gray-300 mb-2">
                      Predictive Features (Select all that apply)
                    </label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {[
                        'Failure Prediction', 'Maintenance Scheduling', 'Performance Forecasting', 'Demand Forecasting',
                        'Cost Prediction', 'Risk Prediction', 'Quality Prediction', 'Efficiency Prediction',
                        'Lifespan Prediction', 'Downtime Prediction', 'Parts Usage Prediction', 'Energy Consumption Prediction',
                        'Temperature Prediction', 'Pressure Prediction', 'Vibration Prediction', 'Noise Prediction',
                        'Wear Prediction', 'Corrosion Prediction', 'Fatigue Prediction', 'Reliability Prediction'
                      ].map((prediction) => (
                        <label key={prediction} className="flex items-center">
                          <input
                            type="checkbox"
                            checked={formData.predictiveCapabilities.includes(prediction)}
                            onChange={(e) => {
                              if (e.target.checked) {
                                setFormData(prev => ({
                                  ...prev,
                                  predictiveCapabilities: [...prev.predictiveCapabilities, prediction]
                                }));
                              } else {
                                setFormData(prev => ({
                                  ...prev,
                                  predictiveCapabilities: prev.predictiveCapabilities.filter(p => p !== prediction)
                                }));
                              }
                            }}
                            className="mr-3 text-cyan-500 focus:ring-cyan-400"
                          />
                          <span className="text-sm font-mono text-gray-300">{prediction}</span>
                        </label>
                      ))}
                    </div>
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