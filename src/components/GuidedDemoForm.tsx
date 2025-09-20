import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ArrowLeft, CheckCircle, Brain, User, Building, Phone, Calendar, FileText, Upload, MessageSquare, Bot, Globe, Settings, Target, Home } from 'lucide-react';

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

// Industry-specific demo options
const getIndustrySpecificDemos = (industry: string) => {
  const demoOptions = {
    // Field Service Operations
    'field-service-technical': [
      { value: 'field-technician-support', label: 'Field Technician Support - AI assistant for technicians in the field' },
      { value: 'equipment-troubleshooting', label: 'Equipment Troubleshooting - AI-powered diagnostic assistance' },
      { value: 'service-call-optimization', label: 'Service Call Optimization - AI for scheduling and routing' },
      { value: 'preventive-maintenance', label: 'Preventive Maintenance - AI for maintenance scheduling and alerts' },
      { value: 'emergency-response', label: 'Emergency Response - AI for urgent service calls' },
      { value: 'quality-inspection', label: 'Quality Inspection - AI for service quality monitoring' }
    ],
    'equipment-maintenance': [
      { value: 'maintenance-scheduling', label: 'Maintenance Scheduling - AI for equipment maintenance planning' },
      { value: 'predictive-maintenance', label: 'Predictive Maintenance - AI for failure prediction' },
      { value: 'parts-management', label: 'Parts Management - AI for inventory and parts ordering' },
      { value: 'work-order-tracking', label: 'Work Order Tracking - AI for job management' },
      { value: 'equipment-diagnostics', label: 'Equipment Diagnostics - AI for technical troubleshooting' },
      { value: 'compliance-monitoring', label: 'Compliance Monitoring - AI for safety and regulatory compliance' }
    ],
    'technical-support': [
      { value: 'troubleshooting-assistant', label: 'Troubleshooting Assistant - AI for technical problem solving' },
      { value: 'knowledge-base', label: 'Knowledge Base - AI for technical documentation access' },
      { value: 'remote-diagnostics', label: 'Remote Diagnostics - AI for remote technical support' },
      { value: 'escalation-management', label: 'Escalation Management - AI for support ticket routing' },
      { value: 'training-assistant', label: 'Training Assistant - AI for technician training' },
      { value: 'performance-analytics', label: 'Performance Analytics - AI for support metrics' }
    ],
    'emergency-response': [
      { value: 'emergency-dispatch', label: 'Emergency Dispatch - AI for urgent call management' },
      { value: 'priority-routing', label: 'Priority Routing - AI for emergency response optimization' },
      { value: 'resource-allocation', label: 'Resource Allocation - AI for emergency resource management' },
      { value: 'status-tracking', label: 'Status Tracking - AI for real-time emergency monitoring' },
      { value: 'communication-coordination', label: 'Communication Coordination - AI for emergency communications' },
      { value: 'incident-documentation', label: 'Incident Documentation - AI for emergency reporting' }
    ],
    // Engineering & Manufacturing
    'engineering-design': [
      { value: 'cad-integration', label: 'CAD Integration - AI for design assistance and optimization' },
      { value: 'technical-documentation', label: 'Technical Documentation - AI for engineering documentation' },
      { value: 'design-validation', label: 'Design Validation - AI for design review and validation' },
      { value: 'standards-compliance', label: 'Standards Compliance - AI for engineering standards' },
      { value: 'project-management', label: 'Project Management - AI for engineering project coordination' },
      { value: 'innovation-assistant', label: 'Innovation Assistant - AI for design innovation and R&D' }
    ],
    'manufacturing-operations': [
      { value: 'production-optimization', label: 'Production Optimization - AI for manufacturing efficiency' },
      { value: 'quality-control', label: 'Quality Control - AI for manufacturing quality assurance' },
      { value: 'supply-chain-integration', label: 'Supply Chain Integration - AI for manufacturing logistics' },
      { value: 'equipment-monitoring', label: 'Equipment Monitoring - AI for production line monitoring' },
      { value: 'safety-compliance', label: 'Safety Compliance - AI for manufacturing safety' },
      { value: 'performance-analytics', label: 'Performance Analytics - AI for production metrics' }
    ],
    'technical-documentation': [
      { value: 'document-generation', label: 'Document Generation - AI for technical writing' },
      { value: 'knowledge-management', label: 'Knowledge Management - AI for technical knowledge base' },
      { value: 'version-control', label: 'Version Control - AI for document versioning' },
      { value: 'collaboration-tools', label: 'Collaboration Tools - AI for technical team collaboration' },
      { value: 'compliance-tracking', label: 'Compliance Tracking - AI for documentation compliance' },
      { value: 'search-optimization', label: 'Search Optimization - AI for technical document search' }
    ],
    'cad-integration': [
      { value: 'design-automation', label: 'Design Automation - AI for CAD workflow automation' },
      { value: 'model-optimization', label: 'Model Optimization - AI for CAD model optimization' },
      { value: 'collaboration-platform', label: 'Collaboration Platform - AI for CAD team collaboration' },
      { value: 'version-management', label: 'Version Management - AI for CAD version control' },
      { value: 'standards-integration', label: 'Standards Integration - AI for CAD standards compliance' },
      { value: 'rendering-assistance', label: 'Rendering Assistance - AI for CAD visualization' }
    ],
    // Logistics & Supply Chain
    'logistics-optimization': [
      { value: 'route-optimization', label: 'Route Optimization - AI for delivery route planning' },
      { value: 'fleet-management', label: 'Fleet Management - AI for vehicle and driver management' },
      { value: 'delivery-tracking', label: 'Delivery Tracking - AI for shipment monitoring' },
      { value: 'capacity-planning', label: 'Capacity Planning - AI for logistics capacity optimization' },
      { value: 'cost-optimization', label: 'Cost Optimization - AI for logistics cost reduction' },
      { value: 'performance-monitoring', label: 'Performance Monitoring - AI for logistics metrics' }
    ],
    'inventory-management': [
      { value: 'stock-optimization', label: 'Stock Optimization - AI for inventory level management' },
      { value: 'demand-forecasting', label: 'Demand Forecasting - AI for inventory demand prediction' },
      { value: 'reorder-automation', label: 'Reorder Automation - AI for automated reordering' },
      { value: 'warehouse-optimization', label: 'Warehouse Optimization - AI for warehouse operations' },
      { value: 'supplier-management', label: 'Supplier Management - AI for vendor coordination' },
      { value: 'cost-analysis', label: 'Cost Analysis - AI for inventory cost optimization' }
    ],
    'fleet-management': [
      { value: 'vehicle-tracking', label: 'Vehicle Tracking - AI for fleet monitoring' },
      { value: 'maintenance-scheduling', label: 'Maintenance Scheduling - AI for fleet maintenance' },
      { value: 'driver-management', label: 'Driver Management - AI for driver coordination' },
      { value: 'fuel-optimization', label: 'Fuel Optimization - AI for fuel efficiency' },
      { value: 'safety-monitoring', label: 'Safety Monitoring - AI for fleet safety' },
      { value: 'compliance-tracking', label: 'Compliance Tracking - AI for fleet compliance' }
    ],
    'supply-chain': [
      { value: 'supplier-coordination', label: 'Supplier Coordination - AI for vendor management' },
      { value: 'demand-planning', label: 'Demand Planning - AI for supply chain forecasting' },
      { value: 'risk-management', label: 'Risk Management - AI for supply chain risk assessment' },
      { value: 'cost-optimization', label: 'Cost Optimization - AI for supply chain cost reduction' },
      { value: 'visibility-tracking', label: 'Visibility Tracking - AI for supply chain transparency' },
      { value: 'performance-analytics', label: 'Performance Analytics - AI for supply chain metrics' }
    ],
    // IT & Technology
    'it-operations': [
      { value: 'system-monitoring', label: 'System Monitoring - AI for IT infrastructure monitoring' },
      { value: 'incident-management', label: 'Incident Management - AI for IT incident response' },
      { value: 'automation-tools', label: 'Automation Tools - AI for IT process automation' },
      { value: 'security-monitoring', label: 'Security Monitoring - AI for cybersecurity' },
      { value: 'performance-optimization', label: 'Performance Optimization - AI for IT performance' },
      { value: 'compliance-management', label: 'Compliance Management - AI for IT compliance' }
    ],
    'software-development': [
      { value: 'code-assistance', label: 'Code Assistance - AI for development support' },
      { value: 'testing-automation', label: 'Testing Automation - AI for software testing' },
      { value: 'deployment-management', label: 'Deployment Management - AI for deployment automation' },
      { value: 'bug-tracking', label: 'Bug Tracking - AI for issue management' },
      { value: 'documentation-generation', label: 'Documentation Generation - AI for code documentation' },
      { value: 'performance-analysis', label: 'Performance Analysis - AI for code performance' }
    ],
    'system-integration': [
      { value: 'api-management', label: 'API Management - AI for API integration' },
      { value: 'data-synchronization', label: 'Data Synchronization - AI for data integration' },
      { value: 'workflow-automation', label: 'Workflow Automation - AI for process integration' },
      { value: 'monitoring-dashboard', label: 'Monitoring Dashboard - AI for integration monitoring' },
      { value: 'error-handling', label: 'Error Handling - AI for integration error management' },
      { value: 'scalability-management', label: 'Scalability Management - AI for integration scaling' }
    ],
    'cybersecurity': [
      { value: 'threat-detection', label: 'Threat Detection - AI for security threat monitoring' },
      { value: 'incident-response', label: 'Incident Response - AI for security incident management' },
      { value: 'compliance-monitoring', label: 'Compliance Monitoring - AI for security compliance' },
      { value: 'vulnerability-assessment', label: 'Vulnerability Assessment - AI for security scanning' },
      { value: 'access-management', label: 'Access Management - AI for user access control' },
      { value: 'security-analytics', label: 'Security Analytics - AI for security metrics' }
    ]
  };

  // Return specific demos for the industry, or default demos if not found
  return demoOptions[industry as keyof typeof demoOptions] || [
    { value: 'general-ai-assistant', label: 'General AI Assistant - AI for business automation' },
    { value: 'workflow-optimization', label: 'Workflow Optimization - AI for process improvement' },
    { value: 'data-analytics', label: 'Data Analytics - AI for business intelligence' },
    { value: 'customer-support', label: 'Customer Support - AI for customer service' },
    { value: 'document-management', label: 'Document Management - AI for document processing' },
    { value: 'reporting-automation', label: 'Reporting Automation - AI for automated reporting' }
  ];
};

// Dynamic technical specializations based on demo type and industry
const getDynamicSpecializations = (demoType: string, industry: string) => {
  const specializationGroups = {
    // Field Service Operations
    'field-service-technical': {
      'field-technician-support': [
        { category: 'Field Operations', items: ['Field Technician Support', 'Equipment Troubleshooting', 'Service Call Optimization', 'Emergency Response', 'Quality Inspection', 'Safety Compliance'] },
        { category: 'Technical Support', items: ['Remote Diagnostics', 'Technical Documentation', 'Parts Management', 'Warranty Services', 'Maintenance Scheduling', 'Performance Monitoring'] },
        { category: 'Customer Service', items: ['Customer Communication', 'Appointment Scheduling', 'Service History', 'Billing Support', 'Feedback Collection', 'Issue Resolution'] }
      ],
      'equipment-troubleshooting': [
        { category: 'Diagnostic Systems', items: ['Equipment Diagnostics', 'Predictive Maintenance', 'Failure Analysis', 'Root Cause Analysis', 'Technical Troubleshooting', 'System Monitoring'] },
        { category: 'Technical Resources', items: ['Technical Documentation', 'Knowledge Base', 'Service Manuals', 'Troubleshooting Guides', 'Parts Identification', 'Repair Procedures'] },
        { category: 'Support Tools', items: ['Remote Assistance', 'Video Support', 'Screen Sharing', 'Technical Chat', 'Escalation Management', 'Expert Consultation'] }
      ],
      'service-call-optimization': [
        { category: 'Scheduling & Routing', items: ['Route Optimization', 'Schedule Management', 'Resource Allocation', 'Capacity Planning', 'Time Management', 'Efficiency Tracking'] },
        { category: 'Field Operations', items: ['Dispatch Management', 'Field Coordination', 'Service Prioritization', 'Work Order Management', 'Status Tracking', 'Progress Monitoring'] },
        { category: 'Analytics & Reporting', items: ['Performance Analytics', 'Service Metrics', 'Cost Analysis', 'Efficiency Reports', 'Trend Analysis', 'KPI Tracking'] }
      ]
    },
    // Engineering & Manufacturing
    'engineering-design': {
      'cad-integration': [
        { category: 'Design Systems', items: ['CAD Integration', 'Design Automation', 'Model Optimization', 'Version Control', 'Collaboration Tools', 'Standards Compliance'] },
        { category: 'Engineering Workflows', items: ['Design Validation', 'Technical Documentation', 'Project Management', 'Quality Control', 'Change Management', 'Review Processes'] },
        { category: 'Technical Resources', items: ['Engineering Standards', 'Technical Specifications', 'Design Guidelines', 'Best Practices', 'Knowledge Management', 'Training Materials'] }
      ],
      'technical-documentation': [
        { category: 'Document Management', items: ['Technical Writing', 'Document Generation', 'Version Control', 'Knowledge Base', 'Search Optimization', 'Content Management'] },
        { category: 'Engineering Processes', items: ['Standards Compliance', 'Quality Documentation', 'Process Documentation', 'Procedure Management', 'Audit Support', 'Regulatory Compliance'] },
        { category: 'Collaboration', items: ['Team Collaboration', 'Review Processes', 'Approval Workflows', 'Change Management', 'Communication Tools', 'Project Coordination'] }
      ]
    },
    // Logistics & Supply Chain
    'logistics-optimization': {
      'route-optimization': [
        { category: 'Route Planning', items: ['Route Optimization', 'Delivery Planning', 'Fleet Management', 'Driver Coordination', 'Traffic Analysis', 'Fuel Optimization'] },
        { category: 'Supply Chain', items: ['Inventory Management', 'Warehouse Operations', 'Supplier Coordination', 'Demand Planning', 'Cost Optimization', 'Performance Monitoring'] },
        { category: 'Analytics', items: ['Logistics Analytics', 'Performance Metrics', 'Cost Analysis', 'Efficiency Tracking', 'Trend Analysis', 'Predictive Analytics'] }
      ],
      'fleet-management': [
        { category: 'Fleet Operations', items: ['Vehicle Tracking', 'Driver Management', 'Maintenance Scheduling', 'Fuel Management', 'Safety Monitoring', 'Compliance Tracking'] },
        { category: 'Logistics', items: ['Route Planning', 'Delivery Optimization', 'Load Management', 'Dispatch Coordination', 'Status Tracking', 'Performance Monitoring'] },
        { category: 'Analytics', items: ['Fleet Analytics', 'Cost Analysis', 'Efficiency Metrics', 'Safety Reports', 'Performance Tracking', 'Predictive Maintenance'] }
      ]
    },
    // IT & Technology
    'it-operations': {
      'system-monitoring': [
        { category: 'Infrastructure', items: ['System Monitoring', 'Performance Tracking', 'Resource Management', 'Capacity Planning', 'Health Monitoring', 'Alert Management'] },
        { category: 'Security', items: ['Security Monitoring', 'Threat Detection', 'Vulnerability Assessment', 'Access Management', 'Compliance Monitoring', 'Incident Response'] },
        { category: 'Operations', items: ['Automation Tools', 'Process Optimization', 'Workflow Management', 'Service Management', 'Change Management', 'Documentation'] }
      ],
      'cybersecurity': [
        { category: 'Security Operations', items: ['Threat Detection', 'Incident Response', 'Vulnerability Management', 'Security Monitoring', 'Risk Assessment', 'Compliance Management'] },
        { category: 'Access Control', items: ['Identity Management', 'Access Control', 'Authentication Systems', 'Authorization Management', 'User Provisioning', 'Security Policies'] },
        { category: 'Analytics', items: ['Security Analytics', 'Threat Intelligence', 'Risk Analysis', 'Compliance Reporting', 'Security Metrics', 'Forensic Analysis'] }
      ]
    }
  };

  // Get industry-specific specializations
  const industrySpecs = specializationGroups[industry as keyof typeof specializationGroups];
  if (industrySpecs && industrySpecs[demoType as keyof typeof industrySpecs]) {
    return industrySpecs[demoType as keyof typeof industrySpecs];
  }

  // Fallback to general specializations
  return [
    { category: 'Core Operations', items: ['Process Optimization', 'Workflow Automation', 'Performance Monitoring', 'Quality Control', 'Efficiency Management', 'Resource Optimization'] },
    { category: 'Technical Support', items: ['Technical Documentation', 'Knowledge Management', 'Troubleshooting', 'Remote Support', 'Training Systems', 'Expert Consultation'] },
    { category: 'Analytics & Reporting', items: ['Data Analytics', 'Performance Metrics', 'Trend Analysis', 'Predictive Analytics', 'Business Intelligence', 'Reporting Automation'] }
  ];
};

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
    title: 'Documents (Optional)', 
    icon: Upload, 
    description: 'Upload custom documents for your demo',
    color: 'indigo'
  },
  { 
    id: 7, 
    title: 'Review & Submit', 
    icon: CheckCircle, 
    description: 'Review your information and submit',
    color: 'emerald'
  }
];

const GuidedDemoForm: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [redirectCountdown, setRedirectCountdown] = useState(30);
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
    setFormData(prev => {
      const updatedData = { ...prev, [field]: value };
      
      // Reset demo type when industry changes
      if (field === 'industry') {
        updatedData.demoType = '';
      }
      
      return updatedData;
    });
  };

  // Countdown effect for auto-redirect
  useEffect(() => {
    if (isSubmitted && redirectCountdown > 0) {
      const timer = setTimeout(() => {
        setRedirectCountdown(redirectCountdown - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else if (isSubmitted && redirectCountdown === 0) {
      // Redirect to home page
      window.location.href = '/';
    }
  }, [isSubmitted, redirectCountdown]);


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
        return formData.name.length > 0 && 
               formData.email.length > 0 && 
               formData.company.length > 0 && 
               formData.phone.length > 0;
      case 2:
        return formData.industry.length > 0 && formData.businessDescription.length > 10;
      case 3:
        return formData.demoType.length > 0;
      case 4:
        return formData.agentPersonality.length > 0 && formData.communicationStyle.length > 0 && formData.technicalLevel.length > 0;
      case 5:
        return formData.rmeSpecializations.length > 0;
      case 6:
        return true; // Documents step is optional
      case 7:
        // For demo-only requests, scheduling is optional
        if (formData.consultationPackage === 'Demo Request Only - Evaluation Phase') {
          return true; // No scheduling required for demo-only
        }
        // For other packages, require scheduling
        return formData.preferredDate.length > 0 && formData.preferredTime.length > 0;
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
            
            <div className="bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-500/20 rounded-2xl p-8 mb-8">
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

            <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-4 mb-8">
              <p className="text-yellow-300 font-mono text-sm">
                <strong>Note:</strong> You will be automatically redirected to the home page in {redirectCountdown} seconds.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/"
                className="font-mono bg-gradient-to-r from-cyan-500 to-blue-500 px-8 py-4 rounded-full text-lg font-semibold hover:shadow-lg hover:shadow-cyan-500/20 transition-all transform hover:scale-105 flex items-center justify-center gap-2"
              >
                <Home className="w-5 h-5" />
                Return Home
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
                          Business Email Address *
                        </label>
                        <input
                          type="email"
                          value={formData.email}
                          onChange={(e) => updateFormData('email', e.target.value)}
                          required
                          className="w-full p-3 bg-gray-800/50 border border-cyan-500/30 rounded-lg text-white font-mono focus:outline-none focus:border-cyan-400"
                          placeholder="your.email@company.com"
                        />
                        <p className="text-xs text-gray-500 font-mono mt-1">
                          Enter your business email address
                        </p>
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
                  
                  {formData.industry && (
                    <div className="bg-purple-900/20 border border-purple-500/30 rounded-lg p-4 mb-6">
                      <div className="flex items-center gap-2 mb-2">
                        <Bot className="w-5 h-5 text-purple-400" />
                        <h4 className="font-mono font-semibold text-purple-300">
                          Industry-Specific Demo Options
                        </h4>
                      </div>
                      <p className="text-gray-300 font-mono text-sm">
                        Based on your selection of <strong>{formData.industry.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}</strong>, 
                        we've tailored the demo options to match your industry's specific needs and use cases.
                      </p>
                    </div>
                  )}
                    
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
                        {getIndustrySpecificDemos(formData.industry).map((demo) => (
                          <option key={demo.value} value={demo.value}>
                            {demo.label}
                          </option>
                        ))}
                      </select>
                      {formData.industry && (
                        <p className="text-xs text-gray-400 font-mono mt-1">
                          Demo options tailored for: {formData.industry.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                        </p>
                      )}
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
                    
                    {/* Context Information */}
                    {formData.demoType && formData.industry && (
                      <div className="bg-orange-900/20 border border-orange-500/30 rounded-lg p-4 mb-6">
                        <div className="flex items-center gap-2 mb-2">
                          <Target className="w-5 h-5 text-orange-400" />
                          <h4 className="font-mono font-semibold text-orange-300">
                            Specializations for Your Demo
                          </h4>
                        </div>
                        <p className="text-gray-300 font-mono text-sm">
                          Based on your <strong>{formData.demoType.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}</strong> demo 
                          in <strong>{formData.industry.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}</strong>, 
                          we've curated relevant technical specializations to enhance your AI solution.
                        </p>
                      </div>
                    )}

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                    </div>

                    <div>
                      <label className="block text-sm font-mono font-medium text-gray-300 mb-4">
                        Select Technical Specializations (select at least one) *
                      </label>
                      
                      {/* Dynamic Specializations */}
                      {formData.demoType && formData.industry ? (
                        <div className="space-y-6">
                          {getDynamicSpecializations(formData.demoType, formData.industry).map((group, groupIndex) => (
                            <div key={groupIndex} className="bg-gray-800/20 border border-orange-500/20 rounded-lg p-4">
                              <h5 className="font-mono font-semibold text-orange-300 mb-3 text-sm">
                                {group.category}
                              </h5>
                              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
                                {group.items.map((specialization) => (
                                  <label key={specialization} className="flex items-center p-2 bg-gray-700/30 rounded hover:bg-gray-700/50 transition-colors cursor-pointer">
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
                                      className="mr-2 text-orange-500 focus:ring-orange-400"
                                    />
                                    <span className="text-xs font-mono text-gray-300">{specialization}</span>
                                  </label>
                                ))}
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="bg-gray-800/20 border border-orange-500/20 rounded-lg p-6 text-center">
                          <p className="text-gray-400 font-mono text-sm">
                            Please complete the previous steps to see relevant technical specializations for your demo.
                          </p>
                        </div>
                      )}

                      {/* Selected Specializations Summary */}
                      {formData.rmeSpecializations.length > 0 && (
                        <div className="mt-4 bg-orange-900/20 border border-orange-500/30 rounded-lg p-4">
                          <h5 className="font-mono font-semibold text-orange-300 mb-2 text-sm">
                            Selected Specializations ({formData.rmeSpecializations.length})
                          </h5>
                          <div className="flex flex-wrap gap-2">
                            {formData.rmeSpecializations.map((specialization) => (
                              <span
                                key={specialization}
                                className="inline-flex items-center px-2 py-1 bg-orange-600/20 border border-orange-500/30 rounded text-xs font-mono text-orange-300"
                              >
                                {specialization}
                                <button
                                  onClick={() => {
                                    updateFormData('rmeSpecializations', formData.rmeSpecializations.filter(s => s !== specialization));
                                  }}
                                  className="ml-1 text-orange-400 hover:text-orange-300"
                                >
                                  ✕
                                </button>
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Step 6: Document Upload */}
                {currentStep === 6 && (
                  <div className="space-y-6">
                    <h3 className="text-2xl font-mono font-bold mb-6 text-indigo-400">
                      Document Upload (Optional)
                    </h3>
                    
                    <div className="bg-indigo-900/20 border border-indigo-500/30 rounded-lg p-6">
                      <h4 className="text-lg font-mono font-semibold text-indigo-300 mb-4">
                        📋 Upload Custom Documents for Your Demo
                      </h4>
                      <p className="text-gray-300 font-mono text-sm mb-4">
                        Upload documents that you'd like your AI demo to have knowledge about. This helps us create a more personalized and relevant demo experience.
                      </p>
                      
                      <div className="space-y-4">
                        <div
                          className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                            formData.uploadedFiles.length > 0
                              ? 'border-indigo-400 bg-indigo-400/10'
                              : 'border-indigo-500/30 hover:border-indigo-500/50'
                          }`}
                        >
                          <Upload className="w-12 h-12 text-indigo-400 mx-auto mb-4" />
                          <p className="text-lg font-mono text-gray-300 mb-2">
                            {formData.uploadedFiles.length > 0 
                              ? `${formData.uploadedFiles.length} file(s) uploaded`
                              : 'Drag and drop files here or click to browse'
                            }
                          </p>
                          <p className="text-sm text-gray-400 mb-4">
                            Supported formats: PDF, DOC, DOCX, TXT, MD, CSV, XLSX, PPTX
                          </p>
                          <input
                            type="file"
                            multiple
                            accept=".pdf,.doc,.docx,.txt,.md,.csv,.xlsx,.pptx"
                            onChange={(e) => {
                              if (e.target.files) {
                                const newFiles = Array.from(e.target.files);
                                updateFormData('uploadedFiles', [...formData.uploadedFiles, ...newFiles]);
                              }
                            }}
                            className="hidden"
                            id="file-upload"
                          />
                          <label
                            htmlFor="file-upload"
                            className="inline-block px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-mono rounded-lg cursor-pointer transition-colors"
                          >
                            Choose Files
                          </label>
                        </div>

                        {/* Uploaded Files List */}
                        {formData.uploadedFiles.length > 0 && (
                          <div className="space-y-2">
                            <h5 className="text-sm font-mono font-semibold text-indigo-300">
                              Uploaded Files ({formData.uploadedFiles.length})
                            </h5>
                            {formData.uploadedFiles.map((file, index) => (
                              <div
                                key={index}
                                className="flex items-center justify-between bg-gray-800/50 rounded-lg p-3"
                              >
                                <div className="flex items-center space-x-3">
                                  <FileText className="w-4 h-4 text-indigo-400" />
                                  <div>
                                    <p className="text-sm font-mono text-gray-300">{file.name}</p>
                                    <p className="text-xs text-gray-400">
                                      {(file.size / 1024 / 1024).toFixed(2)} MB
                                    </p>
                                  </div>
                                </div>
                                <button
                                  onClick={() => {
                                    const newFiles = formData.uploadedFiles.filter((_, i) => i !== index);
                                    updateFormData('uploadedFiles', newFiles);
                                  }}
                                  className="text-red-400 hover:text-red-300 transition-colors"
                                >
                                  ✕
                                </button>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="bg-blue-900/20 border border-blue-500/30 rounded-lg p-6">
                      <h5 className="text-lg font-mono font-semibold text-blue-400 mb-4">
                        💡 Recommended Documents
                      </h5>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm font-mono">
                        <div>
                          <h6 className="font-semibold text-blue-300 mb-2">✅ Good to Upload:</h6>
                          <ul className="text-gray-300 space-y-1">
                            <li>• Equipment manuals & specifications</li>
                            <li>• Service procedures & workflows</li>
                            <li>• Training materials & guides</li>
                            <li>• Company policies & standards</li>
                            <li>• Technical documentation</li>
                            <li>• FAQ documents</li>
                          </ul>
                        </div>
                        <div>
                          <h6 className="font-semibold text-red-300 mb-2">⚠️ Avoid Uploading:</h6>
                          <ul className="text-gray-300 space-y-1">
                            <li>• Personal or sensitive data</li>
                            <li>• Financial records</li>
                            <li>• Customer information</li>
                            <li>• Proprietary trade secrets</li>
                            <li>• Copyrighted materials</li>
                          </ul>
                        </div>
                      </div>
                    </div>

                    <div className="text-center">
                      <p className="text-gray-400 font-mono text-sm">
                        This step is optional. You can skip it and proceed to review your information.
                      </p>
                    </div>
                  </div>
                )}

                {/* Step 7: Review */}
                {currentStep === 7 && (
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

                      {formData.uploadedFiles.length > 0 && (
                        <div className="bg-gray-800/30 rounded-lg p-4">
                          <h4 className="font-mono font-semibold text-indigo-300 mb-2">Uploaded Documents ({formData.uploadedFiles.length})</h4>
                          <ul className="text-gray-300 font-mono space-y-1">
                            {formData.uploadedFiles.map((file, index) => (
                              <li key={index}>• {file.name} ({(file.size / 1024 / 1024).toFixed(2)} MB)</li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {formData.consultationPackage !== 'Demo Request Only - Evaluation Phase' && (
                        <div className="bg-gray-800/30 rounded-lg p-4">
                          <h4 className="font-mono font-semibold text-purple-300 mb-2">Scheduling</h4>
                          <p className="text-gray-300 font-mono">Preferred Date: {formData.preferredDate || 'Not specified'}</p>
                          <p className="text-gray-300 font-mono">Preferred Time: {formData.preferredTime || 'Not specified'}</p>
                        </div>
                      )}
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
