#!/usr/bin/env node

/**
 * Vector Shift Ventures Agent Setup
 * Interactive setup for customer service agent
 */

const readline = require('readline');

class AgentSetup {
  constructor() {
    this.rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });
  }

  async ask(question) {
    return new Promise((resolve) => {
      this.rl.question(question, resolve);
    });
  }

  async setupAgent() {
    console.log('🤖 Vector Shift Ventures Customer Service Agent Setup\n');
    
    console.log('This will help you create a professional customer service agent for your website.');
    console.log('The agent will have:');
    console.log('• Knowledge base about field service management');
    console.log('• Professional voice and personality');
    console.log('• Scheduling and pricing functions');
    console.log('• Customer support capabilities\n');

    // Get API key
    const apiKey = await this.ask('Enter your VAPI API key (or press Enter to use default): ');
    const finalApiKey = apiKey.trim() || '349dbab8-5f4e-4c16-a1a7-5dce7e63d512';

    // Get company details
    const companyName = await this.ask('Company name (default: Vector Shift Ventures): ');
    const finalCompanyName = companyName.trim() || 'Vector Shift Ventures';

    const industry = await this.ask('Industry focus (default: Field Service Management): ');
    const finalIndustry = industry.trim() || 'Field Service Management';

    // Get voice preferences
    console.log('\nVoice Options:');
    console.log('1. Professional Female (ElevenLabs)');
    console.log('2. Professional Male (ElevenLabs)');
    console.log('3. Friendly Female (ElevenLabs)');
    console.log('4. Authoritative Male (ElevenLabs)');
    
    const voiceChoice = await this.ask('Choose voice (1-4, default: 1): ');
    const voiceOptions = {
      '1': { provider: 'elevenlabs', voiceId: '21m00Tcm4TlvDq8ikWAM', name: 'Professional Female' },
      '2': { provider: 'elevenlabs', voiceId: 'pNInz6obpgDQGcFmaJgB', name: 'Professional Male' },
      '3': { provider: 'elevenlabs', voiceId: 'EXAVITQu4vr4xnSDxMaL', name: 'Friendly Female' },
      '4': { provider: 'elevenlabs', voiceId: 'VR6AewLTigWG4xSOukaG', name: 'Authoritative Male' }
    };
    const selectedVoice = voiceOptions[voiceChoice] || voiceOptions['1'];

    // Get call duration
    const maxDuration = await this.ask('Maximum call duration in minutes (default: 30): ');
    const finalMaxDuration = parseInt(maxDuration) || 30;

    console.log('\n📋 Agent Configuration Summary:');
    console.log(`   Company: ${finalCompanyName}`);
    console.log(`   Industry: ${finalIndustry}`);
    console.log(`   Voice: ${selectedVoice.name}`);
    console.log(`   Max Duration: ${finalMaxDuration} minutes`);
    console.log(`   API Key: ${finalApiKey.slice(0, 8)}...${finalApiKey.slice(-4)}`);

    const confirm = await this.ask('\nCreate this agent? (y/N): ');
    
    if (confirm.toLowerCase() === 'y' || confirm.toLowerCase() === 'yes') {
      await this.createAgent(finalApiKey, finalCompanyName, finalIndustry, selectedVoice, finalMaxDuration);
    } else {
      console.log('❌ Agent creation cancelled.');
    }

    this.rl.close();
  }

  async createAgent(apiKey, companyName, industry, voice, maxDuration) {
    console.log('\n🤖 Creating your customer service agent...');
    
    const agentConfig = {
      name: `${companyName} Customer Service Agent`,
      model: {
        provider: "openai",
        model: "gpt-4o",
        temperature: 0.7,
        maxTokens: 1000,
        systemMessage: `You are a professional customer service representative for ${companyName}, a ${industry} company. 

COMPANY INFORMATION:
- We specialize in ${industry.toLowerCase()} solutions
- We help businesses optimize their operations
- We provide technology solutions for service teams
- We focus on efficiency, customer satisfaction, and operational excellence

YOUR ROLE:
- Provide friendly, professional, and helpful customer service
- Answer questions about our ${industry.toLowerCase()} solutions
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

If you don't know something, say "Let me connect you with a specialist who can help with that specific question."

Always end by asking if there's anything else you can help with today.`
      },
      voice: {
        provider: voice.provider,
        voiceId: voice.voiceId,
        stability: 0.5,
        similarityBoost: 0.8
      },
      firstMessage: `Hello! Thank you for calling ${companyName}. I'm here to help you with any questions about our ${industry.toLowerCase()} solutions. How can I assist you today?`,
      endCallMessage: `Thank you for calling ${companyName}. Have a great day!`,
      endCallPhrases: ["goodbye", "bye", "thank you", "that's all", "nothing else"],
      maxDurationSeconds: maxDuration * 60,
      silenceTimeoutSeconds: 30,
      responseDelaySeconds: 0.8,
      interruptionThreshold: 2400,
      backgroundSound: "office",
      recordingEnabled: true,
      voicemailDetectionEnabled: true,
      fillersEnabled: true,
      backchannelingEnabled: true,
      endCallFunctionEnabled: true,
      dynamicToolCallingEnabled: true
    };

    // Save configuration to file
    const fs = require('fs');
    const configFile = '/home/lucky-7/Applications/vapi-mcp-tools/agent-config.json';
    
    try {
      fs.writeFileSync(configFile, JSON.stringify(agentConfig, null, 2));
      console.log('✅ Agent configuration saved to agent-config.json');
      
      // Create API call script
      const apiScript = `#!/usr/bin/env node
const https = require('https');
const fs = require('fs');

const config = JSON.parse(fs.readFileSync('${configFile}', 'utf8'));
const apiKey = '${apiKey}';

async function createAgent() {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'api.vapi.ai',
      port: 443,
      path: '/assistant',
      method: 'POST',
      headers: {
        'Authorization': \`Bearer \${apiKey}\`,
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
    req.write(JSON.stringify(config));
    req.end();
  });
}

createAgent().then(result => {
  if (result.status === 200 || result.status === 201) {
    console.log('✅ Agent created successfully!');
    console.log('Agent ID:', result.data.id);
    console.log('Name:', result.data.name);
    console.log('Status:', result.data.status);
  } else {
    console.error('❌ Failed to create agent:', result.data);
  }
}).catch(console.error);
`;

      fs.writeFileSync('/home/lucky-7/Applications/vapi-mcp-tools/create-agent-api.js', apiScript);
      console.log('✅ API script created: create-agent-api.js');
      
      console.log('\n📋 Next Steps:');
      console.log('1. Verify your VAPI API key is correct');
      console.log('2. Run: node create-agent-api.js');
      console.log('3. Test your agent with: node vapi-tools.js call "+1234567890"');
      console.log('4. Integrate with your website using the agent ID');
      
    } catch (error) {
      console.error('❌ Error saving configuration:', error.message);
    }
  }
}

// Run setup
if (require.main === module) {
  const setup = new AgentSetup();
  setup.setupAgent().catch(console.error);
}

module.exports = AgentSetup;
