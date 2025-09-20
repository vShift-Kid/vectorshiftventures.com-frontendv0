/**
 * VAPI MCP Configuration
 */

module.exports = {
  // VAPI Configuration
  vapi: {
    apiKey: process.env.VAPI_API_KEY || 'e68bd505-55f0-450a-8993-f4f28c0226b5',
    assistantId: process.env.VAPI_ASSISTANT_ID || '94189137-6370-4561-a03f-a69e22fd29de',
    baseUrl: 'https://api.vapi.ai'
  },

  // MCP Server Configuration
  mcp: {
    // Default MCP servers
    servers: {
      vapi: 'https://mcp.vapi.ai/mcp',
      zapier: 'https://mcp.zapier.com/mcp/?client=vapi',
      make: 'https://mcp.make.com/mcp',
      composio: 'https://mcp.composio.dev/mcp'
    },
    
    // Protocol settings
    protocol: 'shttp', // Streamable HTTP (recommended)
    
    // Default headers
    headers: {
      'Content-Type': 'application/json',
      'User-Agent': 'VapiMCPClient/1.0.0'
    }
  },

  // Phone calling settings
  phone: {
    defaultCountry: 'US',
    format: 'E.164', // International format
    maxDuration: 300 // 5 minutes max call duration
  },

  // SMS settings
  sms: {
    maxLength: 160,
    provider: 'twilio' // or 'vonage', 'aws-sns', etc.
  },

  // Email settings
  email: {
    provider: 'sendgrid', // or 'ses', 'mailgun', etc.
    from: 'noreply@vectorshiftventures.com'
  },

  // Logging
  logging: {
    level: 'info', // debug, info, warn, error
    file: './vapi-mcp.log'
  }
};
