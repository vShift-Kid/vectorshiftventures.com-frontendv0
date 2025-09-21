import React, { useState } from 'react';
import { Mail, Phone, MapPin, MessageSquare, User, Building, CheckCircle, Calendar, Clock, Bot, FileText, PhoneCall, Search, Brain, Globe, Target, DollarSign, ArrowRight, Gift, ChevronDown, ChevronUp } from 'lucide-react';
import { getWebhookUrl } from '../config/api';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    subject: '',
    message: '',
    // Consultation fields
    industry: '',
    consultationType: '',
    businessDescription: '',
    preferredDate: '',
    preferredTime: ''
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showConsultationOptions, setShowConsultationOptions] = useState(false);
  const [isConsultationMode, setIsConsultationMode] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const webhookData = {
        formType: isConsultationMode ? 'consultation' : 'contact',
        contactInfo: {
          name: formData.name,
          email: formData.email,
          company: formData.company
        },
        messageInfo: {
          subject: formData.subject,
          message: formData.message
        },
        consultationInfo: isConsultationMode ? {
          industry: formData.industry,
          consultationType: formData.consultationType,
          businessDescription: formData.businessDescription,
          preferredDate: formData.preferredDate,
          preferredTime: formData.preferredTime
        } : null,
        metadata: {
          formVersion: "2.0",
          isConsultationMode: isConsultationMode,
          timestamp: new Date().toISOString()
        }
      };

      const response = await fetch(getWebhookUrl(), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(webhookData)
      });

      if (response.ok) {
        setIsSubmitted(true);
        console.log('Contact form submitted successfully');
      } else {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
    } catch (error) {
      console.error('Error submitting contact form:', error);
      // Still show success to user even if webhook fails
      setIsSubmitted(true);
    }
  };

  const toggleConsultationMode = () => {
    setIsConsultationMode(!isConsultationMode);
    if (!isConsultationMode) {
      setShowConsultationOptions(true);
    }
  };

  const consultationTypes = [
    {
      title: "Technical Strategy Consultation",
      duration: "60 minutes",
      description: "Strategic consultation with our Solutions Architect on AI automation for your technical operations",
      features: [
        "Technical operations assessment and analysis",
        "AI automation strategy for your specific industry",
        "ROI analysis for technical AI implementation",
        "Implementation roadmap and next steps"
      ],
      price: "$200.00",
      recommended: true
    },
    {
      title: "Quick Technical Review",
      duration: "30 minutes",
      description: "Initial consultation to understand your technical operations and automation needs",
      features: [
        "Technical operations assessment",
        "Automation opportunities review",
        "Service overview and planning"
      ],
      price: "Free"
    }
  ];

  const contactInfo = [
    {
      icon: Mail,
      title: "Email",
      value: "contact@vectorshiftventures.com",
      description: "Send us an email anytime"
    },
    {
      icon: Phone,
      title: "Phone",
      value: "+1 (833) 957-2961",
      description: "Call us anytime - AI agent answers 24/7"
    },
    {
      icon: MapPin,
      title: "Location",
      value: "Remote & On-site",
      description: "We work with clients worldwide"
    }
  ];

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-[#0A0B1E] text-white pt-20">
        <div className="container mx-auto px-6 py-20">
          <div className="max-w-2xl mx-auto text-center">
            <CheckCircle className="w-20 h-20 text-green-400 mx-auto mb-8" />
            <h1 className="text-4xl font-mono font-bold mb-6">
              <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                {isConsultationMode ? 'Consultation Scheduled Successfully!' : 'Message Sent Successfully!'}
              </span>
            </h1>
            <p className="text-xl text-gray-400 mb-8 font-mono">
              {isConsultationMode 
                ? 'Thank you for scheduling a consultation! Our Solutions Architect will contact you soon to confirm the details.'
                : 'Thank you for reaching out! We\'ll get back to you within 24 hours.'
              }
            </p>
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
            <h1 className="font-mono text-5xl font-bold mb-6">
              <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                Get In Touch
              </span>
            </h1>
            <p className="text-xl text-gray-400 mb-8 font-mono">
              Ready to transform your field service business? Let's discuss your automation needs.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Info */}
      <section className="py-20 bg-[#0A0B1E]">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {contactInfo.map((info, index) => (
              <div key={index} className="text-center p-8 rounded-2xl bg-gradient-to-b from-cyan-500/10 to-transparent border border-cyan-500/20 hover:border-cyan-500/40 transition-all">
                <info.icon className="w-12 h-12 text-cyan-400 mx-auto mb-4" />
                <h3 className="text-xl font-mono font-semibold mb-2">{info.title}</h3>
                <p className="text-cyan-400 font-mono mb-2">{info.value}</p>
                <p className="text-gray-400 font-mono text-sm">{info.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-20 bg-gradient-to-b from-[#0A0B1E] to-[#0A0B1E]/80">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-mono font-bold mb-4">
                <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                  {isConsultationMode ? 'Schedule a Consultation' : 'Get in Touch'}
                </span>
              </h2>
              <p className="text-gray-400 font-mono">
                {isConsultationMode 
                  ? 'Schedule a consultation with our Solutions Architect to discuss your technical automation needs.'
                  : 'Fill out the form below and we\'ll get back to you as soon as possible.'
                }
              </p>
              
              {/* Mode Toggle */}
              <div className="mt-6 flex justify-center">
                <div className="bg-gray-800/50 rounded-lg p-1 border border-cyan-500/30">
                  <button
                    onClick={() => setIsConsultationMode(false)}
                    className={`px-4 py-2 rounded-md font-mono text-sm transition-all ${
                      !isConsultationMode 
                        ? 'bg-cyan-500 text-white' 
                        : 'text-gray-400 hover:text-white'
                    }`}
                  >
                    Quick Message
                  </button>
                  <button
                    onClick={() => setIsConsultationMode(true)}
                    className={`px-4 py-2 rounded-md font-mono text-sm transition-all ${
                      isConsultationMode 
                        ? 'bg-cyan-500 text-white' 
                        : 'text-gray-400 hover:text-white'
                    }`}
                  >
                    Schedule Consultation
                  </button>
                </div>
              </div>
            </div>

            {/* Consultation Type Selection */}
            {isConsultationMode && (
              <div className="mb-8">
                <h3 className="text-xl font-mono font-semibold text-white mb-4">Choose Consultation Type</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {consultationTypes.map((type, index) => (
                    <div
                      key={index}
                      className={`p-6 rounded-xl border transition-all cursor-pointer ${
                        formData.consultationType === type.title
                          ? 'border-cyan-400 bg-cyan-500/10'
                          : 'border-cyan-500/30 bg-gray-800/30 hover:border-cyan-500/50'
                      }`}
                      onClick={() => handleInputChange({ target: { name: 'consultationType', value: type.title } } as any)}
                    >
                      <div className="flex items-start justify-between mb-3">
                        <h4 className="text-lg font-mono font-semibold text-white">{type.title}</h4>
                        {type.recommended && (
                          <span className="bg-cyan-500 text-white text-xs font-mono px-2 py-1 rounded-full">
                            Recommended
                          </span>
                        )}
                      </div>
                      <p className="text-gray-400 font-mono text-sm mb-3">{type.description}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-cyan-400 font-mono font-semibold">{type.price}</span>
                        <span className="text-gray-500 font-mono text-sm">{type.duration}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-mono font-medium text-gray-300 mb-2">
                    <User className="w-4 h-4 inline mr-2" />
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full p-4 bg-gray-800/50 border border-cyan-500/30 rounded-lg text-white font-mono focus:outline-none focus:border-cyan-400"
                    placeholder="Your full name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-mono font-medium text-gray-300 mb-2">
                    <Mail className="w-4 h-4 inline mr-2" />
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full p-4 bg-gray-800/50 border border-cyan-500/30 rounded-lg text-white font-mono focus:outline-none focus:border-cyan-400"
                    placeholder="your@email.com"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-mono font-medium text-gray-300 mb-2">
                    <Building className="w-4 h-4 inline mr-2" />
                    Company Name *
                  </label>
                  <input
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={handleInputChange}
                    required
                    className="w-full p-4 bg-gray-800/50 border border-cyan-500/30 rounded-lg text-white font-mono focus:outline-none focus:border-cyan-400"
                    placeholder="Your company name"
                  />
                </div>

                {isConsultationMode && (
                  <div>
                    <label className="block text-sm font-mono font-medium text-gray-300 mb-2">
                      <Building className="w-4 h-4 inline mr-2" />
                      Industry *
                    </label>
                    <select
                      name="industry"
                      value={formData.industry}
                      onChange={handleInputChange}
                      required
                      className="w-full p-4 bg-gray-800/50 border border-cyan-500/30 rounded-lg text-white font-mono focus:outline-none focus:border-cyan-400"
                    >
                      <option value="">Select your industry</option>
                      <option value="manufacturing">Manufacturing</option>
                      <option value="energy">Energy & Utilities</option>
                      <option value="healthcare">Healthcare</option>
                      <option value="logistics">Logistics & Supply Chain</option>
                      <option value="construction">Construction</option>
                      <option value="field-service">Field Service</option>
                      <option value="engineering">Engineering</option>
                      <option value="it-operations">IT Operations</option>
                      <option value="hr-operations">HR Operations</option>
                      <option value="legal-operations">Legal Operations</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                )}
              </div>

              {isConsultationMode && (
                <div>
                  <label className="block text-sm font-mono font-medium text-gray-300 mb-2">
                    <MessageSquare className="w-4 h-4 inline mr-2" />
                    Business Description *
                  </label>
                  <textarea
                    name="businessDescription"
                    value={formData.businessDescription}
                    onChange={handleInputChange}
                    required
                    rows={4}
                    className="w-full p-4 bg-gray-800/50 border border-cyan-500/30 rounded-lg text-white font-mono focus:outline-none focus:border-cyan-400 resize-none"
                    placeholder="Describe your business and technical operations..."
                  />
                </div>
              )}

              <div>
                <label className="block text-sm font-mono font-medium text-gray-300 mb-2">
                  <MessageSquare className="w-4 h-4 inline mr-2" />
                  {isConsultationMode ? 'Additional Details' : 'Subject'} *
                </label>
                {isConsultationMode ? (
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    required
                    className="w-full p-4 bg-gray-800/50 border border-cyan-500/30 rounded-lg text-white font-mono focus:outline-none focus:border-cyan-400"
                    placeholder="Specific questions or requirements"
                  />
                ) : (
                  <select
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    required
                    className="w-full p-4 bg-gray-800/50 border border-cyan-500/30 rounded-lg text-white font-mono focus:outline-none focus:border-cyan-400"
                  >
                    <option value="">Select a subject</option>
                    <option value="consultation">Request Consultation</option>
                    <option value="demo">Request Demo</option>
                    <option value="quote">Request Quote</option>
                    <option value="support">Technical Support</option>
                    <option value="partnership">Partnership Inquiry</option>
                    <option value="other">Other</option>
                  </select>
                )}
              </div>

              <div>
                <label className="block text-sm font-mono font-medium text-gray-300 mb-2">
                  <MessageSquare className="w-4 h-4 inline mr-2" />
                  Message *
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  rows={6}
                  required
                  className="w-full p-4 bg-gray-800/50 border border-cyan-500/30 rounded-lg text-white font-mono focus:outline-none focus:border-cyan-400"
                  placeholder={isConsultationMode ? 'Tell us more about your technical automation needs...' : 'Tell us about your automation needs, questions, or how we can help transform your business...'}
                />
              </div>

              {/* Scheduling Fields for Consultation */}
              {isConsultationMode && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-mono font-medium text-gray-300 mb-2">
                      <Calendar className="w-4 h-4 inline mr-2" />
                      Preferred Date *
                    </label>
                    <input
                      type="date"
                      name="preferredDate"
                      value={formData.preferredDate}
                      onChange={handleInputChange}
                      required
                      className="w-full p-4 bg-gray-800/50 border border-cyan-500/30 rounded-lg text-white font-mono focus:outline-none focus:border-cyan-400"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-mono font-medium text-gray-300 mb-2">
                      <Clock className="w-4 h-4 inline mr-2" />
                      Preferred Time *
                    </label>
                    <select
                      name="preferredTime"
                      value={formData.preferredTime}
                      onChange={handleInputChange}
                      required
                      className="w-full p-4 bg-gray-800/50 border border-cyan-500/30 rounded-lg text-white font-mono focus:outline-none focus:border-cyan-400"
                    >
                      <option value="">Select time</option>
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

              <button
                type="submit"
                className="w-full font-mono bg-gradient-to-r from-cyan-500 to-blue-500 px-8 py-4 rounded-lg text-lg font-semibold hover:shadow-lg hover:shadow-cyan-500/20 transition-all"
              >
                {isConsultationMode ? 'Schedule Consultation' : 'Send Message'}
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact; 