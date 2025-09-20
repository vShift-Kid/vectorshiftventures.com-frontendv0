#!/usr/bin/env node

/**
 * VAPI MCP Client for System Integration
 * This script provides VAPI MCP tools for use in Cursor and other applications
 */

const Vapi = require('@vapi-ai/web').default;
const { Client } = require('@modelcontextprotocol/sdk/client/index.js');
const { StdioClientTransport } = require('@modelcontextprotocol/sdk/client/stdio.js');

class VapiMCPClient {
  constructor(apiKey, assistantId) {
    this.apiKey = apiKey;
    this.assistantId = assistantId;
    this.vapi = null;
    this.mcpClient = null;
    this.isInitialized = false;
  }

  async initialize() {
    try {
      // Initialize VAPI client
      this.vapi = new Vapi(this.apiKey);
      
      // Set up event listeners
      this.setupEventListeners();
      
      console.log('✅ VAPI MCP Client initialized successfully');
      this.isInitialized = true;
      
      return true;
    } catch (error) {
      console.error('❌ Failed to initialize VAPI MCP Client:', error);
      return false;
    }
  }

  setupEventListeners() {
    if (!this.vapi) return;

    this.vapi.on('call-start', (data) => {
      console.log('📞 Call started:', data);
    });

    this.vapi.on('call-end', (data) => {
      console.log('📞 Call ended:', data);
    });

    this.vapi.on('speech-start', (data) => {
      console.log('🎤 Speech started:', data);
    });

    this.vapi.on('speech-end', (data) => {
      console.log('🎤 Speech ended:', data);
    });

    this.vapi.on('message', (data) => {
      console.log('💬 Message received:', data);
    });

    this.vapi.on('error', (error) => {
      console.error('❌ VAPI Error:', error);
    });
  }

  async startCall() {
    if (!this.isInitialized) {
      throw new Error('VAPI MCP Client not initialized');
    }

    try {
      console.log('🚀 Starting VAPI call...');
      await this.vapi.start({
        assistantId: this.assistantId
      });
      console.log('✅ VAPI call started successfully');
    } catch (error) {
      console.error('❌ Failed to start call:', error);
      throw error;
    }
  }

  async stopCall() {
    if (!this.vapi) return;

    try {
      console.log('🛑 Stopping VAPI call...');
      await this.vapi.stop();
      console.log('✅ VAPI call stopped successfully');
    } catch (error) {
      console.error('❌ Failed to stop call:', error);
      throw error;
    }
  }

  async makePhoneCall(phoneNumber, purpose = 'General inquiry') {
    if (!this.isInitialized) {
      throw new Error('VAPI MCP Client not initialized');
    }

    try {
      console.log(`📞 Initiating phone call to ${phoneNumber} for: ${purpose}`);
      
      // Start the call
      await this.startCall();
      
      // In a real implementation, you would configure the call to dial the phone number
      // This would require additional VAPI configuration for outbound calls
      
      return {
        success: true,
        phoneNumber,
        purpose,
        timestamp: new Date().toISOString()
      };
    } catch (error) {
      console.error('❌ Failed to make phone call:', error);
      throw error;
    }
  }

  async sendSMS(phoneNumber, message) {
    if (!this.isInitialized) {
      throw new Error('VAPI MCP Client not initialized');
    }

    try {
      console.log(`📱 Sending SMS to ${phoneNumber}: ${message}`);
      
      // This would integrate with SMS providers through MCP tools
      // For now, we'll simulate the action
      
      return {
        success: true,
        phoneNumber,
        message,
        timestamp: new Date().toISOString()
      };
    } catch (error) {
      console.error('❌ Failed to send SMS:', error);
      throw error;
    }
  }

  async sendEmail(to, subject, body) {
    if (!this.isInitialized) {
      throw new Error('VAPI MCP Client not initialized');
    }

    try {
      console.log(`📧 Sending email to ${to}: ${subject}`);
      
      // This would integrate with email providers through MCP tools
      // For now, we'll simulate the action
      
      return {
        success: true,
        to,
        subject,
        body,
        timestamp: new Date().toISOString()
      };
    } catch (error) {
      console.error('❌ Failed to send email:', error);
      throw error;
    }
  }

  getStatus() {
    return {
      initialized: this.isInitialized,
      apiKey: this.apiKey ? '***' + this.apiKey.slice(-4) : 'Not set',
      assistantId: this.assistantId,
      vapiReady: !!this.vapi
    };
  }
}

// CLI interface
async function main() {
  const args = process.argv.slice(2);
  const command = args[0];

  // Configuration
  const API_KEY = process.env.VAPI_API_KEY || 'e68bd505-55f0-450a-8993-f4f28c0226b5';
  const ASSISTANT_ID = process.env.VAPI_ASSISTANT_ID || '94189137-6370-4561-a03f-a69e22fd29de';

  const client = new VapiMCPClient(API_KEY, ASSISTANT_ID);

  switch (command) {
    case 'init':
      await client.initialize();
      break;

    case 'start':
      await client.initialize();
      await client.startCall();
      break;

    case 'stop':
      await client.initialize();
      await client.stopCall();
      break;

    case 'call':
      const phoneNumber = args[1];
      const purpose = args[2] || 'General inquiry';
      if (!phoneNumber) {
        console.error('❌ Phone number required. Usage: node vapi-mcp-client.js call <phone-number> [purpose]');
        process.exit(1);
      }
      await client.initialize();
      await client.makePhoneCall(phoneNumber, purpose);
      break;

    case 'sms':
      const smsPhone = args[1];
      const message = args[2];
      if (!smsPhone || !message) {
        console.error('❌ Phone number and message required. Usage: node vapi-mcp-client.js sms <phone-number> <message>');
        process.exit(1);
      }
      await client.initialize();
      await client.sendSMS(smsPhone, message);
      break;

    case 'email':
      const to = args[1];
      const subject = args[2];
      const body = args[3];
      if (!to || !subject || !body) {
        console.error('❌ To, subject, and body required. Usage: node vapi-mcp-client.js email <to> <subject> <body>');
        process.exit(1);
      }
      await client.initialize();
      await client.sendEmail(to, subject, body);
      break;

    case 'status':
      await client.initialize();
      console.log('📊 VAPI MCP Client Status:');
      console.log(JSON.stringify(client.getStatus(), null, 2));
      break;

    default:
      console.log(`
🔧 VAPI MCP Client - System Integration Tool

Usage: node vapi-mcp-client.js <command> [options]

Commands:
  init                    Initialize the VAPI MCP client
  start                   Start a voice call
  stop                    Stop the current call
  call <phone> [purpose]  Make a phone call
  sms <phone> <message>   Send an SMS
  email <to> <subject> <body>  Send an email
  status                  Show client status

Environment Variables:
  VAPI_API_KEY           Your VAPI API key (default: uses existing key)
  VAPI_ASSISTANT_ID      Your VAPI assistant ID (default: uses existing ID)

Examples:
  node vapi-mcp-client.js init
  node vapi-mcp-client.js call "+1234567890" "Lead qualification"
  node vapi-mcp-client.js sms "+1234567890" "Hello from VAPI!"
  node vapi-mcp-client.js email "user@example.com" "Test" "This is a test email"
  node vapi-mcp-client.js status
      `);
  }
}

if (require.main === module) {
  main().catch(console.error);
}

module.exports = VapiMCPClient;
