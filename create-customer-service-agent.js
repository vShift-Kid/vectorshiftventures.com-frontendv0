#!/usr/bin/env node

/**
 * Create Customer Service Agent for Vector Shift Ventures
 * This script creates a VAPI assistant optimized for customer service
 */

const https = require('https');

class VapiAgentCreator {
  constructor(apiKey) {
    this.apiKey = apiKey || '349dbab8-5f4e-4c16-a1a7-5dce7e63d512';
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
            resolve({ data: response, status: res.statusCode });
          } catch (error) {
            resolve({ data: body, status: res.statusCode });
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

  createCustomerServiceAgent() {
    return {
      name: "Vector Shift Ventures Customer Service Agent",
      model: {
        provider: "openai",
        model: "gpt-4o",
        temperature: 0.7,
        maxTokens: 1000,
        systemMessage: `You are a professional customer service representative for Vector Shift Ventures, a field service management company. 

COMPANY INFORMATION:
- We specialize in field service management solutions
- We help businesses optimize their field operations
- We provide technology solutions for service teams
- We focus on efficiency, customer satisfaction, and operational excellence

YOUR ROLE:
- Provide friendly, professional, and helpful customer service
- Answer questions about our field service management solutions
- Help customers understand our services and pricing
- Schedule consultations and demos
- Resolve customer issues and concerns
- Collect customer information for follow-up

CONVERSATION GUIDELINES:
- Always be polite, patient, and professional
- Listen actively to customer needs
- Ask clarifying questions when needed
- Provide clear, accurate information
- Offer solutions that match customer needs
- End calls with clear next steps

SERVICES TO PROMOTE:
- Field service management software
- Mobile workforce optimization
- Customer scheduling and dispatch
- Real-time tracking and reporting
- Integration with existing systems
- Custom field service solutions

If you don't know something, say "Let me connect you with a specialist who can help with that specific question."

Always end by asking if there's anything else you can help with today.`
      },
      voice: {
        provider: "elevenlabs",
        voiceId: "21m00Tcm4TlvDq8ikWAM", // Professional female voice
        stability: 0.5,
        similarityBoost: 0.8
      },
      firstMessage: "Hello! Thank you for calling Vector Shift Ventures. I'm here to help you with any questions about our field service management solutions. How can I assist you today?",
      endCallMessage: "Thank you for calling Vector Shift Ventures. Have a great day!",
      endCallPhrases: ["goodbye", "bye", "thank you", "that's all", "nothing else"],
      maxDurationSeconds: 1800, // 30 minutes
      silenceTimeoutSeconds: 30,
      responseDelaySeconds: 0.8,
      interruptionThreshold: 2400,
      backgroundSound: "office",
      recordingEnabled: true,
      voicemailDetectionEnabled: true,
      fillersEnabled: true,
      backchannelingEnabled: true,
      endCallFunctionEnabled: true,
      dynamicToolCallingEnabled: true,
      knowledgeBase: {
        entries: [
          {
            question: "What is field service management?",
            answer: "Field service management is a system that helps businesses manage their mobile workforce, schedule appointments, track technicians, and optimize customer service delivery. It's perfect for companies that provide on-site services like maintenance, repairs, installations, or inspections."
          },
          {
            question: "How can Vector Shift Ventures help my business?",
            answer: "We provide comprehensive field service management solutions including mobile apps for technicians, customer scheduling systems, real-time tracking, automated dispatch, and detailed reporting. Our solutions help reduce costs, improve customer satisfaction, and increase operational efficiency."
          },
          {
            question: "What industries do you serve?",
            answer: "We serve a wide range of industries including HVAC, plumbing, electrical, security, telecommunications, healthcare, manufacturing, and any business that provides field-based services. Our solutions are customizable for different industry needs."
          },
          {
            question: "Do you offer custom solutions?",
            answer: "Yes! We understand that every business is unique. We offer custom field service management solutions tailored to your specific needs, including custom integrations with your existing systems and specialized workflows for your industry."
          },
          {
            question: "What is your pricing structure?",
            answer: "Our pricing is based on the number of technicians and features you need. We offer flexible plans starting from basic packages to enterprise solutions. I'd be happy to connect you with our sales team for a detailed quote based on your specific requirements."
          },
          {
            question: "How do I get started?",
            answer: "Getting started is easy! We offer a free consultation to understand your needs, followed by a demo of our platform. If you're interested, we can set up a pilot program to test our solution with your team. Would you like me to schedule a consultation for you?"
          }
        ]
      },
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
        }
      ]
    };
  }

  async createAgent() {
    try {
      console.log('🤖 Creating Vector Shift Ventures Customer Service Agent...');
      
      const agentData = this.createCustomerServiceAgent();
      
      console.log('📋 Agent Configuration:');
      console.log(`   Name: ${agentData.name}`);
      console.log(`   Model: ${agentData.model.provider}/${agentData.model.model}`);
      console.log(`   Voice: ${agentData.voice.provider}`);
      console.log(`   Knowledge Base: ${agentData.knowledgeBase.entries.length} entries`);
      console.log(`   Functions: ${agentData.functions.length} available`);
      
      const response = await this.makeRequest('/assistant', 'POST', agentData);
      
      if (response.status === 200 || response.status === 201) {
        console.log('✅ Customer Service Agent created successfully!');
        console.log(`   Agent ID: ${response.data.id}`);
        console.log(`   Status: ${response.data.status || 'Active'}`);
        console.log('');
        console.log('🎯 Agent Capabilities:');
        console.log('   • Professional customer service conversations');
        console.log('   • Knowledge base with 6 key topics');
        console.log('   • Schedule consultations and demos');
        console.log('   • Provide pricing information');
        console.log('   • Create support tickets');
        console.log('   • 30-minute call duration limit');
        console.log('   • Voicemail detection enabled');
        console.log('');
        console.log('📞 Ready to handle customer calls!');
        
        return response.data;
      } else {
        console.error('❌ Failed to create agent:', response.data);
        return null;
      }
    } catch (error) {
      console.error('❌ Error creating agent:', error.message);
      return null;
    }
  }

  async testAgent(agentId) {
    try {
      console.log(`🧪 Testing agent ${agentId}...`);
      
      const response = await this.makeRequest(`/assistant/${agentId}`);
      
      if (response.status === 200) {
        console.log('✅ Agent test successful!');
        console.log(`   Name: ${response.data.name}`);
        console.log(`   Status: ${response.data.status}`);
        console.log(`   Model: ${response.data.model?.provider}/${response.data.model?.model}`);
        console.log(`   Voice: ${response.data.voice?.provider}`);
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
  const creator = new VapiAgentCreator(API_KEY);

  switch (command) {
    case 'create':
      await creator.createAgent();
      break;

    case 'test':
      const agentId = args[1];
      if (!agentId) {
        console.error('❌ Agent ID required. Usage: node create-customer-service-agent.js test <agent-id>');
        process.exit(1);
      }
      await creator.testAgent(agentId);
      break;

    default:
      console.log(`
🤖 Vector Shift Ventures Customer Service Agent Creator

Usage: node create-customer-service-agent.js <command> [options]

Commands:
  create                    Create a new customer service agent
  test <agent-id>           Test an existing agent

Environment Variables:
  VAPI_API_KEY             Your VAPI API key (default: uses existing key)

Examples:
  node create-customer-service-agent.js create
  node create-customer-service-agent.js test "agent-123"

This will create a professional customer service agent with:
• Knowledge base about field service management
• Scheduling and pricing functions
• Professional voice and personality
• 30-minute call duration limit
• Voicemail detection
      `);
  }
}

if (require.main === module) {
  main().catch(console.error);
}

module.exports = VapiAgentCreator;
