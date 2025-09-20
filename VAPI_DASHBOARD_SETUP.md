# VAPI Dashboard Configuration Guide

## Setting Up VAPI Webhooks in Dashboard

### 1. Access VAPI Dashboard
1. Go to [https://dashboard.vapi.ai](https://dashboard.vapi.ai)
2. Log in with your VAPI account
3. Navigate to **Settings** → **Webhooks**

### 2. Configure Webhook
1. Click **"Add Webhook"**
2. Enter the following details:

**Webhook URL:**
```
https://your-domain.com/webhook/vapi
```
*Replace `your-domain.com` with your production domain*

**Events to Subscribe:**
- ✅ `call-start`
- ✅ `call-end` 
- ✅ `call-update`
- ✅ `function-call`
- ✅ `speech-start`
- ✅ `speech-end`
- ✅ `message`
- ✅ `error`

**Secret (Optional):**
```
vsv-webhook-secret-2024
```

### 3. Test Webhook
1. Click **"Test Webhook"**
2. Verify you receive a test event
3. Check your webhook handler logs

### 4. Production Deployment

#### Option A: Deploy to Render
1. Create a new Web Service on Render
2. Connect your GitHub repository
3. Set environment variables:
   ```
   PORT=3001
   NODE_ENV=production
   ```
4. Deploy the `production-webhook-setup.js` file

#### Option B: Deploy to Railway
1. Create a new project on Railway
2. Connect your repository
3. Set the start command: `node production-webhook-setup.js`
4. Deploy

#### Option C: Deploy to Heroku
1. Create a new Heroku app
2. Add a `Procfile`:
   ```
   web: node production-webhook-setup.js
   ```
3. Deploy

### 5. Environment Variables
Set these in your production environment:

```bash
# Required
PORT=3001
NODE_ENV=production

# Optional
ALLOWED_ORIGINS=https://vectorshiftventures.com,https://www.vectorshiftventures.com
WEBHOOK_SECRET=vsv-webhook-secret-2024
```

### 6. Update Website Configuration
Update your website's environment variables:

```bash
# .env.production
VITE_WEBHOOK_URL=https://your-webhook-domain.com
VITE_VAPI_API_KEY=your-api-key
VITE_VAPI_ASSISTANT_ID=your-assistant-id
VITE_VAPI_PHONE_NUMBER_ID=your-phone-number-id
```

### 7. Test Complete Integration
1. Deploy webhook handler to production
2. Update VAPI dashboard with production webhook URL
3. Test a call from your website
4. Verify webhook events are received
5. Check analytics dashboard

### 8. Monitoring & Maintenance
- Monitor webhook delivery success rates
- Set up alerts for failed webhook deliveries
- Regularly check call analytics
- Monitor API usage and costs

## Troubleshooting

### Webhook Not Receiving Events
1. Check webhook URL is accessible
2. Verify SSL certificate is valid
3. Check webhook secret matches
4. Review VAPI dashboard webhook logs

### Call Analytics Not Updating
1. Verify webhook handler is running
2. Check webhook events are being processed
3. Ensure database/storage is working
4. Review error logs

### High Call Failure Rate
1. Check phone number configuration
2. Verify assistant is properly configured
3. Review call logs for errors
4. Test with different phone numbers

## Support
- VAPI Documentation: https://docs.vapi.ai
- VAPI Support: support@vapi.ai
- VectorShift Ventures: Contact through website
