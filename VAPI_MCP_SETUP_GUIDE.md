# VAPI MCP Setup Guide

This guide will help you configure VAPI MCP (Model Context Protocol) tools for enhanced phone calling and automation capabilities.

## Overview

VAPI MCP integration allows your assistant to dynamically access tools from MCP servers during calls, enabling:
- Connection to any MCP-compatible server
- Dynamic tool access at runtime
- Execution of actions through MCP servers

## Prerequisites

1. VAPI Dashboard access
2. An assistant created in VAPI
3. Access to an MCP server URL from providers like:
   - [Zapier MCP](https://mcp.zapier.com/mcp/?client=vapi)
   - [Make MCP](https://www.make.com/en/help/api-access/mcp-token)
   - [Composio MCP](https://mcp.composio.dev/dashboard)
   - [VAPI MCP Server](https://docs.vapi.ai/sdk/mcp-server)

## Setup Steps

### 1. Choose an MCP Provider

#### Option A: Zapier MCP (Recommended for beginners)
- **URL**: https://mcp.zapier.com/mcp/?client=vapi
- **Features**: 7,000+ apps and 30,000+ actions
- **Best for**: Quick setup with popular apps

#### Option B: Make MCP
- **URL**: https://www.make.com/en/help/api-access/mcp-token
- **Features**: Custom business logic tools
- **Best for**: Complex automation workflows

#### Option C: Composio MCP
- **URL**: https://mcp.composio.dev/dashboard
- **Features**: Various tool integrations
- **Best for**: Specific tool integrations

#### Option D: VAPI MCP Server
- **URL**: https://docs.vapi.ai/sdk/mcp-server
- **Features**: VAPI APIs as callable tools
- **Best for**: Advanced VAPI functionality

### 2. Generate MCP Server URL

1. Visit your chosen provider's dashboard
2. Follow their instructions to generate an MCP server URL
3. **Important**: Treat this URL as a credential and keep it secure

### 3. Configure MCP Tool in VAPI Dashboard

1. Go to **Dashboard → Tools** page
2. Click **Create Tool** button
3. Select **MCP** from available options
4. Configure the tool with:
   - **Name**: `mcpTools` (or descriptive name)
   - **Description**: Explain when it should be invoked
   - **Server URL**: Your MCP server URL from step 2

### 4. Add Tool to Assistant

1. Navigate to **Dashboard → Assistants** page
2. Select your assistant (ID: `94189137-6370-4561-a03f-a69e22fd29de`)
3. Go to **Tools** tab
4. In the tools dropdown, select your MCP tool
5. Click **Publish** to save changes

## MCP Tool Configuration

### Default Configuration (Streamable HTTP)

```json
{
  "type": "mcp",
  "function": {
    "name": "mcpTools"
  },
  "server": {
    "url": "YOUR_MCP_SERVER_URL_HERE"
  }
}
```

### Custom Configuration (with headers)

```json
{
  "type": "mcp",
  "function": {
    "name": "mcpTools"
  },
  "server": {
    "url": "YOUR_MCP_SERVER_URL_HERE",
    "headers": {
      "Authorization": "Bearer your-token",
      "X-Custom-Header": "your-value"
    }
  },
  "metadata": {
    "protocol": "shttp"
  }
}
```

## How MCP Works

1. **Call Start**: Vapi connects to your MCP server using Streamable HTTP protocol
2. **Tool Discovery**: Fetches available tools and adds them to your assistant
3. **Tool Execution**: Each tool invocation creates a new MCP session
4. **Headers**: Requests include `X-Call-Id`/`X-Chat-Id` for identification
5. **Response**: MCP server executes action and returns result

## Available MCP Tools

Once configured, your assistant will have access to tools provided by your MCP server:

### Zapier MCP Tools
- Email management (Gmail, Outlook)
- Calendar scheduling (Google Calendar, Outlook)
- CRM operations (Salesforce, HubSpot)
- Social media posting
- File management
- And 7,000+ more apps

### Make MCP Tools
- Custom business logic
- Database operations
- API integrations
- Workflow automation
- Data processing

### Composio MCP Tools
- GitHub operations
- Slack messaging
- Notion database updates
- Various API integrations

## Best Practices

1. **Protocol Selection**: Use Streamable HTTP (default) for better performance
2. **Dynamic Tools**: Be aware that available tools may change between calls
3. **Clear Instructions**: Provide clear instructions in your assistant's system message
4. **Error Handling**: Include fallback responses for tool failures
5. **User Communication**: Explain what tools you're using and what actions you're taking
6. **Security**: Keep MCP server URLs secure and treat them as credentials

## Testing Your Setup

1. Start a voice call with your assistant
2. Ask the assistant to perform actions that require MCP tools
3. Monitor the VAPI dashboard for tool execution logs
4. Verify that tools are being called correctly

## Troubleshooting

### Common Issues

1. **Tool Not Available**: Check if MCP server URL is correct and accessible
2. **Authentication Errors**: Verify headers and credentials
3. **Tool Execution Fails**: Check MCP server logs and tool configuration
4. **Context Overflow**: Some tools may return large amounts of data

### Debug Steps

1. Check VAPI dashboard logs
2. Verify MCP server connectivity
3. Test MCP server URL independently
4. Review tool configuration in VAPI dashboard

## Current Configuration

- **Assistant ID**: `94189137-6370-4561-a03f-a69e22fd29de`
- **API Key**: `349dbab8-5f4e-4c16-a1a7-5dce7e63d512`
- **Protocol**: Streamable HTTP (shttp)
- **Default MCP Server**: https://mcp.vapi.ai/mcp

## Next Steps

1. Choose an MCP provider and generate your server URL
2. Configure the MCP tool in your VAPI dashboard
3. Add the tool to your assistant
4. Test the integration with voice calls
5. Monitor and optimize tool usage

For more information, visit the [VAPI MCP Documentation](https://docs.vapi.ai/tools/mcp).
