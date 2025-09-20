#!/usr/bin/env node

/**
 * VAPI Webhook Handler for VectorShift Ventures
 * Handles call events and integrates with website
 */

const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Root route for health check
app.get('/', (req, res) => {
  res.json({
    status: 'ok',
    service: 'VAPI Webhook Handler',
    timestamp: new Date().toISOString(),
    calls: callData.size
  });
});

// Store call data in memory (in production, use a database)
const callData = new Map();

// VAPI Webhook endpoint
app.post('/webhook/vapi', (req, res) => {
  try {
    const event = req.body;
    console.log('📞 VAPI Webhook Event:', JSON.stringify(event, null, 2));
    
    const callId = event.call?.id || event.id;
    const eventType = event.type;
    
    if (!callId) {
      console.error('❌ No call ID in webhook event');
      return res.status(400).json({ error: 'No call ID provided' });
    }
    
    // Store or update call data
    if (!callData.has(callId)) {
      callData.set(callId, {
        id: callId,
        status: 'unknown',
        events: [],
        createdAt: new Date().toISOString()
      });
    }
    
    const call = callData.get(callId);
    call.events.push({
      type: eventType,
      timestamp: new Date().toISOString(),
      data: event
    });
    
    // Update call status based on event type
    switch (eventType) {
      case 'call-start':
        call.status = 'started';
        call.startedAt = new Date().toISOString();
        console.log(`✅ Call ${callId} started`);
        break;
        
      case 'call-end':
        call.status = 'ended';
        call.endedAt = new Date().toISOString();
        call.endedReason = event.endedReason;
        console.log(`📞 Call ${callId} ended: ${event.endedReason}`);
        break;
        
      case 'call-update':
        call.status = event.status || call.status;
        call.updatedAt = new Date().toISOString();
        console.log(`🔄 Call ${callId} updated: ${event.status}`);
        break;
        
      case 'function-call':
        call.lastFunction = event.functionCall?.name;
        call.functionResult = event.functionCall?.result;
        console.log(`🔧 Function called: ${event.functionCall?.name}`);
        break;
        
      case 'speech-start':
        call.isSpeaking = true;
        console.log(`🎤 Call ${callId} - Assistant started speaking`);
        break;
        
      case 'speech-end':
        call.isSpeaking = false;
        console.log(`🔇 Call ${callId} - Assistant finished speaking`);
        break;
        
      case 'message':
        if (!call.messages) call.messages = [];
        call.messages.push({
          role: event.message?.role || 'unknown',
          content: event.message?.content || '',
          timestamp: new Date().toISOString()
        });
        console.log(`💬 Call ${callId} - Message: ${event.message?.content?.substring(0, 50)}...`);
        break;
        
      case 'error':
        call.status = 'error';
        call.error = event.error;
        console.error(`❌ Call ${callId} error:`, event.error);
        break;
    }
    
    // Broadcast to connected clients (if using WebSockets)
    broadcastCallUpdate(callId, call);
    
    res.status(200).json({ 
      success: true, 
      message: 'Webhook processed successfully',
      callId: callId,
      eventType: eventType
    });
    
  } catch (error) {
    console.error('❌ Webhook processing error:', error);
    res.status(500).json({ 
      error: 'Internal server error',
      message: error.message 
    });
  }
});

// Get call status endpoint
app.get('/api/call/:callId', (req, res) => {
  const callId = req.params.callId;
  const call = callData.get(callId);
  
  if (!call) {
    return res.status(404).json({ error: 'Call not found' });
  }
  
  res.json(call);
});

// Get all calls endpoint
app.get('/api/calls', (req, res) => {
  const calls = Array.from(callData.values());
  res.json(calls);
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ 
    status: 'healthy', 
    timestamp: new Date().toISOString(),
    calls: callData.size
  });
});

// Broadcast function (placeholder for WebSocket implementation)
function broadcastCallUpdate(callId, call) {
  // In a real implementation, you would broadcast to connected WebSocket clients
  console.log(`📡 Broadcasting update for call ${callId}:`, call.status);
}

// Start server
app.listen(PORT, () => {
  console.log(`🚀 VAPI Webhook Handler running on port ${PORT}`);
  console.log(`📞 Webhook endpoint: http://localhost:${PORT}/webhook/vapi`);
  console.log(`📊 Calls API: http://localhost:${PORT}/api/calls`);
  console.log(`❤️  Health check: http://localhost:${PORT}/health`);
});

module.exports = app;
