# Vector Shift Ventures Agent Setup Guide

## 🚨 Current Issue: API Key Authentication

The VAPI API key we're using is not valid. Here's how to fix this and create your customer service agent.

## Step 1: Get Your VAPI API Key

1. **Go to VAPI Dashboard**: https://dashboard.vapi.ai
2. **Sign in** to your account
3. **Navigate to Settings** → **API Keys**
4. **Copy your PUBLIC API key** (not the private key)
5. **Note your Assistant ID** if you have one

## Step 2: Update Your API Key

### Option A: Set Environment Variable
```bash
export VAPI_API_KEY="your-actual-api-key-here"
```

### Option B: Update the Scripts
Edit any of these files and replace the API key:
- `vapi-tools.js` (line with API_KEY)
- `quick-agent-template.js` (line with API_KEY)
- `create-customer-service-agent.js` (line with API_KEY)

## Step 3: Create Your Agent

### Quick Template Approach (Recommended)
```bash
cd /home/lucky-7/Applications/vapi-mcp-tools

# Create a basic customer service agent
node quick-agent-template.js basic

# Or create a sales-focused agent
node quick-agent-template.js sales

# Or create a support agent
node quick-agent-template.js support
```

### Interactive Setup
```bash
# Run the interactive setup
node setup-agent.js
```

### Advanced Configuration
```bash
# Create with full knowledge base and functions
node create-customer-service-agent.js create
```

## Step 4: Test Your Agent

Once created, test your agent:

```bash
# Test with a phone call
node vapi-tools.js call "+1234567890" "Test Customer"

# Check agent status
node vapi-tools.js assistant

# List recent calls
node vapi-tools.js calls
```

## Step 5: Integrate with Your Website

### Get Your Agent ID
After creating the agent, you'll get an Agent ID. Use this in your website integration.

### Website Integration Code
```javascript
// Add this to your website
const vapi = new Vapi('your-api-key');
vapi.start({
  assistantId: 'your-agent-id'
});
```

## Available Agent Templates

### 1. Basic Customer Service
- **Purpose**: General customer inquiries
- **Voice**: Professional female
- **Duration**: 30 minutes
- **Features**: Basic conversation, information sharing

### 2. Sales Agent
- **Purpose**: Lead qualification and sales
- **Voice**: Professional male
- **Duration**: 20 minutes
- **Features**: Consultative selling, demo scheduling

### 3. Support Agent
- **Purpose**: Technical support
- **Voice**: Friendly female
- **Duration**: 40 minutes
- **Features**: Troubleshooting, issue resolution

## Agent Capabilities

Once created, your agent will have:

✅ **Professional Voice**: ElevenLabs voice synthesis
✅ **Knowledge Base**: Field service management expertise
✅ **Call Management**: 30-minute max duration
✅ **Recording**: Automatic call recording
✅ **Voicemail Detection**: Handles voicemails appropriately
✅ **Natural Conversation**: GPT-4 powered responses

## Troubleshooting

### API Key Issues
- Make sure you're using the PUBLIC key, not private
- Check the key is copied correctly (no extra spaces)
- Verify the key is active in your VAPI dashboard

### Agent Creation Fails
- Check your internet connection
- Verify the API key is correct
- Try a different template

### Testing Issues
- Make sure the agent is created successfully first
- Check the agent ID is correct
- Verify phone number format (E.164: +1234567890)

## Next Steps After Setup

1. **Test the agent** with sample calls
2. **Customize the knowledge base** for your specific needs
3. **Add custom functions** for scheduling, pricing, etc.
4. **Integrate with your website** using the agent ID
5. **Monitor performance** through VAPI dashboard

## Support

- **VAPI Documentation**: https://docs.vapi.ai
- **VAPI Dashboard**: https://dashboard.vapi.ai
- **Community**: https://discord.gg/vapi

---

**Ready to create your agent? Start with Step 1 above!**
