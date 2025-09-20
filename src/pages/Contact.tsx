import React, { useState } from 'react';
import { Mail, Phone, MapPin, MessageSquare, User, Building, CheckCircle } from 'lucide-react';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    subject: '',
    message: ''
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Contact form submitted:', formData);
    setIsSubmitted(true);
  };

  const contactInfo = [
    {
      icon: Mail,
      title: "Email",
      value: "contact@vectorshiftventures.com",
      description: "Send us an email anytime",
      subtleNumber: "18"
    },
    {
      icon: Phone,
      title: "Phone",
      value: "+1 (833) 957-2961",
      description: "Call us anytime - AI agent answers 24/7",
      subtleNumber: "20"
    },
    {
      icon: MapPin,
      title: "Location",
      value: "Remote & On-site",
      description: "We work with clients worldwide",
      subtleNumber: "29"
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
                Message Sent Successfully!
              </span>
            </h1>
            <p className="text-xl text-slate-300 mb-8 font-mono">
              Thank you for reaching out! We'll get back to you within 24 hours.
            </p>
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
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="font-mono text-5xl font-bold mb-6">
              <span className="bg-gradient-to-r from-blue-400 via-green-400 to-blue-500 bg-clip-text text-transparent">
                Get In Touch
              </span>
            </h1>
            <p className="text-xl text-slate-300 mb-8 font-mono">
              Ready to transform your field service business? Let's discuss your automation needs.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Info */}
      <section className="py-20 bg-gradient-to-b from-slate-800 to-slate-900">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {contactInfo.map((info, index) => (
              <div key={index} className="text-center p-8 rounded-2xl bg-gradient-to-b from-blue-500/10 via-green-500/5 to-transparent border border-slate-400/20 hover:border-blue-400/40 transition-all relative">
                <info.icon className="w-12 h-12 text-blue-400 mx-auto mb-4" />
                <h3 className="text-xl font-mono font-semibold mb-2 text-white">{info.title}</h3>
                <p className="text-blue-400 font-mono mb-2">{info.value}</p>
                <p className="text-slate-300 font-mono text-sm">{info.description}</p>
                {/* Subtle lucky number */}
                <div className="absolute top-3 right-3 text-slate-600 font-mono text-xs opacity-30">
                  {info.subtleNumber}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-20 bg-gradient-to-b from-slate-900 to-slate-800">
        <div className="container mx-auto px-6">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-mono font-bold mb-4">
                <span className="bg-gradient-to-r from-blue-400 via-green-400 to-blue-500 bg-clip-text text-transparent">
                  Send Us a Message
                </span>
              </h2>
              <p className="text-slate-300 font-mono">
                Fill out the form below and we'll get back to you as soon as possible.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-mono font-medium text-slate-200 mb-2">
                    <User className="w-4 h-4 inline mr-2" />
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full p-4 bg-slate-800/50 border border-slate-400/30 rounded-lg text-white font-mono focus:outline-none focus:border-blue-400"
                    placeholder="Your full name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-mono font-medium text-slate-200 mb-2">
                    <Mail className="w-4 h-4 inline mr-2" />
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full p-4 bg-slate-800/50 border border-slate-400/30 rounded-lg text-white font-mono focus:outline-none focus:border-blue-400"
                    placeholder="your@email.com"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-mono font-medium text-slate-200 mb-2">
                    <Building className="w-4 h-4 inline mr-2" />
                    Company Name
                  </label>
                  <input
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={handleInputChange}
                    className="w-full p-4 bg-slate-800/50 border border-slate-400/30 rounded-lg text-white font-mono focus:outline-none focus:border-blue-400"
                    placeholder="Your company name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-mono font-medium text-slate-200 mb-2">
                    Subject *
                  </label>
                  <select
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    required
                    className="w-full p-4 bg-slate-800/50 border border-slate-400/30 rounded-lg text-white font-mono focus:outline-none focus:border-blue-400"
                  >
                    <option value="">Select a subject</option>
                    <option value="consultation">Request Consultation</option>
                    <option value="demo">Request Demo</option>
                    <option value="quote">Request Quote</option>
                    <option value="support">Technical Support</option>
                    <option value="partnership">Partnership Inquiry</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-mono font-medium text-slate-200 mb-2">
                  <MessageSquare className="w-4 h-4 inline mr-2" />
                  Message *
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  rows={6}
                  required
                  className="w-full p-4 bg-slate-800/50 border border-slate-400/30 rounded-lg text-white font-mono focus:outline-none focus:border-blue-400"
                  placeholder="Tell us about your automation needs, questions, or how we can help transform your business..."
                />
              </div>

              <button
                type="submit"
                className="w-full font-mono bg-gradient-to-r from-blue-500 to-green-500 px-8 py-4 rounded-lg text-lg font-semibold hover:shadow-lg hover:shadow-blue-500/20 transition-all"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact; 