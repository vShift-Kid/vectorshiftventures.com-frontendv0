import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { MessageSquare, Brain, Calendar, CheckCircle, ArrowRight, Phone, Users, Gift, Bot, Globe } from 'lucide-react';

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
    industryContext: ''
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
          industryContext: formData.industryContext
        },
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
                      <option value="">Select your industry</option>
                      <option value="HVAC">HVAC</option>
                      <option value="Plumbing">Plumbing</option>
                      <option value="Electrical">Electrical</option>
                      <option value="Landscaping">Landscaping</option>
                      <option value="Cleaning">Cleaning</option>
                      <option value="Security">Security</option>
                      <option value="IT Services">IT Services</option>
                      <option value="Construction">Construction</option>
                      <option value="Other">Other</option>
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
                        <option value="">What should the agent do?</option>
                        <option value="customer-service">Customer Service (answer FAQs, schedule appointments)</option>
                        <option value="dispatch-scheduling">Dispatch & Scheduling (assign jobs, update technicians)</option>
                        <option value="equipment-troubleshooting">Equipment Troubleshooting (guide step-by-step repair checks)</option>
                        <option value="internal-knowledge">Internal Knowledge Access (manuals, SOPs, training support)</option>
                        <option value="status-updates">Status Updates (job progress, delivery, repair status)</option>
                        <option value="sales-lead-qualification">Sales/Lead Qualification (capture customer needs, book demos)</option>
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
                        <option value="">Who will interact with it?</option>
                        <option value="field-technicians">Field Technicians (repair, maintenance, troubleshooting)</option>
                        <option value="supervisors-managers">Supervisors/Managers (job tracking, reporting, escalations)</option>
                        <option value="customers">Customers (service requests, appointment booking, FAQs)</option>
                        <option value="call-center-dispatch">Call Center / Dispatch Agents (assist in handling calls or queries)</option>
                        <option value="sales-front-office">Sales / Front Office Staff (qualify leads, gather customer info)</option>
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
                      <label className="block text-sm font-mono font-medium text-gray-300 mb-2">
                        Industry Context *
                      </label>
                      <select
                        value={formData.industryContext}
                        onChange={(e) => handleInputChange('industryContext', e.target.value)}
                        required
                        className="w-full p-3 bg-gray-800/50 border border-cyan-500/30 rounded-lg text-white font-mono focus:outline-none focus:border-cyan-400"
                      >
                        <option value="">Select your specific industry context</option>
                        <option value="hvac-mechanical">HVAC / Mechanical Services</option>
                        <option value="plumbing">Plumbing</option>
                        <option value="electrical-power">Electrical / Power Systems</option>
                        <option value="manufacturing-industrial">Manufacturing / Industrial</option>
                        <option value="medical-healthcare">Medical / Healthcare</option>
                        <option value="logistics-warehousing">Logistics / Warehousing</option>
                        <option value="it-software">IT / Software</option>
                        <option value="other">Other (specify in business description)</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-mono font-medium text-gray-300 mb-2">
                    Additional Documentation (Optional)
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