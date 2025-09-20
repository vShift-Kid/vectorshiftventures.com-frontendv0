#!/usr/bin/env node

/**
 * Advanced VAPI Agent Configuration
 * Creates a comprehensive call center agent for Vector Shift Ventures
 */

const https = require('https');

class AdvancedVapiAgent {
  constructor() {
    this.apiKey = process.env.VAPI_API_KEY || 'e68bd505-55f0-450a-8993-f4f28c0226b5';
    this.agentId = process.env.VAPI_ASSISTANT_ID || 'b8ddcdb9-1bb5-4cef-8a09-69c386230084';
    this.baseUrl = 'https://api.vapi.ai';
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

  getAdvancedAgentConfig() {
    return {
      name: "VSV Advanced Call Center Agent",
      model: {
        provider: "openai",
        model: "gpt-4o",
        temperature: 0.7,
        maxTokens: 2000
      },
      voice: {
        provider: "11labs",
        voiceId: "21m00Tcm4TlvDq8ikWAM"
      },
      firstMessage: "Hello! Thank you for calling Vector Shift Ventures. I'm your advanced AI call center agent, and I'm here to help you with field service management solutions, schedule appointments, take messages, or answer any questions you have. I can help with scheduling, pricing, technical support, or connect you with the right person. How can I assist you today?",
      maxDurationSeconds: 1800,
      recordingEnabled: true,
      voicemailDetectionEnabled: true,
      fillersEnabled: true,
      backchannelingEnabled: true,
      endCallFunctionEnabled: true,
      functions: [
        {
          name: "schedule_consultation",
          description: "Schedule a consultation or demo appointment for a potential customer",
          parameters: {
            type: "object",
            properties: {
              customer_name: {
                type: "string",
                description: "Full name of the customer"
              },
              company_name: {
                type: "string",
                description: "Name of the customer's company"
              },
              phone_number: {
                type: "string",
                description: "Customer's phone number"
              },
              email: {
                type: "string",
                description: "Customer's email address"
              },
              preferred_date: {
                type: "string",
                description: "Customer's preferred date for consultation"
              },
              preferred_time: {
                type: "string",
                description: "Customer's preferred time for consultation"
              },
              business_type: {
                type: "string",
                description: "Type of field service business (HVAC, plumbing, etc.)"
              },
              team_size: {
                type: "string",
                description: "Number of technicians in their team"
              },
              current_challenges: {
                type: "string",
                description: "Main challenges they're facing with field service management"
              },
              urgency: {
                type: "string",
                enum: ["immediate", "within_week", "within_month", "exploring"],
                description: "How urgent their need is"
              }
            },
            required: ["customer_name", "phone_number", "business_type"]
          }
        },
        {
          name: "take_message",
          description: "Take a detailed message for follow-up when customer needs to speak with a human",
          parameters: {
            type: "object",
            properties: {
              customer_name: {
                type: "string",
                description: "Full name of the customer"
              },
              company_name: {
                type: "string",
                description: "Name of the customer's company"
              },
              phone_number: {
                type: "string",
                description: "Customer's phone number"
              },
              email: {
                type: "string",
                description: "Customer's email address"
              },
              message_type: {
                type: "string",
                enum: ["billing_inquiry", "technical_support", "sales_question", "complaint", "general_inquiry"],
                description: "Type of message"
              },
              priority: {
                type: "string",
                enum: ["high", "medium", "low"],
                description: "Priority level of the message"
              },
              detailed_message: {
                type: "string",
                description: "Detailed message from the customer"
              },
              best_time_to_call: {
                type: "string",
                description: "Best time to call back"
              },
              department: {
                type: "string",
                enum: ["sales", "support", "billing", "technical"],
                description: "Which department should handle this"
              }
            },
            required: ["customer_name", "phone_number", "message_type", "detailed_message"]
          }
        },
        {
          name: "get_pricing_info",
          description: "Provide pricing information and create a quote request",
          parameters: {
            type: "object",
            properties: {
              customer_name: {
                type: "string",
                description: "Full name of the customer"
              },
              company_name: {
                type: "string",
                description: "Name of the customer's company"
              },
              phone_number: {
                type: "string",
                description: "Customer's phone number"
              },
              email: {
                type: "string",
                description: "Customer's email address"
              },
              business_type: {
                type: "string",
                description: "Type of field service business"
              },
              team_size: {
                type: "string",
                description: "Number of technicians"
              },
              features_needed: {
                type: "array",
                items: {
                  type: "string"
                },
                description: "List of features they're interested in"
              },
              budget_range: {
                type: "string",
                enum: ["under_500", "500_1000", "1000_2500", "2500_5000", "over_5000"],
                description: "Their monthly budget range"
              },
              timeline: {
                type: "string",
                enum: ["immediate", "within_month", "within_quarter", "planning_ahead"],
                description: "When they want to implement"
              }
            },
            required: ["customer_name", "phone_number", "business_type", "team_size"]
          }
        },
        {
          name: "qualify_lead",
          description: "Qualify a potential lead and gather business information",
          parameters: {
            type: "object",
            properties: {
              customer_name: {
                type: "string",
                description: "Full name of the customer"
              },
              company_name: {
                type: "string",
                description: "Name of the customer's company"
              },
              phone_number: {
                type: "string",
                description: "Customer's phone number"
              },
              email: {
                type: "string",
                description: "Customer's email address"
              },
              business_type: {
                type: "string",
                description: "Type of field service business"
              },
              team_size: {
                type: "string",
                description: "Number of technicians"
              },
              current_system: {
                type: "string",
                description: "What they currently use for field service management"
              },
              main_pain_points: {
                type: "array",
                items: {
                  type: "string"
                },
                description: "Main challenges they're facing"
              },
              decision_makers: {
                type: "array",
                items: {
                  type: "string"
                },
                description: "Who makes decisions about field service systems"
              },
              budget_authority: {
                type: "string",
                enum: ["yes", "no", "influences"],
                description: "Whether they have budget authority"
              },
              timeline: {
                type: "string",
                description: "When they're looking to make a decision"
              },
              lead_score: {
                type: "string",
                enum: ["hot", "warm", "cold"],
                description: "Qualified lead temperature"
              }
            },
            required: ["customer_name", "phone_number", "business_type", "team_size"]
          }
        },
        {
          name: "send_follow_up",
          description: "Send follow-up materials and information to a customer",
          parameters: {
            type: "object",
            properties: {
              customer_name: {
                type: "string",
                description: "Full name of the customer"
              },
              email: {
                type: "string",
                description: "Customer's email address"
              },
              materials_type: {
                type: "array",
                items: {
                  type: "string",
                  enum: ["brochure", "demo_video", "case_study", "pricing_guide", "white_paper", "demo_schedule"]
                },
                description: "Types of materials to send"
              },
              business_type: {
                type: "string",
                description: "Type of field service business for personalized content"
              },
              follow_up_date: {
                type: "string",
                description: "When to follow up next"
              },
              notes: {
                type: "string",
                description: "Additional notes for the follow-up"
              }
            },
            required: ["customer_name", "email", "materials_type"]
          }
        }
      ]
    };
  }

  async updateAgent() {
    try {
      console.log('🚀 Updating Vector Shift Ventures Agent with Advanced Call Center Capabilities...');
      
      const agentConfig = this.getAdvancedAgentConfig();
      
      console.log('📋 Advanced Agent Configuration:');
      console.log(`   Name: ${agentConfig.name}`);
      console.log(`   Functions: ${agentConfig.functions.length} available`);
      console.log(`   Voice: ${agentConfig.voice.provider}/${agentConfig.voice.voiceId}`);
      console.log(`   Max Duration: ${agentConfig.maxDurationSeconds / 60} minutes`);
      
      const response = await this.makeRequest(`/assistant/${this.agentId}`, 'PUT', agentConfig);
      
      if (response.status === 200) {
        console.log('✅ Agent updated successfully!');
        console.log(`   Agent ID: ${this.agentId}`);
        console.log(`   Status: Active`);
        
        console.log('\n🎯 Advanced Call Center Capabilities:');
        console.log('   • Schedule consultations and demos');
        console.log('   • Take detailed messages for follow-up');
        console.log('   • Provide pricing information and quotes');
        console.log('   • Qualify leads and gather business info');
        console.log('   • Send follow-up materials');
        console.log('   • Handle customer support inquiries');
        console.log('   • Professional call center experience');
        
        console.log('\n📞 Ready for Advanced Customer Calls!');
        console.log(`   Test with: VAPI_API_KEY=${this.apiKey} VAPI_ASSISTANT_ID=${this.agentId} node vapi-tools.js call "+1234567890" "Test Customer"`);
        
      } else {
        console.log('❌ Failed to update agent:');
        console.log(`   Status: ${response.status}`);
        console.log(`   Error: ${JSON.stringify(response.data, null, 2)}`);
      }
      
    } catch (error) {
      console.error('❌ Error updating agent:', error.message);
    }
  }

  async testAgent() {
    try {
      console.log('🧪 Testing advanced agent...');
      
      const response = await this.makeRequest(`/assistant/${this.agentId}`);
      
      if (response.status === 200) {
        console.log('✅ Agent test successful!');
        console.log(`   Name: ${response.data.name}`);
        console.log(`   Status: ${response.data.status || 'Active'}`);
        console.log(`   Model: ${response.data.model?.provider}/${response.data.model?.model}`);
        console.log(`   Voice: ${response.data.voice?.provider}`);
        console.log(`   Functions: ${response.data.functions?.length || 0} available`);
        console.log(`   Max Duration: ${response.data.maxDurationSeconds / 60} minutes`);
      } else {
        console.log('❌ Agent test failed:', response.data);
      }
      
    } catch (error) {
      console.error('❌ Error testing agent:', error.message);
    }
  }
}

// Run the script
if (require.main === module) {
  const agent = new AdvancedVapiAgent();
  
  const command = process.argv[2];
  
  switch (command) {
    case 'update':
      agent.updateAgent();
      break;
    case 'test':
      agent.testAgent();
      break;
    default:
      console.log('Usage: node advanced-agent-config.js [update|test]');
      console.log('  update - Update the agent with advanced configuration');
      console.log('  test   - Test the current agent configuration');
  }
}

module.exports = AdvancedVapiAgent;
