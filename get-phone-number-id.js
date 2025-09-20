#!/usr/bin/env node

/**
 * Get Phone Number ID for VAPI
 * This script gets the phone number ID for the new phone number
 */

const https = require('https');

const API_KEY = 'e68bd505-55f0-450a-8993-f4f28c0226b5';
const TARGET_PHONE_NUMBER = '+18339572961';

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
  console.log('🔍 Getting Phone Number ID for VAPI');
  console.log('====================================');
  console.log(`Target Phone Number: ${TARGET_PHONE_NUMBER}`);
  console.log('');

  try {
    const response = await makeRequest('/phone-number');
    
    if (response.statusCode === 200) {
      console.log('✅ Phone numbers retrieved successfully');
      console.log('');
      
      if (response.data && response.data.length > 0) {
        console.log('📋 Available Phone Numbers:');
        response.data.forEach((phone, index) => {
          console.log(`   ${index + 1}. ${phone.number} (${phone.status})`);
          console.log(`      ID: ${phone.id}`);
          console.log(`      Provider: ${phone.provider || 'Unknown'}`);
          console.log('');
        });
        
        // Find the target phone number
        const targetPhone = response.data.find(phone => phone.number === TARGET_PHONE_NUMBER);
        
        if (targetPhone) {
          console.log('🎯 FOUND TARGET PHONE NUMBER!');
          console.log(`   Number: ${targetPhone.number}`);
          console.log(`   ID: ${targetPhone.id}`);
          console.log(`   Status: ${targetPhone.status}`);
          console.log(`   Provider: ${targetPhone.provider || 'Unknown'}`);
          console.log('');
          console.log('📝 To use this phone number in your app, set:');
          console.log(`   VITE_VAPI_PHONE_NUMBER_ID=${targetPhone.id}`);
          console.log('');
          console.log('🔧 Or update the hardcoded value in your components:');
          console.log(`   const phoneNumberId = '${targetPhone.id}';`);
        } else {
          console.log(`❌ Target phone number ${TARGET_PHONE_NUMBER} not found in your account.`);
          console.log('Available numbers:');
          response.data.forEach(phone => {
            console.log(`   - ${phone.number}`);
          });
        }
      } else {
        console.log('❌ No phone numbers found in your account.');
      }
    } else {
      console.error(`❌ Failed to fetch phone numbers: ${response.statusCode}`);
      console.error('Response:', response.data);
    }
  } catch (error) {
    console.error('❌ Error fetching phone numbers:', error.message);
  }
}

main().catch(console.error);
