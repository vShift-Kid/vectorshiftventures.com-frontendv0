#!/usr/bin/env node

/**
 * Quick Agent Template - Based on VAPI Best Practices
 * Creates a customer service agent using proven templates
 */

const https = require('https');

class QuickAgentTemplate {
  constructor(apiKey) {
    this.apiKey = apiKey || '349dbab8-5f4e-4c16-a1a7-5dce7e63d512';
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
        res.on('data', (chunk) => { body += chunk; });
        res.on('end', () => {
          try {
            const response = JSON.parse(body);
            resolve({ data: response, status: res.statusCode });
          } catch (error) {
            resolve({ data: body, status: res.statusCode });
          }
        });
      });

      req.on('error', reject);
      if (data) req.write(JSON.stringify(data));
      req.end();
    });
  }

  // Template 1: Basic Customer Service
  createBasicCustomerService() {
    return {
      name: "Vector Shift Ventures - Customer Service",
      model: {
        provider: "openai",
        model: "gpt-4o",
        temperature: 0.7,
        maxTokens: 1000
      },
      voice: {
        provider: "11labs",
        voiceId: "21m00Tcm4TlvDq8ikWAM"
      },
      firstMessage: "Hello! Thank you for calling Vector Shift Ventures. I'm here to help you with any questions about our field service management solutions. How can I assist you today?",
      maxDurationSeconds: 1800,
      recordingEnabled: true
    };
  }

  // Template 2: Sales-Focused Agent
  createSalesAgent() {
    return {
      name: "Vector Shift Ventures - Sales Agent",
      model: {
        provider: "openai",
        model: "gpt-4o",
        temperature: 0.8,
        maxTokens: 1000
      },
      voice: {
        provider: "11labs",
        voiceId: "pNInz6obpgDQGcFmaJgB"
      },
      firstMessage: "Hi! I'm calling from Vector Shift Ventures. I'd love to tell you about how we can help optimize your field service operations. Do you have a few minutes to chat?",
      maxDurationSeconds: 1200,
      recordingEnabled: true
    };
  }

  // Template 3: Support Agent
  createSupportAgent() {
    return {
      name: "Vector Shift Ventures - Support Agent",
      model: {
        provider: "openai",
        model: "gpt-4o",
        temperature: 0.6,
        maxTokens: 1000
      },
      voice: {
        provider: "11labs",
        voiceId: "EXAVITQu4vr4xnSDxMaL"
      },
      firstMessage: "Hello! This is Vector Shift Ventures support. I'm here to help with any technical questions or issues you might have. What can I assist you with?",
      maxDurationSeconds: 2400,
      recordingEnabled: true
    };
  }

  async createAgent(templateType = 'basic') {
    let agentConfig;
    
    switch (templateType) {
      case 'sales':
        agentConfig = this.createSalesAgent();
        break;
      case 'support':
        agentConfig = this.createSupportAgent();
        break;
      default:
        agentConfig = this.createBasicCustomerService();
    }

    console.log(`🤖 Creating ${templateType} agent template...`);
    console.log(`   Name: ${agentConfig.name}`);
    console.log(`   Voice: ${agentConfig.voice.provider}`);
    console.log(`   Max Duration: ${agentConfig.maxDurationSeconds / 60} minutes`);

    try {
      const response = await this.makeRequest('/assistant', 'POST', agentConfig);
      
      if (response.status === 200 || response.status === 201) {
        console.log('✅ Agent created successfully!');
        console.log(`   Agent ID: ${response.data.id}`);
        console.log(`   Status: ${response.data.status || 'Active'}`);
        console.log('');
        console.log('🎯 Ready to use!');
        console.log('   Test with: node vapi-tools.js call "+1234567890"');
        console.log('   Check status: node vapi-tools.js assistant');
        
        return response.data;
      } else {
        console.error('❌ Failed to create agent:');
        console.error('   Status:', response.status);
        console.error('   Error:', response.data);
        
        if (response.status === 401) {
          console.log('\n💡 API Key Issue:');
          console.log('   - Check your VAPI API key');
          console.log('   - Make sure you\'re using the public key, not private');
          console.log('   - Get your key from: https://dashboard.vapi.ai');
        }
        
        return null;
      }
    } catch (error) {
      console.error('❌ Error creating agent:', error.message);
      return null;
    }
  }

  async listTemplates() {
    console.log('📋 Available Agent Templates:\n');
    console.log('1. basic     - General customer service');
    console.log('2. sales     - Sales-focused agent');
    console.log('3. support   - Technical support agent\n');
    console.log('Usage: node quick-agent-template.js <template>');
    console.log('Example: node quick-agent-template.js sales');
  }
}

// CLI interface
async function main() {
  const args = process.argv.slice(2);
  const template = args[0];

  const API_KEY = process.env.VAPI_API_KEY || 'e68bd505-55f0-450a-8993-f4f28c0226b5';
  const creator = new QuickAgentTemplate(API_KEY);

  if (!template || template === 'help') {
    await creator.listTemplates();
  } else if (['basic', 'sales', 'support'].includes(template)) {
    await creator.createAgent(template);
  } else {
    console.log('❌ Invalid template. Use: basic, sales, or support');
    console.log('Run "node quick-agent-template.js help" for options.');
  }
}

if (require.main === module) {
  main().catch(console.error);
}

module.exports = QuickAgentTemplate;
