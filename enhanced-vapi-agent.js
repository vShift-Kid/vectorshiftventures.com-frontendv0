#!/usr/bin/env node

/**
 * Enhanced VAPI Agent for VectorShift Ventures
 * AI Automation Software Sales & Support Agent
 */

const https = require('https');

class EnhancedVapiAgent {
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

  getEnhancedAgentConfig() {
    return {
      name: "VectorShift Ventures AI Sales Agent",
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
      firstMessage: "Hello! Thank you for calling VectorShift Ventures. I'm your AI automation specialist, and I'm here to help you discover how our AI software solutions can transform your field service business operations. I can help you understand our products, schedule a demo, answer questions about pricing, or connect you with our technical team. How can I assist you with your field service automation needs today?",
      maxDurationSeconds: 1800,
      recordingEnabled: true,
      voicemailDetectionEnabled: true,
      fillersEnabled: true,
      backchannelingEnabled: true,
      endCallFunctionEnabled: true,
      functions: [
        {
          name: "schedule_demo",
          description: "Schedule a custom demo package for potential customers",
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
              industry: {
                type: "string",
                description: "Type of field service business (HVAC, plumbing, electrical, etc.)"
              },
              team_size: {
                type: "string",
                description: "Number of technicians in their team"
              },
              current_challenges: {
                type: "string",
                description: "Main operational challenges they're facing"
              },
              preferred_date: {
                type: "string",
                description: "Customer's preferred date for demo"
              },
              preferred_time: {
                type: "string",
                description: "Customer's preferred time for demo"
              },
              demo_package: {
                type: "string",
                enum: ["custom_demo", "strategy_consultation", "technical_planning"],
                description: "Type of demo package requested"
              },
              urgency: {
                type: "string",
                enum: ["immediate", "within_week", "within_month", "exploring"],
                description: "How urgent their need is"
              }
            },
            required: ["customer_name", "phone_number", "industry", "team_size"]
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
              industry: {
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
                description: "Who makes decisions about technology investments"
              },
              budget_range: {
                type: "string",
                enum: ["under_500", "500_1000", "1000_2500", "2500_5000", "over_5000"],
                description: "Their monthly budget range"
              },
              timeline: {
                type: "string",
                description: "When they're looking to implement automation"
              },
              lead_score: {
                type: "string",
                enum: ["hot", "warm", "cold"],
                description: "Qualified lead temperature"
              }
            },
            required: ["customer_name", "phone_number", "industry", "team_size"]
          }
        },
        {
          name: "handle_complaint",
          description: "Handle customer complaints about our software products",
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
              complaint_type: {
                type: "string",
                enum: ["technical_issue", "billing_inquiry", "feature_request", "service_quality", "other"],
                description: "Type of complaint"
              },
              priority: {
                type: "string",
                enum: ["high", "medium", "low"],
                description: "Priority level of the complaint"
              },
              detailed_description: {
                type: "string",
                description: "Detailed description of the complaint"
              },
              affected_product: {
                type: "string",
                description: "Which product or service is affected"
              },
              escalation_department: {
                type: "string",
                enum: ["technical_support", "billing", "product_team", "customer_success"],
                description: "Which department should handle this"
              },
              best_time_to_call: {
                type: "string",
                description: "Best time to call back"
              }
            },
            required: ["customer_name", "phone_number", "complaint_type", "detailed_description"]
          }
        },
        {
          name: "provide_pricing_info",
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
              industry: {
                type: "string",
                description: "Type of field service business"
              },
              team_size: {
                type: "string",
                description: "Number of technicians"
              },
              interested_products: {
                type: "array",
                items: {
                  type: "string",
                  enum: ["voice_assistant", "reputation_management", "lead_generation", "custom_chatbots", "data_analytics", "workflow_integrations"]
                },
                description: "Products they're interested in"
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
              },
              quote_type: {
                type: "string",
                enum: ["basic_quote", "detailed_proposal", "custom_package"],
                description: "Type of quote requested"
              }
            },
            required: ["customer_name", "phone_number", "industry", "team_size", "interested_products"]
          }
        },
        {
          name: "schedule_consultation",
          description: "Schedule a consultation call with our experts",
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
              industry: {
                type: "string",
                description: "Type of field service business"
              },
              consultation_type: {
                type: "string",
                enum: ["discovery_call", "strategy_consultation", "technical_planning"],
                description: "Type of consultation requested"
              },
              preferred_date: {
                type: "string",
                description: "Customer's preferred date"
              },
              preferred_time: {
                type: "string",
                description: "Customer's preferred time"
              },
              business_description: {
                type: "string",
                description: "Brief description of their business and needs"
              },
              urgency: {
                type: "string",
                enum: ["immediate", "within_week", "within_month", "exploring"],
                description: "How urgent their need is"
              }
            },
            required: ["customer_name", "phone_number", "consultation_type", "preferred_date", "preferred_time"]
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
                  enum: ["product_brochure", "demo_video", "case_study", "pricing_guide", "white_paper", "consultation_schedule", "custom_proposal"]
                },
                description: "Types of materials to send"
              },
              industry: {
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
      console.log('🚀 Updating VectorShift Ventures Agent with Enhanced AI Automation Sales Capabilities...');
      
      const agentConfig = this.getEnhancedAgentConfig();
      
      console.log('📋 Enhanced Agent Configuration:');
      console.log(`   Name: ${agentConfig.name}`);
      console.log(`   Functions: ${agentConfig.functions.length} available`);
      console.log(`   Voice: ${agentConfig.voice.provider}/${agentConfig.voice.voiceId}`);
      console.log(`   Max Duration: ${agentConfig.maxDurationSeconds / 60} minutes`);
      
      const response = await this.makeRequest(`/assistant/${this.agentId}`, 'PUT', agentConfig);
      
      if (response.status === 200) {
        console.log('✅ Agent updated successfully!');
        console.log(`   Agent ID: ${this.agentId}`);
        console.log(`   Status: Active`);
        
        console.log('\n🎯 Enhanced AI Automation Sales Capabilities:');
        console.log('   • Schedule custom demo packages');
        console.log('   • Qualify leads and gather business info');
        console.log('   • Handle product complaints and support');
        console.log('   • Provide pricing information and quotes');
        console.log('   • Schedule consultations with experts');
        console.log('   • Send follow-up materials');
        console.log('   • Field service industry expertise');
        console.log('   • AI automation software knowledge');
        
        console.log('\n📞 Ready for AI Automation Software Sales Calls!');
        console.log(`   Test with: VAPI_API_KEY=${this.apiKey} VAPI_ASSISTANT_ID=${this.agentId} node test-call-direct.js`);
        
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
      console.log('🧪 Testing enhanced agent...');
      
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
  const agent = new EnhancedVapiAgent();
  
  const command = process.argv[2];
  
  switch (command) {
    case 'update':
      agent.updateAgent();
      break;
    case 'test':
      agent.testAgent();
      break;
    default:
      console.log('Usage: node enhanced-vapi-agent.js [update|test]');
      console.log('  update - Update the agent with enhanced AI automation sales configuration');
      console.log('  test   - Test the current agent configuration');
  }
}

module.exports = EnhancedVapiAgent;
