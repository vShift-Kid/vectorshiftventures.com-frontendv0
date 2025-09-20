const express = require('express');
const cors = require('cors');
const { VapiClient } = require('@vapi-ai/server-sdk');

// Initialize VAPI Server SDK
const vapi = new VapiClient({
  token: process.env.VAPI_API_KEY || 'e68bd505-55f0-450a-8993-f4f28c0226b5'
});

const app = express();
app.use(express.json());
app.use(cors());

// Store all call data (web and phone)
const callData = new Map();
const webhookEvents = [];

// Configuration
const CONFIG = {
  assistantId: process.env.VAPI_ASSISTANT_ID || 'b8ddcdb9-1bb5-4cef-8a09-69c386230084',
  phoneNumberId: process.env.VAPI_PHONE_NUMBER_ID || 'your-phone-number-id',
  webhookUrl: process.env.WEBHOOK_URL || 'http://localhost:3001/webhook/vapi'
};

// Make outbound phone call
async function makeOutboundPhoneCall(customerNumber, assistantId = CONFIG.assistantId) {
  try {
    console.log(`Making outbound phone call to ${customerNumber}...`);
    
    const call = await vapi.calls.create({
      phoneNumberId: CONFIG.phoneNumberId,
      customer: { number: customerNumber },
      assistantId: assistantId,
      metadata: {
        type: 'outbound-phone',
        timestamp: new Date().toISOString(),
        source: 'website'
      }
    });
    
    console.log(`Outbound phone call created: ${call.id}`);
    callData.set(call.id, {
      id: call.id,
      type: 'outbound-phone',
      customerNumber,
      assistantId,
      phoneNumberId: CONFIG.phoneNumberId,
      status: 'initiated',
      createdAt: new Date().toISOString()
    });
    
    return call;
  } catch (error) {
    console.error('Error making outbound phone call:', error);
    throw error;
  }
}

// Handle web voice calls
function handleWebVoiceCall(callId, assistantId = CONFIG.assistantId) {
  try {
    console.log(`Handling web voice call ${callId}...`);
    
    callData.set(callId, {
      id: callId,
      type: 'web-voice',
      assistantId,
      status: 'active',
      createdAt: new Date().toISOString()
    });
    
    return { success: true, callId };
  } catch (error) {
    console.error('Error handling web voice call:', error);
    throw error;
  }
}

// Handle inbound phone calls
function handleInboundPhoneCall(callId, customerNumber, assistantId = CONFIG.assistantId) {
  try {
    console.log(`Handling inbound phone call ${callId} from ${customerNumber}...`);
    
    callData.set(callId, {
      id: callId,
      type: 'inbound-phone',
      customerNumber,
      assistantId,
      status: 'active',
      createdAt: new Date().toISOString()
    });
    
    return { success: true, callId };
  } catch (error) {
    console.error('Error handling inbound phone call:', error);
    throw error;
  }
}

// Update call status
function updateCallStatus(callId, status, additionalData = {}) {
  if (callData.has(callId)) {
    const call = callData.get(callId);
    call.status = status;
    call.updatedAt = new Date().toISOString();
    Object.assign(call, additionalData);
    callData.set(callId, call);
  }
}

// Get call status
function getCallStatus(callId) {
  return callData.get(callId) || null;
}

// Get all calls
function getAllCalls() {
  return Array.from(callData.values());
}

// Get calls by type
function getCallsByType(type) {
  return Array.from(callData.values()).filter(call => call.type === type);
}

// Get webhook events
function getWebhookEvents() {
  return webhookEvents;
}

// Main webhook endpoint for VAPI events
app.post('/webhook/vapi', async (req, res) => {
  try {
    const { message } = req.body;
    const eventId = Date.now().toString();
    
    console.log(`[${eventId}] Received VAPI webhook: ${message.type}`);
    
    // Store webhook event
    webhookEvents.push({
      id: eventId,
      type: message.type,
      timestamp: new Date().toISOString(),
      data: message
    });
    
    // Keep only last 100 events
    if (webhookEvents.length > 100) {
      webhookEvents.shift();
    }
    
    switch (message.type) {
      case 'status-update':
        const callId = message.call.id;
        const status = message.call.status;
        console.log(`[${eventId}] Call ${callId}: ${status}`);
        
        updateCallStatus(callId, status);
        break;
        
      case 'transcript':
        console.log(`[${eventId}] ${message.role}: ${message.transcript}`);
        break;
        
      case 'function-call':
        return handleFunctionCall(message, res);
        
      case 'call-start':
        console.log(`[${eventId}] Call started: ${message.call.id}`);
        updateCallStatus(message.call.id, 'active');
        break;
        
      case 'call-end':
        console.log(`[${eventId}] Call ended: ${message.call.id}`);
        updateCallStatus(message.call.id, 'ended', {
          endedAt: new Date().toISOString(),
          endReason: message.call.endReason || 'unknown'
        });
        break;
        
      case 'call-start-failed':
        console.log(`[${eventId}] Call start failed: ${message.call.id}`);
        updateCallStatus(message.call.id, 'failed', {
          error: message.error || 'Unknown error',
          failedAt: new Date().toISOString()
        });
        break;
        
      case 'speech-start':
        console.log(`[${eventId}] Speech started: ${message.call.id}`);
        break;
        
      case 'speech-end':
        console.log(`[${eventId}] Speech ended: ${message.call.id}`);
        break;
        
      case 'message':
        console.log(`[${eventId}] Message: ${message.type} - ${message.transcript || 'No transcript'}`);
        break;
        
      default:
        console.log(`[${eventId}] Unknown event type: ${message.type}`);
    }
    
    res.status(200).json({ received: true, eventId });
  } catch (error) {
    console.error('Webhook error:', error);
    res.status(500).json({ error: 'Webhook processing failed' });
  }
});

// Handle function calls from VAPI
function handleFunctionCall(message, res) {
  const { functionCall } = message;
  console.log(`Function call: ${functionCall.name}`);
  
  switch (functionCall.name) {
    case 'lookup_order':
      const orderData = { 
        orderId: functionCall.parameters.orderId, 
        status: 'shipped',
        trackingNumber: 'TRK123456789'
      };
      return res.json({ result: orderData });
      
    case 'schedule_appointment':
      const appointmentData = {
        appointmentId: 'APT' + Date.now(),
        date: functionCall.parameters.date,
        time: functionCall.parameters.time,
        status: 'scheduled'
      };
      return res.json({ result: appointmentData });
      
    case 'get_company_info':
      const companyData = {
        name: 'VectorShift Ventures LLC',
        services: ['AI Automation', 'Field Service Management', 'Custom Software'],
        phone: '+1 (313) 489-9078',
        email: 'info@vectorshiftventures.com'
      };
      return res.json({ result: companyData });
      
    default:
      return res.status(400).json({ error: 'Unknown function' });
  }
}

// API endpoints
app.get('/api/calls', (req, res) => {
  const { type } = req.query;
  if (type) {
    res.json(getCallsByType(type));
  } else {
    res.json(getAllCalls());
  }
});

app.get('/api/calls/:id', (req, res) => {
  const call = getCallStatus(req.params.id);
  if (call) {
    res.json(call);
  } else {
    res.status(404).json({ error: 'Call not found' });
  }
});

app.post('/api/calls/outbound-phone', async (req, res) => {
  try {
    const { customerNumber, assistantId } = req.body;
    
    if (!customerNumber) {
      return res.status(400).json({ 
        error: 'Missing required field: customerNumber' 
      });
    }
    
    const call = await makeOutboundPhoneCall(customerNumber, assistantId);
    res.json(call);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/calls/web-voice', async (req, res) => {
  try {
    const { callId, assistantId } = req.body;
    
    if (!callId) {
      return res.status(400).json({ 
        error: 'Missing required field: callId' 
      });
    }
    
    const result = await handleWebVoiceCall(callId, assistantId);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/calls/inbound-phone', async (req, res) => {
  try {
    const { callId, customerNumber, assistantId } = req.body;
    
    if (!callId || !customerNumber) {
      return res.status(400).json({ 
        error: 'Missing required fields: callId, customerNumber' 
      });
    }
    
    const result = await handleInboundPhoneCall(callId, customerNumber, assistantId);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/events', (req, res) => {
  res.json(getWebhookEvents());
});

app.get('/api/stats', (req, res) => {
  const allCalls = getAllCalls();
  const stats = {
    totalCalls: allCalls.length,
    webVoiceCalls: getCallsByType('web-voice').length,
    outboundPhoneCalls: getCallsByType('outbound-phone').length,
    inboundPhoneCalls: getCallsByType('inbound-phone').length,
    activeCalls: allCalls.filter(call => call.status === 'active').length,
    endedCalls: allCalls.filter(call => call.status === 'ended').length,
    failedCalls: allCalls.filter(call => call.status === 'failed').length,
    webhookEvents: webhookEvents.length
  };
  res.json(stats);
});

// Health check
app.get('/health', (req, res) => {
  res.json({ 
    status: 'healthy', 
    timestamp: new Date().toISOString(),
    calls: callData.size,
    events: webhookEvents.length,
    config: {
      assistantId: CONFIG.assistantId,
      phoneNumberId: CONFIG.phoneNumberId,
      webhookUrl: CONFIG.webhookUrl
    }
  });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`🚀 Unified VAPI webhook system running on port ${PORT}`);
  console.log(`📞 Webhook endpoint: http://localhost:${PORT}/webhook/vapi`);
  console.log(`📊 API endpoints:`);
  console.log(`  GET  /api/calls - Get all calls`);
  console.log(`  GET  /api/calls?type=web-voice - Get web voice calls`);
  console.log(`  GET  /api/calls?type=outbound-phone - Get outbound phone calls`);
  console.log(`  GET  /api/calls?type=inbound-phone - Get inbound phone calls`);
  console.log(`  GET  /api/calls/:id - Get call status`);
  console.log(`  POST /api/calls/outbound-phone - Make outbound phone call`);
  console.log(`  POST /api/calls/web-voice - Handle web voice call`);
  console.log(`  POST /api/calls/inbound-phone - Handle inbound phone call`);
  console.log(`  GET  /api/events - Get webhook events`);
  console.log(`  GET  /api/stats - Get call statistics`);
  console.log(`  GET  /health - Health check`);
});

module.exports = {
  makeOutboundPhoneCall,
  handleWebVoiceCall,
  handleInboundPhoneCall,
  updateCallStatus,
  getCallStatus,
  getAllCalls,
  getCallsByType,
  getWebhookEvents
};
