#!/usr/bin/env node

/**
 * Test Official VAPI MCP Server
 * This script tests the official VAPI MCP server using the streamable-HTTP protocol
 */

const { Client } = require('@modelcontextprotocol/sdk/client/index.js');
const { StreamableHTTPClientTransport } = require('@modelcontextprotocol/sdk/client/streamableHttp.js');

// Get API key from environment or use the working one
const apiKey = process.env.VAPI_TOKEN || 'e68bd505-55f0-450a-8993-f4f28c0226b5';

async function testVapiMCP() {
  try {
    // Initialize MCP client
    const mcpClient = new Client({
      name: 'vapi-test-client',
      version: '1.0.0',
    });

    // Create Streamable-HTTP transport for connection to remote Vapi MCP server
    const serverUrl = 'https://mcp.vapi.ai/mcp';
    const headers = {
      Authorization: `Bearer ${apiKey}`,
    };
    const options = {
      requestInit: { headers: headers },
    };
    const transport = new StreamableHTTPClientTransport(new URL(serverUrl), options);
    
    console.log('🔌 Connecting to Vapi MCP server via Streamable HTTP...');
    await mcpClient.connect(transport);
    console.log('✅ Connected successfully');

    // Helper function to parse tool responses
    function parseToolResponse(response) {
      if (!response?.content) return response;
      const textItem = response.content.find(item => item.type === 'text');
      if (textItem?.text) {
        try {
          return JSON.parse(textItem.text);
        } catch {
          return textItem.text;
        }
      }
      return response;
    }

    // List available tools
    console.log('\n🔧 Available tools:');
    const toolsResult = await mcpClient.listTools();
    toolsResult.tools.forEach((tool) => {
      console.log(`- ${tool.name}: ${tool.description}`);
    });

    // List assistants
    console.log('\n🤖 Your assistants:');
    const assistantsResponse = await mcpClient.callTool({
      name: 'list_assistants',
      arguments: {},
    });
    const assistants = parseToolResponse(assistantsResponse);
    if (Array.isArray(assistants) && assistants.length > 0) {
      assistants.forEach((assistant) => {
        console.log(`- ${assistant.name} (${assistant.id})`);
      });
    } else {
      console.log('No assistants found');
    }

    // List phone numbers
    console.log('\n📞 Your phone numbers:');
    const phoneNumbersResponse = await mcpClient.callTool({
      name: 'list_phone_numbers',
      arguments: {},
    });
    const phoneNumbers = parseToolResponse(phoneNumbersResponse);
    if (Array.isArray(phoneNumbers) && phoneNumbers.length > 0) {
      phoneNumbers.forEach((phoneNumber) => {
        console.log(`- ${phoneNumber.phoneNumber} (${phoneNumber.id})`);
      });
    } else {
      console.log('No phone numbers found');
    }

    // Create a test call if we have assistants and phone numbers
    if (Array.isArray(assistants) && assistants.length > 0 && 
        Array.isArray(phoneNumbers) && phoneNumbers.length > 0) {
      
      const phoneNumberId = phoneNumbers[0].id;
      const assistantId = assistants[0].id;
      
      console.log(`\n📞 Creating test call using assistant (${assistantId}) and phone number (${phoneNumberId})...`);
      
      const createCallResponse = await mcpClient.callTool({
        name: 'create_call',
        arguments: {
          assistantId: assistantId,
          phoneNumberId: phoneNumberId,
          customer: {
            number: "+1234567890"  // Test number
          }
        },
      });
      
      const createdCall = parseToolResponse(createCallResponse);
      console.log('✅ Call created:', JSON.stringify(createdCall, null, 2));
    }

  } catch (error) {
    console.error('❌ Error:', error);
  } finally {
    console.log('\n🔌 Disconnecting from server...');
    await mcpClient.close();
    console.log('✅ Disconnected');
  }
}

// Run the test
testVapiMCP().catch(console.error);
