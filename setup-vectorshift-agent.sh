#!/bin/bash

# VectorShift Ventures VAPI Agent Setup Script
# Complete setup with knowledge base and optimization

echo "🚀 VectorShift Ventures VAPI Agent Setup"
echo "========================================"

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

# Navigate to the vapi-mcp-tools directory
cd "$(dirname "$0")"

echo "📁 Working directory: $(pwd)"

# Check if package.json exists
if [ ! -f "package.json" ]; then
    echo "❌ package.json not found. Please run this script from the vapi-mcp-tools directory."
    exit 1
fi

# Install dependencies if node_modules doesn't exist
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    npm install
fi

# Check for VAPI API key
if [ -z "$VAPI_API_KEY" ]; then
    echo "⚠️  VAPI_API_KEY environment variable not set."
    echo "Please set your VAPI API key:"
    echo "export VAPI_API_KEY='your-api-key-here'"
    echo ""
    echo "Or add it to your .env file:"
    echo "echo 'VAPI_API_KEY=your-api-key-here' >> .env"
    echo ""
    read -p "Do you want to continue without setting the API key? (y/N): " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        exit 1
    fi
fi

# Check for knowledge base file
if [ ! -f "enhanced-knowledge-base.json" ]; then
    echo "❌ enhanced-knowledge-base.json not found."
    echo "Please ensure the knowledge base file exists."
    exit 1
fi

echo "✅ Dependencies and files checked"

# Make the setup script executable
chmod +x vectorshift-optimized-agent.js

echo ""
echo "🔧 Setting up VectorShift Ventures VAPI Agent..."

# Run the agent setup
node vectorshift-optimized-agent.js setup

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ VectorShift Ventures VAPI Agent setup completed!"
    echo ""
    echo "📞 Next Steps:"
    echo "1. Test the agent: node vectorshift-optimized-agent.js test"
    echo "2. Get phone numbers: node vectorshift-optimized-agent.js phones"
    echo "3. Make a test call: node test-call-direct.js"
    echo ""
    echo "🎯 Your agent is now ready for VectorShift Ventures sales and support calls!"
else
    echo "❌ Agent setup failed. Please check the error messages above."
    exit 1
fi
