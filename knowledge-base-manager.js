#!/usr/bin/env node

/**
 * Knowledge Base Manager for VAPI Agent
 * Allows easy addition and management of business knowledge
 */

const https = require('https');
const fs = require('fs');
const path = require('path');

class KnowledgeBaseManager {
  constructor() {
    this.apiKey = process.env.VAPI_API_KEY || 'e68bd505-55f0-450a-8993-f4f28c0226b5';
    this.agentId = process.env.VAPI_ASSISTANT_ID || 'b8ddcdb9-1bb5-4cef-8a09-69c386230084';
    this.baseUrl = 'https://api.vapi.ai';
    this.knowledgeFile = path.join(__dirname, 'knowledge-base.json');
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

  loadKnowledgeBase() {
    try {
      if (fs.existsSync(this.knowledgeFile)) {
        const data = fs.readFileSync(this.knowledgeFile, 'utf8');
        return JSON.parse(data);
      }
    } catch (error) {
      console.log('Creating new knowledge base...');
    }
    
    return {
      categories: {},
      lastUpdated: new Date().toISOString()
    };
  }

  saveKnowledgeBase(knowledge) {
    knowledge.lastUpdated = new Date().toISOString();
    fs.writeFileSync(this.knowledgeFile, JSON.stringify(knowledge, null, 2));
  }

  addKnowledge(category, question, answer, tags = []) {
    const knowledge = this.loadKnowledgeBase();
    
    if (!knowledge.categories[category]) {
      knowledge.categories[category] = [];
    }
    
    const entry = {
      id: Date.now().toString(),
      question,
      answer,
      tags,
      createdAt: new Date().toISOString()
    };
    
    knowledge.categories[category].push(entry);
    this.saveKnowledgeBase(knowledge);
    
    console.log(`✅ Added knowledge entry to category: ${category}`);
    console.log(`   Question: ${question}`);
    console.log(`   Answer: ${answer.substring(0, 100)}...`);
    
    return entry;
  }

  getDefaultKnowledgeBase() {
    return {
      "company_overview": [
        {
          "question": "What is Vector Shift Ventures?",
          "answer": "Vector Shift Ventures is a field service management automation company that helps businesses streamline their mobile workforce operations. We provide AI-powered solutions including scheduling systems, real-time tracking, automated dispatch, and customer support automation.",
          "tags": ["company", "overview", "services"]
        },
        {
          "question": "What industries do you serve?",
          "answer": "We serve a wide range of field service industries including HVAC, plumbing, electrical, security, telecommunications, healthcare, manufacturing, and any business that provides on-site services. Our solutions are customizable for different industry needs.",
          "tags": ["industries", "clients", "services"]
        }
      ],
      "services": [
        {
          "question": "What services do you offer?",
          "answer": "We offer comprehensive field service management solutions including mobile workforce management, customer scheduling systems, real-time GPS tracking, automated dispatch, AI-powered customer support, mobile apps for technicians, and detailed reporting and analytics.",
          "tags": ["services", "solutions", "features"]
        },
        {
          "question": "How does your scheduling system work?",
          "answer": "Our scheduling system allows customers to book appointments online, automatically dispatches the best available technician based on location and skills, sends real-time updates to customers, and integrates with your existing calendar systems. It can handle complex scheduling rules and recurring appointments.",
          "tags": ["scheduling", "appointments", "dispatch"]
        },
        {
          "question": "What is real-time tracking?",
          "answer": "Our real-time tracking system shows you exactly where your technicians are, estimates arrival times, helps optimize routes, and allows customers to track their service appointments in real-time. This improves customer satisfaction and operational efficiency.",
          "tags": ["tracking", "GPS", "location", "efficiency"]
        }
      ],
      "pricing": [
        {
          "question": "How much does it cost?",
          "answer": "Our pricing is based on the number of technicians and features you need. We offer flexible plans from basic packages to enterprise solutions. We provide free consultations to understand your specific needs and create custom pricing. Would you like me to connect you with our sales team for a detailed quote?",
          "tags": ["pricing", "cost", "plans", "quote"]
        },
        {
          "question": "Do you offer free trials?",
          "answer": "Yes! We offer free demos and pilot programs where you can test our solutions with your team. We also provide free consultations to analyze your business needs and create a custom automation strategy. This helps you see exactly how our solutions work for your specific business.",
          "tags": ["trial", "demo", "consultation", "free"]
        }
      ],
      "technical": [
        {
          "question": "Do you integrate with existing systems?",
          "answer": "Yes, our solutions integrate seamlessly with your existing systems including CRM, accounting software, and other business tools. We provide custom integrations to ensure everything works together smoothly and your team can continue using familiar tools.",
          "tags": ["integration", "existing", "systems", "compatibility"]
        },
        {
          "question": "Is there a mobile app for technicians?",
          "answer": "Yes, we provide a comprehensive mobile app for technicians that includes real-time job updates, GPS navigation, customer information, offline capability, and the ability to update job status on the go. It syncs when connected and ensures technicians always have the information they need.",
          "tags": ["mobile", "app", "technicians", "offline"]
        }
      ],
      "support": [
        {
          "question": "What kind of support do you provide?",
          "answer": "We provide comprehensive support including 24/7 technical support, training for your team, regular updates, and ongoing consultation. Our support team is available to help with any questions or issues, and we provide regular check-ins to ensure everything is working optimally.",
          "tags": ["support", "training", "help", "24/7"]
        },
        {
          "question": "How quickly can you implement the system?",
          "answer": "Implementation time varies based on your specific needs and complexity. Typically, basic setups can be running within 2-4 weeks, while more complex enterprise implementations may take 6-8 weeks. We work closely with you throughout the process to ensure smooth implementation.",
          "tags": ["implementation", "timeline", "setup", "deployment"]
        }
      ]
    };
  }

  async initializeDefaultKnowledge() {
    console.log('📚 Initializing default knowledge base...');
    
    const defaultKnowledge = this.getDefaultKnowledgeBase();
    const knowledge = this.loadKnowledgeBase();
    
    for (const [category, entries] of Object.entries(defaultKnowledge)) {
      if (!knowledge.categories[category]) {
        knowledge.categories[category] = [];
      }
      
      for (const entry of entries) {
        const existing = knowledge.categories[category].find(e => e.question === entry.question);
        if (!existing) {
          knowledge.categories[category].push({
            ...entry,
            id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
            createdAt: new Date().toISOString()
          });
        }
      }
    }
    
    this.saveKnowledgeBase(knowledge);
    console.log('✅ Default knowledge base initialized!');
    console.log(`   Categories: ${Object.keys(knowledge.categories).length}`);
    console.log(`   Total entries: ${Object.values(knowledge.categories).flat().length}`);
  }

  listKnowledge() {
    const knowledge = this.loadKnowledgeBase();
    
    console.log('📚 Current Knowledge Base:');
    console.log(`   Last Updated: ${knowledge.lastUpdated}`);
    console.log('');
    
    for (const [category, entries] of Object.entries(knowledge.categories)) {
      console.log(`📁 ${category.toUpperCase()}:`);
      entries.forEach((entry, index) => {
        console.log(`   ${index + 1}. ${entry.question}`);
        console.log(`      Answer: ${entry.answer.substring(0, 80)}...`);
        console.log(`      Tags: ${entry.tags.join(', ')}`);
        console.log('');
      });
    }
  }

  searchKnowledge(query) {
    const knowledge = this.loadKnowledgeBase();
    const results = [];
    
    for (const [category, entries] of Object.entries(knowledge.categories)) {
      for (const entry of entries) {
        if (entry.question.toLowerCase().includes(query.toLowerCase()) ||
            entry.answer.toLowerCase().includes(query.toLowerCase()) ||
            entry.tags.some(tag => tag.toLowerCase().includes(query.toLowerCase()))) {
          results.push({ ...entry, category });
        }
      }
    }
    
    console.log(`🔍 Search results for "${query}":`);
    if (results.length === 0) {
      console.log('   No results found.');
    } else {
      results.forEach((result, index) => {
        console.log(`   ${index + 1}. [${result.category}] ${result.question}`);
        console.log(`      ${result.answer.substring(0, 100)}...`);
        console.log('');
      });
    }
    
    return results;
  }

  async updateAgentWithKnowledge() {
    try {
      console.log('🔄 Updating agent with current knowledge base...');
      
      const knowledge = this.loadKnowledgeBase();
      const allEntries = Object.values(knowledge.categories).flat();
      
      if (allEntries.length === 0) {
        console.log('❌ No knowledge entries found. Run "init" first.');
        return;
      }
      
      // Get current agent configuration
      const agentResponse = await this.makeRequest(`/assistant/${this.agentId}`);
      
      if (agentResponse.status !== 200) {
        console.log('❌ Failed to get agent configuration');
        return;
      }
      
      const agent = agentResponse.data;
      
      // Create knowledge base entries for VAPI
      const knowledgeBase = allEntries.map(entry => ({
        question: entry.question,
        answer: entry.answer
      }));
      
      // Update agent with knowledge base
      const updatedAgent = {
        ...agent,
        knowledgeBase: {
          entries: knowledgeBase
        }
      };
      
      const updateResponse = await this.makeRequest(`/assistant/${this.agentId}`, 'PUT', updatedAgent);
      
      if (updateResponse.status === 200) {
        console.log('✅ Agent updated with knowledge base!');
        console.log(`   Knowledge entries: ${knowledgeBase.length}`);
        console.log(`   Categories: ${Object.keys(knowledge.categories).length}`);
      } else {
        console.log('❌ Failed to update agent with knowledge base');
        console.log(`   Status: ${updateResponse.status}`);
        console.log(`   Error: ${JSON.stringify(updateResponse.data, null, 2)}`);
      }
      
    } catch (error) {
      console.error('❌ Error updating agent:', error.message);
    }
  }
}

// CLI Interface
if (require.main === module) {
  const manager = new KnowledgeBaseManager();
  const command = process.argv[2];
  
  switch (command) {
    case 'init':
      manager.initializeDefaultKnowledge();
      break;
    case 'add':
      const category = process.argv[3];
      const question = process.argv[4];
      const answer = process.argv[5];
      if (!category || !question || !answer) {
        console.log('Usage: node knowledge-base-manager.js add <category> "<question>" "<answer>"');
        process.exit(1);
      }
      manager.addKnowledge(category, question, answer);
      break;
    case 'list':
      manager.listKnowledge();
      break;
    case 'search':
      const query = process.argv[3];
      if (!query) {
        console.log('Usage: node knowledge-base-manager.js search <query>');
        process.exit(1);
      }
      manager.searchKnowledge(query);
      break;
    case 'update':
      manager.updateAgentWithKnowledge();
      break;
    default:
      console.log('Knowledge Base Manager for VAPI Agent');
      console.log('');
      console.log('Usage: node knowledge-base-manager.js <command>');
      console.log('');
      console.log('Commands:');
      console.log('  init                    - Initialize with default knowledge base');
      console.log('  add <category> "<q>" "<a>" - Add new knowledge entry');
      console.log('  list                    - List all knowledge entries');
      console.log('  search <query>          - Search knowledge base');
      console.log('  update                  - Update agent with current knowledge');
      console.log('');
      console.log('Examples:');
      console.log('  node knowledge-base-manager.js init');
      console.log('  node knowledge-base-manager.js add pricing "What are your plans?" "We offer three plans..."');
      console.log('  node knowledge-base-manager.js search "scheduling"');
      console.log('  node knowledge-base-manager.js update');
  }
}

module.exports = KnowledgeBaseManager;
