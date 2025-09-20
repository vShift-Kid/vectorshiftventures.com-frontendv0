# VectorShift Ventures - AI Automation Solutions

A modern, responsive website for VectorShift Ventures, showcasing AI automation solutions for field service businesses with integrated VAPI phone calling and analytics.

## 🚀 Features

### Website Features
- **Modern Design**: Clean, professional interface with dark theme
- **Responsive Layout**: Optimized for all devices
- **AI Integration**: Voice assistant and chatbot capabilities
- **Performance Optimized**: Fast loading with code splitting
- **SEO Ready**: Meta tags and structured data

### VAPI Integration
- **AI Phone Calling**: Make intelligent sales calls to prospects
- **Enhanced Phone Caller**: Advanced calling interface with purpose selection
- **Call Analytics Dashboard**: Real-time metrics and performance tracking
- **Webhook Integration**: Real-time call event processing
- **Call History**: Complete call logs with status tracking

## 🛠️ Tech Stack

- **React 18**: Modern React with hooks and suspense
- **TypeScript**: Type-safe development
- **Vite**: Fast build tool and dev server
- **Tailwind CSS**: Utility-first CSS framework
- **React Router**: Client-side routing
- **Lucide React**: Beautiful icons
- **VAPI Web SDK**: AI phone calling integration

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- VAPI API key and assistant ID

### Installation

1. Clone the repository
```bash
git clone <repository-url>
cd vectorshiftventures
```

2. Install dependencies
```bash
npm install
```

3. Set up environment variables
```bash
# Create .env file
VITE_VAPI_API_KEY=your_vapi_api_key
VITE_VAPI_ASSISTANT_ID=your_assistant_id
VITE_VAPI_PHONE_NUMBER_ID=your_phone_number_id
VITE_WEBHOOK_URL=http://localhost:3001
```

4. Start development server
```bash
npm run dev
```

5. Open http://localhost:3000

## 📞 VAPI Phone Calling

### Features
- **AI Sales Calls**: Intelligent conversations with prospects
- **Purpose Selection**: Lead qualification, demos, support, complaints
- **Real-Time Status**: Live call progress and updates
- **Call Analytics**: Performance metrics and reporting
- **Call History**: Complete logs with status tracking

### Usage
1. Click "Call Now" button (bottom left)
2. Enter phone number in E.164 format (+1234567890)
3. Select call purpose
4. Watch real-time call updates
5. View analytics dashboard (bottom right)

## 📊 Analytics Dashboard

### Metrics
- Total calls and success rates
- Average call duration
- Calls by purpose and status
- Recent call history
- Real-time active call monitoring

### Access
- Click "Analytics" button (bottom right)
- View real-time performance data
- Monitor call trends and patterns

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run test` - Run tests with Vitest
- `npm run test:ui` - Run tests with UI
- `npm run test:coverage` - Run tests with coverage report
- `npm run test:run` - Run tests once
- `npm run type-check` - Run TypeScript type checking

## 📁 Project Structure

```
src/
├── components/
│   ├── CallAnalytics.tsx      # Analytics dashboard
│   ├── EnhancedPhoneCaller.tsx # Advanced phone calling
│   ├── PhoneCaller.tsx        # Basic phone calling
│   ├── VoiceAssistant.tsx     # Voice interaction
│   ├── Chatbot.tsx            # AI chatbot
│   └── ...                    # Other components
├── pages/                     # Page components
├── config/                    # Configuration files
├── lib/                       # Utility libraries
└── main.tsx                   # Application entry point
```

## 🚀 Deployment

### Production Ready Features
- ✅ **Performance Optimized**: Bundle splitting, lazy loading, image optimization
- ✅ **SEO Enhanced**: Meta tags, structured data, sitemap, robots.txt
- ✅ **Error Handling**: Global error boundary, user-friendly messages
- ✅ **Analytics**: Google Analytics 4, custom tracking, performance monitoring
- ✅ **Security**: Security headers, environment variable protection
- ✅ **Testing**: Comprehensive test suite with Vitest and React Testing Library
- ✅ **Mobile Optimized**: Responsive design, touch-friendly interfaces

### Quick Deploy

#### Netlify (Recommended)
1. Connect your GitHub repository to Netlify
2. Set build command: `npm ci && npm run build`
3. Set publish directory: `dist`
4. Configure environment variables in Netlify dashboard
5. Deploy automatically on push to main branch

#### Vercel
1. Connect your GitHub repository to Vercel
2. Vercel will auto-detect Vite configuration
3. Configure environment variables in Vercel dashboard
4. Deploy automatically on push to main branch

#### Render
1. Create a Static Site on Render
2. Connect your GitHub repository
3. Set build command: `npm ci && npm run build`
4. Set publish directory: `dist`
5. Configure environment variables

### Production Configuration
See [PRODUCTION_DEPLOYMENT_GUIDE.md](./PRODUCTION_DEPLOYMENT_GUIDE.md) for detailed production setup instructions.

## 🔧 Environment Variables

Create a `.env` file in the root directory:

```bash
# VAPI Configuration
VITE_VAPI_API_KEY=your_vapi_api_key
VITE_VAPI_ASSISTANT_ID=your_assistant_id
VITE_VAPI_PHONE_NUMBER_ID=your_phone_number_id

# Webhook Configuration
VITE_WEBHOOK_URL=your_webhook_url

# Optional: Supabase Configuration
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## 📞 VAPI Setup

### 1. Get VAPI Credentials
1. Sign up at [VAPI Dashboard](https://dashboard.vapi.ai)
2. Create an assistant
3. Get your API key and assistant ID
4. Purchase a phone number

### 2. Configure Webhooks
1. Set up webhook handler (see vapi-mcp-tools)
2. Configure webhook URL in VAPI dashboard
3. Test webhook integration

### 3. Test Integration
1. Start webhook handler
2. Test phone calling from website
3. Verify analytics dashboard

## 🔒 Security

- Environment variable protection
- API key validation
- Webhook security
- Rate limiting
- Input validation

## 📈 Performance

- Code splitting for faster loading
- Lazy loading of components
- Optimized images and assets
- Real-time call processing
- Efficient analytics

## 🐛 Troubleshooting

### Common Issues

1. **API Key Not Verified**
   - Check environment variables
   - Verify VAPI credentials
   - Restart development server

2. **Phone Calls Not Working**
   - Verify phone number format (E.164)
   - Check VAPI assistant configuration
   - Review call logs

3. **Analytics Not Loading**
   - Ensure webhook handler is running
   - Check webhook URL configuration
   - Verify API endpoints

## 📞 Support

- VAPI Documentation: https://docs.vapi.ai
- VAPI Support: support@vapi.ai
- VectorShift Ventures: Contact through website

## 📄 License

This project is proprietary to VectorShift Ventures LLC.

## 🤝 Contributing

This is an internal project. For contributions, contact the development team.

---

**VectorShift Ventures** - Transforming field service businesses with AI automation.