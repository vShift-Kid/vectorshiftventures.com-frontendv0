import React, { useState } from 'react';

// RME & Supporting Operations - Comprehensive Specializations
const mainSpecializations = {
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
  const [searchQuery, setSearchQuery] = useState('');
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

  return (
    <div className="min-h-screen bg-[#0A0B1E] text-white pt-20">
      <div className="container mx-auto px-6">
        <h1 className="text-4xl font-mono font-bold text-center text-cyan-400 mb-8">
          Demo Test Page
        </h1>
        <p className="text-center text-gray-300 mb-8">
          Testing form data structure - this should work now.
        </p>
        
        <div className="max-w-2xl mx-auto">
          <form className="space-y-6">
            <div>
              <label className="block text-sm font-mono font-semibold text-cyan-300 mb-2">
                Name
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                className="w-full p-3 bg-gray-800/50 border border-cyan-500/30 rounded-lg text-white font-mono focus:outline-none focus:border-cyan-400"
                placeholder="Enter your name"
              />
            </div>
            
            <div>
              <label className="block text-sm font-mono font-semibold text-cyan-300 mb-2">
                Email
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                className="w-full p-3 bg-gray-800/50 border border-cyan-500/30 rounded-lg text-white font-mono focus:outline-none focus:border-cyan-400"
                placeholder="Enter your email"
              />
            </div>
            
            {/* RME Specializations Section */}
            <div className="border-t border-cyan-500/20 pt-8">
              <h4 className="text-xl font-mono font-bold mb-6 text-orange-400">
                RME & Supporting Operations Specializations
              </h4>
              
              <div className="mb-6">
                <p className="text-sm text-gray-400 font-mono mb-4">
                  Search and select the RME (Reliability, Maintenance, Engineering) and Operations specializations your AI agent should focus on.
                </p>
              </div>
              
              <div className="space-y-4">
                {/* Search Bar */}
                <div className="relative">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search RME specializations (e.g., 'reliability', 'maintenance', 'troubleshooting', 'predictive')..."
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

                {/* Main Specializations */}
                <div className="bg-gray-800/30 border border-gray-600/30 rounded-lg p-4 max-h-96 overflow-y-auto">
                  <h5 className="text-sm font-mono font-semibold text-gray-300 mb-4">
                    RME & Supporting Operations Specializations
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
                  
                  {Object.values(mainSpecializations).flat().filter(s => getFilteredSpecializations([s], searchQuery).length > 0).length === 0 && searchQuery && (
                    <p className="text-sm text-gray-400 font-mono text-center py-4">
                      No specializations found for "{searchQuery}"
                    </p>
                  )}
                </div>
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
                  <span>Request Demo</span>
                  <span className="ml-2">→</span>
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
  );
};

export default DemoTest;
