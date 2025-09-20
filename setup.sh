#!/bin/bash

# VAPI MCP Tools Setup Script

echo "🔧 Setting up VAPI MCP Tools..."

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js first."
    exit 1
fi

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "❌ npm is not installed. Please install npm first."
    exit 1
fi

echo "✅ Node.js and npm are available"

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Make the client executable
chmod +x vapi-mcp-client.js

# Create environment file
if [ ! -f .env ]; then
    echo "📝 Creating environment file..."
    cat > .env << EOF
# VAPI Configuration
VAPI_API_KEY=e68bd505-55f0-450a-8993-f4f28c0226b5
VAPI_ASSISTANT_ID=94189137-6370-4561-a03f-a69e22fd29de

# MCP Server URLs (optional - will use defaults if not set)
# VAPI_MCP_SERVER_URL=https://mcp.vapi.ai/mcp
# ZAPIER_MCP_SERVER_URL=https://mcp.zapier.com/mcp/?client=vapi
# MAKE_MCP_SERVER_URL=https://mcp.make.com/mcp
# COMPOSIO_MCP_SERVER_URL=https://mcp.composio.dev/mcp

# Phone calling settings
DEFAULT_COUNTRY=US
MAX_CALL_DURATION=300

# SMS settings
SMS_PROVIDER=twilio
SMS_MAX_LENGTH=160

# Email settings
EMAIL_PROVIDER=sendgrid
EMAIL_FROM=noreply@vectorshiftventures.com
EOF
    echo "✅ Environment file created"
else
    echo "ℹ️  Environment file already exists"
fi

# Create logs directory
mkdir -p logs

# Test the installation
echo "🧪 Testing installation..."
node vapi-mcp-client.js status

echo ""
echo "🎉 VAPI MCP Tools setup complete!"
echo ""
echo "📚 Usage:"
echo "  node vapi-mcp-client.js init          # Initialize the client"
echo "  node vapi-mcp-client.js start         # Start a voice call"
echo "  node vapi-mcp-client.js call <phone>  # Make a phone call"
echo "  node vapi-mcp-client.js sms <phone> <message>  # Send SMS"
echo "  node vapi-mcp-client.js email <to> <subject> <body>  # Send email"
echo "  node vapi-mcp-client.js status        # Show status"
echo ""
echo "🔗 MCP Server URLs:"
echo "  VAPI: https://mcp.vapi.ai/mcp"
echo "  Zapier: https://mcp.zapier.com/mcp/?client=vapi"
echo "  Make: https://mcp.make.com/mcp"
echo "  Composio: https://mcp.composio.dev/mcp"
echo ""
echo "📖 For more information, visit: https://docs.vapi.ai/tools/mcp"
