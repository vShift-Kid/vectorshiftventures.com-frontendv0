#!/usr/bin/env node

/**
 * Direct VAPI Test Call
 * This script makes a test call using the VAPI web SDK directly
 */

const Vapi = require('@vapi-ai/web').default;

async function makeTestCall() {
  try {
    // Initialize VAPI client
    const apiKey = 'e68bd505-55f0-450a-8993-f4f28c0226b5';
    const assistantId = 'b8ddcdb9-1bb5-4cef-8a09-69c386230084';
    const phoneNumberId = '27c6a53f-04fe-485e-b591-f0ef230aec57';
    
    console.log('🚀 Initializing VAPI client...');
    const vapi = new Vapi(apiKey);
    
    // Set up event listeners
    vapi.on('call-start', (data) => {
      console.log('📞 Call started:', data);
    });

    vapi.on('call-end', (data) => {
      console.log('📞 Call ended:', data);
    });

    vapi.on('speech-start', (data) => {
      console.log('🎤 Speech started:', data);
    });

    vapi.on('speech-end', (data) => {
      console.log('🎤 Speech ended:', data);
    });

    vapi.on('message', (data) => {
      console.log('💬 Message received:', data);
    });

    vapi.on('error', (error) => {
      console.error('❌ VAPI Error:', error);
    });

    console.log('📞 Making test call...');
    console.log(`   Assistant ID: ${assistantId}`);
    console.log(`   Phone Number ID: ${phoneNumberId}`);
    console.log(`   Customer Number: +13134899078`);
    
    // Make the call using the VAPI REST API directly
    const response = await fetch('https://api.vapi.ai/call', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        assistantId: assistantId,
        phoneNumberId: phoneNumberId,
        customer: {
          number: '+13134899078'
        }
      })
    });

    if (!response.ok) {
      const errorData = await response.text();
      throw new Error(`HTTP ${response.status}: ${errorData}`);
    }

    const callData = await response.json();
    console.log('✅ Call created successfully!');
    console.log('📋 Call Details:');
    console.log(`   Call ID: ${callData.id}`);
    console.log(`   Status: ${callData.status}`);
    console.log(`   Customer: ${callData.customer?.number}`);
    console.log(`   Assistant: ${callData.assistant?.name || 'Unknown'}`);
    console.log(`   Phone Number: ${callData.phoneNumber?.number || 'Unknown'}`);
    
    return callData;
    
  } catch (error) {
    console.error('❌ Error making test call:', error.message);
    throw error;
  }
}

// Run the test
makeTestCall()
  .then((callData) => {
    console.log('\n🎉 Test call completed successfully!');
    console.log('Call data:', JSON.stringify(callData, null, 2));
  })
  .catch((error) => {
    console.error('\n💥 Test call failed:', error.message);
    process.exit(1);
  });
