import React, { useState, useEffect } from 'react';
import { Brain, ArrowRight, FileText, Zap, Search, Upload, X, CheckCircle, Home } from 'lucide-react';

// Comprehensive Specializations
const mainSpecializations = {
  'Electrical Systems': [
    'Power Distribution', 'Electrical Safety', 'Circuit Analysis', 'Motor Control',
    'Electrical Troubleshooting', 'Voltage Analysis', 'Current Analysis', 'Electrical Testing',
    'Electrical Maintenance', 'Electrical Installation', 'Electrical Design', 'Electrical Codes',
    'Electrical Safety Standards', 'Electrical Equipment', 'Electrical Systems', 'Electrical Components',
    'Electrical Diagnostics', 'Electrical Repair', 'Electrical Inspection', 'Electrical Compliance',
    'Electrical Engineering', 'Electrical Automation', 'Electrical Controls', 'Electrical Protection',
    'Electrical Monitoring', 'Electrical Performance', 'Electrical Reliability', 'Electrical Efficiency',
    'Electrical Documentation', 'Electrical Training', 'Electrical Procedures', 'Electrical Standards'
  ],
  'Mechanical Systems': [
    'Mechanical Design', 'Mechanical Analysis', 'Mechanical Maintenance', 'Mechanical Troubleshooting',
    'Mechanical Testing', 'Mechanical Inspection', 'Mechanical Repair', 'Mechanical Installation',
    'Mechanical Components', 'Mechanical Systems', 'Mechanical Engineering', 'Mechanical Performance',
    'Mechanical Reliability', 'Mechanical Efficiency', 'Mechanical Safety', 'Mechanical Standards',
    'Mechanical Documentation', 'Mechanical Training', 'Mechanical Procedures', 'Mechanical Compliance',
    'Mechanical Automation', 'Mechanical Controls', 'Mechanical Monitoring', 'Mechanical Diagnostics',
    'Mechanical Optimization', 'Mechanical Planning', 'Mechanical Scheduling', 'Mechanical Management',
    'Mechanical Quality', 'Mechanical Innovation', 'Mechanical Integration', 'Mechanical Support'
  ],
  'Reliability & Quality': [
    'Failure Prediction', 'Reliability Analysis', 'Quality Control', 'Defect Analysis',
    'Anomaly Detection', 'Root Cause Analysis', 'Statistical Process Control', 'Six Sigma Analysis',
    'Quality Metrics', 'Reliability Prediction', 'Failure Mode Analysis', 'Risk Assessment',
    'Compliance Monitoring', 'Audit Analysis', 'Safety Analysis', 'Performance Standards',
    'Equipment Reliability', 'System Reliability', 'Component Analysis', 'Failure Prevention',
    'Reliability Testing', 'Quality Assurance', 'Inspection Analysis', 'Standards Compliance',
    'Reliability Engineering', 'Fault Tolerance', 'Redundancy Analysis', 'MTBF Analysis',
    'Safety Procedures', 'Compliance Documentation', 'Industry Standards', 'Regulatory Guidelines',
    'Quality Certifications', 'Environmental Regulations', 'Safety Standards', 'Audit Requirements'
  ],
  'Maintenance & Operations': [
    'Preventive Maintenance', 'Maintenance Scheduling', 'Equipment Performance', 'Downtime Analysis',
    'Maintenance Optimization', 'Spare Parts Analysis', 'Work Order Analysis', 'Maintenance Costs',
    'Equipment Lifecycle', 'Maintenance Efficiency', 'Predictive Maintenance', 'Condition Monitoring',
    'Maintenance Planning', 'Resource Allocation', 'Maintenance Metrics', 'Operational Excellence',
    'Maintenance Strategies', 'Equipment Health', 'Maintenance Documentation', 'Maintenance Training',
    'Maintenance Reporting', 'Maintenance Budgeting', 'Maintenance Forecasting', 'Maintenance Automation',
    'Maintenance Engineering', 'Asset Management', 'Maintenance Reliability', 'Maintenance Analytics',
    'Equipment Manuals', 'Service Bulletins', 'Troubleshooting Guides', 'Parts Catalogs',
    'Warranty Information', 'Historical Service Records', 'Emergency Response', 'Performance Metrics'
  ],
  'Engineering & Technical': [
    'Technical Analysis', 'Design Optimization', 'Performance Engineering', 'System Analysis',
    'Technical Specifications', 'Engineering Metrics', 'Design Validation', 'Technical Documentation',
    'Engineering Efficiency', 'Technical Standards', 'Engineering Processes', 'Technical Innovation',
    'Engineering Quality', 'Technical Risk', 'Engineering Compliance', 'Technical Training',
    'Engineering Design', 'System Integration', 'Technical Troubleshooting', 'Engineering Support',
    'Technical Consulting', 'Engineering Solutions', 'Technical Implementation', 'Engineering Management',
    'Field Engineering', 'Technical Services', 'Engineering Operations', 'Technical Support',
    'Software Documentation', 'Video Tutorials', 'Training Materials', 'Best Practices',
    'Technical Writing', 'Process Documentation', 'Standard Operating Procedures', 'Knowledge Management'
  ],
  'Performance & Goals': [
    'Reduce Service Time', 'Improve First-Call Resolution', 'Increase Customer Satisfaction', 'Minimize Equipment Downtime',
    'Reduce Parts Inventory', 'Improve Technician Efficiency', 'Enhance Safety Compliance', 'Reduce Warranty Claims',
    'Improve Documentation', 'Increase Revenue', 'Reduce Travel Time', 'Improve Scheduling',
    'Enhance Training', 'Reduce Errors', 'Improve Communication', 'Increase Repeat Business',
    'Performance Management', 'Operational Excellence', 'Efficiency Analysis', 'Process Optimization',
    'Quality Improvement', 'Cost Reduction', 'Productivity Enhancement', 'Service Level Improvement',
    'Customer Experience', 'Operational Metrics', 'Performance Tracking', 'Continuous Improvement'
  ],
  'Integration & Systems': [
    'CRM Systems', 'ERP Systems', 'Field Service Software', 'Inventory Management',
    'Scheduling Systems', 'Mobile Apps', 'Email Systems', 'Phone Systems',
    'Video Conferencing', 'Document Management', 'Accounting Software', 'HR Systems',
    'Quality Management', 'Compliance Tracking', 'Reporting Dashboards', 'API Integrations',
    'System Integration', 'Technical Implementation', 'Data Integration', 'Workflow Automation',
    'System Optimization', 'Technology Integration', 'Digital Transformation', 'Process Automation'
  ],
  'Compliance & Standards': [
    'OSHA Compliance', 'FDA Regulations', 'ISO Standards', 'HIPAA Compliance',
    'Environmental Regulations', 'Safety Standards', 'Quality Certifications', 'Industry Standards',
    'Local Regulations', 'International Standards', 'Audit Requirements', 'Documentation Standards',
    'Training Requirements', 'Reporting Requirements', 'Licensing Requirements', 'Insurance Requirements',
    'Regulatory Compliance', 'Standards Compliance', 'Compliance Monitoring', 'Audit Management',
    'Risk Management', 'Quality Assurance', 'Safety Management', 'Regulatory Reporting'
  ],
  'Reporting & Analytics': [
    'Service Call Reports', 'Performance Metrics', 'Customer Satisfaction', 'Equipment Status',
    'Parts Usage', 'Technician Productivity', 'Revenue Reports', 'Cost Analysis',
    'Compliance Reports', 'Safety Incidents', 'Training Records', 'Warranty Claims',
    'Preventive Maintenance', 'Emergency Response', 'Quality Metrics', 'ROI Analysis',
    'Data Analytics', 'Business Intelligence', 'Performance Dashboards', 'KPI Analysis',
    'Trend Analysis', 'Predictive Analytics', 'Reporting Automation', 'Data Visualization'
  ],
  'Customer & Support': [
    'Customer Service', 'Support Ticket Management', 'Service Level Management', 'Customer Satisfaction',
    'Customer Feedback', 'Customer Experience', 'Support Performance', 'Service Quality Metrics',
    'Customer Journey Analysis', 'Retention Analysis', 'Complaint Analysis', 'Service Level Analysis',
    'Customer Insights', 'Support Efficiency', 'Customer Success Metrics', 'Service Optimization',
    'Customer Care', 'Support Operations', 'Service Delivery', 'Customer Relationship Management'
  ],
  'Troubleshooting & Diagnostics': [
    'Systematic Diagnosis', 'Symptom-Based Analysis', 'Component Isolation', 'Signal Tracing',
    'Voltage/Current Analysis', 'Temperature Analysis', 'Vibration Analysis', 'Acoustic Analysis',
    'Pressure Analysis', 'Flow Analysis', 'Chemical Analysis', 'Visual Inspection',
    'Functional Testing', 'Load Testing', 'Stress Testing', 'Environmental Testing',
    'Historical Analysis', 'Comparative Analysis', 'Statistical Analysis', 'Expert System Rules',
    'Diagnostic Procedures', 'Fault Detection', 'Problem Resolution', 'Technical Troubleshooting',
    'Equipment Diagnostics', 'System Diagnostics', 'Performance Diagnostics', 'Failure Diagnostics'
  ],
  'Predictive & Analytics': [
    'Failure Prediction', 'Maintenance Scheduling', 'Performance Forecasting', 'Demand Forecasting',
    'Cost Prediction', 'Risk Prediction', 'Quality Prediction', 'Efficiency Prediction',
    'Lifespan Prediction', 'Downtime Prediction', 'Parts Usage Prediction', 'Energy Consumption Prediction',
    'Temperature Prediction', 'Pressure Prediction', 'Vibration Prediction', 'Noise Prediction',
    'Wear Prediction', 'Corrosion Prediction', 'Fatigue Prediction', 'Reliability Prediction',
    'Predictive Analytics', 'Machine Learning', 'Data Mining', 'Pattern Recognition',
    'Anomaly Detection', 'Trend Analysis', 'Forecasting Models', 'Predictive Maintenance'
  ]
};

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

const DemoTest: React.FC = () => {
  const [isSubmitted, setIsSubmitted] = useState(true);
  const [isFormValid, setIsFormValid] = useState(false);
  const [showTooltips, setShowTooltips] = useState<{[key: string]: boolean}>({});
  const [countdown, setCountdown] = useState(30);

  const [formData, setFormData] = useState({
    name: 'John Doe',
    email: 'john.doe@example.com',
    company: 'Acme Corporation',
    phone: '',
    industry: '',
    consultationPackage: '',
    businessDescription: '',
    preferredDate: '',
    preferredTime: '',
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
    responseTone: '',
    expertiseLevel: '',
    // RME Specializations
    rmeSpecializations: [] as string[]
  });

  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [dragActive, setDragActive] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleTooltipShow = (tooltipId: string) => {
    setShowTooltips(prev => ({ ...prev, [tooltipId]: true }));
  };

  const handleTooltipHide = (tooltipId: string) => {
    setShowTooltips(prev => ({ ...prev, [tooltipId]: false }));
  };

  const handleInputChange = (field: string, value: string) => {
    const updatedFormData = { ...formData, [field]: value };
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

  // File upload handlers
  const handleDragEnter = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    const files = Array.from(e.dataTransfer.files);
    const validFiles = files.filter(file => {
      const validTypes = [
        'application/pdf',
        'application/msword',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        'text/plain',
        'application/vnd.ms-excel',
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        'application/vnd.ms-powerpoint',
        'application/vnd.openxmlformats-officedocument.presentationml.presentation'
      ];
      return validTypes.includes(file.type) && file.size <= 10 * 1024 * 1024; // 10MB limit
    });
    
    setUploadedFiles(prev => [...prev, ...validFiles]);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      const validFiles = files.filter(file => {
        const validTypes = [
          'application/pdf',
          'application/msword',
          'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
          'text/plain',
          'application/vnd.ms-excel',
          'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
          'application/vnd.ms-powerpoint',
          'application/vnd.openxmlformats-officedocument.presentationml.presentation'
        ];
        return validTypes.includes(file.type) && file.size <= 10 * 1024 * 1024; // 10MB limit
      });
      
      setUploadedFiles(prev => [...prev, ...validFiles]);
    }
  };

  // Countdown timer effect
  useEffect(() => {
    if (isSubmitted && countdown > 0) {
      const timer = setTimeout(() => {
        setCountdown(countdown - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else if (isSubmitted && countdown === 0) {
      // Redirect to home page after 30 seconds
      window.location.href = '/';
    }
  }, [isSubmitted, countdown]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      // Prepare the data for the n8n webhook
      const webhookData = {
        name: formData.name,
        email: formData.email,
        company: formData.company,
        phone: formData.phone,
        industry: formData.industry,
        consultationPackage: formData.consultationPackage,
        businessDescription: formData.businessDescription,
        currentChallenges: formData.currentChallenges,
        equipmentAndSystems: formData.teamSize,
        preferredDate: formData.preferredDate,
        preferredTime: formData.preferredTime,
        researchFocus: formData.researchFocus,
        researchDepth: formData.researchDepth,
        demoType: formData.demoType,
        agentPersonality: formData.agentPersonality,
        communicationStyle: formData.communicationStyle,
        technicalLevel: formData.technicalLevel,
        problemSolvingApproach: formData.problemSolvingApproach,
        customerInteractionStyle: formData.customerInteractionStyle,
        rmeSpecializations: formData.rmeSpecializations,
        uploadedFiles: uploadedFiles.map(file => ({
          name: file.name,
          size: file.size,
          type: file.type
        }))
      };

        // Send to n8n webhook
        const response = await fetch('https://vectorshift-n8n-ventures.onrender.com/webhook/vectorshift-consultation-enhanced-fixed', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(webhookData)
      });

      if (response.ok) {
        console.log('Form submitted successfully!');
        setIsSubmitted(true);
      } else {
        console.error('Failed to submit form:', response.status, response.statusText);
        alert('Failed to submit form. Please try again.');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('An error occurred while submitting the form. Please try again.');
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
            <div className="bg-gradient-to-r from-orange-500/10 to-yellow-500/10 border border-orange-500/20 rounded-lg p-6 mb-8">
              <h3 className="text-lg font-mono font-semibold mb-3 text-orange-400">
                📧 Verification Email Sent
              </h3>
              <p className="text-gray-300 font-mono text-sm">
                Please check your email at <strong className="text-orange-300">{formData.email}</strong> for a verification link to confirm your demo request and initiate the AI solution build process.
              </p>
            </div>
            <div className="bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-500/20 rounded-lg p-6 mb-6">
              <h3 className="text-xl font-mono font-semibold mb-4 text-cyan-400">
                What happens next?
              </h3>
              <ul className="text-left text-gray-300 font-mono space-y-2">
                <li>• <strong className="text-orange-300">Click the verification link in your email</strong> to confirm your request</li>
                <li>• Our team will analyze your requirements and begin building your AI solution</li>
                <li>• You'll receive a detailed proposal and demo access within 24 hours</li>
                <li>• We'll schedule your personalized demo session</li>
              </ul>
            </div>

            {/* Countdown Timer and Return Button */}
            <div className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/20 rounded-lg p-6">
              <div className="text-center">
                <h3 className="text-lg font-mono font-semibold mb-3 text-purple-400">
                  🏠 Returning to Home Page
                </h3>
                <p className="text-gray-300 font-mono mb-4">
                  You will be automatically redirected to the home page in <strong className="text-purple-300 text-xl">{countdown}</strong> seconds
                </p>
                <button
                  onClick={() => window.location.href = '/'}
                  className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-mono font-semibold rounded-lg transition-all duration-200 transform hover:scale-105"
                >
                  <Home className="w-5 h-5 mr-2" />
                  Return to Home Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0A0B1E] text-white pt-20">
      <div className="container mx-auto px-6 py-20">
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
              {/* Basic Information */}
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
                    Company *
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
                    <option value="">Select your industry</option>
                    <option value="agriculture">Agriculture & Farming</option>
                    <option value="aerospace">Aerospace & Defense</option>
                    <option value="automotive">Automotive</option>
                    <option value="aviation">Aviation</option>
                    <option value="banking">Banking & Financial Services</option>
                    <option value="chemicals">Chemicals</option>
                    <option value="construction">Construction & Engineering</option>
                    <option value="cybersecurity">Cybersecurity</option>
                    <option value="education">Education</option>
                    <option value="energy">Energy & Utilities</option>
                    <option value="entertainment">Entertainment & Media</option>
                    <option value="food-beverage">Food & Beverage</option>
                    <option value="government">Government & Public Sector</option>
                    <option value="healthcare">Healthcare & Medical</option>
                    <option value="hospitality">Hospitality & Tourism</option>
                    <option value="information-technology">Information Technology</option>
                    <option value="insurance">Insurance</option>
                    <option value="logistics">Logistics & Transportation</option>
                    <option value="manufacturing">Manufacturing</option>
                    <option value="marine">Marine & Maritime</option>
                    <option value="mining">Mining & Metals</option>
                    <option value="oil-gas">Oil & Gas</option>
                    <option value="pharmaceutical">Pharmaceutical & Biotech</option>
                    <option value="real-estate">Real Estate</option>
                    <option value="retail">Retail & E-commerce</option>
                    <option value="security">Security & Surveillance</option>
                    <option value="telecommunications">Telecommunications</option>
                    <option value="textiles">Textiles & Apparel</option>
                    <option value="water-wastewater">Water & Wastewater</option>
                    <option value="other">Other</option>
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
                    <option value="Demo Request Only - Evaluation Phase">Demo Request Only - Evaluation Phase</option>
                    <option value="Full Consultation - Implementation Ready">Full Consultation - Implementation Ready</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-mono font-medium text-gray-300 mb-2">
                  What does your business/division do? *
                </label>
                <textarea
                  value={formData.businessDescription}
                  onChange={(e) => handleInputChange('businessDescription', e.target.value)}
                  required
                  rows={4}
                  className="w-full p-3 bg-gray-800/50 border border-cyan-500/30 rounded-lg text-white font-mono focus:outline-none focus:border-cyan-400"
                  placeholder="Describe what your business or division does, your main operations, and core activities"
                />
              </div>

              <div>
                <label className="block text-sm font-mono font-medium text-gray-300 mb-2">
                  Current Pain Points & Challenges
                </label>
                <textarea
                  value={formData.currentChallenges}
                  onChange={(e) => handleInputChange('currentChallenges', e.target.value)}
                  rows={4}
                  className="w-full p-3 bg-gray-800/50 border border-orange-500/30 rounded-lg text-white font-mono focus:outline-none focus:border-orange-400"
                  placeholder="Describe the specific pain points, inefficiencies, or challenges you're currently facing"
                />
              </div>

              <div>
                <label className="block text-sm font-mono font-medium text-gray-300 mb-2">
                  Equipment, Systems & Technical Details
                </label>
                <textarea
                  value={formData.teamSize}
                  onChange={(e) => handleInputChange('teamSize', e.target.value)}
                  rows={4}
                  className="w-full p-3 bg-gray-800/50 border border-green-500/30 rounded-lg text-white font-mono focus:outline-none focus:border-green-400"
                  placeholder="Describe your equipment, systems, software, processes, and any technical specifications relevant to your operations"
                />
              </div>


              {/* AI Agent Personality & Communication Fields */}
              <div className="border-t border-cyan-500/20 pt-8">
                <h4 className="text-xl font-mono font-bold mb-6 text-pink-400">
                  AI Agent Personality & Communication
                </h4>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-mono font-medium text-gray-300 mb-2">
                      Agent Personality
                    </label>
                    <select
                      value={formData.agentPersonality}
                      onChange={(e) => handleInputChange('agentPersonality', e.target.value)}
                      className="w-full p-3 bg-gray-800/50 border border-pink-500/30 rounded-lg text-white font-mono focus:outline-none focus:border-pink-400"
                    >
                      <option value="">Select agent personality</option>
                      <option value="professional">Professional & Formal</option>
                      <option value="friendly">Friendly & Approachable</option>
                      <option value="expert">Expert & Authoritative</option>
                      <option value="collaborative">Collaborative & Supportive</option>
                      <option value="analytical">Analytical & Methodical</option>
                      <option value="innovative">Innovative & Creative</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-mono font-medium text-gray-300 mb-2">
                      Communication Style
                    </label>
                    <select
                      value={formData.communicationStyle}
                      onChange={(e) => handleInputChange('communicationStyle', e.target.value)}
                      className="w-full p-3 bg-gray-800/50 border border-pink-500/30 rounded-lg text-white font-mono focus:outline-none focus:border-pink-400"
                    >
                      <option value="">Select communication style</option>
                      <option value="concise">Concise & Direct</option>
                      <option value="detailed">Detailed & Comprehensive</option>
                      <option value="conversational">Conversational & Natural</option>
                      <option value="technical">Technical & Precise</option>
                      <option value="educational">Educational & Explanatory</option>
                      <option value="collaborative">Collaborative & Interactive</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-mono font-medium text-gray-300 mb-2">
                      Technical Level
                    </label>
                    <select
                      value={formData.technicalLevel}
                      onChange={(e) => handleInputChange('technicalLevel', e.target.value)}
                      className="w-full p-3 bg-gray-800/50 border border-pink-500/30 rounded-lg text-white font-mono focus:outline-none focus:border-pink-400"
                    >
                      <option value="">Select technical level</option>
                      <option value="beginner">Beginner - Basic concepts</option>
                      <option value="intermediate">Intermediate - Some technical knowledge</option>
                      <option value="advanced">Advanced - Deep technical expertise</option>
                      <option value="expert">Expert - Industry specialist level</option>
                      <option value="mixed">Mixed - Adapt to user level</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-mono font-medium text-gray-300 mb-2">
                      Problem Solving Approach
                    </label>
                    <select
                      value={formData.problemSolvingApproach}
                      onChange={(e) => handleInputChange('problemSolvingApproach', e.target.value)}
                      className="w-full p-3 bg-gray-800/50 border border-pink-500/30 rounded-lg text-white font-mono focus:outline-none focus:border-pink-400"
                    >
                      <option value="">Select problem solving approach</option>
                      <option value="systematic">Systematic & Step-by-step</option>
                      <option value="diagnostic">Diagnostic & Troubleshooting</option>
                      <option value="creative">Creative & Out-of-the-box</option>
                      <option value="data-driven">Data-driven & Analytical</option>
                      <option value="collaborative">Collaborative & Team-based</option>
                      <option value="adaptive">Adaptive & Flexible</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-mono font-medium text-gray-300 mb-2">
                      Response Tone
                    </label>
                    <select
                      value={formData.responseTone}
                      onChange={(e) => handleInputChange('responseTone', e.target.value)}
                      className="w-full p-3 bg-gray-800/50 border border-pink-500/30 rounded-lg text-white font-mono focus:outline-none focus:border-pink-400"
                    >
                      <option value="">Select response tone</option>
                      <option value="confident">Confident & Assured</option>
                      <option value="helpful">Helpful & Supportive</option>
                      <option value="encouraging">Encouraging & Motivational</option>
                      <option value="neutral">Neutral & Objective</option>
                      <option value="empathetic">Empathetic & Understanding</option>
                      <option value="enthusiastic">Enthusiastic & Energetic</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-mono font-medium text-gray-300 mb-2">
                      Expertise Level
                    </label>
                    <select
                      value={formData.expertiseLevel}
                      onChange={(e) => handleInputChange('expertiseLevel', e.target.value)}
                      className="w-full p-3 bg-gray-800/50 border border-pink-500/30 rounded-lg text-white font-mono focus:outline-none focus:border-pink-400"
                    >
                      <option value="">Select expertise level</option>
                      <option value="junior">Junior Level - 1-3 years</option>
                      <option value="mid-level">Mid-Level - 3-7 years</option>
                      <option value="senior">Senior Level - 7-15 years</option>
                      <option value="expert">Expert Level - 15+ years</option>
                      <option value="specialist">Specialist - Deep domain expertise</option>
                    </select>
                  </div>

                </div>
              </div>

              {/* Research Focus & Demo Type Fields */}
              <div className="border-t border-cyan-500/20 pt-8">
                <h4 className="text-xl font-mono font-bold mb-6 text-purple-400">
                  Research Focus & Demo Type
                </h4>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                      <option value="equipment-reliability">Equipment Reliability & Performance</option>
                      <option value="maintenance-optimization">Maintenance Optimization</option>
                      <option value="predictive-analytics">Predictive Analytics & Forecasting</option>
                      <option value="troubleshooting-methods">Troubleshooting & Diagnostics</option>
                      <option value="compliance-safety">Compliance & Safety Standards</option>
                      <option value="cost-optimization">Cost Optimization & Efficiency</option>
                      <option value="training-knowledge">Training & Knowledge Transfer</option>
                      <option value="customer-experience">Customer Experience & Support</option>
                      <option value="data-integration">Data Integration & Analysis</option>
                      <option value="process-improvement">Process Improvement & Innovation</option>
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
                      <option value="overview">Overview - High-level understanding</option>
                      <option value="intermediate">Intermediate - Detailed analysis</option>
                      <option value="comprehensive">Comprehensive - Deep technical dive</option>
                      <option value="expert-level">Expert Level - Advanced research</option>
                      <option value="custom">Custom - Specific requirements</option>
                    </select>
                  </div>
                </div>

                <div className="mt-6">
                  <label className="block text-sm font-mono font-medium text-gray-300 mb-2">
                    Demo Type *
                  </label>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <label className="flex items-center p-4 bg-gray-800/30 border border-purple-500/30 rounded-lg cursor-pointer hover:bg-gray-700/30 transition-colors">
                      <input
                        type="radio"
                        name="demoType"
                        value="voice-agent"
                        checked={formData.demoType === 'voice-agent'}
                        onChange={(e) => handleInputChange('demoType', e.target.value)}
                        className="mr-3 text-purple-500 focus:ring-purple-400"
                      />
                      <div>
                        <div className="font-mono font-semibold text-purple-300">Voice Agent</div>
                        <div className="text-sm text-gray-400 font-mono">AI-powered voice assistant for real-time interaction</div>
                      </div>
                    </label>

                    <label className="flex items-center p-4 bg-gray-800/30 border border-purple-500/30 rounded-lg cursor-pointer hover:bg-gray-700/30 transition-colors">
                      <input
                        type="radio"
                        name="demoType"
                        value="chatbot"
                        checked={formData.demoType === 'chatbot'}
                        onChange={(e) => handleInputChange('demoType', e.target.value)}
                        className="mr-3 text-purple-500 focus:ring-purple-400"
                      />
                      <div>
                        <div className="font-mono font-semibold text-purple-300">Chatbot</div>
                        <div className="text-sm text-gray-400 font-mono">Text-based AI assistant for messaging platforms</div>
                      </div>
                    </label>

                    <label className="flex items-center p-4 bg-gray-800/30 border border-purple-500/30 rounded-lg cursor-pointer hover:bg-gray-700/30 transition-colors">
                      <input
                        type="radio"
                        name="demoType"
                        value="customized-newsletter"
                        checked={formData.demoType === 'customized-newsletter'}
                        onChange={(e) => handleInputChange('demoType', e.target.value)}
                        className="mr-3 text-purple-500 focus:ring-purple-400"
                      />
                      <div>
                        <div className="font-mono font-semibold text-purple-300">Customized Newsletter</div>
                        <div className="text-sm text-gray-400 font-mono">AI-generated personalized content and reports</div>
                      </div>
                    </label>
                  </div>
                </div>

                <div className="mt-6">
                  <label className="block text-sm font-mono font-medium text-gray-300 mb-2">
                    Preferred Date & Time
                  </label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-mono font-medium text-gray-400 mb-2">
                        Preferred Date
                      </label>
                      <input
                        type="date"
                        value={formData.preferredDate}
                        onChange={(e) => handleInputChange('preferredDate', e.target.value)}
                        className="w-full p-3 bg-gray-800/50 border border-purple-500/30 rounded-lg text-white font-mono focus:outline-none focus:border-purple-400"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-mono font-medium text-gray-400 mb-2">
                        Preferred Time
                      </label>
                      <select
                        value={formData.preferredTime}
                        onChange={(e) => handleInputChange('preferredTime', e.target.value)}
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
                        <option value="flexible">Flexible - We'll coordinate</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>


              {/* Specializations Section */}
              <div className="border-t border-cyan-500/20 pt-8">
                <h4 className="text-xl font-mono font-bold mb-6 text-orange-400">
                  Specializations
                </h4>
                
                <div className="mb-6">
                  <p className="text-sm text-gray-400 font-mono mb-4">
                    Search and select the technical specializations your AI agent should focus on. Choose from electrical, mechanical, reliability, maintenance, and other areas.
                  </p>
                </div>

                <div className="space-y-4">
                  {/* Search Bar */}
                  <div className="relative">
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Type to search specializations (e.g., 'electrical', 'mechanical', 'reliability')..."
                      className="w-full p-4 bg-gray-800/50 border border-orange-500/30 rounded-lg text-white font-mono focus:outline-none focus:border-orange-400 pr-12"
                    />
                    <div className="absolute right-4 top-1/2 transform -translate-y-1/2 text-orange-400">
                      🔍
                    </div>
                  </div>

                  {/* Selected Specializations */}
                  {formData.rmeSpecializations.length > 0 && (
                    <div className="bg-orange-900/20 border border-orange-500/30 rounded-lg p-4">
                      <h5 className="text-sm font-mono font-semibold text-orange-300 mb-3">
                        Selected Specializations ({formData.rmeSpecializations.length}/12)
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
                      {formData.rmeSpecializations.length >= 12 && (
                        <p className="text-xs text-orange-400 font-mono mt-2">
                          Maximum of 12 specializations selected
                        </p>
                      )}
                    </div>
                  )}

                  {/* Specializations Dropdown - Only show when user is typing */}
                  {searchQuery.trim().length > 0 && (
                    <div className="bg-gray-800/30 border border-gray-600/30 rounded-lg p-4 max-h-96 overflow-y-auto">
                      <h5 className="text-sm font-mono font-semibold text-gray-300 mb-4">
                        Technical Specializations
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
                              {filteredSpecializations.map((specialization) => {
                                const isSelected = formData.rmeSpecializations.includes(specialization);
                                const canSelect = formData.rmeSpecializations.length < 12 || isSelected;
                                
                                return (
                                  <label key={specialization} className={`flex items-center p-2 rounded cursor-pointer ${
                                    canSelect ? 'hover:bg-gray-700/30' : 'opacity-50 cursor-not-allowed'
                                  }`}>
                                    <input
                                      type="checkbox"
                                      checked={isSelected}
                                      disabled={!canSelect}
                                      onChange={(e) => {
                                        if (e.target.checked && formData.rmeSpecializations.length < 12) {
                                          setFormData(prev => ({
                                            ...prev,
                                            rmeSpecializations: [...prev.rmeSpecializations, specialization]
                                          }));
                                        } else if (!e.target.checked) {
                                          setFormData(prev => ({
                                            ...prev,
                                            rmeSpecializations: prev.rmeSpecializations.filter(c => c !== specialization)
                                          }));
                                        }
                                      }}
                                      className="mr-3 text-orange-500 focus:ring-orange-400 disabled:opacity-50"
                                    />
                                    <span className="text-sm font-mono text-gray-300">{specialization}</span>
                                  </label>
                                );
                              })}
                            </div>
                          </div>
                        );
                      })}

                      {Object.values(mainSpecializations).flat().filter(s => getFilteredSpecializations([s], searchQuery).length > 0).length === 0 && searchQuery && (
                        <p className="text-sm text-gray-400 font-mono text-center py-4">
                          No specializations found for "{searchQuery}"
                        </p>
                      )}
                    </div>
                  )}

                  {/* Instructions when not searching */}
                  {searchQuery.trim().length === 0 && (
                    <div className="bg-gray-800/20 border border-gray-600/20 rounded-lg p-6 text-center">
                      <div className="text-4xl text-orange-400 mb-4">🔍</div>
                      <h5 className="text-lg font-mono font-semibold text-gray-300 mb-2">
                        Search for Specializations
                      </h5>
                      <p className="text-sm text-gray-400 font-mono">
                        Start typing to search and select up to 12 technical specializations for your AI agent.
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Document Upload Section */}
              <div className="border-t border-cyan-500/20 pt-8">
                <h4 className="text-xl font-mono font-bold mb-6 text-green-400">
                  Document Upload
                </h4>
                
                <div className="space-y-4">
                  <p className="text-sm text-gray-400 font-mono mb-4">
                    Upload relevant documents to help us understand your requirements better. Supported formats: PDF, DOC, DOCX, TXT, XLS, XLSX, PPT, PPTX (Max 10MB each)
                  </p>
                  
                  {/* File Upload Area */}
                  <div
                    className={`relative border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                      dragActive
                        ? 'border-green-400 bg-green-900/20'
                        : 'border-green-500/30 hover:border-green-400/50'
                    }`}
                    onDragEnter={handleDragEnter}
                    onDragLeave={handleDragLeave}
                    onDragOver={handleDragOver}
                    onDrop={handleDrop}
                  >
                    <input
                      type="file"
                      multiple
                      onChange={handleFileChange}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                      accept=".pdf,.doc,.docx,.txt,.xls,.xlsx,.ppt,.pptx"
                    />
                    <div className="space-y-4">
                      <div className="text-4xl text-green-400">
                        <Upload className="mx-auto" />
                      </div>
                      <div>
                        <p className="text-lg font-mono font-semibold text-green-300">
                          Drop files here or click to upload
                        </p>
                        <p className="text-sm text-gray-400 font-mono mt-2">
                          PDF, DOC, DOCX, TXT, XLS, XLSX, PPT, PPTX files
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Uploaded Files List */}
                  {uploadedFiles.length > 0 && (
                    <div className="bg-green-900/20 border border-green-500/30 rounded-lg p-4">
                      <h5 className="text-sm font-mono font-semibold text-green-300 mb-3">
                        Uploaded Files ({uploadedFiles.length})
                      </h5>
                      <div className="space-y-2">
                        {uploadedFiles.map((file, index) => (
                          <div
                            key={index}
                            className="flex items-center justify-between p-3 bg-gray-800/30 rounded-lg"
                          >
                            <div className="flex items-center space-x-3">
                              <FileText className="text-green-400" size={20} />
                              <div>
                                <p className="text-sm font-mono text-gray-300">
                                  {file.name}
                                </p>
                                <p className="text-xs text-gray-400 font-mono">
                                  {(file.size / 1024 / 1024).toFixed(2)} MB
                                </p>
                              </div>
                            </div>
                            <button
                              onClick={() => {
                                setUploadedFiles(prev => prev.filter((_, i) => i !== index));
                              }}
                              className="text-red-400 hover:text-red-300 transition-colors"
                            >
                              <X size={16} />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Submit Button */}
              <div className="text-center pt-8">
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
                    <Brain className="w-5 h-5 mr-2" />
                    Request Demo
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </div>
                </button>
                <p className="text-xs text-gray-400 mt-2">
                  Form Valid: {isFormValid ? 'Yes' : 'No'}
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DemoTest;
