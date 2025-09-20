#!/usr/bin/env node

/**
 * VAPI Webhook Setup Script
 * Configures webhooks for VectorShift Ventures
 */

const https = require('https');

class VapiWebhookSetup {
  constructor() {
    this.apiKey = process.env.VAPI_API_KEY || 'e68bd505-55f0-450a-8993-f4f28c0226b5';
    this.baseUrl = 'https://api.vapi.ai';
    this.webhookUrl = process.env.WEBHOOK_URL || 'http://localhost:3001/webhook/vapi';
  }

  makeRequest(endpoint, method = 'GET', data = null) {
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
        let responseData = '';
        res.on('data', (chunk) => {
          responseData += chunk;
        });
        res.on('end', () => {
          try {
            const parsed = JSON.parse(responseData);
            resolve({ status: res.statusCode, data: parsed });
          } catch (e) {
            resolve({ status: res.statusCode, data: responseData });
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

  async listWebhooks() {
    try {
      console.log('📋 Fetching existing webhooks...');
      const response = await this.makeRequest('/webhook');
      
      if (response.status === 200) {
        console.log('✅ Webhooks retrieved successfully');
        console.log(`   Found ${response.data.length} webhook(s)`);
        
        response.data.forEach((webhook, index) => {
          console.log(`   ${index + 1}. ${webhook.url} (${webhook.events?.join(', ') || 'No events'})`);
        });
        
        return response.data;
      } else {
        console.log('❌ Failed to fetch webhooks:', response.data);
        return [];
      }
    } catch (error) {
      console.error('❌ Error fetching webhooks:', error.message);
      return [];
    }
  }

  async createWebhook() {
    try {
      console.log('🚀 Creating VAPI webhook...');
      console.log(`   Webhook URL: ${this.webhookUrl}`);
      
      const webhookData = {
        url: this.webhookUrl,
        events: [
          'call-start',
          'call-end',
          'call-update',
          'function-call',
          'speech-start',
          'speech-end',
          'message',
          'error'
        ],
        secret: 'vsv-webhook-secret-2024'
      };
      
      const response = await this.makeRequest('/webhook', 'POST', webhookData);
      
      if (response.status === 201 || response.status === 200) {
        console.log('✅ Webhook created successfully!');
        console.log(`   Webhook ID: ${response.data.id}`);
        console.log(`   URL: ${response.data.url}`);
        console.log(`   Events: ${response.data.events?.join(', ')}`);
        return response.data;
      } else {
        console.log('❌ Failed to create webhook:');
        console.log(`   Status: ${response.status}`);
        console.log(`   Error: ${JSON.stringify(response.data, null, 2)}`);
        return null;
      }
    } catch (error) {
      console.error('❌ Error creating webhook:', error.message);
      return null;
    }
  }

  async updateWebhook(webhookId) {
    try {
      console.log(`🔄 Updating webhook ${webhookId}...`);
      
      const webhookData = {
        url: this.webhookUrl,
        events: [
          'call-start',
          'call-end',
          'call-update',
          'function-call',
          'speech-start',
          'speech-end',
          'message',
          'error'
        ],
        secret: 'vsv-webhook-secret-2024'
      };
      
      const response = await this.makeRequest(`/webhook/${webhookId}`, 'PUT', webhookData);
      
      if (response.status === 200) {
        console.log('✅ Webhook updated successfully!');
        console.log(`   Webhook ID: ${response.data.id}`);
        console.log(`   URL: ${response.data.url}`);
        console.log(`   Events: ${response.data.events?.join(', ')}`);
        return response.data;
      } else {
        console.log('❌ Failed to update webhook:');
        console.log(`   Status: ${response.status}`);
        console.log(`   Error: ${JSON.stringify(response.data, null, 2)}`);
        return null;
      }
    } catch (error) {
      console.error('❌ Error updating webhook:', error.message);
      return null;
    }
  }

  async deleteWebhook(webhookId) {
    try {
      console.log(`🗑️  Deleting webhook ${webhookId}...`);
      
      const response = await this.makeRequest(`/webhook/${webhookId}`, 'DELETE');
      
      if (response.status === 200 || response.status === 204) {
        console.log('✅ Webhook deleted successfully!');
        return true;
      } else {
        console.log('❌ Failed to delete webhook:');
        console.log(`   Status: ${response.status}`);
        console.log(`   Error: ${JSON.stringify(response.data, null, 2)}`);
        return false;
      }
    } catch (error) {
      console.error('❌ Error deleting webhook:', error.message);
      return false;
    }
  }

  async setupWebhooks() {
    try {
      console.log('🔧 Setting up VAPI webhooks for VectorShift Ventures...\n');
      
      // List existing webhooks
      const existingWebhooks = await this.listWebhooks();
      
      // Check if webhook already exists
      const existingWebhook = existingWebhooks.find(wh => wh.url === this.webhookUrl);
      
      if (existingWebhook) {
        console.log(`\n🔄 Webhook already exists with ID: ${existingWebhook.id}`);
        console.log('   Updating existing webhook...');
        await this.updateWebhook(existingWebhook.id);
      } else {
        console.log('\n🆕 No existing webhook found, creating new one...');
        await this.createWebhook();
      }
      
      console.log('\n🎉 Webhook setup complete!');
      console.log('\n📋 Next steps:');
      console.log('   1. Start the webhook handler: node webhook-handler.js');
      console.log('   2. Test webhook with: curl -X POST http://localhost:3001/webhook/vapi -H "Content-Type: application/json" -d \'{"type":"test","call":{"id":"test-123"}}\'');
      console.log('   3. Make a test call to see webhook events');
      
    } catch (error) {
      console.error('❌ Error setting up webhooks:', error.message);
    }
  }

  async testWebhook() {
    try {
      console.log('🧪 Testing webhook endpoint...');
      
      const testData = {
        type: 'test',
        call: {
          id: 'test-' + Date.now()
        },
        timestamp: new Date().toISOString()
      };
      
      const response = await fetch(this.webhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(testData)
      });
      
      if (response.ok) {
        console.log('✅ Webhook test successful!');
        const result = await response.json();
        console.log('   Response:', result);
      } else {
        console.log('❌ Webhook test failed:');
        console.log(`   Status: ${response.status}`);
        const error = await response.text();
        console.log(`   Error: ${error}`);
      }
    } catch (error) {
      console.error('❌ Error testing webhook:', error.message);
    }
  }
}

// Run the script
if (require.main === module) {
  const setup = new VapiWebhookSetup();
  
  const command = process.argv[2];
  
  switch (command) {
    case 'setup':
      setup.setupWebhooks();
      break;
    case 'list':
      setup.listWebhooks();
      break;
    case 'test':
      setup.testWebhook();
      break;
    default:
      console.log('Usage: node setup-webhooks.js [setup|list|test]');
      console.log('  setup - Set up VAPI webhooks');
      console.log('  list  - List existing webhooks');
      console.log('  test  - Test webhook endpoint');
  }
}

module.exports = VapiWebhookSetup;
