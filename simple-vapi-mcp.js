#!/usr/bin/env node

/**
 * Simple VAPI MCP Server
 * A lightweight MCP server for VAPI tools that works with Node.js 18+
 */

const { Server } = require('@modelcontextprotocol/sdk/server/index.js');
const { StdioServerTransport } = require('@modelcontextprotocol/sdk/server/stdio.js');

class SimpleVapiMCPServer {
  constructor() {
    this.server = new Server(
      {
        name: 'simple-vapi-mcp',
        version: '1.0.0',
      },
      {
        capabilities: {
          tools: {},
          resources: {},
          prompts: {},
        },
      }
    );

    this.setupHandlers();
  }

  setupHandlers() {
    // List available tools
    this.server.setRequestHandler('tools/list', async () => {
      return {
        tools: [
          {
            name: 'make_phone_call',
            description: 'Make an outbound phone call using VAPI',
            inputSchema: {
              type: 'object',
              properties: {
                phoneNumber: {
                  type: 'string',
                  description: 'Phone number to call (E.164 format)',
                },
                customerName: {
                  type: 'string',
                  description: 'Name of the customer (optional)',
                },
                purpose: {
                  type: 'string',
                  description: 'Purpose of the call',
                  enum: ['sales', 'support', 'follow_up', 'general'],
                },
              },
              required: ['phoneNumber'],
            },
          },
          {
            name: 'send_sms',
            description: 'Send an SMS message using VAPI',
            inputSchema: {
              type: 'object',
              properties: {
                phoneNumber: {
                  type: 'string',
                  description: 'Phone number to send SMS to (E.164 format)',
                },
                message: {
                  type: 'string',
                  description: 'SMS message content',
                },
              },
              required: ['phoneNumber', 'message'],
            },
          },
          {
            name: 'get_assistant_info',
            description: 'Get information about VAPI assistant',
            inputSchema: {
              type: 'object',
              properties: {
                assistantId: {
                  type: 'string',
                  description: 'VAPI assistant ID (optional, uses default if not provided)',
                },
              },
            },
          },
          {
            name: 'list_recent_calls',
            description: 'List recent VAPI calls',
            inputSchema: {
              type: 'object',
              properties: {
                limit: {
                  type: 'number',
                  description: 'Number of calls to retrieve (default: 10)',
                },
              },
            },
          },
        ],
      };
    });

    // Handle tool calls
    this.server.setRequestHandler('tools/call', async (request) => {
      const { name, arguments: args } = request.params;

      try {
        switch (name) {
          case 'make_phone_call':
            return await this.makePhoneCall(args);
          case 'send_sms':
            return await this.sendSMS(args);
          case 'get_assistant_info':
            return await this.getAssistantInfo(args);
          case 'list_recent_calls':
            return await this.listRecentCalls(args);
          default:
            throw new Error(`Unknown tool: ${name}`);
        }
      } catch (error) {
        return {
          content: [
            {
              type: 'text',
              text: `Error: ${error.message}`,
            },
          ],
          isError: true,
        };
      }
    });

    // List available resources
    this.server.setRequestHandler('resources/list', async () => {
      return {
        resources: [
          {
            uri: 'vapi://assistants',
            name: 'VAPI Assistants',
            description: 'List of VAPI assistants',
            mimeType: 'application/json',
          },
          {
            uri: 'vapi://calls',
            name: 'VAPI Calls',
            description: 'Recent VAPI calls',
            mimeType: 'application/json',
          },
          {
            uri: 'vapi://tools',
            name: 'VAPI Tools',
            description: 'Available VAPI tools',
            mimeType: 'application/json',
          },
        ],
      };
    });

    // Read resources
    this.server.setRequestHandler('resources/read', async (request) => {
      const { uri } = request.params;

      switch (uri) {
        case 'vapi://assistants':
          return {
            contents: [
              {
                uri,
                mimeType: 'application/json',
                text: JSON.stringify(await this.getAssistants(), null, 2),
              },
            ],
          };
        case 'vapi://calls':
          return {
            contents: [
              {
                uri,
                mimeType: 'application/json',
                text: JSON.stringify(await this.getCalls(), null, 2),
              },
            ],
          };
        case 'vapi://tools':
          return {
            contents: [
              {
                uri,
                mimeType: 'application/json',
                text: JSON.stringify(await this.getTools(), null, 2),
              },
            ],
          };
        default:
          throw new Error(`Unknown resource: ${uri}`);
      }
    });

    // List available prompts
    this.server.setRequestHandler('prompts/list', async () => {
      return {
        prompts: [
          {
            name: 'create_voice_assistant',
            description: 'Create a new VAPI voice assistant',
            arguments: [
              {
                name: 'name',
                description: 'Name of the assistant',
                required: true,
              },
              {
                name: 'model',
                description: 'Voice model to use',
                required: false,
              },
            ],
          },
          {
            name: 'configure_phone_number',
            description: 'Configure phone number for VAPI',
            arguments: [
              {
                name: 'phoneNumber',
                description: 'Phone number to configure',
                required: true,
              },
            ],
          },
        ],
      };
    });

    // Get prompt
    this.server.setRequestHandler('prompts/get', async (request) => {
      const { name, arguments: args } = request.params;

      switch (name) {
        case 'create_voice_assistant':
          return {
            description: 'Create a new VAPI voice assistant',
            messages: [
              {
                role: 'user',
                content: {
                  type: 'text',
                  text: `Create a VAPI voice assistant named "${args.name}"${args.model ? ` using the ${args.model} model` : ''}. Here's what you need to do:

1. Use the VAPI API to create a new assistant
2. Configure the voice settings
3. Set up the conversation flow
4. Test the assistant

Use the make_phone_call tool to test the assistant once created.`,
                },
              },
            ],
          };
        case 'configure_phone_number':
          return {
            description: 'Configure phone number for VAPI',
            messages: [
              {
                role: 'user',
                content: {
                  type: 'text',
                  text: `Configure the phone number ${args.phoneNumber} for VAPI. Here's what you need to do:

1. Add the phone number to your VAPI account
2. Configure the number settings
3. Test the number with a call
4. Verify the configuration

Use the make_phone_call tool to test the phone number.`,
                },
              },
            ],
          };
        default:
          throw new Error(`Unknown prompt: ${name}`);
      }
    });
  }

  // Tool implementations
  async makePhoneCall(args) {
    const { phoneNumber, customerName, purpose } = args;
    
    // Simulate API call (replace with actual VAPI API call)
    const callId = `call_${Date.now()}`;
    
    return {
      content: [
        {
          type: 'text',
          text: `📞 Phone call initiated:
- Phone: ${phoneNumber}
- Customer: ${customerName || 'Not specified'}
- Purpose: ${purpose || 'general'}
- Call ID: ${callId}

Note: This is a simulation. In a real implementation, this would make an actual VAPI API call.`,
        },
      ],
    };
  }

  async sendSMS(args) {
    const { phoneNumber, message } = args;
    
    // Simulate SMS sending
    const smsId = `sms_${Date.now()}`;
    
    return {
      content: [
        {
          type: 'text',
          text: `📱 SMS sent:
- To: ${phoneNumber}
- Message: ${message}
- SMS ID: ${smsId}

Note: This is a simulation. In a real implementation, this would send an actual SMS via VAPI.`,
        },
      ],
    };
  }

  async getAssistantInfo(args) {
    const { assistantId } = args;
    
    return {
      content: [
        {
          type: 'text',
          text: `🤖 VAPI Assistant Information:
- Assistant ID: ${assistantId || 'Default assistant'}
- Status: Active
- Voice: Default voice model
- Capabilities: Phone calls, SMS, Voice conversations

Note: This is simulated data. In a real implementation, this would fetch actual assistant data from VAPI API.`,
        },
      ],
    };
  }

  async listRecentCalls(args) {
    const { limit = 10 } = args;
    
    // Simulate recent calls data
    const calls = Array.from({ length: Math.min(limit, 5) }, (_, i) => ({
      id: `call_${Date.now() - i * 1000}`,
      phoneNumber: `+123456789${i}`,
      status: i === 0 ? 'completed' : 'completed',
      duration: Math.floor(Math.random() * 300),
      timestamp: new Date(Date.now() - i * 1000).toISOString(),
    }));
    
    return {
      content: [
        {
          type: 'text',
          text: `📞 Recent VAPI Calls (${calls.length}):
${calls.map(call => 
  `- ${call.phoneNumber} (${call.status}) - ${call.duration}s - ${call.timestamp}`
).join('\n')}

Note: This is simulated data. In a real implementation, this would fetch actual call data from VAPI API.`,
        },
      ],
    };
  }

  async getAssistants() {
    return [
      {
        id: 'assistant_1',
        name: 'Default Assistant',
        status: 'active',
        voice: 'default',
      },
    ];
  }

  async getCalls() {
    return await this.listRecentCalls({ limit: 10 });
  }

  async getTools() {
    return [
      'make_phone_call',
      'send_sms',
      'get_assistant_info',
      'list_recent_calls',
    ];
  }

  async run() {
    const transport = new StdioServerTransport();
    await this.server.connect(transport);
    console.error('Simple VAPI MCP Server running on stdio');
  }
}

// Start the server
if (require.main === module) {
  const server = new SimpleVapiMCPServer();
  server.run().catch(console.error);
}

module.exports = SimpleVapiMCPServer;
