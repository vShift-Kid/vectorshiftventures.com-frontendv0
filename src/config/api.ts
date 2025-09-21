// API Configuration
export const API_CONFIG = {
  // Unified Webhook URL for all forms
  WEBHOOK_URL: process.env.REACT_APP_N8N_WEBHOOK_URL || 'https://vectorshift-n8n-ventures.onrender.com/webhook/vectorshift-consultation-enhanced-fixed',
  
  // API Base URLs
  BASE_URL: process.env.REACT_APP_API_BASE_URL || 'https://your-api-domain.com',
  
  // Timeouts
  REQUEST_TIMEOUT: 30000, // 30 seconds
};

// Helper function to get webhook URL
export const getWebhookUrl = () => {
  return API_CONFIG.WEBHOOK_URL;
}; 