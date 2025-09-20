#!/usr/bin/env node

const { spawn } = require('child_process');
const path = require('path');

console.log('🚀 Starting Unified VAPI System...\n');

// Start the unified webhook system
const webhookProcess = spawn('node', ['unified-webhook-system.js'], {
  cwd: __dirname,
  stdio: 'inherit'
});

webhookProcess.on('error', (error) => {
  console.error('❌ Failed to start webhook system:', error);
});

webhookProcess.on('exit', (code) => {
  console.log(`\n📞 Webhook system exited with code ${code}`);
});

// Handle process termination
process.on('SIGINT', () => {
  console.log('\n🛑 Shutting down unified system...');
  webhookProcess.kill('SIGINT');
  process.exit(0);
});

process.on('SIGTERM', () => {
  console.log('\n🛑 Shutting down unified system...');
  webhookProcess.kill('SIGTERM');
  process.exit(0);
});

console.log('✅ Unified VAPI system started successfully!');
console.log('📞 Webhook endpoint: http://localhost:3001/webhook/vapi');
console.log('📊 Analytics dashboard: http://localhost:3000/contact');
console.log('\nPress Ctrl+C to stop the system');
