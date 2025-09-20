#!/usr/bin/env node

/**
 * Simple Phone Number Addition to VAPI
 * This script attempts to add a phone number using different API approaches
 */

const https = require('https');

const API_KEY = 'e68bd505-55f0-450a-8993-f4f28c0226b5';
const PHONE_NUMBER = '+18339572961';

async function makeRequest(endpoint, method = 'GET', data = null) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'api.vapi.ai',
      port: 443,
      path: endpoint,
      method: method,
      headers: {
        'Authorization': `Bearer ${API_KEY}`,
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
          const parsedData = responseData ? JSON.parse(responseData) : {};
          resolve({
            statusCode: res.statusCode,
            data: parsedData,
            headers: res.headers
          });
        } catch (error) {
          resolve({
            statusCode: res.statusCode,
            data: responseData,
            headers: res.headers
          });
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

async function main() {
  console.log('🚀 Simple VAPI Phone Number Addition');
  console.log('=====================================');
  console.log(`Phone Number: ${PHONE_NUMBER}`);
  console.log('');

  // First, let's see what phone numbers we currently have
  console.log('📞 Current phone numbers:');
  try {
    const response = await makeRequest('/phone-number');
    if (response.statusCode === 200) {
      if (response.data && response.data.length > 0) {
        response.data.forEach((phone, index) => {
          console.log(`   ${index + 1}. ${phone.number} (${phone.status})`);
        });
      } else {
        console.log('   No phone numbers found');
      }
    } else {
      console.log(`   Error fetching phone numbers: ${response.statusCode}`);
    }
  } catch (error) {
    console.log(`   Error: ${error.message}`);
  }

  console.log('');

  // Try different approaches to add the phone number
  const approaches = [
    {
      name: 'Approach 1: Direct purchase with VAPI provider',
      data: {
        number: PHONE_NUMBER,
        provider: 'vapi'
      }
    },
    {
      name: 'Approach 2: Purchase with Twilio provider',
      data: {
        number: PHONE_NUMBER,
        provider: 'twilio'
      }
    },
    {
      name: 'Approach 3: Simple number addition',
      data: {
        phoneNumber: PHONE_NUMBER
      }
    },
    {
      name: 'Approach 4: With country code',
      data: {
        number: PHONE_NUMBER,
        countryCode: 'US'
      }
    }
  ];

  for (const approach of approaches) {
    console.log(`🔄 ${approach.name}...`);
    try {
      const response = await makeRequest('/phone-number', 'POST', approach.data);
      
      if (response.statusCode === 200 || response.statusCode === 201) {
        console.log('✅ SUCCESS! Phone number added successfully!');
        console.log('📋 Details:', response.data);
        return;
      } else {
        console.log(`❌ Failed: ${response.statusCode}`);
        console.log('   Response:', response.data);
      }
    } catch (error) {
      console.log(`❌ Error: ${error.message}`);
    }
    console.log('');
  }

  console.log('❌ All approaches failed. The phone number might not be available or there might be account limitations.');
  console.log('');
  console.log('💡 Suggestions:');
  console.log('   - Check if the number is already in your account');
  console.log('   - Verify the number format is correct');
  console.log('   - Check if your account has permission to add phone numbers');
  console.log('   - Try a different phone number');
}

main().catch(console.error);
