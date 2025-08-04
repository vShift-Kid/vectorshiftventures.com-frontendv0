// API Configuration
export const API_CONFIG = {
  // n8n Webhook URLs
  N8N_WEBHOOKS: {
    DEMO_SUBMISSION: process.env.REACT_APP_N8N_DEMO_WEBHOOK_URL || 'YOUR_N8N_DEMO_WEBHOOK_URL_HERE',
    CONSULTATION_REQUEST: process.env.REACT_APP_N8N_CONSULTATION_WEBHOOK_URL || 'YOUR_N8N_CONSULTATION_WEBHOOK_URL_HERE',
  },
  
  // API Base URLs
  BASE_URL: process.env.REACT_APP_API_BASE_URL || 'https://your-api-domain.com',
  
  // Timeouts
  REQUEST_TIMEOUT: 30000, // 30 seconds
};

// Helper function to get webhook URL
export const getWebhookUrl = (type: 'demo' | 'consultation') => {
  switch (type) {
    case 'demo':
      return API_CONFIG.N8N_WEBHOOKS.DEMO_SUBMISSION;
    case 'consultation':
      return API_CONFIG.N8N_WEBHOOKS.CONSULTATION_REQUEST;
    default:
      throw new Error(`Unknown webhook type: ${type}`);
  }
}; 