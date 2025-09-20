const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const { VapiClient } = require('@vapi-ai/server-sdk');

// Initialize VAPI Server SDK
const vapi = new VapiClient({
  token: process.env.VAPI_API_KEY || process.env.VAPI_TOKEN
});

const app = express();

// Security middleware
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      scriptSrc: ["'self'"],
      imgSrc: ["'self'", "data:", "https:"],
    },
  },
}));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again later.',
  standardHeaders: true,
  legacyHeaders: false,
});

app.use(limiter);

// CORS configuration
app.use(cors({
  origin: process.env.ALLOWED_ORIGINS ? process.env.ALLOWED_ORIGINS.split(',') : ['http://localhost:3000'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With']
}));

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Store all call data (web and phone)
const callData = new Map();
const webhookEvents = [];

// Configuration
const CONFIG = {
  assistantId: process.env.VAPI_ASSISTANT_ID,
  phoneNumberId: process.env.VAPI_PHONE_NUMBER_ID,
  webhookUrl: process.env.WEBHOOK_URL || process.env.RAILWAY_PUBLIC_DOMAIN || process.env.RENDER_EXTERNAL_URL,
  environment: process.env.NODE_ENV || 'development'
};

// Validate configuration
if (!CONFIG.assistantId) {
  console.error('❌ VAPI_ASSISTANT_ID environment variable is required');
  process.exit(1);
}

if (!process.env.VAPI_API_KEY && !process.env.VAPI_TOKEN) {
  console.error('❌ VAPI_API_KEY or VAPI_TOKEN environment variable is required');
  process.exit(1);
}

console.log('🚀 Starting Production VAPI Webhook System...');
console.log(`📊 Environment: ${CONFIG.environment}`);
console.log(`🤖 Assistant ID: ${CONFIG.assistantId}`);
console.log(`📞 Phone Number ID: ${CONFIG.phoneNumberId || 'Not configured'}`);
console.log(`🔗 Webhook URL: ${CONFIG.webhookUrl || 'Not configured'}`);

// Make outbound phone call
async function makeOutboundPhoneCall(customerNumber, assistantId = CONFIG.assistantId) {
  try {
    console.log(`📞 Making outbound phone call to ${customerNumber}...`);
    
    const call = await vapi.calls.create({
      phoneNumberId: CONFIG.phoneNumberId,
      customer: { number: customerNumber },
      assistantId: assistantId,
      metadata: {
        type: 'outbound-phone',
        timestamp: new Date().toISOString(),
        source: 'website',
        environment: CONFIG.environment
      }
    });
    
    console.log(`✅ Outbound phone call created: ${call.id}`);
    callData.set(call.id, {
      id: call.id,
      type: 'outbound-phone',
      customerNumber,
      assistantId,
      phoneNumberId: CONFIG.phoneNumberId,
      status: 'initiated',
      createdAt: new Date().toISOString(),
      environment: CONFIG.environment
    });
    
    return call;
  } catch (error) {
    console.error('❌ Error making outbound phone call:', error);
    throw error;
  }
}

// Handle web voice calls
function handleWebVoiceCall(callId, assistantId = CONFIG.assistantId) {
  try {
    console.log(`🎤 Handling web voice call ${callId}...`);
    
    callData.set(callId, {
      id: callId,
      type: 'web-voice',
      assistantId,
      status: 'active',
      createdAt: new Date().toISOString(),
      environment: CONFIG.environment
    });
    
    return { success: true, callId };
  } catch (error) {
    console.error('❌ Error handling web voice call:', error);
    throw error;
  }
}

// Handle inbound phone calls
function handleInboundPhoneCall(callId, customerNumber, assistantId = CONFIG.assistantId) {
  try {
    console.log(`📞 Handling inbound phone call ${callId} from ${customerNumber}...`);
    
    callData.set(callId, {
      id: callId,
      type: 'inbound-phone',
      customerNumber,
      assistantId,
      status: 'active',
      createdAt: new Date().toISOString(),
      environment: CONFIG.environment
    });
    
    return { success: true, callId };
  } catch (error) {
    console.error('❌ Error handling inbound phone call:', error);
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
    
    console.log(`[${eventId}] 📨 Received VAPI webhook: ${message.type}`);
    
    // Store webhook event
    webhookEvents.push({
      id: eventId,
      type: message.type,
      timestamp: new Date().toISOString(),
      data: message,
      environment: CONFIG.environment
    });
    
    // Keep only last 1000 events in production
    const maxEvents = CONFIG.environment === 'production' ? 1000 : 100;
    if (webhookEvents.length > maxEvents) {
      webhookEvents.shift();
    }
    
    switch (message.type) {
      case 'status-update':
        const callId = message.call.id;
        const status = message.call.status;
        console.log(`[${eventId}] 📊 Call ${callId}: ${status}`);
        updateCallStatus(callId, status);
        break;
        
      case 'transcript':
        console.log(`[${eventId}] 💬 ${message.role}: ${message.transcript}`);
        break;
        
      case 'function-call':
        return handleFunctionCall(message, res);
        
      case 'call-start':
        console.log(`[${eventId}] ✅ Call started: ${message.call.id}`);
        updateCallStatus(message.call.id, 'active');
        break;
        
      case 'call-end':
        console.log(`[${eventId}] 📞 Call ended: ${message.call.id}`);
        updateCallStatus(message.call.id, 'ended', {
          endedAt: new Date().toISOString(),
          endReason: message.call.endReason || 'unknown'
        });
        break;
        
      case 'call-start-failed':
        console.log(`[${eventId}] ❌ Call start failed: ${message.call.id}`);
        updateCallStatus(message.call.id, 'failed', {
          error: message.error || 'Unknown error',
          failedAt: new Date().toISOString()
        });
        break;
        
      case 'speech-start':
        console.log(`[${eventId}] 🎤 Speech started: ${message.call.id}`);
        break;
        
      case 'speech-end':
        console.log(`[${eventId}] 🔇 Speech ended: ${message.call.id}`);
        break;
        
      case 'message':
        console.log(`[${eventId}] 📨 Message: ${message.type} - ${message.transcript || 'No transcript'}`);
        break;
        
      default:
        console.log(`[${eventId}] ❓ Unknown event type: ${message.type}`);
    }
    
    res.status(200).json({ received: true, eventId, environment: CONFIG.environment });
  } catch (error) {
    console.error('❌ Webhook error:', error);
    res.status(500).json({ error: 'Webhook processing failed', environment: CONFIG.environment });
  }
});

// Handle function calls from VAPI
function handleFunctionCall(message, res) {
  const { functionCall } = message;
  console.log(`🔧 Function call: ${functionCall.name}`);
  
  switch (functionCall.name) {
    case 'lookup_order':
      const orderData = { 
        orderId: functionCall.parameters.orderId, 
        status: 'shipped',
        trackingNumber: 'TRK123456789',
        company: 'VectorShift Ventures LLC'
      };
      return res.json({ result: orderData });
      
    case 'schedule_appointment':
      const appointmentData = {
        appointmentId: 'APT' + Date.now(),
        date: functionCall.parameters.date,
        time: functionCall.parameters.time,
        status: 'scheduled',
        company: 'VectorShift Ventures LLC'
      };
      return res.json({ result: appointmentData });
      
    case 'get_company_info':
      const companyData = {
        name: 'VectorShift Ventures LLC',
        services: ['AI Automation', 'Field Service Management', 'Custom Software'],
        phone: '+1 (313) 489-9078',
        email: 'info@vectorshiftventures.com',
        website: 'https://vectorshiftventures.com'
      };
      return res.json({ result: companyData });
      
    case 'get_pricing':
      const pricingData = {
        basic: '$99/month',
        professional: '$299/month',
        enterprise: 'Custom pricing',
        features: ['AI Voice Assistant', 'Field Service Management', 'Custom Automation']
      };
      return res.json({ result: pricingData });
      
    default:
      console.log(`❓ Unknown function: ${functionCall.name}`);
      return res.status(400).json({ error: 'Unknown function' });
  }
}

// API endpoints
app.get('/api/calls', (req, res) => {
  const { type, limit = 50 } = req.query;
  let calls = getAllCalls();
  
  if (type) {
    calls = calls.filter(call => call.type === type);
  }
  
  // Limit results
  calls = calls.slice(0, parseInt(limit));
  
  res.json({
    calls,
    total: getAllCalls().length,
    environment: CONFIG.environment
  });
});

app.get('/api/calls/:id', (req, res) => {
  const call = getCallStatus(req.params.id);
  if (call) {
    res.json({ ...call, environment: CONFIG.environment });
  } else {
    res.status(404).json({ error: 'Call not found', environment: CONFIG.environment });
  }
});

app.post('/api/calls/outbound-phone', async (req, res) => {
  try {
    const { customerNumber, assistantId } = req.body;
    
    if (!customerNumber) {
      return res.status(400).json({ 
        error: 'Missing required field: customerNumber',
        environment: CONFIG.environment
      });
    }
    
    const call = await makeOutboundPhoneCall(customerNumber, assistantId);
    res.json({ ...call, environment: CONFIG.environment });
  } catch (error) {
    res.status(500).json({ error: error.message, environment: CONFIG.environment });
  }
});

app.post('/api/calls/web-voice', async (req, res) => {
  try {
    const { callId, assistantId } = req.body;
    
    if (!callId) {
      return res.status(400).json({ 
        error: 'Missing required field: callId',
        environment: CONFIG.environment
      });
    }
    
    const result = await handleWebVoiceCall(callId, assistantId);
    res.json({ ...result, environment: CONFIG.environment });
  } catch (error) {
    res.status(500).json({ error: error.message, environment: CONFIG.environment });
  }
});

app.post('/api/calls/inbound-phone', async (req, res) => {
  try {
    const { callId, customerNumber, assistantId } = req.body;
    
    if (!callId || !customerNumber) {
      return res.status(400).json({ 
        error: 'Missing required fields: callId, customerNumber',
        environment: CONFIG.environment
      });
    }
    
    const result = await handleInboundPhoneCall(callId, customerNumber, assistantId);
    res.json({ ...result, environment: CONFIG.environment });
  } catch (error) {
    res.status(500).json({ error: error.message, environment: CONFIG.environment });
  }
});

app.get('/api/events', (req, res) => {
  const { limit = 100 } = req.query;
  const events = getWebhookEvents().slice(0, parseInt(limit));
  res.json({ events, environment: CONFIG.environment });
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
    webhookEvents: webhookEvents.length,
    environment: CONFIG.environment,
    uptime: process.uptime(),
    memoryUsage: process.memoryUsage()
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
    environment: CONFIG.environment,
    uptime: process.uptime(),
    version: '1.0.0'
  });
});

// Root endpoint
app.get('/', (req, res) => {
  res.json({
    message: 'VAPI Unified Webhook System',
    version: '1.0.0',
    environment: CONFIG.environment,
    endpoints: {
      webhook: '/webhook/vapi',
      calls: '/api/calls',
      stats: '/api/stats',
      health: '/health'
    },
    documentation: 'https://docs.vapi.ai'
  });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`🚀 Production VAPI webhook system running on port ${PORT}`);
  console.log(`📞 Webhook endpoint: ${CONFIG.webhookUrl || `http://localhost:${PORT}`}/webhook/vapi`);
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
  console.log(`🌍 Environment: ${CONFIG.environment}`);
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
