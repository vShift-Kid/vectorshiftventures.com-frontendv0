# n8n Webhook Setup Guide

## Overview
The demo page is now configured to send form submissions to your n8n workflow via webhook. This guide will help you set up the connection.

## Current Configuration

### 1. Demo Page Form Data
The demo page sends the following data to your n8n webhook:

**Form Fields:**
- `name` - Customer's name
- `email` - Customer's email
- `company` - Company name
- `industry` - Selected industry
- `preferredContact` - Contact method preference (email/phone/text)
- `businessChallenge` - Description of business challenge
- `fileCount` - Number of uploaded files
- `submissionTimestamp` - ISO timestamp of submission

**Files:**
- `file_0`, `file_1`, etc. - Uploaded files (if any)

## Setup Steps

### 1. Create n8n Webhook Node
1. In your n8n workflow, add a **Webhook** node
2. Configure it as a **POST** webhook
3. Copy the webhook URL provided by n8n

### 2. Configure Environment Variables
Create a `.env` file in the root directory with:

```env
REACT_APP_N8N_DEMO_WEBHOOK_URL=https://your-n8n-instance.com/webhook/demo-submission
REACT_APP_N8N_CONSULTATION_WEBHOOK_URL=https://your-n8n-instance.com/webhook/consultation-request
```

### 3. Update Configuration
If you don't want to use environment variables, update the webhook URL directly in:
`src/config/api.ts`

Replace `'YOUR_N8N_DEMO_WEBHOOK_URL_HERE'` with your actual webhook URL.

### 4. Test the Connection
1. Start your n8n workflow
2. Submit the demo form
3. Check the n8n execution logs to see the incoming data

## Expected n8n Workflow Structure

```
Webhook Node (receives form data)
    ↓
Process Form Data Node (extract fields and files)
    ↓
AI Analysis Node (analyze business challenge)
    ↓
Generate Response Node (create strategic blueprint)
    ↓
Send Response Node (email/phone/text based on preference)
```

## Data Format Received by n8n

The webhook will receive a `multipart/form-data` request with:

```json
{
  "name": "John Doe",
  "email": "john@company.com",
  "company": "ABC Corp",
  "industry": "technology",
  "preferredContact": "email",
  "businessChallenge": "We need to automate our lead generation process...",
  "fileCount": "2",
  "submissionTimestamp": "2024-01-15T10:30:00.000Z",
  "file_0": "[File object]",
  "file_1": "[File object]"
}
```

## Troubleshooting

### Common Issues:
1. **CORS Errors**: Ensure your n8n instance allows requests from your website domain
2. **File Upload Issues**: Check that your n8n workflow can handle multipart form data
3. **Webhook Not Triggering**: Verify the webhook URL is correct and the workflow is active

### Testing:
- Use browser developer tools to check network requests
- Check n8n execution logs for incoming webhook data
- Verify form data is being sent correctly

## Next Steps

Once the webhook connection is working:
1. Build the rest of your n8n workflow
2. Add AI analysis nodes
3. Implement response generation
4. Set up delivery mechanisms (email, phone, text) 