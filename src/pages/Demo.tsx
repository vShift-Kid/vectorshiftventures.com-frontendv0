import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { MessageSquare, Brain, Calendar, CheckCircle, ArrowRight, Phone, Users, Gift, Bot, Globe, FileText, Zap, Search } from 'lucide-react';

const Demo: React.FC = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);

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
    demoType: ''
  });

  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [dragActive, setDragActive] = useState(false);

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
      updatedFormData.industry !== '' &&
      updatedFormData.consultationPackage !== '' &&
      updatedFormData.businessDescription.length > 20 &&
      updatedFormData.useCase !== '' &&
      updatedFormData.targetUsers !== '' &&
      updatedFormData.languageStyle !== '' &&
      updatedFormData.interactionMode !== '' &&
      updatedFormData.industryContext !== '' &&
      updatedFormData.businessRole !== '' &&
      updatedFormData.teamSize !== '' &&
      updatedFormData.currentChallenges.length > 10 &&
      updatedFormData.researchFocus !== '' &&
      updatedFormData.demoType !== '' &&
      (isDemoOnly || (updatedFormData.preferredDate.length > 0 && updatedFormData.preferredTime.length > 0))
    );
  };

  const handleFileUpload = (files: FileList | null) => {
    if (!files) return;
    
    const newFiles = Array.from(files);
    const totalSize = newFiles.reduce((acc, file) => acc + file.size, 0);
    const maxSize = 50 * 1024 * 1024; // 50MB limit per file
    const maxTotalSize = 100 * 1024 * 1024; // 100MB total limit
    
    // Check individual file size
    const oversizedFiles = newFiles.filter(file => file.size > maxSize);
    if (oversizedFiles.length > 0) {
      alert(`The following files exceed the 50MB limit: ${oversizedFiles.map(f => f.name).join(', ')}`);
      return;
    }
    
    // Check total size
    const currentTotalSize = uploadedFiles.reduce((acc, file) => acc + file.size, 0);
    if (currentTotalSize + totalSize > maxTotalSize) {
      alert('Total file size would exceed 100MB limit. Please select smaller files.');
      return;
    }
    
    setUploadedFiles(prev => [...prev, ...newFiles]);
  };

  const removeFile = (index: number) => {
    setUploadedFiles(prev => prev.filter((_, i) => i !== index));
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
      handleFileUpload(e.dataTransfer.files);
    }
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
          type: file.type,
          lastModified: file.lastModified
        })),
        source: 'vectorshiftventures-demo-page',
        submittedAt: new Date().toISOString()
      };

      // Send FormData with JSON and files to n8n webhook
      console.log('Submitting to n8n webhook for Supabase integration...');
      console.log('Webhook data:', webhookData);
      console.log('Uploaded files:', uploadedFiles);
      
      // Create FormData for file upload
      const formDataToSend = new FormData();
      formDataToSend.append('webhookData', JSON.stringify(webhookData));
      
      // Add files to FormData
      uploadedFiles.forEach((file, index) => {
        formDataToSend.append(`file_${index}`, file);
      });
      
      const response = await fetch('https://vectorshift-n8n-ventures.onrender.com/webhook/vectorshift-consultation-enhanced-fixed', {
        method: 'POST',
        body: formDataToSend
      });

      console.log('Response status:', response.status);
      console.log('Response headers:', response.headers);
      
      if (response.ok) {
        const responseData = await response.text();
        console.log('Demo request submitted successfully to n8n webhook');
        console.log('Response data:', responseData);
        setIsSubmitted(true);
      } else {
        console.error('Failed to submit demo request to webhook');
        const errorText = await response.text();
        console.error('Error response:', errorText);
        console.error('Response status:', response.status);
        console.error('Response statusText:', response.statusText);
        alert('Failed to submit form. Please try again or contact support.');
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
                : `Thank you, ${formData.name}. We've received your demo request for ${formData.preferredDate} at ${formData.preferredTime}. We'll contact you within 24 hours to confirm your appointment and discuss your business automation needs.`
              }
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
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              <div className="flex items-center bg-gradient-to-b from-cyan-500/10 to-transparent border border-cyan-500/20 rounded-xl p-4">
                <Brain className="w-8 h-8 text-cyan-400 mr-3" />
                <span className="font-mono text-sm">Custom AI Solutions</span>
              </div>
              <div className="flex items-center bg-gradient-to-b from-cyan-500/10 to-transparent border border-cyan-500/20 rounded-xl p-4">
                <Calendar className="w-8 h-8 text-cyan-400 mr-3" />
                <span className="font-mono text-sm">24-48 Hour Delivery</span>
              </div>
              <div className="flex items-center bg-gradient-to-b from-cyan-500/10 to-transparent border border-cyan-500/20 rounded-xl p-4">
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
                      Business Email *
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      required
                      className="w-full p-3 bg-gray-800/50 border border-cyan-500/30 rounded-lg text-white font-mono focus:outline-none focus:border-cyan-400"
                      placeholder="yourname@company.com"
                    />
                    <p className="text-xs text-gray-500 mt-1 font-mono">Business email required (no personal domains)</p>
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
                      placeholder="(555) 123-4567"
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
                      <option value="">Select consultation package</option>
                      <option value="Demo Request Only - Evaluation Phase">Demo Request Only - Evaluation Phase</option>
                      <option value="Discovery Call - Free (30 minutes)">Discovery Call - Free (30 minutes)</option>
                      <option value="Strategy Consultation - $297 (60 minutes) - Recommended">Strategy Consultation - $297 (60 minutes) - Recommended</option>
                      <option value="Technical Planning - $197 (45 minutes)">Technical Planning - $197 (45 minutes)</option>
                    </select>
                  </div>
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

                {/* Voice Agent Customization Section */}
                <div className="bg-gradient-to-b from-blue-500/10 to-transparent border border-blue-500/20 rounded-2xl p-6">
                  <div className="text-center mb-6">
                    <h4 className="text-lg font-mono font-semibold text-blue-400 mb-2">
                      🎯 Voice Agent Customization
                    </h4>
                    <p className="text-gray-400 font-mono text-sm">
                      Help us create the perfect voice assistant for your business needs
                    </p>
                  </div>


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
                          <option value="customer-service-faqs">Customer Service - Answer FAQs & General Questions</option>
                          <option value="appointment-scheduling">Appointment Scheduling & Booking</option>
                          <option value="service-requests">Service Request Intake & Processing</option>
                          <option value="complaint-handling">Complaint Handling & Resolution</option>
                          <option value="billing-inquiries">Billing & Payment Inquiries</option>
                          <option value="warranty-support">Warranty & Service Support</option>
                        </optgroup>
                        <optgroup label="Dispatch & Operations">
                          <option value="dispatch-scheduling">Dispatch & Job Assignment</option>
                          <option value="technician-coordination">Technician Coordination & Updates</option>
                          <option value="route-optimization">Route Optimization & Planning</option>
                          <option value="emergency-dispatch">Emergency Dispatch & Response</option>
                          <option value="inventory-management">Inventory & Parts Management</option>
                          <option value="work-order-tracking">Work Order Tracking & Updates</option>
                        </optgroup>
                        <optgroup label="Technical Support">
                          <option value="equipment-troubleshooting">Equipment Troubleshooting & Diagnostics</option>
                          <option value="repair-guidance">Step-by-Step Repair Guidance</option>
                          <option value="maintenance-reminders">Maintenance Reminders & Scheduling</option>
                          <option value="technical-documentation">Technical Documentation Access</option>
                          <option value="safety-compliance">Safety & Compliance Guidance</option>
                          <option value="quality-control">Quality Control & Inspection Support</option>
                        </optgroup>
                        <optgroup label="Sales & Marketing">
                          <option value="lead-qualification">Lead Qualification & Nurturing</option>
                          <option value="sales-support">Sales Support & Product Information</option>
                          <option value="quote-generation">Quote Generation & Pricing</option>
                          <option value="demo-scheduling">Demo & Consultation Scheduling</option>
                          <option value="follow-up-calls">Follow-up & Retention Calls</option>
                          <option value="market-research">Market Research & Customer Feedback</option>
                        </optgroup>
                        <optgroup label="Internal Operations">
                          <option value="internal-knowledge">Internal Knowledge & Training Support</option>
                          <option value="sop-guidance">SOP & Process Guidance</option>
                          <option value="employee-onboarding">Employee Onboarding & Training</option>
                          <option value="performance-tracking">Performance Tracking & Reporting</option>
                          <option value="compliance-monitoring">Compliance Monitoring & Alerts</option>
                          <option value="resource-allocation">Resource Allocation & Planning</option>
                        </optgroup>
                        <optgroup label="Status & Communication">
                          <option value="status-updates">Job Status Updates & Notifications</option>
                          <option value="delivery-tracking">Delivery & Service Tracking</option>
                          <option value="progress-reporting">Progress Reporting & Updates</option>
                          <option value="escalation-management">Escalation & Issue Management</option>
                          <option value="stakeholder-communication">Stakeholder Communication</option>
                          <option value="incident-reporting">Incident Reporting & Documentation</option>
                        </optgroup>
                        <optgroup label="Specialized Functions">
                          <option value="multi-language-support">Multi-Language Customer Support</option>
                          <option value="accessibility-support">Accessibility & Special Needs Support</option>
                          <option value="after-hours-support">After-Hours & Emergency Support</option>
                          <option value="integration-support">System Integration & API Support</option>
                          <option value="data-collection">Data Collection & Analytics</option>
                          <option value="custom-workflow">Custom Workflow Automation</option>
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
                        <optgroup label="Field Operations">
                        <option value="field-technicians">Field Technicians (repair, maintenance, troubleshooting)</option>
                          <option value="service-technicians">Service Technicians (installation, repair, maintenance)</option>
                          <option value="maintenance-staff">Maintenance Staff (preventive maintenance, inspections)</option>
                          <option value="emergency-technicians">Emergency Response Technicians</option>
                          <option value="specialized-technicians">Specialized Technicians (HVAC, electrical, plumbing)</option>
                          <option value="apprentice-technicians">Apprentice & Junior Technicians</option>
                        </optgroup>
                        <optgroup label="Management & Supervision">
                        <option value="supervisors-managers">Supervisors/Managers (job tracking, reporting, escalations)</option>
                          <option value="operations-managers">Operations Managers (workflow optimization, resource allocation)</option>
                          <option value="field-managers">Field Managers (technician coordination, quality control)</option>
                          <option value="dispatch-managers">Dispatch Managers (scheduling, route optimization)</option>
                          <option value="service-managers">Service Managers (customer relations, service delivery)</option>
                          <option value="regional-managers">Regional Managers (multi-location oversight)</option>
                        </optgroup>
                        <optgroup label="Customer-Facing">
                        <option value="customers">Customers (service requests, appointment booking, FAQs)</option>
                          <option value="business-customers">Business Customers (B2B service requests, contracts)</option>
                          <option value="residential-customers">Residential Customers (home services, maintenance)</option>
                          <option value="property-managers">Property Managers (multi-unit management, maintenance)</option>
                          <option value="facility-managers">Facility Managers (commercial building services)</option>
                          <option value="emergency-customers">Emergency Customers (urgent service requests)</option>
                        </optgroup>
                        <optgroup label="Internal Support Staff">
                        <option value="call-center-dispatch">Call Center / Dispatch Agents (assist in handling calls or queries)</option>
                          <option value="customer-service-reps">Customer Service Representatives</option>
                          <option value="sales-reps">Sales Representatives (lead qualification, quotes)</option>
                          <option value="account-managers">Account Managers (client relationship management)</option>
                          <option value="support-specialists">Support Specialists (technical support, troubleshooting)</option>
                          <option value="scheduling-coordinators">Scheduling Coordinators (appointment management)</option>
                        </optgroup>
                        <optgroup label="Administrative & Back Office">
                        <option value="sales-front-office">Sales / Front Office Staff (qualify leads, gather customer info)</option>
                          <option value="administrative-staff">Administrative Staff (data entry, documentation)</option>
                          <option value="billing-staff">Billing & Accounting Staff (invoicing, payment processing)</option>
                          <option value="hr-personnel">HR Personnel (employee support, training coordination)</option>
                          <option value="compliance-staff">Compliance & Safety Staff (regulatory adherence)</option>
                          <option value="quality-assurance">Quality Assurance Staff (service quality monitoring)</option>
                        </optgroup>
                        <optgroup label="External Partners">
                          <option value="vendors-suppliers">Vendors & Suppliers (inventory, parts ordering)</option>
                          <option value="contractors">Subcontractors (specialized services, overflow work)</option>
                          <option value="insurance-adjusters">Insurance Adjusters (claims processing, damage assessment)</option>
                          <option value="regulatory-inspectors">Regulatory Inspectors (compliance verification)</option>
                          <option value="third-party-integrators">Third-Party Integrators (system integration, API access)</option>
                          <option value="business-partners">Business Partners (collaborative service delivery)</option>
                        </optgroup>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-mono font-medium text-gray-300 mb-2">
                        Language & Style *
                      </label>
                      <select
                        value={formData.languageStyle}
                        onChange={(e) => handleInputChange('languageStyle', e.target.value)}
                        required
                        className="w-full p-3 bg-gray-800/50 border border-cyan-500/30 rounded-lg text-white font-mono focus:outline-none focus:border-cyan-400"
                      >
                        <option value="">Select preferred language and style</option>
                        <option value="english-professional">English (US) – Professional</option>
                        <option value="english-friendly">English (US) – Friendly/Conversational</option>
                        <option value="english-uk">English (UK)</option>
                        <option value="spanish">Spanish</option>
                        <option value="bilingual-english-spanish">Bilingual (English + Spanish)</option>
                        <option value="other">Other (specify in business description)</option>
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
                        <option value="voice-only">Voice Only</option>
                        <option value="voice-text-chat">Voice + Text Chat</option>
                        <option value="text-only">Text Only</option>
                      </select>
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-sm font-mono font-medium text-gray-300 mb-2 flex items-center gap-2">
                        Voice Agent Specialization *
                        <div className="relative group">
                          <button type="button" className="w-5 h-5 bg-cyan-500/20 hover:bg-cyan-500/30 rounded-full flex items-center justify-center text-cyan-400 text-xs font-bold transition-colors p-1">
                            ?
                          </button>
                          <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-64 p-3 bg-gray-800 border border-cyan-500/30 rounded-lg text-xs font-mono text-gray-300 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-auto z-20 shadow-lg">
                            This helps us train your voice agent with industry-specific terminology, processes, and knowledge. For example, HVAC agents understand "SEER rating" and "short cycling" issues.
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
                        <optgroup label="HVAC & Climate Control Specialization">
                          <option value="hvac-residential-specialist">Residential HVAC (home heating/cooling, ductwork, thermostats)</option>
                          <option value="hvac-commercial-specialist">Commercial HVAC (building systems, maintenance, energy efficiency)</option>
                          <option value="hvac-industrial-specialist">Industrial HVAC (large facilities, process cooling, ventilation)</option>
                          <option value="refrigeration-specialist">Refrigeration (commercial freezers, walk-ins, ice machines)</option>
                          <option value="duct-cleaning-specialist">Duct Cleaning & Air Quality (cleaning, sanitizing, air testing)</option>
                        </optgroup>
                        <optgroup label="Plumbing Specialization">
                          <option value="plumbing-residential-specialist">Residential Plumbing (leaks, clogs, fixtures, water heaters)</option>
                          <option value="plumbing-commercial-specialist">Commercial Plumbing (restaurants, offices, multi-unit buildings)</option>
                          <option value="plumbing-industrial-specialist">Industrial Plumbing (manufacturing, processing, large systems)</option>
                          <option value="drain-sewer-specialist">Drain & Sewer (cleaning, repair, video inspection, jetting)</option>
                          <option value="water-treatment-specialist">Water Treatment (filtration, softening, purification systems)</option>
                        </optgroup>
                        <optgroup label="Electrical Specialization">
                          <option value="electrical-residential-specialist">Residential Electrical (outlets, switches, lighting, panels)</option>
                          <option value="electrical-commercial-specialist">Commercial Electrical (office buildings, retail, restaurants)</option>
                          <option value="electrical-industrial-specialist">Industrial Electrical (manufacturing, heavy equipment, motors)</option>
                          <option value="low-voltage-specialist">Low Voltage Systems (security, networking, automation, AV)</option>
                          <option value="generator-specialist">Generator & Backup Power (installation, maintenance, testing)</option>
                        </optgroup>
                        <optgroup label="Maintenance & Repair Specialization">
                          <option value="facility-maintenance-specialist">Facility Maintenance (preventive care, inspections, repairs)</option>
                          <option value="equipment-repair-specialist">Equipment Repair (machinery, appliances, specialized tools)</option>
                          <option value="emergency-repair-specialist">Emergency Repair (24/7 response, urgent fixes, crisis management)</option>
                          <option value="warranty-service-specialist">Warranty Services (manufacturer support, extended coverage)</option>
                          <option value="preventive-maintenance-specialist">Preventive Maintenance (scheduled service, condition monitoring)</option>
                        </optgroup>
                        <optgroup label="Landscaping & Grounds Specialization">
                          <option value="landscaping-residential-specialist">Residential Landscaping (lawns, gardens, outdoor living)</option>
                          <option value="landscaping-commercial-specialist">Commercial Landscaping (office parks, retail centers, complexes)</option>
                          <option value="lawn-care-specialist">Lawn Care & Maintenance (mowing, fertilizing, pest control)</option>
                          <option value="tree-service-specialist">Tree Services (pruning, removal, health assessment)</option>
                          <option value="irrigation-specialist">Irrigation Systems (sprinklers, drip systems, controllers)</option>
                        </optgroup>
                        <optgroup label="Cleaning Services Specialization">
                          <option value="commercial-cleaning-specialist">Commercial Cleaning (offices, retail, medical facilities)</option>
                          <option value="residential-cleaning-specialist">Residential Cleaning (homes, apartments, move-in/out)</option>
                          <option value="specialized-cleaning-specialist">Specialized Cleaning (carpets, windows, post-construction)</option>
                          <option value="medical-cleaning-specialist">Medical/Healthcare Cleaning (sanitization, compliance, safety)</option>
                          <option value="industrial-cleaning-specialist">Industrial Cleaning (manufacturing, warehouses, heavy-duty)</option>
                        </optgroup>
                        <optgroup label="Security & Access Control Specialization">
                          <option value="security-systems-specialist">Security Systems (alarms, cameras, monitoring, response)</option>
                          <option value="access-control-specialist">Access Control (keycards, biometrics, door systems)</option>
                          <option value="cctv-surveillance-specialist">CCTV & Surveillance (cameras, recording, remote monitoring)</option>
                          <option value="fire-safety-specialist">Fire Safety Systems (alarms, sprinklers, suppression, testing)</option>
                          <option value="emergency-response-specialist">Emergency Response (monitoring, dispatch, coordination)</option>
                        </optgroup>
                        <optgroup label="Technology & Communications Specialization">
                          <option value="telecommunications-specialist">Telecommunications (phone systems, internet, connectivity)</option>
                          <option value="network-installation-specialist">Network Installation (wiring, routers, switches, configuration)</option>
                          <option value="cable-services-specialist">Cable & Internet Services (installation, repair, upgrades)</option>
                          <option value="it-support-specialist">IT Support Services (troubleshooting, maintenance, upgrades)</option>
                          <option value="automation-specialist">Building Automation (smart systems, IoT, energy management)</option>
                        </optgroup>
                        <optgroup label="Healthcare & Medical Specialization">
                          <option value="medical-equipment-specialist">Medical Equipment (diagnostic, treatment, monitoring devices)</option>
                          <option value="healthcare-facilities-specialist">Healthcare Facilities (hospitals, clinics, labs, compliance)</option>
                          <option value="laboratory-services-specialist">Laboratory Services (equipment, testing, quality control)</option>
                          <option value="pharmaceutical-specialist">Pharmaceutical Services (manufacturing, quality, compliance)</option>
                          <option value="dental-equipment-specialist">Dental Equipment (chairs, imaging, sterilization, maintenance)</option>
                        </optgroup>
                        <optgroup label="Manufacturing & Industrial Specialization">
                          <option value="manufacturing-support-specialist">Manufacturing Support (production lines, equipment, quality)</option>
                          <option value="industrial-equipment-specialist">Industrial Equipment (machinery, motors, control systems)</option>
                          <option value="production-line-specialist">Production Line Services (automation, maintenance, optimization)</option>
                          <option value="quality-control-specialist">Quality Control (testing, inspection, compliance, standards)</option>
                          <option value="safety-compliance-specialist">Safety & Compliance (OSHA, regulations, training, monitoring)</option>
                        </optgroup>
                        <optgroup label="Transportation & Logistics Specialization">
                          <option value="fleet-maintenance-specialist">Fleet Maintenance (vehicles, trucks, equipment, scheduling)</option>
                          <option value="logistics-support-specialist">Logistics Support (warehousing, distribution, tracking)</option>
                          <option value="warehouse-services-specialist">Warehouse Services (equipment, automation, inventory systems)</option>
                          <option value="delivery-services-specialist">Delivery Services (routing, tracking, customer communication)</option>
                          <option value="transportation-repair-specialist">Transportation Repair (vehicles, equipment, emergency service)</option>
                        </optgroup>
                        <optgroup label="Custom Specialization">
                          <option value="multi-service-specialist">Multi-Service Provider (combines multiple specialties)</option>
                          <option value="consulting-specialist">Consulting Services (advisory, planning, optimization)</option>
                          <option value="inspection-specialist">Inspection Services (quality, safety, compliance, certification)</option>
                          <option value="custom-solution-specialist">Custom Solution (unique business model, specify in description)</option>
                        </optgroup>
                      </select>
                    </div>
                  </div>



                  {/* Research Focus Preferences */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-mono font-medium text-gray-300 mb-2 flex items-center gap-2">
                        Primary Research Focus *
                        <div className="group relative">
                          <button type="button" className="w-5 h-5 bg-orange-500/20 hover:bg-orange-500/30 rounded-full flex items-center justify-center text-orange-400 text-xs font-bold transition-colors p-1">
                            ?
                          </button>
                          <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-64 p-3 bg-gray-800 border border-orange-500/30 rounded-lg text-xs font-mono text-gray-300 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-auto z-20 shadow-lg">
                            This guides our research to gather the most relevant information for your voice agent. We'll focus on industry trends, customer insights, or operational excellence based on your selection.
                          </div>
                        </div>
                      </label>
                        <select
                          value={formData.researchFocus || ''}
                          onChange={(e) => handleInputChange('researchFocus', e.target.value)}
                          required
                          className="w-full p-3 bg-gray-800/50 border border-orange-500/30 rounded-lg text-white font-mono focus:outline-none focus:border-orange-400"
                        >
                          <option value="">What should we research for your voice agent?</option>
                          <optgroup label="Industry Knowledge & Trends">
                            <option value="industry-trends">Industry trends and market analysis</option>
                            <option value="technology-updates">Latest technology and equipment updates</option>
                            <option value="best-practices">Industry best practices and standards</option>
                            <option value="regulatory-compliance">Regulatory compliance and safety updates</option>
                            <option value="competitor-analysis">Competitor service offerings and pricing</option>
                          </optgroup>
                          <optgroup label="Customer & Service Insights">
                            <option value="customer-pain-points">Common customer pain points and complaints</option>
                            <option value="service-optimization">Service delivery optimization strategies</option>
                            <option value="customer-communication">Customer communication patterns and preferences</option>
                            <option value="satisfaction-factors">Customer satisfaction factors and metrics</option>
                            <option value="retention-strategies">Customer retention and loyalty strategies</option>
                          </optgroup>
                          <optgroup label="Operational Excellence">
                            <option value="workflow-optimization">Workflow and process optimization</option>
                            <option value="efficiency-metrics">Efficiency metrics and KPIs</option>
                            <option value="resource-management">Resource management and scheduling</option>
                            <option value="quality-control">Quality control and assurance methods</option>
                            <option value="cost-optimization">Cost optimization and pricing strategies</option>
                          </optgroup>
                          <optgroup label="Training & Development">
                            <option value="training-materials">Training materials and educational content</option>
                            <option value="skill-development">Skill development and certification programs</option>
                            <option value="safety-protocols">Safety protocols and emergency procedures</option>
                            <option value="troubleshooting-guides">Troubleshooting guides and problem-solving</option>
                            <option value="knowledge-management">Knowledge management and documentation</option>
                          </optgroup>
                        </select>
                </div>

                      <div>
                        <label className="block text-sm font-mono font-medium text-gray-300 mb-2 flex items-center gap-2">
                          Research Depth Preference
                          <div className="group relative">
                            <button type="button" className="w-5 h-5 bg-orange-500/20 hover:bg-orange-500/30 rounded-full flex items-center justify-center text-orange-400 text-xs font-bold transition-colors p-1">
                              ?
                            </button>
                            <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-64 p-3 bg-gray-800 border border-orange-500/30 rounded-lg text-xs font-mono text-gray-300 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-auto z-20 shadow-lg">
                              Choose how detailed the research should be. Comprehensive = deep dive, Focused = specific areas, Overview = high-level insights.
                            </div>
                          </div>
                        </label>
                        <select
                          value={formData.researchDepth || ''}
                          onChange={(e) => handleInputChange('researchDepth', e.target.value)}
                          className="w-full p-3 bg-gray-800/50 border border-orange-500/30 rounded-lg text-white font-mono focus:outline-none focus:border-orange-400"
                        >
                          <option value="">How detailed should the research be?</option>
                          <option value="comprehensive">Comprehensive - Deep dive into all aspects</option>
                          <option value="focused">Focused - Specific areas of interest</option>
                          <option value="overview">Overview - High-level industry insights</option>
                          <option value="custom">Custom - Mix of different depths</option>
                        </select>
                      </div>
                    </div>
                    
                    </div>
                  </div>

                  {/* Demo Type Selection */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-mono font-medium text-gray-300 mb-2 flex items-center gap-2">
                        Demo Type *
                        <div className="group relative">
                          <button type="button" className="w-5 h-5 bg-indigo-500/20 hover:bg-indigo-500/30 rounded-full flex items-center justify-center text-indigo-400 text-xs font-bold transition-colors p-1">
                            ?
                          </button>
                          <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-64 p-3 bg-gray-800 border border-indigo-500/30 rounded-lg text-xs font-mono text-gray-300 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-auto z-20 shadow-lg">
                            Voice Agent: Phone-based customer service. Chatbot: Web-based chat interface. Newsletter: Customized email content and automation.
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
                          <option value="voice-agent">Voice Agent Demo</option>
                          <option value="chatbot">Chatbot Demo</option>
                          <option value="newsletter">Customized Newsletter Demo</option>
                        </select>
                      </div>
                      
                    </div>
                  </div>

                  {/* Additional Business Information */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-mono font-medium text-gray-300 mb-2">
                        Your Role in the Business *
                      </label>
                      <select
                        value={formData.businessRole}
                        onChange={(e) => handleInputChange('businessRole', e.target.value)}
                        required
                        className="w-full p-3 bg-gray-800/50 border border-cyan-500/30 rounded-lg text-white font-mono focus:outline-none focus:border-cyan-400"
                      >
                        <option value="">Select your role</option>
                        <option value="owner-founder">Owner / Founder</option>
                        <option value="ceo-president">CEO / President</option>
                        <option value="operations-manager">Operations Manager</option>
                        <option value="service-manager">Service Manager</option>
                        <option value="dispatch-manager">Dispatch Manager</option>
                        <option value="field-manager">Field Manager</option>
                        <option value="sales-manager">Sales Manager</option>
                        <option value="customer-service-manager">Customer Service Manager</option>
                        <option value="it-manager">IT Manager</option>
                        <option value="administrative-manager">Administrative Manager</option>
                        <option value="supervisor">Supervisor</option>
                        <option value="technician">Technician</option>
                        <option value="other-role">Other Role</option>
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
                        className="w-full p-3 bg-gray-800/50 border border-cyan-500/30 rounded-lg text-white font-mono focus:outline-none focus:border-cyan-400"
                      >
                        <option value="">Select team size</option>
                        <option value="1-5">1-5 employees</option>
                        <option value="6-15">6-15 employees</option>
                        <option value="16-50">16-50 employees</option>
                        <option value="51-100">51-100 employees</option>
                        <option value="101-500">101-500 employees</option>
                        <option value="500+">500+ employees</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-mono font-medium text-gray-300 mb-2">
                      Current Business Challenges *
                    </label>
                    <textarea
                      value={formData.currentChallenges}
                      onChange={(e) => handleInputChange('currentChallenges', e.target.value)}
                      required
                      rows={3}
                      className="w-full p-3 bg-gray-800/50 border border-cyan-500/30 rounded-lg text-white font-mono focus:outline-none focus:border-cyan-400"
                      placeholder="Describe your main business challenges (e.g., scheduling conflicts, customer communication, technician coordination, etc.)"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-mono font-medium text-gray-300 mb-2 flex items-center gap-2">
                    Additional Documentation (Optional)
                    <div className="group relative">
                      <button type="button" className="w-5 h-5 bg-green-500/20 hover:bg-green-500/30 rounded-full flex items-center justify-center text-green-400 text-xs font-bold transition-colors p-1">
                        ?
                      </button>
                      <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-64 p-3 bg-gray-800 border border-green-500/30 rounded-lg text-xs font-mono text-gray-300 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-auto z-20 shadow-lg">
                        Upload service manuals, FAQs, procedures, pricing sheets. Avoid customer data, financial records, or proprietary information.
                      </div>
                    </div>
                  </label>
                  <div
                    className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
                      dragActive 
                        ? 'border-cyan-400 bg-cyan-500/10' 
                        : 'border-cyan-500/30 hover:border-cyan-400/50'
                    }`}
                    onDragEnter={handleDrag}
                    onDragLeave={handleDrag}
                    onDragOver={handleDrag}
                    onDrop={handleDrop}
                  >
                    <div className="space-y-4">
                      <div className="w-12 h-12 mx-auto bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-full flex items-center justify-center">
                        <svg className="w-6 h-6 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                        </svg>
                      </div>
                      <div>
                        <p className="text-white font-mono font-medium">Upload Additional Files</p>
                        <p className="text-gray-400 font-mono text-sm mt-1">
                          Upload business documents, process flows, or any additional information that would help us understand your needs better
                        </p>
                      </div>
                      <div className="flex flex-col sm:flex-row gap-2 justify-center">
                        <label className="font-mono bg-gradient-to-r from-cyan-500 to-blue-500 px-4 py-2 rounded-lg text-sm font-semibold hover:from-cyan-600 hover:to-blue-600 transition-all cursor-pointer">
                          Choose Files
                          <input
                            type="file"
                            multiple
                            className="hidden"
                            onChange={(e) => handleFileUpload(e.target.files)}
                            accept=".pdf,.doc,.docx,.txt,.jpg,.jpeg,.png,.gif,.xlsx,.xls,.ppt,.pptx"
                          />
                        </label>
                        <span className="text-gray-500 font-mono text-xs self-center">or drag and drop</span>
                      </div>
                      <p className="text-gray-500 font-mono text-xs">
                        PDF, DOC, DOCX, TXT, images, Excel, PowerPoint up to 50MB each (100MB total)
                      </p>
                    </div>
                  </div>

                  {/* Uploaded Files List */}
                  {uploadedFiles.length > 0 && (
                    <div className="mt-4">
                      <h4 className="text-sm font-mono font-medium text-gray-300 mb-2">Uploaded Files:</h4>
                      <div className="space-y-2">
                        {uploadedFiles.map((file, index) => (
                          <div key={index} className="flex items-center justify-between p-3 bg-gray-800/30 rounded-lg">
                            <div className="flex items-center">
                              <svg className="w-4 h-4 text-cyan-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                              </svg>
                              <div>
                                <span className="text-sm text-gray-300 font-mono">{file.name}</span>
                                <span className="text-xs text-gray-400 ml-2">
                                  ({(file.size / 1024 / 1024).toFixed(2)} MB)
                                </span>
                              </div>
                            </div>
                            <button
                              type="button"
                              onClick={() => removeFile(index)}
                              className="text-red-400 hover:text-red-300 text-sm font-mono"
                            >
                              Remove
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {formData.consultationPackage && formData.consultationPackage !== 'Demo Request Only - Evaluation Phase' && (
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
                )}

                <div className="text-center">
                  <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-mono font-semibold py-4 px-8 rounded-xl transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-3"
                  >
                    <div className="flex items-center gap-3">
                      <Brain className="w-5 h-5" />
                      Request Demo
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
                    As a thank you for providing your comprehensive business information, we'll create a personalized AI voice assistant specifically trained on your business processes and challenges. Your assistant will be optimized for <strong className="text-green-400">{formData.useCase}</strong> and designed for <strong className="text-green-400">{formData.targetUsers}</strong>.
                  </p>
                  
                  <div className="bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/30 rounded-xl p-4 mb-4">
                    <h5 className="font-mono font-semibold text-green-400 mb-3">What You'll Receive:</h5>
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
                  
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                      <span className="font-mono text-gray-300">Customer service & support</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                      <span className="font-mono text-gray-300">Appointment scheduling & management</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                      <span className="font-mono text-gray-300">Business problem-solving</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                      <span className="font-mono text-gray-300">Field service operations support</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Voice Assistant */}
      {/* The VoiceAssistant component is now globally available */}
    </div>
  );
};

export default Demo; 