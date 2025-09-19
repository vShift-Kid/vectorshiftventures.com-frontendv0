import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import ErrorBoundary from './components/ErrorBoundary';
import StickyCTA from './components/StickyCTA';

// Lazy load components for code splitting
const Home = React.lazy(() => import('./pages/Home'));
const Demo = React.lazy(() => import('./pages/DemoTest'));
const Services = React.lazy(() => import('./pages/Services'));
const Consultation = React.lazy(() => import('./pages/Consultation'));
const Contact = React.lazy(() => import('./pages/Contact'));
const CompanyPage = React.lazy(() => import('./pages/CompanyPage'));
const Chatbot = React.lazy(() => import('./components/Chatbot'));
const VoiceAssistant = React.lazy(() => import('./components/VoiceAssistantSimple'));
const PhoneCaller = React.lazy(() => import('./components/PhoneCaller'));
const EnhancedPhoneCaller = React.lazy(() => import('./components/EnhancedPhoneCaller'));
const CallAnalytics = React.lazy(() => import('./components/CallAnalytics'));
const VapiTest = React.lazy(() => import('./components/VapiTest'));

// Loading component
const LoadingSpinner = () => (
  <div className="flex items-center justify-center min-h-[50vh]">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-400"></div>
  </div>
);

function App() {
  return (
    <Router>
      <ErrorBoundary>
        <div className="min-h-screen bg-[#0A0B1E] text-white">
          <Navigation />
          <Suspense fallback={<LoadingSpinner />}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/demo" element={<Demo />} />
              <Route path="/services" element={<Services />} />
              <Route path="/consultation" element={<Consultation />} />
              <Route path="/contact" element={<Contact />} />
              {/* Dynamic company routes - this will match any slug */}
              <Route path="/:slug" element={<CompanyPage />} />
            </Routes>
            <Chatbot />
            <VoiceAssistant />
            <PhoneCaller />
            <EnhancedPhoneCaller />
            <CallAnalytics />
            <VapiTest />
          </Suspense>
          <StickyCTA />
        </div>
      </ErrorBoundary>
    </Router>
  );
}

export default App;