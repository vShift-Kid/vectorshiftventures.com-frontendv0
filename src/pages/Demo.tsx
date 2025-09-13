import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { MessageSquare, Brain, CheckCircle, ArrowRight, Bot, Globe } from 'lucide-react';

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
    // Voice Agent Customization Fields
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
    // Specializations Field
    specializations: [] as string[]
  });

  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [showSpecializations, setShowSpecializations] = useState(false);
  const [specializationSearch, setSpecializationSearch] = useState('');
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleTooltipShow = (tooltipId: string) => {
    setShowTooltips(prev => ({ ...prev, [tooltipId]: true }));
  };

  const handleTooltipHide = (tooltipId: string) => {
    setShowTooltips(prev => ({ ...prev, [tooltipId]: false }));
  };

  // Handle click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowSpecializations(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Specializations data organized by category
  const specializationsData = {
    'Medical & Healthcare': [
      'X-Ray Technology', 'CT Scanning', 'MRI Technology', 'Ultrasound', 'Nuclear Medicine',
      'Radiation Therapy', 'Medical Imaging', 'Laboratory Testing', 'Phlebotomy', 'EKG/ECG',
      'Respiratory Therapy', 'Physical Therapy', 'Occupational Therapy', 'Speech Therapy',
      'Medical Coding', 'Health Information Management', 'Patient Care', 'Medical Equipment',
      'Surgery Support', 'Anesthesia Technology', 'Radiology', 'Pathology', 'Cardiology',
      'Neurology', 'Oncology', 'Pediatrics', 'Geriatrics', 'Emergency Medicine'
    ],
    'Construction & Building Trades': [
      'Carpentry', 'Framing', 'Finish Carpentry', 'Cabinet Making', 'Woodworking',
      'Masonry', 'Brick Laying', 'Stone Work', 'Concrete Work', 'Drywall Installation',
      'Flooring Installation', 'Tile Work', 'Roofing', 'Siding', 'Insulation',
      'Painting', 'Plastering', 'Welding', 'Metal Fabrication', 'Steel Work',
      'Scaffolding', 'Crane Operation', 'Excavation', 'Foundation Work', 'Structural Engineering',
      'Building Inspection', 'Code Compliance', 'Permit Processing', 'Site Safety', 'Project Estimation'
    ],
    'Electronics & Technology': [
      'Circuit Board Repair', 'Electronic Diagnostics', 'Microcontroller Programming',
      'Embedded Systems', 'IoT Devices', 'Robotics', 'Automation Systems',
      'Control Systems', 'PLC Programming', 'HMI Development', 'SCADA Systems',
      'Network Infrastructure', 'Fiber Optic Installation', 'Wireless Systems',
      'Audio/Video Systems', 'Security Systems', 'Smart Home Technology',
      'Telecommunications', 'Satellite Systems', 'RF Technology', 'Antenna Design',
      'Signal Processing', 'Digital Systems', 'Microelectronics', 'Semiconductor Technology'
    ],
    'Mechanical & Engineering': [
      'Hydraulic Systems', 'Pneumatic Systems', 'Mechanical Assembly', 'Precision Machining',
      'CNC Programming', 'Tool and Die Making', 'Quality Control', 'Metrology',
      'Mechanical Design', 'CAD/CAM', '3D Modeling', 'Prototyping', 'Testing',
      'Maintenance Planning', 'Reliability Engineering', 'Failure Analysis',
      'Fluid Dynamics', 'Thermodynamics', 'Materials Science', 'Manufacturing Engineering',
      'Industrial Design', 'Product Development', 'Process Engineering', 'Lean Manufacturing'
    ],
    'Electrical & Power Systems': [
      'High Voltage Systems', 'Low Voltage Systems', 'Power Distribution', 'Motor Controls',
      'VFD Programming', 'Electrical Safety', 'Code Compliance', 'Energy Management',
      'Renewable Energy', 'Solar Installation', 'Wind Power', 'Battery Systems',
      'Electrical Testing', 'Troubleshooting', 'Preventive Maintenance',
      'Power Generation', 'Transmission Lines', 'Substation Design', 'Grid Management',
      'Energy Storage', 'Microgrids', 'Smart Grid Technology', 'Power Quality'
    ],
    'HVAC & Climate Control': [
      'Heating Systems', 'Cooling Systems', 'Ventilation', 'Air Quality', 'Ductwork Design',
      'Refrigeration', 'Heat Pumps', 'Boiler Systems', 'Chiller Systems', 'Air Handling Units',
      'Energy Efficiency', 'Building Automation', 'Thermostat Programming', 'Load Calculations',
      'System Balancing', 'Commissioning', 'Retrofit Projects', 'Maintenance Contracts'
    ],
    'Plumbing & Water Systems': [
      'Water Supply Systems', 'Drainage Systems', 'Sewer Systems', 'Water Treatment',
      'Backflow Prevention', 'Hydro Jetting', 'Pipe Installation', 'Fixture Installation',
      'Water Heater Service', 'Sump Pump Systems', 'Irrigation Systems', 'Fire Sprinkler Systems',
      'Cross-Connection Control', 'Water Pressure Systems', 'Pipe Fitting', 'Valve Repair'
    ],
    'Automotive & Transportation': [
      'Engine Repair', 'Transmission Service', 'Brake Systems', 'Suspension Systems',
      'Electrical Systems', 'Diagnostic Testing', 'Emission Control', 'Fuel Systems',
      'Air Conditioning', 'Body Work', 'Paint & Refinishing', 'Fleet Maintenance',
      'Commercial Vehicles', 'Heavy Equipment', 'Motorcycle Service', 'Marine Engines'
    ],
    'Software & Information Technology': [
      'Software Development', 'Database Management', 'System Administration',
      'Network Security', 'Cybersecurity', 'Cloud Computing', 'DevOps',
      'API Development', 'Mobile App Development', 'Web Development',
      'Data Analytics', 'Machine Learning', 'AI Integration', 'Automation Scripting',
      'IT Support', 'System Integration', 'Database Design', 'Software Testing',
      'User Experience Design', 'Information Architecture', 'Digital Transformation'
    ],
    'Food Service & Hospitality': [
      'Culinary Arts', 'Food Safety', 'Kitchen Equipment', 'Restaurant Operations',
      'Menu Planning', 'Catering', 'Food Preparation', 'Sanitation Procedures',
      'Health Department Compliance', 'Inventory Management', 'Cost Control',
      'Customer Service', 'Event Planning', 'Hotel Operations', 'Tourism Management'
    ],
    'Education & Training': [
      'Curriculum Development', 'Instructional Design', 'Educational Technology',
      'Student Assessment', 'Classroom Management', 'Special Education',
      'Adult Learning', 'Vocational Training', 'Online Learning', 'Training Materials',
      'Educational Psychology', 'Learning Management Systems', 'Academic Advising',
      'Educational Administration', 'Research Methods', 'Educational Policy'
    ],
    'Finance & Business': [
      'Accounting', 'Financial Analysis', 'Tax Preparation', 'Bookkeeping',
      'Payroll Management', 'Budget Planning', 'Investment Analysis', 'Risk Management',
      'Business Planning', 'Market Research', 'Sales Management', 'Customer Relations',
      'Human Resources', 'Operations Management', 'Strategic Planning', 'Compliance'
    ],
    'Legal & Compliance': [
      'Contract Law', 'Regulatory Compliance', 'Risk Assessment', 'Policy Development',
      'Legal Research', 'Document Review', 'Compliance Auditing', 'Safety Regulations',
      'Environmental Law', 'Employment Law', 'Intellectual Property', 'Data Privacy',
      'Industry Standards', 'Certification Requirements', 'Licensing', 'Permit Management'
    ],
    'Environmental & Safety': [
      'Environmental Compliance', 'Safety Management', 'Hazardous Materials', 'Waste Management',
      'Air Quality', 'Water Quality', 'Noise Control', 'Ergonomics', 'OSHA Compliance',
      'Environmental Impact Assessment', 'Sustainability Planning', 'Green Building',
      'Renewable Energy', 'Carbon Footprint', 'Environmental Monitoring', 'Safety Training'
    ],
    'Manufacturing & Production': [
      'Production Planning', 'Quality Control', 'Lean Manufacturing', 'Six Sigma',
      'Supply Chain Management', 'Inventory Control', 'Process Improvement',
      'Manufacturing Engineering', 'Production Scheduling', 'Equipment Maintenance',
      'Safety Procedures', 'Workplace Organization', 'Continuous Improvement',
      'Statistical Process Control', 'Root Cause Analysis', 'Change Management'
    ],
    'Customer Service & Support': [
      'Technical Support', 'Customer Relations', 'Account Management', 'Sales Support',
      'Training & Education', 'Documentation', 'Process Improvement', 'Quality Assurance',
      'Compliance Management', 'Regulatory Affairs', 'Safety Training', 'Emergency Response',
      'Call Center Operations', 'Customer Success', 'Relationship Management', 'Conflict Resolution'
    ],
    'Project Management & Operations': [
      'Project Planning', 'Resource Management', 'Timeline Management', 'Budget Control',
      'Risk Assessment', 'Quality Management', 'Vendor Management', 'Supply Chain',
      'Inventory Management', 'Workflow Optimization', 'Process Documentation',
      'Performance Metrics', 'Continuous Improvement', 'Change Management',
      'Agile Methodology', 'Scrum Master', 'Stakeholder Management', 'Communication Planning'
    ],
    'Specialized Equipment & Tools': [
      'Heavy Machinery', 'Industrial Equipment', 'Manufacturing Equipment', 'Packaging Equipment',
      'Food Processing Equipment', 'Pharmaceutical Equipment', 'Laboratory Equipment',
      'Medical Devices', 'Safety Equipment', 'Environmental Equipment', 'Testing Equipment',
      'Calibration Equipment', 'Measurement Instruments', 'Diagnostic Tools',
      'Lifting Equipment', 'Pressure Vessels', 'Pumps & Compressors', 'Generators'
    ],
    'Arts & Creative Services': [
      'Graphic Design', 'Web Design', 'Photography', 'Videography', 'Audio Production',
      'Writing & Editing', 'Content Creation', 'Marketing Materials', 'Brand Development',
      'User Interface Design', 'Print Design', 'Digital Media', 'Social Media Management',
      'Creative Direction', 'Art Direction', 'Copywriting', 'Technical Writing'
    ],
    'Agriculture & Landscaping': [
      'Crop Management', 'Soil Science', 'Irrigation Systems', 'Pest Control',
      'Landscape Design', 'Plant Care', 'Equipment Operation', 'Harvest Management',
      'Greenhouse Operations', 'Livestock Management', 'Agricultural Technology',
      'Environmental Stewardship', 'Organic Farming', 'Precision Agriculture', 'Farm Management'
    ]
  };

  const handleSpecializationToggle = (specialization: string) => {
    setFormData(prev => {
      const currentSpecializations = prev.specializations || [];
      if (currentSpecializations.includes(specialization)) {
        return {
          ...prev,
          specializations: currentSpecializations.filter(s => s !== specialization)
        };
      } else if (currentSpecializations.length < 5) {
        return {
          ...prev,
          specializations: [...currentSpecializations, specialization]
        };
      }
      return prev;
    });
  };

  const filteredSpecializations = () => {
    const search = specializationSearch.toLowerCase();
    const filtered: { [key: string]: string[] } = {};
    
    Object.entries(specializationsData).forEach(([category, items]) => {
      const filteredItems = items.filter(item => 
        item.toLowerCase().includes(search)
      );
      if (filteredItems.length > 0) {
        filtered[category] = filteredItems;
      }
    });
    
    return filtered;
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
        voiceAgentCustomization: {
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
                ? `Thank you, ${formData.name}. We've received your demo request and will contact you within 24 hours to discuss your business automation needs and create your custom voice assistant tailored for ${formData.useCase} with ${formData.targetUsers}.`
                : `Thank you, ${formData.name}. We've received your consultation request and will contact you within 24 hours to discuss your business automation needs and create your custom voice assistant tailored for ${formData.useCase} with ${formData.targetUsers}.`
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
              Get a personalized AI voice assistant and website demo specifically built for your field service business. 
              Complete the form below to schedule your consultation and receive your custom demo.
            </p>
            
            <div className="bg-gradient-to-b from-cyan-500/10 to-transparent border border-cyan-500/20 rounded-2xl p-8 mb-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Bot className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="font-mono font-semibold mb-2">Custom Voice Agent</h3>
                  <p className="text-sm text-gray-400">AI-powered phone system trained on your business</p>
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
                  Complete the form below to schedule your consultation and receive your personalized AI voice assistant demo.
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

                {/* Voice Agent Customization Section */}
                <div className="border-t border-cyan-500/20 pt-8">
                  <h4 className="text-xl font-mono font-bold mb-6 text-cyan-400">
                    Voice Agent Customization
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
                        <option value="">What should your voice agent primarily do?</option>
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
                        <option value="">Who will primarily interact with your voice agent?</option>
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
                      Voice Agent Specialization *
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
                          This helps us train your AI solutions with industry-specific terminology, processes, and knowledge. Voice agents understand technical terms like "SEER rating", "short cycling", "backflow prevention", and "VFD controls". Chatbots can answer questions about equipment, pricing, and scheduling. Newsletters can share industry trends, maintenance tips, and regulatory updates.
                        </div>
                      </div>
                    </label>
                    <select
                      value={formData.industryContext}
                      onChange={(e) => handleInputChange('industryContext', e.target.value)}
                      required
                      className="w-full p-3 bg-gray-800/50 border border-cyan-500/30 rounded-lg text-white font-mono focus:outline-none focus:border-cyan-400"
                    >
                      <option value="">How should your voice agent be specialized?</option>
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

                {/* Agent Specializations */}
                <div className="border-t border-cyan-500/20 pt-8">
                  <h4 className="text-xl font-mono font-bold mb-6 text-purple-400">
                    Agent Specializations
                  </h4>
                  
                  <div>
                    <label className="block text-sm font-mono font-medium text-gray-300 mb-2 flex items-center gap-2">
                      Select up to 5 specializations *
                      <div className="relative">
                        <button 
                          type="button" 
                          className="w-5 h-5 bg-purple-500/20 hover:bg-purple-500/30 rounded-full flex items-center justify-center text-purple-400 text-xs font-bold transition-colors p-1"
                          onMouseEnter={() => handleTooltipShow('specializations')}
                          onMouseLeave={() => handleTooltipHide('specializations')}
                        >
                          ?
                        </button>
                        <div 
                          className={`absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-80 p-3 bg-gray-800 border border-purple-500/30 rounded-lg text-xs font-mono text-gray-300 transition-opacity duration-300 pointer-events-auto z-20 shadow-lg ${
                            showTooltips.specializations ? 'opacity-100' : 'opacity-0'
                          }`}
                          onMouseEnter={() => handleTooltipShow('specializations')}
                          onMouseLeave={() => handleTooltipHide('specializations')}
                        >
                          Choose specific areas where your AI agent should have expertise. This helps us train it with the right terminology, processes, and knowledge for your field.
                        </div>
                      </div>
                    </label>
                    
                    {/* Selected Specializations Display */}
                    {formData.specializations.length > 0 && (
                      <div className="mb-4 p-3 bg-gray-800/50 border border-purple-500/30 rounded-lg">
                        <div className="flex flex-wrap gap-2">
                          {formData.specializations.map((spec, index) => (
                            <span
                              key={index}
                              className="px-3 py-1 bg-purple-500/20 text-purple-300 text-sm font-mono rounded-full flex items-center gap-2"
                            >
                              {spec}
                              <button
                                type="button"
                                onClick={() => handleSpecializationToggle(spec)}
                                className="text-purple-400 hover:text-purple-300 transition-colors"
                              >
                                ×
                              </button>
                            </span>
                          ))}
                        </div>
                        <div className="text-xs text-gray-400 mt-2 font-mono">
                          {formData.specializations.length}/5 selected
                        </div>
                      </div>
                    )}

                    {/* Multi-select Dropdown */}
                    <div className="relative" ref={dropdownRef}>
                      <button
                        type="button"
                        onClick={() => setShowSpecializations(!showSpecializations)}
                        className="w-full p-3 bg-gray-800/50 border border-purple-500/30 rounded-lg text-white font-mono focus:outline-none focus:border-purple-400 text-left flex items-center justify-between"
                      >
                        <span className={formData.specializations.length > 0 ? 'text-white' : 'text-gray-400'}>
                          {formData.specializations.length > 0 
                            ? `${formData.specializations.length} specializations selected`
                            : 'Click to select specializations'
                          }
                        </span>
                        <span className={`transform transition-transform ${showSpecializations ? 'rotate-180' : ''}`}>
                          ▼
                        </span>
                      </button>

                      {showSpecializations && (
                        <div className="absolute top-full left-0 right-0 mt-1 bg-gray-800 border border-purple-500/30 rounded-lg shadow-lg z-30 max-h-96 overflow-hidden">
                          {/* Search Input */}
                          <div className="p-3 border-b border-purple-500/20">
                            <input
                              type="text"
                              placeholder="Search specializations..."
                              value={specializationSearch}
                              onChange={(e) => setSpecializationSearch(e.target.value)}
                              className="w-full p-2 bg-gray-700 border border-gray-600 rounded text-white font-mono text-sm focus:outline-none focus:border-purple-400"
                            />
                          </div>

                          {/* Specializations List */}
                          <div className="max-h-80 overflow-y-auto">
                            {Object.entries(filteredSpecializations()).map(([category, items]) => (
                              <div key={category} className="border-b border-gray-700 last:border-b-0">
                                <div className="px-3 py-2 bg-gray-700/50 text-purple-300 font-mono text-sm font-semibold sticky top-0">
                                  {category}
                                </div>
                                <div className="p-2">
                                  {items.map((item) => (
                                    <label
                                      key={item}
                                      className={`flex items-center p-2 rounded cursor-pointer transition-colors ${
                                        formData.specializations.includes(item)
                                          ? 'bg-purple-500/20 text-purple-300'
                                          : 'hover:bg-gray-700/50 text-gray-300'
                                      } ${
                                        formData.specializations.length >= 5 && !formData.specializations.includes(item)
                                          ? 'opacity-50 cursor-not-allowed'
                                          : ''
                                      }`}
                                    >
                                      <input
                                        type="checkbox"
                                        checked={formData.specializations.includes(item)}
                                        onChange={() => handleSpecializationToggle(item)}
                                        disabled={formData.specializations.length >= 5 && !formData.specializations.includes(item)}
                                        className="mr-3 text-purple-500 focus:ring-purple-400"
                                      />
                                      <span className="text-sm font-mono">{item}</span>
                                    </label>
                                  ))}
                                </div>
                              </div>
                            ))}
                          </div>

                          {/* Selection Counter */}
                          <div className="px-3 py-2 bg-gray-700/50 border-t border-gray-600 text-xs text-gray-400 font-mono">
                            {formData.specializations.length}/5 selected
                            {formData.specializations.length >= 5 && (
                              <span className="text-purple-400 ml-2">• Maximum reached</span>
                            )}
                          </div>
                        </div>
                      )}
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