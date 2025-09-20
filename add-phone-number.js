#!/usr/bin/env node

/**
 * Add Phone Number to VAPI
 * This script adds a phone number to your VAPI account
 */

const https = require('https');

class VapiPhoneManager {
  constructor(apiKey) {
    this.apiKey = apiKey;
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

  async listPhoneNumbers() {
    console.log('📞 Fetching existing phone numbers...');
    try {
      const response = await this.makeRequest('/phone-number');
      if (response.statusCode === 200) {
        console.log('✅ Phone numbers retrieved successfully');
        console.log('📋 Current phone numbers:');
        if (response.data && response.data.length > 0) {
          response.data.forEach((phone, index) => {
            console.log(`   ${index + 1}. ${phone.number} (${phone.status})`);
          });
        } else {
          console.log('   No phone numbers found');
        }
        return response.data;
      } else {
        console.error(`❌ Failed to fetch phone numbers: ${response.statusCode}`);
        console.error('Response:', response.data);
        return null;
      }
    } catch (error) {
      console.error('❌ Error fetching phone numbers:', error.message);
      return null;
    }
  }

  async purchasePhoneNumber(phoneNumber) {
    console.log(`📞 Attempting to purchase phone number: ${phoneNumber}...`);
    
    // First, let's check if the number is available
    try {
      const response = await this.makeRequest(`/phone-number/available?number=${phoneNumber}`);
      if (response.statusCode === 200) {
        console.log('✅ Phone number is available for purchase');
      } else {
        console.log('⚠️  Phone number availability check failed, proceeding with purchase attempt...');
      }
    } catch (error) {
      console.log('⚠️  Could not check availability, proceeding with purchase attempt...');
    }

    // Attempt to purchase the phone number
    try {
      const purchaseData = {
        number: phoneNumber,
        provider: 'vapi'  // Using VAPI provider instead of Twilio
      };

      const response = await this.makeRequest('/phone-number', 'POST', purchaseData);
      
      if (response.statusCode === 200 || response.statusCode === 201) {
        console.log('✅ Phone number purchased successfully!');
        console.log('📋 Phone number details:');
        console.log(`   Number: ${response.data.number}`);
        console.log(`   Status: ${response.data.status}`);
        console.log(`   ID: ${response.data.id}`);
        return response.data;
      } else {
        console.error(`❌ Failed to purchase phone number: ${response.statusCode}`);
        console.error('Response:', response.data);
        return null;
      }
    } catch (error) {
      console.error('❌ Error purchasing phone number:', error.message);
      return null;
    }
  }

  async addExistingPhoneNumber(phoneNumber) {
    console.log(`📞 Adding existing phone number: ${phoneNumber}...`);
    
    try {
      const addData = {
        number: phoneNumber,
        provider: 'vapi'  // Using VAPI provider instead of Twilio
      };

      const response = await this.makeRequest('/phone-number', 'POST', addData);
      
      if (response.statusCode === 200 || response.statusCode === 201) {
        console.log('✅ Phone number added successfully!');
        console.log('📋 Phone number details:');
        console.log(`   Number: ${response.data.number}`);
        console.log(`   Status: ${response.data.status}`);
        console.log(`   ID: ${response.data.id}`);
        return response.data;
      } else {
        console.error(`❌ Failed to add phone number: ${response.statusCode}`);
        console.error('Response:', response.data);
        return null;
      }
    } catch (error) {
      console.error('❌ Error adding phone number:', error.message);
      return null;
    }
  }
}

// Main execution
async function main() {
  const apiKey = 'e68bd505-55f0-450a-8993-f4f28c0226b5';
  const phoneNumber = '+18339572961';
  
  console.log('🚀 VAPI Phone Number Manager');
  console.log('============================');
  console.log(`API Key: ${apiKey.substring(0, 8)}...`);
  console.log(`Phone Number: ${phoneNumber}`);
  console.log('');

  const phoneManager = new VapiPhoneManager(apiKey);

  // First, list existing phone numbers
  await phoneManager.listPhoneNumbers();
  console.log('');

  // Try to add the phone number
  console.log('🔄 Attempting to add phone number...');
  const result = await phoneManager.addExistingPhoneNumber(phoneNumber);
  
  if (result) {
    console.log('');
    console.log('🎉 SUCCESS! Phone number has been added to your VAPI account.');
    console.log('You can now use this number for outbound calls.');
  } else {
    console.log('');
    console.log('❌ FAILED! Could not add phone number.');
    console.log('This might be because:');
    console.log('   - The number is already in your account');
    console.log('   - The number is not available');
    console.log('   - There was an API error');
    console.log('');
    console.log('Let\'s check your current phone numbers again...');
    await phoneManager.listPhoneNumbers();
  }
}

// Run the script
if (require.main === module) {
  main().catch(console.error);
}

module.exports = VapiPhoneManager;
