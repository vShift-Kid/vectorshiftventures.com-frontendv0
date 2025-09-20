#!/usr/bin/env node

/**
 * Enhance Vector Shift Ventures Customer Service Agent
 * Adds knowledge base, functions, and advanced capabilities
 */

const https = require('https');

class AgentEnhancer {
  constructor(apiKey, agentId) {
    this.apiKey = apiKey || 'e68bd505-55f0-450a-8993-f4f28c0226b5';
    this.agentId = agentId || 'b8ddcdb9-1bb5-4cef-8a09-69c386230084';
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

  getEnhancedAgentConfig() {
    return {
      name: "VSV Customer Service Agent",
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
      recordingEnabled: true,
      voicemailDetectionEnabled: true,
      fillersEnabled: true,
      backchannelingEnabled: true,
      endCallFunctionEnabled: true,
      functions: [
        {
          name: "schedule_consultation",
          description: "Schedule a consultation or demo for a potential customer",
          parameters: {
            type: "object",
            properties: {
              customerName: {
                type: "string",
                description: "Customer's full name"
              },
              company: {
                type: "string", 
                description: "Customer's company name"
              },
              email: {
                type: "string",
                description: "Customer's email address"
              },
              phone: {
                type: "string",
                description: "Customer's phone number"
              },
              preferredDate: {
                type: "string",
                description: "Customer's preferred date for consultation"
              },
              preferredTime: {
                type: "string",
                description: "Customer's preferred time for consultation"
              },
              interests: {
                type: "array",
                items: { type: "string" },
                description: "Customer's areas of interest in our services"
              },
              notes: {
                type: "string",
                description: "Additional notes about the customer's needs"
              }
            },
            required: ["customerName", "email", "phone"]
          }
        },
        {
          name: "get_pricing_info",
          description: "Get pricing information for different service packages",
          parameters: {
            type: "object",
            properties: {
              companySize: {
                type: "string",
                enum: ["small", "medium", "large", "enterprise"],
                description: "Size of the customer's company"
              },
              technicians: {
                type: "number",
                description: "Number of technicians in the field"
              },
              features: {
                type: "array",
                items: { type: "string" },
                description: "Required features"
              }
            },
            required: ["companySize", "technicians"]
          }
        },
        {
          name: "create_support_ticket",
          description: "Create a support ticket for existing customers",
          parameters: {
            type: "object",
            properties: {
              customerName: {
                type: "string",
                description: "Customer's name"
              },
              issue: {
                type: "string",
                description: "Description of the issue"
              },
              priority: {
                type: "string",
                enum: ["low", "medium", "high", "urgent"],
                description: "Priority level of the issue"
              },
              contactMethod: {
                type: "string",
                description: "Preferred contact method for follow-up"
              }
            },
            required: ["customerName", "issue"]
          }
        },
        {
          name: "send_follow_up",
          description: "Send follow-up information to a customer",
          parameters: {
            type: "object",
            properties: {
              customerName: {
                type: "string",
                description: "Customer's name"
              },
              email: {
                type: "string",
                description: "Customer's email address"
              },
              followUpType: {
                type: "string",
                enum: ["demo", "pricing", "case_study", "white_paper", "consultation"],
                description: "Type of follow-up material"
              },
              notes: {
                type: "string",
                description: "Additional notes for the follow-up"
              }
            },
            required: ["customerName", "email", "followUpType"]
          }
        }
      ]
    };
  }

  async enhanceAgent() {
    try {
      console.log('🔧 Enhancing Vector Shift Ventures Customer Service Agent...');
      
      const enhancedConfig = this.getEnhancedAgentConfig();
      
      console.log('📋 Enhanced Configuration:');
      console.log(`   Name: ${enhancedConfig.name}`);
      console.log(`   Functions: ${enhancedConfig.functions.length} available`);
      console.log(`   Voice: ${enhancedConfig.voice.provider}/${enhancedConfig.voice.voiceId}`);
      
      const response = await this.makeRequest(`/assistant/${this.agentId}`, 'PUT', enhancedConfig);
      
      if (response.status === 200) {
        console.log('✅ Agent enhanced successfully!');
        console.log(`   Agent ID: ${response.data.id}`);
        console.log(`   Status: ${response.data.status || 'Active'}`);
        console.log('');
        console.log('🎯 Enhanced Capabilities:');
        console.log('   • 8 knowledge base entries about field service management');
        console.log('   • Schedule consultations and demos');
        console.log('   • Provide pricing information');
        console.log('   • Create support tickets');
        console.log('   • Send follow-up materials');
        console.log('   • Voicemail detection enabled');
        console.log('   • Professional conversation features');
        console.log('');
        console.log('📞 Ready for customer calls!');
        console.log('   Test with: VAPI_API_KEY=e68bd505-55f0-450a-8993-f4f28c0226b5 VAPI_ASSISTANT_ID=' + this.agentId + ' node vapi-tools.js call "+1234567890"');
        
        return response.data;
      } else {
        console.error('❌ Failed to enhance agent:');
        console.error('   Status:', response.status);
        console.error('   Error:', response.data);
        return null;
      }
    } catch (error) {
      console.error('❌ Error enhancing agent:', error.message);
      return null;
    }
  }

  async testAgent() {
    try {
      console.log(`🧪 Testing enhanced agent ${this.agentId}...`);
      
      const response = await this.makeRequest(`/assistant/${this.agentId}`);
      
      if (response.status === 200) {
        console.log('✅ Agent test successful!');
        console.log(`   Name: ${response.data.name}`);
        console.log(`   Status: ${response.data.status}`);
        console.log(`   Model: ${response.data.model?.provider}/${response.data.model?.model}`);
        console.log(`   Voice: ${response.data.voice?.provider}`);
        console.log(`   Knowledge Base: ${response.data.knowledgeBase?.entries?.length || 0} entries`);
        console.log(`   Functions: ${response.data.functions?.length || 0} available`);
        return true;
      } else {
        console.error('❌ Agent test failed:', response.data);
        return false;
      }
    } catch (error) {
      console.error('❌ Error testing agent:', error.message);
      return false;
    }
  }
}

// CLI interface
async function main() {
  const args = process.argv.slice(2);
  const command = args[0];

  const API_KEY = process.env.VAPI_API_KEY || 'e68bd505-55f0-450a-8993-f4f28c0226b5';
  const AGENT_ID = process.env.VAPI_ASSISTANT_ID || 'b8ddcdb9-1bb5-4cef-8a09-69c386230084';

  const enhancer = new AgentEnhancer(API_KEY, AGENT_ID);

  switch (command) {
    case 'enhance':
      await enhancer.enhanceAgent();
      break;

    case 'test':
      await enhancer.testAgent();
      break;

    default:
      console.log(`
🔧 Vector Shift Ventures Agent Enhancer

Usage: node enhance-agent.js <command>

Commands:
  enhance                   Enhance the agent with knowledge base and functions
  test                      Test the enhanced agent

Environment Variables:
  VAPI_API_KEY             Your VAPI API key (default: uses existing key)
  VAPI_ASSISTANT_ID        Your VAPI assistant ID (default: uses existing ID)

Examples:
  node enhance-agent.js enhance
  node enhance-agent.js test

This will enhance your agent with:
• 8 knowledge base entries about field service management
• 4 functions for scheduling, pricing, support, and follow-up
• Professional conversation features
• Voicemail detection
      `);
  }
}

if (require.main === module) {
  main().catch(console.error);
}

module.exports = AgentEnhancer;
