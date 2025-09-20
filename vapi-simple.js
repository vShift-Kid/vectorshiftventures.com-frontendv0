#!/usr/bin/env node

/**
 * Simple VAPI Client for System Integration
 * This script provides basic VAPI functionality for system use
 */

const https = require('https');
const fs = require('fs');
const path = require('path');

class SimpleVapiClient {
  constructor(apiKey, assistantId) {
    this.apiKey = apiKey;
    this.assistantId = assistantId;
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
            resolve(body);
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
      console.log('✅ Call created:', response.id);
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
      console.log('✅ Call status:', response.status);
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
      console.log('✅ Call ended');
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
      console.log(`✅ Found ${response.length || 0} calls`);
      return response;
    } catch (error) {
      console.error('❌ Failed to fetch calls:', error.message);
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
}

// CLI interface
async function main() {
  const args = process.argv.slice(2);
  const command = args[0];

  // Configuration
  const API_KEY = process.env.VAPI_API_KEY || 'e68bd505-55f0-450a-8993-f4f28c0226b5';
  const ASSISTANT_ID = process.env.VAPI_ASSISTANT_ID || '94189137-6370-4561-a03f-a69e22fd29de';

  const client = new SimpleVapiClient(API_KEY, ASSISTANT_ID);

  switch (command) {
    case 'assistant':
      await client.getAssistant();
      break;

    case 'call':
      const phoneNumber = args[1];
      const customerName = args[2];
      if (!phoneNumber) {
        console.error('❌ Phone number required. Usage: node vapi-simple.js call <phone-number> [customer-name]');
        process.exit(1);
      }
      await client.createCall(phoneNumber, customerName);
      break;

    case 'status':
      const callId = args[1];
      if (!callId) {
        console.error('❌ Call ID required. Usage: node vapi-simple.js status <call-id>');
        process.exit(1);
      }
      await client.getCall(callId);
      break;

    case 'end':
      const endCallId = args[1];
      if (!endCallId) {
        console.error('❌ Call ID required. Usage: node vapi-simple.js end <call-id>');
        process.exit(1);
      }
      await client.endCall(endCallId);
      break;

    case 'list':
      const limit = args[1] || 10;
      await client.getCalls(parseInt(limit));
      break;

    case 'info':
      console.log('📊 VAPI Client Status:');
      console.log(JSON.stringify(client.getStatus(), null, 2));
      break;

    default:
      console.log(`
🔧 VAPI Simple Client - System Integration Tool

Usage: node vapi-simple.js <command> [options]

Commands:
  assistant                    Get assistant information
  call <phone> [name]          Create a phone call
  status <call-id>             Get call status
  end <call-id>                End a call
  list [limit]                 List recent calls
  info                         Show client status

Environment Variables:
  VAPI_API_KEY                Your VAPI API key (default: uses existing key)
  VAPI_ASSISTANT_ID           Your VAPI assistant ID (default: uses existing ID)

Examples:
  node vapi-simple.js assistant
  node vapi-simple.js call "+1234567890" "John Doe"
  node vapi-simple.js status "call-123"
  node vapi-simple.js end "call-123"
  node vapi-simple.js list 20
  node vapi-simple.js info

📖 For more information, visit: https://docs.vapi.ai/
      `);
  }
}

if (require.main === module) {
  main().catch(console.error);
}

module.exports = SimpleVapiClient;
