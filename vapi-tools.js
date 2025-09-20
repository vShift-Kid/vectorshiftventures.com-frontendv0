#!/usr/bin/env node

/**
 * VAPI Tools - Simple Command Line Interface
 * Provides VAPI functionality without MCP dependencies
 */

const https = require('https');
const readline = require('readline');

class VapiTools {
  constructor(apiKey, assistantId) {
    this.apiKey = apiKey || '349dbab8-5f4e-4c16-a1a7-5dce7e63d512';
    this.assistantId = assistantId || '94189137-6370-4561-a03f-a69e22fd29de';
    this.baseUrl = 'https://api.vapi.ai';
  }

  async makeRequest(endpoint, method = 'GET', data = null) {
    return new Promise((resolve, reject) => {
      const options = {
        hostname: 'api.vapi.ai',
        port: 443,
        path: endpoint,
        method: method,
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json'
        }
      };

      const req = https.request(options, (res) => {
        let body = '';
        res.on('data', (chunk) => {
          body += chunk;
        });
        res.on('end', () => {
          try {
            const response = JSON.parse(body);
            resolve(response);
          } catch (error) {
            resolve({ raw: body, status: res.statusCode });
          }
        });
      });

      req.on('error', (error) => {
        reject(error);
      });

      if (data) {
        req.write(JSON.stringify(data));
      }

      req.end();
    });
  }

  async getAssistant() {
    try {
      console.log('📋 Fetching assistant information...');
      const response = await this.makeRequest(`/assistant/${this.assistantId}`);
      console.log('✅ Assistant found:', response.name || 'Unnamed Assistant');
      console.log('   ID:', response.id);
      console.log('   Status:', response.status || 'Unknown');
      return response;
    } catch (error) {
      console.error('❌ Failed to fetch assistant:', error.message);
      throw error;
    }
  }

  async createCall(phoneNumber, customerName = null) {
    try {
      console.log(`📞 Creating call to ${phoneNumber}...`);
      
      const callData = {
        assistantId: this.assistantId,
        customer: {
          number: phoneNumber
        }
      };

      if (customerName) {
        callData.customer.name = customerName;
      }

      const response = await this.makeRequest('/call', 'POST', callData);
      console.log('✅ Call created successfully!');
      console.log('   Call ID:', response.id);
      console.log('   Status:', response.status);
      console.log('   Phone:', phoneNumber);
      return response;
    } catch (error) {
      console.error('❌ Failed to create call:', error.message);
      throw error;
    }
  }

  async getCall(callId) {
    try {
      console.log(`📋 Fetching call ${callId}...`);
      const response = await this.makeRequest(`/call/${callId}`);
      console.log('✅ Call details:');
      console.log('   ID:', response.id);
      console.log('   Status:', response.status);
      console.log('   Phone:', response.customer?.number);
      console.log('   Duration:', response.duration || 'N/A');
      return response;
    } catch (error) {
      console.error('❌ Failed to fetch call:', error.message);
      throw error;
    }
  }

  async endCall(callId) {
    try {
      console.log(`🛑 Ending call ${callId}...`);
      const response = await this.makeRequest(`/call/${callId}/end`, 'POST');
      console.log('✅ Call ended successfully');
      return response;
    } catch (error) {
      console.error('❌ Failed to end call:', error.message);
      throw error;
    }
  }

  async getCalls(limit = 10) {
    try {
      console.log('📋 Fetching recent calls...');
      const response = await this.makeRequest(`/call?limit=${limit}`);
      console.log(`✅ Found ${response.length || 0} calls:`);
      
      if (response.length > 0) {
        response.forEach((call, index) => {
          console.log(`   ${index + 1}. ${call.customer?.number || 'Unknown'} - ${call.status} - ${call.duration || 0}s`);
        });
      }
      
      return response;
    } catch (error) {
      console.error('❌ Failed to fetch calls:', error.message);
      throw error;
    }
  }

  async getAssistants() {
    try {
      console.log('📋 Fetching assistants...');
      const response = await this.makeRequest('/assistant');
      console.log(`✅ Found ${response.length || 0} assistants:`);
      
      if (response.length > 0) {
        response.forEach((assistant, index) => {
          console.log(`   ${index + 1}. ${assistant.name || 'Unnamed'} (${assistant.id})`);
        });
      }
      
      return response;
    } catch (error) {
      console.error('❌ Failed to fetch assistants:', error.message);
      throw error;
    }
  }

  getStatus() {
    return {
      apiKey: this.apiKey ? '***' + this.apiKey.slice(-4) : 'Not set',
      assistantId: this.assistantId,
      baseUrl: this.baseUrl
    };
  }

  showHelp() {
    console.log(`
🔧 VAPI Tools - Command Line Interface

Usage: node vapi-tools.js <command> [options]

Commands:
  assistant                    Get assistant information
  assistants                   List all assistants
  call <phone> [name]          Create a phone call
  status <call-id>             Get call status
  end <call-id>                End a call
  calls [limit]                List recent calls
  info                         Show client status
  help                         Show this help

Environment Variables:
  VAPI_API_KEY                Your VAPI API key (default: uses existing key)
  VAPI_ASSISTANT_ID           Your VAPI assistant ID (default: uses existing ID)

Examples:
  node vapi-tools.js assistant
  node vapi-tools.js assistants
  node vapi-tools.js call "+1234567890" "John Doe"
  node vapi-tools.js status "call-123"
  node vapi-tools.js end "call-123"
  node vapi-tools.js calls 20
  node vapi-tools.js info

📖 For more information, visit: https://docs.vapi.ai/
    `);
  }
}

// CLI interface
async function main() {
  const args = process.argv.slice(2);
  const command = args[0];

  // Configuration
  const API_KEY = process.env.VAPI_API_KEY || 'e68bd505-55f0-450a-8993-f4f28c0226b5';
  const ASSISTANT_ID = process.env.VAPI_ASSISTANT_ID || '94189137-6370-4561-a03f-a69e22fd29de';

  const tools = new VapiTools(API_KEY, ASSISTANT_ID);

  switch (command) {
    case 'assistant':
      await tools.getAssistant();
      break;

    case 'assistants':
      await tools.getAssistants();
      break;

    case 'call':
      const phoneNumber = args[1];
      const customerName = args[2];
      if (!phoneNumber) {
        console.error('❌ Phone number required. Usage: node vapi-tools.js call <phone-number> [customer-name]');
        process.exit(1);
      }
      await tools.createCall(phoneNumber, customerName);
      break;

    case 'status':
      const callId = args[1];
      if (!callId) {
        console.error('❌ Call ID required. Usage: node vapi-tools.js status <call-id>');
        process.exit(1);
      }
      await tools.getCall(callId);
      break;

    case 'end':
      const endCallId = args[1];
      if (!endCallId) {
        console.error('❌ Call ID required. Usage: node vapi-tools.js end <call-id>');
        process.exit(1);
      }
      await tools.endCall(endCallId);
      break;

    case 'calls':
      const limit = args[1] || 10;
      await tools.getCalls(parseInt(limit));
      break;

    case 'info':
      console.log('📊 VAPI Tools Status:');
      console.log(JSON.stringify(tools.getStatus(), null, 2));
      break;

    case 'help':
    case '--help':
    case '-h':
      tools.showHelp();
      break;

    default:
      if (command) {
        console.error(`❌ Unknown command: ${command}`);
        console.log('Use "node vapi-tools.js help" for available commands.');
      } else {
        tools.showHelp();
      }
  }
}

if (require.main === module) {
  main().catch(console.error);
}

module.exports = VapiTools;
