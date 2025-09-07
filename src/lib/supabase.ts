import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || process.env.REACT_APP_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || process.env.REACT_APP_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Missing Supabase configuration. Please set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Database types for TypeScript
export interface Company {
  id: string;
  slug: string;
  company_name: string;
  domain_name?: string;
  industry?: string;
  business_description?: string;
  status: 'active' | 'inactive';
  created_at: string;
  updated_at: string;
}

export interface Lead {
  id: string;
  company_id: string;
  full_name: string;
  email?: string;
  phone?: string;
  consultation_package?: string;
  preferred_date?: string;
  preferred_time?: string;
  status: 'pending' | 'completed' | 'failed';
  created_at: string;
  updated_at: string;
}

export interface ResearchData {
  id: string;
  company_id: string;
  macro_events_trajectory?: string;
  market_structure_size?: string;
  customers_market_structure?: string;
  competitors_substitutes_moats?: string;
  economics_value_chain?: string;
  regulation_standards_risk?: string;
  technology_operations_capability?: string;
  combined_research?: string;
  created_at: string;
  updated_at: string;
}

export interface GeneratedContent {
  id: string;
  company_id: string;
  icebreaker?: string;
  website_instructions?: string;
  seo_strategy?: string;
  voice_agent_system_prompt?: string;
  created_at: string;
  updated_at: string;
}

export interface VapiIntegration {
  id: string;
  company_id: string;
  vapi_file_id?: string;
  vapi_tool_id?: string;
  vapi_assistant_id?: string;
  knowledge_base_url?: string;
  created_at: string;
  updated_at: string;
}

export interface WebsiteConfig {
  id: string;
  company_id: string;
  website_url?: string;
  custom_domain?: string;
  theme_config?: any;
  content_config?: any;
  is_published: boolean;
  created_at: string;
  updated_at: string;
}
