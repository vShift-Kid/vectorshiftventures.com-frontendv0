#!/usr/bin/env node

/**
 * Production Webhook Setup for VectorShift Ventures
 * Deploys webhook handler to production environment
 */

const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const app = express();
const PORT = process.env.PORT || 3001;

// Security middleware
app.use(helmet());
app.use(cors({
  origin: process.env.ALLOWED_ORIGINS?.split(',') || ['http://localhost:3000', 'https://vectorshiftventures.com'],
  credentials: true
}));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 1000, // limit each IP to 1000 requests per windowMs
  message: 'Too many requests from this IP, please try again later.'
});
app.use('/webhook/', limiter);

app.use(express.json({ limit: '10mb' }));

// Store call data in memory (in production, use Redis or database)
const callData = new Map();
const callAnalytics = {
  totalCalls: 0,
  successfulCalls: 0,
  failedCalls: 0,
  totalDuration: 0,
  averageCallDuration: 0,
  callsByPurpose: {},
  callsByStatus: {},
  hourlyStats: {},
  dailyStats: {}
};

// VAPI Webhook endpoint
app.post('/webhook/vapi', (req, res) => {
  try {
    const event = req.body;
    const timestamp = new Date();
    
    console.log(`📞 [${timestamp.toISOString()}] VAPI Webhook Event:`, event.type);
    
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
        createdAt: timestamp.toISOString(),
        purpose: event.metadata?.purpose || 'unknown',
        source: event.metadata?.source || 'unknown'
      });
      
      // Update analytics
      callAnalytics.totalCalls++;
      const purpose = event.metadata?.purpose || 'unknown';
      callAnalytics.callsByPurpose[purpose] = (callAnalytics.callsByPurpose[purpose] || 0) + 1;
    }
    
    const call = callData.get(callId);
    call.events.push({
      type: eventType,
      timestamp: timestamp.toISOString(),
      data: event
    });
    
    // Update call status and analytics
    switch (eventType) {
      case 'call-start':
        call.status = 'started';
        call.startedAt = timestamp.toISOString();
        callAnalytics.callsByStatus['started'] = (callAnalytics.callsByStatus['started'] || 0) + 1;
        console.log(`✅ Call ${callId} started`);
        break;
        
      case 'call-end':
        call.status = 'ended';
        call.endedAt = timestamp.toISOString();
        call.endedReason = event.endedReason;
        call.duration = event.duration || 0;
        call.cost = event.cost || 0;
        
        // Update analytics
        callAnalytics.callsByStatus['ended'] = (callAnalytics.callsByStatus['ended'] || 0) + 1;
        callAnalytics.totalDuration += call.duration;
        callAnalytics.averageCallDuration = callAnalytics.totalDuration / callAnalytics.totalCalls;
        
        if (event.endedReason === 'customer-ended-call' || event.endedReason === 'assistant-ended-call') {
          callAnalytics.successfulCalls++;
        } else {
          callAnalytics.failedCalls++;
        }
        
        console.log(`📞 Call ${callId} ended: ${event.endedReason} (${call.duration}s)`);
        break;
        
      case 'call-update':
        call.status = event.status || call.status;
        call.updatedAt = timestamp.toISOString();
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
          timestamp: timestamp.toISOString()
        });
        console.log(`💬 Call ${callId} - Message: ${event.message?.content?.substring(0, 50)}...`);
        break;
        
      case 'error':
        call.status = 'error';
        call.error = event.error;
        callAnalytics.failedCalls++;
        callAnalytics.callsByStatus['error'] = (callAnalytics.callsByStatus['error'] || 0) + 1;
        console.error(`❌ Call ${callId} error:`, event.error);
        break;
    }
    
    // Update hourly and daily stats
    const hour = timestamp.getHours();
    const date = timestamp.toISOString().split('T')[0];
    
    callAnalytics.hourlyStats[hour] = (callAnalytics.hourlyStats[hour] || 0) + 1;
    callAnalytics.dailyStats[date] = (callAnalytics.dailyStats[date] || 0) + 1;
    
    res.status(200).json({ 
      success: true, 
      message: 'Webhook processed successfully',
      callId: callId,
      eventType: eventType,
      timestamp: timestamp.toISOString()
    });
    
  } catch (error) {
    console.error('❌ Webhook processing error:', error);
    res.status(500).json({ 
      error: 'Internal server error',
      message: error.message 
    });
  }
});

// Analytics endpoints
app.get('/api/analytics', (req, res) => {
  res.json({
    ...callAnalytics,
    activeCalls: Array.from(callData.values()).filter(call => 
      call.status === 'started' || call.status === 'ringing'
    ).length,
    lastUpdated: new Date().toISOString()
  });
});

app.get('/api/call/:callId', (req, res) => {
  const callId = req.params.callId;
  const call = callData.get(callId);
  
  if (!call) {
    return res.status(404).json({ error: 'Call not found' });
  }
  
  res.json(call);
});

app.get('/api/calls', (req, res) => {
  const { limit = 50, offset = 0, status, purpose } = req.query;
  let calls = Array.from(callData.values());
  
  // Filter by status
  if (status) {
    calls = calls.filter(call => call.status === status);
  }
  
  // Filter by purpose
  if (purpose) {
    calls = calls.filter(call => call.purpose === purpose);
  }
  
  // Sort by creation date (newest first)
  calls.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  
  // Pagination
  const paginatedCalls = calls.slice(offset, offset + parseInt(limit));
  
  res.json({
    calls: paginatedCalls,
    total: calls.length,
    limit: parseInt(limit),
    offset: parseInt(offset)
  });
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ 
    status: 'healthy', 
    timestamp: new Date().toISOString(),
    calls: callData.size,
    analytics: {
      totalCalls: callAnalytics.totalCalls,
      activeCalls: Array.from(callData.values()).filter(call => 
        call.status === 'started' || call.status === 'ringing'
      ).length
    }
  });
});

// Error handling middleware
app.use((error, req, res, next) => {
  console.error('❌ Server error:', error);
  res.status(500).json({ 
    error: 'Internal server error',
    message: error.message 
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Production VAPI Webhook Handler running on port ${PORT}`);
  console.log(`📞 Webhook endpoint: http://localhost:${PORT}/webhook/vapi`);
  console.log(`📊 Analytics API: http://localhost:${PORT}/api/analytics`);
  console.log(`📋 Calls API: http://localhost:${PORT}/api/calls`);
  console.log(`❤️  Health check: http://localhost:${PORT}/health`);
  console.log(`🔒 Security: Rate limiting, CORS, Helmet enabled`);
});

module.exports = app;
