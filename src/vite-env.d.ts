/// <reference types="vite/client" />

// Analytics types
declare global {
  interface Window {
    dataLayer: any[];
    gtag: (...args: any[]) => void;
  }
}

// Environment variables
interface ImportMetaEnv {
  readonly VITE_VAPI_API_KEY: string;
  readonly VITE_VAPI_ASSISTANT_ID: string;
  readonly VITE_VAPI_PHONE_NUMBER_ID: string;
  readonly VITE_WEBHOOK_URL: string;
  readonly VITE_SUPABASE_URL: string;
  readonly VITE_SUPABASE_ANON_KEY: string;
  readonly VITE_GA_MEASUREMENT_ID: string;
  readonly VITE_ANALYTICS_ENABLED: string;
  readonly VITE_ANALYTICS_ENDPOINT: string;
  readonly VITE_ENABLE_PERFORMANCE_MONITORING: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
