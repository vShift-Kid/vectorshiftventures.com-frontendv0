# 🚀 VectorShift Ventures Frontend v0
<!-- Production-ready AI automation website -->

A production-ready React frontend for VectorShift Ventures AI automation solutions, featuring VAPI integration, guided demo forms, and comprehensive contact management.

## 🚀 Features

- **Modern React Frontend**: Built with React 18, TypeScript, and Vite
- **VAPI Integration**: Voice calls and phone calls with AI agents
- **Guided Demo Forms**: Step-by-step demo request process
- **Enhanced Contact System**: Dual-mode contact/consultation scheduling
- **Responsive Design**: Mobile-optimized with Tailwind CSS
- **Real-time Analytics**: Track user interactions and conversions
- **Function Calls**: Support for VAPI assistant functions
- **Production Ready**: Security, rate limiting, and monitoring
- **Scalable**: Built for high-traffic applications

## 📋 Prerequisites

- Node.js 18+ 
- VAPI account with API key
- VAPI assistant ID
- VAPI phone number (for outbound calls)

## 🛠️ Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/vapi-webhook-system.git
cd vapi-webhook-system

# Install dependencies
npm install

# Set environment variables
cp .env.example .env
# Edit .env with your VAPI credentials
```

## 🔧 Environment Variables

```bash
# Required
VAPI_API_KEY=your-vapi-api-key
VAPI_ASSISTANT_ID=your-assistant-id

# Optional
VAPI_PHONE_NUMBER_ID=your-phone-number-id
NODE_ENV=production
PORT=3001
WEBHOOK_URL=https://your-domain.com
ALLOWED_ORIGINS=https://your-frontend-domain.com
```

## 🚀 Quick Start

### Development
```bash
npm run dev
```

### Production
```bash
npm start
```

## 📡 API Endpoints

### Webhook
- `POST /webhook/vapi` - Main VAPI webhook endpoint

### Calls Management
- `GET /api/calls` - Get all calls
- `GET /api/calls/:id` - Get specific call
- `POST /api/calls/outbound-phone` - Make outbound call
- `POST /api/calls/web-voice` - Handle web voice call
- `POST /api/calls/inbound-phone` - Handle inbound call

### Analytics
- `GET /api/stats` - Get call statistics
- `GET /api/events` - Get webhook events

### Health
- `GET /health` - Health check
- `GET /` - System info

## 🔗 Frontend Integration

This webhook system works with the VectorShift Ventures React frontend:

```typescript
// Make outbound phone call
const response = await fetch('https://your-webhook-domain.com/api/calls/outbound-phone', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    customerNumber: '+1234567890',
    assistantId: 'your-assistant-id'
  })
});

// Get call statistics
const stats = await fetch('https://your-webhook-domain.com/api/stats');
```

## 🚀 Deployment

### Render (Recommended)
1. Connect your GitHub repository
2. Create Web Service
3. Set environment variables
4. Deploy automatically

### Railway
```bash
npm install -g @railway/cli
railway login
railway init
railway up
```

### Docker
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install --production
COPY . .
EXPOSE 3001
CMD ["npm", "start"]
```

## 📊 Monitoring

### Health Check
```bash
curl https://your-domain.com/health
```

### Call Statistics
```bash
curl https://your-domain.com/api/stats
```

### Webhook Events
```bash
curl https://your-domain.com/api/events
```

## 🔒 Security Features

- **Helmet**: Security headers
- **Rate Limiting**: 100 requests per 15 minutes
- **CORS**: Configurable origins
- **Input Validation**: Request validation
- **Error Handling**: Secure error responses

## 📈 Scaling

### High Traffic
- Upgrade to paid deployment plans
- Add Redis for call data storage
- Implement database persistence
- Add load balancing

### Enterprise
- Add authentication/authorization
- Implement user-specific rate limiting
- Add audit logging
- Set up monitoring and alerting

## 🛠️ Development

### Project Structure
```
vapi-mcp-tools/
├── unified-webhook-system.js    # Development webhook system
├── production-webhook-system.js # Production webhook system
├── server-phone-calls.js        # Phone call management
├── package.json                 # Dependencies
├── render.yaml                  # Render deployment config
├── railway.json                 # Railway deployment config
└── README.md                    # This file
```

### Scripts
```bash
npm start          # Start production server
npm run dev        # Start development server with nodemon
npm test           # Test the system
```

## 🔧 Configuration

### VAPI Webhook Setup
1. Go to [VAPI Dashboard](https://dashboard.vapi.ai)
2. Settings > Webhooks
3. Add webhook URL: `https://your-domain.com/webhook/vapi`
4. Select events: call-start, call-end, transcript, function-call, etc.

### Function Calls
The system supports these VAPI functions:
- `lookup_order` - Order lookup
- `schedule_appointment` - Appointment scheduling
- `get_company_info` - Company information
- `get_pricing` - Pricing information

## 📞 Support

- **Documentation**: [VAPI Docs](https://docs.vapi.ai)
- **Issues**: GitHub Issues
- **Email**: info@vectorshiftventures.com

## 📄 License

MIT License - see LICENSE file for details

## 🤝 Contributing

1. Fork the repository
2. Create feature branch
3. Commit changes
4. Push to branch
5. Create Pull Request

---

**Built with ❤️ by VectorShift Ventures LLC**