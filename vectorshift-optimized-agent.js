#!/usr/bin/env node

/**
 * VectorShift Ventures Optimized VAPI Agent
 * Complete setup with knowledge base and business-specific configuration
 */

const https = require('https');
const fs = require('fs');
const path = require('path');

class VectorShiftOptimizedAgent {
  constructor() {
    this.apiKey = process.env.VAPI_API_KEY || 'e68bd505-55f0-450a-8993-f4f28c0226b5';
    this.agentId = process.env.VAPI_ASSISTANT_ID || 'b8ddcdb9-1bb5-4cef-8a09-69c386230084';
    this.baseUrl = 'https://api.vapi.ai';
    this.knowledgeBase = this.loadKnowledgeBase();
  }

  loadKnowledgeBase() {
    try {
      const kbPath = path.join(__dirname, 'enhanced-knowledge-base.json');
      const kbData = fs.readFileSync(kbPath, 'utf8');
      return JSON.parse(kbData);
    } catch (error) {
      console.error('❌ Error loading knowledge base:', error.message);
      return null;
    }
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

  getOptimizedAgentConfig() {
    return {
      name: "VectorShift AI Sales Agent",
      model: {
        provider: "openai",
        model: "gpt-4o",
        temperature: 0.7,
        maxTokens: 2000
      },
      voice: {
        provider: "11labs",
        voiceId: "21m00Tcm4TlvDq8ikWAM", // Professional male voice
        stability: 0.5,
        similarityBoost: 0.8
      },
      firstMessage: "Hello! Thank you for calling VectorShift Ventures. I'm your AI automation specialist, and I'm here to help you discover how our AI software solutions can transform your field service business operations. I can help you understand our products, schedule a custom demo, answer questions about pricing, or connect you with our technical team. How can I assist you with your field service automation needs today?",
      maxDurationSeconds: 1800, // 30 minutes
      recordingEnabled: true,
      voicemailDetectionEnabled: true,
      fillersEnabled: true,
      backchannelingEnabled: true,
      endCallFunctionEnabled: true,
      functions: this.getOptimizedFunctions()
    };
  }

  getSystemMessage() {
    return `You are VectorShift Ventures' AI Sales & Support Agent, specializing in AI automation solutions for field service businesses. 

COMPANY OVERVIEW:
- VectorShift Ventures is an AI Automation Software Company founded in 2024
- We specialize in transforming field service operations with AI automation solutions
- Our mission is to help field service businesses reduce costs, improve efficiency, and enhance customer experience
- We serve 500+ companies with 99% customer satisfaction and 60% average cost reduction

TARGET INDUSTRIES:
HVAC & Climate Control, Plumbing Services, Electrical Services, Maintenance & Repair, Landscaping & Grounds, Cleaning Services, Security & Access Control, Technology & Communications, Utilities & Infrastructure, Manufacturing & Industrial, Healthcare & Medical, Transportation & Logistics

KEY PRODUCTS:
1. Field Service Voice Assistant - B2B AI voice assistant for field service operations
2. Online Reputation Management - Digital presence optimization and brand reputation enhancement
3. Lead Generation & CRM - End-to-end lead capture, qualification, and customer relationship management
4. Custom AI Chatbots - Intelligent conversational AI trained on business data
5. Data Analysis & Insights - Advanced analytics and actionable business intelligence
6. Workflow Integrations - Seamless automation across existing business systems

CONSULTATION PACKAGES:
- Discovery Call (30 min, Free) - Initial consultation to understand automation needs
- Strategy Consultation (60 min, $297) - Comprehensive consultation with custom strategy planning
- Technical Planning (45 min, $197) - Deep dive into technical requirements and implementation

CONVERSATION GUIDELINES:
- Always be professional, helpful, and solution-focused
- Ask qualifying questions to understand their specific needs
- Focus on ROI and business benefits
- Offer specific solutions based on their industry and challenges
- Always try to schedule a demo or consultation
- Handle complaints professionally and escalate when necessary
- Use the knowledge base to provide accurate information about products and services

LEAD QUALIFICATION:
- Hot Lead: Immediate need (within 30 days), budget authority confirmed, decision maker identified
- Warm Lead: Planning phase (1-3 months), budget range provided, multiple stakeholders involved
- Cold Lead: Exploratory phase (3+ months), no budget discussion, general information gathering

Remember: You're representing a premium AI automation company. Be confident, knowledgeable, and always focus on how we can solve their specific business challenges.`;
  }

  formatKnowledgeBase() {
    if (!this.knowledgeBase) return '';
    
    let formatted = '';
    
    // Company info
    formatted += `COMPANY: ${this.knowledgeBase.company_info.name}\n`;
    formatted += `TYPE: ${this.knowledgeBase.company_info.type}\n`;
    formatted += `MISSION: ${this.knowledgeBase.company_info.mission}\n`;
    formatted += `WEBSITE: ${this.knowledgeBase.company_info.website}\n`;
    formatted += `PHONE: ${this.knowledgeBase.company_info.phone}\n\n`;
    
    // Products and services
    formatted += "PRODUCTS AND SERVICES:\n";
    this.knowledgeBase.products_and_services.main_products.forEach((product, index) => {
      formatted += `${index + 1}. ${product.name}\n`;
      formatted += `   Description: ${product.description}\n`;
      formatted += `   Features: ${product.features.join(', ')}\n`;
      formatted += `   Benefits: ${product.benefits.join(', ')}\n`;
      if (product.pricing) formatted += `   Pricing: ${product.pricing}\n`;
      formatted += '\n';
    });
    
    // Target industries
    formatted += `TARGET INDUSTRIES: ${this.knowledgeBase.target_industries.join(', ')}\n\n`;
    
    // Consultation packages
    formatted += "CONSULTATION PACKAGES:\n";
    this.knowledgeBase.consultation_packages.forEach((pkg, index) => {
      formatted += `${index + 1}. ${pkg.name}\n`;
      formatted += `   Duration: ${pkg.duration}\n`;
      formatted += `   Price: ${pkg.price}\n`;
      formatted += `   Description: ${pkg.description}\n`;
      formatted += `   Features: ${pkg.features.join(', ')}\n`;
      if (pkg.recommended) formatted += `   RECOMMENDED\n`;
      formatted += '\n';
    });
    
    // Common questions
    formatted += "COMMON QUESTIONS AND ANSWERS:\n";
    Object.entries(this.knowledgeBase.common_questions).forEach(([key, qa]) => {
      formatted += `Q: ${qa.question}\n`;
      formatted += `A: ${qa.answer}\n`;
      if (qa.follow_up) formatted += `Follow-up: ${qa.follow_up}\n`;
      formatted += '\n';
    });
    
    // Lead qualification
    formatted += "LEAD QUALIFICATION CRITERIA:\n";
    Object.entries(this.knowledgeBase.lead_qualification.qualification_criteria).forEach(([type, criteria]) => {
      formatted += `${type.toUpperCase()}: ${criteria.join(', ')}\n`;
    });
    formatted += '\n';
    
    // Complaint handling
    formatted += "COMPLAINT HANDLING:\n";
    Object.entries(this.knowledgeBase.complaint_handling).forEach(([type, handling]) => {
      formatted += `${type.toUpperCase()}: ${handling.response}\n`;
      formatted += `Escalation: ${handling.escalation}\n`;
      formatted += `Information needed: ${handling.information_needed.join(', ')}\n\n`;
    });
    
    return formatted;
  }

  getOptimizedFunctions() {
    return [
      {
        name: "schedule_demo",
        description: "Schedule a custom demo package for potential customers",
        parameters: {
          type: "object",
          properties: {
            customer_name: { type: "string", description: "Full name of the customer" },
            company_name: { type: "string", description: "Name of the customer's company" },
            phone_number: { type: "string", description: "Customer's phone number" },
            email: { type: "string", description: "Customer's email address" },
            industry: { type: "string", description: "Type of field service business" },
            team_size: { type: "string", description: "Number of technicians in their team" },
            current_challenges: { type: "string", description: "Main operational challenges they're facing" },
            preferred_date: { type: "string", description: "Customer's preferred date for demo" },
            preferred_time: { type: "string", description: "Customer's preferred time for demo" },
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
            customer_name: { type: "string", description: "Full name of the customer" },
            company_name: { type: "string", description: "Name of the customer's company" },
            phone_number: { type: "string", description: "Customer's phone number" },
            email: { type: "string", description: "Customer's email address" },
            industry: { type: "string", description: "Type of field service business" },
            team_size: { type: "string", description: "Number of technicians" },
            current_system: { type: "string", description: "What they currently use for field service management" },
            main_pain_points: { 
              type: "array", 
              items: { type: "string" },
              description: "Main challenges they're facing" 
            },
            decision_makers: { 
              type: "array", 
              items: { type: "string" },
              description: "Who makes decisions about technology investments" 
            },
            budget_range: { 
              type: "string", 
              enum: ["under_500", "500_1000", "1000_2500", "2500_5000", "over_5000"],
              description: "Their monthly budget range" 
            },
            timeline: { type: "string", description: "When they're looking to implement automation" },
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
            customer_name: { type: "string", description: "Full name of the customer" },
            company_name: { type: "string", description: "Name of the customer's company" },
            phone_number: { type: "string", description: "Customer's phone number" },
            email: { type: "string", description: "Customer's email address" },
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
            detailed_description: { type: "string", description: "Detailed description of the complaint" },
            affected_product: { type: "string", description: "Which product or service is affected" },
            escalation_department: { 
              type: "string", 
              enum: ["technical_support", "billing", "product_team", "customer_success"],
              description: "Which department should handle this" 
            },
            best_time_to_call: { type: "string", description: "Best time to call back" }
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
            customer_name: { type: "string", description: "Full name of the customer" },
            company_name: { type: "string", description: "Name of the customer's company" },
            phone_number: { type: "string", description: "Customer's phone number" },
            email: { type: "string", description: "Customer's email address" },
            industry: { type: "string", description: "Type of field service business" },
            team_size: { type: "string", description: "Number of technicians" },
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
            customer_name: { type: "string", description: "Full name of the customer" },
            company_name: { type: "string", description: "Name of the customer's company" },
            phone_number: { type: "string", description: "Customer's phone number" },
            email: { type: "string", description: "Customer's email address" },
            industry: { type: "string", description: "Type of field service business" },
            consultation_type: { 
              type: "string", 
              enum: ["discovery_call", "strategy_consultation", "technical_planning"],
              description: "Type of consultation requested" 
            },
            preferred_date: { type: "string", description: "Customer's preferred date" },
            preferred_time: { type: "string", description: "Customer's preferred time" },
            business_description: { type: "string", description: "Brief description of their business and needs" },
            urgency: { 
              type: "string", 
              enum: ["immediate", "within_week", "within_month", "exploring"],
              description: "How urgent their need is" 
            }
          },
          required: ["customer_name", "phone_number", "consultation_type", "preferred_date", "preferred_time"]
        }
      }
    ];
  }

  async createOrUpdateAgent() {
    try {
      console.log('🚀 Setting up VectorShift Ventures Optimized VAPI Agent...');
      
      const agentConfig = this.getOptimizedAgentConfig();
      
      console.log('📋 Agent Configuration:');
      console.log(`   Name: ${agentConfig.name}`);
      console.log(`   Model: ${agentConfig.model.provider}/${agentConfig.model.model}`);
      console.log(`   Voice: ${agentConfig.voice.provider}/${agentConfig.voice.voiceId}`);
      console.log(`   Functions: ${agentConfig.functions.length} available`);
      console.log(`   Knowledge Base: ${agentConfig.knowledgeBase ? 'Loaded' : 'Not available'}`);
      console.log(`   Max Duration: ${agentConfig.maxDurationSeconds / 60} minutes`);
      
      // Try to update existing agent first
      const updateResponse = await this.makeRequest(`/assistant/${this.agentId}`, 'PUT', agentConfig);
      
      if (updateResponse.status === 200) {
        console.log('✅ Agent updated successfully!');
        console.log(`   Agent ID: ${this.agentId}`);
        console.log(`   Status: Active`);
      } else if (updateResponse.status === 404) {
        // Agent doesn't exist, create new one
        console.log('📝 Agent not found, creating new agent...');
        const createResponse = await this.makeRequest('/assistant', 'POST', agentConfig);
        
        if (createResponse.status === 201) {
          console.log('✅ Agent created successfully!');
          console.log(`   Agent ID: ${createResponse.data.id}`);
          console.log(`   Status: ${createResponse.data.status}`);
        } else {
          console.log('❌ Failed to create agent:');
          console.log(`   Status: ${createResponse.status}`);
          console.log(`   Error: ${JSON.stringify(createResponse.data, null, 2)}`);
          return;
        }
      } else {
        console.log('❌ Failed to update agent:');
        console.log(`   Status: ${updateResponse.status}`);
        console.log(`   Error: ${JSON.stringify(updateResponse.data, null, 2)}`);
        return;
      }
      
      console.log('\n🎯 VectorShift Ventures AI Agent Capabilities:');
      console.log('   • Schedule custom demo packages (24-48 hour delivery)');
      console.log('   • Qualify leads with industry-specific questions');
      console.log('   • Handle product complaints and technical support');
      console.log('   • Provide pricing information and custom quotes');
      console.log('   • Schedule consultations (Discovery, Strategy, Technical)');
      console.log('   • Field service industry expertise');
      console.log('   • AI automation software knowledge');
      console.log('   • Professional voice and conversation flow');
      
      console.log('\n📞 Ready for VectorShift Ventures Sales & Support Calls!');
      console.log(`   Test with: VAPI_API_KEY=${this.apiKey} VAPI_ASSISTANT_ID=${this.agentId} node test-call-direct.js`);
      
    } catch (error) {
      console.error('❌ Error setting up agent:', error.message);
    }
  }

  async testAgent() {
    try {
      console.log('🧪 Testing VectorShift Ventures agent...');
      
      const response = await this.makeRequest(`/assistant/${this.agentId}`);
      
      if (response.status === 200) {
        console.log('✅ Agent test successful!');
        console.log(`   Name: ${response.data.name}`);
        console.log(`   Status: ${response.data.status || 'Active'}`);
        console.log(`   Model: ${response.data.model?.provider}/${response.data.model?.model}`);
        console.log(`   Voice: ${response.data.voice?.provider}/${response.data.voice?.voiceId}`);
        console.log(`   Functions: ${response.data.functions?.length || 0} available`);
        console.log(`   Knowledge Base: ${response.data.knowledgeBase ? 'Loaded' : 'Not available'}`);
        console.log(`   Max Duration: ${response.data.maxDurationSeconds / 60} minutes`);
      } else {
        console.log('❌ Agent test failed:', response.data);
      }
      
    } catch (error) {
      console.error('❌ Error testing agent:', error.message);
    }
  }

  async getPhoneNumbers() {
    try {
      console.log('📞 Fetching available phone numbers...');
      
      const response = await this.makeRequest('/phone-number');
      
      if (response.status === 200) {
        console.log('✅ Phone numbers retrieved:');
        response.data.forEach((phone, index) => {
          console.log(`   ${index + 1}. ${phone.number} (${phone.cost})`);
        });
        return response.data;
      } else {
        console.log('❌ Failed to get phone numbers:', response.data);
        return [];
      }
      
    } catch (error) {
      console.error('❌ Error getting phone numbers:', error.message);
      return [];
    }
  }
}

// Run the script
if (require.main === module) {
  const agent = new VectorShiftOptimizedAgent();
  
  const command = process.argv[2];
  
  switch (command) {
    case 'setup':
      agent.createOrUpdateAgent();
      break;
    case 'test':
      agent.testAgent();
      break;
    case 'phones':
      agent.getPhoneNumbers();
      break;
    default:
      console.log('VectorShift Ventures VAPI Agent Setup');
      console.log('Usage: node vectorshift-optimized-agent.js [command]');
      console.log('');
      console.log('Commands:');
      console.log('  setup  - Create or update the optimized agent');
      console.log('  test   - Test the current agent configuration');
      console.log('  phones - List available phone numbers');
      console.log('');
      console.log('Environment Variables:');
      console.log('  VAPI_API_KEY - Your VAPI API key');
      console.log('  VAPI_ASSISTANT_ID - Your assistant ID (optional)');
  }
}

module.exports = VectorShiftOptimizedAgent;
