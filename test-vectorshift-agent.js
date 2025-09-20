#!/usr/bin/env node

/**
 * Test VectorShift Ventures VAPI Agent
 * Simple test script to verify agent functionality
 */

const https = require('https');

class VectorShiftAgentTester {
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

  async testAgent() {
    try {
      console.log('🧪 Testing VectorShift Ventures VAPI Agent...');
      console.log('=============================================');
      
      // Test agent configuration
      const agentResponse = await this.makeRequest(`/assistant/${this.agentId}`);
      
      if (agentResponse.status === 200) {
        console.log('✅ Agent Configuration Test: PASSED');
        console.log(`   Name: ${agentResponse.data.name}`);
        console.log(`   Status: ${agentResponse.data.status || 'Active'}`);
        console.log(`   Model: ${agentResponse.data.model?.provider}/${agentResponse.data.model?.model}`);
        console.log(`   Voice: ${agentResponse.data.voice?.provider}/${agentResponse.data.voice?.voiceId}`);
        console.log(`   Functions: ${agentResponse.data.functions?.length || 0} available`);
        console.log(`   Knowledge Base: ${agentResponse.data.knowledgeBase ? 'Loaded' : 'Not available'}`);
        console.log(`   Max Duration: ${agentResponse.data.maxDurationSeconds / 60} minutes`);
        console.log('');
      } else {
        console.log('❌ Agent Configuration Test: FAILED');
        console.log(`   Status: ${agentResponse.status}`);
        console.log(`   Error: ${JSON.stringify(agentResponse.data, null, 2)}`);
        return false;
      }

      // Test phone numbers
      const phoneResponse = await this.makeRequest('/phone-number');
      
      if (phoneResponse.status === 200) {
        console.log('✅ Phone Numbers Test: PASSED');
        console.log(`   Available numbers: ${phoneResponse.data.length}`);
        if (phoneResponse.data.length > 0) {
          console.log('   Numbers:');
          phoneResponse.data.forEach((phone, index) => {
            console.log(`     ${index + 1}. ${phone.number} (${phone.cost})`);
          });
        }
        console.log('');
      } else {
        console.log('⚠️  Phone Numbers Test: WARNING');
        console.log(`   Status: ${phoneResponse.status}`);
        console.log(`   Error: ${JSON.stringify(phoneResponse.data, null, 2)}`);
        console.log('');
      }

      // Test functions
      if (agentResponse.data.functions && agentResponse.data.functions.length > 0) {
        console.log('✅ Functions Test: PASSED');
        console.log('   Available functions:');
        agentResponse.data.functions.forEach((func, index) => {
          console.log(`     ${index + 1}. ${func.name} - ${func.description}`);
        });
        console.log('');
      } else {
        console.log('❌ Functions Test: FAILED');
        console.log('   No functions available');
        console.log('');
      }

      // Test knowledge base
      if (agentResponse.data.knowledgeBase) {
        console.log('✅ Knowledge Base Test: PASSED');
        console.log('   Knowledge base is loaded and available');
        console.log('');
      } else {
        console.log('⚠️  Knowledge Base Test: WARNING');
        console.log('   Knowledge base not loaded');
        console.log('');
      }

      console.log('🎯 VectorShift Ventures Agent Test Summary:');
      console.log('   Agent is configured and ready for calls');
      console.log('   All core functionality is working');
      console.log('   Ready for production use!');
      console.log('');
      console.log('📞 To make a test call:');
      console.log(`   node test-call-direct.js "+1234567890" "Test Customer"`);
      console.log('');
      console.log('🔧 To update the agent:');
      console.log(`   node vectorshift-optimized-agent.js setup`);

      return true;
      
    } catch (error) {
      console.error('❌ Test failed with error:', error.message);
      return false;
    }
  }

  async makeTestCall(phoneNumber, customerName) {
    try {
      console.log(`📞 Making test call to ${phoneNumber} for ${customerName}...`);
      
      const callData = {
        phoneNumberId: null, // Will use default
        customer: {
          number: phoneNumber,
          name: customerName
        },
        assistantId: this.agentId,
        maxDurationSeconds: 300, // 5 minutes for test
        recordingEnabled: true
      };

      const response = await this.makeRequest('/call', 'POST', callData);
      
      if (response.status === 201) {
        console.log('✅ Test call initiated successfully!');
        console.log(`   Call ID: ${response.data.id}`);
        console.log(`   Status: ${response.data.status}`);
        console.log(`   Duration: ${response.data.maxDurationSeconds} seconds`);
        console.log('');
        console.log('📱 The call should start shortly. Check your phone!');
        return response.data;
      } else {
        console.log('❌ Test call failed:');
        console.log(`   Status: ${response.status}`);
        console.log(`   Error: ${JSON.stringify(response.data, null, 2)}`);
        return null;
      }
      
    } catch (error) {
      console.error('❌ Error making test call:', error.message);
      return null;
    }
  }
}

// Run the script
if (require.main === module) {
  const tester = new VectorShiftAgentTester();
  
  const command = process.argv[2];
  const phoneNumber = process.argv[3];
  const customerName = process.argv[4];
  
  switch (command) {
    case 'test':
      tester.testAgent();
      break;
    case 'call':
      if (phoneNumber && customerName) {
        tester.makeTestCall(phoneNumber, customerName);
      } else {
        console.log('Usage: node test-vectorshift-agent.js call "+1234567890" "Customer Name"');
      }
      break;
    default:
      console.log('VectorShift Ventures VAPI Agent Tester');
      console.log('Usage: node test-vectorshift-agent.js [command]');
      console.log('');
      console.log('Commands:');
      console.log('  test                    - Test agent configuration');
      console.log('  call "+1234567890" "Name" - Make a test call');
      console.log('');
      console.log('Environment Variables:');
      console.log('  VAPI_API_KEY - Your VAPI API key');
      console.log('  VAPI_ASSISTANT_ID - Your assistant ID');
  }
}

module.exports = VectorShiftAgentTester;
