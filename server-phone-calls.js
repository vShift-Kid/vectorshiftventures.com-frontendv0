const { VapiClient } = require('@vapi-ai/server-sdk');
const express = require('express');
const cors = require('cors');

// Initialize VAPI Server SDK
const vapi = new VapiClient({
  token: process.env.VAPI_API_KEY || 'e68bd505-55f0-450a-8993-f4f28c0226b5'
});

const app = express();
app.use(express.json());
app.use(cors());

// Store call data
const callData = new Map();

// Make outbound call to customer
async function makeOutboundCall(customerNumber, assistantId, phoneNumberId) {
  try {
    console.log(`Making outbound call to ${customerNumber}...`);
    
    const call = await vapi.calls.create({
      phoneNumberId: phoneNumberId,
      customer: { number: customerNumber },
      assistantId: assistantId,
      metadata: {
        type: 'outbound',
        timestamp: new Date().toISOString(),
        source: 'website'
      }
    });
    
    console.log(`Outbound call created: ${call.id}`);
    callData.set(call.id, {
      id: call.id,
      type: 'outbound',
      customerNumber,
      assistantId,
      phoneNumberId,
      status: 'initiated',
      createdAt: new Date().toISOString()
    });
    
    return call;
  } catch (error) {
    console.error('Error making outbound call:', error);
    throw error;
  }
}

// Handle inbound calls (when customers call our VAPI number)
async function handleInboundCall(callId, customerNumber, assistantId) {
  try {
    console.log(`Handling inbound call ${callId} from ${customerNumber}...`);
    
    callData.set(callId, {
      id: callId,
      type: 'inbound',
      customerNumber,
      assistantId,
      status: 'active',
      createdAt: new Date().toISOString()
    });
    
    return { success: true, callId };
  } catch (error) {
    console.error('Error handling inbound call:', error);
    throw error;
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

// Webhook endpoint for VAPI events
app.post('/webhook/vapi', async (req, res) => {
  try {
    const { message } = req.body;
    console.log('Received VAPI webhook:', message.type);
    
    switch (message.type) {
      case 'status-update':
        const callId = message.call.id;
        const status = message.call.status;
        console.log(`Call ${callId}: ${status}`);
        
        // Update call status
        if (callData.has(callId)) {
          callData.get(callId).status = status;
          callData.get(callId).updatedAt = new Date().toISOString();
        }
        break;
        
      case 'transcript':
        console.log(`${message.role}: ${message.transcript}`);
        break;
        
      case 'function-call':
        return handleFunctionCall(message, res);
        
      case 'call-start':
        console.log(`Call started: ${message.call.id}`);
        break;
        
      case 'call-end':
        console.log(`Call ended: ${message.call.id}`);
        if (callData.has(message.call.id)) {
          callData.get(message.call.id).status = 'ended';
          callData.get(message.call.id).endedAt = new Date().toISOString();
        }
        break;
    }
    
    res.status(200).json({ received: true });
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
      
    default:
      return res.status(400).json({ error: 'Unknown function' });
  }
}

// API endpoints
app.get('/api/calls', (req, res) => {
  res.json(getAllCalls());
});

app.get('/api/calls/:id', (req, res) => {
  const call = getCallStatus(req.params.id);
  if (call) {
    res.json(call);
  } else {
    res.status(404).json({ error: 'Call not found' });
  }
});

app.post('/api/calls/outbound', async (req, res) => {
  try {
    const { customerNumber, assistantId, phoneNumberId } = req.body;
    
    if (!customerNumber || !assistantId || !phoneNumberId) {
      return res.status(400).json({ 
        error: 'Missing required fields: customerNumber, assistantId, phoneNumberId' 
      });
    }
    
    const call = await makeOutboundCall(customerNumber, assistantId, phoneNumberId);
    res.json(call);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/calls/inbound', async (req, res) => {
  try {
    const { callId, customerNumber, assistantId } = req.body;
    
    if (!callId || !customerNumber || !assistantId) {
      return res.status(400).json({ 
        error: 'Missing required fields: callId, customerNumber, assistantId' 
      });
    }
    
    const result = await handleInboundCall(callId, customerNumber, assistantId);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Health check
app.get('/health', (req, res) => {
  res.json({ 
    status: 'healthy', 
    timestamp: new Date().toISOString(),
    calls: callData.size
  });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server-side phone calling system running on port ${PORT}`);
  console.log(`Webhook endpoint: http://localhost:${PORT}/webhook/vapi`);
  console.log(`API endpoints:`);
  console.log(`  GET  /api/calls - Get all calls`);
  console.log(`  GET  /api/calls/:id - Get call status`);
  console.log(`  POST /api/calls/outbound - Make outbound call`);
  console.log(`  POST /api/calls/inbound - Handle inbound call`);
});

module.exports = {
  makeOutboundCall,
  handleInboundCall,
  getCallStatus,
  getAllCalls
};
