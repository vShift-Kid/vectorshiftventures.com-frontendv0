import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  Phone, 
  MessageSquare, 
  Globe, 
  Building, 
  Users, 
  Target, 
  TrendingUp, 
  CheckCircle, 
  Loader2,
  ArrowLeft,
  ExternalLink
} from 'lucide-react';
import { supabase, Company, ResearchData, GeneratedContent, VapiIntegration, WebsiteConfig } from '../lib/supabase';

interface CompanyData {
  company: Company;
  research?: ResearchData;
  content?: GeneratedContent;
  vapi?: VapiIntegration;
  website?: WebsiteConfig;
}

const CompanyPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [companyData, setCompanyData] = useState<CompanyData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!slug) {
      setError('No company slug provided');
      setLoading(false);
      return;
    }

    loadCompanyData(slug);
  }, [slug]);

  const loadCompanyData = async (companySlug: string) => {
    try {
      setLoading(true);
      setError(null);

      // Fetch company data
      const { data: company, error: companyError } = await supabase
        .from('companies')
        .select('*')
        .eq('slug', companySlug)
        .eq('status', 'active')
        .single();

      if (companyError || !company) {
        setError('Company not found');
        setLoading(false);
        return;
      }

      // Fetch related data
      const [researchResult, contentResult, vapiResult, websiteResult] = await Promise.all([
        supabase.from('research_data').select('*').eq('company_id', company.id).single(),
        supabase.from('generated_content').select('*').eq('company_id', company.id).single(),
        supabase.from('vapi_integration').select('*').eq('company_id', company.id).single(),
        supabase.from('website_config').select('*').eq('company_id', company.id).single()
      ]);

      setCompanyData({
        company,
        research: researchResult.data || undefined,
        content: contentResult.data || undefined,
        vapi: vapiResult.data || undefined,
        website: websiteResult.data || undefined
      });

    } catch (err) {
      console.error('Error loading company data:', err);
      setError('Failed to load company data');
    } finally {
      setLoading(false);
    }
  };

  const handleCallAgent = () => {
    if (companyData?.vapi?.vapi_assistant_id) {
      // This would integrate with Vapi's calling functionality
      alert(`Calling ${companyData.company.company_name} AI Assistant...`);
    }
  };

  const handleChatAgent = () => {
    if (companyData?.vapi?.vapi_assistant_id) {
      // This would open a chat interface
      alert(`Opening chat with ${companyData.company.company_name} AI Assistant...`);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0A0B1E] text-white flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin mx-auto mb-4 text-cyan-400" />
          <p className="text-gray-400">Loading company information...</p>
        </div>
      </div>
    );
  }

  if (error || !companyData) {
    return (
      <div className="min-h-screen bg-[#0A0B1E] text-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <Building className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-2xl font-mono font-bold mb-4 text-red-400">
            {error || 'Company Not Found'}
          </h2>
          <p className="text-gray-400 mb-6">
            The company you're looking for doesn't exist or is not available.
          </p>
          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg hover:from-cyan-600 hover:to-blue-600 transition-all"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  const { company, research, content, vapi, website } = companyData;

  return (
    <div className="min-h-screen bg-[#0A0B1E] text-white">
      {/* Header */}
      <header className="bg-gradient-to-r from-[#0A0B1E] to-[#1A1B2E] border-b border-gray-800">
        <div className="container mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => navigate('/')}
                className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                Back
              </button>
              <div className="h-8 w-px bg-gray-700"></div>
              <div>
                <h1 className="text-2xl font-mono font-bold text-white">
                  {company.company_name}
                </h1>
                <p className="text-sm text-gray-400">
                  AI-Powered Business Intelligence
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              {vapi?.vapi_assistant_id && (
                <>
                  <button
                    onClick={handleCallAgent}
                    className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 rounded-lg transition-colors"
                  >
                    <Phone className="w-4 h-4" />
                    Call AI Agent
                  </button>
                  <button
                    onClick={handleChatAgent}
                    className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
                  >
                    <MessageSquare className="w-4 h-4" />
                    Chat AI Agent
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Company Overview */}
          <div className="lg:col-span-2">
            <div className="bg-gradient-to-br from-[#1A1B2E] to-[#2A2B3E] rounded-xl p-8 mb-8">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full flex items-center justify-center">
                  <Building className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-mono font-bold text-white">
                    {company.company_name}
                  </h2>
                  {company.industry && (
                    <p className="text-cyan-400 font-mono">{company.industry}</p>
                  )}
                </div>
              </div>

              {company.business_description && (
                <div className="mb-6">
                  <h3 className="text-lg font-mono font-semibold mb-3 text-white">About</h3>
                  <p className="text-gray-300 leading-relaxed">
                    {company.business_description}
                  </p>
                </div>
              )}

              {content?.icebreaker && (
                <div className="mb-6">
                  <h3 className="text-lg font-mono font-semibold mb-3 text-white">AI Icebreaker</h3>
                  <div className="bg-[#0A0B1E] rounded-lg p-4 border border-gray-700">
                    <p className="text-gray-300 italic">"{content.icebreaker}"</p>
                  </div>
                </div>
              )}

              {research?.combined_research && (
                <div>
                  <h3 className="text-lg font-mono font-semibold mb-3 text-white">Business Intelligence</h3>
                  <div className="bg-[#0A0B1E] rounded-lg p-4 border border-gray-700 max-h-64 overflow-y-auto">
                    <p className="text-gray-300 text-sm leading-relaxed">
                      {research.combined_research.substring(0, 500)}...
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Research Insights */}
            {research && (
              <div className="bg-gradient-to-br from-[#1A1B2E] to-[#2A2B3E] rounded-xl p-8">
                <h3 className="text-xl font-mono font-bold mb-6 text-white">Research Insights</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {research.market_structure_size && (
                    <div className="bg-[#0A0B1E] rounded-lg p-4 border border-gray-700">
                      <h4 className="font-mono font-semibold mb-2 text-cyan-400">Market Structure</h4>
                      <p className="text-gray-300 text-sm">
                        {research.market_structure_size.substring(0, 200)}...
                      </p>
                    </div>
                  )}
                  {research.competitors_substitutes_moats && (
                    <div className="bg-[#0A0B1E] rounded-lg p-4 border border-gray-700">
                      <h4 className="font-mono font-semibold mb-2 text-cyan-400">Competitive Analysis</h4>
                      <p className="text-gray-300 text-sm">
                        {research.competitors_substitutes_moats.substring(0, 200)}...
                      </p>
                    </div>
                  )}
                  {research.technology_operations_capability && (
                    <div className="bg-[#0A0B1E] rounded-lg p-4 border border-gray-700">
                      <h4 className="font-mono font-semibold mb-2 text-cyan-400">Technology & Operations</h4>
                      <p className="text-gray-300 text-sm">
                        {research.technology_operations_capability.substring(0, 200)}...
                      </p>
                    </div>
                  )}
                  {research.economics_value_chain && (
                    <div className="bg-[#0A0B1E] rounded-lg p-4 border border-gray-700">
                      <h4 className="font-mono font-semibold mb-2 text-cyan-400">Economics & Value Chain</h4>
                      <p className="text-gray-300 text-sm">
                        {research.economics_value_chain.substring(0, 200)}...
                      </p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* AI Agent Status */}
            {vapi?.vapi_assistant_id && (
              <div className="bg-gradient-to-br from-green-900/20 to-green-800/20 rounded-xl p-6 border border-green-700/30">
                <div className="flex items-center gap-3 mb-4">
                  <CheckCircle className="w-6 h-6 text-green-400" />
                  <h3 className="text-lg font-mono font-semibold text-white">AI Agent Active</h3>
                </div>
                <p className="text-gray-300 text-sm mb-4">
                  Your personalized AI voice assistant is ready to help with business intelligence and consultation.
                </p>
                <div className="space-y-3">
                  <button
                    onClick={handleCallAgent}
                    className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-green-600 hover:bg-green-700 rounded-lg transition-colors"
                  >
                    <Phone className="w-4 h-4" />
                    Call AI Agent
                  </button>
                  <button
                    onClick={handleChatAgent}
                    className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
                  >
                    <MessageSquare className="w-4 h-4" />
                    Chat AI Agent
                  </button>
                </div>
              </div>
            )}

            {/* Quick Stats */}
            <div className="bg-gradient-to-br from-[#1A1B2E] to-[#2A2B3E] rounded-xl p-6">
              <h3 className="text-lg font-mono font-semibold mb-4 text-white">Quick Stats</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Industry</span>
                  <span className="text-white font-mono">{company.industry || 'N/A'}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">AI Agent</span>
                  <span className="text-green-400 font-mono">
                    {vapi?.vapi_assistant_id ? 'Active' : 'Inactive'}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Website</span>
                  <span className="text-blue-400 font-mono">
                    {website?.is_published ? 'Published' : 'Draft'}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Research</span>
                  <span className="text-cyan-400 font-mono">
                    {research ? 'Complete' : 'Pending'}
                  </span>
                </div>
              </div>
            </div>

            {/* Contact Information */}
            <div className="bg-gradient-to-br from-[#1A1B2E] to-[#2A2B3E] rounded-xl p-6">
              <h3 className="text-lg font-mono font-semibold mb-4 text-white">Get Started</h3>
              <p className="text-gray-300 text-sm mb-4">
                Ready to explore AI-powered business intelligence for your company?
              </p>
              <button
                onClick={() => navigate('/demo')}
                className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 rounded-lg transition-all"
              >
                <Target className="w-4 h-4" />
                Request Your Demo
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default CompanyPage;
